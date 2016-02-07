'use strict';


var MongoOplog = require('mongo-oplog');
var oplog = MongoOplog('mongodb://localhost/test', {ns: 'test.cats'}).tail();

oplog.tail(function(){
  console.log('tailing started');
})

oplog.on('insert', function (doc) {
  console.log('insert', doc.o);
});

oplog.on('update', function (doc) {
  console.log('update', doc.o);
});

oplog.on('delete', function (doc) {
  console.log('delete', doc.op);
});

oplog.on('error', function (error) {
  console.log('error', error);
});

oplog.on('end', function () {
  console.log('Stream ended');
});

oplog.stop(function () {
  console.log('server stopped');
});
