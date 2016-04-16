'use strict';

const A = require('./A');
const B = require('./B');

let lastMemory = 0;
function mem(n) {
  const _lastMemory = lastMemory;
  lastMemory = process.memoryUsage().heapUsed/1e6;
  console.log(lastMemory.toFixed(3) + 'Mb', (lastMemory - _lastMemory).toFixed(3) + 'Mb');
  if (n) {
    console.log('> ' + ((lastMemory - _lastMemory)/n) + 'Mb');
  }
}

console.log(5, A, B);

mem();

const a = new A();

mem();

const b = new B();

mem();

const instances = [];
try {
  for (var i = 0 ; i < 1e9 ; i++) {
    instances.push(new A());
  }
} catch (error) {
  console.error(error);
}

mem(instances.length);