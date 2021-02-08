const orm = require('./lib/orm');
const storage = require('./lib/storage');
const { TaskSchema } = require('./tasks/task.model');
const { WorkerSchema } = require('./worker/worker.model');
const workerServer = require('./worker/server');

async function init() {
  try {
    console.log('connect to database');
    await orm.connect([WorkerSchema, TaskSchema], {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sanbercode2',
    });
    console.log('database connected');
  } catch (err) {
    console.error('database connection failed');
    return;
  }
  try {
    console.log('connect to object storage');
    storage.connect('task-manager');
    console.log('object storage connected');
  } catch (err) {
    console.error('object storage connection failed');
    return;
  }
}

async function main(command) {
  switch (command) {
    case 'performance':
      // TODO: implement performance service
      break;
    case 'task':
      // TODO: implement task service
      break;
    case 'worker':
      await init();
      workerServer.run();
      break;
    default:
      console.log(`${command} tidak dikenali`);
      console.log('command yang valid: task, worker, performance');
  }
}

main(process.argv[2]);
