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
  minio: {
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'local-minio',
    secretKey: 'local-test-secret',
  }
};

const config = rc('tm', defaultConfig);

module.exports = {
  config,
};
