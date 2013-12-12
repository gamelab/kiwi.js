/**
* Contains various methods that can be used when you are wanting to ease a Tween.
* 
* @module Tweens
* @submodule Easing 
* @main Easing
*/

module Kiwi.Animations.Tweens.Easing {

    /**
    * 
    * @class Back
    * @namespace Kiwi.Animations.Tweens.Easing
    * 
    */
    export class Back {

        /**
        * The type of object this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Back";
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

            var s = 1.70158;
            return k * k * ((s + 1) * k - s);

        }

        /** 
        * 
        * @method Out
        * @param {Any} k
        * @return {Number}
        * @static
        * @public
        */
        public static Out(k) {

            var s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;

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

            var s = 1.70158 * 1.525;
            if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

        }

    }

}
