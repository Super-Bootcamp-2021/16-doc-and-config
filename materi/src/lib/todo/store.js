/**
 * @module store
 */

const {
  createAction,
  createReducer,
  configureStore,
  // eslint-disable-next-line no-unused-vars
  PayloadAction,
} = require('@reduxjs/toolkit');
const { initialState, add, done, undone, loadTasks } = require('./reducer');
const { loggingMiddleware, delayActionMiddleware } = require('./middleware');
const thunkMiddleware = require('redux-thunk');

/**
 * add action
 * @function addAction
 * @returns {PayloadAction<Todo, 'add'>}
 */
const addAction = createAction('add');
const doneAction = createAction('done');
const undoneAction = createAction('undone');
const loadTasksAction = createAction('loadTasks');

const todoReducer = createReducer(initialState, {
  [addAction]: add,
  [doneAction]: done,
  [undoneAction]: undone,
  [loadTasksAction]: loadTasks,
});

const store$ = configureStore({
  reducer: todoReducer,
  middleware: [
    thunkMiddleware.default,
    loggingMiddleware,
    delayActionMiddleware,
  ],
});

module.exports = {
  store$,
  addAction,
  doneAction,
  undoneAction,
  loadTasksAction,
};
