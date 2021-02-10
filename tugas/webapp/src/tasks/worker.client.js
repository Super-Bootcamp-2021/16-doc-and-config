/**
 * @module worker.client
 */

const { client } = require('../lib/http-client');

const { WORKER_SERVICE_BASEURL } = require('../config');

/**
 * to get list worker
 * @module worker.client
 * @returns {any} data 
 */
function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

module.exports = {
  list,
};
