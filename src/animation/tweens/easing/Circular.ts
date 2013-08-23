/// <reference path="../Manager.ts" />

/**
 *	Kiwi - Tween - Easing - Circular
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

    export class Circular {

        public objType() {
            return "Circular";
        }

        /** 
        * 
        * @method In
        * @param {Any} k
        * @static
        **/
        public static In(k) {

            return 1 - Math.sqrt(1 - k * k);

        }

        /** 
        * Out
        * @method 
        * @param {Any} k
        * @static
        **/
        public static Out(k) {

            return Math.sqrt(1 - (--k * k));

        }

        /** 
        * InOut
        * @method 
        * @param {Any} k
        * @static
        **/
        public static InOut(k) {

            if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

        }

    }

}
