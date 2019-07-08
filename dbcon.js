var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_{onid username}',
  password        : '{last 4 digits of your student id}',
  database        : 'cs340_{onid username}'
});

module.exports.pool = pool;
