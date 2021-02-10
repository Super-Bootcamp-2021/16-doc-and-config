/**
 *  @module WorkerClient
 */

const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

/**
 * ### Menambah pekerja baru
 * @param {WorkerData} data data pekerja
 * @returns {Promise<Worker>} menyimpan data pekerja 
 */
function register(data) {
  return client.post(`${SERVICE_BASEURL}/register`, data);
}

/**
 * ### Menampilkan daftar pekerja
 * @returns {Promise<Worker[]>} menampilkan daftar pekerja
 */
function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * ### Menghapus pekerja berdasarkan id
 * @param {Number} id id data pekerja
 * @returns {Promise<Worker[]>} data pekerja dihapus
 */
function remove(id) {
  return client.del(`${SERVICE_BASEURL}/remove?id=${id}`);
}

/**
 * ### Menampilkan data pekerja berdasarkan id
 * @param {Number} id id data pekerja
 * @returns {Promise<Worker[]>} Menampilkan data pekerja
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
