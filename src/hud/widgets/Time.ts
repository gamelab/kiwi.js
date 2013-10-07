/**
* A widget for the management / displaying of a time in the HUD.
*
* @module HUD
* @submodule Widget
*/

/*
* TO DO---- SIGNALS/CALLBACKS
*/
module Kiwi.HUD.Widget {
    
    /**
    * @class Time
    * @extends TextField
    * @constructor
    * @param game {Game} The game that this object belongs to.
    * @param format {string} The format that you want the time to be displayed in. Leave it empty to display as normal.
    * @param x {number} The position of this text on the field.
    * @param y {number} The position of this text on the field.
    * @return {TextField}
    */
    export class Time extends Kiwi.HUD.Widget.TextField {
        
        constructor(game:Kiwi.Game,format:string,x:number,y:number) {
            super(game,'time', x, y);
            
            this.time = this.components.add( new Kiwi.HUD.Components.Time(this, format) );
        }

        /**
        * Holds the time component which manages the counting/formating of the time.
        *
        * @property time
        * @type Time
        * @public
        */
        public time: Kiwi.HUD.Components.Time;

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return 'TimeWidget';
        }
        
        /**
        * Pauses the clock where is stands. Calls the pause method on the clock.
        * @method pause
        * @public
        */
        public pause() {
            this.time.pause();
        }

        /**
        * Stops the clock and thus the time. Calls the stop method of the clock.
        * @method stop
        * @public
        */
        public stop() {
            this.time.stop();
        }

        /**
        * Starts the clock and thus the time. 
        * @method start
        * @public
        */
        public start() {
            this.time.start();
        }

        /**
        * Resumes the clock and thus the time.
        * @method resume
        * @public
        */
        public resume() {
            this.time.resume();
        }

        /**
        * The update loop.
        * @method update
        * @public
        */
        public update() {
            super.update();

            //update the time
            if(this.time.isRunning) {
                this.text = this.time.getTime();
            }
        }

    }

}