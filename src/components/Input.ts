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

            this.pointDown = new Kiwi.Geom.Point();
            this.distance = new Kiwi.Geom.Point();

            this._withinBounds = null;
            this._outsideBounds = true;
             
            this._isUp = true;
            this._isDown = null;
            this._isDragging = false;
            this._justEntered = false;
            this._tempDragDisabled = false;
            this.enabled = enabled;
        }

        public objType() {
            return "Input";
        }

        private _entity: Kiwi.Entity;
        private _game: Kiwi.Game;

        public set game(val: Kiwi.Game) {
            this._game = val; 
        }

        public get game():Kiwi.Game {
            return this._game;
        }
         
        public onEntered: Kiwi.Signal;
        public onLeft: Kiwi.Signal;
        public onDown: Kiwi.Signal;
        public onUp: Kiwi.Signal;
        public onDragStarted: Kiwi.Signal;
        public onDragStopped: Kiwi.Signal;
         
        public get onRelease():Kiwi.Signal {
            return this.onUp;
        }

        public get onPress(): Kiwi.Signal {
            return this.onDown;
        }

        public distance: Kiwi.Geom.Point;

        public _enabled: bool;

        public get enabled(): bool {
            return this._enabled;
        }

        public set enabled(val: bool) {
            this._enabled = val; 
        }
        
        private _isDown: Kiwi.Input.Pointer;    //the pointer that is currently 'pressing down'
        private _isUp: bool;                    //and indication of if it is up
        private _withinBounds: Kiwi.Input.Pointer;
        private _outsideBounds: bool;
        private _justEntered: bool;
        
        public get isDown(): bool {
            return (this._isDown !== null);
        }
        public get isUp(): bool {
            return this._isUp;
        }
        public get withinBounds(): bool {
            return (this._withinBounds !== null);
        }
        public get outsideBounds(): bool {
            return this._outsideBounds;
        }

        private _isDragging: bool;
        private _tempDragDisabled: bool;
        private _dragEnabled: bool = false;
        private _dragDistance: number;
        private _dragSnapToCenter: bool = false;

        public get isDragging(): bool { return this._isDragging; }
        public get dragDistance(): number { return this._dragDistance; }
         
        public pointDown: Kiwi.Geom.Point;
        private _box: Kiwi.Components.Box;

        private _nowDown: Kiwi.Input.Pointer = null;
        private _nowUp: Kiwi.Input.Pointer = null;
        private _nowEntered: Kiwi.Input.Pointer = null;
        private _nowLeft: Kiwi.Input.Pointer = null;
         
        public enableDrag(snapToCenter:bool = false, distance:number = 1) {

            this._dragEnabled = true;
            this._dragSnapToCenter = snapToCenter;
            this._dragDistance = distance;
            this._isDragging = false;

        }
        
        public disableDrag() {
            this._dragEnabled = false;
            this._isDragging = false;
        }
        
        public update() {

            if (!this._game || this._entity.active === false || this._entity.willRender === false || this.enabled === false) {
                return;
            }
            
            this._nowDown = null;
            this._nowUp = null;
            this._nowEntered = null;
            this._nowLeft = null;

            if (Kiwi.DEVICE.touch) {
                this._updateTouch();
            } else {
                this._updateMouse();
            }
            
        }

        private _updateTouch() {
            //perhaps if down don't bother checking anything else at all...

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
            
            if (this._nowUp !== null) { 
                this.onUp.dispatch(this._entity, this._nowUp);
                this._isDown = null;
                this._isUp = true;
                this._withinBounds = null;
                this._outsideBounds = true;
            }

        }

        private _evaluateTouchPointer(pointer) {
            
            //if nothing isdown or what is down is the current pointer
            if (this.isDown === false || this._isDown.id === pointer.id) {

                if (Kiwi.Geom.Intersect.circleToRectangle(pointer.circle, this._box.bounds).result) {
                    if (this.isDown === true && this._isDown.id === pointer.id || this.isDown === false && pointer.duration > 1) {
                        this._nowEntered = pointer;
                    }
                    if (this.isDown === false && pointer.frameDuration < 2) {
                        this._nowDown = pointer;
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

        private _updateMouse() {

            this._evaluateMousePointer(this._game.input.mouse.cursor);

            if (this._nowLeft !== null) {
                this.onLeft.dispatch(this._entity, this._nowLeft);
            }

            if (this._nowEntered !== null) {
                this.onEntered.dispatch(this._entity, this._nowEntered, this.distance.x, this.distance.y);
            }
            
            if (this._nowDown !== null && this.isDown === false) {
                this.onDown.dispatch(this._entity, this._nowDown);
                this._isDown = this._nowDown;
                this._isUp = false;
            }

            if (this.isDown === true && this._nowUp !== null && this._isDown.id === this._nowUp.id) {
                this.onUp.dispatch(this._entity, this._nowUp);
                this._isDown = null;
                this._isUp = true;
            }

        }

        private _evaluateMousePointer(pointer) {

            if (Kiwi.Geom.Intersect.circleToRectangle(pointer.circle, this._box.bounds).result) {

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
            } else { 
                if (this._tempDragDisabled === true) this._tempDragDisabled = false;
                if (this.isDown === true) this._nowUp = pointer;
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


