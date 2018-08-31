import jwt from 'jsonwebtoken';

export default (req) => {
  const token = req.headers.authorization.split(' ')[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.userData = decoded;
};
