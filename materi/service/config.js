const rc = require('rc');

const defaultConfig = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'sanbercode1',
  },
  server: {
    port: 9999,
  },
};

const config = rc('todo', defaultConfig);

module.exports = {
  config,
};
