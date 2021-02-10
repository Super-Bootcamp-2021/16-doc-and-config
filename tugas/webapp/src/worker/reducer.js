/**
 * @module Reducer Worker
 */

const { SERVICE_BASEURL } = require('./config');

// setup state
const initialState = {
  loading: false,
  error: null,
  workers: [],
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
 * ### State menambahkan data pekerja
 * @param {State} state 
 * @param {Action} action
 * @returns {State} data pekerja bertambah
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
 * ### State menghapus data pekerja berdasarkan id
 * @param {State} state 
 * @param {Action} action
 * @returns {State} data pekerja terhapus
 */
function removed(state, action) {
  const idx = state.workers.findIndex((t) => t.id === action.payload);
  state.workers.splice(idx, 1);
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
