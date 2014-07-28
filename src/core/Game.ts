/**
* 
* @module Kiwi
* 
*/

module Kiwi {

    /**
    * The base class that is used when you create a new Game. Handles the initialisation of all of the various individual game managers and holds the RAF (RequestAnimationFrame object) which is used for the game loop.
    *
    * @class Game
    * @namespace Kiwi
    * @constructor
    * @param [domParent=''] {String} The ID of a DOM element that the game should use as its 'container'. If you are targeting Cocoon then you don't need to worry about this and can leave it blank.
    * @param [name='KiwiGame'] {String} The name of the game that is being created. 
    * @param [state=null] {Any} The state to load initially. This can either be the name of a state, but preferably this would be the state object itself.
    * @param [options] {Object} Any special options for the game. E.g. Is DEBUG_ON or DEBUG_OFF, RENDERER_CANVAS or RENDERER_WEBGL, TARGET_BROWSER or TARGET_COCOON
    * @return {Kiwi.Game}
    * 
    */
    export class Game {
         
        constructor (domParent: string = '', name: string = 'KiwiGame', state: any = null, options:any={}) {
            
            console.log('Kiwi.Game: ' + name + ' is booting, using Kiwi.js version ' + Kiwi.VERSION);
      
            if (Kiwi.DEVICE === null) { 
                Kiwi.DEVICE = new Kiwi.System.Device();
            }

            if (options.debug !== 'undefined' && typeof options.debug === 'number') {
                switch (options.debug) {
                    case Kiwi.DEBUG_ON:
                        this._debugOption = options.debug;
                        console.log('  Kiwi.Game: Debugging turned ON.');
                        break;
                    case Kiwi.DEBUG_OFF:
                        this._debugOption = options.debug;
                        console.log('  Kiwi.Game: Debugging turned OFF.');
                        break;
                    default:
                        this._debugOption = Kiwi.DEBUG_ON;
                        console.error('  Kiwi.Game: Debug option passed, but is not a valid option. Turned ON by default.');
                        break;
                }
            } else {
                this._debugOption = Kiwi.DEBUG_ON;
                console.log('  Kiwi.Game: Debug option not specified. Turned ON by default.');
            }

            if (options.bootCallback !== 'undefined') {
                this.bootCallbackOption = options.bootCallback;
            }

            //Which device are they targetting
            if (options.deviceTarget !== 'undefined' && typeof options.deviceTarget === 'number') {
                switch (options.deviceTarget) {
                    case Kiwi.TARGET_BROWSER:
                        this._deviceTargetOption = options.deviceTarget;
                        console.log('  Kiwi.Game: Targeting BROWSERS.');
                        break;
                    case Kiwi.TARGET_COCOON:
                        this._deviceTargetOption = options.deviceTarget;
                        console.log('  Kiwi.Game: Targeting COCOONJS.');
                        break;
                    default:
                        this._deviceTargetOption = Kiwi.TARGET_BROWSER;
                        console.error('  Kiwi.Game: Target device specified, but is not a valid option. Defaulting to BROWSER.');
                        break;
                }
            } else {
                this._deviceTargetOption = Kiwi.TARGET_BROWSER;
                console.log('  Kiwi.Game: Targeted device not specified. Defaulting to BROWSER'); 
            }

            var renderDefault = Kiwi.RENDERER_WEBGL;
            var renderFallback = Kiwi.RENDERER_CANVAS;
            // Optimise renderer request
            if (options.renderer !== 'undefined' && typeof options.renderer === 'number') {
                switch (options.renderer) {
                    case Kiwi.RENDERER_CANVAS:
                        this._renderOption = options.renderer;
                        console.log('  Kiwi.Game: Rendering using CANVAS.');
                        break;
                    case Kiwi.RENDERER_WEBGL:
                        if (Kiwi.DEVICE.webGL) {
                            this._renderOption = options.renderer;
                            console.log('  Kiwi.Game: Rendering using WEBGL.');
                        } else {
                            this._renderOption = renderFallback;
                            console.log('  Kiwi.Game: WEBGL renderer requested but device does not support WEBGL. Rendering using CANVAS.');
                        }
                        break;
                    case Kiwi.RENDERER_AUTO:
                        if (Kiwi.DEVICE.webGL) {
                            this._renderOption = renderDefault;
                            console.log('  Kiwi.Game: Renderer auto-detected WEBGL.');
                        } else {
                            this._renderOption = renderFallback;
                            console.log('  Kiwi.Game: Renderer auto-detected CANVAS.');
                        }
                        break;
                    default:
                        if (Kiwi.DEVICE.webGL) {
                            this._renderOption = renderDefault;
                            console.log('  Kiwi.Game: Renderer specified, but is not a valid option. Defaulting to WEBGL.');
                        } else {
                            this._renderOption = renderFallback;
                            console.log('  Kiwi.Game: Renderer specified, but is not a valid option. WEBGL renderer sought by default but device does not support WEBGL. Defaulting to CANVAS.');
                        }
                        break;
                }
            } else {
                if (Kiwi.DEVICE.webGL) {
                    this._renderOption = renderDefault;
                    console.log('  Kiwi.Game: Renderer not specified. Defaulting to WEBGL.');
                } else {
                    this._renderOption = renderFallback;
                    console.log('  Kiwi.Game: Renderer not specified. WEBGL renderer sought by default but device does not support WEBGL. Defaulting to CANVAS.');
                }
            }
            
            
            this.id = Kiwi.GameManager.register(this);
            this._startup = new Kiwi.System.Bootstrap();

            this.audio = new Kiwi.Sound.AudioManager(this);
                
            this.fileStore = new Kiwi.Files.FileStore(this);
            this.input = new Kiwi.Input.InputManager(this);

            // Width / Height
            var width = Stage.DEFAULT_WIDTH;
            var height = Stage.DEFAULT_HEIGHT;

            if (options.width !== 'undefined' && typeof options.width === 'number') {
                width = options.width;
            }

            if (options.height !== 'undefined' && typeof options.height === 'number') {
                height = options.height;
            }

            console.log('  Kiwi.Game: Stage Dimensions: ' + width + 'x' + height);

            
            if (options.scaleType !== 'undefined') {

                switch (options.scaleType) {
                    case Kiwi.Stage.SCALE_FIT:
                        console.log('  Kiwi.Game: Stage scaling set to FIT.');
                        break;
                    case Kiwi.Stage.SCALE_STRETCH:
                        console.log('  Kiwi.Game: Stage scaling set to STRETCH.');
                        break;
                    case Kiwi.Stage.SCALE_NONE:
                        console.log('  Kiwi.Game: Stage scaling set to NONE.');
                        break;
                    default:
                        console.log('  Kiwi.Game: Stage specified, but is not a valid option. Set to NONE.');
                        options.scaleType = 0;
                        break;
                }

            } else {
                options.scaleType = 0;
            }


            this.stage = new Kiwi.Stage(this, name, width, height, options.scaleType);

            this.renderer = null;
           
            this.cameras = new Kiwi.CameraManager(this);

            if (this._deviceTargetOption !== Kiwi.TARGET_COCOON) this.huds = new Kiwi.HUD.HUDManager(this);
            this.loader = new Kiwi.Files.Loader(this);
            
            this.states = new Kiwi.StateManager(this);
            this.rnd = new Kiwi.Utils.RandomDataGenerator([Date.now.toString()]);
            this.time = new Kiwi.Time.ClockManager(this);
            this.tweens = new Kiwi.Animations.Tweens.TweenManager(this);
            
            //  If we have a state then pass it to the StateManager
            if (state !== null) {
                this.states.addState(state, true);
            } else {
                console.log('  Kiwi.Game: Default State not passed.');
            }

            this.pluginManager = new Kiwi.PluginManager(this, options.plugins);

            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                if (domParent !== '') {
                    if (document.getElementById(domParent)) console.log('  Kiwi.Game: Game being created inside ' + domParent + '.');
                    else console.log('  Kiwi.Game: The element "' + domParent + '" could not be found. Appending the game to the body.');
                } else {
                    console.log('  Kiwi.Game: No DOM parent specified. Appending the game to the body.');
                }

                this._startup.boot( domParent, () => this._start() );
            } else {
                if (domParent !== '') console.log('  Kiwi.Game: Not Targetting a BROWSER. DOM Parent parameter ignored.');
                
                this._start();
            }

        }

        /**
        * The render mode of the game. This will be either set to CANVAS or WEBGL.
        * @property _renderOption
        * @type number
        * @private
        */
        private _renderOption: number;

        /**
        * Returns the render mode of the game. This is READ ONLY and is decided once the game gets initialised.
        * @property renderOption
        * @type number
        * @public
        */
        public get renderOption(): number {
            return this._renderOption;
        }

        /**
        * A callback function that can be passed in as an option in the conifugration object. Invoked after the boot process has completed.
        * @property bootCallbackOption
        * @type Function
        * @private
        */
        public bootCallbackOption: Function;

        /**
        * The type of device that you are targeting. This is either set to COCOON or BROWSER
        * @property _deviceTargetOption
        * @type number
        * @private
        */
        private _deviceTargetOption: number;

        /**
        * Returns the device target option for the game. This is READ ONLY and is decided once the game gets initialised.
        * @property deviceTargetOption
        * @type number
        * @public
        */
        public get deviceTargetOption(): number {
            return this._deviceTargetOption;
        }

        /**
        * If when rendering, the game should render a new CANVAS which is above everything. This new canvas is for debugging purposes only.
        * This gets set to either DEBUG_ON or DEBUG_OFF
        * @property _debugOption
        * @type number
        * @private
        */
        private _debugOption: number;

        /**
        * Returns the debug option. This is READ ONLY and is decided once the game gets initialised.
        * @property debugOption
        * @type number
        * @public
        */
        public get debugOption(): number {
            return this._debugOption;
        }

        /**
        * Returns true if debug option is set to Kiwi.DEBUG_ON
        * @property debug
        * @type boolean
        * @public
        */

        public get debug(): boolean {
            return this._debugOption === Kiwi.DEBUG_ON;
        }

        /**
        * Holds the renderer that is being used. This is determined based on the _renderMode
        * @property renderer
        * @type IRenderManager
        * @public
        */
        public renderer: IRenderManager;

        /**
        * Holds the hud manager.
        * @property huds
        * @type HUDManager
        * @public
        */
        public huds: Kiwi.HUD.HUDManager;

        /**
        * The type of object that the game is.
        * @method objType
        * @return {String} The type of object
        * @public
        */
        public objType() {
            return "Game";
        }

        /**
        * The object that peforms DOM and device startup operations for browsers (ie not cocoon)
        * @property _startup
        * @type Kiwi.System.Bootstrap
        * @private
        */
        private _startup: Kiwi.System.Bootstrap = null;

        /*
        * The unique id for the game. 
        * @property id
        * @type Number
        * @public
        */
        public id: number;
         
        /**
        * The audio manager that handles all of the audio in game. Inside you can globally mute the audio, create new sounds, e.t.c.
        * @property audio
        * @type Kiwi.Sound.AudioManager
        * @public
        */
        public audio: Kiwi.Sound.AudioManager = null;

        /**
        * The global file store for this game. This handles the storage and access of information loaded, as well as tags that maybe set for them individual files.
        * @property fileStore
        * @type Kiwi.Files.FileStore
        * @public
        */
        public fileStore: Kiwi.Files.FileStore = null;

        /**
        * Handles any user input with the game. These could via the users keyboard, mouse or touch events.
        * @property input
        * @type Kiwi.Input.InputManager
        * @public
        */
        public input: Kiwi.Input.InputManager = null;
         
        /**
        * Manages the cameras the are on the stage. Single default Camera only in this version.
        * @property cameras
        * @type Kiwi.CameraManager
        * @public
        */
        public cameras: Kiwi.CameraManager = null;

        /**
        * Manages plugins registration and initialisation for the game instance.
        * @property pluginManager
        * @type Kiwi.PluginManager
        * @public
        */
        public pluginManager: Kiwi.PluginManager = null;

        /**
        * Loads files from outside sources and checks to see that they have loaded correctly or not.
        * @property loader
        * @type Kiwi.Files.Loader
        * @public
        */
        public loader: Kiwi.Files.Loader = null;

        /**
        * The Request Animation Frame that is being used for the update and render loops.
        * @property raf
        * @type Kiwi.Utils.RequestAnimationFrame
        * @public
        */
        public raf: Kiwi.Utils.RequestAnimationFrame = null;

        /**
        * The ONLY stage that is being used for this game.
        * @property stage
        * @type Stage
        * @public
        */
        public stage: Kiwi.Stage = null;

        /**
        * Manages all of the states that exist for this game. Via the manager you can create new states, switch states and do various other tasks.
        * @property states
        * @type Kiwi.StateManager
        * @public
        */
        public states: Kiwi.StateManager = null;

        /**
        * Holds a reference to the clocks that are being used and has a MASTER clock that is being used for the game.
        * @property time
        * @type Kiwi.Time.ClockManage
        * @public
        */
        public time: Kiwi.Time.ClockManager = null;

        /**
        * The tween manager holds a reference to all of the tweens that are created and currently being used. 
        * @property tweens
        * @type Kiwi.Animations.Tweens.TweenManager
        * @public
        */
        public tweens: Kiwi.Animations.Tweens.TweenManager = null;

        /**
        * A Random Data Generator. This is useful for create unique ids and random information.
        * @property rnd
        * @type Kiwi.Utils.RandomDataGenerato
        * @public
        */
        public rnd: Kiwi.Utils.RandomDataGenerator = null;
        
        /**
        * The framerate at which the game will update at.
        * @property _framerate
        * @type Number
        * @default 60
        * @public
        */
        private _frameRate: number = 60;

        /**
        * The interval between frames.
        * @property _interval
        * @type Number
        * @default 1000/60
        * @private
        */
        private _interval: number = 1000 / 60;

        /**
        * The current interval between frames.
        * @property _delta
        * @type number
        * @private
        */
        private _delta: number = 0;

        /**
        * The last time the game was updated
        * @property _lastTime
        * @type number
        * @private
        */
        private _lastTime: number;

        /**
        * The number of frames since the game was launched.
        * @property _frame
        * @type number
        * @private
        * @since 1.1.0
        */
        private _frame: number = 0;

        /**
        * The number of frames since the game was launched.
        * 
        * Use this to drive cyclic animations. You may manually reset it in a Kiwi.State.create() function to restart the count from 0.
        *
        * The largest exact integer value of a JavaScript number is 2^53, or 9007199254740992. At 60 frames per second, this will take 4,760,273 years to become inaccurate.
        * @property frame
        * @type number
        * @public
        * @since 1.1.0
        */
        public get frame(): number {
            return( this._frame );
        }
        public set frame( value: number ) {
            this._frame = Kiwi.Utils.GameMath.truncate( value );
        }

        /**
        * The number of ideal frames since the game was launched.
        *
        * Use this to drive cyclic animations. This will be smoother than using the frame parameter. It is derived from the total time elapsed since the game launched.
        * @property idealFrame
        * @type number
        * @public
        * @since 1.1.0
        */
        public get idealFrame(): number {
            return (this.time.elapsed() / (1000 / this._frameRate) );
        }


        /**
        * The current frameRate that the update/render loops are running at. Note that this may not be an  accurate representation.
        * @property frameRate
        * @return string
        * @public
        */
        public get frameRate(): number {

            return this._frameRate;
        }
        public set frameRate(value: number) {
            if (value > 0) {
                this._frameRate = value;
                this._interval = 1000 / this._frameRate;
                this.time.setMasterInterval( this._interval );
            }
        }

        /**
        * The start method gets executed when the game is ready to be booted, and handles the start-up of the managers.
        * Once the managers have started up the start loop will then begin to create the game loop.
        * @method start
        * @private
        */
        private _start() {

     
            this.stage.boot(this._startup);

            if(!this.stage.renderer)    console.error("Could not create rendering context");
            if(this._renderOption === Kiwi.RENDERER_WEBGL  &&  this.stage.ctx)
                this._renderOption = Kiwi.RENDERER_CANVAS;  // Adapt to fallback if WebGL failed
            this.renderer = this.stage.renderer;
            this.renderer.boot();
            
            this.cameras.boot();
            if (this._deviceTargetOption !== Kiwi.TARGET_COCOON) this.huds.boot();
            
            this.time.boot();
            this.input.boot();
            this.audio.boot();
          
            this.fileStore.boot();
            this.loader.boot();
            this.states.boot();

            this.pluginManager.boot();

            this._lastTime = Date.now();
            
            this.raf = new Kiwi.Utils.RequestAnimationFrame( () => this._loop() );
            this.raf.start();

            if (this.bootCallbackOption) {
                console.log("  Kiwi.Game: invoked boot callback");
                this.bootCallbackOption( this );
            }
        }
        
        /**
        * The game loop. 
        * @method _loop
        * @private
        */
        private _loop() {
            
            this._delta = this.raf.currentTime - this._lastTime;
            if (this._delta > this._interval) {

                //Only update if there is a current state
                this.time.update();
                this.audio.update();
                this.input.update();
                this.tweens.update();
                this.cameras.update();
                if (this._deviceTargetOption !== Kiwi.TARGET_COCOON) this.huds.update();
                this.states.update();
                this.pluginManager.update();
                this._frame++;

                if (this.states.current !== null) {
                    this.cameras.render();
                    this.states.postRender();
                }

                this._lastTime = this.raf.currentTime - (this._delta % this._interval);
            }
        }

    }

}