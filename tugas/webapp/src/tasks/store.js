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

const errorAction = createAction('error');
const loadingAction = createAction('loading');
const addedAction = createAction('added');
const doneAction = createAction('done');
const canceledAction = createAction('canceled');
const tasksLoadedAction = createAction('tasksLoaded');
const workersLoadedAction = createAction('workersLoaded');
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
