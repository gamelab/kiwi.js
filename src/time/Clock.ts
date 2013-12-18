/**
* 
* @module Kiwi
* @submodule Time
*
*/

module Kiwi.Time {

    /**
    * The Clock class offers a way of tracking time within a game. When creating a new Clock you should NOT directly instantiate this class but instead use the addClock method on a ClockManager.
    * - The MasterClock is a property of the Kiwi.Time.Manager class and tracks real world time in milliseconds elapsed since the application started. This happens automatically and there is no need to do anything to set this up.
    * - An instance of a clock is used to track time in arbitrary units (milliseconds by default)
    * - A clock can be started, paused, unpaused and stopped. Once stopped, re-starting the clock again will reset it.
    * - Any number of timers can be attached to a clock. See the Kiwi.Time.Timer class for timer details.
    * - If the clock is paused, any timers attached to the clock will take this into account and not continue to fire events until the clock is unpaused.
    * (Note that this is not the same as pausing timers, which can be done manually and needs to be undone manually.)
    * 
    * @class Clock
    * @namespace Kiwi.Time
    * @constructor
    * @param manager {ClockManager} The ClockManager that this clock belongs to. .
    * @param master {MasterClock} The MasterClock that it is getting the time in relation to.
    * @param name {String} The name of the clock.
    * @param [units=1000] {Number} The units that this clock is to operate in.
    * @return {Clock} This Clock object.
    * 
    */
    export class Clock {
         
        constructor (manager:Kiwi.Time.ClockManager, master: Kiwi.Time.MasterClock, name: string, units: number = 1000) {

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

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Clock";
        }

        /**
        * A collection of Timer objects using this clock.
        * @property timers
        * @type Timer[]
        * @private
        */
        private timers: Kiwi.Time.Timer[];

        /**
        * The time the clock was first started relative to the master clock.
        * @property _timeFirstStarted
        * @type Number
        * @default null
        * @private
        */
        private _timeFirstStarted: number = null;

        /**
        * The number of clock units elapsed since the clock was first started.
        * @method elapsedSinceFirstStarted.
        * @return {Number} number of clock units.
        * @public
        */
        public elapsedSinceFirstStarted(): number {

            return (this._timeLastStarted) ? (this.master.elapsed() - this._timeFirstStarted) / this.units : null;

        }

        /**
        * The time the clock was most recently started relative to the master clock.
        * @property _timeLastStarted
        * @type Number
        * @default null
        * @private
        */
        private _timeLastStarted: number = null;

        /**
        * Get the most recent time the clock was started relative to the master clock.
        * @method started
        * @return {Number} milliseconds.
        * @public
        */
        public started(): number {

            return this._timeLastStarted;

        }

        /**
        * The number of clock units elapsed since the clock was most recently started (not including time spent paused)
        * @method elapsed
        * @return {Number} number of clock units.
        * @public
        */
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
        * @type Number
        * @default null
        * @private
        */
        private _timeLastStopped: number = null;

        /**
        * The number of clock units elapsed since the clock was most recently stopped.
        * @method elapsedSinceLastStopped.
        * @return {Number} number of clock units.
        * @public
        */
        public elapsedSinceLastStopped(): number {

            return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastStopped) / this.units : null;

        }

        /**
        * The time the clock was most receently paused relative to the master clock.
        * @property _timeLastPaused
        * @private
        * @type Number
        * @default null
        * @private
        */
        private _timeLastPaused: number = null;

        /**
        * The number of clock units elapsed since the clock was most recently paused.
        * @method elapsedSinceLastPaused.
        * @return {Number} number of clock units.
        * @public
        */
        public elapsedSinceLastPaused(): number {

            return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastPaused) / this.units : null;

        }

        /**
        * The time the clock was most recently unpaused relative to the master clock.
        * @property _timeLastUnpaused
        * @private
        * @type Number
        * @default null
        * @private
        */
        private _timeLastUnpaused: number = null;

        /**
        * The number of clock units elapsed since the clock was most recently unpaused.
        * @method elapsedSinceLastUnpaused.
        * @return {Number} number of clock units.
        * @public
        */
        public elapsedSinceLastUnpaused(): number {

            return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastUnpaused) / this.units : null;

        }

        /**
        * The total number of milliseconds the clock has been paused since it was last started.
        * @property _totalPaused
        * @private
        * @type Number
        * @default 0
        * @private
        */
        private _totalPaused: number = 0;

        /**
        * Whether the clock is in a running state.
        * @property _isRunning
        * @type boolean
        * @default false
        * @private
        */
        private _isRunning: boolean = false;

        /**
        * Check if the clock is currently running.
        * @method isRunning
        * @return {boolean} true if running.
        * @public
        */
        public isRunning(): boolean {

            return this._isRunning;

        }

        /**
        * Whether the clock is in a stopped state.
        * @property _isStopped
        * @type boolean
        * @default true
        * @private
        */
        private _isStopped: boolean = true;

        /**
        * Check if the clock is in the stopped state.
        * @method isStopped
        * @return {boolean} true if stopped.
        * @public
        */
        public isStopped(): boolean {

            return this._isStopped;

        }

        /**
        * Whether the clock is in a paused state.
        * @property _isPaused
        * @type boolean
        * @default false
        * @private
        */
        private _isPaused: boolean = false;

        /**
        * Check if the clock is in the paused state.
        * @method isPaused
        * @return {boolean} true if paused.
        * @public
        */
        public isPaused(): boolean {

            return this._isPaused;

        }

        /**
        * An internal reference to the state of the elapsed timer
        * @property _elapsedState
        * @type Number
        * @default 0
        * @private
        */
        private _elapsedState: number = 0;

        /**
        * The time manager that this clock belongs to.
        * @property manager
        * @type ClockManager 
        * @public
        */
        public manager: Kiwi.Time.ClockManager = null;

        /**
        * The master clock.
        * @property master
        * @type MasterClock
        * @public
        */
        public master: Kiwi.Time.MasterClock = null;

        /**
        * Name of the clock
        * @property name
        * @type string
        * @public
        */
        public name: string = null;

        /**
        * The number of milliseconds counted as one unit of time by the clock.
        * @property units
        * @type Number
        * @default 0
        * @public
        */
        public units: number = 0;

        /**
        * Add an existing Timer to the Clock.
        * @method addTimer
        * @param timer {Timer} The Timer object instance to be added to ths Clock.
        * @return {Clock} This Clock object.
        * @public
        */
        public addTimer(timer: Timer): Clock {

            this.timers.push(timer);

            return this;
        }

        /**
        * Creates a new Timer and adds it to this Clock.
        * @method createTimer
        * @param name {string} The name of the Timer (must be unique on this Clock).
        * @param [delay=1] {Number} The number of clock units to wait between firing events (default 1)
        * @param [repeatCount=0] {Number} The number of times to repeat this Timer (default 0)
        * @param [start=true] {Boolean} If the timer should start.
        * @return {Timer} The newly created Timer.
        * @public
        */
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
        * @param [timer=null] {Timer} The Timer object you wish to remove. If you wish to delete by Timer Name set this to null.
        * @param [timerName=''] {string} The name of the Timer object to remove.
        * @return {boolean} True if the Timer was successfully removed, false if not.
        * @public
        */
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
        * @param name {string} The name of the Timer.
        * @return {boolean} true if the Timer exists, false if not.
        * @public
        */
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
        * @return {Clock} This Clock object.
        * @public
        */
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
        * @public
        */
        public convertToMilliseconds(time: number): number {

            return time * this.units;

        }

        /**
        * Updates all Timers linked to this Clock.
        * @method update
        * @public
        */
        public update() {

            for (var i = 0; i < this.timers.length; i++)
            {
                this.timers[i].update();
            }

        }

        /**
        * Start the clock. This resets the clock and starts it running.
        * @method start
        * @return {Clock} This Clock object.
        * @public
        */
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
        * Pause the clock. The clock can only be paused if it is already running.
        * @method pause
        * @return {Clock} This Clock object.
        * @public
        */
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
        * @return {Clock} This Clock object.
        * @public
        */
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
        * @return {Clock} This Clock object.
        * @public
        */
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
	    * @public
        */
        public toString(): string {

            return "[{Clock (name=" + this.name + " units=" + this.units + " running=" + this._isRunning + ")}]";

        }

    }

}