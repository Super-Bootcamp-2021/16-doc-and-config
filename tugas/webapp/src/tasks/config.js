exports.SERVICE_BASEURL =
  process.env.TASK_SERVICE_BASEURL || 'http://localhost:7002';

exports.WORKER_SERVICE_BASEURL =
  process.env.WORKER_SERVICE_BASEURL || 'http://localhost:7001';
