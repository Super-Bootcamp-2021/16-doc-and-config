/** @module lib_bus */
const nats = require('nats');

let client;

/**
 * #### Connection Function of NATS <br>
 * Connect to a nats-server and return the client.
 * Argument can be a url or a port, or a ClientOpts with a 'url'
 * and additional options
 * @param {String} url url of message bus NATS
 * @param {Object} config config of message bus NATS
 * @returns {Promise}
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
 * #### NATS Publish Function to Publish Message in specific Subject/Topic <br>
 * Publish a message to the given subject, with optional reply and callback.
 * @param {String} subject subject/topic NATS
 * @param {String} data message to publish
 */
function publish(subject, data) {
  client.publish(subject, JSON.stringify(data));
}

/**
 * #### NATS Subscribe Function to Subscribe Subject/Topic <br>
 * Subscribe to a given subject, with optional options and callback. opts can be 
 * omitted, even with a callback. A subscription id is returned.
 * @param {String} subject subject/topic of NATS
 * @param {Object} callback callback 
 */
function subscribe(subject, callback) {
  return client.subscribe(subject, callback);
}

/**
 * #### NATS Unsubscribe Function to Unsubscribe Topic/Subject <br>
 * Unsubscribe to a given subscription id, with optional max number of messages before unsubscribing.
 * @param {number} sid 
 */
function unsubscribe(sid) {
  return client.unsubscribe(sid);
}

/**
 * #### Close Connection Functions of NATS <br>
 * Close the connection to the server.
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
