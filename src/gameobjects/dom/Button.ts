/// <reference path="../../core/Game.ts" />
/// <reference path="../../core/Entity.ts" />
/// <reference path="../../core/State.ts" />
/// <reference path="../../components/Position.ts" />

/*
 *	Kiwi - GameObjects - DOM - Button
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

module Kiwi.GameObjects.DOM {

    export class Button extends Kiwi.Entity {

        /**
	     * 
	     * @constructor
         * @param {String} x 
         * @param {String} y
         * @param {String} z
	     * @return {Button}
	     **/
        constructor(text: string, x: number = 0, y: number = 0) {

            super(false, true, false);

            this.type = Kiwi.TYPE_DOM;
            this.domElementType = 'button';
            this._tempText = text;

            //  Properties

            this.position = new Kiwi.Components.Position(x, y);

            //  Signals

            this.onAddedToLayer.add(this._onAddedToLayer, this);
            this.position.updated.add(this._updatePosition, this);

            klog.info('Created DOM Button Game Object');

        }

        public objType() {
            return "Button";
        }

        /**
        * 
        * @property button
        * @type HTMLButtonElement
        */
        public button: HTMLButtonElement;

        /**
        * 
        * @property position
        * @type Kiwi.Components.Position
        */
        public position: Kiwi.Components.Position;

        /**
        * 
        * @property _tempText
        * @type String
        * @private
        */
        private _tempText: string;

        /**
        * 
        * @property _transformCSS
        * @type String
        * @private
        */
        private _transformCSS: string;

        /**
        * 
        * @method _updatePosition
        * @param {Number} x
        * @param {Number} y
        * @private
        */
        private _updatePosition(x: number, y: number) {

            this.position.addStyleUpdates(this);

        }

        /**
        * 
        * @method _addToLayer
        * @param {Kiwi.Layer} layer
        * @return {Boolean}
        */
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            //super._onAddedToLayer(layer);

            klog.info('DOM Button added to Layer');

            this.button = <HTMLButtonElement> this.domElement.element;
            this.button.textContent = this._tempText;

            this.position.addStyleUpdates(this);

            //if (this.game.device.css3D === false)
            //{
            //    this.domElement.element.style.left = this.position.x() + 'px';
            //    this.domElement.element.style.top = this.position.y() + 'px';
            //}
            //else
            //{
            //    this._transformCSS = 'translate3d(' + this.position.x() + 'px, ' + this.position.y() + 'px, 0px)';
            //    this.domElement.element.style.transform = this._transformCSS;
            //    this.domElement.element.style['-o-transform'] = this._transformCSS;
            //    this.domElement.element.style['-ms-transform'] = this._transformCSS;
            //    this.domElement.element.style['-moz-transform'] = this._transformCSS;
            //    this.domElement.element.style['-webkit-transform'] = this._transformCSS;
            //}

            return true;

        }

    }

}