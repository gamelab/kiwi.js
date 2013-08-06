/// <reference path="../Kiwi.ts" />
/// <reference path="../dom/Bootstrap.ts" />
/// <reference path="../dom/Browser.ts" />
/// <reference path="Device.ts" />
/// <reference path="LayerManager.ts" />
/// <reference path="Stage.ts" />
/// <reference path="../anims/Manager.ts" />
/// <reference path="../tweens/Manager.ts" />
/// <reference path="../utils/RandomDataGenerator.ts" />
/// <reference path="../utils/RequestAnimationFrame.ts" />

/**
 *	Kiwi - Core - Game
 *
 *	@desc 		
 *	@version 	1.1 - 27th February 2013
 *
 *	@author 	Richard Davey
 *	@author 	Ross Kettle
 *
 *	@url 		http://www.kiwijs.org
*/

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
        constructor (domParent: string = '', defaultType: number = Kiwi.TYPE_DOM, name: string = 'KiwiGame', state: any = null) {



            this.id = Kiwi.GameManager.register(this);

            this._dom = new Kiwi.DOM.Bootstrap();

            this.anims = new Kiwi.Anims.Manager(this);
            this.audio = new Kiwi.Sound.AudioManager(this);
            this.browser = new Kiwi.DOM.Browser(this);
            this.cache = new Kiwi.Cache(this);
            this.input = new Kiwi.Input.Manager(this);

            this.stage = new Kiwi.Stage(this, name, defaultType);
            this.layers = new Kiwi.LayerManager(this, defaultType);
            this.cameras = new Kiwi.CameraManager(this, false);
            this.huds = new Kiwi.HUD.HUDManager(this);

            this.loader = new Kiwi.Loader(this);
            
            this.states = new Kiwi.StateManager(this);
            this.rnd = new Kiwi.Utils.RandomDataGenerator([Date.now.toString()]);
            this.time = new Kiwi.Time.Manager(this);
            this.tweens = new Kiwi.Tweens.Manager(this);
            
            //  If we have a state then pass it to the StateManager
            if (state !== null)
            {
                if (this.states.addState(state, true) === false)
                {
                    throw Error("Invalid State passed to Kiwi.Game");
                }
            }

            //  Wait for the DOM
            this._dom.boot(domParent, () => this.start());

        }

        
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
        private _dom: Kiwi.DOM.Bootstrap = null;

        /*
        * 
        * @property id
        * @type Number
        */
        public id: number;

        public anims: Kiwi.Anims.Manager = null;
        
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
        public browser: Kiwi.DOM.Browser = null;

        /*
        * 
        * @property cache
        * @type Kiwi.Cache
        */
        public cache: Kiwi.Cache = null;

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
        public layers: Kiwi.LayerManager = null;

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
        public loader: Kiwi.Loader = null;

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
        public tweens: Kiwi.Tweens.Manager = null;

        /*
        * 
        * @property rnd
        * @type Kiwi.Utils.RandomDataGenerator
        */
        public rnd: Kiwi.Utils.RandomDataGenerator = null;
        
        /*
        * 
        * @method start
        */
        private start() {

            if (Kiwi.DEVICE === null)
            {
                Kiwi.DEVICE = new Kiwi.Device();
            }

            this.browser.boot();
            this.stage.boot(this._dom);
            this.layers.boot();
            this.cameras.boot(this._dom.domLayers);
            this.huds.boot();
            this.time.boot();
            this.anims.boot();
            this.audio.boot();
            this.input.boot();
            this.cache.boot();
            this.loader.boot();
            this.states.boot();

            klog.info('Game Started. DOM Available. Valid State Given');
            klog.info('Game Time: ' + this.time.now());

            this.raf = new Kiwi.Utils.RequestAnimationFrame(() => this.loop());
            this.raf.start();

        }
        
        /*
        * 
        * @method loop
        */
        private loop() {

            this.time.update();
            this.audio.update();
            this.input.update();
            this.tweens.update();
            this.cameras.update();
            this.layers.update();
            this.huds.update();

            this.states.update();
            

          //  this.layers.render();
            this.cameras.render();
            this.huds.render();

            this.states.postRender();

        }

    }

}