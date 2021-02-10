const { summary } = require('./performance');

/**
 * to get performance summary from KV
 * @param {ClientRequest} req 
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
