/** @module taskClient */

const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

/**
 * add new task
 * @param {} data task data
 * @returns {Promise<Task>} new task data after save to database
 */
function add(data) {
  return client.post(`${SERVICE_BASEURL}/add`, data);
}

/**
 * get list tasks
 * @returns {Promise<Task[]>} get list task
 */
function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * cancel task
 * @param {number} id task's id
 * @returns {Promise<Task>} remove task
 */
function cancel(id) {
  return client.put(`${SERVICE_BASEURL}/cancel?id=${id}`);
}

/**
 * done task
 * @param {number} id task's id
 * @returns {Promise<Task>} remove task
 */
function done(id) {
  return client.put(`${SERVICE_BASEURL}/done?id=${id}`);
}

module.exports = {
  add,
  list,
  cancel,
  done,
};
