/** @module performanceService */
const { summary } = require('./performance');
// eslint-disable-next-line no-unused-vars
const { IncomingMessage, ServerResponse } = require('http');

/**
 * service untuk mendapatkan rangkuman performa
 * @async
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
async function summarySvc(req, res) {
  try {
    const sums = await summary();
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(sums));
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

module.exports = {
  summarySvc,
};
