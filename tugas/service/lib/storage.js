const mime = require('mime-types');
const { Client } = require('minio');

const ERROR_REQUIRE_OBJECT_NAME = 'error wajib memasukan nama objek';
const ERROR_FILE_NOT_FOUND = 'error file tidak ditemukan';

let client;
let bucketname;

async function connect(_bucketname, options) {
  client = new Client({
    ...options,
    useSSL: false,
  });
  bucketname = _bucketname || 'photo';
  await client.listBuckets();
}

function randomFileName(mimetype) {
  return (
    new Date().getTime() +
    '-' +
    Math.round(Math.random() * 1000) +
    '.' +
    mime.extension(mimetype)
  );
}

function saveFile(file, mimetype) {
  const objectName = randomFileName(mimetype);
  return new Promise((resolve, reject) => {
    client.putObject(bucketname, objectName, file, (err, etag) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(etag);
    });
  });
}

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
};
