// import database from '../config/databaseSqlite.js'
// import knex from 'knex'

const options = require('../config/databaseSqlite');
const knexSqlite = require('knex')(options);

// exporto el objeto para usarlo en otros modulos
module.exports = knexSqlite;
//export default knexSqlite