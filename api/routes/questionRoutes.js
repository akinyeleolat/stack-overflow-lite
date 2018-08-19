// routes and endpoints
const express=require('express');
const router=express.Router();
//const Joi=require('joi');
router.use(express.json()); // for post to work

// import questions data model
const Questions=require('../model/QuestionModel');

//import answers data model
const Answers=require('../model/AnswerModel');

// Endpoint to get all questons
router.get('/',(req,res,next)=>{
	res.send(Questions);
	});
// Endpoint 2 to get selected questions
router.get('/:id',(req,res,next)=>{
	// receive params	
 	let result=Questions.find(c=>c.id===parseInt(req.params.id));
 	 if(!result) res.status(404).send('The question with given id was not found');
 	res.send(result);
 });
  //  End point 3 post questions working
 router.post('/',(req,res,next)=>{
 	//validate
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
  			// find the answers that has the question id
  			let result=Answers.filter(obj=>obj.QuestionId===QId);
  	 		if(!result) res.status(404).send('The question with given id was not found');
 			res.send(result);
 });

   // edit questions
     router.put('/:QuestionId',(req,res,next)=>{
 		// look up questions
 		let QId=parseInt(req.params.QuestionId);
 		//console.log(QId);
 		let result=Questions.find(c=>c.id===QId);  

 		//if not existing, return 404
 		if(!result) res.status(404).send('The question with given id was not found');
 		// validate
 		//if invalid, return 400 - bad request
 		//update question
 		result.title=req.body.title;
 		result.details=req.body.details;
 		//return updated question
 		const newQuestion={
 			id:QId,
 			title:result.title,
 			details:result.details
 		};
 		res.send(newQuestion);
   		}); 

  // edit aswers
   router.put('/:QuestionId/answers/:AnswerId',(req,res,next)=>{
 		// look up questions
 		let QId=parseInt(req.params.QuestionId);
 		let AnswerId=parseInt(req.params.AnswerId);
 		//console.log(AnswerId);
 		let result=Answers.find(c=>c.id===AnswerId);  

 		//if not existing, return 404
 		if(!result) res.status(404).send('The answer with given id was not found');
 		
 		//update question
 		
 		result.Answer=req.body.Answer;
 		//return updated question
 		const newAnswer={
 			id:AnswerId,
 			QuestionId:QId,
 			Answer:result.Answer,
 		};
 		res.send(newAnswer);
   		}); 

// validate answers
/*function validateAnswer(Answer){
	const schema={
			Answer: Joi.string().minimum(20).required()
	};
	return Joi.validateAnswer(Answer,schema);
}
// validate question
function validateQuestion(title,details){

	const schema={
		title: Joi.string().minimum(10).required(),
		details: Joi.string().minimum(20).required()
	};
	return Joi.validateQuestion(title,details,schema);
}*/


   // delete question

  // delete answers

module.exports=router;