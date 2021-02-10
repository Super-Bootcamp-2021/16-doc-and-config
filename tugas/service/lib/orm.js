/** @module orm */
const { createConnection } = require('typeorm');
// eslint-disable-next-line no-unused-vars
const { EntitySchema } = require('typeorm');

/**
 * Membuat koneksi ke database
 *
 * @param {EntitySchema[]} entities model entitites schemas
 * @param {Object} config additional [`typeorm`](https://typeorm.io) connection config
 *
 * @example
 * // initiate database connection
 * async function init() {
 *  await connect([MySchema], {
 *    type: 'postgres',
 *    host: 'localhost',
 *    port: 5432,
 *    username: 'postgres',
 *    password: 'postgres',
 *    database:
 *    'database',
 *  });
 * }
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
