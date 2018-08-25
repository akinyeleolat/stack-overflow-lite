import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// declaring routes
import questionRoutes from './routes/questionRoutes';
import userRoutes from './routes/usersRoutes';


const app = express();
// const Questions = require('./api/model');
// handling request

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/users', userRoutes);

// app error handling
app.all((req, res) => {
	const error = new Error('page not found');
	res.status(404).send(error);
	next(error);
});


export default app;
/* //End point 6 get all answer for  question not working
 app.get('/api/v1/questions/answers',(req,res)=>{
   res.send(Answers);
 }); */
