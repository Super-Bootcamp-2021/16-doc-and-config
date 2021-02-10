/**@module async-action */
const { loadingAction, errorAction, summaryLoadedAction } = require('./store');
const perfSvc = require('./performance.client');

/**
 * 
 * @param {function} dispatch command for input data to db 
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
