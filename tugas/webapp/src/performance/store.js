/** @module store - state management (redux) */

const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, error, loading, summaryLoaded } = require('./reducer');
const thunkMiddleware = require('redux-thunk');

const errorAction = createAction('error');
const loadingAction = createAction('loading');
const summaryLoadedAction = createAction('summaryLoaded');

/**
 * to createReducer from action
 * @module createAction
 * @param {any} initialState default state 
 * @param {any} action all action 
 */
const reducer = createReducer(initialState, {
  [errorAction]: error,
  [loadingAction]: loading,
  [summaryLoadedAction]: summaryLoaded,
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
  summaryLoadedAction,
};
