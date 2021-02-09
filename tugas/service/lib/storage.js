/** @module objStorage */
const mime = require('mime-types');
const { Client } = require('minio');

const ERROR_REQUIRE_OBJECT_NAME = 'error wajib memasukan nama objek';
const ERROR_FILE_NOT_FOUND = 'error file tidak ditemukan';

let client;
let bucketname;

/**
 * Membuat koneksi ke object storage dan membuat bucket baru jika bucket belum ada
 * @async
 * @param {string} _bucketname nama bucket untuk menyimpan/mengambil file
 * @param {Object} options konfigurasi koneksi ke object storage
 * @throws {*} ketika bucket sudah ada
 *
 * @example
 * async function init() {
 *  await storage.connect('task-manager', {
 *    endPoint: '127.0.0.1',
 *    port: 9000,
 *    useSSL: false,
 *    accessKey: 'minioadmin',
 *    secretKey: 'minioadmin',
 *  });
 * }
 */
async function connect(_bucketname, options) {
  client = new Client({
    ...options,
    useSSL: false,
  });
  bucketname = _bucketname || 'photo';
  try {
    await client.makeBucket(bucketname);
  } catch (err) {
    if (err?.code === 'BucketAlreadyOwnedByYou') {
      return;
    }
    throw err;
  }
}

/**
 * Membuat nama acak untuk nama file
 * @param {string} mimetype ekstensi dari file
 * @returns {string} nama file setelah diacak
 */
function randomFileName(mimetype) {
  return (
    new Date().getTime() +
    '-' +
    Math.round(Math.random() * 1000) +
    '.' +
    mime.extension(mimetype)
  );
}

/**
 * Menyimpan file ke dalam object storage
 * @param {Blob} file file yang akan disimpan
 * @param {string} mimetype ekstensi dari file
 * @returns {Promise<string>} mengembalikan nama file yang berhasil disimpan
 */
function saveFile(file, mimetype) {
  const objectName = randomFileName(mimetype);
  return new Promise((resolve, reject) => {
    client.putObject(bucketname, objectName, file, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(objectName);
    });
  });
}

/**
 * Mengambil file dari object storage
 * @async
 * @param {string} objectName nama file yang akan diambil
 * @throws {string} ketika nama file kosong
 * @throws {string} ketika file tidak ditemukan di dalam object storage
 *
 * @returns {Blob} file dengan nama yang telah diberikan
 */
async function readFile(objectName) {
  if (!objectName) {
    throw ERROR_REQUIRE_OBJECT_NAME;
  }
  try {
    await client.statObject(bucketname, objectName);
  } catch (err) {
    if (err?.code === 'NotFound') {
      throw ERROR_FILE_NOT_FOUND;
    }
    throw err;
  }
  return client.getObject(bucketname, objectName);
}

module.exports = {
  saveFile,
  readFile,
  connect,
  ERROR_REQUIRE_OBJECT_NAME,
  ERROR_FILE_NOT_FOUND,
};
