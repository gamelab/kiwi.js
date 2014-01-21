/**
*  
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * A Lightweight object to hold the results of an Intersection. 
    * Used in combination with the STATIC methods on the Intersect class.
    *
    * @class IntersectResult
    * @namespace Kiwi.Geom
    * @constructor
    */
    export class IntersectResult {

        /**
        * The type of object this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "IntersectResult";
        }

        /**
        * Holds the result of an Intersection between two geometric items.
        * TRUE means an Intersection did occur and FALSE means not. 
        * @property result
        * @type boolean
        * @default false
        */
        public result: boolean = false;

        /**
        * Holds the x coordinate of the point in which the Intersection occured.
        * Note: This is only set in the case the TWO geometric items are either Lines or Rays (Line like in function)
        * and a Intersection occured.
        * @property x
        * @type Number
        */
        public x: number;

        /**
        * Holds the y coordinate of the point in which the Intersection occured.
        * Note: This is only set in the case the TWO geometric items are either Lines or Rays (Line like in function)
        * and a Intersection occured.
        * @property y
        * @type Number
        */
        public y: number;

        /**
        * [CURRENTLY NOT IN USE]
        * @property x1
        * @type Number
        */
        public x1: number;

        /**
        * [CURRENTLY NOT IN USE]
        * @property y1
        * @type Number
        */
        public y1: number;

        /**
        * [CURRENTLY NOT IN USE]
        * @property x2
        * @type Number
        */
        public x2: number;

        /**
        * [CURRENTLY NOT IN USE]
        * @property y2
        * @type Number
        */
        public y2: number;

        /**
        * [CURRENTLY NOT IN USE]
        * @property width
        * @type Number
        */
        public width: number;

        /**
        * [CURRENTLY NOT IN USE]
        * @property height
        * @type Number
        */
        public height: number;

        /**
        * Sets the coordinates of the points based on the parameters passed.
        * @method setTo
        * @param {Number} x1
        * @param {Number} y1
        * @param {Number} [x2=0]
        * @param {Number} [y2=0]
        * @param {Number} [width=0]
        * @param {Number} [height=0]
        */
        public setTo(x1: number, y1: number, x2: number = 0, y2: number = 0, width: number = 0, height: number = 0) {

            this.x = x1;
            this.y = y1;

            this.x1 = x1;
            this.y1 = y1;

            this.x2 = x2;
            this.y2 = y2;

            this.width = width;
            this.height = height;

        }

    }

}
