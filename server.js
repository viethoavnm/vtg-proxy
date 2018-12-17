const createProxy = require('./index');
const fs = require('fs');

const HTTPS_PORT = 443;

const options = {
  key: fs.readFileSync(__dirname + '/cert/spetrip.key'),
  cert: fs.readFileSync(__dirname + '/cert/bundle.crt')
}

const proxy = createProxy([
  { pathname: '/admin', dest: 'https://spetrip.com/admin' },
  { pathname: '/vtg', dest: 'https://spetrip.com/vtg' },
  { pathname: '/**', dest: 'http://localhost:8081' }
], options)

proxy.listen(HTTPS_PORT, err => {
  if (err) {
    throw err
  }
  console.log('========================================');
  console.log('*        PROXY IS RUNNING...           *');
  console.log('*                         :: ' + HTTPS_PORT + '.');
  console.log('========================================');
})