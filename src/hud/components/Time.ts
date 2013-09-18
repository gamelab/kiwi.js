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
*
* @module HUD
* @submodule Components
 * 
*/

module Kiwi.HUD.Components {
    /**
    * @class Time
    */

    export class Time extends Kiwi.Component {

        /*
        *
        * @constructor
        * @param milliseconds {number} milliseconds
        * @param seconds {number} seconds
        * @param minutes {number} minutes
        * @param hours {number} hours
        */
        constructor(milliseconds: number, seconds?: number, minutes?: number, hours?: number) {
            super(null, "time");

            this.paused = true;
            this._countDown = true;
            this.updated = new Kiwi.Signal();
            this._lastTime = Date.now();
            this.setTime(milliseconds, seconds, minutes, hours);

        }

        /*
        * The current amount of milliseconds
        * @property _milliseconds
        * @type number
        * @private
        */
        private _milliseconds: number;

        /*
        * If the timer is paused or not.
        * @property paused
        * @type boolean
        * @public
        */
        public paused: boolean;

        /*
        * What the last time that it updated was. In milliseconds
        * @property _lastTime
        * @type number
        * @private
        */
        private _lastTime: number;

        /*
        * If it is counting down or up. 
        * @property _countDown
        * @type boolean
        * @private
        */
        private _countDown: boolean;

        /*
        * A Kiwi.Signal dispatch a event when the time changes.
        * @property updated
        * @type Signal
        * @public
        */
        public updated: Kiwi.Signal;

        /*
        * Used to set/tell if the timer should count down or not
        * 
        * @property countingDown
        * @type boolean
        * @public
        */
        public set countingDown(val: boolean) {

            if (val !== undefined) {
                if (val == true) this.paused = false;

                this._countDown = val;
            }

        }

        public get countingDown(): boolean {
            
            return this._countDown;

        }

        /*
        * Used to set/tell if the timer should count up or not
        * 
        * @property countingDown
        * @type boolean
        * @public
        */
        public set countingUp(val: boolean) {

            if (val !== undefined) {
                if (val == true) this.paused = false;

                this._countDown = !val;
            }

        }

        public get countingUp(): boolean {

            return !this._countDown;

        }

        /*
        * Sets the time to be at a certain point.
        *
        * @method setTime
        * @param milliseconds {number} milliseconds
        * @param seconds {number} seconds
        * @param minutes {number} minutes
        * @param hours {number} hours
        * @return {number} 
        * @public
        */
        public setTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number {

            if (seconds !== undefined) milliseconds += this.convertToMilli(seconds, 's');
            if (minutes !== undefined) milliseconds += this.convertToMilli(minutes, 'm');
            if (hours !== undefined) milliseconds += this.convertToMilli(hours, 'h');

            this._milliseconds = milliseconds;
            this.updated.dispatch();

            return this._milliseconds;
        }

        /*
        * Add's more time to the component.
        *
        * @method increaseTime
        * @param milliseconds {number} milliseconds
        * @param seconds {number} seconds
        * @param minutes {number} minutes
        * @param hours {number} hours
        * @return {number} 
        * @public
        */
        public increaseTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number {
            
            if (seconds !== undefined) milliseconds += this.convertToMilli(seconds, 's');
            if (minutes !== undefined) milliseconds += this.convertToMilli(minutes, 'm');
            if (hours !== undefined) milliseconds += this.convertToMilli(hours, 'h');
            
            this._milliseconds += milliseconds;
            this.updated.dispatch();

            return this._milliseconds;
        }

        /*
        * Removes some time from the component.
        *
        * @method decreaseTime
        * @param milliseconds {number} milliseconds
        * @param seconds {number} seconds
        * @param minutes {number} minutes
        * @param hours {number} hours
        * @return {number} 
        * @public
        */
        public decreaseTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number {
        
            if (seconds !== undefined) milliseconds += this.convertToMilli(seconds, 's');
            if (minutes !== undefined) milliseconds += this.convertToMilli(minutes, 'm');
            if (hours !== undefined) milliseconds += this.convertToMilli(hours, 'h');
        
            this._milliseconds += milliseconds;
            this.updated.dispatch();

            return this._milliseconds;
        }

        /*
        * A method to convert a number / unit into milliseconds. 
        *
        * @method convertToMilli
        * @param val {number} The number that you want converted.
        * @param unit {number} Units that the number is in. 's' => seconds, 'm' => minutes, 'h' => hours
        * @return {number}
        * @public
        */
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

        /*
        * Gives you the number of milliseconds. Alternatively can also set the number of milliseconds
        *
        * @method milliseconds
        * @param val {number} val
        * @return {number}
        * @public
        */
        public set milliseconds(val: number) {

            if (val !== undefined) {
                this._milliseconds = val;
                this.updated.dispatch();
            }

        }

        public get milliseconds(): number {

            return this._milliseconds % 1000;

        }
        
        /*
        * Gives you the number of seconds. Alternatively can also set the time.
        *
        * @method seconds
        * @param val {number} val
        * @return {number}
        * @public
        */
        public set seconds(val: number) {
            if (val !== undefined) {
                this._milliseconds = this.convertToMilli(val, 's');
                this.updated.dispatch();
            }
        }

        public get seconds(): number {
            
            return Math.floor(this._milliseconds / 1000) % 60;

        }
        
        /*
        * Gives you the number of minutes. Alternatively can also set the number of minutes
        *
        * @method minutes
        * @param val {number} val
        * @return {number}
        * @public
        */
        public set minutes(val: number) {
            if (val !== undefined) {
                this._milliseconds = this.convertToMilli(val, 'm');
                this.updated.dispatch();
            }
        }
        
        public get minutes(): number {
            
            return Math.floor(this._milliseconds / 1000 / 60) % 60;

        }
        
        /*
        * Gives you the number of hours Alternatively can also set the number of hours
        * 
        * @method hours
        * @param val {number} val
        * @return {number}
        * @public
        */
        public set hours(val: number) {

            if (val !== undefined) {
                this._milliseconds = this.convertToMilli(val, 'h');
                this.updated.dispatch();
            }

        }
        
        public get hours(): number {

            return Math.floor(this._milliseconds / 1000 / 60 / 60);

        }
        
        /*
        * Update loop.
        * @method update
        * @public
        */
        public update() {
            
            if (!this.paused) {
                var newTime = Date.now();
                var difference = newTime - this._lastTime;
                this._lastTime = newTime;

                if (this._countDown) {
                    this.milliseconds = this._milliseconds - difference;
                } else {
                    this.milliseconds = this._milliseconds + difference;
                }
                this.updated.dispatch();
            }

            super.update();
        }

    }
}