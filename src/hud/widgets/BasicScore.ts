/// <reference path="Textfield.ts" />

module Kiwi.HUD {

   
    export class BasicScore extends Kiwi.HUD.TextField {
       
        constructor(x: number, y: number) {
            super("basicScore", x, y);
            this.counter = this.components.add(new Kiwi.Components.Counter(0,1));
        }

        public counter: Kiwi.Components.Counter;
        
        public update() {
            this.text( String(this.counter.value()) );
            super.update();
        }


    }

}
