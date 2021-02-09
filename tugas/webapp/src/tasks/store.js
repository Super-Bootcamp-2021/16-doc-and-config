/**
 * @module Webapp_TaskStore
 */
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
 * error action
 * @function errorAction
 */
const errorAction = createAction('error');
/**
 * loading action
 * @function loadingAction
 */
const loadingAction = createAction('loading');
/**
 * add action
 * @function addedAction
 * @returns {PayloadAction<Task, 'added'>}
 */
const addedAction = createAction('added');
/**
 * change task to done action
 * @function doneAction
 * @returns {PayloadAction<TaskDone, 'done'>}
 */
const doneAction = createAction('done');
/**
 * cancelled action
 * @function canceledAction
 * @returns {PayloadAction<TaskCancel, 'canceled'>}
 */
const canceledAction = createAction('canceled');
/**
 * show all task action
 * @function tasksLoadedAction
 * @returns {PayloadAction<Task[], 'tasksLoaded'>}
 */
const tasksLoadedAction = createAction('tasksLoaded');
/**
 * show all name worker action
 * @function workersLoadedAction
 * @returns {PayloadAction<Worker[], 'workersLoaded'>}
 */
const workersLoadedAction = createAction('workersLoaded');
/**
 * clear error action
 * @function clearErrorAction
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
