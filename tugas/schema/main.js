const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');
const performance = require('./performance.yaml');
const task = require('./task.yaml');
const worker = require('./worker.yaml');

worker.host = 'localhost:7001';
task.host = 'localhost:7002';
performance.host = 'localhost:7003';

SwaggerUI({
  spec: task,
  dom_id: '#task',
});
SwaggerUI({
  spec: worker,
  dom_id: '#worker',
});
SwaggerUI({
  spec: performance,
  dom_id: '#performance',
});
