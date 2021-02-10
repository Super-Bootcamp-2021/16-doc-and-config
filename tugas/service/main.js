const orm = require('./lib/orm');
const storage = require('./lib/storage');
const kv = require('./lib/kv');
const bus = require('./lib/bus');
const { TaskSchema } = require('./tasks/task.model');
const { WorkerSchema } = require('./worker/worker.model');
const { config } = require('./config');
const workerServer = require('./worker/server');
const tasksServer = require('./tasks/server');
const performanceServer = require('./performance/server');

async function init() {
  try {
    console.log('connect to database');
    await orm.connect([WorkerSchema, TaskSchema], {
      type: config.database.type,
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
    });
    console.log('database connected');
  } catch (err) {
    console.error('database connection failed');
    process.exit(1);
  }
  try {
    console.log('connect to object storage');
    await storage.connect('task-manager', {
      endPoint: config.objectStorage.endPoint,
      port: config.objectStorage.port,
      useSSL: config.objectStorage.useSSL,
      accessKey: config.objectStorage.accessKey,
      secretKey: config.objectStorage.secretKey,
    });
    console.log('object storage connected');
  } catch (err) {
    console.error('object storage connection failed');
    process.exit(1);
  }
  try {
    console.log('connect to message bus');
    await bus.connect();
    console.log('message bus connected');
  } catch (err) {
    console.error('message bus connection failed');
    process.exit(1);
  }
  try {
    console.log('connect to key value store');
    await kv.connect();
    console.log('key value store connected');
  } catch (err) {
    console.error('key value store connection failed');
    process.exit(1);
  }
}

async function onStop() {
  bus.close();
  kv.close();
}

async function main(command) {
  switch (command) {
    case 'performance':
      await init();
      performanceServer.run(onStop);
      break;
    case 'task':
      await init();
      tasksServer.run(onStop);
      break;
    case 'worker':
      await init();
      workerServer.run(onStop);
      break;
    default:
      console.log(`${command} tidak dikenali`);
      console.log('command yang valid: task, worker, performance');
  }
}

main(process.argv[2]);
