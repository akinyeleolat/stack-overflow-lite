
DROP TABLE IF EXISTS Questions
CASCADE;

DROP TABLE IF EXISTS Users
CASCADE;

DROP TABLE
IF EXISTS Answers
CASCADE;

CREATE TABLE
IF NOT EXISTS users
(
  
    id SERIAL PRIMARY KEY,
  
    fullname VARCHAR
(150) NOT NULL,
  
    username VARCHAR
(100) UNIQUE NOT NULL,
  
    email VARCHAR
(255) UNIQUE NOT NULL,
  
    userpassword VARCHAR
(255) NOT NULL,
  
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP


  );


CREATE TABLE
IF NOT EXISTS Questions
(

    id SERIAL PRIMARY KEY,
  
    title VARCHAR
(255) UNIQUE NOT NULL,
  
    details TEXT NOT NULL,
  
    userId int REFERENCES users
(id),
  
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP 


     );

CREATE TABLE
IF NOT EXISTS Answers
(

    id SERIAL PRIMARY KEY,
  
    Answer TEXT NOT NULL,

   QuestionId int REFERENCES Questions
(id),
  
    userId int REFERENCES users
(id),

    status VARCHAR
(50) NOT NULL,

    date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP 

     );