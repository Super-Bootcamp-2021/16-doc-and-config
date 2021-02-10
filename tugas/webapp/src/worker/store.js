/** @module store - state management (redux) */

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

const errorAction = createAction('error');
const loadingAction = createAction('loading');
const registeredAction = createAction('registered');
const removedAction = createAction('removed');
const workersLoadedAction = createAction('workersLoaded');
const clearErrorAction = createAction('clearError');


/**
 * to createReducer from action
 * @module createAction
 * @param {any} initialState default state 
 * @param {any} action all action 
 */
const reducer = createReducer(initialState, {
  [errorAction]: error,
  [clearErrorAction]: clearError,
  [loadingAction]: loading,
  [registeredAction]: registered,
  [removedAction]: removed,
  [workersLoadedAction]: workersLoaded,
});

/**
 * to store reducer
 * @module configureStore
 * @param {any} reducer 
 */
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
