/** @module workerClient */

const { client } = require('../lib/http-client');

const { WORKER_SERVICE_BASEURL } = require('./config');

/**
 * get list tasks
 * @returns {Promise<WorkerData[]>} get list task
 */
function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

module.exports = {
  list,
};
