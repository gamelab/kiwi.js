/**
* Module - Kiwi (Core)
* @module Kiwi
* 
*/
  
module Kiwi {

    /**
    * An object that represents a binding between a Signal and a listener function.
    * Released under the MIT license
    * http://millermedeiros.github.com/js-signals/
    * 
    * @class SignalBinding
    * @namespace Kiwi
    * 
    * @author Miller Medeiros, JS Signals
    * @constructor
    * @internal
    * @name SignalBinding
    * @param {Signal} signal Reference to Signal object that listener is currently bound to.
    * @param {Function} listener Handler function bound to the signal.
    * @param {boolean} isOnce If binding should be executed just once.
    * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
    * @param {Number} [priority=0] The priority level of the event listener. (default = 0).
    *
    */
    export class SignalBinding {

        /**
         * Object that represents a binding between a Signal and a listener function.
         * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
         * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
         * @author Miller Medeiros
         
         */
        constructor(signal: Signal, listener, isOnce: boolean, listenerContext, priority: number = 0) {

            this._listener = listener;
            this._isOnce = isOnce;
            this.context = listenerContext;
            this._signal = signal;
            this.priority = priority || 0;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return String
        * @public
        */
        public objType() {
            return "SignalBinding";
        }

        /**
         * Handler function bound to the signal.
         * @property _listener
         * @type Function
         * @private
         */
        private _listener;

        /**
         * If binding should be executed just once.
         * @property _isOnce
         * @type boolean
         * @private
         */
        private _isOnce: boolean;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @property context
         * @type any
         * @public
         */
        public context;

        /**
         * Reference to Signal object that listener is currently bound to.
         * @property _signal
         * @type Signal
         * @private
         */
        private _signal: Signal;

        /**
         * Listener priority
         * @property priority
         * @type Number
         * @public
         */
        public priority: number;

        /**
         * If binding is active and should be executed.
         * @property active
         * @type boolean
         * @default true
         * @public
         */
        public active: boolean = true;

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @property params
         * @type Any
         * @default null
         * @public
         */
        public params = null;

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @method execute
         * @param {Array} [paramsArr]* Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         * @public
         */
        public execute(paramsArr?: any[]) {

            var handlerReturn;
            var params;

            if (this.active && !!this._listener)
            {
                params = this.params ? this.params.concat(paramsArr) : paramsArr;

                handlerReturn = this._listener.apply(this.context, params);

                if (this._isOnce)
                {
                    this.detach();
                }
            }

            return handlerReturn;

        }

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @method detach
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         * @public
         */
        public detach() {

            return this.isBound() ? this._signal.remove(this._listener, this.context) : null;

        }

        /**
         * @method isBound
         * @return {boolean} `true` if binding is still bound to the signal and have a listener.
         * @public
         */
        public isBound(): boolean {

            return (!!this._signal && !!this._listener);

        }

        /**
         * @method isOnce
         * @return {boolean} If SignalBinding will only be executed once.
         * @public
         */
        public isOnce(): boolean {

            return this._isOnce;

        }

        /**
         * @method getListener
         * @return {Function} Handler function bound to the signal.
         * @public
         */
        public getListener() {

            return this._listener;

        }

        /**
         * @method getSignal
         * @return {Signal} Signal that listener is currently bound to.
         * @public
         */
        public getSignal() {

            return this._signal;

        }

        /**
         * Delete instance properties
         * @method _destory
         * @public
         */
        public _destroy() {

            delete this._signal;
            delete this._listener;
            delete this.context;

        }

        /**
         * @method toString
         * @return {string} String representation of the object.
         * @public
         */
        public toString(): string {

            return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';

        }

    }

}
