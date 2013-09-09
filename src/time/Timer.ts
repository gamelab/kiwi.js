/**
* Kiwi - Time
* @module Kiwi
* @submodule Time
*
*/ 

module Kiwi.Time {

    /**
    * The Timer class hooks into a game clock and allows you run code at a specified point in game time.
    * Use the start() method to start a timer. Add TimerEvents to set-up code to be run on the timer interval.
    * Timer objects can run once or repeat at specified intervals to execute code on a schedule.
    *
    * @class Timer
    *
    */
    export class Timer {

        /**
        * Constructor
        * @param {string} The name of the timer.
        * @param {Kiwi.Time.Clock} The game clock instance this Timer is based on.
        * @param {Number} delay - The number of clock units to wait between firing events.
        * @param {Number} repeatCount - The number of times to repeat the timer before it is expired. If you don't want it to ever expire, set a value of -1.
        * @protected
        * @return (Object) This object.
        */
        constructor (name: string, clock: Clock, delay: number, repeatCount: number = 0) {

            this._clock = clock;

            this._startEvents = [];
            this._countEvents = [];
            this._stopEvents = [];

            this.name = name;
            this.delay = delay;
            this.repeatCount = repeatCount;

        }

        public objType() {
            return "Timer";
        }

        /**
        * The number of times the timer has repeated so far.
        * @property _currentCount
        * @type Number
        **/
        private _currentCount: number = 0;

        /**
        * Get the number of times the timer has repeated.
        * @method getCurrentCount
        * @protected
        * @return (Number) 
        **/
        public currentCount(): number {

            return this._currentCount;

        }

        /**
        * A collection of the TimerEvents associated with TimerEvent.TIMER_START
        * @property _startEvents
        * @private
        * @type Array
        **/
        private _startEvents:TimerEvent[] = null;

        /**
        * A collection of the TimerEvents associated with TimerEvent.TIMER_COUNT
        * @property _countEvents
        * @private
        * @type Array
        **/
        private _countEvents:TimerEvent[] = null;

        /**
        * A collection of the TimerEvents associated with TimerEvent.TIMER_STOP
        * @property _stopEvents
        * @private
        * @type Array
        **/
        private _stopEvents:TimerEvent[] = null;

        /**
        * The clock which this timer bases its timing on.
        * @property _clock
        * @type Object
        **/
        private _clock: Clock = null;

        /**
        * The time the last repeat occurred in clock units.
        * @property _timeLastCount
        * @type Number
        **/
        private _timeLastCount: number = null;

        /**
        * Whether the timer is in a running state.
        * @property _isRunning
        * @type Boolean
        **/
        private _isRunning: bool = false;

        /**
        * The Timers current state. True if the Timer is running, otherwise false.
        * @method running
        * @return (Boolean) 
        **/
        public isRunning(): bool {

            return this._isRunning;

        }

        /**
        * Whether the timer is in a stopped state.
        * @property _isStopped
        * @type Boolean
        **/
        private _isStopped: bool = true;

        /**
        * Whether the timer is in a stopped state.
        * @method stopped
        * @return (Boolean) 
        **/
        public isStopped(): bool {

            return this._isStopped;

        }

        /**
        * Whether the timer is in a paused state.
        * @property _isPaused
        * @type Boolean
        **/
        private _isPaused: bool = false;

        /**
        * Whether the timer is in a paused state.
        * @method paused
        * @return (Boolean) 
        **/
        public isPaused(): bool {

            return this._isPaused;

        }

        /**
        * The name of the timer.
        * @property name
        * @type Number
        **/
        public name: string = null;

        /**
        * The delay, in game clock units, that the timer will wait before firing the event
        * @property delay
        * @type Number
        **/
        public delay: number = 0;

        /**
        * The number of times the timer will repeat before stopping.
        * @property repeatCount
        * @type Number
        **/
        public repeatCount: number = 0;
        
        /**
        * Checks the list of TimerEvents added and processes them based on their type.
        * @method dispatchEvents
        * @private
        * @param {Number} The type of events to dispatch
        **/
        private processEvents(type: number) {

            if (type === TimerEvent.TIMER_START)
            {
                for (var i = 0; i < this._startEvents.length; i++)
                {
                    this._startEvents[i].run();
                }
            }
            else if (type === TimerEvent.TIMER_COUNT)
            {
                for (var i = 0; i < this._countEvents.length; i++)
                {
                    this._countEvents[i].run();
                }
            }
            else if (type === TimerEvent.TIMER_STOP)
            {
                for (var i = 0; i < this._stopEvents.length; i++)
                {
                    this._stopEvents[i].run();
                }
            }

        }

        /**
        * Internal update loop called by the CLock that this Timer belongs to.
        * @method update
        **/
        public update() {

            if (this._isRunning && this._clock.elapsed() - this._timeLastCount >= this.delay && this._isPaused === false)
            {
                this._currentCount++;

                this.processEvents(TimerEvent.TIMER_COUNT);

                this._timeLastCount = this._clock.elapsed() || 0;
                 
                if (this.repeatCount !== -1 && this._currentCount >= this.repeatCount)
                {
                    this.stop();
                }

            }

        }

        /**
        * Start the Timer. This will reset the timer and start it. The timer can only be started if it is in a stopped state.
        * @method start
        * @return (Object) this object.
        **/
        public start(): Timer {

            if (this._isStopped === true)
            {
                this._isRunning = true;
                this._isPaused = false;
                this._isStopped = false;

                this._currentCount = 0;
                this._timeLastCount = this._clock.elapsed() || 0;

                this.processEvents(TimerEvent.TIMER_START);
            }

            return this;
        }

        /**
        * Stop the Timer. Only possible when the timer is running or paused.
        * @method stop
        * @return (Object) this object.
        **/
        public stop():Timer {

            if (this._isRunning === true || this._isPaused === true)
            {
                this._isRunning = false;
                this._isPaused = false;
                this._isStopped = true;

                this.processEvents(TimerEvent.TIMER_STOP);
            }

            return this;

        }

        /**
        * Pause the Timer. Only possible when the timer is running.
        * @method pause
        * @return (Object) this object.
        **/
        public pause():Timer {

            if (this._isRunning === true)
            {
                this._isRunning = false;
                this._isPaused = true;
            }

            return this;
        }

        /**
        * Resume the Timer. Only possible if the timer has been paused.
        * @method resume
        * @return (Object) this object.
        **/
        public resume(): Timer {

            if (this._isPaused === true)
            {
                this._isRunning = true;
                this._isPaused = false;
            }

            return this;

        }

        /**
        * Adds an existing TimerEvent object to this Timer.
        * @method addTimerEvent
        * @param {Kiwi.Time.TimerEvent} A TimerEvent object
        * @return {Kiwi.Time.TimerEvent} The TimerEvent object
        **/
        public addTimerEvent(event:TimerEvent):TimerEvent {

            if (event.type === TimerEvent.TIMER_START)
            {
                this._startEvents.push(event);
            }
            else if (event.type === TimerEvent.TIMER_COUNT)
            {
                this._countEvents.push(event);
            }
            else if (event.type === TimerEvent.TIMER_STOP)
            {
                this._stopEvents.push(event);
            }

            return event;

        }

        /**
        * Creates a new TimerEvent and adds it to this Timer
        * @method createTimerEvent
        * @param {Number} The type of TimerEvent to create (TIMER_START, TIMER_COUNT or TIMER_STOP).
        * @param {Function} The function to call when the TimerEvent fires.
        * @param {Function} The context in which the given function will run (usually 'this')
        * @return {Kiwi.Time.TimerEvent} The newly created TimerEvent.
        **/
        public createTimerEvent(type:number, callback, context):TimerEvent {

            if (type === TimerEvent.TIMER_START)
            {
                this._startEvents.push(new TimerEvent(type, callback, context));
                return this._startEvents[this._startEvents.length - 1];
            }
            else if (type === TimerEvent.TIMER_COUNT)
            {
                this._countEvents.push(new TimerEvent(type, callback, context));
                return this._countEvents[this._countEvents.length - 1];
            }
            else if (type === TimerEvent.TIMER_STOP)
            {
                this._stopEvents.push(new TimerEvent(type, callback, context));
                return this._stopEvents[this._stopEvents.length - 1];
            }

            return null;

        }

        /**
        * Removes a TimerEvent object from this Timer
        * @method removeTimerEvent
        * @param {Kiwi.Time.TimerEvent} The TimerEvent to remove
        * @return {Boolean} True if the event was removed, otherwise false.
        **/
        public removeTimerEvent(event:TimerEvent):bool {

            var removed = [];

            if (event.type === TimerEvent.TIMER_START)
            {
                removed = this._startEvents.splice(this._startEvents.indexOf(event), 1);
            }
            else if (event.type === TimerEvent.TIMER_COUNT)
            {
                removed = this._countEvents.splice(this._countEvents.indexOf(event), 1);
            }
            else if (event.type === TimerEvent.TIMER_STOP)
            {
                removed = this._stopEvents.splice(this._stopEvents.indexOf(event), 1);
            }

            if (removed.length === 1)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
        * Removes all TimerEvent objects from this Timer
        * @method clear
        * @param {Number} The type of TimerEvents to remove. Set to zero to remove them all.
        * @return {Boolean} True if the event was removed, otherwise false.
        **/
        public clear(type:number = 0) {

            if (type === 0)
            {
                this._startEvents.length = 0;
                this._countEvents.length = 0;
                this._stopEvents.length = 0;
            }
            else if (type === TimerEvent.TIMER_START)
            {
                this._startEvents.length = 0;
            }
            else if (type === TimerEvent.TIMER_COUNT)
            {
                this._countEvents.length = 0;
            }
            else if (type === TimerEvent.TIMER_STOP)
            {
                this._stopEvents.length = 0;
            }

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} a string representation of the instance.
	     **/
        public toString(): string {

            return "[{Timer (name=" + this.name + " delay=" + this.delay + " repeatCount=" + this.repeatCount + " running=" + this._isRunning + ")}]";

        }

    }

}