/**
* 
* @module Kiwi
* @submodule Input
* 
*/

module Kiwi.Input {

	/**
	* Handles the dispatching/management of Mouse Events on a game. When this class is instantiated a MouseCursor object is also created (on this object) which holds the information that is unique to the mouse cursor, although majority of that information is still accessible inside this object.
	*
	* @class Mouse
	* @constructor
	* @namespace Kiwi.Input
	* @param game {Kiwi.Game} The game that this mouse manager belongs to.
	* @return {Kiwi.Input.Mouse} 
	*
	*/
	export class Mouse {

		constructor (game: Kiwi.Game) {
			this._game = game;
		}

		/**
		* The type of object that this is.
		* @method objType
		* @return {String} "Mouse"
		* @public
		*/
		public objType() {
			return "Mouse";
		}

		/**
		* The game that this mouse manager belongs to.
		* @property _game
		* @type Kiwi.Game
		* @private
		*/
		private _game: Kiwi.Game;

		/**
		* The HTMLElement that is being used to apply the mouse events to.
		* @property _domElement
		* @type HTMLDivElement
		* @private
		*/
		private _domElement:HTMLDivElement = null;

		/**  
		* The numeric value for the LEFT button.
		* @property LEFT_BUTTON
		* @type Number
		* @static
		* @public
		* @final
		* @default 0
		*/
		public static LEFT_BUTTON: number = 0;

		/**  
		* The numeric value for the MIDDLE button.
		* @property MIDDLE_BUTTON
		* @type Number
		* @static
		* @public 
		* @final
		* @default 1
		*/
		public static MIDDLE_BUTTON: number = 1;

		/**  
		* The numeric value for the RIGHT button.
		* @property RIGHT_BUTTON
		* @type Number
		* @static
		* @public
		* @final 
		* @default 2
		*/
		public static RIGHT_BUTTON: number = 2;

		/**
		* A Signal that dispatches events when the mouse is pressed down on the stage.
		* @property onDown 
		* @type Kiwi.Signal
		* @public
		*/
		public onDown: Kiwi.Signal;

		/**
		* A Signal that dispatches events when the mouse is released from being down on the stage.
		* @property onUp 
		* @type Kiwi.Signal
		* @public
		*/
		public onUp: Kiwi.Signal;

		/**
		* A Signal that dispatches events mouse wheel moves.
		* @property onWheel 
		* @type Kiwi.Signal
		* @public
		*/
		public onWheel: Kiwi.Signal;

		/**
		* The MouseCursor that is on the stage. This contains the coordinates and information about the cursor.
		* @property _cursor
		* @type Kiwi.Input.MouseCursor
		* @private
		*/
		private _cursor: Kiwi.Input.MouseCursor;

		/**
		* Returns the MouseCursor that is being used on the stage. This is READ ONLY.
		* @property cursor
		* @type Kiwi.Input.MouseCursor
		* @private
		*/
		public get cursor(): Kiwi.Input.MouseCursor {
			return this._cursor;
		}

		/** 
		* This method is executed when the DOM has finished loading and thus the MouseManager can start listening for events.
		* @method boot
		* @public
		*/
		public boot() {

			this._domElement = this._game.stage.container;

			this._cursor = new Kiwi.Input.MouseCursor(this._game);
			this._cursor.active = true;
			this._cursor.id = 1;
			
			this.onDown = new Kiwi.Signal();
			this.onUp = new Kiwi.Signal();
            this.onWheel = new Kiwi.Signal();
            this.onContext = new Kiwi.Signal();

			this.start();
		}

		/**
		* Indicates whether or not the cursor is currently down. This is READ ONLY.
		* @property isDown
		* @type boolean
		* @default false
		* @public
		*/
		public get isDown(): boolean {
			return this._cursor.isDown;
		}

		/**
		* Indicates whether or not the cursor is currently up. This is READ ONLY.
		* @property isUp
		* @type boolean
		* @default true
		* @public
		*/
		public get isUp(): boolean {
			return this._cursor.isUp;
		}

		/**
		* Gets the duration in Milliseconds that the mouse cursor has either been up or down for.
		* @property duration
		* @type number
		* @public
		*/
		public get duration(): number {
			return this._cursor.duration;
		}

		/**
		* Gets the x coordinate of the mouse cursor.
		* @property x
		* @type number
		* @public
		*/
		public get x(): number {
			return this._cursor.x;
		}

		/**
		* Gets the y coordinate of the mouse cursor.
		* @property y
		* @type number
		* @public
		*/
		public get y(): number {
			return this._cursor.y;
		}

		/**
		* Gets the wheelDeltaX coordinate of the mouse cursors wheel.
		* @property wheelDeltaX
		* @type number
		* @public
		*/
		public get wheelDeltaX(): number {
			return this._cursor.wheelDeltaX;
		}

		/**
		* Gets the wheelDeltaY coordinate of the mouse cursors wheel.
		* @property wheelDeltaY
		* @type number
		* @public
		*/
		public get wheelDeltaY(): number {
			return this._cursor.wheelDeltaY;
		}

		/**
		* Indicates if the ctrl key is down.
		* @property ctrlKey
		* @type boolean
		* @default false
		* @public
		*/
		public get ctrlKey(): boolean {
			return this._cursor.ctrlKey;
		}

		/**
		* Indicates if the shift key is down.
		* @property shiftKey
		* @type boolean
		* @default false
		* @public
		*/
		public get shiftKey(): boolean {
			return this._cursor.shiftKey;
		}

		/**
		* Indicates if the alt key is down.
		* @property altKey
		* @type boolean
		* @default false
		* @public
		*/
		public get altKey(): boolean {
			return this._cursor.altKey;
		}

		/**
		* Returns a number indicating the button that was used. This can be used with the STATIC button properties.
		* @property button
		* @type number
		* @public
		*/
		public get button(): number {
			return this._cursor.button;
		}

		/**
		* The update loop for the cursor.
		* @method update
		* @public
		*/
		public update() { 
			this._cursor.update();
		}

		/**  
		* Start the mouse event listeners on the game. Automatically called by the boot.
		* @method start 
		* @public
		*/
        public start() {

            this._onMouseDownBind = this.onMouseDown.bind(this);
            this._onMouseMoveBind = this.onMouseMove.bind(this);
            this._onMouseUpBind = this.onMouseUp.bind(this);
            this._onMouseWheelBind = this.onMouseWheel.bind(this);
            this._onContextMenuBind = this.onContextMenu.bind(this);

            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {

                this._domElement.addEventListener('mousedown', this._onMouseDownBind, true);
                this._domElement.addEventListener('mousemove', this._onMouseMoveBind, true);
                this._domElement.addEventListener('mouseup', this._onMouseUpBind, true);
                this._domElement.addEventListener('mousewheel', this._onMouseWheelBind, true);
                this._domElement.addEventListener('DOMMouseScroll', this._onMouseWheelBind, true);
                this._domElement.addEventListener('contextmenu', this._onContextMenuBind, true);

			} else if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
                this._game.stage.canvas.addEventListener('mousedown', this._onMouseDownBind, true);
                this._game.stage.canvas.addEventListener('mousemove', this._onMouseMoveBind, true);
                this._game.stage.canvas.addEventListener('mouseup', this._onMouseUpBind, true);
                this._game.stage.canvas.addEventListener('mousewheel', this._onMouseWheelBind, true);
                this._game.stage.canvas.addEventListener('DOMMouseScroll', this._onMouseWheelBind, true);
            }

        }

		/**  
		* Stops the mouse event listeners from working. Useful if you no longer want the mouse to 'work'/be listened to.
		* @method stop 
		* @public
		*/
        public stop() {

            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {

                this._domElement.removeEventListener('mousedown', this._onMouseDownBind, true);
                this._domElement.removeEventListener('mousemove', this._onMouseMoveBind, true);
                this._domElement.removeEventListener('mouseup', this._onMouseUpBind, true);
                this._domElement.removeEventListener('mousewheel', this._onMouseWheelBind, true);
                this._domElement.removeEventListener('DOMMouseScroll', this._onMouseWheelBind, true);
                this._domElement.removeEventListener('contextmenu', this._onContextMenuBind, true);

            } else if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
                this._game.stage.canvas.removeEventListener('mousedown', this._onMouseDownBind, true);
                this._game.stage.canvas.removeEventListener('mousemove', this._onMouseMoveBind, true);
                this._game.stage.canvas.removeEventListener('mouseup', this._onMouseUpBind, true);
                this._game.stage.canvas.removeEventListener('mousewheel', this._onMouseWheelBind, true);
                this._game.stage.canvas.removeEventListener('DOMMouseScroll', this._onMouseWheelBind, true);
            }

            delete this._onMouseDownBind;
            delete this._onMouseMoveBind;
            delete this._onMouseUpBind;
            delete this._onMouseWheelBind;
            delete this._onContextMenuBind;

        }


		/**  
		* Method that gets fired when the mouse is pressed on the stage.
		* @method onMouseDown
		* @param {MouseEvent} event. 
		* @private
		*/
		private onMouseDown(event: MouseEvent) { 
			this._cursor.start(event); 
			this.onDown.dispatch(this._cursor.x, this._cursor.y, this._cursor.timeDown, this._cursor.timeUp, this.duration, this._cursor); 
		}

		/**  
		* Method that gets fired when the mouse moves anywhere on the stage.
		* @method onMouseMove
		* @param {MouseEvent} event. 
		* @private
		*/
		private onMouseMove(event: MouseEvent) {
			event.preventDefault();
			this._cursor.move(event);
		}

		/**  
		* Method that gets fired when the mouse is released on the stage.
		* @method onMouseUp
		* @param {MouseEvent} event. 
		* @private
		*/
		private onMouseUp(event: MouseEvent) {
			this._cursor.stop(event);
			this.onUp.dispatch(this._cursor.x, this._cursor.y, this._cursor.timeDown, this._cursor.timeUp, this.duration, this._cursor); 
		}

		/**  
		* Method that gets fired when the mousewheel is moved.
		* @method onMouseWheel
		* @param {MouseEvent} event. 
		* @private
		*/
		private onMouseWheel(event: WheelEvent) {
			this._cursor.wheel(event);
			this.onWheel.dispatch(this._cursor.wheelDeltaX, this._cursor.wheelDeltaY, this._cursor);
		}

		/**  
		* Returns a boolean indicating if the mouse was 'justPressed' within a certain timeframe. The default timeframe is 200 milliseconds.
		* @method justPressed
		* @param [duration=200] {Number} The timeframe that it could have occured in. 
		* @return {boolean}
		* @public
		*/
		public justPressed(duration: number = this._cursor.justPressedRate): boolean { 
			return this._cursor.justPressed(duration);
		}

		/**  
		* Returns a boolean indicating if the mouse was 'justReleased' within a certain timeframe. The default timeframe is 200 milliseconds.
		* @method justReleased
		* @param [duration=200] {Number} The timeframe that it could have occured in.. 
		* @return {boolean}
		* @public
		*/
		public justReleased(duration: number = this._cursor.justReleasedRate): boolean { 
			return this._cursor.justReleased(duration); 
		}

		/** 
		* Runs the Reset method on the MouseCursor.
		* @method reset
		* @public
		*/
		public reset() {
			this._cursor.reset();
        }

        /**
        * Dispatches events when the context menu is fired. 
        *
        * Functions fired from this Signal will have the a single argument
        * being the event of the 'contextmenu' gives. 
        * 
        * @property onContext
        * @type Kiwi.Signal
        * @since 1.3.0
        * @public
        */
        public onContext: Kiwi.Signal;

        /**
        * Determines whether or not the context menu should appear 
        * when the user 'right clicks' on the stage.
        *
        * Only has an effect on games targetting browsers.
        * 
        * @property preventContextMenu
        * @type Boolean
        * @default false
        * @since 1.3.0
        * @public
        */
        public preventContextMenu: boolean = false;

        /**
        * Fired when the context menu event is fired. 
        * Used to prevent the context menu from appearing when the 
        * 'preventContextMenu' property is set to true.
        *
        * This event is currently only used when targetting browsers and will not fire for CocoonJS.
        * 
        * @method onContextMenu
        * @param event 
        * @since 1.3.0
        * @private
        */
        private onContextMenu(event) {
            if (this.preventContextMenu) {
                event.preventDefault();
            }

            this.onContext.dispatch(event);
        }

        /**
        * The binding of the 'onMouseDown' method. 
        * 
        * @property _onMouseDownBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onMouseDownBind;

        /**
        * The binding of the 'onMouseMove' method. 
        * 
        * @property _onMouseMoveBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onMouseMoveBind;

        /**
        * The binding of the 'onMouseUp' method. 
        * 
        * @property _onMouseUpBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onMouseUpBind;

        /**
        * The binding of the 'onMouseWheel' method. 
        * 
        * @property onMouseWheel
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onMouseWheelBind;

        /**
        * The binding of the 'onContextMenu' method. 
        * 
        * @property _onContextMenuBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onContextMenuBind;

	}

}
