const app=require('./server');
//import * as supertest from "supertest";
const supertest=require('supertest');
const questionRoutes=require('./routes/questionRoutes');
//const questions=require('./model/QuestionModel'); 
//const answers=require('./model/AnswerModel'); 
const request=supertest.agent(app);

describe('GET /v1/questions',()=>{
it('should return status 200',(done)=>{
	request
	.get('/v1/questions')
	.expect(200)
	.end(done);
});
it('should return all questions in JSON format',(done)=>{
	request
	.get('/v1/questions')
	.expect('Content-Type','application/json; charset=utf-8')
	.end(done);

});
	
});

describe('POST /v1/questions',()=>{
it('should return status 200',(done)=>{
	request
	.post('/v1/questions')
	.send({
		title:'test',
		details:'test'
	})
	.expect(200)
	.end(done);
});
it('should return  questions in JSON format',(done)=>{
	request
	.post('/v1/questions')
	.expect('Content-Type','application/json; charset=utf-8')
	.end(done);

});
	
});

