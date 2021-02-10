/** @module messageBus */
const nats = require('nats');
// eslint-disable-next-line no-unused-vars
const { Subscription } = require('rxjs');

let client;

/**
 * Membuat koneksi ke message bus
 * @param {string} url alamat url jika diperlukan
 * @param {Object} config konfigurasi tambahan jika diperlukan
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
 * Mempublikasikan pesan melewati message bus
 * @param {string} subject nama saluran untuk mempublikasikan pesan
 * @param {string} data isi pesan yang akan dipublikasikan
 */
function publish(subject, data) {
  client.publish(subject, JSON.stringify(data));
}

/**
 * Berlangganan ke saluran tertentu untuk mendapatkan pesan dari message bus
 * @param {string} subject nama saluran untuk berlangganan
 * @param {callback} callback callback yang dijalankan ketika mendapatkan pesan
 *
 * @returns {Subscription} identifier untuk langganan
 */
function subscribe(subject, callback) {
  return client.subscribe(subject, callback);
}

/**
 * Berhenti berlangganan dari saluran tertentu
 * @param {string} sid identifier dari langganan tertentu
 */
function unsubscribe(sid) {
  return client.unsubscribe(sid);
}

/**
 * Menutup koneksi ke message bus
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
