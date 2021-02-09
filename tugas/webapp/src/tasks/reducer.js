/** @module reducer */

const { SERVICE_BASEURL } = require('./config');

// setup state
const initialState = {
  loading: false,
  error: null,
  workers: [],
  tasks: [],
};

/**
 * Set state to loading condition
 * @param {State} state 
 */
function loading(state) {
  state.loading = true;
  state.error = null;
}

/**
 * Set state to error condition
 * @param {State} state state
 * @param {Action} action action
 */
function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

/**
 * Clear error in state to null
 * @param {State} state state
 */
function clearError(state) {
  state.error = null;
}

/**
 * Add new worker to state
 * @param {State} state state
 * @param {Action} action action
 * @returns {State} return updated state
 * 
 */
function added(state, action) {
  const task = action.payload;
  state.tasks.push({
    id: task.id,
    job: task.job,
    assignee: task.assignee.name,
    attachment: `${SERVICE_BASEURL}/attachment/${task.attachment}`,
    done: false,
  });
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * Change done property to TRUE
 * @param {State} state state
 * @param {Action} action action
 * @returns {State} return updated state
 * 
 */
function done(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks[idx].done = true;
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * Change canceled property to TRUE
 * @param {State} state state
 * @param {Action} action action
 * @returns {State} return updated state
 * 
 */
function canceled(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * Init worker data to state
 * @param {State} state state
 * @param {Action} action action
 * @returns {State} return updated state
 */
function tasksLoaded(state, action) {
  state.tasks = action.payload
    .filter((t) => !t.cancelled)
    .map((task) => ({
      id: task.id,
      job: task.job,
      assignee: task.assignee.name,
      attachment: `${SERVICE_BASEURL}/attachment/${task.attachment}`,
      done: task.done,
    }));
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * Init worker data to state
 * @param {State} state state
 * @param {Action} action action
 * @returns {State} return updated state
 */
function workersLoaded(state, action) {
  state.workers = action.payload.map((worker) => ({
    id: worker.id,
    name: worker.name,
  }));
  state.loading = false;
  state.error = null;
  return state;
}

module.exports = {
  initialState,
  added,
  done,
  canceled,
  tasksLoaded,
  workersLoaded,
  error,
  loading,
  clearError,
};
