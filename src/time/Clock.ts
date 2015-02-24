/**
* @module Kiwi
* @submodule Time
*/

module Kiwi.Time {

	/**
	* The Clock class offers a way of tracking time within a game.
	* When creating a new Clock you should NOT directly instantiate this class
	* but instead use the addClock method on a ClockManager.
	* - The MasterClock is a property of the Kiwi.Time.Manager class and tracks
	*   real world time in milliseconds elapsed since the application started.
	*   This happens automatically and there is no need to do anything to set
	*   this up.
	* - An instance of a clock is used to track time in arbitrary units
	*   (milliseconds by default)
	* - A clock can be started, paused, unpaused and stopped. Once stopped,
	*   re-starting the clock again will reset it. It can also have its time
	*   scale freely transformed.
	* - Any number of timers can be attached to a clock. See the Kiwi.Time.Timer
	*   class for timer details.
	* - If the clock is paused, any timers attached to the clock will take this
	*   into account and not continue to fire events until the clock is
	*   unpaused. (Note that this is not the same as pausing timers, which can
	*   be done manually and needs to be undone manually.)
	* - Animations and TweenManagers can use any Clock.
	* 
	* @class Clock
	* @namespace Kiwi.Time
	* @constructor
	* @param manager {ClockManager} ClockManager that this clock belongs to
	* @param master {Kiwi.Time.MasterClock} MasterClock that this is getting
	*	the time in relation to
	* @param name {String} Name of the clock
	* @param [units=1000] {Number} Units that this clock is to operate in
	*	per second
	* @return {Kiwi.Time.Clock} This Clock object
	*/
	export class Clock {

		constructor (manager:Kiwi.Time.ClockManager, master: Kiwi.Time.MasterClock, name: string, units: number = 1000) {

			this.manager = manager;
			this.master = master;
			this.name = name;
			this.units = units;
			this.timers = [];

			if (this.units < 1) {
				this.units = 1;
			}

			this._lastMasterElapsed = this.master.elapsed();
			this._currentMasterElapsed = this.master.elapsed();
		}

		/**
		* The type of object that this is
		* @method objType
		* @return {String} "Clock"
		* @public
		*/
		public objType() {
			return "Clock";
		}

		/**
		* Collection of Timer objects using this clock
		* @property timers
		* @type Timer[]
		* @private
		*/
		private timers: Kiwi.Time.Timer[];

		/**
		* Time the clock was first started relative to the master clock
		* @property _timeFirstStarted
		* @type Number
		* @default null
		* @private
		*/
		private _timeFirstStarted: number = null;

		/**
		* Number of clock units elapsed since the clock was first started
		* @method elapsedSinceFirstStarted
		* @return {Number} Number of clock units elapsed
		* @public
		*/
		public elapsedSinceFirstStarted(): number {

			return (this._timeLastStarted) ? (this.master.elapsed() - this._timeFirstStarted) / this.units : null;

		}

		/**
		* Most recent time the clock was started relative to the master clock
		* @property _timeLastStarted
		* @type Number
		* @default null
		* @private
		*/
		private _timeLastStarted: number = null;

		/**
		* Most recent time the clock was started relative to the master clock
		* @method started
		* @return {Number} Milliseconds
		* @public
		*/
		public started(): number {

			return this._timeLastStarted;

		}


		/**
		* Rate at which time passes on this clock.
		* 1 is normal speed. 1.5 is faster. 0 is no speed. -1 is backwards.
		* This mostly affects timers, animations and tweens.
		* @property timeScale
		* @type number
		* @default 1.0
		* @public
		* @since 1.2.0
		*/
		public timeScale: number = 1.0;

		/**
		* Clock units elapsed since the clock was most recently started,
		* not including paused time.
		* @property _elapsed
		* @type number
		* @private
		* @since 1.2.0
		*/
		private _elapsed: number = 0;

		/**
		* Master time on last frame
		* @property _lastMasterElapsed
		* @type number
		* @private
		* @since 1.2.0
		*/
		private _lastMasterElapsed: number;

		/**
		* Master time on current frame
		* @property _currentMasterElapsed
		* @type number
		* @private
		* @since 1.2.0
		*/
		private _currentMasterElapsed: number;


		/**
		* Rate of time passage, as modified by time scale and frame rate.
		* Under ideal conditions this should be 1.
		* If the frame rate drops, this will rise. Multiply transformations
		* by rate to get smooth change over time.
		* @property rate
		* @type number
		* @public
		* @since 1.2.0
		*/
		public rate: number = 1;

		/**
		* Maximum frame duration. If a frame takes longer than this to render,
		* the clock will only advance this far, in effect slowing down time.
		* If this value is 0 or less, it will not be checked and frames can
		* take any amount of time to render.
		* @property _maxFrameDuration
		* @type number
		* @default -1
		* @private
		*/
		private _maxFrameDuration: number = -1;

		/**
		* Maximum frame duration. If a frame takes longer than this to render,
		* the clock will only advance this far, in effect slowing down time.
		* If this value is 0 or less, it will not be checked and frames can
		* take any amount of time to render.
		* @property maxFrameDuration
		* @type number
		* @default -1
		* @public
		*/
		public get maxFrameDuration(): number {
			return this._maxFrameDuration;
		}

		public set maxFrameDuration( value: number ) {
			this._maxFrameDuration = value;
		}


		/**
		* Number of clock units elapsed since the clock was most recently
		* started (not including time spent paused)
		* @method elapsed
		* @return {Number} Number of clock units
		* @public
		*/
		public elapsed(): number {
			return this._elapsed;
		}

		/**
		* Time the clock was most recently stopped relative to the
		* master clock.
		* @property _timeLastStopped
		* @type Number
		* @default null
		* @private
		*/
		private _timeLastStopped: number = null;

		/**
		* Number of clock units elapsed since the clock was most recently
		* stopped.
		* @method elapsedSinceLastStopped
		* @return {Number} Number of clock units
		* @public
		*/
		public elapsedSinceLastStopped(): number {

			return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastStopped) / this.units : null;

		}

		/**
		* Time the clock was most receently paused relative to the
		* master clock.
		* @property _timeLastPaused
		* @private
		* @type Number
		* @default null
		* @private
		*/
		private _timeLastPaused: number = null;

		/**
		* Number of clock units elapsed since the clock was most recently paused.
		* @method elapsedSinceLastPaused
		* @return {Number} Number of clock units
		* @public
		*/
		public elapsedSinceLastPaused(): number {

			return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastPaused) / this.units : null;

		}

		/**
		* Time the clock was most recently unpaused relative to the
		* master clock.
		* @property _timeLastUnpaused
		* @private
		* @type Number
		* @default null
		* @private
		*/
		private _timeLastUnpaused: number = null;

		/**
		* Number of clock units elapsed since the clock was most recently
		* unpaused.
		* @method elapsedSinceLastUnpaused
		* @return {Number} Number of clock units
		* @public
		*/
		public elapsedSinceLastUnpaused(): number {

			return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastUnpaused) / this.units : null;

		}

		/**
		* Total number of milliseconds the clock has been paused
		* since it was last started
		* @property _totalPaused
		* @private
		* @type Number
		* @default 0
		* @private
		*/
		private _totalPaused: number = 0;

		/**
		* Whether the clock is in a running state
		* @property _isRunning
		* @type boolean
		* @default false
		* @private
		*/
		private _isRunning: boolean = false;

		/**
		* Check if the clock is currently running
		* @method isRunning
		* @return {boolean} `true` if running
		* @public
		*/
		public isRunning(): boolean {

			return this._isRunning;

		}

		/**
		* Whether the clock is in a stopped state
		* @property _isStopped
		* @type boolean
		* @default true
		* @private
		*/
		private _isStopped: boolean = true;

		/**
		* Check if the clock is in the stopped state
		* @method isStopped
		* @return {boolean} `true` if stopped
		* @public
		*/
		public isStopped(): boolean {

			return this._isStopped;

		}

		/**
		* Whether the clock is in a paused state
		* @property _isPaused
		* @type boolean
		* @default false
		* @private
		*/
		private _isPaused: boolean = false;

		/**
		* Check if the clock is in the paused state
		* @method isPaused
		* @return {boolean} `true` if paused
		* @public
		*/
		public isPaused(): boolean {

			return this._isPaused;

		}

		/**
		* Internal reference to the state of the elapsed timer
		* @property _elapsedState
		* @type Number
		* @private
		*/
		private _elapsedState: number = Kiwi.Time.Clock._RUNNING;

		/**
		* Time manager that this clock belongs to
		* @property manager
		* @type ClockManager 
		* @public
		*/
		public manager: Kiwi.Time.ClockManager = null;

		/**
		* Master clock from which time is derived
		* @property master
		* @type Kiwi.Time.MasterClock
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
		* Number of milliseconds counted as one unit of time by the clock
		* @property units
		* @type Number
		* @default 0
		* @public
		*/
		public units: number = 0;

		/**
		* Constant indicating that the Clock is running
		* (and has not yet been paused and resumed)
		* @property _RUNNING
		* @static
		* @type number
		* @default 0
		* @private
		*/
		private static _RUNNING: number = 0;

		/**
		* Constant indicating that the Clock is paused
		* @property _PAUSED
		* @static
		* @type number
		* @default 1
		* @private
		*/
		private static _PAUSED: number = 1;

		/**
		* Constant indicating that the Clock is running
		* (and has been paused then resumed)
		* @property _RESUMED
		* @static
		* @type number
		* @default 2
		* @private
		*/
		private static _RESUMED: number = 2;

		/**
		* Constant indicating that the Clock is stopped
		* @property _STOPPED
		* @static
		* @type number
		* @default 3
		* @private
		*/
		private static _STOPPED: number = 3;

		/**
		* Add an existing Timer to the Clock.
		* @method addTimer
		* @param timer {Timer} Timer object instance to be added to this Clock
		* @return {Kiwi.Time.Clock} This Clock object
		* @public
		*/
		public addTimer(timer: Timer): Clock {

			this.timers.push(timer);

			return this;
		}

		/**
		* Create a new Timer and add it to this Clock.
		* @method createTimer
		* @param name {string} Name of the Timer (must be unique on this Clock)
		* @param [delay=1] {Number} Number of clock units to wait between
		*	firing events
		* @param [repeatCount=0] {Number} Number of times to repeat the Timer 
		*	(default 0)
		* @param [start=true] {Boolean} If the timer should start
		* @return {Kiwi.Time.Timer} The newly created Timer
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
		* Remove a Timer from this Clock based on either the Timer object
		* or its name.
		* @method removeTimer
		* @param [timer=null] {Timer} Timer object you wish to remove.
		*	If you wish to delete by Timer Name set this to null.
		* @param [timerName=''] {string} Name of the Timer object to remove
		* @return {boolean} `true` if the Timer was successfully removed
		* @public
		*/
		public removeTimer(timer: Timer = null, timerName:string = ""): boolean {
			var index;

			//  Timer object given?
			if ( timer !== null ) {
				index = this.timers.indexOf( timer );
				if ( index !== -1 ) {
					this.timers.splice( index, 1 );
					return true;
				}
			} else if ( timerName !== "" ) {
				for ( index = 0; index < this.timers.length; index++ ) {
					if ( this.timers[ index ].name === timerName ) {
						this.timers.splice( index, 1 );
						return true;
					}
				}
			}

			return false;
		}

		/**
		* Check if the Timer already exists on this Clock.
		* @method checkExists
		* @param name {string} Name of the Timer
		* @return {boolean} `true` if the Timer exists
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
		* @return {Clock} This Clock object
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
		* @method toMilliseconds
		* @param time {number} Seconds
		* @return {Number} Milliseconds
		* @public
		*/
		public convertToMilliseconds(time: number): number {

			return time * this.units;

		}

		/**
		* Update all Timers linked to this Clock.
		* @method update
		* @public
		*/
		public update() {
			var frameLength = this._currentMasterElapsed - this._lastMasterElapsed;

			if ( this._maxFrameDuration > 0 ) {
				frameLength = Math.min( frameLength, this._maxFrameDuration );
			}

			for (var i = 0; i < this.timers.length; i++) {
				this.timers[i].update();
			}

			// Compute difference between last master value and this
			// Scale that difference by timeScale
			// If clock is running, add that value to the current time
			// Set "rate" as per running type
			this._lastMasterElapsed = this._currentMasterElapsed;
			this._currentMasterElapsed = this.master.elapsed();
			if ( this._elapsedState === Kiwi.Time.Clock._RUNNING || this._elapsedState === Kiwi.Time.Clock._RESUMED ) {
				this._elapsed += this.timeScale * frameLength / this.units;
				this.rate = this.timeScale * frameLength / this.master.idealDelta;
			} else if ( this._elapsedState === Kiwi.Time.Clock._PAUSED ) {
				this._totalPaused += frameLength;
				this.rate = 0;
			} else if ( this._elapsedState === Kiwi.Time.Clock._STOPPED ) {
				this.rate = 0;
			}
		}

		/**
		* Start the clock. This resets the clock and starts it running.
		* @method start
		* @return {Clock} This Clock object
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

			this._elapsedState = Kiwi.Time.Clock._RUNNING;

			this._elapsed = 0;
			this._lastMasterElapsed = this.master.elapsed();
			this._currentMasterElapsed = this.master.elapsed();

			return this;

		}

		/**
		* Pause the clock. This can only be paused if it is already running.
		* @method pause
		* @return {Kiwi.Time.Clock} This Clock object
		* @public
		*/
		public pause(): Clock {

			if (this._isRunning === true)
			{
				this._timeLastPaused = this.master.elapsed();
				this._isRunning = false;
				this._isPaused = true;
				this._isStopped = false;

				this._elapsedState = Kiwi.Time.Clock._PAUSED;
			}

			return this;
		}

		/**
		* Resume the clock. This can only be resumed if it is already paused.
		* @method resume
		* @return {Kiwi.Time.Clock} This Clock object
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

				this._elapsedState = Kiwi.Time.Clock._RESUMED;
			}

			return this;

		}

		/**
		* Stop the clock. This can only be stopped if it is already running
		*	or is paused.
		* @method stop
		* @return {Kiwi.Time.Clock} This Clock object
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

				this._elapsedState = Kiwi.Time.Clock._STOPPED;
			}

			return this;

		}

		/**
		* Return a string representation of this object.
		* @method toString
		* @return {string} String representation of the instance
		* @public
		*/
		public toString(): string {

			return "[{Clock (name=" + this.name + " units=" + this.units + " running=" + this._isRunning + ")}]";

		}


		/**
		* Set a function to execute after a certain time interval.
		* Emulates `window.setTimeout`, except attached to a `Kiwi.Time.Clock`.
		* This allows you to pause and manipulate time, and the timeout will
		* respect the clock on which it is created.
		*
		* No `clearTimeout` is provided; you should use `Kiwi.Time.Timer`
		* functions to achieve further control.
		*
		* Any parameters after `context` will be passed as parameters to the
		* callback function. Note that you must specify `context` in order for
		* this to work. You may specify `null`, in which case it will default
		* to the global scope `window`.
		*
		* @method setTimeout
		* @param callback {function} Function to execute
		* @param timeout {number} Milliseconds before execution
		* @param [context] {object} Object to be `this` for the callback
		* @return {Kiwi.Time.Timer} Kiwi.Time.Timer object which can be used
		*	to further manipulate the timer
		* @public
		*/
		public setTimeout( callback, timeout: number, context, ...args ): Timer {
			var clock = this,
				timer = this.createTimer( "timeoutTimer", timeout / this.units );

			if ( !context ) {
				context = this;
			}

			timer.createTimerEvent( TimerEvent.TIMER_STOP,
				function() {
					callback.apply( context, args );
					clock.removeTimer( timer );
				},
				context );

			timer.start();

			return timer;
		}


		/**
		* Set a function to repeatedly execute at fixed time intervals.
		* Emulates `window.setInterval`, except attached to a `Kiwi.Time.Clock`.
		* This allows you to pause and manipulate time, and the timeout will
		* respect the clock on which it is created.
		*
		* No `clearInterval` is provided; you should use `Kiwi.Time.Timer`
		* functions to achieve further control.
		*
		* Any parameters after `context` will be passed as parameters to the
		* callback function. Note that you must specify `context` in order for
		* this to work. You may specify `null`, in which case it will default
		* to the global scope `window`.
		*
		* @method setInterval
		* @param callback {function} Function to execute
		* @param timeout {number} Milliseconds between executions
		* @param [context=window] {object} Object to be `this` for the callback
		* @return {Kiwi.Time.Timer} Kiwi.Time.Timer object
		*   which can be used to further manipulate the timer
		* @public
		*/
		public setInterval( callback, timeout: number, context, ...args ): Timer {
			var timer = this.createTimer( "intervalTimer", timeout / this.units, -1 );

			if ( !context ) {
				context = this;
			}

			timer.createTimerEvent( TimerEvent.TIMER_COUNT,
				function() {
					callback.apply( context, args );
				},
				context );

			timer.start();

			return timer;
		}

	}

}
