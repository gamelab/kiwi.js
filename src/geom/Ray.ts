/**
*  
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

	/**
	* Represents a halfline. The ray starts at the first point and extends infinitely in the direction of the second.
	*
	* @class Ray
	* @namespace Kiwi.Geom
	* @constructor
	* @param [x1=0] {Number} Starting location of the ray on the x-axis.
	* @param [y1=0] {Number} Starting location of the ray on the y-axis.
	* @param [x2=0] {Number} End location of the ray on the x-axis. Used to calculate direction so it isn't really the 'end' location.
	* @param [y2=0] {Number} End location of the ray on the y-axis. Used to calculate direction so it isn't really the 'end' location.
	* @return {Kiwi.Geom.Ray} This Object
	*
	*/
	export class Ray {

		constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {

			this.setTo(x1, y1, x2, y2);

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
		* The x component of the initial point of the ray
		* @property x1
		* @type Number
		* @default 0
		* @public
		*/
		public x1: number = 0;

		/**
		* The y component of the initial point of the ray
		* @property y1
		* @type Number
		* @default 0
		* @public
		*/
		public y1: number = 0;

		/**
		* The x component of the direction point of the ray
		* @property x2
		* @type Number
		* @default 0
		* @public
		*/
		public x2: number = 0;

		/**
		* The y component of the direction point of the ray
		* @property y2
		* @type Number
		* @default 0
		* @public
		*/
		public y2: number = 0;

		/**
		* Makes a copy of this Ray either as a new Ray object or,
		* makes a passed Ray a copy of this one. 
		*
		* @method clone
		* @param [output] {Kiwi.Geom.Ray} 
		* @return {Kiwi.Geom.Ray}
		* @public
		*/
		public clone(output: Ray = new Ray): Ray {

			return output.setTo(this.x1, this.y1, this.x2, this.y2);

		}

		/**
		* Makes this Ray the same as a passed Ray.
		* @method copyFrom
		* @param source {Kiwi.Geom.Ray} 
		* @return {Kiwi.Geom.Ray}
		* @public
		*/
		public copyFrom(source: Ray): Ray {

			return this.setTo(source.x1, source.y1, source.x2, source.y2);

		}

		/**
		* Makes a passed Ray the same as this Ray object. 
		* @method copyTo
		* @param target {Kiwi.Geom.Ray} 
		* @return {Kiwi.Geom.Ray}
		* @public
		*/
		public copyTo(target: Ray): Ray {

			return target.copyFrom(this);

		}

		/**
		* Sets the origin and the direction of this Ray.
		* @method setTo
		* @param [x1=0] {Number} 
		* @param [y1=0] {Number} 
		* @param [x2=0] {Number} 
		* @param [y2=0] {Number} 
		* @return {Kiwi.Geom.Ray}
		* @public
		*/
		public setTo(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0): Ray {

			this.x1 = x1;
			this.y1 = y1;
			this.x2 = x2;
			this.y2 = y2;

			return this;

		}

		/**
		* Get the angle of the ray.
		* @property angle
		* @type Number
		* @readOnly
		* @public
		*/
		public get angle(): number {

			return Math.atan2(this.y2 - this.y1, this.x2 - this.x1);

		}

		/**
		* Get the slope of the ray.
		* @property slope
		* @type Number
		* @readOnly
		* @public
		*/
		public get slope(): number {

			return (this.y2 - this.y1) / (this.x2 - this.x1);

		}

		/**
		* 
		* @property yIntercept
		* @type Number
		* @readOnly
		* @public
		*/
		public get yIntercept(): number {

			return (this.y1 - this.slope * this.x1);

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
