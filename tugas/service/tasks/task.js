const { getConnection } = require('typeorm');
const workerClient = require('./worker.client');

const ERROR_TASK_DATA_INVALID = 'data pekerjaan baru tidak lengkap';
const ERROR_TASK_NOT_FOUND = 'pekerjaan tidak ditemukan';

async function add(data) {
  if (!data.job || !data.asigneeId) {
    throw ERROR_TASK_DATA_INVALID;
  }
  await workerClient.info(data.asigneeId);
  const taskRepo = getConnection().getRepository('Task');
  const task = await taskRepo.save({
    job: data.job,
    assignee: { id: data.asigneeId },
  });
  return task;
}

async function done(id) {
  const taskRepo = getConnection().getRepository('Task');
  const task = await taskRepo.findOne(id);
  if (!task) {
    throw ERROR_TASK_NOT_FOUND;
  }
  task.done = true;
  await taskRepo.save(task);
  return task;
}

async function cancel(id) {
  const taskRepo = getConnection().getRepository('Task');
  const task = await taskRepo.findOne(id);
  if (!task) {
    throw ERROR_TASK_NOT_FOUND;
  }
  task.cancelled = true;
  await taskRepo.save(task);
  return task;
}

function list() {
  const taskRepo = getConnection().getRepository('Task');
  return taskRepo.find();
}

module.exports = {
  add,
  done,
  cancel,
  list,
  ERROR_TASK_DATA_INVALID,
  ERROR_TASK_NOT_FOUND,
};
