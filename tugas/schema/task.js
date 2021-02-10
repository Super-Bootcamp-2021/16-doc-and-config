const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');

const specTask = require('./task.yaml');
const { TASK_SERVICE_BASEURL } = require('./config');

specTask.host = TASK_SERVICE_BASEURL;

SwaggerUI({
  spec: specTask,
  dom_id: '#task'
});