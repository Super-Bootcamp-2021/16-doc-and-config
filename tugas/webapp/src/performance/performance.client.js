/**
 * @module summary
*/

const { client } = require('../lib/http-client');
const { SERVICE_BASEURL } = require('./config');

/**
 * @function summary fungsi untk melakukan request ke server untuk mendapatkan data rekapitulasi pegawai
 * @param {string} SERVICE_BASEURL end point performance service
 * @returns {Promise<any>} hasil dari request ke endpoint
 */

function summary() {
  return client.get(`${SERVICE_BASEURL}/summary`);
}

module.exports = {
  summary,
};
