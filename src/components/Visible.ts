/// <reference path="../core/Component.ts" />

/*
 *	Kiwi - Components - Visible
 *
 *	@desc		Contains the visibility value of an Entity.
 *              https://developer.mozilla.org/en-US/docs/CSS/visibility
 *
 *	@version	1.0 - 12th March 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Visible extends Component {

        /*
        * 
        * @constructor
        * @param {Boolean} value
        * @return {Visible}
        */
        constructor(value: bool = true) {

            super('Visible', true, true, true);

            //  Signals
            this.updated = new Kiwi.Signal();

            //  Properties
            this.visible(value);

        }

        public objType() {
            return "Visible";
        }

        /*
        * Subscribe to this Signal to receive component updates
        * @property updated
        * @type Kiwi.Signal
        */
        public updated: Kiwi.Signal;

        /*
        * 
        * @property _visible
        * @type Boolean
        * @private
        */
        private _visible: bool;
        
        /*
        * 
        * @property cssVisibility
        * @type String
        */
        public cssVisibility: string;


        /**
	     * Sets the visibility
	     * @method setVisible
         * @param {bool} true if visible, false if not
	     * @return {bool} true if visible, false if not
	     **/
        public visible(value: bool = null): bool {
                if (value !== null && value !== this._visible) {
                    this._visible = value;

                    if (value === true) {
                        this.cssVisibility = 'visible';
                    }
                    else {
                        this.cssVisibility = 'hidden';
                    }

                    this.dirty = true;
                    this.updated.dispatch(this._visible, this.cssVisibility);
                }

            return this._visible;

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

            entity.addStyleUpdate('visibility', this.cssVisibility);

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

            entity.domElement.element.style.visibility = this.cssVisibility;

        }

        /*
        * 
        * @method setCSS
        * @param {HTMLElement} element
        * @return {HTMLElement}
        */
        public setCSS(element: HTMLElement): HTMLElement {

            element.style.visibility = this.cssVisibility;

            return element;

        }

        /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Visibility (value=' + this.cssVisibility + ')}]';

        }

    }

}
