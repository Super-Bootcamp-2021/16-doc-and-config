const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');
const specTask = require('./task.yaml');
const specWorker = require('./worker.yaml');
const specPeformance = require('./peformance.yaml');

spec.host = 'localhost:9999';

SwaggerUI({
  specTask,
  dom_id: '#swagger1',
});

SwaggerUI({
  specWorker,
  dom_id: '#swagger2',
});

SwaggerUI({
  specPeformance,
  dom_id: '#swagger3',
});
