const { createServer } = require('http');
const url = require('url');
const { stdout } = require('process');
const { listSvc, registerSvc, removeSvc } = require('./worker.service');

let server;

function run() {
  server = createServer((req, res) => {
    function respond(statusCode, message) {
      res.statusCode = statusCode || 200;
      res.write(message || '');
      res.end();
    }

    try {
      const uri = url.parse(req.url, true);
      switch (uri.pathname) {
        case '/register':
          if (req.method === 'POST') {
            return registerSvc(req, res);
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
        case '/remove':
          if (req.method === 'DELETE') {
            return removeSvc(req, res);
          } else {
            respond(404);
          }
          break;
        default:
          respond(404);
      }
    } catch (err) {
      respond(500, 'unkown server error');
    }
  });

  // run server
  const PORT = 9999;
  server.listen(PORT, () => {
    stdout.write(`🚀 server listening on port ${PORT}\n`);
  });
}

function stop() {
  if (server) {
    server.close();
  }
}

module.exports = {
  run,
  stop,
};
