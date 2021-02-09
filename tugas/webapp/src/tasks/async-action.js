/** @module AsyncAction */

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
 * Async action for add new data to database and state
 * This action will dispatch to @see loadingAction() for change state to loading. 
 * Then if removing data success will dispatch to @see addedAction() or
 * if failed witll dispatch to @see errorAction()
 * @function add
 * @param {Task} data worker data wich want to add to database and state
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
 * Async action for task's done data in database and state with id.
 * This action will dispatch to @see loadingAction() for change state to loading. 
 * Then if removing data success will dispatch to @see doneAction() or
 * if failed witll dispatch to @see errorAction()
 * @function done
 * @param {number} id task's id
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
 * Async action for cancel task data in database and state with id.
 * This action will dispatch to @see loadingAction() for change state to loading. 
 * Then if removing data success will dispatch to @see canceledAction() or
 * if failed witll dispatch to @see errorAction()
 * @function done
 * @param {number} id task's id
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
 * Async action for get all data task in database
 * add pass to state with @see tasksLoadedAction()
 * @function getList
 * @param {any} dispatch dispatch
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
 * Async action for get all data worker in database
 * add pass to state with @see workersLoadedAction()
 * @function getWorkersList
 * @param {any} dispatch dispatch
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
