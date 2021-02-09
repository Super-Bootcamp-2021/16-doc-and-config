const { client } = require('../lib/http-client');

const { WORKER_SERVICE_BASEURL } = require('../config');

function register(data) {
  return client.post(`${WORKER_SERVICE_BASEURL}/register`, data);
}

function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

function remove(id) {
  return client.del(`${WORKER_SERVICE_BASEURL}/remove?id=${id}`);
}

function info(id) {
  return client.get(`${WORKER_SERVICE_BASEURL}/info?id=${id}`);
}

module.exports = {
  register,
  list,
  remove,
  info,
};
