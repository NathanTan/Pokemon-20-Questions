/*
 *  * Reusable MySQL connection pool for making queries throughout the rest of
 *   * the app.
 *    */

const { createPool } = require('mysql');

console.log("Creating pool")


const mysqlPool = createPool({
        host: 'cs340.engr.oregonstate.edu',
        port: process.env.MYSQL_PORT || 3306,
        database: 'cs340_tann',
        user: 'cs340_tann',
        password: 
})

console.log(mysqlPool)


module.exports = mysqlPool
