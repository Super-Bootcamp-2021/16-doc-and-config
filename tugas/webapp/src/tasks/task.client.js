const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

function add(data) {
  return client.post(`${SERVICE_BASEURL}/add`, data);
}

function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

function cancel(id) {
  return client.put(`${SERVICE_BASEURL}/cancel?id=${id}`);
}

function done(id) {
  return client.put(`${SERVICE_BASEURL}/done?id=${id}`);
}

module.exports = {
  add,
  list,
  cancel,
  done,
};
