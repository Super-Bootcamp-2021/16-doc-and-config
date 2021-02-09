/**@module Webapp_WorkerClient-InTasks */
const { client } = require('../lib/http-client');

const { WORKER_SERVICE_BASEURL } = require('./config');

/**
 * mengambil keseluruhan pekerja yang ada
 * @returns {Promise<Worker[]>} daftar pekerja
 *
 * @example
 * exports.getWorkersList = async (dispatch) => {
 *  dispatch(loadingAction());
 *  try {
 *    const workers = await workerSvc.list();
 *    dispatch(workersLoadedAction(workers));
 *  } catch (err) {
 *    dispatch(errorAction('gagal membatalkan pekerjaan'));
 *  }
 * };
 */
function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

module.exports = {
  list,
};
