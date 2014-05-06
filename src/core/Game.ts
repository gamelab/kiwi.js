/**
* 
* @module Kiwi
* 
*/

module Kiwi {

    /**
    * The base class that is used when you are wanting to create a new Game. Handles the initialisation of all of the various individual game managers and holds the RAF which is used for the game loop.
    *
    * @class Game
    * @namespace Kiwi
    * @constructor
    * @param [domParent=''] {String} The ID of a DOM element that the game should use as its 'container'. If you are targeting Cocoon then you don't need to worry about this and can leave it blank.
    * @param [name='KiwiGame'] {String} The name of the game that is being created. 
    * @param [state=null] {Any} The state to load initially. This can either be the name of a state, but preferably this would be the state object itself.
    * @param [options] {Object} Any special options for the game. E.g. Is DEBUG_ON or DEBUG_OFF, RENDERER_CANVAS or RENDERER_WEBGL, TARGET_BROWSER or TARGET_COCOON
    * @return {Game}
    * 
    */
    export class Game {
         
        constructor (domParent: string = '', name: string = 'KiwiGame', state: any = null, options:any={}) {
            
            console.log(name + ' is booting, using Kiwi.js version ' + Kiwi.VERSION);
      
            //Have they specified debugging
            if (options.debug !== 'undefined' && typeof options.debug === 'number') {
                switch (options.debug) {
                    case Kiwi.DEBUG_ON:
                        this._debugOption = options.debug;
                        console.log('Debugging turned ON.');
                        break;
                    case Kiwi.DEBUG_OFF:
                        this._debugOption = options.debug;
                        console.log('Debugging turned OFF.');
                        break;
                    default:
                        this._debugOption = Kiwi.DEBUG_ON;
                        console.error('Debug option passed, but is not a valid option. Turned ON by default.');
                        break;
                }
            } else {
                this._debugOption = Kiwi.DEBUG_ON;
                console.log('Debug option not specified. Turned ON by default.');
            }

            if (options.bootCallback !== 'undefined') {
                console.log("boot callback provided");
                this.bootCallbackOption = options.bootCallback;
            }

            //Which device are they targetting
            if (options.deviceTarget !== 'undefined' && typeof options.deviceTarget === 'number') {
                switch (options.deviceTarget) {
                    case Kiwi.TARGET_BROWSER:
                        this._deviceTargetOption = options.deviceTarget;
                        console.log('Targeting BROWSERS.');
                        break;
                    case Kiwi.TARGET_COCOON:
                        this._deviceTargetOption = options.deviceTarget;
                        console.log('Targeting COCOONJS.');
                        break;
                    default:
                        this._deviceTargetOption = Kiwi.TARGET_BROWSER;
                        console.error('Target device specified, but is not a valid option. Defaulting to BROWSER.');
                        break;
                }
            } else {
                this._deviceTargetOption = Kiwi.TARGET_BROWSER;
                console.log('Targeted device not specified. Defaulting to BROWSER'); 
            }

            //What renderer are they using?
            if (options.renderer !== 'undefined' && typeof options.renderer === 'number') {
                switch (options.renderer) {
                    case Kiwi.RENDERER_CANVAS:
                        this._renderOption = options.renderer;
                        console.log('Rendering using CANVAS.');
                        break;
                    case Kiwi.RENDERER_WEBGL:
                        this._renderOption = options.renderer;
                        console.log('Rendering using WEBGL.');
                        break;
                    default:
                        this._renderOption = Kiwi.RENDERER_CANVAS;
                        console.log('Renderer specified, but is not a valid option. Defaulting to CANVAS.');
                        break;
                }
            } else {
                this._renderOption = Kiwi.RENDERER_CANVAS;
                console.log('Renderer not specified. Defaulting to CANVAS');
            }
            
            this.id = Kiwi.GameManager.register(this);
            this._startup = new Kiwi.System.Bootstrap();

            this.audio = new Kiwi.Sound.AudioManager(this);
            this.browser = new Kiwi.System.Browser(this);
      
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

            console.log('Stage Dimensions: ' + width + 'x' + height);


            if (options.scaleType !== 'undefined') {

                switch (options.scaleType) {
                    case Kiwi.Stage.SCALE_FIT:
                        console.log('Stage scaling set to FIT.');
                        break;
                    case Kiwi.Stage.SCALE_STRETCH:
                        console.log('Stage scaling set to STRETCH.');
                        break;
                    case Kiwi.Stage.SCALE_NONE:
                        console.log('Stage scaling set to NONE.');
                        break;
                    default:
                        console.log('Stage specified, but is not a valid option. Set to NONE.');
                        options.scaleType = 0;
                        break;
                }

            } else {
                options.scaleType = 0;
            }


            this.stage = new Kiwi.Stage(this, name, width, height, options.scaleType);


            if (this._renderOption === Kiwi.RENDERER_CANVAS) {
                this.renderer = new Kiwi.Renderers.CanvasRenderer(this);
            } else {
                this.renderer = new Kiwi.Renderers.GLRenderManager(this);
            }
           
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
                console.log('Default State not passed.');
            }

            this.pluginManager = new Kiwi.PluginManager(this, options.plugins);

            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                if (domParent !== '') {
                    if (document.getElementById(domParent)) console.log('Game being created inside ' + domParent + '.');
                    else console.log('The element "' + domParent + '" could not be found. Appending the game to the body.');
                } else {
                    console.log('No DOM parent specified. Appending the game to the body.');
                }

                this._startup.boot( domParent, () => this.start() );
            } else {
                if (domParent !== '') console.log('Not Targetting a BROWSER. DOM Parent parameter ignored.');
                
                this.start();
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
        * Holds the renderer that is being used. This is detiremended based of the _renderMode
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
        * [REQUIRES DESCRIPTION]
        * @property _dom
        * @type Bootstrap
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
        * @type AudioManager
        * @public
        */
        public audio: Kiwi.Sound.AudioManager = null;

        /**
        * Used to get the coordinates of any DOM element on the game. 
        * @property browser
        * @type Browser
        * @public
        */
        public browser: Kiwi.System.Browser = null;

        /**
        * The global file store for this game. This handles the storage and access of information loaded, as well as tags that maybe set for them individual files.
        * @property fileStore
        * @type FileStore
        * @public
        */
        public fileStore: Kiwi.Files.FileStore = null;

        /**
        * Handles any user input with the game. These could via the users keyboard, mouse or touch events.
        * @property input
        * @type InputManager
        * @public
        */
        public input: Kiwi.Input.InputManager = null;
         
        /**
        * Manages the cameras the are on the stage. Single default Camera only in this version.
        * @property cameras
        * @type CameraManager
        * @public
        */
        public cameras: Kiwi.CameraManager = null;

        /**
        * Manages plugins registration and initialisation for the game instance.
        * @property pluginManager
        * @type PluginManager
        * @public
        */
        public pluginManager: Kiwi.PluginManager = null;

        /**
        * Loads files from outside sources and checks to see that they have loaded correctly or not.
        * @property loader
        * @type Loader
        * @public
        */
        public loader: Kiwi.Files.Loader = null;

        /**
        * The Request Animation Frame that is being used for the update and render loops.
        * @property raf
        * @type RequestAnimationFrame
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
        * @type StateManager
        * @public
        */
        public states: Kiwi.StateManager = null;

        /**
        * Holds a reference to the clocks that are being used and has a MASTER clock that is being used for the game.
        * @property time
        * @type ClockManager
        * @public
        */
        public time: Kiwi.Time.ClockManager = null;

        /**
        * The tween manager holds a reference to all of the tweens that are created and currently being used. 
        * @property tweens
        * @type TweenManager
        * @public
        */
        public tweens: Kiwi.Animations.Tweens.TweenManager = null;

        /**
        * A Random Data Generator. This is useful for create unique ids and random information.
        * @property rnd
        * @type RandomDataGenerator
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
        * The current frameRate that the update/render loops are running at. Note that this may not be an  accurate representation.
        * @property frameRate
        * @return string
        * @public
        */
        public get frameRate(): number {

            return this._frameRate;
        }
        public set frameRate(value: number) {

            //cannot exceed 60. The raf will stop this anyway.
            if (value > 60) value = 60;

            if (value >= 0) {
                this._frameRate = value;
                this._interval = 1000 / this._frameRate;
            }
        }

        /**
        * The start method gets executed when the game is ready to be booted, and handles the start-up of the managers.
        * Once the managers have started up the start loop will then begin to create the game loop.
        * @method start
        * @private
        */
        private start() {

            if (Kiwi.DEVICE === null) { //dont we want to move this up into the constructor
                Kiwi.DEVICE = new Kiwi.System.Device();
            }

            this.browser.boot();
            this.stage.boot(this._startup);
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
            
            this.raf = new Kiwi.Utils.RequestAnimationFrame(() => this.loop());
            this.raf.start();
            if (this.bootCallbackOption) {
                console.log("invoked boot callback");
                this.bootCallbackOption();
            }
        }
        
        /**
        * The loop that the whole game is using. 
        * @method loop
        * @private
        */
        private loop() {
            
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

                if (this.states.current !== null) {
                    this.cameras.render();
                    this.states.postRender();
                }

                this._lastTime = this.raf.currentTime - (this._delta % this._interval);
            }
        }

    }

}