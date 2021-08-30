//import database from '../config/databaseMariadb.js'
//import knex from 'knex'
const options = require('../config/databaseMariadb');
const knex = require('knex')(options);

//const options = database
//const knexMariadb = knex(options);

// exporto el objeto para usarlo en otros modulos
module.exports = knex;
//export default knexMariadb