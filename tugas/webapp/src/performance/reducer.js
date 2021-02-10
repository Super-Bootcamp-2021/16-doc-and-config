/**@module reducer */
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
 * loading action
 * @param {Data} state loading <- true dan error <- null
 */

function loading(state) {
  state.loading = true;
  state.error = null;
}

/**error action
 * 
 * @param {Data} state loading <- false
 * @param {error} action menyimpan suatu error pada data
 */

function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

/**
 * 
 * @param {Data} state loading <- false dan error <- null
 * @param {summary} action menyimpan total_task, task_done, task_cancelled, total_worker
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
