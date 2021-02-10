/** @module redis */
const redis = require('redis');
const { promisify } = require('util');

let client;

/**
 * function to connect to key value storage
 * @param {*} options 
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
 * function to save data to KV
 * @param {key<string>} db 
 * @param {value<object>} data 
 */
function save(db, data) {
  const setAsync = promisify(client.set).bind(client);
  return setAsync(db, data);
}

/**
 * function to read value from given key
 * @param {key<string>} db 
 */
async function read(db) {
  const getAsync = promisify(client.get).bind(client);
  const val = await getAsync(db);
  return JSON.parse(val);
}

/**
 * function to drop key from KV
 * @param {key<string>} db 
 */
function drop(db) {
  const delAsync = promisify(client.del).bind(client);
  return delAsync(db);
}

/**
 * function to close KV storage
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
