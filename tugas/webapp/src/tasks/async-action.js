/**
 * @module asyncMiddleWareTask
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
 * @function add untuk menambahkan task ke dalam state
 * @param {Object<FormData>} data merupakan data dari dalam form
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
 * @function done untuk mengubah 'state.done' menjadi true
 * @param {string} id merupakan id dari tugas yang akan di ubah
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
 * @function cancel untuk mengubah 'state.canceled' menjadi true
 * @param {string} id merupakan id dari tugas yang akan di ubah
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
 * @function getList untuk mendapatkan informasi 'tasks'  dari state
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
 * @function getWorkerList untuk mendapatkan informasi 'worker' dari state
 */
exports.getWorkersList = async (dispatch) => {
  dispatch(loadingAction());
  try {
    const workers = await workerSvc.list();
    dispatch(workersLoadedAction(workers));
  } catch (err) {
    dispatch(errorAction('gagal membatalkan pekerjaan'));
  }
};
