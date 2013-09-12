/**
* Kiwi - Utils
* @module Kiwi
* @submodule Utils
*/

module Kiwi.Utils {

    /**
    * Abstracts away the use of RAF or setTimeout for the core game update loop. The callback can be re-mapped on the fly.
    *
    * @class RequestAnimationFrame
    *
    */
    export class RequestAnimationFrame {

        /** 
        * Constructor
        * @param {Any} callback
        * @return {Kiwi.Utils.RequestAnimationFrame} This object.
        */
        constructor (callback) {

            this._callback = callback;

            var vendors = ['ms', 'moz', 'webkit', 'o'];

            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
            {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
            }

        }

        public objType() {
            return "RequestAnimationFrame";
        }

        /**
        * 
        * @property _callback
        * @type Any
        * @private
        **/
        private _callback;

        /**
        * 
        * @method callback
        * @param {Any} callback
        **/
        public setCallback(callback) {

            this._callback = callback;

        }

        /**
        * 
        * @property _timeOutID
        * @type Any
        * @private
        **/
        private _timeOutID;

        /**
        * 
        * @property _isSetTimeOut
        * @type boolean
        * @private
        **/
        private _isSetTimeOut: boolean = false;

        /**
        * 
        * @method usingSetTimeOut
        * @return boolean
        **/
        public isUsingSetTimeOut(): boolean {

            return this._isSetTimeOut;

        }

        /**
        * 
        * @method usingRAF
        * @return boolean
        **/
        public isUsingRAF(): boolean {

            if (this._isSetTimeOut === true)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        /**
        * 
        * @property lastTime
        * @type Number
        **/
        public lastTime: number = 0;

        /**
        * 
        * @property currentTime
        * @type Number
        **/
        public currentTime: number = 0;

        /**
        * 
        * @property isRunning
        * @type boolean
        **/
        public isRunning: boolean = false;

        /**
        * 
        * @method start
        * @param {Any} [callback] 
        **/
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
        * 
        * @method stop 
        **/
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
        * 
        * @method RAFUpdate 
        **/
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
        * 
        * @method SetTimeoutUpdate 
        **/
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
