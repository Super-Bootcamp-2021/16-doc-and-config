const http = require('http');

const WORKER_HOST = 'http://localhost:7001';
const ERROR_WORKER_NOT_FOUND = 'pekerja tidak ditemukan';

function info(id) {
  return new Promise((resolve, reject) => {
    const req = http.request(`${WORKER_HOST}/info?id=${id}`, (res) => {
      let data = '';
      if (res.statusCode === 404) {
        reject(ERROR_WORKER_NOT_FOUND);
      }
      res.on('data', (chunk) => {
        data += chunk.toString();
      });
      res.on('end', () => {
        const worker = JSON.stringify(data);
        resolve(worker);
      });
      res.on('error', (err) => {
        reject(err?.message || err.toString());
      });
    });
    req.end();
  });
}

module.exports = {
  info,
};
