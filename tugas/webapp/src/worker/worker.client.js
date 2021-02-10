/**
 * @module worker.client
 */

const { client } = require('../lib/http-client');

const { WORKER_SERVICE_BASEURL } = require('../config');

/**
 * to add data 
 * @param {any} data 
 */
function register(data) {
  return client.post(`${WORKER_SERVICE_BASEURL}/register`, data);
}

/**
 * to get list worker
 * @returns {any} data 
 */
function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

/**
 * to remove data from worker
 * @param {number} id 
 */
function remove(id) {
  return client.del(`${WORKER_SERVICE_BASEURL}/remove?id=${id}`);
}

/**
 * to get data from worker
 * @param {number} id 
 */
function info(id) {
  return client.get(`${WORKER_SERVICE_BASEURL}/info?id=${id}`);
}

module.exports = {
  register,
  list,
  remove,
  info,
};
