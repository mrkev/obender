var assert = require('assert');
var expect = require('chai').expect;

var obpath = '../index.js';


/**
 * Tests the waking up of obender, and the information
 * it stores.
 * @return {[type]} [description]
 */
describe('Obender waking up', function(){

	it('can be loaded without blowing up', function () {
		assert.doesNotThrow(function () {require(obpath)});
		expect(require(obpath)).to.not.be.undefined;
	});

	it('responds to what we expect it to respond', function () {
		expect(require(obpath)).to.respondTo('remap');
		expect(require(obpath)).to.respondTo('ob');
	});

	describe('#constructor', function () {

		var _ob, original;
		beforeEach(function () {
			original = { 
			    'awesome'    	: 'hello, world!',
			    'awebo'  		: function () { console.log('hello, world!'); },
			    'AWkay'  		: function () { console.log('hello, world!'); },
			    '12lolcatz' 	: null,
			    'leprechaun'    : undefined,
			    'edmonton-'     : 317,
			    '102'        	: {a : 'a', b : 'b'}
			}

			_ob = require('../index.js').ob(original);

		});


		it('matches all keys when first created', function () {

			var result = _ob.matchedKeys();
			var expected = ['awesome', 'awebo', 'AWkay', '12lolcatz', 
							'leprechaun', 'edmonton-', '102'];

			var equal = arrays_equal(expected, result)
			expect(equal).to.equal(true);

		});

		it('keeps the object it\'s supposed to modify', function () {
			expect(_ob.object()).to.deep.equal(original);
		});
	});
});

var arrays_equal = function (arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (var i = 0; i < arr1.length; i++) {
		if (arr2.indexOf(arr1[i]) < 0) return false;
	}
	return true;
}