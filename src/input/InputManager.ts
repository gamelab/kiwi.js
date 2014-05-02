/**
* Section that contains the code related to handling user interaction with a game. 
*
* @module Kiwi
* @submodule Input
* @main Input
*/ 

module Kiwi.Input {

    /**
    * Handles the initialization and management of the various ways a user can interact with the device/game,
    * whether this is through a Keyboard and Mouse or by a Touch. Also contains some of the general callbacks that are 'global' between both Desktop and Mobile based devices.
    * 
    * @class InputManager
    * @constructor
    * @namespace Kiwi.Input
    * @param game {Game} The game that this object belongs to.
    * @return {InputManager} This object.
    *
    */
    export class InputManager {
         
        constructor (game: Kiwi.Game) {
            this.game = game;

        }

        /**
        * The type of object this is.
        * @method objType
        * @return String
        * @public
        */
        public objType() {
            return "InputManager";
        }

        /**
        * A Signal that dispatches a event when any Pointer is pressed from the game.
        * @property onDown
        * @type Signal
        * @public
        */
        public onDown: Kiwi.Signal;
        
        /**
        * A Signal that dispatches a event when any Pointer is released from the game.
        * @property onUp
        * @type Signal
        * @public
        */
        public onUp: Kiwi.Signal;

        /** 
        * The game that this manager belongs to.
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;

        /** 
        * A reference to the mouse manager.
        * @property mouse
        * @type Mouse
        * @public
        */
        public mouse:Kiwi.Input.Mouse;

        /** 
        * The keyboard manager
        * @property keyboard
        * @type Keyboard
        * @public
        */
        public keyboard:Kiwi.Input.Keyboard;

        /** 
        * The touch manager.
        * @property touch
        * @type Touch
        * @public
        */
        public touch:Kiwi.Input.Touch;
        
        /**
        * An array containing all of the pointers that are active on the stage.
        * @property _pointers
        * @type Pointer[]
        * @private
        */
        private _pointers: Kiwi.Input.Pointer[];


        /**
        * Returns all of the pointers that can be used on the Input Manager. This is READ only.
        * @property pointer
        * @type Pointer[]
        * @public
        */
        public get pointers(): Kiwi.Input.Pointer[] {
            return this._pointers;
        }

        /** 
        * This method is executed when the DOM has loaded and the manager is ready to load.
        * @method boot 
        * @public
        */
        public boot() {
            this._pointers = [];

            this.mouse = new Kiwi.Input.Mouse(this.game);
            this.mouse.boot();

            this.keyboard = new Kiwi.Input.Keyboard(this.game);
            this.keyboard.boot();

            this.touch = new Kiwi.Input.Touch(this.game);
            this.touch.boot();

            //Decided which inputs to map to the up/down events.
            if (Kiwi.DEVICE.touch == true ) {
                this.touch.touchDown.add(this._onDownEvent, this);
                this.touch.touchUp.add(this._onUpEvent, this);
                this._pointers = this.touch.fingers;

            } else {
                this.mouse.onDown.add(this._onDownEvent, this);
                this.mouse.onUp.add(this._onUpEvent, this);
                this._pointers.push(this.mouse.cursor);

            }


            this.isDown = false;
            this.position = new Kiwi.Geom.Point();
             
            this.onDown = new Kiwi.Signal();
            this.onUp = new Kiwi.Signal();
        }

        /**
        * A private method that gets dispatched when either the mouse or touch manager dispatches a down event
        * @method _onDownEvent
        * @param x {Number} The x coordinate of the pointer
        * @param y {Number} The y coordinate of the pointer
        * @param timeDown {Number} The time that the pointer has been down for.
        * @param timeUp {Number} The Time that the pointer has been up form
        * @param duration {Number} 
        * @param pointer {Pointer} The pointer that was used.
        * @private
        */
        private _onDownEvent(x, y, timeDown, timeUp, duration, pointer) {
            this.onDown.dispatch(x, y, timeDown, timeUp, duration, pointer);
        }

        
        /**
        * A private method that gets dispatched when either the mouse or touch manager dispatches a up event
        * @method _onUpEvent
        * @param x {Number} The x coordinate of the pointer
        * @param y {Number} The y coordinate of the pointer
        * @param timeDown {Number} The time that the pointer has been down for.
        * @param timeUp {Number} The Time that the pointer has been up form
        * @param duration {Number} 
        * @param pointer {Pointer} The pointer that was used.
        * @private
        */
        private _onUpEvent(x, y, timeDown, timeUp, duration, pointer) {
            this.onUp.dispatch(x, y, timeDown, timeUp, duration, pointer);
        }

        /*
        * An alias for the onPress signal that goes straight to the onDown.
        * @property onPressed
        * @type Signal
        * @public
        */
        public get onPressed(): Kiwi.Signal {
            return this.onDown;
        }
        
        /**
        * An alias for the onRelease signal that goes straight to the onUp
        * @property onReleased
        * @type Signal
        * @public
        */
        public get onReleased(): Kiwi.Signal {
            return this.onUp;
        }

        /** 
        * The update loop that gets executed every frame.
        * @method update 
        * @public
        */
        public update() {
            this.mouse.update();
            this.keyboard.update();
            this.touch.update();

            if (this.touch.touchEnabled) {
                this.position.setTo(this.touch.x, this.touch.y);

            } else {
                this.position.setTo(this.mouse.x, this.mouse.y);

            }

            this.isDown = this.mouse.isDown || this.touch.isDown;

        }

        /** 
        * Runs the reset method on the managers.
        * @method reset
        */
        public reset() {
            this.mouse.reset();
            this.keyboard.reset();
            this.touch.reset();

        }
        
        /**
        * The position of the last pointer that was/is active on the stage.
        * @property position
        * @type Point
        * @public
        */
        public position: Kiwi.Geom.Point;

        /**
        * If an input (either touch or the mouse cursor) is currently down. Not an accurate representation, should use the individual managers.
        * @property isDown
        * @type boolean
        * @public
        */
        public isDown: boolean;
 
        /**
        * Populated x coordinate based on the most recent click/touch event
        * @property x
        * @type Number
        * @public
        */
        public get x(): number {
            return this.position.x;

        }

        /**
        * Populated y coordinate based on the most recent click/touch event
        * @property y
        * @type Number
        * @public
        */
        public get y(): number {
            return this.position.y;

        }

    }

}