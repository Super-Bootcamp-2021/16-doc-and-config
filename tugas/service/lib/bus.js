/** @module natsServer */
const nats = require('nats');

let client;

/**
 * function to connect to message bus
 * @param {url} url 
 * @param {*} config 
 * @returns {Promise<MessageBusNats} 
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
 * function to publish message to message bus
 * @param {string} subject streamer message bus 
 * @param {object} data data to emit
 */
function publish(subject, data) {
  client.publish(subject, JSON.stringify(data));
}

/**
 * function to subscribe subject from message bus
 * @param {string} subject subject to subscribe
 * @param {callback} callback 
 */
function subscribe(subject, callback) {
  return client.subscribe(subject, callback);
}

/**
 * function to unsubscribe subject from message bus
 * @param {MessageBus} sid 
 */
function unsubscribe(sid) {
  return client.unsubscribe(sid);
}

/**
 * function to close connection to message bus
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
