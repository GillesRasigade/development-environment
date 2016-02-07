'use strict';

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 4080 });

var MongoOplog = require('mongo-oplog');
var oplog = MongoOplog('mongodb://localhost/test', {ns: 'test.cats'}).tail();

oplog.tail(function(){
  console.log('tailing started');
})

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message, flags) {
    if (flags.binary) {
      console.log('Not managed yet =)...');
    } else {
      console.log('received: %s', message);
      ws.send('pong');
    }
  });

  oplog.on('op', function (data) {
    ws.send(JSON.stringify(data), {mask: true});
  });
});
