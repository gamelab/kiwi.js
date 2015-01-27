/**
* Contains common classes whose applications deal with geometry or the collision of geometric shapes. 
* 
* @module Kiwi
* @submodule Geom
* @main
*/

module Kiwi.Geom {

	/**
	* An object representation of an axis-aligned bounding box. 
	* 
	* @class AABB
	* @namespace Kiwi.Geom
	* @constructor
	* @param cx {Number} The centeral position on the x-axis.
	* @param cy {Number} The centeral position on the y-axis.
	* @param width {Number} The width of the box.
	* @param height {Number} The height of the box.
	* @return {Kiwi.Geom.AABB}
	*/
	export class AABB {

		constructor(cx: number, cy: number, width: number, height: number) {
			this.cx = cx || 0;
			this.cy = cy || 0;
			this.halfWidth = width / 2 || 0;
			this.halfHeight = height / 2 || 0;
		}


		/**
		* Returns the type of this object
		* @method objType
		* @return {String} "AABB"
		* @public
		*/
		public objType() {
			return "AABB";
		}

		/**
		* The centeral location of the box on the x-axis.
		* @property cx
		* @type Number
		* @public
		*/
		public cx: number = 0;

		/**
		* The centeral location of the box on the y-axis.
		* @property cy
		* @type Number
		* @public
		*/
		public cy: number = 0;

		/**
		* Half of the width.
		* @property halfWidth
		* @type Number
		* @public
		*/
		public halfWidth: number = 0;

		/**
		* Half of the height.
		* @property halfHeight
		* @type Number
		* @public
		*/
		public halfHeight: number = 0;

		/**
		* Returns the full height. This is read only.
		* @property height
		* @type number
		* @readOnly
		* @public
		*/
		public get height():number {
			return this.halfHeight * 2;
		}

		/**
		* Returns the full width. This is read only.
		* @property width
		* @type number
		* @readOnly
		* @public
		*/
		public get width():number {
			return this.halfWidth * 2;
		}

		/**
		* Draws the object to a canvas context passed. 
		* @method draw
		* @param ctx {CanvasRenderingContext2D} The context you want this drawn to.
		* @return {Kiwi.Geom.AABB}
		* @public
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
		* Sets the position of the object.
		* @method setPosition
		* @param cx {Number} Its new x-axis location.
		* @param cy {Number} Its new y-axis location.
		* @return {Kiwi.Geom.AABB}
		* @public
		*/
		public setPosition(cx: number, cy: number): AABB {
			this.cx = cx;
			this.cy = cy;
			return this;
		}

		/**
		* Sets the position of the object by a point that you pass.
		* 
		* @method setPositionPoint
		* @param pos {Kiwi.Geom.Point} 
		* @return {Kiwi.Geom.AABB}
		* @public
		*/
		public setPositionPoint(pos: Point): AABB {
			this.cx = pos.x;
			this.cy = pos.y;
			return this;
		}

		/**
		* Returns this object but as a new Rectangle.
		* 
		* @method toRect
		* @return {Kiwi.Geom.Rectangle}
		* @public
		*/
		public toRect(): Rectangle {
			return new Rectangle(this.cx - this.halfWidth, this.cy - this.halfHeight, this.halfWidth * 2, this.halfHeight * 2);
		}

		/**
		* Gives the dimension of this AABB from a rectangle's.
		* @method fromRect
		* @param {Kiwi.Geom.Rectangle} rect
		* @return {Kiwi.Geom.AABB}
		* @public
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
