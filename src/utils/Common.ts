/**
* Utils is a space that holds a wide varity of useful methods.
*
* @module Kiwi
* @submodule Utils
* @main Utils
*/

module Kiwi.Utils {

    /**
    * Methods to assist in working with Structs.
    * A lot of the functions in this class are Copyright 2012 Mauricio Santos and used with permission.
    * His work is licensed under the Apache License, Version 2.0 (the "License")
    *
    * @class Common
    * @namespace Kiwi.Utils
    * @static
    *
    * @author Mauricio Santos
    */
    export class Common {

        /**
        * Default function to compare element order.
        * @method defaultCompare
        * @param {Any} a.
        * @param {Any} b.
        * @return {Number}
        * @static
        */
        public static defaultCompare(a, b) {

            if (a < b)
            {
                return -1;
            }
            else if (a === b)
            {
                return 0;
            }
            else
            {
                return 1;
            }

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Common";
        }

        /**
        * Default function to test equality.
        * @method defaultEquals
        * @param {Any} a
        * @param {Any} b
        * @return {boolean}
        * @static
        * @public
        */
        public static defaultEquals(a, b) {

            return a === b;

        }

        /**
        * Default function to convert an object to a string.
        * @method defaultTostring
        * @param item {Any}
        * @return {Any}
        * @static
        * @public
        */
        public static defaultTostring(item) {

            if (item === null)
            {
                return 'KIWI_NULL';
            }
            else if (Kiwi.Utils.Common.isUndefined(item))
            {
                return 'KIWI_UNDEFINED';
            }
            else if (Kiwi.Utils.Common.isString(item))
            {
                return item;
            }
            else
            {
                return item.toString();
            }

        }

        /**
        * Checks if the given argument is a function.
        * @method isFunction
        * @param {Any} func.
        * @return {boolean}
        * @static
        * @public
        */
        public static isFunction(func) {

            return (typeof func) === 'function';

        }

        /**
        * Checks if the given value is numeric.
        * @method isNumeric
        * @param value {Any}
        * @return {Boolean}
        * @static
        * @public
        */
        public static isNumeric(value) {

            return !isNaN(value);

        }

        /**
        * Checks if the given argument is undefined.
        * @method isUndefined
        * @param {Any} obj
        * @return {boolean}
        * @static
        * @public
        */
        public static isUndefined(obj) {

            return (typeof obj) === 'undefined';

        }

        /**
        * Checks if the given argument is a string.
        * @method isString
        * @param {Any} obj
        * @return {boolean}
        * @static
        * @public
        */
        public static isString(obj) {

            return Object.prototype.toString.call(obj) === '[object string]';

        }

        /**
        * Reverses a compare function.
        * @method reverseCompareFunction
        * @param {Any} compareFunction
        * @return {Number}
        * @static
        * @public
        */
        public static reverseCompareFunction(compareFunction) {

            if (!Kiwi.Utils.Common.isFunction(compareFunction))
            {
                return function (a, b) {
                    if (a < b)
                    {
                        return 1;
                    }
                    else if (a === b)
                    {
                        return 0;
                    }
                    else
                    {
                        return -1;
                    }
                };
            }
            else
            {
                return function (d, v) {
                    return compareFunction(d, v) * -1;
                };
            }

        }

        /**
        * Returns an equal function given a compare function.
        * @method compareToEquals
        * @param {Any} compareFunction
        * @return {boolean}
        * @static
        * @public
        */
        public static compareToEquals(compareFunction) {

            return function (a, b) {
                return compareFunction(a, b) === 0;
            };

        }

        /**
        * Shuffles the contents of an array given into a random order.
        * @method shuffleArray
        * @param array {Any}
        * @return {Any} What you passed but the with the contents in a new order.
        * @static
        * @public
        */
        public static shuffleArray(array) {

            for (var i = array.length - 1; i > 0; i--)
            {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            return array;

        }

    }

}
