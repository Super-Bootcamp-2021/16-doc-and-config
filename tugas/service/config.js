const rc = require('rc');

const defaultConfig = {
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'database',
  },
  server: {
    task_port: 80,
    worker_port: 81,
    performance_port: 82,
  },
  minio: {
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'local-minio',
    secretKey: 'local-test-secret',
  },
};

const config = rc('tm', defaultConfig);

module.exports = {
  config,
};
