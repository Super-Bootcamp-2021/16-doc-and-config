/**
 * @module task-client
 */

const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');
/**
 * @function add menambah tugas ke endpoint
 *
 */
function add(data) {
  return client.post(`${SERVICE_BASEURL}/add`, data);
}

/**
 * @function list mendapatkan lis tugas melaui end point
 *
 */
function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * @function cancel membatalkan tugas melalui end point
 *
 */
function cancel(id) {
  return client.put(`${SERVICE_BASEURL}/cancel?id=${id}`);
}

/**
 * @function done menyelesaikan tugas melalui end point
 *
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
