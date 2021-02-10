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
 * set state.loading as true
 * @param {Object} state
 */
function loading(state) {
  state.loading = true;
  state.error = null;
}

/**
 * set state.loading as false and change state.error by action
 * @param {Object} state state before action
 * @param {Object} action action to change state
 */
function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

/**
 * set state.loadung as false and state.error as null (all summary loaded)
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Object<state>}
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
