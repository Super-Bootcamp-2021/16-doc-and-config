/**
 * @module Webapp_PerformanceReducer
 */

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
 * loading Reducer
 * @param {PerformanceState} state state of application
 */
function loading(state) {
  state.loading = true;
  state.error = null;
}

/**
 * error Reducer
 * @param {PerformanceState} state state of application
 * @param {*} action 
 */
function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

/**
 * Load Summary Reducer
 * @param {PerformanceState} state state of application
 * @param {*} action 
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
