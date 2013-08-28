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
        * 
        * @property mouse
        * @type Kiwi.Input.Mouse
        **/
        public mouse:Kiwi.Input.Mouse;

        /** 
        * 
        * @property keyboard
        * @type Kiwi.Input.Keyboard
        **/
        public keyboard:Kiwi.Input.Keyboard;

        /** 
        * 
        * @property touch
        * @type Kiwi.Input.Touch
        **/
        public touch:Kiwi.Input.Touch;

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

        private _onDownEvent(x, y, timeDown, timeUp, duration, pointer) {
            this.onDown.dispatch(x, y, timeDown, timeUp, duration, pointer);
        }

        private _onUpEvent(x, y, timeDown, timeUp, duration, pointer) {
            this.onUp.dispatch(x, y, timeDown, timeUp, duration, pointer);
        }

        /*
        * Signals for pressed and released events.
        */
        public get onPressed(): Kiwi.Signal {
            return this.onDown;
        }

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

        public position: Kiwi.Geom.Point;
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