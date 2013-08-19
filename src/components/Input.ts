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
        constructor(entity: Kiwi.Entity, bounds:Kiwi.Components.Bounds) {

            super('Input');

            //  Signals
            this.onEntered = new Kiwi.Signal();
            this.onLeft = new Kiwi.Signal();
            this.onDown = new Kiwi.Signal();
            this.onRelease = new Kiwi.Signal();
            this.onDragStarted = new Kiwi.Signal();
            this.onDragStopped = new Kiwi.Signal();

            //  Properties
            this._entity = entity;
            this._bounds = bounds;

            this.pointDown = new Kiwi.Geom.Point();
            this.distance = new Kiwi.Geom.Point();

            this.withinBounds = false;
            this.outsideBounds = true;

            this.isUp = true;
            this.isDown = false;
            this.isDragging = false;
            this._justEntered = false;
            this._tempDragDisabled = false;
        }

        public objType() {
            return "Input";
        }

        /*
        * The entity that this input belongs to.
        * @property _entity
        * @type Kiwi.Entity
        */
        private _entity: Kiwi.Entity;

        //  Subscribe to these Signals to receive updates

        /*
        * When the input enters the bounds of this entity
        * @property onEntered
        * @type Kiwi.Signal
        */
        public onEntered: Kiwi.Signal;

        /*
        * When the input leaves the bounds of this entity
        * @property onLeft
        * @type Kiwi.Signal
        */
        public onLeft: Kiwi.Signal;

        /* 
        * When the input is within the bounds of this entity AND pressed down
        * @property onDown
        * @type Kiwi.Signal
        */
        public onDown: Kiwi.Signal;

        /*
        * When the input is within the bounds of this entity AND is released, having previously been pressed down on this entity
        * @property onReleased
        * @type Kiwi.Signal
        */
        public onRelease: Kiwi.Signal;

        /*
        * Fired once when the drag first starts (if enabled)
        * @property onDragStarted
        * @type Kiwi.Signal
        */
        public onDragStarted: Kiwi.Signal;

        /*
        * Fired once when the drag stops (if enabled)
        * @property onDragStopped
        * @type Kiwi.Signal
        */
        public onDragStopped: Kiwi.Signal;

        /*
        * Distance from the top left corner of the entity bounds to the current input position
        * @property distance
        * @type Kiwi.Geom.Point
        */
        public distance: Kiwi.Geom.Point;

        /*
        * Tonnes of booleans
        */
        public isDown: bool;
        public isUp: bool;
        public isDragging: bool;
        public withinBounds: bool;
        public outsideBounds: bool;
        private _justEntered: bool;
        private _tempDragDisabled: bool;

        public pointDown: Kiwi.Geom.Point;
        private _bounds: Kiwi.Components.Bounds;
        private _dragEnabled: bool = false;
        private _dragDistance: number;
        private _dragSnapToCenter: bool = false;

        //  Allow the entity to be dragged.
        //  snapToCenter - snap the center of the entity to the input x/y (false)
        //  distance - how many pixels to move the mouse away from the downPoint before it considers the drag to have started
        public enableDrag(snapToCenter:bool = false, distance:number = 1) {

            this._dragEnabled = true;
            this._dragSnapToCenter = snapToCenter;
            this._dragDistance = distance;
            this.isDragging = false;

        }

        public disableDrag() {
            this._dragEnabled = false;
            this.isDragging = false;
        }
        
        public update() {

            if (!this._entity.game || this._entity.active === false || this._entity.willRender === false)
            {
                return;
            }

            //  Is the input within the bounds now?
            if (this._bounds.pointWithin(this._entity.game.input.position))
            {
                this.distance.x = this._entity.game.input.position.x - this._bounds.getRect().left;
                this.distance.y = this._entity.game.input.position.y - this._bounds.getRect().top;

                //  Has it just moved inside?
                if (this.withinBounds === false)
                {
                    this.withinBounds = true;
                    this.outsideBounds = false;
                    this._justEntered = true;
                    this.onEntered.dispatch(this._entity, this.distance.x, this.distance.y);
                    
                }
            }
            else
            {
                //  It's outside the bounds now, was it previously in?
                if (this.withinBounds === true && this.isDragging === false)
                {
                    this.withinBounds = false;
                    this.outsideBounds = true;
                    this.onLeft.dispatch(this._entity);
                }
            }

            //  Input is down (click/touch)
            if (this._entity.game.input.isDown === true)
            {
                if (this._justEntered) {
                    this.isDown = true;
                    this.isUp = false;
                    this._tempDragDisabled = true;
                }

                //  Within bounds?
                if (this.withinBounds === true && this.isDown === false)
                {
                    this.isDown = true;
                    this.isUp = false;
                    this.pointDown.copyFrom(this.distance);
                    this.onDown.dispatch(this._entity, this.pointDown.x, this.pointDown.y);
                }

                //  Start Drag check
                if (this._dragEnabled === true && this.isDragging === false && this._tempDragDisabled === false)
                {
                    //  Turn drag on?
                    if (this.isDown === true && this.pointDown.distanceTo(this.distance) >= this._dragDistance)
                    {
                        this.isDragging = true;

                        if (this._dragSnapToCenter === true)
                        {
                            //  Copy the mid-point coordinates into pointDown
                            this.pointDown = this._bounds.getRect().center;
                        }

                        this.onDragStarted.dispatch(this._entity, this.pointDown.x, this.pointDown.y, this._dragSnapToCenter);
                    }
                }
            }
            else
            {
                //  Stop Drag check
                if (this.isDragging === true)
                {
                    this.isDragging = false;
                    this.onDragStopped.dispatch(this._entity);
                }
                
                if (this._tempDragDisabled === true) this._tempDragDisabled = false;

                if (this.isDown === true)
                {
                    this.isDown = false;
                    this.isUp = true;
                    this.onRelease.dispatch(this._entity);
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


