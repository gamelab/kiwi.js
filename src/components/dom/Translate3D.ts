/// <reference path="../../core/Component.ts" />
/// <reference path="../../geom/Point.ts" />

/*
 *	Kiwi - Components - DOM - Translate3D
 *
 *	@desc		
 *
 *	@version	1.0 - 8th March 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components.DOM {

    export class Translate3D extends Component {

        /**
        * 
        * @constructor
        * @param {Number} x
        * @param {Number} y
        * @param {Number} z
        * @return {Translate3D}
        */
        constructor(x: number = 0, y: number = 0, z: number = 0) {

            super('DOM.Translate3D', true, true, true);

            //  Signals
            //this.updated = new Kiwi.Signal();

            //  Properties
            //x = Math.round(x);
            //y = Math.round(y);
            //this._point = new Kiwi.Geom.Point(x, y);

        }

        public objType() {
            return "Translate3D";
        }

        /**
        * 
        * @property _tempTransformCSS
        * @type String
        */
        private _tempTransformCSS: string;

    }

}
