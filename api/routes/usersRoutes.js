// routes and endpoints
import express from 'express';



import * as usersController from '../controller/usersController';



const router = express.Router();
router.use(express.json());

// routes
router.post('/signup', usersController.SignUp);
router.post('/signin', usersController.SignIn);






export default router;
