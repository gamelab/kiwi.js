/// <reference path="../core/Component.ts" />

/*
 *	Kiwi - Components - Input
 *
 *	@desc		Description
 *
 *	@version	1.0 - ? February 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Input extends Component {

        /*
        *
        * @constructor
        * @param {Kiwi.Entity} entity
        * @param {Kiwi.Components.Bounds} bounds
        * @return {Kiwi.Components.Input}
        */
        constructor(entity: Kiwi.Entity, box:Kiwi.Components.Box, enabled:bool) {

            super('Input');
            
            //  Signals
            this.onEntered = new Kiwi.Signal();
            this.onLeft = new Kiwi.Signal();
            this.onDown = new Kiwi.Signal();
            this.onUp = new Kiwi.Signal();
            this.onDragStarted = new Kiwi.Signal();
            this.onDragStopped = new Kiwi.Signal();

            //  Properties
            this._entity = entity;
            this._box = box;

            this._distance = new Kiwi.Geom.Point();
             
            this._withinBounds = null;
            this._outsideBounds = true;
             
            this._isUp = true;
            this._isDown = null;
            this._isDragging = null;
            this._justEntered = false;
            this._tempDragDisabled = false;
            this.enabled = enabled;
        }

        /*
        * The type of object this input is.
        * @method objType
        * @return string
        */
        public objType() {
            return "Input";
        }
        
        /*
        * The entity that this input belongs to. 
        * NOTE: This should be replace eventually with the natural component version.
        * @property _entity
        * @type Kiwi.Entity
        */
        private _entity: Kiwi.Entity;
        
        /*
        * The bounding box that is being used for the 'hitarea'.
        * @property _box
        * @type Kiwi.Components.Box
        */
        private _box: Kiwi.Components.Box;

        /*
        * The game that this input belongs to. 
        * NOTE: This should be replace eventually with the natural component version.
        * @property _game
        * @type Kiwi.Game
        */
        private _game: Kiwi.Game;

        /*
        * Set the game that this input belongs to.
        * @type Kiwi.Game
        */
        public set game(val: Kiwi.Game) {
            this._game = val; 
        }
        
        /*
        * Get the game that this input belongs to.
        * @type Kiwi.Game
        */
        public get game():Kiwi.Game {
            return this._game;
        }
         
        /*
        * Tonnes of event listeners that run.
        */
        public onEntered: Kiwi.Signal;
        public onLeft: Kiwi.Signal;
        public onDown: Kiwi.Signal;
        public onUp: Kiwi.Signal;
        public onDragStarted: Kiwi.Signal;
        public onDragStopped: Kiwi.Signal;
         
        /*
        * A alias for the on release signal
        */
        public get onRelease():Kiwi.Signal {
            return this.onUp;
        }
        
        /*
        * A alias for the on press signal
        */
        public get onPress(): Kiwi.Signal {
            return this.onDown;
        }

        /*
        * If this input is enabled or not. 
        * @property _enabled
        * @type bool
        */
        public _enabled: bool;

        /*
        * Get if the input is enabled or not.
        * @type bool
        */
        public get enabled(): bool {
            return this._enabled;
        }

        /*
        * Set if the input should be enabled or not. 
        * @type bool
        */
        public set enabled(val: bool) {//perhaps later the signals should only be set if the input is enabled.
            this._enabled = val; 
        }
        
        /*
        * If a pointer is current pressing down on the input, this will be a reference to that pointer. Otherwise it will be null.
        * @property _isDown
        * @type Kiwi.Input.Pointer
        */
        private _isDown: Kiwi.Input.Pointer;    

        /*
        * A boolean that indicates if no pointer is currently on the pointer
        * @property _isUp
        * @type bool
        */
        private _isUp: bool;

        /*
        * Indicates if a pointer is within the bounds or not. If one is then it referers to the pointer that is. Other it will be null.
        * @property _withinBounds
        * @type Kiwi.Input.Pointer
        */
        private _withinBounds: Kiwi.Input.Pointer;

        /*
        * Boolean indicating if every pointer is currently outside of the bounds.
        * @property _outsideBounds
        * @type bool
        */
        private _outsideBounds: bool;
        
        /*
        * If a pointer just entered the input. Used for mouse's to indicate when to appropriately fire the down event.
        * Note: Could be removed once mouse version of update gets updated.
        * @property _justEntered
        * @type bool
        */
        private _justEntered: bool;
        
        /*
        * Used to see if a pointer is currently on this input. Returns a boolean indicating either true or false
        * @type bool
        */
        public get isDown(): bool {
            return (this._isDown !== null);
        }
        
        /*
        * Used to see if no pointer is on this input (so it is up).
        * @type bool
        */
        public get isUp(): bool {
            return this._isUp;
        }
        
        /*
        * Check to see if any pointer is within the bounds of this input.
        * @type bool
        */
        public get withinBounds(): bool {
            return (this._withinBounds !== null);
        }
        
        /*
        * See if no pointers are within the bounds of this entity.
        * @type bool
        */
        public get outsideBounds(): bool {
            return this._outsideBounds;
        }
        
        /*
        * Dragging not implemented so not comment just yet as could be removed....
        */
        private _isDragging: Kiwi.Input.Pointer = null;
        private _distance: Kiwi.Geom.Point;
        private _tempDragDisabled: bool;
        private _dragEnabled: bool = false;
        private _dragDistance: number;
        private _dragSnapToCenter: bool = false;

        public get isDragging(): bool { return (this._isDragging !== null); }
        public get dragDistance(): number { return this._dragDistance; }
        
        /*
        * Temporary property that gets updated everyframe with the pointer that is currently 'down' on this entity.
        * @property _nowDown
        * @type Kiwi.Input.Pointer
        */
        private _nowDown: Kiwi.Input.Pointer = null;
        
        /*
        * Temporary property that gets updated everyframe with the pointer that was just 'released' from being down on this entity
        * @property _nowUp
        * @type Kiwi.Input.Pointer
        */
        private _nowUp: Kiwi.Input.Pointer = null;
        
        /*
        * Temporary property of the pointer that is now within the bounds of the entity
        * @property _nowEntered
        * @type Kiwi.Input.Pointer
        */
        private _nowEntered: Kiwi.Input.Pointer = null;
        
        /*
        * Temporary property of the pointer that just left the bounds of the entity.
        * @property _nowLeft
        * @type Kiwi.Input.Pointer
        */
        private _nowLeft: Kiwi.Input.Pointer = null;
        
        /*
        * Temporary property of the pointer that just started draggging the entity.
        * @property _nowDragging
        * @type Kiwi.Input.Pointer
        */
        private _nowDragging: Kiwi.Input.Pointer = null;

        /*
        * Enables the drag of this entity. Not currently being used.
        */
        public enableDrag(snapToCenter:bool = false, distance:number = 1) {

            this._dragEnabled = true;
            this._dragSnapToCenter = snapToCenter;
            this._dragDistance = distance;
            this._isDragging = null;

        }
        
        /*
        * Disables the drage of this entity. Not currently being used.
        */
        public disableDrag() {
            this._dragEnabled = false;
            this._isDragging = null;
        }
        
        public update() {

            if (this.enabled === false  ||  !this._game || this._entity.active === false || this._entity.willRender === false) {
                return;
            }
            
            //reset the temporary properties
            this._nowDown = null;
            this._nowUp = null;
            this._nowEntered = null;
            this._nowLeft = null;
            this._nowDragging = null;

            if (Kiwi.DEVICE.touch) {
                this._updateTouch();
            } else {
                this._updateMouse();
            }
            
            if (this.isDragging) {
                this._entity.x = this._isDragging.x;
                this._entity.y = this._isDragging.y;

                if (this._dragSnapToCenter === false) {
                    this._entity.x -= this._distance.x;
                    this._entity.y -= this._distance.y;
                }
            }
        }

        /*
        * The update loop that gets executed when the game is using the touch manager.
        * @method _updateTouch
        */
        private _updateTouch() {
        
            for (var i = 0; i < this._game.input.touch.fingers.length; i++) {

                //if that pointer is active then see where it is
                if (this._game.input.touch.fingers[i].active === true) {
                    this._evaluateTouchPointer(this._game.input.touch.fingers[i]);
                }
                //if the pointer is inactive check to see if it was just down
                else if (this.isDown === true && this._isDown.id === this._game.input.touch.fingers[i].id) {
                    this._nowUp = this._game.input.touch.fingers[i];
                }
                //if the pointer is not active but was within the bounds check to see if it is now outside
                else if (this.isDown === false && this._nowUp === null && this.withinBounds === true && this._withinBounds.id === this._game.input.touch.fingers[i].id) {
                    this._nowUp = this._game.input.touch.fingers[i];
                }
                 
            }
    
            //Fire the events. LOTS OF CONDITIONS
            if (this._nowEntered !== null && this.withinBounds === false) { 
                this._withinBounds = this._nowEntered;
                this._outsideBounds = false;
                this.onEntered.dispatch(this._entity, this._nowEntered);
            }

            if (this._nowLeft !== null && this.withinBounds === true) { 
                this._withinBounds = null;
                this._outsideBounds = true;
                this.onLeft.dispatch(this._entity, this._nowLeft);
            }

            if (this._nowDown !== null && this.isDown === false) { 
                this.onDown.dispatch(this._entity, this._nowDown);
                this._isDown = this._nowDown;
                this._isUp = false;
                this._withinBounds = this._nowDown;
                this._outsideBounds = false;
            }
            
            if (this._dragEnabled == true && this.isDragging === false && this._nowDragging !== null) {
                this.onDragStarted.dispatch(this._entity, this._nowDragging);
                this._isDragging = this._nowDragging;
                console.log('dragging started');
            }

            if (this._nowUp !== null) { 
                this.onUp.dispatch(this._entity, this._nowUp);
                this._isDown = null;
                this._isUp = true;
                this._withinBounds = null;
                this._outsideBounds = true;

                //dispatch drag event
                if (this.isDragging === true && this._isDragging.id == this._nowUp.id) {
                    this._isDragging = null;
                    this.onDragStopped.dispatch(this._entity, this._nowUp);
                    console.log('dragging stopped');
                }
            }

        }
        
        /*
        * A private method for checking to see if a touch pointer should activate any events.
        * @method _evaluateTouchPointer
        * @param {Kiwi.Input.Finger} pointer
        */
        private _evaluateTouchPointer(pointer) {
            
            //if nothing isdown or what is down is the current pointer
            if (this.isDown === false || this._isDown.id === pointer.id) {

                if (Kiwi.Geom.Intersect.circleToRectangle(pointer.circle, this._box.hitbox).result) {
                    if (this.isDown === true && this._isDown.id === pointer.id || this.isDown === false && pointer.duration > 1) {
                        this._nowEntered = pointer;
                    }

                    if (this.isDown === false && pointer.frameDuration < 2) {
                        this._nowDown = pointer;
                    }

                    if (this._dragEnabled && this.isDragging == false && this.isDown == true) {
                        this._distance.x = pointer.x - this._box.hitbox.left;
                        this._distance.y = pointer.y - this._box.hitbox.top;

                        if(this._isDown.startPoint.distanceTo(this._distance) >= this._dragDistance) {
                            this._nowDragging = pointer;
                        }
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

        /*
        * The update loop that runs when the mouse manager is the method for interacting with the screen.
        * @method _updateMouse
        */
        private _updateMouse() {

            this._evaluateMousePointer(this._game.input.mouse.cursor);

            //dispatch the events
            if (this._nowLeft !== null) {
                this.onLeft.dispatch(this._entity, this._nowLeft);
            }

            if (this._nowEntered !== null) {
                this.onEntered.dispatch(this._entity, this._nowEntered);
            }
            
            if (this._nowDown !== null && this.isDown === false) {
                this.onDown.dispatch(this._entity, this._nowDown);
                this._isDown = this._nowDown;
                this._isUp = false;
            }

            if (this._dragEnabled == true && this.isDragging === false && this._nowDragging !== null) {
                this.onDragStarted.dispatch(this._entity, this._nowDragging);
                this._isDragging = this._nowDragging;
                console.log('dragging started');
            }

            if (this.isDown === true && this._nowUp !== null && this._isDown.id === this._nowUp.id) {
                this.onUp.dispatch(this._entity, this._nowUp);
                
                //dispatch drag event
                if (this.isDragging === true && this._isDragging.id == this._nowUp.id) {
                    this._isDragging = null;
                    this.onDragStopped.dispatch(this._entity, this._nowUp);
                    console.log('dragging stopped');
                }

                this._isDown = null;
                this._isUp = true;
            }

        }

        /*
        * Evaluates where and what the mouse cursor is doing in relation to this box. Needs a little bit more love.
        * @method _evaluateMousePointer
        * @param {Kiwi.Input.MouseCursor} pointer
        */
        private _evaluateMousePointer(pointer) {

            if (Kiwi.Geom.Intersect.circleToRectangle(pointer.circle, this._box.hitbox).result) {
                
                if (this._dragEnabled && this.isDragging === false) {
                    this._distance.x = pointer.x - this._box.hitbox.left;
                    this._distance.y = pointer.y - this._box.hitbox.top;
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
                    
                    if(this.isDown == true && this._isDown.startPoint.distanceTo(this._distance) >= this._dragDistance) {
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
	     **/
        public toString(): string {

            return '[{Input (x=' + this.withinBounds + ')}]';

        }

    }

}


