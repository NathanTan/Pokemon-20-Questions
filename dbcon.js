var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_tann',
  password        : '{last 4 digits of your student id}',
  database        : 'cs340_tann'
});

module.exports.pool = pool;
