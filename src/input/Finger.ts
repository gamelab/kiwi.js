/**
* Kiwi - Input
* @module Kiwi
* @submodule Input
* 
*/ 
 
module Kiwi.Input {

    /**
    *
    * @class Finger
    * @extends Pointer
    */
    export class Finger extends Pointer {
        
        /*
        *
        * @method constructor
        * @param {Kiwi.Game}
        * @return Kiwi.Input.Finger
        */
        constructor(game: Kiwi.Game) {
            super(game);
            this.circle.diameter = 44; //The diameter of your average finger!
        }
        
        /*
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
            this.id = event.identifier;
            this.active = true;
            super.start(event);
        }
        
        /**
        * @method stop
        * @param {Any} event
        * @public
        */
        public stop(event) {
            this.active = false;
            super.stop(event);
        }

        /** 
        * @method leave
        * @param {Any} event
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
