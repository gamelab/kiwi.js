/**
* Kiwi - Input
* @module Kiwi
* @submodule Input
* 
*/ 

module Kiwi.Input {
    
    /**
    * Handles and Manages the dispatching of keyboard events. When the user press's a button a new Key object is created.
    *
    * @class Keyboard
    * @constructor
    * @param game {Game}
    * @return {Keyboard} This object.
    *
    */
    export class Keyboard {
         
        constructor (game: Kiwi.Game) {

            this.game = game;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Keyboard";
        }

        /** 
        * The game that this Keyboard belongs to.
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
         
        /** 
        * Contains a reference to each Key object when they are either added to this Keyboard manager (by the developer), or when an event fires with that keycode.
        * @property _keys
        * @type Key[]
        * @private
        */
        private _keys:Key[] = [];

        /**
        * Returns all of the Key objects that currently exist. This is READ ONLY.
        * @property keys
        * @type Keys[]
        * @public
        */
        public get keys():Key[] {
            return this._keys;
        }

        /** 
        * The time in milliseconds which determines if a key was just pressed or not.
        * @property justPressedRate
        * @type Number
        * @default 200
        * @public
        */
        public justPressedRate: number = 200;
        
        /** 
        * The time in milliseconds which determines if a key was just released or not.
        * @property justReleasedRate
        * @type Number
        * @default 200
        * @public
        */
        public justReleasedRate: number = 200;

        /** 
        * Is executed when the DOMElements that are need to get the game going are loaded and thus the game can 'boot'
        * @method boot
        * @public
        */
        public boot() {
            this.onKeyUp = new Kiwi.Signal;
            this.onKeyDown = new Kiwi.Signal;
            this.start();
        }

        /** 
        * The update loop that is executed every frame.
        * @method update
        * @public
        */
        public update() {
            //  Loop through all 'down' keys and update the timers on those still pressed
        }
        
        /**
        * A Signal that dispatches events when a key is released/is now up.
        * @property onKeyUp
        * @type Signal
        * @public
        */
        public onKeyUp: Kiwi.Signal;
        
        /**
        * A Signal that dispatches events when a key is pressed/is now down.
        * @property onKeyUp
        * @type Signal
        * @public
        */
        public onKeyDown: Kiwi.Signal;

        /** 
        * Adds the event listeners to the browser to listen for key events.
        * @method start
        * @public 
        */
        public start() {
            if (this.game.deviceTargetOption=== Kiwi.TARGET_BROWSER) {
                //this._domElement.addEventListener('keydown', (event:KeyboardEvent) => this.onKeyDown(event), false);
                //this._domElement.addEventListener('keyup', (event:KeyboardEvent) => this.onKeyUp(event), false);
                document.body.addEventListener('keydown', (event: KeyboardEvent) => this._keyPressed(event), false);
                document.body.addEventListener('keyup', (event: KeyboardEvent) => this._keyReleased(event), false);
            }
        }

        /** 
        * Removes the event listeners and so effectively 'stops' all keyboard events.
        * @method stop
        * @public
        */
        public stop() {
            if (this.game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                //this._domElement.removeEventListener('keydown', (event:KeyboardEvent) => this.onKeyDown(event), false);
                //this._domElement.removeEventListener('keyup', (event:KeyboardEvent) => this.onKeyUp(event), false);
                document.body.removeEventListener('keydown', (event: KeyboardEvent) => this._keyPressed(event), false);
                document.body.removeEventListener('keyup', (event: KeyboardEvent) => this._keyReleased(event), false);
            }
        }

        /** 
        * Is executed when a key is pressed/is down. This then either creates a new Key (if one does not currently exist) for that keycode, 
        * or it updates the key that was pressed (if one does exist). 
        * @method onKeyDown
        * @param {KeyboardEvent} event.
        * @private
        */
        private _keyPressed(event:KeyboardEvent) {

            if (this._keys[event.keyCode]) {
                this._keys[event.keyCode].update(event);
            } else {
                //  TODO - This could create loads of objects we could safely ignore (one for each key)
                this._keys[event.keyCode] = new Kiwi.Input.Key(this, event.keyCode, event);
            }
            this.onKeyDown.dispatch(event.keyCode, this._keys[event.keyCode]);
        }

        /** 
        * Is executed when a key is release/is now up. This then either creates a new Key (if one does not currently exist) for that keycode, 
        * or it updates the key that was released (if one does exist). 
        * @method onKeyUp
        * @param {KeyboardEvent} event.
        * @private
        */
        private _keyReleased(event:KeyboardEvent) {

            if (this._keys[event.keyCode]) {
                this._keys[event.keyCode].update(event);
            } else {
                //  TODO - This could create loads of objects we could safely ignore (one for each key)
                this._keys[event.keyCode] = new Kiwi.Input.Key(this, event.keyCode, event);
            }
            this.onKeyUp.dispatch(event.keyCode, this._keys[event.keyCode]);
        }

        /** 
        * Creates a new Key object for a keycode that is specified.
        * Not strictly needed (as one will be created once an event occurs on that keycode) by can be good for setting the game up.
        * @method addKey
        * @param keycode {Number} The keycode of the key that you want to add.
        * @return {Key}
        * @public
        */
        public addKey(keycode: number): Key {

            return this._keys[keycode] = new Kiwi.Input.Key(this, keycode);

        }

        /** 
        * [NOT CURRENTLY IMPLEMENTED] Returns a boolean indicating if a key was just pressed or not. 
        * @method justPressed
        * @param key {Any} - The key that you would like to check against.
        * @param [duration] {Number} - The duration at which determines if a key was 'just' pressed or not. If not specified defaults to the justPressedRate
        * @public
        */
        public justPressed(key, duration:number=this.justPressedRate) {

        }

        
        /** 
        * [NOT CURRENTLY IMPLEMENTED] Returns a boolean indicating if a key was just released or not. 
        * @method justReleased
        * @param key {Any} - The key that you would like to check against.
        * @param [duration] {Number} - The duration at which determines if a key was 'just' released or not. If not specified defaults to the justReleasedRate
        * @public
        */
        public justReleased(key, duration:number=this.justReleasedRate) {

        }

        /** 
        * Returns a boolean indicating whether a key is down or not.
        * @method isDown
        * @param keycode {Number} The keycode of the key that you are checking.
        * @return {boolean}
        * @public
        */
        public isDown(keycode: number): boolean {

            if (this._keys[keycode]) {
                return this._keys[keycode].isDown;
            } else {
                return false;
            }

        }

        /** 
        * Returns a boolean indicating whether a key is up or not.
        * @method isUp
        * @param keycode {Number} The keycode of the key that you are checking.
        * @return {boolean}
        * @public
        */
        public isUp(keycode: number): boolean {

            if (this._keys[keycode]) {
                return this._keys[keycode].isUp;
            } else {
                return false;
            }

        }
        
        /**
        * Executes the reset method on every Key that currently exists.
        * @method reset
        * @public
        */
        public reset() {
            for (var index in this._keys) {
                this._keys[index].reset();
            }
        }

    }

}
