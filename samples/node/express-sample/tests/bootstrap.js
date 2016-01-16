/**
 * Load all necessary modules for the tests.
 */

global.request = require('supertest'),
global.express = require('express'),
global.should = require('chai').should(),
global.chai = require('chai'),
global.expect = chai.expect,
global.should = chai.should();

global.app = require('../app');
