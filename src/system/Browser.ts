/// <reference path="../geom/Point.ts" />

/**
 *  Kiwi - DOM - Browser Utilities
 *
 *  @desc       Gets the x/y coordinate offset of any given valid DOM Element from the top/left position of the browser
 *              Based on jQuery offset https://github.com/jquery/jquery/blob/master/src/offset.js
 *
 *	@version 	1.0 - 11th March 2013
 *	@author 	Richard Davey
 *  @url        http://www.kiwijs.org
 */

module Kiwi.System {

    export class Browser {

        /**
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {StateMananger} This Object
        */
        constructor(game: Kiwi.Game) {

            this._game = game;

        }

        public objType() {
            return "Browser";
        }

        /**
        * 
        * @property _game
        * @type Kiwi.Game
        * @private
        **/
        private _game: Kiwi.Game;

        /**
        * The DOM is ready, so if we have a current state pending we can init it now
        * @method boot
        */
        public boot() {

            klog.info('DOM.Browser booting');

            //this._game.stage.offset = this.getOffsetPoint(this._game.stage.container);

        }

        /**
        * 
        * @method getOffsetPoint
        * @param {Any} element
        * @param {Kiwi.Geom.Point} output
        * @return {Kiwi.Geom.Point}
        **/
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
