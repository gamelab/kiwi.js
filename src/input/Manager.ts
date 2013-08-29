/// <reference path="Mouse.ts" />

/**
 *	Kiwi - Input - Manager
 *
 *	@desc 		A Proxy to the Input handling classes
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 */

module Kiwi.Input {

    export class Manager {

        /** 
        * Constructor
        * @param {Kiwi.Game} game.
        * @return {Kiwi.Input.Manager} This object.
        */
        constructor (game: Kiwi.Game) {

            this.game = game;

        }

        /**
        * The type of object this is.
        * @method objType
        */
        public objType() {
            return "Manager";
        }

        /*
        * Kiwi Signals for listening to certain events.
        */
        public onDown: Kiwi.Signal;
        public onUp: Kiwi.Signal;

        /** 
        * 
        * @property game
        * @type Kiwi.Game
        **/
        public game: Kiwi.Game;

        /** 
        * A reference to the mouse manager
        * @property mouse
        * @type Kiwi.Input.Mouse
        **/
        public mouse:Kiwi.Input.Mouse;

        /** 
        * The keyboard manager
        * @property keyboard
        * @type Kiwi.Input.Keyboard
        **/
        public keyboard:Kiwi.Input.Keyboard;

        /** 
        * The touch manager.
        * @property touch
        * @type Kiwi.Input.Touch
        **/
        public touch:Kiwi.Input.Touch;
        
        /**
        * An array containing all of the pointers that are active on the stage.
        * @property _pointers
        * @type Kiwi.Input.Pointer[]
        */
        private _pointers: Kiwi.Input.Pointer[];

        public get pointers(): Kiwi.Input.Pointers {
            return this._pointers;
        }

        /** 
        * The DOM is ready, so we can start the managers listening now
        * @method boot 
        */
        public boot() {

            if (Kiwi.DEVICE.touch === true)
            {
                this.touch = new Kiwi.Input.Touch(this.game);
                this.touch.boot();
                this.touch.touchDown.add(this._onDownEvent, this);
                this.touch.touchUp.add(this._onUpEvent, this);
                this._pointers = this.touch.fingers;
            } else {
                this.mouse = new Kiwi.Input.Mouse(this.game);
                this.mouse.boot();
                this.mouse.mouseDown.add(this._onDownEvent, this);
                this.mouse.mouseUp.add(this._onUpEvent, this);
                this._pointers = [this.mouse.cursor];
                this.keyboard = new Kiwi.Input.Keyboard(this.game);
                this.keyboard.boot();
            }

            this.isDown = false;
            this.position = new Kiwi.Geom.Point();
             
            this.onDown = new Kiwi.Signal();
            this.onUp = new Kiwi.Signal();
        }
        
        /**
        * A private method that gets dispatched when either the mouse or touch manager dispatches a down event
        * @method _onDownEvent
        * @param {Number} x
        * @param {Number} y
        * @param {Number} timeDown
        * @param {Number} timeUp
        * @param {Number} duration
        * @param {Kiwi.Input.Pointer} pointer
        */
        private _onDownEvent(x, y, timeDown, timeUp, duration, pointer) {
            this.onDown.dispatch(x, y, timeDown, timeUp, duration, pointer);
        }

        
        /**
        * A private method that gets dispatched when either the mouse or touch manager dispatches a up event
        * @method _onUpEvent
        * @param {Number} x
        * @param {Number} y
        * @param {Number} timeDown
        * @param {Number} timeUp
        * @param {Number} duration
        * @param {Kiwi.Input.Pointer} pointer
        */
        private _onUpEvent(x, y, timeDown, timeUp, duration, pointer) {
            this.onUp.dispatch(x, y, timeDown, timeUp, duration, pointer);
        }

        /*
        * An alias for the onPress signal that goes straight to the onDown.
        */
        public get onPressed(): Kiwi.Signal {
            return this.onDown;
        }
        
        /**
        * An alias for the onRelease signal that goes straight to the onUp
        */
        public get onReleased(): Kiwi.Signal {
            return this.onUp;
        }

        /** 
        * 
        * @method update 
        */
        public update() {

            if (Kiwi.DEVICE.touch === true)
            {
                this.touch.update();
                this.position.setTo(this.touch.x, this.touch.y);
                this.isDown = this.touch.isDown;
            }
            else
            {
                this.keyboard.update();
                this.mouse.update();
                this.position.setTo(this.mouse.x, this.mouse.y);
                this.isDown = this.mouse.isDown;
            }

        }

        /** 
        * 
        * @method reset
        */
        public reset() {

            if (Kiwi.DEVICE.touch === true)
            {
                this.touch.reset();
            }
            else
            {
                this.mouse.reset();
                this.keyboard.reset();
            }

        }
        
        /*
        * The position of the last pointer that was/is active on the stage.
        * @property position
        * @type Kiwi.Geom.Point
        */
        public position: Kiwi.Geom.Point;

        /*
        * If an input is currently down. Not an accurate representation, should use the individual managers.
        * @property isDown
        * @type bool
        */
        public isDown: bool;
 
        /**
        * Populated x coordinate based on the most recent click/touch event
        * @property x
        * @type Number
        */
        public get x(): number {

            return this.position.x;

        }

        /**
        * Populated y coordinate based on the most recent click/touch event
        * @property y
        * @type Number
        */
        public get y(): number {

            return this.position.y;

        }

    }

}