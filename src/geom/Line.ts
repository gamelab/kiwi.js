/**
* Kiwi - Geom
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * A line object is an infinte line through space. The two sets of x/y coordinates define the Line Segment.
    *
    * @class Line
    *
    */
    export class Line {

        /**
        * Creates an line defined by two points. Can be treated as either a Line or Line Segment depending on context.
        * @constructor
        * @param {Number} x1 x component of first point.
        * @param {Number} y1 y component of first point.
        * @param {Number} x2 x component of second point.
        * @param {Number} y2 y component of second point.
        * @return {Kiwi.Geom.Line} This Object
        */
        constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {

            this.setTo(x1, y1, x2, y2);

        }

        public objType() {
            return "Line";
        }

        /**
        * x component of first point.
        * @property x1
        * @type Number
        */
        public x1: number = 0;

        /**
        * y component of first point.
        * @property y1
        * @type Number
        */
        public y1: number = 0;

        /**
        * x component of second point.
        * @property x2
        * @type Number
        */
        public x2: number = 0;

        /**
        * y component of second point.
        * @property y2
        * @type Number
        */
        public y2: number = 0;

        /**
        * Return a clone of the line.
        * @method clone
        * @param {Kiwi.Geom.Line} [output]
        * @return {Kiwi.Geom.Line}
        */
        public clone(output: Line = new Line): Line {

            return output.setTo(this.x1, this.y1, this.x2, this.y2);

        }

        /**
        * Copy the line from another existing line.
        * @method copyFrom 
        * @param {Kiwi.Geom.Line} source
        * @return {Kiwi.Geom.Line}
        */
        public copyFrom(source: Line): Line {

            return this.setTo(source.x1, source.y1, source.x2, source.y2);

        }

        /**
        * Copy the line to another existing line.
        * @method copyTo
        * @param {Kiwi.Geom.Line} target
        * @return {Kiwi.Geom.Line}
        */
        public copyTo(target: Line): Line {

            return target.copyFrom(this);

        }

        /**
        * Set all components on the line.
        * @method setTo
        * @param {Number} x1 x component of first point.
        * @param {Number} y1 y component of first point.
        * @param {Number} x2 x component of second point.
        * @param {Number} y2 y component of second point.
        * @return {Kiwi.Geom.Line}
        */
        public setTo(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0): Line {

            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;

            return this;

        }

        /**
        * Get the length of the line as a line segement.
        * @method length
        * @return {Number}
        */
        public get length(): number {

            return Math.sqrt((this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1));

        }

        /**
        * Get the y of a point on the line for a given x.
        * @method getY
        * @param {Number} x
        * @return {Number}
        */
        public getY(x: number): number {

            return this.slope * x + this.yIntercept;

        }

        /**
        * Get the angle of the line.
        * @method angle 
        * @return {Number}
        */
        public get angle(): number {

            return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);

        }

        /**
        * Get the slope of the line (y/x).
        * @method slope
        * @return {Number}
        */
        public get slope(): number {

            return (this.y2 - this.y1) / (this.x2 - this.x1);

        }

        /**
        * Get the perpendicular slope of the line (x/y).
        * @method perpSlope
        * @return {Number}
        */
        public get perpSlope(): number {

            return -((this.x2 - this.x1) / (this.y2 - this.y1));

        }

        /**
        * Get the y intercept for the line.
        * @method yIntercept
        * @return {Number}
        */
        public get yIntercept(): number {

            return (this.y1 - this.slope * this.x1);

        }

        /**
        * Check if a point is on the line.
        * @method isPointOnLine
        * @param {Number} x
        * @param {Number} y
        * @return {boolean}
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
        * 
        * @method intersectLineLine
        * @param {Any} line
        * @return {Any}
        */
        public intersectLineLine(line): any {
            //return Kiwi.Geom.intersectLineLine(this,line);
        }

        /**
        * Get a line perpendicular to the line passing through a given point.
        * @method perp
        * @param {Number} x
        * @param {Number} y
        * @param {Kiwi.Geom.Line} [output]
        * @return {Kiwi.Geom.Line}
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
        */
        public toString(): string {

            return "[{Line (x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + ")}]";

        }

    }

}