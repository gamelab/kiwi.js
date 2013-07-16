/// <reference path="../utils/Common.ts" />

/**
 *	Kiwi - Structs - Dictionary
 *
 *	@desc 		Dictionaries map keys to values; each key can map to at most one value.
 *
 *	@version 	0.2 - 11th October 2012
 *	@author		Mauricio Santos
 *	@author 	Richard Davey - TypeScript conversion
 *	@url 		http://www.kiwijs.org
 *
 *	A lot of the functions in this class are Copyright 2012 Mauricio Santos and used with permission.
 *	His work is licensed under the Apache License, Version 2.0 (the "License");
 *
 *	You may not use this file except in compliance with the License.
 *
 *	Some documentation is borrowed from the official Java API as it serves the same purpose.
 */

module Kiwi.Structs {

    export class Dictionary {

        /**
         * Creates an empty dictionary. 
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petTostring(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        constructor (toStrFunction = Kiwi.Utils.Common.defaultTostring) {
        
            this.toStr = toStrFunction;
        
        }

        public objType() {
            return "Dictionary";
        }

        /**
         * Number of elements in the list.
         */
        private nElements:number = 0;

         /**
	     * Returns the number of keys in this dictionary.
	     * @return {number} the number of key-value mappings in this dictionary.
	     */
        public size() {

            return this.nElements;

        }

	    /**
	     * Returns true if this dictionary contains no mappings.
	     * @return {boolean} true if this dictionary contains no mappings.
	     */
        public isEmpty() {

            return this.nElements <= 0;

        }

        /**
         * Object holding the key-value pairs.
         */
        private table = { };

        /**
         * Function used to convert keys to strings.
         */
        private toStr = null;

	    /**
	     * Returns the value to which this dictionary maps the specified key.
	     * Returns undefined if this dictionary contains no mapping for this key.
	     * @param {Object} key key whose associated value is to be returned.
	     * @return {*} the value to which this dictionary maps the specified key or
	     * undefined if the map contains no mapping for this key.
	     */
        public get(key) {

            var pair = this.table[this.toStr(key)];

            if (Kiwi.Utils.Common.isUndefined(pair)) {
                return undefined;
            }

            return pair.value;
        }

	    /**
	     * Associates the specified value with the specified key in this dictionary.
	     * If the dictionary previously contained a mapping for this key, the old
	     * value is replaced by the specified value.
	     * @param {Object} key key with which the specified value is to be
	     * associated.
	     * @param {Object} value value to be associated with the specified key.
	     * @return {*} previous value associated with the specified key, or undefined if
	     * there was no mapping for the key or if the key/value are undefined.
	     */
        public set(key, value) {

            if (Kiwi.Utils.Common.isUndefined(key) || Kiwi.Utils.Common.isUndefined(value))
            {
                return undefined;
            }

            var ret;
            var k = this.toStr(key);
            var previousElement = this.table[k];

            if (Kiwi.Utils.Common.isUndefined(previousElement))
            {
                this.nElements++;
                ret = undefined;
            }
            else
            {
                ret = previousElement.value;
            }

            this.table[k] = { key: key, value: value };

            return ret;

        }

	    /**
	     * Removes the mapping for this key from this dictionary if it is present.
	     * @param {Object} key key whose mapping is to be removed from the
	     * dictionary.
	     * @return {*} previous value associated with specified key, or undefined if
	     * there was no mapping for key.
	     */
        public remove(key) {

            var k = this.toStr(key);
            var previousElement = this.table[k];

            if (!Kiwi.Utils.Common.isUndefined(previousElement))
            {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }

            return undefined;
        }

	    /**
	     * Returns an array containing all of the keys in this dictionary.
	     * @return {Array} an array containing all of the keys in this dictionary.
	     */
        public keys() {

            var array = [];

            for (var name in this.table)
            {
                if (this.table.hasOwnProperty(name))
                {
                    array.push(this.table[name].key);
                }
            }

            return array;
        }

	    /**
	     * Returns an array containing all of the values in this dictionary.
	     * @return {Array} an array containing all of the values in this dictionary.
	     */
        public values() {

            var array = [];

            for (var name in this.table)
            {
                if (this.table.hasOwnProperty(name))
                {
                    array.push(this.table[name].value);
                }
            }

            return array;
        }

	    /**
	     * Executes the provided function once for each key-value pair 
	     * present in this dictionary.
	     * @param {function(Object,Object):*} callback function to execute, it is
	     * invoked with two arguments: key and value. To break the iteration you can 
	     * optionally return false.
	     */
        public forEach(callback) {

            for (var name in this.table)
            {
                if (this.table.hasOwnProperty(name))
                {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);

                    if (ret === false)
                    {
                        return;
                    }
                }
            }
        }

	    /**
	     * Returns true if this dictionary contains a mapping for the specified key.
	     * @param {Object} key key whose presence in this dictionary is to be
	     * tested.
	     * @return {boolean} true if this dictionary contains a mapping for the
	     * specified key.
	     */
        public containsKey(key) {

            return !Kiwi.Utils.Common.isUndefined(this.get(key));

        }

	    /**
	     * Removes all mappings from this dictionary.
	     * @this {Kiwi.Structs.Dictionary}
	     */
        public clear() {

            this.table = {};
            this.nElements = 0;

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} a string representation of the instance.
	     **/
        public toString() {

            return '[{Dictionary (size=' + this.size() + ' isEmpty=' + this.isEmpty() + ')}]';

        }

    }

}
