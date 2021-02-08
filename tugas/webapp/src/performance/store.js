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
