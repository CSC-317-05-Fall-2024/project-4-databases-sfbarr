

/* Establish the DB connection pool here. */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const config = {
    connectionString: process.env.CONNECTION_STRING
};
console.log(`\nConnecting to railway (from database.js)`);
console.log(config.connectionString + `\n`);
export const pool = new pg.Pool(config);

pool.query('SELECT NOW()', 
    
    (err, res) => {
        if (err) {
            console.error('Connection error:', err.stack);
        } else {
            console.log('Connected to database, time:', res.rows[0].now);
        }
    }
);