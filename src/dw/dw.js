const { Pool } = require('pg');
require('dotenv').config();

const dw = new Pool({
    connectionString: process.env.DW_URL
});

module.exports = dw;
