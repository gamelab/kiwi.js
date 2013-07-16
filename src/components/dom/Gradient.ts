/// <reference path="../../core/Component.ts" />

/*
 *	Kiwi - Components - DOM - Gradient
 *
 *	@desc 		Sets a CSS3 gradient fill in the Sprite background. https://developer.mozilla.org/en-US/docs/CSS/linear-gradient
 *
 *	@version	1.0, 28th February 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components.DOM {

    export class Gradient extends Component {

        /**
        * 
        * @constructor
        * @return {Gradient}
        */
        constructor() {

            super('DOM.Gradient', false, true, false);

        }

        public objType() {
            return "Gradient";
        }


        /**
         * Returns a string representation of this object.
         * @method toString
         * @return {string} A string representation of this object.
         **/
        toString(): string {

            //return "[{Skew (x=" + this._skewX + " y=" + this._skewY + " xUnit=" + this._skewXUnit + " yUnit=" + this._skewYUnit + ")}]";
            return "";

        }

    }

}

