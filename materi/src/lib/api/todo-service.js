/** @module todoService */

const { TODO_SERVICE_BASEURL } = require('../config');
const { client } = require('./client');

/**
 * mengambil daftar pekerjaan
 * @returns {Promise<Task[]>} daftar pekerjaan
 */
async function fetchTasksApi() {
  return await client.get(`${TODO_SERVICE_BASEURL}/list`);
}

/**
 * menambahkan pekerjaan baru ke daftar entar
 *
 * @param {TaskData} task data pekerjaan
 * @returns {Promise<Task>} detail pekerjaan yang sudah disimpan
 *
 * @example
 * const addTaskAsync = (task) => async (dispatch) => {
 *   const taskData = await addTaskApi(task);
 *   dispatch(addAction(taskData));
 * };
 */
async function addTaskApi(task) {
  return await client.post(`${TODO_SERVICE_BASEURL}/add`, { task });
}

/**
 * menandakan pekerjaan telah selesai
 * @param {number} id id dari pekerjaan
 * @returns {Promise<Task>} detail pekerjaan yang sudah disimpan
 */
async function doneTaskApi(id) {
  return await client.put(`${TODO_SERVICE_BASEURL}/done?id=${id}`);
}

/**
 * menandakan pekerjaan belum selesai
 * @deprecated jangan pake undone pake `done()`
 * @param {number} id id dari pekerjaan
 * @returns {Promise<Task>} detail pekerjaan yang sudah disimpan
 */
async function undoneTaskApi(id) {
  return await client.put(`${TODO_SERVICE_BASEURL}/undone?id=${id}`);
}

module.exports = {
  fetchTasksApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
};
