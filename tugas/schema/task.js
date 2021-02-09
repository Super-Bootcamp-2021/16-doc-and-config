const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');

const specTask = require('./task.yaml');

specTask.host = 'localhost:7002';

SwaggerUI({
  spec: specTask,
  dom_id: '#task'
});