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
