var should = require('should');

var app = require('../app.js');

describe('app.js', function(){
  it('return double of a', function(){
    app.test(1).should.eql(2);
  })
});
