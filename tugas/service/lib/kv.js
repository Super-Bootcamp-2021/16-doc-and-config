/** @module lib_kv */
const redis = require('redis');
const { promisify } = require('util');

let client;

/**
 * Connect Functions of Redis
 * @param {*} options additional options of Redis Connection
 * @see https://github.com/NodeRedis/node-redis#user-content-options-object-properties
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
 * Save Function to save/store data into KV database
 * @param {String} db key of database
 * @param {String} data value of database
 */
function save(db, data) {
  const setAsync = promisify(client.set).bind(client);
  return setAsync(db, data);
}

/**
 * Read Function to read/get value in specific key of KV Database
 * @param {String} db key of database
 */
async function read(db) {
  const getAsync = promisify(client.get).bind(client);
  const val = await getAsync(db);
  return JSON.parse(val);
}

/**
 * Drop Function to drop/delete key from KV Database
 * @param {String} db key of database
 */
function drop(db) {
  const delAsync = promisify(client.del).bind(client);
  return delAsync(db);
}

/**
 * Close Connections of Redis
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
