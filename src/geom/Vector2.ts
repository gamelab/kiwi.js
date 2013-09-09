/**
* Kiwi - Geom
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * A two dimensional vector object for storing and manipulating x and y vector components.
    *
    * @class Vector2
    *
    */
    export class Vector2 {

        /**
        * Creates a new Vector2 Object
        * @class Vector2
        * @constructor
        * @param {Number} x The x component of the vector.
        * @param {Number} y The y component of the vector.
        **/
        constructor (x: number = 0, y: number = 0) {
            this.setTo(x, y);
        }

        public objType() {
            return "Vector2";
        }

        /**
        * The x component of this Vector2.
        * @property x
        * @type Number
        **/
        public x: number;
        
        /**
        * The y component of this Vector2.
        * @property y
        * @type Number
        **/
        public y: number;

        /**
        * Generate a Vector2 from an angle
        * @method fromAngle
        * @param {Number} angle. The angle to generate the Vector2 from.
        * @static
        * @return {Vector2} A new Vector2.
        */
        public static fromAngle(angle:number): Vector2 {
             return new Vector2(Math.cos(angle), Math.sin(angle));
        }

        /**
        * Generate a random Vector2 within a given radius.
        * @method randomRadius
        * @param {Number} radius. The size of the radius to use.
        * @static
        * @return {Vector2} A new Vector2.
        */
        public static randomRadius(radius:number): Vector2 {
            return new Vector2
				(
					Math.random() * 2 - 1,
					Math.random() * 2 - 1
				).multiplyScalar( radius );
        }

        /**
        * Generate a Vector2 from a point.
        * @method fromPoint
        * @param {Point} point. 
        * @static
        * @return {Vector2} A new Vector2.
        */
        public static fromPoint(point: Point): Vector2 {
            return new Vector2(point.x,point.y);
        }

        /**
        * Add each component of another Vector2 to this vectors components.
        * @method add
        * @param {Vector2} Vector2 to add.
        * @return {Vector2} A new Vector2 containing the product.
        */
        public add(vector2: Vector2): Vector2 {
            return new Vector2(this.x + vector2.x, this.y + vector2.y);
        }

        /**
        * Add only the x component of another Vector2 to this vector.
        * @method addX
        * @param {Vector2} Vector2 to add.
        * @return {Vector2} A new Vector2 containing the result.
        */
        public addX(vector2: Vector2): Vector2 {
            return new Vector2(this.x + vector2.x, this.y);
        }

        /**
        * Add only the y component of another Vector2 to this vector.
        * @method addY
        * @param {Vector2} Vector2 to add.
        * @return {Vector2} A new Vector2 containing the result.
        */
        public addY(vector2: Vector2): Vector2 {
            return new Vector2(this.x, this.y + vector2.y);
        }

        /**
        * Subtract each component of another Vector2 from this vectors components.
        * @method subtract
        * @param {Vector2} Vector2 to subtract.
        * @return {Vector2} A new Vector2 containing the result.
        */
        public subtract (vector2:Vector2):Vector2 {
            return new Kiwi.Geom.Vector2(this.x - vector2.x, this.y - vector2.y);
        }

        /**
        * Multiply each component of another Vector2 with this vectors components.
        * @method multiply
        * @param {Vector2} Vector2 to multiply.
        * @return {Vector2} A new Vector2 containing the result.
        */
        public multiply (vector2:Vector2):Vector2 {
            return new Kiwi.Geom.Vector2(this.x * vector2.x, this.y * vector2.y);
        }

        /**
        * Multiply each component of this vector with a scalar number.
        * @method multiplyScalar
        * @param {Number} Scalar to multiply.
        * @return {Vector2} A new Vector2 containing the result.
        */
        public multiplyScalar (scalar:number):Vector2 {
            return new Kiwi.Geom.Vector2(this.x * scalar, this.y * scalar);
        }
	
        /**
	    * Calculate the dot product if a Vector2 with this Vector2.
        * @method dot
	    * @param {Vector2} Vector2 to dot with this Vector2.
	    * @return {Number} Result of dot product.
	    */
        public dot(vector2:Vector2): number {
            return this.x * vector2.x + this.y * vector2.y;
        }

        /**
	    * Calculate the square length of this Vector2 (Distance from the origin).
        * @method lenSqr
	    * @return {Number} The square length.
	    */
        public lenSqr(): number {
            return this.x * this.x + this.y * this.y;
        }

        /**
	    * Calculate the length of this Vector2 (Distance from the origin).
        * @method len
	    * @return {Number} The length.
	    */
        public len(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
	    * Calculate a normalised unit Vector2 from this Vector2.
        * @method unit
	    * @return {Vector2} a new Unit Length Vector2.
	    */
        public unit(): Vector2 {
            var invLen = 1.0 / this.len();
            return this.multiplyScalar(invLen);
        }

        /**
	    * Reduce each component of the Vector to the closest lower round value.
        * @method floor
	    * @return {Vector2} a rounded down Vector2.
	    */
        public floor(): Vector2 {
            return new Vector2(Math.floor(this.x), Math.floor(this.y));
        }

        /**
	    * Increase each component of the Vector to the closest upper round value.
        * @method ceil
	    * @return {Vector2} a rounded up Vector2.
	    */
        public ceil(): Vector2 {
            return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
        }

        /**
	    * Round each component of the Vector to the closest round value.
        * @method round
	    * @return {Vector2} a rounded Vector2.
	    */
        public round(): Vector2 {
            return new Vector2(Math.round(this.x), Math.round(this.y));
        }
        
        /**
	    * Clamp the vector between a maximum and minimum Vector2 range component-wise.
        * @method clamp
        * @param {Vector2} min. Minimum values for Vector2.
        * @param {Vector2} max. Maximum values for Vector2.
	    * @return {Vector2} a clamped Vector2.
	    */
        public clamp(min:Vector2,max:Vector2): Vector2 {
            return new Vector2(
                                Math.max( Math.min(this.x, max.x), min.x ),
						        Math.max( Math.min(this.y, max.y), min.y )
                               );
        }

        /**
	    * Calculate a Vector2 perpendicular to this Vector2.
        * @method perp
	    * @return {Vector2} the perpendicular Vector2.
	    */
        public perp(): Vector2 {
            return new Vector2(-this.y, this.x);
        }
        
        /**
	    * Calculate a Vector2 opposite to this Vector2.
        * @method neg
	    * @return {Vector2} the opposite Vector2.
	    */
        public neg(): Vector2 {
            return new Vector2( -this.x, -this.y);
        }

        /**
	    * Check if two Vector2s from equal components.
        * @method equal
        * @param {Vector2} vector2. Vector2 to check against.
        * @return {Boolean} returns true if equal.
	    */
        public equal(vector2: Vector2):bool {
            return this.x === vector2.x && this.y === vector2.y;
        }

        /**
	    * Get a Point object with the same components as this Vector2.
        * @method point
	    * @return {Point} A new Point.
	    */
        public point():Point {
            return new Point(this.x, this.y);
        }

        /**
	    * Set both components to zero.
        * @method clear
	    * @return {Vector2} This object.
	    */
        public clear(): Vector2 {
            this.x = 0;
            this.y = 0;
            return this;
        }

        /**
	    * Get a clone of this Vector2.
        * @method clone
        * @param {Vector2} vector2. A vector2 that will be cloned to. Optional.
        * @return {Vector2} Either a new cloned Vector2 or the output vector with cloned components.
	    */
        public clone(output?: Vector2): Vector2 {
            if (output) {
                return output.setTo(this.x, this.y);
            }
            else {
                return new Vector2(this.x, this.y);
            }

        }

        /**
	    * Copy components from another Vector2.
        * @method copyFrom
        * @param {Vector2} source. A Vector2 to copy from.
        * @return {Vector2} This object.
	    */
        public copyFrom(source: Vector2): Vector2 {
            this.x = source.x;
            this.y = source.y;
            return this;
        }

        /**
	    * Copy components to another Vector2.
        * @method copyTo
        * @param {Vector2} source. A Vector2 to copy to.
        * @return {Vector2} The supplied Vector2.
	    */
        public copyTo(target: Vector2): Vector2 {
            target.x = this.x;
            target.y = this.y;
            return target;
        }

        /**
	    * Set components on this Vector2.
        * @method setTo
        * @param {Number} x. x component to set.
        * @param {Number} y. y component to set.
        * @return {Vector2} This object.
	    */
        public setTo(x: number, y: number): Vector2 {
            this.x = x;
            this.y = y;
            return this;
        }

        /**
	    * Get a string representation of this object.
        * @method toString
        * @return {string} This object as a string.
	    */
        public toString(): string {
            return '[{Vector2 (x=' + this.x + ' y=' + this.y + ')}]';
        }

    }

}