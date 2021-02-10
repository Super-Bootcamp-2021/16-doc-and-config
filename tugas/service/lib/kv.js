/** @module kv */

const redis = require('redis');
const { promisify } = require('util');

let client;

/**
 * koneksi ke kv database
 * @param {*} options options
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
 * menyimpan ke kv database
 * @param {string} db key yang disimpan ke kv database
 * @param {string} data value yang disimpan ke kv database
 */
function save(db, data) {
  const setAsync = promisify(client.set).bind(client);
  return setAsync(db, data);
}

/**
 * mendapatkan value dengan key tertentu
 * @param {string} db key yang disimpan di kv database
 */
async function read(db) {
  const getAsync = promisify(client.get).bind(client);
  const val = await getAsync(db);
  return JSON.parse(val);
}

/**
 * menghapus key dan value
 * @param {string} db key yang disimpan di kv database
 */
function drop(db) {
  const delAsync = promisify(client.del).bind(client);
  return delAsync(db);
}

/**
 * memutus koneksi database
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
