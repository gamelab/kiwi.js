/**
* 
* @module Tweens
* @submodule Easing 
* 
*/

module Kiwi.Animations.Tweens.Easing {

    /**
    *
    * @class Sinusoidal
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    export class Sinusoidal {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Sinusoidal";
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

            return 1 - Math.cos(k * Math.PI / 2);

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

            return Math.sin(k * Math.PI / 2);

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

            return 0.5 * (1 - Math.cos(Math.PI * k));

        }

    }

}
