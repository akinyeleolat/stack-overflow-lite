// set dependencies
 const express=require('express'); 
 const app = express();
 const bodyParser=require('body-parser');
 // declaring routes
 const questionRoutes=require('./routes/questionRoutes');
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
res.json({
	error:{
		message: error.message
	}
});
});

 module.exports=app;
 /*//End point 6 get all answer for  question not working
 app.get('/api/v1/questions/answers',(req,res)=>{
   res.send(Answers);
 });*/
