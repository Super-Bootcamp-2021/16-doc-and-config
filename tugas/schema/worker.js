const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');
const specWorker = require('./worker.yaml');

specWorker.host = 'localhost:7001';

SwaggerUI({
  spec: specWorker,
  dom_id: '#worker'
});