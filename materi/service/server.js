const { createServer } = require('http');
const { connect } = require('./lib/orm');
const url = require('url');
const { stdout } = require('process');
const {
  listSvc,
  addSvc,
  removeSvc,
  doneSvc,
  undoneSvc,
} = require('./todo.service');
const { TodoSchema } = require('./todo.model');
const { config } = require('./config');

/**
 * intiate database connection
 */
async function init() {
  try {
    console.log('connect to database');
    await connect([TodoSchema], config.database);
    console.log('database connected');
  } catch (err) {
    console.error('database connection failed');
    return;
  }
}

const server = createServer((req, res) => {
  let method = req.method;
  // handle preflight request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // route service
  let message = 'tidak ditemukan data';
  let statusCode = 200;
  const uri = url.parse(req.url, true);
  const respond = () => {
    res.statusCode = statusCode;
    res.write(message);
    res.end();
  };
  switch (true) {
    case uri.pathname === '/add':
      if (method === 'POST') {
        addSvc(req, res);
      } else {
        message = 'Method tidak tersedia';
        respond();
      }
      break;
    case uri.pathname === '/remove':
      if (method === 'POST') {
        removeSvc(req, res);
      } else {
        message = 'Method tidak tersedia';
        respond();
      }
      break;
    case uri.pathname === '/list':
      if (method === 'GET') {
        listSvc(req, res);
      } else {
        message = 'Method tidak tersedia';
        respond();
      }
      break;
    case uri.pathname === '/done':
      if (method === 'PUT') {
        doneSvc(req, res);
      } else {
        message = 'Method tidak tersedia';
        respond();
      }
      break;
    case uri.pathname === '/undone':
      if (method === 'PUT') {
        undoneSvc(req, res);
      } else {
        message = 'Method tidak tersedia';
        respond();
      }
      break;
    default:
      statusCode = 404;
      respond();
  }
});

init();
const PORT = config.server.port;
server.listen(PORT, () => {
  stdout.write(`server listening on port ${PORT}\n`);
});
