import db from '../db/index';

export function SignUp(req, res, next) {

  const { fullname, username, email, password } = req.body;

  console.log('username ------>', username);
  console.log('fullname ------>', fullname);
  console.log('email ------>', email);
  console.log('password----->', password);
  db.query('INSERT INTO questions (fullname,username,email,password, createdAt) VALUES ($1, $2, $3, $4.$5)', [fullname, username, email, password, new Date()])
    .then(function () {
      res.status(200)
        .send({
          status: 'success',
          message: 'users created'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

export function SignIn(req, res, next) {

};