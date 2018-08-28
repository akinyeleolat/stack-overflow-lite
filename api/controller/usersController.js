import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/index';
import * as valid from '../auth/validate';

// users model

export function SignUp(req, res) {
  // define input
  const {
    fullname, username, email, userpassword,
  } = req.body;
  // validate
  if (!valid.validEmail(email)) {
    res.json({ message: 'Enter Valid Email' });
    return;
  }
  // check email exist
  db.query('select * from users where email = $1', email)
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'users email already exist',
        });
      }


      // hash password
      const password = bcrypt.hash(userpassword, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        return hash;
      });

      console.log('username ------>', username);
      console.log('fullname ------>', fullname);
      console.log('email ------>', email);
      console.log('userpassword----->', password);
      console.log('createdAt------->', new Date());

      db.query('INSERT INTO users (fullname,username,email,userpassword, createdAt) VALUES ($1, $2, $3, $4.$5)', [fullname, username, email, password, new Date()])
        .then(() => {
          res.status(200)
            .send({
              status: 'success',
              message: 'users created',
            });
        })
        .catch(err => res.status(500).json({ error: err }));


    });
}

export function SignIn(req, res) {
  // define input
  const {
    username, userpassword,
  } = req.body;

  // check username exist
  db.query('select * from users where username = $1', username)
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: 'Auth failed',
        });
      }
      // compare db hash password with the supplied password
      bcrypt.hashcompare(userpassword, user[0].userpassword, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth Failed',
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0].id,
          }, process.env.SECRET_KEY,
            {
              expiresIn: '1h',
            });
          return res.status(200).json({
            message: 'Auth Successful',
            Token: token,
          });
        }
        return res.status(401).json({
          message: 'Auth Failed',
        });
      });

      console.log('username ------>', username);
      console.log('userpassword----->', userpassword);
      console.log('Retrieved password----->', user[0].id);
      console.log('Retrieved email----->', user[0].email);
      console.log('Retrieved password----->', user[0].userpassword);
    })
    .catch(err => res.status(500).json({ error: err }));
}
