/**
*  
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

	/**
	* Represents a halfline. The ray starts at the first point
	* and extends infinitely in the direction of the second.
	*
	* @class Ray
	* @namespace Kiwi.Geom
	* @extends Kiwi.Geom.Line
	* @constructor
	* @param [x1=0] {Number} Starting location of the ray on the x-axis
	* @param [y1=0] {Number} Starting location of the ray on the y-axis
	* @param [x2=0] {Number} End location of the ray on the x-axis.
	*	Used to calculate direction so it isn't really the 'end' location.
	* @param [y2=0] {Number} End location of the ray on the y-axis.
	*	Used to calculate direction so it isn't really the 'end' location.
	* @return {Kiwi.Geom.Ray} This object
	*/
	export class Ray extends Line {

		constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {
			super( x1, y1, x2, y2 );
		}

		/**
		* The type of this object.
		* @method objType
		* @return {String} "Ray"
		* @public
		*/
		public objType() {
			return "Ray";
		}

		/**
		* Makes a copy of this Ray, either as a new Ray object, or
		* makes a passed Ray a copy of this one. 
		*
		* @method clone
		* @param [output] {Kiwi.Geom.Ray} 
		* @return {Kiwi.Geom.Ray}
		* @public
		*/
		public clone(output: Line = new Ray): Line {

			return output.setTo(this.x1, this.y1, this.x2, this.y2);

		}

		/**
		* Check if the Ray passes through a point.
		* @method isPointOnRay
		* @param x {Number}
		* @param y {Number}
		* @return {boolean}
		* @public
		*/
		public isPointOnRay(x: number, y: number): boolean {

			if ((x - this.x1) * (this.y2 - this.y1) === (this.x2 - this.x1) * (y - this.y1)) {
				if (Math.atan2(y-this.y1, x-this.x1) == Math.atan2(this.y2-this.y1, this.x2- this.x1)){ 
					return true
				}

			}

			return false;
		}

		/**
		* Get a string representation of the ray.
		* @method toString
		* @return {String}
		* @public
		*/
		public toString(): string {

			return "[{Ray (x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + ")}]";

		}

	}

}
