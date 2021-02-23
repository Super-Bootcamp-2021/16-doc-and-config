/** @module performance_agg */

const bus = require('../lib/bus');
const {
  increaseTotalTask,
  increaseDoneTask,
  increaseCancelledTask,
  increaseTotalWorker,
  decreaseTotalWorker,
} = require('./performance');

let increaseTotalTaskSub;
let increaseDoneTaskSub;
let increaseCancelledTaskSub;
let increaseTotalWorkerSub;
let decreaseTotalWorkerSub;

/**
 * Run NATS Subscribe Service of Performance to listen topic
 */
function run() {
  increaseTotalTaskSub = bus.subscribe('task.added', increaseTotalTask);
  increaseDoneTaskSub = bus.subscribe('task.done', increaseDoneTask);
  increaseCancelledTaskSub = bus.subscribe(
    'task.cancelled',
    increaseCancelledTask
  );
  increaseTotalWorkerSub = bus.subscribe(
    'worker.registered',
    increaseTotalWorker
  );
  decreaseTotalWorkerSub = bus.subscribe('worker.removed', decreaseTotalWorker);
}

/**
 * Stop NATS Subscribe Service of Performance to unsubscribe topic
 */
function stop() {
  if (increaseTotalTaskSub) {
    bus.unsubscribe(increaseTotalTaskSub);
  }
  if (increaseDoneTaskSub) {
    bus.unsubscribe(increaseDoneTaskSub);
  }
  if (increaseCancelledTaskSub) {
    bus.unsubscribe(increaseCancelledTaskSub);
  }
  if (increaseTotalWorkerSub) {
    bus.unsubscribe(increaseTotalWorkerSub);
  }
  if (decreaseTotalWorkerSub) {
    bus.unsubscribe(decreaseTotalWorkerSub);
  }
}

module.exports = {
  run,
  stop,
};
