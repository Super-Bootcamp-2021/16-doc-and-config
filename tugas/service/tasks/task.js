/** @module Service_Task */

const { getConnection } = require('typeorm');
const workerClient = require('./worker.client');
const bus = require('../lib/bus');

const ERROR_TASK_DATA_INVALID = 'data pekerjaan baru tidak lengkap';
const ERROR_TASK_NOT_FOUND = 'pekerjaan tidak ditemukan';
const ERROR_TASK_ALREADY_DONE = 'pekerjaan sudah selesai';

/**
 * add new task
 * @param {TaskData} data todo detail
 * @returns {Promise<Task>} new todo detail with id
 * @throws {string} when data not contain jab & assigneedId property
 * @throws {string} when task not found in database
 */
async function add(data) {
  if (!data.job || !data.assigneeId) {
    throw ERROR_TASK_DATA_INVALID;
  }
  await workerClient.info(data.assigneeId);
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
 * @param {string} id id task
 * @returns {Promise<TaskDone>} set task to done with id
 * @throws {string} when task not found in database
 * @throws {string} when task is already done
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
 * set task to cancel
 * @param {string} id id task
 * @returns {Promise<TaskCancel>} set task to done with id
 * @throws {string} when task not found in database
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
 * get list of todo
 * @returns {Promise<Task[]>} list of task to do
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
