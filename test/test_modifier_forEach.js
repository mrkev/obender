var assert = require('assert');
var expect = require('chai').expect;
var chai   = require('chai');
var suite  = require('./util');

chai.should();

describe('Obender\'s mighty doings!', function(){

	var _ob, original;
	beforeEach(function(){
		original = { 
		    'String'    	: 'hello, world!',
		    'function'  	: function () { console.log('hello, world!'); },
		    'null' 			: null,
		    'undefined'     : undefined,
		    'number'        : 317,
		    'object'        : {a : 'a', b : 'b'}
		}

		_ob = require(suite.obpath)(original);

	});

	it('responds to #forEach', function () {
		expect(_ob).to.respondTo('forEach');
	});

	
	describe('#forEach()', function() {

		it('is called once for each key value pair, with correct keys and values');

		it('will modify keys and values');

		it('doesn\'t crash on non-returning function');

		it('calls with the object as this (and can be modified)', function () {
			var result = _ob.forEach(function (property) {
				if (property.key === 'null') {
					delete this[property.key];
					delete this['object'];
				}

				if (typeof property.value === 'undefined') {
					this.hello = 'world';
				}
			}).object();

			var expected = {
				'String'    	: 'hello, world!',
				'function'  	: function () { console.log('hello, world!'); },
				'undefined'     : undefined,
				'number'        : 317,
				'hello'			: 'world'
			}

			expect(compareObjects(result, expected)).to.equal(true);
		});

		it('is applied only to matched properties');



		//it('doesn\'t crash on non-found or empty property names.', function(){
	
		//		var result = _ob.forEach(function (property) {
	
		//			if (property.key === 'null') delete this[property.key];
		//			if (typeof property.value === 'function') {
		//				property.value = 'function';
		//			}
	
		//			if (property.value && property.value.a) {
		//				for (_key in property.value) {
		//					this[_key] = property.value[_key];
		//				}
	
		//				delete this[property.key];
		//			} 
	
		//		}).done();
	
		//		var expected = {
		//			'String'    	: 'hello, world!',
		//			'function'  	: 'function',
		//			'undefined'     : undefined,
		//			'number'        : 317,
		//			'a'				: 'a',
		//			'b'				: 'b'
		//		}
	
		//		console.dir(result);
	
		//		expect(result).to.deep.equal(expected);
		//}); // ✓

	});
});

var compareObjects = function (o1, o2) {
	var ks1 = Object.keys(o1);
	var ks2 = Object.keys(o2);
	if (ks1.length != ks2.length) return false;

	var result = true;
	ks1.forEach(function (k1) {
		result = result && ks2.indexOf(k1) > -1;
	});

	return result;
}