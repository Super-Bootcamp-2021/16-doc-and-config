/**
 * @module worker-client
 */
const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

/**
 * fungsi register worker
 * @function
 * @param {WorkerData} data 
 */
function register(data) {
  return client.post(`${SERVICE_BASEURL}/register`, data);
}

/**
 * fungsi list worker
 * @function 
 */
function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * fungsi remove worker
 * @function 
 * @param {number} id
 */
function remove(id) {
  return client.del(`${SERVICE_BASEURL}/remove?id=${id}`);
}

/**
 * fungsi untuk melihat informasi worker 
 * @function 
 * @param {number} id
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
