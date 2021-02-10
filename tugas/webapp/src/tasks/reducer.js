
/** @module reducer - state management (redux) */

const { SERVICE_BASEURL } = require('./config');

const { TASK_SERVICE_BASEURL } = require('../config');

// setup state
const initialState = {
  loading: false,
  error: null,
  workers: [],
  tasks: [],
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
 * to change state.error to null / no error
 * @param {any} state
 */
function clearError(state) {
  state.error = null;
}

/** 
 * to push data to tasks
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
function added(state, action) {
  const task = action.payload;
  state.tasks.push({
    id: task.id,
    job: task.job,
    assignee: task.assignee.name,
    attachment: `${TASK_SERVICE_BASEURL}/attachment/${task.attachment}`,
    done: false,
  });
  state.loading = false;
  state.error = null;
  return state;
}

/** 
 * to make check that data is done 
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
function done(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks[idx].done = true;
  state.loading = false;
  state.error = null;
  return state;
}

/** 
 * to cancel the task 
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
function canceled(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

/** 
 * to load all task 
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
function tasksLoaded(state, action) {
  state.tasks = action.payload
    .filter((t) => !t.cancelled)
    .map((task) => ({
      id: task.id,
      job: task.job,
      assignee: task.assignee.name,
      attachment: `${TASK_SERVICE_BASEURL}/attachment/${task.attachment}`,
      done: task.done,
    }));
  state.loading = false;
  state.error = null;
  return state;
}

/** 
 * to load all worker 
 * @param {any} state
 * @param {any} action
 * @returns {any} state
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
