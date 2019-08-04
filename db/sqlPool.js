/*
 *  * Reusable MySQL connection pool for making queries throughout the rest of
 *   * the app.
 *    */

const { createPool } = require('mysql');

const mysqlPool = createPool({
        host: 'classmysql.engr.oregonstate.edu',
        port: process.env.MYSQL_PORT || 3306,
        database: 'cs340_tann',
        user: 'cs340_tann',
        password:
})

module.exports.pool = mysqlPool
