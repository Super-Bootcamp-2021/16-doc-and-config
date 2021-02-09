/** @module LibraryBus */
const nats = require('nats');

let client;

/**
 * function for connect message bus
 * @param {string} url url for message bus
 * @param {object} config config for message bus
 * @returns {Promise<Connect>} if resolve connect success
 */
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

/**
 * function for publish message bus
 * @param {string} subject subject of message bus
 * @param {object} data data of message bus
 */
function publish(subject, data) {
  client.publish(subject, JSON.stringify(data));
}

/**
 * function subscribe for message bus
 * @param {string} subject subject of message bus
 * @param {string} callback callback subscribe
 * @returns {ClientSubscribe} client success subscribe
 */
function subscribe(subject, callback) {
  return client.subscribe(subject, callback);
}

/**
 * function unsubscribe
 * @param {string} sid subscribe id
 * @returns {ClientUnsubscribe} client success unsubscribe
 */
function unsubscribe(sid) {
  return client.unsubscribe(sid);
}

/**
 * function close client bus
 * @function close close client
 * @returns end of function
 */
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
