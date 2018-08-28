import jwt from 'jsonwebtoken';
import { db } from '../db/index';


export const getAllQuestions = (req, res) => {
  db.query('SELECT * FROM questions')
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
  const QuestionID = Number(req.params.id);
  db.query('SELECT * FROM questions where id = $1', QuestionID)
    .then((data) => {
      return res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE Question'
      });
    })
    .catch(() => {
      return res.status(500).json({ message: 'internal server error' });
    });
};

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
  const QuestionId = req.params.QuestionId;
  // console.log("start to get Token")
  //get Token
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.userData = decoded;

  // console.log("end get Token")
  const { userId } = req.userData;
  let status = 'pending';
  db.none('INSERT INTO ANSWERS (answers,questionId,userId,status,date) VALUES ($1,$2,$3,$4,$5) ', [req.body.answer, Number(QuestionId), Number(userId), status, new Date()])
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'answer submitted'
      });
    })
    .catch(() => {
      return res.status(500).json({ message: 'internal server error' });
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
  db.query('DELETE * FROM Questions where id = $1', QuestionId)
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
