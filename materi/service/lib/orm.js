const { createConnection } = require('typeorm');
// eslint-disable-next-line no-unused-vars
const { EntitySchema } = require('typeorm');

/**
 * connect to database
 * @param {EntitySchema[]} entities model entitites schemas
 * @param {*} config typeorm connection config
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
