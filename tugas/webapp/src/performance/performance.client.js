/** @module todoService */
const { client } = require('../lib/http-client');

const { PERFORMANCE_SERVICE_BASEURL } = require('./config');

/**
 * mengambil resume dari task & worker
 * @returns {Promise<Summary[]>} daftar resume task & worker
 */
function summary() {
  return client.get(`${PERFORMANCE_SERVICE_BASEURL}/summary`);
}

module.exports = {
  summary,
};
