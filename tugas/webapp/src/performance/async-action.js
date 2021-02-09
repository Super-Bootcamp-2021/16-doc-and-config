/**
 * @module asyncMiddleWarePerformance
*/

const { loadingAction, errorAction, summaryLoadedAction } = require('./store');
const perfSvc = require('./performance.client');

/**
 * @function summary  data laporan performa pekerja
 * @param {Function} dispatch penerusan fungsi dispatch redux
 * @return {Function} 
 * 
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
