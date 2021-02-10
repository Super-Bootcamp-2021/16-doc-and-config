const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');

const specPerformance = require('./performance.yaml');
const { PERFORMANCE_SERVICE_BASEURL } = require('./config');

specPerformance.host = PERFORMANCE_SERVICE_BASEURL;

SwaggerUI({
  spec: specPerformance,
  dom_id: '#performance'
});