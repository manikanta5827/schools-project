const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

pool.connect((err) => {
  if (err) throw err;
  console.log('Connected to PostgreSQL database');
});

module.exports = { pool };
