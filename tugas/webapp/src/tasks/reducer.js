/**
 * @module Reducer Task
 */

const { SERVICE_BASEURL } = require('./config');

// setup state
const initialState = {
  loading: false,
  error: null,
  workers: [],
  tasks: [],
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
 * ### Menghapus state error
 * @param {State} state 
 */
function clearError(state) {
  state.error = null;
}

/**
 * ### State menambahkan pekerjaan
 * @param {State} state 
 * @param {Action} action
 * @returns {State} data pekerjaan bertambah
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
 * ### State mengubah data pekerjaan menjadi selesai berdasarkan id
 * @param {State} state 
 * @param {Action} action
 * @returns {State} pekerjaan selesai
 */
function done(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks[idx].done = true;
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * ### State mengubah data pekerjaan menjadi batal berdasarkan id
 * @param {State} state 
 * @param {Action} action
 * @returns {State} pekerjaan dibatalkan
 */
function canceled(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * ### State menampilkan data pekerjaan
 * @param {State} state 
 * @param {Action} action
 * @returns {State} data pekerjaan ditampilkan
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
 * ### State menampilkan data pekerja
 * @param {State} state 
 * @param {Action} action
 * @returns {State} data pekerja ditampilkan
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
