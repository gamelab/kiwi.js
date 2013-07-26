module Kiwi.HUD {

    export class Button extends Kiwi.HUD.HUDWidget {

        constructor(game: Kiwi.Game, width:number, height:number, x: number, y: number) {

            super('button', x, y);

            this.game = game;

            this.size = this.components.add(new Kiwi.Components.Size(width, height);
            this.bounds = this.components.add(new Kiwi.Components.Bounds(this.position.x(), this.position.y(), this.size.width(), this.size.height())); //create custom bounds for HUD
            this.input = this.components.add(new Kiwi.Components.WidgetInput(this.game, this.bounds));
            
            this.position.updated.add(this._changed, this);
            this.size.updated.add(this._changed, this);
            
        }

        public game: Kiwi.Game;
        
        public size: Kiwi.Components.Size;

        public input: Kiwi.Components.WidgetInput;

        public bounds: Kiwi.Components.Bounds;

        private _changed() {
            this.bounds.setTo(this.position.x(), this.position.y(), this.size.width(), this.size.height());
        }

    }

}