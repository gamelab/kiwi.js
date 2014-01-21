/**
*  
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * A Circle object is an area defined by its position, 
    * as indicated by its center point (x,y) and diameter.
    *	
    * @class Circle
    * @namespace Kiwi.Geom
    * @constructor
    * @param [x = 0] {Number} The x coordinate of the center of the circle.
    * @param [y = 0] {Number} The y coordinate of the center of the circle.
    * @param [diameter = 0] {number} The diameter of the circle.
    * @return {Circle} This circle object
    *
    */
    export class Circle {
        
        constructor (x: number = 0, y: number = 0, diameter: number = 0) {

            this.setTo(x, y, diameter);

        }

        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Circle";
        }

	    /** 
	    * The diameter of the circle
	    * @property _diameter
	    * @type Number
        * @default 0
        * @private
	    */
        private _diameter: number = 0;

	    /** 
	    * The radius of the circle
	    * @property _radius
	    * @type Number
        * @default 0
        * @private
	    */
        private _radius: number = 0;

	    /** 
	    * The x coordinate of the center of the circle
	    * @property x
	    * @type Number
        * @default 0
        * @public
	    */
        public x: number = 0;

	    /** 
	    * The y coordinate of the center of the circle
	    * @property y
	    * @type Number
        * @default 0
        * @public
	    */
        public y: number = 0;

        /**
        * The diameter of the circle. The largest distance between any two points on the circle. The same as the radius * 2.
        * @property diameter
        * @type number
        * @public
	    */
        public set diameter(value: number) {

            if (value > 0)
            {
                this._diameter = value;
                this._radius = value * 0.5;
            }

        }
        public get diameter(): number {

             return this._diameter;

        }

	    /**
	    * The radius of the circle. The length of a line extending from the center of the circle to any point on the circle itself. The same as half the diameter.
	    * @property radius
	    * @type number
        * @public
	    */
        public set radius(value: number) {

            if (value > 0)
            {
                this._radius = value;
                this._diameter = value * 2;
            }

        }
        public get radius(): number {

            return this._radius;

        }

	    /**
	    * The circumference of the circle. This is READ ONLY.
	    * @property circumference
	    * @type number
        * @public
	    */
        public get circumference(): number {

            return 2 * (Math.PI * this._radius);

        }

        /**
        * The sum of the y and radius properties. Changing the bottom property of a Circle object has no effect on the x and y properties, but does change the diameter.
        * @property bottom
        * @type number
        * @public
        */
        public set bottom(value: number) {

            if (!isNaN(value))
            {
                if (value < this.y)
                {
                    this._radius = 0;
                    this._diameter = 0;
                }
                else
                {
                    this.radius = value - this.y;
                }
            }

        } 
        public get bottom(): number {

            return this.y + this._radius;

        }

        /**
        * The x coordinate of the leftmost point of the circle. Changing the left property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
        * @property left
        * @type number
        * @public
        */
        public set left(value: number) {

            if (!isNaN(value))
            {
                if (value < this.x)
                {
                    this.radius = this.x - value;
                }
                else
                {
                    this._radius = 0;
                    this._diameter = 0;
                }
            }

        } 
        public get left(): number {

            return this.x - this._radius;

        }

        /**
        * The x coordinate of the rightmost point of the circle. Changing the right property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
        * @property right
        * @type number
        * @public
        */
        public set right(value: number) {

            if (value && !isNaN(value))
            {
                if (value > this.x)
                {
                    this.radius = value - this.x;
                }
                else
                {
                    this._radius = 0;
                    this._diameter = 0;
                }
            }

        } 
        public get right(): number {

            return this.x + this._radius;

        }

        /**
        * The sum of the y minus the radius property. Changing the top property of a Circle object has no effect on the x and y properties, but does change the diameter.
        * @property top
        * @type number
        * @public
        */
        public set top(value: number) {

            if (value && !isNaN(value))
            {
                if (value > this.y)
                {
                    this._radius = 0;
                    this._diameter = 0;
                }
                else
                {
                    this.radius = this.y - value;
                }
            }

        }

        public get top(): number {

            return this.y - this._radius;

        }

        /**
	    * Gets the area of this Circle. Note this is READ ONLY.
	    * @property area
        * @type number
        * @public
        */
        public get area(): number {

            if (this._radius > 0)
            {
                return Math.PI * this._radius * this._radius;
            }
            else
            {
                return 0;
            }

        }

        /**
	    * Determines whether or not this Circle object is empty. This is READ ONLY.
	    * @method isEmpty
	    * @return {boolean} A value of true if the Circle objects diameter is less than or equal to 0; otherwise false.
        * @public
	    */
        public get isEmpty(): boolean {

            if (this._diameter <= 0)
            {
                return true;
            }

            return false;

        }
          
	    /**
	    * Returns a new Circle object with the same values for the x, y, width, and height properties as the original Circle object.
	    * @method clone
	    * @param [output = Circle] {Circle} If given the values will be set into the object, otherwise a brand new Circle object will be created and returned.
	    * @return {Circle}
        * @public
	    */
        public clone(output: Circle = new Circle): Circle {

            return output.setTo(this.x, this.y, this._diameter);

        }

	    /**
	    * Copies all of circle data from the source Circle object into the calling Circle object.
	    * @method copyFrom
	    * @param source {Circle} The source circle object to copy from
	    * @return {Circle} This circle object
        * @public
	    */
        public copyFrom(source: Circle): Circle {

            return this.setTo(source.x, source.y, source.diameter);

        }

	    /**
	    * Copies all of circle data from this Circle object into the destination Circle object.
	    * @method copyTo
	    * @param circle {Circle} The destination circle object to copy in to
	    * @return {Circle} The destination circle object
        * @public
	    */
        public copyTo(target: Circle) {

            return target.copyFrom(this);

        }

	    /**
	    * Returns the distance from the center of this Circle object to the given object (can be Circle, Point or anything with x/y values)
	    * @method distanceTo
	    * @param target {Any} The destination Point object.
	    * @param [round=false] {boolean} Round the distance to the nearest integer (default false)
	    * @return {Number} The distance between this Point object and the destination Point object.
        * @public
	    */
        public distanceTo(target: any, round: boolean = false): number {

            var dx = this.x - target.x;
            var dy = this.y - target.y;

            if (round === true)
            {
                return Math.round(Math.sqrt(dx * dx + dy * dy));
            }
            else
            {
                return Math.sqrt(dx * dx + dy * dy);
            }

        }

	    /**
	    * Determines whether the object specified in the toCompare parameter is equal to this Circle object. This method compares the x, y and diameter properties of an object against the same properties of this Circle object.
	    * @method equals
	    * @param toCompare {Circle} The circle to compare to this Circle object.
	    * @return {boolean} A value of true if the object has exactly the same values for the x, y and diameter properties as this Circle object; otherwise false.
        * @public
	    */
        public equals(toCompare: Circle): boolean {

            if (this.x === toCompare.x && this.y === toCompare.y && this.diameter === toCompare.diameter)
            {
                return true;
            }

            return false;

        }

	    /**
	    * Determines whether the Circle object specified in the toIntersect parameter intersects with this Circle object. This method checks the radius distances between the two Circle objects to see if they intersect.
	    * @method intersects
	    * @param toIntersect {Circle} The Circle object to compare against to see if it intersects with this Circle object.
	    * @return {boolean} A value of true if the specified object intersects with this Circle object; otherwise false.
        * @public
	    */
        public intersects(toIntersect: Circle): boolean {

            if (this.distanceTo(toIntersect, false) < (this._radius + toIntersect._radius))
            {
                return true;
            }

            return false;

        }

	    /**
	    * Returns a Point object containing the coordinates of a point on the circumference of this Circle based on the given angle.
	    * @method circumferencePoint
	    * @param angle {Number} The angle in radians (unless asDegrees is true) to return the point from.
	    * @param [asDegress=false] {boolean} Is the given angle in radians (false) or degrees (true)?
	    * @param [point=Point] {Point} An optional Point object to put the result in to. If none specified a new Point object will be created.
	    * @return {Point} The Point object holding the result.
        * @public
	    */
        public circumferencePoint(angle: number, asDegrees: boolean = false, output: Point = new Point): Point {

            if (asDegrees === true)
            {
                angle = angle * (Math.PI / 180); // Radians to Degrees
                //angle = angle * (180 / Math.PI); // Degrees to Radians
            }

            output.x = this.x + this._radius * Math.cos(angle);
            output.y = this.y + this._radius * Math.sin(angle);

            return output;

        }

	    /**
	    * Adjusts the location of the Circle object, as determined by its center coordinate, by the specified amounts.
	    * @method offset
	    * @param dx {Number} Moves the x value of the Circle object by this amount.
	    * @param dy {Number} Moves the y value of the Circle object by this amount.
	    * @return {Circle} This Circle object.
        * @public
	    */
        public offset(dx: number, dy: number): Circle {

            if (!isNaN(dx) && !isNaN(dy))
            {
                this.x += dx;
                this.y += dy;
            }

            return this;

        }

	    /**
	    * Adjusts the location of the Circle object using a Point object as a parameter. This method is similar to the Circle.offset() method, except that it takes a Point object as a parameter.
	    * @method offsetPoint
	    * @param {Point} point A Point object to use to offset this Circle object.
	    * @return {Circle} This Circle object.
        * @public
	    */
        public offsetPoint(point: Point): Circle {

            return this.offset(point.x, point.y);

        }

	    /**
	    * Sets the members of Circle to the specified values.
	    * @method setTo
	    * @param x {Number} The x coordinate of the center of the circle.
	    * @param y {Number} The y coordinate of the center of the circle.
	    * @param diameter {Number} The diameter of the circle in pixels.
	    * @return {Circle} This circle object
        * @public
	    */
        public setTo(x: number, y: number, diameter: number): Circle {

            this.x = x;
            this.y = y;
            this._diameter = diameter;
            this._radius = diameter * 0.5;

            return this;

        }

	    /**
	    * Returns a string representation of this object.
	    * @method toString
	    * @return {string} a string representation of the instance.
        * @public
	    */
        public toString(): string {

            return "[{Circle (x=" + this.x + " y=" + this.y + " diameter=" + this.diameter + " radius=" + this.radius + ")}]";

        }

    }

}