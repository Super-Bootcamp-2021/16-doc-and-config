/**
 * @module worker-client
 */
const { client } = require('../lib/http-client');

const { WORKER_SERVICE_BASEURL } = require('./config');

/**
 * @function list fungsi untuk mendapatkan list pekerja dari endpoint worker service
 */

function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

module.exports = {
  list,
};
