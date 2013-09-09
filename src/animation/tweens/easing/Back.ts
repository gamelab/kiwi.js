/// <reference path="../Manager.ts" />

/**
 *	Kiwi - Tween - Easing - Back
 *
 *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
 *
 *	@version 	1.0 - 11th January 2013
 *
 *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
 *
 *	@url 		http://www.kiwijs.org
 *
 *	@todo       
 */

module Kiwi.Animation.Tweens.Easing {

    export class Back {

        public objType() {
            return "Back";
        }

        /** 
        * 
        * @method In
        * @param {Any} k
        * @static
        **/
        public static In(k) {

            var s = 1.70158;
            return k * k * ((s + 1) * k - s);

        }

        /** 
        * 
        * @method Out
        * @param {Any} k
        * @static
        **/
        public static Out(k) {

            var s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;

        }

        /** 
        * InOut
        * @method 
        * @param {Any} k
        * @static
        **/
        public static InOut(k) {

            var s = 1.70158 * 1.525;
            if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

        }

    }

}
