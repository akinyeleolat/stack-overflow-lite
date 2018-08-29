import jwt from 'jsonwebtoken';

export default (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  //console.log('Token----------->', token);
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.userData = decoded;
}
