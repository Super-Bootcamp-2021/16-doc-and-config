/**@module async-action-tasks */

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
 * add new task
 * @function
 * @param {TaskData} data item yang akan ditambahkan pada task
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
 * change done status to be true
 * @function
 * @param {number} id merubah status task menjadi done malalui id
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
 * change cancelled status to be true
 * @function
 * @param {number} id merubah status task menjadi cancelled malalui id
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
 * get all item in task
 * @function
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
 * get all worker in task
 * @function
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
