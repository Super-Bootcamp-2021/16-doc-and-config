/**
 * @module reducer
 */
const { SERVICE_BASEURL } = require('./config');

// setup state
const initialState = {
  loading: false,
  error: null,
  workers: [],
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
 * Remove worker selected to state
 * @param {State} state state
 * @param {Action} action action
 * @returns {State} return updated state
 */
function removed(state, action) {
  const idx = state.workers.findIndex((t) => t.id === action.payload);
  state.workers.splice(idx, 1);
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
