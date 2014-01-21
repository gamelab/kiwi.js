/**
*  
* @module Kiwi
* @submodule Geom
*/ 

module Kiwi.Geom {

    /**
    * Contains a collection of STATIC methods to help determine and return intersection between geometric objects.
    *
    * @class Intersect
    * @namespace Kiwi.Geom
    * @static
    */
    export class Intersect {

        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Intersect";
        }

        /**
	    * -------------------------------------------------------------------------------------------
	    * Distance
	    * -------------------------------------------------------------------------------------------
	    **/

        /** 
	    * Returns the distance between two sets of coordinates that you specify. 
	    * @method distance
        * @param x1 {Number} The x position of the first coordinate.
        * @param y1 {Number} The y position of the first coordinate.
        * @param x2 {Number} The x position of the second coordinate.
        * @param y2 {Number} The y position of the second coordinate.
        * @return {Number} The distance between the two points.
        * @public
        * @static
	    **/
        static distance(x1: number, y1: number, x2: number, y2: number) {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        }

        /** 
	    * Returns the distance squared between two sets of coordinates that you specify. 
	    * @method distanceSquared
        * @param x1 {Number} The x position of the first coordinate.
        * @param y1 {Number} The y position of the first coordinate.
        * @param x2 {Number} The x position of the second coordinate.
        * @param y2 {Number} The y position of the second coordinate.
        * @return {Number} The distance between the two points squared.
        * @public
        * @static
	    */
        static distanceSquared(x1: number, y1: number, x2: number, y2: number) {
            return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        }

        /**
	    * -------------------------------------------------------------------------------------------
	    * Lines
	    * -------------------------------------------------------------------------------------------
	    **/

        /**
	    * Check to see if any two Lines intersect at any point. 
        * Both lines are treated as if they extend infintely through space.
	    * @method lineToLine
	    * @param line1 {Line} The first line object to check
	    * @param line2 {Line} The second line object to check
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in. (One is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
	    */
        static lineToLine(line1: Line, line2: Line, output: IntersectResult = new IntersectResult): IntersectResult {

            var denom = (line1.x1 - line1.x2) * (line2.y1 - line2.y2) - (line1.y1 - line1.y2) * (line2.x1 - line2.x2);

            if (denom !== 0)
            {
                output.result = true;
                output.x = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (line2.x1 - line2.x2) - (line1.x1 - line1.x2) * (line2.x1 * line2.y2 - line2.y1 * line2.x2)) / denom;
                output.y = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (line2.y1 - line2.y2) - (line1.y1 - line1.y2) * (line2.x1 * line2.y2 - line2.y1 * line2.x2)) / denom;
            }

            return output;
        }

        /**
	    * Check to see if a Line and a Line Segment intersect at any point. 
        * Note: The first line passed is treated as if it extends infinately though space, 
        * The second is treated as if it only exists between its two points.
	    * @method lineToLineSegment
	    * @param line1 {Line} The first line to check. This is the one that will extend through space infinately.
	    * @param seg {Line} The second line to check. This is the one that will only exist between its two coordinates.
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection.
        * @public
        * @static
	    */
        static lineToLineSegment(line1: Line, seg: Line, output: IntersectResult = new IntersectResult): IntersectResult {

            var denom = (line1.x1 - line1.x2) * (seg.y1 - seg.y2) - (line1.y1 - line1.y2) * (seg.x1 - seg.x2);

            if (denom !== 0)
            {
                output.x = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (seg.x1 - seg.x2) - (line1.x1 - line1.x2) * (seg.x1 * seg.y2 - seg.y1 * seg.x2)) / denom;
                output.y = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (seg.y1 - seg.y2) - (line1.y1 - line1.y2) * (seg.x1 * seg.y2 - seg.y1 * seg.x2)) / denom;

                var maxX = Math.max(seg.x1, seg.x2);
                var minX = Math.min(seg.x1, seg.x2);
                var maxY = Math.max(seg.y1, seg.y2);
                var minY = Math.min(seg.y1, seg.y2);

                //if (!(output.x <= maxX && output.x >= minX) || !(output.y <= maxY && output.y >= minY))
                if ((output.x <= maxX && output.x >= minX) === true || (output.y <= maxY && output.y >= minY) === true)
                {
                    output.result = true;
                }

            }

            return output;

        }

        /**
	    * Checks to see if a Line that is passed, intersects at any point another Line that is made by passing a set of coordinates to this method. 
        * Note: The first line will extend infinately through space. 
        * And the second line will only exist between the two points passed.
	    * @method lineToRawSegment
	    * @param line {Line} The line object that extends infinatly through space.
	    * @param x1 {number} The x coordinate of the first point in the second line.
	    * @param y1 {number} The y coordinate of the first point in the second line.
	    * @param x2 {number} The x coordinate of the second point in the second line.
	    * @param y2 {number} The y coordinate of the second point in the second line.
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	    * @static
        * @public
        */
        static lineToRawSegment(line: Line, x1: number, y1: number, x2: number, y2: number, output: IntersectResult = new IntersectResult): IntersectResult {

            var denom = (line.x1 - line.x2) * (y1 - y2) - (line.y1 - line.y2) * (x1 - x2);

            if (denom !== 0)
            {
                output.x = ((line.x1 * line.y2 - line.y1 * line.x2) * (x1 - x2) - (line.x1 - line.x2) * (x1 * y2 - y1 * x2)) / denom;
                output.y = ((line.x1 * line.y2 - line.y1 * line.x2) * (y1 - y2) - (line.y1 - line.y2) * (x1 * y2 - y1 * x2)) / denom;

                var maxX = Math.max(x1, x2);
                var minX = Math.min(x1, x2);
                var maxY = Math.max(y1, y2);
                var minY = Math.min(y1, y2);

                if ((output.x <= maxX && output.x >= minX) === true || (output.y <= maxY && output.y >= minY) === true)
                {
                    output.result = true;
                }

            }

            return output;

        }

        /**
	    * Checks to see if a Line and Ray object intersects at any point. 
        * Note: The line in this case extends infinately through space. 
	    * @method lineToRay
	    * @param line1 {Line} The Line object that extends infinatly through space.
	    * @param ray {Ray} The Ray object that you want to check it against.
	    * @param {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	    * @public
        * @static
        */
        static lineToRay(line1: Line, ray: Ray, output: IntersectResult = new IntersectResult): IntersectResult {

            var denom = (line1.x1 - line1.x2) * (ray.y1 - ray.y2) - (line1.y1 - line1.y2) * (ray.x1 - ray.x2);

            if (denom !== 0)
            {
                output.x = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (ray.x1 - ray.x2) - (line1.x1 - line1.x2) * (ray.x1 * ray.y2 - ray.y1 * ray.x2)) / denom;
                output.y = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (ray.y1 - ray.y2) - (line1.y1 - line1.y2) * (ray.x1 * ray.y2 - ray.y1 * ray.x2)) / denom;
                output.result = true; // true unless either of the 2 following conditions are met

                if (!(ray.x1 >= ray.x2) && output.x < ray.x1)
                {
                    output.result = false;
                }

                if (!(ray.y1 >= ray.y2) && output.y < ray.y1)
                {
                    output.result = false;
                }
            }

            return output;

        }

        /**
	    * Checks to see if a Line and a Circle intersect at any point.
        * Note: The line passed is assumed to extend infinately through space. 
	    * @method lineToCircle
	    * @param line {Line} The Line object that you want to check it against.
	    * @param circle {Circle} The Circle object to check.
	    * @param [output=Intersect] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection
	    * @public
        * @static
        */
        static lineToCircle(line: Line, circle: Circle, output: IntersectResult = new IntersectResult): IntersectResult {

            //  Get a perpendicular line running to the center of the circle
            if (line.perp(circle.x, circle.y).length <= circle.radius)
            {
                output.result = true;
            }

            return output;

        }

        /**
	    * Check if the Line intersects with each side of a Rectangle.
        * Note: The Line is assumned to extend infinately through space.
	    * @method lineToRectangle
	    * @param line {Line} The Line object to check
	    * @param rectangle {Rectangle} The Rectangle object to check
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
	    */
        static lineToRectangle(line: any, rect: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

            //  Top of the Rectangle vs the Line
            Intersect.lineToRawSegment(line, rect.x, rect.y, rect.right, rect.y, output);

            if (output.result === true)
            {
                return output;
            }

            //  Left of the Rectangle vs the Line
            Intersect.lineToRawSegment(line, rect.x, rect.y, rect.x, rect.bottom, output);

            if (output.result === true)
            {
                return output;
            }

            //  Bottom of the Rectangle vs the Line
            Intersect.lineToRawSegment(line, rect.x, rect.bottom, rect.right, rect.bottom, output);

            if (output.result === true)
            {
                return output;
            }

            //  Right of the Rectangle vs the Line
            Intersect.lineToRawSegment(line, rect.right, rect.y, rect.right, rect.bottom, output);

            return output;

        }

        /**
	    * -------------------------------------------------------------------------------------------
	    * Line Segment
	    * -------------------------------------------------------------------------------------------
	    **/

        /**
	    * Checks to see if two Line Segments intersect at any point in space. 
        * Note: Both lines are treated as if they only exist between their two line coordinates.
	    * @method lineSegmentToLineSegment
	    * @param line1 {Line} The first line object to check.
	    * @param line2 {Line} The second line object to check.
	    * @param [output=IntersectResult]{IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y.
	    * @public
        * @static
        */
        static lineSegmentToLineSegment(line1: Line, line2: Line, output: IntersectResult = new IntersectResult): IntersectResult {

            Intersect.lineToLineSegment(line1, line2, output);

            if (output.result === true)
            {
                if (!(output.x >= Math.min(line1.x1, line1.x2) && output.x <= Math.max(line1.x1, line1.x2)
                    && output.y >= Math.min(line1.y1, line1.y2) && output.y <= Math.max(line1.y1, line1.y2)))
                {
                    output.result = false;
                }
            }

            return output;
        }

        /**
	    * Check if the Line Segment intersects with the Ray.
        * Note: The Line only exists between its two points.
	    * @method lineSegmentToRay
	    * @param line1 {Line} The Line object to check.
	    * @param ray {Line} The Ray object to check.
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
	    */
        static lineSegmentToRay(line1: Line, ray: Ray, output: IntersectResult = new IntersectResult): IntersectResult {

            Intersect.lineToRay(line1, ray, output);

            if (output.result === true)
            {
                if (!(output.x >= Math.min(line1.x1, line1.x2) && output.x <= Math.max(line1.x1, line1.x2)
                    && output.y >= Math.min(line1.y1, line1.y2) && output.y <= Math.max(line1.y1, line1.y2)))
                {
                    output.result = false;
                }
            }

            return output;

        }

        /**
	    * Check if the Line Segment intersects with the Circle.
        * Note the Line only exists between its point points.
	    * @method lineSegmentToCircle
	    * @param seg {Line} The Line object to check
	    * @param circle {Circle} The Circle object to check
	    * @param [ouput=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
	    */
        static lineSegmentToCircle(seg: Line, circle: Circle, output: IntersectResult = new IntersectResult): IntersectResult {

            var perp = seg.perp(circle.x, circle.y);

            if (perp.length <= circle.radius)
            {
                //  Line intersects circle - check if segment does
                var maxX = Math.max(seg.x1, seg.x2);
                var minX = Math.min(seg.x1, seg.x2);
                var maxY = Math.max(seg.y1, seg.y2);
                var minY = Math.min(seg.y1, seg.y2);

                if ((perp.x2 <= maxX && perp.x2 >= minX) && (perp.y2 <= maxY && perp.y2 >= minY))
                {
                    output.result = true;
                }
                else
                {
                    //  Worst case - segment doesn't traverse center, so no perpendicular connection.
                    if (Intersect.circleContainsPoint(circle, <Point> { x: seg.x1, y: seg.y1 }) || Intersect.circleContainsPoint(circle, <Point> { x: seg.x2, y: seg.y2 }))
                    {
                        output.result = true;
                    }
                }

            }

            return output;
        }

        /**
	    * Check if the Line Segment intersects with any side of a Rectangle.
        * Note: The Line only exists between its two points.
	    * @method lineSegmentToCircle
	    * @param seg {Line} The Line object to check.
	    * @param rect {Rectangle} The Rectangle object to check.
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given).
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y.
	    * @public
        * @static
        */ 
        static lineSegmentToRectangle(seg: Line, rect: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

            if (rect.contains(seg.x1, seg.y1) && rect.contains(seg.x2, seg.y2))
            {
                output.result = true;
            }
            else
            {
                //  Top of the Rectangle vs the Line
                Intersect.lineToRawSegment(seg, rect.x, rect.y, rect.right, rect.bottom, output);

                if (output.result === true)
                {
                    return output;
                }

                //  Left of the Rectangle vs the Line
                Intersect.lineToRawSegment(seg, rect.x, rect.y, rect.x, rect.bottom, output);

                if (output.result === true)
                {
                    return output;
                }

                //  Bottom of the Rectangle vs the Line
                Intersect.lineToRawSegment(seg, rect.x, rect.bottom, rect.right, rect.bottom, output);

                if (output.result === true)
                {
                    return output;
                }

                //  Right of the Rectangle vs the Line
                Intersect.lineToRawSegment(seg, rect.right, rect.y, rect.right, rect.bottom, output);

                return output;

            }

            return output;

        }

        /**
	    * -------------------------------------------------------------------------------------------
	    * Ray
	    * -------------------------------------------------------------------------------------------
	    **/

        /**
	    * Check to see if a Ray intersects at any point with a Rectangle.
	    * @method rayToRectangle
	    * @param ray {Ray} The Ray object to check. 
	    * @param rect {Rectangle} The Rectangle to check.
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection
	    * @public
        * @static
        */
        static rayToRectangle(ray: Ray, rect: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

            //  Currently just finds first intersection - might not be closest to ray pt1
            Intersect.lineToRectangle(ray, rect, output);

            return output;

        }

        /**
        * Check whether a Ray intersects a Line segment, returns the parametric value where the intersection occurs.
        * Note: The Line only exists between its two points.
        * @method rayToLineSegment
        * @static
        * @param rayx1 {Number} The origin point of the ray on the x axis.
        * @param rayy1 {Number} The origin point of the ray on the y axis.
        * @param rayx2 {Number} The direction of the ray on the x axis. 
        * @param rayy2 {Number} The direction of the ray on the y axis.
        * @param linex1 {Number} The x of the first point of the line segment.
        * @param liney1 {Number} The y of the first point of the line segment.
        * @param linex2 {Number} The x of the second point of the line segment.
        * @param liney2 {Number} The y of the second point of the line segment.
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection stored in x
        * @public
        */
        static rayToLineSegment(rayx1, rayy1, rayx2, rayy2, linex1, liney1, linex2, liney2, output: IntersectResult = new IntersectResult): IntersectResult {

            var r, s, d;

            // Check lines are not parallel
            if ((rayy2 - rayy1) / (rayx2 - rayx1) != (liney2 - liney1) / (linex2 - linex1))
            {
                d = (((rayx2 - rayx1) * (liney2 - liney1)) - (rayy2 - rayy1) * (linex2 - linex1));

                if (d != 0)
                {
                    r = (((rayy1 - liney1) * (linex2 - linex1)) - (rayx1 - linex1) * (liney2 - liney1)) / d;
                    s = (((rayy1 - liney1) * (rayx2 - rayx1)) - (rayx1 - linex1) * (rayy2 - rayy1)) / d;

                    if (r >= 0)
                    {
                        if (s >= 0 && s <= 1)
                        {
                            output.result = true;
                            output.x = rayx1 + r * (rayx2 - rayx1), rayy1 + r * (rayy2 - rayy1);
                        }
                    }
                }
            }

            return output;

        }

        /**
	    * -------------------------------------------------------------------------------------------
	    * Circle
	    * -------------------------------------------------------------------------------------------
	    **/

        /**
	    * Check if the two given Circle objects intersect at any point.
	    * @method circleToCircle
	    * @param circle1 {Circle} The first circle object to check.
	    * @param circle2 {Circle} The second circle object to check.
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection
	    * @public
        * @static
        */
        static circleToCircle(circle1: Circle, circle2: Circle, output: IntersectResult = new IntersectResult): IntersectResult {

            output.result = ((circle1.radius + circle2.radius) * (circle1.radius + circle2.radius)) >= Intersect.distanceSquared(circle1.x, circle1.y, circle2.x, circle2.y);

            return output;

        }

        /**
	    * Check if a Circle and a Rectangle intersect with each other at any point. 
	    * @method circleToRectangle
	    * @param circle {Circle} The circle object to check.
	    * @param rect {Rectangle} The Rectangle object to check.
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection
	    * @public
        * @static
        */
        static circleToRectangle(circle: Circle, rect: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

            var inflatedRect: Rectangle = rect.clone();

            inflatedRect.inflate(circle.radius, circle.radius);

            output.result = inflatedRect.contains(circle.x, circle.y);

            return output;

        }

        /**
	    * Check if the given Point is found within the given Circle.
	    * @method circleContainsPoint
	    * @param circle {Circle} The circle object to check
	    * @param point {Point} The point object to check
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection
	    * @public
        * @static
        */
        static circleContainsPoint(circle: Circle, point: Point, output: IntersectResult = new IntersectResult): IntersectResult {

            output.result = circle.radius * circle.radius >= Intersect.distanceSquared(circle.x, circle.y, point.x, point.y);

            return output;

        }

        /**
	    * -------------------------------------------------------------------------------------------
	    * Rectangles
	    * -------------------------------------------------------------------------------------------
	    **/

        /**
        * Determines whether the specified point is contained within a given Rectangle object.
        * @method pointToRectangle
        * @param point {Point} The point object being checked.
        * @param rect {Rectangle} The rectangle object being checked.
	    * @param [output=Intersect] {IntersectResult}  An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y/result
        * @public
        * @static
        */
        static pointToRectangle(point: Point, rect: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

            output.setTo(point.x, point.y);

            output.result = rect.containsPoint(point);

            return output;

        }

        /**
	    * Check whether two axis aligned rectangles intersect. Return the intersecting rectangle dimensions if they do.
	    * @method rectangleToRectangle
	    * @param rect1 {Rectangle} The first Rectangle object.
	    * @param rect2 {Rectangle} The second Rectangle object.
	    * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	    * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y/width/height
	    * @public
        * @static
        */
        static rectangleToRectangle(rect1: Rectangle, rect2: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

            var leftX = Math.max(rect1.x, rect2.x);
            var rightX = Math.min(rect1.right, rect2.right);
            var topY = Math.max(rect1.y, rect2.y);
            var bottomY = Math.min(rect1.bottom, rect2.bottom);

            output.setTo(leftX, topY, rightX - leftX, bottomY - topY, rightX - leftX, bottomY - topY);

            var cx = output.x + output.width * .5;
            var cy = output.y + output.height * .5;

            if ((cx > rect1.x && cx < rect1.right) && (cy > rect1.y && cy < rect1.bottom))
            {
                output.result = true;
            }

            return output;

        }

    }

}