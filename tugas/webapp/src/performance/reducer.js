// setup state
const initialState = {
  loading: false,
  error: null,
  summary: {
    total_task: 0,
    task_done: 0,
    task_cancelled: 0,
    total_worker: 0,
  },
};

/**
 * funsi untuk mengelola state loading
 * @function
 * @param {Object} state
 */
function loading(state) {
  state.loading = true;
  state.error = null;
}

/**
 * funsi untuk mengelola state error
 * @function
 * @param {Object} state
 * @param {function} action
 */
function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}


/**@module reducer-performance  */

/**
 * funsi untuk memngeluarkan summary
 * @function
 * @param {Object} state
 * @param {function} action
 * @return {Object} state
 */
function summaryLoaded(state, action) {
  state.summary = action.payload;
  state.loading = false;
  state.error = null;
  return state;
}

module.exports = {
  initialState,
  summaryLoaded,
  error,
  loading,
};
