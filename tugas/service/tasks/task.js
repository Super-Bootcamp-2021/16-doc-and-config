/** @module task */

const { getConnection } = require('typeorm');
const workerClient = require('./worker.client');
const bus = require('../lib/bus');

const ERROR_TASK_DATA_INVALID = 'data pekerjaan baru tidak lengkap';
const ERROR_TASK_NOT_FOUND = 'pekerjaan tidak ditemukan';
const ERROR_TASK_ALREADY_DONE = 'pekerjaan sudah selesai';

/**
 * tambah pekerjaan baru
 * @param {TaskData} data detail pekerjaan
 * @returns {Promise<Task>} detail pekerjaan baru dengan id dan pekerjanya
 * @throws {string} saat data tidak lengkap atau pekerjaan tidak ditemukan
 * @throws {string} saat pekerjaan tidak ditemukan
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
 * mengubah status pekerjaan menjadi selesai
 * @param {number} id id dari pekerjaan yang sudah selesai
 * @returns {Promise<Task>} detail pekerjaan yang sudah selesai
 * @throws {string} saat pekerjaan tidak ditemukan atau pekerjaan sudah dibatalkan
 * @throws {string} saat pekerjaan memang sudah selesai
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
 * mengubah status pekerjaan yang akan dibatalkan
 * @param {number} id id dari pekerjaan yang mau dibatalkan
 * @return {Promise<Task>} detail pekerjaan yang sudah dibatalkan
 * @throws {string} jika pekerjaan tidak ditemukan atau memang sudah batal
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
 * mendapatkan daftar pekerjaan yang ada
 * @returns {Promise<Task[]>} daftar pekerjaan
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
