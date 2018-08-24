import db from '../db/index';





export function getAllQuestions(req, res, next) {
  db.any('select * from questions')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Questions'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};
export function getSingleQuestions(req, res, next) {
  const QuestionID = Number(req.params.id);
  db.one('select * from questions where id = $1', QuestionID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Question'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

export function PostQuestion(req, res, next) {
  const userID = Number(req.body.userID);
  db.none('INSERT INTO QUESTIONS VALUES ($1,$2,$3,$4) ', [req.body.title, req.body.details, userID, Date()])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

export function PostAnswer(req, res, next) {
  const QuestionId = Number(req.params.QuestionId);
  const userID = Number(req.body.userID);
  let status = 'pending';
  db.none('INSERT INTO ANSWERS VALUES ($answers,$questionId,$userId,$status,date) ', [req.body.answer, QuestionId, userID, Date()])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'answer submitted'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

export function deleteQuestion(req, res, next) {
  const QuestionId = Number(req.params.id);
  db.result('delete from Questions where id = $1', QuestionId)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} questions`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
};
export function markAnswersPrefered(req, res, next) {
  const QuestionId = Number(req.params.QuestionId);
  const AnswerId = Number(req.params.AnswerId);
  db.none('update Answers set status=$1  where id=$2 AND QuestionId=$3',
    [req.body.status, AnswerId, QuestionId])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};