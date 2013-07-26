/*
 *	Kiwi - Components - Time
 *
 *	@desc		Contains methods for control time individual.
 *
 *	@version	1.0 - 26th July 2013
 *				
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
 *
 *  TO DO:      Add/Remove time methods.
 *              Have the hours/minutes methods control only themselves.
 *              Create a signal.
 * 
*/

module Kiwi.Components {

    export class Time extends Kiwi.Component {

        /**
        *
        * @constructor
        * @param {number} milliseconds
        * @param {number} seconds
        * @param {number} minutes
        * @param {number} hours
        **/
        constructor(milliseconds: number, seconds?: number, minutes?: number, hours?: number) {
            super("time", true, true, true);

            this.paused = true;
            this._countDown = true;
            this.updated = new Kiwi.Signal();
            this._lastTime = Date.now();
            this.setTime(milliseconds, seconds, minutes, hours);

        }

        /**
        * The current amount of milliseconds
        * @private
        **/
        private _milliseconds: number;

        /**
        * If the timer is paused or not.
        * @public
        **/
        public paused: boolean;

        /**
        * What the last time that it updated was. In milliseconds
        * @private
        **/
        private _lastTime: number;

        /**
        * If it is counting down or up. 
        * @private
        **/
        private _countDown: boolean;

        /**
        * A Kiwi.Signal dispatch a event when the time changes.
        * @public
        **/
        public updated: Kiwi.Signal;

        /**
        * Used to set/tell if the timer should count down or not
        * 
        * @method countingDown
        * @param {boolean} val
        * @return {boolean}
        **/
        public countingDown(val?: boolean): boolean {
            if (val !== undefined) {
                if (val == true) this.paused = false;

                this._countDown = val;
            }
            return this._countDown;
        }

        /**
        * Used to set/tell if the timer should count up or not
        * 
        * @method countingDown
        * @param {boolean} val
        * @return {boolean}
        **/
        public countingUp(val?: boolean): boolean {
            if (val !== undefined) {
                if (val == true) this.paused = false;

                this._countDown = !val;
            }
            return !this._countDown;
        }

        /**
        * Sets the time to be at a certain point.
        *
        * @method setTime
        * @param {number} milliseconds
        * @param {number} seconds
        * @param {number} minutes
        * @param {number} hours
        * @return {number} 
        **/
        public setTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number {

            if (seconds !== undefined) milliseconds += this.convertToMilli(seconds, 's');
            if (minutes !== undefined) milliseconds += this.convertToMilli(minutes, 'm');
            if (hours !== undefined) milliseconds += this.convertToMilli(hours, 'h');

            this._milliseconds = milliseconds;
            this.updated.dispatch();

            return this._milliseconds;
        }

        /**
        * Add's more time to the component.
        *
        * @method addTime
        * @param {number} milliseconds
        * @param {number} seconds
        * @param {number} minutes
        * @param {number} hours
        * @return {number} 
        **/
        public increaseTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number {
            
            if (seconds !== undefined) milliseconds += this.convertToMilli(seconds, 's');
            if (minutes !== undefined) milliseconds += this.convertToMilli(minutes, 'm');
            if (hours !== undefined) milliseconds += this.convertToMilli(hours, 'h');
            
            this._milliseconds += milliseconds;
            this.updated.dispatch();

            return this._milliseconds;
        }

        /**
        * Removes some time from the component.
        *
        * @method removeTime
        * @param {number} milliseconds
        * @param {number} seconds
        * @param {number} minutes
        * @param {number} hours
        * @return {number} 
        **/
        public decreaseTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number {
        
            if (seconds !== undefined) milliseconds += this.convertToMilli(seconds, 's');
            if (minutes !== undefined) milliseconds += this.convertToMilli(minutes, 'm');
            if (hours !== undefined) milliseconds += this.convertToMilli(hours, 'h');
        
            this._milliseconds += milliseconds;
            this.updated.dispatch();

            return this._milliseconds;
        }

        /**
        * A method to convert a number / unit into milliseconds. 
        *
        * @method convertToMilli
        * @param {number} val - The number that you want converted.
        * @param {number} unit - Units that the number is in. 's' => seconds, 'm' => minutes, 'h' => hours
        * @return {number}
        **/
        public convertToMilli(val: number, unit: string):number {

            var num = 0;
            if (unit === 'milli' || unit === 'milliseconds' || unit === 'ms') {
                num = val;
            } else if (unit === 'seconds' || unit === 's') {
                num = val * 1000;
            } else if (unit === 'minutes' || unit === 'm') {
                num = val * 1000 * 60;
            } else if (unit === 'hours' || unit === 'h') {
                num = val * 1000 * 60 * 60;
            }

            return num;
        }

        /**
        * Gives you the number of milliseconds. Alternatively can also set the number of milliseconds
        *
        * @method milliseconds
        * @param {number} val
        * @return {number}
        **/
        public milliseconds(val?: number):number {
            if (val !== undefined) {
                this._milliseconds = val;
                this.updated.dispatch();
            }
            return this._milliseconds % 1000;
        }
        
        /**
        * Gives you the number of seconds. Alternatively can also set the time.
        *
        * @method seconds
        * @param {number} val
        * @return {number}
        **/
        public seconds(val?: number):number {
            if (val !== undefined) {
                this._milliseconds = this.convertToMilli(val, 's');
                this.updated.dispatch();
            }
            return Math.floor(this._milliseconds / 1000) % 60;
        }
        
        /**
        * Gives you the number of minutes. Alternatively can also set the number of minutes
        *
        * @method minutes
        * @param {number} val
        * @return {number}
        **/
        public minutes(val?: number):number {
            if (val !== undefined) {
                this._milliseconds = this.convertToMilli(val, 'm');
                this.updated.dispatch();
            }
            return Math.floor(this._milliseconds / 1000 / 60) % 60;
        }
        
        /**
        * Gives you the number of hours Alternatively can also set the number of hours
        * 
        * @method hours
        * @param {number} val
        * @return {number}
        **/
        public hours(val?: number):number {
            if (val !== undefined) {
                this._milliseconds = this.convertToMilli(val, 'h');
                this.updated.dispatch();
            }
            return Math.floor(this._milliseconds / 1000 / 60 / 60);
        }
        
        /**
        * Update loop.
        * @public
        **/
        public update() {
            
            if (!this.paused) {
                var newTime = Date.now();
                var difference = newTime - this._lastTime;
                this._lastTime = newTime;

                if (this._countDown) {
                    this.milliseconds(this._milliseconds - difference);
                } else {
                    this.milliseconds(this._milliseconds + difference);
                }
                this.updated.dispatch();
            }

            super.update();
        }

    }
}