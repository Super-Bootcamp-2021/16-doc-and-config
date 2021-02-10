/**
 * @module Reducer Performance
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
 * ### Mengatur state loading
 * @param {State} state 
 */
function loading(state) {
  state.loading = true;
  state.error = null;
}

/**
 * ### Mengatur state error
 * @param {State} state 
 * @param {Action} action 
 */
function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

/**
 * ### State menampilkan data pekerja dan data pekerjaan
 * @param {State} state 
 * @param {Action} action
 * @returns {State} data pekerja dan data pekerjaan
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
