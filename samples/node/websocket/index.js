'use strict';

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 4080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message, flags) {
    if (flags.binary) {
      console.log('Not managed yet =)...');
    } else {
      console.log('received: %s', message);
      ws.send('pong');
    }
  });

  // Stop sending heartbeat :D !
  ws.on('close', function open() {
    clearInterval(interval);
  });

  // Send heartbeat:
  var interval = setInterval(() => {
    // ws.send('heartbeat', {mask: true}); // Not yet validated on browser-side
    ws.send('heartbeat');
  }, 1000);
});
