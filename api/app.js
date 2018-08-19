import express from 'express';

const app = express();
import bodyParser from 'body-parser';
import Joi from 'joi';

// declaring routes
import questionRoutes from './routes/questionRoutes';
 //const Questions = require('./api/model');
 //handling request
 app.use('/v1/questions',questionRoutes);
 app.use(express.json());

 //app error handling
 app.use((req,res,next)=>{
	const error=new Error('not found');
	error.status=404;
	res.send(error);
	next(error);
 });

app.use((error,req,res,next)=>{
res.status(error.status||500);
res.send({
	error:{
		message: error.message
	}
});
});

export default app;
 /*//End point 6 get all answer for  question not working
 app.get('/api/v1/questions/answers',(req,res)=>{
   res.send(Answers);
 });*/
