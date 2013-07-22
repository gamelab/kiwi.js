module Kiwi.HUD {

    //Does the button even need to extend icon? You could have a button without a icon 

    export class Button extends Kiwi.HUD.Icon {

        constructor(cacheID: any, cache: any, x: number, y: number) {

            super(cacheID, cache, x, y);

            this.bounds = this.components.add(new Kiwi.Components.Bounds(this.position.x(), this.position.y(), this.size.width(), this.size.height())); //create custom bounds for HUD

            //this.input = this.components.add(new Kiwi.Components.WidgetInput(this.bounds));
        
        }

        public input: Kiwi.Components.WidgetInput;

        public bounds: Kiwi.Components.Bounds;

    }

}