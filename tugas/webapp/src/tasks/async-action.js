/** 
 * @module AsyncAction Task
 */

const {
  loadingAction,
  errorAction,
  doneAction,
  canceledAction,
  tasksLoadedAction,
  workersLoadedAction,
  addedAction,
} = require('./store');
const workerSvc = require('./worker.client');
const taskSvc = require('./task.client');

/**
 * Aksi async untuk menambahkan pekerjaan berdasarkan data pekerjaan
 * Jika gagal maka akan menampilkan pesan gagal menambahkan pekerjaan
 * @function add
 * @param {Task} data data pekerjaan
 */
exports.add = (data) => async (dispatch) => {
  dispatch(loadingAction());
  try {
    const task = await taskSvc.add(data);
    dispatch(addedAction(task));
  } catch (err) {
    dispatch(errorAction(`gagal menambahkan ${data.job}`));
  }
};

/**
 * Aksi async untuk menyelesaikan pekerjaan berdasarkan id pekerjaan
 * Jika gagal maka akan menampilkan pesan gagal menyelesaikan pekerjaan
 * @function done
 * @param {Number} id id pekerjaan
 */
exports.done = (id) => async (dispatch) => {
  dispatch(loadingAction());
  try {
    await taskSvc.done(id);
    dispatch(doneAction(id));
  } catch (err) {
    dispatch(errorAction('gagal menyelesaikan pekerjaan'));
  }
};

/**
 * Aksi async untuk membatalkan pekerjaan berdasarkan id pekerjaan
 * Jika gagal maka akan menampilkan pesan gagal membatalkan pekerjaan
 * @function cancel
 * @param {Number} id id pekerjaan
 */
exports.cancel = (id) => async (dispatch) => {
  dispatch(loadingAction());
  try {
    await taskSvc.cancel(id);
    dispatch(canceledAction(id));
  } catch (err) {
    dispatch(errorAction('gagal membatalkan pekerjaan'));
  }
};

/**
 * Aksi async untuk menampilkan daftar pekerjaan
 * Jika gagal maka akan menampilkan pesan gagal memuat daftar pekerjaan
 * @function list 
 */
exports.getList = async (dispatch) => {
  dispatch(loadingAction());
  try {
    const tasks = await taskSvc.list();
    dispatch(tasksLoadedAction(tasks));
  } catch (err) {
    dispatch(errorAction('gagal memuat daftar pekerjaan'));
  }
};

/**
 * Aksi async untuk memuat daftar pekerjaan yang berhubungan dengan data pekerja
 * Jika gagal maka akan menampilkan pesan gagal memuat data pekerja
 * @function list 
 */
exports.getWorkersList = async (dispatch) => {
  dispatch(loadingAction());
  try {
    const workers = await workerSvc.list();
    dispatch(workersLoadedAction(workers));
  } catch (err) {
    dispatch(errorAction('gagal memuat data pekerja'));
  }
};
