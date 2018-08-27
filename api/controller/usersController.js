import bcrypt from 'bcrypt';
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
        else{

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

      }
    });
  }
  
export function SignIn(req, res) {

}
