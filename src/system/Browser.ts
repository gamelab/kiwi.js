/**
* Kiwi - System
* @module Kiwi
* @submodule System
*
*/

module Kiwi.System {

    /**
    * Gets the x/y coordinate offset of any given valid DOM Element from the top/left position of the browser
    * Based on jQuery offset https://github.com/jquery/jquery/blob/master/src/offset.js
    * 
    * @class Browser
    * @constructor
    * @namespace Kiwi.System
    * @param {Game} game
    * @return {StateMananger} This Object
    *
    */
    export class Browser {
         
        constructor(game: Kiwi.Game) {

            this._game = game;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Browser";
        }

        /**
        * 
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * The DOM is ready, so if we have a current state pending we can init it now
        * @method boot
        */
        public boot() {
            //this._game.stage.offset = this.getOffsetPoint(this._game.stage.container);
        }

        /**
        * 
        * @method getOffsetPoint
        * @param {Any} element
        * @param {Point} output
        * @return {Point}
        * @public
        */
        public getOffsetPoint(element, output: Kiwi.Geom.Point = new Kiwi.Geom.Point): Kiwi.Geom.Point {

            var box = element.getBoundingClientRect();

            var clientTop = element.clientTop || document.body.clientTop || 0;
            var clientLeft = element.clientLeft || document.body.clientLeft || 0;
            var scrollTop = window.pageYOffset || element.scrollTop || document.body.scrollTop;
            var scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

            return output.setTo(box.left + scrollLeft - clientLeft, box.top + scrollTop - clientTop);

        }

        //  get browser width, height, full screen, hide URL bar

    }

}
