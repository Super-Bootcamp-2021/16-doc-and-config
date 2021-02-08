const { client } = require('../lib/http-client');

const { WORKER_SERVICE_BASEURL } = require('./config');

function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

module.exports = {
  list,
};
