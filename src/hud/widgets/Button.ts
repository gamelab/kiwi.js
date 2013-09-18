/// <reference path="TextField.ts" />
/// <reference path="../../core/game.ts" />

/**
*
* @module HUD
* @submodule Widget
*
*/

module Kiwi.HUD.Widget {
    /**
    * @class Button
    */

    export class Button extends Kiwi.HUD.Widget.TextField {

        /*
        * 
        * @constructor
        * @param game {game}
        * @param width {number}
        * @param height {number}
        * @param x {number}
        * @param y {number}
        * @return {Button}
        */

        constructor(game: Kiwi.Game, width: number, height: number, x: number, y: number) {

            super('button', x, y);

            this.game = game;
            
            this.width = width;
            this.height = height;
            
            //this.bounds = this.components.add(new Kiwi.Components.Bounds(this.x, this.y, this.width, this.height)); //create custom bounds for HUD
            
            //this.input = this.components.add(new Kiwi.HUD.Components.WidgetInput(this.game, this.bounds));
            this.onCoordsUpdate.add(this._changed, this);
        }
        
        
        /*
        * The width of the container
        * @property _width
        * @type number
        * @private
        */
        private _width: number;
        
        /*
        * The width of the container
        * @property width
        * @type number
        * @public
        */
        public get width(): number {
            return this._width;
        }
        public set width(value: number) {
            this.container.style.width = value + "px";
            this._width = value;
            this._changed();
        }
        
        /*
        * The height of the container
        * @property _height
        * @type number
        * @private
        */
        private _height: number;
        
        /*
        * The height of the container
        * @property height
        * @type number
        * @public
        */
        public get height(): number {
            return this._height;
        }
        public set height(value: number) {
            this.container.style.height = value + "px";
            this._height = value;
            this._changed();
        }
        /**
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        

        /**
        * @property input
        * @type WidgetInput
        * @public
        */
        public input: Kiwi.HUD.Components.WidgetInput;

        //public bounds: Kiwi.Components.Bounds;

        /**
        * @method _changed
        * @private
        */

        private _changed() {
            //this.bounds.setTo(this.position.x(), this.position.y(), this.size.width(), this.size.height());
          
        }

        

    }

}