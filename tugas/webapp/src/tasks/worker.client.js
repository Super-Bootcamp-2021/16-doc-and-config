const { client } = require('../lib/http-client');

/**
 * @var WORKER_SERVICE_BASEURL base url / endpoint dari worker service
 */

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
