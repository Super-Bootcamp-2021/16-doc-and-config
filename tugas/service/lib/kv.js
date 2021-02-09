/** @module LibraryKv */

const redis = require('redis');
const { promisify } = require('util');

let client;

/**
 * function connect
 * @param {Object} options config for connect kv
 * @returns {Promse<Client>}
 */
function connect(options) {
  return new Promise((resolve, reject) => {
    client = redis.createClient(options);
    client.on('connect', () => {
      resolve();
    });
    client.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * function save kv
 * @param {object} db config database kv
 * @param {object} data data object
 * @returns {Promise<Save>} save data to kv
 */
function save(db, data) {
  const setAsync = promisify(client.set).bind(client);
  return setAsync(db, data);
}

/**
 * function read data kv
 * @param {object} db data object
 * @returns {JSON} Json parse data
 */
async function read(db) {
  const getAsync = promisify(client.get).bind(client);
  const val = await getAsync(db);
  return JSON.parse(val);
}

/**
 * function drop data kv
 * @param {object} db data object
 */
function drop(db) {
  const delAsync = promisify(client.del).bind(client);
  return delAsync(db);
}

/**
 * function disconnect kv
 * @function close close connection kv
 */
function close() {
  if (!client) {
    return;
  }
  if (client.connected) {
    client.end(true);
  }
}

module.exports = {
  connect,
  save,
  read,
  close,
  drop,
};
