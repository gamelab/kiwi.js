/**
* 
* @module Kiwi
* @submodule Components 
* 
*/

module Kiwi.Components {

	/**
	* `Input` adds interaction to `GameObjects` via `Mouse` and/or `Touch`.
	* Callbacks and methods are supplied to ease interaction.
	*
	* By default, `Input` components are disabled, as they are process
	* intensive. You may enable input by calling `enabled = true`.
	* Alternatively, the game will automagically enable input
	* once you access any `Signal`. Be careful when enumerating
	* properties on this component, and be prepared to disable
	* input again.
	*
	* `GameObjects.Sprite` comes with an `Input` component.
	* Other `GameObjects` do not.
	*
	* @class Input
	* @extends Kiwi.Component
	* @namespace Kiwi.Components
	* @constructor
	* @param owner {Object} Object, generally `Entity`, to own this
	*	input component
	* @param box {Kiwi.Components.Box} Box which contains the `worldHitbox`
	*	used for input detection
	* @param [enabled=false] {boolean} Whether to enable this component
	* @return {Kiwi.Components.Input}
	*/
	export class Input extends Component {

		constructor(
				owner:Kiwi.IChild,
				box:Kiwi.Components.Box,
				enabled:boolean = false ) {

			super( owner, "Input" );

			//  Signals
			this._onEntered = new Kiwi.Signal();
			this._onLeft = new Kiwi.Signal();
			this._onDown = new Kiwi.Signal();
			this._onUp = new Kiwi.Signal();
			this._onDragStarted = new Kiwi.Signal();
			this._onDragStopped = new Kiwi.Signal();

			//  Properties
			this._box = box;

			this._distance = new Kiwi.Geom.Point();

			this._withinBounds = null;
			this._outsideBounds = true;

			this._isUp = true;
			this._isDown = null;
			this._isDragging = null;
			this._justEntered = false;
			this._tempDragDisabled = false;

			this._tempPoint = new Kiwi.Geom.Point();
			this._tempCircle = new Kiwi.Geom.Circle( 0, 0, 0 );

			this.enabled = enabled;
		}

		/**
		* The type of object this input is.
		* @method objType
		* @return {string} "Input"
		* @public
		*/
		public objType() {
			return "Input";
		}

		/**
		* Bounding box that is being used for the hit area
		* @property _box
		* @type Kiwi.Components.Box
		* @private
		*/
		private _box: Kiwi.Components.Box;

		/**
		* Fires callbacks when a pointer is active
		* and has entered the entity's hitbox
		* @property _onEntered
		* @type Kiwi.Signal
		* @private
		*/
		private _onEntered: Kiwi.Signal;

		/**
		* Fires callbacks when a pointer is active
		* and has left the entity's hit box
		* @property _onLeft
		* @type Kiwi.Signal
		* @private
		*/
		private _onLeft: Kiwi.Signal;

		/**
		* Fires callbacks when a pointer is active
		* and just pressed down on the entity
		* @property _onDown
		* @type Kiwi.Signal
		* @private
		*/
		private _onDown: Kiwi.Signal;

		/**
		* Fires callbacks when a pointer just released,
		* either directly above the entity,
		* or after having been pressed down above the entity.
		* @property _onUp
		* @type Kiwi.Signal
		* @private
		*/
		private _onUp: Kiwi.Signal;

		/**
		* Fires callbacks when the entity starts being dragged
		* @property _onDragStarted
		* @type Kiwi.Signal
		* @private
		*/
		private _onDragStarted: Kiwi.Signal;

		/**
		* Fires callbacks when the entity stops being dragged,
		* such as on release
		* @property _onDragStopped
		* @type Kiwi.Signal
		* @private
		*/
		private _onDragStopped: Kiwi.Signal;

		/**
		* Temporary Point used to check for overlap
		* @property _tempPoint
		* @type Kiwi.Geom.Point
		* @private
		*/
		private _tempPoint: Kiwi.Geom.Point;

		/**
		* Temporary Circle used to check for overlap
		* @property _tempCircle
		* @type Kiwi.Geom.Circle
		* @private
		*/
		private _tempCircle: Kiwi.Geom.Circle;

		/**
		* Fires callbacks when a pointer is active
		* and has entered the entity's hitbox.
		*
		* Note: Accessing this signal enables the input.
		*
		* This is READ ONLY.
		*
		* @property onEntered
		* @type Kiwi.Signal
		* @public
		*/
		public get onEntered(): Kiwi.Signal {
			if ( this.enabled == false ) {
				this.enabled = true;
			}
			return this._onEntered;
		}

		/**
		* Fires callbacks when a pointer is active
		* and has left the entity's hit box.
		*
		* Note: Accessing this signal enables the input.
		*
		* This is READ ONLY.
		*
		* @property onLeft
		* @type Kiwi.Signal
		* @public
		*/
		public get onLeft(): Kiwi.Signal {
			if ( this.enabled == false ) {
				this.enabled = true;
			}
			return this._onLeft;
		}

		/**
		* Fires callbacks when a pointer is active
		* and just pressed down on the entity.
		*
		* Note: Accessing this signal enables the input.
		*
		* This is READ ONLY.
		*
		* @property onDown
		* @type Kiwi.Signal
		* @public
		*/
		public get onDown(): Kiwi.Signal {
			if ( this.enabled == false ) {
				this.enabled = true;
			}
			return this._onDown;
		}

		/**
		* Fires callbacks when a pointer just released,
		* either directly above the entity,
		* or after having been pressed down above the entity.
		*
		* Note: Accessing this signal enables the input.
		*
		* This is READ ONLY.
		*
		* @property onUp
		* @type Kiwi.Signal
		* @public
		*/
		public get onUp(): Kiwi.Signal {
			if ( this.enabled == false ) {
				this.enabled = true;
			}
			return this._onUp;
		}

		/**
		* Fires callbacks when the entity starts being dragged.
		*
		* This is READ ONLY.
		*
		* @property onDragStarted
		* @type Kiwi.Signal
		* @public
		*/
		public get onDragStarted(): Kiwi.Signal { return this._onDragStarted; }

		/**
		* Fires callbacks when the entity stops being dragged,
		* such as on release.
		*
		* This is READ ONLY.
		*
		* @property onDragStopped
		* @type Kiwi.Signal
		* @public
		*/
		public get onDragStopped(): Kiwi.Signal { return this._onDragStopped; }

		/**
		* Alias for `onUp`.
		*
		* This is READ ONLY.
		*
		* @property onRelease
		* @type Kiwi.Signal
		* @public
		*/
		public get onRelease():Kiwi.Signal {
			return this.onUp;
		}

		/**
		* Alias for `onDown`.
		*
		* This is READ ONLY.
		*
		* @property onPress
		* @type Kiwi.Signal
		* @public
		*/
		public get onPress(): Kiwi.Signal {
			return this.onDown;
		}

		/**
		* Whether this input is enabled
		* @property _enabled
		* @type boolean
		* @default false
		* @private
		*/
		private _enabled: boolean;

		/**
		* Whether this input is enabled.
		*
		* Note: Inputs should only be enabled when needed,
		* as they can use processing power and slow the game down.
		* @property enabled
		* @type boolean
		* @public
		*/
		public get enabled(): boolean {
			return this._enabled;
		}
		public set enabled( val: boolean ) {

			// Perhaps later the signals should only be set
			// if the input is enabled.
			this._enabled = val;
		}

		/**
		* If a pointer is current pressing down on the input,
		* this will be a reference to that pointer. Otherwise it will be null.
		* @property _isDown
		* @type Kiwi.Input.Pointer
		* @default null
		* @private
		*/
		private _isDown: Kiwi.Input.Pointer;

		/**
		* Whether no pointer is down on the pointer.
		* Opposite of `_isDown`.
		* @property _isUp
		* @type boolean
		* @default true
		* @private
		*/
		private _isUp: boolean;

		/**
		* Whether a pointer is within hitbox bounds.
		* Refers to a pointer within hitbox bounds, or `null`.
		* @property _withinBounds
		* @type Kiwi.Input.Pointer
		* @default null
		* @private
		*/
		private _withinBounds: Kiwi.Input.Pointer;

		/**
		* Whether every pointer is currently outside of the bounds
		* @property _outsideBounds
		* @type boolean
		* @default true
		* @private
		*/
		private _outsideBounds: boolean;

		/**
		* If a pointer just entered the input.
		* Used for mouses to indicate when to fire the down event.
		* Note: Could be removed once mouse version of update gets updated.
		* @property _justEntered
		* @type boolean
		* @default false
		* @private
		*/
		private _justEntered: boolean;

		/**
		* Whether a pointer is currently on this input.
		*
		* This is READ ONLY.
		*
		* @property isDown
		* @type boolean
		* @public
		*/
		public get isDown(): boolean {
			return ( this._isDown !== null );
		}

		/**
		* Whether no pointer is on this input (so it is up).
		*
		* This is READ ONLY.
		*
		* @property isUp
		* @type boolean
		* @public
		*/
		public get isUp(): boolean {
			return this._isUp;
		}

		/**
		* Whether any pointer is within the bounds of this entity.
		*
		* This is READ ONLY.
		*
		* @property withinBounds
		* @type boolean
		* @public
		*/
		public get withinBounds(): boolean {
			return ( this._withinBounds !== null );
		}

		/**
		* Whether no pointers are within the bounds of this entity.
		*
		* This is READ ONLY.
		*
		* @property outsideBounds
		* @type boolean
		* @public
		*/
		public get outsideBounds(): boolean {
			return this._outsideBounds;
		}

		/**
		* Reference to the pointer that is currently "dragging" this Object. 
		* If not dragging then this is null.
		* @property _isDragging
		* @type Kiwi.Input.Pointer
		* @default null
		* @private
		*/
		private _isDragging: Kiwi.Input.Pointer = null;

		/**
		* Distance between the top left corner of this object's parent
		* and the coordinates of a Pointer.
		* @property _distance
		* @type Kiwi.Geom.Point
		* @private
		*/
		private _distance: Kiwi.Geom.Point;

		/**
		* Whether dragging is temporarly disabled.
		* Internal use only to stop events from misfiring.
		* @property _tempDragDisabled
		* @type boolean
		* @private
		*/
		private _tempDragDisabled: boolean;

		/**
		* Whether dragging is currently enabled.
		* @property _dragEnabled
		* @type boolean
		* @default false
		* @private
		*/
		private _dragEnabled: boolean = false;

		/**
		* Used while dragging so that you can make the IChild "snap"
		* to specific numbers to give a grid-like effect.
		*
		* E.g. If you had a 32 by 32 grid and you wanted to make an element
		* draggable but snap to the grid you can set this to 32.
		*
		* Default value is 1.
		*
		* @property _dragDistance
		* @type number
		* @default 1
		* @private
		*/
		private _dragDistance: number;

		/**
		* Whether, when dragging, the IChild should snap to the center
		* of the pointer it is being dragged by.
		* @property _dragSnapToCenter
		* @type boolean
		* @default false
		* @private 
		*/
		private _dragSnapToCenter: boolean = false;

		/**
		* Whether this is currently dragging something.
		*
		* This is READ ONLY.
		*
		* @property isDragging
		* @type boolean
		* @public
		*/
		public get isDragging(): boolean { return ( this._isDragging !== null ); }

		/**
		* Used while dragging so that you can make the IChild "snap"
		* to specific numbers to give a grid-like effect.
		*
		* E.g. If you had a 32 by 32 grid and you wanted to make an element
		* draggable but snap to the grid you can set this to 32.
		*
		* Default value is 1.
		* @property dragDistance
		* @type number
		* @public
		*/
		public get dragDistance(): number {
			return this._dragDistance; 
		}
		public set dragDistance( val: number ) { 
			this._dragDistance = val;
		}

		/**
		* Temporary property that gets updated every frame
		* with the pointer that is currently down on this entity
		*
		* @property _nowDown
		* @type Kiwi.Input.Pointer
		* @default null
		* @private
		*/
		private _nowDown: Kiwi.Input.Pointer = null;

		/**
		* Temporary property that gets updated every frame
		* with the pointer that was just released
		* from being down on this entity
		*
		* @property _nowUp
		* @type Kiwi.Input.Pointer
		* @default null
		* @private
		*/
		private _nowUp: Kiwi.Input.Pointer = null;

		/**
		* Temporary property of the pointer that is now
		* within the bounds of the entity
		*
		* @property _nowEntered
		* @type Kiwi.Input.Pointer
		* @default null
		* @private
		*/
		private _nowEntered: Kiwi.Input.Pointer = null;

		/**
		* Temporary property of the pointer that just
		* left the bounds of the entity
		*
		* @property _nowLeft
		* @type Kiwi.Input.Pointer
		* @default null
		* @private
		*/
		private _nowLeft: Kiwi.Input.Pointer = null;

		/**
		* Temporary property of the pointer that just
		* started dragging the entity
		*
		* @property _nowDragging
		* @type Kiwi.Input.Pointer
		* @default null
		* @private
		*/
		private _nowDragging: Kiwi.Input.Pointer = null;

		/**
		* Enable dragging of this entity. 
		*
		* @method enableDrag
		* @param [snapToCenter=false] {boolean} If when dragging the Entity
		*	should snap to the center of the pointer
		* @param [distance=1] {number} If when dragging the Entity
		*	should snap to numbers divisible by this amount
		* @public
		*/
		public enableDrag(
			snapToCenter:boolean = false,
			distance:number = 1 ) {

			if ( this.enabled == false ) {
				this.enabled = true;
			}
			this._dragEnabled = true;
			this._dragSnapToCenter = snapToCenter;
			this._dragDistance = distance;
			this._isDragging = null;

		}

		/**
		* Disable dragging of this entity.
		*
		* @method disableDrag
		* @public
		*/
		public disableDrag() {
			this._dragEnabled = false;
			this._isDragging = null;
		}

		/**
		* Update loop for the input.
		* @method update
		* @protected
		*/
		public update() {

			if (
					this.enabled === false ||
					!this.game ||
					this.owner.active === false ) {
				return;
			}

			// Reset the temporary properties
			this._nowDown = null;
			this._nowUp = null;
			this._nowEntered = null;
			this._nowLeft = null;
			this._nowDragging = null;

			// Use the appropriate method of checking.
			if ( Kiwi.DEVICE.touch ) {
				this._updateTouch();
			}
			// Always check mouse. E.g. Windows 10 with touch display can fire touch and mouse event.
			this._updateMouse();
			

			// If the entity is dragging.
			if ( this.isDragging ) {

				this._tempPoint = this.game.cameras.defaultCamera.transformPoint( this._isDragging.point );

				if ( this._dragSnapToCenter === false ) {
					this.owner.transform.x =
						Kiwi.Utils.GameMath.snapTo( ( this._tempPoint.x -
								this._box.hitboxOffset.x - this._distance.x ),
							this._dragDistance );
					this.owner.transform.y =
						Kiwi.Utils.GameMath.snapTo( ( this._tempPoint.y -
								this._box.hitboxOffset.y - this._distance.y ),
							this._dragDistance );
				} else {
					this.owner.transform.x =
						Kiwi.Utils.GameMath.snapTo( ( this._tempPoint.x -
								this._box.hitboxOffset.x -
								this._box.worldHitbox.width / 2 ),
							this._dragDistance );
					this.owner.transform.y =
						Kiwi.Utils.GameMath.snapTo( ( this._tempPoint.y -
								this._box.hitboxOffset.y -
								this._box.worldHitbox.height / 2 ),
							this._dragDistance );
				}
			}
		}

		/**
		* Update loop executed when the game is using the touch manager.
		* @method _updateTouch
		* @private
		*/
		private _updateTouch() {

			for ( var i = 0; i < this.game.input.touch.maximumPointers; i++) {

				// If the pointer is active then see where it is
				if ( this.game.input.touch.fingers[ i ].active === true ) {
					this._evaluateTouchPointer(
						this.game.input.touch.fingers[ i ] );
				}
				// If the pointer is inactive check to see if it was just down
				else if ( this.isDown === true && this._isDown.id ===
							this.game.input.touch.fingers[ i ].id ) {
					this._nowUp = this.game.input.touch.fingers[ i ];
				}
				// If the pointer is not active but was within the bounds,
				// check to see if it is now outside
				else if ( this.isDown === false && this._nowUp === null &&
						this.withinBounds === true &&
						this._withinBounds.id ===
							this.game.input.touch.fingers[ i ].id ) {
					this._nowUp = this.game.input.touch.fingers[ i ];
				}
			}

			// Fire the events. LOTS OF CONDITIONS
			if ( this._nowEntered !== null && this.withinBounds === false ) {
				this._withinBounds = this._nowEntered;
				this._outsideBounds = false;
				this._onEntered.dispatch( this.owner, this._nowEntered );
			}

			if ( this._nowLeft !== null && this.withinBounds === true ) {
				this._withinBounds = null;
				this._outsideBounds = true;
				this._onLeft.dispatch( this.owner, this._nowLeft );
			}

			if ( this._nowDown !== null && this.isDown === false ) {
				this._onDown.dispatch( this.owner, this._nowDown );
				this._isDown = this._nowDown;
				this._isUp = false;
				this._withinBounds = this._nowDown;
				this._outsideBounds = false;
			}

			if ( this._dragEnabled == true && this.isDragging === false &&
					this._nowDragging !== null ) {
				this._onDragStarted.dispatch( this.owner, this._nowDragging );
				this._isDragging = this._nowDragging;
			}

			if ( this._nowUp !== null ) {
				this._onUp.dispatch( this.owner, this._nowUp );
				this._isDown = null;
				this._isUp = true;
				this._withinBounds = null;
				this._outsideBounds = true;

				// Dispatch drag event
				if ( this.isDragging === true &&
						this._isDragging.id == this._nowUp.id ) {
					this._isDragging = null;
					this._onDragStopped.dispatch( this.owner, this._nowUp );
				}
			}
		}

		/**
		* Check to see if a touch pointer should activate any events.
		* @method _evaluateTouchPointer
		* @param pointer {Kiwi.Input.Finger} Pointer checking against
		* @private
		*/
		private _evaluateTouchPointer( pointer:Kiwi.Input.Finger ) {

			// If nothing is down or what is down is the current pointer
			if ( this.isDown === false || this._isDown.id === pointer.id ) {

				this._tempPoint =
					this.game.cameras.defaultCamera.transformPoint(
						pointer.point );
				this._tempCircle.setTo( this._tempPoint.x, this._tempPoint.y,
					pointer.circle.diameter );

				if ( Kiwi.Geom.Intersect.circleToRectangle(
						this._tempCircle, this._box.worldHitbox ).result ) {
					if ( this.isDown === true &&
							this._isDown.id === pointer.id ||
							this.isDown === false && pointer.duration > 1 ) {
						this._nowEntered = pointer;
					}

					if ( this.isDown === false && pointer.frameDuration < 2 ) {
						this._nowDown = pointer;
					}

					if ( this._dragEnabled && this.isDragging == false &&
							this.isDown == true ) {
						this._distance.x =
							this._tempPoint.x - this._box.worldHitbox.left;
						this._distance.y =
							this._tempPoint.y - this._box.worldHitbox.top;
						this._nowDragging = pointer; 
					}
				} else {
					if ( this.isDown === true ) {
						this._nowLeft = pointer;
					} else if ( this.withinBounds === true &&
							this._withinBounds.id == pointer.id ) {
						this._nowLeft = pointer;
					}
				}
			}
		}

		/**
		* Update loop that runs when the mouse manager is
		* the method for interacting with the screen.
		* @method _updateMouse
		* @private
		*/
		private _updateMouse() {

			this._evaluateMousePointer( this.game.input.mouse.cursor );

			// Dispatch the events
			if ( this._nowLeft !== null ) {
				this._onLeft.dispatch( this.owner, this._nowLeft );
			}

			if ( this._nowEntered !== null ) {
				this._onEntered.dispatch( this.owner, this._nowEntered );
			}

			if ( this._nowDown !== null && this.isDown === false ) {
				this._onDown.dispatch( this.owner, this._nowDown );
				this._isDown = this._nowDown;
				this._isUp = false;
			}

			if ( this._dragEnabled == true && this.isDragging === false &&
					this._nowDragging !== null ) {
				this._onDragStarted.dispatch( this.owner, this._nowDragging );
				this._isDragging = this._nowDragging;
			}

			if ( this.isDown === true && this._nowUp !== null &&
					this._isDown.id === this._nowUp.id ) {
				this._onUp.dispatch( this.owner, this._nowUp );

				// Dispatch drag event
				if ( this.isDragging === true &&
						this._isDragging.id == this._nowUp.id ) {
					this._isDragging = null;
					this._onDragStopped.dispatch( this.owner, this._nowUp );
				}

				this._isDown = null;
				this._isUp = true;
			}
		}

		/**
		* Evaluates where and what the mouse cursor is doing
		* in relation to this box.
		* @method _evaluateMousePointer
		* @param pointer {Kiwi.Input.MouseCursor}
		* @private
		*/
		private _evaluateMousePointer( pointer:Kiwi.Input.MouseCursor ) {

			this._tempPoint = this.game.cameras.defaultCamera.transformPoint(
				pointer.point );

			if ( Kiwi.Geom.Intersect.pointToRectangle(
					this._tempPoint, this._box.worldHitbox ).result ) {

				if ( this._dragEnabled && this.isDragging === false ) {
					this._distance.x =
						this._tempPoint.x - this._box.worldHitbox.left;
					this._distance.y =
						this._tempPoint.y - this._box.worldHitbox.top;
				}

				//  Has it just moved inside?
				if ( this.withinBounds === false ) {
					this._nowEntered = pointer;
					this._withinBounds = pointer;
					this._outsideBounds = false;
					this._justEntered = true;
				}

			} else {

				//  It's outside the bounds now, was it previously in?
				if ( this.withinBounds === true &&
						this.isDragging === false ) {
					this._nowLeft = pointer;
					this._withinBounds = null;
					this._outsideBounds = true;
				}
			}

			//  Input is down (click/touch)
			if ( pointer.isDown === true ) {

				// If it was a mouse, did it just enter?
				if ( this._justEntered ) {
					this._isDown = pointer;
					this._isUp = false;
					this._tempDragDisabled = true;
				}

				//  Within bounds? 
				if ( this.withinBounds === true && this.isDown === false &&
						this._nowDown === null ) {
					this._nowDown = pointer;
				} 

				if ( this._dragEnabled === true && this.isDragging == false &&
						this._tempDragDisabled === false ) {

					if ( this.isDown == true ) {
						this._nowDragging = pointer;
					}
				}
			} else {

				if ( this._tempDragDisabled === true ) {
					this._tempDragDisabled = false;
				}

				if ( this.isDown === true ) {
					this._nowUp = pointer;
				}
			}

			if ( this._justEntered ) {
				this._justEntered = false;
			}
		}

		/**
		* Destroy the input.
		* @method destroy
		* @public
		*/
		public destroy() {

			super.destroy();

			this.enabled = false;
			delete this._box;
			delete this._isDown;
			delete this._isUp;
			delete this._isDragging;
			delete this._dragEnabled;
			if ( this._onDown ) {
				this._onDown.dispose();
			}
			delete this._onDown;
			if ( this._onDragStarted ) {
				this._onDragStarted.dispose();
			}
			delete this._onDragStarted;
			if ( this._onUp ) {
				this._onUp.dispose();
			}
			delete this._onUp;
			if ( this._onLeft ) {
				this._onLeft.dispose();
			}
			delete this._onLeft;
			if ( this._onEntered ) {
				this._onEntered.dispose();
			}
			delete this._onEntered;
			if ( this._onDragStopped ) {
				this._onDragStopped.dispose();
			}
			delete this._onDragStopped;
			delete this._dragDistance;
		}
	}
}
