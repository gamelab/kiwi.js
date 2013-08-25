/// <reference path="../core/Game.ts" />
/// <reference path="Pointer.ts" />
 
module Kiwi.Input {

    export class Finger extends Pointer {

        constructor(game: Kiwi.Game) {
            super(game);
            this.circle.diameter = 44;
        }
        
        /** 
        * @method start
        * @param {Any} event
        */
        public start(event) {
            this.id = event.identifier;
            super.start(event);
        }
         
        /** 
        * @method leave
        * @param {Any} event
        */
        public leave(event) {
            this.withinGame = false;
            this.move(event);
        }
          
    }

}
