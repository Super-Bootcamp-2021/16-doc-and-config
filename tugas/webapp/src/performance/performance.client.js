const { client } = require('../lib/http-client');

const { PERFORMANCE_SERVICE_BASEURL } = require('../config');

function summary() {
  return client.get(`${PERFORMANCE_SERVICE_BASEURL}/summary`);
}

module.exports = {
  summary,
};
