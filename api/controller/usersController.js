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
    res.json({
      status: 'Email',
      message: 'Enter Valid Email',
    });
    return;
  }
  if ((!username) || (!fullname) || (!password)) {
    res.json({
      status: 'Blank Data',
      message: 'Users\' data cannot be blank'
    });
    return;
  }
  db.any('SELECT * FROM users WHERE email = $1', [email])
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          status: 'success',
          message: 'users already exist',
        });
      }

      const userpassword = bcrypt.hashSync(password, 10);

      db.query('INSERT INTO users (fullname,username,email,userpassword, createdat) VALUES ($1, $2, $3, $4, $5) RETURNING id', [fullname, username, email, userpassword, new Date()])
        .then((id) => {

          const token = jwt.sign({
            username,
            id,
          }, process.env.SECRET_KEY,
            {
              expiresIn: '1h',
            });
          res.status(200)
            .send({
              status: 'success',
              fullname,
              username,
              email,
              token,
              message: 'user created',
            })
        })
        .catch(error => res.status(500).json({
          status: 'Signup error',
          message: error.message,
        }));
    })
    .catch(error => res.status(500).json({
      status: 'Signup error',
      message: error.message,
    }));
};

export const SignIn = (req, res) => {

  const {
    username, userpassword,
  } = req.body;

  if ((!username) || (!userpassword)) {
    res.json({
      status: 'Blank Data',
      message: 'Users\' data cannot be blank'
    });
    return;
  }

  db.any('SELECT * FROM users WHERE username = $1', [username])
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          status: 'success',
          message: 'Auth failed',
        });
      }

      const result = bcrypt.compareSync(userpassword, user[0].userpassword);
      if (result) {
        const token = jwt.sign({
          username: user[0].username,
          userId: user[0].id,
        }, process.env.SECRET_KEY,
          {
            expiresIn: '1h',
          });

        return res.status(200).json({
          status: 'success',
          user,
          message: 'Auth Successful',
          Token: token,
        });
      }
      return res.status(401).json({
        status: 'failed',
        message: 'Auth Failed',
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};
