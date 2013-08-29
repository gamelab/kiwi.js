/// <reference path="../core/Game.ts" />
/// <reference path="Finger.ts" />
/// <reference path="../core/Signal.ts" />

/**
 *	Kiwi - Input - Touch
 *
 *	@desc 		http://www.w3.org/TR/touch-events/
 *              https://developer.mozilla.org/en-US/docs/DOM/TouchList
 *              Android 2.x only supports 1 touch event at once, no multi-touch
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 *
 *  @todo       Try and resolve update lag in Chrome/Android
 *              Gestures (pinch, zoom, swipe)
 *              Entity Touch
 *              Touch point within entity
 *              Input Zones (mouse and touch) - lock entities within them + axis aligned drags
 */

module Kiwi.Input {

    export class Touch {

        /** 
        * Constructor
        * @param {Kiwi.Game} game.
        * @return {Kiwi.Input.Touch} This object.
        */
        constructor(game: Kiwi.Game) {
            this._game = game;
        }

        /** 
        * @property _game
        * @type Kiwi.Game
        * @private
        **/
        private _game: Kiwi.Game;

        /** 
        * @property _domElement
        * @type HTMLElement
        * @private
        **/
        private _domElement: HTMLElement = null;
         
        /** 
        * @property _fingers
        * @type Array
        * @private
        **/
        private _fingers: Finger[];
        
        /**
        * Get the fingers that are being used.
        * @type Kiiw.Input.Finger[]
        */
        public get fingers(): Kiwi.Input.Finger[] {
            return this._fingers;
        }

        /** 
        * @property finger1
        * @type Kiwi.Input.Finger
        **/
        public finger1: Kiwi.Input.Finger;

        /** 
        * @property finger2
        * @type Kiwi.Input.Finger
        **/
        public finger2: Kiwi.Input.Finger;

        /** 
        * @property finger3
        * @type Kiwi.Input.Finger
        **/
        public finger3: Kiwi.Input.Finger;

        /** 
        * @property finger4
        * @type Kiwi.Input.Finger
        **/
        public finger4: Kiwi.Input.Finger;

        /** 
        * @property finger5
        * @type Kiwi.Input.Finger
        **/
        public finger5: Kiwi.Input.Finger;

        /** 
        * @property finger6
        * @type Kiwi.Input.Finger
        **/
        public finger6: Kiwi.Input.Finger;

        /** 
        * @property finger7
        * @type Kiwi.Input.Finger
        **/
        public finger7: Kiwi.Input.Finger;

        /** 
        * @property finger8
        * @type Kiwi.Input.Finger
        **/
        public finger8: Kiwi.Input.Finger;

        /** 
        * @property finger9
        * @type Kiwi.Input.Finger
        **/
        public finger9: Kiwi.Input.Finger;

        /** 
        * @property finger10
        * @type Kiwi.Input.Finger
        **/
        public finger10: Kiwi.Input.Finger;

        /** 
        * @property latestFinger
        * @type Kiwi.Input.Finger
        **/
        public latestFinger: Kiwi.Input.Finger;

        /** 
        * If any finger is down.
        * @property isDown
        * @type Boolean
        **/
        public isDown: bool = false;

        /** 
        * If all the fingers are up.
        * @property isUp
        * @type Boolean
        **/
        public isUp: bool = true;

        /*
        * Event listeners that are for touch events in general
        */
        public touchDown: Kiwi.Signal;
        public touchUp: Kiwi.Signal;
        public touchCancel: Kiwi.Signal;

        /** 
        * The DOM is ready, so we can start listening now
        * @method boot
        */
        public boot() {
            klog.info('Touch Handler booted');

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
        */
        public start() {
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) { 
                this._domElement.addEventListener('touchstart', (event) => this.onTouchStart(event), false);
                this._domElement.addEventListener('touchmove', (event) => this.onTouchMove(event), false);
                this._domElement.addEventListener('touchend', (event) => this.onTouchEnd(event), false);
                this._domElement.addEventListener('touchenter', (event) => this.onTouchEnter(event), false);
                this._domElement.addEventListener('touchleave', (event) => this.onTouchLeave(event), false);
                this._domElement.addEventListener('touchcancel', (event) => this.onTouchCancel(event), false);
                
                document.addEventListener('touchmove', (event) => this.consumeTouchMove(event), false);
            }

            //cocoon events need to be added here... These should hopefully just be through the window
        }

        /** 
        * Prevent iOS bounce-back (doesn't work?)
        * @method consumeTouchMove
        * @param {Any} event
        **/
        private consumeTouchMove(event) {
            event.preventDefault();
        }

        /** 
        * Gets the position of the latest finger on the x axis.
        * @method x
        * @return {Number}
        **/
        public get x(): number {
            return this.latestFinger.x;
        }

        /**  
        * Gets the position of the latest finger on the y axis.
        * @method y
        * @return {Number}
        **/
        public get y(): number {
            return this.latestFinger.y;
        }

        /** 
        * @method onTouchStart
        * @param {Any} event
        **/
        private onTouchStart(event) {
            klog.info('touch start');

            event.preventDefault();

            //  A list of all the touch points that BECAME active with the current event
            //  https://developer.mozilla.org/en-US/docs/DOM/TouchList

            //  event.targetTouches = list of all touches on the TARGET ELEMENT (i.e. game dom element)
            //  event.touches = list of all touches on the ENTIRE DOCUMENT, not just the target element
            //  event.changedTouches = the touches that CHANGED in this event, not the total number of them

            for (var i = 0; i < event.changedTouches.length; i++)
            {
                //loop though the fingers to find the first one that is not active
                for (var f = 0; f < this._fingers.length; f++) 
                {
                    if (this._fingers[f].active === false) {
                        this._fingers[f].start(event.changedTouches[i]);
                        this.latestFinger = this._fingers[f];

                        this.touchDown.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);
                        
                        this.isDown = true;
                        this.isUp = false;
                        break;  
                    }
                }
            }

        }

        /** 
        * Doesn't appear to be supported by most browsers yet
        * @method onTouchCancel
        * @param {Any} event
        **/
        private onTouchCancel(event) {

            //event.preventDefault();

            //  Touch cancel - touches that were disrupted (perhaps by moving into a plugin or browser chrome)
            //  http://www.w3.org/TR/touch-events/#dfn-touchcancel
            //  event.changedTouches = the touches that CHANGED in this event, not the total number of them
            for (var i = 0; i < event.changedTouches.length; i++)
            {
                for (var f = 0; f < this._fingers.length; f++)
                {
                    if (this._fingers[f].id === event.changedTouches[i].identifier) {
                        this._fingers[f].stop(event.changedTouches[i]);
                        this.touchCancel.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);
                        break;
                    }
                }
            }

        }

        /** 
        * Doesn't appear to be supported by most browsers yet
        * @method onTouchEnter
        * @param {Any} event
        **/
        private onTouchEnter(event) {

            //event.preventDefault();

            //  For touch enter and leave its a list of the touch points that have entered or left the target
            for (var i = 0; i < event.changedTouches.length; i++)
            {
                for (var f = 0; f < this._fingers.length; f++) {
                    if (this._fingers[f].active === false) {
                        this._fingers[f].start(event.changedTouches[i]);
                        break;
                    }
                }
            }

        }

        /** 
        * Doesn't appear to be supported by most browsers yet
        * @method onTouchLeave
        * @param {Any} event
        **/
        private onTouchLeave(event) {

            //event.preventDefault();

            //console.log('touch leave', event);

            //  For touch enter and leave its a list of the touch points that have entered or left the target 
            for (var i = 0; i < event.changedTouches.length; i++)
            {
                for (var f = 0; f < this._fingers.length; f++)
                {
                    if (this._fingers[f].id === event.changedTouches[i].identifier) {
                        this._fingers[f].leave(event.changedTouches[i]);
                        break;
                    }
                }
            }

        }

        /** 
        * When a touch pointer moves.
        * @method onTouchMove
        * @param {Any} event
        **/
        private onTouchMove(event) {

            //event.preventDefault();
            
            //  event.targetTouches = list of all touches on the TARGET ELEMENT (i.e. game dom element)
            //  event.touches = list of all touches on the ENTIRE DOCUMENT, not just the target element
            //  event.changedTouches = the touches that CHANGED in this event, not the total number of them
            for (var i = 0; i < event.changedTouches.length; i++)
            {
                for (var f = 0; f < this._fingers.length; f++)
                {
                    if (this._fingers[f].id  === event.changedTouches[i].identifier) {
                        this._fingers[f].move(event.changedTouches[i]);
                        this.latestFinger = this._fingers[f]; 
                        break;
                    }
                }
            }

        }

        /** 
        * When a touch event gets released.
        * @method onTouchEnd
        * @param {Any} event
        **/
        private onTouchEnd(event) {

            //event.preventDefault();

            //  For touch end its a list of the touch points that have been removed from the surface
            //  https://developer.mozilla.org/en-US/docs/DOM/TouchList

            //  event.changedTouches = the touches that CHANGED in this event, not the total number of them
            for (var i = 0; i < event.changedTouches.length; i++)
            {
                for (var f = 0; f < this._fingers.length; f++)
                {
                    if (this._fingers[f].id === event.changedTouches[i].identifier)
                    {
                        this._fingers[f].stop(event.changedTouches[i]);
                        this.latestFinger = this._fingers[f];
                        
                        this.touchUp.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]); 

                        this.isDown = false;
                        this.isUp = true;
                        break;
                    }
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
        * @method update 
        */
        public update() {
            if (this.isDown) {
                for (var i = 0; i < this._fingers.length; i++) {
                    if (this._fingers[i].active) {
                        this._fingers[i].update();
                    }
                }
            }
        }

        /** 
        * @method stop 
        */
        public stop() {

            this._domElement.removeEventListener('touchstart', (event) => this.onTouchStart(event), false);
            this._domElement.removeEventListener('touchmove', (event) => this.onTouchMove(event), false);
            this._domElement.removeEventListener('touchend', (event) => this.onTouchEnd(event), false);
            this._domElement.removeEventListener('touchenter', (event) => this.onTouchEnter(event), false);
            this._domElement.removeEventListener('touchleave', (event) => this.onTouchLeave(event), false);
            this._domElement.removeEventListener('touchcancel', (event) => this.onTouchCancel(event), false);

        }

        /**  
        * Resets the fingers
        * @method reset
        **/
        public reset() {
            for (var i = 0; i < this._fingers.length; i++) {
                this._fingers[i].reset();
            }
        }

    }

}
