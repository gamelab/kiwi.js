/**
* 
* @module Kiwi
* @submodule Utils
*/

module Kiwi.Utils {

    /**
    * Abstracts away the use of RAF or setTimeout for the core game update loop. The callback can be re-mapped on the fly.
    *
    * @class RequestAnimationFrame
    * @constructor
    * @namespace Kiwi.Utils
    * @param callback {Any}
    * @return {RequestAnimationFrame} This object.
    *
    */
    export class RequestAnimationFrame {
 
        constructor (callback) {

            this._callback = callback;

            var vendors = ['ms', 'moz', 'webkit', 'o'];

            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
            {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
            }

        }

        /**
        * The type of obect that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "RequestAnimationFrame";
        }

        /**
        * The callback method that gets executed every time the RAF is executed.
        * @property _callback
        * @type Any
        * @private
        */
        private _callback;

        /**
        * Sets the callback method that is to be executed each time the RAF is.
        * @method setCallback
        * @param {Any} callback
        * @public
        */
        public setCallback(callback) {

            this._callback = callback;

        }

        /**
        * If the RAF is not supported, then this is the ID of the timeout that will be set.
        * @property _timeOutID
        * @type Any
        * @private
        */
        private _timeOutID;

        /**
        * A boolean indicating whether or not we are using setTimeout for the RequestAnimationFrame or not.
        * @property _isSetTimeOut
        * @type boolean
        * @default false
        * @private
        */
        private _isSetTimeOut: boolean = false;

        /**
        * Returns a boolean indicating whether or not setTimeout is being used instead of RAF.
        * @method usingSetTimeOut
        * @return {boolean}
        * @public
        */
        public isUsingSetTimeOut(): boolean {

            return this._isSetTimeOut;

        }

        /**
        * Returns a boolean indicating wheather or not we are using the RAF. If false it means we are using setTimeout for our update loop.
        * @method usingRAF
        * @return {boolean}
        * @public
        */
        public isUsingRAF(): boolean {

            if (this._isSetTimeOut === true)
            {
                return false;
            } else {
                return true;
            }

        }

        /**
        * The last time at which the RAF was called. This is given a value at the end of the RAF loop.
        * @property lastTime
        * @type Number
        * @public
        */
        public lastTime: number = 0;

        /**
        * A timestamp that has the current time. This is updated each time the RAF loop is executed. Is updated before the last time in the loop.
        * @property currentTime
        * @type Number
        * @public
        */
        public currentTime: number = 0;

        /**
        * A boolean indicating whether or not the RAF is running.
        * @property isRunning
        * @type boolean
        * @default false
        * @public
        */
        public isRunning: boolean = false;

        /**
        * Starts the RequestAnimationFrame (or setTimeout if RAF not supported).
        * @method start
        * @param [callback] {Any} A callback to be executed everyframe. Overrides the callback set at instantiation if passed.
        * @public
        */
        public start(callback = null) {

            if (callback)
            {
                this._callback = callback;
            }

            if (!window.requestAnimationFrame)
            {
                this._isSetTimeOut = true;
                this._timeOutID = window.setTimeout(() => this.SetTimeoutUpdate(), 0);
            }
            else
            {
                this._isSetTimeOut = false;
                window.requestAnimationFrame(() => this.RAFUpdate());
            }

            this.isRunning = true;

        }

        /**
        * Stops the RAF from running.
        * @method stop 
        * @public
        */
        public stop() {

            if (this._isSetTimeOut)
            {
                clearTimeout(this._timeOutID);
            }
            else
            {
                window.cancelAnimationFrame;
            }

            this.isRunning = false;

        }

        /**
        * The update loop that the RAF will continuously call.
        * @method RAFUpdate 
        * @public
        */
        public RAFUpdate() {

            //  Not in IE8 (but neither is RAF) also doesn't use a high performance timer (window.performance.now)
            this.currentTime = Date.now();

            if (this._callback)
            {
                this._callback();
            }

            var timeToCall: number = Math.max(0, 16 - (this.currentTime - this.lastTime));

            window.requestAnimationFrame(() => this.RAFUpdate());

            this.lastTime = this.currentTime + timeToCall;

        }

        /**
        * The update loop that the setTimeout method will continuously call.
        * @method SetTimeoutUpdate 
        * @public
        */
        public SetTimeoutUpdate() {

            //  Not in IE8
            this.currentTime = Date.now();

            if (this._callback)
            {
                this._callback();
            }

            var timeToCall: number = Math.max(0, 16 - (this.currentTime - this.lastTime));

            this._timeOutID = window.setTimeout(() => this.SetTimeoutUpdate(), timeToCall);

            this.lastTime = this.currentTime + timeToCall;

        }
        
    }

}
