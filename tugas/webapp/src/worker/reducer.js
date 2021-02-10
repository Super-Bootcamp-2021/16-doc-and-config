/** @module workerReducer */
const { SERVICE_BASEURL } = require('./config');

// setup state
const initialState = {
  loading: false,
  error: null,
  workers: [],
};

/**
 * Mengubah status loading menjadi true
 * @param {Object} state state dari aplikasi
 */
function loading(state) {
  state.loading = true;
  state.error = null;
}

/**
 * Mengubah status error menjadi true
 * @param {Object} state state dari aplikasi
 * @param {Object} action aksi error
 */
function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

/**
 * Mengosongkan status error
 * @param {Object} state state dari aplikasi
 */
function clearError(state) {
  state.error = null;
}

/**
 * Menambah data pekerja baru ke dalam state
 * @param {Object} state state dari aplikasi
 * @param {Object} action aksi register
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
 * Menghapus data pekerja dari state
 * @param {Object} state state dari aplikasi
 * @param {Object} action aksi hapus
 */
function removed(state, action) {
  const idx = state.workers.findIndex((t) => t.id === action.payload);
  state.workers.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * Mengubah status loading menjadi false ketika data pekerja telah didapatkan
 * @param {Object} state state dari aplikasi
 * @param {Object} action aksi load pekerja
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
