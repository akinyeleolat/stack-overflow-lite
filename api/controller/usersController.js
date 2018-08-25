import db from '../db/index';

export function SignUp(req, res) {

  const { fullname, username, email, userpassword } = req.body;

  console.log('username ------>', username);
  console.log('fullname ------>', fullname);
  console.log('email ------>', email);
  console.log('userpassword----->', userpassword);
  console.log('createdAt------->',new Date());
  db.query('INSERT INTO users (fullname,username,email,userpassword, createdAt) VALUES ($1, $2, $3, $4.$5)', [fullname, username, email, userpassword, new Date()])
    .then(function () {
      res.status(200)
        .send({
          status: 'success',
          message: 'users created'
        });
    })
    .catch(function (err) {
      return res.status(500).json({ message: 'internal server error' });
    });
};

export function SignIn(req, res) {

};