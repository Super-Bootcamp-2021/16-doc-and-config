/**
 *  @module PeformanceClient
 */

const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

/**
 * ### Menampilkan total pekerja, total pekerjaan, total pekerjaan selesai, dan total pekerjaan batal
 * @returns {Promise<Performance[]>} menampilkan data pekerja dan pekerjaan
 */
function summary() {
  return client.get(`${SERVICE_BASEURL}/summary`);
}

module.exports = {
  summary,
};
