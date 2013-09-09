/**
* Kiwi - Geom
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * A light result object to hold the results of an intersection
    *
    * @class IntersectResult
    *
    */
    export class IntersectResult {

        public objType() {
            return "IntersectResult";
        }

        /**
        * @property result
        * @type Boolean
        */
        public result: bool = false;

        /**
        * @property x
        * @type Number
        */
        public x: number;

        /**
        * @property y
        * @type Number
        */
        public y: number;

        /**
        * @property x1
        * @type Number
        */
        public x1: number;

        /**
        * @property y1
        * @type Number
        */
        public y1: number;

        /**
        * @property x2
        * @type Number
        */
        public x2: number;

        /**
        * @property y2
        * @type Number
        */
        public y2: number;

        /**
        * @property width
        * @type Number
        */
        public width: number;

        /**
        * @property height
        * @type Number
        */
        public height: number;

        /**
        *
        * @method setTo
        * @param {Number} x1
        * @param {Number} y1
        * @param {Number} [x2]
        * @param {Number} [y2]
        * @param {Number} [width]
        * @param {Number} [height]
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
