module Kiwi.HUD {

    //Does the button even need to extend icon? You could have a button without a icon 

    //The input needs to have the game passed to it to get the input. Could be just use normal DOM event binding?

    export class Button extends Kiwi.HUD.Icon {

        constructor(game: Kiwi.Game, cacheID: any, cache: any, x: number, y: number) {

            super(cacheID, cache, x, y);

            this.game = game;

            this.bounds = this.components.add(new Kiwi.Components.Bounds(this.position.x(), this.position.y(), this.size.width(), this.size.height())); //create custom bounds for HUD

            this.input = this.components.add(new Kiwi.Components.WidgetInput(this.game, this.bounds));
        
        }

        public game: Kiwi.Game;

        public input: Kiwi.Components.WidgetInput;

        public bounds: Kiwi.Components.Bounds;

    }

}