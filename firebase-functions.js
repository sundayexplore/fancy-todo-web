const { join } = require('path');
const { https } = require('firebase-functions');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';
const nextjsDistDir = join(require('./next.config').distDir);

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir,
  },
});

const nextjsHandle = nextjsServer.getRequestHandler();

exports.fancyTodoWeb = https.onRequest((req, res) =>
  nextjsServer.prepare().then(() => nextjsHandle(req, res)),
);
