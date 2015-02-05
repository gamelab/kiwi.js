/**
*  
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

	/**
	* A Line object has two meanings depending on the situation you need. 
	* Either an infinte line through space (this is the usual meaning of a Line) 
	* OR it can be a Line Segment which just exists between the TWO points you specify. 
	*
	* @class Line
	* @namespace Kiwi.Geom
	* @constructor
	* @param [x1=0] {Number} Starting location of the line on the x-axis.
	* @param [y1=0] {Number} Starting location of the line on the y-axis.
	* @param [x2=0] {Number} End location of the line on the x-axis.
	* @param [y2=0] {Number} End location of the line on the y-axis.
	* @return {Kiwi.Geom.Line} This Object
	*
	*/
	export class Line {
		 
		constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {

			this.setTo(x1, y1, x2, y2);

		}

		/**
		* Returns the type of this object
		* @method objType
		* @return {string} "Line"
		* @public
		*/
		public objType() {
			return "Line";
		}

		/**
		* X position of first point on the line.
		* @property x1
		* @type Number
		* @public
		*/
		public x1: number = 0;

		/**
		* Y position of first point on the line.
		* @property y1
		* @type Number
		* @public
		*/
		public y1: number = 0;

		/**
		* X position of second point.
		* @property x2
		* @type Number
		* @public
		*/
		public x2: number = 0;

		/**
		* Y position of second point.
		* @property y2
		* @type Number
		* @public
		*/
		public y2: number = 0;

		/**
		* Makes a clone of this Line. 
		* The clone can either be a new Line Object, 
		* Otherwise you can pass a existing Line Object that you want to be a clone of this one.
		*
		* @method clone
		* @param [output=Line] {Kiwi.Geom.Line}
		* @return {Kiwi.Geom.Line}
		* @public
		*/
		public clone(output: Line = new Line): Line {

			return output.setTo(this.x1, this.y1, this.x2, this.y2);

		}

		/**
		* Make this Line a copy of another passed Line.
		* @method copyFrom 
		* @param source {Kiwi.Geom.Line} source
		* @return {Kiwi.Geom.Line}
		* @public
		*/
		public copyFrom(source: Line): Line {

			return this.setTo(source.x1, source.y1, source.x2, source.y2);

		}

		/**
		* Make another passed Line a copy of this one.
		* @method copyTo
		* @param target {Kiwi.Geom.Line} target
		* @return {Kiwi.Geom.Line}
		* @public
		*/
		public copyTo(target: Line): Line {

			return target.copyFrom(this);

		}

		/**
		* Used to set all components on the line.
		* @method setTo
		* @param [x1=0]{Number} X component of first point.
		* @param [y1=0]{Number} Y component of first point.
		* @param [x2=0]{Number} X component of second point.
		* @param [y2=0]{Number} Y component of second point.
		* @return {Kiwi.Geom.Line}
		* @public
		*/
		public setTo(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0): Line {

			this.x1 = x1;
			this.y1 = y1;
			this.x2 = x2;
			this.y2 = y2;

			return this;

		}

		/**
		* Get the length of the Line as a Line Segment.
		* @property length
		* @type number
		* @readOnly
		* @public
		*/
		public get length(): number {

			return Math.sqrt((this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1));

		}

		/**
		* Get the y of a point on the line for a given x.
		* @method getY
		* @param x {Number} 
		* @return {Number}
		* @public
		*/
		public getY(x: number): number {
			if (this.x1 == this.x2)
				return null;
			else
			return this.slope * x + this.yIntercept;

		}

		/**
		* Get the angle of the line.
		* @property angle 
		* @type Number
		* @readOnly
		* @public
		*/
		public get angle(): number {

			return Math.atan2(this.y2 - this.y1, this.x2 - this.x1);

		}

		/**
		* Get the slope of the line (y/x).
		* @property slope
		* @type Number
		* @readOnly
		* @public
		*/
		public get slope(): number {

			return (this.y2 - this.y1) / (this.x2 - this.x1);

		}

		/**
		* Get the perpendicular slope of the line (x/y).
		* @propery perpSlope
		* @type Number
		* @readOnly
		* @public
		*/
		public get perpSlope(): number {

			return -((this.x2 - this.x1) / (this.y2 - this.y1));

		}

		/**
		* Get the y intercept for the line.
		* @property yIntercept
		* @type Number
		* @readOnly
		* @public
		*/
		public get yIntercept(): number {

			return (this.y1 - this.slope * this.x1);

		}

		/**
		* Check if a point is on the line.
		* @method isPointOnLine
		* @param x {Number}
		* @param y {Number}
		* @return {boolean}
		* @public
		*/
		public isPointOnLine(x: number, y: number): boolean {

			if ((x - this.x1) * (this.y2 - this.y1) === (this.x2 - this.x1) * (y - this.y1))
			{
				return true;
			}
			else
			{
				return false;
			}

		}

		/**
		* Check if the point is both on the line and within the line segment.
		* @method isPointOnLineSegment
		* @param x {Number}
		* @param y {Number}
		* @return {boolean}
		* @public
		*/
		public isPointOnLineSegment(x: number, y: number): boolean {

			var xMin = Math.min(this.x1, this.x2);
			var xMax = Math.max(this.x1, this.x2);
			var yMin = Math.min(this.y1, this.y2);
			var yMax = Math.max(this.y1, this.y2);

			if (this.isPointOnLine(x, y) && (x >= xMin && x <= xMax) && (y >= yMin && y <= yMax))
			{
				return true;
			}
			else
			{
				return false;
			}

		}

		/**
		* Check to see if this Line object intersects at any point with a passed Line.
		* Note: Both are treated as extending infinately through space.
		* Functions as an alias for the 'Kiwi.Geom.Intersect.lineToLine' method.
		*
		* @method intersectLineLine
		* @param line {Kiwi.Geom.Line} The line you want to check for a Intersection with.
		* @return {Kiwi.Geom.IntersectResult} The Intersect Result containing the collision information.
		* @public
		*/
		public intersectLineLine(line): IntersectResult {
			return Kiwi.Geom.Intersect.lineToLine(this,line);
		}

		/**
		* Get a line perpendicular to the line passing through a given point.
		*
		* @method perp
		* @param x {Number} 
		* @param y {Number} 
		* @param [output] {Kiwi.Geom.Line} The line object that the result should be output to. Creates a new Line if one is not passed. 
		* @return {Kiwi.Geom.Line}
		* @public
		*/
		public perp(x: number, y: number, output: Line=new Line): Line {

			var pt;

			// For a horizontal line, the output is a vertical line.
			if ( this.y1 === this.y2 ) {
				output.setTo( x, y, x, this.y1 );
				return output;
			}

			// For a vertical line, the output is a horizontal line.
			if ( this.x1 === this.x2 ) {
				output.setTo( x, y, this.x1, y );
				return output;
			}

			var yInt: number = (y - this.perpSlope * x);

			if ( x !== 0 ) {
				pt = this.intersectLineLine({ x1: x, y1: y, x2: 0, y2: yInt });
			} else {
				pt = this.intersectLineLine({ x1: x, y1: y, x2: 1, y2: yInt + this.perpSlope });
			}

			output.setTo(x, y, pt.x, pt.y);

			return output;
		}

		/**
		* Get a string representation of the line.
		* @method toString
		* @return {String}
		* @public
		*/
		public toString(): string {

			return "[{Line (x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + ")}]";

		}

	}

}
