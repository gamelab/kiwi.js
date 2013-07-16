/// <reference path="../../../core/Component.ts" />

/*
 *	Kiwi - Components - DOM - Filters - Blur
 *
 *	@desc 		Applies a Gaussian blur to the DOMSprite. The value of ‘radius’ defines the value of the standard deviation to the Gaussian function, or how many pixels on the screen blend into each other, so a larger value will create more blur. If no parameter is provided, then a value 0 is used. The parameter is specified as a CSS length, but does not accept percentage values.
 *
 *	@version	1.0, 28th February 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components.DOM.Filters {

    export class Blur extends Component {

        /**
        * 
        * @constructor
        * @param {number} radius.
        * @return {Blur} This Object.
        */
        constructor(radius:number = 0) {

            super('DOM.Filters.Blur', false, true, false);

            this.radius(radius);

        }

        public objType() {
            return "Blur";
        }

        /**
        * 
        * @property _prefix
        * @type String
        * @private
        */
        private _prefix: string = 'blur';

        /**
        * 
        * @property _unit
        * @type String
        * @private
        */
        private _unit: string = 'px';

        /**
        * 
        * @property _value
        * @type Number
        * @private
        */
        private _value: number = 0;

        /**
        * 
        * @property _filter
        * @type String
        * @private
        */
        private _filter: string = '';

        /**
        * 
        * @method radius
        * @param {Number} value
        * @return {Number}
        */
        public radius(value?: number): number {

            if (value && value !== this._value)
            {
                this._value = value;
                this._filter = this._prefix + '(' + this._value + this._unit + ')';
                //this.dirty = true;
            }

            return this._value;

        }

        /**
        * 
        * @method unit
        * @param {String} value
        * @return {String}
        */
        public unit(value?: string):string {

            if (value && value !== this._unit)
            {
                this._unit = value;
                this._filter = this._prefix + '(' + this._value + this._unit + ')';
                //this.dirty = true;
            }

            return this._unit;

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Blur (value=' + this._value + ' unit=' + this._unit + ')}]';

        }

    }

}

