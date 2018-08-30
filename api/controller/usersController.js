import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db/index';
import valid from '../middleware/validate';

export const SignUp = (req, res) => {
  const {
    fullname, username, email, password,
  } = req.body;
  console.log('username ------>', username);
  console.log('fullname ------>', fullname);
  console.log('email ------>', email);
  console.log('userpassword----->', password);
  console.log('createdAt------->', new Date());

  if (!valid(email)) {
    res.json({ message: 'Enter Valid Email' });
    return;
  }

  console.log('We re about to query select');
  db.any('SELECT * FROM users WHERE email = $1', [email])
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'users email already exist',
        });
      }
      console.log('We re about to end query select');

      const userpassword = bcrypt.hashSync(password, 10);
      console.log('This is our hashed password', userpassword);


      db.query('INSERT INTO users (fullname,username,email,userpassword, createdat) VALUES ($1, $2, $3, $4, $5)', [fullname, username, email, userpassword, new Date()])
        .then(() => res.status(200)
          .send({
            status: 'success',
            message: 'users created',
          }))
        .catch((error) => res.status(500).json({
          status: 'Signup error',
          message: error.message,
        }));
    })
    .catch((error) => res.status(500).json({
      status: 'Signup error',
      message: error.message,
    }));
};

export const SignIn = (req, res) => {
  const {
    username, userpassword,
  } = req.body;


  db.any('SELECT * FROM users WHERE username = $1', [username])
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: 'Auth failed',
        });
      }

      const result = bcrypt.compareSync(userpassword, user[0].userpassword);
      console.log(result);
      if (result) {
        const token = jwt.sign({
          username: user[0].username,
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
    })
    .catch(err => res.status(500).json({ error: err }));
};
