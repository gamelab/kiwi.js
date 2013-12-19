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
    * @class Circular
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    export class Circular {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Circular";
        }

        /** 
        * 
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        */
        public static In(k) {

            return 1 - Math.sqrt(1 - k * k);

        }

        /** 
        * 
        * @method Out
        * @param k {Any}
        * @return {Number}
        * @static
        */
        public static Out(k) {

            return Math.sqrt(1 - (--k * k));

        }

        /** 
        * 
        * @method InOut
        * @param k {Any}
        * @return {Number}
        * @static
        */
        public static InOut(k) {

            if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

        }

    }

}
