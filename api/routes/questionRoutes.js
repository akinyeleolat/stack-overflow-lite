
// routes and endpoints
import express from 'express';

import * as questionController from '../controller/questionController';
import checkAuth from '../middleware/userAuth';


const router = express.Router();
router.use(express.json());


router.get('/', questionController.getAllQuestions);
router.get('/:QuestionId', questionController.getSingleQuestions);
router.post('/', checkAuth, questionController.PostQuestion);
router.post('/:QuestionId/answers', checkAuth, questionController.PostAnswer);
router.delete('/:id', checkAuth, questionController.deleteQuestion);
router.patch('/:QuestionId/answers/:AnswerId', checkAuth, questionController.markAnswersPrefered);


export default router;

