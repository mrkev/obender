/* global module */
'use strict';

// { '*'  : ['string', 'number', 'function', {'*' : ['function', 'number', 'string']}] }
module.exports.remap = function(map, obj) {
	if (obj === null || obj === undefined ||
		map === null || map === undefined) { 
		return; }


	for (var _okey in map) {

		// There's no such key to map. Move on.
		if (!obj.hasOwnProperty(_okey)) continue;


		var _nkey = map[_okey];

		// Key is mapped to nothing. Move on. To map to 'null' and 'undefined'
		// user should use literal strings.
		if (_nkey === undefined ||
			_nkey === null) continue;


		// If we're mapping to a non-primitive encapsulating object, we'll try
		// to use it.
		if (typeof _nkey === 'object' && 
			_nkey.constructor === Object) {	


			//
			// {'Color' : {'key' : 'color', 
			// 			   'val' :'yo'}}
			//
			// 

			var _key = _nkey.key;
			var _val = _nkey.val;

			// We'll do nothing with the key because that will be dealt with
			// outside this 'if'. Lets check out the value though.
			
			// Hmm value isn't anything? Must be in the compact syntax then.
			if (_val === undefined) {
				_key = Object.keys(_nkey)[0];
				_val = _nkey[_key];
			}
			

			// If new value is a function, evaluate it.
			if (typeof _val === 'function') {
				var _oval = obj[_okey];

				try { 
					var _n = _val(_oval);
					_val  = _n; }

				catch (e) { 
					_val = _oval; }
			}

			// Set the new value. try
			if (_val !== undefined && _val !== null) obj[_okey] = _val;

			// Remember how we will deal with the key outside these brackets?
			// Well make sure that happens.
			if (_key !== null || _key !== undefined) _nkey = _key;
		}

		// If we're mapping the key to a function, evaluate that function.
		if (typeof _nkey === 'function') {
			try { 
				var _n = _nkey(_okey).toString();
				_nkey  = _n; }

			catch (e) { 
				_nkey = _okey; }
		}

		// Don't override any pre-existing properties.
		// No need to change if the new key is same as old.
		if (obj.hasOwnProperty(_nkey) || 
			_nkey === _okey) continue;

		// Replace the old key with the new key.
		obj[_nkey] = obj[_okey];
		delete obj[_okey];
	}
}; 




// TODO: [String:], [Number:], [Boolean:] objects?

// if (typeof map[_okey] === 'string' ||
// 	typeof map[_okey] === 'number') {
// 		_nkey  = map[_okey];
// 	obj[_nkey] = obj[_okey];
// 	delete obj[_okey];
// 	continue;
// 	
// } else 

// function complies (map, obj) {
// 	for (var _key in map) {
// 		var exp = new RegExp(_key);
// 	}
// }


//
// {'one' : 'two'}
// 
// 
// 
// 
// 


// module.exports.ob  = function (obj) {
// 	function Obender (obj) {
// 		return new Promise()
// 	}
// 	
//	Obender.prototype.remap = function(map) {
//		// body...
//	};
// 
// 
// 
// 
// 	return new Obender(obj);
// })