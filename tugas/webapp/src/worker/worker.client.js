/** @module workerClient */
const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

/**
 * add new worker
 * @param {WorkerData} data worker data
 * @returns {Promise<Worker>} new worker data after save to database
 */
function register(data) {
  return client.post(`${SERVICE_BASEURL}/register`, data);
}

/**
 * get list worker
 * @returns {Promise<Worker[]>} get list worker
 */
function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * remove list worker
 * @param {number} id worker's id
 * @returns {Promise<Worker>} remove worker
 */
function remove(id) {
  return client.del(`${SERVICE_BASEURL}/remove?id=${id}`);
}

/**
 * get detail worker
 * @param {number} id worker's id
 * @returns {Promise<Worker[]>} get detail worker by id
 */
function info(id) {
  return client.get(`${SERVICE_BASEURL}/info?id=${id}`);
}

module.exports = {
  register,
  list,
  remove,
  info,
};
