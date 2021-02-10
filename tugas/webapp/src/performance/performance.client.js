/** @module performance.client */

const { client } = require('../lib/http-client');

const { PERFORMANCE_SERVICE_BASEURL } = require('../config');

/** 
 * to call summary in performance service
 * @returns {any} data 
 * 
*/
function summary() {
  return client.get(`${PERFORMANCE_SERVICE_BASEURL}/summary`);
}

module.exports = {
  summary,
};
