'use strict';

module.exports = class A {
  constructor(name) {
    this.name = name || 'A';
    this.uuid = Math.random()*1e6
  }
}

const B = require('./B');