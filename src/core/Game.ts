/// <reference path="../Kiwi.ts" />

module Kiwi {

    export class Game {

        /*
        *  
        * @constructor
        * @param {String} domParent
        * @param {String} name
        * @param {Any} state
        * @param {Object} options
        * @return {Kiwi.Game}
        */
        constructor (domParent: string = '', name: string = 'KiwiGame', state: any = null,options?) {

            //set options
            options = options || {};          
            this._debugOption = options.debug || Kiwi.DEBUG_ON;
            this._deviceTargetOption = options.deviceTarget || Kiwi.TARGET_BROWSER;
            this._renderOption = options.renderer || Kiwi.RENDERER_CANVAS;
            
            this.id = Kiwi.GameManager.register(this);

            this._startup = new Kiwi.System.Bootstrap();

            this.audio = new Kiwi.Sound.AudioManager(this);
            this.browser = new Kiwi.System.Browser(this);
      
            this.fileStore = new Kiwi.Files.FileStore(this);
            this.input = new Kiwi.Input.Manager(this);


            //this needs to be passed in instead of hard coded
            //this._renderMode = Kiwi.RENDERER_CANVAS;
            //this._renderOption = Kiwi.RENDERER_WEBGL;
            this.stage = new Kiwi.Stage(this, name);
            
            if (this._renderOption === Kiwi.RENDERER_CANVAS) {
                this.renderer = new Kiwi.Renderers.CanvasRenderer(this);
            } else {
                this.renderer = new Kiwi.Renderers.GLRenderer(this);
            }

           
            this.cameras = new Kiwi.CameraManager(this);
            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.huds = new Kiwi.HUD.HUDManager(this);
            }
            this.loader = new Kiwi.Files.Loader(this);
            
            this.states = new Kiwi.StateManager(this);
            this.rnd = new Kiwi.Utils.RandomDataGenerator([Date.now.toString()]);
            this.time = new Kiwi.Time.Manager(this);
            this.tweens = new Kiwi.Animation.Tweens.Manager(this);
            

            //  If we have a state then pass it to the StateManager
            if (state !== null)
            {
                if (this.states.addState(state, true) === false)
                {
                    throw Error("Invalid State passed to Kiwi.Game");
                }
            }

            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                //  Wait for the DOM
                this._startup.boot(domParent, () => this.start());
            } else {
                this.start();
            }

        }

        /*
        * The render mode of the game. This will be either set to CANVAS or WEBGL.
        * @property _renderOption
        * @type number
        */
        private _renderOption: number;

        /*
        * Returns the render mode of the game. This is READ ONLY and is decided once the game gets initialised.
        * @type number
        */
        public get renderOption(): number {
            return this._renderOption;
        }

        /*
        * The type of device that you are targeting. This is either set to COCOON or BROWSER
        * @property _deviceTargetOption
        * @type number
        */
        private _deviceTargetOption: number;

        /*
        * Returns the device target option for the game. This is READ ONLY and is decided once the game gets initialised.
        * @type number
        */
        public get deviceTargetOption(): number {
            return this._deviceTargetOption;
        }

        /*
        * If when rendering, the game should render a new CANVAS which is above everything. This new canvas is for debugging purposes only.
        * This gets set to either DEBUG_ON or DEBUG_OFF
        * @property _debugOption
        * @type number
        */
        private _debugOption: number;

        /*
        * Returns the debug option. This is READ ONLY and is decided once the game gets initialised.
        * @type number
        */
        public get debugOption(): number {
            return this._debugOption;
        }

        /*
        * Holds the renderer that is being used. This is detiremended based of the _renderMode
        * @property renderer
        * @type IRenderer
        */
        public renderer: IRenderer;

        /*
        * Holds the hud manager.
        * @property huds
        * @type Kiwi.HUD.HUDManager
        */
        public huds: Kiwi.HUD.HUDManager;

        /*
        * The type of object that the game is.
        * @method objType
        * @return string
        */
        public objType() {
            return "Game";
        }

        /*
        * 
        * @property _dom
        * @type Kiwi.DOM.Bootstrap
        * @private
        */
        private _startup: Kiwi.System.Bootstrap = null;

        /*
        * The unique id for the game. 
        * @property id
        * @type Number
        */
        public id: number;
         
        /*
        * The audio manager that handles all of the audio in game. Inside you can globally mute the audio, create new sounds, e.t.c.
        * @property audio
        * @type Kiwi.Audio.AudioManager
        */
        public audio: Kiwi.Sound.AudioManager = null;

        /*
        * Used to get the coordinates of any DOM element on the game. 
        * @property browser
        * @type Kiwi.Dom.Browser
        */
        public browser: Kiwi.System.Browser = null;

        /*
        * The global file store for this game. This handles the storage and access of information loaded, as well as tags that maybe set for them individual files.
        * @property fileStore
        * @type Kiwi.Files.FileStore
        */
        public fileStore: Kiwi.Files.FileStore = null;

        /*
        * Handles any user input with the game. These could via the users keyboard, mouse or touch events.
        * @property input
        * @type Kiwi.Input.Manager
        */
        public input: Kiwi.Input.Manager = null;
         
        /*
        * Manages the cameras the are on the stage. This is still to be implemented.
        * @property layers
        * @type Kiwi.LayerManager
        */
        public cameras: Kiwi.CameraManager = null;

        /*
        * Loads files from outside sources and checks to see that they have loaded correctly or not.
        * @property loader
        * @type Kiwi.Loader
        */
        public loader: Kiwi.Files.Loader = null;

        /*
        * The Request Animation Frame that is being used for the update and render loops.
        * @property raf
        * @type Kiwi.Utils.RequestAnimationFrame
        */
        public raf: Kiwi.Utils.RequestAnimationFrame = null;

        /*
        * The ONLY stage that is being used for this game.
        * @property stage
        * @type Kiwi.Stage
        */
        public stage: Kiwi.Stage = null;

        /*
        * Manages all of the states that exist for this game. Via the manager you can create new states, switch states and do various other tasks.
        * @property states
        * @type Kiwi.StateManager
        */
        public states: Kiwi.StateManager = null;

        /*
        * Holds a reference to the clocks that are being used and has a MASTER clock that is being used for the game.
        * @property time
        * @type Kiwi.Time.Manager
        */
        public time: Kiwi.Time.Manager = null;

        /*
        * The tween manager holds a reference to all of the tweens that are created and currently being used. 
        * @property tweens
        * @type Kiwi.Tweens.Manager
        */
        public tweens: Kiwi.Animation.Tweens.Manager = null;

        /*
        * A Random Data Generator. This is useful for create unique ids and random information.
        * @property rnd
        * @type Kiwi.Utils.RandomDataGenerator
        */
        public rnd: Kiwi.Utils.RandomDataGenerator = null;
        
        /**
        * The framerate at which the game will update at.
        * @property _framerate
        * @type Number
        */
        private _frameRate: number = 60;

        /*
        * The interval between frames.
        * @property _interval
        * @type Number
        * @private
        */
        private _interval: number = 1000 / 60;

        /*
        * The current interval between frames.
        * @property _delta
        * @type number
        */
        private _delta: number = 0;

        /*
        * The last time the game was updated
        * @property _lastTime
        * @type number
        */
        private _lastTime: number;

        /*
        * Returns the current frameRate that the update/render loops are running at. Note that this may  ot be a  accurate representation.
        * @return string
        */
        public get frameRate(): number {

            return this._frameRate;
        }

        /*
        * Set the MAXIMUM frame rate of the update/render loops. 
        * @type number
        */
        public set frameRate(value: number) {

            //cannot exceed 60. The raf will stop this anyway.
            if (value > 60) value = 60;

            if (value >= 0) {
                this._frameRate = value;
                this._interval = 1000 / this._frameRate;
            }
        }

        /*
        * The start method gets executed when the game is ready to be booted, and handles the start-up of the managers.
        * Once the managers have started up the start loop will then begin to create the game loop.
        * @method start
        */
        private start() {

            if (Kiwi.DEVICE === null)
            {
                Kiwi.DEVICE = new Kiwi.System.Device();
            }

            this.browser.boot();
            this.stage.boot(this._startup);
            this.renderer.boot();
            this.cameras.boot();
            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.huds.boot();
            }
            this.time.boot();
            this.audio.boot();
            this.input.boot();
          
            this.fileStore.boot();
            this.loader.boot();
            this.states.boot();

            this._lastTime = Date.now();

            this.raf = new Kiwi.Utils.RequestAnimationFrame(() => this.loop());
            this.raf.start();
            
        }
        
        /*
        * The loop that the whole game is using. 
        * @method loop
        */
        private loop() {
    
            this._delta = this.raf.currentTime - this._lastTime;
            
            if (this._delta > this._interval) {
                this.time.update();
                this.audio.update();
                this.input.update();
                this.tweens.update();
                this.cameras.update();
                if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this.huds.update();
                }
                this.states.update();
                
                this.cameras.render();
                if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this.huds.render();
                }
                this.states.postRender();
                
                this._lastTime = this.raf.currentTime - (this._delta % this._interval);
            }
        }

    }

}