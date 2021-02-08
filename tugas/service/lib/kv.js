const redis = require('redis');
const { promisify } = require('util');

let client;

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

function save(db, data) {
  const setAsync = promisify(client.set).bind(client);
  return setAsync(db, data);
}

async function read(db) {
  const getAsync = promisify(client.get).bind(client);
  const val = await getAsync(db);
  return JSON.parse(val);
}

function drop(db) {
  const delAsync = promisify(client.del).bind(client);
  return delAsync(db);
}

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
