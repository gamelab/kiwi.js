/// <reference path="Clock.ts" />
/// <reference path="Timer.ts" />

/**
 *  Kiwi - Time - TimerEvent
 *
 *  @desc       
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *  @url        http://www.kiwijs.org
 */

module Kiwi.Time {

    export class TimerEvent {

        /**
        * @constructor
        * @param {Number} type
        * @param {Any} callback
        * @return {Kiwi.Time.TimerEvent} This Object.
        */
        constructor (type:number, callback, context) {

            this.type = type;
            this._callback = callback;
            this._callbackContext = context;

        }

        public objType() {
            return "TimerEvent";
        }

        /**
        * Name for the event fired when a timer starts.
        * @property TIMER_START
        * @constant
        * @type string
        **/
        public static TIMER_START: number = 1;

        /**
        * Name for the event fired when a timer repeats.
        * @property TIMER_COUNT
        * @constant
        * @type string
        **/
        public static TIMER_COUNT: number = 2;

        /**
        * Name for the event fired when a timer stops.
        * @property TIMER_STOP
        * @constant
        * @type string
        **/
        public static TIMER_STOP: number = 3;

        /**
        * The callback to be called when this TimerEvent triggers
        * @property _callback
        * @private
        * @type Function
        **/
        private _callback = null;

        /**
        * The context in which the callback will be fired
        * @property _callbackContext
        * @private
        * @type Function
        **/
        private _callbackContext;

        /**
        * The type of TimerEvent
        * @property type
        * @type Funcation
        **/
        public type: number = 0;
        
        /**
        * Fires the callback associated with this TimerEvent
        * @method run
        **/
        public run() {

            if (this._callback)
            {
                this._callback.apply(this._callbackContext);
            }

        }

    }

}