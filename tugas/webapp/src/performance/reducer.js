/** @module reducer - state management (redux) */

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
 * to change state.loading and state.error
 * @param {any} state
 */
function loading(state) {
  state.loading = true;
  state.error = null;
}

/** 
 * to change state.erro and state.loading from action.payload
 * @param {any} state
 * @param {any} action
 */
function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

/** 
 * to change state.erro, state.loading
 * and state.summary from action.payload
 * @param {any} state
 * @param {any} action
 * @returns {any} state
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
