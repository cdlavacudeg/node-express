const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT_DB | 5438,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
