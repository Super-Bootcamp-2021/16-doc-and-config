/**
 * @module Webapp_PerformanceStore
 */
const {
  createAction,
  createReducer,
  configureStore,
  // eslint-disable-next-line no-unused-vars
  PayloadAction,
} = require('@reduxjs/toolkit');
const { initialState, error, loading, summaryLoaded } = require('./reducer');
const thunkMiddleware = require('redux-thunk');

/**
 * error Action Reducer
 * @function errorAction
 * @returns {PayloadAction<PerformanceState, 'error'>}
 */
const errorAction = createAction('error');
/**
 * loading Action Reducer
 * @function loadingAction
 * @returns {PayloadAction<PerformanceState, 'loading'>}
 */
const loadingAction = createAction('loading');
/**
 * summary Action Reducer
 * @function summaryLoadedAction
 * @returns {PayloadAction<PerformanceState, 'summaryLoaded'>}
 */
const summaryLoadedAction = createAction('summaryLoaded');

const reducer = createReducer(initialState, {
  [errorAction]: error,
  [loadingAction]: loading,
  [summaryLoadedAction]: summaryLoaded,
});

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
