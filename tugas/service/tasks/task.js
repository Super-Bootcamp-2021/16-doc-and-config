/** @module task */
const { getConnection } = require('typeorm');
// eslint-disable-next-line no-unused-vars
const { Task } = require('./task.model');
const workerClient = require('./worker.client');
const bus = require('../lib/bus');

const ERROR_TASK_DATA_INVALID = 'data pekerjaan baru tidak lengkap';
const ERROR_TASK_NOT_FOUND = 'pekerjaan tidak ditemukan';
const ERROR_TASK_ALREADY_DONE = 'pekerjaan sudah selesai';

/**
 * Menambahkan data pekerjaan baru
 * @async
 * @param {TaskData} data data-data mengenai pekerjaan
 * @returns {Promise<Task>} detail pekerjaan baru dengan id
 * @throws {string} ketika pekerjaan tidak ditemukan
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
 * Mengubah status pekerjaan menjadi diselesaikan
 * @async
 * @param {number} id id dari pekerjaan
 * @returns {Promise<Task>} pekerjaan yang telah diselesaikan
 * @throws {string} ketika pekerjaan tidak ditemukan
 * @throws {string} ketika pekerjaan sudah diselesaikan
 */
async function done(id) {
  const taskRepo = getConnection().getRepository('Task');
  const task = await taskRepo.findOne(id, { relations: ['assignee'] });
  if (!task || task.cancelled) {
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
 * Mengubah status pekerjaan menjadi dibatalkan
 * @async
 * @param {number} id id dari pekerjaan
 * @returns {Promise<Task>} pekerjaan yang telah dibatalkan
 * @throws {string} ketika pekerjaan tidak ditemukan
 */
async function cancel(id) {
  const taskRepo = getConnection().getRepository('Task');
  const task = await taskRepo.findOne(id, { relations: ['assignee'] });
  if (!task || task.cancelled) {
    throw ERROR_TASK_NOT_FOUND;
  }
  task.cancelled = true;
  await taskRepo.save(task);
  bus.publish('task.cancelled', task);
  return task;
}

/**
 * Mendapatkan data semua pekerjaan
 * @returns {Promise<Task[]>} kumpulan data pekerjaan
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
