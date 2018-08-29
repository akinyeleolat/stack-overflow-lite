import jwt from 'jsonwebtoken';
import { db } from '../db/index';


export const getAllQuestions = (req, res) => {
  // db.query('SELECT * FROM questions')
  db.query('SELECT Questions.id,Questions.title,Questions.details,users.username,Questions.createdAt FROM questions INNER JOIN users ON questions.userId = users.id')
    .then((data) => {
      return res.status(200).send({
        status: 'success',
        data: data,
        message: 'Retrieved ALL Questions'
      });
    })
    .catch(() => {
      return res.status(500).json({ message: 'internal server error' });
    });
};
export const getSingleQuestions = (req, res) => {
  //must display answers
  const { QuestionId } = req.params;
  const QuestionID = Number(QuestionId);
  console.log(QuestionID);
  // 
  db.query('SELECT Questions.id,Questions.title,Questions.details,users.username,Questions.createdAt FROM questions INNER JOIN users ON questions.userId = users.id WHERE Questions.id=$1', [QuestionID])
    .then((data) => {
      if (data.length < 1) {
        return res.status(500).json({ message: 'The questions with this id not found' });
      }
      // check for the answer posted for that questions
      db.query('SELECT Answers.id,Answers.answer,Answers.status,users.username,Answers.date FROM Answers INNER JOIN users ON Answers.userId = users.id WHERE Answers.QuestionId=$1', [QuestionID])
        .then((answer) => {
          if (answer.length >= 1) {
            return res.status(200).send({
              status: 'success',
              QuestionDetails: data,
              AnswersDetails: answer,
              message: 'Retrieved single questions'
            });
          }
          return res.status(200).send({
            status: 'success',
            QuestionDetails: data,
            AnswersDetails: 'No answer posted yet',
            message: 'Retrieved single questions'
          });
        })
        .catch(() => {
          return res.status(500).json({ message: 'internal server error' });
        });
    })
    .catch(() => {
      return res.status(500).json({ message: 'internal server error' });
    });
}

export const PostQuestion = (req, res) => {
  // console.log("start to get Token")
  //get Token
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.userData = decoded;

  // console.log("end get Token")
  const { userId } = req.userData;

  const { title, details } = req.body;

  console.log('title ------>', title);
  console.log('details ------>', details);
  console.log('userId ------>', userId);

  db.query('INSERT INTO questions (title,details,userId,createdAt) VALUES ($1, $2, $3, $4)', [title, details, Number(userId), new Date()])
    .then(() => {
      res.status(200).send({
        status: 'success',
        message: 'Question Added'
      });
    })
    .catch(err => res.status(500).json({ error: err }));
}

export const PostAnswer = (req, res) => {
  const { QuestionId } = req.params;

  console.log(Number(QuestionId));
  // console.log("start to get Token")
  //get Token
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.userData = decoded;

  // console.log("end get Token")
  const { userId } = req.userData;
  console.log(Number(userId));
  let status = 'pending';
  console.log(status);
  const { Answer } = req.body;
  console.log(Answer);
  db.query('INSERT INTO Answers (Answer,QuestionId,userId,status,date)  VALUES ($1,$2,$3,$4,$5)', [Answer, Number(QuestionId), Number(userId), status, new Date()])
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'answer submitted',
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

export const deleteQuestion = (req, res) => {
  const QuestionId = Number(req.params.id);
  // console.log("start to get Token")
  //get Token
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.userData = decoded;

  // console.log("end get Token")
  const { userId } = req.userData;
  //USE user ID to know who can delete questions
  db.any('DELETE * FROM Questions where id = $1', QuestionId)
    .then((result) => {

      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} questions`
      });

    })
    .catch(() => {
      return res.status(500).json({ message: 'internal server error' });
    });
};
export const markAnswersPrefered = (req, res) => {
  const QuestionId = Number(req.params.QuestionId);
  const AnswerId = Number(req.params.AnswerId);
  const { status } = req.body;
  // console.log("start to get Token")
  //get Token
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.userData = decoded;

  // console.log("end get Token")
  const { userId } = req.userData;
  //use user ID to know who set questions
  db.query('UPDATE Answers SET status=$1  where id=$2 AND QuestionId=$3',
    [status, AnswerId, QuestionId])
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Answer status updated'
      });
    })
    .catch(() => {
      return res.status(500).json({ message: 'internal server error' });
    });
};
