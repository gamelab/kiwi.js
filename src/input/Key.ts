/**
* 
* @module Kiwi
* @submodule Input
* 
*/ 

module Kiwi.Input {
    
    /**
    * A compact object that holds the most important details about a Keyboard Event response.
    *
    * @class Key
    * @constructor
    * @param manager {Keyboard} The keyboard manager that this key belongs to. 
    * @param keycode {Number} The keycode that this key is. 
    * @param [event] {KeyboardEvent} The keyboard event (if there was one) when this was created.
    * @return {Key} This object.
    *
    */
    export class Key {

        constructor (manager: Kiwi.Input.Keyboard, keycode: number, event?: KeyboardEvent) {

            this._manager = manager;
            this.keyCode = keycode;

            if (event) {
                this.update(event);
            }

        }
        
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Key";
        }

        /** 
        * The keyboard manager that this key belongs to.
        * @property _manager
        * @type Keyboard
        * @private
        */
        private _manager: Kiwi.Input.Keyboard;

        /** 
        * The keycode that this key is.
        * @property keyCode
        * @type Number
        * @public
        */
        public keyCode: number;

        /** 
        * Indicated whether or not the key is currently down.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        public isDown: boolean = false;

        /** 
        * Indicates whether or not the key is currently up.
        * @property isUp
        * @type boolean
        * @default true
        * @public 
        */
        public isUp: boolean = true;

        /** 
        * If the alt key was held at the time of the event happening.
        * @property altKey
        * @type boolean
        * @default false
        * @public 
        */
        public altKey: boolean = false;

        /** 
        * If the ctrl key was held at the time of the event happening.
        * @property ctrlKey
        * @type boolean
        * @default false
        * @public
        */
        public ctrlKey: boolean = false;

        /** 
        * If the shift key was held at the time of the event happening.
        * @property shiftKey
        * @type boolean
        * @default false
        * @public
        */
        public shiftKey: boolean = false;

        /** 
        * The time that the key was pressed initially.
        * @property timeDown
        * @type Number
        * @default 0
        * @public
        */
        public timeDown: number = 0;

        /** 
        * [CURRENTLY NOT IMPLEMENTED] The duration (in milliseconds) that the key has been down for.
        * @property duration
        * @type Number
        * @default 0
        * @public
        */
        public duration: number = 0;

        /** 
        * The time at which the key was released. 
        * @property timeUp
        * @type Number
        * @default 0
        * @public
        */
        public timeUp: number = 0;

        /** 
        * If the key was already down when the down event fired again, this indicates the number of times the event has fired. 
        * @property repeats
        * @type Number
        * @default 0
        * @public
        */
        public repeats: number = 0;

        /** 
        * The 'update' method fires when an event occur's. Updates the keys properties
        * @method update
        * @param event {KeyboardEvent} 
        * @public
        */
        public update(event: KeyboardEvent) {

            this.keyCode = event.keyCode;

            if (event.type === 'keydown') {
                this.altKey = event.altKey;
                this.ctrlKey = event.ctrlKey;
                this.shiftKey = event.shiftKey;

                if (this.isDown === true) {
                    //  Key was already held down, this must be a repeat rate based event
                    this.repeats++;
                } else {
                    this.isDown = true;
                    this.isUp = false;
                    this.timeDown = event.timeStamp;
                    this.duration = 0;
                }
            } else if (event.type === 'keyup') {
                this.isDown = false;
                this.isUp = true;
                this.timeUp = event.timeStamp;
            }

        }

        /** 
        * Returns a boolean indicating whether or not this key was just pressed.
        * @method justPressed
        * @param [duration] {Number} The duration at which determines if a key was just pressed. Defaults to the managers just pressed rate.
        * @return {boolean} 
        * @public
        */
        public justPressed(duration: number = this._manager.justPressedRate): boolean {

            if (this.isDown === true && (this.timeDown + duration) < this._manager.game.time.now()) {
                return true;
            } else {
                return false;
            }

        }

        /** 
        * Returns a boolean indicating whether or not this key was just released.
        * @method justReleased
        * @param [duration] {Number} The duration at which determines if a key was just released. Defaults to the managers just pressed rate.
        * @return {boolean} 
        * @public
        */
        public justReleased(duration: number = this._manager.justReleasedRate): boolean {

            if (this.isUp === true && (this.timeUp + duration) < this._manager.game.time.now()) {
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
        * Resets all of the properties on the Key to their default values. 
        * @method reset
        * @public
        */
        public reset() {
            this.isDown = false;
            this.isUp = true;
            this.timeUp = 0;
            this.timeDown = 0;
            this.duration = 0;
            this.altKey = false;
            this.shiftKey = false;
            this.ctrlKey = false;
        }

    }

}