/**
*   
* @module Tweens
* @submodule Easing 
* 
*/

module Kiwi.Animations.Tweens.Easing {

    /**
    *
    * @class Linear
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    export class Linear {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Linear";
        }

        /** 
        * 
        * @method None
        * @param {Any} k
        * @return {Number}
        * @static
        */
        public static None(k) {

            return k;

        }

    }

}
