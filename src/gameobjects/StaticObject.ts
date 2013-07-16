/// <reference path="../core/Game.ts" />
/// <reference path="../core/Entity.ts" />
/// <reference path="../core/State.ts" />
/// <reference path="../components/Position.ts" />
/// <reference path="../components/Texture.ts" />

/*
 *	Kiwi - GameObjects - StaticObject
 *				
 *	@desc		A light-weight invisible entity without a graphical display consisting of a position and size.
 *
 *	@version	1.0 - 26th April 2013
 *
 *	@author 	Lachlan Reid
 *
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.GameObjects {

    export class StaticObject extends Kiwi.Entity {

        /**
        * 
        * @constructor
        * @param {String} cacheID
        * @param {Kiwi.Cache} cache
        * @param {Number} x
        * @param {Number} y
        * @return {StaticObject}
        */
        constructor(x: number = 0, y: number = 0, width: number = 1, height: number = 1) {

            super(true, true, false);

            //  Properties

            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            this.size = this.components.add(new Kiwi.Components.Size(width, height));
            this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, width, height));

            //  Signals

            this.onAddedToLayer.add(this._onAddedToLayer, this);

            this.position.updated.add(this._updatePosition, this);
            this.size.updated.add(this._updateSize, this);

            klog.info('Created StaticObject Game Object');

        }

        /** 
	     * The Position component that controls the location of this Game Object within the game world
	     * @property position
	     * @type Kiwi.Components.Position
	     **/
        public position: Kiwi.Components.Position;

        /** 
	     * The Boounds component that controls the bounding box around this Game Object
	     * @property bounds
	     * @type Kiwi.Components.Bounds
	     **/
        public bounds: Kiwi.Components.Bounds;

        /** 
	     * 
	     * @property size
	     * @type Kiwi.Componenets.Size
	     **/
        public size: Kiwi.Components.Size;

        /** 
	     * 
	     * @property _transformCSS
	     * @type String
         * @private
	     **/
        private _transformCSS: string;

        /** 
        * 
        * @method _updatePosition
        * @param {Number} x
        * @param {Number} y 
        * @param {Number} z
        **/
        private _updatePosition(x: number, y: number, z: number) {

            if (this.type === Kiwi.TYPE_DOM) {
                this.position.addStyleUpdates(this);
            }

            this.bounds.setTo(x, y, this.size.width(), this.size.height());

        }

        /** 
	     * 
	     * @method _updateSize
         * @param {Number} width
         * @param {Number} height
	     **/
        private _updateSize(width: number, height: number) {

            if (this.type === Kiwi.TYPE_DOM) {
                this.size.addStyleUpdates(this);
            }

            this.bounds.setTo(this.position.x(), this.position.y(), width, height);

        }

        /** 
	     * 
	     * @method _updateRepeat
         * @param {String} value
	     **/
        private _updateRepeat(value: string) {

            if (this.type === Kiwi.TYPE_DOM) {
                this.addStyleUpdate('backgroundRepeat', value);
            }

        }

        /**
	     * Called when this Game Object is added to a Layer, usually as a result of an addChild() call or being in a Group that was added.
	     * @method _addedToLayer
	     * @param {Kiwi.Layer} layer - The Layer onto which this Game Object was added
	     * @return {Boolean} true if the Game Object was successfully added, otherwise false
	     * @private
	     **/
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('StaticObject added to Layer: ' + layer.name + ' type: ' + this.type);

            if (this.type === Kiwi.TYPE_DOM) {
                this.size.addStyleImmediately(this);
                this.position.addStyleImmediately(this);
                klog.info('StaticObject DOM set');
            }

            return true;

        }

    }

}