/**
 *  @module WorkerClient untuk Task
 */

const { client } = require('../lib/http-client');

const { WORKER_SERVICE_BASEURL } = require('./config');

/**
 * ### Menampilkan daftar pekerja
 * @returns {Promise<Worker[]>} menampilkan daftar pekerja
 */
function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

module.exports = {
  list,
};
