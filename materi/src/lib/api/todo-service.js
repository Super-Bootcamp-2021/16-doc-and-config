/** @module todoService */

const { client } = require('./client');

/**
 * mengambil daftar pekerjaan
 * @returns {Promise<Task[]>} daftar pekerjaan
 */
async function fetchTasksApi() {
  return await client.get('http://localhost:9999/list');
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
 * @deprecated jangan pake undone pake `done()`
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
