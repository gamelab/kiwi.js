/// <reference path="../core/Component.ts" />

/*
 *	Kiwi - Components - Alpha
 *
 *	@desc		Contains the alpha (opacity) value of an Entity.
 *              https://developer.mozilla.org/en-US/docs/CSS/opacity
 *
 *	@version	1.0 - 10th March 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Alpha extends Component {

        /**
        * 
        * @constructor
        * @param {Number} value
        * @return {Alpha}
        */
        constructor(value: number = 0) {

            super('Alpha', true, true, true);

            //  Signals
            this.updated = new Kiwi.Signal();

            //  Properties
            this.alpha(value);

        }

        /**
        * Subscribe to this Signal to receive component updates
        * @property updated
        * @type Kiwi.Signal
        */
        public updated: Kiwi.Signal;

        /**
        * 
        * @property _alpha
        * @type Number
        * @private
        */
        private _alpha0: number = 0;

        /**
        * 
        * @property cssOpacity
        * @type String
        */
        public cssOpactiy: string;

        public objType() {
            return "Alpha";
        }

        public alpha(value: number = null): number {

            if (value !== null && value !== this._alpha0) {
                if (value > 1)
                    value = 1;
                else if (value < 0)
                    value = 0;
                this._alpha0 = value;
                this.cssOpactiy = value.toString();
                this.dirty = true;
                this.updated.dispatch(this._alpha0, this.cssOpactiy);
            }

            return this._alpha0;

        }

        /**
        * 
        * @method addAlpha
        * @param {Number} value
        * @return {Number}
        */
        public addAlpha(value: number): number {
                if (value !== null && value > 0) {
                    if (value + this._alpha0 > 1) {
                        //  Clamp it to 1
                        return this.alpha(1);
                    }
                    else {
                        return this.alpha(value + this._alpha0);
                    }
                }
            
            return this._alpha0;

        }

        /**
        * 
        * @method subAlpha
        * @param {Number} value
        * @return {Number}
        */
        public subAlpha(value: number): number {
            
                if (value !== null && value>0) {
                    if (this._alpha0 - value < 0) {
                        //  Clamp it to zero
                        return this.alpha(0);
                    }
                    else {
                        return this.alpha(this._alpha0 - value);
                    }
                }
            
            return this._alpha0;

        }

        /**
        * 
        * @method addStyleUpdates
        * @param {Kiwi.Entity} entity
        */
        public addStyleUpdates(entity: Kiwi.Entity) {

            if (entity === null)
            {
                return;
            }

            entity.addStyleUpdate('opacity', this.cssOpactiy);

        }

        /**
        * 
        * @method addStyleImmediately
        * @param {Kiwi.Entity} entity
        */
        public addStyleImmediately(entity: Kiwi.Entity) {

            if (entity.domElement === null || entity.domElement.element === null)
            {
                return;
            }

            entity.domElement.element.style.opacity = this.cssOpactiy;

        }

        public setContext(canvas: Kiwi.Utils.Canvas) {

            if (this._alpha0 > 0 && this._alpha0 < 1)
            {
                canvas.context.globalAlpha = this._alpha0;
            }

        }

        /**
        * 
        * @method setCSS
        * @param {HTMLElement} element
        * @return {HTMLElement}
        */
        public setCSS(element: HTMLElement): HTMLElement {

            element.style.opacity = this.cssOpactiy;

            return element;

        }

        /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Alpha (opacity=' + this._alpha0 + ')}]';

        }

    }

}

