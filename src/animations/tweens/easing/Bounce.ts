/**
* 
* @module Tweens
* @submodule Easing 
* 
*/

module Kiwi.Animations.Tweens.Easing {

    /**
    *
    * @class Bounce
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    export class Bounce {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Bounce";
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

            return 1 - Kiwi.Animations.Tweens.Easing.Bounce.Out(1 - k);

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

            if (k < (1 / 2.75))
            {
                return 7.5625 * k * k;
            }
            else if (k < (2 / 2.75))
            {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            }
            else if (k < (2.5 / 2.75))
            {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            }
            else
            {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }

        }

        /** 
        * 
        * @method InOut
        * @param {Any} k
        * @return {Number}
        * @static
        * @public
        */
        public static InOut(k) {

            if (k < 0.5) return Kiwi.Animations.Tweens.Easing.Bounce.In(k * 2) * 0.5;
            return Kiwi.Animations.Tweens.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

        }

    }

}
