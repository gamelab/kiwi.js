/**
* 
* @module Kiwi
* @submodule Components 
* 
*/ 
 
module Kiwi.Components {

    /**
    * The Input Component is used on GameObjects in which the user may interactive with via a Mouse or Touch 
    * and as such this class contains useful methods and callbacks you can subscribe to. 
    * By default the Input component is disabled (this is because when enabled the input component can be process intensive) 
    * but you can enabled it yourself (which is recommened) BUT in case you forget the input component will automagically 
    * be enabled once you access a Signal on this class.
    *
    * @class Input
    * @extends Component
    * @namespace Kiwi.Components
    * @constructor
    * @param owner {IChild} The IChild that owns this Input.
    * @param box {Box} The box that is to be used for the event firing.
    * @param [enabled=false] {boolean} If this input component should be enabled or not. 
    * @return {Input}
    */
    export class Input extends Component {
 
        constructor(owner: Kiwi.IChild, box:Kiwi.Components.Box, enabled:boolean=false) {

            super(owner,'Input');
            
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
            this._tempCircle = new Kiwi.Geom.Circle(0, 0, 0);

            this.enabled = enabled;
        }

        /**
        * The type of object this input is.
        * @method objType
        * @return string
        * @public
        */
        public objType() {
            return "Input";
        }
        
        /**
        * The bounding box that is being used for the 'hitarea'.
        * @property _box
        * @type Box
        * @private
        */
        private _box: Kiwi.Components.Box;

        /**
        * Kiwi Signal for firing callbacks when a pointer is active and has entered the entities hit box.
        * @property _onEntered
        * @type Signal
        * @private
        */
        private _onEntered: Kiwi.Signal;
        
        /**
        * Kiwi Signal for firing callbacks when a pointer is active and has left the entities hit box.
        * @property _onLeft
        * @type Signal
        * @private
        */
        private _onLeft: Kiwi.Signal;
        
        /**
        * Kiwi Signal for firing callbacks when a pointer is active and has pressed down on the entity.
        * @property _onDown
        * @type Signal
        * @private
        */
        private _onDown: Kiwi.Signal;
        
        /**
        * Kiwi Signal for firing callbacks when a pointer just released from either being above the entity or the pointer was initally pressed on it.
        * @property _onUp
        * @type Signal
        * @private
        */
        private _onUp: Kiwi.Signal;
        
        /**
        * Kiwi Signal for firing callbacks a entity starts being dragged.
        * @property _onDragStarted
        * @type Signal
        * @private
        */
        private _onDragStarted: Kiwi.Signal;
        
        /**
        * Kiwi Signal for firing callbacks a entity stops being dragged. Like on release.
        * @property _onDragStopped
        * @type Signal
        * @private
        */
        private _onDragStopped: Kiwi.Signal;

        /**
        * A Temporary Point object which is used whilst checking to see if there is any overlap.
        * @property _tempPoint
        * @type Point
        * @private
        */
        private _tempPoint: Kiwi.Geom.Point;
        
        /**
        * A Temporary Circle object which is used whilst checking to see if there is any overlap.
        * @property _tempCircle
        * @type Point
        * @private
        */
        private _tempCircle: Kiwi.Geom.Circle;


        /**
        * Returns the onEntered Signal, that fires events when a pointer enters the hitbox of a entity.
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onEntered
        * @type Signal
        * @public
        */
        public get onEntered(): Kiwi.Signal {
            if (this.enabled == false) this.enabled = true;
            return this._onEntered;
        }
        
        /**
        * Returns the onLeft Signal, that fires events when a pointer leaves the hitbox of a entity.
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onLeft
        * @type Signal
        * @public
        */
        public get onLeft(): Kiwi.Signal {
            if (this.enabled == false) this.enabled = true;
            return this._onLeft;
        }
        
        /**
        * Returns the onDown Signal, that fires events when a pointer is pressed within the bounds of the signal.
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onDown
        * @type Signal
        * @public
        */
        public get onDown(): Kiwi.Signal {
            if (this.enabled == false) this.enabled = true;
            return this._onDown;
        }
        
        /**
        * Returns the onUp Signal, that fires events when a pointer is released either within the bounds or was pressed initially within the bounds..
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onUp
        * @type Signal
        * @public
        */
        public get onUp(): Kiwi.Signal {
            if (this.enabled == false) this.enabled = true;
            return this._onUp;
        }
    
        /**
        * Returns the onDragStarted Signal.
        * This is READ ONLY.
        * @property onDragStarted
        * @type Signal
        * @public
        */
        public get onDragStarted(): Kiwi.Signal { return this._onDragStarted; }

        /**
        * Returns the onDragStopped Signal.
        * This is READ ONLY.
        * @property onDragStopped
        * @type Signal
        * @public
        */
        public get onDragStopped(): Kiwi.Signal { return this._onDragStopped; }

        /**
        * A alias for the on release signal.
        * This is READ ONLY.
        * @property onRelease
        * @type Signal
        * @public
        */
        public get onRelease():Kiwi.Signal {
            return this.onUp;
        }
        
        /**
        * A alias for the on press signal.
        * This is READ ONLY.
        * @property onPress
        * @type Signal
        * @public
        */
        public get onPress(): Kiwi.Signal {
            return this.onDown;
        }

        /**
        * If this input is enabled or not. 
        * @property _enabled
        * @type boolean
        * @default false
        * @private
        */
        private _enabled: boolean;

        /**
        * Get if the input is enabled or not. Note: Inputs should only be enabled when needed, otherwise unnecessary processing does occur which can result in a slower game.
        * @property enabled
        * @type boolean
        * @public
        */
        public get enabled(): boolean {
            return this._enabled;
        }
        public set enabled(val: boolean) {//perhaps later the signals should only be set if the input is enabled.
            this._enabled = val; 
        }
        
        /**
        * If a pointer is current pressing down on the input, this will be a reference to that pointer. Otherwise it will be null.
        * @property _isDown
        * @type Pointer
        * @private
        */
        private _isDown: Kiwi.Input.Pointer;    

        /**
        * A boolean that indicates if no pointer is currently on the pointer
        * @property _isUp
        * @type boolean
        * @default true
        * @private
        */
        private _isUp: boolean;

        /**
        * Indicates if a pointer is within the bounds or not. If one is then it referers to the pointer that is. Other it will be null.
        * @property _withinBounds
        * @type Pointer
        * @private
        */
        private _withinBounds: Kiwi.Input.Pointer;

        /**
        * boolean indicating if every pointer is currently outside of the bounds.
        * @property _outsideBounds
        * @type boolean
        * @default true
        * @private
        */
        private _outsideBounds: boolean;
        
        /**
        * If a pointer just entered the input. Used for mouse's to indicate when to appropriately fire the down event.
        * Note: Could be removed once mouse version of update gets updated.
        * @property _justEntered
        * @type boolean
        * @default false
        * @private
        */
        private _justEntered: boolean;
        
        /**
        * Used to see if a pointer is currently on this input. Returns a boolean indicating either true or false.
        * This is READ ONLY.
        * @property isDown
        * @type boolean
        * @public
        */
        public get isDown(): boolean {
            return (this._isDown !== null);
        }
        
        /**
        * Used to see if no pointer is on this input (so it is up).
        * This is READ ONLY.
        * @property isUp
        * @type boolean
        * @public
        */
        public get isUp(): boolean {
            return this._isUp;
        }
        
        /**
        * Check to see if any pointer is within the bounds of this input.
        * This is READ ONLY.
        * @property withinBounds
        * @type boolean
        * @public
        */
        public get withinBounds(): boolean {
            return (this._withinBounds !== null);
        }
        
        /**
        * See if no pointers are within the bounds of this entity.
        * This is READ ONLY.
        * @property outsideBounds
        * @type boolean
        * @public
        */
        public get outsideBounds(): boolean {
            return this._outsideBounds;
        }
        
        /**
        * A reference to the pointer that is currently 'dragging' this IChild. 
        * If not dragging then this is null.
        * @property _isDragging
        * @type Pointer
        * @default null
        * @private
        */
        private _isDragging: Kiwi.Input.Pointer = null;
        
        /**
        * The distance between the top left corner of this IChild and the coordinates of a Pointer.
        * @property _distance
        * @type Point
        * @private
        */
        private _distance: Kiwi.Geom.Point;

        /**
        * A boolean indicating if dragging is temporarly disabled. Internal use only to stop events from misfiring.
        * @property _tempDragDisabled
        * @type boolean
        * @private
        */
        private _tempDragDisabled: boolean;

        /**
        * Indicates if dragging is currently enabled.
        * @property _dragEnabled
        * @type boolean
        * @default false
        * @private
        */
        private _dragEnabled: boolean = false;
        
        /**
        * This is used while dragging so that you can make the IChild 'snap' to specific numbers to give a 'grid like' effect. 
        * E.g. If you had a 32 by 32 grid down and you wanted to make an element draggable but snap to the grid you can set this to 32. 
        * Default value is one.
        * @property _dragDistance
        * @type number
        * @default 1
        * @private
        */
        private _dragDistance: number;

        /**
        * If when dragging, the IChild should snap to the center of the pointer it is being dragged by.
        * @property _dragSnapToCenter
        * @type boolean
        * @default false
        * @private 
        */
        private _dragSnapToCenter: boolean = false;

        /**
        * Returns a boolean indicating if this is currently dragging something.
        * This is READ ONLY.
        * @property isDragging
        * @type boolean
        * @public
        */
        public get isDragging(): boolean { return (this._isDragging !== null); }

        /**
        * The drag distance that is used when dragging this object. See _dragDistance for more information.
        * @property dragDistance
        * @type number
        * @public
        */
        public get dragDistance(): number {
            return this._dragDistance; 
        }
        public set dragDistance(val: number) { 
            this._dragDistance = val;
        }

        /**
        * Temporary property that gets updated everyframe with the pointer that is currently 'down' on this entity.
        * @property _nowDown
        * @type Pointer
        * @default null
        * @private
        */
        private _nowDown: Kiwi.Input.Pointer = null;
        
        /**
        * Temporary property that gets updated everyframe with the pointer that was just 'released' from being down on this entity
        * @property _nowUp
        * @type Pointer
        * @default null
        * @private
        */
        private _nowUp: Kiwi.Input.Pointer = null;
        
        /**
        * Temporary property of the pointer that is now within the bounds of the entity
        * @property _nowEntered
        * @type Pointer
        * @default null
        * @private
        */
        private _nowEntered: Kiwi.Input.Pointer = null;
        
        /**
        * Temporary property of the pointer that just left the bounds of the entity.
        * @property _nowLeft
        * @type Pointer
        * @default null
        * @private
        */
        private _nowLeft: Kiwi.Input.Pointer = null;
        
        /**
        * Temporary property of the pointer that just started draggging the entity.
        * @property _nowDragging
        * @type Pointer
        * @default null
        * @private
        */
        private _nowDragging: Kiwi.Input.Pointer = null;

        /**
        * Enables the dragging of this entity. 
        * @method enableDrag
        * @param [snapToCenter=false] {boolean} If when dragging the Entity should snap to the center of the pointer.
        * @param [distance=1] {number} If when dragging the Entity should snap to numbers divisible by this amount.
        * @public
        */
        public enableDrag(snapToCenter:boolean = false, distance:number = 1) {
            
            if (this.enabled == false) this.enabled = true;
            this._dragEnabled = true;
            this._dragSnapToCenter = snapToCenter;
            this._dragDistance = distance;
            this._isDragging = null;

        }
        
        /**
        * Disables the dragging of this entity. 
        * @method disableDrag
        * @public
        */
        public disableDrag() {
            this._dragEnabled = false;
            this._isDragging = null;
        }
        
        /**
        * The update loop for the input. 
        * @method update
        * @protected
        */
        public update() {

            if (this.enabled === false  ||  !this.game || this.owner.active === false || this.owner.willRender === false) {
                return;
            }
            
            // Reset the temporary properties
            this._nowDown = null;
            this._nowUp = null;
            this._nowEntered = null;
            this._nowLeft = null;
            this._nowDragging = null;

            //Use the appropriate method of checking.
            if (Kiwi.DEVICE.touch) {
                this._updateTouch();
            } else {
                this._updateMouse();
            }
            
            //If the entity is dragging.
            if (this.isDragging) { 

                this._tempPoint = this.game.cameras.defaultCamera.transformPoint(this._isDragging.point);

                if (this._dragSnapToCenter === false) {
                    this.owner.transform.x = Kiwi.Utils.GameMath.snapTo((this._tempPoint.x - this._box.hitboxOffset.x - this._distance.x), this._dragDistance);
                    this.owner.transform.y = Kiwi.Utils.GameMath.snapTo((this._tempPoint.y - this._box.hitboxOffset.y - this._distance.y), this._dragDistance);
                } else {
                    this.owner.transform.x = Kiwi.Utils.GameMath.snapTo((this._tempPoint.x - this._box.hitboxOffset.x - this._box.worldHitbox.width / 2), this._dragDistance);
                    this.owner.transform.y = Kiwi.Utils.GameMath.snapTo((this._tempPoint.y - this._box.hitboxOffset.y - this._box.worldHitbox.height / 2), this._dragDistance);
                }
            }
        }

        /**
        * The update loop that gets executed when the game is using the touch manager.
        * @method _updateTouch
        * @private
        */
        private _updateTouch() {
        
            for (var i = 0; i < this.game.input.touch.maximumPointers; i++) {

                //if that pointer is active then see where it is
                if (this.game.input.touch.fingers[i].active === true) {
                    this._evaluateTouchPointer(this.game.input.touch.fingers[i]);
                }
                //if the pointer is inactive check to see if it was just down
                else if (this.isDown === true && this._isDown.id === this.game.input.touch.fingers[i].id) {
                    this._nowUp = this.game.input.touch.fingers[i];
                }
                //if the pointer is not active but was within the bounds check to see if it is now outside
                else if (this.isDown === false && this._nowUp === null && this.withinBounds === true && this._withinBounds.id === this.game.input.touch.fingers[i].id) {
                    this._nowUp = this.game.input.touch.fingers[i];
                }
                 
            }
    
            //Fire the events. LOTS OF CONDITIONS
            if (this._nowEntered !== null && this.withinBounds === false) { 
                this._withinBounds = this._nowEntered;
                this._outsideBounds = false;
                this._onEntered.dispatch(this.owner, this._nowEntered);
            }

            if (this._nowLeft !== null && this.withinBounds === true) { 
                this._withinBounds = null;
                this._outsideBounds = true;
                this._onLeft.dispatch(this.owner, this._nowLeft);
            }

            if (this._nowDown !== null && this.isDown === false) { 
                this._onDown.dispatch(this.owner, this._nowDown);
                this._isDown = this._nowDown;
                this._isUp = false;
                this._withinBounds = this._nowDown;
                this._outsideBounds = false;
            }
            
            if (this._dragEnabled == true && this.isDragging === false && this._nowDragging !== null) {
                this._onDragStarted.dispatch(this.owner, this._nowDragging);
                this._isDragging = this._nowDragging;
            }

            if (this._nowUp !== null) { 
                this._onUp.dispatch(this.owner, this._nowUp);
                this._isDown = null;
                this._isUp = true;
                this._withinBounds = null;
                this._outsideBounds = true;

                //dispatch drag event
                if (this.isDragging === true && this._isDragging.id == this._nowUp.id) {
                    this._isDragging = null;
                    this._onDragStopped.dispatch(this.owner, this._nowUp);
                }
            }

        }
        
        /**
        * A private method for checking to see if a touch pointer should activate any events.
        * @method _evaluateTouchPointer
        * @param pointer {Finger} The pointer you are checking against.
        * @private
        */
        private _evaluateTouchPointer(pointer:Kiwi.Input.Finger) {
            
            //if nothing isdown or what is down is the current pointer
            if (this.isDown === false || this._isDown.id === pointer.id) {

                this._tempPoint = this.game.cameras.defaultCamera.transformPoint( pointer.point );
                this._tempCircle.setTo(this._tempPoint.x, this._tempPoint.y, pointer.circle.diameter);

                if (Kiwi.Geom.Intersect.circleToRectangle(this._tempCircle, this._box.worldHitbox).result) {
                    if (this.isDown === true && this._isDown.id === pointer.id || this.isDown === false && pointer.duration > 1) {
                        this._nowEntered = pointer;
                    }

                    if (this.isDown === false && pointer.frameDuration < 2) {
                        this._nowDown = pointer;
                    }

                    if (this._dragEnabled && this.isDragging == false && this.isDown == true) {
                        this._distance.x = this._tempPoint.x - this._box.worldHitbox.left;
                        this._distance.y = this._tempPoint.y - this._box.worldHitbox.top;
                        this._nowDragging = pointer; 
                    }
                } else {
                    if (this.isDown === true) {
                        this._nowLeft = pointer;
                    } else if(this.withinBounds === true && this._withinBounds.id == pointer.id) {
                        this._nowLeft = pointer;
                    }
                }

            }

        }

        /**
        * The update loop that runs when the mouse manager is the method for interacting with the screen.
        * @method _updateMouse
        * @private
        */
        private _updateMouse() {

            this._evaluateMousePointer(this.game.input.mouse.cursor);

            //dispatch the events
            if (this._nowLeft !== null) {
                this._onLeft.dispatch(this.owner, this._nowLeft);
            }

            if (this._nowEntered !== null) {
                this._onEntered.dispatch(this.owner, this._nowEntered);
            }
            
            if (this._nowDown !== null && this.isDown === false) {
                this._onDown.dispatch(this.owner, this._nowDown);
                this._isDown = this._nowDown;
                this._isUp = false;
            }

            if (this._dragEnabled == true && this.isDragging === false && this._nowDragging !== null) {
                this._onDragStarted.dispatch(this.owner, this._nowDragging);
                this._isDragging = this._nowDragging;
            }

            if (this.isDown === true && this._nowUp !== null && this._isDown.id === this._nowUp.id) {
                this._onUp.dispatch(this.owner, this._nowUp);
                
                // Dispatch drag event
                if (this.isDragging === true && this._isDragging.id == this._nowUp.id) {
                    this._isDragging = null;
                    this._onDragStopped.dispatch(this.owner, this._nowUp);
                }

                this._isDown = null;
                this._isUp = true;
            }

        }

        /**
        * Evaluates where and what the mouse cursor is doing in relation to this box. Needs a little bit more love.
        * @method _evaluateMousePointer
        * @param pointer {MouseCursor}
        * @private
        */
        private _evaluateMousePointer(pointer:Kiwi.Input.MouseCursor) {

            this._tempPoint = this.game.cameras.defaultCamera.transformPoint(pointer.point);

            if (Kiwi.Geom.Intersect.pointToRectangle(this._tempPoint, this._box.worldHitbox).result) {
                
                if (this._dragEnabled && this.isDragging === false) {
                    this._distance.x = this._tempPoint.x - this._box.worldHitbox.left;
                    this._distance.y = this._tempPoint.y - this._box.worldHitbox.top;
                }

                //  Has it just moved inside?
                if (this.withinBounds === false) {
                    this._nowEntered = pointer;
                    this._withinBounds = pointer;
                    this._outsideBounds = false;
                    this._justEntered = true;
                }

            } else {
                
                //  It's outside the bounds now, was it previously in?
                if (this.withinBounds === true && this.isDragging === false) {
                    this._nowLeft = pointer;
                    this._withinBounds = null;
                    this._outsideBounds = true;
                }

            }

            //  Input is down (click/touch)
            if (pointer.isDown === true) {

                //if is was a mouse, did it just enter?
                if (this._justEntered) {
                    this._isDown = pointer;
                    this._isUp = false;
                    this._tempDragDisabled = true;
                }

                //  Within bounds? 
                if (this.withinBounds === true && this.isDown === false && this._nowDown === null) {
                    this._nowDown = pointer;
                } 

                if (this._dragEnabled === true && this.isDragging == false && this._tempDragDisabled === false) {

                    if(this.isDown == true) {
                        this._nowDragging = pointer;

                    }
                }

            } else { 
                
                if (this._tempDragDisabled === true) this._tempDragDisabled = false;

                if (this.isDown === true) {
                    this._nowUp = pointer;

                }    
            }

            if (this._justEntered) this._justEntered = false;
        }

	    /**
	    * Returns a string representation of this object.
	    * @method toString
	    * @return {string} A string representation of this object.
        * @publics
	    */
        public toString(): string {

            return '[{Input (x=' + this.withinBounds + ')}]';

        }

        /**
        * Destroys the input.
        * @method destory
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
            if(this._onDown) this._onDown.dispose();
            delete this._onDown;
            if(this._onDragStarted) this._onDragStarted.dispose();
            delete this._onDragStarted;
            if (this._onUp) this._onUp.dispose();
            delete this._onUp;
            if (this._onLeft) this._onLeft.dispose();
            delete this._onLeft;
            if (this._onEntered) this._onEntered.dispose();
            delete this._onEntered;
            if (this._onDragStopped) this._onDragStopped.dispose();
            delete this._onDragStopped;
            delete this._dragDistance;

        }

    }

}


