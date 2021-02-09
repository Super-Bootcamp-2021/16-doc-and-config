const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');
const taskSpec = require('./task.yaml');

taskSpec.host = 'localhost:7002';

SwaggerUI({
  taskSpec,
  dom_id: '#task',
});
