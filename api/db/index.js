import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let connectionString;

connectionString = process.env.DATABASE_URL;

console.log(connectionString);


const db = new Pool({ connectionString, ssl: true });

db.connect().then(() => {
  console.log(' succefully connected to postgresDB');
}).catch((err) => {
  console.log(err.message);
});
export default db;