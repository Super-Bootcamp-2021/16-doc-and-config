const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');
const specWorker = require('./worker.yaml');

const { WORKER_SERVICE_BASEURL } = require('./config');

specWorker.host = WORKER_SERVICE_BASEURL;

SwaggerUI({
  spec: specWorker,
  dom_id: '#worker'
});