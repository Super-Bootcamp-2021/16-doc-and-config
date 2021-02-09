const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');
const spec = require('./todo.yaml');

spec.host = 'localhost:9999';

SwaggerUI({
  spec,
  dom_id: '#swagger',
});
