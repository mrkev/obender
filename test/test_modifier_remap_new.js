var assert = require('assert');
var expect = require('chai').expect;
var chai   = require('chai');
var suite  = require('./util');

chai.should();

describe('Obender\'s mighty remap function!', function(){

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

	it('responds to #remap', function () {
		expect(_ob).to.respondTo('remap');
	});

	
	describe('#remap()', function() {

		it('doesn\'t crash on non-found or empty property names.');


		it('works for changing property names');

		it('can handle empty values');

		it('can handle repetitions');

		it('works for changing property names with function modifiers');

		it('works for changing names and values');

		it('doesn\'t crash from unproperly formatted mapping objects');

		it('Handles error on bending functions correctly');

		it('doesn\'t crash on non-returning function');

		it('is applied only to matched properties');


		it('will modify keys and values');

		it('calls with the object as this (and can be modified)');


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