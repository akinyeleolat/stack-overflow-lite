import { db } from '../db/index';

export default (req, res) => {
	db.query('SELECT * FROM Questions')
		.then((data) => res.status(200).send({
			status: 'success',
			data: data,
			message: 'Retrieved ALL Questions'
		}))
		.catch(() => res.status(500).json({ message: 'internal server error' }));
};
