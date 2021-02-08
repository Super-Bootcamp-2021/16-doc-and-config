const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

function summary() {
  return client.get(`${SERVICE_BASEURL}/summary`);
}

module.exports = {
  summary,
};
