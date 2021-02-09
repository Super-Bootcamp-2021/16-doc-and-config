/**
 * @module task.client
 */

const { client } = require('../lib/http-client');

const { TASK_SERVICE_BASEURL } = require('../config');

/**
 * to add data to task
 * @module task.client
 * @param {any} data
 * @return {any} data
 */
function add(data) {
  return client.post(`${TASK_SERVICE_BASEURL}/add`, data);
}

/**
 * to get list data from task
 * @module task.client
 * @return {any} data
 */
function list() {
  return client.get(`${TASK_SERVICE_BASEURL}/list`);
}

/**
 * to cancel task
 * @module task.client
 * @param {number} id
 * @return {any} data
 */
function cancel(id) {
  return client.put(`${TASK_SERVICE_BASEURL}/cancel?id=${id}`);
}

/**
 * to make done check to task
 * @module task.client
 * @param {number} id
 * @return {any} data
 */
function done(id) {
  return client.put(`${TASK_SERVICE_BASEURL}/done?id=${id}`);
}

module.exports = {
  add,
  list,
  cancel,
  done,
};
