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
            this.color = 'white';

            this.onResize = new Kiwi.Signal();
        }

        /**
        * Returns the type of this object.
        */
        public objType():string {
            return "Stage";
        }

        /*
        * The alpha of the stage.
        * @property _alpha
        * @type number
        */
        private _alpha: number;

        /*
        * Get the current alpha of the stage. 0 = invisible, 1 = fully visible.
        * @type number
        */
        public get alpha():number {
            return this._alpha;
        }

        /*
        * Set the alpha of the stage. A number between 0 (invisible) and 1 (fully visible).
        * @type number
        */
        public set alpha(value: number) {
            this.container.style.opacity = String(Kiwi.Utils.GameMath.clamp(value, 1, 0));

            this._alpha = value;
        }

        /*
        * The X coordinate of the stage.
        * @property _x
        * @type number
        */
        private _x: number;

        /*
        * Get the X coordinate of the stage. This number should be the same as the stages left property.
        * @type number
        */
        public get x(): number {
            return this._x;
        }

        /*
        * Set the X coordinate of the stage. When setting the X coordinate it modifies the left style on the stage.
        * @type number
        */
        public set x(value: number) {
            this.container.style.left = String(value + 'px');
            this._x = value;
        }

        /*
        * The Y coordinate of the stage.
        * @property _y
        * @type number
        */
        private _y: number;

        /*
        * Get the Y coordinate of the stage. This number should be the same as the stages top property.
        * @type number
        */
        public get y(): number {
            return this._y;
        }

        /*
        * Set the Y coordinate of the stage. When setting the X coordinate it modifies the top style on the stage.
        * @type number
        */
        public set y(value: number) {
            this.container.style.top = String(value + 'px');
            this._y = value;
        }

        /*
        * The width of the stage.
        * @property _width
        * @type number
        */
        private _width: number;
        
        /*
        * The width of the stage.
        * @type number
        */
        public get width(): number {
            return this._width;
        }
        
        /*
        * Set the width og the stage.
        * @type number
        */
        public set width(value: number) {
            this.container.style.width = String(value + 'px');
            this.canvas.width = value;

            this._width = value;
            this.onResize.dispatch(this._width, this._height);
        }

        /*
        * The height of the stage
        * @property _height
        * @type number
        */
        private _height: number;
        
        /*
        * Returns the height of the stage
        * @type number
        */
        public get height(): number {
            return this._height;
        }
        
        /*
        * Sets the height of the stage .
        * @type number
        */
        public set height(value: number) {
            this.container.style.height = String(value + 'px');
            this.canvas.height = value;

            this._height = value;
            this.onResize.dispatch(this._width, this._height);
        }

        /*
        * A kiwi signal that dispatches an event when the stage gets resized.
        * @property onResize
        * @type Kiwi.Signal
        */
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

        public _color: string;
        
        public get color(): string {
            return this._color;
        }

        public set color(val: string) {
            this._color = val;
        }

        /*
        * The various renderering contexts.
        */
        public gl: WebGLRenderingContext;
        public ctx: CanvasRenderingContext2D;
        public canvas: HTMLCanvasElement;
        
        /*
        * The debugging canvas and context if debugging is on.
        */ 
        public debugCanvas: HTMLCanvasElement;
        public dctx: CanvasRenderingContext2D;

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
        public boot(dom: Kiwi.System.Bootstrap) {
            
            //  Properties

            this.domReady = true;

            this.container = dom.container;
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.offset = this._game.browser.getOffsetPoint(this.container);
                this._x = this.offset.x;
                this._y = this.offset.y;
                this._width = parseInt(this.container.style.width);
                this._height = parseInt(this.container.style.height);
            }
            
            this._createCompositeCanvas();
            if (this._game.debugOption === DEBUG_ON) {
                this._createDebugCanvas();
            }
        }

        private _createCompositeCanvas() {
            this.canvas = <HTMLCanvasElement>document.createElement("canvas");
            this.canvas.id = this._game.id + "compositeCanvas";
            this.canvas.style.position = "absolute";
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            

            //get 2d or gl context - should add in error checking here

            if (this._game.renderOption === Kiwi.RENDERER_CANVAS) {
                this.ctx = this.canvas.getContext("2d");
                this.ctx.fillStyle = '#fff';
                this.gl = null;
            } else if (this._game.renderOption === Kiwi.RENDERER_WEBGL) {
                this.gl = this.canvas.getContext("webgl");
                this.gl.clearColor(1, 1, .95, .7);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
                this.ctx = null;
            } 
            
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.appendChild(this.canvas);
            } else {
                document.body.appendChild(this.canvas);
            }
        
        }

        private _createDebugCanvas() {
            if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
                //debug canvas not supported in cocoon, creating canvas and context anyway.
            } 
            this.debugCanvas = <HTMLCanvasElement>document.createElement("canvas");
            this.debugCanvas.id = this._game.id + "debugCanvas";
            this.debugCanvas.style.position = "absolute";
            this.debugCanvas.style.display = "none";
            this.debugCanvas.width = this.width;
            this.debugCanvas.height = this.height;
            this.dctx = this.debugCanvas.getContext("2d");
            this.clearDebugCanvas();

            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.appendChild(this.debugCanvas);
            }
          
        }

        public clearDebugCanvas(color?:string) {
            this.dctx.fillStyle = color || "rgba(255,0,0,.2)";
            this.dctx.clearRect(0, 0, this.width, this.height);
            this.dctx.fillRect(0, 0, this.width, this.height);
            
        }

        public toggleDebugCanvas() {
            this.debugCanvas.style.display = (this.debugCanvas.style.display === "none") ? "block" : "none";
        }

    }

}
