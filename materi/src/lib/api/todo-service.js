/** @module todoService */

const { client } = require('./client');

/**
 * Task type definition
 * @typedef {Object} Task
 * @property {string} id id of a task
 * @property {string} task task description
 * @property {boolean} done true when task are finished
 */

/**
 * TaskData type definition
 * @typedef {Object} TaskData
 * @property {string} task task description
 */

/**
 * mengambil daftar pekerjaan
 * @returns {Promise<Task[]>} daftar pekerjaan
 */
async function fetchTasksApi() {
  return await client.get('http://localhost:9999/list');
}

/**
 * menambahkan pekerjaan baru
 * @param {TaskData} task data pekerjaan
 * @returns {Promise<Task>} detail pekerjaan yang sudah disimpan
 */
async function addTaskApi(task) {
  return await client.post('http://localhost:9999/add', { task });
}

/**
 * menandakan pekerjaan telah selesai
 * @param {number} id id dari pekerjaan
 * @returns {Promise<Task>} detail pekerjaan yang sudah disimpan
 */
async function doneTaskApi(id) {
  return await client.put(`http://localhost:9999/done?id=${id}`);
}

/**
 * menandakan pekerjaan belum selesai
 * @param {number} id id dari pekerjaan
 * @returns {Promise<Task>} detail pekerjaan yang sudah disimpan
 */
async function undoneTaskApi(id) {
  return await client.put(`http://localhost:9999/undone?id=${id}`);
}

module.exports = {
  fetchTasksApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
};
