/**
* Kiwi - Geom
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * Represents a halfline. The ray starts at the first point and extends infinitely in the direction of the second.
    *
    * @class Ray
    *
    */
    export class Ray {

        /**
        * 
        * @constructor
        * @param {Number} x1
        * @param {Number} y1
        * @param {Number} x2
        * @param {Number} y2
        * @return {Kiwi.Geom.Ray} This Object
        */
        constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {

            this.setTo(x1, y1, x2, y2);

        }

        public objType() {
            return "Ray";
        }

        /**
        * The x component of the initial point of the ray
        * @property x1
        * @type Number
        */
        public x1: number = 0;

        /**
        * The y component of the initial point of the ray
        * @property y1
        * @type Number
        */
        public y1: number = 0;

        /**
        * The x component of the direction point of the ray
        * @property x2
        * @type Number
        */
        public x2: number = 0;

        /**
        * The y component of the direction point of the ray
        * @property y2
        * @type Number
        */
        public y2: number = 0;

        /**
        * 
        * @method clone
        * @param {Kiwi.Geom.Ray} [output]
        * @return {Kiwi.Geom.Ray}
        */
        public clone(output: Ray = new Ray): Ray {

            return output.setTo(this.x1, this.y1, this.x2, this.y2);

        }

        /**
        * 
        * @method copyFrom
        * @param {Kiwi.Geom.Line} source
        * @return {Kiwi.Geom.Line}
        */
        public copyFrom(source: Ray): Ray {

            return this.setTo(source.x1, source.y1, source.x2, source.y2);

        }

        /**
        * 
        * @method copyTo
        * @param {Kiwi.Geom.Line} target
        * @return {Kiwi.Geom.Line}
        */
        public copyTo(target: Ray): Ray {

            return target.copyFrom(this);

        }

        /**
        * 
        * @method setTo
        * @param {Number} x1
        * @param {Number} y1
        * @param {Number} x2
        * @param {Number} y2
        * @return {Kiwi.Geom.Line}
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
        * @method angle
        * @return {Number}
        */
        public get angle(): number {

            return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);

        }

        /**
        * Get the slope of the ray.
        * @method slope
        * @return {Number}
        */
        public get slope(): number {

            return (this.y2 - this.y1) / (this.x2 - this.x1);

        }

        /**
        * 
        * @method yIntercept
        * @return {Number}
        */
        public get yIntercept(): number {

            return (this.y1 - this.slope * this.x1);

        }

        /**
        * Check if a the ray passes through a point.
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

              //  return true;
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