/** @module storage */

const mime = require('mime-types');
const { Client } = require('minio');

const ERROR_REQUIRE_OBJECT_NAME = 'error wajib memasukan nama objek';
const ERROR_FILE_NOT_FOUND = 'error file tidak ditemukan';

let client;
let bucketname;

/**
 * function to connect to storage database
 * @param {string} _bucketname folder name to store data
 * @param {[{}]} options list of object opstions
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
 * function to generate random filename for given mimetype
 * @param {string} mimetype type of data
 * @returns {string} random filename
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
 * function to save uploaded file to storage
 * @param {string} file
 * @param {string} mimetype
 * @returns {Promise}
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
 * function to read file from storage
 * @param {string} objectName 
 * @throws Will error if no objectName
 * @throws Will error if file not found for given objectName
 * @returns {ServerResponse} shows file
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
