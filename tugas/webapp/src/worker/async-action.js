/** @module AsyncAction */
const {
  loadingAction,
  errorAction,
  registeredAction,
  removedAction,
  workersLoadedAction,
} = require('./store');
const workerSvc = require('./worker.client');

/**
 * Async action for add new data to database and state
 * This action will dispatch to @see loadingAction() for change state to loading. 
 * Then if removing data success will dispatch to @see registeredAction() or
 * if failed witll dispatch to @see errorAction()
 * @function register
 * @param {Worker} data worker data wich want to add to database and state
 */
exports.register = (data) => async (dispatch) => {
  dispatch(loadingAction());
  try {
    const worker = await workerSvc.register(data);
    dispatch(registeredAction(worker));
  } catch (err) {
    dispatch(errorAction(`gagal mendaftarkan ${data.name}`));
  }
};

/**
 * Async action for remove new data in database and state with id.
 * This action will dispatch to @see loadingAction() for change state to loading. 
 * Then if removing data success will dispatch to @see removedAction() or
 * if failed witll dispatch to @see errorAction()
 * @function remove
 * @param {number} id worker's id
 */
exports.remove = (id) => async (dispatch) => {
  dispatch(loadingAction());
  try {
    await workerSvc.remove(id);
    dispatch(removedAction(id));
  } catch (err) {
    dispatch(errorAction('gagal menghapus pekerja'));
  }
};

/**
 * Async action for get all data worker in database
 * add pass to state with @see workersLoadedAction()
 * @function remove
 * @param {any} dispatch dispatch
 */
exports.getList = async (dispatch) => {
  dispatch(loadingAction());
  try {
    const workers = await workerSvc.list();
    dispatch(workersLoadedAction(workers));
  } catch (err) {
    dispatch(errorAction('gagal memuat daftar pekerja'));
  }
};
