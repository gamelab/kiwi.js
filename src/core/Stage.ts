/**
* 
* @module Kiwi
* 
*/ 

module Kiwi {

    /**
    * Each game contains a single Stage which controls the creation of the elements required for a Kiwi game to work. 
    * Such as the Canvas and the rendering contexts, as well as the width/height of the game and the position it should be on the screen.
    *
    * @class Stage
    * @constructor
    * @param game {Kiwi.Game}
    * @param name {String}
    * @return {Stage} Kiwi.Stage
    *
    */
    export class Stage {
         
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
            this.color = 'ffffff';

            this.onResize = new Kiwi.Signal();
        }

        /**
        * Returns the type of this object.
        * @method objType
        * @return string
        * @public
        */
        public objType():string {
            return "Stage";
        }

        /**
        * The alpha of the stage.
        * @property _alpha
        * @type number
        * @private
        */
        private _alpha: number;

        /**
        * Get the current alpha of the stage. 0 = invisible, 1 = fully visible.
        * @property alpha
        * @type number
        * @public
        */
        public get alpha():number {
            return this._alpha;
        }
        public set alpha(value: number) {
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.style.opacity = String(Kiwi.Utils.GameMath.clamp(value, 1, 0));
            }
            //doesnt work in cocoon

            this._alpha = value;
        }

        /**
        * The X coordinate of the stage.
        * @property _x
        * @type number
        * @private 
        */
        private _x: number;

        /**
        * The X coordinate of the stage. This number should be the same as the stages left property.
        * @property x
        * @type number
        * @public
        */
        public get x(): number {
            return this._x;
        } 
        public set x(value: number) {
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.style.left = String(value + 'px');
            } else if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
                this.canvas.style.left = String(value + 'px');
            }
            this._x = value;
        }

        /**
        * The Y coordinate of the stage.
        * @property _y
        * @type number
        * @private
        */
        private _y: number;

        /**
        * Get the Y coordinate of the stage. This number should be the same as the stages top property.
        * @property y
        * @type number
        * @public
        */
        public get y(): number {
            return this._y;
        }
        public set y(value: number) {
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.style.top = String(value + 'px');
            } else if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
                this.canvas.style.top = String(value + 'px');
            }
            this._y = value;
        }

        /**
        * The width of the stage.
        * @property _width
        * @type number
        * @private
        */
        private _width: number;
        
        /**
        * The width of the stage.
        * @property width
        * @type number
        * @public 
        */
        public get width(): number {
            return this._width;
        }
        public set width(value: number) {
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.style.width = String(value + 'px');
            }
            
            this.canvas.width = value;
            this._width = value;
            this.onResize.dispatch(this._width, this._height);
        }

        /**
        * The height of the stage
        * @property _height
        * @type number
        * @private
        */
        private _height: number;
        
        /**
        * The height of the stage
        * @property height
        * @type number
        * @private
        */
        public get height(): number {
            return this._height;
        }
        public set height(value: number) {
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.style.height = String(value + 'px');
            }

            this.canvas.height = value;
            this._height = value;
            this.onResize.dispatch(this._width, this._height);
        }

        /*
        * A kiwi signal that dispatches an event when the stage gets resized.
        * @property onResize
        * @type Signal
        * @public
        */
        public onResize: Kiwi.Signal;

        /**
		* A point which determines the offset of this Stage
        * @property offset
        * @type Point
        * @public
    	*/
        public offset: Kiwi.Geom.Point = new Kiwi.Geom.Point();
        
        /**
        * The game this Stage belongs to
        * @property _game
        * @type Game
        * @private 
        */
        private _game: Kiwi.Game;

        /**
        * The title of your stage
        * @property name
        * @type string
        * @public
        */
        public name: string;

        /**
        * Whether or not this Stage is DOM ready.
        * @property domReady
        * @type boolean
        * @public
        */
        public domReady: boolean;

        /**
        * The background color of the stage. This must be a valid 6 character hex color string such as "ffffff". 
        * @property _color
        * @type string
        * @default '#ffffff'
        * @public
        */
        public _color: string;
        
        /**
        * Get the background color of the stage. This returns a hex style color string such as "#ffffff" 
        * @property color
        * @type string
        * @public
        */
        public get color(): string {
            return this._color;
        }
        public set color(val: string) {
            this._color = "#" + val;
            var bigint = parseInt(val, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;
            this._normalizedColor = { r: r, g: g, b: b, a: 1 };
        }

        /**
        * Stores the normalized background color of the stage as a RGBA values between 0 and 1.
        * @property _normalizedColor
        * @type object
        * @public
        */
        private _normalizedColor: any;
        
        /**
        * Get the normalized background color of the stage. returns a object with rgba values between 0 and 1.
        * @property color
        * @type string
        * @public
        */

        public get normalizedColor(): any {
           return this._normalizedColor;
        }

        /**
        * The webgl rendering context.
        * @property gl
        * @type WebGLRenderingContext
        * @public
        */
        public gl: WebGLRenderingContext;

        /**
        * The canvas rendering context.
        * @property ctx
        * @type CanvasRenderingContext2D
        * @public
        */
        public ctx: CanvasRenderingContext2D;

        /**
        * The canvas element that is being rendered on.
        * @property canvas
        * @type HTMLCanvasElement
        * @public
        */
        public canvas: HTMLCanvasElement;
        
        /**
        * The debugging canvas.
        * @property debugCanvas
        * @type HTMLCanvasElement
        * @public
        */
        public debugCanvas: HTMLCanvasElement;

        /**
        * The debug canvas rendering context.
        * @property dctx
        * @type CanvasRenderingContext2D
        * @public
        */
        public dctx: CanvasRenderingContext2D;

        /**
        * The parent div in which the layers and input live
        * @property container
        * @type HTMLDivElement
        * @public
        */
        public container:HTMLDivElement = null;
         
        /**
        * Is executed when the DOM has loaded and the game is just starting. 
        * @method boot
        * @param {HTMLElement} dom
        * @public
        */
        public boot(dom: Kiwi.System.Bootstrap) {
             
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

        /**
        * [DESCRIPTION REQUIRED]
        * @method _createComponsiteCanvas
        * @private
        */
        private _createCompositeCanvas() {
            
            //If we are using cocoon then create a accelerated screen canvas
            if (this._game.deviceTargetOption == Kiwi.TARGET_COCOON) {
                this.canvas = <HTMLCanvasElement>document.createElement(navigator['isCocoonJS'] ? 'screencanvas' : 'canvas');
            
            //otherwise default to normal canvas
            } else {
                this.canvas = <HTMLCanvasElement>document.createElement("canvas");
            }

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
        
        /**
        * [DESCRIPTION REQUIRED]
        * @method _createDebugCanvas
        * @private
        */
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
        
        /**
        * [DESCRIPTION REQUIRED]
        * @method clearDebugCanvas
        * @param [color='rgba(255,0,0,0.2)'] {string} debug color
        * @public
        */
        public clearDebugCanvas(color?:string) {
            this.dctx.fillStyle = color || "rgba(255,0,0,.2)";
            this.dctx.clearRect(0, 0, this.width, this.height);
            this.dctx.fillRect(0, 0, this.width, this.height);
            
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method toggleDebugCanvas
        * @public
        */
        public toggleDebugCanvas() {
            this.debugCanvas.style.display = (this.debugCanvas.style.display === "none") ? "block" : "none";
        }

    }

}
