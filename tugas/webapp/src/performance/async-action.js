/** 
 * @module AsyncAction Performance
 */

const { loadingAction, errorAction, summaryLoadedAction } = require('./store');
const perfSvc = require('./performance.client');

/**
 * Aksi async untuk memuat data pekerja dan data pekerjaan
 * Jika gagal maka akan menampilkan pesan gagal memuat informasi kinerja
 * @function summary
 */
exports.summary = async (dispatch) => {
  dispatch(loadingAction());
  try {
    const summary = await perfSvc.summary();
    dispatch(summaryLoadedAction(summary));
  } catch (err) {
    dispatch(errorAction('gagal memuat informasi kinerja'));
  }
};
