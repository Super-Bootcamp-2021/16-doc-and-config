const rc = require('rc');

const defaultConfig = {
  pg_database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'database',
  },
  minio_database: {
    endPoint: '192.168.0.8',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  },
  server: {
    taskPort: 7002,
    workerPort: 7001,
  },
};

const config = rc('tm', defaultConfig);

module.exports = {
  config,
};
