/**@module Webapp_TaskClient */

const { client } = require('../lib/http-client');

const { TASK_SERVICE_BASEURL } = require('./config');

/**
 * menambahkan pekerjaan baru
 *
 * @param {TaskData} task data pekerjaan baru
 * @returns {Promise<Task>} detail pekerjaan yang sudah disimpan
 *
 * @example
 * exports.add = (data) => async (dispatch) => {
 *  dispatch(loadingAction());
 *  try {
 *    const task = await taskSvc.add(data);
 *    dispatch(addedAction(task));
 *  } catch (err) {
 *    dispatch(errorAction(`gagal menambahkan ${data.job}`));
 *  }
 * };
 */
function add(data) {
  return client.post(`${TASK_SERVICE_BASEURL}/add`, data);
}

/**
 * mengambil keseluruhan task yang ada
 * @returns {Promise<Task[]>} daftar task
 *
 * @example
 * exports.getList = async (dispatch) => {
 *  dispatch(loadingAction());
 *  try {
 *    const tasks = await taskSvc.list();
 *    dispatch(tasksLoadedAction(tasks));
 *  } catch (err) {
 *    dispatch(errorAction('gagal memuat daftar pekerjaan'));
 *  }
 * };
 */
function list() {
  return client.get(`${TASK_SERVICE_BASEURL}/list`);
}

/**
 * menandakan pekerjaan telah selesai
 * @param {number} id id dari pekerjaan
 * @returns {Promise<TaskCancel>} detail pekerjaan yang sudah disimpan
 *
 * @example
 * exports.cancel = (id) => async (dispatch) => {
 *  dispatch(loadingAction());
 *  try {
 *    await taskSvc.cancel(id);
 *    dispatch(canceledAction(id));
 *  } catch (err) {
 *    dispatch(errorAction('gagal membatalkan pekerjaan'));
 *  }
 * };
 */
function cancel(id) {
  return client.put(`${TASK_SERVICE_BASEURL}/cancel?id=${id}`);
}

/**
 * menandakan pekerjaan telah selesai
 * @param {number} id id dari pekerjaan
 * @returns {Promise<TaskDone>} detail pekerjaan yang sudah disimpan
 *
 * @example
 * exports.done = (id) => async (dispatch) => {
 *  dispatch(loadingAction());
 *  try {
 *    await taskSvc.done(id);
 *    dispatch(doneAction(id));
 *  } catch (err) {
 *    dispatch(errorAction('gagal menyelesaikan pekerjaan'));
 *  }
 * };
 */
function done(id) {
  return client.put(`${TASK_SERVICE_BASEURL}/done?id=${id}`);
}

module.exports = {
  add,
  list,
  cancel,
  done,
};
