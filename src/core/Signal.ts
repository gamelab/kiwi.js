/**
* 
* @module Kiwi
* 
*/

module Kiwi {

	/**
	* A TypeScript conversion of JS Signals by Miller Medeiros.
	* Released under the MIT license
	* http://millermedeiros.github.com/js-signals/
	*
	* @class Signal
	* @namespace Kiwi
	* @constructor
	* 
	* @author Miller Medeiros, JS Signals
	*/
	export class Signal {

		/**
		* A list of all of the signal bindings that have been attached.
		* @property _bindings
		* @type Array
		* @private
		*/
		private _bindings: SignalBinding[] = [];

		/**
		*  
		* @property _prevParams
		* @type Any
		* @private
		*/
		private _prevParams = null;

		/**
		* Signals Version Number
		* @property VERSION
		* @type String
		* @default '1.0.0'
		* @final
		* @static
		* @public
		*/
		public static VERSION: string = '1.0.0';

		/**
		* If Signal should keep record of previously dispatched parameters.
		* @property memorize
		* @type boolean
		* @default false
		* @public
		*/
		public memorize: boolean = false;

		/**
		* If the callbacks should propagate or not. 
		* @property _shouldPropagate
		* @type boolean
		* @default true
		* @private
		*/
		private _shouldPropagate: boolean = true;

		/**
		* If Signal is active and should broadcast events.
		* Note: Setting this property during a dispatch will only affect the next dispatch, 
		* if you want to stop the propagation of a signal use `halt()` instead.
		* @property active
		* @type boolean
		* @default true
		* @public
		*/
		public active: boolean = true;


		/**
		* Returns the type of this object
		* @method objType
		* @return {String} "Signal"
		* @public
		*/
		public objType() {
			return "Signal";
		}

		/**
		* Validates a event listener an is used to check to see if it is valid or not.
		* An event listener is not valid if it is not a function.
		* If a event listener is not valid, then a Error is thrown. 
		* 
		* @method validateListener
		* @param listener {Any} The event listener to be validated.
		* @param fnName {Any} The name of the function. 
		* @public
		*/
		public validateListener(listener, fnName) {

			if (typeof listener !== 'function')
			{
				throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
			}

		}

		/**
		* Internal Code which handles the registeration of a new callback (known as a "listener").
		* Creates a new SignalBinding for the Signal and then adds the binding to the list by its priority level.
		* 
		* @method _registerListener
		* @param listener {Function} The method that is to be dispatched.
		* @param isOnce {boolean} If the method should only be dispatched a single time or not.
		* @param listenerContext {Object} The context that the callback should be executed with when called.
		* @param priority {Number} The priority of this callback when Bindings are dispatched.
		* @return {Kiwi.SignalBinding} The new SignalBinding that was created.
		* @private
		*/
		private _registerListener(listener, isOnce: boolean, listenerContext, priority: number): SignalBinding {

			var prevIndex: number = this._indexOfListener(listener, listenerContext);
			var binding: SignalBinding;

			if (prevIndex !== -1)
			{
				binding = this._bindings[prevIndex];

				if (binding.isOnce() !== isOnce)
				{
					throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
				}
			}
			else
			{
				binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);

				this._addBinding(binding);
			}

			if (this.memorize && this._prevParams)
			{
				binding.execute(this._prevParams);
			}

			return binding;

		}

		/**
		* Handles the process of adding a new SignalBinding to the bindings list by the new Bindings priority.
		*
		* @method _addBinding
		* @param binding {Kiwi.SignalBinding}
		* @private
		*/
		private _addBinding(binding: SignalBinding) {

			//simplified insertion sort

			var n: number = this._bindings.length;

			do { --n; } while (this._bindings[n] && binding.priority <= this._bindings[n].priority);

			this._bindings.splice(n + 1, 0, binding);

		}

		/**
		* Returns the index of any Binding which matches the listener and context that is passed.
		* If none match then this method returns -1.
		* 
		* @method _indexOfListener
		* @param listener {Function} The method that we are checking to see.
		* @param context {any} The context of the method we are checking.
		* @return {number} The index of listener/context.
		* @private
		*/
		private _indexOfListener(listener, context): number {

			var n: number = this._bindings.length;
			var cur: SignalBinding;

			while (n--)
			{
				cur = this._bindings[n];

				if (cur.getListener() === listener && cur.context === context)
				{
					return n;
				}
			}

			return -1;

		}

		/**
		* Accepts a function and returns a boolean indicating if the function 
		* has already been attached to this Signal.
		*
		* @method has
		* @param listener {Function} The method you are checking for.
		* @param [context=null] {Any} The context of the listener.
		* @return {boolean} If this Signal already has the specified listener.
		* @public
		*/
		public has(listener, context:any = null): boolean {

			return this._indexOfListener(listener, context) !== -1;

		}

		/**
		* Adds a new listener/callback to this Signal. 
		* The listener attached will be executed whenever this Signal dispatches an event. 
		* 
		* @method add
		* @param listener {Function} Signal handler function.
		* @param [listenerContext=null] {Any} Context on which listener will be executed. (object that should represent the `this` variable inside listener function).
		* @param [priority=0] {Number} The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
		* @return {Kiwi.SignalBinding} An Object representing the binding between the Signal and listener.
		* @public
		*/
		public add(listener, listenerContext:any = null, priority: number = 0): SignalBinding {

			this.validateListener(listener, 'add');

			return this._registerListener(listener, false, listenerContext, priority);

		}

		/**
		* Add listener to the signal that should be removed after first execution (will be executed only once).
		*
		* @method addOnce
		* @param listener {Function} Signal handler function.
		* @param [listenerContext=null] {Any} Context on which listener will be executed (object that should represent the `this` variable inside listener function).
		* @param [priority=0] {Number} The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
		* @return {Kiwi.SignalBinding} An Object representing the binding between the Signal and listener.
		* @public
		*/
		public addOnce(listener, listenerContext:any = null, priority: number = 0): SignalBinding {

			this.validateListener(listener, 'addOnce');

			return this._registerListener(listener, true, listenerContext, priority);

		}

		/**
		* Remove a single listener from the dispatch queue.
		*
		* @method remove
		* @param listener {Function} Handler function that should be removed.
		* @param [context=null] {Any} Execution context (since you can add the same handler multiple times if executing in a different context).
		* @return {Function} Listener handler function.
		* @public
		*/
		public remove(listener, context:any = null) {

			this.validateListener(listener, 'remove');

			var i: number = this._indexOfListener(listener, context);

			if (i !== -1)
			{
				this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
				this._bindings.splice(i, 1);
			}

			return listener;

		}

		/**
		* Remove all listeners from the Signal.
		* @method removeAll
		* @public
		*/
		public removeAll() {

			var n: number = this._bindings.length;

			while (n--)
			{
				this._bindings[n]._destroy();
			}

			this._bindings.length = 0;

		}

		/**
		* Returns the number of listeners that have been attached to this Signal.
		* 
		* @method getNumListeners
		* @return {number} Number of listeners attached to the Signal.
		* @public
		*/
		public getNumListeners(): number {

			return this._bindings.length;

		}

		/**
		* Stop propagation of the event, blocking the dispatch to next listeners on the queue.
		* Note: should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.
		*
		* @method halt
		* @public
		*/
		public halt() {

			this._shouldPropagate = false;

		}

		/**
		* Resume propagation of the event, resuming the dispatch to next listeners on the queue.
		* Note: should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.
		*
		* @method resume
		* @public
		*/
		public resume() {

			this._shouldPropagate = true;

		}

		/**
		* Dispatch/Broadcast to all listeners added to this Signal.
		* Parameters passed to this method will also be passed to each handler.
		* 
		* @method dispatch
		* @param [params]* {any} Parameters that should be passed to each handler.
		* @public
		*/
		public dispatch(...paramsArr: any[]) {

			if (!this.active)
			{
				return;
			}

			var n: number = this._bindings.length;
			var bindings: SignalBinding[];

			if (this.memorize)
			{
				this._prevParams = paramsArr;
			}

			if (!n)
			{
				//should come after memorize
				return;
			}

			bindings = this._bindings.slice(0); //clone array in case add/remove items during dispatch

			this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

			//execute all callbacks until end of the list or until a callback returns `false` or stops propagation
			//reverse loop since listeners with higher priority will be added at the end of the list
			do {
				n--;
			} while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);

		}

		/**
		* Forget memorized arguments. See the 'memorize' property.
		* @method forget
		* @public
		*/
		public forget() {

			this._prevParams = null;

		}

		/**
		* Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
		* Note: calling any method on the signal instance after calling dispose will throw errors.
		* @method dispose
		* @public
		*/
		public dispose() {

			this.removeAll();

			delete this._bindings;
			delete this._prevParams;

		}

	}

}
