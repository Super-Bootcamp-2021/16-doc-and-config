const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

function register(data) {
  return client.post(`${SERVICE_BASEURL}/register`, data);
}

function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

function remove(id) {
  return client.del(`${SERVICE_BASEURL}/remove?id=${id}`);
}

function info(id) {
  return client.get(`${SERVICE_BASEURL}/info?id=${id}`);
}

module.exports = {
  register,
  list,
  remove,
  info,
};
