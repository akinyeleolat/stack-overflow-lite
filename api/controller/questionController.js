import db from '../db/index';


export function getAllQuestions(req, res) {
  db.query('select * from questions')
    .then(function (data) {
      return res.status(200).send({
        status: 'success',
        data: data,
        message: 'Retrieved ALL Questions'
      });
    })
    .catch(function (err) {
      return res.status(500).json({ message: 'internal server error' });
    });
};
export function getSingleQuestions(req, res) {
  //must display answers
  const QuestionID = Number(req.params.id);
  db.query('select * from questions where id = $1', QuestionID)
    .then(function (data) {
      return res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE Question'
      });
    })
    .catch(function (err) {
      return res.status(500).json({ message: 'internal server error' });
    });
};

export function PostQuestion(req, res) {

  const { userID, title, details } = req.body;

  console.log('title ------>', title);
  console.log('title ------>', details);
  console.log('title ------>', userID);
  db.query('INSERT INTO questions (title,details,userId,createdAt) VALUES ($1, $2, $3, $4)', [title, details, Number(userID), new Date()])
    .then(function () {
      res.status(200).send({
        status: 'success',
        message: 'Question Added'
      });
    })
    .catch(function (err) {
      return res.status(500).json({ message: 'internal server error' });
    });
};

export function PostAnswer(req, res) {
  const QuestionId = Number(req.params.QuestionId);
  const userID = Number(req.body.userID);
  let status = 'pending';
  db.none('INSERT INTO ANSWERS (answers,questionId,userId,status,date) VALUES ($1,$2,$3,$4,$5) ', [req.body.answer, QuestionId, userID, status, new Date()])
    .then(function () {
      res.status(200).json({
        status: 'success',
        message: 'answer submitted'
      });
    })
    .catch(function (err) {
      return res.status(500).json({ message: 'internal server error' });
    });
};

export function deleteQuestion(req, res) {
  const QuestionId = Number(req.params.id);
  db.query('delete from Questions where id = $1', QuestionId)
    .then(function (result) {

      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} questions`
      });

    })
    .catch(function (err) {
      return res.status(500).json({ message: 'internal server error' });
    });
};
export function markAnswersPrefered(req, res) {
  const QuestionId = Number(req.params.QuestionId);
  const AnswerId = Number(req.params.AnswerId);
  const { status } = req.body;
  db.query('update Answers set status=$1  where id=$2 AND QuestionId=$3',
    [status, AnswerId, QuestionId])
    .then(function () {
      res.status(200).json({
        status: 'success',
        message: 'Answer status updated'
      });
    })
    .catch(function (err) {
      return res.status(500).json({ message: 'internal server error' });
    });
};
