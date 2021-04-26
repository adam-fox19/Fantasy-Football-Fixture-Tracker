// ----------------------------------------------------------
// queries.js
//
//
// ----------------------------------------------------------

// npm packages

const Pool = require('pg').Pool


require('dotenv').config();


// db config
const pool = new Pool({
  user: process.env.DBUSER,
  host: 'localhost',
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: 5432,
})


// get users test

const get_users = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows);
  })
};

module.exports = { get_users }
