#!/usr/bin/env node

// > node-debug --save-live-edit --debug-brk --web-port=8081 app.js

/**
 * Debug function executed with
 * > node-debug --save-live-edit --debug-brk --web-port=8081 app.js
 */
var debug = function debug() {
  for (var i = 0; i < 5; i++) {
    debugger;
    console.log(i);
  }
  console.log("done");
  process.exit(0);
}

if ('1' === process.env.DEBUG) {
  debug();
}

/**
 * Test function evaluated by mocha with
 * > mocha --debug-brk
 *
 * Open then a new terminal and start node-inspector
 * > node-inspector --save-live-edit --web-port=8081
 *
 * @param  {Number} a Number to double
 * @return {Number}   Double of a
 */
var test = function test(a) {
  debugger;
  return 2 * a;
}

module.exports.test = test;

