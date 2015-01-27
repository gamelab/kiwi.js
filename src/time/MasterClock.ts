/**
* 
* @module Kiwi
* @submodule Time
*
*/

module Kiwi.Time {

    /**
    * The MasterClock tracks time elapsed since the application started.
    * Each ClockManager has only one MasterClock which is automatically generated when the game initially booted.
    * You should not access it directly, use the Clock and Timer classes instead.
    *
    * @class MasterClock
    * @namespace Kiwi.Time
    * @constructor
    * @return {Kiwi.Time.MasterClock} This Object.
    *
    */
    export class MasterClock {
         
        constructor () {

            this._started = Date.now();
            this.time = this._started;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "MasterClock"
        * @public
        */
        public objType() {
            return "MasterClock";
        }

        /**
        * The time when the MasterClock was started.
        * @property _started
        * @type Number
        * @private
        */
        private _started: number;

        /**
        * The current time. This is updated every frame but AFTER the delta is calculated.
        * @property time
        * @type Number
        * @public
        */
        public time: number = 0;

        /**
        * The current time, this is straight from the Date.now() method and is updated every frame BEFORE the delta.
        * @property now
        * @type Number
        * @public
        */
        public now: number = 0;

        /**
        * The time it takes for the time to update. Using this you can calculate the fps.
        * @property delta
        * @type Number
        * @public
        */
        public delta: number = 0;

        /**
        * The rate at which ideal frames are passing. Multiply per-frame iterations by this factor to create smooth movement. For example, if the ideal fps is 60, but you're only getting 45, rate will equal 1.333.
        * @property rate
        * @type Number
        * @public
        * @since 1.1.0
        */
        public rate = 1;

        /**
        * The ideal frame delta in milliseconds. This is automatically adjusted when the game sets a new frameRate.
        * @property idealDelta
        * @type Number
        * @public
        * @since 1.1.0
        */
        public idealDelta = 1000/60.0;

        /**
        * The time that has elapsed since the game started. In milliseconds.
        * @method elapsed
        * @return {Number}
        * @public
        */
        public elapsed():number {

            return this.now - this._started;

        }

        /**
        * The time that has elapsed since the game started but in seconds.
        * @method totalElapsedSeconds
        * @return {Number}
        * @public
        */
        public totalElapsedSeconds(): number {

            return (this.now - this._started) * 0.001;

        }

        /**
        * The update loop that should be executed every frame. Used to update the time.
        * @method update
        * @public
        */
        public update() {

            //  Not in < IE8 (fixed via polyfill)
            this.now = Date.now();

            this.delta = this.now - this.time;

    	    this.time = this.now;

            this.rate = this.delta / this.idealDelta;

            //  Apply time scaling

        }

        /**
        * Used to calculate the elapsed time from a point that is specified. This is returned in Milliseconds.
        * @method elapsedSince
        * @param since {Number} The point in time in which you would like to see how many milliseconds have passed. In milliseconds.
        * @return {Number}
        * @public
        */
        public elapsedSince(since: number): number {

            return this.now - since;

        }

        /**
        * Used to calculate the elapsed time from a point that is specified BUT this is in seconds.
        * @method elapsedSecondsSince
        * @param since {Number} The point in time in which you would like to see how many seconds have passed. In milliseconds.
        * @return {Number }
        * @public
        */
        public elapsedSecondsSince(since: number): number {

            return (this.now - since) * 0.001;

        }

        /**
        * Resets the MasterClocks time.
        * @method reset
        * @public
        */
        public reset() {

            this._started = this.now;

        }

    }

}