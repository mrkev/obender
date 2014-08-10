var assert = require('assert');
var expect = require('chai').expect;
var chai   = require('chai');

chai.should();
// Add test on adding object to obender. Matches all.
// Add integration tests. Matching applies modifiers only to matched objects.

describe('Obender matching', function(){

	var _ob, original;
	beforeEach(function(){
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

	it('responds to everything it should', function () {
		expect(_ob).to.respondTo('match');
		expect(_ob).to.respondTo('matchAlso');
		expect(_ob).to.respondTo('matchRemove');
		expect(_ob).to.respondTo('unmatch');
		expect(_ob).to.respondTo('matchOnly');
		expect(_ob).to.respondTo('matchAll');
	});


	
	describe('#match()', function() {
		
		it('matches regexp', function(){

			var result = _ob.match(/aw/).matchedKeys();
			var expected = ['awesome', 'awebo'];

			var equal = arrays_equal_strict(expected, result)
			expect(equal).to.equal(true);

		});

		it('matches flagged regexp', function(){

			var result = _ob.match(/aw/i).matchedKeys();
			var expected = ['awesome', 'awebo', 'AWkay'];

			var equal = arrays_equal_strict(expected, result)
			expect(equal).to.equal(true);

		});

		it('matches new keys each time', function(){

			var result = _ob.match(/aw/i).match(/nothing/).matchedKeys();

			expect(result.length).to.equal(0);

		});
	}); // ✓

	describe('#matchAlso()', function() {
		beforeEach(function () {
			_ob.match(/aw/i);
		});

		it('adds matches to matched keys and doesn\'t add duplicates', function(){
			var result = _ob.matchAlso(/2/).matchedKeys();
			var expected = ['awesome', 'awebo', 'AWkay', '12lolcatz', '102'];

			var equal = arrays_equal(expected, result)
			expect(equal).to.equal(true);

		});
	}); // ✓

	describe('#matchRemove()', function() {
		beforeEach(function () {
			_ob.match(/aw/i);
		});

		it('removes matches from matched keys', function(){
			var result = _ob.matchRemove(/o/).matchedKeys();
			var expected = ['AWkay'];

			var equal = arrays_equal_strict(expected, result)
			expect(equal).to.equal(true);
		});

		it('works as alternative syntax (#unmatch())', function () {
			var result = _ob.unmatch(/o/).matchedKeys();
			var expected = ['AWkay'];

			var equal = arrays_equal_strict(expected, result)
			expect(equal).to.equal(true);
		});
	}); // ✓

	describe('#matchOnly()', function() {

		it('matches only one property', function(){
			var result = _ob.matchOnly('102').matchedKeys();
			var expected = ['102'];

			var equal = arrays_equal_strict(expected, result)
			expect(equal).to.equal(true);
		});

		it('returns an empty array if there\'s no match', function () {
			var result = _ob.matchOnly('hellothere').matchedKeys();
			var expected = [];

			var equal = arrays_equal_strict(expected, result)
			expect(equal).to.equal(true);
		});
	}); // ✓

	describe('#matchAll()', function() {

		it('matches all', function(){
			var result = _ob.matchAll().matchedKeys();
			var expected = ['awesome', 'awebo', 'AWkay', '12lolcatz', 
							'leprechaun', 'edmonton-', '102'];

			var equal = arrays_equal(expected, result)
			expect(equal).to.equal(true);
		});
	}); // ✓

});

var arrays_equal = function (arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (var i = 0; i < arr1.length; i++) {
		if (arr2.indexOf(arr1[i]) < 0) return false;
	}
	return true;
}

var arrays_equal_strict = function (arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}