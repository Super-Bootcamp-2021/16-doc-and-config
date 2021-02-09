/**
 * @module performance-store$
 */

const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, error, loading, summaryLoaded } = require('./reducer');
const thunkMiddleware = require('redux-thunk');

/**
 * @function errorAction sebagai perantara untuk memutasi pesan error pada client dan state
 */
const errorAction = createAction('error');


/**
 * @function loadingAction sebagai perantara untuk memutasi status loading pada client dan state
 */
const loadingAction = createAction('loading');


/**
 * @function summaryLoadedAction sebagai perantara untuk menampilkan ringkasan dari data pekerja dan tugas
 */
const summaryLoadedAction = createAction('summaryLoaded');


/**
 * @function reducer sebagai perantara untuk melakukan mutasi nilai state
 */
const reducer = createReducer(initialState, {
  [errorAction]: error,
  [loadingAction]: loading,
  [summaryLoadedAction]: summaryLoaded,
});

/**
 * @function store$ tempat penyimpanan state sekaligus action / fungsi untuk memutasi state
 */

const store$ = configureStore({
  reducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  store$,
  errorAction,
  loadingAction,
  summaryLoadedAction,
};
