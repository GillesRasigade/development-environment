'use strict';

module.exports =
class B {
  constructor() {
    this.a = new A('B');
  }
}

const A = require('./A');