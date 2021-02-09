const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');

async function main(command) {
  switch (command) {
    case 'performance':
      const spec = require('./performance.yaml');
			spec.host = 'localhost:7003';
			break;
    case 'task':
      const spec = require('./task.yaml');
			spec.host = 'localhost:7002';
			break;
    case 'worker':
      const spec = require('./worker.yaml');
			spec.host = 'localhost:7001';
			break;
    default:
      console.log(`${command} tidak dikenali`);
      console.log('command yang valid: task, worker, performance');
			return;
  }
	SwaggerUI({
		spec,
		dom_id: '#swagger',
	});
}

main(process.argv[2]);
