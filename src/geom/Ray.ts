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
    * @param [x1 = 0] {Number} x1
    * @param [y1 = 0] {Number} y1
    * @param [x2 = 0] {Number} x2
    * @param [y2 = 0] {Number} y2
    * @return {Ray} This Object
    *
    */
    export class Ray {

        constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {

            this.setTo(x1, y1, x2, y2);

        }
        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Ray";
        }

        /**
        * The x component of the initial point of the ray
        * @property x1
        * @type Number
        * @public
        */
        public x1: number = 0;

        /**
        * The y component of the initial point of the ray
        * @property y1
        * @type Number
        * @public
        */
        public y1: number = 0;

        /**
        * The x component of the direction point of the ray
        * @property x2
        * @type Number
        * @public
        */
        public x2: number = 0;

        /**
        * The y component of the direction point of the ray
        * @property y2
        * @type Number
        * @public
        */
        public y2: number = 0;

        /**
        * Makes a copy of this Ray either as a new Ray object or,
        * makes a passed Ray a copy of this one. 
        * @method clone
        * @param [output = Ray] {Ray} 
        * @return {Ray}
        * @public
        */
        public clone(output: Ray = new Ray): Ray {

            return output.setTo(this.x1, this.y1, this.x2, this.y2);

        }

        /**
        * Makes this Ray the same as a passed Ray.
        * @method copyFrom
        * @param source {Ray} 
        * @return {Ray}
        * @public
        */
        public copyFrom(source: Ray): Ray {

            return this.setTo(source.x1, source.y1, source.x2, source.y2);

        }

        /**
        * Makes a passed Ray the same as this Ray object. 
        * @method copyTo
        * @param target {Ray} 
        * @return {Ray}
        * @public
        */
        public copyTo(target: Ray): Ray {

            return target.copyFrom(this);

        }

        /**
        * Sets the origin and the direction of this Ray.
        * @method setTo
        * @param x1{Number} 
        * @param y1{Number} 
        * @param x2{Number} 
        * @param y2{Number} 
        * @return {Ray}
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
        * @return {Number}
        * @public
        */
        public get angle(): number {

            return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);

        }

        /**
        * Get the slope of the ray.
        * @property slope
        * @return {Number}
        * @public
        */
        public get slope(): number {

            return (this.y2 - this.y1) / (this.x2 - this.x1);

        }

        /**
        *
        * @method yIntercept
        * @property yIntercept
        * @return {Number}
        * @public
        */
        public get yIntercept(): number {

            return (this.y1 - this.slope * this.x1);

        }

        /**
        * Check if the Ray passes through a point.
        * @method isPointOnRay
        * @param {Number} x
        * @param {Number} y
        * @return {boolean}
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
        */
        public toString(): string {

            return "[{Ray (x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + ")}]";

        }

    }

}