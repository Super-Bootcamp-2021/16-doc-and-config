const rc = require('rc');

const defaultConfig = {
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'database',
  },
  minio: {
    endPoint: '127.0.0.1',
    port: 9000,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  },
  server: {
    port: {
      worker: 10,
      task: 20,
      performance: 30,
    },
  },
};

const config = rc('server', defaultConfig);

module.exports = {
  config,
};
