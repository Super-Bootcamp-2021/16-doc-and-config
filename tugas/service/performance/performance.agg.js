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
 * function to subscribe all message from message bus
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
 * stop subcription from all message bus
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
