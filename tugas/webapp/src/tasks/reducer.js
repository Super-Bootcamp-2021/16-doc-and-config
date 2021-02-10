/**
 * @module task-reducer
 */

const { SERVICE_BASEURL } = require('./config');

// setup state

/**
 * @var {Object} initialState objek berisi informasi yang akan di tampilak ke client
 * @property {boolean} loading bernilai true / false
 * @property {string} error berisi pesan error yang akan di tampilkan ke client
 * @property {Object} workers berisi informasi dari para pekerja
 * @property {Object} tasks berisi informasi tentang tugas dari paara pakerja
 */
const initialState = {
  loading: false,
  error: null,
  workers: [],
  tasks: [],
};

/**
 * @function loading fungsi loading ketika request masih berjalan
 * @param {Object} state initital state baik sudah di update maupun belum
 */

function loading(state) {
  state.loading = true;
  state.error = null;
}

/**
 * @function error menghandle pesan error yang muncul pada client
 * @param {Object} state initital state baik sudah di update maupun belum
 */

function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

/**
 * @function error menghapus pesan error yang muncul pada client
 * @param {Object} state initital state baik sudah di update maupun belum
 */

function clearError(state) {
  state.error = null;
}

/**
 * @function added melakukan penambahan state pada property tasks
 * @param {Object} state initital state baik sudah di update maupun belum
 * @param {Object} action merupakan interface action dari redux
 * @returns {Object<any>}
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
 * @param {Object} state initital state baik sudah di update maupun belum
 * @param {Object} action merupakan interface action dari redux
 * @function done melakukan perbahan value dari property task.done menjadi true, berdasarkan id
 * @returns {Object<state> }
 */

function done(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks[idx].done = true;
  state.loading = false;
  state.error = null;
  return state;
}

/**
* @function caceled menghapus task berdasarkan id pada state 
* @param {Object} state initital state baik sudah di update maupun belum
 * @param {Object} action merupakan interface action dari redux 

 * @returns {Object<state> } 
 */

function canceled(state, action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * @param {Object} state initital state baik sudah di update maupun belum
 * @param {Object} action merupakan interface action dari redux
 * @function tasksLoaded menampilkan daftar tugas ke luar state menuju client
 * @returns {Object<state> }
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
 * @function workersLoaded menampilkan daftar pekerja berisi nama dan id pekerja ke luar state menuju client
 * @param {Object} state initital state baik sudah di update maupun belum
 * @param {Object} action merupakan interface action dari redux
 * @returns {Object<state>}
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
