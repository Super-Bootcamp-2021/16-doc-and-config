/** @module reducer - state management (redux) */

const { SERVICE_BASEURL } = require('./config');

const { WORKER_SERVICE_BASEURL } = require('../config');


// setup state
const initialState = {
  loading: false,
  error: null,
  workers: [],
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
 * to add data to worker list
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
function registered(state, action) {
  const worker = action.payload;
  state.workers.push({
    id: worker.id,
    name: worker.name,
    photo: `${WORKER_SERVICE_BASEURL}/photo/${worker.photo}`,
    bio: worker.bio,
  });
  state.loading = false;
  state.error = null;
  return state;
}

/** 
 * to remove data from worker list
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
function removed(state, action) {
  const idx = state.workers.findIndex((t) => t.id === action.payload);
  state.workers.splice(idx, 1);
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
    photo: `${WORKER_SERVICE_BASEURL}/photo/${worker.photo}`,
    bio: worker.bio,
  }));
  state.loading = false;
  state.error = null;
  return state;
}

module.exports = {
  initialState,
  registered,
  removed,
  workersLoaded,
  error,
  loading,
  clearError,
};
