/// <reference path="../Manager.ts" />

/**
 *	Kiwi - Tween - Easing - Quadratic
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

module Kiwi.Tweens.Easing {

    export class Quadratic {

        public objType() {
            return "Quadratic";
        }

        /** 
        * 
        * @method In
        * @param {Any} k
        * @static
        **/
        public static In(k) {

            return k * k;

        }

        /** 
        * 
        * @method Out
        * @param {Any} k
        * @static
        **/
        public static Out(k) {

            return k * (2 - k);

        }

        /** 
        * 
        * @method InOut
        * @param {Any} k
        * @static
        **/
        public static InOut(k) {

            if ((k *= 2) < 1) return 0.5 * k * k;
            return -0.5 * (--k * (k - 2) - 1);

        }

    }

}
