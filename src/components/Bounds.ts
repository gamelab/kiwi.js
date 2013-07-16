/// <reference path="../core/Component.ts" />

/*
 *	Kiwi - Components - Bounds
 *
 *	@desc		Defines the bounding box around an Entity.
 *              The position and size can be set at any time. This allows for offset bounds.
 *              The default scale of the bounds is x = 1, y = 1. If the scale is changed, the bounds getRect function will return
 *              a scaled rectangle calculated from the stored bounds rectangle. Changing the scale does not change the size of the bounds internally.              
 *
 *	@version	1.0 - 13th March 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Bounds extends Component {

        /**
        * 
        * @constructor
        * @param {Number} x
        * @param {Number} y
        * @param {Number} width
        * @param {Number} height
        * @return {Bounds}
        */
        constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
            
            //  The components name and the layer types it works with: canvas, dom, webgl
            super('Bounds', true, true, true);

            //  Signals

            //  Properties
            this._rect = new Kiwi.Geom.Rectangle(x, y, width, height);
            this._AABB = new Kiwi.Geom.Rectangle(x, y, width, height);
            
            this.offsetX = 0;
            this.offsetY = 0;
            this.offsetWidth = 0;
            this.offsetHeight = 0;
            //this.showDebug = true;

        }

        public objType() {
            return "Bounds";
        }


        /**
        * 
        * @property showDebug
        * @type Boolean
        */
        public showDebug: bool = false;

        /**
        * 
        * @property debugLineColor
        * @type Number
        */
        public debugLineColor: number = 0xffff0000;

        /**
        * 
        * @property _rect
        * @type Kiwi.Geom.Rectangle
        * @private
        */
        private _rect: Kiwi.Geom.Rectangle;

        private _AABB: Kiwi.Geom.Rectangle;

        public offsetX: number;
        public offsetY: number;
        public offsetWidth: number;
        public offsetHeight: number;

        // needs updating for transforms
        public pointWithin(point: Kiwi.Geom.Point): bool {
            return this._rect.containsPoint(point);

        }

        public calculateBounds(transform: Kiwi.Geom.Transform, position:Kiwi.Components.Position,size:Kiwi.Components.Size) {
            
            var centerPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(size.width() / 2, size.height() / 2);
            var topLeftPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(0, 0);
            var bottomLeftPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(0, size.height());
            var topRightPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(size.width(), 0);
            var bottomRightPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(size.width(), size.height());
            
            var posx = position.x();
            var posy = position.y();
            var ox = position.transformPoint().x;
            var oy = position.transformPoint().y;
            
            this._transformPoint(centerPoint, transform, posx, posy, ox, oy);
            this._transformPoint(topLeftPoint, transform, posx, posy, ox, oy);
            this._transformPoint(bottomLeftPoint, transform, posx, posy, ox, oy);
            this._transformPoint(topRightPoint, transform, posx, posy, ox, oy);
            this._transformPoint(bottomRightPoint, transform, posx, posy, ox, oy);
            
                        
            var left:number = Math.min(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var right:number = Math.max(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var top:number = Math.min(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
            var bottom:number = Math.max(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
            
            
                
            this._AABB = new Kiwi.Geom.Rectangle(left, top, right - left, bottom - top);

            var sx: number = Math.abs(transform.scaleX());
            var sy: number = Math.abs(transform.scaleY());

            

            var ubW = (size.width() - this.offsetWidth) * sx;
            var ubH = (size.height() - this.offsetHeight) * sy;
            var ubX = (centerPoint.x - this.offsetX * sx) - ubW / 2;
            var ubY = (centerPoint.y - this.offsetY * sy) - ubH / 2;

            this._rect = new Kiwi.Geom.Rectangle(ubX, ubY, ubW, ubH);
        }

        private _transformPoint(point:Kiwi.Geom.Point,trans:Kiwi.Geom.Transform,x,y,ox,oy) {
            // translate origin inverse
        
            point.x -= ox;
            point.y -= oy;

            // apply transform
            point = trans.transformPoint(point);

            //translate back again
            point.x += ox + x;
            point.y += oy + y;

        }

        public getRect(): Kiwi.Geom.Rectangle {
            
            var rect: Kiwi.Geom.Rectangle = this._rect.clone();
            return rect;
        }

        public getOffsetRect(): Kiwi.Geom.Rectangle {

            var rect: Kiwi.Geom.Rectangle = this._rect.clone();
            rect.x += this.offsetX;
            rect.y += this.offsetY;
            rect.width += this.offsetWidth;
            rect.height += this.offsetHeight;

            return rect;
        }

        public getAABB(): Kiwi.Geom.Rectangle {
            var rect: Kiwi.Geom.Rectangle = this._AABB.clone();

            return rect;
        }
        

        /**
        * 
        * @method setTo
        * @param {Number} x
        * @param {Number} y
        * @param {Number} width
        * @param {Number} height
        */
        public setTo(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {

            this._rect.setTo(x, y, width, height);

        }



        public setSize(width: number, height: number) {
            this._rect.setTo(this._rect.x, this._rect.y, width, height);

        }
        public setPosition(x: number, y: number) {

            this._rect.setTo(x, y, this._rect.width, this._rect.height);
        }


        /**
        * 
        * @method drawCanvasDebugOutline
        * @param {Kiwi.Layer} layer
        */
        public drawCanvasDebugOutline(layer: Kiwi.Layer) {

            if (layer.type === Kiwi.TYPE_CANVAS && this.showDebug === true)
            {
                //layer.canvas.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
                layer.canvas.context.strokeStyle = 'rgba(0, 255, 0, 0.8)';
                layer.canvas.context.beginPath();
                layer.canvas.context.rect(this._rect.x, this._rect.y, this._rect.width, this._rect.height);
                layer.canvas.context.stroke();
                layer.canvas.context.closePath();
                //layer.canvas.context.fillRect(this._rect.x, this._rect.y, this._rect.width, this._rect.height);
            }

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Bounds (x=' + this._rect.x + ')}]';

        }

    }

}


