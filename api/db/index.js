import pg from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();
// const connectionString;

const connectionString = process.env.DATABASE_URL;

console.log(connectionString);

const pgp = pg();

export const db = pgp(connectionString);
if (db) {
  console.log('database connected');
}

// export default db;
