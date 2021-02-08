const nats = require('nats');

let client;

function connect(url, config) {
  return new Promise((resolve, reject) => {
    client = nats.connect(url, config);
    client.on('connect', () => {
      resolve();
    });
    client.on('error', (err) => {
      reject(err);
    });
  });
}

function publish(subject, data) {
  client.publish(subject, JSON.stringify(data));
}

function subscribe(subject, callback) {
  return client.subscribe(subject, callback);
}

function unsubscribe(sid) {
  return client.unsubscribe(sid);
}

function close() {
  if (!client) {
    return;
  }
  client.close();
}

module.exports = {
  connect,
  publish,
  subscribe,
  unsubscribe,
  close,
};
