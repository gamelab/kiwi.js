/// <reference path="../core/Game.ts" />
/// <reference path="../geom/Point.ts" />

/**
 *	Kiwi - Input - Mouse
 *
 *	@desc 		
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 *
 *  @todo       Apply DOM offset + scale to values
 */

module Kiwi.Input {

    export class Mouse {

        /** 
        * Constructor
        * @param {Kiwi.Game} game.
        * @return {Kiwi.Input.Mouse} This object.
        */
        constructor (game: Kiwi.Game) {

            this._game = game;

        }

        public objType() {
            return "Mouse";
        }

        /** 
        * 
        * @property _game
        * @type Kiwi.Game
        * @private
        **/
        private _game: Kiwi.Game;

        /** 
        * 
        * @property _domElement
        * @type HTMLDivElement
        * @private
        **/
        private _domElement:HTMLDivElement = null;

        /** 
        * 
        * @property point
        * @type Kiwi.Geom.Point
        **/
        public point: Kiwi.Geom.Point = null;

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
        * 
        * @property _x
        * @type Number
        * @private
        **/
        private _x: number;

        /** 
        * 
        * @property _y
        * @type Number
        * @private
        **/
        private _y: number;

        /** 
        * 
        * @property screenX
        * @type Number
        **/
        public screenX: number;

        /** 
        * 
        * @property screenY
        * @type Number
        **/
        public screenY: number;

        /** 
        * 
        * @property clientX
        * @type Number
        **/
        public clientX: number;

        /** 
        * 
        * @property clientY
        * @type Number
        **/
        public clientY: number;

        /** 
        * 
        * @property wheelDeltaX
        * @type Number
        **/
        public wheelDeltaX: number;

        /** 
        * 
        * @property wheelDeltaY
        * @type Number
        **/
        public wheelDeltaY: number;

        /** 
        * 
        * @property ctrlKey
        * @type Boolean
        **/
        public ctrlKey: bool;

        /** 
        * 
        * @property shiftKey
        * @type Boolean
        **/
        public shiftKey: bool;

        /** 
        * 
        * @property altKey
        * @type Boolean
        **/
        public altKey: bool;

        /** 
        * 
        * @property button
        * @type Number
        **/
        public button: number;

        /** 
        * 
        * @property LEFT_BUTTON
        * @type Number
        * @static
        **/
        public static LEFT_BUTTON: number = 0;

        /** 
        * 
        * @property MIDDLE_BUTTON
        * @type Number
        * @static
        **/
        public static MIDDLE_BUTTON: number = 1;

        /** 
        * 
        * @property RIGHT_BUTTON
        * @type Number
        * @static
        **/
        public static RIGHT_BUTTON: number = 2;

        /** 
        * 
        * @property isDown
        * @type Boolean
        **/
        public isDown: bool = false;

        /** 
        * 
        * @property isUp
        * @type Boolean
        **/
        public isUp: bool = true;

        /** 
        * 
        * @property timeDown
        * @type Number
        **/
        public timeDown: number = 0;

        /** 
        * 
        * @property duration
        * @type Number
        **/
        public duration: number = 0;

        /** 
        * 
        * @property timeUp
        * @type Number
        **/
        public timeUp: number = 0;

        public mouseDown: Kiwi.Signal;
        public mouseUp: Kiwi.Signal;

        /** 
        * The DOM is ready, so we can start listening now
        * @method boot
        */
        public boot() {
            klog.info('Mouse Handler booted');

            this._domElement = this._game.stage.container;

            this.point = new Kiwi.Geom.Point();

            this.mouseDown = new Kiwi.Signal();
            this.mouseUp = new Kiwi.Signal();

            this.start();
        }


        /** 
        * 
        * @method update 
        */
        public update() {

            if (this.isDown === true)
            {
                this.duration = this._game.time.now() - this.timeDown;
            }

        }

        /** 
        * 
        * @method start 
        */
        public start() {
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                if (Kiwi.DEVICE.ie && Kiwi.DEVICE.ieVersion < 9)
                {
                    this._domElement.attachEvent('onmousedown', (event: MouseEvent) => this.onMouseDown(event));
                    this._domElement.attachEvent('onmousemove', (event: MouseEvent) => this.onMouseMove(event));
                    this._domElement.attachEvent('onmouseup', (event: MouseEvent) => this.onMouseUp(event));
                    this._domElement.attachEvent('onmousewheel', (event: WheelEvent) => this.onMouseWheel(event));
                    //this._domElement.attachEvent('DOMMouseScroll', (event: WheelEvent) => this.onMouseWheel(event));
                }
                else
                {
                    this._domElement.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event), true);
                    this._domElement.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event), true);
                    this._domElement.addEventListener('mouseup', (event: MouseEvent) => this.onMouseUp(event), true);
                    this._domElement.addEventListener('mousewheel', (event: WheelEvent) => this.onMouseWheel(event), true);
                    this._domElement.addEventListener('DOMMouseScroll', (event: WheelEvent) => this.onMouseWheel(event), true);
                }
            }
        }

        /** 
        * 
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
        * 
        * @method onMouseDown
        * @param {MouseEvent} event. 
        */
        public onMouseDown(event: MouseEvent) {

            //event.stopPropagation();

            this.screenX = event.screenX;
            this.screenY = event.screenY;
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            this.ctrlKey = event.ctrlKey;
            this.shiftKey = event.shiftKey;
            this.altKey = event.altKey;
            this.button - event.button;

            this._x = this.clientX - this._game.stage.offset.x;
            this._y = this.clientY - this._game.stage.offset.y;

            this.point.setTo(this._x, this._y);

            this.isDown = true;
            this.isUp = false;
            this.timeDown = event.timeStamp;

            this.mouseDown.dispatch(this._x, this._y, this.timeDown, this.timeUp, this.duration);

            //console.log('cx', this.clientX, 'cy', this.clientY, 'x', this._x, 'y', this._y, 'ox', this._game.stage.offset.x, 'oy', this._game.stage.offset.y);

        }

        /** 
        * 
        * @method onMouseMove
        * @param {MouseEvent} event. 
        */
        public onMouseMove(event:MouseEvent) {

            //event.stopPropagation();

            this.screenX = event.screenX;
            this.screenY = event.screenY;
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            this.ctrlKey = event.ctrlKey;
            this.shiftKey = event.shiftKey;
            this.altKey = event.altKey;
            this.button - event.button;

            this._x = this.clientX - this._game.stage.offset.x;
            this._y = this.clientY - this._game.stage.offset.y;

            this.point.setTo(this._x, this._y);

            //console.log(this.clientX, this.clientY, this._x, this._y, this._game.stage.offset.x, this._game.stage.offset.y);

        }

        /** 
        * 
        * @method onMouseUp
        * @param {MouseEvent} event. 
        */
        public onMouseUp(event:MouseEvent) {

            //event.stopPropagation();

            this.screenX = event.screenX;
            this.screenY = event.screenY;
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            this.ctrlKey = event.ctrlKey;
            this.shiftKey = event.shiftKey;
            this.altKey = event.altKey;
            this.button - event.button;

            this.isDown = false;
            this.isUp = true;
            this.timeUp = event.timeStamp;
            this.duration = this.timeUp - this.timeDown;

            this._x = this.clientX - this._game.stage.offset.x;
            this._y = this.clientY - this._game.stage.offset.y;

            //console.log(this.clientX, this.clientY, this._x, this._y, this._game.stage.offset.x, this._game.stage.offset.y);

            this.mouseUp.dispatch(this._x, this._y, this.timeDown, this.timeUp, this.duration);

        }

        /**
        * 
        * @method x
        * @return {Number}
        */
        public x(): number {
            return this._x;
        }

        /**
        * 
        * @method y
        * @return {Number}
        */
        public y(): number {
            return this._y;
        }

        /** 
        * 
        * @method onMouseWheel
        * @param {MouseEvent} event. 
        */
        public onMouseWheel(event: WheelEvent) {

            if (event['wheelDeltaX'])
            {
                this.wheelDeltaX = event['wheelDeltaX'];
            }
            else
            {
                this.wheelDeltaX = event.deltaX;
            }

            if (event['wheelDeltaY'])
            {
                this.wheelDeltaY = event['wheelDeltaY'];
            }
            else
            {
                this.wheelDeltaY = event.deltaY;
            }

        }

        /** 
        * 
        * @method justPressed
        * @param {Number} [duration]. 
        * @return {Boolean}
        */
        public justPressed(duration:number = this.justPressedRate): bool {

            if (this.isDown === true && (this.timeDown + duration) > this._game.time.now())
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /** 
        * 
        * @method justReleased
        * @param {Number} [duration]. 
        * @return {Boolean}
        */
        public justReleased(duration: number = this.justReleasedRate): bool {

            if (this.isUp === true && (this.timeUp + duration) > this._game.time.now())
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
        * 
        * @method reset
        */
        public reset() {

            this.timeUp = 0;
            this.timeDown = 0;
            this.isDown = false;
            this.isUp = false;

        }

    }

}