/**@module performance.client */
const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

/**
 * get summary
 */
function summary() {
  return client.get(`${SERVICE_BASEURL}/summary`);
}

module.exports = {
  summary,
};
