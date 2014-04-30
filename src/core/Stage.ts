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
    * @namespace Kiwi
    * @constructor
    * @param game {Kiwi.Game}
    * @param name {String}
    * @return {Stage} Kiwi.Stage
    *
    */
    export class Stage {
         
        constructor(game: Kiwi.Game, name: string, width: number, height: number) {

            this._game = game;

            this.name = name;

            this.domReady = false;
             
            //  Properties
            this._alpha = 1;
            
            this._x = 0;
            this._y = 0;

            this._width = width;
            this._height = height;
            this.color = 'ffffff';

            this._scale = new Kiwi.Geom.Point(1, 1);

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
        * The default width of the stage.
        * @property DEFAULT_WIDTH
        * @type number
        * @public
        * @static
        */
        public static DEFAULT_WIDTH: number = 800;

        /**
        * The default height of the stage.
        * @property DEFAULT_HEIGHT
        * @type number
        * @public
        * @static
        */
        public static DEFAULT_HEIGHT: number = 600;


        /**
        * The alpha of the stage.
        * @property _alpha
        * @type number
        * @private
        */
        private _alpha: number;

        /**
        * Sets the alpha of the container element. 0 = invisible, 1 = fully visible.
        * Note: Because the alpha value is applied to the container, it will not work in CocoonJS.
        *
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
            // Doesnt work in cocoon

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
        * @readonly
        */
        public get width(): number {
            return this._width;
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
        * @public
        * @readonly
        */
        public get height(): number {
            return this._height;
        }
       
        /*
        * A kiwi signal that dispatches an event when the stage gets resized.
        * @property onResize
        * @type Signal
        * @public
        */
        public onResize: Kiwi.Signal;

        /**
        * Calculates and returns the amount that the container has been scale by.  
        * Mainly used for re-calculating input coordinates. 
        * Note: For COCOONJS this returns 1 since COCOONJS translates the points itself.
        * This property is READ ONLY.
        * @property scale
        * @type Point
        * @default 1
        * @public
        */
        private _scale: Kiwi.Geom.Point;

        public get scale(): Kiwi.Geom.Point {
            return this._scale;
        }

        /**
        * Calculates and returns the amount that the container has been scale by on the X axis.  
        * @property scaleX
        * @type Number
        * @default 1 
        * @public
        */
        public get scaleX(): number {
            return this._scale.x;
        }

        /**
        * Calculates and returns the amount that the container has been scale by on the Y axis.
        * @property scaleY
        * @type Number
        * @default 1
        * @public
        */
        public get scaleY(): number {
            return this._scale.y;
        }

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
        * The background color of the stage. 
        * This must be a valid 6 character hex color string such as "ffffff". 
        *
        * @property _color
        * @type string
        * @default 'ffffff'
        * @public
        */
        public _color: string;
        
        /**
        * Sets the background color of the stage via a hex value. 
        * The hex colour code should not contain a hashtag '#'.
        * 
        * @property color
        * @type string
        * @public
        */
        public get color(): string {
            return this._color;
        }

        public set color(val: string) {
            this._color = val;
            var bigint = parseInt(val, 16);

            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;

            //Converts the colour to normalized values.
            this._normalizedColor = { r: r / 255, g: g / 255, b: b / 255, a: 1 };
        }

        /**
        * Allows the setting of the background color of the stage through component RGB colour values. 
        * This property is an Object Literal with 'r', 'g', 'b' colour streams of values between 0 and 255. 
        *
        * @property rgbColor
        * @type Object
        * @public
        */
        public get rgbColor():any {
            return { r: this._normalizedColor.r * 255, g: this._normalizedColor.g * 255, b: this._normalizedColor.b * 255 };
        }

        public set rgbColor(val: any) {
            this.color = this.componentToHex(val.r) + this.componentToHex(val.g) + this.componentToHex(val.b);
        }

        /**
        * Stores the normalized background color of the stage as a RGBA values between 0 and 1.
        * @property _normalizedColor
        * @type object
        * @public
        */
        private _normalizedColor: any;
        
        /**
        * Get the normalized background color of the stage. Returns a object with rgba values, each being between 0 and 1.
        * This is READ ONLY.
        * @property normalizedColor
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

                //Update the containers width/height to the initial value
                this.container.style.height = String(this._height + 'px');
                this.container.style.width = String(this._width + 'px');

                window.addEventListener("resize", (event: UIEvent) => this._windowResized(event), true);
            }

            
            this._createCompositeCanvas();

        }


        /**
        * Method that is fired when the window is resized. 
        * Used to calculate the new offset and see what the scale of the stage currently is.
        * @method _windowResized
        * @param event {UIEvent}
        * @private
        */
        private _windowResized(event: UIEvent) {
            this.offset = this._game.browser.getOffsetPoint(this.container);
            this._scale.x = this._width / this.container.clientWidth;
            this._scale.y = this._height / this.container.clientHeight;
        }


        /**
        * Handles the creation of the canvas that the game will use and retrieves the context for the renderer. 
        *
        * @method _createComponsiteCanvas
        * @private
        */
        private _createCompositeCanvas() {
            
            //If we are using cocoon then create a accelerated screen canvas
            if (this._game.deviceTargetOption == Kiwi.TARGET_COCOON) {
                this.canvas = <HTMLCanvasElement>document.createElement(navigator['isCocoonJS'] ? 'screencanvas' : 'canvas');
            
            //Otherwise default to normal canvas
            } else {
                this.canvas = <HTMLCanvasElement>document.createElement("canvas");
                this.canvas.style.width = '100%';
                this.canvas.style.height = '100%';

            }

            this.canvas.id = this._game.id + "compositeCanvas";
            this.canvas.style.position = "absolute";
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            

            //Get 2D or GL Context - Should add in error checking here

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
        * Set the stage width and height.
        *
        * @method resize
        * @param width {number} new stage width
        * @param height {number} new stage height
        * @public
        */
        public resize(width: number, height: number) {

            this.canvas.height = height;
            this.canvas.width = width;
            this._height = height;
            this._width = width;

            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER)
            {
                this.container.style.height = String(height + 'px');
                this.container.style.width = String(width + 'px');
                this._scale.x = this._width / this.container.clientWidth;
                this._scale.y = this._height / this.container.clientHeight;

            }

            this.onResize.dispatch(this._width, this._height);
        }

        
        /**
        * Sets the background color of the stage through component RGB colour values. 
        * Each parameter pass is a number between 0 and 255. This method also returns a Object Literal with 'r', 'g', 'b' properties.
        *
        * @method setRGBColor
        * @param r {Number} The red component. A value between 0 and 255.
        * @param g {Number} The green component. A value between 0 and 255.
        * @param B {Number} The blue component. A value between 0 and 255.
        * @return {Object} A Object literal containing the r,g,b properties. 
        * @public
        */
        public setRGBColor(r: number, g: number, b: number):any {
            this.rgbColor = { r: r, g: g, b: b };
            return this.rgbColor;
        }


        /**
        * Converts a component colour value into its hex equivalent. Used when setting rgb colour values.
        * 
        * @method componentToHex
        * @param c {Number} The components colour value. A number between 0 and 255.
        * @return {string} The hex equivelent of that colour string. 
        * @private
        */
        private componentToHex(c: number): string {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }


        /**
        * Creates a debug canvas and adds it above the regular game canvas.
        * The debug canvas is not created by default (even with debugging on) and rendering/clearing of the canvas is upto the developer. 
        * The context for rendering can be access via the 'dctx' property and you can use the 'clearDebugCanvas' method to clear the canvas.
        *
        * @method createDebugCanvas
        * @public
        */
        public createDebugCanvas() {
            if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
                //Not supported in CocoonJS only because we cannot add it to the container (as a container does not exist) and position will be hard.
                console.log('Debug canvas not supported in cocoon, creating canvas and context anyway');                
            } 

            this.debugCanvas = <HTMLCanvasElement>document.createElement("canvas");
            this.debugCanvas.id = this._game.id + "debugCanvas";
            this.debugCanvas.style.position = "absolute";
            this.debugCanvas.width = this.width;
            this.debugCanvas.height = this.height;
            this.dctx = this.debugCanvas.getContext("2d");
            this.clearDebugCanvas();

            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.appendChild(this.debugCanvas);
            }
          
        }
        

        /**
        * Clears the debug canvas and fills with either the color passed. 
        * If not colour is passed then Red at 20% opacity is used.
        * 
        * @method clearDebugCanvas
        * @param [color='rgba(255,0,0,0.2)'] {string} debug color
        * @public
        */
        public clearDebugCanvas(color?:string) {
            this.dctx.fillStyle = color || "rgba(255,0,0,.2)";
            this.dctx.clearRect(0, 0, this.width, this.height);
            this.dctx.fillRect(0, 0, this.width, this.height)
        }


        /**
        * Toggles the visibility of the debug canvas.
        * @method toggleDebugCanvas
        * @public
        */
        public toggleDebugCanvas() {
            this.debugCanvas.style.display = (this.debugCanvas.style.display === "none") ? "block" : "none";
        }

    }

}
