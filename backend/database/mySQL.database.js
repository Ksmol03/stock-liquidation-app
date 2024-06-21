import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

// Create a pool of connections to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to query the database
export const queryDatabase = (query, params) => {
  return new Promise((resolve, reject) => {
    pool.execute(query, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}