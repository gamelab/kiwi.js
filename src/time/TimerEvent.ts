/**
* 
* @module Kiwi
* @submodule Time
*
*/ 

module Kiwi.Time {

    /**
    * A TimerEvent hooks into a Timer and is an object that is generated when you are wanting to executed a callback at a specific point in time. 
    *
    * @class TimerEvent
    * @namespace Kiwi.Time
    * @constructor
    * @param type {Number} The type of TimerEvent that this is. 
    * @param callback {Any} The method that is to be executed when the event occurs.
    * @param context {Any} The context that the callback is to be called in.
    * @return {TimerEvent} This Object.
    */
    export class TimerEvent {
         
        constructor (type:number, callback, context) {

            this.type = type;
            this._callback = callback;
            this._callbackContext = context;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "TimerEvent";
        }

        /**
        * Name for the event fired when a timer starts.
        * @property TIMER_START
        * @type number
        * @final
        * @static
        * @public
        * @default 1
        */
        public static TIMER_START: number = 1;

        /**
        * Name for the event fired when a timer repeats.
        * @property TIMER_COUNT
        * @public
        * @type string
        * @final
        * @static
        * @default 2
        */
        public static TIMER_COUNT: number = 2;

        /**
        * Name for the event fired when a timer stops.
        * @property TIMER_STOP
        * @type string
        * @final
        * @static
        * @public
        * @default 3
        */
        public static TIMER_STOP: number = 3;

        /**
        * The callback to be called when this TimerEvent triggers
        * @property _callback
        * @type Function
        * @private
        */
        private _callback = null;

        /**
        * The context in which the callback will be fired
        * @property _callbackContext
        * @type Function
        * @private
        */
        private _callbackContext;

        /**
        * The type of TimerEvent
        * @property type
        * @type Function 
        * @public
        */
        public type: number = 0;
        
        /**
        * Fires the callback associated with this TimerEvent
        * @method run
        * @public
        */
        public run() {

            if (this._callback)
            {
                this._callback.apply(this._callbackContext);
            }

        }

    }

}