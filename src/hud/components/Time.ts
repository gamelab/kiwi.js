/**
 *	
 * @module HUD
 * @submodule HUDComponents
 *
*/

module Kiwi.HUD.HUDComponents {

    /**
    * A Component to manage and display a Time in a particular format.
    * The Time Component creates a new clock on the Time Manager and it use's that clock to keep track of the time.
    * When you create a new Time Component you can specify a format that you want the time to display in, which is a string based on keywords.
    * Current supported keywords for the format are:
    *  's' = 'seconds'
    *  'm' = 'minutes'
    *  'ms' = milliseconds'
    *  'ss' = 'seconds with leading zero'
    *  'mm' = 'minutes with leading zero'
    *
    * @class Time
    * @extends Component
    * @namespace Kiwi.HUD.HUDComponents
    * @constructor
    * @param owner {any} The object that this component belongs to.
    * @param [format=''] {string} The format that the time is to be displayed in. Leave blank for the default time.
    * @return {Counter}
    */
    export class Time extends Kiwi.Component {

        constructor(owner:any, format:string='') {
            super(owner, "time"); 
            
            this.clock = this.game.time.addClock(name + '-clock', 1000);
            this.format = format;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return 'TimeComponent';
        }

        /**
        * The clock that this component creates and uses to manage the current time.
        * @property clock
        * @type Clock
        * @private
        */
        public clock: Kiwi.Time.Clock;

        /**
        * Indicates whether or not the clock is currently running or not, and thus whether or not the time is playing or not.
        * @property isRunning
        * @type boolean
        * @public
        */
        public get isRunning():boolean {
            return this.clock.isRunning();
        }

        /**
        * Pauses the clock where is stands. Calls the pause method on the clock.
        * @method pause
        * @public
        */
        public pause() {
            this.clock.pause();
        }

        /**
        * Stops the clock and thus the time. Calls the stop method of the clock.
        * @method stop
        * @public
        */
        public stop() {
            this.clock.stop();
        }

        /**
        * Starts the clock and thus the time. 
        * @method start
        * @public
        */
        public start() {
            this.clock.start();
            this._timeBefore = this.clock.elapsed();
        }

        /**
        * Resumes the clock and thus the time.
        * @method resume
        * @public
        */
        public resume() {
            this.clock.resume();
        }

        /**
        * The format that they want the time to be displayed.
        * @property _format
        * @type string
        * @private
        */
        private _format: string;

        /**
        * The format that you want the time to be displayed in.
        * @property format
        * @type string
        * @public
        */
        public set format(val: string) {
            this._format = val;
        }
        public get format(): string {
            return this._format;
        }

        /**
        * If the clock should 'count down' instead of up.
        * @property countDown
        * @type boolean
        * @default false
        * @public
        */
        public countDown: boolean = false;

        /**
        * Used during the formatting stage of displaying the time.
        * @property _displayString
        * @type string
        * @private
        */
        private _displayString: string = '';

        /**
        * The current time in seconds.
        * @property _currentTime
        * @type number
        * @private
        */
        private _currentTime: number = 0;

        /**
        * The current time in seconds. This is READ ONLY.
        * @property currentTime
        * @type number
        * @public
        */
        public get currentTime(): number {
            return this._currentTime;
        }

        /**
        * The last time that the timer update. Used to calculate the time delta.
        * @property _timeBefore
        * @type number
        * @private
        */
        private _timeBefore: number = 0;

        /**
        * Sets the current time of the timer.
        * @method setTime
        * @param milli {number} The number of milliseconds.
        * @param [sec=0] {number} The number of seconds to add.
        * @param [minutes=0] {number} The number of minutes to add.
        * @public
        */
        public setTime(milli: number, sec: number= 0, minutes: number= 0) {
            this._currentTime = milli;
            if(sec != 0) this._currentTime += (sec * 1000);
            if(minutes != 0) this._currentTime += (minutes * 60 * 1000);
        }

        /**
        * Increases the current time by the amount passed.
        * @method addTime
        * @param milli {number} The number of milliseconds.
        * @param [sec=0] {number} The number of seconds to add.
        * @param [minutes=0] {number} The number of minutes to add.
        * @public
        */
        public addTime(milli:number, sec:number= 0,minutes:number= 0) {
            this._currentTime += milli;
            if(sec != 0) this._currentTime += (sec * 1000);
            if (minutes != 0) this._currentTime += (minutes * 60 * 1000);
        }
        
        /**
        * Decreases the current time by the amount passed.
        * @method removeTime
        * @param milli {number} The number of milliseconds.
        * @param [sec=0] {number} The number of seconds to add.
        * @param [minutes=0] {number} The number of minutes to add.
        * @public
        */
        public removeTime(milli: number, sec: number= 0, minutes: number= 0) {
            this._currentTime -= milli;
            if (sec != 0) this._currentTime -= (sec * 1000);
            if (minutes != 0) this._currentTime -= (minutes * 60 * 1000);
        }

        /**
        * The speed at which the time will increase/decrease by. 
        * Modify this property to make the time count down slower/faster.
        * @property _speed
        * @type number
        * @default 1
        * @private
        */
        public speed: number = 1;
        
        /**
        * Returns a string with the current time that this component is upto in the format that was passed.
        *
        * @method updateTime
        * @return string
        * @public
        */
        public getTime():string {
            if (this.countDown) {
                this._currentTime -= (this.clock.elapsed() - this._timeBefore) * this.speed;
            } else {
                this._currentTime += (this.clock.elapsed() - this._timeBefore) * this.speed;
            }
            this._timeBefore = this.clock.elapsed();

            //format time
            if (this._format !== '') {
                this._displayString = this._format;

                //milliseconds
                if (this._displayString.indexOf('ms') !== -1) {
                    var t = String(Math.floor(this._currentTime * 1000) % 1000);
                    this._displayString = this._displayString.replace('ms', t);
                }
                //seconds - leading
                if (this._displayString.indexOf('ss') != -1) {
                    var t = String(Math.floor(this._currentTime) % 60);
                    if (t.length < 2) t = '0' + t;
                    this._displayString = this._displayString.replace('ss', t);
                }
                //minutes - leading
                if (this._displayString.indexOf('mm') !== -1) {
                    var t = String(Math.floor(this._currentTime / 60) % 60);
                    if (t.length < 2) t = '0' + t;
                    this._displayString = this._displayString.replace('mm', t);
                }
                //minutes - no leading
                if (this._displayString.indexOf('s') != -1) {
                    var t = String(Math.floor(this._currentTime) % 60);
                    this._displayString = this._displayString.replace('s', t);
                }
                //seconds - no leading
                if (this._displayString.indexOf('m') !== -1) {
                    var t = String(Math.floor(this._currentTime / 60) % 60);
                    this._displayString = this._displayString.replace('m', t);
                }

                return this._displayString;
            } else {
                return String(this._currentTime.toFixed(2));
            }
        }

    }

}

