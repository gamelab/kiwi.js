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

        /**
        * An array containing all of the base2sizes that are allowed.
        * This is used when creating a new TextureAtlas/or resizing a Image to be rendered in WebGL.
        * @property base2Sizes
        * @type number[]
        * @public
        * @static
        */
        public static base2Sizes: number[] = [2, 4, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];

        /**
        * A method that checks to see if an Image or Canvas that is passed has base2 proportions. 
        * If it doesn't the image is created on a Canvas and that Canvas is returned.
        * Used mainly when creating TextureAtlases for WebGL. 
        * @method convertToBase2
        * @param imageFile {HTMLImageElement/HTMLCanvasElement} The image or canvas element that is to be converted into a base2size. 
        * @return {HTMLImageElement/HTMLCanvasElement} The image that was passed (if it was already at base2 dimensions) or a new canvas element if it wasn't.
        * @static
        * @public
        */
        public static convertToBase2(image: any): any {
            
            //Get the width/height
            var width = image.width;
            var height = image.height

            //Check to see if the width is base2
            if (this.base2Sizes.indexOf(width) == -1) {
                var i = 0;
                while (width > this.base2Sizes[i]) i++;
                width = this.base2Sizes[i];
            }

            //Check to see if the height is base2
            if (this.base2Sizes.indexOf(height) == -1) {
                var i = 0;
                while (height > this.base2Sizes[i]) i++;
                height = this.base2Sizes[i];
            }


            //If either of them did not have a base2 size then create a canvas and create a new canvas.
            if (image.width !== width || image.height !== height) {

                //Is it already a canvas?
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(image, 0, 0);

                return canvas;
            }

            return image;
        }

    }

}
