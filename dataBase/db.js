const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgre",
    database: 'todos_database',
    host:'localhost',
    port:5432
});

module.exports = pool;