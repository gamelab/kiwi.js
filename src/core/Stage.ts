/**
* 
* @module Kiwi
* 
*/

module Kiwi {

	/**
	* Each game contains a single Stage which controls the creation and management of main domElements required for a Kiwi game to work. 
	* Such as the Canvas and the rendering contexts, as well as the width/height of the game and the position it should be on the screen.
	*
	* @class Stage
	* @namespace Kiwi
	* @constructor
	* @param game {Kiwi.Game} The game that this Stage belongs to. 
	* @param name {String} The name of the kiwi game.
	* @param width {Number} The initial width of the game. 
	* @param height {Number} The initial heihgt of the game.
	* @param scaleType {Number} The scale method that should be used for the game.
	* @return {Kiwi.Stage}  
	*
	*/
	export class Stage {

		constructor(game: Kiwi.Game, name: string, width: number, height: number, scaleType:number) {

			this._game = game;

			this.name = name;

			this.domReady = false;

			//  Properties
			this._alpha = 1;

			this._x = 0;
			this._y = 0;

			this._width = width;
			this._height = height;
			this.color = "ffffff";
			// CocoonJS should be black instead
			if( this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
				this.color = "000000";
			}

			this._scale = new Kiwi.Geom.Point(1, 1);
			this._scaleType = scaleType;

			this.onResize = new Kiwi.Signal();
            this.onWindowResize = new Kiwi.Signal();

            this.onFocus = new Kiwi.Signal();
            this.onBlur = new Kiwi.Signal();
            this.onVisibilityChange = new Kiwi.Signal();

			this._renderer = null;
		}

		/**
		* Returns the type of this object.
		* @method objType
		* @return {string} "Stage"
		* @public
		*/
		public objType():string {
			return "Stage";
		}

		/**
		* The default width of the stage.
		* @property DEFAULT_WIDTH
		* @type number
		* @default 800
		* @public
		* @static
		*/
		public static DEFAULT_WIDTH: number = 800;

		/**
		* The default height of the stage.
		* @property DEFAULT_HEIGHT
		* @type number
		* @default 600
		* @public
		* @static
		*/
		public static DEFAULT_HEIGHT: number = 600;


		/**
		* The default scaling method used on Kiwi Games. 
		* This scaling method will set the containers width/height to static values.
		* @property SCALE_NONE
		* @type number
		* @default 0 
		* @public 
		* @static
		*/
		public static SCALE_NONE: number = 0;

		/**
		* Scale Fit will scale the stages width to fit its parents width.
		* The height is then calculated to maintain the aspect ratio of the width/height of the Stage.
		* @property SCALE_FIT
		* @type number
		* @default 1 
		* @public 
		* @static
		*/
		public static SCALE_FIT: number = 1;

		/**
		* Stretch will make the stage scale to fit its parents width/height (by using max/min height of 100%).
		* If the parent doesn't have a height set then the height will be the height of the stage. 
		* @property SCALE_STRETCH
		* @type number
		* @default 2 
		* @public 
		* @static
		*/
		public static SCALE_STRETCH: number = 2;

		/**
		* Private property that holds the scaling method that should be applied to the container element. 
		* @property _scaleType
		* @type number
		* @default Kiwi.Stage.SCALE_NONE
		* @private
		*/
		private _scaleType: number = Kiwi.Stage.SCALE_NONE;

		/**
		* Holds type of scaling that should be applied the container element. 
		* @property scaleType
		* @type number
		* @default Kiwi.Stage.SCALE_NONE
		* @public
		*/
		public set scaleType(val: number) {
			this._scaleType = val;
			this._scaleContainer();
		}

		public get scaleType():number {
			return this._scaleType;
		}


		/**
		* The alpha of the stage. 
		* @property _alpha
		* @type number
		* @default 1
		* @private
		*/
		private _alpha: number;

		/**
		* Sets the alpha of the container element. 0 = invisible, 1 = fully visible.
		* Note: Because the alpha value is applied to the container, it will not work in CocoonJS.
		*
		* @property alpha
		* @type number
		* @default 1
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
				this.container.style.left = String(value + "px");
			} else if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
				this.canvas.style.left = String(value + "px");
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
				this.container.style.top = String(value + "px");
			} else if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
				this.canvas.style.top = String(value + "px");
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
		* The width of the stage. This is READ ONLY. See the "resize" method if you need to modify this value.
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
		* The height of the stage. This is READ ONLY. See the "resize" method if you need to modify this value.
		* @property height
		* @type number
		* @public
		* @readonly
		*/
		public get height(): number {
			return this._height;
		}

		/**
		* A Signal that dispatches an event when the stage gets resized.
		* @property onResize
		* @type Kiwi.Signal
		* @public
		*/
		public onResize: Kiwi.Signal;


		/**
		* A Signal which dispatches events when the window is resized. 
		* Useful to detect if the screen is now in a "landscape" or "portrait" view on Mobile/Cocoon devices. 
		* @property onWindowResize
		* @type Kiwi.Signal
		* @public
		*/
		public onWindowResize: Kiwi.Signal;

		/**
		* Calculates and returns the amount that the container has been scale by.  
		* Mainly used for re-calculating input coordinates. 
		* Note: For COCOONJS this returns 1 since COCOONJS translates the scale itself.
		* This property is READ ONLY.
		* @property scale
		* @type Kiwi.Geom.Point
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
		* @type Kiwi.Geom.Point
		* @public
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
		*
		* @property _color
		* @type Kiwi.Utils.Color
		* @public
		*/
		public _color: Kiwi.Utils.Color = new Kiwi.Utils.Color();

		/**
		* Sets the background color of the stage.
		*
		* This can be any valid parameter for Kiwi.Utils.Color.
		* If passing multiple parameters, do so in a single array.
		*
		* The default value is "ffffff" or pure white.
		*
		* Note for users of CocoonJS: When using the WebGL renderer,
		* the stage color will fill all parts of the screen outside the canvas.
		* Kiwi.js will automatically set the color to "000000" or pure black
		* when using CocoonJS. If you change it, and your game does not fill
		* the entire screen, the empty portions of the screen will also change
		* color.
		*
		* @property color
		* @type string
		* @public
		*/
		public get color(): any {
			return this._color.getHex();
		}

		public set color( val: any ) {
			if ( !Kiwi.Utils.Common.isArray( val ) ) {
				val = [ val ];
			}
			this._color.set.apply( this._color, val );
		}

		/**
		* Allows the setting of the background color of the stage through component RGB colour values.
		*
		* This property is an Object Literal with "r", "g", "b" colour streams of values between 0 and 255.
		*
		* @property rgbColor
		* @type Object
		* @public
		*/
		public get rgbColor():any {
			return { r: this._color.r * 255, g: this._color.g * 255, b: this._color.b * 255 };
		}

		public set rgbColor(val: any) {
			this._color.set( val.r, val.g, val.b );
		}

		/**
		* Allows the setting of the background color of the stage through component RGBA colour values.
		*
		* This property is an Object Literal with "r", "g", "b", "a" colour streams of values between 0 and 255.
		* 
		* Note that the alpha value is from 0-255, not 0-1. This is to preserve compatibility with hex-style color values, e.g. "ff0000ff".
		*
		* @property rgbaColor
		* @type Object
		* @public
		* @since 1.1.0
		*/
		public get rgbaColor():any {
			return { r: this._color.r * 255, g: this._color.g * 255, b: this._color.b * 255, a: this._color.a * 255 };
		}

		public set rgbaColor(val: any) {
			this._color.set( val.r, val.g, val.b, val.a );
		}

		/**
		* Get the normalized background color of the stage.
		* Returns an object with rgba values, each being between 0 and 1.
		* This is READ ONLY.
		* @property normalizedColor
		* @type string
		* @public
		*/
		public get normalizedColor(): any {
			return {
				r: this._color.r,
				g: this._color.g,
				b: this._color.b,
				a: this._color.a };
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
		* Stores the renderer created after context detection.
		* @property _renderer
		* @type any
		* @private
		* @since 1.1.0
		*/
		private _renderer: any;

		/**
		* Get the renderer associated with the canvas context. This is either a GLRenderManager or a CanvasRenderer. If the Kiwi.RENDERER_WEBGL renderer was requested but could not be created, it will fall back to CanvasRenderer.
		* This is READ ONLY.
		* @property renderer
		* @type number
		* @public
		* @since 1.1.0
		*/
		public get renderer(): any {
			return this._renderer;
		}


		/**
		* Is executed when the DOM has loaded and the game is just starting. 
		* This is a internal method used by the core of Kiwi itself. 
		* @method boot
		* @param dom {HTMLElement} The
		* @public
		*/
		public boot(dom: Kiwi.System.Bootstrap) {
			var self = this;
			 
			this.domReady = true;
			this.container = dom.container;

			if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {

				this.offset = this.getOffsetPoint( this.container );

				this._x = this.offset.x;
				this._y = this.offset.y;

                window.addEventListener("resize",(event: UIEvent) => this._windowResized(event), true);

                this._createFocusEvents();
			}

			
			this._createCompositeCanvas();


			if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
				this._scaleContainer();
				// Detect reorientation/resize
				window.addEventListener("orientationchange", function( event:UIEvent ) {
					return self._orientationChanged(event);
				}, true);
			} else {
				this._calculateContainerScale();
			}
		}

		/**
		* Gets the x/y coordinate offset of any given valid DOM Element from the top/left position of the browser
		* Based on jQuery offset https://github.com/jquery/jquery/blob/master/src/offset.js 
		* @method getOffsetPoint
		* @param {Any} element
		* @param {Kiwi.Geom.Point} output
		* @return {Kiwi.Geom.Point}
		* @public
		*/
		public getOffsetPoint(element, output: Kiwi.Geom.Point = new Kiwi.Geom.Point): Kiwi.Geom.Point {

			var box = element.getBoundingClientRect();

			var clientTop = element.clientTop || document.body.clientTop || 0;
			var clientLeft = element.clientLeft || document.body.clientLeft || 0;
			var scrollTop = window.pageYOffset || element.scrollTop || document.body.scrollTop;
			var scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

			return output.setTo(box.left + scrollLeft - clientLeft, box.top + scrollTop - clientTop);

		}

		/**
		* Method that is fired when the window is resized. 
		* @method _windowResized
		* @param event {UIEvent}
		* @private
		*/
		private _windowResized(event:UIEvent) {
			this._calculateContainerScale();

			//Dispatch window resize event
			this.onWindowResize.dispatch();
		}

		/**
		* Method that is fired when the device is reoriented.
		* @method _orientationChanged
		* @param event {UIEvent}
		* @private
		* @since 1.1.1
		*/
		private _orientationChanged(event:UIEvent) {
			this.onResize.dispatch(window.innerWidth, window.innerHeight);
		}

		/**
		* Used to calculate the new offset and the scale of the stage currently is at.
		* @method _calculateContainerScale
		* @private
		*/
		private _calculateContainerScale() {

			//Calculate the scale twice
			//This will give the correct scale upon completion the second run
			//Temporary fix until the Scale Manager is implemented
			this._scaleContainer();
			this._scaleContainer();

			this.offset = this.getOffsetPoint(this.container);

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
				this.canvas = <HTMLCanvasElement>document.createElement(navigator["isCocoonJS"] ? "screencanvas" : "canvas");
			
			//Otherwise default to normal canvas
			} else {
				this.canvas = <HTMLCanvasElement>document.createElement("canvas");
				this.canvas.style.width = "100%";
				this.canvas.style.height = "100%";

			}

			this.canvas.id = this._game.id + "compositeCanvas";
			this.canvas.style.position = "absolute";
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			

			//Get 2D or GL Context; do error detection and fallback to valid rendering context
			if (this._game.renderOption === Kiwi.RENDERER_CANVAS) {
				this.ctx = this.canvas.getContext("2d");
				this.ctx.fillStyle = "#fff";
				this.gl = null;
			} else if (this._game.renderOption === Kiwi.RENDERER_WEBGL) {
				this.gl = this.canvas.getContext("webgl");
				if (!this.gl) {
					this.gl = this.canvas.getContext("experimental-webgl");
					if (!this.gl) {
						Kiwi.Log.warn("Kiwi.Stage: WebGL rendering is not available despite the device apparently supporting it. Reverting to CANVAS.", "#renderer");
						// Reset to canvas mode
						this.ctx = this.canvas.getContext("2d");
						this.ctx.fillStyle = "#fff";
						this.gl = null;
					} else {
						Kiwi.Log.warn("Kiwi.Stage: 'webgl' context is not available. Using 'experimental-webgl'", "#renderer");
					}
				}
				if ( this.gl ) {

					// That is, WebGL was properly supported and created
					this.gl.clearColor(1, 1, 1, 1);
					this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
					this.ctx = null;
				}
			}

			// Create render manager
			// This is reported back to the Kiwi.Game that created the Stage.
			if(this.ctx) {
				this._renderer = new Kiwi.Renderers.CanvasRenderer(this._game);
			} else if(this.gl) {
				this._renderer = new Kiwi.Renderers.GLRenderManager(this._game);
			}


			if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
				this.container.appendChild(this.canvas);
			} else {
				document.body.appendChild(this.canvas);
			}
		}

		/**
		* Set the stage width and height for rendering purposes.
		* This will not effect that "scaleType" that it has been set to.
		*
		* @method resize
		* @param width {number} The new Stage width.
		* @param height {number} The new Stage height.
		* @public
		*/
		public resize(width: number, height: number) {

			this.canvas.height = height;
			this.canvas.width = width;
			this._height = height;
			this._width = width;

			if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
				this._calculateContainerScale();
			}

			this.onResize.dispatch(this._width, this._height);
		}

		/**
		* Sets the background color of the stage through component RGB colour values. 
		* Each parameter is a number between 0 and 255.
		* This method also returns an Object Literal with "r", "g", "b" properties.
		*
		* @method setRGBColor
		* @param r {Number} The red component. A value between 0 and 255.
		* @param g {Number} The green component. A value between 0 and 255.
		* @param b {Number} The blue component. A value between 0 and 255.
		* @return {Object} A Object literal containing the r,g,b properties. 
		* @public
		*/
		public setRGBColor(r: number, g: number, b: number):any {
			this.rgbColor = { r: r, g: g, b: b };
			return this.rgbColor;
		}


		/**
		* Creates a debug canvas and adds it above the regular game canvas.
		* The debug canvas is not created by default (even with debugging on) and rendering/clearing of the canvas is upto the developer. 
		* The context for rendering can be access via the "dctx" property and you can use the "clearDebugCanvas" method to clear the canvas.
		*
		* @method createDebugCanvas
		* @public
		*/
		public createDebugCanvas() {

			if( Kiwi.Utils.Common.isUndefined(this.debugCanvas) == false ) return;
			
			if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
				//Not supported in CocoonJS only because we cannot add it to the container (as a container does not exist) and position will be hard.
				Kiwi.Log.log("Debug canvas not supported in cocoon, creating canvas and context anyway", "#debug-canvas");                
			}

			this.debugCanvas = <HTMLCanvasElement>document.createElement("canvas");
			this.debugCanvas.id = this._game.id + "debugCanvas";
			this.debugCanvas.style.position = "absolute";
			this.debugCanvas.width = this.width;
			this.debugCanvas.height = this.height;
			this.debugCanvas.style.width = "100%";
			this.debugCanvas.style.height = "100%";
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
		* @param [color="rgba(255,0,0,0.2)"] {string} The debug color to rendering on the debug canvas.
		* @public
		*/
		public clearDebugCanvas( color?:string ) {
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

		/**
		* Handles the scaling/sizing based upon the scaleType property.
		* @method _scaleContainer
		* @private
		*/
		private _scaleContainer() {

			if (this._game.deviceTargetOption == Kiwi.TARGET_BROWSER) {

				var clientWidth = this.container.clientWidth;

				this.container.style.width = String(this._width + "px");
				this.container.style.height = String(this._height + "px");

				if (this._scaleType == Kiwi.Stage.SCALE_NONE) {
					this.container.style.maxWidth = "";
					this.container.style.minWidth = "";
				}

				//To Fit or STRETCH 
				if (this._scaleType == Kiwi.Stage.SCALE_STRETCH || this._scaleType == Kiwi.Stage.SCALE_FIT) {
					this.container.style.minWidth = "100%";
					this.container.style.maxWidth = "100%";
				}

				//If scale stretched then scale the containers height to 100% of its parents.
				if (this._scaleType == Kiwi.Stage.SCALE_STRETCH) {
					this.container.style.minHeight = "100%";
					this.container.style.maxHeight = "100%";
				} else {
					this.container.style.minHeight = "";
					this.container.style.maxHeight = "";
				}

				//If it is SCALE to FIT then scale the containers height in ratio with the containers width.
				if (this._scaleType == Kiwi.Stage.SCALE_FIT) {
					this.container.style.height = String((clientWidth / this._width) * this._height) + "px";
				}

			}

			if (this._game.deviceTargetOption == Kiwi.TARGET_COCOON) {
				// This has no effect in WebGL, and is thus handled separately.
				switch (this._scaleType) {
					case Kiwi.Stage.SCALE_FIT:
						this.canvas.style.cssText = "idtkscale:ScaleAspectFit";
						break;

					case Kiwi.Stage.SCALE_STRETCH:
						this.canvas.style.cssText = "idtkscale:ScaleToFill";
						break;

					case Kiwi.Stage.SCALE_NONE:
						this.canvas.style.cssText = "";
						break;
				}

			}

		}
    
        /**
        * Dispatches callbacks when the page containing this game gains focus.
        * 
        * @property onFocus
        * @type Kiwi.Signal
        * @since 1.3.0
        * @public
        */
        public onFocus: Kiwi.Signal;

        /**
        * Dispatches callbacks when this page containing this game loses focus.
        * 
        * @property onBlur
        * @type Kiwi.Signal
        * @since 1.3.0
        * @public
        */
        public onBlur: Kiwi.Signal;

        /**
        * Dispatches callbacks when the visiblity of the page changes.
        * 
        * @property onVisibilityChange
        * @type Kiwi.Signal
        * @since 1.3.0
        * @public
        */
        public onVisibilityChange: Kiwi.Signal;

        /**
        * A flag indicating if the page is currently visible (using the Visiblity API).
        * If the Visiblity API is unsupported this will remain set to true regardless of focus / blur events.
        *
        * @property visibility
        * @type boolean 
        * @default true
        * @readOnly
        * @since 1.3.0
        * @public
        */
        public get visibility():boolean {

            if (this._visibility) {
                return !document[this._visibility];
            }

            return true;
        }

        /**
        * Contains string used to access the `hidden` property on the document.
        * 
        * @property _visibility
        * @type String
        * @default 'hidden'
        * @since 1.3.0
        * @private
        */
        private _visibility: string;

        /**
        * Contains the bound version of the `_checkVisibility` method.
        * 
        * @property _visibilityChange
        * @type any
        * @since 1.3.0
        * @private
        */
        private _visibilityChange: any;

        /**
        * Fired when the page visibility changes, or the page focus/blur events fire.
        * In charge of firing the appropriate signals. 
        *
        * @method _checkVisibility
        * @param event {Any}
        * @since 1.3.0
        * @private
        */
        private _checkVisibility(event) {

            if (event.type === "focus" || event.type === "pageshow") {
                this.onFocus.dispatch(event);
                return;

            } else if (event.type === "pagehide" || event.type === "blur") {
                this.onBlur.dispatch(event);
                return;

            }

            if (event.type === "visibilitychange" || event.type === "mozvisibilitychange" || event.type === "webkitvisibilitychange" || event.type === "msvisibilitychange") {
                this.onVisibilityChange.dispatch();
                return;
            }
               
        }

        /**
        * Adds the focus, blur, and visibility events to the document.
        * 
        * @method _createFocusEvents
        * @since 1.3.0
        * @private
        */
        private _createFocusEvents() {

            this._visibility = "hidden";
            this._visibilityChange = this._checkVisibility.bind(this);

            if ("hidden" in document) {
                document.addEventListener("visibilitychange", this._visibilityChange);

            } else if ((this._visibility = "mozHidden") in document) {
                document.addEventListener("mozvisibilitychange", this._visibilityChange);

            } else if ((this._visibility = "webkitHidden") in document) {
                document.addEventListener("webkitvisibilitychange", this._visibilityChange);

            } else if ((this._visibility = "msHidden") in document) {
                document.addEventListener("msvisibilitychange", this._visibilityChange);

            } else {
                //Not supported. 
                this._visibility = null;
            }

            window.addEventListener('pageshow', this._visibilityChange);
            window.addEventListener('pagehide', this._visibilityChange);
            window.addEventListener('focus', this._visibilityChange);
            window.addEventListener('blur', this._visibilityChange);

        }

	}

}
