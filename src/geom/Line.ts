/**
*  
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * A line object is an infinte line through space. The two sets of x/y coordinates define the Line Segment.
    *
    * @class Line
    * @constructor
    * @param [x1 = 0] {Number} x1 x component of first point.
    * @param [y1 = 0]{Number} y1 y component of first point.
    * @param [x2 = 0]{Number} x2 x component of second point.
    * @param [y2 = 0]{Number} y2 y component of second point.
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
        * @return {string} The type of this object
        * @public
        */
        public objType() {
            return "Line";
        }

        /**
        * x component of first point.
        * @property x1
        * @type Number
        * @public
        */
        public x1: number = 0;

        /**
        * y component of first point.
        * @property y1
        * @type Number
        * @public
        */
        public y1: number = 0;

        /**
        * x component of second point.
        * @property x2
        * @type Number
        * @public
        */
        public x2: number = 0;

        /**
        * y component of second point.
        * @property y2
        * @type Number
        * @public
        */
        public y2: number = 0;

        /**
        * Return a clone of the line.
        * @method clone
        * @param [output = Line] {Line}
        * @return {Line}
        * @public
        */
        public clone(output: Line = new Line): Line {

            return output.setTo(this.x1, this.y1, this.x2, this.y2);

        }

        /**
        * Copy the line from another existing line.
        * @method copyFrom 
        * @param source {Line} source
        * @return {Line}
        * @public
        */
        public copyFrom(source: Line): Line {

            return this.setTo(source.x1, source.y1, source.x2, source.y2);

        }

        /**
        * Copy the line to another existing line.
        * @method copyTo
        * @param target {Line} target
        * @return {Line}
        * @public
        */
        public copyTo(target: Line): Line {

            return target.copyFrom(this);

        }

        /**
        * Set all components on the line.
        * @method setTo
        * @param [x1 = 0]{Number} x1 x component of first point.
        * @param [y1 = 0]{Number} y1 y component of first point.
        * @param [x2 = 0]{Number} x2 x component of second point.
        * @param [y2 = 0]{Number} y2 y component of second point.
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
        * Get the length of the line as a line segment.
        * @property length
        * @type number
        * @public
        */
        public get length(): number {

            return Math.sqrt((this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1));

        }

        /**
        * Get the y of a point on the line for a given x.
        * @method getY
        * @param {Number} x
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
        * @return {Number}
        */
        public get angle(): number {

            return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);

        }

        /**
        * Get the slope of the line (y/x).
        * @property slope
        * @return {Number}
        * @public
        */
        public get slope(): number {

            return (this.y2 - this.y1) / (this.x2 - this.x1);

        }

        /**
        * Get the perpendicular slope of the line (x/y).
        * @propery perpSlope
        * @return {Number}
        * @public
        */
        public get perpSlope(): number {

            return -((this.x2 - this.x1) / (this.y2 - this.y1));

        }

        /**
        * Get the y intercept for the line.
        * @property yIntercept
        * @return {Number}
        * @property
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
        * @param {Number} x
        * @param {Number} y
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
        * [REQUIRES DESCRIPTION]
        * @method intersectLineLine
        * @param line {Any} line
        * @return {Any}
        * @public
        */
        public intersectLineLine(line): any {
            //return Kiwi.Geom.intersectLineLine(this,line);
        }

        /**
        * Get a line perpendicular to the line passing through a given point.
        * @method perp
        * @param x {Number} 
        * @param y {Number} 
        * @param [output = Line]{Line} 
        * @return {Line}
        * @public
        */
        public perp(x: number, y: number, output?: Line): Line {

            if (this.y1 === this.y2)
            {
                if (output)
                {
                    output.setTo(x, y, x, this.y1);
                }
                else
                {
                    return new Line(x, y, x, this.y1);
                }
            }

            var yInt: number = (y - this.perpSlope * x);

            var pt: any = this.intersectLineLine({ x1: x, y1: y, x2: 0, y2: yInt });

            if (output)
            {
                output.setTo(x, y, pt.x, pt.y);
            }
            else
            {
                return new Line(x, y, pt.x, pt.y);
            }

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