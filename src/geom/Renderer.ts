/// <reference path="../utils/Canvas.ts" />
/// <reference path="Rectangle.ts" />
/// <reference path="Point.ts" />
/// <reference path="Line.ts" />
/// <reference path="Circle.ts" />

/**
 *	Kiwi - Geom - Renderer
 *
 *	@desc 		A utility class that will render Kiwi.Geom primitives to a canvas
 *
 *	@version 	1.1 - 11th October 2012
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 */

module Kiwi.Geom {

    export class Renderer {

        /**
        * Creates a new Kiwi.Geom Renderer of the given width and height
        * @class Renderer
        * @constructor
        * @param {Number} The width of the canvas to be generated
        * @param {Number} The height of the canvas to be generated
        * @param {Kiwi.Canvas} Optional. If the renderer is to use another canvas then pass the reference here, otherwise null.
        * @param {string} The background color of the canvas (defaults to black)
        * @return {Kiwi.Geom.Renderer} This renderer instance
        **/
        //constructor (width: number, height: number, canvas?:Kiwi.Canvas = null, bgColor?) {
        constructor (width: number, height: number, canvas? = null, bgColor?) {

            /*
            if (canvas === null)
            {
                this.canvas = new Kiwi.Canvas(width, height);
            }
            else
            {
                this.canvas = canvas;
            }

            if (bgColor)
            {
                this.canvas.clearMode = Kiwi.Canvas.CLEARMODE_FILLRECT;
                this.canvas.bgColor = bgColor;
            }
            else
            {
                this.canvas.clearMode = Kiwi.Canvas.CLEARMODE_CLEARRECT;
            }

            this.canvas.clear();
            */

        }

        /** 
         * The canvas DOM element on which the objects are rendered
        * @property canvas
        * @type Kiwi.Canvas
         **/
        public canvas: HTMLCanvasElement;

        /** 
         * The background color of the canvas
        * @property bgColor
        * @type String
         **/
        public bgColor = 'rgb(0,0,0)';

        /**
         * Clears the canvas (using the defined clear mode)
        * @method clear
         * @return {Kiwi.Geom.Renderer} This renderer instance
         **/
        public clear() {

            this.canvas.clear();

        }

        /**
        * Draws a single pixel of the given color into the canvas based on the coordinates stored in the given Point object
        * @method drawPixel
        * @param {Kiwi.Geom.Point} The Point object used to get the x/y coordinates from
        * @param {Number} The red color value of the pixel to be drawn
        * @param {Number} The green color value of the pixel to be drawn
        * @param {Number} The blue color value of the pixel to be drawn
        * @param {Number} The alpha value of the pixel to be drawn
        * @return {Kiwi.Geom.Renderer} This renderer instance
        **/
        drawPixel(point: Point, red: number, green: number, blue: number, alpha: number = 255) {

            var id = this.canvas.context.createImageData(1, 1);

            var d = id.data;
            d[0] = red;
            d[1] = green;
            d[2] = blue;
            d[3] = alpha;

            this.canvas.context.putImageData(id, point.x, point.y);

            return this;

        }

        /**
        * Draws a Point object of the given size and color to the canvas. Uses a filled rectangle to handle the draw.
        * @method drawPoint
        * @param {Kiwi.Geom.Point} The Point object used for the draw
        * @param {Number} The size of the resulting rectangle that is drawn in pixels (default 1px)
        * @param {Number} The color value of the rectangle to be drawn
        **/
        drawPoint(point: Point, size: number = 1, color: string = 'rgb(255,255,255)') {

            this.canvas.context.fillStyle = color;
            this.canvas.context.fillRect(point.x, point.y, size, size);

        }

        /**
        * Draws a Polygon object using the given lineWidth and color to the canvas. Optionally you can close the polygon.
        * @method drawPolygon
        * @param {Kiwi.Geom.Polygon} The Polygon object used for the draw
        * @param {Boolean} Close the polygon up? Default is true. Draws an extra line joining the end and start points.
        * @param {Number} The width (in pixels) of the lines that are drawn for each section of the polygon. Default 1.
        * @param {Number} The color value of the polygon to be drawn. Default white.
        **/
        /*
        drawPolygon(poly: Polygon, closed: bool = true, lineWidth: number = 1, color: string = 'rgb(255,255,255)') {

            var tempStrokeStyle = this.canvas.context.strokeStyle;

            var points = poly.points;

            this.canvas.context.beginPath();
            this.canvas.context.lineWidth = lineWidth;
            this.canvas.context.strokeStyle = color;
            this.canvas.context.moveTo(points[0].x, points[0].y);

            for (var i = 0; i < points.length; i++)
            {
                this.canvas.context.lineTo(points[i].x, points[i].y);
            }

            if (closed === true)
            {
                this.canvas.context.closePath();
                this.canvas.context.stroke();
            }
            else
            {
                this.canvas.context.stroke();
                this.canvas.context.closePath();
            }

            this.canvas.context.strokeStyle = tempStrokeStyle;

        }
        */

        /**
        * Draws a Line object using the given lineWidth and color to the canvas.
        * @method drawLine
        * @param {Kiwi.Geom.Line} The Line object used for the draw
        * @param {Number} The width (in pixels) of the line to be drawn. Default 1.
        * @param {Number} The color value of the polygon to be drawn. Default white.
        **/
        drawLine(line: Kiwi.Geom.Line, lineWidth: number = 1, color: string = 'rgb(255,255,255)') {

            var tempStrokeStyle = this.canvas.context.strokeStyle;

            this.canvas.context.beginPath();
            this.canvas.context.moveTo(line.x1, line.y1);
            this.canvas.context.lineTo(line.x2, line.y2);
            this.canvas.context.lineWidth = lineWidth;
            this.canvas.context.strokeStyle = color;
            this.canvas.context.stroke();
            this.canvas.context.closePath();

            this.canvas.context.strokeStyle = tempStrokeStyle;

        }

        /**
        * Draws a Rectangle object using the given color to the canvas.
        * @method drawRectangle
        * @param {Kiwi.Geom.Rectangle} The Rectangle object used for the draw
        * @param {Number} The color value of the polygon to be drawn. Default white.
        **/
        drawRectangle(rectangle: Kiwi.Geom.Rectangle, color: string = 'rgb(255,255,255)') {

            this.canvas.context.fillStyle = color;
            this.canvas.context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

        }

        /**
        * Draws a Circle object using the given line thickness and color to the canvas.
        * @method drawCircle
        * @param {Kiwi.Geom.Circle} The Circle object used for the draw
        * @param {Number} The width (in pixels) of the line used to draw the circle. Default 1.
        * @param {Number} The color value of the circle to be drawn. Default white.
        **/
        public drawCircle(circle: Kiwi.Geom.Circle, lineWidth: number = 1, color: string = 'rgb(255,255,255)') {

            var tempStrokeStyle = this.canvas.context.strokeStyle;

            this.canvas.context.beginPath();
            this.canvas.context.lineWidth = lineWidth;
            this.canvas.context.strokeStyle = color;
            this.canvas.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            this.canvas.context.stroke();
            this.canvas.context.closePath();

            this.canvas.context.strokeStyle = tempStrokeStyle;

        }

        /**
        @method destroy
        */
        public destroy() {

            this.canvas.destroy();

        }

    }

}