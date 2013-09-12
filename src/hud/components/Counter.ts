
/*
 *	Kiwi - Components - Counter
 *
 *	@desc		Contains way's to control the counting of a singular number.
 *
 *	@version	1.0 - 26th July 2013
 *				
 *  @author     Ross Kettle
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.HUD.Components {

    export class Counter extends Kiwi.Component {
        
        /*
        * 
        * @constructor
        * @param {number} initial - Counters initial value
        * @param {number} step - How much the counter should increment/decrement by
        * @return {Kiwi.Components.Counter}
        */
        constructor(initial:number,step:number=1) {
            super(null, "counter");
            this._value = initial;
            this.step = step;

            this.updated = new Kiwi.Signal;
        }

        /*
        * The current value of the counter
        * @private
        */
        private _value:number = 0;

        /*
        * How much the counter should increment/decrement by.
        * @public 
        */
        public step:number;

        /*
        * A Kiwi.Signal that dispatches an event when the changes.
        * @public
        */
        public updated: Kiwi.Signal;

        /*
        * Set allows you to get the current value of the counter
        * Get allows you to change the current value if you pass a value.
        *
        * @method value
        * @param {number} val
        * @return {number}
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
        * @param {number} val
        * @return {number} 
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
        * @method increment
        * @param {number} val
        * @return {number} 
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

