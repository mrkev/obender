var assert = require('assert');
var expect = require('chai').expect;
var chai   = require('chai');

chai.should();

describe('Obender', function(){

	it('can be loaded without blowing up', function () {
		assert.doesNotThrow(function () {require('./index.js')});
		expect(require('./index.js')).to.not.be.undefined;
	});

	it('responds to what we expect it to respond', function () {
		expect(require('./index.js')).to.respondTo('remap');
	});

	var remap, object;
	beforeEach(function(){
		remap  = require('./index.js').remap;
		object = {          
		    'Queue Name'    : 'wsh1',
		    'Printer Name'  : 'WSH Browsing Library 1',
		    'Printer Model' : 'Xerox Phaser 4510DT',
		    'Color'         : 'B/W',
		    'DPI'           : '600',
		    'Duplex'        : 'Two-sided',
		    '¢/Pg'          : '9'
		}
	});


	describe('#remap()', function() {		
		it('works for changing property names', function(){
			remap(
				{'Queue Name'		: 'queue_name',
				 'Printer Name'		: 'printer_name',
				 'Printer Model'	: 'printer_model',
				 'Color'			: 'color',
				 'DPI'				: 'dpi',
				 'Duplex'			: 'duplex',
				 '¢/Pg'			    : 'price_per_page'
				}, object);

			var yofrankie = 
				{ queue_name: 'wsh1',
	        	  printer_name: 'WSH Browsing Library 1',
	        	  printer_model: 'Xerox Phaser 4510DT',
	        	  color: 'B/W',
	        	  dpi: '600',
	        	  duplex: 'Two-sided',
	        	  price_per_page: '9'
	        	}

			expect(object).to.deep.equal(yofrankie);

		});

		it('doesn\'t crash on non-found properties', function(){
			remap(
				{'Queue Name'		: 'queue_name',
				 'Printer Name'		: 'printer_name',
				 'Printer Model'	: 'printer_model',
				 'B/W'				: 'black_and_white', // Doesn't exist
				 'DPI'				: 'dpi',
				 'Duplex'			: 'duplex',
				 '¢/Pg'			    : 'price_per_page'
				}, object);

			var yofrankie = 
				{ queue_name: 'wsh1',
	        	  printer_name: 'WSH Browsing Library 1',
	        	  printer_model: 'Xerox Phaser 4510DT',
	        	  'Color': 'B/W',
	        	  dpi: '600',
	        	  duplex: 'Two-sided',
	        	  price_per_page: '9'
	        	}

			expect(object).to.deep.equal(yofrankie);
		});


		it('works for changing names and values', function(){
			remap(
				{'Queue Name'		:  'queue_name',
				 'Printer Name'		:  'printer_name',
				 'Printer Model'	:  'printer_model',
				 'Color'			: {'color'			: function (value) { return value === 'Color'; } },
				 'DPI'				:  'dpi',
				 'Duplex'			: {'duplex' 		: function (value) { return value === "Two-sided"; } },
				 '¢/Pg'			 	: {'price_per_page' : function (value) { return parseFloat(value) / 100; } }
				}, object);	

			var expected = 
				{ queue_name: 'wsh1',
	        	  printer_name: 'WSH Browsing Library 1',
	        	  printer_model: 'Xerox Phaser 4510DT',
	        	  color: false,
	        	  dpi: '600',
	        	  duplex: true,
	        	  price_per_page: 0.09
	        	}

	        expect(object).to.deep.equal(expected);
		});

		it('doesn\'t crash from unproperly formatted mapping objects', function(){
			assert(false);
		});

		it('Handles error on bending functions correctly', function(){
			assert(false);
		});
	});
});
