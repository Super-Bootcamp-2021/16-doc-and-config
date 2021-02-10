const { loadingAction, errorAction, summaryLoadedAction } = require('./store');
const perfSvc = require('./performance.client');

/**
 * @async
 * @method 
 * @param {Function} dispatch
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
