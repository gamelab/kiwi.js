/**
*   
* @module Tweens
* @submodule Easing 
* 
*/

module Kiwi.Animations.Tweens.Easing {
    
    /**
    *
    *
    * @class Elastic
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    export class Elastic {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Elastic";
        }

        /** 
        * 
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        public static In(k) {

            var s, a = 0.1, p = 0.4;
            if (k === 0) return 0;
            if (k === 1) return 1;
            if (!a || a < 1) { a = 1; s = p / 4; }
            else s = p * Math.asin(1 / a) / (2 * Math.PI);
            return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));

        }

        /** 
        * 
        * @method Out
        * @param {Any} k
        * @static
        * @public
        */
        public static Out(k) {

            var s, a = 0.1, p = 0.4;
            if (k === 0) return 0;
            if (k === 1) return 1;
            if (!a || a < 1) { a = 1; s = p / 4; }
            else s = p * Math.asin(1 / a) / (2 * Math.PI);
            return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);

        }

        /** 
        * 
        * @method InOut
        * @param k {Any}
        * @static
        * @public
        */
        public static InOut(k) {

            var s, a = 0.1, p = 0.4;
            if (k === 0) return 0;
            if (k === 1) return 1;
            if (!a || a < 1) { a = 1; s = p / 4; }
            else s = p * Math.asin(1 / a) / (2 * Math.PI);
            if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
            return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

        }

    }

}
