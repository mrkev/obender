/* global module, console */
'use strict';

/**
 * Obenders mighty remap function. Changes property
 * names, and optionally values.
 * @param  {object} map The mapping to use
 * @param  {object} obj The object to apply the mapping to
 */

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






// { '*'  : ['string', 'number', 'function', {'*' : ['function', 'number', 'string']}] }


module.exports.ob = (function (object) {

																   /* Starter */

	function Obender (obj) {
		// if (!obj) throw ?
		this.obj = obj;
		this.matched = Object.keys(this.obj);
	}

																  /* Matchers */

	/**
	 * Subsequent modifying functions will apply only
	 * to keys that match the provided regexp.
	 * @param  {RegExp} regexp The regexp to test against the keys
	 */
	Obender.prototype.match = function(regexp) {
		var _keys = Object.keys(this.obj);
		this.matched = [];
		for (var i = 0; i < _keys.length; i++) {
			if (_keys[i].match(regexp) === null) continue;
			this.matched.push(_keys[i]);
		}

		return this;
	};

	/**
	 * Subsequent modifying functions will apply to all
	 * keys prevously matched plus the ones matching the 
	 * provided regexp.
	 * @param {RegExp} regexp Cuz I need to know which to match
	 */
	Obender.prototype.matchAlso = function(regexp) {
		var _keys = Object.keys(this.obj);
		for (var i = 0; i < _keys.length; i++) {
			if (_keys[i].match(regexp) === null) continue;
			if (this.matched.indexOf(_keys[i]) > -1) continue;
			this.matched.push(_keys[i]);
		}

		return this;
	};

	/**
	 * Subsequent modifying functions will apply to all
	 * keys prevously matched minus the ones matching the 
	 * provided regexp.
	 * @param {RegExp} regexp Cuz I need to know which to match
	 */
	Obender.prototype.matchRemove = function(regexp) {
		for (var i = this.matched.length - 1; i >= 0; i--) {
			if (this.matched[i].match(regexp) === null) continue;
			this.matched.splice(i, 1);
		}

		return this;
	};

	/**
	 * Syntatic sugar for matchRemove.
	 */
	Obender.prototype.unmatch = Obender.prototype.matchRemove;

	/**
	 * Matches only the property with the given name. If there's
	 * no property named like that, matches nothing;
	 * @param  {String} string Property key to match
	 */
	Obender.prototype.matchOnly = function(string) {
		if (Object.keys(this.obj).indexOf(string) > -1) {
			this.matched = [string];
		} else {
			this.matched = [];
		}

		return this;
	}; // Allow for array of strings?

	/**
	 * Subsequent modifying functions will apply to all
	 * keys in the object Obender is bending.
	 * @return {Obender}                For chaining.
	 */
	Obender.prototype.matchAll = function() {
		this.matched = Object.keys(this.obj);		
		return this;
	};

																/* Finalizers */

	/**
	 * Ends the streak. Combobreaker.
	 * @return {Object} The object obender is beinding.
	 */
	Obender.prototype.object = function() {
		return this.obj;
	};

	/**
	 * Syntatic sugar for object.
	 */
	Obender.prototype.done = Obender.prototype.object;


	/**
	 * Returns all keys matched by obender for the object.
	 * @return {Array<String>} Keys matched by Obender.
	 */
	Obender.prototype.matchedKeys = function() {
		return this.matched;
	};

	/**
	 * Syntatic sugar for matchedKeys.
	 */
	Obender.prototype.keys = Obender.prototype.matchedKeys;


	/**
	 * Returns all keys of the object
	 * @return {Array<String>} All of the object's keys.
	 */
	Obender.prototype.allKeys = function() {
		return Object.keys(this.obj);
	};

	// allValues. matchedValues.

																 /* Modifiers */

	/**
	 * Applies Obender's mighty remap function to the object.
	 * @param  {Object} map Object describing the map
	 * @return {Obender}    Cuz you can chain yo!
	 *
	 * Valid maping objects: TODO.
	 * 
	 */
	Obender.prototype.remap = function(map) {
		
		// Check out each mapping
		for (var _okey in map) {

			// There's no such key to map. Move on.
			if (!obj.hasOwnProperty(_okey)) 	continue;
			if ( this.matched.find(_okey) < 0) 	continue;


			var _nkey = map[_okey];

			// Key is mapped to nothing. Move on. To map to 'null' and 'undefined'
			// user should use literal strings.
			if (_nkey === undefined ||
				_nkey === null) continue;
				


			// If we're mapping to a non-primitive encapsulating object, we'll try
			// to use it.
			if (typeof _nkey === 'object' && 
				_nkey.constructor === Object) {	

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

		return this;
	};


	/**
	 * For each property (key:value pair) to modify, calls
	 * a function passing a property object. After the function
	 * is called deletes old property and adds the modified key
	 * value pair the object.
	 * @param  {Function} func Modifier function
	 * @return {Obender}       For method chaining yo!
	 *
	 * Note: The function argument is called the object as 
	 * its 'this'.
	 */
	Obender.prototype.forEach = function(func) {
		for (var n = 0; n < this.matched.length; n++) {
			var given = { 
				key : this.matched[n], 
				value : this.obj[this.matched[n]]
			};
			
			func.call(this.obj, given);

			// Check if property wasn't deleted.
			if (given.key in this.obj) {
				this.obj[given.key] = given.value;
			}

			if (this.matched[n] !== given.key) {
				delete this.obj[this.matched[n]];
			}
		}

		return this;
	};

	/**
	 * Proxy for Object.defineProperty
	 * @param  {String} key     Key of property to add
	 * @param  {Object} options Options object for Object.defineProperty()
	 */
	Obender.prototype.property = function(key, options) {
		Object.defineProperty(this.obj, key, options);

		return this;
	};

	/**
	 * Deletes all matched properties.
	 */
	Obender.prototype.delete = function() {
		for (var n = 0; n < this.matched.length; n++) {
			delete this.obj[this.matched[n]];
		}

		return this;
	};

	/////////////// MESS BELOW HERE.z
	// Hmmmm...
	// Obender.prototype.addOrFreak = function(key, value) {
	// 	if (this.obj.hasOwnProperty(key)) {
	// 		throw new Error('Object already has property ' + key + '!! Freakin out!');
	// 	} else {
	// 		this.obj[key] = value;
	// 	}
	// };
	// 
	// 
	// 
	
	// 	Proposed.
	//	
	//	Obender.prototype.bend = function(obj) {
	//		this.obj = obj;
	//		this.matched = Object.keys(this.obj);
	//		return this;
	//	};
	//
	//
	//
	// Proposed:
	//Obender.prototype.valuesForKeys = function(arr) {
	//
	//	var result = new Array(arr.length);
	//	for (var n = 0; n < arr.length; n++) {
	//		if (this.matched.find(arr[n] > -1)) result[n] = this.obj[arr[n]];
	//	}
	//
	//	return result;
	//};
	/**
	 * Proposed
	 * Redefines all properties to modify (matched), using Object.defineProperty
	 * with the given options. If value, getter or setter are given in options, 
	 * the old value won't be used.
	 * @param  {Object} options Options object for Object.defineProperty()
	 */
	//Obender.prototype.configureProperties = function(options) {
	//	for (var n = 0; n < this.matched.length; n++) {
	//		var key = this.matched[n];
	//		if (!options.value && 
	//			!options.getter && 
	//			!options.setter) options.value = this.obj[key];
	
	//		delete this.obj[this.matched[n]];
	
	//		Object.defineProperty(this.obj, key, options);
	
	//	}
	
	//	return this;
	//};

	// function (prev, curr, i, arr) => return *next prev
	//Obender.prototype.reduce = function(func) {
	//	// body...
	//};
	//
	//// function (curr) => return *replace curr
	//Obender.prototype.map = function(func) {
	//	// body...
	//};

	//Obender.prototype.mapkeys = function(func) {
	//	for (var k = 0; k < this.matched.length; k++) {
	//		var newkey = func(this.matched[k]);
	//		if (newkey === this.matched[k]) continue;
	//		this.obj[newkey] = this.obj[this.matched[k]];
	//		delete this.obj[this.matched[k]];
	//	}
	//};

	// Obender.prototype.freakout = function(first_argument) {
	// 	// body...
	// };

	Obender.prototype.what_isth_thy_name = function() {
		console.log('they calleth me Obender, the neith\'r last, nor first, ny best but haply hansomest object bend\'r');
		return this;
	};

	return new Obender(object);
});

