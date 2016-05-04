/**
@module Kiwi
@submodule Utils
**/

module Kiwi.Utils {
	export class RequestAnimationFrame {

		/**
		Abstracts away the use of `requestAnimationFrame` or `setTimeout`
		for the core game update loop. The callback can be remapped on the fly.

		@class RequestAnimationFrame
		@constructor
		@namespace Kiwi.Utils
		@param callback {function}
		**/

		constructor ( callback ) {

			this._callback = callback;

			var vendors = [ "ms", "moz", "webkit", "o" ];

			for (
				var x = 0;
				x < vendors.length && !window.requestAnimationFrame;
				x++ ) {

				window.requestAnimationFrame =
					window[ vendors[ x ] + "RequestAnimationFrame" ];
				window.cancelAnimationFrame =
					window[ vendors[ x ] + "CancelAnimationFrame" ];
			}

		}

		/**
		Return the type of obect that this is.

		@method objType
		@return {string} "RequestAnimationFrame"
		@public
		**/
		public objType() {
			return "RequestAnimationFrame";
		}

		/**
		Callback method that gets executed every time this updates.

		@property _callback
		@type Any
		@private
		**/
		private _callback;

		public setCallback( callback ) {

			/**
			Set the callback method to be executed each time this updates.

			@method setCallback
			@param {function} callback
			@public
			**/

			this._callback = callback;

		}

		/**
		If `requestAnimationFrame` is not supported,
		then this is the ID of the timeout that will be set

		@property _timeOutID
		@type number
		@private
		**/
		private _timeOutID;

		/**
		Whether we are using `setTimeout` to schedule updates.

		@property _isSetTimeOut
		@type boolean
		@default false
		@private
		**/
		private _isSetTimeOut: boolean = false;

		public isUsingSetTimeOut(): boolean {

			/**
			Return a boolean indicating whether `setTimeout` is being used
			instead of `requestAnimationFrame`.

			@method usingSetTimeOut
			@return {boolean}
			@public
			**/

			return this._isSetTimeOut;

		}

		public isUsingRAF(): boolean {

			/**
			Return a boolean indicating wheather we are using the browser's
			`requestAnimationFrame` method to schedule updates.
			If `false` it means we are using `setTimeout` for our update loop.

			@method usingRAF
			@return {boolean}
			@public
			**/

			if ( this._isSetTimeOut === true ) {
				return false;
			} else {
				return true;
			}

		}

		/**
		Last time at which the RAF was called.
		This is given a value at the end of the RAF loop.

		@property lastTime
		@type number
		@public
		**/
		public lastTime: number = 0;

		/**
		Timestamp that has the current time.
		This is updated each time the RAF loop is executed.
		Is updated before `lastTime` in the loop.

		@property currentTime
		@type number
		@public
		**/
		public currentTime: number = 0;

		/**
		Whether the RAF is running

		@property isRunning
		@type boolean
		@default false
		@public
		**/
		public isRunning: boolean = false;

		/**
		ID of the RAF, used to stop the RAF

		@property _rafId
		@type number
		@default null
		@private
		**/
		private _rafId = null;

		public start( callback = null ) {

			/**
			Start the animation frame loop.

			@method start
			@param [callback] {function} Callback to be executed every frame.
				Overrides the callback set at instantiation if passed.
			@public
			**/

			if ( callback ) {
				this._callback = callback;
			}

			if ( !window.requestAnimationFrame ) {
				this._isSetTimeOut = true;
				this._timeOutID =
					window.setTimeout( () => this.SetTimeoutUpdate(), 0 );
			} else {
				this._isSetTimeOut = false;
				this._rafId =
					window.requestAnimationFrame( () => this.RAFUpdate() );
			}

			this.isRunning = true;

		}

		public stop() {

			/**
			Stop the RAF from running.

			@method stop
			@public
			**/

			if ( this._isSetTimeOut ) {
				clearTimeout( this._timeOutID );
			} else {
				window.cancelAnimationFrame( this._rafId );
			}

			this.isRunning = false;

		}

		public RAFUpdate() {

			/**
			Update via `requestAnimationFrame`.
			This method is called automatically when using
			`requestAnimationFrame` to control frame updates.
			This is the default method.

			@method RAFUpdate
			@public
			**/

			// Not in IE8 (but neither is RAF).
			// Also doesn't use a high performance timer
			// (`window.performance.now`).
			this.currentTime = Date.now();

			if ( this._callback ) {
				this._callback();
			}

			var timeToCall: number =
				Math.max( 0, 16 - ( this.currentTime - this.lastTime ) );

			if ( this.isRunning ) {
				this._rafId =
					window.requestAnimationFrame( () => this.RAFUpdate() );
			}

			this.lastTime = this.currentTime + timeToCall;

		}

		public SetTimeoutUpdate() {

			/**
			Update via the `setTimeout` method.
			This method is called automatically when using `setTimeout`
			to control animation frames.

			@method SetTimeoutUpdate
			@public
			**/

			//  Not in IE8
			this.currentTime = Date.now();

			if ( this._callback ) {
				this._callback();
			}

			var timeToCall: number =
				Math.max( 0, 16 - ( this.currentTime - this.lastTime ) );

			if ( this.isRunning ) {
				this._timeOutID =
					window.setTimeout(
						() => this.SetTimeoutUpdate(), timeToCall );
			}

			this.lastTime = this.currentTime + timeToCall;

		}

	}

}
