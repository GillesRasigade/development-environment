'use strict';

var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:4080');

ws.on('open', function open() {

  ws.on('message', function incoming(message, opts) {
    console.log('received: %s', message);
  });

  ws.send('ping', { mask: true });
});
