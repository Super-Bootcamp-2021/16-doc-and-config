/** @module Task */

const { getConnection } = require('typeorm');
const workerClient = require('./worker.client');
const bus = require('../lib/bus');

const ERROR_TASK_DATA_INVALID = 'data pekerjaan baru tidak lengkap';
const ERROR_TASK_NOT_FOUND = 'pekerjaan tidak ditemukan';
const ERROR_TASK_ALREADY_DONE = 'pekerjaan sudah selesai';

/**
 * add new Task
 * @param {TaskData} data task detail
 * @returns {Promise<Task>} new Task detail with id
 * @throws {string} when data invalid
 * @throws {string} when data not found in database
 */
async function add(data) {
  if (!data.job || !data.assigneeId) {
    throw ERROR_TASK_DATA_INVALID;
  }
  await workerClient.info(data.asigneeId);
  const taskRepo = getConnection().getRepository('Task');
  const newTask = await taskRepo.save({
    job: data.job,
    assignee: { id: data.assigneeId },
    attachment: data.attachment,
  });
  const task = await taskRepo.findOne(newTask.id, { relations: ['assignee'] });
  if (!task) {
    throw ERROR_TASK_NOT_FOUND;
  }
  bus.publish('task.added', task);
  return task;
}

/**
 * set task to done
 * @param {string} id task id
 * @returns {Promise<Task>} set task to done with id
 * @throws {string} when Task not found in database
 * @throws {string} when Task already done
 */
async function done(id) {
  const taskRepo = getConnection().getRepository('Task');
  const task = await taskRepo.findOne(id, { relations: ['assignee'] });
  if (!task || task?.cancelled) {
    throw ERROR_TASK_NOT_FOUND;
  }
  if (task.done) {
    throw ERROR_TASK_ALREADY_DONE;
  }
  task.done = true;
  await taskRepo.save(task);
  bus.publish('task.done', task);
  return task;
}

/**
 * set task to cancel / undone
 * @param {string} id  task id
 * @returns {Promise<Task>} set task to cancel/undone with id
 * @throws {string} when Task not found in database
 */
async function cancel(id) {
  const taskRepo = getConnection().getRepository('Task');
  const task = await taskRepo.findOne(id, { relations: ['assignee'] });
  if (!task || task?.cancelled) {
    throw ERROR_TASK_NOT_FOUND;
  }
  task.cancelled = true;
  await taskRepo.save(task);
  bus.publish('task.cancelled', task);
  return task;
}

/**
 * get list of Task
 * @returns {Promise<Tas[]>} list of task
 */
function list() {
  const taskRepo = getConnection().getRepository('Task');
  return taskRepo.find({ relations: ['assignee'] });
}

module.exports = {
  add,
  done,
  cancel,
  list,
  ERROR_TASK_DATA_INVALID,
  ERROR_TASK_NOT_FOUND,
};
