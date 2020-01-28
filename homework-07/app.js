const http = require('http');
const requestHandler = require('./src/requestHandler.js');

const server = http.createServer(requestHandler);
server.listen(3000, () => {
  console.log('Server started');
});
