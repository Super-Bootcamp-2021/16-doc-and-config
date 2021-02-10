const { SERVICE_BASEURL } = require('./config');

// setup state
const initialState = {
  loading: false,
  error: null,
  workers: [],
  tasks: [],
};

function loading(state) {
  state.loading = true;
  state.error = null;
}

function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

/**
 * mengubah state error menjadu null
 * @function
 * @param {Object} state 
 */
function clearError(state) {
  state.error = null;
}

/**@module reducer-tasks */

/**
 * menambahkan item pada state
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {state}
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
 * mengubah status done pada task tertentu menjadi true
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {Object}
 */
function done(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks[idx].done = true;
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * mengubah status cancel pada task tertentu menjadi true
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {Object}
 */
function canceled(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * me-load semua task yang ada pada db
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {Object}
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
 * me-load semua worker yang ada pada db
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {Object}
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
