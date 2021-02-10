const rc = require('rc');

const defaultConfig = {
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'sanbercode2',
  },
  objectStorage: {
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  },
  server: {
    portWorker: 7001,
    portTask: 7002,
    portPerformance: 7003,
  },
  host: {
    worker: 'http://localhost:7001',
  },
};

const config = rc('tm', defaultConfig);

module.exports = {
  config,
};
