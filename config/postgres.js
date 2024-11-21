const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER, // Replace with your DB username
  host: process.env.DB_HOST, // Replace with your DB host
  database: process.env.DB_NAME, // Replace with your database name
  password: process.env.DB_PASSWORD, // Replace with your DB password
  port: 5432, // Replace with your DB port
});

module.exports= { pool };
