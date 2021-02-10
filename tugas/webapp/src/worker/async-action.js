/** 
 * @module AsyncAction Worker
 */

const {
  loadingAction,
  errorAction,
  registeredAction,
  removedAction,
  workersLoadedAction,
} = require('./store');
const workerSvc = require('./worker.client');

/**
 * Aksi async untuk menambahkan pekerja berdasarkan data pekerja
 * Jika gagal maka akan menampilkan pesan gagal mendaftarkan pekerja 
 * @function register
 * @param {Worker} data data pekerja
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
 * Aksi async untuk menghapus pekerja berdasarkan id pekerja
 * Jika gagal maka akan menampilkan pesan gagal menghapus pekerja 
 * @function remove
 * @param {Number} id id pekerja
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
 * Aksi async untuk menampilkan data pekerja
 * Jika gagal maka akan menampilkan pesan gagal memuat daftar pekerja
 * @function list
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
