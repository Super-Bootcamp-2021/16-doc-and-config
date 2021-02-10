const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');
const spec = require('./performance.yaml');

spec.host = 'localhost:9030';

SwaggerUI({
  spec,
  dom_id: '#swagger',
});
