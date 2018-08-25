
// routes and endpoints
import express from 'express';

import * as questionController from '../controller/questionController';



const router = express.Router();
router.use(express.json());

//routes
router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getSingleQuestions);
router.post('/', questionController.PostQuestion);
router.post('/:Id/answers', questionController.PostAnswer);
//router.get('/:Id/answers', queries.fetchAllAnswers);
router.delete('/:id', questionController.deleteQuestion);
router.put('/:QuestionId/answers/:AnswerId', questionController.markAnswersPrefered);






// // Endpoint to get all questons
// /*router.get('/', (req, res) => {
// 	pool.query('SELECT * FROM Questions', (err) => {
// 		if (err) {
// 			throw err;
// 		}

// 		console.log('Questions', res.rows[0]);
// 	});
// });*/
// // Endpoint 2 to get selected questions
// /*router.get('/:id', (req, res) => {
// 	// receive params
// 	const result = Questions.find(c => c.id === parseInt(req.params.id));
// 	if (!result) res.status(404).send('The question with given id was not found');
// 	res.send(result);
// });*/
// //  End point 3 post questions working
// /*router.post('/', (req, res) => {
// 	// validate
// 	const Question = {
// 		id: Questions.length + 1,
// 		title: req.body.title,
// 		details: req.body.details,
// 	};

// 	return db.any('INSERT INTO QUESTIONS VALUES ($1,$2,$3) ', [req.body.title, req.body.details, Date()])
// 		.then((data) => {
// 			return res.send(data);
// 		})
// 		.catch(error => res.status(400).send(error))
// });*/
// // End point 4 post answer for a question working
// router.post('/:QuestionId/answers', (req, res, next) => {
// 	const QId = parseInt(req.params.QuestionId);

// 	const Answer = {
// 		id: Answers.length + 1,
// 		QuestionId: QId,
// 		answer: req.body.answer,
// 	};
// 	Answers.push(Answer);
// 	res.send(Answer);
// });
// // End point 5 fetch all answer for single question working
// router.get('/:QuestionId/answers', (req, res) => {
// 	// get the questions id
// 	const QId = parseInt(req.params.QuestionId);
// 	// find the answers that has the question id
// 	const result = Answers.filter(obj => obj.QuestionId === QId);
// 	if (!result) res.status(404).send('The question with given id was not found');
// 	res.send(result);
// });

// // edit questions
// router.put('/:QuestionId', (req, res) => {
// 	// look up questions
// 	const QId = parseInt(req.params.QuestionId);
// 	// console.log(QId);
// 	const result = Questions.find(c => c.id === QId);

// 	// if not existing, return 404
// 	if (!result) res.status(404).send('The question with given id was not found');
// 	// validate
// 	// if invalid, return 400 - bad request
// 	// update question
// 	result.title = req.body.title;
// 	result.details = req.body.details;
// 	// return updated question
// 	const newQuestion = {
// 		id: QId,
// 		title: result.title,
// 		details: result.details,
// 	};
// 	res.send(newQuestion);
// });

// // edit aswers
// router.put('/:QuestionId/answers/:AnswerId', (req, res) => {
// 	// look up questions
// 	const QId = parseInt(req.params.QuestionId);
// 	const AnswerId = parseInt(req.params.AnswerId);
// 	// console.log(AnswerId);
// 	const result = Answers.find(c => c.id === AnswerId);

// 	// if not existing, return 404
// 	if (!result) res.status(404).send('The answer with given id was not found');

// 	// update question

// 	result.Answer = req.body.Answer;
// 	// return updated question
// 	const newAnswer = {
// 		id: AnswerId,
// 		QuestionId: QId,
// 		Answer: result.Answer,
// 	};
// 	res.send(newAnswer);
// });


// // delete question

// // delete answers

// // module.exports=router;
export default router;
