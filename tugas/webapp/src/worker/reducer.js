const { SERVICE_BASEURL } = require('./config');

// setup state
const initialState = {
  loading: false,
  error: null,
  workers: [],
};

function loading(state) {
  state.loading = true;
  state.error = null;
}

function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

function clearError(state) {
  state.error = null;
}

/**@module reducer-workers */

/**
 * register worker
 * @function
 * @param {Object} state 
 * @param {function} action
 * @return {Object} state
 */
function registered(state, action) {
  const worker = action.payload;
  state.workers.push({
    id: worker.id,
    name: worker.name,
    photo: `${SERVICE_BASEURL}/photo/${worker.photo}`,
    bio: worker.bio,
  });
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * remove worker
 * @function
 * @param {Object} state 
 * @param {function} action
 * @return {Object} state
 */
function removed(state, action) {
  const idx = state.workers.findIndex((t) => t.id === action.payload);
  state.workers.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * load all workers
 * @function
 * @param {Object} state 
 * @param {function} action
 * @return {Object} state
 */
function workersLoaded(state, action) {
  state.workers = action.payload.map((worker) => ({
    id: worker.id,
    name: worker.name,
    photo: `${SERVICE_BASEURL}/photo/${worker.photo}`,
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
