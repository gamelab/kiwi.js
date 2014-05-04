/**
* 
* @module Kiwi
* @submodule Input
* 
*/ 

module Kiwi.Input {

    /**
    * Handles the dispatching and management of touch based events for the game. When the Touch manager is created TEN finger objects are created and used when the user interacts with the screen. Those finger are what you can use to create games that make the most out of multitouch events. 
    * 
    * @class Touch
    * @constructor
    * @namespace Kiwi.Input
    * @param game {Game} the game that this touch manager belongs to.
    * @return {Touch} This object.
    *
    */
    export class Touch {
         
        constructor(game: Kiwi.Game) {
            this._game = game;
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return String
        * @public
        */
        public objType():string {
            return 'TouchManager';
        }

        /**
        * If the touch inputs are enabled on the current device (and so if the events will fire) or not.
        * @property touchEnabled
        * @type boolean
        * @public
        */
        public touchEnabled: boolean;

        /** 
        * The game that this touch manager belongs to.
        * @property _game
        * @type Game
        * @private
        **/
        private _game: Kiwi.Game;

        /** 
        * The dom element that these touch events are to take place on. This is usally set to be the stage/game container.
        * @property _domElement
        * @type HTMLElement
        * @default null
        * @private
        **/
        private _domElement: HTMLElement = null;
         
        /** 
        * Contains a list of all of the fingers that are used for the touch events.
        * @property _fingers
        * @type Array
        * @private
        */
        private _fingers: Finger[];
        
        /**
        * Get the fingers that are being used.
        * @type Finger[]
        * @public
        */
        public get fingers(): Kiwi.Input.Finger[] {
            return this._fingers;
        }

        /** 
        * The first finger that is used for touch events.
        * @property finger1
        * @type Finger
        * @public
        */
        public finger1: Kiwi.Input.Finger;

        /** 
        * The second finger that is used for touch events.
        * @property finger2
        * @type Finger
        * @public
        */
        public finger2: Kiwi.Input.Finger;

        /** 
        * The third finger that is used for touch events.
        * @property finger3
        * @type Finger
        * @public
        */
        public finger3: Kiwi.Input.Finger;

        /** 
        * The fourth finger that is used for touch events.
        * @property finger4
        * @type Finger
        * @public
        */
        public finger4: Kiwi.Input.Finger;

        /** 
        * Finger number five that is used for touch events.
        * @property finger5
        * @type Finger
        * @public
        */
        public finger5: Kiwi.Input.Finger;

        /** 
        * Finger number six, that is used for touch events.
        * @property finger6
        * @type Finger
        * @public
        */
        public finger6: Kiwi.Input.Finger;

        /** 
        * The seventh finger used for touch events.
        * @property finger7
        * @type Finger
        * @public
        */
        public finger7: Kiwi.Input.Finger;

        /** 
        * Finger number eight
        * @property finger8
        * @type Finger
        * @public
        */
        public finger8: Kiwi.Input.Finger;

        /** 
        * The ninth finger that is used for touch events.
        * @property finger9
        * @type Finger
        * @public
        */
        public finger9: Kiwi.Input.Finger;

        /** 
        * The tenth finger that is used for touch events.
        * @property finger10
        * @type Finger
        * @public
        */
        public finger10: Kiwi.Input.Finger;

        /** 
        * The latest finger that was used for any task.
        * @property latestFinger
        * @type Finger
        * @public
        */
        public latestFinger: Kiwi.Input.Finger;

        /** 
        * A boolean that will roughly indicate if any finger is currently down.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        public isDown: boolean = false;

        /** 
        * If all the fingers are up.
        * @property isUp
        * @type boolean
        * @default true
        * @public
        */
        public isUp: boolean = true;

        /**
        * A Kiwi Signal that dispatches an event when a user presses down on the stage.
        * @property touchDown
        * @type Signal
        * @public
        */
        public touchDown: Kiwi.Signal;
        
        /**
        * A Kiwi Signal that dispatches an event when a user releases a finger off of the stage.
        * @property touchUp
        * @type Signal
        * @public
        */
        public touchUp: Kiwi.Signal;

        /**
        * A Kiwi Signal that dispatches an event when a touch event is cancelled for the some reason.
        * @property touchCancel
        * @tpye Signal
        * @public
        */
        public touchCancel: Kiwi.Signal;

        /** 
        * An internal Kiwi method that runs when the DOM is loaded and the touch manager can now 'boot' up.
        * @method boot
        * @public
        */
        public boot() {
            this._domElement = this._game.stage.container;

            this.finger1 = new Kiwi.Input.Finger(this._game);
            this.finger2 = new Kiwi.Input.Finger(this._game);
            this.finger3 = new Kiwi.Input.Finger(this._game);
            this.finger4 = new Kiwi.Input.Finger(this._game);
            this.finger5 = new Kiwi.Input.Finger(this._game);
            this.finger6 = new Kiwi.Input.Finger(this._game);
            this.finger7 = new Kiwi.Input.Finger(this._game);
            this.finger8 = new Kiwi.Input.Finger(this._game);
            this.finger9 = new Kiwi.Input.Finger(this._game);
            this.finger10 = new Kiwi.Input.Finger(this._game);

            this._fingers = [this.finger1, this.finger2, this.finger3, this.finger4, this.finger5, this.finger6, this.finger7, this.finger8, this.finger9, this.finger10];
            this.latestFinger = this.finger1;

            this.touchDown = new Kiwi.Signal();
            this.touchUp = new Kiwi.Signal();
            this.touchCancel = new Kiwi.Signal();
             
            this.start();
        }

        /** 
        * Starts up the event listeners that are being used on the touch manager.
        * @method start
        * @public
        */
        public start() {

            if (Kiwi.DEVICE.touch) {
                this.touchEnabled = true;

                if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {

                    //If IE....
                    if (Kiwi.DEVICE.pointerEnabled) {
                        var pointerUp = 'pointerup',
                            pointerDown = 'pointerdown',
                            pointerEnter = 'pointerenter',
                            pointerLeave = 'pointerleave',
                            pointerCancel = 'pointercancel',
                            pointerMove = 'pointermove';

                        if ((window.navigator.msPointerEnabled)) {
                            var pointerUp = 'MSPointerUp',
                                pointerDown = 'MSPointerDown',
                                pointerEnter = 'MSPointerEnter',
                                pointerLeave = 'MSPointerLeave',
                                pointerCancel = 'MSPointerCancel',
                                pointerMove = 'MSPointerMove';
                        }

                        this._domElement.addEventListener(pointerUp, (event:MSPointerEvent) => this.onPointerStart(event), false);
                        this._domElement.addEventListener(pointerDown, (event: MSPointerEvent) => this.onPointerEnd(event), false);
                        this._domElement.addEventListener(pointerEnter, (event: MSPointerEvent) => this.onPointerEnter(event), false);
                        this._domElement.addEventListener(pointerLeave, (event: MSPointerEvent) => this.onPointerLeave(event), false);
                        this._domElement.addEventListener(pointerCancel, (event: MSPointerEvent) => this.onPointerCancel(event), false);
                        this._domElement.addEventListener(pointerMove, (event: MSPointerEvent) => this.onPointerMove(event), false);

                    } else {
                        this._domElement.addEventListener('touchstart', (event) => this.onTouchStart(event), false);
                        this._domElement.addEventListener('touchmove', (event) => this.onTouchMove(event), false);
                        this._domElement.addEventListener('touchend', (event) => this.onTouchEnd(event), false);
                        this._domElement.addEventListener('touchenter', (event) => this.onTouchEnter(event), false);
                        this._domElement.addEventListener('touchleave', (event) => this.onTouchLeave(event), false);
                        this._domElement.addEventListener('touchcancel', (event) => this.onTouchCancel(event), false);

                        document.addEventListener('touchmove', (event) => this.consumeTouchMove(event), false);

                    }


                } else if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {

                    this._game.stage.canvas.addEventListener('touchstart', (event) => this.onTouchStart(event), false);
                    this._game.stage.canvas.addEventListener('touchmove', (event) => this.onTouchMove(event), false);
                    this._game.stage.canvas.addEventListener('touchend', (event) => this.onTouchEnd(event), false);
                    this._game.stage.canvas.addEventListener('touchenter', (event) => this.onTouchEnter(event), false);
                    this._game.stage.canvas.addEventListener('touchleave', (event) => this.onTouchLeave(event), false);
                    this._game.stage.canvas.addEventListener('touchcancel', (event) => this.onTouchCancel(event), false);
                }
            } else {
                this.touchEnabled = false;
            }

        }

        /** 
        * Prevent iOS bounce-back (doesn't work?)
        * @method consumeTouchMove
        * @param {Any} event
        * @public
        */
        private consumeTouchMove(event) {
            event.preventDefault();
        }

        /** 
        * Gets the position of the latest finger on the x axis.
        * @property x
        * @type number
        * @public
        */
        public get x(): number {
            return this.latestFinger.x;
        }

        /**  
        * Gets the position of the latest finger on the y axis.
        * @property y
        * @type number
        * @public
        */
        public get y(): number {
            return this.latestFinger.y;
        }

        /**
        * The developer defined maximum number of touch events.
        * By default this is set to 10 but this can be set to be lower.
        * @property _maxTouchEvents
        * @type number
        * @default 10
        * @private
        */
        private _maxPointers: number = 10;

        /**
        * Sets the maximum number of point of contact that are allowed on the game stage at one point.
        * The maximum number of points that are allowed is 10, and the minimum is 0.
        * @type number
        * @public
        */
        public set maximumPointers(val:number) {
            if (val < 0)
                val = 1;
            if (val > this._fingers.length) val = this._fingers.length;
            
            this._maxPointers = val; 
        }

        /**
        * Gets the maximum number of points of contact that are allowed on the game stage at one point.
        * @type number
        * @public
        */
        public get maximumPointers(): number {
            return this._maxPointers;
        }


        /**
        *-------------------------
        * Generic Methods for Dealing with Pointers
        *-------------------------
        */

        /**
        * This method is in charge of registering a "finger"  (either from a Touch/Pointer start method) and assigning it a Finger,
        * You have to pass this method a id which is used to idenfied when released/cancelled.
        * @method _registerFinger
        * @param event {Any} 
        * @param id {Number} 
        * @private
        */
        private _registerFinger(event, id:number) {
            for (var f = 0; f < this._maxPointers; f++) {
                if (this._fingers[f].active === false) {
                    this._fingers[f].id = id;
                    this._fingers[f].start(event);
                    this.latestFinger = this._fingers[f];

                    this.touchDown.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);

                    this.isDown = true;
                    this.isUp = false;
                    break;
                }
            }
        }

        /**
        * This method is in charge of deregistering (removing) a "finger" when it has been released,
        * You have to pass this method a id which is used to identfy the finger to deregister.
        * @method _deregisterFinger
        * @param event {Any} 
        * @param id {Number} 
        * @private
        */
        private _deregisterFinger(event, id) {
            for (var f = 0; f < this._fingers.length; f++) {
                if (this._fingers[f].active && this._fingers[f].id === id) {
                    this._fingers[f].stop(event);
                    this.latestFinger = this._fingers[f];

                    this.touchUp.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);

                    this.isDown = false;
                    this.isUp = true;
                    break;
                }
            }

            //Loop through the fingers and check to see that none of them are down.
            for (var i = 0; i < this._fingers.length; i++) {
                if (this._fingers[i].active) {
                    this.isDown = true;
                    this.isUp = false;
                }
            }
        }

        
        /**
        * This method is in charge of cancelling (removing) a "finger".
        * You have to pass this method a id which is used to idenfied the finger that was cancelled.
        * @method _cancelFinger
        * @param event {Any} 
        * @param id {Number} 
        * @private
        */
        private _cancelFinger(event, id) {
            for (var f = 0; f < this._fingers.length; f++) {
                if (this._fingers[f].active && this._fingers[f].id === id) {
                    this._fingers[f].stop(event);
                    this.touchCancel.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);
                    break;
                }
            }

            //loop through the fingers and check to see that none of them are down.
            for (var i = 0; i < this._fingers.length; i++) {
                if (this._fingers[i].active) {
                    this.isDown = true;
                    this.isUp = false;
                }
            }
        }
        
        
        /**
        * This method is in charge of creating and assigning (removing) a "finger" when it has entered the dom element.
        * You have to pass this method a id which is used to idenfied the finger that was cancelled.
        * @method _enterFinger
        * @param event {Any} 
        * @param id {Number} 
        * @private
        */
        private _enterFinger(event, id) {
            for (var f = 0; f < this._maxPointers; f++) {
                if (this._fingers[f].active === false) {
                    this._fingers[f].id = id;
                    this._fingers[f].start(event);
                    this.latestFinger = this._fingers[f];
                    this.isDown = true;
                    this.isUp = false;
                    break;
                }
            }
        }
        
        /**
        * This method is in charge of removing an assigned "finger" when it has left the DOM Elemetn.
        * You have to pass this method a id which is used to idenfied the finger that left.
        * @method _leaveFinger
        * @param event {Any} 
        * @param id {Number} 
        * @private
        */
        private _leaveFinger(event, id) {
            for (var f = 0; f < this._fingers.length; f++) {
                if (this._fingers[f].active && this._fingers[f].id === id) {
                    this._fingers[f].leave(event);
                    break;
                }
            }
        }
        
        /**
        * This method is in charge of updating the coordinates of a "finger" when it has moved..
        * You have to pass this method a id which is used to idenfied the finger that moved.
        * @method _moveFinger
        * @param event {Any} 
        * @param id {Number} 
        * @private
        */
        private _moveFinger(event, id) {
            for (var f = 0; f < this._fingers.length; f++) {
                if (this._fingers[f].active && this._fingers[f].id === id) {
                    this._fingers[f].move(event);
                    this.latestFinger = this._fingers[f];
                    break;
                }
            }
        }

        
        /**
        *-------------------
        * Touch Events
        *-------------------
        **/


        /** 
        * This method runs when the a touch start event is fired by the browser and then assigns the event to a pointer that is currently not active.
        * https://developer.mozilla.org/en-US/docs/DOM/TouchList
        * @method onTouchStart
        * @param {Any} event
        * @private
        */
        private onTouchStart(event) {
            
            for (var i = 0; i < event.changedTouches.length; i++) {
                this._registerFinger(event.changedTouches[i], event.changedTouches[i].identifier);
            }

        }

        /** 
        * Doesn't appear to be supported by most browsers yet but if it was it would fire events when a touch is canceled.
        * http://www.w3.org/TR/touch-events/#dfn-touchcancel
        * @method onTouchCancel
        * @param {Any} event
        * @private
        */
        private onTouchCancel(event) {

            for (var i = 0; i < event.changedTouches.length; i++) {
                this._cancelFinger(event.changedTouches[i], event.changedTouches[i].identifier);
            }

        }

        /** 
        * Doesn't appear to be supported by most browsers yet. But if it was would fire events when touch events enter an element. 
        * @method onTouchEnter
        * @param {Any} event
        * @private
        */
        private onTouchEnter(event) {

            // For touch enter and leave its a list of the touch points that have entered or left the target
            for (var i = 0; i < event.changedTouches.length; i++) {
                this._enterFinger(event.changedTouches[i], event.changedTouches[i].identifier);
            }

        }

        /** 
        * Doesn't appear to be supported by most browsers yet. Would fire events when a 'finger' leaves an element.     
        * Would be handly for when an finger 'leaves' the stage.
        * @method onTouchLeave
        * @param {Any} event
        * @private
        */
        private onTouchLeave(event) {

            // For touch enter and leave its a list of the touch points that have entered or left the target 
            for (var i = 0; i < event.changedTouches.length; i++) {
                this._leaveFinger(event.changedTouches[i], event.changedTouches[i].identifier);
            }

        }

        /** 
        * When a touch pointer moves. This method updates the appropriate pointer.
        * @method onTouchMove
        * @param {Any} event
        * @private
        */
        private onTouchMove(event) {

            for (var i = 0; i < event.changedTouches.length; i++) {
                this._moveFinger(event.changedTouches[i], event.changedTouches[i].identifier);
            }

        }

        /** 
        * When a touch event gets released.
        * https://developer.mozilla.org/en-US/docs/DOM/TouchList
        * @method onTouchEnd
        * @param {Any} event
        * @private
        */
        private onTouchEnd(event) {

            for (var i = 0; i < event.changedTouches.length; i++) {
                this._deregisterFinger(event.changedTouches[i], event.changedTouches[i].identifier);
            }
            
        }


        /**
        *-------------------
        * Pointer Events
        *-------------------
        **/


        /** 
        * Event that is fired when a pointer is initially pressed.
        * @method onPointerStart
        * @param event {PointerEvent}
        * @private
        */
        private onPointerStart(event: MSPointerEvent) {
            if (event.type === 'touch') {
                this._registerFinger(event, event.pointerId);
            }
        }

        /** 
        * Event that is fired by a pointer event listener upon a pointer canceling for some reason. 
        * @method onPointerCancel
        * @param event {PointerEvent}
        * @private
        */
        private onPointerCancel(event: MSPointerEvent) {
            if (event.type === 'touch') {
                this._cancelFinger(event, event.pointerId);
            }
        }

        /** 
        * Event that is fired by a pointer event listener upon a pointer entering the DOM Element the event listener is attached to.
        * @method onPointerEnter
        * @param event {PointerEvent}
        * @private
        */
        private onPointerEnter(event: MSPointerEvent) {
            if (event.type === 'touch') {
                this._enterFinger(event, event.pointerId);
            }
        }

        /** 
        * Event that is fired by a pointer event listener upon a pointer being leaving the DOM Element the event listener is attached to.
        * @method onPointerLeave
        * @param event {PointerEvent}
        * @private
        */
        private onPointerLeave(event: MSPointerEvent) {
            if (event.type === 'touch') {
                this._leaveFinger(event, event.pointerId);
            }
        }

        /**
        * Event that is fired by a pointer event listener upon a pointer moving.
        * @method onPointerMove
        * @param event {PointerEvent}
        */
        private onPointerMove(event: MSPointerEvent) {
            if (event.type === 'touch') {
                this._moveFinger(event, event.pointerId);
            }
        }
        
        /** 
        * Event that is fired by a pointer event listener upon a pointer being released.
        * @method onPointerEnd
        * @param event {PointerEvent}
        * @private
        */
        private onPointerEnd(event: MSPointerEvent) {
            if (event.type === 'touch') {
                this._deregisterFinger(event, event.pointerId);
            }
        }


        /**
        *-----------------
        * Normal Methods 
        *-----------------
        **/


        /** 
        * The update loop fro the touch manager.
        * @method update 
        * @public
        */
        public update() {
            if (this.touchEnabled && this.isDown) {

                for (var i = 0; i < this._fingers.length; i++) {
                    if (this._fingers[i].active) {
                        this._fingers[i].update();
                    }
                }

            }
        }


        /** 
        * This method removes all of the event listeners and thus 'stops' the touch manager.
        * @method stop 
        * @public
        */
        public stop() {

            if (this.touchEnabled) {
                if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {

                    this._domElement.removeEventListener('touchstart', (event) => this.onTouchStart(event), false);
                    this._domElement.removeEventListener('touchmove', (event) => this.onTouchMove(event), false);
                    this._domElement.removeEventListener('touchend', (event) => this.onTouchEnd(event), false);
                    this._domElement.removeEventListener('touchenter', (event) => this.onTouchEnter(event), false);
                    this._domElement.removeEventListener('touchleave', (event) => this.onTouchLeave(event), false);
                    this._domElement.removeEventListener('touchcancel', (event) => this.onTouchCancel(event), false);

                } else if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {

                    this._game.stage.canvas.removeEventListener('touchstart', (event) => this.onTouchStart(event), false);
                    this._game.stage.canvas.removeEventListener('touchmove', (event) => this.onTouchMove(event), false);
                    this._game.stage.canvas.removeEventListener('touchend', (event) => this.onTouchEnd(event), false);
                    this._game.stage.canvas.removeEventListener('touchenter', (event) => this.onTouchEnter(event), false);
                    this._game.stage.canvas.removeEventListener('touchleave', (event) => this.onTouchLeave(event), false);
                    this._game.stage.canvas.removeEventListener('touchcancel', (event) => this.onTouchCancel(event), false);
                }
            }
        }

        /**  
        * Resets all of the fingers/pointers to their default states.
        * @method reset
        * @public
        */
        public reset() {
            for (var i = 0; i < this._fingers.length; i++) {
                this._fingers[i].reset();
            }
        }

    }

}
