const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');
const workerPerformance = require('./worker.yaml');
const taskPerformance = require('./task.yaml');
const specPerformance = require('./performance.yaml');

workerPerformance.host = 'localhost:7001';
taskPerformance.host = 'localhost:7002';
specPerformance.host = 'localhost:7003';


SwaggerUI({
  spec: workerPerformance,
  dom_id: '#swagger1',
});

SwaggerUI({
  spec: taskPerformance,
  dom_id: '#swagger2',
});

SwaggerUI({
  spec: specPerformance,
  dom_id: '#swagger3',
});
