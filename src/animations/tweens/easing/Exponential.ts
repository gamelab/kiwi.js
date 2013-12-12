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
    * @class Exponential
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    export class Exponential {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Exponential";
        }

        /** 
        * 
        * @method In
        * @param k {Any}
        * @return {String}
        * @static
        * @public
        */
        public static In(k) {

            return k === 0 ? 0 : Math.pow(1024, k - 1);

        }

        /** 
        * 
        * @method Out
        * @param k {Any}
        * @return {String}
        * @static
        * @public
        */
        public static Out(k) {

            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);

        }

        /** 
        * 
        * @method InOut
        * @param k {Any}
        * @return {String}
        * @static
        * @public
        */
        public static InOut(k) {

            if (k === 0) return 0;
            if (k === 1) return 1;
            if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
            return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);

        }

    }

}
