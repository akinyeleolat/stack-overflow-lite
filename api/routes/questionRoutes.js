const express=require('express');
const router=express.Router();
router.use(express.json()); // for post to work

// import questions data model
//import {Questions} from 'model.js';
const Questions=require('../model/QuestionModel');

//import answers data model
const Answers=require('../model/AnswerModel');

// Endpoint to get all questons
router.get('/',(req,res,next)=>{
	res.send(Questions);
});
// Endpoint 2 to get selected questions
router.get('/:id',(req,res,next)=>{
 	let result=Questions.find(c=>c.id===parseInt(req.params.id));
 	res.send(result);
 });
  //  End point 3 post questions working
 router.post('/',(req,res,next)=>{
 	const Question={
 		id:Questions.length+1,
 		title:req.body.title,
 		details:req.body.details
 	};
   Questions.push(Question);
   res.send(Question);
 });
 // End point 4 post answer for a question working
  router.post('/:QuestionId/answers',(req,res,next)=>{
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
 router.get('/:QuestionId/answers',(req,res,next)=>{
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

module.exports=router;