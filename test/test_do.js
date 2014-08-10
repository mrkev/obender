var assert = require('assert');
var expect = require('chai').expect;
var chai   = require('chai');

chai.should();

describe('Obender\'s mighty do!', function(){

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

		_ob = require('../index.js').ob(original);

	});


	
	describe('#do()', function() {

		it('doesn\'t crash on non-found or empty property names.', function(){

				var result = _ob.do(function (property) {

					if (property.key === 'null') delete this[property.key];
					if (typeof property.value === 'function') {
						property.value = 'function';
					}

					if (property.value && property.value.a) {
						for (_key in property.value) {
							this[_key] = property.value[_key];
						}

						delete this[property.key];
					} 

				}).done();

				var expected = {
					'String'    	: 'hello, world!',
					'function'  	: 'function',
					'undefined'     : undefined,
					'number'        : 317,
					'a'				: 'a',
					'b'				: 'b'
				}

				console.dir(result);

				expect(result).to.deep.equal(expected);
		}); // ✓

		// it('doesn\'t crash on non-found or empty property names.'); // TODO

	});
});