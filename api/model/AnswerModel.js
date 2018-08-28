// Answer Data MOdel
import { db } from '../db/index';

export default (req, res) => {
	db.query('SELECT * FROM Answers')
		.then((data) => res.status(200).send({
			status: 'success',
			data: data,
			message: 'Retrieved ALL Answers'
		}))
		.catch(() => res.status(500).json({ message: 'internal server error' }));
};