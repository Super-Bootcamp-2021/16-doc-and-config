const {
  fetchTasksApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
} = require('../api/todo-service');
const {
  addAction,
  doneAction,
  undoneAction,
  loadTasksAction,
} = require('./store');

const addTaskAsync = (task) => async (dispatch) => {
  const taskData = await addTaskApi(task);
  dispatch(addAction(taskData));
};

const loadTasksAsync = async (dispatch) => {
  const tasksAsync = await fetchTasksApi();
  dispatch(loadTasksAction(tasksAsync));
};

const doneTaskAsync = (id) => {
  return async (dispatch) => {
    await doneTaskApi(id);
    dispatch(doneAction(id));
  };
};

const undoneTaskAsync = (id) => {
  return async (dispatch) => {
    try {
      await undoneTaskApi(id);
      dispatch(undoneAction(id));
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports = {
  addTaskAsync,
  loadTasksAsync,
  doneTaskAsync,
  undoneTaskAsync,
};
