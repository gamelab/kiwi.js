/// <reference path="../core/Component.ts" />
/// <reference path="../geom/Point.ts" />

/*
 *	Kiwi - Components - Size
 *
 *	@desc		Contains a width, height and aspect ratio
 *
 *	@version	1.0, 5th March 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Size extends Component {

        /*
        * 
        * @constructor
        * @param {Number} width
        * @param {Number} height
        * @return {Size}
        */
        constructor(width: number = 0, height: number = 0) {

            super('Size', true, true, true);

            //  Signals
            this.updated = new Kiwi.Signal();

            //  Properties
            this.setTo(width, height);

        }

        public objType() {
            return "Size";
        }

        /*
        * Subscribe to this Signal to receive size updates
        * @property updated
        * @type Kiwi.Signal
        */
        public updated: Kiwi.Signal;

        /*
        * 
        * @property cssWidth
        * @type String
        */
        public cssWidth: string;

        /*
        * 
        * @property cssHeight
        * @type String
        */
        public cssHeight: string;

        /*
        * 
        * @property _width
        * @type Number
        * @private
        */
        private _width: number = 0;

        /*
        * 
        * @property _height
        * @type Number
        * @private
        */
        private _height: number = 0;

        public halfWidth: number = 0;
        public halfHeight: number = 0;

        /*
        * 
        * @property aspectRatio
        * @type Number
        */
        public aspectRatio: number;

        /*
        * 
        * @method width
        * @param {Number} value
        * @return {Number}
        */
        public width(value: number = null): number {

            if (value !== null && value > 0)
            {
                this._width = value;
                this._processUpdate();
            }

            return this._width;

        }

        /*
        * 
        * @method height
        * @param {Number} value
        * @return {Number}
        */
        public height(value: number = null): number {

            if (value !== null && value > 0)
            {
                this._height = value;
                this._processUpdate();
            }

            return this._height;

        }
        
        /*
        * 
        * @method inflate
        * @param {Any} value
        */
        public inflate(value) {

            if (value !== null && value>0)
            {
                this._width += value;
                this._height += value;
                this._processUpdate();
            }

        }

        /*
        * 
        * @method deflate
        * @param {Any} value
        */
        public deflate(value) {

            if (value !== null && value >0)
            {
                this._width -= value;
                this._height -= value;
                this._processUpdate();
            }

        }

        /*
        * 
        * @method _processUpdate
        */
        private _processUpdate() {

            this.aspectRatio = this._width / this._height;
            this.dirty = true;
            this.cssWidth = this._width + 'px';
            this.cssHeight = this._height + 'px';
            this.halfWidth = Math.round(this._width / 2);
            this.halfHeight = Math.round(this._height / 2);
            this.updated.dispatch(this._width, this._height);

        }

        /*
        * 
        * @method setTo
        * @param {Number} width
        * @param {Number} height
        */
        public setTo(width: number, height: number) {

            if (width > 0 && height > 0) {
                this.width(width);
                this.height(height);
            }
        }

        /*
        * 
        * @method addStyleUpdates
        * @param {Kiwi.Entity} entity
        */
        public addStyleUpdates(entity: Kiwi.Entity) {

            if (entity === null)
            {
                return;
            }

            entity.addStyleUpdate('width', this.cssWidth);
            entity.addStyleUpdate('height', this.cssHeight);

        }

        /*
        * 
        * @method addStyleImmediately
        * @param {Kiwi.Entity} entity
        */
        public addStyleImmediately(entity: Kiwi.Entity) {

            if (entity.domElement === null || entity.domElement.element === null)
            {
                return;
            }

            entity.domElement.element.style.width = this.cssWidth;
            entity.domElement.element.style.height = this.cssHeight;

        }

        /*
        * 
        * @method setCSS
        * @param {HTMLElement} element
        * @return {HTMLElement}
        */
        public setCSS(element: HTMLElement): HTMLElement {

            element.style.width = this.cssWidth;
            element.style.height = this.cssHeight;

            return element;

        }

        /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Size (width=' + this._width + ' height=' + this._height + ')}]';

        }

    }

}

