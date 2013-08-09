
/*
 *	Kiwi - Components - Range
 *
 *	@desc		Contains methods for making a singular value stay between a minimun/maximum boundaries.
 *
 *	@version	1.0 - 26th July 2013
 *				
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Range extends Kiwi.Component {

        /**
        *
        * @constructor
        * @param {number} current - The current value.
        * @param {number} max - The maximum value it can be.
        * @param {number} min - The minimum value that the current can be.
        * @return {number}
        **/
        constructor(current: number, max: number, min: number) {
            super("counter");
            
            this._current = current;

            this._max = max;

            this._min = min;

            this.updated = new Kiwi.Signal();
        }

        /**
        * The current value of the range.
        * @private
        **/
        private _current: number;

        /**
        * The maximum value that of the range.
        * @private
        **/
        private _max: number;

        /**
        * The minimum value that of the range.
        * @private
        **/
        private _min: number;

        /**
        * A Kiwi.Signal that dispatches an event when a value has changed.
        * @public
        **/
        public updated: Kiwi.Signal; 

        /**
        * Set allows setting of the maximum value that the range can be in. 
        * Get returns the maximum value.
        *
        * @method max
        * @param {number} val
        * @return {number}
        **/
        public set max(val: number) {

            if (val !== undefined) {
                this._max = val;
                this.updated.dispatch(this._current, this._max, this._min);
            }

        }

        public get max(): number {
            
            return this._max;

        }

        /**
        * Set allows setting of the minimum value that the range can be in. 
        * Get returns the minimum value.
        *
        * @method min
        * @param {number} val
        * @return {number}
        **/
        public set min(val: number) {

            if (val !== undefined) {
                this._min = val;
                this.updated.dispatch(this._current, this._max, this._min);
            }

        }

        public get min(): number {
            
            return this._min;

        }

        /**
        * Set allows setting of the current value that the range can be in. 
        * The current value will only change if it is within the maximum/minimum values.
        * Get returns the current value.
        *
        * @method current
        * @param {number } val
        * @return {number}
        **/
        public set current(val: number) {
            if (val !== undefined) {
                if (this._current > this._max) {
                    this._current = this._max;
                } else if (this._current < this._min) {
                    this._current = this._min;
                } else {
                    this._current = val;
                }
                this.updated.dispatch(this._current, this._max, this._min);
            }
        }

        public get current(): number {
            
            return this._current;

        }

        /**
        * Decreases the current value by the amount past. 
        * If the new amount would be less than the minimun it goes to the min instead.
        *
        * @method decrease
        * @param {number} val
        * @return {number}
        **/
        public decrease(val: number= 1):number {
            if (this._current > this._min) {
                if (this._current - val < this._min) {
                    this._current = this._min;
                } else {
                    this._current -= val;
                }
                this.updated.dispatch(this._current, this._max, this._min);
            }
            return this._current;
        }

        /**
        * Increases the current value by the amount past. 
        * If the new amount would be greater than the maximum it goes to the max instead.
        *
        * @method increase
        * @param {number} val
        * @return {number}
        **/
        public increase(val: number= 1): number {
            if (this._current < this._max) {
                if (this._current + val > this._max) {
                    this._current = this._max;
                } else {
                    this._current += val;
                }
                this.updated.dispatch(this._current, this._max, this._min);
            }
            return this._current;
        }

        /**
        * 
        * 
        * @method currentPercent
        * @return {number}
        **/
        public currentPercent(): number {
            return ((this.current) / (this.max)) * 100;
        }
    
    }

}

