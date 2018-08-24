// routes and endpoints
import express from 'express';

import * as queries from '../controller/usersController';



const router = express.Router();
router.use(express.json());

//routes
router.post('/SignUp', queries.SignUp);
router.post('/SignIn', queries.SignIn);






export default router;
