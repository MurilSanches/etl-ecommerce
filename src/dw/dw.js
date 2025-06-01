const { Pool } = require('pg');
require('dotenv').config();

const dw = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DW_DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = dw;
