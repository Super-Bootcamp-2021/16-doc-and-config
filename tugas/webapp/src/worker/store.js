/** @module store */

const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const {
  initialState,
  error,
  loading,
  registered,
  removed,
  workersLoaded,
  clearError,
} = require('./reducer');
const thunkMiddleware = require('redux-thunk');

/**
 * add action
 * @function errorAction
 * @returns {PayloadAction<string, 'error'>}
 */
const errorAction = createAction('error');

/**
 * loading action
 * @function loadingAction
 * @returns {PayloadAction<any, 'loading'>}
 */
const loadingAction = createAction('loading');

/**
 * register action
 * @function registeredAction
 * @returns {PayloadAction<Worker, 'registered'>}
 */
const registeredAction = createAction('registered');

/**
 * remove action
 * @function removedAction
 * @returns {PayloadAction<number, 'removed'>}
 */
const removedAction = createAction('removed');

/**
 * load worker data action
 * @function workersLoadedAction
 * @returns {PayloadAction<Worker[], 'workersLoaded'>}
 */
const workersLoadedAction = createAction('workersLoaded');

/**
 * clear error action
 * @function clearErrorAction
 * @returns {PayloadAction<any, 'clearError'>}
 */
const clearErrorAction = createAction('clearError');

const reducer = createReducer(initialState, {
  [errorAction]: error,
  [clearErrorAction]: clearError,
  [loadingAction]: loading,
  [registeredAction]: registered,
  [removedAction]: removed,
  [workersLoadedAction]: workersLoaded,
});

const store$ = configureStore({
  reducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  store$,
  errorAction,
  loadingAction,
  registeredAction,
  removedAction,
  workersLoadedAction,
  clearErrorAction,
};
