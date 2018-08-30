
import supertest from 'supertest';
import app from './api/server';

// import * as supertest from "supertest";
import questionRoutes from './api/routes/questionRoutes';
// const questions=require('./model/QuestionModel'); 
// const answers=require('./model/AnswerModel'); 
const request = supertest.agent(app);

describe('GET /api/questions', () => {
	it('should return status 200', (done) => {
		request
			.get('/api/questions')
			.expect(200)
			.end(done);
	});
	it('should return all questions in JSON format', (done) => {
		request
			.get('/api/questions')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);

	});

});

describe('GET /api/questions/:QuestionId', () => {
	it('should return status 200', (done) => {
		request
			.get('/api/questions/5')
			.expect(200)
			.end(done);
	});
	it('should return the questions in JSON format', (done) => {
		request
			.get('/api/questions')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);

	});

});

describe('POST /api/v1/questions', () => {
	it('should return status 200', (done) => {
		request
			.post('/api/v1/questions')
			.send({
				title: 'test',
				details: 'test'
			})
			.expect(200)
			.end(done);
	});
	it('should return  the question in JSON format', (done) => {
		request
			.post('/api/v1/questions')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);

	});

});

describe('POST /api/v1/questions/:QuestionId/Answers', () => {
	it('should return status 200', (done) => {
		request
			.post('/api/v1/questions/3/Answers')
			.send({
				QuestionId: 3,
				answer: 'test'
			})
			.expect(200)
			.end(done);
	});
	it('should return  answers in JSON format', (done) => {
		request
			.post('/api/v1/questions')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);

	});

});
