/**
 *	Contains way's to control the counting of a singular number.
 *
 * @module HUD
 * @submodule Components
 *
*/

module Kiwi.HUD.Components {

    /**
    * @class Counter
    * @extends Component
    * @constructor
    * @param initial {number} Counters initial value
    * @param step {number} How much the counter should increment/decrement by
    * @return {Counter}
    */
    export class Counter extends Kiwi.Component {
        
        constructor(initial:number,step:number=1) {
            super(null, "counter");
            this._value = initial;
            this.step = step;

            this.updated = new Kiwi.Signal;
        }

        /*
        * The current value of the counter
        * @property _value
        * @type number
        * @private
        */
        private _value:number = 0;

        /*
        * How much the counter should increment/decrement by.
        * @property step
        * @type number
        * @public 
        */
        public step:number;

        /*
        * A Kiwi.Signal that dispatches an event when the changes.
        * @property updated
        * @type Signal
        * @public
        */
        public updated: Kiwi.Signal;

        /*
        * Set allows you to get the current value of the counter
        * Get allows you to change the current value if you pass a value.
        *
        * @property value
        * @type number
        * @public
        */
        public set value(val: number) {
            if (val !== undefined) {
                this._value = val;
                this.updated.dispatch(this._value);
            }
        }

        public get value(): number {
            
            return this._value;

        }

        /*
        * Increments the current value by the value passed.
        * If no value was passed increments it by the step property.
        * Returns the new value.
        * 
        * @method increment
        * @param val {number} val
        * @return {number} 
        * @public
        */
        public increment(val?: number) {
            if (val !== undefined) {
                this._value += val;
            } else {
                this._value += this.step;
            }
            this.updated.dispatch(this._value);
            return this._value;
        }

        /*
        * Decrements the current value by the value passed.
        * If no value was passed decrements it by the step property.
        * Returns the new value.
        * 
        * @method decrement
        * @param {number} val
        * @return {number} 
        * @public
        */
        public decrement(val?: number) {
            if (val !== undefined) {
                this._value -= val;
            } else {
                this._value -= this.step;
            }
            this.updated.dispatch(this._value);
            return this._value;
        }
     
    }

}

