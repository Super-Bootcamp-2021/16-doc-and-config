const { createServer } = require('http');
const url = require('url');
const { stdout } = require('process');
const {
  addSvc,
  cancelSvc,
  doneSvc,
  listSvc,
  getAttachmentSvc,
} = require('./task.service');
// eslint-disable-next-line no-unused-vars
const { IncomingMessage, ServerResponse } = require('http');

const { config } = require('../config');
let server;

/**
 * Membuat server dan menjalankan server
 * @param {callback} callback callback ketika server dimatikan
 */
function run(callback) {
  server = createServer((req, res) => {
    // cors
    const aborted = cors(req, res);
    if (aborted) {
      return;
    }

    function respond(statusCode, message) {
      res.statusCode = statusCode || 200;
      res.write(message || '');
      res.end();
    }

    try {
      const uri = url.parse(req.url, true);
      switch (uri.pathname) {
        case '/add':
          if (req.method === 'POST') {
            return addSvc(req, res);
          } else {
            respond(404);
          }
          break;
        case '/list':
          if (req.method === 'GET') {
            return listSvc(req, res);
          } else {
            respond(404);
          }
          break;
        case '/done':
          if (req.method === 'PUT') {
            return doneSvc(req, res);
          } else {
            respond(404);
          }
          break;
        case '/cancel':
          if (req.method === 'PUT') {
            return cancelSvc(req, res);
          } else {
            respond(404);
          }
          break;
        default:
          if (/^\/attachment\/\w+/.test(uri.pathname)) {
            return getAttachmentSvc(req, res);
          }
          respond(404);
      }
    } catch (err) {
      respond(500, 'unkown server error');
    }
  });

  // stop handler
  server.on('close', () => {
    if (callback) {
      callback();
    }
  });

  // run server
  const PORT = config.server.task_port;
  server.listen(PORT, () => {
    stdout.write(`🚀 task service listening on port ${PORT}\n`);
  });
}

/**
 * Menangani CORS
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
function cors(req, res) {
  // handle preflight request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }
}

/**
 * Mematikan server
 */
function stop() {
  if (server) {
    server.close();
  }
}

module.exports = {
  run,
  stop,
  cors,
};
