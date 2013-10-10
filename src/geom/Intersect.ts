/**
*  
* @module Kiwi
* @submodule Geom
*/ 

module Kiwi.Geom {

    /**
    * A collection of methods to help determine and return intersection between geometric objects.
    *
    * @class Intersect
    *
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
	     * 
	     * @method distance
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} x2
         * @param {Number} y2
         * @return {Number}
	     **/
        static distance(x1: number, y1: number, x2: number, y2: number) {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        }

        /** 
	     * 
	     * @method distanceSquared
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} x2
         * @param {Number} y2
         * @return {Number}
	     **/
        static distanceSquared(x1: number, y1: number, x2: number, y2: number) {
            return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        }

        /**
	     * -------------------------------------------------------------------------------------------
	     * Lines
	     * -------------------------------------------------------------------------------------------
	     **/

        /**
	     * Check if the two given Line objects intersect
	     * @method lineToLine
	     * @param {Kiwi.Geom.Line} The first line object to check
	     * @param {Kiwi.Geom.Line} The second line object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	     **/
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
	     * Check if the Line and Line Segment intersects
	     * @method lineToLineSegment
	     * @param {Kiwi.Geom.Line} The line object to check
	     * @param {Kiwi.Geom.Line} The line segment object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	     **/
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
	     * Check if the Line and Line Segment intersects
	     * @method lineToLineSegment
	     * @param {Kiwi.Geom.Line} The line object to check
	     * @param {number} The x1 value
	     * @param {number} The y1 value
	     * @param {number} The x2 value
	     * @param {number} The y2 value
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	     **/
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
	     * Check if the Line and Ray intersects
	     * @method lineToRay
	     * @param {Kiwi.Geom.Line} The Line object to check
	     * @param {Kiwi.Geom.Line} The Ray object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	     **/
        static lineToRay(line1: Line, ray: Line, output: IntersectResult = new IntersectResult): IntersectResult {

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
	     * Check if the Line and Circle intersects
	     * @method lineToCircle
	     * @param {Kiwi.Geom.Line} The Line object to check
	     * @param {Kiwi.Geom.Circle} The Circle object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
	     **/
        static lineToCircle(line: Line, circle: Circle, output: IntersectResult = new IntersectResult): IntersectResult {

            //  Get a perpendicular line running to the center of the circle
            if (line.perp(circle.x, circle.y).length <= circle.radius)
            {
                output.result = true;
            }

            return output;

        }

        /**
	     * Check if the Line intersects each side of the Rectangle
	     * @method lineToRectangle
	     * @param {Kiwi.Geom.Line} The Line object to check
	     * @param {Kiwi.Geom.Rectangle} The Rectangle object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
	     **/
        static lineToRectangle(line: Line, rect: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

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
	     * Check if Line1 intersects with Line2
	     * @method lineSegmentToLineSegment
	     * @param {Kiwi.Geom.Line} The first line object to check
	     * @param {Kiwi.Geom.Line} The second line object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	     **/
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
	     * Check if the Line Segment intersects with the Ray
	     * @method lineSegmentToRay
	     * @param {Kiwi.Geom.Line} The Line object to check
	     * @param {Kiwi.Geom.Line} The Line Ray object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	     **/
        static lineSegmentToRay(line1: Line, ray: Line, output: IntersectResult = new IntersectResult): IntersectResult {

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
	     * Check if the Line Segment intersects with the Circle
	     * @method lineSegmentToCircle
	     * @param {Kiwi.Geom.Line} The Line object to check
	     * @param {Kiwi.Geom.Circle} The Circle object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	     **/
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
	     * Check if the Line Segment intersects with the Rectangle
	     * @method lineSegmentToCircle
	     * @param {Kiwi.Geom.Line} The Line object to check
	     * @param {Kiwi.Geom.Circle} The Circle object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
	     **/
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
	     * Check if the two given Circle objects intersect
	     * @method circleToCircle
	     * @param {Kiwi.Geom.Circle} The first circle object to check
	     * @param {Kiwi.Geom.Circle} The second circle object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
	     **/
        static rayToRectangle(ray: Line, rect: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

            //  Currently just finds first intersection - might not be closest to ray pt1
            Intersect.lineToRectangle(ray, rect, output);

            return output;

        }

        /**
         * Check whether a ray intersects a line segment, returns the parametric value where the intersection occurs.
         * @method rayToLineSegment
         * @static
         * @param {Number} rayx1. The origin x of the ray.
         * @param {Number} rayy1. The origin y of the ray.
         * @param {Number} rayx2. The direction x of the ray. 
         * @param {Number} rayy2. The direction y of the ray.
         * @param {Number} linex1. The x of the first point of the line segment.
         * @param {Number} liney1. The y of the first point of the line segment.
         * @param {Number} linex2. The x of the second point of the line segment.
         * @param {Number} liney2. The y of the second point of the line segment.
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection stored in x
         **/
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
	     * Check if the two given Circle objects intersect
	     * @method circleToCircle
	     * @param {Kiwi.Geom.Circle} The first circle object to check
	     * @param {Kiwi.Geom.Circle} The second circle object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
	     **/
        static circleToCircle(circle1: Circle, circle2: Circle, output: IntersectResult = new IntersectResult): IntersectResult {

            output.result = ((circle1.radius + circle2.radius) * (circle1.radius + circle2.radius)) >= Intersect.distanceSquared(circle1.x, circle1.y, circle2.x, circle2.y);

            return output;

        }

        /**
	     * Check if the given Rectangle intersects with the given Circle
	     * @method circleToRectangle
	     * @param {Kiwi.Geom.Circle} The circle object to check
	     * @param {Kiwi.Geom.Rectangle} The Rectangle object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
	     **/
        static circleToRectangle(circle: Circle, rect: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

            var inflatedRect: Rectangle = rect.clone();

            inflatedRect.inflate(circle.radius, circle.radius);

            output.result = inflatedRect.contains(circle.x, circle.y);

            return output;

        }

        /**
	     * Check if the given Point is found within the given Circle
	     * @method circleContainsPoint
	     * @param {Kiwi.Geom.Circle} The circle object to check
	     * @param {Kiwi.Geom.Point} The point object to check
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
	     **/
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
         * Determines whether the specified point is contained within the rectangular region defined the Rectangle object.
         * @method pointToRectangle
         * @param {Point} point The point object being checked.
         * @param {Rectangle} rect The rectangle object being checked.
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y/result
         **/
        static pointToRectangle(point: Point, rect: Rectangle, output: IntersectResult = new IntersectResult): IntersectResult {

            output.setTo(point.x, point.y);

            output.result = rect.containsPoint(point);

            return output;

        }

        /**
	     * Check whether two axis aligned rectangles intersect. Return the intersecting rectangle dimensions if they do.
	     * @method rectangleToRectangle
	     * @param {Kiwi.Geom.Rectangle} The first Rectangle object
	     * @param {Kiwi.Geom.Rectangle} The second Rectangle object
	     * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
	     * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y/width/height
	     **/
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