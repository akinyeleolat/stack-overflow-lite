
import supertest from 'supertest';
// import app from './api/server';
import server from './api/server';

const request = supertest.agent(server);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJJZCI6OSwiaWF0IjoxNTM1NjIyOTI3LCJleHAiOjE1MzU2MjY1Mjd9.uyqDC_yg6WVCWkfVln_SrFVsFEJZsM-xJ59WyJkmoZo';

const loginData = {
	username: 'admin',
	userpassword: 'admin',
};

const questionData = {
	title: 'title test',
	details: 'details test',
	userId: '6',
	createdAt: new Date(),
};

const AnswerData = {
	Answer: 'test1',
	QuestionId: '9',
	userID: '6',
	status: 'pending',
	createdAt: new Date(),
};
const SignUpData = {
	fullname: 'admin admin',
	username: 'admin',
	email: 'admin@admin.com',
	password: 'admin',
	createdAt: new Date(),
}
// Get all questions
describe('GET All Questions', () => {
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

// Get a single Questions
describe('GET Single Questions', () => {
	it('should return status 200', (done) => {
		request
			.get('/api/questions/9')
			.expect(200)
			.end(done);
	});
	it('should return the questions in JSON format', (done) => {
		request
			.get('/api/questions/9')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);
	});
});

// users sign up
describe('POST Users Sign Up', () => {
	it('should return status 409 and json', (done) => {
		request
			.post('/api/users/signup')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send(SignUpData)
			.expect(409)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);
	});
});

// sign in
describe('POST users Sign in', () => {
	it('should return status 200 and json', (done) => {
		request
			.post('/api/users/signin')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send(loginData)
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);
	});
});

// Post Question
describe('POST Question', () => {
	it('should return status 200 and json', (done) => {
		request
			.post('/api/questions')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', `Bearer ${token}`)
			.send(questionData)
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);
	});
});

// Post an answers
describe('POST Post Answer', () => {
	it('should return status 200 and json', (done) => {
		request
			.post('/api/questions/9/answers')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', `Bearer ${token}`)
			.send(AnswerData)
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);
	});
});

// delete Questions
describe('POST Delete Questions', () => {
	it('should return status 200 and json', (done) => {
		request
			.delete('/api/questions/15')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(done);
	});
});
