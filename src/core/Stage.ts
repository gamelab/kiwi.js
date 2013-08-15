/// <reference path="Game.ts" />
/// <reference path="../geom/Rectangle.ts" />

/**
 *  Kiwi - Core - Stage
 *
 *  @desc       A game contains one single Stage which controls the size of the game, frame rate, position, etc
 *
 *	@version 	1.0 - March 5th 2013
 *	@author 	Richard Davey
 *  @url        http://www.kiwijs.org
 */


module Kiwi {

    export class Stage {

        /**
        *
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Settings} This Object
        */
        constructor(game: Kiwi.Game, name: string) {

            this._game = game;

            this.name = name;

            this.domReady = false;

            

            //  Properties

            this._alpha = 1;
            
            this._x = 0;
            this._y = 0;

            this._width = 800;
            this._height = 600;

            this.onResize = new Kiwi.Signal();
        }

        /**
        * Returns the type of this object.
        */
        public objType():string {
            return "Stage";
        }

        //Alpha
        private _alpha: number;

        public get alpha():number {
            return this._alpha;
        }

        public set alpha(value: number) {
            this.container.style.opacity = String(Kiwi.Utils.GameMath.clamp(value, 1, 0));

            this._alpha = value;
        }

        //X
        private _x: number;

        public get x(): number {
            return this._x;
        }

        public set x(value: number) {
            this.container.style.left = String(value + 'px');
            this._x = value;
        }

        //Y
        private _y: number;

        public get y(): number {
            return this._y;
        }

        public set y(value: number) {
            this.container.style.top = String(value + 'px');
            this._y = value;
        }

        //Width
        private _width: number;

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this.container.style.width = String(value + 'px');
            this.canvas.width = value;

            this._width = value;
            this.onResize.dispatch(this._width, this._height);
        }

        //Height
        private _height: number;
        
        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this.container.style.height = String(value + 'px');
            this.canvas.height = value;

            this._height = value;
            this.onResize.dispatch(this._width, this._height);
        }

        //signals
        public onResize: Kiwi.Signal;

        /**
		* A point which determines the offset of this Stage
        * @property offset
        * @type Kiwi.Geom.Point
    	*/
        public offset: Kiwi.Geom.Point = new Kiwi.Geom.Point();
        
        /**
        * The game this Stage belongs to
        * @property _game
        * @type Kiwi.Game
        * @private 
        */
        private _game: Kiwi.Game;

        /**
        * The title of your stage
        * @property name
        * @type string
        */
        public name: string;

        /**
		* Whether or not this Stage is DOM ready.
        * @property domReady
        * @type Boolean
    	*/
        public domReady: bool;

        public gl: WebGLRenderingContext;
        public ctx: CanvasRenderingContext2D;
        public canvas: HTMLCanvasElement;

        /**
        * The parent div in which the layers and input live
        * @property container
        * @type HTMLDivElement
        */
        public container:HTMLDivElement = null;

        
        /**
        * The DOM is ready, so if we have things to do we can set them now
        * @method boot
        * @param {HTMLElement} container
        */
        public boot(dom: Kiwi.DOM.Bootstrap) {

            klog.info('Stage DOM boot');

            //  Properties

            this.domReady = true;

            this.container = dom.container;
            if (Kiwi.TARGET === Kiwi.TARGET_BROWSER) {
                this.offset = this._game.browser.getOffsetPoint(this.container);
                this._x = this.offset.x;
                this._y = this.offset.y;
                this._width = parseInt(this.container.style.width);
                this._height = parseInt(this.container.style.height);
            }
           
            this._createCompositeCanvas();
        }


        private _createCompositeCanvas() {
            this.canvas = <HTMLCanvasElement>document.createElement("canvas");
            this.canvas.id = this._game.id + "compositeCanvas";
            this.canvas.style.position = "absolute";
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            

            //get 2d or gl context - should add in error checking here

            if (this._game.renderMode === Kiwi.RENDERER_CANVAS) {
                this.ctx = this.canvas.getContext("2d");
                this.ctx.fillStyle = '#fff';
                this.gl = null;
            } else if (this._game.renderMode === Kiwi.RENDERER_WEBGL) {
                this.gl = this.canvas.getContext("webgl");
                this.gl.clearColor(1, 0, 0, 1);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            } else {
                klog.error("Unrecognised render mode");
            }
            
            if (Kiwi.TARGET === Kiwi.TARGET_BROWSER) {
                this.container.appendChild(this.canvas);
            } else {
                document.body.appendChild(this.canvas);
            }
            

        }

        /**
        * The framerate at which the game will update at.
        * @property _framerate
        * @type Number
        * @private
        */
        private _framerate: number = 3;

        /**
		* Returns the frameRate of this Stage. If a value is given the framerate is set and then returned.
        * @method frameRate
        * @param {Number} value. If a value is present, the framerate is set to this.
        * @return {Number} The current frameRate.
    	*/
        public frameRate(value?: number): number {

            if (value)
            {
                this._framerate = value;
            }

            return this._framerate;

        }

    }

}
