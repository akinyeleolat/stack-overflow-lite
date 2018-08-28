// routes and endpoints
import express from 'express';
import bodyParser from 'body-parser'



import * as usersController from '../controller/usersController';




const router = express.Router();
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// routes
router.post('/signup', usersController.SignUp);
router.post('/signin', usersController.SignIn);






export default router;
