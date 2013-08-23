/// <reference path="../../Kiwi.ts" />

module Kiwi.HUD.Widget {

    export class MenuItem extends Kiwi.HUD.HUDWidget {

        constructor(name:string, width:number, height:number, x: number, y: number) {

            super(name, x, y);
            /*
            this.size = this.components.add(new Kiwi.Components.Size(width, height));
            this.bounds = this.components.add(new Kiwi.Components.Bounds(this.position.x(), this.position.y(), this.size.width(), this.size.height())); 
            
            this.size.updated.add(this._applyCSS);
*/
            this.container.innerText = name;
            this._applyCSS();
        }

        //the game
        public game: Kiwi.Game;

        //the size
        //public size: Kiwi.Components.Size;

        //the input
        public input: Kiwi.HUD.Components.WidgetInput;

        //the bounds
        public bounds: Kiwi.Components.Bounds;

        private menu: Kiwi.HUD.Widget.Menu;

        //when the menu item is added to the stag
        public addedToStage(game:Kiwi.Game, menu:Kiwi.HUD.Widget.Menu) {
            this.game = game;
            this.menu = menu;
            this._applyCSS();
            this.input = this.components.add(new Kiwi.HUD.Components.WidgetInput(this.game, this.bounds));
        }

        //apply the css
        private _applyCSS() {
           // this.size.setCSS(this.container);
            var addX = 0;
            var addY = 0;
            if (this.menu !== undefined) {
                //addX += this.menu.position.x();
                //addY += this.menu.position.y(); 
            }
            //this.bounds.setTo(this.position.x() + addX, this.position.y() + addY, this.size.width(), this.size.height());
        }

    }

}