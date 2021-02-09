const { client } = require('../lib/http-client');

const { TASK_SERVICE_BASEURL } = require('../config');

function add(data) {
  return client.post(`${TASK_SERVICE_BASEURL}/add`, data);
}

function list() {
  return client.get(`${TASK_SERVICE_BASEURL}/list`);
}

function cancel(id) {
  return client.put(`${TASK_SERVICE_BASEURL}/cancel?id=${id}`);
}

function done(id) {
  return client.put(`${TASK_SERVICE_BASEURL}/done?id=${id}`);
}

module.exports = {
  add,
  list,
  cancel,
  done,
};
