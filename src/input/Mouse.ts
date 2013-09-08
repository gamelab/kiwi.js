/// <reference path="../core/Game.ts" />
/// <reference path="../core/Signal.ts" />
/// <reference path="MouseCursor.ts" />

module Kiwi.Input {

    export class Mouse {
         
        constructor (game: Kiwi.Game) {
            this._game = game;
        }

        public objType() {
            return "Mouse";
        }
         
        private _game: Kiwi.Game;
         
        private _domElement:HTMLDivElement = null;

        /**  
        * @property LEFT_BUTTON
        * @type Number
        * @static
        **/
        public static LEFT_BUTTON: number = 0;

        /**  
        * @property MIDDLE_BUTTON
        * @type Number
        * @static
        **/
        public static MIDDLE_BUTTON: number = 1;

        /**  
        * @property RIGHT_BUTTON
        * @type Number
        * @static
        **/
        public static RIGHT_BUTTON: number = 2;
         
        public mouseDown: Kiwi.Signal;
        public mouseUp: Kiwi.Signal;
        public mouseWheel: Kiwi.Signal;

        private _cursor: Kiwi.Input.MouseCursor;

        public get cursor(): Kiwi.Input.MouseCursor {
            return this._cursor;
        }

        /** 
        * The DOM is ready, so we can start listening now
        * @method boot
        */
        public boot() {

            this._domElement = this._game.stage.container;

            this._cursor = new Kiwi.Input.MouseCursor(this._game);
            this._cursor.active = true;
            this._cursor.id = 1;
            
            this.mouseDown = new Kiwi.Signal();
            this.mouseUp = new Kiwi.Signal();
            this.mouseWheel = new Kiwi.Signal();

            this.start();
        }

        /*
        * The massive amount of atlases.
        */
        public get isDown():bool {
            return this._cursor.isDown;
        }

        public get isUp():bool {
            return this._cursor.isUp;
        }

        public get duration(): number {
            return this._cursor.duration;
        }
        
        public get x(): number {
            return this._cursor.x;
        }
        
        public get y(): number {
            return this._cursor.y;
        }

        public get wheelDeltaX(): number {
            return this._cursor.wheelDeltaX;
        }

        public get wheelDeltaY(): number {
            return this._cursor.wheelDeltaY;
        }

        public get ctrlKey(): bool {
            return this._cursor.ctrlKey;
        }

        public get shiftKey(): bool {
            return this._cursor.shiftKey;
        }

        public get altKey(): bool {
            return this._cursor.altKey;
        }

        public get button(): number {
            return this._cursor.button;
        }
         
        public update() { 
            this._cursor.update();
        }

        /**  
        * @method start 
        */
        public start() {
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                if (Kiwi.DEVICE.ie && Kiwi.DEVICE.ieVersion < 9) { //remove possibably?
                    this._domElement.attachEvent('onmousedown', (event: MouseEvent) => this.onMouseDown(event));
                    this._domElement.attachEvent('onmousemove', (event: MouseEvent) => this.onMouseMove(event));
                    this._domElement.attachEvent('onmouseup', (event: MouseEvent) => this.onMouseUp(event));
                    this._domElement.attachEvent('onmousewheel', (event: WheelEvent) => this.onMouseWheel(event)); 
                } else {
                    this._domElement.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event), true);
                    this._domElement.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event), true);
                    this._domElement.addEventListener('mouseup', (event: MouseEvent) => this.onMouseUp(event), true);
                    this._domElement.addEventListener('mousewheel', (event: WheelEvent) => this.onMouseWheel(event), true);
                    this._domElement.addEventListener('DOMMouseScroll', (event: WheelEvent) => this.onMouseWheel(event), true);
                }
            }
        }

        /**  
        * @method stop 
        */
        public stop() {
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this._domElement.removeEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event), false);
                this._domElement.removeEventListener('mousedown', this.onMouseDown, false);
                this._domElement.removeEventListener('mousemove', this.onMouseMove, false);
                this._domElement.removeEventListener('mouseup', this.onMouseUp, false);
                this._domElement.removeEventListener('mousewheel', this.onMouseWheel, false);
                this._domElement.removeEventListener('DOMMouseScroll', this.onMouseWheel, false);
            }
        }

        /**  
        * @method onMouseDown
        * @param {MouseEvent} event. 
        */
        private onMouseDown(event: MouseEvent) { 
            this._cursor.start(event); 
            this.mouseDown.dispatch(this._cursor.x, this._cursor.y, this._cursor.timeDown, this._cursor.timeUp, this.duration, this._cursor); 
        }

        /**  
        * @method onMouseMove
        * @param {MouseEvent} event. 
        */
        private onMouseMove(event:MouseEvent) {
            this._cursor.move(event);
        }

        /**  
        * @method onMouseUp
        * @param {MouseEvent} event. 
        */
        private onMouseUp(event:MouseEvent) { 
            this._cursor.stop(event);
            this.mouseUp.dispatch(this._cursor.x, this._cursor.y, this._cursor.timeDown, this._cursor.timeUp, this.duration, this._cursor); 
        }
        
        /**  
        * @method onMouseWheel
        * @param {MouseEvent} event. 
        */
        private onMouseWheel(event: WheelEvent) {
            this._cursor.wheel(event);
            this.mouseWheel.dispatch(this._cursor.wheelDeltaX, this._cursor.wheelDeltaY, this._cursor);
        }

        /**  
        * @method justPressed
        * @param {Number} [duration]. 
        * @return {Boolean}
        */
        public justPressed(duration: number = this._cursor.justPressedRate): bool { 
            return this._cursor.justPressed(duration);
        }

        /**  
        * @method justReleased
        * @param {Number} [duration]. 
        * @return {Boolean}
        */
        public justReleased(duration: number = this._cursor.justReleasedRate): bool { 
            return this._cursor.justReleased(duration); 
        }

        /** 
        * @method reset
        */
        public reset() {
            this._cursor.reset();
        }

    }

}