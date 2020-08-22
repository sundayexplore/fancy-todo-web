import { join } from 'path';
import { https } from 'firebase-functions';
import next from 'next';

const isDev: boolean = process.env.NODE_ENV !== 'production';
const nextjsDistDir = join(require('../../next.config.js').distDir);

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir
  }
});

const nextjsHandle = nextjsServer.getRequestHandler();

export default https.onRequest((req, res) => nextjsServer.prepare().then(() => nextjsHandle(req, res)));
