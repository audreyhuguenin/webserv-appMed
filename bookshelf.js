require('dotenv/config');

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host     : process.env.DATABASE_HOST,
      port     : 3337,
      user     : process.env.DATABASE_USER,
      password : process.env.DATABASE_PSWD,
      database : process.env.DATABASE_NAME,
      charset  : 'utf8',
    }
  });

  module.exports = require('bookshelf')(knex);
