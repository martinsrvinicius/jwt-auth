const knex = require('knex')({
    client: 'mysql2',
    version: '8.19.2',
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      decimalNumbers: true
    }
  });
  
  const { attachPaginate } = require('knex-paginate');
  attachPaginate();
  
  module.exports = knex;
  