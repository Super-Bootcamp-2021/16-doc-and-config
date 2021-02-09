const { loadingAction, errorAction, summaryLoadedAction } = require('./store');
const perfSvc = require('./performance.client');

/**
 * @param {Function} dispatch redux dispatch function
 * @param {Object<JSON>} summary data laporan performa pekerja
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
