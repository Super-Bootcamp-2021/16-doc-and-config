const rc = require('rc');

const defaultConfig = {
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'database'
  },
  server: {
    workerPort: 7001,
    taskPort: 7002,
    performancePort: 7003,
  },
};

const config = rc('tm', defaultConfig);

module.exports = {
  config,
};
