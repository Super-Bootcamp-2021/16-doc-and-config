/**
 * @module task-worker-client
 */
const { client } = require('../lib/http-client');

const { WORKER_SERVICE_BASEURL } = require('./config');

/**
 * list all workers
 * @function
 */
function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

module.exports = {
  list,
};
