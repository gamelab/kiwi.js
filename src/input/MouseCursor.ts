/**

@module Kiwi
@submodule Input

**/

module Kiwi.Input {

	/**
	Holds the information about a Mouse Cursor, such as the position of the
	cursor, the mouse wheel's delta, the button that was used, etc.

	Note: A mouse cursor is always active.

	@class MouseCursor
	@namespace Kiwi.Input
	@extends Pointer
	**/
	export class MouseCursor extends Pointer {

		/**
		Type of object this class is

		@method objType
		@return {string} "MouseCursor"
		@public
		**/
		public objType(): string {
			return "MouseCursor";
		}

		/**
		Horizontal offset of the mouse wheel

		@property wheelDeltaX
		@type number
		@default 0
		@public
		**/
		public wheelDeltaX: number = 0;

		/**
		Vertical offset of the mouse wheel

		@property wheelDeltaY
		@type number
		@default 0
		@public
		**/
		public wheelDeltaY: number = 0;

		/**
		If the ctrl key is down

		@property ctrlKey
		@type boolean
		@public
		**/
		public ctrlKey: boolean;

		/**
		If the shift key is down

		@property shiftKey
		@type boolean
		@public
		**/
		public shiftKey: boolean;

		/**
		If the alt key is down

		@property altKey
		@type boolean
		@public
		**/
		public altKey: boolean;

		/**
		Button that was last toggled.

		- 0: Left or main mouse button
		- 1: Middle or scroll wheel mouse button
		- 2: Right or secondary mouse button

		Note that this is the last button to go down, or up.
		For example, if you clicked the left button down, clicked the middle
		button down, released the middle button, then released the left button,
		this value would follow the sequence 0, 1, 1, 0.

		@property button
		@type number
		@public
		**/
		public button: number;

		/**
		Indicates if the `preventDefault` method should be executed
		whenever a "down" mouse event occurs

		@property preventDown
		@type boolean
		@default true
		@public
		**/
		public preventDown: boolean = true;

		/**
		Indicates if the `preventDefault` method should be executed
		whenever an "up" mouse event occurs

		@property preventUp
		@type boolean
		@default true
		@public
		**/
		public preventUp: boolean = true;

		/**
		Indicates if the `preventDefault` method should be executed
		whenever a "wheel" mouse event occurs

		@property preventWheel
		@type boolean
		@default true
		@public
		**/
		public preventWheel: boolean = true;

		/**
		Execute when the mouse cursor gets initially pressed.

		@method start
		@param {Event} System mouse event
		@public
		**/
		public start( event ) {

			if ( this.preventDown ) {
				event.preventDefault();
			}

			this.ctrlKey = event.ctrlKey;
			this.shiftKey = event.shiftKey;
			this.altKey = event.altKey;
			this.button = event.button;

			super.start( event );
		}

		/**
		Execute when the mouse cursor gets released.

		@method stop
		@param {Event} System mouse event
		@public
		**/
		public stop( event ) {

			if ( this.preventUp ) {
				event.preventDefault();
			}

			this.button = event.button;

			this.move( event );
			super.stop( event );
		}

		/**
		Execute when the mouse cursor gets moved.

		This ensures that key modifiers are more accurately updated.

		@method move
		@param {Event} System mouse event
		@public
		**/
		public move ( event ) {

			super.move( event );

			this.ctrlKey = event.ctrlKey;
			this.shiftKey = event.shiftKey;
			this.altKey = event.altKey;
		}

		/**
		When the mouse wheel event fires and the mouse's delta changes.

		@method wheel
		@param {Event} System mouse event
		@public
		**/
		public wheel( event ) {

			if ( this.preventWheel ) {
				event.preventDefault();
			}

			if ( event[ "wheelDeltaX" ] ) {
				this.wheelDeltaX = event[ "wheelDeltaX" ];
			} else {
				this.wheelDeltaX = event.deltaX;
			}

			if (event[ "wheelDeltaY" ] ) {
				this.wheelDeltaY = event[ "wheelDeltaY" ];
			} else {
				this.wheelDeltaY = event.deltaY;
			}
		}

	}

}
