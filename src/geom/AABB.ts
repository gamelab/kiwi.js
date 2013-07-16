/// <reference path="Intersect.ts" />
/// <reference path="IntersectResult.ts" />
/// <reference path="Point.ts" />
/// <reference path="../utils/GameMath.ts" />

/**
 *	Kiwi - Geom - AABB
 *
 *	@desc 		
 *
 *	@version 	1.1 - 11th October 2012
  *	@author 	Ross Kettle
 *	@url 		http://www.kiwijs.org
 *
 *  @todo       
 */

module Kiwi.Geom {

    export class AABB {

        /** 
	     * 
	     * @constructor
         * @param {Number} cx
         * @param {Number} cy
         * @param {Number} width
         * @param {Number} height
         * @return {Kiwi.Geom.AABB}
	     **/
        constructor(cx: number, cy: number, width: number, height: number) {
            this.cx = cx || 0;
            this.cy = cy || 0;
            this.halfWidth = width / 2 || 0;
            this.halfHeight = height / 2 || 0;
        }

        public objType() {
            return "AABB";
        }

        /**
        *
        * @property cx
        * @type Number
        */
        public cx: number = 0;

        /**
        *
        * @property cy
        * @type Number
        */
        public cy: number = 0;

        /**
        *
        * @property halfWidth
        * @type Number
        */
        public halfWidth: number = 0;

        /**
        *
        * @property halfHeight
        * @type Number
        */
        public halfHeight: number = 0;

        /**
        *
        * @method height
        * @return {Number}
        */
        public height() {
            return this.halfHeight * 2;
        }

        /**
        *
        * @method width
        * @return {Number}
        */
        public width() {
            return this.halfWidth * 2;
        }

        /**
        *
        * @method draw
        * @param {CanvasRenderingContext2D} ctx
        * @return {AABB}
        */
        public draw(ctx: CanvasRenderingContext2D): AABB {
            ctx.beginPath();
            ctx.moveTo(this.cx - this.halfWidth, this.cy);
            ctx.lineTo(this.cx + this.halfWidth, this.cy);
            ctx.moveTo(this.cx, this.cy - this.halfHeight);
            ctx.lineTo(this.cx, this.cy + this.halfHeight);
            ctx.stroke();
            return this;
        }

        /**
        *
        * @method setPosition
        * @param {Number} cx
        * @param {Number} cy
        * @return {AABB}
        */
        public setPosition(cx: number, cy: number): AABB {
            this.cx = cx;
            this.cy = cy;
            return this;
        }

        /**
        *
        * @method setPositionPoint
        * @param {Point} pos
        * @return {AABB}
        */
        public setPositionPoint(pos: Point): AABB {
            this.cx = pos.x;
            this.cy = pos.y;
            return this;
        }

        /**
        *
        * @method toRect
        * @return {Rectangle}
        */
        public toRect(): Rectangle {
            return new Rectangle(this.cx - this.halfWidth, this.cy - this.halfHeight, this.halfWidth * 2, this.halfHeight * 2);
        }

        /**
        *
        * @method fromRect
        * @param {Rectangle} rect
        * @return {AABB}
        */
        public fromRect(rect: Rectangle): AABB {
            this.halfWidth = rect.width / 2;
            this.halfHeight = rect.height / 2;
            this.cx = rect.x + this.halfWidth;
            this.cy = rect.y + this.halfHeight;
            return this;
        }


    }

}
