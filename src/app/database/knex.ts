module.exports = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  migrations: {
    directory: './migrations',
  },
});
