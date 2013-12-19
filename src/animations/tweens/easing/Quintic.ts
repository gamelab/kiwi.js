/**
* 
* @module Tweens
* @submodule Easing 
* 
*/

module Kiwi.Animations.Tweens.Easing {

    /**
    * 
    * @class Quintic
    * @namespace Kiwi.Animations.Tweens.Easing
    * 
    */
    export class Quintic {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Quintic";
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

            return k * k * k * k * k;

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

            return --k * k * k * k * k + 1;

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

            if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
            return 0.5 * ((k -= 2) * k * k * k * k + 2);

        }

    }

}
