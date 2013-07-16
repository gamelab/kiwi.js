/// <reference path="../../../core/Component.ts" />

/*
 *	Kiwi - Components - DOM - Transforms - Skew
 *
 *	@desc 		
 *
 *	@version	1.0, 28th February 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components.DOM.Transforms {

    export class Skew extends Component {

        /**
        * 
        * @constructor
        * @param {Number} x.
        * @param {Number} y.
        * @param {Boolean} asDegrees.
        * @return {Skew}
        */
        constructor(x: number = 0, y: number = 0, asDegrees: bool = true) {

            super('DOM.Transforms.Skew', false, true, false);

            if (asDegrees === true)
            {
                this.setDegrees();
            }
            else
            {
                this.setRadians();
            }

            this.setXY(x, y);

        }

        public objType() {
            return "Skew";
        }

        /**
        * 
        * @property css
        * @type String
        */
        public css: string = '';

        /**
        * 
        * @property _unit
        * @type String
        * @private
        */
        private _unit: string = '';

        /**
        * 
        * @property _skewX
        * @type Number
        * @private
        */
        private _skewX: number = 0;

        /**
        * 
        * @property _skewXUnit
        * @type String
        * @private
        */
        private _skewXUnit: string = 'deg';

        /**
        * 
        * @property _skewXTransform
        * @type String
        * @private
        */
        private _skewXTransform: string = '';

        /**
        * 
        * @property _skewY
        * @type Number
        * @private
        */
        private _skewY: number = 0;

        /**
        * 
        * @property _skewYUnit
        * @type String
        * @private
        */
        private _skewYUnit: string = 'deg';

        /**
        * 
        * @property _skewYTransform
        * @type String
        * @private
        */
        private _skewYTransform: string = '';

        /**
        * 
        * @method xUnit
        * @param {String} value
        * @return {String}
        */
        public xUnit(value?: string):string {

            if (value)
            {
                this.setUnit(value, this._skewXUnit);
            }

            return this._skewXUnit;

        }

        /**
        * 
        * @method yUnit
        * @param {String} value
        * @return {String}
        */
        public yUnit(value?: string):string {

            if (value)
            {
                this.setUnit(value, this._skewYUnit);
            }

            return this._skewYUnit;

        }

        /**
        * 
        * @method x
        * @param {Number} value
        * @return {Number}
        */
        public x(value?: number):number {

            if (value && value !== this._skewX)
            {
                this._skewX = value;
                this._skewXTransform = 'skewX(' + value + this._skewXUnit + ') ';
                this.css = this._skewXTransform + this._skewYTransform;
                //this.dirty = true;
            }

            return this._skewX;

        }

        /**
        * 
        * @method y
        * @param {Number} value
        * @return {Number}
        */
        public y(value?: number):number {

            if (value && value !== this._skewY)
            {
                this._skewY = value;
                this._skewYTransform = 'skewY(' + value + this._skewYUnit + ') ';
                this.css = this._skewXTransform + this._skewYTransform;
                //this.dirty = true;
            }

            return this._skewY;

        }

        /**
        * 
        * @method setXY
        * @param {Number} x
        * @param {Number} y
        */
        public setXY(x: number, y: number) {

            this.x(x);
            this.y(y);

        }

        /**
        * 
        * @method setDegrees
        */
        public setDegrees() {

            this._skewXUnit = 'deg';
            this._skewYUnit = 'deg';

        }

        /**
        * 
        * @method setRadians
        */
        public setRadians() {

            this._skewXUnit = 'rad';
            this._skewYUnit = 'rad';

        }

        /**
        * 
        * @method setUnit
        * @param {String} unit
        * @param {String} value
        * @return {Boolean}
        */
        private setUnit(unit: string, value: string): bool {

            if (unit === 'deg' || unit === 'rad')
            {
                value = unit;
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
         * Returns a string representation of this object.
         * @method toString
         * @return {string} A string representation of this object.
         **/
        toString(): string {

            return "[{Skew (x=" + this._skewX + " y=" + this._skewY + " xUnit=" + this._skewXUnit + " yUnit=" + this._skewYUnit + ")}]";

        }

    }

}

