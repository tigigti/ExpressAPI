// Connect to MySQL

const config = require("./utils/config");
const mysql = require("mysql");

const con = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
});

module.exports = con;
