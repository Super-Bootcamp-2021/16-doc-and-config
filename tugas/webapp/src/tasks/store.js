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
  added,
  canceled,
  done,
  tasksLoaded,
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
 * add action
 * @function addedAction
 * @returns {PayloadAction<any, 'added'>}
 */
const addedAction = createAction('added');

/**
 * done action
 * @function doneAction
 * @returns {PayloadAction<any, 'done'>}
 */
const doneAction = createAction('done');

/**
 * cancel action
 * @function canceledAction
 * @returns {PayloadAction<any, 'canceled'>}
 */
const canceledAction = createAction('canceled');

/**
 * load tasks action
 * @function tasksLoadedAction
 * @returns {PayloadAction<any, 'tasksLoaded'>}
 */
const tasksLoadedAction = createAction('tasksLoaded');

/**
 * load workers action
 * @function workersLoadedAction
 * @returns {PayloadAction<any, 'workersLoaded'>}
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
  [doneAction]: done,
  [addedAction]: added,
  [canceledAction]: canceled,
  [workersLoadedAction]: workersLoaded,
  [tasksLoadedAction]: tasksLoaded,
});

const store$ = configureStore({
  reducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  store$,
  errorAction,
  loadingAction,
  addedAction,
  doneAction,
  canceledAction,
  tasksLoadedAction,
  workersLoadedAction,
  clearErrorAction,
};
