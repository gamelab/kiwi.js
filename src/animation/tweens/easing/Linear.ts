/// <reference path="../Manager.ts" />

/**
 *	Kiwi - Tween - Easing - Linear
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

    export class Linear {

        public objType() {
            return "Linear";
        }

        /** 
        * 
        * @method None
        * @param {Any} k
        * @static
        **/
        public static None(k) {

            return k;

        }

    }

}
