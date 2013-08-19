/// <reference path="TextField.ts" />
/// <reference path="../../core/game.ts" />

module Kiwi.HUD {

    export class Button extends Kiwi.HUD.TextField {

        constructor(game: Kiwi.Game, width: number, height: number, x: number, y: number) {

            super('button', x, y);

            this.game = game;
            
            this.width = width;
            this.height = height;
            
            this.bounds = this.components.add(new Kiwi.Components.Bounds(this.x, this.y, this.width, this.height)); //create custom bounds for HUD
            
            this.input = this.components.add(new Kiwi.Components.WidgetInput(this.game, this.bounds));
            this.onCoordsUpdate.add(this._changed, this);
        }

        
        /*
        * The width of the container
        * @property _width
        * @type number
        */
        private _width: number;
        
        /*
        * The width of the container
        * @type number
        */
        public get width(): number {
            return this._width;
        }
        
        /*
        * Set the width of the container
        * @type number
        */
        public set width(value: number) {
            this.container.style.width = value + "px";
            this._width = value;
            this._changed();
        }
        
        /*
        * The height of the container
        * @property _height
        * @type number
        */
        private _height: number;
        
        /*
        * The height of the container
        * @type number
        */
        public get height(): number {
            return this._height;
        }
        
        /*
        * Set the height of the container
        * @type number
        */
        public set height(value: number) {
            this.container.style.height = value + "px";
            this._height = value;
            this._changed();
        }

        public game: Kiwi.Game;
        
        public input: Kiwi.Components.WidgetInput;

        public bounds: Kiwi.Components.Bounds;

        private _changed() {
            //this.bounds.setTo(this.position.x(), this.position.y(), this.size.width(), this.size.height());
          
        }

        

    }

}