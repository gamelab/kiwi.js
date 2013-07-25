/// <reference path="../core/Component.ts" />
/// <reference path="../geom/Point.ts" />

/*
 *	Kiwi - Components - Position
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

module Kiwi.Components {

    export class Position extends Component {

        /*
        * 
        * @constructor
        * @param {Number} x
        * @param {Number} y
        * @param {Number} z
        * @return {Position}
        */
        constructor(x: number = 0, y: number = 0, z: number = 0) {

            super('Position', true, true, true);

            //  Signals
            this.updated = new Kiwi.Signal();

            //  Properties
            x = Math.round(x);
            y = Math.round(y);
            z = Math.round(z);

            this._point = new Kiwi.Geom.Point(x, y);
            this._offset = new Kiwi.Geom.Point();
            this._transformPoint = new Kiwi.Geom.Point();
            this._z = z;

            this._processUpdate();

        }

        public objType() {
            return "Position";
        }

        /*
        * 
        * @property _point
        * @type Kiwi.Geom.Point
        * @private
        */
        private _point: Kiwi.Geom.Point;

        private _oldX: number = 0;
        private _oldY: number = 0;
        private _oldZ: number = 0;

        public differenceX: number = 0;
        public differenceY: number = 0;
        public differenceZ: number = 0;

        private _transformPoint: Kiwi.Geom.Point;

        /*
        * 
        * @property _offset
        * @type Kiwi.Geom.Point
        * @private
        */
        private _offset: Kiwi.Geom.Point;

        /*
        * 
        * @property _z
        * @type Number
        * @private
        */
        private _z: number;

        /*
        * 
        * @property cssTranslate3d
        * @type String
        */
        public cssTranslate3d: string;

        /*
        * 
        * @property cssLeft
        * @type String
        */
        public cssLeft: string;

        /*
        * 
        * @property cssTop
        * @type String
        */
        public cssTop: string;

        /*
        * Subscribe to this Signal to receive position updates
        * @property updated
        * @type Kiwi.Signal
        */
        public updated: Kiwi.Signal;

        /*
        * 
        * @property autoRound
        * @type Boolean
        */
        public autoRound: bool = true;

        /*
        * The Rectangle inside of which this Position must remain
        * @property _wrap
        * @type Kiwi.Geom.Rectangle
        */
        private _wrap: Kiwi.Geom.Rectangle = null;

        /*
        * Enable wrapping of the Position so that the value will always remain within the coordinates given
        * @method enableWrap
        * @param {number} x
        * @param {number} y
        * @param {number} width
        * @param {number} height
        */
        public enableWrap(x:number, y:number, width:number, height:number) {

            if (this._wrap === null)
            {
                this._wrap = new Kiwi.Geom.Rectangle();
            }

            this._wrap.setTo(x, y, width, height);

        }

        /*
        * Disable any wrapping that may have been enabled
        * @method disableWrap
        */
        public disableWrap() {
            this._wrap = null;
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

            if (Kiwi.DEVICE.css3D)
            {
                this.entity.addStyleUpdate("-webkit-transform-origin", this._transformPoint.x + "px " + this._transformPoint.y + "px");
               /* entity.addStyleUpdate('transform', this.cssTranslate3d);
                entity.addStyleUpdate('-o-transform', this.cssTranslate3d);
                entity.addStyleUpdate('-ms-transform', this.cssTranslate3d);
                entity.addStyleUpdate('-moz-transform', this.cssTranslate3d);
                entity.addStyleUpdate('-webkit-transform', this.cssTranslate3d);
                */
                entity.addStyleTransformUpdate("translate", this.cssTranslate3d);
            }
            else
            {
                entity.addStyleUpdate('left', this.cssLeft);
                entity.addStyleUpdate('top', this.cssTop);
            }

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

            if (Kiwi.DEVICE.css3D)
            {
                this.entity.addStyleTransformUpdate("translate", this.cssTranslate3d);
                this.entity.addStyleUpdate("-webkit-transform-origin", this._transformPoint.x + "px " + this._transformPoint.y + "px");
                this.entity.applyTransformStyle();
                /*entity.domElement.element.style.transform = this.cssTranslate3d;
                entity.domElement.element.style['-o-transform'] = this.cssTranslate3d;
                entity.domElement.element.style['-ms-transform'] = this.cssTranslate3d;
                entity.domElement.element.style['-moz-transform'] = this.cssTranslate3d;
                entity.domElement.element.style['-webkit-transform'] = this.cssTranslate3d;
                */
            }
            else
            {
                entity.domElement.element.style.left = this.cssLeft;
                entity.domElement.element.style.top = this.cssTop;
            }

        }

        /*
        * 
        * @method _processUpdate
        * @private
        */
        private _processUpdate() {

            this._point = this._point.addTo(this._offset.x, this._offset.y);

            if (this._wrap !== null && this._wrap.containsPoint(this._point) === false)
            {
                this._point.x = Kiwi.Utils.GameMath.wrap(this._point.x, this._wrap.right(), this._wrap.x);
                this._point.y = Kiwi.Utils.GameMath.wrap(this._point.y, this._wrap.bottom(), this._wrap.y);
            }

            this.differenceX = Kiwi.Utils.GameMath.difference(this._oldX, this._point.x);
            this.differenceY = Kiwi.Utils.GameMath.difference(this._oldY, this._point.y);
            this.differenceZ = Kiwi.Utils.GameMath.difference(this._oldZ, this._z);

            if (!this.autoRound) {
                if (this._oldX > this._point.x) this.differenceX = -this.differenceX;
                if (this._oldY > this._point.y) this.differenceY = -this.differenceY;
                if (this._oldZ > this._z) this.differenceZ = -this.differenceZ;
            }

            this.cssTranslate3d = 'translate3d(' + this._point.x + 'px, ' + this._point.y + 'px, ' + this._z + 'px)';
            this.cssLeft = this._point.x + 'px';
            this.cssTop = this._point.y + 'px';

            this.dirty = true;

            this.updated.dispatch(this._point.x, this._point.y, this._z, this.cssTranslate3d, this.cssLeft, this.cssTop);

        }

        /*
        * 
        * @method x
        * @param {Number} value
        * @return {Number}
        */
        public x(value: number = null): number {

            if (value !== null && value !== this._point.x)
            {
                if (this.autoRound)
                {
                    value = Math.round(value);
                }

                this._storeOldPosition();
                this._point.x = value;
                this._processUpdate();
            }

            return this._point.x;

        }

        /*
        * 
        * @method y
        * @param {Number} value
        * @return {Number}
        */
        public y(value: number = null): number {

            if (value !== null && value !== this._point.y)
            {
                if (this.autoRound)
                {
                    value = Math.round(value);
                }

                this._storeOldPosition();
                this._point.y = value;
                this._processUpdate();
            }

            return this._point.y;

        }

        /*
        * 
        * @method z
        * @param {Number} value
        * @return {Number}
        */
        public z(value: number = null): number {

            if (value !== null && value !== this._z)
            {
                if (this.autoRound)
                {
                    value = Math.round(value);
                }

                this._storeOldPosition();
                this._z = value;
                this._processUpdate();
            }

            return this._z;

        }

        /*
        * 
        * @method addTo
        * @param {Number} x
        * @param {Number} y
        * @param {Number} z
        */
        public addTo(x: number = 0, y: number = 0, z: number = 0) {

            this._storeOldPosition();
            this._point.addTo(x, y);
            this._z += z;
            this._processUpdate();
        }

        private _storeOldPosition() {

            this._oldX = this._point.x;
            this._oldY = this._point.y;
            this._oldZ = this._z;

        }

        /*
        * 
        * @method subtractFrom
        * @param {Number} x
        * @param {Number} y
        * @param {Number} z
        */
        public subtractFrom(x: number = 0, y: number = 0, z: number = 0) {

            this._storeOldPosition();
            this._point.subtractFrom(x, y);
            this._z -= z;
            this._processUpdate();
        }

        /*
        * 
        * @method equals
        * @param {Number} x
        * @param {Number} y
        * @return {Boolean}
        */
        public equals(x: number, y: number): bool {

            if (this._point.x === x && this._point.y === y)
            {
                return true;
            }

            return false;

        }

        /*
        * 
        * @method setTo
        * @param {Number} x
        * @param {Number} y
        * @param {Number} z
        */
        public setTo(x: number, y: number, z:number = 0) {

            if (this._point.x !== x || this._point.y !== y || this._z !== z)
            {
                if (this.autoRound)
                {
                    x = Math.round(x);
                    y = Math.round(y);
                    z = Math.round(z);
                }

                this._storeOldPosition();
                this._point.setTo(x, y);
                this._z = z;
                this._processUpdate();
            }

        }

        /*
        * 
        * @method setOffset
        * @param {Number} x
        * @param {Number} y
        * @param {Number} z
        */
        public setOffset(x: number, y: number) {

            if (this._offset.x !== x || this._offset.y !== y)
            {
                if (this.autoRound)
                {
                    x = Math.round(x);
                    y = Math.round(y);
                }

                this._offset.setTo(x, y);
                this._processUpdate();
            }

        }

        /*
        * 
        * @method setPositionFromPoint
        * @param {Kiwi.Geom.Point} point
        */
        public setPositionFromPoint(point: Kiwi.Geom.Point) {

            if (this._point.x !== point.x || this._point.y !== point.y)
            {
                this._storeOldPosition();
                this._point.copyFrom(point);
                this._processUpdate();
            }

        }

        public transformPoint(point?: Kiwi.Geom.Point): Kiwi.Geom.Point {

            if (point) {
                this._transformPoint.copyFrom(point);
                this._processUpdate();
            }
            
            return this._transformPoint;

        }


        /*
        * 
        * @method getPositionAsPoint
        * @param {Kiwi.Geom.Point} output
        * @return {Kiwi.Geom.Point}
        */
        public getPositionAsPoint(output: Kiwi.Geom.Point = new Kiwi.Geom.Point): Kiwi.Geom.Point {

            return output.copyFrom(this._point);

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Position (x=' + this._point.x + ' y=' + this._point.y + ' z=' + this._z + ')}]';

        }

    }

}
