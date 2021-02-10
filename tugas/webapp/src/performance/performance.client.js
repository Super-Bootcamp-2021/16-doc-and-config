/** @module Webapp_PerformanceClient */
const { client } = require('../lib/http-client');

const { PERFORMANCE_SERVICE_BASEURL } = require('./config');

/**
 * get resume of task & worker
 * @returns {Promise<PerformanceSummary[]>} list of resume task & worker
 */
function summary() {
  return client.get(`${PERFORMANCE_SERVICE_BASEURL}/summary`);
}

module.exports = {
  summary,
};
