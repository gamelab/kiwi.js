/**
* 
* @module Kiwi
* @submodule Input
* 
*/ 
 
module Kiwi.Input {

    /**
    * Used with the Touch manager class, this object holds information about a single touch point/locaton (or you know a finger). By default a Finger has a diameter of 44 pixels (random average size of a finger) which can be used for collision/overlap detection. That value can be modified. Note: A Finger is only active whilst the user is 'pressing' down on stage. 
    *
    * @class Finger
    * @extends Pointer
    * @namespace Kiwi.Input
    * @constructor
    * @param game {Game} The game that this finger belongs to.
    * @return Finger
    */
    export class Finger extends Pointer {
        
        constructor(game: Kiwi.Game) {
            super(game);
            this.circle.diameter = 44; //The diameter of your average finger!
        }
        
        /**
        * The type of object this is. 
        * @method objType
        * @return string
        * @public
        */
        public objType(): string {
            return 'Finger';
        }
        
        /** 
        * @method start
        * @param {Any} event
        * @public
        */
        public start(event) {
            this.active = true;
            super.start(event);
        }
        
        /**
        * @method stop
        * @param event {Any}
        * @public
        */
        public stop(event) {
            this.active = false;
            super.stop(event);
        }

        /** 
        * @method leave
        * @param event {Any} 
        * @public
        */
        public leave(event) {
            this.withinGame = false;
            this.move(event);
        }

        /**
        * @method reset
        * @public
        */
        public reset() {
            this.active = false;
            super.reset();
        }
          
    }

}
