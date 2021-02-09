/** @module todo */

const { getConnection } = require('typeorm');
const { Todo } = require('./todo.model');

const ERROR_ADD_DATA_INVALID = 'data pekerjaan tidak valid';
const ERROR_ID_INVALID = 'task id tidak valid';
const ERROR_TODO_NOT_FOUND = 'pekerja tidak ditemukan';

/**
 * add new todo
 * @param {TodoData} data todo detail
 * @returns {Promise<Todo>} new todo detail with id
 * @throws {string} when data not contain task property
 */
async function add(data) {
  if (!data.task) {
    throw ERROR_ADD_DATA_INVALID;
  }
  const todoRepo = getConnection().getRepository('Todo');
  const todo = new Todo(null, data.task, data.done);
  await todoRepo.save(todo);
  return todo;
}

/**
 * remove a todo by an id
 * @param {string} id todo id
 * @returns {Promise<Todo>} removed todo
 * @throws {string} when todo not found in database
 */
async function remove(id) {
  const todoRepo = getConnection().getRepository('Todo');
  const todo = await todoRepo.findOne(id);
  if (!todo) {
    throw ERROR_TODO_NOT_FOUND;
  }
  await todoRepo.delete(id);
  return todo;
}

/**
 * set todo task to done
 * @param {string} id todo task id
 * @returns {Promise<Todo>} set todo task to done with id
 * @throws {string} when id are invalid
 * @throws {string} when todo not found in database
 */
async function done(id) {
  if (!id) {
    throw ERROR_ID_INVALID;
  }
  const todoRepo = getConnection().getRepository('Todo');
  let todo = await todoRepo.findOne(id);
  if (!todo) {
    throw ERROR_TODO_NOT_FOUND;
  }
  todo.done = true;
  await todoRepo.save(todo);
  return todo;
}

/**
 * set todo task to undone
 * @param {string} id todo task id
 * @returns {Promise<Todo>} set todo task to undone with id
 * @throws {string} when id are invalid
 * @throws {string} when todo not found in database
 */
async function undone(id) {
  if (!id) {
    throw ERROR_ID_INVALID;
  }
  const todoRepo = getConnection().getRepository('Todo');
  let todo = await todoRepo.findOne(id);
  if (!todo) {
    throw ERROR_TODO_NOT_FOUND;
  }
  todo.done = false;
  await todoRepo.save(todo);
  return todo;
}

/**
 * get list of todo
 * @returns {Promise<Todo[]>} list of task to do
 */
function list() {
  const todoRepo = getConnection().getRepository('Todo');
  return todoRepo.find();
}

module.exports = {
  add,
  remove,
  done,
  undone,
  list,
  ERROR_ADD_DATA_INVALID,
  ERROR_TODO_NOT_FOUND,
};
