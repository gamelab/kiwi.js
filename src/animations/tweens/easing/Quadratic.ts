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
    * @class Quadratic
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    export class Quadratic {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Quadratic";
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

            return k * k;

        }

        /** 
        * 
        * @method Out
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        public static Out(k) {

            return k * (2 - k);

        }

        /** 
        * 
        * @method InOut
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        public static InOut(k) {

            if ((k *= 2) < 1) return 0.5 * k * k;
            return -0.5 * (--k * (k - 2) - 1);

        }

    }

}
