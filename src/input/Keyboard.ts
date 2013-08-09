/// <reference path="Key.ts" />

/**
 *	Kiwi - Input - Keyboard
 *
 *	@desc 		
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 */

module Kiwi.Input {

    export class Keyboard {

        /** 
        * Constructor
        * @param {Kiwi.Game} game.
        * @return {Kiwi.Input.Keyboard} This object.
        */
        constructor (game: Kiwi.Game) {

            this.game = game;

        }

        public objType() {
            return "Keyboard";
        }

        /** 
        * 
        * @property game
        * @type Kiwi.Game
        * @private
        **/
        public game: Kiwi.Game;

        /** 
        * 
        * @property _domElement
        * @type HTMLElement
        * @private
        **/
        private _domElement:HTMLElement = null;

        /** 
        * 
        * @property _keys
        * @type Array
        * @private
        **/
        private _keys:Key[] = [];

        /** 
        * 
        * @property justPressedRate
        * @type Number
        **/
        public justPressedRate: number = 200;
        
        /** 
        * 
        * @property justReleasedRate
        * @type Number
        **/
        public justReleasedRate: number = 200;

        /** 
        * The DOM is ready, so we can start listening now
        * @method boot
        */
        public boot() {

            klog.info('Keyboard Handler booted');

            //this._domElement = this.game.settings.container;
            this.start();

        }

        /** 
        * 
        * @method update
        */
        public update() {
            
            //  Loop through all 'down' keys and update the timers on those still pressed

        }

        /** 
        * 
        * @method start
        */
        public start() {
            if (Kiwi.TARGET === Kiwi.TARGET_BROWSER) {
                //this._domElement.addEventListener('keydown', (event:KeyboardEvent) => this.onKeyDown(event), false);
                //this._domElement.addEventListener('keyup', (event:KeyboardEvent) => this.onKeyUp(event), false);
                document.body.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event), false);
                document.body.addEventListener('keyup', (event: KeyboardEvent) => this.onKeyUp(event), false);
            }
        }

        /** 
        * 
        * @method stop
        */
        public stop() {
            if (Kiwi.TARGET === Kiwi.TARGET_BROWSER) {
                //this._domElement.removeEventListener('keydown', (event:KeyboardEvent) => this.onKeyDown(event), false);
                //this._domElement.removeEventListener('keyup', (event:KeyboardEvent) => this.onKeyUp(event), false);
                this._domElement.removeEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event), false);
                this._domElement.removeEventListener('keyup', (event: KeyboardEvent) => this.onKeyUp(event), false);
            }
        }

        /** 
        * 
        * @method onKeyDown
        * @param {KeyboardEvent} event.
        */
        public onKeyDown(event:KeyboardEvent) {

            if (this._keys[event.keyCode])
            {
                this._keys[event.keyCode].update(event);
            }
            else
            {
                //  TODO - This could create loads of objects we could safely ignore (one for each key)
                this._keys[event.keyCode] = new Kiwi.Input.Key(this, event.keyCode, event);
            }

        }

         /** 
        * 
        * @method onKeyUp
        * @param {Any} event.
        */
        public onKeyUp(event) {

            if (this._keys[event.keyCode])
            {
                this._keys[event.keyCode].update(event);
            }
            else
            {
                //  TODO - This could create loads of objects we could safely ignore (one for each key)
                this._keys[event.keyCode] = new Kiwi.Input.Key(this, event.keyCode, event);
            }

        }

         /** 
        * 
        * @method addKey
        * @param {Number} keycode.
        * @return {Kiwi.Input.Key}
        */
        public addKey(keycode: number): Key {

            return this._keys[keycode] = new Kiwi.Input.Key(this, keycode);

        }

        /** 
        * 
        * @method justPressed
        * @param {Any} key
        */
        public justPressed(key) {

        }

        /** 
        * 
        * @method justReleased
        * @param {Any} key
        */
        public justReleased(key) {

        }

        /** 
        * 
        * @method isDown
        * @param {Number} keycode
        * @return {Boolean}
        */
        public isDown(keycode:number):bool {

            if (this._keys[keycode])
            {
                return this._keys[keycode].isDown;
            }
            else
            {
                return false;
            }

        }

        /** 
        * 
        * @method isUp
        * @param {Number} keycode
        * @return {Boolean}
        */
        public isUp(keycode:number):bool {

            if (this._keys[keycode])
            {
                return this._keys[keycode].isUp;
            }
            else
            {
                return false;
            }

        }

        public reset() {
        }

    }

}
