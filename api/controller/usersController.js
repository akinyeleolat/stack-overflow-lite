import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db/index';
import * as valid from '../auth/validate';

// users model

export function SignUp(req, res) {
  // define input
  const {
    fullname, username, email, password,
  } = req.body;
  console.log('username ------>', username);
  console.log('fullname ------>', fullname);
  console.log('email ------>', email);
  console.log('userpassword----->', password);
  console.log('createdAt------->', new Date());
  // validate
  if (!valid.validEmail(email)) {
    res.json({ message: 'Enter Valid Email' });
    return;
  }
  // check email exist
  console.log('We re about to query select');
  db.any('SELECT * FROM users WHERE email = $1', [email])
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'users email already exist',
        });
      }
      console.log('We re about to end query select');

      // hash password
      const userpassword = bcrypt.hashSync(password, 10);
      console.log('This is our hashed password', userpassword)
      // console.log('userpassword----->', password);

      db.query('INSERT INTO users (fullname,username,email,userpassword, createdat) VALUES ($1, $2, $3, $4, $5)', [fullname, username, email, userpassword, new Date()])
        .then(() => {
          return res.status(200)
            .send({
              status: 'success',
              message: 'users created',
            });
        })
        .catch((error) => {
          return res.status(500).json({
            status: 'Signup error',
            message: error.message,
          })
        });
    })
    .catch((error) => {
      return res.status(500).json({
        status: 'Signup error',
        message: error.message,
      })
    });
}

export const SignIn = (req, res) => {
  // define input
  const {
    username, userpassword,
  } = req.body;

  // check username exist
  db.any('SELECT * FROM users WHERE username = $1', [username])
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: 'Auth failed',
        });
      }
      // compare db hash password with the supplied password

      // console.log(userpassword)
      // console.log(user[0].userpassword)
      // console.log(user);

      const result = bcrypt.compareSync(userpassword, user[0].userpassword);
      //(err, result) => {
      //     if (err) {
      //       return res.status(401).json({
      //         message: 'Auth Failed',
      //       });
      //     }
      console.log(result);
      if (result) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0].id,
        }, process.env.SECRET_KEY,
          {
            expiresIn: '1h',
          });
        //console.log('token---------->', token)
        return res.status(200).json({
          message: 'Auth Successful',
          Token: token,
        });
      }
      return res.status(401).json({
        message: 'Auth Failed',
      });
    })
    .catch(err => res.status(500).json({ error: err }));
}


