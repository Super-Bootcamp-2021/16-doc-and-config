// setup state

/**
 * @param {Object} initialState objek berisi informasi yang akan di tampilak ke client
 * @property {boolean} loading bernilai true / false
 * @property {string} error berisi pesan error yang akan di tampilkan ke client
 * @property {boolean} loading bernilai true / false
 * @property {Object <total_task, total_worker, task_cancelled, task_done>} summary berisi informasi khusus mengenai tugas dan pekerja dalam bentuk angka
 */
const initialState = {
  loading: false,
  error: null,
  summary: {
    total_task: 0,
    task_done: 0,
    task_cancelled: 0,
    total_worker: 0,
  },
};
/**
 * @param {Object} state initital state baik sudah di update maupun belum
 * @function loading fungsi loading ketika request masih berjalan
 */
function loading(state) {
  state.loading = true;
  state.error = null;
}

/**
 * @param {Object} state initital state baik sudah di update maupun belum
 * @function error menghandle pesan error yang muncul pada client
 */
function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}
/**
 * @param {Object} state initital state baik sudah di update maupun belum
 * @function error menghandle pesan error yang muncul pada client
 * @returns {Object<loading, error, summary>} mengembalikan nilai dari state
 */
function summaryLoaded(state, action) {
  state.summary = action.payload;
  state.loading = false;
  state.error = null;
  return state;
}

module.exports = {
  initialState,
  summaryLoaded,
  error,
  loading,
};
