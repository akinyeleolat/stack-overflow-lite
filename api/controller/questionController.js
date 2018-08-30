// import jwt from 'jsonwebtoken';
import { db } from '../db/index';


export const getAllQuestions = (req, res) => {
  // db.query('SELECT * FROM questions')
  db.query('SELECT Questions.id,Questions.title,Questions.details,users.username,Questions.createdAt FROM questions INNER JOIN users ON questions.userId = users.id')
    .then((data) => {
      return res.status(200).send({
        status: 'success',
        data,
        message: 'Retrieved ALL Questions',
      });
    })
    .catch(() => {
      return res.status(500).json({ message: 'internal server error' });
    });
};
export const getSingleQuestions = (req, res) => {
  // must display answers
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
              message: 'Retrieved single questions',
            });
          }
          return res.status(200).send({
            status: 'success',
            QuestionDetails: data,
            AnswersDetails: 'No answer posted yet',
            message: 'Retrieved single questions',
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
  // get Token
  // const token = req.headers.authorization.split(" ")[1];

  // const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // req.userData = decoded;

  // console.log("end get Token")
  // req.userData = decoded;
  const { userId } = req.userData;

  const userID = userId;

  const { title, details } = req.body;

  console.log('title ------>', title);
  console.log('details ------>', details);
  console.log('userId ------>', { userId });

  db.query('INSERT INTO questions (title,details,userId,createdAt) VALUES ($1, $2, $3, $4)', [title, details, Number(userID), new Date()])
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
  // get Token
  // const token = req.headers.authorization.split(" ")[1];

  // const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // req.userData = decoded;

  // console.log("end get Token")
  const { userId } = req.userData;
  console.log(Number(userId));
  const status = 'pending';
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
  const { id } = req.params;
  console.log(typeof (id));
  // console.log("start to get Token")
  // get Token
  // const token = req.headers.authorization.split(" ")[1];

  // const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // req.userData = decoded;

  // console.log("end get Token")
  const { userId } = req.userData;
  console.log(userId);
  // USE user ID to know who can delete questions
  db.query('SELECT Questions.userId FROM questions WHERE Questions.userId=$1', [Number(userId)])
    .then((data) => {
      console.log(data);
      if (data.length < 1) {
        return res.status(500).json({ message: 'You are not authorized to delete the question' });
      }
      console.log('start delete questions');
      console.log([Number(id)]);
      // then delete question
      db.query('DELETE FROM questions WHERE questions.id = $1', [Number(id)])
        .then((result) => {
          console.log(result);
          res.status(200).json({
            status: 'success',
            message: 'Questions deleted',
          });
        })
        .catch((err) => {
          return res.status(500).json({ message: err });
        });
    })
    .catch(() => {
      return res.status(500).json({ message: 'internal server error' });
    });

};
export const markAnswersPrefered = (req, res) => {
  const QuestionId = Number(req.params.QuestionId);
  const AnswerId = Number(req.params.AnswerId);
  const status = 'Preferred';
  // console.log("start to get Token")
  // get Token
  // const token = req.headers.authorization.split(" ")[1];

  // const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // req.userData = decoded;

  // console.log("end get Token")
  const { userId } = req.userData;
  // use user ID to know who set the questions
  db.query('SELECT Questions.userId FROM questions WHERE Questions.userId=$1', [Number(userId)])
    .then((data) => {
      if (data.length < 1) {
        return res.status(500).json({ message: 'You are not question author' });
      }
      // then update status
      db.query('UPDATE Answers SET status=$1  WHERE id=$2 AND QuestionId=$3',
        [status, AnswerId, QuestionId])
        .then(() => {
          res.status(200).json({
            status: 'success',
            message: 'Question mark as prefferred',
          });
        })
        .catch(() => {
          return res.status(500).json({ message: 'internal server error' });
        });
    })
    .catch(() => {
      return res.status(500).json({ message: 'internal server error' });
    });
};
