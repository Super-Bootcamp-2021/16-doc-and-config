/** @module orm */
const { createConnection } = require('typeorm');

/**
 * 
 * @param {EntitySchema[]} entities 
 * @param {object} config 
 */
function connect(entities, config) {
  return createConnection({
    ...config,
    synchronize: true,
    timezone: 'Asia/Jakarta',
    entities,
  });
}

module.exports = {
  connect,
};
