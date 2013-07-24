

module Kiwi.Components {

   
    export class Counter extends Kiwi.Component {
        // Constructor
        constructor(initial:number,step:number) {
            super("counter", true, true, true);
            this._value = initial;
            this.step = step;

            //could add updated signal here
        }

        public _value:number = 0;

        public step:number;


        public value(val?: number):number {
            if (val !== undefined) {
                this._value = val;
            }

            return this._value;
        }

        public increment(val?: number) {
            if (val !== undefined) {
                this._value += val;
            } else {
                this._value += this.step;
            }
        
        }

        public decrement(val?: number) {
            if (val !== undefined) {
                this._value -= val;
            } else {
                this._value -= this.step;
            }
        }
     
    }

}

