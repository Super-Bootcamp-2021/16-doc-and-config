/**
 * @module task-client
 */
const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');
/**
 * add task
 * @function
 * @param {TaskData} data 
 */
function add(data) {
  return client.post(`${SERVICE_BASEURL}/add`, data);
}

/**
 * list all tasks
 * @function 
 */
function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * cancel task with spesific id
 * @function
 * @param {number} id 
 */
function cancel(id) {
  return client.put(`${SERVICE_BASEURL}/cancel?id=${id}`);
}

/**
 * change done task status with spesific id
 * @function
 * @param {number} id 
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
