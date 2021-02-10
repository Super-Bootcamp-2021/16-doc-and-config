/** @module task */

const { getConnection } = require('typeorm');
const workerClient = require('./worker.client');
const bus = require('../lib/bus');

const ERROR_TASK_DATA_INVALID = 'data pekerjaan baru tidak lengkap';
const ERROR_TASK_NOT_FOUND = 'pekerjaan tidak ditemukan';
const ERROR_TASK_ALREADY_DONE = 'pekerjaan sudah selesai';

/**
 * function to add task data
 * 
 * @param {object} data 
 * @throws Will throw Error if no data.job or data.assigneeId
 * @throws Will throw Error if task not found in repository
 * @returns {object} task
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
 * function to mark task as done (by id)
 * 
 * @param {number} id task's ID
 * @throws Will throw Error if task not found in repository
 * @throws Will throw Error if task already done
 * @returns {object} task
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
 * function to cancel task (by id)
 * @param {number} id
 * @throws Will throw Error if task not found in repository
 * @returns {object} task
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
 * function to view list of tasks
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
