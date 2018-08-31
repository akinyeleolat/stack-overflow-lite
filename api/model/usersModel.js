import { db } from '../db/index';

export default (req, res) => {
    db.query('SELECT * FROM users')
        .then(data => res.status(200).send({
            status: 'success',
            data,
            message: 'Retrieved ALL Users',
        }))
        .catch(() => res.status(500).json({ message: 'internal server error' }));
};
