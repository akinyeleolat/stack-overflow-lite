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

app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);


app.all((req, res) => {
	const error = new Error('Welcome to stackoverflow lite, the resources is not found');
	res.status(404).send(error);
	next(error);
});


export default app;
