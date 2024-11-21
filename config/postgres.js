const { Pool } = require('pg');

// Environment variables
const connectionString = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';

// PostgreSQL pool configuration
const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false, 
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database', err.stack);
    throw err;
  }
  console.log('Connected to PostgreSQL database');
});

module.exports = { pool };
