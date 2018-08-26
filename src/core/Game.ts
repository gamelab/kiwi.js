/**
@module Kiwi
**/

module Kiwi {

	/**
	The base class that is used when you create a new Game.
	Handles the initialisation of all of the various individual game managers
	and holds the RAF (RequestAnimationFrame object) used for the game loop.

	@class Game
	@namespace Kiwi
	@constructor
	@param [domParent=""] {string} ID of a DOM element that the game
		should use as its `container`. If you are targeting Cocoon
		then you don't need to worry about this and can leave it blank.
	@param [name="KiwiGame"] {string} Name of the game that is being created
	@param [state=null] {Any} State to load initially.
		This is preferably the state object, but can be its string name.
	@param [options] {object} Any special options for the game
		@param [options.debug=Kiwi.DEBUG_ON] {number} Whether debugging
			is enabled
		@param [options.bootCallback=null] {function} Callback to be executed
			when the game reaches the boot stage
		@param [options.deviceTarget=Kiwi.TARGET_BROWSER] {number} Type of
			device Kiwi is being used on. Values include `Kiwi.TARGET_BROWSER`
			and `Kiwi.TARGET_COCOON`.
		@param [options.renderer=Kiwi.RENDERER_AUTO] {number} Renderer Kiwi
			should use. Values include `Kiwi.RENDERER_AUTO`, `Kiwi.RENDERER_CANVAS`, and `Kiwi.RENDERER_WEBGL`.
		@param [options.width=Kiwi.Stage.DEFAULT_WIDTH] {number} Width of
			this instance of Kiwi
		@param [options.height=Kiwi.Stage.DEFAULT_HEIGHT] {number} Height of
			this instance of Kiwi
		@param [options.scaleType=Kiwi.Stage.SCALE_NONE] {number} Type of
			scaling that should be applied to the game. See `Kiwi.Stage`.
		@param [options.plugins=[]] {array} List of the names of plugins
			that are to be used with this game
		@param [options.log] {object} Default state of the Log properties
			@param [options.log.recording=true] {boolean} Whether logs
				should be recorded
			@param [options.log.display=true] {boolean} Whether logs
				should be displayed
			@param [options.log.enabled=true] {boolean} Whether logger
				is enabled at all
			@param [options.log.maxRecordings=Infinity] {number} Maximum
				number of recordings to have at a single time
	**/
	export class Game {

		constructor( domParent: string = "", name: string = "KiwiGame", state: any = null, options: any= {} ) {

			Kiwi.Log.setDefaultsFromParams( options.log );
			Kiwi.Log.log(
				"Kiwi.Game: " + name +
				" is booting using Kiwi.js " + Kiwi.VERSION,
				"#version" );

			if ( Kiwi.DEVICE === null ) {
				Kiwi.DEVICE = new Kiwi.System.Device();
			}

			if (
				options.debug !== "undefined" &&
				typeof options.debug === "number" ) {

				switch ( options.debug ) {
					case Kiwi.DEBUG_ON:
						this._debugOption = options.debug;
						Kiwi.Log.log(
							"  Kiwi.Game: Debugging turned ON.",
							"#debugging" );
						break;
					case Kiwi.DEBUG_OFF:
						this._debugOption = options.debug;
						Kiwi.Log.log(
							"  Kiwi.Game: Debugging turned OFF.",
							"#debugging" );
						break;
					default:
						this._debugOption = Kiwi.DEBUG_ON;
						Kiwi.Log.error(
							"  Kiwi.Game: Debug option passed, " +
							"but is not a valid option. " +
							"Turned ON by default.",
							"#debugging" );
						break;
				}
			} else {
				this._debugOption = Kiwi.DEBUG_ON;
				Kiwi.Log.log(
					"  Kiwi.Game: Debug option not specified. " +
					"Turned ON by default.",
					"#debugging" );
			}

			if ( options.bootCallback !== "undefined" ) {
				this.bootCallbackOption = options.bootCallback;
			}

			// Which device are they targetting
			if ( options.deviceTarget !== "undefined" && typeof options.deviceTarget === "number" ) {
				switch ( options.deviceTarget ) {
					case Kiwi.TARGET_BROWSER:
						this._deviceTargetOption = options.deviceTarget;
						Kiwi.Log.log(
							"  Kiwi.Game: Targeting BROWSERS.",
							"#target" );
						break;
					case Kiwi.TARGET_COCOON:
						this._deviceTargetOption = options.deviceTarget;
						Kiwi.Log.log(
							"  Kiwi.Game: Targeting COCOONJS.",
							"#target" );
						break;
					default:
						this._deviceTargetOption = Kiwi.TARGET_BROWSER;
						Kiwi.Log.error(
							"  Kiwi.Game: Target device specified, " +
							"but is not a valid option. " +
							"Defaulting to BROWSER.",
							"#target" );
						break;
				}
			} else {
				this._deviceTargetOption = Kiwi.TARGET_BROWSER;
				Kiwi.Log.log(
					"  Kiwi.Game: Targeted device not specified. " +
					"Defaulting to BROWSER.",
					"#target" );
			}

			var renderDefault = Kiwi.RENDERER_WEBGL;
			var renderFallback = Kiwi.RENDERER_CANVAS;

			// Optimise renderer request
			if (
				options.renderer !== "undefined" &&
				typeof options.renderer === "number" ) {

				switch ( options.renderer ) {
					case Kiwi.RENDERER_CANVAS:
						this._renderOption = options.renderer;
						Kiwi.Log.log(
							"  Kiwi.Game: Rendering using CANVAS.",
							"#renderer",
							"#canvas" );
						break;
					case Kiwi.RENDERER_WEBGL:
						if ( Kiwi.DEVICE.webGL ) {
							this._renderOption = options.renderer;
							Kiwi.Log.log(
								"  Kiwi.Game: Rendering using WEBGL.",
								"#renderer",
								"#webgl" );
						} else {
							this._renderOption = renderFallback;
							Kiwi.Log.log(
								"  Kiwi.Game: WEBGL renderer requested " +
								"but device does not support WEBGL. " +
								"Rendering using CANVAS.",
								"#renderer",
								"#canvas" );
						}
						break;
					case Kiwi.RENDERER_AUTO:
						if ( Kiwi.DEVICE.webGL ) {
							this._renderOption = renderDefault;
							Kiwi.Log.log(
								"  Kiwi.Game: Renderer auto-detected WEBGL.",
								"#renderer",
								"#webgl" );
						} else {
							this._renderOption = renderFallback;
							Kiwi.Log.log(
								"  Kiwi.Game: Renderer auto-detected CANVAS.",
								"#renderer",
								"#canvas" );
						}
						break;
					default:
						if ( Kiwi.DEVICE.webGL ) {
							this._renderOption = renderDefault;
							Kiwi.Log.log(
								"  Kiwi.Game: Renderer specified, " +
								"but is not a valid option. " +
								"Defaulting to WEBGL.",
								"#renderer",
								"#webgl" );
						} else {
							this._renderOption = renderFallback;
							Kiwi.Log.log(
								"  Kiwi.Game: Renderer specified, " +
								"but is not a valid option. " +
								"WEBGL renderer sought by default " +
								"but device does not support WEBGL. " +
								"Defaulting to CANVAS.",
								"#renderer",
								"#canvas" );
						}
						break;
				}
			} else {
				if ( Kiwi.DEVICE.webGL ) {
					this._renderOption = renderDefault;
					Kiwi.Log.log(
						"  Kiwi.Game: Renderer not specified. " +
						"Defaulting to WEBGL.",
						"#renderer",
						"#webgl" );
				} else {
					this._renderOption = renderFallback;
					Kiwi.Log.log(
						"  Kiwi.Game: Renderer not specified. " +
						"WEBGL renderer sought by default " +
						"but device does not support WEBGL. " +
						"Defaulting to CANVAS.",
						"#renderer",
						"#canvas" );
				}
			}


			this.id = Kiwi.GameManager.register( this );
			this._startup = new Kiwi.System.Bootstrap();

			this.audio = new Kiwi.Sound.AudioManager( this );

			this.fileStore = new Kiwi.Files.FileStore( this );
			this.input = new Kiwi.Input.InputManager( this );

			// Width / Height
			var width = Stage.DEFAULT_WIDTH;
			var height = Stage.DEFAULT_HEIGHT;

			if (
				options.width !== "undefined" &&
				typeof options.width === "number" ) {

				width = options.width;
			}

			if (
				options.height !== "undefined" &&
				typeof options.height === "number" ) {

				height = options.height;
			}

			Kiwi.Log.log(
				"  Kiwi.Game: Stage Dimensions: " + width + "x" + height,
				"#dimensions" );


			if ( !Kiwi.Utils.Common.isUndefined( options.scaleType ) ) {

				switch ( options.scaleType ) {
					case Kiwi.Stage.SCALE_FIT:
						Kiwi.Log.log(
							"  Kiwi.Game: Stage scaling set to FIT.",
							"#scaling" );
						break;
					case Kiwi.Stage.SCALE_FIT_INSIDE:
						Kiwi.Log.log(
							"  Kiwi.Game: Stage scaling set to FIT_INSIDE.",
							"#scaling" );
						break;
					case Kiwi.Stage.SCALE_STRETCH:
						Kiwi.Log.log(
							"  Kiwi.Game: Stage scaling set to STRETCH.",
							"#scaling" );
						break;
					case Kiwi.Stage.SCALE_NONE:
						Kiwi.Log.log(
							"  Kiwi.Game: Stage scaling set to NONE.",
							"#scaling" );
						break;
					default:
						Kiwi.Log.log(
							"  Kiwi.Game: Stage specified, " +
							"but is not a valid option. Set to NONE.",
							"#scaling" );
						options.scaleType = 0;
						break;
				}

			} else {
				Kiwi.Log.log(
					"  Kiwi.Game: Stage scaling not specified, " +
					"defaulting to NONE.",
					"#scaling" );
				options.scaleType = 0;
			}

			if (
				this._deviceTargetOption === Kiwi.TARGET_COCOON &&
				options.scaleType === Kiwi.Stage.SCALE_FIT_INSIDE ) {
				// FIT_INSIDE is identical to FIT, so fall back to that.
				options.scaleType = Kiwi.Stage.SCALE_FIT;
			}


			this.stage = new Kiwi.Stage(
				this, name, width, height, options.scaleType );

			this.renderer = null;

			this.cameras = new Kiwi.CameraManager( this );

			if ( this._deviceTargetOption !== Kiwi.TARGET_COCOON ) {
				this.huds = new Kiwi.HUD.HUDManager( this );
			}
			this.loader = new Kiwi.Files.Loader( this );

			this.states = new Kiwi.StateManager( this );
			this.rnd = new Kiwi.Utils.RandomDataGenerator(
				[ Date.now().toString() ] );
			this.time = new Kiwi.Time.ClockManager( this );
			this.tweens = new Kiwi.Animations.Tweens.TweenManager( this );

			// If we have a state then pass it to the StateManager
			if ( state !== null ) {
				this.states.addState( state, true );
			} else {
				Kiwi.Log.log(
					"  Kiwi.Game: Default State not passed.",
					"#state" );
			}

			this.pluginManager =
				new Kiwi.PluginManager( this, options.plugins );

			if ( this.deviceTargetOption === Kiwi.TARGET_BROWSER ) {

				this._startup.boot( domParent, () => this._start() );
			} else {
				if ( domParent !== "" ) {
					Kiwi.Log.log(
						"  Kiwi.Game: Not Targetting a BROWSER. " +
						"DOM Parent parameter ignored.",
						"#dom" );
				}
				this._start();
			}

		}

		/**
		Render mode of the game. This will be either set to CANVAS or WEBGL.

		@property _renderOption
		@type number
		@private
		**/
		private _renderOption: number;

		/**
		Render mode of the game, decided once the game initialises. READ ONLY.

		@property renderOption
		@type number
		@public
		**/
		public get renderOption(): number {
			return this._renderOption;
		}

		/**
		Callback function that can be passed in as an option
		in the configuration object.
		Invoked after the boot process has completed.

		@property bootCallbackOption
		@type function
		@private
		**/
		public bootCallbackOption: Function;

		/**
		Type of device that you are targeting.
		This is either set to COCOON or BROWSER.

		@property _deviceTargetOption
		@type number
		@private
		**/
		private _deviceTargetOption: number;

		/**
		Returns the device target option for the game.
		This is READ ONLY and is decided once the game gets initialised.

		@property deviceTargetOption
		@type number
		@public
		**/
		public get deviceTargetOption(): number {
			return this._deviceTargetOption;
		}

		/**
		If when rendering, the game should render a new CANVAS which is
		above everything. This new canvas is for debugging purposes only.
		This gets set to either DEBUG_ON or DEBUG_OFF

		@property _debugOption
		@type number
		@private
		**/
		private _debugOption: number;

		/**
		Debug option, decided once the game gets initialised. READ ONLY.

		@property debugOption
		@type number
		@public
		**/
		public get debugOption(): number {
			return this._debugOption;
		}

		/**
		Whether debug option is set to `Kiwi.DEBUG_ON`

		@property debug
		@type boolean
		@public
		**/
		public get debug(): boolean {
			return this._debugOption === Kiwi.DEBUG_ON;
		}

		/**
		Renderer that is being used, based on the `_renderMode`

		@property renderer
		@type IRenderManager
		@public
		**/
		public renderer: IRenderManager;

		/**
		HUD manager

		@property huds
		@type HUDManager
		@public
		**/
		public huds: Kiwi.HUD.HUDManager;

		public objType() {

			/**
			Return the type of object that the game is.

			@method objType
			@return {string} "Game"
			@public
			**/

			return "Game";
		}

		/**
		Performs DOM and device startup operations for browsers (not Cocoon)

		@property _startup
		@type Kiwi.System.Bootstrap
		@private
		**/
		private _startup: Kiwi.System.Bootstrap = null;

		/**
		Unique id for the game

		@property id
		@type number
		@public
		**/
		public id: number;

		/**
		Audio manager that handles all of the audio in game.
		Inside you can globally mute the audio, create new sounds, etc.

		@property audio
		@type Kiwi.Sound.AudioManager
		@public
		**/
		public audio: Kiwi.Sound.AudioManager = null;

		/**
		Global file store for this game. This handles the storage
		and access of information loaded,
		as well as tags that maybe set for them individual files.

		@property fileStore
		@type Kiwi.Files.FileStore
		@public
		**/
		public fileStore: Kiwi.Files.FileStore = null;

		/**
		Handles user input with the game, e.g. keyboard, mouse or touch events

		@property input
		@type Kiwi.Input.InputManager
		@public
		**/
		public input: Kiwi.Input.InputManager = null;

		/**
		Manages the cameras the are on the stage

		@property cameras
		@type Kiwi.CameraManager
		@public
		**/
		public cameras: Kiwi.CameraManager = null;

		/**
		Manages plugins registration and initialisation for the game instance

		@property pluginManager
		@type Kiwi.PluginManager
		@public
		**/
		public pluginManager: Kiwi.PluginManager = null;

		/**
		Loads files from outside sources
		and checks to see that they have loaded correctly or not.

		@property loader
		@type Kiwi.Files.Loader
		@public
		**/
		public loader: Kiwi.Files.Loader = null;

		/**
		`RequestAnimationFrame` used for the update and render loops

		@property raf
		@type Kiwi.Utils.RequestAnimationFrame
		@public
		**/
		public raf: Kiwi.Utils.RequestAnimationFrame = null;

		/**
		The ONLY stage that is being used for this game.

		@property stage
		@type Stage
		@public
		**/
		public stage: Kiwi.Stage = null;

		/**
		Manages all of the states that exist for this game.
		Via the manager you can create new states,
		switch states and do various other tasks.

		@property states
		@type Kiwi.StateManager
		@public
		**/
		public states: Kiwi.StateManager = null;

		/**
		Holds a reference to the clocks that are being used
		and has a `master` clock that is being used for the game.

		@property time
		@type Kiwi.Time.ClockManager
		@public
		**/
		public time: Kiwi.Time.ClockManager = null;

		/**
		Tween manager used to create and run all global tweens

		@property tweens
		@type Kiwi.Animations.Tweens.TweenManager
		@public
		**/
		public tweens: Kiwi.Animations.Tweens.TweenManager = null;

		/**
		Random Data Generator used to create unique ids and random information

		@property rnd
		@type Kiwi.Utils.RandomDataGenerator
		@public
		**/
		public rnd: Kiwi.Utils.RandomDataGenerator = null;

		/**
		Framerate at which the game will update

		@property _framerate
		@type number
		@default 60
		@private
		**/
		private _frameRate: number = 60;

		/**
		Interval between frames in milliseconds

		@property _interval
		@type number
		@default 1000/60
		@private
		**/
		private _interval: number = 1000 / 60;

		/**
		Current interval between frames

		@property _delta
		@type number
		@private
		**/
		private _delta: number = 0;

		/**
		Last time the game was updated

		@property _lastTime
		@type number
		@private
		**/
		private _lastTime: number;

		/**
		Number of frames since the game was launched

		@property _frame
		@type number
		@private
		@since 1.1.0
		**/
		private _frame: number = 0;

		/**
		Number of frames since the game was launched.

		Use this to drive cyclic animations.
		However, `idealFrame` is a smoother alternative.

		You may manually reset it in a `Kiwi.State.create()` function
		to restart the count from 0.

		The largest exact integer value of a JavaScript number is 2^53,
		or 9007199254740992. At 60 frames per second,
		this will take 4,760,273 years to become inaccurate.

		@property frame
		@type number
		@public
		@since 1.1.0
		**/
		public get frame(): number {
			return( this._frame );
		}
		public set frame( value: number ) {
			this._frame = Kiwi.Utils.GameMath.truncate( value );
		}


		/**
		Number of ideal frames since the game was launched.

		Use this to drive cyclic animations.
		This will be smoother than using the frame parameter.
		It is derived from the total time elapsed since the game launched.

		@property idealFrame
		@type number
		@public
		@since 1.1.0
		**/
		public get idealFrame(): number {
			return ( this.time.elapsed() / ( 1000 / this._frameRate ) );
		}


		/**
		The current frameRate that the update/render loops are running at.
		Note that this may not be an  accurate representation.

		@property frameRate
		@return string
		@public
		**/
		public get frameRate(): number {

			return this._frameRate;
		}
		public set frameRate( value: number ) {
			if ( value > 0 ) {
				this._frameRate = value;
				this._interval = 1000 / this._frameRate;
				this.time.setMasterInterval( this._interval );
			}
		}

		private _start() {

			/**
			Handle start-up of the managers when the game is ready to boot.
			Once the managers have started up, create the game loop.

			@method _start
			@private
			**/

			this.stage.boot( this._startup );

			if ( !this.stage.renderer ) {
				Kiwi.Log.error(
					"  Kiwi.Game: Could not create rendering context",
					"#renderer" );
			}
			if (
				this._renderOption === Kiwi.RENDERER_WEBGL &&
				this.stage.ctx ) {

				// Adapt to fallback if WebGL failed
				this._renderOption = Kiwi.RENDERER_CANVAS;
			}
			this.renderer = this.stage.renderer;
			this.renderer.boot();

			this.cameras.boot();
			if ( this._deviceTargetOption !== Kiwi.TARGET_COCOON ) {
				this.huds.boot();
			}

			this.time.boot();
			this.input.boot();
			this.audio.boot();

			this.fileStore.boot();
			this.loader.boot();
			this.states.boot();

			this.pluginManager.boot();

			this._lastTime = Date.now();

			this.raf = new Kiwi.Utils.RequestAnimationFrame(
				() => this._loop() );
			this.raf.start();

			if ( this.bootCallbackOption ) {
				Kiwi.Log.log( "  Kiwi.Game: invoked boot callback", "#boot" );
				this.bootCallbackOption( this );
			}
		}

		private _loop() {

			/**
			Execute the game loop.

			@method _loop
			@private
			**/

			// Only update non-graphical game systems if a full frame
			// has passed
			this._delta = this.raf.currentTime - this._lastTime;
			if ( this._delta > this._interval ) {

				this.time.update();
				this.audio.update();
				this.input.update();
				this.tweens.update();
				this.cameras.update();
				if ( this._deviceTargetOption !== Kiwi.TARGET_COCOON ) {
					this.huds.update();
				}
				this.states.update();
				this.pluginManager.update();
				this._frame++;

				this._lastTime =
					this.raf.currentTime - ( this._delta % this._interval );
			}

			// Graphics MUST be drawn every frame to avert frame buffer issues
			// under some clients
			if ( this.states.current !== null ) {

				// Only update if there is a current state
				this.cameras.render();
				this.states.postRender();
			}
		}

		public restart () {
			/**
			Restart the game. Useful if the renderer has crashed.
			See `Kiwi.Stage.handleGlCrash()` for more information.

			@method restart
			@public
			@since 1.5.0
			**/

			this.stage.flushElements();

			this._start();
		}

	}

}
