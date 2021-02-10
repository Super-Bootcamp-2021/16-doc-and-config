/** @module workerStore */
const {
  createAction,
  createReducer,
  configureStore,
  // eslint-disable-next-line no-unused-vars
  PayloadAction,
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
 * error action
 * @function error
 * @returns {PayloadAction<Worker, 'error'>}
 */
const errorAction = createAction('error');
const loadingAction = createAction('loading');
const registeredAction = createAction('registered');
const removedAction = createAction('removed');
const workersLoadedAction = createAction('workersLoaded');
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
