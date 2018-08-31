
import { db } from '../db/index';


export const getAllQuestions = (req, res) => {
  db.query('SELECT Questions.id,Questions.title,Questions.details,users.username,Questions.createdAt FROM questions INNER JOIN users ON questions.userId = users.id')
    .then(data => res.status(200).send({
      status: 'success',
      data,
      message: 'Retrieved ALL Questions',
    }))
    .catch(() => res.status(500).json({ message: 'internal server error' }));
};
export const getSingleQuestions = (req, res) => {
  const { QuestionId } = req.params;
  const QuestionID = Number(QuestionId);

  db.query('SELECT Questions.id,Questions.title,Questions.details,users.username,Questions.createdAt FROM questions INNER JOIN users ON questions.userId = users.id WHERE Questions.id=$1', [QuestionID])
    .then((data) => {
      if (data.length < 1) {
        return res.status(500).json({ message: 'The questions with this id not found' });
      }
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
        .catch(() => res.status(500).json({ message: 'internal server error' }));
    })
    .catch(() => res.status(500).json({ message: 'internal server error' }));
};

export const PostQuestion = (req, res) => {
  const { userId } = req.userData;

  const userID = userId;

  const { title, details } = req.body;

  if ((!title) || (!details)) {
    res.json({
      status: 'Blank Data',
      message: 'Questions\' data cannot be blank',
    });
    return;
  }
  db.any('SELECT * FROM Questions WHERE title = $1', [title])
    .then((checkTitle) => {
      if (checkTitle.length >= 1) {
        return res.status(409).json({
          status: 'success',
          message: 'title already exist',
        });
      }
    })

  db.query('INSERT INTO questions (title,details,userId,createdAt) VALUES ($1, $2, $3, $4)', [title, details, Number(userID), new Date()])
    .then(() => {
      res.status(200).send({
        status: 'success',
        title,
        details,
        message: 'Question Added',
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

export const PostAnswer = (req, res) => {
  const { QuestionId } = req.params;
  const { userId } = req.userData;
  const status = 'pending';
  const { Answer } = req.body;
  db.query('INSERT INTO Answers (Answer,QuestionId,userId,status,date)  VALUES ($1,$2,$3,$4,$5)', [Answer, Number(QuestionId), Number(userId), status, new Date()])
    .then((answer) => {
      res.status(200).json({
        status: 'success',
        answer,
        message: 'answer submitted',
      });
    })
    .catch(err => res.status(500).json({ message: err }));
};

export const deleteQuestion = (req, res) => {
  const { id } = req.params;
  const { userId } = req.userData;
  db.query('SELECT Questions.userId FROM questions WHERE Questions.userId=$1', [Number(userId)])
    .then((data) => {
      if (data.length < 1) {
        return res.status(500).json({ message: 'You are not authorized to delete the question' });
      }
      db.query('DELETE FROM questions WHERE questions.id = $1', [Number(id)])
        .then(() => {
          res.status(200).json({
            status: 'success',
            message: `Question with ID ${id} deleted`,
          });
        })
        .catch(err => res.status(500).json({ message: err }));
    })
    .catch(() => res.status(500).json({ message: 'internal server error' }));
};
export const markAnswersPrefered = (req, res) => {
  const QuestionId = Number(req.params.QuestionId);
  const AnswerId = Number(req.params.AnswerId);
  const status = 'Preferred';

  const { userId } = req.userData;
  db.query('SELECT Questions.userId FROM questions WHERE Questions.userId=$1', [Number(userId)])
    .then((data) => {
      if (data.length < 1) {
        return res.status(500).json({ message: 'You are not the question author' });
      }
      db.query('UPDATE Answers SET status=$1  WHERE id=$2 AND QuestionId=$3',
        [status, AnswerId, QuestionId])
        .then(() => {
          res.status(200).json({
            status: 'success',
            message: `Answer ${AnswerId} mark as prefferred`,
          });
        })
        .catch(() => res.status(500).json({ message: 'internal server error' }));
    })
    .catch(() => res.status(500).json({ message: 'internal server error' }));
};
