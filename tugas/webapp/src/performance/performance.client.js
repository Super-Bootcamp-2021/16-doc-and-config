/** @module performanceClient */

const { client } = require('../lib/http-client');

const { SERVICE_BASEURL } = require('./config');

/**
 * GET performace summary
 */
function summary() {
  return client.get(`${SERVICE_BASEURL}/summary`);
}

module.exports = {
  summary,
};
