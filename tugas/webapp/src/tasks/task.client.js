/**
 *  @module TaskClient
 */

const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

/**
 * ### Menambah pekerjaan baru
 * @param {TaskData} data data pekerjaan
 * @returns {Promise<Task>} menyimpan data pekerjaan 
 */
function add(data) {
  return client.post(`${SERVICE_BASEURL}/add`, data);
}

/**
 * ### Menampilkan daftar pekerjaan
 * @returns {Promise<Task[]>} menampilkan daftar pekerjaan
 */
function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * ### Membatalkan pekerjaan berdasarkan id
 * @param {Number} id id data pekerjaan
 * @returns {Promise<Task[]>} data pekerjaan dibatalkan
 */
function cancel(id) {
  return client.put(`${SERVICE_BASEURL}/cancel?id=${id}`);
}

/**
 * ### Menyelesaikan pekerjaan berdasarkan id
 * @param {Number} id id data pekerjaan
 * @returns {Promise<Task[]>} data pekerjaan selesai
 */
function done(id) {
  return client.put(`${SERVICE_BASEURL}/done?id=${id}`);
}

module.exports = {
  add,
  list,
  cancel,
  done,
};
