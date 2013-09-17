/**
* Kiwi - Animation - Tweens - Easing 
* @module Tweens
* @submodule Easing 
* 
*/


module Kiwi.Animation.Tweens.Easing {

    /**
    *
    * @class Quartic
    *
    */
    export class Quartic {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Quartic";
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

            return k * k * k * k;

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

            return 1 - (--k * k * k * k);

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

            if ((k *= 2) < 1) return 0.5 * k * k * k * k;
            return -0.5 * ((k -= 2) * k * k * k - 2);

        }

    }

}
