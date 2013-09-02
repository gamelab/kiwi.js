/// <reference path="../Kiwi.ts" />

module Kiwi {

    export class Game {

        /*
        * If you don't specify the default layer type it will assume DOM
        * @constructor
        * @param {String} domParent
        * @param {Number} defaultType
        * @param {String} name
        * @param {Any} state
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

        private _deviceTargetOption: number;
        public get deviceTargetOption(): number {
            return this._deviceTargetOption;
        }

        private _debugOption: number;
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
        * 
        * @property id
        * @type Number
        */
        public id: number;

      
        
        /*
        *
        * @property audio
        * @type Kiwi.Audio.AudioManager
        */
        public audio: Kiwi.Sound.AudioManager = null;

        /*
        * 
        * @property browser
        * @type Kiwi.Dom.Browser
        */
        public browser: Kiwi.System.Browser = null;

      
        public fileStore: Kiwi.Files.FileStore = null;

        /*
        * 
        * @property input
        * @type Kiwi.Input.Manager
        */
        public input: Kiwi.Input.Manager = null;

       
        /*
        * 
        * @property layers
        * @type Kiwi.LayerManager
        */
        public cameras: Kiwi.CameraManager = null;

        /*
        * 
        * @property loader
        * @type Kiwi.Loader
        */
        public loader: Kiwi.Files.Loader = null;

        /*
        * 
        * @property raf
        * @type Kiwi.Utils.RequestAnimationFrame
        */
        public raf: Kiwi.Utils.RequestAnimationFrame = null;

        /*
        * 
        * @property stage
        * @type Kiwi.Stage
        */
        public stage: Kiwi.Stage = null;

        /*
        * 
        * @property states
        * @type Kiwi.StateManager
        */
        public states: Kiwi.StateManager = null;

        /*
        * 
        * @property time
        * @type Kiwi.Time.Manager
        */
        public time: Kiwi.Time.Manager = null;

        /*
        * 
        * @property tweens
        * @type Kiwi.Tweens.Manager
        */
        public tweens: Kiwi.Animation.Tweens.Manager = null;

        /*
        * 
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
        * Getters and setters for the frame rate.
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

        /*
        * 
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
        * 
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