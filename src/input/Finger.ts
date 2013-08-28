/// <reference path="../core/Game.ts" />
/// <reference path="Pointer.ts" />
 
module Kiwi.Input {

    export class Finger extends Pointer {

        constructor(game: Kiwi.Game) {
            super(game);
            this.circle.diameter = 44;
        }

        public objType(): string {
            return 'Finger';
        }
        
        /** 
        * @method start
        * @param {Any} event
        */
        public start(event) {
            this.id = event.identifier;
            this.active = true;
            super.start(event);
        }
        
        /**
        * @method stop
        * @param {Any} event
        */
        public stop(event) {
            this.active = false;
            super.stop(event);
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
