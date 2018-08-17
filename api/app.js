// set dependencies
 const express=require('express'); 
 const app = express();
 const bodyParser=require('body-parser');
 //
 const questionRoutes=require('./routes/questionRoutes');
 //const Questions = require('./api/model');
 //middleware
 app.use('/v1/questions',questionRoutes);

 app.use(express.json());
// import questions data model
//import {Questions} from 'model.js';
//const Questions=require('./model/QuestionModel');
//import {Questions} from '';
 /*const Questions=[
}
{id:1,title:'what is html',details:'what is the full meaning of html'},
{id:2,title:'what is ajax',details:'what is the full meaning of ajax'},
{id:3,title:'what is html',details:'what is the full meaning of html'},
{id:4,title:'what is html',details:'what is the full meaning of html'},
{id:5,title:'what is html',details:'what is the full meaning of html'},
{id:6,title:'what is html',details:'what is the full meaning of html'}
 ];*/
 // declare answers data model
/*const Answers=[
{id:1,QuestionId:1,Answer:'hypertext markup language'},
{id:2,QuestionId:2,Answer:'asynchrounous javascript'}
];*/
//import answers data model
//const Answers=require('./model/AnswerModel');
//import {Answers} from 'AnswerModel';
// error handling 

// End point 1 get all questions working
 /*app.get('/api/v1/questions',(req,res)=>{
    res.send(Questions);
 });*/
 //End point 2 get single questions working
 /*app.get('/v1/questions/:id',(req,res)=>{
 	let result=Questions.find(c=>c.id===parseInt(req.params.id));
 	res.send(result);
 });
  //  End point 3 post questions working
 app.post('/v1/questions',(req,res)=>{
 	const Question={
 		id:Questions.length+1,
 		title:req.body.title,
 		details:req.body.details
 	};
   Questions.push(Question);
   res.send(Question);
 });
 // End point 4 post answer working
  app.post('/v1/questions/:QuestionId/answers',(req,res)=>{
  	let QId=parseInt(req.params.QuestionId);
  	//console.log(QId);
 	const Answer={
 		id:Answers.length+1,
 		QuestionId:QId,
 		answer:req.body.answer
 	};
   Answers.push(Answer);
   res.send(Answer);
 });
 // End point 5 fetch all answer for single question working
 app.get('/v1/questions/:QuestionId/answers',(req,res)=>{
  	//get the questions id
  	let QId=parseInt(req.params.QuestionId);
  	//console.log(QId);
  	// find the answers that has the question id
  	let result=Answers.filter(obj=>obj.QuestionId===QId);
 	res.send(result);
 });
 
 
  // delte question
  // edit questions
  // edit aswers
  // delete answers
// PORT
//const port=process.env.PORT || 3000;
 //app.listen(port,()=>console.log(`listening  on port ${port}...`));*/

 module.exports=app;
 /*//End point 6 get all answer for  question not working
 app.get('/api/v1/questions/answers',(req,res)=>{
   res.send(Answers);
 });*/
