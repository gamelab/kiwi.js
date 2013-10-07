
/**
*	Contains methods for making a singular value stay between a minimun/maximum boundaries.
*
* @module HUD
* @submodule Components
 *
*/

module Kiwi.HUD.Components {

    /**
    * @class Range
    * @extends Component
    * @constructor
    * @param owner {any} The object that this Component belongs to.
    * @param current {number} The current value.
    * @param max {number} The maximum value it can be.
    * @param min {number} The minimum value that the current can be.
    * @return {number}
    */
    export class Range extends Kiwi.Component {
         
        constructor(owner:any, current: number, max: number, min: number) {
            super(owner, "counter");
            
            this._current = current;
            this._max = max;
            this._min = min;

            //signals!!!
            this.updated = new Kiwi.Signal();
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType():string {
            return 'RangeComponent';
        }

        /**
        * The current value of the range.
        * @property _current
        * @type number
        * @private
        */
        private _current: number;

        /**
        * The maximum value that of the range.
        * @property _max
        * @type number
        * @private
        */
        private _max: number;

        /**
        * The minimum value that of the range.
        * @property _min
        * @type number
        * @default 0
        * @private
        */
        private _min: number;

        /**
        * A Kiwi.Signal that dispatches an event when a value has changed.
        * @property updated
        * @type Signal
        * @public
        */
        public updated: Kiwi.Signal; 

        /**
        * Set allows setting of the maximum value that the range can be in. 
        * Get returns the maximum value.
        *
        * @property max
        * @type number
        * @public
        */
        public set max(val: number) {
            this._max = val;
            this.updated.dispatch(this._current, this._max, this._min);
        }
        public get max(): number {
            return this._max;
        }

        /**
        * Set allows setting of the minimum value that the range can be in. 
        * Get returns the minimum value.
        *
        * @property min
        * @type number
        * @public
        */
        public set min(val: number) {

            this._min = val;
            this.updated.dispatch(this._current, this._max, this._min);
            
        }
        public get min(): number {
            return this._min;
        }

        /**
        * Set allows setting of the current value that the range can be in. 
        * The current value will only change if it is within the maximum/minimum values.
        * Get returns the current value.
        *
        * @property current
        * @type number
        * @public
        */
        public set current(val: number) {
            if (this._current > this._max) {
                this._current = this._max;
            } else if (this._current < this._min) {
                this._current = this._min;
            } else {
                this._current = val;
            }
            this.updated.dispatch(this._current, this._max, this._min);
        }
        public get current(): number {
            return this._current;
        }

        /**
        * Decreases the current value by the amount past. 
        * If the new amount would be less than the minimun it goes to the min instead.
        *
        * @method decrease
        * @param [val=1] {number} The amount that you want to decrease the current value by. Default is 1.
        * @return {number}
        * @public
        */
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
        * @param [val=1] {number} The amount that you want to increase the current value by. Default is 1.
        * @return {number}
        * @public
        */
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
        * @method currentPercent
        * @return {number}
        * @public
        */
        public currentPercent(): number {
            return ((this.current) / (this.max)) * 100;
        }
    
    }

}

