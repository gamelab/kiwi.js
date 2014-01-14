/**
* 
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * An area defined by its position, as indicated by its top-left corner (x,y) and width and height
    *
    * @class Rectangle
    * @namespace Kiwi.Geom
    * @constructor
    * @param [x = 0] {Number} The x coordinate of the top-left corner of the rectangle.
    * @param [y = 0] {Number} The y coordinate of the top-left corner of the rectangle.
    * @param [width = 0] {Number} width The width of the rectangle in pixels.
    * @param [height = 0] {Number} height The height of the rectangle in pixels.
    * @return {Rectangle} This rectangle object
    * 
    */
    export class Rectangle {

        /**
        * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified width and height parameters. If you call this function without parameters, a rectangle with x, y, width, and height properties set to 0 is created.
        **/
        constructor (x: number = 0, y: number = 0, width: number = 0, height: number = 0) {

            this.setTo(x, y, width, height);

        }

        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Rectangle";
        }

        /** 
        * The x coordinate of the top-left corner of the rectangle
        * @property x
        * @type Number
        * @public
        **/
        public x: number = 0;

        /** 
        * The y coordinate of the top-left corner of the rectangle
        * @property y
        * @type Number
        * @public
        **/
        public y: number = 0;

        /** 
        * The width of the rectangle in pixels
        * @property width
        * @type Number
        * @public
        **/
        public width: number = 0;

        /** 
        * The height of the rectangle in pixels
        * @property height
        * @type Number
        * @public
        **/
        public height: number = 0;

        /**
        * The sum of the y and height properties. Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
        * @property bottom
        * @return {Number}
        * @public
        **/
        public set bottom(value: number) {

            if (value)
            {
                if (value < this.y)
                {
                    this.height = 0;
                }
                else
                {
                    this.height = value;
                }
            }

        }

        public get bottom(): number {

            return this.y + this.height;

        }

        /**
        * Returns a Point containing the location of the center of the Rectangle, relative to the top left edge
        * @property center
        * @return {Point} 
        * @public
        **/
        public get center(): Point {

            var output: Point = new Point();
            return output.setTo(Math.round(this.width / 2), Math.round(this.height / 2));

        }

        /**
        * Returns a Point containing the location of the Rectangle's bottom-right corner, determined by the values of the right and bottom properties.
        * @property bottomRight
        * @return {Point} 
        * @public
        */
        public set bottomRight(value: Point) {
            
            if (value)
            {
                this.right = value.x;
                this.bottom = value.y;
            }

        }

        public get bottomRight(): Point {

            var output: Point = new Point();
            return output.setTo(this.right, this.bottom);

        }

        /**
        * The x coordinate of the top-left corner of the rectangle. Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
        * @property left
        * @return {number} 
        * @public
        */
        public set left(value: number) {

            if (value)
            {
                var diff = this.x - value;

                if (this.width + diff < 0)
                {
                    this.width = 0;

                    this.x = value;
                }
                else
                {
                    this.width += diff;

                    this.x = value;
                }
            }

        }

        public get left(): number {

            return this.x;

        }

        /**
        * The sum of the x and width properties. Changing the right property of a Rectangle object has no effect on the x, y and height properties. However it does affect the width property.
        * @property right
        * @return {Number} 
        * @public
        */
        public set right(value: number) {

            if (value)
            {
                if (value < this.x)
                {
                    this.width = 0;
                }
                else
                {
                    this.width = value - this.x;
                }
            }

        }

        public get right(): number {

            return this.x + this.width;

        }

        /**
        * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
        * @property size
        * @return {Point} The size of the Rectangle object
        * @public
        */
        public get size(): Point {

            var output: Point = new Point();
            return output.setTo(this.width, this.height);

        }

        /**
        * The volume of the Rectangle object in pixels, derived from width * height
        * @property volume
        * @return {Number} 
        * @return
        */
        public get volume(): number {

            return this.width * this.height;

        }

        /**
        * The perimeter size of the Rectangle object in pixels. This is the sum of all 4 sides.
        * @property perimeter
        * @return {Number} 
        * @public
        */
        public get perimeter(): number {

            return (this.width * 2) + (this.height * 2);

        }

        /**
        * The y coordinate of the top-left corner of the rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties. However it does affect the height property, whereas changing the y value does not affect the height property.
        * @method top
        * @return {Number} 
        * @public
        */
        public set top(value: number) {

            if (value)
            {
                var diff = this.y - value;

                if (this.height + diff < 0)
                {
                    this.height = 0;

                    this.y = value;
                }
                else
                {
                    this.height += diff;

                    this.y = value;
                }
            }

        }

        public get top(): number {

            return this.y;

        }
        /**
        * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
        * @property topLeft
        * @return {Point}
        * @public
        */
        public set topLeft(value: Point) {

            if (value)
            {
                this.x = value.x;
                this.y = value.y;
            }

        }

        public get topLeft(): Point {

            var output: Point = new Point();
            return output.setTo(this.x, this.y);

        }

        /**
        * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
        * @method clone
        * @param [output = Rectangle] {Rectangle} Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
        * @return {Rectangle}
        * @public
        **/
        public clone(output: Rectangle = new Rectangle): Rectangle {

            return output.setTo(this.x, this.y, this.width, this.height);

        }

        /**
        * Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
        * @method contains
        * @param {Number} x The x coordinate of the point to test.
        * @param {Number} y The y coordinate of the point to test.
        * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
        **/
        public contains(x: number, y: number): boolean {

            if (x >= this.x && x <= this.right && y >= this.y && y <= this.bottom)
            {
                return true;
            }

            return false;

        }

        /**
        * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
        * @method containsPoint
        * @param {Point} point The point object being checked. Can be Kiwi.Geom.Point or any object with .x and .y values.
        * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
        **/
        public containsPoint(point: Point): boolean {

            return this.contains(point.x, point.y);

        }

        /**
        * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object. A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
        * @method containsRect
        * @param rect {Rectangle} The rectangle object being checked.
        * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
        * @public
        **/
        public containsRect(rect: Rectangle): boolean {

            //	If the given rect has a larger volume than this one then it can never contain it
            if (rect.volume > this.volume)
            {
                return false;
            }

            if (rect.x >= this.x && rect.y >= this.y && rect.right <= this.right && rect.bottom <= this.bottom)
            {
                return true;
            }

            return false;

        }

        /**
        * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
        * @method copyFrom
        * @param source {Rectangle} The source rectangle object to copy from
        * @return {Rectangle} This rectangle object
        * @public
        **/
        public copyFrom(source: Rectangle): Rectangle {

            return this.setTo(source.x, source.y, source.width, source.height);

        }

        /**
        * Copies all the rectangle data from this Rectangle object into the destination Rectangle object.
        * @method copyTo
        * @param target {Rectangle} The destination rectangle object to copy in to
        * @return {Rectangle} The destination rectangle object
        * @public
        **/
        public copyTo(target: Rectangle): Rectangle {

            return target.copyFrom(this);

        }

        /**
        * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object. This method compares the x, y, width, and height properties of an object against the same properties of this Rectangle object.
        * @method equals
        * @param  toCompare {Rectangle} toCompare The rectangle to compare to this Rectangle object.
        * @return {boolean} A value of true if the object has exactly the same values for the x, y, width, and height properties as this Rectangle object; otherwise false.
        * @public
        **/
        public equals(toCompare: Rectangle): boolean {

            if (this.x === toCompare.x && this.y === toCompare.y && this.width === toCompare.width && this.height === toCompare.height)
            {
                return true;
            }

            return false;

        }

        /**
        * Increases the size of the Rectangle object by the specified amounts, in pixels. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
        * @method inflate
        * @param dx {Number} dx The amount to be added to the left side of this Rectangle.
        * @param dy {Number} dy The amount to be added to the bottom side of this Rectangle.
        * @return {Rectangle} This Rectangle object.
        * @public
        **/
        public inflate(dx: number, dy: number): Rectangle {

            if (!isNaN(dx) && !isNaN(dy))
            {
                this.x -= dx;
                this.width += 2 * dx;

                this.y -= dy;
                this.height += 2 * dy;
            }

            return this;

        }

        /**
        * Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
        * @method inflatePoint
        * @param point {Point} The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
        * @return {Rectangle} This Rectangle object.
        * @public
        **/
        public inflatePoint(point: Point): Rectangle {

            return this.inflate(point.x, point.y);

        }

        /**
        * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
        * @method intersection
        * @param toIntersect {Rectangle} The Rectangle object to compare against to see if it intersects with this Rectangle object.
        * @param output {Rectangle} Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
        * @return {Rectangle} A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
        **/
        public intersection(toIntersect: Rectangle, output: Rectangle = new Rectangle): Rectangle {

            if (this.intersects(toIntersect) === true)
            {
                output.x = Math.max(toIntersect.x, this.x);
                output.y = Math.max(toIntersect.y, this.y);
                output.width = Math.min(toIntersect.right, this.right) - output.x;
                output.height = Math.min(toIntersect.bottom, this.bottom) - output.y;
            }

            return output;

        }

        /**
        * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object. This method checks the x, y, width, and height properties of the specified Rectangle object to see if it intersects with this Rectangle object.
        * @method intersects
        * @param toIntersect {Rectangle} The Rectangle object to compare against to see if it intersects with this Rectangle object.
        * @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
        * @public
        **/
        public intersects(toIntersect: Rectangle): boolean {

            if (toIntersect.x > this.right - 1) {
                return false;
            }

            if (toIntersect.right - 1 < this.x) {
                return false;
            }

            if (toIntersect.bottom - 1 < this.y) {
                return false;
            }

            if (toIntersect.y > this.bottom - 1) {
                return false;
            }

            return true;

        }

        /**
        * Checks for overlaps between this Rectangle and the given Rectangle. Returns an object with boolean values for each check.
        * @method overlap
        * @param rect {Rectangle} 
        * @return {Object} An object containing the overlapping details between the two Rectangles
        * @todo Move to an IntersectResult? Do not want to be generating all of these values each time this is called
        * @public
        **/
        public overlap(rect: Rectangle): any {

            var result = { top: false, bottom: false, left: false, right: false, contains: false, contained: false };
            var interRect: Rectangle = this.intersection(rect);

            if (interRect.isEmpty) return result;
            if (this.containsRect(rect)) result.contains = true;
            if (rect.containsRect(this)) result.contained = true;
            if (this.top < rect.top) result.top = true;
            if (this.bottom > rect.bottom) result.bottom = true;
            if (this.left < rect.left) result.left = true;
            if (this.right > rect.right) result.right = true;

            return result;

        }

        /**
        * Determines whether or not this Rectangle object is empty.
        * @method isEmpty
        * @return {boolean} A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
        * @public
        **/
        public isEmpty(): boolean {

            if (this.width < 1 || this.height < 1)
            {
                return true;
            }

            return false;

        }

        /**
        * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
        * @method offset
        * @param dx {Number} Moves the x value of the Rectangle object by this amount.
        * @param dy {Number} Moves the y value of the Rectangle object by this amount.
        * @return {Rectangle} This Rectangle object.
        * @public
        **/
        public offset(dx: number, dy: number): Rectangle {

            if (!isNaN(dx) && !isNaN(dy))
            {
                this.x += dx;
                this.y += dy;
            }

            return this;

        }

        /**
        * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
        * @method offsetPoint
        * @param point {Point} A Point object to use to offset this Rectangle object.
        * @return {Rectangle} This Rectangle object.
        **/
        public offsetPoint(point: Point): Rectangle {

            return this.offset(point.x, point.y);

        }

        /**
        * Sets all of the Rectangle object's properties to 0. A Rectangle object is empty if its width or height is less than or equal to 0.
        * @method setEmpty
        * @return {Rectangle} This rectangle object
        **/
        public setEmpty() {

            return this.setTo(0, 0, 0, 0);

        }

        /**
        * Sets the properties of Rectangle to the specified values.
        * @method setTo
        * @param x {Number} x The x coordinate of the top-left corner of the rectangle.
        * @param y {Number} y The y coordinate of the top-left corner of the rectangle.
        * @param width {Number} width The width of the rectangle in pixels.
        * @param height {Number} height The height of the rectangle in pixels.
        * @return {Rectangle} This rectangle object
        **/
        public setTo(x: number, y: number, width: number, height: number): Rectangle {

            if (!isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height))
            {
                this.x = x;
                this.y = y;

                if (width >= 0)
                {
                    this.width = width;
                }

                if (height >= 0)
                {
                    this.height = height;
                }
            }

            return this;

        }

        /**
        * Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
        * @method union
        * @param toUnion{Rectangle} toUnion A Rectangle object to add to this Rectangle object.
        * @param [output = Rectangle] {Rectangle} output Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
        * @return {Rectangle} A Rectangle object that is the union of the two rectangles.
        **/
        public union(toUnion: Rectangle, output: Rectangle = new Rectangle): Rectangle {

            return output.setTo(
                    Math.min(toUnion.x, this.x),
                    Math.min(toUnion.y, this.y),
                    Math.max(toUnion.right, this.right),
                    Math.max(toUnion.bottom, this.bottom)
                  );

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method scale
        * @param x {number}
        * @param y {number}
        * @param translation {Point}
        * @return {Rectangle}
        * @public
        **/
        public scale(x:number,y:number,translation:Kiwi.Geom.Point): Rectangle {

            var trans: Kiwi.Geom.Transform = new Kiwi.Geom.Transform;
            trans.scaleX = x;
            trans.scaleY = y;
            trans.x = translation.x;
            trans.y = translation.y;
            
            var tl: Kiwi.Geom.Point = this.topLeft;
            trans.transformPoint(tl);
            this.topLeft = tl;

            this.width *= x;
            this.height *= y;

            return this;
        }

        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        **/
        public toString(): string {

            return "[{Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + " isEmpty=" + this.isEmpty() + ")}]";

        }

    }

}