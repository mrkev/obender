var assert = require('assert');
var expect = require('chai').expect;

var obpath = '../index.js';

describe('Obender waking up', function(){

	it('can be loaded without blowing up', function () {
		assert.doesNotThrow(function () {require(obpath)});
		expect(require(obpath)).to.not.be.undefined;
	});

	it('responds to what we expect it to respond', function () {
		expect(require(obpath)).to.respondTo('remap');
		expect(require(obpath)).to.respondTo('ob');
	});

});