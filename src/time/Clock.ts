/**
* Kiwi - Time
* @module Kiwi
* @submodule Time
*
*/

module Kiwi.Time {

    /**
    * The Clock class offers a way of tracking time within a game.
    * - The MasterClock is a property of the Kiwi.Time.Manager class and tracks real world time in milliseconds elapsed since the application started.
    * This happens automatically and there is no need to do anything to set this up.
    * - An instance of a clock is used to track time in arbitrary units (milliseconds by default)
    * - A clock can be started, paused, unpaused and stopped. Once stopped, re-starting the clock again will reset it.
    * - Any number of timers can be attached to a clock. See the Kiwi.Time.Timer class for timer details.
    * - If the clock is paused, any timers attached to the clock will take this into account and not continue to fire events until the clock is unpaused.
    * (Note that this is not the same as pausing timers, which can be done manually and needs to be undone manually.)
    *
    * @class Clock
    *
    */
    export class Clock {

        /**
        * A clock class for keeping time.
        * @class Clock
        * @constructor
        * @param {string} name. The name of the clock.
        * @param {Number} units. The number of milliseconds that make up one unit of time on this clock.
        * @return {Kiwi.Time.Clock} This Clock object.
        **/
        constructor (manager:Kiwi.Time.Manager, master: Kiwi.Time.MasterClock, name: string, units: number = 1000) {

            this.manager = manager;
            this.master = master;
            this.name = name;
            this.units = units;
            this.timers = [];

            if (this.units < 1)
            {
                this.units = 1;
            }

        }

        public objType() {
            return "Clock";
        }

        /**
        * A collection of Timer objects using this clock.
        * @property timers
        * @type Array
        **/
        private timers: Kiwi.Time.Timer[];

        /**
        * The time the clock was first started relative to the master clock.
        * @property _timeFirstStarted
        * @private
        * @type Number
        **/
        private _timeFirstStarted: number = null;

        /**
        * The number of clock units elapsed since the clock was first started.
        * @method elapsedSinceFirstStarted.
        * @return {Number} number of clock units.
        **/
        public elapsedSinceFirstStarted(): number {

            return (this._timeLastStarted) ? (this.master.elapsed() - this._timeFirstStarted) / this.units : null;

        }

        /**
        * The time the clock was most recently started relative to the master clock.
        * @property _timeLastStarted
        * @private
        * @type Number
        **/
        private _timeLastStarted: number = null;

        /**
        * Get the most recent time the clock was started relative to the master clock.
        * @method started
        * @return {Number} milliseconds.
        **/
        public started(): number {

            return this._timeLastStarted;

        }

        /**
        * The number of clock units elapsed since the clock was most recently started (not including time spent paused)
        * @method elapsed
        * @return {Number} number of clock units.
        **/
        public elapsed():number {

            if (this._elapsedState === 0)
            {
                return (this._timeLastStarted) ? ((this.master.elapsed() - this._timeLastStarted) - this._totalPaused) / this.units : null;
            }
            else if (this._elapsedState === 1)
            {
                return (this._timeLastPaused - this._timeLastStarted - this._totalPaused) / this.units;
            }
            else if (this._elapsedState === 2)
            {
                //  Same as zero!
                return (this._timeLastStarted) ? ((this.master.elapsed() - this._timeLastStarted) - this._totalPaused) / this.units : null;
            }
            else if (this._elapsedState === 3)
            {
                return (this._timeLastStopped - this._timeLastStarted - this._totalPaused) / this.units;
            }

        }

        /**
        * The time the clock was most recently stopped relative to the master clock.
        * @property _timeLastStopped
        * @private
        * @type Number
        **/
        private _timeLastStopped: number = null;

        /**
        * The number of clock units elapsed since the clock was most recently stopped.
        * @method elapsedSinceLastStopped.
        * @return {Number} number of clock units.
        **/
        public elapsedSinceLastStopped(): number {

            return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastStopped) / this.units : null;

        }

        /**
        * The time the clock was most receently paused relative to the master clock.
        * @property _timeLastPaused
        * @private
        * @type Number
        **/
        private _timeLastPaused: number = null;

        /**
        * The number of clock units elapsed since the clock was most recently paused.
        * @method elapsedSinceLastPaused.
        * @return {Number} number of clock units.
        **/
        public elapsedSinceLastPaused(): number {

            return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastPaused) / this.units : null;

        }

        /**
        * The time the clock was most recently unpaused relative to the master clock.
        * @property _timeLastUnpaused
        * @private
        * @type Number
        **/
        private _timeLastUnpaused: number = null;

        /**
        * The number of clock units elapsed since the clock was most recently unpaused.
        * @method elapsedSinceLastUnpaused.
        * @return {Number} number of clock units.
        **/
        public elapsedSinceLastUnpaused(): number {

            return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastUnpaused) / this.units : null;

        }

        /**
        * THe total number of milliseconds the clock has been paused since it was last started.
        * @property _totalPaused
        * @private
        * @type Number
        **/
        private _totalPaused: number = 0;

        /**
        * Whether the clock is in a running state.
        * @property _isRunning
        * @private
        * @type boolean
        **/
        private _isRunning: boolean = false;

        /**
        * Check if the clock is in the running state.
        * @method isRunning
        * @return {boolean} true if running.
        **/
        public isRunning(): boolean {

            return this._isRunning;

        }

        /**
        * Whether the clock is in a stopped state.
        * @property _isStopped
        * @private
        * @type boolean
        **/
        private _isStopped: boolean = true;

        /**
        * Check if the clock is in the stopped state.
        * @method isStopped
        * @return {boolean} true if stopped.
        **/
        public isStopped(): boolean {

            return this._isStopped;

        }

        /**
        * Whether the clock is in a paused state.
        * @property _isPaused
        * @private
        * @type boolean
        **/
        private _isPaused: boolean = false;

        /**
        * Check if the clock is in the paused state.
        * @method isPaused
        * @return {boolean} true if paused.
        **/
        public isPaused(): boolean {

            return this._isPaused;

        }

        /**
        * An internal reference to the state of the elapsed timer
        * @property _elapsedState
        * @private
        * @type Number
        **/
        private _elapsedState: number = 0;

        /**
        *
        * @property manager
        * @type Kiwi.Time.Manager
        */
        public manager: Kiwi.Time.Manager = null;

        /**
        *
        * @property master
        * @type Kiwi.Time.MasterClock
        */
        public master: Kiwi.Time.MasterClock = null;

        /**
        * Name of the clock
        * @property name
        * @type string
        **/
        public name: string = null;

        /**
        * The number of milliseconds counted as one unit of time by the clock.
        * @property units
        * @type Number
        **/
        public units: number = 0;

        /**
        * Add an existing Timer to the Clock.
        * @method addTimer
        * @param {Kiwi.Time.Timer} The Timer object instance to be added to ths Clock.
        * @return {Kiwi.Time.Clock} This Clock object.
        **/
        public addTimer(timer: Timer): Clock {

            this.timers.push(timer);

            return this;
        }

        /**
        * Creates a new Timer and adds it to this Clock.
        * @method createTimer
        * @param {string} name. The name of the Timer (must be unique on this Clock).
        * @param {Number} delay. The number of clock units to wait between firing events (default 1)
        * @param {Number} repeatCount. The number of times to repeat this Timer (default 0)
        * @return {Kiwi.Time.Timer} The newly created Timer.
        **/
        public createTimer(name: string, delay: number = 1, repeatCount: number = 0, start: boolean=true): Timer {

            this.timers.push(new Timer(name, this, delay, repeatCount));

            if (start === true) {
                this.timers[this.timers.length - 1].start();
            }

            return this.timers[this.timers.length - 1];

        }

        /**
        * Remove a Timer from this Clock based on either the Timer object or its name.
        * @method removeTimer
        * @param {Kiwi.Time.Timer} The Timer object you wish to remove. If you wish to delete by Timer Name set this to null.
        * @param {string} The name of the Timer object to remove.
        * @return {boolean} True if the Timer was successfully removed, false if not.
        **/
        public removeTimer(timer: Timer = null, timerName:string = ''): boolean {

            //  Timer object given?
            if (timer !== null)
            {
                if (this.timers[timer.name])
                {
                    delete this.timers[timer.name];

                    return true;
                }
                else
                {
                    return false;
                }
            }

            if (timerName !== '')
            {
                if (this.timers[timerName])
                {
                    delete this.timers[timerName];

                    return true;
                }
                else
                {
                    return false;
                }
            }

            return false;

        }

        /**
        * Check if the Timer already exists on this Clock
        * @method checkExists
        * @param {string} name. The name of the Timer.
        * @return {boolean} true if the Timer exists, false if not.
        **/
        public checkExists(name: string): boolean {

            if (this.timers[name])
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
        * Stop all timers attached to the clock.
        * @method stopAllTimers
        * @return {Kiwi.Time.Clock} This Clock object.
        **/
        public stopAllTimers(): Clock {

            for (var i = 0; i < this.timers.length; i++)
            {
                this.timers[i].stop();
            }

            return this;

        }

        /**
        * Convert a number to milliseconds based on clock units.
        * @method toMilliseconds.
        * @return {Number} milliseconds.
        **/
        public convertToMilliseconds(time: number): number {

            return time * this.units;

        }

        /**
        * Updates all Timers linked to this Clock.
        * @method update
        **/
        public update() {

            for (var i = 0; i < this.timers.length; i++)
            {
                this.timers[i].update();
            }

        }

        /**
        * Start the clock. This resets the clock and starts it running.
        * @method start
        * @return {Kiwi.Time.Clock} This Clock object.
        **/
        public start(): Clock {

            this._timeLastStarted = this.master.elapsed();
            this._totalPaused = 0;

            if (!this._timeFirstStarted)
            {
                this._timeFirstStarted = this._timeLastStarted;
            }

            this._isRunning = true;
            this._isPaused = false;
            this._isStopped = false;

            this._elapsedState = 0;

            return this;

        }

        /**
        * Pause the clock. THe clock can only be paused if it is already running.
        * @method pause
        * @return {Kiwi.Time.Clock} This Clock object.
        **/
        public pause(): Clock {

            if (this._isRunning === true)
            {
                this._timeLastPaused = this.master.elapsed();
                this._isRunning = false;
                this._isPaused = true;
                this._isStopped = false;

                this._elapsedState = 1;
            }

            return this;
        }

        /**
        * Resume the clock. The clock can only be resumed if it is already paused.
        * @method resume
        * @return {Kiwi.Time.Clock} This Clock object.
        **/
        public resume(): Clock {

            if (this._isPaused === true)
            {
                this._timeLastUnpaused = this.master.elapsed();
                this._totalPaused += this._timeLastUnpaused - this._timeLastPaused;
                this._isRunning = true;
                this._isPaused = false;
                this._isStopped = false;

                this._elapsedState = 2;
            }

            return this;

        }

        /**
        * Stop the clock. Clock can only be stopped if it is already running or is paused.
        * @method stop
        * @return {Kiwi.Time.Clock} This Clock object.
        **/
        public stop(): Clock {

            if (this._isStopped === false)
            {
                this._timeLastStopped = this.master.elapsed();

                if (this._isPaused === true)
                {
                    this._totalPaused += this._timeLastStopped - this._timeLastPaused;
                }

                this._isRunning = false;
                this._isPaused = false;
                this._isStopped = true;

                this._elapsedState = 3;
            }

            return this;

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} a string representation of the instance.
	     **/
        public toString(): string {

            return "[{Clock (name=" + this.name + " units=" + this.units + " running=" + this._isRunning + ")}]";

        }

    }

}