/// <reference path="../src/WebGL.d.ts" />
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
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
    class Game {
        constructor(domParent?: string, name?: string, state?: any, options?: any);
        /**
        * The render mode of the game. This will be either set to CANVAS or WEBGL.
        * @property _renderOption
        * @type number
        * @private
        */
        private _renderOption;
        /**
        * Returns the render mode of the game. This is READ ONLY and is decided once the game gets initialised.
        * @property renderOption
        * @type number
        * @public
        */
        public renderOption : number;
        public bootCallbackOption: Function;
        /**
        * The type of device that you are targeting. This is either set to COCOON or BROWSER
        * @property _deviceTargetOption
        * @type number
        * @private
        */
        private _deviceTargetOption;
        /**
        * Returns the device target option for the game. This is READ ONLY and is decided once the game gets initialised.
        * @property deviceTargetOption
        * @type number
        * @public
        */
        public deviceTargetOption : number;
        /**
        * If when rendering, the game should render a new CANVAS which is above everything. This new canvas is for debugging purposes only.
        * This gets set to either DEBUG_ON or DEBUG_OFF
        * @property _debugOption
        * @type number
        * @private
        */
        private _debugOption;
        /**
        * Returns the debug option. This is READ ONLY and is decided once the game gets initialised.
        * @property debugOption
        * @type number
        * @public
        */
        public debugOption : number;
        /**
        * Returns true if debug option is set to Kiwi.DEBUG_ON
        * @property debug
        * @type boolean
        * @public
        */
        public debug : boolean;
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
        public objType(): string;
        /**
        * [REQUIRES DESCRIPTION]
        * @property _dom
        * @type Bootstrap
        * @private
        */
        private _startup;
        public id: number;
        /**
        * The audio manager that handles all of the audio in game. Inside you can globally mute the audio, create new sounds, e.t.c.
        * @property audio
        * @type AudioManager
        * @public
        */
        public audio: Kiwi.Sound.AudioManager;
        /**
        * Used to get the coordinates of any DOM element on the game.
        * @property browser
        * @type Browser
        * @public
        */
        public browser: Kiwi.System.Browser;
        /**
        * The global file store for this game. This handles the storage and access of information loaded, as well as tags that maybe set for them individual files.
        * @property fileStore
        * @type FileStore
        * @public
        */
        public fileStore: Kiwi.Files.FileStore;
        /**
        * Handles any user input with the game. These could via the users keyboard, mouse or touch events.
        * @property input
        * @type InputManager
        * @public
        */
        public input: Kiwi.Input.InputManager;
        /**
        * Manages the cameras the are on the stage. Single default Camera only in this version.
        * @property cameras
        * @type CameraManager
        * @public
        */
        public cameras: Kiwi.CameraManager;
        /**
        * Manages plugins registration and initialisation for the game instance.
        * @property pluginManager
        * @type PluginManager
        * @public
        */
        public pluginManager: Kiwi.PluginManager;
        /**
        * Loads files from outside sources and checks to see that they have loaded correctly or not.
        * @property loader
        * @type Loader
        * @public
        */
        public loader: Kiwi.Files.Loader;
        /**
        * The Request Animation Frame that is being used for the update and render loops.
        * @property raf
        * @type RequestAnimationFrame
        * @public
        */
        public raf: Kiwi.Utils.RequestAnimationFrame;
        /**
        * The ONLY stage that is being used for this game.
        * @property stage
        * @type Stage
        * @public
        */
        public stage: Kiwi.Stage;
        /**
        * Manages all of the states that exist for this game. Via the manager you can create new states, switch states and do various other tasks.
        * @property states
        * @type StateManager
        * @public
        */
        public states: Kiwi.StateManager;
        /**
        * Holds a reference to the clocks that are being used and has a MASTER clock that is being used for the game.
        * @property time
        * @type ClockManager
        * @public
        */
        public time: Kiwi.Time.ClockManager;
        /**
        * The tween manager holds a reference to all of the tweens that are created and currently being used.
        * @property tweens
        * @type TweenManager
        * @public
        */
        public tweens: Kiwi.Animations.Tweens.TweenManager;
        /**
        * A Random Data Generator. This is useful for create unique ids and random information.
        * @property rnd
        * @type RandomDataGenerator
        * @public
        */
        public rnd: Kiwi.Utils.RandomDataGenerator;
        /**
        * The framerate at which the game will update at.
        * @property _framerate
        * @type Number
        * @default 60
        * @public
        */
        private _frameRate;
        /**
        * The interval between frames.
        * @property _interval
        * @type Number
        * @default 1000/60
        * @private
        */
        private _interval;
        /**
        * The current interval between frames.
        * @property _delta
        * @type number
        * @private
        */
        private _delta;
        /**
        * The last time the game was updated
        * @property _lastTime
        * @type number
        * @private
        */
        private _lastTime;
        /**
        * The current frameRate that the update/render loops are running at. Note that this may not be an  accurate representation.
        * @property frameRate
        * @return string
        * @public
        */
        public frameRate : number;
        /**
        * The start method gets executed when the game is ready to be booted, and handles the start-up of the managers.
        * Once the managers have started up the start loop will then begin to create the game loop.
        * @method start
        * @private
        */
        private start();
        /**
        * The loop that the whole game is using.
        * @method loop
        * @private
        */
        private loop();
    }
}
/**
*
* @module Kiwi
*
*/ 
declare module Kiwi {
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
    class Stage {
        constructor(game: Kiwi.Game, name: string);
        /**
        * Returns the type of this object.
        * @method objType
        * @return string
        * @public
        */
        public objType(): string;
        /**
        * The default width of the stage.
        * @property DEFAULT_WIDTH
        * @type number
        * @public
        * @static
        */
        static DEFAULT_WIDTH: number;
        /**
        * The default height of the stage.
        * @property DEFAULT_HEIGHT
        * @type number
        * @public
        * @static
        */
        static DEFAULT_HEIGHT: number;
        /**
        * The alpha of the stage.
        * @property _alpha
        * @type number
        * @private
        */
        private _alpha;
        /**
        * Get the current alpha of the stage. 0 = invisible, 1 = fully visible.
        * @property alpha
        * @type number
        * @public
        */
        public alpha : number;
        /**
        * The X coordinate of the stage.
        * @property _x
        * @type number
        * @private
        */
        private _x;
        /**
        * The X coordinate of the stage. This number should be the same as the stages left property.
        * @property x
        * @type number
        * @public
        */
        public x : number;
        /**
        * The Y coordinate of the stage.
        * @property _y
        * @type number
        * @private
        */
        private _y;
        /**
        * Get the Y coordinate of the stage. This number should be the same as the stages top property.
        * @property y
        * @type number
        * @public
        */
        public y : number;
        /**
        * The width of the stage.
        * @property _width
        * @type number
        * @private
        */
        private _width;
        /**
        * The width of the stage.
        * @property width
        * @type number
        * @public
        * @readonly
        */
        public width : number;
        /**
        * The height of the stage
        * @property _height
        * @type number
        * @private
        */
        private _height;
        /**
        * The height of the stage
        * @property height
        * @type number
        * @public
        * @readonly
        */
        public height : number;
        public onResize: Kiwi.Signal;
        /**
        * Calculates and returns the amount that the container has been scale buy.
        * Mainly used for re-calculating input coordinates.
        * Note: For COCOONJS this returns 1 since COCOONJS translates the points itself.
        * This property is READ ONLY.
        * @property scale
        * @type Number
        * @default 1
        * @public
        */
        private _scale;
        public scale : number;
        /**
        * A point which determines the offset of this Stage
        * @property offset
        * @type Point
        * @public
        */
        public offset: Kiwi.Geom.Point;
        /**
        * The game this Stage belongs to
        * @property _game
        * @type Game
        * @private
        */
        private _game;
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
        public color : string;
        /**
        * Stores the normalized background color of the stage as a RGBA values between 0 and 1.
        * @property _normalizedColor
        * @type object
        * @public
        */
        private _normalizedColor;
        /**
        * Get the normalized background color of the stage. returns a object with rgba values between 0 and 1.
        * @property color
        * @type string
        * @public
        */
        public normalizedColor : any;
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
        public container: HTMLDivElement;
        /**
        * Is executed when the DOM has loaded and the game is just starting.
        * @method boot
        * @param {HTMLElement} dom
        * @public
        */
        public boot(dom: Kiwi.System.Bootstrap): void;
        /**
        * Method that is fired when the window is resized.
        * Used to calculate the new offset and see what the scale of the stage currently is.
        * @method _windowResized
        * @param event {UIEvent}
        * @private
        */
        private _windowResized(event);
        /**
        * [DESCRIPTION REQUIRED]
        * @method _createComponsiteCanvas
        * @private
        */
        private _createCompositeCanvas();
        /**
        * Set the stage width and height
        * @method resize
        * @param width {number} new stage width
        * @param height {number} new stage height
        * @public
        */
        public resize(width: number, height: number): void;
        /**
        * [DESCRIPTION REQUIRED]
        * @method _createDebugCanvas
        * @private
        */
        private _createDebugCanvas();
        /**
        * [DESCRIPTION REQUIRED]
        * @method clearDebugCanvas
        * @param [color='rgba(255,0,0,0.2)'] {string} debug color
        * @public
        */
        public clearDebugCanvas(color?: string): void;
        /**
        * [DESCRIPTION REQUIRED]
        * @method toggleDebugCanvas
        * @public
        */
        public toggleDebugCanvas(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * The component manager is a class that is used to handle a number of components that are active on a particular object.
    * This way if you want to check to see if a particular component is on an object you can ask the component manager,
    * Or when updating components you can tell the component manager to update and all of the components will update as well.
    *
    * @class ComponentManager
    * @namespace Kiwi
    * @constructor
    * @param type {number} - The type of object that this component manager's owner is.
    * @param owner {IChild} - The owner of this component manager.
    * @return {ComponentManager}
    *
    */
    class ComponentManager {
        constructor(type: number, owner: any);
        /**
        * Returns the type of this object
        * @method objType
        * @return {string} The type of this object
        * @public
        */
        public objType(): string;
        /**
        * The owner of this Component Manager
        * @property _owner
        * @type {any}
        * @private
        */
        private _owner;
        /**
        * The type of this object.
        * @property _type
        * @type number
        * @private
        */
        private _type;
        /**
        * A list of all components that are currently on the ComponentManager
        * @property _components
        * @type Component
        * @private
        */
        public _components: any;
        /**
        * Returns true if this contains the component given, false otherwise.
        * @method hasComponent
        * @param value {String} the name of the component
        * @return {boolean} True if this component manager contains the given component, false otherwise.
        * @public
        */
        public hasComponent(value: string): boolean;
        /**
        * Returns true if this contains the component given and the component is active, false otherwise.
        * @method hasActiveComponent
        * @param value {String} The name of the component.
        * @return {boolean} true if this manager contains the component and it is active, false otherwise.
        * @public
        */
        public hasActiveComponent(value: string): boolean;
        /**
        * Get an existing component that has been added to the layer by its name
        * @method getComponent
        * @param value {String} The component name
        * @return {Component} The component, if found, otherwise null
        * @public
        */
        public getComponent(value: string): any;
        /**
        * Adds a Component to the manager.
        * @method add
        * @param component {Component} The component to add
        * @return {Component} The component that was added
        * @public
        */
        public add(component: Kiwi.Component): any;
        /**
        * Adds a batch of components to the manager at a single time.
        * @method addBatch
        * @param value* {Component} The component/s that you would like to add.
        * @public
        */
        public addBatch(...paramsArr: any[]): void;
        /**
        * Removes a component from the component manager
        * @method removeComponent
        * @param component {Component} The component to be removed.
        * @param [destroy=true] {boolean} If the destroy method is to be called on the component when it is removed.
        * @return {boolean} true if the component was removed successfully
        * @public
        */
        public removeComponent(component: Kiwi.Component, destroy?: boolean): boolean;
        /**
        * Removes a component based on its name
        * @method removeComponentByName
        * @param name {String} The name of the component to be removed
        * @param [destroy=true] {boolean} If the destroy method is to be called on the component when it is removed.
        * @return {boolean} true if the component was removed successfully
        * @public
        */
        public removeComponentByName(name: string, destroy?: boolean): boolean;
        /**
        * Removes all of the components from the component manager.
        * @method removeAll
        * @param [destroy=true] {boolean} If true will destroy all components
        * @public
        */
        public removeAll(destroy?: boolean): void;
        /**
        * Calls preUpdate on all active Components
        * @method preUpdate
        * @public
        */
        public preUpdate(): void;
        /**
        * Calls update on all active Components
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Calls postUpdate on all active Components
        * @method postUpdate
        * @public
        */
        public postUpdate(): void;
        /**
        * Calls preRender on all active Components
        * @method preRender
        * @public
        */
        public preRender(): void;
        /**
        * Renders all active Components
        * @method render
        * @public
        */
        public render(): void;
        /**
        * Calls postRender on all active Components
        * @method postRender
        * @public
        */
        public postRender(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    *
    * @class PluginManager
    * @namespace Kiwi
    * @constructor
    * @param game {Game} The state that this entity belongs to. Used to generate the Unique ID and for garbage collection.
    * @param plugins {string[]} The entities position on the x axis.
    * @return {PluginManager} This PluginManager.
    *
    */
    class PluginManager {
        constructor(game: Kiwi.Game, plugins: string[]);
        /**
        * An array of plugins which have been included in the webpage and registered successfully.
        * @property _availablePlugins
        * @type Array
        * @static
        * @private
        */
        private static _availablePlugins;
        /**
        * An array of objects represetning all available plugins, each containing the name and version number of an available plugin
        * @property getAvailablePlugins
        * @type Array
        * @static
        * @private
        */
        static availablePlugins : any;
        /**
        * Registers a plugin object as available. Any game instance can choose to use the plugin.
        * Plugins need only be registered once per webpage. If registered a second time it will be ignored.
        * Two plugins with the same names cannot be reigstered simultaneously, even if different versions.
        * @method register
        * @param {object} plugin
        * @public
        * @static
        */
        static register(plugin: any): void;
        /**
        * Identifies the object as a PluginManager.
        * @property objType
        * @type string
        * @public
        */ 
        public objType : string;
        /**
        * A reference to the game instance that owns the PluginManager.
        * @property objType
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * An array of plugin names which the game instance has been configured to use. Each name must match the constructor function for the plugin.
        * @property _plugins
        * @type string[]
        * @private
        */
        private _plugins;
        /**
        * An array of objects that contain a boot function, each of which will be called when PluginManager.boot is invoked.
        * @property _bootObjects
        * @type Array
        * @private
        */
        private _bootObjects;
        /**
        * Builds a list of valid plugins used by the game instance. Each plugin name that is supplied in the Kiwi.Game constructor configuration object
        * is checked against the Kiwi.Plugins namespace to ensure that a property of the same name exists.
        * This will ignore plugin that are registered but not used by the game instance.
        * @method validatePlugins
        * @public
        */
        public validatePlugins(): void;
        /**
        * Returns true if a plugin identified by the supplied pluginName is registered.
        * @method pluginIsRegistered
        * @param {string} pluginName
        * @public
        */
        public pluginIsRegistered(pluginName: string): boolean;
        /**
        * Called after all other core objects and services created by the Kiwi.Game constructor are created.
        * Attempts to find a "create" function on each plugin and calls it if it exists.
        * The create function may return an object on which a boot function exists - to be called during boot process.
        * @method _createPlugins
        * @private
        */
        private _createPlugins();
        /**
        * Calls the boot functions on any objects that plugins used by the game instance have designated during creation.
        * @method boot
        * @public
        */
        public boot(): void;
        public update(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * Used to handle the creation and management of Cameras on a Game. Each Game will always have created for it a CameraManager and a default Camera on the manager. More Cameras can always be created by used of the create method of a CameraManager.
    *
    * @class CameraManager
    * @namespace Kiwi
    * @constructor
    * @param {Game} game
    * @return {CameraManager}
    */
    class CameraManager {
        constructor(game: Kiwi.Game);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        * @public
        */
        public objType(): string;
        /**
        * The game this object belongs to
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * A collection of cameras
        * @property _cameras
        * @type Camara[]
        * @private
        */
        private _cameras;
        /**
        * The id which will be used when next creating a camera
        * @property _nextCameraID
        * @type Number
        * @private
        */
        private _nextCameraID;
        /**
        * The default camera that is on this manager.
        * @property defaultCamera
        * @type Camara
        * @public
        */
        public defaultCamera: Kiwi.Camera;
        /**
        * Initializes the CameraManager, creates a new camera and assigns it to the defaultCamera
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Creates a new Camera and adds it to the collection of cameras.
        * @param {String} name. The name of the new camera.
        * @param {Number} x. The x position of the new camera.
        * @param {Number} y. The y position of the new camera.
        * @param {Number} width. The width of the new camera.
        * @param {Number} height. The height of the new camera.
        * @return {Camera} The new camera object.
        * @public
        */
        public create(name: string, x: number, y: number, width: number, height: number): Kiwi.Camera;
        /**
        * Removes the given camera, if it is present in the camera managers camera collection.
        * @method remove
        * @param camera {Camera}
        * @return {boolean} True if the camera was removed, false otherwise.
        * @public
        */
        public remove(camera: Kiwi.Camera): boolean;
        /**
        * Calls update on all the cameras.
        * @method update
        * @public
        */
        public update(): boolean;
        /**
        * Calls the render method on all the cameras
        * @method render
        * @public
        */
        public render(): boolean;
        /**
        * Removes all cameras in the camera Manager except the default camera. Does nothing if in multi camera mode.
        * @method removeAll - note should not remove default
        * @public
        */
        public removeAll(): void;
    }
}
/**
*
* @module Kiwi
*
*/ 
declare module Kiwi {
    /**
    * A lightweight object that contains values relating to the configuration of a State in a Kiwi Game.
    *
    * @class StateConfig
    * @namespace Kiwi
    * @constructor
    * @param {State} parent
    * @param {String} name
    * @return {StateConfig} This Object
    *
    */ 
    class StateConfig {
        constructor(parent: Kiwi.State, name: string);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The state this StateConfig belongs to.
        * @property _state
        * @type State
        * @private
        */
        private _state;
        /**
        * The name of the State, must be unique within your game.
        * @property name
        * @type String
        * @public
        */
        public name: string;
        /**
        * Currently unused.
        * @property isPersistent
        * @type boolean
        * @default false
        * @public
        */
        public isPersistent: boolean;
        /**
        * If this State has been created (the create method has been executed).
        * Essentually has the same meaning as 'isReady'.
        * @property isCreated
        * @type boolean
        * @default false
        * @public
        */
        public isCreated: boolean;
        /**
        * If the State has been initialised already (so the Boot and Init methods have been executed already).
        * A State only get Initialised once which is when it switched to for this first time.
        * @property isInitialised
        * @type boolean
        * @default false
        * @public
        */
        public isInitialised: boolean;
        /**
        * If the State that this config is on is 'ready' to be used (e.g. all the assets have been loaded and libraries complied)
        * or if it isn't and so it is still at the 'loading' stage.
        * @property isReady
        * @type boolean
        * @default false
        * @public
        */
        public isReady: boolean;
        /**
        * If the State that this config is on contains a Preloader Method.
        * @property hasPreloader
        * @type boolean
        * @default false
        * @public
        */
        public hasPreloader: boolean;
        /**
        * The number of times the State that this config belongs to has been active/used.
        * @property runCount
        * @type Number
        * @default 0
        * @public
        */
        public runCount: number;
        /**
        * The type of state this is. Currently Unused.
        * @property type
        * @type Number
        * @default 0
        * @public
        */
        public type: number;
        /**
        * Stores any parameters that are to be passed to the init method when the State that this config is on is switched to.
        * @property initParams
        * @type Array
        * @public
        */
        public initParams: any;
        /**
        * Stores any parameters that are to be passed to the create method when the State that this config is on is switched to.
        * @property createParams
        * @type Array
        * @public
        */
        public createParams: any;
        /**
        * Resets the properties contained on this StateConfig object.
        * This is executed when a State is about to be destroyed as so reset's it to be switched to again.
        * @method
        *
        */
        public reset(): void;
    }
}
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/ 
declare module Kiwi {
    /**
    * The state manager handles the starting, parsing, looping and swapping of game states. Thus there is only ever one state manager per game.
    *
    * @class StateManager
    * @namespace Kiwi
    * @constructor
    * @param game {Game} The game that this statemanager belongs to.
    * @return {StateMananger} This Object
    *
    */
    class StateManager {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this is.
        * @method objType
        * @return string
        * @public
        */
        public objType(): string;
        /**
        * The game that this manager belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * An array of all of the states that are contained within this manager.
        * @property _states
        * @type State[]
        * @private
        */
        private _states;
        /**
        * The current State that the game is at.
        * @property current
        * @type State
        * @default null
        * @public
        */
        public current: Kiwi.State;
        /**
        * The name of the new state that is to be switched to.
        * @property _newStateKey
        * @type string
        * @defualt null
        * @private
        */
        private _newStateKey;
        /**
        * Checks to see if a key exists. Internal use only.
        * @method checkKeyExists
        * @param key {String}
        * @return {boolean}
        * @private
        */
        private checkKeyExists(key);
        /**
        * Checks to see if the state passed is valid or not.
        * @method checkValidState
        * @param {State} state
        * @return {boolean}
        * @private
        */
        private checkValidState(state);
        /**
        * Adds the given State to the StateManager.
        * The State must have a unique key set on it, or it will fail to be added to the manager.
        * Returns true if added successfully, otherwise false (can happen if State is already in the StateManager)
        *
        * @method addState
        * @param state {Any} The Kiwi.State instance to add.
        * @param [switchTo=false] {boolean} If set to true automatically switch to the given state after adding it
        * @return {boolean} true if the State was added successfully, otherwise false
        * @public
        */
        public addState(state: any, switchTo?: boolean): boolean;
        /**
        * Is executed once the DOM has finished loading.
        * This is an INTERNAL Kiwi method.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Switches to the name (key) of the state that you pass.
        * Does not work if the state you are switching to is already the current state OR if that state does not exist yet.
        * @method setCurrentState
        * @param {String} key
        * @return {boolean}
        * @private
        */
        private setCurrentState(key);
        /**
        * Actually switches to a state that is stored in the 'newStateKey' property. This method is executed after the update loops have been executed to help prevent developer errors.
        * @method bootNewState
        * @private
        */
        private bootNewState();
        /**
        * Swaps the current state.
        * If the state has already been loaded (via addState) then you can just pass the key.
        * Otherwise you can pass the state object as well and it will load it then swap to it.
        *
        * @method switchState
        * @param key {String} The name/key of the state you would like to switch to.
        * @param [state=null] {Any} The state that you want to switch to. This is only used to create the state if it doesn't exist already.
        * @param [initParams=null] {Object} Any parameters that you would like to pass to the init method of that new state.
        * @param [createParams=null] {Object} Any parameters that you would like to pass to the create method of that new state.
        * @return {boolean}
        * @public
        */
        public switchState(key: string, state?: any, initParams?: any, createParams?: any): boolean;
        /**
        * Gets a state by the key that is passed.
        * @method getState
        * @param {String} key
        * @return {State}
        * @private
        */
        private getState(key);
        /**
        * Checks to see if the state that is being switched to needs to load some files or not.
        * If it does it loads the file, if it does not it runs the create method.
        * @method checkPreload
        * @private
        */
        private checkPreload();
        /**
        * Checks to see if the state being switched to contains a create method.
        * If it does then it calls the create method.
        * @method callCreate
        * @private
        */
        private callCreate();
        /**
        * Checks to see if the state has a init method and then executes that method if it is found.
        * @method checkInit
        * @private
        */
        private checkInit();
        /**
        * Is execute whilst files are being loaded by the state.
        * @method onLoadProgress
        * @param {Number} percent
        * @param {Number} bytesLoaded
        * @param {File} file
        * @private
        */
        private onLoadProgress(percent, bytesLoaded, file);
        /**
        * Executed when the preloading has completed. Then executes the loadComplete and create methods of the new state.
        * @method onLoadComplete
        * @private
        */
        private onLoadComplete();
        /**
        * Rebuilds the texture, audio and data libraries that are on the current state. Thus updating what files the user has access to.
        * @method rebuildLibraries
        * @private
        */
        public rebuildLibraries(): void;
        /**
        * The update loop that is accessable on the state manager.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * PostRender - Called after all of the rendering has been executed in a frame.
        * @method postRender
        * @public
        */
        public postRender(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * A IChild is an Interface (defined as a class as the documentation does not support Interfaces just yet),
    * which outlines the methods/properties that objects which are intended to be added as a child of a Stage or Group must have in order to work.
    *
    * @class IChild
    * @namespace Kiwi
    */
    interface IChild {
        render(camera: Kiwi.Camera): any;
        update(): any;
        childType(): number;
        id: string;
        name: string;
        game: Kiwi.Game;
        state: Kiwi.State;
        components: Kiwi.ComponentManager;
        dirty: boolean;
        active: boolean;
        exists: boolean;
        willRender: boolean;
        parent: Kiwi.Group;
        transform: Kiwi.Geom.Transform;
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        destroy(...params: any[]): any;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * An Entity serves as a container for game objects to extend from and thus you should never directly instantiate this class.
    * Each Entity has a unique ID (UID) which is automatically generated upon instantiation.
    * Every entity requires that you pass to it the state that it belongs too, that way when you switch states the appropriate entitys can be deleted.
    *
    * @class Entity
    * @namespace Kiwi
    * @constructor
    * @param state {State} The state that this entity belongs to. Used to generate the Unique ID and for garbage collection.
    * @param x {Number} The entities position on the x axis.
    * @param y {Number} The entities position on the y axis.
    * @return {Entity} This entity.
    *
    */
    class Entity implements Kiwi.IChild {
        constructor(state: Kiwi.State, x: number, y: number);
        public glRenderer: Kiwi.Renderers.Renderer;
        /**
        * Represents the position, scale, rotation and registration of this Entity.
        * @property transform
        * @type Transform
        * @public
        */
        public transform: Kiwi.Geom.Transform;
        /**
        * The group that this entity belongs to. If added onto the state then this is the state.
        * @property _parent
        * @type Group
        * @private
        */
        private _parent;
        /**
        * The group that this entity belongs to/is a child of once added to one. If added onto the state then this is the state.
        * @property parent
        * @type Group
        * @param val {Group}
        * @public
        */
        public parent : Kiwi.Group;
        /**
        * X coordinate of this Entity. This is just aliased to the transform property.
        * @property x
        * @type Number
        * @public
        */
        public x : number;
        /**
        * Y coordinate of this Entity. This is just aliased to the transform property.
        * @property y
        * @type Number
        * @public
        */
        public y : number;
        /**
        * Scale X of this Entity. This is just aliased to the transform property.
        * @property scaleX
        * @type Number
        * @public
        */
        public scaleX : number;
        /**
        * Scale Y coordinate of this Entity. This is just aliased to the transform property.
        * @property scaleY
        * @type Number
        * @public
        */
        public scaleY : number;
        /**
        * Rotation of this Entity. This is just aliased to the transform property.
        * @property rotation
        * @type Number
        * @public
        */
        public rotation : number;
        /**
        * The rotation point on the x-axis. This is just aliased to the rotPointX on the transform object.
        * @property rotPointX
        * @type number
        * @public
        */
        public rotPointX : number;
        /**
        * The rotation point on the y-axis. This is just aliased to the rotPointY on the transform object.
        * @property rotPointY
        * @type number
        * @public
        */
        public rotPointY : number;
        /**
        * Returns the type of child that this is.
        * @type Number
        * @return {Number} returns the type of child that the entity is
        * @public
        */
        public childType(): number;
        /**
        * The actual alpha of this entity.
        * @property _alpha
        * @type Number
        * @private
        */
        private _alpha;
        /**
        * Alpha of this entity. A number between 0 (invisible) and 1 (completely visible).
        * @property alpha
        * @type Number
        * @public
        */
        public alpha : number;
        /**
        * A boolean that indicates whether or not this entity is visible or not. Note that is does not get set to false if the alpha is 0.
        * @property _visible
        * @type boolean
        * @default true
        * @private
        */
        private _visible;
        /**
        * Set the visiblity of this entity. True or False.
        * @property visibility
        * @type boolean
        * @default true
        * @public
        */
        public visible : boolean;
        /**
        * The width of the entity in pixels.
        * @property width
        * @type number
        * @default 0
        * @public
        */
        public width: number;
        /**
        * The height of the entity in pixels.
        * @property height
        * @type number
        * @default 0
        * @public
        */
        public height: number;
        /**
        * The texture atlas that is to be used on this entity.
        * @property atlas
        * @type TextureAtlas
        * @public
        */
        public atlas: Kiwi.Textures.TextureAtlas;
        /**
        * Used as a reference to a single Cell in the atlas that is to be rendered.
        * E.g. If you had a spritesheet with 3 frames/cells and you wanted the second frame to be displayed you would change this value to 1
        * @property cellIndex
        * @type number
        * @default 0
        * @public
        */
        public cellIndex: number;
        /**
        * The Component Manager
        * @property components
        * @type ComponentManager
        * @public
        */
        public components: Kiwi.ComponentManager;
        /**
        * The game this Entity belongs to
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        /**
        * The state this Entity belongs to (either the current game state or a persistent world state)
        * @property state
        * @type State
        * @public
        */
        public state: Kiwi.State;
        /**
        * A unique identifier for this Entity within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type string
        * @public
        */
        public id: string;
        /**
        * A name for this Entity. This is not checked for uniqueness within the Game, but is very useful for debugging
        * @property name
        * @type string
        * @default ''
        * @public
        */
        public name: string;
        /**
        * If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property _exists
        * @type boolean
        * @private
        */
        private _exists;
        /**
        * Toggles the existence of this Entity. An Entity that no longer exists can be garbage collected or re-allocated in a pool.
        * @property exists
        * @type boolean
        * @public
        */
        public exists : boolean;
        /**
        * An active Entity is one that has its update method called by its parent.
        * @property _active
        * @type boolean
        * @default true
        * @private
        */
        private _active;
        /**
        * Toggles the active state of this Entity. An Entity that is active has its update method called by its parent.
        * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
        * @property active
        * @type boolean
        * @public
        */
        public active : boolean;
        /**
        * Controls whether render is automatically called by the parent.
        * @property _willRender
        * @type boolean
        * @default true
        * @private
        */
        private _willRender;
        /**
        * Toggles if this Entity will be rendered by a canvas layer. Use the visibile component for DOM layers.
        * @property willRender
        * @type boolean
        * @default true
        * @public
        */
        public willRender : boolean;
        /**
        * If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property exists
        * @type boolean
        * @private
        */
        private _inputEnabled;
        /**
        * Controls if this Entity is input enabled or not (i.e. responds to touch/mouse events)
        * This method should be over-ridden to handle specific game object implementations.
        * @property inputEnabled
        * @type boolean
        * @public
        */
        public inputEnabled : boolean;
        /**
        * The clock that this entity use's for time based calculations. This generated by the state on instatiation.
        * @property _clock
        * @type Clock
        * @private
        */
        private _clock;
        /**
        * The Clock used to update this all of this Entities components (defaults to the Game MasterClock)
        * @property clock
        * @type Clock
        * @public
        */
        public clock : Kiwi.Time.Clock;
        /**
        * A value used by components to control if the Entity needs re-rendering
        * @property dirty
        * @type boolean
        * @private
        */
        private _dirty;
        /**
        * A value used by components to control if the Entity needs re-rendering
        * @property dirty
        * @type boolean
        * @public
        */
        public dirty : boolean;
        /**
        * The type of this object.
        * @method objType
        * @return {String} The type of the object
        * @public
        */
        public objType(): string;
        /**
        * This isn't called until the Entity has been added to a Group or a State
        * @method update
        * @public
        */
        public update(): void;
        /**
        * This isn't called until the Entity has been added to a layer.
        * This functionality is handled by the sub classes.
        * @method render
        * @param {Camera} camera
        * @public
        */
        public render(camera: Kiwi.Camera): void;
        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
        /**
        * Used to completely destroy this entity and of its components. Used for garbage collection and developers can also use it as needed.
        * @method destroy
        * @param [immediate=false] {boolean} If the object should be immediately removed or if it should be removed at the end of the next update loop.
        * @public
        */
        public destroy(immediate?: boolean): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * The base class that all components extend from and thus contains all of the common functionality that is required of every Component.
    *
    * @class Component
    * @namespace Kiwi
    * @constructor
    * @param owner {IChild} The IChild that this component belongs to.
    * @param componentName {String} The name of this component.
    * @return {Component}
    */ 
    class Component {
        constructor(owner: Kiwi.IChild, name: string);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        * @public
        */
        public objType(): string;
        /**
        * The IChild that owns this entity
        * @property owner
        * @type IChild
        * @public
        */
        public owner: Kiwi.IChild;
        /**
        * The game this Component belongs to
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        /**
        * The name of this component.
        * @property name
        * @type string
        * @public
        */
        public name: string;
        /**
        * An active Component is one that has its update method called by its parent.
        * @property active
        * @type boolean
        * @default true
        * @public
        */
        public active: boolean;
        /**
        * The state of this component.
        * @property dirty
        * @type boolean
        * @default false
        * @public
        */
        public dirty: boolean;
        /**
        * Components can preUpdate, that is update before the parent updates. This is to be overriden by subclasses.
        * @method preUpdate
        * @public
        */
        public preUpdate(): void;
        /**
        * If the component is being added to a State rather than a Game Object then over-ride its update method to perform required tasks.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Components can postUpdate, that is run an update after the parent has updated. This is to be overriden by subclasses.
        * @method postUpdate
        * @public
        */
        public postUpdate(): void;
        /**
        * Destroys this component and all of the properties that exist on it.
        * @method destroy
        * @public
        */
        public destroy(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * Is a class the implements the IChild structure who's purpose is to contain multiple children/members, those of which also implement the IChild interface. The members of the Group's coordinates are also in relation to the Group that they were added to. So if you moved an entire Group, each member of that Group would also 'move'.
    *
    * @class Group
    * @namespace Kiwi
    * @constructor
    * @param state {State} The State that this Group is a part of.
    * @param [name=''] {String} The name of this group.
    * @return {Group}
    *
    */
    class Group implements Kiwi.IChild {
        constructor(state: Kiwi.State, name?: string);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        * @public
        */
        public objType(): string;
        public childType(): number;
        /**
        * A name for this Group. This is not checked for uniqueness within the Game, but is very useful for debugging.
        * @property name
        * @type string
        * @default ''
        * @public
        */
        public name: string;
        /**
        * The transform object for this group.
        * Transform handles the calculation of coordinates/rotation/scale e.t.c in the Game World.
        * @property transform
        * @type Transform
        * @public
        */
        public transform: Kiwi.Geom.Transform;
        /**
        * The parent group of this group.
        * @property _parent
        * @type Group
        * @private
        */
        private _parent;
        /**
        * Set's the parent of this entity. Note that this also sets the transforms parent of this entity to be the passed groups transform.
        * @property parent
        * @type Group
        * @public
        */
        public parent : Group;
        /**
        * The X coordinate of this group. This is just aliased to the transform property.
        * @property x
        * @type Number
        * @public
        */
        public x : number;
        /**
        * The Y coordinate of this group. This is just aliased to the transform property.
        * @property y
        * @type Number
        * @public
        */
        public y : number;
        public scaleX : number;
        public scaleY : number;
        public rotation : number;
        /**
        * The Component Manager
        * @property components
        * @type ComponentManager
        * @public
        */
        public components: Kiwi.ComponentManager;
        /**
        * The game this Group belongs to
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        /**
        * The State that this Group belongs to
        * @property state
        * @type State
        * @public
        **/
        public state: Kiwi.State;
        /**
        * A unique identifier for this Group within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type string
        * @public
        */
        public id: string;
        /**
        * The collection of children belonging to this group
        * @property members
        * @type IChild
        * @public
        */
        public members: Kiwi.IChild[];
        /**
        * Returns the total number of children in this Group. Doesn't distinguish between alive and dead children.
        * @method numChildren
        * @return {Number} The number of children in this Group
        * @public
        */
        public numChildren(): number;
        /**
        * An indication of whether or not this group is 'dirty' and thus needs to be re-rendered or not.
        * @property _dirty
        * @type boolean
        * @private
        */
        private _dirty;
        /**
        * Sets all children of the Group to be dirty.
        * @property dirty
        * @type boolean
        * @public
        */
        public dirty : boolean;
        /**
        * Checks if the given entity is in this group
        * @method contains
        * @param child {IChild} The IChild that you want to checked.
        * @return {boolean} true if entity exists in group.
        * @public
        */
        public contains(child: Kiwi.IChild): boolean;
        /**
        * Checks to see if the given IChild is contained in this group as a descendant
        * @method containsDescendant
        * @param child {IChild} The IChild that you want to check.
        * @return {boolean}
        * @public
        */
        public containsDescendant(child: Kiwi.IChild): boolean;
        /**
        * Checks to see if one child is an ansector of another child.
        * @method containsAncestor
        * @param descendant {IChild} The IChild that you are checking.
        * @param ancestor {Group} The parent (ancestor) that you are checking for.
        * @return {boolean}
        * @public
        */ 
        public containsAncestor(descendant: Kiwi.IChild, ancestor: Group): boolean;
        /**
        * Adds an Entity to this Group. The Entity must not already be in this Group.
        * @method addChild
        * @param child {IChild} The child to be added.
        * @return {IChild} The child that was added.
        * @public
        */
        public addChild(child: Kiwi.IChild): Kiwi.IChild;
        /**
        * Adds an Entity to this Group in the specific location. The Entity must not already be in this Group and it must be supported by the Group.
        * @method addChildAt
        * @param child {IChild} The child to be added.
        * @param index {Number} The index the child will be set at.
        * @return {IChild} The child.
        * @public
        */
        public addChildAt(child: Kiwi.IChild, index: number): Kiwi.IChild;
        /**
        * Adds an Entity to this Group before another child. The Entity must not already be in this Group and it must be supported by the Group.
        * @method addChildBefore
        * @param child {IChild} The child to be added.
        * @param beforeChild {Entity} The child before which the child will be added.
        * @return {IChild} The child.
        * @public
        */
        public addChildBefore(child: Kiwi.IChild, beforeChild: Kiwi.IChild): Kiwi.IChild;
        /**
        * Adds an Entity to this Group after another child. The Entity must not already be in this Group and it must be supported by the Group..
        * @method addChildAfter
        * @param child {IChild} The child to be added.
        * @param beforeChild {IChild} The child after which the child will be added.
        * @return {IChild} The child.
        * @public
        */
        public addChildAfter(child: Kiwi.IChild, beforeChild: Kiwi.IChild): Kiwi.IChild;
        /**
        * Get the child at a specific position in this Group by its index.
        * @method getChildAt
        * @param index {Number} The index of the child
        * @return {IChild} The child, if found or null if not.
        * @public
        */
        public getChildAt(index: number): Kiwi.IChild;
        /**
        * Get a child from this Group by its name.
        * @method getChildByName
        * @param name {String} The name of the child
        * @return {IChild} The child, if found or null if not.
        * @public
        */
        public getChildByName(name: string): Kiwi.IChild;
        /**
        * Get a child from this Group by its UUID.
        * @method getChildByID
        * @param id {String} The ID of the child.
        * @return {IChild} The child, if found or null if not.
        * @public
        */
        public getChildByID(id: string): Kiwi.IChild;
        /**
        * Returns the index position of the Entity or -1 if not found.
        * @method getChildIndex
        * @param child {IChild} The child.
        * @return {Number} The index of the child or -1 if not found.
        * @public
        */
        public getChildIndex(child: Kiwi.IChild): number;
        /**
        * Removes an Entity from this Group if it is a child of it.
        * @method removeChild
        * @param child {IChild} The child to be removed.
        * @param [destroy=false] {boolean} If the entity that gets removed should be destroyed as well.
        * @return {IChild} The child.
        * @public
        */
        public removeChild(child: Kiwi.IChild, destroy?: boolean): Kiwi.IChild;
        /**
        * Removes the Entity from this Group at the given position.
        * @method removeChildAt
        * @param index {Number} The index of the child to be removed.
        * @return {IChild} The child, or null.
        */
        public removeChildAt(index: number): Kiwi.IChild;
        /**
        * Removes all Entities from this Group within the given range.
        * @method removeChildren
        * @param begin {Number} The begining index.
        * @param end {Number} The last index of the range.
        * @param destroy {Number} If the children should be destroyed as well.
        * @return {Number} The number of removed entities.
        * @public
        */
        public removeChildren(begin?: number, end?: number, destroy?: boolean): number;
        /**
        * Sets a new position of an existing Entity within the Group.
        * @method setChildIndex
        * @param child {IChild} The child in this Group to change.
        * @param index {Number} The index for the child to be set at.
        * @return {boolean} true if the Entity was moved to the new position, otherwise false.
        * @public
        */
        public setChildIndex(child: Kiwi.IChild, index: number): boolean;
        /**
        * Swaps the position of two existing Entities that are a direct child of this group.
        * @method swapChildren
        * @param child1 {IChild} The first child in this Group to swap.
        * @param child2 {IChild} The second child in this Group to swap.
        * @return {boolean} true if the Entities were swapped successfully, otherwise false.
        * @public
        */
        public swapChildren(child1: Kiwi.IChild, child2: Kiwi.IChild): boolean;
        /**
        * Swaps the position of two existing Entities within the Group based on their index.
        * @method swapChildrenAt
        * @param index1 {Number} The position of the first Entity in this Group to swap.
        * @param index2 {Number} The position of the second Entity in this Group to swap.
        * @return {boolean} true if the Entities were swapped successfully, otherwise false.
        * @public
        */
        public swapChildrenAt(index1: number, index2: number): boolean;
        /**
        * Replaces a child Entity in this Group with a new one.
        * @method replaceChild
        * @param oldChild {IChild} The Entity in this Group to be removed.
        * @param newChild {IChild} The new Entity to insert into this Group at the old Entities position.
        * @return {boolean} true if the Entities were replaced successfully, otherwise false.
        * @public
        */
        public replaceChild(oldChild: Kiwi.IChild, newChild: Kiwi.IChild): boolean;
        /**
        * Loops through each member in the group and run a method on for each one.
        * @method forEach
        * @param context {any} The context that the callbacks are to have when called.
        * @param callback {any} The callback method to execute on each member.
        * @param [params]* {any} Any extra parameters.
        * @public
        */
        public forEach(context: any, callback: any, ...params: any[]): void;
        /**
        * Loop through each member of the groups that is alive.
        * @method forEachAlive
        * @param context {any} The context that the callbacks are to have when called.
        * @param callback {any} The callback method to execute on each member.
        * @param [params]* {any} Any extra parameters.
        * @public
        */
        public forEachAlive(context: any, callback: any, ...params: any[]): void;
        /**
        * Sets a property on every member. If componentName is null the property is set on the entity itself, otherwise it is set on the named component. Uses runtime string property lookups. Not optimal for large groups if speed is an issue.
        * @method setAll
        * @param componentName {string} The name of the component to set the property on - set to null to set a property on the entity.
        * @param property {string} The name of the property to set.
        * @param value {any} The value to set the property to.
        * @public
        */
        public setAll(componentName: string, property: string, value: any): void;
        /**
        * Calls a function on every member. If componentName is null the function is called on the entity itself, otherwise it is called on the named component. Uses runtime string property lookups. Not optimal for large groups if speed is an issue.
        * @method callAll
        * @param componentName {string} The name of the component to call the function on - set to null to call a function on the entity.
        * @param functionName {string} The name of the function to call.
        * @param args {Array} An array of arguments to pas to the function.
        * @public
        */
        public callAll(componentName: string, functionName: string, args?: any[]): void;
        /**
        * The update loop for this group.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property exists
        * @type boolean
        * @private
        */
        private _exists;
        /**
        * Toggles the exitence of this Group. An Entity that no longer exists can be garbage collected or re-allocated in a pool
        * This method should be over-ridden to handle specific canvas/webgl implementations.
        * @property exists
        * @type boolean
        * @public
        */
        public exists : boolean;
        /**
        * An active Entity is one that has its update method called by its parent.
        * @property _active
        * @type boolean
        * @default true
        * @private
        */
        private _active;
        /**
        * Toggles the active state of this Entity. An Entity that is active has its update method called by its parent.
        * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
        * @property active
        * @type boolean
        * @default true
        * @public
        */
        public active : boolean;
        /**
        * The render method that is required by the IChild.
        * This method never gets called as the render is only worried about rendering entities.
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera): void;
        /**
        * Removes the first Entity from this Group marked as 'alive'
        * @method removeFirstAlive
        * @param [destroy=false] {boolean} If the entity should run the destroy method when it is removed.
        * @return {IChild} The Entity that was removed from this Group if alive, otherwise null
        * @public
        */
        public removeFirstAlive(destroy?: boolean): Kiwi.IChild;
        /**
        * Returns the first Entity from this Group marked as 'alive' or null if no members are alive
        * @method getFirstAlive
        * @return {IChild}
        * @public
        */
        public getFirstAlive(): Kiwi.IChild;
        /**
        * Returns the first member of the Group which is not 'alive', returns null if all members are alive.
        * @method getFirstDead
        * @return {IChild}
        * @public
        */
        public getFirstDead(): Kiwi.IChild;
        /**
        * Returns the number of member which are marked as 'alive'
        * @method countLiving
        * @return {Number}
        * @public
        */
        public countLiving(): number;
        /**
        * Returns the number of member which are not marked as 'alive'
        * @method countDead
        * @return {Number}
        * @public
        */
        public countDead(): number;
        /**
        * Returns a member at random from the group.
        * @param {Number}	StartIndex	Optional offset off the front of the array. Default value is 0, or the beginning of the array.
        * @param {Number}	Length		Optional restriction on the number of values you want to randomly select from.
        * @return {IChild}	A child from the members list.
        * @public
        */
        public getRandom(start?: number, length?: number): Kiwi.IChild;
        /**
        * Clear all children from this Group
        * @method clear
        * @public
        */
        public clear(): void;
        /**
        * Controls whether render is automatically called by the parent.
        * @property _willRender
        * @type Boolean
        * @private
        */
        private _willRender;
        /**
        * Controls whether render is automatically caleld by the parent.
        * @property willRender
        * @type boolean
        * @return {boolean}
        * @public
        */
        public willRender : boolean;
        /**
        * Removes all children and destroys the Group.
        * @method destroy
        * @param [immediate=false] {boolean} If the object should be immediately removed or if it should be removed at the end of the next update loop.
        * @param [destroyChildren=true] {boolean} If all of the children on the group should also have their destroy methods called.
        * @public
        */
        public destroy(immediate?: boolean, destroyChildren?: boolean): void;
        /**
        * A temporary property that holds a boolean indicating whether or not the group's children should be destroyed or not.
        * @property _destroyRemoveChildren
        * @type boolean
        * @private
        */
        private _tempRemoveChildren;
    }
}
/**
*
* @module Kiwi
*
*/ 
declare module Kiwi {
    /**
    *
    *
    * @class State
    * @namespace Kiwi
    * @extends Group
    * @constructor
    * @param name {String}
    * @return {State}
    */ 
    class State extends Kiwi.Group {
        constructor(name: string);
        /**
        * Returns the type of object this state is.
        * @method objType
        * @return String
        * @public
        */
        public objType(): string;
        /**
        * Returns the type of child this is.
        * @method childType
        * @return Number
        * @public
        */
        public childType(): number;
        /**
        * The configuration object for this State
        * @property config
        * @type StateConfig
        * @public
        */
        public config: Kiwi.StateConfig;
        /**
        * A reference to the Kiwi.Game that this State belongs to
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        /**
        * The library that this state use's for the loading of textures.
        * @property textureLibrary
        * @type TextureLibrary
        * @public
        */
        public textureLibrary: Kiwi.Textures.TextureLibrary;
        /**
        * The library that this state use's for the loading of audio.
        * @property audioLibrary
        * @type AudioLibrary
        * @public
        */
        public audioLibrary: Kiwi.Sound.AudioLibrary;
        /**
        * The library that this state use's for the loading of data.
        * @property dataLibrary
        * @type DataLibrary
        * @public
        */
        public dataLibrary: Kiwi.Files.DataLibrary;
        /**
        * Holds all of the textures that are avaiable to be accessed once this state has been loaded.
        * E.g. If you loaded a image and named it 'flower', once everything has loaded you can then access the flower image by saying this.textures.flower
        * @property textures
        * @type Object
        * @public
        */
        public textures: any;
        /**
        * Holds all of the audio that are avaiable to be accessed once this state has been loaded.
        * E.g. If you loaded a piece of audio and named it 'lazerz', once everything has loaded you can then access the lazers (pew pew) by saying this.audio.lazerz
        * @property audio
        * @type Object
        * @public
        */
        public audio: any;
        /**
        * Holds all of the data that are avaiable to be accessed once this state has been loaded.
        * E.g. If you loaded a piece of data and named it 'cookieLocation', once everything has loaded you can then access the cookies by saying this.data.cookieLocation
        * @property data
        * @type Object
        * @public
        */
        public data: any;
        /**
        * Is executed when this state is about to be switched too. Just before the preload method.
        * ONLY occurs on games targetting browsers.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Currently unused.
        * @method setType
        * @param {Number} value
        * @public
        */
        public setType(value: number): void;
        /**
        * Gets executed when the state has been initalised and gets switched to for the first time.
        * This method only ever gets called once and it is before the preload method.
        * @method init
        * @param[values] * {Any }
        * @public
        */
        public init(...paramsArr: any[]): void;
        /**
        * This method is where you would load of all the assets that are requried for this state or in the entire game.
        * @method preload
        * @public
        */
        public preload(): void;
        /**
        * This method is progressively called whilst loading a file.
        * This can be used to create a 'progress' bar for each file.
        * @method loadProgress
        * @param {Number} percent
        * @param {Number} bytesLoaded
        * @param {Kiwi.Files} file
        * @public
        */
        public loadProgress(percent: number, bytesLoaded: number, file: Kiwi.Files.File): void;
        /**
        * Gets executed when the game is finished loading and it is about to 'create' the state.
        * @method loadComplete
        * @public
        */
        public loadComplete(): void;
        /**
        * The game loop that gets executed while the game is loading.
        * @method loadUpdate
        * @public
        */
        public loadUpdate(): void;
        /**
        * Is executed once all of the assets have loaded and the game is ready to be 'created'.
        * @method create
        * @param [values]* {Any}
        * @public
        */
        public create(...paramsArr: any[]): void;
        /**
        * Is called every frame before the update loop. When overriding make sure you include a super call.
        * @method preUpdate
        * @public
        */
        public preUpdate(): void;
        /**
        * The update loop that is executed every frame while the game is 'playing'. When overriding make sure you include a super call too.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * The post update loop is executed every frame after the update method.
        * When overriding make sure you include a super call at the end of the method.
        * @method postUpdate
        * @public
        */
        public postUpdate(): void;
        /**
        * Called after all of the layers have rendered themselves, useful for debugging
        * @method postRender
        * @public
        */
        public postRender(): void;
        /**
        * Called just before this State is going to be Shut Down and another one is going to be switched too.
        * @method shutDown
        * @public
        */
        public shutDown(): void;
        /**
        * Adds a new image file that is be loaded when the state gets up to the loading all of the assets.
        *
        * @method addImage
        * @param key {String} A key for this image so that you can access it when the loading has finished.
        * @param url {String} The location of the image.
        * @param [storeAsGlobal=true] {boolean} If the image should be deleted when switching to another state or if the other states should still be able to access this image.
        * @param [width] {Number} The width of the image. If not passed the width will be automatically calculated.
        * @param [height] {Number} The height of the image. If not passed the height will be automatically calculated.
        * @param [offsetX] {Number} The offset of the image when rendering on the x axis.
        * @param [offsetY] {Number} The offset of the image when rendering on the y axis.
        * @public
        */
        public addImage(key: string, url: string, storeAsGlobal?: boolean, width?: number, height?: number, offsetX?: number, offsetY?: number): void;
        /**
        * Adds a new spritesheet image file that is be loaded when the state gets up to the loading all of the assets.
        *
        * @method addSpriteSheet
        * @param key {String} A key for this image so that you can access it when the loading has finished.
        * @param url {String} The location of the image.
        * @param frameWidth {Number} The width of a single frame in the spritesheet
        * @param frameHeight {Number} The height of a single frame in the spritesheet
        * @param [storeAsGlobal=true] {boolean} If the image should be deleted when switching to another state or if the other states should still be able to access this image.
        * @param [numCells] {Number} The number of cells/frames that are in the spritesheet. If not specified will calculate this based of the width/height of the image.
        * @param [rows] {Number} The number of cells that are in a row. If not specified will calculate this based of the width/height of the image.
        * @param [cols] {Number} The number of cells that are in a column. If not specified will calculate this based of the width/height of the image.
        * @param [sheetOffsetX=0] {Number} The offset of the whole spritesheet on the x axis.
        * @param [sheetOffsetY=0] {Number} The offset of the whole spritesheet on the y axis.
        * @param [cellOffsetX=0] {Number} The spacing between cells on the x axis.
        * @param [cellOffsetY=0] {Number} The spacing between cells on the y axis.
        * @public
        */
        public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, storeAsGlobal?: boolean, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number): void;
        /**
        * Adds a new texture atlas that is to be loaded when the states gets up to the stage of loading the assets.
        *
        * @method addTextureAtlas
        * @param key {String} A key for this image so that you can access it when the loading has finished.
        * @param imageURL {String} The location of the image.
        * @param [jsonID] {String} The id for the json file that is to be loaded. So that you can access it outside of the texture atlas.
        * @param [jsonURL] {String} The location of the json file you have loaded.
        * @param [storeAsGlobal=true] {boolean} If the image should be delete when switching to another state or if the other states should still be able to access this image.
        * @public
        */
        public addTextureAtlas(key: string, imageURL: string, jsonID?: string, jsonURL?: string, storeAsGlobal?: boolean): void;
        /**
        * Adds a json file that is to be loaded when the state gets up to the stage of loading the assets.
        *
        * @method addJSON
        * @param key {string} A key for this json so that you can access it when the loading has finished
        * @param url {string} The location of the JSON file.
        * @param [storeAsGlobal=true] {boolean} If the json should be deleted when switching to another state or if the other states should still be able to access this json.
        * @public
        */
        public addJSON(key: string, url: string, storeAsGlobal?: boolean): void;
        /**
        * Adds a new audio file that is to be loaded when the state gets up to the stage of loading the assets.
        *
        * @method addAudio
        * @param key {string} A key for this audio so that you can access it when the loading has finished
        * @param url {string} The location of the audio file.
        * @param [storeAsGlobal=true] {boolean} If the audio should be deleted when switching to another state or if the other states should still be able to access this audio.
        */
        public addAudio(key: string, url: string, storeAsGlobal?: boolean): void;
        /**
        * Contains a reference to all of the IChilds that have ever been created for this state.
        * Useful for keeping track of sprites that are not used any more and need to be destroyed.
        * @property trackingList
        * @type IChild[]
        * @private
        */
        private _trackingList;
        /**
        * Adds a new IChild to the tracking list. This is an INTERNAL Kiwi method and DEVS shouldn't really need to worry about it.
        * @method addToTrackingList
        * @param {IChild} child
        * @public
        */
        public addToTrackingList(child: Kiwi.IChild): void;
        /**
        * Removes a IChild from the tracking list. This should only need to happen when a child is being destroyed.
        * This is an INTERNAL Kiwi method and DEVS shouldn't really need to worry about it.
        * @method removeFromTrackingList
        * @param {IChild} child
        * @public
        */
        public removeFromTrackingList(child: Kiwi.IChild): void;
        /**
        * Destroys all of IChilds that are not currently on stage. All IChilds that currently don't have this STATE as an ancestor.
        * Returns the number of IChilds removed.
        * @method destroyUnused
        * @return {Number}
        * @public
        */
        public destroyUnused(): number;
        /**
        * Destroys all of the IChild's on the start.
        * @method destroy
        * @param [deleteAll=true] If all of the IChild's ever created should have the destroy method executed also.
        * @public
        */
        public destroy(deleteAll?: boolean): void;
        /**
        * Recursively goes through a child given and runs the destroy method on all that are passed.
        * @method _destroyChildren
        * @param {IChild} child
        * @private
        */
        private _destroyChildren(child);
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * A Camera is used to render a particular section of the game world on the stage. Each Camera has a coordinates which are held in the transform property, and a width/height. Note: This class should never be directly instantiated but instead should be made through a CameraManager's 'create' method.
    *
    * @class Camera
    * @namespace Kiwi
    * @constructor
    * @param game {Game} The game that this camera belongs to.
    * @param id {Number} A unique ID for this camera
    * @param name {String} The name this camera goes by
    * @param x {Number} The x coordinate of the camera
    * @param y {Number} The y coordinate of the camera
    * @param width {Number} The width of the camera
    * @param height {Number} The cameras height
    * @return {Camera}
    *
    */
    class Camera {
        constructor(game: Kiwi.Game, id: number, name: string, x: number, y: number, width: number, height: number);
        /**
        * The width of this camara.
        * @property width
        * @type Number
        * @public
        */
        public width: number;
        /**
        * The height of this camera.
        * @property height
        * @type Number
        * @public
        */
        public height: number;
        /**
        * The type of Object this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * If true then the camera will be resized to fit the stage when the stage is resized
        * @property fitToStage
        * @type boolean
        * @default true
        * @public
        */
        public fitToStage: boolean;
        /**
        * The Transform controls the location of this Game Object within the game world. Also controls the cameras scale and rotation.
        * @property transform
        * @type Transform
        * @public
        */
        public transform: Kiwi.Geom.Transform;
        /**
        * Updates the width/height of this camera. Is used when the stage resizes.
        * @method _updatedStageSize
        * @param width {Number} The new width of the camera.
        * @param height {Number} The new height of the camera.
        * @private
        */
        private _updatedStageSize(width, height);
        /**
        * The game this Group belongs to
        * @property game
        * @type Game
        * @public
        */
        public _game: Kiwi.Game;
        /**
        * A unique identifier for this Layer within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type number
        * @public
        */
        public id: number;
        /**
        * A name for this Camera. This is not checked for uniqueness within the Game, but is very useful for debugging.
        * @property name
        * @type string
        * @public
        */
        public name: string;
        /**
        * Actually controls whether this Camera is rendered
        * @property _visible
        * @type boolean
        * @private
        */
        private _visible;
        /**
        * Controls whether this Camera is rendered.
        * @property visible
        * @type boolean
        * @public
        */
        public visible : boolean;
        /**
        * A flag that indicates whether this camera needs to be rendered again at the next update loop, or if it nothing has changed so it doesn't.
        * @property _dirty
        * @type boolean
        * @private
        */
        private _dirty;
        /**
        * A value used by components to control if the camera needs re-rendering.
        * @property dirty
        * @type boolean
        * @public
        */
        public dirty : boolean;
        /**
        * The update loop that is executed every frame.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * The render loop that is executed whilst the game is playing.
        * @method render
        * @public
        */
        public render(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * A TypeScript conversion of JS Signals by Miller Medeiros.
    * Released under the MIT license
    * http://millermedeiros.github.com/js-signals/
    *
    * @class Signal
    * @namespace Kiwi
    *
    * @author Miller Medeiros, JS Signals
    */
    class Signal {
        /**
        * A list of all of the signal bindings that are on this signal.
        * @property _bindings
        * @type SignalBinding[]
        * @default []
        * @private
        */
        private _bindings;
        /**
        *
        * @property _prevParams
        * @type Any
        * @default null
        * @private
        */
        private _prevParams;
        /**
        * Signals Version Number
        * @property VERSION
        * @type String
        * @final
        * @static
        * @public
        */
        static VERSION: string;
        /**
        * If Signal should keep record of previously dispatched parameters and
        * automatically execute listener during `add()`/`addOnce()` if Signal was
        * already dispatched before.
        * @property memorize
        * @type boolean
        * @default false
        * @public
        */
        public memorize: boolean;
        /**
        * [REQUIRES DESCRIPTION]
        * @type boolean
        * @default true
        * @private
        */
        private _shouldPropagate;
        /**
        * If Signal is active and should broadcast events.
        * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
        * @property active
        * @type boolean
        * @default true
        * @public
        */
        public active: boolean;
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        * @public
        */
        public objType(): string;
        /**
        * Validates a event listener an is used to check to see if it is valid or not.
        * @method validateListener
        * @param listener {Any}
        * @param fnName {Any}
        */
        public validateListener(listener: any, fnName: any): void;
        /**
        * [REQUIRES DESCRIPTION]
        * @param listener {Function}
        * @param isOnce {boolean}
        * @param listenerContext {Object}
        * @param priority {Number}
        * @return {SignalBinding}
        * @private
        */
        private _registerListener(listener, isOnce, listenerContext, priority);
        /**
        *
        * @method _addBinding
        * @param binding {SignalBinding}
        * @private
        */
        private _addBinding(binding);
        /**
        * [REQUIRES DESCRIPTION]
        * @method _indexOfListener
        * @param listener {Function}
        * @param context {any}
        * @return {number}
        * @private
        */
        private _indexOfListener(listener, context);
        /**
        * Check if listener was attached to Signal.
        * @param listener {Function}
        * @param [context=null] {Any}
        * @return {boolean} if Signal has the specified listener.
        * @public
        */
        public has(listener: any, context?: any): boolean;
        /**
        * Add a listener to the signal.
        * @param listener {Function} Signal handler function.
        * @param [listenerContext=null] {Any} Context on which listener will be executed (object that should represent the `this` variable inside listener function).
        * @param [priority=0] {Number} The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
        * @return {SignalBinding} An Object representing the binding between the Signal and listener.
        * @public
        */
        public add(listener: any, listenerContext?: any, priority?: number): Kiwi.SignalBinding;
        /**
        * Add listener to the signal that should be removed after first execution (will be executed only once).
        * @param listener {Function} Signal handler function.
        * @param [listenerContext=null] {Any} Context on which listener will be executed (object that should represent the `this` variable inside listener function).
        * @param [priority=0] {Number} The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
        * @return {SignalBinding} An Object representing the binding between the Signal and listener.
        * @public
        */
        public addOnce(listener: any, listenerContext?: any, priority?: number): Kiwi.SignalBinding;
        /**
        * Remove a single listener from the dispatch queue.
        * @param listener {Function} Handler function that should be removed.
        * @param [context=null] {Any} Execution context (since you can add the same handler multiple times if executing in a different context).
        * @return {Function} Listener handler function.
        * @public
        */
        public remove(listener: any, context?: any): any;
        /**
        * Remove all listeners from the Signal.
        * @method removeAll
        * @public
        */
        public removeAll(): void;
        /**
        * [REQUIRES DESCRIPTION]
        * @method getNumListeners
        * @return {number} Number of listeners attached to the Signal.
        * @public
        */
        public getNumListeners(): number;
        /**
        * [REQUIRES DESCRIPTION]
        * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
        * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
        * @see Signal.prototype.disable
        * @method halt
        * @public
        */
        public halt(): void;
        /**
        * Dispatch/Broadcast Signal to all listeners added to the queue.
        * @method dispatch
        * @param [params]* {any} Parameters that should be passed to each handler.
        * @public
        */
        public dispatch(...paramsArr: any[]): void;
        /**
        * [REQUIRES DESCRIPTION]
        * Forget memorized arguments. See Signal.memorize
        * @method forget
        * @public
        */
        public forget(): void;
        /**
        * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
        * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
        * @method dispose
        * @public
        */
        public dispose(): void;
        /**
        * @method toString
        * @return {string} String representation of the object.
        * @public
        */
        public toString(): string;
    }
}
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * An object that represents a binding between a Signal and a listener function.
    * Released under the MIT license
    * http://millermedeiros.github.com/js-signals/
    *
    * @class SignalBinding
    * @namespace Kiwi
    *
    * @author Miller Medeiros, JS Signals
    * @constructor
    * @internal
    * @name SignalBinding
    * @param {Signal} signal Reference to Signal object that listener is currently bound to.
    * @param {Function} listener Handler function bound to the signal.
    * @param {boolean} isOnce If binding should be executed just once.
    * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
    * @param {Number} [priority=0] The priority level of the event listener. (default = 0).
    *
    */
    class SignalBinding {
        /**
        * Object that represents a binding between a Signal and a listener function.
        * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
        * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
        * @author Miller Medeiros
        
        */
        constructor(signal: Kiwi.Signal, listener: any, isOnce: boolean, listenerContext: any, priority?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return String
        * @public
        */
        public objType(): string;
        /**
        * Handler function bound to the signal.
        * @property _listener
        * @type Function
        * @private
        */
        private _listener;
        /**
        * If binding should be executed just once.
        * @property _isOnce
        * @type boolean
        * @private
        */
        private _isOnce;
        /**
        * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
        * @property context
        * @type any
        * @public
        */
        public context: any;
        /**
        * Reference to Signal object that listener is currently bound to.
        * @property _signal
        * @type Signal
        * @private
        */
        private _signal;
        /**
        * Listener priority
        * @property priority
        * @type Number
        * @public
        */
        public priority: number;
        /**
        * If binding is active and should be executed.
        * @property active
        * @type boolean
        * @default true
        * @public
        */
        public active: boolean;
        /**
        * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
        * @property params
        * @type Any
        * @default null
        * @public
        */
        public params: any;
        /**
        * Call listener passing arbitrary parameters.
        * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
        * @method execute
        * @param {Array} [paramsArr]* Array of parameters that should be passed to the listener
        * @return {*} Value returned by the listener.
        * @public
        */
        public execute(paramsArr?: any[]): any;
        /**
        * Detach binding from signal.
        * - alias to: mySignal.remove(myBinding.getListener());
        * @method detach
        * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
        * @public
        */
        public detach(): any;
        /**
        * @method isBound
        * @return {boolean} `true` if binding is still bound to the signal and have a listener.
        * @public
        */
        public isBound(): boolean;
        /**
        * @method isOnce
        * @return {boolean} If SignalBinding will only be executed once.
        * @public
        */
        public isOnce(): boolean;
        /**
        * @method getListener
        * @return {Function} Handler function bound to the signal.
        * @public
        */
        public getListener(): any;
        /**
        * @method getSignal
        * @return {Signal} Signal that listener is currently bound to.
        * @public
        */
        public getSignal(): Kiwi.Signal;
        /**
        * Delete instance properties
        * @method _destory
        * @public
        */
        public _destroy(): void;
        /**
        * @method toString
        * @return {string} String representation of the object.
        * @public
        */
        public toString(): string;
    }
}
/**
* The GameObject namespace holds classes which are designed to be added to a State (either directly, or as an ancestor of a Group) and are the Objects that are used when wanting to render anything visual onto the current State. Each GameObject is a representation of a particular item in a game and as such has information that corresponds to that item (like where they are in the 'GameWorld', the scale of the GameObject, who their parent is, e.t.c). For Example: If you wanted to have a massive background image then you can use the StaticImage GameObject, as that is a relatively light-weight object). Or if you had Player with an Animation, which user's could interactive with, then you would use a Sprite, which is more robust.
*
* @module Kiwi
* @submodule GameObjects
* @main GameObjects
*/ 
declare module Kiwi.GameObjects {
    /**
    * A Sprite is a general purpose GameObject that contains majority of the functionality that is needed/would be wanted and as such should be used only when you are wanting a GameObject with a lot of interaction. When creating a Sprite you pass to it as TextureAtlas (for the image you want to render), now if that Texture Atlas isn't a SINGLE_IMAGE then the Sprite will have an AnimationManager Component to handle any SpriteSheet animations you need.
    *
    * @class Sprite
    * @namespace Kiwi.GameObjects
    * @extends Entity
    * @constructor
    * @param state {State} The state that this sprite belongs to
    * @param atlas {TextureAtlas} The texture you want to apply to this entity
    * @param [x=0] {Number} The sprites initial coordinates on the x axis.
    * @param [y=0] {Number} The sprites initial coordinates on the y axis.
    * @param [enableInput=false] {boolean} If the input component should be enabled or not.
    * @return {Sprite}
    */
    class Sprite extends Kiwi.Entity {
        constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x?: number, y?: number, enableInput?: boolean);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * Indicates whether or not this sprite is animated or not.
        * This sprite will not be animated if the texture used is a SINGLE_IMAGE.
        * @property _isAnimated
        * @type boolean
        * @private
        */
        private _isAnimated;
        /**
        * The animation component that allows you to create a animation with spritesheets/texture atlas's.
        * Note: If the atlas that was added is of type Kiwi.Textures.TextureAtlas.SINGLE_IMAGE then no animation component will be created.
        * @property animation
        * @type AnimationManager
        * @public
        */
        public animation: Kiwi.Components.AnimationManager;
        /**
        * The box component that controls the bounding box around this Game Object
        * @property bounds
        * @type Bounds
        * @public
        */
        public box: Kiwi.Components.Box;
        /**
        * The Input component controls the user interaction with this Game Object
        * @property input
        * @type Input
        * @public
        */
        public input: Kiwi.Components.Input;
        /**
        * Called by parent when its update loop gets executed.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Called by the Layer to which this Game Object is attached
        * @method render
        * @param {Camera} camera
        * @public
        */
        public render(camera: Kiwi.Camera): void;
        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
    }
}
/**
*
* @module Kiwi
* @submodule GameObjects
*
*/ 
declare module Kiwi.GameObjects {
    /**
    * A light weight game object for displaying static images that would have little or no interaction with other GameObjects. An Example of this would be a background image. Note: Since a StaticImage is lightweight it doesn't have any AnimationManager to handle the switching of cells (If you were using a SpriteSheet/TextureAtlas). In order to switch cells you can change the value of the cellIndex property.
    *
    * @class StaticImage
    * @namespace Kiwi.GameObjects
    * @extends Entity
    * @constructor
    * @param state {State} The state that this static image belongs to
    * @param atlas {TextureAtlas} The texture atlas to use as the image.
    * @param [x=0] {Number} Its coordinates on the x axis
    * @param [y=0] {Number} The coordinates on the y axis
    * @return {StaticImage}
    */
    class StaticImage extends Kiwi.Entity {
        constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x?: number, y?: number);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * The Bounds component that controls the bounding box around this Game Object
        * @property bounds
        * @type Bounds
        * @public
        */
        public box: Kiwi.Components.Box;
        /**
        * Called by the Layer to which this Game Object is attached
        * @method render
        * @param {Camara} camera
        * @public
        */
        public render(camera: Kiwi.Camera): void;
        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
    }
}
/**
* Kiwi - GameObjects
* @module Kiwi
* @submodule GameObjects
*
*/ 
declare module Kiwi.GameObjects {
    /**
    * Textfield is a GameObject that is used when you are wanting to render text onto the current State. The Textfield is not designed to have any interaction with other GameObjects and as such it does not have many (if any) components or even a width/height.
    *
    * @class Textfield
    * @namespace Kiwi.GameObjects
    * @extends Entity
    * @constructor
    * @param state {State} The state that this Textfield belongs to
    * @param text {String} The text that is contained within this textfield.
    * @param [x=0] {Number} The new x coordinate from the Position component
    * @param [y=0] {Number} The new y coordinate from the Position component
    * @param [color='#000000'] {String} The color of the text.
    * @param [size=32] {Number} The size of the text in pixels.
    * @param [weight='normal'] {String} The weight of the text.
    * @param [fontFamily='sans-serif'] {String} The font family that is to be used when rendering.
    * @return {Textfield} This Game Object.
    */
    class Textfield extends Kiwi.Entity {
        constructor(state: Kiwi.State, text: string, x?: number, y?: number, color?: string, size?: number, weight?: string, fontFamily?: string);
        /**
        * Returns the type of object that this is
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * The text that is to be rendered.
        * @property _text
        * @type string
        * @private
        */
        private _text;
        /**
        * The weight of the font.
        * @property _fontWeight
        * @type string
        * @default 'normal'
        * @private
        */
        private _fontWeight;
        /**
        * The size of the font.
        * @property _fontSize
        * @type number
        * @default 32
        * @private
        */
        private _fontSize;
        /**
        * The color of the text.
        * @property _fontColor
        * @type string
        * @default '#000000'
        * @private
        */
        private _fontColor;
        /**
        * The font family that is to be rendered.
        * @property _fontFamily
        * @type string
        * @default 'sans-serif'
        * @private
        */
        private _fontFamily;
        /**
        * The alignment of the text. This can either be 'left', 'right' or 'center'
        * @property _textAlign
        * @type string
        * @default 'center'
        * @private
        */
        private _textAlign;
        /**
        * The baseline of the text to be rendered.
        * @property _baseline
        * @type string
        * @private
        */
        private _baseline;
        /**
        * The text that you would like to appear in this textfield.
        * @property text
        * @type string
        * @public
        */
        public text : string;
        /**
        * The color of the font that is contained in this textfield.
        * @property color
        * @type string
        * @public
        */
        public color : string;
        /**
        * The weight of the font.
        * @property fontWeight
        * @type string
        * @public
        */
        public fontWeight : string;
        /**
        * The size on font when being displayed onscreen.
        * @property fontSize
        * @type number
        * @public
        */
        public fontSize : number;
        /**
        * The font family that is being used to render the text.
        * @property fontFamily
        * @type string
        * @public
        */
        public fontFamily : string;
        /**
        * A static property that contains the string to center align the text.
        * @property TEXT_ALIGN_CENTER
        * @type string
        * @static
        * @final
        * @public
        */
        static TEXT_ALIGN_CENTER: string;
        /**
        * A static property that contains the string to right align the text.
        * @property TEXT_ALIGN_RIGHT
        * @type string
        * @static
        * @final
        * @public
        */
        static TEXT_ALIGN_RIGHT: string;
        /**
        * A static property that contains the string to left align the text.
        * @property TEXT_ALIGN_LEFT
        * @type string
        * @static
        * @final
        * @public
        */
        static TEXT_ALIGN_LEFT: string;
        /**
        * Returns a string containing the text alignment for this textfield.
        * @type string
        * @public
        */
        /**
        * Changes the alignment of the text. You can either use the static TEXT_ALIGN constants or pass a string.
        * @type string
        * @public
        */
        public textAlign : string;
        /**
        * The canvas element which the text is rendered onto.
        * @property _canvas
        * @type HTMLCanvasElement.
        * @private
        */
        private _canvas;
        /**
        * The context for the canvas element. Used whilst rendering text.
        * @property _ctx
        * @type CanvasRenderingContext2D
        * @private
        */
        private _ctx;
        /**
        * If the temporary canvas is dirty and needs to be re-rendered. Only used when the text field rendering is being optimised.
        * @property _tempDirty
        * @type boolean
        */
        private _tempDirty;
        /**
        * This method is used to render the text to an offscreen-canvas which is held in a TextureAtlas (which is generated upon the instanitation of this class).
        * This is so that the canvas doesn't render it every frame as it can be costly and so that it can be used in WebGL with the TextureAtlasRenderer.
        *
        * @method _renderText
        * @private
        */
        private _renderText();
        /**
        * Called by the Layer to which this Game Object is attached
        * @method render
        * @param {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera): void;
        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
    }
}
/**
*
* @module GameObjects
* @submodule Tilemap
*
*/
declare module Kiwi.GameObjects.Tilemap {
    /**
    * Define's the properties of a single Type of Tile for a TileMap. This class should not be directly instanted,
    * but instead when wanting to create new TileType's you should use the 'createdTileType' methods on a TileMap object.
    *
    * @class TileType
    * @namespace Kiwi.GameObjects.Tilemap
    * @constructor
    * @param tilemap {TileMap} The TileMap that this TileType is a part of.
    * @param index {Number} The index of this TileType, which Tiles use when wanting to use this TileType.
    * @param cellIndex {Number} The cell number to use when rendering this Type of Tile.
    * @return {TileType} This TileType
    * @public
    */
    class TileType {
        constructor(tilemap: Tilemap.TileMap, index: number, cellIndex?: number);
        /**
        * The collision information for this type of tile.
        * It's values are the same as the Static properties inside of the ArcadePhysics Component.
        * @property allowCollisions
        * @type number
        * @default NONE
        * @public
        */
        public allowCollisions: number;
        /**
        * The properties associated with this type of tile.
        * These are set when loading a JSON file that had properties associated with a TileType.
        * @property properties
        * @type Object
        * @public
        */
        public properties: any;
        /**
        * the offset of this tile
        */ 
        public offset: any;
        /**
        * A reference to the tilemap this tile object belongs to.
        * @property tilemap
        * @type TileMap
        * @public
        */
        public tilemap: Tilemap.TileMap;
        /**
        * The index of this tile type in the core map data.
        * For example, if your map only has 16 different types of tiles in it, this will be one of those tiles and thus a number between 1 and 16.
        * @property index
        * @type number
        * @public
        */
        public index: number;
        /**
        * A number relating to the cell that should be when rendering a Tile that uses this TileType.
        * A cellIndex of -1 means this type of tile will not be rendered.
        * @property cellIndex
        * @type number
        * @public
        */
        public cellIndex: number;
        /**
        * The type of object that it is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
    }
}
/**
*
* @module GameObjects
* @submodule Tilemap
* @main Tilemap
*/
declare module Kiwi.GameObjects.Tilemap {
    /**
    * A TileMap handles the creation of TileMapLayers and the TileTypes that they use.
    * Since a TileMap isn't a Entity itself you cannot add it to the Stage inorder to render that it manages,
    * Instead you have to add each layer lies within it. This way you can have other GameObjects behind/in-front of layers.
    *
    * @class TileMap
    * @namespace Kiwi.GameObjects.Tilemap
    * @constructor
    * @param state {State} The state that this Tilemap is on.
    * @param [tileMapDataKey] {String} The Data key for the JSON you would like to use.
    * @param [atlas] {TextureAtlas} The texture atlas that you would like the tilemap layers to use.
    * @param [startingCell=0] {number} The number for the initial cell that the first TileType should use. See 'createFromFileStore' for more information.
    * @return {TileMap}
    */
    class TileMap {
        constructor(state: Kiwi.State, tileMapData?: any, atlas?: Kiwi.Textures.TextureAtlas, startingCell?: number);
        /**
        * The orientation of the tilemap. Currently this has not effect on the map.
        * @property orientation
        * @type String
        * @public
        */
        public orientation: string;
        /**
        * Is an Array containing all of the TileTypes that are available on the TileMap.
        * @property tileType
        * @type TileType[]
        * @public
        */
        public tileTypes: Tilemap.TileType[];
        /**
        * A list of all of the TileMapLayers that exist on thie TileMap.
        * @property layers
        * @type TileMapLayer
        * @public
        */
        public layers: Tilemap.TileMapLayer[];
        /**
        * The state that this TileMap exists on.
        * @property state
        * @type State
        * @public
        */
        public state: Kiwi.State;
        /**
        * The game that this TileMap is a part of.
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        /**
        * The default width of a single tile that a TileMapLayer is told to have upon its creation.
        * @property tileWidth
        * @type Number
        * @default 0
        * @public
        */
        public tileWidth: number;
        /**
        * The default height of a single tile that a TileMapLayer is told to have upon its creation.
        * @property tileHeight
        * @type Number
        * @default 0
        * @public
        */
        public tileHeight: number;
        /**
        * The default width of all TileMapLayers when they are created.
        * This value is in Tiles.
        * @property width
        * @type Number
        * @default 0
        * @public
        */
        public width: number;
        /**
        * The default height of all TileMapLayers when they are created.
        * This value is in Tiles.
        * @property height
        * @type Number
        * @default 0
        * @public
        */
        public height: number;
        /**
        * The width of the tilemap in pixels. This value is READ ONLY.
        * @property widthInPixels
        * @type Number
        * @public
        */
        public widthInPixels : number;
        /**
        * The height of the tilemap in pixels. This value is READ ONLY.
        * @property heightInPixels
        * @type Number
        * @public
        */
        public heightInPixels : number;
        /**
        * Any properties that were found in the JSON during creation.
        * @property properties
        * @type Object
        * @public
        */
        public properties: any;
        /**
        * Creates new tilemap layers from a JSON file that you pass (has to be in the Tiled Format).
        * The texture atlas you pass is that one that eeach TileMapLayer found in the JSON will use, You can change the TextureAtlas afterwards.
        * New TileTypes will automatically be created. The number is based on the Tileset parameter of the JSON.
        * The cell used for new TileTypes will begin at 0 and increment each time a new TileType is created (and a cell exists). Otherwise new TileTypes will start will a cell of -1 (none).
        * @method createFromFileStore
        * @param tileMapData {Any} This can either
        * @param atlas {TextureAtlas} The texture atlas that you would like the tilemap layers to use.
        * @param [startingCell=0] {number} The number for the initial cell that the first TileType should use. If you pass -1 then no new TileTypes will be created.
        * @public
        */
        public createFromFileStore(tileMapData: any, atlas: Kiwi.Textures.TextureAtlas, startingCell?: number): boolean;
        /**
        * Generates new TileTypes based upon the Tileset information that lies inside the Tiled JSON.
        * This is an INTERNAL method, which is used when the createFromFileStore method is executed.
        * @method _generateTypesFromTileset
        * @param tilesetData {Any[]} The tileset part of the JSON.
        * @param atlas {TextureAtlas} The Texture atlas which contains the cells that the new TileTypes will use.
        * @param startingCell {Number} The first cell number that would be used.
        * @private
        */
        private _generateTypesFromTileset(tilesetData, atlas, startingCell);
        /**
        * Method to set the default TileMap properties. Useful when wanting to create tilemaps programmatically.
        * @method setTo
        * @param tileWidth {Number} The width of a single tile.
        * @param tileHeight {Number} The height of a single tile.
        * @param width {Number} The width of the whole map.
        * @param height {Number} The height of the whole map.
        * @public
        */
        public setTo(tileWidth: number, tileHeight: number, width: number, height: number): void;
        /**
        *-----------------------
        * Creation of Tile Types
        *-----------------------
        **/
        /**
        * Generates a single new TileType. Returns the TileType that was generated.
        * @method createTileType
        * @param [cell=-1] {Number} The cell that is to be used. Default is -1 (which means none)
        * @return {TileType} The TileType generated.
        * @public
        */
        public createTileType(cell?: number): Tilemap.TileType;
        /**
        * Creates a new TileType for each cell that you pass.
        * @method createTileTypes
        * @param cells {Number[]} The cells that you want a new TileType created for.
        * @return {TileTypes[]} The TileTypes generated.
        * @public
        */
        public createTileTypes(cells: number[]): Tilemap.TileType[];
        /**
        * Used to create a number of TileTypes based starting cell number and how many you want from there.
        * @method createTileTypesByRange
        * @param cellStart {Number} The starting number of the cell.
        * @param range {Number} How many cells (from the starting cell) should be created.
        * @return {TileTypes[]} The TileTypes generated.
        */
        public createTileTypesByRange(cellStart: number, range: number): Tilemap.TileType[];
        /**
        *-----------------------
        * Cell Modifications
        *-----------------------
        **/
        /**
        * Changes a single cellIndex that a TileType is to use when it is rendered.
        * @method setCell
        * @param type {number} The number of the TileType that is to change.
        * @param cell {number} The new cellIndex it should have.
        * @public
        */
        public setCell(type: number, cell: number): void;
        /**
        * Changes a range of cellIndexs for Tiles the same range of TileTypes.
        * @method setCellsByRange
        * @param typeStart {number} The starting TileType that is to be modified.
        * @param cellStart {number} The starting cellIndex that the first TileType should have.
        * @param range {number} How many times it should run.
        * @public
        */
        public setCellsByRange(typeStart: number, cellStart: number, range: number): void;
        /**
        *-----------------------
        * Creation of Tilemap Layers
        *-----------------------
        **/
        /**
        * Creates a new TileMapLayer with the details that are provided.
        * If no width/height/tileWidth/tileHeight parameters are passed then the values will be what this TileMap has.
        * If no 'data' is provided then the map will be automatically filled with empty Types of Tiles.
        * Returns the new TileMapLayer that was created.
        * @method createNewLayer
        * @param name {String} Name of the TileMap.
        * @param atlas {TextureAtlas} The TextureAtlas that this layer should use.
        * @param data {Number[]} The tile information.
        * @param [w=this.width] {Number} The width of the whole tile map. In Tiles.
        * @param [h=this.height] {Number} The height of the whole tile map. In Tiles.
        * @param [x=0] {Number} The position of the tilemap on the x axis. In pixels.
        * @param [y=0] {Number} The position of the tilemap on the y axis. In pixels.
        * @param [tw=this.tileWidth] {Number} The width of a single tile.
        * @param [th=this.tileHeight] {Number} The height of a single tile.
        * @return {TileMapLayer} The TileMapLayer that was created.
        * @public
        */
        public createNewLayer(name: string, atlas: Kiwi.Textures.TextureAtlas, data?: number[], w?: number, h?: number, x?: number, y?: number, tw?: number, th?: number): Tilemap.TileMapLayer;
        /**
        * Eventually will create a new object layer. Currently does nothing.
        * @method createNewObjectLayer
        * @public
        */
        public createNewObjectLayer(): void;
        /**
        * Eventually will create a new image layer. Currently does nothing.
        * @method createNewObjectLayer
        * @public
        */
        public createNewImageLayer(): void;
        /**
        *-----------------------
        * TileMapLayer Management Functions
        *-----------------------
        **/
        /**
        * Get a layer by the name that it was given upon creation.
        * Returns null if no layer with that name was found.
        * @method getLayerByName
        * @param name {String} Name of the layer you would like to select.
        * @return {TileMapLayer} Either the layer with the name passed, or null if no Layer with that name was found.
        * @public
        */
        public getLayerByName(name: string): Tilemap.TileMapLayer;
        /**
        * Returns the layer with the number associated with it in the layers array.
        * @method getLayer
        * @param num {Number} Number of the Layer you would like to get.
        * @return {TileMapLayer}
        * @public
        */
        public getLayer(num: number): Tilemap.TileMapLayer;
        /**
        * The type of object that it is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
    }
}
/**
*
* @module GameObjects
* @submodule Tilemap
*
*/
declare module Kiwi.GameObjects.Tilemap {
    /**
    * Is GameObject that contains the information held for a single Layer of Tiles, along with methods to handle the rendering of those Tiles.
    * A TileMapLayer should not be directly created, but instead should be created through a TileMap object instead.
    *
    * @class TileMapLayer
    * @extends Entity
    * @namespace Kiwi.GameObjects.Tilemap
    * @constructor
    * @param tilemap {TileMap} The TileMap that this layer belongs to.
    * @param name {String} The name of this TileMapLayer.
    * @param atlas {TextureAtlas} The texture atlas that should be used when rendering this TileMapLayer onscreen.
    * @param data {Number[]} The information about the tiles.
    * @param tw {Number} The width of a single tile in pixels. Usually the same as the TileMap unless told otherwise.
    * @param th {Number} The height of a single tile in pixels. Usually the same as the TileMap unless told otherwise.
    * @param [x=0] {Number} The x coordinate of the tilemap in pixels.
    * @param [y=0] {Number} The y coordinate of the tilemap in pixels.
    * @param [w=0] {Number} The width of the whole tilemap in tiles. Usually the same as the TileMap unless told otherwise.
    * @param [h=0] {Number} The height of the whole tilemap in tiles. Usually the same as the TileMap unless told otherwise.
    * @return {TileMapLayer}
    */
    class TileMapLayer extends Kiwi.Entity {
        constructor(tilemap: Tilemap.TileMap, name: string, atlas: Kiwi.Textures.TextureAtlas, data: number[], tw: number, th: number, x?: number, y?: number, w?: number, h?: number);
        public physics: Kiwi.Components.ArcadePhysics;
        /**
        * Returns the type of child that this is.
        * @type Number
        * @return {Number} returns the type of child that the entity is
        * @public
        */
        public childType(): number;
        /**
        * The type of object that it is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The tilemap that this TileMapLayer is a part of.
        * @property tilemap
        * @type TileMap
        * @public
        */
        public tilemap: Tilemap.TileMap;
        /**
        * Properties about that this TileMapLayer has when it was created from a JSON file.
        * @property properties
        * @type Object
        * @public
        */
        public properties: any;
        /**
        * The width of this TileMap in tiles.
        * @property width
        * @type Number
        * @public
        */
        public width: number;
        /**
        * The height of this TileMap in tiles.
        * @property height
        * @type Number
        * @public
        */
        public height: number;
        /**
        * The width of a single tile.
        * @property tileWidth
        * @type Number
        * @public
        */
        public tileWidth: number;
        /**
        * The height of a single tile.
        * @property tileHeight
        * @type Number
        * @public
        */
        public tileHeight: number;
        /**
        * The texture atlas that should be used when rendering.
        * @property atlas
        * @type TextureAtlas
        * @public
        */
        public atlas: Kiwi.Textures.TextureAtlas;
        /**
        * The width of the layer in pixels. This property is READ ONLY.
        * @property widthInPixels
        * @type number
        * @public
        */
        public widthInPixels : number;
        /**
        * The height of the layer in pixels. This property is READ ONLY.
        * @property heightInPixels
        * @type number
        * @public
        */
        public heightInPixels : number;
        /**
        * A list containing all the types of tiles found on this TileMapLayer.
        * @property _data
        * @type number[]
        * @private
        */
        private _data;
        /**
        * Returns the total number of tiles. Either for a particular type if passed, otherwise of any type if not passed.
        * @method countTiles
        * @param [type] {Number} The type of tile you want to count.
        * @return {Number} The number of tiles on this layer.
        * @public
        */
        public countTiles(type?: number): number;
        public orientation: string;
        /**
        *-----------------------
        * Getting Tiles
        *-----------------------
        */
        /**
        * A list containing all of the types of tiles found on this TileMapLayer. This is READ ONLY.
        * @property tileData
        * @type number[]
        * @public
        */
        public tileData : number[];
        /**
        * Returns the index of the tile based on the x and y coordinates of the tile passed.
        * If no tile is a the coordinates given then -1 is returned instead.
        * Coordinates are in tiles not pixels.
        * @method getIndexFromXY
        * @param x {Number} The x coordinate of the Tile you would like to retrieve.
        * @param y {Number} The y coordinate of the Tile you would like to retrieve.
        * @return {Number} Either the index of the tile retrieved or -1 if none was found.
        * @public
        */
        public getIndexFromXY(x: number, y: number): number;
        /**
        * Returns the TileType for a tile that is at a particular set of coordinates passed.
        * If no tile is found the null is returned instead.
        * Coordinates passed are in tiles.
        * @method getTileFromXY
        * @param x {Number}
        * @param y {Number}
        * @return {Number} The tile
        * @public
        */
        public getTileFromXY(x: number, y: number): Tilemap.TileType;
        /**
        * Returns the index of the tile based on the x and y pixel coordinates that are passed.
        * If no tile is a the coordinates given then -1 is returned instead.
        * Coordinates are in pixels not tiles and use the world coordinates of the tilemap.
        * @method getIndexFromCoords
        * @param x {Number} The x coordinate of the Tile you would like to retrieve.
        * @param y {Number} The y coordinate of the Tile you would like to retrieve.
        * @return {Number} Either the index of the tile retrieved or -1 if none was found.
        * @public
        */
        public getIndexFromCoords(x: number, y: number): number;
        /**
        * Returns the TileType for a tile that is at a particular coordinate passed.
        * If no tile is found the null is returned instead.
        * Coordinates passed are in pixels and use the world coordinates of the tilemap.
        * @method getTileFromXY
        * @param x {Number}
        * @param y {Number}
        * @return {Number} The tile
        * @public
        */
        public getTileFromCoords(x: number, y: number): Tilemap.TileType;
        /**
        * Returns the indexes of every tile of a type you pass.
        * @method getIndexsByType
        * @param type {Number}
        * @return {Number[]}
        * @public
        */
        public getIndexesByType(type: number): number[];
        /**
        *-----------------------
        * Tiles Manipulation
        *-----------------------
        */
        /**
        * Sets the tile to be used at the coordinates provided.
        * Can be used to override a tile that may already exist at the location.
        * @method setTile
        * @param x {number} The coordinate of the tile on the x axis.
        * @param y {number} The coordinate of the tile on the y axis.
        * @param tileType {number} The type of tile that should be now used.
        * @return {boolean} If a tile was changed or not.
        * @public
        */
        public setTile(x: number, y: number, tileType: number): boolean;
        /**
        * Sets the tile to be used at the index provided.
        * Can be used to override a tile that may already exist at the location.
        * @method setTileByIndex
        * @param index {number} The index of the tile that you want to change.
        * @param tileType {number} The new tile type to be used at that position.
        * @public
        */
        public setTileByIndex(index: number, tileType: number): void;
        /**
        * Randomizes the types of tiles used in an area of the layer. You can choose which types of tiles to use, and the area.
        * Default tile types used are everyone avaiable.
        * @method randomizeTiles
        * @param [types] {number[]} A list of TileTypes that can be used. Default is every tiletype on the TileMap.
        * @param [x=0] {number} The starting tile on the x axis to fill.
        * @param [y=0] {number} The starting tile on the y axis to fill.
        * @param [width=this.width] {number} How far across you want to go.
        * @param [height=this.height] {number} How far down you want to go.
        * @public
        */
        public randomizeTiles(types?: number[], x?: number, y?: number, width?: number, height?: number): void;
        /**
        * Makes all of the tiles in the area specified a single type that is passed.
        * @method fill
        * @param type {number} The type of tile you want to fill in the area with.
        * @param [x=0] {number} The starting tile on the x axis to fill.
        * @param [y=0] {number} The starting tile on the y axis to fill.
        * @param [width=this.width] {number} How far across you want to go.
        * @param [height=this.height] {number} How far down you want to go.
        * @public
        */
        public fill(type: number, x?: number, y?: number, width?: number, height?: number): void;
        /**
        * Replaces all tiles of typeA to typeB in the area specified. If no area is specified then it is on the whole layer.
        * @method replaceTiles
        * @param typeA {number} The type of tile you want to be replaced.
        * @param typeB {number} The type of tile you want to be used instead.
        * @param [x=0] {number} The starting tile on the x axis to fill.
        * @param [y=0] {number} The starting tile on the y axis to fill.
        * @param [width=this.width] {number} How far across you want to go.
        * @param [height=this.height] {number} How far down you want to go.
        * @public
        */
        public replaceTiles(typeA: number, typeB: number, x?: number, y?: number, width?: number, height?: number): void;
        /**
        * Swaps all the tiles that are typeA -> typeB and typeB -> typeA inside the area specified. If no area is specified then it is on the whole layer.
        * @method swapTiles
        * @param typeA {number} The type of tile you want to be replaced with typeB.
        * @param typeB {number} The type of tile you want to be replaced with typeA.
        * @param [x=0] {number} The starting tile on the x axis to fill.
        * @param [y=0] {number} The starting tile on the y axis to fill.
        * @param [width=this.width] {number} How far across you want to go.
        * @param [height=this.height] {number} How far down you want to go.
        * @public
        */
        public swapTiles(typeA: number, typeB: number, x?: number, y?: number, width?: number, height?: number): void;
        /**
        *-----------------------
        * Get Tiles By Collision Methods
        *-----------------------
        */
        /**
        * Returns the tiles which overlap with a provided entities box component.
        * Only collidable tiles on ANY side will be returned unless you pass a particular side.
        *
        * @method getOverlappingTiles
        * @param entity {Entity} The entity you would like to check for the overlap.
        * @param [collisionType=ANY] {Number} The particular type of collidable tiles which you would like to check for.
        * @return {Object[]} Returns an Array of Objects containing information about the tiles which were found. Index/X/Y information is contained within each Object.
        * @public
        */
        public getOverlappingTiles(entity: Kiwi.Entity, collisionType?: number): any;
        /**
        * Returns the tiles which can collide with other objects (on ANY side unless otherwise specified) within an area provided.
        * By default the area is the whole tilemap.
        * @method getCollidableTiles
        * @param [x=0] {Number} The x coordinate of the first tile to check.
        * @param [y=0] {Number} The y coordinate of the first tile to check.
        * @param [width=widthOfMap] {Number} The width from the x coordinate.
        * @param [height=heightOfmap] {Number} The height from the y coordinate.
        * @param [collisionType=ANY] {Number} The type of collidable tiles that should be return. By default ANY type of collidable tiles will be returned.
        * @return {Object[]} Returns an Array of Objects containing information about the tiles which were found. Index/X/Y information is contained within each Object.
        * @public
        */
        public getCollidableTiles(x?: number, y?: number, width?: number, height?: number, collisionType?: number): any;
        /**
        * The update loop that is executed when this TileMapLayer is add to the Stage.
        * @method update
        * @public
        */
        public update(): void;
        /**
        *-----------------------
        * Temp Properties used During Rendering
        *-----------------------
        */
        /**
        * Used whilst rendering to calculate the number of tiles to be rendered on the X axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _maxX
        * @type number
        * @private
        */
        private _maxX;
        /**
        * Used whilst rendering to calculate the number of tiles to be rendered on the Y axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _maxY
        * @type number
        * @private
        */
        private _maxY;
        /**
        * Used whilst rendering to calculate which is the first tile to be rendered on the X axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _startX
        * @type number
        * @private
        */
        private _startX;
        /**
        * Used whilst rendering to calculate which is the first tile to be rendered on the Y axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _startY
        * @type number
        * @private
        */
        private _startY;
        /**
        * Temporary property that holds the tileType of the current tile being rendered.
        * @property _temptype
        * @type TileType
        * @private
        */
        private _temptype;
        /**
        * Used to calculate the position of the tilemap on the stage as well as how many tiles can fit on the screen.
        * All coordinates calculated are stored as temporary properties (maxX/Y, startX/Y).
        * @method _calculateBoundaries
        * @param camera {Camera}
        * @param matrix {Matrix}
        * @private
        */
        private _calculateBoundaries(camera, matrix);
        /**
        * ChartToScreen maps a point in the game tile coordinates into screen pixel
        * coordinates that indicate where the tile should be drawn.
        */ 
        public chartToScreen(chartPt: any, tileW: number, tileH: number): any;
        /**
        * ScreenToChart maps a point in screen coordinates into the game tile chart
        * coordinates for the tile on which the screen point falls on.
        */
        public screenToChart(scrPt: any, tileW: number, tileH: number): any;
        /**
        * The render loop which is used when using the Canvas renderer.
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera): boolean;
        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
    }
}
/**
* Component's are a snipnets of code which are designed to provide extra functionality to various objects, such as IChild's/GameObjects/HUDWidgets/e.t.c. The code that components have are not necessarily needed for an object to work, but are instead provided to make common task's that you would do with those objects easier. An Example being that at times you may like to make a GameObject draggable by the user and so you can then add Input Component and execute the enableDrag on that GameObject. That would be task that not every GameObject would need, but only specific ones.
*
* @module Kiwi
* @submodule Components
* @main Components
*/ 
declare module Kiwi.Components {
    /**
    * The AnimationManager is used to handle the creation and playment of Animations on a individual GameObject based on the TextureAtlas it has.
    * When the AnimationManager is instantiated it will loop through all of the Sequences on the TextureAtlas of the GameObject being used and will create a new Animation for each one.
    * Now when you create a new Animation that animation will automatically be added as a new Sequence to the corresponding Texture.
    * This way you don't need to create new Animations for a each Sprite that use's the same Texture.
    *
    * @class AnimationManager
    * @extends Component
    * @namespace Kiwi.Components
    * @constructor
    * @param entity {Entity} The entity that this animation component belongs to.
    * @return {AnimationManager}
    */
    class AnimationManager extends Kiwi.Component {
        constructor(entity: Kiwi.Entity);
        /**
        * Dispatches callbacks each time an animation is told to play through this AnimationManager.
        * Functions dispatched from this signal have ONE parameter.
        * One - The Animation object of that is now playing.
        * @property onPlay
        * @type Kiwi.Signal
        * @public
        */
        public onPlay: Kiwi.Signal;
        /**
        * Dispatches callbacks each time an animation stops.
        * Functions dispatched from this signal have ONE parameter.
        * One - The current animation.
        * @property onStop
        * @type Kiwi.Signal
        * @public
        */
        public onStop: Kiwi.Signal;
        /**
        * Dispatches callbacks each time the cell of the Sprite this AnimationManager belongs to updates/changes.
        * Note: This method will be dispatching events EVERY time the cell changes, so this will include when changing/switching animations.
        * @property onUpdate
        * @type Kiwi.Signal
        * @public
        */
        public onUpdate: Kiwi.Signal;
        /**
        * Dispatches callbacks each time the current animation is switched NOT when the cells of a animation change.
        * Function's dispatched from this event have TWO parameters,
        * One - Name of the animation switched to.
        * Two - The Animation object that is now the current.
        * @property onChange
        * @type Kiwi.Signal
        * @public
        */
        public onChange: Kiwi.Signal;
        /**
        * The entity that this animation belongs to.
        * @property entity
        * @type Entity
        * @private
        */
        private entity;
        /**
        * The texture atlas that this animation is taking affect on.
        * @property _atlas
        * @type TextureAtlas
        * @private
        */
        private _atlas;
        /**
        * A dictionary containing all of the animations that are avaiable.
        * @property _animations
        * @type Object
        * @private
        */
        private _animations;
        /**
        * A reference to the animation that is currently being played.
        * @property _currentAnimation
        * @type Animation
        * @default null
        * @private
        */
        public currentAnimation: Kiwi.Animations.Animation;
        /**
        * Returns a boolean indicating whether or not the current animation is playing. This is READ ONLY.
        * @property isPlaying
        * @type boolean
        * @public
        */
        public isPlaying : boolean;
        /**
        * The type of object that this is.
        * @method objType
        * @type string
        * @public
        */
        public objType(): string;
        /**
        * Creates a new sequence and then adds that sequence as a new animation on this component. Returns that animation that was created.
        *
        * @method add
        * @param {string} name
        * @param cells {number[]} An array that contains a reference to the cells that are to be played in the animation.
        * @param speed {number} The amount of time that each frame should stay on screen for. In seconds.
        * @param [loop=false] {boolean} If when the animation reaches the last frame, it should go back to the start again.
        * @param [play=false] {boolean} If once created the animation should play right away.
        * @return {Animation} The Anim that was created.
        * @public
        */
        public add(name: string, cells: number[], speed: number, loop?: boolean, play?: boolean): Kiwi.Animations.Animation;
        /**
        * Creates a new animation based on a sequence that is passed.
        *
        * @method createFromSequence
        * @param sequence {Kiwi.Sequence} The sequence that the animation is based on.
        * @param [play=false] {boolean} If the animation should play once it has been created
        * @return {Animation} The Anim that was created.
        * @public
        */
        public createFromSequence(sequence: Kiwi.Animations.Sequence, play?: boolean): Kiwi.Animations.Animation;
        /**
        * Plays either the current animation or the name of the animation that you pass.
        *
        * @method play
        * @param [name] {string} The name of the animation that you want to play. If not passed it plays the current animation.
        * @public
        */
        public play(name?: string): Kiwi.Animations.Animation;
        /**
        * Play an animation at a particular frameIndex.
        *
        * @method playAt
        * @param index {Number} The index of the frame in the Sequence that you would like to play.
        * @param [name] {String} The name of the animation that you want to play. If not passed, it plays it on the current animation.
        * @public
        */
        public playAt(index: number, name?: string): Kiwi.Animations.Animation;
        /**
        * An internal method used to actually play the animation.
        *
        * @method _play
        * @param name {number} The name of the animation that is to be switched to.
        * @param [index=null] {string} The index of the frame in the Sequence that is to play.
        * @return {Animation}
        * @private
        */
        private _play(name, index?);
        /**
        * Stops the current animation from playing.
        * @method stop
        * @public
        */
        public stop(): void;
        /**
        * Pauses the current animation.
        * @method pause
        * @public
        */ 
        public pause(): void;
        /**
        * Resumes the current animation. The animation should have already been paused.
        * @method resume
        * @public
        */
        public resume(): void;
        /**
        * Either switches to a particular animation OR a particular frame in the current animation depending on if you pass the name of an animation that exists on this Manager (as a string) or a number refering to a frame index on the Animation.
        * When you switch to a particular animation then
        * You can also force the animation to play or to stop by passing a boolean in. But if left as null, the animation will base it off what is currently happening.
        * So if the animation is currently 'playing' then once switched to the animation will play. If not currently playing it will switch to and stop.
        *
        * @method switchTo
        * @param val {string|number}
        * @param [play=null] {boolean} Force the animation to play or stop. If null the animation base's it off what is currently happening.
        * @public
        */
        public switchTo(val: any, play?: boolean): void;
        /**
        * Makes the current animation go to the next frame. If the animation is at the end of the sequence it then goes back to the start.
        * @method nextFrame
        * @public
        */
        public nextFrame(): void;
        /**
        * Makes the current animation go to the prev frame. If the animation is at the start, the animation will go the end of the sequence.
        * @method prevFrame
        * @public
        */
        public prevFrame(): void;
        /**
        * Internal method that sets the current animation to the animation passed.
        *
        * @method _setCurrentAnimation
        * @param {string} name
        * @private
        */
        private _setCurrentAnimation(name);
        /**
        * The update loop, it only updates the currentAnimation and only if it is playing.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Gets the cell that the current animation is current at. This is READ ONLY.
        * @property currentCell
        * @type number
        * @public
        */
        public currentCell : number;
        /**
        * Gets the current frame index of the cell in the sequence that is currently playing. This is READ ONLY.
        * @property frameIndex
        * @type number
        * @public
        */
        public frameIndex : number;
        /**
        * Returns the length (Number of cells) of the current animation that is playing. This is READ ONLY.
        * @property length
        * @type number
        * @public
        */
        public length : number;
        /**
        * Get a animation that is on the animation component.
        *
        * @method getAnimation
        * @param {string} name
        * @return {Animation}
        * @public
        */
        public getAnimation(name: string): Kiwi.Animations.Animation;
        /**
        * An internal method that is used to update the cell index of an entity when an animation says it needs to update.
        * @method updateCellIndex
        * @protected
        */
        public updateCellIndex(): void;
        /**
        * Destroys the animation component and runs the destroy method on all of the anims that it has.
        * @method destroy
        * @public
        */
        public destroy(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Components
*
*/ 
declare module Kiwi.Components {
    /**
    * The Box Component is used to handle the various 'bounds' that each GameObject has.
    * There are FOUR different types of bounds (each one is a rectangle) on each box depending on what you are wanting:
    * RawBounds: The bounding box of the GameObject before rotation.
    * RawHitbox: The hitbox of the GameObject before rotation. This can be modified to be different than the normal bounds but if not specified it will be the same as the raw bounds.
    * Bounds: The bounding box of the GameObject after rotation.
    * Hitbox: The hitbox of the GameObject after rotation. If you modified the raw hitbox then this one will be modified as well, otherwise it will be the same as the normal bounds.
    *
    * @class Box
    * @extends Component
    * @namespace Kiwi.Components
    * @constructor
    * @param parent {Entity} The entity that this box belongs to.
    * @param [x=0] {Number} Its position on the x axis
    * @param [y=0] {Number} Its position on the y axis
    * @param [width=0] {Number} The width of the box.
    * @param [height=0] {Number} The height of the box.
    * @return {Box}
    */
    class Box extends Kiwi.Component {
        constructor(parent: Kiwi.Entity, x?: number, y?: number, width?: number, height?: number);
        /**
        * The entity that this box belongs to.
        * @property entity
        * @type Entity
        * @public
        */
        public entity: Kiwi.Entity;
        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * Indicates whether or not this component needs re-rendering/updating or not.
        * @property dirty
        * @type boolean
        * @public
        */
        public dirty: boolean;
        /**
        * Contains offset point for the hitbox
        * @property _hitboxOffset
        * @type Point
        * @private
        */
        private _hitboxOffset;
        /**
        * Returns the offset value of the hitbox as a point for the X/Y axis for the developer to use.
        * This is without rotation or scaling.
        * @property hitboxOffset
        * @type Point
        * @public
        */
        public hitboxOffset : Kiwi.Geom.Point;
        /**
        * Contains the offset rectangle for the raw hitbox.
        * @property _rawHitbox
        * @type Rectangle
        * @private
        */
        private _rawHitbox;
        /**
        * Returns the raw hitbox rectangle for the developer to use.
        * 'Raw' means where it would be without rotation or scaling.
        * This is READ ONLY.
        * @property rawHitbox
        * @type Rectangle
        * @public
        */
        public rawHitbox : Kiwi.Geom.Rectangle;
        /**
        * The transformed or 'normal' hitbox for the entity. This is its box after rotation/e.t.c.
        * @property _transformedHitbox
        * @type Rectangle
        * @private
        */
        private _transformedHitbox;
        /**
        * The transformed 'world' hitbox for the entity. This is its box after rotation/e.t.c.
        * @property _worldHitbox
        * @type Rectangle
        * @private
        */
        private _worldHitbox;
        /**
        * The 'normal' or transformed hitbox for the entity. This is its box after rotation/e.t.c.
        * @property hitbox
        * @type Rectangle
        * @public
        */
        public hitbox : Kiwi.Geom.Rectangle;
        /**
        * Returns the transformed hitbox for the entity using its 'world' coordinates.
        * This is READ ONLY.
        * @property worldHitbox
        * @type Rectangle
        * @public
        */
        public worldHitbox : Kiwi.Geom.Rectangle;
        /**
        * The 'raw' bounds of entity. This is its bounds before rotation/scale.
        * @property _rawBounds
        * @type Rectangle
        * @private
        */
        private _rawBounds;
        /**
        * Returns the 'raw' bounds for this entity.
        * This is READ ONLY.
        * @property rawBounds
        * @type Rectangle
        * @public
        */
        public rawBounds : Kiwi.Geom.Rectangle;
        /**
        * Contains the 'raw' center point for the bounds.
        * @property Kiwi.Geom.Point
        * @type Point
        * @private
        */
        private _rawCenter;
        /**
        * Returns the raw center point of the box.
        * This is READ ONLY.
        * @property rawCenter
        * @type Point
        * @public
        */
        public rawCenter : Kiwi.Geom.Point;
        /**
        * Contains the center point after the box has been transformed.
        * @property _transformedCenter
        * @type Point
        * @private
        */
        private _transformedCenter;
        /**
        * Returns the center point for the box after it has been transformed.
        * This is READ ONLY.
        * @property center
        * @type Point
        * @public
        */
        public center : Kiwi.Geom.Point;
        /**
        * Contains the transformed or 'normal' bounds for this entity.
        * @property _transformedBounds
        * @type Rectangle
        * @private
        */
        private _transformedBounds;
        /**
        * The 'world' transformed bounds for this entity.
        * @property _worldBounds
        * @type Rectangle
        * @private
        */
        private _worldBounds;
        /**
        * Returns the 'transformed' or 'normal' bounds for this box.
        * This is READ ONLY.
        * @property bounds
        * @type Rectangle
        * @public
        */
        public bounds : Kiwi.Geom.Rectangle;
        /**
        * Returns the 'transformed' world bounds for this entity.
        * This is READ ONLY.
        * @property worldBounds
        * @type Rectangle
        * @public
        */
        public worldBounds : Kiwi.Geom.Rectangle;
        /**
        * Private internal method only. Used to calculate the transformed bounds after rotation.
        * @method _rotateRect
        * @param rect {Rectangle}
        * @param [useWorldCoords=false] {Boolean}
        * @return {Rectangle}
        * @private
        */
        private _rotateRect(rect, useWorldCoords?);
        /**
        * A private method that is used to calculate the transformed hitbox's coordinates after rotation.
        * @method _rotateHitbox
        * @param rect {Rectangle}
        * @param [useWorldCoords=false] {Boolean}
        * @return {Rectangle}
        * @private
        */
        private _rotateHitbox(rect, useWorldCoords?);
        /**
        * Draws the various bounds on a context that is passed. Useful for debugging.
        * @method draw
        * @param {CanvasRenderingContext2D} ctx
        * @public
        */
        public draw(ctx: CanvasRenderingContext2D): void;
        public extents(topLeftPoint: Kiwi.Geom.Point, topRightPoint: Kiwi.Geom.Point, bottomRightPoint: Kiwi.Geom.Point, bottomLeftPoint: Kiwi.Geom.Point): Kiwi.Geom.Rectangle;
        /**
        * Destroys this component and all of the links it may have to other objects.
        * @method destroy
        * @public
        */
        public destroy(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Components
*
*/ 
declare module Kiwi.Components {
    /**
    * The Input Component is used on GameObjects in which the user may interactive with via a Mouse or Touch
    * and as such this class contains useful methods and callbacks you can subscribe to.
    * By default the Input component is disabled (this is because when enabled the input component can be process intensive)
    * but you can enabled it yourself (which is recommened) BUT in case you forget the input component will automagically
    * be enabled once you access a Signal on this class.
    *
    * @class Input
    * @extends Component
    * @namespace Kiwi.Components
    * @constructor
    * @param owner {IChild} The IChild that owns this Input.
    * @param box {Box} The box that is to be used for the event firing.
    * @param [enabled=false] {boolean} If this input component should be enabled or not.
    * @return {Input}
    */
    class Input extends Kiwi.Component {
        constructor(owner: Kiwi.IChild, box: Components.Box, enabled?: boolean);
        /**
        * The type of object this input is.
        * @method objType
        * @return string
        * @public
        */
        public objType(): string;
        /**
        * The bounding box that is being used for the 'hitarea'.
        * @property _box
        * @type Box
        * @private
        */
        private _box;
        /**
        * Kiwi Signal for firing callbacks when a pointer is active and has entered the entities hit box.
        * @property _onEntered
        * @type Signal
        * @private
        */
        private _onEntered;
        /**
        * Kiwi Signal for firing callbacks when a pointer is active and has left the entities hit box.
        * @property _onLeft
        * @type Signal
        * @private
        */
        private _onLeft;
        /**
        * Kiwi Signal for firing callbacks when a pointer is active and has pressed down on the entity.
        * @property _onDown
        * @type Signal
        * @private
        */
        private _onDown;
        /**
        * Kiwi Signal for firing callbacks when a pointer just released from either being above the entity or the pointer was initally pressed on it.
        * @property _onUp
        * @type Signal
        * @private
        */
        private _onUp;
        /**
        * Kiwi Signal for firing callbacks a entity starts being dragged.
        * @property _onDragStarted
        * @type Signal
        * @private
        */
        private _onDragStarted;
        /**
        * Kiwi Signal for firing callbacks a entity stops being dragged. Like on release.
        * @property _onDragStopped
        * @type Signal
        * @private
        */
        private _onDragStopped;
        /**
        * Returns the onEntered Signal, that fires events when a pointer enters the hitbox of a entity.
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onEntered
        * @type Signal
        * @public
        */
        public onEntered : Kiwi.Signal;
        /**
        * Returns the onLeft Signal, that fires events when a pointer leaves the hitbox of a entity.
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onLeft
        * @type Signal
        * @public
        */
        public onLeft : Kiwi.Signal;
        /**
        * Returns the onDown Signal, that fires events when a pointer is pressed within the bounds of the signal.
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onDown
        * @type Signal
        * @public
        */
        public onDown : Kiwi.Signal;
        /**
        * Returns the onUp Signal, that fires events when a pointer is released either within the bounds or was pressed initially within the bounds..
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onUp
        * @type Signal
        * @public
        */
        public onUp : Kiwi.Signal;
        /**
        * Returns the onDragStarted Signal.
        * This is READ ONLY.
        * @property onDragStarted
        * @type Signal
        * @public
        */
        public onDragStarted : Kiwi.Signal;
        /**
        * Returns the onDragStopped Signal.
        * This is READ ONLY.
        * @property onDragStopped
        * @type Signal
        * @public
        */
        public onDragStopped : Kiwi.Signal;
        /**
        * A alias for the on release signal.
        * This is READ ONLY.
        * @property onRelease
        * @type Signal
        * @public
        */
        public onRelease : Kiwi.Signal;
        /**
        * A alias for the on press signal.
        * This is READ ONLY.
        * @property onPress
        * @type Signal
        * @public
        */
        public onPress : Kiwi.Signal;
        /**
        * If this input is enabled or not.
        * @property _enabled
        * @type boolean
        * @default false
        * @private
        */
        private _enabled;
        /**
        * Get if the input is enabled or not. Note: Inputs should only be enabled when needed, otherwise unnecessary processing does occur which can result in a slower game.
        * @property enabled
        * @type boolean
        * @public
        */
        public enabled : boolean;
        /**
        * If a pointer is current pressing down on the input, this will be a reference to that pointer. Otherwise it will be null.
        * @property _isDown
        * @type Pointer
        * @private
        */
        private _isDown;
        /**
        * A boolean that indicates if no pointer is currently on the pointer
        * @property _isUp
        * @type boolean
        * @default true
        * @private
        */
        private _isUp;
        /**
        * Indicates if a pointer is within the bounds or not. If one is then it referers to the pointer that is. Other it will be null.
        * @property _withinBounds
        * @type Pointer
        * @private
        */
        private _withinBounds;
        /**
        * boolean indicating if every pointer is currently outside of the bounds.
        * @property _outsideBounds
        * @type boolean
        * @default true
        * @private
        */
        private _outsideBounds;
        /**
        * If a pointer just entered the input. Used for mouse's to indicate when to appropriately fire the down event.
        * Note: Could be removed once mouse version of update gets updated.
        * @property _justEntered
        * @type boolean
        * @default false
        * @private
        */
        private _justEntered;
        /**
        * Used to see if a pointer is currently on this input. Returns a boolean indicating either true or false.
        * This is READ ONLY.
        * @property isDown
        * @type boolean
        * @public
        */
        public isDown : boolean;
        /**
        * Used to see if no pointer is on this input (so it is up).
        * This is READ ONLY.
        * @property isUp
        * @type boolean
        * @public
        */
        public isUp : boolean;
        /**
        * Check to see if any pointer is within the bounds of this input.
        * This is READ ONLY.
        * @property withinBounds
        * @type boolean
        * @public
        */
        public withinBounds : boolean;
        /**
        * See if no pointers are within the bounds of this entity.
        * This is READ ONLY.
        * @property outsideBounds
        * @type boolean
        * @public
        */
        public outsideBounds : boolean;
        /**
        * A reference to the pointer that is currently 'dragging' this IChild.
        * If not dragging then this is null.
        * @property _isDragging
        * @type Pointer
        * @default null
        * @private
        */
        private _isDragging;
        /**
        * The distance between the top left corner of this IChild and the coordinates of a Pointer.
        * @property _distance
        * @type Point
        * @private
        */
        private _distance;
        /**
        * A boolean indicating if dragging is temporarly disabled. Internal use only to stop events from misfiring.
        * @property _tempDragDisabled
        * @type boolean
        * @private
        */
        private _tempDragDisabled;
        /**
        * Indicates if dragging is currently enabled.
        * @property _dragEnabled
        * @type boolean
        * @default false
        * @private
        */
        private _dragEnabled;
        /**
        * This is used while dragging so that you can make the IChild 'snap' to specific numbers to give a 'grid like' effect.
        * E.g. If you had a 32 by 32 grid down and you wanted to make an element draggable but snap to the grid you can set this to 32.
        * Default value is one.
        * @property _dragDistance
        * @type number
        * @default 1
        * @private
        */
        private _dragDistance;
        /**
        * If when dragging, the IChild should snap to the center of the pointer it is being dragged by.
        * @property _dragSnapToCenter
        * @type boolean
        * @default false
        * @private
        */
        private _dragSnapToCenter;
        /**
        * Returns a boolean indicating if this is currently dragging something.
        * This is READ ONLY.
        * @property isDragging
        * @type boolean
        * @public
        */
        public isDragging : boolean;
        /**
        * The drag distance that is used when dragging this object. See _dragDistance for more information.
        * @property dragDistance
        * @type number
        * @public
        */
        public dragDistance : number;
        /**
        * Temporary property that gets updated everyframe with the pointer that is currently 'down' on this entity.
        * @property _nowDown
        * @type Pointer
        * @default null
        * @private
        */
        private _nowDown;
        /**
        * Temporary property that gets updated everyframe with the pointer that was just 'released' from being down on this entity
        * @property _nowUp
        * @type Pointer
        * @default null
        * @private
        */
        private _nowUp;
        /**
        * Temporary property of the pointer that is now within the bounds of the entity
        * @property _nowEntered
        * @type Pointer
        * @default null
        * @private
        */
        private _nowEntered;
        /**
        * Temporary property of the pointer that just left the bounds of the entity.
        * @property _nowLeft
        * @type Pointer
        * @default null
        * @private
        */
        private _nowLeft;
        /**
        * Temporary property of the pointer that just started draggging the entity.
        * @property _nowDragging
        * @type Pointer
        * @default null
        * @private
        */
        private _nowDragging;
        /**
        * Enables the dragging of this entity.
        * @method enableDrag
        * @param [snapToCenter=false] {boolean} If when dragging the Entity should snap to the center of the pointer.
        * @param [distance=1] {number} If when dragging the Entity should snap to numbers divisible by this amount.
        * @public
        */
        public enableDrag(snapToCenter?: boolean, distance?: number): void;
        /**
        * Disables the dragging of this entity.
        * @method disableDrag
        * @public
        */
        public disableDrag(): void;
        /**
        * The update loop for the input.
        * @method update
        * @protected
        */
        public update(): void;
        /**
        * The update loop that gets executed when the game is using the touch manager.
        * @method _updateTouch
        * @private
        */
        private _updateTouch();
        /**
        * A private method for checking to see if a touch pointer should activate any events.
        * @method _evaluateTouchPointer
        * @param pointer {Finger} The pointer you are checking against.
        * @private
        */
        private _evaluateTouchPointer(pointer);
        /**
        * The update loop that runs when the mouse manager is the method for interacting with the screen.
        * @method _updateMouse
        * @private
        */
        private _updateMouse();
        /**
        * Evaluates where and what the mouse cursor is doing in relation to this box. Needs a little bit more love.
        * @method _evaluateMousePointer
        * @param pointer {MouseCursor}
        * @private
        */
        private _evaluateMousePointer(pointer);
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} A string representation of this object.
        * @publics
        */
        public toString(): string;
        /**
        * Destroys the input.
        * @method destory
        * @public
        */
        public destroy(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Components
*
*/ 
declare module Kiwi.Components {
    /**
    * The Sound Component is a class to assist with the creation and management of multiple pieces of audio that may exist on a single Entity. This class is NOT needed when dealing with audio but is instead provided to assist in dealing with audio.
    *
    * @class Sound
    * @extends Component
    * @namespace Kiwi.Components
    * @constructor
    * @param parent {Any} Who the sound component belongs to.
    * @return {Sound}
    */
    class Sound extends Kiwi.Component {
        constructor(parent: any);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * Contains a list of all of the Audio objects that are on this component.
        * @private
        * @type Audio[]
        * @private
        */
        private _audio;
        /**
        * Creates a new audio segment on this component.
        *
        * @method addSound
        * @param name {string} The name for this audio file. This is how you will access the audio from this component and so it should be unique.
        * @param key {string} The piece of audio that you want to use.
        * @param [volume=1] {number} The volume that the audio should be set to.
        * @param [loop=false] {boolean} If the audio should keep play again when it finishes playing.
        * @return {Audio}
        * @public
        */
        public addSound(name: string, key: string, volume?: number, loop?: boolean): Kiwi.Sound.Audio;
        /**
        * Removes the audio sementment with the name you have given.
        *
        * @method removeSound
        * @param name {string} The piece of audio you would like to remove.
        * @public
        */
        public removeSound(name: string): void;
        /**
        * Returns the Audio object for the sound that you pass.
        *
        * @method getSound
        * @param name {string} The piece of audio you would like to grab.
        * @return {Audio}
        * @public
        */
        public getSound(name: string): Kiwi.Sound.Audio;
        private _validate(name);
        /**
        * Plays the audio that you specify.
        *
        * @method play
        * @param name {string} The name of the audio file you would like to play.
        * @public
        */
        public play(name: string): void;
        /**
        * Stops the audio that you specify from playing.
        *
        * @method play
        * @param name {string} Name of the audio file you would like to stop.
        * @public
        */
        public stop(name: string): void;
        /**
        * Pauses the audio that you specify.
        *
        * @method play
        * @param name {string} The name of the audio you would like to pause.
        * @public
        */
        public pause(name: string): void;
        /**
        * Resumes the audio that you specify. Note: Audio can only resume if it was paused initially.
        *
        * @method play
        * @param name {string} The name of the audio you would like to resume.
        * @public
        */
        public resume(name: string): void;
        /**
        * Destroys this AudioComponent and all of the Audio objects it has.
        * @method destroy
        * @public
        */
        public destroy(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Components
*
*/ 
declare module Kiwi.Components {
    /**
    * Arcade Physics is an Optional Component that can be used when you are wanting to do basic physics collisions.
    * These have been ported from Flixel, so most function operate identically to the original flixel functions, though some
    * have been split into multiple functions. Generally where functions originally accepted
    * either groups or gameobjects within the same argument, the ported functions one or the other.
    * http://www.flixel.org/
    * http://www.adamatomic.com/
    *
    * @class ArcadePhysics
    * @constructor
    * @namespace Kiwi.Components
    * @param entity {Entity} The entity that this ArcadePhysics should be used on.
    * @param box {Box} The box component that holds the hitbox that should be used when resolving and calculating collisions.
    * @return {ArcadePhysics}
    * @extends Component
    *
    * @author Adam 'Atomic' Saltsman, Flixel
    *
    */
    class ArcadePhysics extends Kiwi.Component {
        constructor(entity: Kiwi.Entity, box?: Components.Box);
        /**
        * The transform component.
        * @property transform
        * @type Transform
        * @public
        */
        public transform: Kiwi.Geom.Transform;
        /**
        * The bounding box component that the collisions are going to be based off.
        * @property box
        * @type Box
        * @public
        */
        public box: Components.Box;
        /**
        * Whether an object will move/alter position after a collision.
        * @property immovable
        * @type boolean
        * @public
        */
        public immovable: boolean;
        /**
        * The basic speed of this object.
        * @property velocity
        * @type Point
        * @public
        */
        public velocity: Kiwi.Geom.Point;
        /**
        * The virtual mass of the object. Default value is 1.
        * Currently only used with <code>elasticity</code> during collision resolution.
        * Change at your own risk; effects seem crazy unpredictable so far!
        * @property mass
        * @type number
        * @public
        */
        public mass: number;
        /**
        * The bounciness of this object.  Only affects collisions.  Default value is 0, or "not bouncy at all."
        * @property elasticity
        * @type number
        * @public
        */
        public elasticity: number;
        /**
        * How fast the speed of this object is changing.
        * Useful for smooth movement and gravity.
        * @property acceleration
        * @type Point
        * @public
        */
        public acceleration: Kiwi.Geom.Point;
        /**
        * This isn't drag exactly, more like deceleration that is only applied
        * when acceleration is not affecting the sprite.
        * @property drag
        * @type Point
        * @public
        */
        public drag: Kiwi.Geom.Point;
        /**
        * If you are using <code>acceleration</code>, you can use <code>maxVelocity</code> with it
        * to cap the speed automatically (very useful!).
        * @property maxVelocity
        * @type Point
        * @public
        */
        public maxVelocity: Kiwi.Geom.Point;
        /**
        * This is how fast you want this sprite to spin.
        * @property angularVelocity
        * @type number
        * @public
        */
        public angularVelocity: number;
        /**
        * How fast the spin speed should change.
        * @property angularAcceleration
        * @type number
        * @public
        */
        public angularAcceleration: number;
        /**
        * Like <code>drag</code> but for spinning.
        * @property angularDrag
        * @type number
        * @public
        */
        public angularDrag: number;
        /**
        * Use in conjunction with <code>angularAcceleration</code> for fluid spin speed control.
        * @property maxAngular
        * @type number
        * @public
        */
        public maxAngular: number;
        /**
        * If the Entity that this component is a part of 'moves' or not, and thus if the physics should update the motion should update each frame.
        * @property moves
        * @type boolean
        * @default true
        * @public
        */
        public moves: boolean;
        /**
        * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface contacts.
        * Use bitwise operators to check the values stored here, or use touching(), justStartedTouching(), etc.
        * You can even use them broadly as boolean values if you're feeling saucy!
        * @property touching
        * @type number
        * @public
        */
        public touching: number;
        /**
        * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface contacts from the previous game loop step.
        * Use bitwise operators to check the values stored here, or use isTouching().
        * You can even use them broadly as boolean values if you're feeling saucy!
        * @property wasTouching
        * @type number
        * @public
        */
        public wasTouching: number;
        /**
        * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating collision directions.
        * Use bitwise operators to check the values stored here.
        * Useful for things like one-way platforms (e.g. allowCollisions = UP)
        * The accessor "solid" just flips this variable between NONE and ANY.
        * @property allowCollisions
        * @type number
        * @public
        */
        public allowCollisions: number;
        /**
        * Important variable for collision processing.
        * By default this value is set automatically during 'preUpdate()'.
        * @property last
        * @type Point
        * @public
        */
        public last: Kiwi.Geom.Point;
        /**
        * A boolean to indicate if this object is solid or not.
        * @property _solid
        * @type boolean
        * @private
        */
        private _solid;
        /**
        * A function that is to execute when this object overlaps with another.
        * @property _callbackFunction
        * @type Function
        * @default null
        * @private
        */
        private _callbackFunction;
        /**
        * The context that the callback method should have when it executes.
        * @property _callbackContext
        * @type Any
        * @private
        */
        private _callbackContext;
        /**
        * Returns a boolean indicating whether the or not the object is currently colliding on a particular side that is passed.
        * Use the collision constants (like LEFT, FLOOR, e.t.c) when passing sides.
        * @method touching
        * @param value [number] The collision constant of the side you want to check against.
        * @return boolean
        * @public
        */
        public isTouching(value: number): boolean;
        /**
        * Whether the object should collide with other objects or not.
        * For more control over what directions the object will collide from, use collision constants (like LEFT, FLOOR, etc)
        * and set the value of allowCollisions directly.
        * @method solid
        * @param [value] {boolean} If left empty, this will then just toggle between ANY and NONE.
        * @return boolean
        * @public
        */
        public solid(value?: boolean): boolean;
        /**
        * Sets up a callback function that will run when this object overlaps with another.
        *
        * @method setCallback
        * @param callbackFunction {Function}
        * @param callbackContext {Any}
        * @public
        */
        public setCallback(callbackFunction: any, callbackContext: any): void;
        /**
        * Returns the parent of this entity. Mainly used for executing callbacks.
        * @property parent
        * @type Entity
        * @public
        */
        public parent: Kiwi.Entity;
        /**
        * A static method for seperating two normal GameObjects on both the X and Y Axis's.
        * Both objects need to have both an ArcadePhysics Component and a Box component in order for the separate process to succeed.
        * This method is not recommended to be directly used but instead use a 'collide/overlaps' method instead.
        *
        * @method seperate
        * @static
        * @param object1 {Entity} The first GameObject you would like to seperate.
        * @param object2 {Entity} The second GameObject you would like to seperate from the first.
        * @return {boolean}
        * @public
        */
        static separate(object1: Kiwi.Entity, object2: Kiwi.Entity): boolean;
        /**
        * Separates two passed GameObjects on the x-axis.
        * Both objects need to have both an ArcadePhysics Component and a Box component in order for the separate process to succeed.
        * This method is not recommended to be directly used but instead use a 'collide/overlaps' method instead.
        *
        * @method seperateX
        * @param object1 {Entity} The first GameObject.
        * @param object2 {Entity} The second GameObject.
        * @return {boolean} Whether the objects in fact touched and were separated along the X axis.
        * @static
        * @public
        */
        static separateX(object1: Kiwi.Entity, object2: Kiwi.Entity): boolean;
        /**
        * Separated two GameObject on the y-axis. This method is executed from the 'separate' method.
        * Both objects need to have both an ArcadePhysics Component and a Box component in order for the separate process to succeed.
        * This method is not recommended to be directly used but instead use a 'collide/overlaps' method instead.
        *
        * @method seperateY
        * @param object1 {Entity} The first GameObject.
        * @param object2 {Entity} The second GameObject.
        * @return {boolean} Whether the objects in fact touched and were separated along the Y axis.
        * @static
        * @public
        */
        static separateY(object1: Kiwi.Entity, object2: Kiwi.Entity): boolean;
        /**
        * Separates a GameObject from a series of passed Tiles that lie on a TileMapLayer.
        * The gameobject needs to have a Box Component and an ArcadePhysics Component.
        * This method is not recommended to be directly used but instead use the 'overlapsTiles' method instead.
        *
        * @method separateTiles
        * @param object {Entity} The GameObject you are wanting to separate from a tile.
        * @param layer {TileMapLayer} The TileMapLayer that the tiles belong on.
        * @param tiles {Object[]}
        * @return {Boolean} If any separation occured.
        * @public
        * @static
        */
        static separateTiles(object: Kiwi.Entity, layer: Kiwi.GameObjects.Tilemap.TileMapLayer, tiles: any): boolean;
        /**
        * Separates a GameObjects from an Array of Tiles on the x-axis.
        * @method separateTilesX
        * @param object {Entity} The GameObject you are wanting to separate from a tile.
        * @param layer {TileMapLayer} The TileMapLayer that the tiles belong on.
        * @param tile {Object}.
        * @return {Boolean} If any separation occured.
        * @public
        * @static
        */
        static separateTilesX(object: Kiwi.Entity, layer: Kiwi.GameObjects.Tilemap.TileMapLayer, tile: any): boolean;
        /**
        * Separates a GameObjects from an Array of Tiles on the y-axis.
        * @method separateTilesY
        * @param object {Entity} The GameObject you are wanting to separate from a tile.
        * @param layer {TileMapLayer} The TileMapLayer that the tiles belong on.
        * @param tiles {Object[]} The tiles which are overlapping with the GameObject.
        * @return {Boolean} If any separation occured.
        * @public
        * @static
        */
        static separateTilesY(object: Kiwi.Entity, layer: any, tile: any): boolean;
        /**
        * A method to check to see if any Tiles with in this parent TileMapLayer overlaps with a GameObject passed.
        * If seperateObjects is true it will seperate the two entities based on their bounding box.
        * ONLY works if parent of the ArcadePhysics component which is calling this method is a TileMapLayer.
        * Note: The GameObject passed must contain a box component and only if you want to separate the two objects must is ALSO contain an ArcadePhysics component.
        *
        * @method overlapsTile
        * @param gameObject {Entity} The GameObject you would like to separate with this one.
        * @param [separateObjects=false] {Boolean} If you want the GameObject to be separated from any tile it collides with.
        * @param [collisionType=ANY] {Number} If you want the GameObject to only check for collisions from a particular side of tiles. ANY by default.
        * @return {Boolean} If any gameobject overlapped.
        * @public
        */
        public overlapsTiles(gameObject: Kiwi.Entity, separateObjects?: boolean, collisionType?: number): boolean;
        /**
        * A method to check to see if the parent of this physics component overlaps with another Kiwi.Entity.
        * If seperateObjects is true it will seperate the two entities based on their bounding box.
        * Note: The GameObject passed must contain a box component and only if you want to separate the two objects must is ALSO contain an ArcadePhysics component.
        * Also: Not to be used for separation from tiles.
        *
        * @method overlaps
        * @param gameObject {Entity}
        * @param [seperateObjects=false] {boolean}
        * @return {boolean}
        * @public
        */
        public overlaps(gameObject: Kiwi.Entity, separateObjects?: boolean): boolean;
        /**
        * A method to check to see if the parent of this physics component overlaps with another individual in a Kiwi Group.
        *
        * @method overlapsGroup
        * @param group {Group}
        * @param [seperateObjects=false] {boolean}
        * @return { boolean }
        * @public
        */
        public overlapsGroup(group: Kiwi.Group, separateObjects?: boolean): boolean;
        /**
        * A method to check to see if the parent of this physics component overlaps with a Entity that is held in an array.
        * @method overlapsArray
        * @param array {Array} The array of GameObjects you want to check.
        * @param [separateObjects=false] {boolean} If when the objects collide you want them to seperate outwards.
        * @return {boolean} If a collision was detected or not.
        * @public
        */ 
        public overlapsArray(array: any[], separateObjects?: boolean): boolean;
        /**
        * Computes the velocity based on the parameters passed.
        * @method computeVelocity
        * @static
        * @param velocity {number}
        * @param [acceleration=0] {number}
        * @param [drag=0] {number}
        * @param [max=10000] {number}
        * @return {Number} The new velocity
        * @public
        */
        static computeVelocity(velocity: number, acceleration?: number, drag?: number, max?: number): number;
        /**
        * Updates the position of this object. Automatically called if the 'moves' parameter is true.
        * @method updateMotion
        * @public
        */
        public updateMotion(): void;
        /**
        * The Update loop of the physics component
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Removes all properties that refer to other objects or outside of this class in order to flag this object for garbage collection.
        * @method destroy
        * @public
        */
        public destroy(): void;
        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * A Static method to check to see if two objects collide or not. Returns a boolean indicating whether they overlaped or not.
        *
        * @method collide
        * @static
        * @public
        * @param gameObject1 {Kiwi.GameObjects.Entity} The first game object.
        * @param gameObject2 {Kiwi.GameObjects.Entity} The second game object.
        * @param [seperate=true] {boolean} If the two gameobjects should seperated when they collide.
        * @return {boolean}
        */
        static collide(gameObject1: Kiwi.Entity, gameObject2: Kiwi.Entity, seperate?: boolean): boolean;
        /**
        * A Static method to check to see if a single entity collides with a group of entities. Returns a boolean indicating whether they overlaped or not.
        *
        * @method collideGroup
        * @static
        * @public
        * @param gameObject {Kiwi.GameObjects.Entity}
        * @param group {Any} This could be either an Array of GameObjects or a Group containing members.
        * @param [seperate=true] {boolean}
        * @return {boolean}
        * @public
        */
        static collideGroup(gameObject: Kiwi.Entity, group: Kiwi.Group, seperate?: boolean): boolean;
        /**
        * A Static method to check to see if a group of entities overlap with another group of entities. Returns a boolean indicating whether they overlaped or not.
        *
        * @method collideGroupGroup
        * @static
        * @public
        * @param group1 {Any} This can either be an array or a Group.
        * @param group2 {Any} Also could either be an array or a Group.
        * @param [seperate=true] {boolean}
        * @return {boolean}
        */
        static collideGroupGroup(group1: Kiwi.Group, group2: Kiwi.Group, seperate?: boolean): boolean;
        /**
        * A Static method to that checks to see if two objects overlap. Returns a boolean indicating whether they did or not.
        *
        * @method overlaps
        * @static
        * @public
        * @param gameObject1 {Kiwi.GameObjects.Entity}
        * @param gameObject2 {Kiwi.GameObjects.Entity}
        * @param [separateObjects=true] {boolean}
        * @return {boolean}
        */
        static overlaps(gameObject1: Kiwi.Entity, gameObject2: Kiwi.Entity, separateObjects?: boolean): boolean;
        /**
        * A Static method to that checks to see if a single object overlaps with a group of entities. Returns a boolean indicating whether they did or not.
        *
        * @method overlapsObjectGroup
        * @static
        * @param gameObject {Entity}
        * @param group {Group}
        * @param [seperateObjects=true] {boolean} If they overlap should the seperate or not
        * @return {boolean}
        * @public
        */
        static overlapsObjectGroup(gameObject: Kiwi.Entity, group: Kiwi.Group, separateObjects?: boolean): boolean;
        /**
        * A Static method that checks to see if any objects in a group overlap with objects in another group.
        *
        * @method overlaps
        * @static
        * @param group1 {Group} The first
        * @param group2 {Any}
        * @param [seperate=true] {boolean} If they overlap should the seperate or not
        * @return {boolean}
        * @public
        */
        static overlapsGroupGroup(group1: Kiwi.Group, group2: Kiwi.Group, separateObjects?: boolean): boolean;
        /**
        * A Statuc method that checks to see if any objects from an Array collide with a Kiwi Group members.
        *
        * @method overlapsArrayGroup
        * @param array {Array} An array you want to check collide.
        * @param group {Group} A group of objects you want to check overlaps.
        * @param [seperateObjects=true] {Boolean} If when a collision is found the objects should seperate out.
        * @return {Boolean}
        * @static
        */
        static overlapsArrayGroup(array: any[], group: Kiwi.Group, separateObjects?: boolean): boolean;
        /**
        * How often the motion should be updated.
        * @property updateInterval
        * @static
        * @default 1 / 10
        * @type number
        * @public
        */
        static updateInterval: number;
        /**
        * Generic value for "left" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
        * @property LEFT
        * @type number
        * @default 0x0001
        * @public
        * @static
        */
        static LEFT: number;
        /**
        * Generic value for "right" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
        * @property RIGHT
        * @type number
        * @default 0x0010
        * @public
        * @static
        */
        static RIGHT: number;
        /**
        * Generic value for "up" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
        * @property UP
        * @type number
        * @default 0x0100
        * @public
        * @static
        */
        static UP: number;
        /**
        * Generic value for "down" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
        * @property DOWN
        * @type number
        * @default 0x1000
        * @public
        * @static
        */
        static DOWN: number;
        /**
        * Special-case constant meaning no collisions, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property NONE
        * @type number
        * @default 0
        * @public
        * @static
        */
        static NONE: number;
        /**
        * Special-case constant meaning up, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property CEILING
        * @type number
        * @default 0x0100
        * @public
        * @static
        */
        static CEILING: number;
        /**
        * Special-case constant meaning down, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property FLOOR
        * @type number
        * @default 0x1000
        * @public
        * @static
        */
        static FLOOR: number;
        /**
        * Special-case constant meaning only the left and right sides, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property WALL
        * @type number
        * @default 0x0011
        * @public
        * @static
        */
        static WALL: number;
        /**
        * Special-case constant meaning any direction, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property ANY
        * @type number
        * @default 0x1111
        * @public
        * @static
        */
        static ANY: number;
        /**
        * Handy constant used during collision resolution (see <code>separateX()</code> and <code>separateY()</code>).
        * @property OVERLAP_BIAS
        * @type number
        * @default 4
        * @public
        * @static
        */
        static OVERLAP_BIAS: number;
    }
}
/**
*
* @module Kiwi
* @submodule Files
*
*/
declare module Kiwi.Files {
    /**
    * Used for the loading of files and game assets. This usually happens when a State is at the 'loading' stage (executing the 'preload' method).
    *
    * @class Loader
    * @namespace Kiwi.Files
    * @constructor
    * @param game {Game} The game that this loader belongs to.
    * @return {Loader} This Object
    *
    */
    class Loader {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this loader belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * A list of all of the files that need to be loaded.
        * @property _fileList
        * @type File[]
        * @private
        */
        private _fileList;
        /**
        * A list of all of the files that have been loaded.
        * @property _loadList
        * @type File[]
        * @private
        */
        private _loadList;
        /**
        * A callback that is to be called while the loader is in the process of loading files.
        * @property _onProgressCallback
        * @type Function
        * @private
        */
        private _onProgressCallback;
        /**
        * A callback that is to be called when the loader has finished loading files.
        * @property _onCompleteCallback
        * @type Function
        * @private
        */
        private _onCompleteCallback;
        /**
        * If a real byte value calculation will be made prior to the load (much smoother progress bar but costs HEAD calls x total file count)
        * @property _calculateBytes
        * @type boolean
        * @default true
        * @private
        */
        private _calculateBytes;
        /**
        * Total number of files to be loaded
        * @property _fileTotal
        * @type Number
        * @private
        */
        private _fileTotal;
        /**
        * The most recently loaded file (out of the total)
        * @property _currentFile
        * @type Number
        * @private
        */
        private _currentFile;
        /**
        * Total file size (in bytes) of all files to be loaded - only set if calculateBytes is true
        * @property _bytesTotal
        * @type Number
        * @private
        */
        private _bytesTotal;
        /**
        * Total number of bytes loaded so far (out of _bytesTotal)
        * @property _bytesLoaded
        * @type Number
        * @private
        */
        private _bytesLoaded;
        /**
        * Total number of bytes loaded from last completed file
        * @property _bytesCurrent
        * @type Number
        * @private
        */
        private _bytesCurrent;
        /**
        * When using the tag loader we don't have a byte total, just a X of files total - this holds the percentage each file from that total is worth
        * @property _fileChunk
        * @type Number
        * @private
        */
        private _fileChunk;
        /**
        * The total % of the current queue that has been loaded
        * @property _percentLoaded
        * @type Number
        * @private
        */
        private _percentLoaded;
        /**
        * Everything in the queue loaded?
        * @property _complete
        * @type boolean
        * @private
        */
        private _complete;
        /**
        * The boot method is executed when the DOM has successfully loaded and we can now start the game.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Initialise the properities that are needed on this loader.
        * @method init
        * @param [progress=null] {Any} Progress callback method.
        * @param [complete=null] {Any} Complete callback method.
        * @param [calculateBytes=false] {boolean}
        * @public
        */
        public init(progress?: any, complete?: any, calculateBytes?: boolean): void;
        /**
        * Creates a new file for an image and adds a the file to loading queue.
        * @method addImage
        * @param key {String} The key for the file.
        * @param url {String} The url of the image to load.
        * @param [width] {number} The width of the cell on the image to use once the image is loaded.
        * @param [height] {number} The height of the cell on the image to use once the image is loaded.
        * @param [offsetX] {number} An offset on the x axis of the cell.
        * @param [offsetY] {number} An offset of the y axis of the cell.
        * @param [storeAsGlobal=true] {boolean} If the image should be stored globally or not.
        * @public
        */
        public addImage(key: string, url: string, width?: number, height?: number, offsetX?: number, offsetY?: number, storeAsGlobal?: boolean): void;
        /**
        * Creates a new file for a spritesheet and adds the file to the loading queue.
        * @method addSpriteSheet
        * @param key {String} The key for the file.
        * @param url {String} The url of the image to load.
        * @param frameWidth {number} The width of a single cell in the spritesheet.
        * @param frameHeight {number} The height of a single cell in the spritesheet.
        * @param [numCells] {number} The number of cells that are in this spritesheet.
        * @param [rows] {number} The number of cells that are in a row.
        * @param [cols] {number} The number of cells that are in a column.
        * @param [sheetOffsetX] {number} The offset of the whole spritesheet on the x axis.
        * @param [sheetOffsetY] {number} The offset of the whole spritesheet on the y axis.
        * @param [cellOffsetX] {number} The spacing between each cell on the x axis.
        * @param [cellOffsetY] {number} The spacing between each cell on the y axis.
        * @param [storeAsGlobal=true] {boolean}
        * @public
        */
        public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number, storeAsGlobal?: boolean): void;
        /**
        * Creates new file's for loading a texture atlas and adds those files to the loading queue.
        * @method addTextureAtlas
        * @param key {String} The key for the image file.
        * @param imageUrl {String} The url of the image to load.
        * @param jsonID {String} A key for the JSON file.
        * @param jsonURL {String} The url of the json file to load.
        * @param [storeAsGlobal=true] {Boolean} If hte files should be stored globally or not.
        * @public
        */
        public addTextureAtlas(key: string, imageURL: string, jsonID: string, jsonURL: string, storeAsGlobal?: boolean): void;
        /**
        * Creates a new File to store a audio piece.
        * This method firstly checks to see if the AUDIO file being loaded is supported or not by the browser/device before adding it to the loading queue.
        * You can override this behaviour and tell the audio data to load even if not supported by setting the 'onlyIfSupported' boolean to false.
        *
        * @method addAudio
        * @param key {String} The key for the audio file.
        * @param url {String} The url of the audio to load.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @param [onlyIfSupported=true] {Boolean} If the audio file should only be loaded if Kiwi detects that the audio file could be played. Set this to fa
        * @public
        */
        public addAudio(key: string, url: string, storeAsGlobal?: boolean, onlyIfSupported?: boolean): void;
        /**
        * Creates a new File to store JSON and adds it to the loading queue.
        * @method addJSON
        * @param key {String} The key for the file.
        * @param url {String} The url to the json file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @public
        */
        public addJSON(key: string, url: string, storeAsGlobal?: boolean): void;
        /**
        * Creates a new File to store XML and adds it to the loading queue.
        * @method addXML
        * @param key {String} The key for the file.
        * @param url {String} The url to the xml file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @public
        */
        public addXML(key: string, url: string, storeAsGlobal?: boolean): void;
        /**
        * Creates a new File for a Binary file and adds it to the loading queue.
        * @method addBinaryFile
        * @param key {String} The key for the file.
        * @param url {String} The url to the Binary file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @public
        */
        public addBinaryFile(key: string, url: string, storeAsGlobal?: boolean): void;
        /**
        * Creates a new File to store a text file and adds it to the loading queue.
        * @method addTextFile
        * @param key {String} The key for the file.
        * @param url {String} The url to the text file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @public
        */
        public addTextFile(key: string, url: string, storeAsGlobal?: boolean): void;
        /**
        * Loops through all of the files that need to be loaded and start the load event on them.
        * @method startLoad
        * @public
        */
        public startLoad(): void;
        /**
        * [DESCRIPTION REQUIRED]
        * @method getNextFileSize
        * @private
        */
        private getNextFileSize();
        /**
        * [DESCRIPTION REQUIRED]
        * @method addToBytesTotal
        * @param file {File}
        * @private
        */
        private addToBytesTotal(file);
        /**
        * Starts the loading of the next file in the list.
        * @method nextFile
        * @private
        */
        private nextFile();
        /**
        * [DESCRIPTION REQUIRED]
        * @method fileLoadProgress
        * @param file {File}
        * @private
        */
        private fileLoadProgress(file);
        /**
        * [DESCRIPTION REQUIRED]
        * @method fileLoadComplete
        * @param file {File}
        * @private
        */
        private fileLoadComplete(file);
        /**
        * Returns the total number of bytes that have been loaded so far.
        * @method getBytesLoaded
        * @return {Number}
        * @public
        */
        public getBytesLoaded(): number;
        /**
        * Returns a percentage of the amount that has been loaded so far.
        * @method getPercentLoaded
        * @return {Number}
        * @public
        */
        public getPercentLoaded(): number;
        /**
        * If true (and xhr/blob is available) the loader will get the bytes total of each file in the queue to give a much more accurate progress report during load
        If false the loader will use the file number as the progress value, i.e. if there are 4 files in the queue progress will get called 4 times (25, 50, 75, 100)
        * @method calculateBytes
        * @param [value] {boolean}
        * @return {boolean}
        * @public
        */
        public calculateBytes(value?: boolean): boolean;
        /**
        * [DESCRIPTION REQUIRED]
        * @method complete
        * @return {boolean}
        * @public
        */
        public complete(): boolean;
    }
}
/**
*
* @module Kiwi
* @submodule Files
* @main Files
*/
declare module Kiwi.Files {
    /**
    * Holds a reference to all of the data Files (json, xml, e.t.c) that are accessible on the State that this DataLibrary is on.
    *
    * @class DataLibrary
    * @namespace Kiwi.Files
    * @constructor
    * @param game {Game} The game that this DataLibrary belongs to.
    * @return {DataLibrary}
    *
    */
    class DataLibrary {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this DataLibrary belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * Contains all of the data that this available.
        * @property textures
        * @type Object
        * @public
        */
        public data: any;
        /**
        * Resets the Data Library and makes it ready for the next state.
        * @method clear
        * @public
        */
        public clear(): void;
        /**
        * Adds a new data file to the DataLibrary.
        * @method add
        * @param dataFile {File}
        * @public
        */
        public add(dataFile: Files.File): void;
        /**
        * Rebuild the library from a fileStore. Clears the library and repopulates it.
        * @method rebuild
        * @param {Kiwi.Files.FileStore} fileStore
        * @param {Kiwi.State} state
        * @public
        */
        public rebuild(fileStore: Files.FileStore, state: Kiwi.State): void;
    }
}
/**
*
* @module Kiwi
* @submodule Files
*
*/
declare module Kiwi.Files {
    /**
    * Handles the loading of an external data file via a tag loader OR xhr + arraybuffer, and optionally saves to the file store.
    * Also can contain information about the file (like file size, last modified, e.t.c.) either after it has been loaded
    * OR if you use the 'getFileDetails' method and the properties will then be set.
    *
    * @class File
    * @namespace Kiwi.Files
    * @constructor
    * @param game {Game} The game that this file belongs to.
    * @param dataType {Number} The type of file that is being loaded. For this you can use the STATIC properties that are located on this class for quick code completion.
    * @param path {String} The location of the file that is to be loaded.
    * @param [name=''] {String} A name for the file. If no name is specified then the files name will be used.
    * @param [saveToFileStore=true] {Boolean} If the file should be saved on the file store or not.
    * @param [storeAsGlobal=true] {Boolean} If this file should be stored as a global file, or if it should be destroyed when this state gets switched out.
    * @return {File}
    *
    */
    class File {
        constructor(game: Kiwi.Game, dataType: number, path: string, name?: string, saveToFileStore?: boolean, storeAsGlobal?: boolean);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The state that added the entity - or null if it was added as global
        * @property ownerState
        * @type Kiwi.State
        * @public
        */
        public ownerState: Kiwi.State;
        /**
        * Any tags that are on this file. This can be used to grab files/objects on the whole game that have these particular tag.
        * @property _tags
        * @type String[]
        * @default []
        * @private
        */
        private _tags;
        /**
        * Adds a new tag to this file.
        * @method addTag
        * @param tag {String} The tag that you would like to add
        * @public
        */
        public addTag(tag: string): void;
        /**
        * Removes a tag from this file.
        * @method removeTag
        * @param tag {String} The tag that is to be removed.
        * @public
        */
        public removeTag(tag: string): void;
        /**
        * Checks to see if a tag that is passed exists on this file and returns a boolean that is used as a indication of the results. True means that the tag exists on this file.
        * @method hasTag
        * @param tag {String} The tag you are checking to see exists.
        * @return {Boolean} If the tag does exist on this file or not.
        * @public
        */
        public hasTag(tag: string): boolean;
        /**
        * A STATIC property that has the number associated with the IMAGE Datatype.
        * @property IMAGE
        * @type number
        * @static
        * @final
        * @default 0
        * @public
        */
        static IMAGE: number;
        /**
        * A STATIC property that has the number associated with the SPRITE_SHEET Datatype.
        * @property SPRITE_SHEET
        * @type number
        * @static
        * @final
        * @default 1
        * @public
        */
        static SPRITE_SHEET: number;
        /**
        * A STATIC property that has the number associated with the TEXTURE_ATLAS Datatype.
        * @property TEXTUREATLAS
        * @type number
        * @static
        * @final
        * @default 2
        * @public
        */
        static TEXTURE_ATLAS: number;
        /**
        * A STATIC property that has the number associated with the AUDIO Datatype.
        * @property AUDIO
        * @type number
        * @static
        * @final
        * @default 3
        * @public
        */
        static AUDIO: number;
        /**
        * A STATIC property that has the number associated with the JSON Datatype.
        * @property JSON
        * @type number
        * @static
        * @final
        * @default 4
        * @public
        */
        static JSON: number;
        /**
        * A STATIC property that has the number associated with the XML Datatype.
        * @property XML
        * @type number
        * @static
        * @final
        * @default 5
        * @public
        */
        static XML: number;
        /**
        * A STATIC property that has the number associated with the BINARY_DATA Datatype.
        * @property BINARY_DATA
        * @type number
        * @static
        * @final
        * @default 6
        * @public
        */
        static BINARY_DATA: number;
        /**
        * A STATIC property that has the number associated with the TEXT_DATA Datatype.
        * @property TEXT_DATA
        * @type number
        * @static
        * @final
        * @default 7
        * @public
        */
        static TEXT_DATA: number;
        /**
        * The game that this file belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * The XMLHttpRequest object. This only has a value if the xhr method of load is being used, otherwise this is null.
        * @property _xhr
        * @type XMLHttpRequest
        * @private
        */
        private _xhr;
        /**
        * The file store that this file is a part of.
        * @property _fileStore
        * @type FileStore
        * @private
        */
        private _fileStore;
        /**
        * Used to determine if this file should be saved to the file store or not.
        * @property _saveToFileStore
        * @type boolean
        * @default true
        * @private
        */
        private _saveToFileStore;
        /**
        * If when loading the file in we have loaded the file in using a tag loader (older browsers) or we are using the an XHR loader + array buffer.
        * By default we use the tag loader and only used the second method if the browser supports it.
        * @property _useTagLoader
        * @type boolean
        * @default true
        * @private
        */
        private _useTagLoader;
        /**
        * Holds the type of data that is being loaded. This should be used with the STATIC properties that hold the various datatypes that can be loaded.
        * @property dataType
        * @type String
        * @public
        */
        public dataType: number;
        /**
        * The 'key' is the user defined name and the users way of accessing this file once loaded.
        * @property key
        * @type String
        * @public
        */
        public key: string;
        /**
        * The name of the file being loaded.
        * @property fileName
        * @type String
        * @public
        */
        public fileName: string;
        /**
        * The location of where the file is placed without the file itself (So without the files name).
        * Example: If the file you are load is located at 'images/awesomeImage.png' then the filepath will be 'images/'
        * @property filePath
        * @type String
        * @public
        */
        public filePath: string;
        /**
        * The type of file that is being loaded.
        * Is only ever given a value when used with the XHR method of loading OR if you use 'getFileDetails' before hand.
        * The value is based off of the 'Content-Type' of the XHR's response header returns.
        * @property fileType
        * @type String
        * @public
        */
        public fileType: string;
        /**
        * The extension of the file that is being loaded.
        * This is based upon what the file path that the developer (you) specify.
        * @property fileExtension
        * @type String
        * @public
        */
        public fileExtension: string;
        /**
        * The full filepath including the file itself.
        * @property fileURL
        * @type String
        * @public
        */
        public fileURL: string;
        /**
        * The size of the file that was/is being loaded.
        * Only has a value when the file was loaded by the XHR method OR you request the file information before hand using 'getFileDetails'.
        * @property fileSize
        * @type Number
        * @default 0
        * @public
        */
        public fileSize: number;
        /**
        * The Entity Tag that is assigned to the file. O
        * Only has a value when either using the XHR loader OR when requesting the file details.
        * @property ETag
        * @type String
        * @public
        */
        public ETag: string;
        /**
        * The last date/time that this file was last modified.
        * Only has a value when using the XHR method of loading OR when requesting the file details.
        * @property lastModified
        * @type String
        * @default ''
        * @public
        */
        public lastModified: string;
        /**
        * The time at which the loading started. Only has a value when the XHR method of loading is in use.
        * @property timeStarted
        * @type Number
        * @default 0
        * @public
        */
        public timeStarted: number;
        /**
        * The time at which the load finished. Only has a value if loading the file was successful and when the XHR method of loading is in use.
        * @property timeFinished
        * @type Number
        * @default 0
        * @public
        */
        public timeFinished: number;
        /**
        * The duration or how long it took to load the file. In milliseconds.
        * @property duration
        * @type Number
        * @default 0
        * @public
        */
        public duration: number;
        /**
        * If the loading of the file failed or encountered an error.
        * @property hasError
        * @type boolean
        * @default false
        * @public
        */
        public hasError: boolean;
        /**
        * If the loading was a success or not.
        * @property success
        * @type boolean
        * @public
        */
        public success: boolean;
        /**
        * Holds the error (if there was one) when loading the file.
        * @property error
        * @type Any
        * @public
        */
        public error: any;
        /**
        * A method that is to be executed when this file has finished loading.
        * @property onCompleteCallback
        * @type Any
        * @default null
        * @public
        */
        public onCompleteCallback: any;
        /**
        * A method that is to be executed while this file is loading.
        * @property onProgressCallback
        * @type Any
        * @default null
        * @public
        */
        public onProgressCallback: any;
        /**
        * The time at which progress in loading the file was last occurred.
        * @property lastProgress
        * @type Number
        * @public
        */
        public lastProgress: number;
        /**
        * The amount of percent loaded the file is. This is out of 100.
        * @property percentLoaded
        * @type Number
        * @public
        */
        public percentLoaded: number;
        /**
        * The particular piece of data that the developer wanted loaded. This is in a format that is based upon the datatype passed.
        * @property data
        * @type Any
        */
        public data: any;
        /**
        * A dictionary, stores any information relating to this file.
        * Is useful when loading images that are to be used as a spritesheet or texture atlas.
        * @property data
        * @type Any
        * @public
        */
        public metadata: any;
        /**
        * An indication of if this file is texture. This is READ ONLY.
        * @property isTexture
        * @type boolean
        * @public
        */
        public isTexture : boolean;
        /**
        * An indication of if this file is a piece of audio. This is READ ONLY.
        * @property isAudio
        * @type boolean
        * @public
        */
        public isAudio : boolean;
        /**
        * An indication of if this file is data. This is READ ONLY.
        * @property isData
        * @type boolean
        * @public
        */
        public isData : boolean;
        /**
        * Starts the loading process for this file.
        * @method load
        * @param [onCompleteCallback=null] {Any} The callback method to execute when this file has loaded.
        * @param [onProgressCallback=null] {Any} The callback method to execute while this file is loading.
        * @param [customFileStore=null] {Any} A custom filestore that is file should be added to.
        * @param [maxLoadAttempts] {Number} The maximum amount of times to try and load this file.
        * @param [timeout] {Number} The timeout to use when loading the file. Overrides the default timeout if passed otherwise uses the default 2000 milliseconds.
        * @public
        */
        public load(onCompleteCallback?: any, onProgressCallback?: any, customFileStore?: Files.FileStore, maxLoadAttempts?: number, timeout?: number): void;
        /**
        * Is executed when this file starts loading.
        * Gets the time and initalised properties that are used across both loading methods.
        * @method start
        * @private
        */
        private start();
        /**
        * Is executed when this file stops loading. Used across all loading methods.
        * @method stop
        * @private
        */
        private stop();
        /**
        * Handles the loading of the file when using the tag loader method.
        * Only supports the IMAGES and AUDIO files.
        * @method tagLoader
        * @private
        */
        private tagLoader();
        /**
        * Is executed when the tag loader changes its ready state.
        * @method tagLoaderOnReadyStateChange
        * @param {Any} event
        * @private
        */
        private tagLoaderOnReadyStateChange(event);
        /**
        * Is executed when the tag loader encounters a error that stops it from loading.
        * @method tagLoaderOnError
        * @param {Any} event
        * @private
        */
        private tagLoaderOnError(event);
        /**
        * Is executed when an audio file can play the whole way through with stopping to load.
        * @method tagLoaderProgressThrough
        * @param {Any} event
        * @private
        */
        private tagLoaderProgressThrough(event);
        /**
        * Is executed when iOS (or another device) is being used and the audio is 'locked'.
        * 'Fakes' the loading and tells the rest of the game to carry on.
        * @method tagLoaderIOSLoad
        * @private
        */
        private tagLoaderAudioLocked();
        /**
        * Is executed when the file has successfully loaded.
        * @method tagLoaderOnLoad
        * @param {Any} event
        * @private
        */
        private tagLoaderOnLoad(event);
        /**
        * The status of this file that is being loaded.
        * Only used/has a value when the file was/is being loaded by the XHR method.
        * @property status
        * @type Number
        * @default 0
        * @public
        */
        public status: number;
        /**
        * The status piece of text that the XHR returns.
        * @property statusText
        * @type String
        * @default ''
        * @public
        */
        public statusText: string;
        /**
        * The number of bytes that have currently been loaded.
        * This can used to create progress bars but only has a value when using the XHR method of loading.
        * @property bytesLoaded
        * @type Number
        * @default 0
        * @public
        */
        public bytesLoaded: number;
        /**
        * The total number of bytes that the file consists off.
        * Only has a value when using the XHR method of loading.
        * @property bytesTotal
        * @type Number
        * @default 0
        * @public
        */
        public bytesTotal: number;
        /**
        * The ready state of the XHR loader whilst loading.
        * @property readyState
        * @type Number
        * @default 0
        * @public
        */
        public readyState: number;
        /**
        * The default number of milliseconds that the XHR should wait before timing out.
        * Set this to NULL if you want it to not timeout.
        * @property timeOutDelay
        * @type Number
        * @default 2000
        * @public
        */
        public timeOutDelay: number;
        /**
        * If this file has timeout when it was loading.
        * @property hasTimedOut
        * @type boolean
        * @default false
        * @public
        */
        public hasTimedOut: boolean;
        /**
        * If the file timed out or not.
        * @property timedOut
        * @type Number
        * @default 0
        * @public
        */
        public timedOut: number;
        /**
        * The number of attempts at loading there have currently been at loading the file.
        * This is only used with XHR methods of loading.
        * @property attemptCounter
        * @type Number
        * @public
        */
        public attemptCounter: number;
        /**
        * The maximum attempts at loading the file that there is allowed.
        * Only used with XHR methods of loading.
        * @property maxLoadAttempts
        * @type Number
        * @default 2
        * @public
        */
        public maxLoadAttempts: number;
        /**
        * The response that is given by the XHR loader when loading is complete.
        * @property buffer
        * @type Any
        * @public
        */
        public buffer: any;
        /**
        * Sets up a XHR loader based on the properties of this file.
        * @method xhrLoader
        * @private
        */
        private xhrLoader();
        /**
        * Is executed when the XHR loader has changed its ready state.
        * @method xhrOnReadyStateChange
        * @param {Any} event
        * @private
        */
        private xhrOnReadyStateChange(event);
        /**
        * Is executed when the XHR loader starts to load the file.
        * @method xhrOnLoadStart
        * @param {Any} event
        * @private
        */
        private xhrOnLoadStart(event);
        /**
        * Runs when the XHR loader aborts the load for some reason.
        * @method xhrOnAbort
        * @param {Any} event
        * @private
        */
        private xhrOnAbort(event);
        /**
        * Runs when the XHR loader encounters a error.
        * @method xhrOnError
        * @param {Any} event
        * @private
        */
        private xhrOnError(event);
        /**
        * Is executed when the xhr
        * @method xhrOnTimeout
        * @param {Any} event
        * @private
        */
        private xhrOnTimeout(event);
        /**
        * Is execute whilst loading of the file is occuring. Updates the number of bytes that have been loaded and percentage loaded.
        * @method xhrOnProgress
        * @param {Any} event
        * @private
        */
        private xhrOnProgress(event);
        /**
        * Once the file has finished downloading (or pulled from the browser cache) this onload event fires.
        * @method xhrOnLoad
        * @param {event} The XHR event
        * @private
        */
        private xhrOnLoad(event);
        /**
        * Handles the processing of the files information when it was loaded via the xhr + arraybuffer method.
        * Is only executed when the loading was a success
        this._xhr.onload = (event) => this.xhrOnLoad(event);.
        * @method processFile
        * @private
        */
        private processFile();
        /**
        * Creates a new Binary Large Object for the data that was loaded through the XHR.
        * @method createBlob
        * @private
        */
        private createBlob();
        /**
        * Revokes the object url that was added to the window when creating the image.
        * Also tells the File that the loading is now complete.
        * @method revoke
        * @private
        */
        private revoke();
        /**
        * Executed when this file has completed loading (this could be due to it failing or succeeding).
        * @method parseComplete
        * @private
        */
        private parseComplete();
        /**
        * The maximum number of load attempts when requesting the file details that will be preformed.
        * @property maxHeadLoadAttempts
        * @type number
        * @default 1
        * @public
        */
        public maxHeadLoadAttempts: number;
        /**
        * Attempts to make the file send a XHR HEAD request to get information about the file that is going to be downloaded.
        * This is particularly useful when you are wanting to check how large a file is before loading all of the content.
        * @method getFileDetails
        * @param [callback=null] {function} The callback to send this FileInfo object to.
        * @param [maxLoadAttempts=1] {number} The maximum amount of load attempts. Only set this if it is different from the default.
        * @param [timeout=this.timeOutDelay] {number} The timeout delay. By default this is the same as the timeout delay property set on this file.
        * @private
        */
        public getFileDetails(callback?: any, maxLoadAttempts?: number, timeout?: number): void;
        /**
        * Sends a XHR request for the HEAD information of this file.
        * Useful as it can will contain the information about the file before loading the actual file.
        * @method sendXHRHeadRequest
        * @param timeout {Number} The timeout delay.
        * @private
        */
        private sendXHRHeadRequest(timeout);
        /**
        * Is executed when the XHR head request timed out.
        * @method xhrHeadOnTimeout
        * @param event {Any}
        * @private
        */
        private xhrHeadOnTimeout(event);
        /**
        * Is executed when this XHR head request has a error.
        * @method xhrHeadOnError
        * @param event {Any} The event containing the reason why this event failed.
        * @private
        */
        private xhrHeadOnError(event);
        /**
        * Process the response headers received.
        * @method getResponseHeaders
        * @param event {Any} The XHR event
        * @private
        */
        private getXHRResponseHeaders(event);
        /**
        * Used to finialise the XHR Head Request (used with get File Details).
        * When passed an outcome this method will see if it can 'try again' otherwise it will just finish the attempt.
        * @method completeXHRHeadRequest
        * @param outcome {Boolean} If the outcome was a success or not.
        * @private
        */
        private completeXHRHeadRequest(outcome);
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        * @public
        */
        public toString(): string;
    }
}
/**
*
* @module Kiwi
* @submodule Files
*
*/
declare module Kiwi.Files {
    /**
    * Holds all of the Files (regardless of the file type) that have been loaded throughout a game/are accessable at a particular point in time. Contains methods for dealing with files. Note: Each time the state is switched the file store will remove all references to files that have not been flagged as global.
    *
    * @class FileStore
    * @namespace Kiwi.Files
    * @constructor
    * @param game {Game} The game that this FileStore belongs to.
    * @return {FilesStore}
    *
    */
    class FileStore {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this FileStore belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * The files that are on this FileStore.
        * @property _files
        * @type Object
        * @private
        */
        private _files;
        /**
        * The number of files that are on the file store.
        * @property _size
        * @type Number
        * @default 0
        * @private
        */
        private _size;
        /**
        * The boot method is executed when the DOM elements needed for this game are ready and thus the game can 'boot'.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Returns a particular file by the key that you specify.
        * @method getFile
        * @param key {String} The key of the file that you to get.
        * @return {File}
        * @public
        */
        public getFile(key: string): Files.File;
        /**
        * Returns an object full of files that have a Tag that is associated with it.
        * @method getFilesByTag
        * @param tag {String}
        * @return {Object} All of the files with that tag.
        * @public
        */
        public getFilesByTag(tag: string): Object;
        /**
        * Removes all of the files by a tag that is specified.
        * @method removeFilesByTag
        * @param tag {String}
        * @return {Number} The number of files that were removed.
        * @public
        */
        public removeFilesByTag(tag: string): number;
        /**
        * Returns all of the keys for every file that exist on this FileStore as an array.
        * @property keys
        * @type String[]
        * @public
        */
        public keys : string[];
        /**
        * Returns the number of files that are on this FileStore.
        * @method size
        * @return {Number}
        * @public
        */
        public size(): number;
        /**
        * Adds a File with a key to the FileStore. If the key that you specify already exists then this method will return false otherwise it should return true if it was added.
        * @method addFile
        * @param key {String} A unique key that this file should be accessed by.
        * @param value {File} The file that you would like to save on the FileStore.
        * @return {Boolean} If the file was added or not
        * @public
        */
        public addFile(key: string, value: Files.File): boolean;
        /**
        * Checks to see if a key that you pass is already being used for another file. Returns true if that key is already in used, false if it isn't.
        * @method exists
        * @param key {String} The key that you are checking.
        * @return boolean
        * @public
        */
        public exists(key: string): boolean;
        /**
        * Removes files on the FileStore that are associated with a particular state.
        * @method removeStateFiles
        * @param state {State}
        * @public
        */
        public removeStateFiles(state: Kiwi.State): void;
        /**
        * Removes a file by the key that is passed. Returns a boolean indicating if a file was removed or not.
        * Note: Only returns false if that file did not exist in the first place.
        * @method removeFile
        * @param key {String} The key of the file you want to remove.
        * @return {Boolean}
        * @public
        */
        public removeFile(key: string): boolean;
    }
}
/**
* Kiwi - System
* @module Kiwi
* @submodule System
* @main System
*/
declare module Kiwi.System {
    /**
    * DOM Boot and Ready functions (based on those used by jQuery)
    *
    * @class Bootstrap
    * @namespace Kiwi.System
    *
    */
    class Bootstrap {
        /**
        *
        * @property _callback
        * @type Any
        * @private
        */
        private _callback;
        /**
        *
        * @property _domParent
        * @type String
        * @private
        */
        private _domParent;
        /**
        *
        * @property _createContainer
        * @type boolean
        * @private
        */
        private _createContainer;
        /**
        *
        * @property isReady
        * @type boolean
        * @public
        */
        public isReady: boolean;
        /**
        * The parent div in which the layers and input live
        * @property container
        * @type HTMLDivElement
        * @public
        */
        public container: HTMLDivElement;
        /**
        * This div sits on-top of all layers and captures user input
        * @property input
        * @type HTMLDivElement
        * @public
        */
        public input: HTMLDivElement;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * Called at the start of the game to check to see if the DOM is ready before we do anything requiring it
        * @method boot
        * @param {String} domParent
        * @param {Any} [callback=null]
        * @param {boolean} [createContainer=true]
        * @public
        */
        public boot(domParent: string, callback?: any, createContainer?: boolean): void;
        /**
        * If the DOM is ready it fires our callback, otherwise sets a short timeout to try again
        * @method ready
        * @public
        */
        public ready(): void;
        /**
        *
        * @method _setupContainer
        * @param {String} id
        * @private
        */
        private _setupContainer(id?);
    }
}
/**
* Kiwi - System
* @module Kiwi
* @submodule System
*
*/
declare module Kiwi.System {
    /**
    * Gets the x/y coordinate offset of any given valid DOM Element from the top/left position of the browser
    * Based on jQuery offset https://github.com/jquery/jquery/blob/master/src/offset.js
    *
    * @class Browser
    * @constructor
    * @namespace Kiwi.System
    * @param {Game} game
    * @return {StateMananger} This Object
    *
    */
    class Browser {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * The DOM is ready, so if we have a current state pending we can init it now
        * @method boot
        */
        public boot(): void;
        /**
        *
        * @method getOffsetPoint
        * @param {Any} element
        * @param {Point} output
        * @return {Point}
        * @public
        */
        public getOffsetPoint(element: any, output?: Kiwi.Geom.Point): Kiwi.Geom.Point;
    }
}
/**
* Kiwi - System
* @module Kiwi
* @submodule System
*/ 
declare module Kiwi.System {
    /**
    * Detects device support capabilities. Using some elements from System.js by MrDoob and Modernizr
    * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/audio.js
    *
    * @class Device
    * @constructor
    * @namespace Kiwi.System
    *
    * @author mrdoob
    * @author Modernizr team
    *
    */
    class Device {
        constructor();
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @property iOS
        * @type boolean
        * @public
        */
        public iOS: boolean;
        /**
        *
        * @property android
        * @type boolean
        * @public
        */
        public android: boolean;
        /**
        *
        * @property chromeOS
        * @type boolean
        * @public
        */
        public chromeOS: boolean;
        /**
        *
        * @property linux
        * @type boolean
        * @public
        */
        public linux: boolean;
        /**
        *
        * @property maxOS
        * @type boolean
        * @public
        */
        public macOS: boolean;
        /**
        *
        * @property windows
        * @type boolean
        * @public
        */
        public windows: boolean;
        /**
        *
        * @property canvas
        * @type boolean
        * @public
        */
        public canvas: boolean;
        /**
        *
        * @property file
        * @type boolean
        * @public
        */
        public file: boolean;
        /**
        *
        * @property fileSystem
        * @type boolean
        * @public
        */
        public fileSystem: boolean;
        /**
        *
        * @property localStorage
        * @type boolean
        * @public
        */
        public localStorage: boolean;
        /**
        *
        * @property webGL
        * @type boolean
        * @public
        */
        public webGL: boolean;
        /**
        *
        * @property worker
        * @type boolean
        * @public
        */
        public worker: boolean;
        /**
        *
        * @property blob
        * @type boolean
        * @public
        */
        public blob: boolean;
        /**
        *
        * @property touch
        * @type boolean
        * @public
        */
        public touch: boolean;
        /**
        *
        * @property css3D
        * @type boolean
        * @public
        */
        public css3D: boolean;
        /**
        *
        * @property arora
        * @type boolean
        * @public
        */
        public arora: boolean;
        /**
        *
        * @property chrome
        * @type boolean
        * @public
        */
        public chrome: boolean;
        /**
        *
        * @property epiphany
        * @type boolean
        * @public
        */
        public epiphany: boolean;
        /**
        *
        * @property firefox
        * @type boolean
        * @public
        */
        public firefox: boolean;
        /**
        *
        * @property ie
        * @type boolean
        * @public
        */
        public ie: boolean;
        /**
        *
        * @property ieVersion
        * @type Number
        * @public
        */
        public ieVersion: number;
        /**
        *
        * @property mobileSafari
        * @type boolean
        * @public
        */
        public mobileSafari: boolean;
        /**
        *
        * @property midori
        * @type boolean
        * @public
        */
        public midori: boolean;
        /**
        *
        * @property opera
        * @type boolean
        * @public
        */
        public opera: boolean;
        /**
        *
        * @property safari
        * @type boolean
        * @public
        */
        public safari: boolean;
        /**
        *
        * @property webApp
        * @type boolean
        * @public
        */
        public webApp: boolean;
        /**
        *
        * @property audioData
        * @type boolean
        * @public
        */
        public audioData: boolean;
        /**
        *
        * @property webaudio
        * @type boolean
        * @public
        */
        public webaudio: boolean;
        /**
        *
        * @property ogg
        * @type boolean
        * @public
        */
        public ogg: boolean;
        /**
        *
        * @property mp3
        * @type boolean
        * @public
        */
        public mp3: boolean;
        /**
        *
        * @property wav
        * @type boolean
        * @public
        */
        public wav: boolean;
        /**
        *
        * @property m4a
        * @type boolean
        * @public
        */
        public m4a: boolean;
        /**
        *
        * @property iPhone
        * @type boolean
        * @public
        */
        public iPhone: boolean;
        /**
        *
        * @property iPhone4
        * @type boolean
        * @public
        */
        public iPhone4: boolean;
        /**
        *
        * @property iPad
        * @type boolean
        * @public
        */
        public iPad: boolean;
        /**
        *
        * @property pixelRatio
        * @type Number
        * @public
        */
        public pixelRatio: number;
        /**
        *
        * @method _checkOS
        * @private
        */
        private _checkOS();
        /**
        *
        * @method _checkFeatures
        * @private
        */
        private _checkFeatures();
        /**
        *
        * @method _checkBrowser
        * @private
        */
        private _checkBrowser();
        /**
        *
        * @method _checkAudio
        * @private
        */
        private _checkAudio();
        /**
        *
        * @method _checkDevice
        * @private
        */
        private _checkDevice();
        /**
        *
        * @method _checkCSS3D
        * @private
        */
        private _checkCSS3D();
        /**
        *
        * @method getAll
        * @return {String}
        * @public
        */
        public getAll(): string;
    }
}
/**
*
* @module Kiwi
* @submodule Textures
*
*/ 
declare module Kiwi.Textures {
    /**
    * A TextureAtlas is the base class that is created for each image that is loaded in through Kiwi. Each TextureAtlas contains a name (the same as the key that the user chose when loading the image in),the HTMLImageElement that it is for and a number of cells.
    *
    * @class TextureAtlas
    * @namespace Kiwi.Textures
    * @constructor
    * @param name {string} Name of the texture atlas. This is usually defined by the developer when loading the assets.
    * @param type {number} The type of texture atlas that this is. There are currently only three types.
    * @param cells {any} The cells that are within this image..
    * @param image {HTMLImageElement/HTMLCanvasElement} The image that the texture atlas is using.
    * @param [sequences] {Sequence[]} Any sequences of cells for this texture atlas. Used for animation.
    * @return {TextureAtlas}
    *
    */
    class TextureAtlas {
        constructor(name: string, type: number, cells: any, image: any, sequences?: Kiwi.Animations.Sequence[]);
        /**
        * The type of object that this texture atlas is.
        * @method objType
        * @return string
        * @public
        */
        public objType(): string;
        /**
        * The name of this texture atlas
        * @property name
        * @type string
        * @public
        */
        public name: string;
        /**
        * Indicates that the image data has changed, and needs to be reuplaoded to the gpu in webGL mode.
        * @property dirty
        * @type boolean
        * @public
        */
        public dirty: boolean;
        /**
        * The image that this texture atlas is holding. Can be an HTMLImageElement or a HTMLCanvasElement
        * @property image
        * @type HTMLImageElement/HTMLCanvasElement
        * @public
        */
        public image: any;
        /**
        * The cells for this image.
        * @property cells
        * @type Array
        * @public
        */
        public cells: any;
        /**
        * Sequences that are for this texture.
        * @property sequences
        * @type Sequence
        * @public
        */
        public sequences: Kiwi.Animations.Sequence[];
        /**
        * The cell that is to be render at the start.
        * @property cellIndex
        * @type number
        * @default 0
        * @public
        */
        public cellIndex: number;
        /**
        * The type of texture atlas that this is. This only ever is given a value when the object is instantated.
        * @property _type
        * @type number
        * @private
        */
        private _type;
        /**
        * The number that defines a single image type of texture atlas
        * @property SINGLE_IMAGE
        * @static
        * @default 0
        * @type number
        * @final
        * @public
        */
        static SINGLE_IMAGE: number;
        /**
        * The number that defines a spritesheet type of texture atlas
        * @property SPRITE_SHEET
        * @static
        * @default 1
        * @type number
        * @final
        * @public
        */
        static SPRITE_SHEET: number;
        /**
        * The number that defines a normal texture atlas
        * @property TEXTURE_ATLAS
        * @static
        * @default 2
        * @type number
        * @final
        * @public
        */
        static TEXTURE_ATLAS: number;
        /**
        * Will return to you this type of texture atlas. This is READ ONLY.
        * @type number
        * @public
        */
        public type : number;
        public glTextureWrapper: Kiwi.Renderers.GLTextureWrapper;
        /**
        * Will populate this texture atlas with information based on a JSON file that was passed.
        *
        * @method readJSON
        * @param {any} atlasJSON
        * @public
        */
        public readJSON(atlasJSON: any): void;
    }
}
/**
* Contains Objects that are used when dealing specifically with Textures/Images. Majority of these classes are for Internal Kiwi use.
*
* @module Kiwi
* @submodule Textures
* @main Textures
*
*/ 
declare module Kiwi.Textures {
    /**
    * Holds a reference to all of the image files (jpg, png, e.t.c) that are accessible on the State this TextureLibrary is on.
    *
    * @class TextureLibrary
    * @namespace Kiwi.Textures
    * @constructor
    * @param game {Game} The game that this texture library belongs to.
    * @return {TextureLibrary}
    *
    */
    class TextureLibrary {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * The game that this texture library is on.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * Contains all of the textures that are available.
        * @property textures
        * @public
        */
        public textures: any;
        /**
        * Resets the texture library.
        * @method clear
        * @public
        */
        public clear(): void;
        /**
        * Adds a texture atlas to the library.
        * @method add
        * @param atlas {TextureAtlas}
        * @public
        */
        public add(atlas: Textures.TextureAtlas): void;
        /**
        * Adds a new image file to the texture library.
        * @method addFromFile
        * @param imageFile {File}
        * @public
        */
        public addFromFile(imageFile: Kiwi.Files.File): void;
        /**
        * Used to rebuild a Texture from the FileStore into a base2 size if it doesn't have it already.
        * @method _rebuildImage
        * @param imageFile {File} The image file that is to be rebuilt.
        * @return {File} The new image file.
        * @private
        */
        private _rebuildImage(imageFile);
        /**
        * Used to build a new texture atlas based on the image file provided. Internal use only.
        * @method _buildTextureAtlas
        * @param imageFile {File} The image file that is to be used.
        * @return {TextureAtlas} The new texture atlas that is created.
        * @private
        */
        private _buildTextureAtlas(imageFile);
        /**
        * Builds a spritesheet atlas from the an image file that is provided.
        * @method _buildSpriteSheet
        * @param imageFile {File} The image file that is to be used.
        * @return {SpriteSheet} The SpriteSheet that was just created.
        * @private
        */
        private _buildSpriteSheet(imageFile);
        /**
        * Builds a single image atlas from a image file that is provided.
        * @method _buildImage
        * @param imageFile {File} The image file that is to be used.
        * @return {SingleImage} The SingleImage that was created.
        * @private
        */
        private _buildImage(imageFile);
        /**
        * Rebuild the library from a fileStore. Clears the library and repopulates it.
        * @method rebuild
        * @param {Kiwi.Files.FileStore} fileStore
        * @param {Kiwi.State} state
        * @public
        */
        public rebuild(fileStore: Kiwi.Files.FileStore, state: Kiwi.State): void;
    }
}
/**
*
* @module Kiwi
* @submodule Textures
*
*/ 
declare module Kiwi.Textures {
    /**
    * A special type of TextureAtlas that is created when loading in images that are design to be SpriteSheets. A SpriteSheet will generally contain multiple cells and can also contain sequences which are then automatically added as Animations when this texture is used on a Sprite.
    *
    * @class SpriteSheet
    * @extends TextureAtlas
    * @namespace Kiwi.Textures
    * @constructor
    * @param name {string} The name of the spritesheet.
    * @param texture {HTMLImageElement/HTMLCanvasElement} The image that is being used for the spritesheet.
    * @param cellWidth {number} The width of a single cell.
    * @param cellHeight {number} The height of a single cell.
    * @param [numCells] {number} The number of cells in total.
    * @param [rows] {number} The number of cells that make up a row.
    * @param [cols] {number} The number of cells that make up a column.
    * @param [sheetOffsetX] {number} The offset of the whole sheet on the x axis. Useful if the image has a border you don't want to show.
    * @param [sheetOffsetY] {number} The offset of the whole sheet on the y axis. Useful if the image has a border you don't want to show.
    * @param [cellOffsetX] {number} An offset between cells on the x axis. Useful if there is a border between cells which is not to be shown.
    * @param [cellOffsetY] {number} An offset between cells on the y axis. Useful if there is a border between cells which is not to be shown.
    * @return {SpriteSheet}
    */
    class SpriteSheet extends Textures.TextureAtlas {
        constructor(name: string, texture: any, cellWidth: number, cellHeight: number, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return string
        * @public
        */
        public objType(): string;
        /**
        * The width of a single cell.
        * @property cellWidth
        * @type number
        * @private
        */
        private cellWidth;
        /**
        * The height of a single cell.
        * @property cellHeight
        * @type number
        * @private
        */
        private cellHeight;
        /**
        * The number of cells that are on this spritesheet
        * @property numCells
        * @type number
        * @private
        */
        private numCells;
        /**
        * The number of rows for the spritesheet
        * @property rows
        * @type number
        * @private
        */
        private _rows;
        /**
        * Get the number of rows.
        * @type number
        * @public
        */
        public rows : number;
        /**
        * The number of columns that are on this spritesheet
        * @property cols
        * @type number
        * @private
        */
        private _cols;
        /**
        * Get the number of columns.
        * @type number
        * @public
        */
        public cols : number;
        /**
        * How much the whole spritesheet should be offset by on the X axis.
        * @property sheetOffsetX
        * @type number
        * @private
        */
        private sheetOffsetX;
        /**
        * How much the whole spritesheet should be offset by on the Y axis.
        * @property sheetOffsetY
        * @type number
        * @private
        */
        private sheetOffsetY;
        /**
        * How much each cell should be offset by on the X axis.
        * @property cellOffsetX
        * @type number
        * @private
        */
        private cellOffsetX;
        /**
        * How much each cell should be offset by on the Y axis.
        * @property cellOffsetY
        * @type number
        * @private
        */
        private cellOffsetY;
        /**
        * Generates the atlas cells based on the information that was provided.
        *
        * @method generateAtlasCells
        * @return {Array}
        * @public
        */
        public generateAtlasCells(): any[];
    }
}
/**
*
* @module Kiwi
* @submodule Textures
*
*/ 
declare module Kiwi.Textures {
    /**
    * A special type of TextureAtlas that is used when the user has loaded a single image. This type of TextureAtlas contains only one cell which is generally the whole width/height of the image and starts at the coordinates 0/0. A SingleImage has a space to store sequences but this will not be used.
    *
    * @class SingleImage
    * @extends TextureAtlas
    * @namespace Kiwi.Textures
    * @constructor
    * @param name {string} The name of the single image
    * @param image {HTMLImageElement/HTMLCanvasElement} the image that is being used.
    * @param [width] {number} the width of the image
    * @param [height] {number} the height of the image
    * @param [offsetX] {number} the offset of the image on the x axis. Useful if the image has a border that you don't want to show.
    * @param [offsetY] {number} the offset of the image of the y axis. Useful if the image has a border that you don't want to show.
    * @return {SingleImage}
    */
    class SingleImage extends Textures.TextureAtlas {
        constructor(name: string, image: any, width?: number, height?: number, offsetX?: number, offsetY?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return string
        * @public
        */
        public objType(): string;
        /**
        * The width of the image.
        * @property width
        * @type number
        * @private
        */
        private width;
        /**
        * The height of the image.
        * @property height
        * @type number
        * @private
        */
        private height;
        /**
        * The offset for the image on the X axis.
        * @property offsetX
        * @type number
        * @private
        */
        private offsetX;
        /**
        * The offset for the image o nthe Y axis.
        * @property offsetY
        * @type number
        * @private
        */
        private offsetY;
        /**
        * This method generates the single image cell based off the information that was passed during instantion.
        * @method generateAtlasCells
        * @returns{ Array }
        * @public
        */
        public generateAtlasCells(): any[];
    }
}
/**
* Contains various methods that can be used when you are wanting to ease a Tween.
*
* @module Tweens
* @submodule Easing
* @main Easing
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    * @class Back
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Back {
        /**
        * The type of object this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param {Any} k
        * @return {Number}
        * @static
        * @public
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static InOut(k: any): number;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    * @class Bounce
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Bounce {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param {Any} k
        * @return {Number}
        * @static
        * @public
        */
        static InOut(k: any): number;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    *
    * @class Circular
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Circular {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param k {Any}
        * @return {Number}
        * @static
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param k {Any}
        * @return {Number}
        * @static
        */
        static InOut(k: any): number;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    * @class Cubic
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Cubic {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param k {Any}
        * @static
        * @public
        */
        static InOut(k: any): number;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    *
    * @class Elastic
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Elastic {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param {Any} k
        * @static
        * @public
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param k {Any}
        * @static
        * @public
        */
        static InOut(k: any): number;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    *
    * @class Exponential
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Exponential {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {String}
        * @static
        * @public
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param k {Any}
        * @return {String}
        * @static
        * @public
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param k {Any}
        * @return {String}
        * @static
        * @public
        */
        static InOut(k: any): number;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    * @class Linear
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Linear {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method None
        * @param {Any} k
        * @return {Number}
        * @static
        */
        static None(k: any): any;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    *
    * @class Quadratic
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Quadratic {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static InOut(k: any): number;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    * @class Quartic
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Quartic {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {String}
        * @static
        * @public
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param k {Any}
        * @return {String}
        * @static
        * @public
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param k {Any}
        * @return {String}
        * @static
        * @public
        */
        static InOut(k: any): number;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    * @class Quintic
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Quintic {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static InOut(k: any): number;
    }
}
/**
*
* @module Tweens
* @submodule Easing
*
*/
declare module Kiwi.Animations.Tweens.Easing {
    /**
    *
    * @class Sinusoidal
    * @namespace Kiwi.Animations.Tweens.Easing
    *
    */
    class Sinusoidal {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        *
        * @method In
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static In(k: any): number;
        /**
        *
        * @method Out
        * @param k {Any}
        * @return {Number}
        * @static
        * @public
        */
        static Out(k: any): number;
        /**
        *
        * @method InOut
        * @param {Any} k
        * @return {Number}
        * @static
        * @public
        */
        static InOut(k: any): number;
    }
}
/**
* The section of Kiwi which holds the scripts that manage Tween's in Kiwi. The scripts in this section are based on Tween.js by sole and have been converted to TypeScript and integrated into Kiwi. https://github.com/sole/tween.js
*
* @module Animations
* @submodule Tweens
* @main Tweens
*/
declare module Kiwi.Animations.Tweens {
    /**
    * The TweenManager is automatically created on every game. This class is responsible for the creation and management of tweens for the game.
    *
    * Based on tween.js by sole. Converted to TypeScript and integrated into Kiwi.
    * https://github.com/sole/tween.js
    *
    * @class TweenManager
    * @namespace Kiwi.Animations.Tweens
    * @constructor
    * @param game {Game}
    * @return {TweenManager}
    *
    * @author     sole / http://soledadpenades.com
    * @author     mrdoob / http://mrdoob.com
    * @author     Robert Eisele / http://www.xarg.org
    * @author     Philippe / http://philippe.elsass.me
    * @author     Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
    * @author     Paul Lewis / http://www.aerotwist.com/
    * @author     lechecacharro
    * @author     Josh Faul / http://jocafa.com/
    * @author     egraether / http://egraether.com/
    *
    */
    class TweenManager {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this manager belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * An array of all of the tweens on the manager.
        * @property _tweens
        * @type Tween[]
        * @private
        */
        private _tweens;
        /**
        * Returns all of tweens that are on the manager.
        * @method getAll
        * @return Tween[]
        * @public
        */
        public getAll(): Animations.Tween[];
        /**
        * Removes all of the tweens on the manager.
        * @method removeAll
        * @public
        */
        public removeAll(): void;
        /**
        * Creates a new Tween.
        * @method create
        * @param object {Any} The object that this tween is to apply.
        * @return {Tween} The tween that was created.
        * @public
        */
        public create(object: any): Animations.Tween;
        /**
        * Adds a tween to the manager.
        * @method add
        * @param tween {Tween} The tween that you want to add to the manager.
        * @return {Tween}
        * @public
        */
        public add(tween: Animations.Tween): Animations.Tween;
        /**
        * Removes a tween from this manager.
        * @method remove
        * @param tween {Tween} The tween that you would like to remove.
        * @return {Tween}
        * @public
        */
        public remove(tween: Animations.Tween): void;
        /**
        * The update loop.
        * @method update
        * @public
        */
        public update(): boolean;
    }
}
/**
*
* @module Animations
* @submodule Tweens
*
*/
declare module Kiwi.Animations {
    /**
    * Manages the tweening of properties/values on a single object. A Tween is the animation of a number between an initially value to and final value (that you specify).
    * Note: When using a Tween you need to make sure that the Tween has been added to a TweenManager. You can either do this by creating the Tween via the Manager or alternatively using the 'add' method on the TweenManager. Otherwise the tween will not work.
    *
    * Based on tween.js by sole. Converted to TypeScript and integrated into Kiwi.
    * https://github.com/sole/tween.js
    *
    * @class Tween
    * @constructor
    * @namespace Kiwi.Animations
    * @param object {Any} The object that this tween is taking affect on.
    * @param game {Game} The game that this tween is for.
    * @return {Tween} This tween.
    *
    * @author     sole / http://soledadpenades.com
    * @author     mrdoob / http://mrdoob.com
    * @author     Robert Eisele / http://www.xarg.org
    * @author     Philippe / http://philippe.elsass.me
    * @author     Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
    * @author     Paul Lewis / http://www.aerotwist.com/
    * @author     lechecacharro
    * @author     Josh Faul / http://jocafa.com/
    * @author     egraether / http://egraether.com/
    *
    */
    class Tween {
        constructor(object: any, game?: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this tween belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * The manager that this tween belongs to.
        * @property _manager
        * @type Manager
        * @private
        */
        private _manager;
        /**
        * The object that this tween is affecting.
        * @property _object
        * @type Any
        * @private
        */
        private _object;
        /**
        * The starting values of the properties that the tween is animating.
        * @property _valuesStart
        * @type Object
        * @private
        */
        private _valuesStart;
        /**
        * The end values of the properties that the tween is animating.
        * @property _valuesEnd
        * @type Object
        * @private
        */
        private _valuesEnd;
        /**
        * The duration of the tween, in milliseconds.
        * @property _duration
        * @type Number
        * @private
        */
        private _duration;
        /**
        * The amount of time to delay the tween by. In Milliseconds.
        * @property _delayTime
        * @type Number
        * @private
        */
        private _delayTime;
        /**
        * The time at which the tween started.
        * @property _startTime
        * @type Number
        * @private
        */
        private _startTime;
        /**
        * The easing function that is to be used while tweening.
        * @property _easingFunction
        * @type Function
        * @default Kiwi.Tweens.Easing.Linear.None
        * @private
        */
        private _easingFunction;
        /**
        * [NEEDS DESCRIPTION]
        * @property _interpolationFunction
        * @type Function
        * @default Kiwi.Utils.Interpolation.Linear
        * @private
        */
        private _interpolationFunction;
        /**
        * An array containing all of the tweens that are to be played when this one finishes.
        * @property _chainedTweens
        * @type Tween[]
        * @private
        */
        private _chainedTweens;
        /**
        * The method that is to be called when the tween starts playing.
        * @property _onStartCallback
        * @type Function
        * @default null
        * @private
        */
        private _onStartCallback;
        /**
        * The context that the _onStartCallback method is to be called in.
        * @property _onStartContext
        * @type Any
        * @default null
        * @private
        */
        private _onStartContext;
        /**
        * A boolean indicating if the starting callback has been called or not.
        * @property _onStartCallbackFired
        * @type boolean
        * @default false
        * @private
        */
        private _onStartCallbackFired;
        /**
        * A callback method that will be called each time the tween updates.
        * @property _onUpdateCallback
        * @type Function
        * @default null
        * @private
        */
        private _onUpdateCallback;
        /**
        * The context that the update callback has when called.
        * @property _onUpdateContext
        * @type any
        * @default null
        * @private
        */
        private _onUpdateContext;
        /**
        * A method to be called when the tween finish's tweening.
        * @property _onCompleteCallback
        * @type function
        * @default null
        * @private
        */
        private _onCompleteCallback;
        private _onCompleteCalled;
        /**
        * The context that the onCompleteCallback should have when called.
        * @property _onCompleteContext
        * @type any
        * @default null
        * @private
        */
        private _onCompleteContext;
        /**
        * An indication of whether or not this tween is currently running.
        * @property isRunning.
        * @type boolean
        * @default false
        * @public
        */
        public isRunning: boolean;
        /**
        * Sets up the various properties that define this tween.
        * The ending position/properties for this tween, how long the tween should go for, easing method to use and if should start right way.
        *
        * @method to
        * @param properties {Object} The ending location of the properties that you want to tween.
        * @param [duration=1000] {Number} The duration of the tween.
        * @param [ease=null] {Any} The easing method to be used. If not specifed then this will default to LINEAR.
        * @param [autoStart=false] {boolean} If the tween should start right away.
        * @return {Tween}
        * @public
        */
        public to(properties: any, duration?: number, ease?: any, autoStart?: boolean): Tween;
        /**
        * Gets the initial values for the properties that it is to animate and starts the tween process.
        * @method start
        * @public
        */
        public start(): Tween;
        /**
        * Stops the Tween from running and removes it from the manager.
        * @method stop
        * @public
        */
        public stop(): Tween;
        /**
        * Sets the game and the manager of this tween.
        * @method setParent
        * @param {Game} value
        * @public
        */
        public setParent(value: Kiwi.Game): void;
        /**
        * Sets the amount of delay that the tween is to have before it starts playing.
        * @method delay
        * @param amount {Number} The amount of time to delay the tween by.
        * @return {Tween}
        * @public
        */
        public delay(amount: number): Tween;
        /**
        * Sets the easing method that is to be used when animating this tween.
        * @method easing
        * @param easing {Function} The easing function to use.
        * @return {Tween}
        * @public
        */
        public easing(easing: any): Tween;
        /**
        * [REQUIRES DESCRIPTION]
        * @method interpolation
        * @param {Any} interpolation
        * @return {Tween}
        * @public
        */
        public interpolation(interpolation: any): Tween;
        /**
        * Adds another tween that should start playing once tween has completed.
        * @method chain
        * @param tween {Tween}
        * @return {Tween}
        * @public
        */
        public chain(tween: Tween): Tween;
        /**
        * Adds a function that is to be executed when the tween start playing.
        * @method onStart
        * @param callback {Function} The function that is to be executed on tween start.
        * @param context {any} The context that function is to have when called.
        * @return {Tween}
        * @public
        */
        public onStart(callback: any, context: any): Tween;
        /**
        * Adds a function that is to be executed when this tween updates while it is playing.
        * @method onUpdate
        * @param callback {Function} The method that is to be executed.
        * @param context {Any} The context the method is to have when called.
        * @public
        */
        public onUpdate(callback: any, context: any): Tween;
        /**
        * Defines a method that is to be called when this tween is finished.
        * @method onComplete
        * @param callback {Function} The method that is to be executed.
        * @param context {Any} The context the method is to have when called.
        * @public
        */
        public onComplete(callback: any, context: any): Tween;
        /**
        * The update loop is executed every frame whilst the tween is running.
        * @method update
        * @param time {Number}
        * @public
        */
        public update(time: any): boolean;
    }
}
/**
* A IRenderer is an Interface (defined as a class as the documentation does not support Interfaces just yet),
* which outlines the methods/properties that are required any Renderer.
* @class IRenderer
*/
interface IRenderManager {
    render(camera: Kiwi.Camera): any;
    boot(): any;
    initState(state: Kiwi.State): any;
    endState(state: Kiwi.State): any;
    numDrawCalls: number;
    requestRendererInstance(rendererID: string, params?: any): any;
    requestSharedRenderer(rendererID: string, params?: any): any;
}
/**
* Contains the classes which are related to the rendering of GameObjects.
*
* @module Kiwi
* @submodule Renderers
* @main
*/ 
declare module Kiwi.Renderers {
    /**
    *
    * @class CanvasRenderer
    * @extends IRenderer
    * @constructor
    * @namespace Kiwi.Renderers
    * @param game {Game} The game that this canvas renderer belongs to.
    * @return {CanvasRenderer}
    *
    */
    class CanvasRenderer implements IRenderManager {
        constructor(game: Kiwi.Game);
        /**
        * The boot method is executed when all of the DOM elements that are needed to play the game are ready.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this object belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * The camera that is currently being used to render upon.
        * @property _currentCamera
        * @type Camera
        * @private
        */
        private _currentCamera;
        /**
        * This method recursively goes through a State's members and runs the render method of each member that is a Entity.
        * If it is a Group then this method recursively goes through that Groups members the process that happened to the State's members happens to the Group's members.
        *
        * @method _recurse
        * @param child {IChild} The child that is being checked.
        * @private
        */
        public _recurse(child: Kiwi.IChild): void;
        public requestRendererInstance(rendererID: string, params?: any): Renderers.Renderer;
        public requestSharedRenderer(rendererID: string, params?: any): Renderers.Renderer;
        public initState(state: Kiwi.State): void;
        public endState(state: Kiwi.State): void;
        public numDrawCalls: number;
        /**
        * Renders all of the Elements that are on a particular camera.
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera): void;
    }
}
declare var mat2d: any, mat3: any, vec2: any, vec3: any, mat4: any;
/**
*
*
* @module Kiwi
* @submodule Renderers
* @main Renderers
*/ 
declare module Kiwi.Renderers {
    /**
    * Manages all rendering using WebGL. Requires the inclusion of gl-matrix.js / g-matrix.min.js -  https://github.com/toji/gl-matrix
    * Directly manages renderer objects, including factory methods for their creation.
    * Creates manager objects for shaders and textures.
    * Manages gl state at game initialisation, at state start and end, and per frame.
    * Runs the recursive scene graph rendering sequence every frame.
    * @class GLRenderManager
    * @extends IRenderer
    * @constructor
    * @param game {Game} The game that this renderer belongs to.
    * @return {GLRenderer}
    */
    class GLRenderManager implements IRenderManager {
        constructor(game: Kiwi.Game);
        /**
        * Initialises all WebGL rendering services
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this renderer is used with.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * The texture manager object used to allocate GL Textures.
        * @property _textureManager
        * @type GLTextureManager
        * @private
        */
        private _textureManager;
        /**
        * The shader manager object used to allocate GL Shaders.
        * @property _shaderManager
        * @type GLShaderManager
        * @private
        */
        private _shaderManager;
        /**
        * The stage resolution in pixels
        * @property _stageResolution
        * @type Float32Array
        * @private
        */
        private _stageResolution;
        /**
        * The renderer object that is in use during a rendering batch.
        * @property _currentRenderer
        * @type Kiwi.Renderers.Renderer
        * @private
        */
        private _currentRenderer;
        /**
        * Tally of number of entities rendered per frame
        * @property _entityCount
        * @type number
        * @default 0
        * @private
        */
        private _entityCount;
        /**
        * Tally of number of draw calls per frame
        * @property numDrawCalls
        * @type number
        * @default 0
        * @public
        */
        public numDrawCalls: number;
        /**
        * Maximum allowable sprites to render per frame
        * Note:Not currently used  - candidate for deletion
        * @property _maxItems
        * @type number
        * @default 1000
        * @private
        */
        private _maxItems;
        public camMatrix: Float32Array;
        /**
        * The most recently bound texture atlas.
        * @property _currentTextureAtlas
        * @type TextureAtlas
        * @private
        */
        private _currentTextureAtlas;
        public addTexture(gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas): void;
        /**
        * An array of renderers. Shared renderers are used for batch rendering. Multiple gameobjects can use the same renderer
        * instance and add rendering info to a batch rather than rendering individually.
        * This means only one draw call is necessary to render a number of objects. The most common use of this is standard 2d sprite rendering,
        * and the TextureAtlasRenderer is added by default as a shared renderer. Sprites, StaticImages and Tilemaps (core gameobjects) can all use the
        * same renderer/shader combination and be drawn as part of the same batch.
        * Custom gameobjects can also choose to use a shared renderer, fo example in the case that a custom gameobject's rendering requirements matched the TextureAtlasRenderer
        * capabilities.
        *
        * @property _sharedRenderers
        * @type Array
        * @private
        */
        private _sharedRenderers;
        /**
        * Adds a renderer to the sharedRenderer array. The rendererID is a string that must match a renderer property of the Kiwi.Renderers object.
        * If a match is found and an instance does not already exist, then a renderer is instantiated and added to the array.
        * @method addSharedRenderer
        * @param {String} rendererID
        * @param {Object} params
        * @return {Boolean} success
        * @public
        */
        public addSharedRenderer(rendererID: string, params?: any): boolean;
        /**
        * Requests a shared renderer. A game object that wants to use a shared renderer uses this method to obtain a reference to the shared renderer instance.
        * @method addSharedRenderer
        * @param {String} rendererID
        * @param {Object} params
        * @return {Kiwi.Renderers.Renderer} A shared renderer or null if none found.
        * @public
        */
        public requestSharedRenderer(rendererID: string, params?: any): Renderers.Renderer;
        /**
        * Requests a new renderer instance. This factory method is the only way gameobjects should instantiate their own renderer.
        * The rendererID is a string that must match a renderer property of the Kiwi.Renderers object.
        * If a match is found then a renderer is instantiated and returned. Gameobjects which have rendering requirements that do not suit
        * batch rendering use this technique.
        * @method requestRendererInstance
        * @param {String} rendererID The name of the requested renderer
        * @param {Object} params
        * @return {Kiwi.Renderers.Renderer} A renderer or null if none found.
        * @public
        */
        public requestRendererInstance(rendererID: string, params?: any): Renderers.Renderer;
        private _init();
        /**
        * Performs initialisation required when switching to a different state. Called when a state has been switched to.
        * The textureManager is told to rebuild its cache of textures from the states textuer library.
        * @method initState
        * @public
        */
        public initState(state: Kiwi.State): void;
        /**
        * Performs cleanup required before switching to a different state. Called whwn a state is about to be switched from. The textureManager is told to empty its cache.
        * @method initState
        * @param state {Kiwi.State}
        * @public
        */
        public endState(state: Kiwi.State): void;
        /**
        * Manages rendering of the scene graph - called once per frame.
        * Sets up per frame gl uniforms such as the view matrix and camera offset.
        * Clears the current renderer ready for a new batch.
        * Initiates recursive render of scene graph starting at the root.
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera): void;
        private _sequence;
        private _batches;
        public collateRenderSequence(): void;
        public collateChild(child: Kiwi.IChild): void;
        public collateBatches(): void;
        public renderBatches(gl: WebGLRenderingContext, camera: any): void;
        public renderBatch(gl: WebGLRenderingContext, batch: any, camera: any): void;
        public renderEntity(gl: WebGLRenderingContext, entity: any, camera: any): void;
        public setupGLState(gl: WebGLRenderingContext, entity: any): void;
        /**
        * Switch renderer to the one needed by the entity that needs rendering
        * @method _switchRenderer
        * @param gl {WebGLRenderingContext}
        * @param entity {Entity}
        * @private
        */
        private _switchRenderer(gl, entity);
        /**
        * Switch texture to the one needed by the entity that needs rendering
        * @method _switchTexture
        * @param gl {WebGLRenderingContext}
        * @param entity {Entity}
        * @private
        */
        private _switchTexture(gl, entity);
    }
}
/**
* GLSL ES Shaders are used for WebGL rendering.
* ShaderPair objects encapsulate GLSL ES vertex and fragment shader programs.
*   ShaderPairs contain the GLSL code, provide an interface to uniforms and attributes, and have the ability to link and compile the shaders.
* The ShaderManager keeps track of each ShaderPair, and controls which one is bound for use at any particular time.
*   Only the ShaderManager can create ShaderPairs. When a renderer (see note on renderes below) requests a ShaderPair the ShaderManager will either
*       1) Return a reference to an already instantiated ShaderPair, and set the GL state to use the shader program or
*       2) Return a reference to a new ShaderPair, which will be linked and compiled and bound for use.
*   All ShaderPairs must be housed as properties of the Kiwi.Shaders object.
*
* Kiwi.Renderer objects use a ShaderPair to draw.
*   They must request a ShaderPair from the ShaderManager.
*   Many renderers may use the same ShaderPair.
*   Some renderers may at different times use multiple ShaderPairs (only one is possible at any given time)
*
* @module Kiwi
* @submodule Shaders
* @main Shaders
*/ 
declare module Kiwi.Shaders {
    /**
    * Manages all WebGL Shaders. Maintains a list of ShaderPairs
    *
    * Provides an interface for using a specific ShaderPair, adding new ShaderPairs, and requesting a reference to a ShaderPair instance.
    * Renderes use shaderPairs to draw. Multiple renderers may use the same compiled shader program.
    * This Manager ensures only one compiled instance of each program is created
    * @class ShaderManager
    * @extends IRenderer
    * @constructor
    * @return {GLRenderer}
    */
    class ShaderManager {
        constructor();
        /**
        * An object containing a set of properties each of which references a ShaderPair.
        * @property _shaderPairs
        * @type Object
        * @private
        */
        private _shaderPairs;
        /**
        * The shader program that is currently set to be used useing gl.useProgram.
        * @property currentShader
        * @type Array
        * @private
        */
        public currentShader : Shaders.ShaderPair;
        private _currentShader;
        /**
        * Sets up a default shaderPair.
        * @method init
        * @param {WebGLRenderingContext} gl
        * @param {String} defaultShaderID
        * @public
        */
        public init(gl: WebGLRenderingContext, defaultShaderID: string): void;
        /**
        * Provides a reference to a ShaderPair. If the requested ShaderPair exists as a property on the _shaderPairs object it will be returned if already loaded,
        * otherwise it will be loaded, then returned.
        * If the request is not on the list, the Kiwi.Shaders object will  be checked for a property name that matches shaderID and a new ShaderPair
        * will be instantiated, loaded, and set for use.
        
        * @method init
        * @param {WebGLRenderingContext} gl
        * @param {String} shaderID
        * @return {ShaderPair} a ShaderPair instance - null on fail
        * @public
        */
        public requestShader(gl: WebGLRenderingContext, shaderID: string, use?: boolean): Shaders.ShaderPair;
        /**
        * Tests to see if a ShaderPair property named ShaderID exists on Kiwi.Shaders. Can be used to test for the availability of specific shaders (for fallback)
        * @method shaderExists
        * @param {WebGLRenderingContext} gl
        * @param {String} shaderID
        * @return {Boolean} success
        * @public
        */
        public shaderExists(gl: WebGLRenderingContext, shaderID: string): boolean;
        /**
        * Creates a new instance of a ShaderPair and adds a reference to the _shaderPairs object
        * @method _addShader
        * @param {WebGLRenderingContext} gl
        * @param {String} shaderID
        * @return {ShaderPair}
        * @private
        */
        private _addShader(gl, shaderID);
        /**
        * Tells a ShaderPair to load (compile and link)
        * @method _loadShader
        * @param {WebGLRenderingContext} gl
        * @param {ShaderPair} shader
        * @private
        */
        private _loadShader(gl, shader);
        /**
        * Changes gl state so that the shaderProgram contined in a ShaderPir is bound for use
        * @method _useShader
        * @param {WebGLRenderingContext} gl
        * @param {ShaderPair} shader
        * @private
        */
        private _useShader(gl, shader);
    }
}
/**
*
* @module Kiwi
* @submodule Renderers
*
*/
declare module Kiwi.Renderers {
    /**
    *
    * @class GLTexture
    * @constructor
    * @param gl {WebGLRenderingContext}
    * @param [_image] {HTMLImageElement}
    * @return {GLTexture}
    */
    class GLTextureWrapper {
        constructor(gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas, upload?: boolean);
        public textureAtlas: Kiwi.Textures.TextureAtlas;
        private _numBytes;
        public numBytes : number;
        private _created;
        public created : boolean;
        private _uploaded;
        public uploaded : boolean;
        /**
        *
        * @property texture
        * @type WebGLTexture
        * @public
        */
        public texture: WebGLTexture;
        /**
        *
        * @property image
        * @type HTMLImageElement
        * @public
        */
        public image: HTMLImageElement;
        public createTexture(gl: WebGLRenderingContext): boolean;
        public uploadTexture(gl: WebGLRenderingContext): boolean;
        public refreshTexture(gl: WebGLRenderingContext): void;
        public deleteTexture(gl: WebGLRenderingContext): boolean;
    }
}
/**
*
*
* @module Kiwi
* @submodule Renderers
* @main Renderers
*/ 
declare module Kiwi.Renderers {
    /**
    * Manages GL Texture objects, including creation, uploading, destruction and memory management
    * @class GLTextureManager
    * @constructor
    * @return {GLTextureManager}
    */
    class GLTextureManager {
        constructor();
        /**
        * The default maximum amount of texture memory to use before swapping textures
        * @property DEFAULT_MAX_TEX_MEM_MB
        * @type number
        * @public
        * @static
        */
        static DEFAULT_MAX_TEX_MEM_MB: number;
        /**
        * The maximum amount of texture memory to use before swapping textures, initialised from DEFAULT_MAX_TEX_MEM_MB
        * @property maxTextureMem
        * @type number
        * @public
        */
        public maxTextureMem: number;
        /**
        * The amount of texture memory currently uplaoded
        * @property usedTextureMem
        * @type number
        * @public
        */
        private _usedTextureMem;
        public usedTextureMem : number;
        /**
        * The number of textures currently uplaoded
        * @property usedTextureMem
        * @type number
        * @public
        */
        private _numTexturesUsed;
        public numTexturesUsed : number;
        /**
        * The number of textures uploads in the last frame
        * @property numTextureWrites
        * @type number
        * @public
        */
        public numTextureWrites: number;
        /**
        * An array of references to all texture wrappers
        * @property _textureWrapperCache
        * @type GLTextureWrapper[]
        * @private
        */
        private _textureWrapperCache;
        /**
        * Adds a texture wrapper to the cache
        * @method _addTextureToCache
        * @param glTexture {GLTextureWrapper}
        * @private
        */
        private _addTextureToCache(glTexture);
        /**
        * Deletes a texture from memory and removes the wrapper from the cache
        * @method _deleteTexture
        * @param gl {WebGLRenderingContext}
        * @param idx {number}
        * @private
        */
        private _deleteTexture(gl, idx);
        /**
        * Uploads a texture to video memory
        * @method _uploadTexture
        * @param gl {WebGLRenderingContext}
        * @param glTextureWrapper {GLTextureWrapper}
        * @return boolean
        * @private
        */
        private _uploadTexture(gl, glTextureWrapper);
        /**
        * Uploads a texture library to video memory
        * @method uploadTextureLibrary
        * @param gl {WebGLRenderingContext}
        * @param textureLibrary {Kiwi.Textures.TextureLibrary}
        * @public
        */
        public uploadTextureLibrary(gl: WebGLRenderingContext, textureLibrary: Kiwi.Textures.TextureLibrary): void;
        public uploadTexture(gl: WebGLRenderingContext, textureAtlas: Kiwi.Textures.TextureAtlas): void;
        /**
        * Removes all textures from video memory and clears the wrapper cache
        * @method clearTextures
        * @param gl {WebGLRenderingContext}
        * @public
        */
        public clearTextures(gl: WebGLRenderingContext): void;
        /**
        * Binds the texture ready for use, uploads it if it isn't already
        * @method useTexture
        * @param gl {WebGLRenderingContext}
        * @param glTextureWrapper {GLTextureWrappery}
        * @param textureSizeUniform {number}
        * @return boolean
        * @public
        */
        public useTexture(gl: WebGLRenderingContext, glTextureWrapper: Renderers.GLTextureWrapper): boolean;
        /**
        * Attemps to free space for to uplaod a texture.
        * 1: Try and find texture that is same size to remove
        * 2: Find next smallest to remove (not yet implemented)
        * 3: Sequentially remove until there is room (not yet implemented)
        * @method _freeSpace
        * @param gl {WebGLRenderingContext}
        * @param numBytesToRemove {number}
        * @return boolean
        * @public
        */
        private _freeSpace(gl, numBytesToRemove);
    }
}
/**
*
* @module Kiwi
* @submodule Renderers
*
*/
declare module Kiwi.Renderers {
    /**
    *
    * @class GLArrayBuffer
    * @constructor
    * @namespace Kiwi.Renderers
    * @param gl {WebGLRenderingContext}
    * @param [_itemSize] {number}
    * @param [items] {number[]}
    * @param [init=true] {boolean}
    * @return {GLArrayBuffer}
    */
    class GLArrayBuffer {
        constructor(gl: WebGLRenderingContext, _itemSize?: number, items?: number[], upload?: boolean);
        private _created;
        public created : boolean;
        private _uploaded;
        public uploaded : boolean;
        /**
        *
        * @property items
        * @type number[]
        * @public
        */
        public items: number[];
        /**
        *
        * @property buffer
        * @type WebGLBuffer
        * @public
        */
        public buffer: WebGLBuffer;
        /**
        *
        * @property itemSize
        * @type number
        * @public
        */
        public itemSize: number;
        /**
        *
        * @property numItems
        * @type number
        * @public
        */
        public numItems: number;
        /**
        *
        * @method clear
        * @public
        */
        public clear(): void;
        /**
        *
        * @method init
        * @param gl {WebGLRenderingCotext}
        * @return {WebGLBuffer}
        * @public
        */
        public createBuffer(gl: WebGLRenderingContext): boolean;
        public uploadBuffer(gl: WebGLRenderingContext, items: number[]): boolean;
        public deleteBuffer(gl: WebGLRenderingContext): boolean;
        /**
        *
        * @property squareVertices
        * @type number[]
        * @static
        * @default [0, 0, 100, 0, 100, 100, 0, 100]
        * @public
        */
        static squareVertices: number[];
        /**
        *
        * @property squareUVx
        * @type number[]
        * @static
        * @default [0, 0, .1, 0, .1, .1, 0, .1]
        * @public
        */
        static squareUVs: number[];
        /**
        *
        * @property squareCols
        * @type number[]
        * @static
        * @default [1, 1, 1, 1]
        * @public
        */
        static squareCols: number[];
    }
}
/**
*
* @module Kiwi
* @submodule Renderers
*
*/
declare module Kiwi.Renderers {
    /**
    *
    * @class GLElementArrayBuffer
    * @constructor
    * @namespace Kiwi.Renderers
    * @param gl {WebGLRenderingContent}
    * @param [_itemSize] {number}
    * @param [_indices] {number[]}
    * @param [init=true] {boolean}
    * @return {GLElementArrayBuffer}
    */
    class GLElementArrayBuffer {
        constructor(gl: WebGLRenderingContext, _itemSize?: number, _indices?: number[], init?: boolean);
        /**
        *
        * @property indices
        * @type number[]
        * @public
        */
        public indices: number[];
        /**
        *
        * @property buffer
        * @type WebGLBuffer
        * @public
        */
        public buffer: WebGLBuffer;
        /**
        *
        * @property itemSize
        * @type number
        * @public
        */
        public itemSize: number;
        /**
        *
        * @property numItems
        * @type number
        * @public
        */
        public numItems: number;
        /**
        *
        * @method clear
        * @public
        */
        public clear(): void;
        /**
        *
        * @method init
        * @param gl {WebGLRenderingContext}
        * @return {WebGLBuffer}
        * @public
        */
        public init(gl: WebGLRenderingContext): WebGLBuffer;
        /**
        *
        * @method refresh
        * @param gl {WebGLRenderingContext}
        * @param indices {number[]}
        * @return {WebGLBuffer}
        * @public
        */
        public refresh(gl: WebGLRenderingContext, indices: number[]): WebGLBuffer;
        /**
        *
        * @property square
        * @static
        * @type number[]
        * @default [0,1,2,0,2,3]
        * @public
        */
        static square: number[];
    }
}
declare module Kiwi.Renderers {
    class Renderer {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, isBatchRenderer?: boolean);
        static RENDERER_ID: string;
        public camMatrix: Float32Array;
        public loaded: boolean;
        public shaderManager: Kiwi.Shaders.ShaderManager;
        public enable(gl: WebGLRenderingContext, params?: any): void;
        public disable(gl: WebGLRenderingContext): void;
        public clear(gl: WebGLRenderingContext, params: any): void;
        public draw(gl: WebGLRenderingContext): void;
        public updateStageResolution(gl: WebGLRenderingContext, res: Float32Array): void;
        public updateTextureSize(gl: WebGLRenderingContext, size: Float32Array): void;
        public shaderPair: Kiwi.Shaders.ShaderPair;
        private _isBatchRenderer;
        public isBatchRenderer : boolean;
    }
}
/**
*
* @module Kiwi
* @submodule Renderers
*
*/
declare module Kiwi.Renderers {
    class TextureAtlasRenderer extends Renderers.Renderer {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params?: any);
        static RENDERER_ID: string;
        public shaderPair: Kiwi.Shaders.TextureAtlasShader;
        private _maxItems;
        private _vertexBuffer;
        private _indexBuffer;
        public enable(gl: WebGLRenderingContext, params?: any): void;
        public disable(gl: WebGLRenderingContext): void;
        public clear(gl: WebGLRenderingContext, params: any): void;
        public draw(gl: WebGLRenderingContext): void;
        /**
        * Create prebaked indices for drawing quads
        * @method _generateIndices
        * @param numQuads {number}
        * @return number[]
        * @private
        */
        private _generateIndices(numQuads);
        public updateStageResolution(gl: WebGLRenderingContext, res: Float32Array): void;
        public updateTextureSize(gl: WebGLRenderingContext, size: Float32Array): void;
        /**
        * Collates all xy and uv coordinates into a buffer ready for upload to viceo memory
        * @method _collateVertexAttributeArrays
        * @param gl {WebGLRenderingContext}
        * @param entity {Entity}
        * @param camera {Camera}
        * @public
        */
        public addToBatch(gl: WebGLRenderingContext, entity: Kiwi.Entity, camera: Kiwi.Camera): void;
        public concatBatch(vertexItems: number[]): void;
    }
}
/**
*
* @module Kiwi
* @submodule Renderers
*
*/
declare module Kiwi.Shaders {
    /**
    *
    * @class GLShaders
    * @constructor
    * @param gl {WebGLRenderingContext}
    * @return {GLShaders}
    */
    class ShaderPair {
        constructor();
        static RENDERER_ID: string;
        public init(gl: WebGLRenderingContext): void;
        public loaded: boolean;
        /**
        *
        * @property vertShader
        * @type WebGLShader
        * @public
        */
        public vertShader: WebGLShader;
        /**
        *
        * @property fragShader
        * @type WebGLShader
        * @public
        */
        public fragShader: WebGLShader;
        /**
        *
        * @property shaderProgram
        * @type WebGLProgram
        * @public
        */
        public shaderProgram: WebGLProgram;
        /**
        *
        * @method attach
        * @param gl {WebGLRenderingContext}
        * @param vertShader {WebGLShader}
        * @param fragShader {WebGLShader}
        * @return {WebGLProgram}
        * @public
        */
        public attach(gl: WebGLRenderingContext, vertShader: WebGLShader, fragShader: WebGLShader): WebGLProgram;
        /**
        *
        * @method compile
        * @param gl {WebGLRenderingContext}
        * @param src {string}
        * @param shaderType {number}
        * @return {WebGLShader}
        * @public
        */
        public compile(gl: WebGLRenderingContext, src: string, shaderType: number): WebGLShader;
        public uniforms: any;
        public attributes: any;
        /**
        *
        * @property texture2DFrag
        * @type Array
        * @public
        */
        public fragSource: any[];
        /**
        *
        * @property texture2DVert
        * @type Array
        * @public
        */
        public vertSource: any[];
        public setParam(uniformName: string, value: any): void;
        public applyUniforms(gl: WebGLRenderingContext): void;
        public applyUniform(gl: WebGLRenderingContext, name: string): void;
        public initUniforms(gl: WebGLRenderingContext): void;
    }
}
/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/
declare module Kiwi.Shaders {
    class TextureAtlasShader extends Shaders.ShaderPair {
        constructor();
        public init(gl: WebGLRenderingContext): void;
        public attributes: any;
        public uniforms: any;
        /**
        *
        * @property texture2DFrag
        * @type Array
        * @public
        */
        public fragSource: string[];
        /**
        *
        * @property texture2DVert
        * @type Array
        * @public
        */
        public vertSource: string[];
    }
}
/**
* Is the namespace in which all code that is used to create/provide an animation of various sorts are stored. These could range from animations that change the cell of a SpriteSheet that is displayed every few seconds (Animation/Sequence), to animations that change a numeric value on a object over a period time (Tweens).
*
* @module Kiwi
* @submodule Animations
* @main Animations
*/
declare module Kiwi.Animations {
    /**
    * An Animation contains information about a single animation that is held on a AnimationManager.
    * The information that is held is unique to this individual animation and will initially be the same as a Sequence,
    * but if you do ever modify the information held in this Animation the corresponding Sequence will not be updated.
    *
    * @class Animation
    * @namespace Kiwi.Animations
    * @constructor
    * @param name {string} The name of this anim.
    * @param sequences {Sequences} The sequence that this anim will be using to animate.
    * @param clock {Clock} A game clock that this anim will be using to keep record of the time between frames.
    * @param parent {AnimationManager} The animation manager that this animation belongs to.
    * @return {Anim}
    *
    */
    class Animation {
        constructor(name: string, sequence: Animations.Sequence, clock: Kiwi.Time.Clock, parent: Kiwi.Components.AnimationManager);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The AnimationManager that this animation is a child of.
        * @property _parent
        * @type AnimationManager
        * @private
        */
        private _parent;
        /**
        * The name of this animation.
        * @property name
        * @type string
        * @public
        */
        public name: string;
        /**
        * The sequence on the texture atlas that this animation is based off.
        * @property _sequence
        * @type Sequence
        * @private
        */
        private _sequence;
        /**
        * If this animation should loop or not.
        * @property _loop
        * @type boolean
        * @private
        */
        private _loop;
        /**
        * If once the animation reaches the end, it should start again from the first cell in the sequence or not.
        * @property loop
        * @type boolean
        * @public
        */
        public loop : boolean;
        /**
        * The current frame index that the animation is currently upto.
        * Note: A frame index is the index of a particular cell in the Sequence.
        * @property _frameIndex
        * @type number
        * @private
        */
        private _frameIndex;
        /**
        * The current frame index that the animation is currently upto.
        * Note: A frame index is the index of a particular cell in the Sequence.
        * @property frameIndex
        * @type number
        * @public
        */
        public frameIndex : number;
        /**
        * Returns the current cell that the animation is up to. This is READ ONLY.
        * @property currentCell
        * @type number
        * @public
        */
        public currentCell : number;
        /**
        * How fast the transition is between cells. Perhaps change to frames per second to reflect actual game speed?
        * @property _speed
        * @type number
        * @private
        */
        private _speed;
        /**
        * How long the each cell should stay on screen for. In seconds.
        * @property speed
        * @type number
        * @public
        */
        public speed : number;
        /**
        * The clock that is to be used to calculate the animations.
        * @property _clock
        * @type Clock
        * @private
        */
        private _clock;
        /**
        * The starting time of the animation from when it was played. Internal use only.
        * @property _startTime
        * @type number
        * @private
        */
        private _startTime;
        /**
        * Indicates whether the animation is playing in reverse or not.
        * @property _reverse
        * @type boolean
        * @private
        */
        private _reverse;
        /**
        * Whether the animation is to be played in reverse.
        * @property reverse
        * @type boolean
        * @public
        */
        public reverse : boolean;
        /**
        * The time at which the animation should change to the next cell
        * @property _tick
        * @type number
        * @private
        */ 
        private _tick;
        /**
        * If the animation is currently playing or not.
        * @property _isPlaying
        * @type boolean
        * @default false
        * @private
        */
        private _isPlaying;
        /**
        * If the animation is currently playing or not.
        * @property isPlaying
        * @type boolean
        * @private
        */
        public isPlaying : boolean;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has stopped playing.
        * @property _onStop
        * @type Signal
        * @public
        */
        private _onStop;
        public onStop : Kiwi.Signal;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has started playing.
        * @property _onPlay
        * @type Kiwi.Signal
        * @public
        */
        private _onPlay;
        public onPlay : Kiwi.Signal;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has updated/changed frameIndexs.
        * @property _onUpdate
        * @type Kiwi.Signal
        * @public
        */
        private _onUpdate;
        public onUpdate : Kiwi.Signal;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has come to the end of the animation and is going to play again.
        * @property _onLoop
        * @type Kiwi.Signal
        * @public
        */
        private _onLoop;
        public onLoop : Kiwi.Signal;
        /**
        * An Internal method used to start the animation.
        * @method _start
        * @param [index=null] {number} The index of the frame in the sequence that is to play. If left as null if just starts from where it left off.
        * @private
        */
        private _start(index?);
        /**
        * Plays the animation.
        * @method play
        * @public
        */
        public play(): void;
        /**
        * Plays the animation at a particular frame
        * @method playAt
        * @param index {number} The index of the cell in the sequence that the animation is to start at.
        * @public
        */
        public playAt(index: number): void;
        /**
        * Pauses the current animation.
        * @method pause
        * @public
        */
        public pause(): void;
        /**
        * Resumes the current animation after stopping.
        * @method resume
        * @public
        */
        public resume(): void;
        /**
        * Stops the current animation from playing.
        * @method stop
        * @public
        */
        public stop(): void;
        /**
        * Makes the animation go to the next frame. If the animation is at the end it goes back to the start.
        * @method nextFrame
        * @public
        */
        public nextFrame(): void;
        /**
        * Makes the animation go to the previous frame. If the animation is at the first frame it goes to the end.
        * @method prevFrame
        * @public
        */
        public prevFrame(): void;
        /**
        * The update loop. Returns a boolean indicating whether the animation has gone to a new frame or not.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * An internal method used to check to see if frame passed is valid or not
        * @method _validateFrame
        * @param frame {number} The index of the frame that is to be validated.
        * @private
        */
        private _validateFrame(frame);
        /**
        * Returns the number of frames that in the animation. Thus the animations 'length'. Note this is READ ONLY.
        * @property length
        * @type number
        * @public
        */
        public length : number;
        /**
        * Destroys the anim and all of the properties that exist on it.
        * @method destroy
        * @public
        */
        public destroy(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Animations
*
*/
declare module Kiwi.Animations {
    /**
    * A Sequence is a series of cells that are held on a SpriteSheet/TextureAtlas.
    * Sequences are generally used with the AnimationManager/Animation sections as a way to initially create Animations on GameObjects that use the same TextureAtlas.
    *
    * @class Sequence
    * @namespace Kiwi.Animations
    * @constructor
    * @param name {String} The name of this sequence. This is not unique.
    * @param cells {Number[]} The cells that are in this animation.
    * @param [speed=0.1] {Number} The time an animation should spend on each frame.
    * @param [loop=true] {boolean} If the sequence should play again if it was animating and the animation reaches the last frame.
    * @return {Sequence}
    *
    */
    class Sequence {
        constructor(name: string, cells: number[], speed?: number, loop?: boolean);
        /**
        * The name of this sequence.
        * @property name
        * @type string
        * @public
        */
        public name: string;
        /**
        * The cells that are in this animation.
        * These are a reference to the cells that are contained in a texture atlas that this sequence should be a part of.
        * @property cells
        * @type number[]
        * @public
        */
        public cells: number[];
        /**
        * The time an animation should spend on each cell.
        * @property speed
        * @type boolean
        * @public
        */
        public speed: number;
        /**
        * If the sequence should play again if it was animating and the animation reaches the last frame.
        * @property loop
        * @type boolean
        * @public
        */
        public loop: boolean;
    }
}
/**
*
* @module Kiwi
* @submodule Input
*
*/ 
declare module Kiwi.Input {
    /**
    * A compact object that holds the most important details about a Keyboard Event response.
    *
    * @class Key
    * @constructor
    * @namespace Kiwi.Input
    * @param manager {Keyboard} The keyboard manager that this key belongs to.
    * @param keycode {Number} The keycode that this key is.
    * @param [event] {KeyboardEvent} The keyboard event (if there was one) when this was created.
    * @return {Key} This object.
    *
    */
    class Key {
        constructor(manager: Input.Keyboard, keycode: number, event?: KeyboardEvent);
        /**
        * If the default action for this Key should be prevented or not.
        * For example. If your game use's the spacebar you would want its default action (which is to make the website scrolldown) prevented,
        * So you can set this to true.
        * @property preventDefault
        * @type Boolean
        * @default false
        * @public
        */
        public preventDefault: boolean;
        /**
        * The game that this key belongs to.
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The keyboard manager that this key belongs to.
        * @property _manager
        * @type Keyboard
        * @private
        */
        private _manager;
        /**
        * The keycode that this key is.
        * @property keyCode
        * @type Number
        * @public
        */
        public keyCode: number;
        /**
        * Indicated whether or not the key is currently down.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        public isDown: boolean;
        /**
        * Indicates whether or not the key is currently up.
        * @property isUp
        * @type boolean
        * @default true
        * @public
        */
        public isUp: boolean;
        /**
        * If the alt key was held at the time of the event happening.
        * @property altKey
        * @type boolean
        * @default false
        * @public
        */
        public altKey: boolean;
        /**
        * If the ctrl key was held at the time of the event happening.
        * @property ctrlKey
        * @type boolean
        * @default false
        * @public
        */
        public ctrlKey: boolean;
        /**
        * If the shift key was held at the time of the event happening.
        * @property shiftKey
        * @type boolean
        * @default false
        * @public
        */
        public shiftKey: boolean;
        /**
        * The time that the key was pressed initially.
        * @property timeDown
        * @type Number
        * @default 0
        * @public
        */
        public timeDown: number;
        /**
        * The duration (in milliseconds) that the key has been down for.
        * This is property is READ ONLY.
        * @property duration
        * @type Number
        * @default 0
        * @public
        */
        public duration : number;
        /**
        * The time at which the key was released.
        * @property timeUp
        * @type Number
        * @default 0
        * @public
        */
        public timeUp: number;
        /**
        * If this key is being 'held' down, this property will indicate the amount of times the 'onkeydown' event has fired.
        * This is reset each time the key is pressed.
        * @property repeats
        * @type Number
        * @default 0
        * @public
        */
        public repeats: number;
        /**
        * The 'update' method fires when an event occur's. Updates the keys properties
        * @method update
        * @param event {KeyboardEvent}
        * @public
        */
        public update(event: KeyboardEvent): void;
        /**
        * Returns a boolean indicating whether or not this key was just pressed.
        * @method justPressed
        * @param [duration] {Number} The duration at which determines if a key was just pressed. Defaults to the managers just pressed rate.
        * @return {boolean}
        * @public
        */
        public justPressed(duration?: number): boolean;
        /**
        * Returns a boolean indicating whether or not this key was just released.
        * @method justReleased
        * @param [duration] {Number} The duration at which determines if a key was just released. Defaults to the managers just pressed rate.
        * @return {boolean}
        * @public
        */
        public justReleased(duration?: number): boolean;
        /**
        * Resets all of the properties on the Key to their default values.
        * @method reset
        * @public
        */
        public reset(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Input
*
*/ 
declare module Kiwi.Input {
    /**
    * Handles and Manages the dispatching of keyboard events. When the user press's a button a new Key object is created.
    *
    * @class Keyboard
    * @constructor
    * @namespace Kiwi.Input
    * @param game {Game}
    * @return {Keyboard} This object.
    *
    */
    class Keyboard {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this Keyboard belongs to.
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        /**
        * Contains a reference to each Key object when they are either added to this Keyboard manager (by the developer), or when an event fires with that keycode.
        * @property _keys
        * @type Key[]
        * @private
        */
        private _keys;
        /**
        * Returns all of the Key objects that currently exist. This is READ ONLY.
        * @property keys
        * @type Keys[]
        * @public
        */
        public keys : Input.Key[];
        /**
        * The time in milliseconds which determines if a key was just pressed or not.
        * @property justPressedRate
        * @type Number
        * @default 200
        * @public
        */
        public justPressedRate: number;
        /**
        * The time in milliseconds which determines if a key was just released or not.
        * @property justReleasedRate
        * @type Number
        * @default 200
        * @public
        */
        public justReleasedRate: number;
        /**
        * Is executed when the DOMElements that are need to get the game going are loaded and thus the game can 'boot'
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * The update loop that is executed every frame.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * A Signal that dispatches events when a key is released/is now up.
        * @property onKeyUp
        * @type Signal
        * @public
        */
        public onKeyUp: Kiwi.Signal;
        /**
        * A Signal that dispatches events when a key is pressed/is down.
        * This mimics the natural 'keydown' event listener, so it will keep dispatching events if the user holds the key down.
        * Note: This fires after the 'onKeyDownOnce' signal.
        *
        * @property onKeyDown
        * @type Signal
        * @public
        */
        public onKeyDown: Kiwi.Signal;
        /**
        * A Signal that dispatches events when a key is pressed/is down initially.
        * This event only fires the first time that the key is pressed, so it won't dispatch events if the user is holding the key down.
        * Note: This fires before the 'onKeyDown' signal;
        *
        * @property onKeyDownOnce
        * @type Signal
        * @public
        */
        public onKeyDownOnce: Kiwi.Signal;
        /**
        * Adds the event listeners to the browser to listen for key events.
        * @method start
        * @public
        */
        public start(): void;
        /**
        * Removes the event listeners and so effectively 'stops' all keyboard events.
        * @method stop
        * @public
        */
        public stop(): void;
        /**
        * Is executed when a key is pressed/is down. This then either creates a new Key (if one does not currently exist) for that keycode,
        * or it updates the key that was pressed (if one does exist).
        * @method onKeyDown
        * @param {KeyboardEvent} event.
        * @private
        */
        private _keyPressed(event);
        /**
        * Is executed when a key is release/is now up. This then either creates a new Key (if one does not currently exist) for that keycode,
        * or it updates the key that was released (if one does exist).
        * @method onKeyUp
        * @param {KeyboardEvent} event.
        * @private
        */
        private _keyReleased(event);
        /**
        * Creates a new Key object for a keycode that is specified.
        * Not strictly needed (as one will be created once an event occurs on that keycode) but can be good for setting the game up
        * and choosing whether to prevent that keys any default action.
        * @method addKey
        * @param keycode {Number} The keycode of the key that you want to add.
        * @param [preventDefault=false] {Boolean} If the default action for that key should be prevented or not when an event fires.
        * @return {Key}
        * @public
        */
        public addKey(keycode: number, preventDefault?: boolean): Input.Key;
        /**
        * Returns a boolean indicating if a key (that you pass via a keycode) was just pressed or not.
        * @method justPressed
        * @param keycode {Number} The keycode of the key that you would like to check against.
        * @param [duration=this.justPressedRate] {Number} The duration at which determines if a key was 'just' pressed or not. If not specified defaults to the justPressedRate
        * @public
        */
        public justPressed(keycode: any, duration?: number): boolean;
        /**
        * Returns a boolean indicating if a key (that you pass via a keycode) was just released or not.
        * @method justReleased
        * @param keycode {Number} The keycode of the key that you would like to check against.
        * @param [duration=this.justReleasedRate] {Number} The duration at which determines if a key was 'just' released or not. If not specified defaults to the justReleasedRate
        * @public
        */
        public justReleased(keycode: any, duration?: number): boolean;
        /**
        * Returns a boolean indicating whether a key (that you pass via its keycode) is down or not.
        * @method isDown
        * @param keycode {Number} The keycode of the key that you are checking.
        * @return {boolean}
        * @public
        */
        public isDown(keycode: number): boolean;
        /**
        * Returns a boolean indicating whether a key (that you pass via its keycode) is up or not.
        * @method isUp
        * @param keycode {Number} The keycode of the key that you are checking.
        * @return {boolean}
        * @public
        */
        public isUp(keycode: number): boolean;
        /**
        * Executes the reset method on every Key that currently exists.
        * @method reset
        * @public
        */
        public reset(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Input
*
*/ 
declare module Kiwi.Input {
    /**
    * A Static class which has a property associated with all all of the character codes on a typical keyboard. While you don't need this class for your game to work, it is quite handy to use as it can speed up the development process.
    *
    * @class Keycodes
    * @namespace Kiwi.Input
    * @static
    */
    class Keycodes {
        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * A Static property that holds the keycode for the character A
        * @property A
        * @static
        * @final
        * @public
        */
        static A: number;
        /**
        * A Static property that holds the keycode for the character B
        * @property B
        * @static
        * @final
        * @public
        */
        static B: number;
        /**
        * A Static property that holds the keycode for the character C
        * @property C
        * @static
        * @final
        * @public
        */
        static C: number;
        /**
        * A Static property that holds the keycode for the character D
        * @property D
        * @static
        * @final
        * @public
        */
        static D: number;
        /**
        * A Static property that holds the keycode for the character E
        * @property E
        * @static
        * @final
        * @public
        */
        static E: number;
        /**
        * A Static property that holds the keycode for the character F
        * @property F
        * @static
        * @final
        * @public
        */
        static F: number;
        /**
        * A Static property that holds the keycode for the character G
        * @property G
        * @static
        * @final
        * @public
        */
        static G: number;
        /**
        * A Static property that holds the keycode for the character H
        * @property H
        * @static
        * @final
        * @public
        */
        static H: number;
        /**
        * A Static property that holds the keycode for the character I
        * @property I
        * @static
        * @final
        * @public
        */
        static I: number;
        /**
        * A Static property that holds the keycode for the character J
        * @property J
        * @static
        * @final
        * @public
        */
        static J: number;
        /**
        * A Static property that holds the keycode for the character K
        * @property K
        * @static
        * @final
        * @public
        */
        static K: number;
        /**
        * A Static property that holds the keycode for the character L
        * @property L
        * @static
        * @final
        * @public
        */
        static L: number;
        /**
        * A Static property that holds the keycode for the character M
        * @property M
        * @static
        * @final
        * @public
        */
        static M: number;
        /**
        * A Static property that holds the keycode for the character N
        * @property N
        * @static
        * @final
        * @public
        */
        static N: number;
        /**
        * A Static property that holds the keycode for the character O
        * @property O
        * @static
        * @final
        * @public
        */
        static O: number;
        /**
        * A Static property that holds the keycode for the character P
        * @property P
        * @static
        * @final
        * @public
        */
        static P: number;
        /**
        * A Static property that holds the keycode for the character Q
        * @property Q
        * @static
        * @final
        * @public
        */
        static Q: number;
        /**
        * A Static property that holds the keycode for the character R
        * @property R
        * @static
        * @final
        * @public
        */
        static R: number;
        /**
        * A Static property that holds the keycode for the character S
        * @property S
        * @static
        * @final
        * @public
        */
        static S: number;
        /**
        * A Static property that holds the keycode for the character T
        * @property T
        * @static
        * @final
        * @public
        */
        static T: number;
        /**
        * A Static property that holds the keycode for the character U
        * @property U
        * @static
        * @final
        * @public
        */
        static U: number;
        /**
        * A Static property that holds the keycode for the character V
        * @property V
        * @static
        * @final
        * @public
        */
        static V: number;
        /**
        * A Static property that holds the keycode for the character W
        * @property W
        * @static
        * @final
        * @public
        */
        static W: number;
        /**
        * A Static property that holds the keycode for the character X
        * @property X
        * @static
        * @final
        * @public
        */
        static X: number;
        /**
        * A Static property that holds the keycode for the character Y
        * @property Y
        * @static
        * @final
        * @public
        */
        static Y: number;
        /**
        * A Static property that holds the keycode for the character Z
        * @property Z
        * @static
        * @final
        * @public
        */
        static Z: number;
        /**
        * A Static property that holds the keycode for the character 0
        * @property ZERO
        * @static
        * @final
        * @public
        */
        static ZERO: number;
        /**
        * A Static property that holds the keycode for the character 1
        * @property ONE
        * @static
        * @final
        * @public
        */
        static ONE: number;
        /**
        * A Static property that holds the keycode for the character 2
        * @property TWO
        * @static
        * @final
        * @public
        */
        static TWO: number;
        /**
        * A Static property that holds the keycode for the character 3
        * @property THREE
        * @static
        * @final
        * @public
        */
        static THREE: number;
        /**
        * A Static property that holds the keycode for the character 4
        * @property FOUR
        * @static
        * @final
        * @public
        */
        static FOUR: number;
        /**
        * A Static property that holds the keycode for the character 5
        * @property FIVE
        * @static
        * @final
        * @public
        */
        static FIVE: number;
        /**
        * A Static property that holds the keycode for the character 6
        * @property SIX
        * @static
        * @final
        * @public
        */
        static SIX: number;
        /**
        * A Static property that holds the keycode for the character 7
        * @property SEVEN
        * @static
        * @final
        * @public
        */
        static SEVEN: number;
        /**
        * A Static property that holds the keycode for the character 8
        * @property EIGHT
        * @static
        * @final
        * @public
        */
        static EIGHT: number;
        /**
        * A Static property that holds the keycode for the character 9
        * @property NINE
        * @static
        * @final
        * @public
        */
        static NINE: number;
        /**
        * A Static property that holds the keycode for the character number pad 0
        * @property NUMPAD_0
        * @static
        * @final
        * @public
        */
        static NUMPAD_0: number;
        /**
        * A Static property that holds the keycode for the character number pad 1
        * @property NUMPAD_1
        * @static
        * @final
        * @public
        */
        static NUMPAD_1: number;
        /**
        * A Static property that holds the keycode for the character number pad 2
        * @property NUMPAD_2
        * @static
        * @final
        * @public
        */
        static NUMPAD_2: number;
        /**
        * A Static property that holds the keycode for the character number pad 3
        * @property NUMPAD_3
        * @static
        * @final
        * @public
        */
        static NUMPAD_3: number;
        /**
        * A Static property that holds the keycode for the character number pad 4
        * @property NUMPAD_4
        * @static
        * @final
        * @public
        */
        static NUMPAD_4: number;
        /**
        * A Static property that holds the keycode for the character number pad 5
        * @property NUMPAD_5
        * @static
        * @final
        * @public
        */
        static NUMPAD_5: number;
        /**
        * A Static property that holds the keycode for the character number pad 6
        * @property NUMPAD_6
        * @static
        * @final
        * @public
        */
        static NUMPAD_6: number;
        /**
        * A Static property that holds the keycode for the character number pad 7
        * @property NUMPAD_7
        * @static
        * @final
        * @public
        */
        static NUMPAD_7: number;
        /**
        * A Static property that holds the keycode for the character number pad 8
        * @property NUMPAD_8
        * @static
        * @final
        * @public
        */
        static NUMPAD_8: number;
        /**
        * A Static property that holds the keycode for the character number pad 9
        * @property NUMPAD_9
        * @static
        * @final
        * @public
        */
        static NUMPAD_9: number;
        /**
        * A Static property that holds the keycode for the character number pad *
        * @property NUMPAD_MULTIPLY
        * @static
        * @final
        * @public
        */
        static NUMPAD_MULTIPLY: number;
        /**
        * A Static property that holds the keycode for the character number pad +
        * @property NUMPAD_ADD
        * @static
        * @final
        * @public
        */
        static NUMPAD_ADD: number;
        /**
        * A Static property that holds the keycode for the character on the number pad enter
        * @property NUMPAD_ENTER
        * @static
        * @final
        * @public
        */
        static NUMPAD_ENTER: number;
        /**
        * A Static property that holds the keycode for the character number pad -
        * @property NUMPAD_SUBTRACT
        * @static
        * @final
        * @public
        */
        static NUMPAD_SUBTRACT: number;
        /**
        * A Static property that holds the keycode for the character number pad .
        * @property NUMPAD_DECIMAL
        * @static
        * @final
        * @public
        */
        static NUMPAD_DECIMAL: number;
        /**
        * A Static property that holds the keycode for the character /
        * @property NUMPAD_DIVIDE
        * @static
        * @final
        * @public
        */
        static NUMPAD_DIVIDE: number;
        /**
        * A Static property that holds the keycode for the character F1
        * @property F1
        * @static
        * @final
        * @public
        */
        static F1: number;
        /**
        * A Static property that holds the keycode for the character F2
        * @property F2
        * @static
        * @final
        * @public
        */
        static F2: number;
        /**
        * A Static property that holds the keycode for the character F3
        * @property F3
        * @static
        * @final
        * @public
        */
        static F3: number;
        /**
        * A Static property that holds the keycode for the character F4
        * @property F4
        * @static
        * @final
        * @public
        */
        static F4: number;
        /**
        * A Static property that holds the keycode for the character F5
        * @property F5
        * @static
        * @final
        * @public
        */
        static F5: number;
        /**
        * A Static property that holds the keycode for the character F6
        * @property F6
        * @static
        * @final
        * @public
        */
        static F6: number;
        /**
        * A Static property that holds the keycode for the character F7
        * @property F7
        * @static
        * @final
        * @public
        */
        static F7: number;
        /**
        * A Static property that holds the keycode for the character F8
        * @property F8
        * @static
        * @final
        * @public
        */
        static F8: number;
        /**
        * A Static property that holds the keycode for the character F9
        * @property F9
        * @static
        * @final
        * @public
        */
        static F9: number;
        /**
        * A Static property that holds the keycode for the character F10
        * @property F10
        * @static
        * @final
        * @public
        */
        static F10: number;
        /**
        * A Static property that holds the keycode for the character F11
        * @property F11
        * @static
        * @final
        * @public
        */
        static F11: number;
        /**
        * A Static property that holds the keycode for the character F12
        * @property F12
        * @static
        * @final
        * @public
        */
        static F12: number;
        /**
        * A Static property that holds the keycode for the character F13
        * @property F13
        * @static
        * @final
        * @public
        */
        static F13: number;
        /**
        * A Static property that holds the keycode for the character F14
        * @property F14
        * @static
        * @final
        * @public
        */
        static F14: number;
        /**
        * A Static property that holds the keycode for the character F15
        * @property F15
        * @static
        * @final
        * @public
        */
        static F15: number;
        /**
        * A Static property that holds the keycode for the character COLON
        * @property COLON
        * @static
        * @final
        * @public
        */
        static COLON: number;
        /**
        * A Static property that holds the keycode for the character =
        * @property EQUALS
        * @static
        * @final
        * @public
        */
        static EQUALS: number;
        /**
        * A Static property that holds the keycode for the character UNDERSCORE
        * @property UNDERSCORE
        * @static
        * @final
        * @public
        */
        static UNDERSCORE: number;
        /**
        * A Static property that holds the keycode for the character QUESTION_MARK
        * @property QUESTION_MARK
        * @static
        * @final
        * @public
        */
        static QUESTION_MARK: number;
        /**
        * A Static property that holds the keycode for the character TILDE
        * @property TILDE
        * @static
        * @final
        * @public
        */
        static TILDE: number;
        /**
        * A Static property that holds the keycode for the character OPEN_BRAKET
        * @property OPEN_BRACKET
        * @static
        * @final
        * @public
        */
        static OPEN_BRACKET: number;
        /**
        * A Static property that holds the keycode for the character BACKWARD_SLASH
        * @property BACKWARD_SLASH
        * @static
        * @final
        * @public
        */
        static BACKWARD_SLASH: number;
        /**
        * A Static property that holds the keycode for the character CLOSED_BRACKET
        * @property CLOSED_BRACKET
        * @static
        * @final
        * @public
        */
        static CLOSED_BRACKET: number;
        /**
        * A Static property that holds the keycode for the character QUOTES
        * @property QUOTES
        * @static
        * @final
        * @public
        */
        static QUOTES: number;
        /**
        * A Static property that holds the keycode for the character BACKSPACE
        * @property BACKSPACE
        * @static
        * @final
        * @public
        */
        static BACKSPACE: number;
        /**
        * A Static property that holds the keycode for the character TAB
        * @property TAB
        * @static
        * @final
        * @public
        */
        static TAB: number;
        /**
        * A Static property that holds the keycode for the character CLEAR
        * @property CLEAR
        * @static
        * @final
        * @public
        */
        static CLEAR: number;
        /**
        * A Static property that holds the keycode for the character ENTER
        * @property ENTER
        * @static
        * @final
        * @public
        */
        static ENTER: number;
        /**
        * A Static property that holds the keycode for the character SHIFT
        * @property SHIFT
        * @static
        * @final
        * @public
        */
        static SHIFT: number;
        /**
        * A Static property that holds the keycode for the character CONTROL
        * @property CONTROL
        * @static
        * @final
        * @public
        */
        static CONTROL: number;
        /**
        * A Static property that holds the keycode for the character ALT
        * @property ALT
        * @static
        * @final
        * @public
        */
        static ALT: number;
        /**
        * A Static property that holds the keycode for the character CAPS_LOCK
        * @property CAPS_LOCK
        * @static
        * @final
        * @public
        */
        static CAPS_LOCK: number;
        /**
        * A Static property that holds the keycode for the character ESC
        * @property ESC
        * @static
        * @final
        * @public
        */
        static ESC: number;
        /**
        * A Static property that holds the keycode for the character SPACEBAR
        * @property SPACEBAR
        * @static
        * @final
        * @public
        */
        static SPACEBAR: number;
        /**
        * A Static property that holds the keycode for the character PAGE_UP
        * @property PAGE_UP
        * @static
        * @final
        * @public
        */
        static PAGE_UP: number;
        /**
        * A Static property that holds the keycode for the character PAGE_DOWN
        * @property PAGE_DOWN
        * @static
        * @final
        * @public
        */
        static PAGE_DOWN: number;
        /**
        * A Static property that holds the keycode for the character END
        * @property END
        * @static
        * @final
        * @public
        */
        static END: number;
        /**
        * A Static property that holds the keycode for the character HOME
        * @property HOME
        * @static
        * @final
        * @public
        */
        static HOME: number;
        /**
        * A Static property that holds the keycode for the character LEFT
        * @property LEFT
        * @static
        * @final
        * @public
        */
        static LEFT: number;
        /**
        * A Static property that holds the keycode for the character UP
        * @property UP
        * @static
        * @final
        * @public
        */
        static UP: number;
        /**
        * A Static property that holds the keycode for the character RIGHT
        * @property RIGHT
        * @static
        * @final
        * @public
        */
        static RIGHT: number;
        /**
        * A Static property that holds the keycode for the character DOWN
        * @property DOWN
        * @static
        * @final
        * @public
        */
        static DOWN: number;
        /**
        * A Static property that holds the keycode for the character INSERT
        * @property INSERT
        * @static
        * @final
        * @public
        */
        static INSERT: number;
        /**
        * A Static property that holds the keycode for the character DELETE
        * @property DELETE
        * @static
        * @final
        * @public
        */
        static DELETE: number;
        /**
        * A Static property that holds the keycode for the character HELP
        * @property HELP
        * @static
        * @final
        * @public
        */
        static HELP: number;
        /**
        * A Static property that holds the keycode for the character NUM_LOCK
        * @property NUM_LOCK
        * @static
        * @final
        * @public
        */
        static NUM_LOCK: number;
    }
}
/**
* Section that contains the code related to handling user interaction with a game.
*
* @module Kiwi
* @submodule Input
* @main Input
*/ 
declare module Kiwi.Input {
    /**
    * Handles the initialization and management of the various ways a user can interact with the device/game, whether this is through a Keyboard and Mouse or by a Touch. Also contains some of the general callbacks that are 'global' between both Desktop and Mobile based devices.
    *
    * @class InputManager
    * @constructor
    * @namespace Kiwi.Input
    * @param game {Game} The game that this object belongs to.
    * @return {InputManager} This object.
    *
    */
    class InputManager {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this is.
        * @method objType
        * @return String
        * @public
        */
        public objType(): string;
        /**
        * A Signal that dispatches a event when any Pointer is pressed from the game.
        * @property onDown
        * @type Signal
        * @public
        */
        public onDown: Kiwi.Signal;
        /**
        * A Signal that dispatches a event when any Pointer is released from the game.
        * @property onUp
        * @type Signal
        * @public
        */
        public onUp: Kiwi.Signal;
        /**
        * The game that this manager belongs to.
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        /**
        * A reference to the mouse manager.
        * @property mouse
        * @type Mouse
        * @public
        */
        public mouse: Input.Mouse;
        /**
        * The keyboard manager
        * @property keyboard
        * @type Keyboard
        * @public
        */
        public keyboard: Input.Keyboard;
        /**
        * The touch manager.
        * @property touch
        * @type Touch
        * @public
        */
        public touch: Input.Touch;
        /**
        * An array containing all of the pointers that are active on the stage.
        * @property _pointers
        * @type Pointer[]
        * @private
        */
        private _pointers;
        /**
        * Returns all of the pointers that can be used on the Input Manager. This is READ only.
        * @property pointer
        * @type Pointer[]
        * @public
        */
        public pointers : Input.Pointer[];
        /**
        * This method is executed when the DOM has loaded and the manager is ready to load.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * A private method that gets dispatched when either the mouse or touch manager dispatches a down event
        * @method _onDownEvent
        * @param x {Number} The x coordinate of the pointer
        * @param y {Number} The y coordinate of the pointer
        * @param timeDown {Number} The time that the pointer has been down for.
        * @param timeUp {Number} The Time that the pointer has been up form
        * @param duration {Number}
        * @param pointer {Pointer} The pointer that was used.
        * @private
        */
        private _onDownEvent(x, y, timeDown, timeUp, duration, pointer);
        /**
        * A private method that gets dispatched when either the mouse or touch manager dispatches a up event
        * @method _onUpEvent
        * @param x {Number} The x coordinate of the pointer
        * @param y {Number} The y coordinate of the pointer
        * @param timeDown {Number} The time that the pointer has been down for.
        * @param timeUp {Number} The Time that the pointer has been up form
        * @param duration {Number}
        * @param pointer {Pointer} The pointer that was used.
        * @private
        */
        private _onUpEvent(x, y, timeDown, timeUp, duration, pointer);
        public onPressed : Kiwi.Signal;
        /**
        * An alias for the onRelease signal that goes straight to the onUp
        * @property onReleased
        * @type Signal
        * @public
        */
        public onReleased : Kiwi.Signal;
        /**
        * The update loop that gets executed every frame.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Runs the reset method on the managers.
        * @method reset
        */
        public reset(): void;
        /**
        * The position of the last pointer that was/is active on the stage.
        * @property position
        * @type Point
        * @public
        */
        public position: Kiwi.Geom.Point;
        /**
        * If an input is currently down. Not an accurate representation, should use the individual managers.
        * @property isDown
        * @type boolean
        * @public
        */
        public isDown: boolean;
        /**
        * Populated x coordinate based on the most recent click/touch event
        * @property x
        * @type Number
        * @public
        */
        public x : number;
        /**
        * Populated y coordinate based on the most recent click/touch event
        * @property y
        * @type Number
        * @public
        */
        public y : number;
    }
}
/**
*
* @module Kiwi
* @submodule Input
*
*/ 
declare module Kiwi.Input {
    /**
    * Handles the dispatching/management of Mouse Events on a game. When this class is instantiated a MouseCursor object is also created (on this object) which holds the information that is unique to the mouse cursor, although majority of that information is still accessible inside this object.
    *
    * @class Mouse
    * @constructor
    * @namespace Kiwi.Input
    * @param game {Game} The game that this mouse manager belongs to.
    * @return {Mouse}
    *
    */
    class Mouse {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this mouse manager belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * The HTMLElement that is being used to apply the mouse events to.
        * @property _domElement
        * @type HTMLDivElement
        * @private
        */
        private _domElement;
        /**
        * The numeric value for the LEFT button.
        * @property LEFT_BUTTON
        * @type Number
        * @static
        * @public
        * @final
        * @default 0
        */
        static LEFT_BUTTON: number;
        /**
        * The numeric value for the MIDDLE button.
        * @property MIDDLE_BUTTON
        * @type Number
        * @static
        * @public
        * @final
        * @default 1
        */
        static MIDDLE_BUTTON: number;
        /**
        * The numeric value for the RIGHT button.
        * @property RIGHT_BUTTON
        * @type Number
        * @static
        * @public
        * @final
        * @default 2
        */
        static RIGHT_BUTTON: number;
        /**
        * A Signal that dispatches events when the mouse is pressed down on the stage.
        * @property onDown
        * @type Kiwi.Signal
        * @public
        */
        public onDown: Kiwi.Signal;
        /**
        * A Signal that dispatches events when the mouse is released from being down on the stage.
        * @property onUp
        * @type Kiwi.Signal
        * @public
        */
        public onUp: Kiwi.Signal;
        /**
        * A Signal that dispatches events mouse wheel moves.
        * @property mouseWheel
        * @type Kiwi.Signal
        * @public
        */
        public onWheel: Kiwi.Signal;
        /**
        * The MouseCursor that is on the stage. This contains the coordinates and information about the cursor.
        * @property _cursor
        * @type MouseCursor
        * @private
        */
        private _cursor;
        /**
        * Returns the MouseCursor that is being used on the stage. This is READ ONLY.
        * @property cursor
        * @type MouseCursor
        * @private
        */
        public cursor : Input.MouseCursor;
        /**
        * This method is executed when the DOM has finished loading and thus the MouseManager can start listening for events.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Indicates whether or not the cursor is currently down. This is READ ONLY.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        public isDown : boolean;
        /**
        * Indicates whether or not the cursor is currently up. This is READ ONLY.
        * @property isUp
        * @type boolean
        * @default true
        * @public
        */
        public isUp : boolean;
        /**
        * Gets the duration in Milliseconds that the mouse cursor has either been up or down for.
        * @property duration
        * @type number
        * @public
        */
        public duration : number;
        /**
        * Gets the x coordinate of the mouse cursor.
        * @property x
        * @type number
        * @public
        */
        public x : number;
        /**
        * Gets the y coordinate of the mouse cursor.
        * @property y
        * @type number
        * @public
        */
        public y : number;
        /**
        * Gets the wheelDeltaX coordinate of the mouse cursors wheel.
        * @property wheelDeltaX
        * @type number
        * @public
        */
        public wheelDeltaX : number;
        /**
        * Gets the wheelDeltaY coordinate of the mouse cursors wheel.
        * @property wheelDeltaY
        * @type number
        * @public
        */
        public wheelDeltaY : number;
        /**
        * Indicates if the ctrl key is down.
        * @property ctrlKey
        * @type boolean
        * @default false
        * @public
        */
        public ctrlKey : boolean;
        /**
        * Indicates if the shift key is down.
        * @property shiftKey
        * @type boolean
        * @default false
        * @public
        */
        public shiftKey : boolean;
        /**
        * Indicates if the alt key is down.
        * @property altKey
        * @type boolean
        * @default false
        * @public
        */
        public altKey : boolean;
        /**
        * Returns a number indicating the button that was used. This can be used with the STATIC button properties.
        * @property button
        * @type number
        * @public
        */
        public button : number;
        /**
        * The update loop for the cursor.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Start the mouse event listeners on the game. Automatically called by the boot.
        * @method start
        * @public
        */
        public start(): void;
        /**
        * Stops the mouse event listeners from working. Useful if you no longer want the mouse to 'work'/be listened to.
        * @method stop
        * @public
        */
        public stop(): void;
        /**
        * Method that gets fired when the mouse is pressed on the stage.
        * @method onMouseDown
        * @param {MouseEvent} event.
        * @private
        */
        private onMouseDown(event);
        /**
        * Method that gets fired when the mouse moves anywhere on the stage.
        * @method onMouseMove
        * @param {MouseEvent} event.
        * @private
        */
        private onMouseMove(event);
        /**
        * Method that gets fired when the mouse is released on the stage.
        * @method onMouseUp
        * @param {MouseEvent} event.
        * @private
        */
        private onMouseUp(event);
        /**
        * Method that gets fired when the mousewheel is moved.
        * @method onMouseWheel
        * @param {MouseEvent} event.
        * @private
        */
        private onMouseWheel(event);
        /**
        * Returns a boolean indicating if the mouse was 'justPressed' within a certain timeframe. The default timeframe is 200 milliseconds.
        * @method justPressed
        * @param [duration=200] {Number} The timeframe that it could have occured in.
        * @return {boolean}
        * @public
        */
        public justPressed(duration?: number): boolean;
        /**
        * Returns a boolean indicating if the mouse was 'justReleased' within a certain timeframe. The default timeframe is 200 milliseconds.
        * @method justReleased
        * @param [duration=200] {Number} The timeframe that it could have occured in..
        * @return {boolean}
        * @public
        */
        public justReleased(duration?: number): boolean;
        /**
        * Runs the Reset method on the MouseCursor.
        * @method reset
        * @public
        */
        public reset(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Input
*
*/ 
declare module Kiwi.Input {
    /**
    * Handles the dispatching and management of touch based events for the game. When the Touch manager is created TEN finger objects are created and used when the user interacts with the screen. Those finger are what you can use to create games that make the most out of multitouch events.
    *
    * @class Touch
    * @constructor
    * @namespace Kiwi.Input
    * @param game {Game} the game that this touch manager belongs to.
    * @return {Touch} This object.
    *
    */
    class Touch {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return String
        * @public
        */
        public objType(): string;
        /**
        * The game that this touch manager belongs to.
        * @property _game
        * @type Game
        * @private
        **/
        private _game;
        /**
        * The dom element that these touch events are to take place on. This is usally set to be the stage/game container.
        * @property _domElement
        * @type HTMLElement
        * @default null
        * @private
        **/
        private _domElement;
        /**
        * Contains a list of all of the fingers that are used for the touch events.
        * @property _fingers
        * @type Array
        * @private
        */
        private _fingers;
        /**
        * Get the fingers that are being used.
        * @type Finger[]
        * @public
        */
        public fingers : Input.Finger[];
        /**
        * The first finger that is used for touch events.
        * @property finger1
        * @type Finger
        * @public
        */
        public finger1: Input.Finger;
        /**
        * The second finger that is used for touch events.
        * @property finger2
        * @type Finger
        * @public
        */
        public finger2: Input.Finger;
        /**
        * The third finger that is used for touch events.
        * @property finger3
        * @type Finger
        * @public
        */
        public finger3: Input.Finger;
        /**
        * The fourth finger that is used for touch events.
        * @property finger4
        * @type Finger
        * @public
        */
        public finger4: Input.Finger;
        /**
        * Finger number five that is used for touch events.
        * @property finger5
        * @type Finger
        * @public
        */
        public finger5: Input.Finger;
        /**
        * Finger number six, that is used for touch events.
        * @property finger6
        * @type Finger
        * @public
        */
        public finger6: Input.Finger;
        /**
        * The seventh finger used for touch events.
        * @property finger7
        * @type Finger
        * @public
        */
        public finger7: Input.Finger;
        /**
        * Finger number eight
        * @property finger8
        * @type Finger
        * @public
        */
        public finger8: Input.Finger;
        /**
        * The ninth finger that is used for touch events.
        * @property finger9
        * @type Finger
        * @public
        */
        public finger9: Input.Finger;
        /**
        * The tenth finger that is used for touch events.
        * @property finger10
        * @type Finger
        * @public
        */
        public finger10: Input.Finger;
        /**
        * The latest finger that was used for any task.
        * @property latestFinger
        * @type Finger
        * @public
        */
        public latestFinger: Input.Finger;
        /**
        * A boolean that will roughly indicate if any finger is currently down.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        public isDown: boolean;
        /**
        * If all the fingers are up.
        * @property isUp
        * @type boolean
        * @default true
        * @public
        */
        public isUp: boolean;
        /**
        * A Kiwi Signal that dispatches an event when a user presses down on the stage.
        * @property touchDown
        * @type Signal
        * @public
        */
        public touchDown: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches an event when a user releases a finger off of the stage.
        * @property touchUp
        * @type Signal
        * @public
        */
        public touchUp: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches an event when a touch event is cancelled for the some reason.
        * @property touchCancel
        * @tpye Signal
        * @public
        */
        public touchCancel: Kiwi.Signal;
        /**
        * An internal Kiwi method that runs when the DOM is loaded and the touch manager can now 'boot' up.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Starts up the event listeners that are being used on the touch manager.
        * @method start
        * @public
        */
        public start(): void;
        /**
        * Prevent iOS bounce-back (doesn't work?)
        * @method consumeTouchMove
        * @param {Any} event
        * @public
        */
        private consumeTouchMove(event);
        /**
        * Gets the position of the latest finger on the x axis.
        * @type number
        * @public
        */
        public x : number;
        /**
        * Gets the position of the latest finger on the y axis.
        * @type number
        * @public
        */
        public y : number;
        /**
        * The developer defined maximum number of touch events. By default this is set to 10 but this can be set to be lower.
        * @property _maxTouchEvents
        * @type number
        * @default 10
        * @private
        */
        private _maxPointers;
        /**
        * Gets the maximum number of points of contact that are allowed on the game stage at one point.
        * @type number
        * @public
        */
        /**
        * Sets the maximum number of point of contact that are allowed on the game stage at one point.
        * The maximum number of points that are allowed is 10, and the minimum is 0.
        * @type number
        * @public
        */
        public maximumPointers : number;
        /**
        * This method runs when the a touch start event is fired by the browser and then assigns the event to a pointer that is currently not active.
        * @method onTouchStart
        * @param {Any} event
        * @private
        */
        private onTouchStart(event);
        /**
        * Doesn't appear to be supported by most browsers yet but if it was it would fire events when a touch is canceled.
        * @method onTouchCancel
        * @param {Any} event
        * @private
        */
        private onTouchCancel(event);
        /**
        * Doesn't appear to be supported by most browsers yet. But if it was would fire events when touch events enter an element.
        * @method onTouchEnter
        * @param {Any} event
        * @private
        */
        private onTouchEnter(event);
        /**
        * Doesn't appear to be supported by most browsers yet. Would fire events when a 'finger' leaves an element.
        * Would be handly for when an finger 'leaves' the stage.
        * @method onTouchLeave
        * @param {Any} event
        * @private
        */
        private onTouchLeave(event);
        /**
        * When a touch pointer moves. This method updates the appropriate pointer.
        * @method onTouchMove
        * @param {Any} event
        * @private
        */
        private onTouchMove(event);
        /**
        * When a touch event gets released.
        * @method onTouchEnd
        * @param {Any} event
        * @private
        */
        private onTouchEnd(event);
        /**
        * The update loop fro the touch manager.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * This method removes all of the event listeners and thus 'stops' the touch manager.
        * @method stop
        * @public
        */
        public stop(): void;
        /**
        * Resets all of the fingers/pointers to their default states.
        * @method reset
        * @public
        */
        public reset(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Input
*
*/ 
declare module Kiwi.Input {
    /**
    * Is a generic class that holds the properties/methods that are common across various different methods of inputs from the user, mainly between Touch and Mouse based events. This abstract class and such it is suppose to be extended from for individual implementations.
    *
    * @class Pointer
    * @constructor
    * @namespace Kiwi.Input
    * @param {Game} game
    * @return Pointer
    *
    */
    class Pointer {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this class is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * The game that this pointer belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * Get the game that this pointer belongs to.
        * @type Game
        * @public
        */
        public game : Kiwi.Game;
        /**
        * The unique identifier for this pointer.
        * @property _id
        * @type number
        * @private
        */
        public id: number;
        /**
        * The horizontal coordinate of point relative to the game element
        * @property x
        * @type Number
        * @default -1
        * @public
        */
        public x: number;
        /**
        * The vertical coordinate of point relative to the game element
        * @property y
        * @type Number
        * @default -1
        * @public
        */
        public y: number;
        /**
        * The horizontal coordinate of point relative to the viewport in pixels, excluding any scroll offset
        * @property clientX
        * @type Number
        * @default -1
        * @public
        */
        public clientX: number;
        /**
        * The vertical coordinate of point relative to the viewport in pixels, excluding any scroll offset
        * @property clientY
        * @type Number
        * @default -1
        * @public
        */
        public clientY: number;
        /**
        * The horizontal coordinate of point relative to the viewport in pixels, including any scroll offset
        * @property pageX
        * @type Number
        * @default -1
        * @public
        */
        public pageX: number;
        /**
        * The vertical coordinate of point relative to the viewport in pixels, including any scroll offset
        * @property pageY
        * @type Number
        * @default -1
        * @public
        */
        public pageY: number;
        /**
        * The horizontal coordinate of point relative to the screen in pixels
        * @property screenX
        * @type Number
        * @default -1
        * @public
        */
        public screenX: number;
        /**
        * The vertical coordinate of point relative to the screen in pixels
        * @property screenY
        * @type Number
        * @default -1
        * @public
        */
        public screenY: number;
        /**
        * The point that this pointer is at. Same c ordina es asX/Y properties.
        * @property point
        * @type Point
        * @public
        */
        public point: Kiwi.Geom.Point;
        /**
        * A circle that is representative of the area this point covers.
        * @property circle
        * @type Circle
        * @public
        */
        public circle: Kiwi.Geom.Circle;
        /**
        * Indicates if this pointer is currently down.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        public isDown: boolean;
        /**
        * Indicates if this pointer is currently up.
        * @property isUp
        * @default true
        * @type boolean
        * @public
        */
        public isUp: boolean;
        /**
        * Indicates if this pointer is currently within the game.
        * @property withinGame
        * @type boolean
        * @default false
        * @public
        */
        public withinGame: boolean;
        /**
        * Indicates if this pointer is active. Note a mouse is always 'active' where as a finger is only active when it is down.
        * @property active
        * @type boolean
        * @default false
        * @public
        */
        public active: boolean;
        /**
        * Indicates the time that the pointer was pressed initially.
        * @property timeDown
        * @type number
        * @default 0
        * @public
        */
        public timeDown: number;
        /**
        * Indicates the time that the pointer was released initially.
        * @property timeUp
        * @type number
        * @default 0
        * @public
        */
        public timeUp: number;
        /**
        * The duration that the pointer has been down for in milliseconds.
        * @property duration
        * @type number
        * @default 0
        * @public
        */
        public duration: number;
        /**
        * The duration that the pointer has been down for in frames.
        * @property frameDuration
        * @type number
        * @default 0
        * @public
        */
        public frameDuration: number;
        /**
        * A time that is used to calculate if someone justPressed the pointer.
        * @property justPressedRate
        * @type number
        * @defeault 200
        * @public
        */
        public justPressedRate: number;
        /**
        * A time that is used to calculate if someone justReleased the pointer.
        * @property justReleasedRate
        * @type number
        * @default 200
        * @public
        */
        public justReleasedRate: number;
        /**
        * The points inital coordinates when pressed down.
        * @property startPoint
        * @type Point
        * @public
        */
        public startPoint: Kiwi.Geom.Point;
        /**
        * The coordinates where the user released the pointer.
        * @property endPoint
        * @type Point
        * @public
        */
        public endPoint: Kiwi.Geom.Point;
        /**
        * The method that gets executed when the pointer presses/initially goes down on the screen.
        * From the event passed the coordinates are calculated.
        * @method start
        * @param {event} event
        * @public
        */
        public start(event: any): void;
        /**
        * The stop method is to be called when the pointer gets released initially.
        * @method stop
        * @param {event} event
        * @public
        */
        public stop(event: any): void;
        /**
        * Used to get the cooridnates of a pointer and inputs them to the correct properties.
        * @method move
        * @param {event} event
        * @public
        */
        public move(event: any): void;
        /**
        * Indicates if the pointer was just pressed. This is based of the justPressedRate unless otherwise specifieds.
        * @method justPressed
        * @param {number} duration
        * @return boolean
        * @public
        */
        public justPressed(duration?: number): boolean;
        /**
        * Indicates if the pointer was just released. This is based of the justReleasedRate unless otherwise specified.
        * @method justReleased
        * @param {number} duration
        * @return boolean
        * @public
        */
        public justReleased(duration?: number): boolean;
        /**
        * Resets the pointer properties to the default ones. Assumes that the pointer is no longer down.
        * @method reset
        * @public
        */
        public reset(): void;
        /**
        * The update loop for the pointer. Used only if down to update the duration.
        * @method update.
        * @public
        */
        public update(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Input
*
*/ 
declare module Kiwi.Input {
    /**
    * Holds the information about a Mouse Cursor. Such as the position of the cursor, the mouse wheels delta, the button that was used, e.t.c. Note: A mouse cursor is always active.
    *
    * @class MouseCursor
    * @namespace Kiwi.Input
    * @extends Pointer
    */
    class MouseCursor extends Input.Pointer {
        /**
        * The type of object this class is.
        * @method objType
        * @return string
        * @public
        */
        public objType(): string;
        /**
        * The offset of the mouse wheel on the X axis.
        * @property wheelDeltaX
        * @type number
        * @default 0
        * @public
        */
        public wheelDeltaX: number;
        /**
        * The offset of the mouse wheel on the Y axis.
        * @property wheelDeltaY
        * @type number
        * @default 0
        * @public
        */
        public wheelDeltaY: number;
        /**
        * If the ctrl key is down.
        * @property ctrlKey
        * @type boolean
        * @public
        */
        public ctrlKey: boolean;
        /**
        * If the shift key is down.
        * @property shiftKey
        * @type boolean
        * @public
        */
        public shiftKey: boolean;
        /**
        * If the alt key is down.
        * @property altKey
        * @type boolean
        * @public
        */
        public altKey: boolean;
        /**
        * The button that got pressed. Eg. If the LEFT mouse button was pressed this number would be 0
        * @property button
        * @type number
        * @public
        */
        public button: number;
        /**
        * Gets executed when the mouse cursor gets initally pressed.
        * @method start
        * @param {event} event
        * @public
        */
        public start(event: any): void;
        /**
        * Gets executed when the mouse cursor gets initally released.
        * @method stop
        * @param {event} event
        * @public
        */
        public stop(event: any): void;
        /**
        * When the mouse wheel event fires and the mouse's delta changes.
        * @method wheel
        * @param {event} event
        * @public
        */
        public wheel(event: any): void;
    }
}
/**
*
* @module Kiwi
* @submodule Input
*
*/ 
declare module Kiwi.Input {
    /**
    * Used with the Touch manager class, this object holds information about a single touch point/locaton (or you know a finger). By default a Finger has a diameter of 44 pixels (random average size of a finger) which can be used for collision/overlap detection. That value can be modified. Note: A Finger is only active whilst the user is 'pressing' down on stage.
    *
    * @class Finger
    * @extends Pointer
    * @namespace Kiwi.Input
    * @constructor
    * @param game {Game} The game that this finger belongs to.
    * @return Finger
    */
    class Finger extends Input.Pointer {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this is.
        * @method objType
        * @return string
        * @public
        */
        public objType(): string;
        /**
        * @method start
        * @param {Any} event
        * @public
        */
        public start(event: any): void;
        /**
        * @method stop
        * @param event {Any}
        * @public
        */
        public stop(event: any): void;
        /**
        * @method leave
        * @param event {Any}
        * @public
        */
        public leave(event: any): void;
        /**
        * @method reset
        * @public
        */
        public reset(): void;
    }
}
/**
* Contains common classes whose applications deal with geometry or the collision of geometric shapes.
*
* @module Kiwi
* @submodule Geom
* @main
*/
declare module Kiwi.Geom {
    /**
    * An object representation of an axis-aligned bounding box.
    *
    * @class AABB
    * @namespace Kiwi.Geom
    * @constructor
    * @param cx {Number}
    * @param cy {Number}
    * @param width {Number}
    * @param height {Number}
    * @return {AABB}
    */
    class AABB {
        constructor(cx: number, cy: number, width: number, height: number);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        * @public
        */
        public objType(): string;
        /**
        *
        * @property cx
        * @type Number
        * @public
        */
        public cx: number;
        /**
        *
        * @property cy
        * @type Number
        * @public
        */
        public cy: number;
        /**
        * Half of the width.
        * @property halfWidth
        * @type Number
        * @public
        */
        public halfWidth: number;
        /**
        * Half of the height.
        * @property halfHeight
        * @type Number
        * @public
        */
        public halfHeight: number;
        /**
        * Returns the full height. This is read only.
        * @property height
        * @type number
        * @public
        */
        public height : number;
        /**
        * Returns the full width. This is read only.
        * @property width
        * @type number
        * @public
        */
        public width : number;
        /**
        * Draws the object to a canvas
        * @method draw
        * @param ctx {CanvasRenderingContext2D} The context you want this drawn to.
        * @return {AABB}
        * @public
        */
        public draw(ctx: CanvasRenderingContext2D): AABB;
        /**
        * Sets the position of the object.
        * @method setPosition
        * @param cx {Number}
        * @param cy {Number}
        * @return {AABB}
        * @public
        */
        public setPosition(cx: number, cy: number): AABB;
        /**
        * Sets the position of the object by a point that you pass.
        * @method setPositionPoint
        * @param {Point} pos
        * @return {AABB}
        * @public
        */
        public setPositionPoint(pos: Geom.Point): AABB;
        /**
        * Returns this object but as a new Rectangle.
        * @method toRect
        * @return {Rectangle}
        * @public
        */
        public toRect(): Geom.Rectangle;
        /**
        * Gives the dimension of this AABB from a rectangle's.
        * @method fromRect
        * @param {Rectangle} rect
        * @return {AABB}
        * @public
        */
        public fromRect(rect: Geom.Rectangle): AABB;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * A Circle object is an area defined by its position,
    * as indicated by its center point (x,y) and diameter.
    *
    * @class Circle
    * @namespace Kiwi.Geom
    * @constructor
    * @param [x = 0] {Number} The x coordinate of the center of the circle.
    * @param [y = 0] {Number} The y coordinate of the center of the circle.
    * @param [diameter = 0] {number} The diameter of the circle.
    * @return {Circle} This circle object
    *
    */
    class Circle {
        constructor(x?: number, y?: number, diameter?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The diameter of the circle
        * @property _diameter
        * @type Number
        * @default 0
        * @private
        */
        private _diameter;
        /**
        * The radius of the circle
        * @property _radius
        * @type Number
        * @default 0
        * @private
        */
        private _radius;
        /**
        * The x coordinate of the center of the circle
        * @property x
        * @type Number
        * @default 0
        * @public
        */
        public x: number;
        /**
        * The y coordinate of the center of the circle
        * @property y
        * @type Number
        * @default 0
        * @public
        */
        public y: number;
        /**
        * The diameter of the circle. The largest distance between any two points on the circle. The same as the radius * 2.
        * @property diameter
        * @type number
        * @public
        */
        public diameter : number;
        /**
        * The radius of the circle. The length of a line extending from the center of the circle to any point on the circle itself. The same as half the diameter.
        * @property radius
        * @type number
        * @public
        */
        public radius : number;
        /**
        * The circumference of the circle. This is READ ONLY.
        * @property circumference
        * @type number
        * @public
        */
        public circumference : number;
        /**
        * The sum of the y and radius properties. Changing the bottom property of a Circle object has no effect on the x and y properties, but does change the diameter.
        * @property bottom
        * @type number
        * @public
        */
        public bottom : number;
        /**
        * The x coordinate of the leftmost point of the circle. Changing the left property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
        * @property left
        * @type number
        * @public
        */
        public left : number;
        /**
        * The x coordinate of the rightmost point of the circle. Changing the right property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
        * @property right
        * @type number
        * @public
        */
        public right : number;
        /**
        * The sum of the y minus the radius property. Changing the top property of a Circle object has no effect on the x and y properties, but does change the diameter.
        * @property top
        * @type number
        * @public
        */
        public top : number;
        /**
        * Gets the area of this Circle. Note this is READ ONLY.
        * @property area
        * @type number
        * @public
        */
        public area : number;
        /**
        * Determines whether or not this Circle object is empty. This is READ ONLY.
        * @method isEmpty
        * @return {boolean} A value of true if the Circle objects diameter is less than or equal to 0; otherwise false.
        * @public
        */
        public isEmpty : boolean;
        /**
        * Returns a new Circle object with the same values for the x, y, width, and height properties as the original Circle object.
        * @method clone
        * @param [output = Circle] {Circle} If given the values will be set into the object, otherwise a brand new Circle object will be created and returned.
        * @return {Circle}
        * @public
        */
        public clone(output?: Circle): Circle;
        /**
        * Copies all of circle data from the source Circle object into the calling Circle object.
        * @method copyFrom
        * @param source {Circle} The source circle object to copy from
        * @return {Circle} This circle object
        * @public
        */
        public copyFrom(source: Circle): Circle;
        /**
        * Copies all of circle data from this Circle object into the destination Circle object.
        * @method copyTo
        * @param circle {Circle} The destination circle object to copy in to
        * @return {Circle} The destination circle object
        * @public
        */
        public copyTo(target: Circle): Circle;
        /**
        * Returns the distance from the center of this Circle object to the given object (can be Circle, Point or anything with x/y values)
        * @method distanceTo
        * @param target {Any} The destination Point object.
        * @param [round=false] {boolean} Round the distance to the nearest integer (default false)
        * @return {Number} The distance between this Point object and the destination Point object.
        * @public
        */
        public distanceTo(target: any, round?: boolean): number;
        /**
        * Determines whether the object specified in the toCompare parameter is equal to this Circle object. This method compares the x, y and diameter properties of an object against the same properties of this Circle object.
        * @method equals
        * @param toCompare {Circle} The circle to compare to this Circle object.
        * @return {boolean} A value of true if the object has exactly the same values for the x, y and diameter properties as this Circle object; otherwise false.
        * @public
        */
        public equals(toCompare: Circle): boolean;
        /**
        * Determines whether the Circle object specified in the toIntersect parameter intersects with this Circle object. This method checks the radius distances between the two Circle objects to see if they intersect.
        * @method intersects
        * @param toIntersect {Circle} The Circle object to compare against to see if it intersects with this Circle object.
        * @return {boolean} A value of true if the specified object intersects with this Circle object; otherwise false.
        * @public
        */
        public intersects(toIntersect: Circle): boolean;
        /**
        * Returns a Point object containing the coordinates of a point on the circumference of this Circle based on the given angle.
        * @method circumferencePoint
        * @param angle {Number} The angle in radians (unless asDegrees is true) to return the point from.
        * @param [asDegress=false] {boolean} Is the given angle in radians (false) or degrees (true)?
        * @param [point=Point] {Point} An optional Point object to put the result in to. If none specified a new Point object will be created.
        * @return {Point} The Point object holding the result.
        * @public
        */
        public circumferencePoint(angle: number, asDegrees?: boolean, output?: Geom.Point): Geom.Point;
        /**
        * Adjusts the location of the Circle object, as determined by its center coordinate, by the specified amounts.
        * @method offset
        * @param dx {Number} Moves the x value of the Circle object by this amount.
        * @param dy {Number} Moves the y value of the Circle object by this amount.
        * @return {Circle} This Circle object.
        * @public
        */
        public offset(dx: number, dy: number): Circle;
        /**
        * Adjusts the location of the Circle object using a Point object as a parameter. This method is similar to the Circle.offset() method, except that it takes a Point object as a parameter.
        * @method offsetPoint
        * @param {Point} point A Point object to use to offset this Circle object.
        * @return {Circle} This Circle object.
        * @public
        */
        public offsetPoint(point: Geom.Point): Circle;
        /**
        * Sets the members of Circle to the specified values.
        * @method setTo
        * @param x {Number} The x coordinate of the center of the circle.
        * @param y {Number} The y coordinate of the center of the circle.
        * @param diameter {Number} The diameter of the circle in pixels.
        * @return {Circle} This circle object
        * @public
        */
        public setTo(x: number, y: number, diameter: number): Circle;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        * @public
        */
        public toString(): string;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * Represents a halfline. The ray starts at the first point and extends infinitely in the direction of the second.
    *
    * @class Ray
    * @namespace Kiwi.Geom
    * @constructor
    * @param [x1 = 0] {Number} x1
    * @param [y1 = 0] {Number} y1
    * @param [x2 = 0] {Number} x2
    * @param [y2 = 0] {Number} y2
    * @return {Ray} This Object
    *
    */
    class Ray {
        constructor(x1?: number, y1?: number, x2?: number, y2?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The x component of the initial point of the ray
        * @property x1
        * @type Number
        * @public
        */
        public x1: number;
        /**
        * The y component of the initial point of the ray
        * @property y1
        * @type Number
        * @public
        */
        public y1: number;
        /**
        * The x component of the direction point of the ray
        * @property x2
        * @type Number
        * @public
        */
        public x2: number;
        /**
        * The y component of the direction point of the ray
        * @property y2
        * @type Number
        * @public
        */
        public y2: number;
        /**
        * Makes a copy of this Ray either as a new Ray object or,
        * makes a passed Ray a copy of this one.
        * @method clone
        * @param [output = Ray] {Ray}
        * @return {Ray}
        * @public
        */
        public clone(output?: Ray): Ray;
        /**
        * Makes this Ray the same as a passed Ray.
        * @method copyFrom
        * @param source {Ray}
        * @return {Ray}
        * @public
        */
        public copyFrom(source: Ray): Ray;
        /**
        * Makes a passed Ray the same as this Ray object.
        * @method copyTo
        * @param target {Ray}
        * @return {Ray}
        * @public
        */
        public copyTo(target: Ray): Ray;
        /**
        * Sets the origin and the direction of this Ray.
        * @method setTo
        * @param x1{Number}
        * @param y1{Number}
        * @param x2{Number}
        * @param y2{Number}
        * @return {Ray}
        * @public
        */
        public setTo(x1?: number, y1?: number, x2?: number, y2?: number): Ray;
        /**
        * Get the angle of the ray.
        * @property angle
        * @return {Number}
        * @public
        */
        public angle : number;
        /**
        * Get the slope of the ray.
        * @property slope
        * @return {Number}
        * @public
        */
        public slope : number;
        /**
        *
        * @method yIntercept
        * @property yIntercept
        * @return {Number}
        * @public
        */
        public yIntercept : number;
        /**
        * Check if the Ray passes through a point.
        * @method isPointOnRay
        * @param {Number} x
        * @param {Number} y
        * @return {boolean}
        */
        public isPointOnRay(x: number, y: number): boolean;
        /**
        * Get a string representation of the ray.
        * @method toString
        * @return {String}
        */
        public toString(): string;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/ 
declare module Kiwi.Geom {
    /**
    * Contains a collection of STATIC methods to help determine and return intersection between geometric objects.
    *
    * @class Intersect
    * @namespace Kiwi.Geom
    * @static
    */
    class Intersect {
        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * -------------------------------------------------------------------------------------------
        * Distance
        * -------------------------------------------------------------------------------------------
        **/
        /**
        * Returns the distance between two sets of coordinates that you specify.
        * @method distance
        * @param x1 {Number} The x position of the first coordinate.
        * @param y1 {Number} The y position of the first coordinate.
        * @param x2 {Number} The x position of the second coordinate.
        * @param y2 {Number} The y position of the second coordinate.
        * @return {Number} The distance between the two points.
        * @public
        * @static
        **/
        static distance(x1: number, y1: number, x2: number, y2: number): number;
        /**
        * Returns the distance squared between two sets of coordinates that you specify.
        * @method distanceSquared
        * @param x1 {Number} The x position of the first coordinate.
        * @param y1 {Number} The y position of the first coordinate.
        * @param x2 {Number} The x position of the second coordinate.
        * @param y2 {Number} The y position of the second coordinate.
        * @return {Number} The distance between the two points squared.
        * @public
        * @static
        */
        static distanceSquared(x1: number, y1: number, x2: number, y2: number): number;
        /**
        * -------------------------------------------------------------------------------------------
        * Lines
        * -------------------------------------------------------------------------------------------
        **/
        /**
        * Check to see if any two Lines intersect at any point.
        * Both lines are treated as if they extend infintely through space.
        * @method lineToLine
        * @param line1 {Line} The first line object to check
        * @param line2 {Line} The second line object to check
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in. (One is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
        */
        static lineToLine(line1: Geom.Line, line2: Geom.Line, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Check to see if a Line and a Line Segment intersect at any point.
        * Note: The first line passed is treated as if it extends infinately though space,
        * The second is treated as if it only exists between its two points.
        * @method lineToLineSegment
        * @param line1 {Line} The first line to check. This is the one that will extend through space infinately.
        * @param seg {Line} The second line to check. This is the one that will only exist between its two coordinates.
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection.
        * @public
        * @static
        */
        static lineToLineSegment(line1: Geom.Line, seg: Geom.Line, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Checks to see if a Line that is passed, intersects at any point another Line that is made by passing a set of coordinates to this method.
        * Note: The first line will extend infinately through space.
        * And the second line will only exist between the two points passed.
        * @method lineToRawSegment
        * @param line {Line} The line object that extends infinatly through space.
        * @param x1 {number} The x coordinate of the first point in the second line.
        * @param y1 {number} The y coordinate of the first point in the second line.
        * @param x2 {number} The x coordinate of the second point in the second line.
        * @param y2 {number} The y coordinate of the second point in the second line.
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @static
        * @public
        */
        static lineToRawSegment(line: Geom.Line, x1: number, y1: number, x2: number, y2: number, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Checks to see if a Line and Ray object intersects at any point.
        * Note: The line in this case extends infinately through space.
        * @method lineToRay
        * @param line1 {Line} The Line object that extends infinatly through space.
        * @param ray {Ray} The Ray object that you want to check it against.
        * @param {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
        */
        static lineToRay(line1: Geom.Line, ray: Geom.Ray, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Checks to see if a Line and a Circle intersect at any point.
        * Note: The line passed is assumed to extend infinately through space.
        * @method lineToCircle
        * @param line {Line} The Line object that you want to check it against.
        * @param circle {Circle} The Circle object to check.
        * @param [output=Intersect] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static lineToCircle(line: Geom.Line, circle: Geom.Circle, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Check if the Line intersects with each side of a Rectangle.
        * Note: The Line is assumned to extend infinately through space.
        * @method lineToRectangle
        * @param line {Line} The Line object to check
        * @param rectangle {Rectangle} The Rectangle object to check
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static lineToRectangle(line: any, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * -------------------------------------------------------------------------------------------
        * Line Segment
        * -------------------------------------------------------------------------------------------
        **/
        /**
        * Checks to see if two Line Segments intersect at any point in space.
        * Note: Both lines are treated as if they only exist between their two line coordinates.
        * @method lineSegmentToLineSegment
        * @param line1 {Line} The first line object to check.
        * @param line2 {Line} The second line object to check.
        * @param [output=IntersectResult]{IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y.
        * @public
        * @static
        */
        static lineSegmentToLineSegment(line1: Geom.Line, line2: Geom.Line, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Check if the Line Segment intersects with the Ray.
        * Note: The Line only exists between its two points.
        * @method lineSegmentToRay
        * @param line1 {Line} The Line object to check.
        * @param ray {Line} The Ray object to check.
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
        */
        static lineSegmentToRay(line1: Geom.Line, ray: Geom.Ray, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Check if the Line Segment intersects with the Circle.
        * Note the Line only exists between its point points.
        * @method lineSegmentToCircle
        * @param seg {Line} The Line object to check
        * @param circle {Circle} The Circle object to check
        * @param [ouput=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
        */
        static lineSegmentToCircle(seg: Geom.Line, circle: Geom.Circle, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Check if the Line Segment intersects with any side of a Rectangle.
        * Note: The Line only exists between its two points.
        * @method lineSegmentToCircle
        * @param seg {Line} The Line object to check.
        * @param rect {Rectangle} The Rectangle object to check.
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given).
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y.
        * @public
        * @static
        */ 
        static lineSegmentToRectangle(seg: Geom.Line, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * -------------------------------------------------------------------------------------------
        * Ray
        * -------------------------------------------------------------------------------------------
        **/
        /**
        * Check to see if a Ray intersects at any point with a Rectangle.
        * @method rayToRectangle
        * @param ray {Ray} The Ray object to check.
        * @param rect {Rectangle} The Rectangle to check.
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static rayToRectangle(ray: Geom.Ray, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Check whether a Ray intersects a Line segment, returns the parametric value where the intersection occurs.
        * Note: The Line only exists between its two points.
        * @method rayToLineSegment
        * @static
        * @param rayx1 {Number} The origin point of the ray on the x axis.
        * @param rayy1 {Number} The origin point of the ray on the y axis.
        * @param rayx2 {Number} The direction of the ray on the x axis.
        * @param rayy2 {Number} The direction of the ray on the y axis.
        * @param linex1 {Number} The x of the first point of the line segment.
        * @param liney1 {Number} The y of the first point of the line segment.
        * @param linex2 {Number} The x of the second point of the line segment.
        * @param liney2 {Number} The y of the second point of the line segment.
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection stored in x
        * @public
        */
        static rayToLineSegment(rayx1: any, rayy1: any, rayx2: any, rayy2: any, linex1: any, liney1: any, linex2: any, liney2: any, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * -------------------------------------------------------------------------------------------
        * Circle
        * -------------------------------------------------------------------------------------------
        **/
        /**
        * Check if the two given Circle objects intersect at any point.
        * @method circleToCircle
        * @param circle1 {Circle} The first circle object to check.
        * @param circle2 {Circle} The second circle object to check.
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static circleToCircle(circle1: Geom.Circle, circle2: Geom.Circle, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Check if a Circle and a Rectangle intersect with each other at any point.
        * @method circleToRectangle
        * @param circle {Circle} The circle object to check.
        * @param rect {Rectangle} The Rectangle object to check.
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static circleToRectangle(circle: Geom.Circle, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Check if the given Point is found within the given Circle.
        * @method circleContainsPoint
        * @param circle {Circle} The circle object to check
        * @param point {Point} The point object to check
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static circleContainsPoint(circle: Geom.Circle, point: Geom.Point, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * -------------------------------------------------------------------------------------------
        * Rectangles
        * -------------------------------------------------------------------------------------------
        **/
        /**
        * Determines whether the specified point is contained within a given Rectangle object.
        * @method pointToRectangle
        * @param point {Point} The point object being checked.
        * @param rect {Rectangle} The rectangle object being checked.
        * @param [output=Intersect] {IntersectResult}  An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y/result
        * @public
        * @static
        */
        static pointToRectangle(point: Geom.Point, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        /**
        * Check whether two axis aligned rectangles intersect. Return the intersecting rectangle dimensions if they do.
        * @method rectangleToRectangle
        * @param rect1 {Rectangle} The first Rectangle object.
        * @param rect2 {Rectangle} The second Rectangle object.
        * @param [output=IntersectResult] {IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
        * @return {IntersectResult} An IntersectResult object containing the results of this intersection in x/y/width/height
        * @public
        * @static
        */
        static rectangleToRectangle(rect1: Geom.Rectangle, rect2: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * A Lightweight object to hold the results of an Intersection.
    * Used in combination with the STATIC methods on the Intersect class.
    *
    * @class IntersectResult
    * @namespace Kiwi.Geom
    * @constructor
    */
    class IntersectResult {
        /**
        * The type of object this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * Holds the result of an Intersection between two geometric items.
        * TRUE means an Intersection did occur and FALSE means not.
        * @property result
        * @type boolean
        * @default false
        */
        public result: boolean;
        /**
        * Holds the x coordinate of the point in which the Intersection occured.
        * Note: This is only set in the case the TWO geometric items are either Lines or Rays (Line like in function)
        * and a Intersection occured.
        * @property x
        * @type Number
        */
        public x: number;
        /**
        * Holds the y coordinate of the point in which the Intersection occured.
        * Note: This is only set in the case the TWO geometric items are either Lines or Rays (Line like in function)
        * and a Intersection occured.
        * @property y
        * @type Number
        */
        public y: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property x1
        * @type Number
        */
        public x1: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property y1
        * @type Number
        */
        public y1: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property x2
        * @type Number
        */
        public x2: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property y2
        * @type Number
        */
        public y2: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property width
        * @type Number
        */
        public width: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property height
        * @type Number
        */
        public height: number;
        /**
        * Sets the coordinates of the points based on the parameters passed.
        * @method setTo
        * @param {Number} x1
        * @param {Number} y1
        * @param {Number} [x2=0]
        * @param {Number} [y2=0]
        * @param {Number} [width=0]
        * @param {Number} [height=0]
        */
        public setTo(x1: number, y1: number, x2?: number, y2?: number, width?: number, height?: number): void;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * A Kiwi Line object has two meanings depending on the situation you need.
    * Either an infinte line through space (this is the normal meaning of a Line)
    * OR it can be a Line Segment which just exists between the TWO points you specify.
    *
    * @class Line
    * @namespace Kiwi.Geom
    * @constructor
    * @param [x1 = 0] {Number} x1 x component of first point.
    * @param [y1 = 0]{Number} y1 y component of first point.
    * @param [x2 = 0]{Number} x2 x component of second point.
    * @param [y2 = 0]{Number} y2 y component of second point.
    * @return {Line} This Object
    *
    */
    class Line {
        constructor(x1?: number, y1?: number, x2?: number, y2?: number);
        /**
        * Returns the type of this object
        * @method objType
        * @return {string} The type of this object
        * @public
        */
        public objType(): string;
        /**
        * X position of first point in your line.
        * @property x1
        * @type Number
        * @public
        */
        public x1: number;
        /**
        * Y position of first point in your line.
        * @property y1
        * @type Number
        * @public
        */
        public y1: number;
        /**
        * x component of second point.
        * @property x2
        * @type Number
        * @public
        */
        public x2: number;
        /**
        * y component of second point.
        * @property y2
        * @type Number
        * @public
        */
        public y2: number;
        /**
        * Makes a clone of this Line.
        * The clone will either be a new Line Object,
        * Otherwise you can pass a existing Line Object that you want to be a clone of this one.
        * @method clone
        * @param [output = Line] {Line}
        * @return {Line}
        * @public
        */
        public clone(output?: Line): Line;
        /**
        * Make this Line a copy of another passed Line.
        * @method copyFrom
        * @param source {Line} source
        * @return {Line}
        * @public
        */
        public copyFrom(source: Line): Line;
        /**
        * Make another passed Line a copy of this one.
        * @method copyTo
        * @param target {Line} target
        * @return {Line}
        * @public
        */
        public copyTo(target: Line): Line;
        /**
        * Used to set all components on the line.
        * @method setTo
        * @param [x1 = 0]{Number} X component of first point.
        * @param [y1 = 0]{Number} Y component of first point.
        * @param [x2 = 0]{Number} X component of second point.
        * @param [y2 = 0]{Number} Y component of second point.
        * @return {Line}
        * @public
        */
        public setTo(x1?: number, y1?: number, x2?: number, y2?: number): Line;
        /**
        * Get the length of the Line as a Line Segment.
        * @property length
        * @type number
        * @public
        */
        public length : number;
        /**
        * Get the y of a point on the line for a given x.
        * @method getY
        * @param {Number} x
        * @return {Number}
        * @public
        */
        public getY(x: number): number;
        /**
        * Get the angle of the line.
        * @property angle
        * @return {Number}
        */
        public angle : number;
        /**
        * Get the slope of the line (y/x).
        * @property slope
        * @return {Number}
        * @public
        */
        public slope : number;
        /**
        * Get the perpendicular slope of the line (x/y).
        * @propery perpSlope
        * @return {Number}
        * @public
        */
        public perpSlope : number;
        /**
        * Get the y intercept for the line.
        * @property yIntercept
        * @return {Number}
        * @property
        */
        public yIntercept : number;
        /**
        * Check if a point is on the line.
        * @method isPointOnLine
        * @param x {Number}
        * @param y {Number}
        * @return {boolean}
        * @public
        */
        public isPointOnLine(x: number, y: number): boolean;
        /**
        * Check if the point is both on the line and within the line segment.
        * @method isPointOnLineSegment
        * @param {Number} x
        * @param {Number} y
        * @return {boolean}
        * @public
        */
        public isPointOnLineSegment(x: number, y: number): boolean;
        /**
        * Check to see if this Line object intersects at any point with a passed Line.
        * Note: Both are treated as extending infinately through space.
        * @method intersectLineLine
        * @param line {Line} The line you want to check for a Intersection with.
        * @return {IntersectResult} The Intersect Result containing the collision information.
        * @public
        */
        public intersectLineLine(line: any): Geom.IntersectResult;
        /**
        * Get a line perpendicular to the line passing through a given point.
        * @method perp
        * @param x {Number}
        * @param y {Number}
        * @param [output = Line] {Line}
        * @return {Line}
        * @public
        */
        public perp(x: number, y: number, output?: Line): Line;
        /**
        * Get a string representation of the line.
        * @method toString
        * @return {String}
        * @public
        */
        public toString(): string;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * Represents a 2d transformation matrix. This can be used to map points between different coordinate spaces. Matrices are used
    * by Transform objects to represent translation, scale and rotation transformations, and to determine where objects are in world space or camera space.
    * Objects such as entities and groups may be nested, and their associated transforms may represent how they are scaled, translated and rotated relative to a parent
    * transform.
    * By concatenating an object's transformatkion matrix with it's ancestors matrices, it is possible to determine the absolute position of the object in world space.
    * See http://en.wikipedia.org/wiki/Transformation_matrix#Examples_in_2D_graphics for an in depth discussion of 2d tranformation matrices.
    *
    * @class Matrix
    * @namespace Kiwi.Geom
    * @constructor
    * @param [a = 1] {Number}  position 0,0 of the matrix, affects scaling and rotation.
    * @param [b = 0] {Number}  position 0,1 of the matrix, affects scaling and rotation.
    * @param [c = 0] {Number}  position 1,0 of the matrix, affects scaling and rotation.
    * @param [d = 1] {Number}  position 1,1 of the matrix, affects scaling and rotation.
    * @param [tx = 0] {Number}  position 2,0 of the matrix, affects translation on x axis.
    * @param [ty = 0] {Number}  position 2,1 of the matrix, affects translation on y axis.
    * @return (Object) This object.
    *
    */
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        public objType(): string;
        public a: number;
        public b: number;
        public c: number;
        public d: number;
        public tx: number;
        public ty: number;
        /**
        * Set all matrix values
        * @method setTo
        * @param [a = 1] {Number} position 0,0 of the matrix, affects scaling and rotation.
        * @param [b = 0] {Number} position 0,1 of the matrix, affects scaling and rotation.
        * @param [c = 0] {Number} position 1,0 of the matrix, affects scaling and rotation.
        * @param [d = 1] {Number} position 1,1 of the matrix, affects scaling and rotation.
        * @param [tx = 0] {Number} position 2,0 of the matrix, affects translation on x axis.
        * @param [ty = 0] {Number} position 2,1 of the matrix, affects translation on y axis.
        * @return (Object) This object.
        */
        public setTo(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
        /**
        * Set matrix values from transform values
        * @method setFromTransform
        * @Param tx {Number} tx. Translation on x axis.
        * @Param ty {Number} ty. Translation on y axis.
        * @Param scaleX {Number} scaleX. Scale on x axis.
        * @Param scaleY {Number} scaleY. Scale on y axis.
        * @Param rotation {Number} rotation.
        * @return {Object} This object.
        */
        public setFromTransform(tx: number, ty: number, scaleX: number, scaleY: number, rotation: number): Matrix;
        /**
        * Prepend values to this matrix, paramters supplied individually.
        * @method prepend
        * @param [a = 1]{Number} position 0,0 of the matrix, affects scaling and rotation.
        * @param [b = 0]{Number} position 0,1 of the matrix, affects scaling and rotation.
        * @param [c = 0]{Number} position 1,0 of the matrix, affects scaling and rotation.
        * @param [d = 0]{Number} position 1,1 of the matrix, affects scaling and rotation.
        * @param [tx = 0]{Number} position 2,0 of the matrix, affects translation on x axis.
        * @param [ty = 0]{Number} position 2,1 of the matrix, affects translation on y axis.
        * @return {Object} This object.
        */
        public prepend(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
        /**
        * Prepend a matrix to this matrix.
        * @method prependMatrix
        * @param {Object} m. The matrix to prepend.
        * @return {Object} This object.
        */
        public prependMatrix(m: Matrix): Matrix;
        /**
        * Append values to this matrix, paramters supplied individually.
        * @method append
        * @param [a = 1]{Number} position 0,0 of the matrix, affects scaling and rotation.
        * @param [b = 0]{Number} position 0,1 of the matrix, affects scaling and rotation.
        * @param [c = 0]{Number} position 1,0 of the matrix, affects scaling and rotation.
        * @param [d = 1]{Number} position 1,1 of the matrix, affects scaling and rotation.
        * @param [tx = 0]{Number} position 2,0 of the matrix, affects translation on x axis.
        * @param [ty = 0]{Number} position 2,1 of the matrix, affects translation on y axis.
        * @return {Object} This object.
        */
        public append(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
        /**
        * Append a matrix to this matrix.
        * @method appendMatrix
        * @param m {Object} The matrix to append.
        * @return {Object} This object.
        */
        public appendMatrix(m: Matrix): Matrix;
        /**
        * Set the tx and ty elements of the matrix
        * @method setPosition
        * @param x {Number} Translation on x axis.
        * @param y {Number} Translation on y axis.
        * @return  {Object} This object.
        */
        public setPosition(x: number, y: number): Matrix;
        /**
        * Set the tx and ty elements of the matrix from an object with x and y properties.
        * @method setPositionVector
        * @param p {Number} The object from which to copy the x and y properties from.
        * @return  {Object} This object.
        */
        public setPositionPoint(p: any): Matrix;
        /**
        * Get the x and y position of the matrix as an object with x and y properties
        * @method setPositionVector
        * @return {Object} An object constructed from a literal with x and y properties.
        */
        public getPosition(output?: Geom.Point): Geom.Point;
        /**
        * Set the matrix to the identity matrix - when appending or prepending this matrix to another there will be no change in the resulting matrix
        * @method identity
        * @return {Object} This object.
        */
        public identity(): Matrix;
        /**
        * Rotate the matrix by "radians" degrees
        * @method rotate
        * @param radians{Number} radians.
        * @return {Object} This object.
        */
        public rotate(radians: number): Matrix;
        /**
        * Translate the matrix
        * @method transalte
        * @Param tx {Number} tx. The amount to translate on the x axis.
        * @Param ty {Number} ty. The amount to translate on the y axis.
        * @return {Object} This object.
        */
        public translate(tx: number, ty: number): Matrix;
        /**
        * Scale the matrix
        * @method scale
        * @Param {Number} scaleX. The amount to scale on the x axis.
        * @Param {Number} scaleY. The amount to scale on the y axis.
        * @return {Object} This object.
        */
        public scale(scaleX: number, scaleY: number): Matrix;
        /**
        * Apply this matrix to a an object with x and y properties representing a point and return the transformed point.
        * @method transformPoint
        * @param pt {Object} The point to be translated.
        * @return {Object} The translated point.
        */
        public transformPoint(pt: any): any;
        /**
        * Invert this matrix so that it represents the opposite of it's orginal tranformaation.
        * @method transformPoint
        * @return {Object} This object.
        */
        public invert(): Matrix;
        /**
        * Copy another matrix to this matrix.
        * @method copyFrom
        * @param m {Object} The matrixto be copied from.
        * @return {Object} This object.
        */
        public copyFrom(m: Matrix): Matrix;
        /**
        * Copy this matrix to another matrix.
        * @method copyTo
        * @param m {Object} The matrix to copy to.
        * @return {Object} This object.
        */
        public copyTo(m: Matrix): Matrix;
        /**
        * Clone this matrix
        * @method clone
        * @return {Object} The new clone of this matrix.
        */
        public clone(): Matrix;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        **/
        public toString : string;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * Represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
    *
    * @class Point
    * @constructor
    * @namespace Kiwi.Geom
    * @param x {Number} x One-liner. Default is ?.
    * @param y {Number} y One-liner. Default is ?.
    *
    */
    class Point {
        constructor(x?: number, y?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The horizontal position of this point (default 0)
        * @property x
        * @type Number
        * @public
        **/
        public x: number;
        /**
        * The vertical position of this point (default 0)
        * @property y
        * @type Number
        * @public
        **/
        public y: number;
        /**
        * Converts a pair of polar coordinates to a Cartesian point coordinate and sets them on the point instance.
        * @method polar
        * @param length {Number}  The length coordinate of the polar pair.
        * @param angle {Number}  The angle, in radians, of the polar pair.
        * @return {Point} The new Cartesian Point object.
        * @public
        **/
        public polar(distance: number, angle: number): Point;
        /**
        * Adds the coordinates of another point to the coordinates of this point to create a new point.
        * @method add
        * @param toAdd {Point}  - The point to be added.
        * @param output {Point}
        * @return {Point} The new Point object.
        * @public
        **/
        public add(toAdd: Point, output?: Point): Point;
        /**
        * Adds the given values to the coordinates of this point and returns it
        * @method addTo
        * @param x {Number} - The amount to add to the x value of the point
        * @param y {Number} - The amount to add to the x value of the point
        * @return {Point} This Point object.
        * @public
        **/
        public addTo(x?: number, y?: number): Point;
        /**
        * Adds the given values to the coordinates of this point and returns it
        * @method subtractFrom
        * @param x {Number} - The amount to subtract from the x value of the point
        * @param y {Number} - The amount to subtract from the x value of the point
        * @return {Point} This Point object.
        * @public
        **/
        public subtractFrom(x?: number, y?: number): Point;
        /**
        * Inverts the x and y values of this point
        * @method invert
        * @return {Point} This Point object.
        * @public
        **/
        public invert(): Point;
        /**
        * Clamps this Point object to be between the given min and max
        * @method clamp
        * @param min {number} The minimum value to clamp this Point to
        * @param max {number} The maximum value to clamp this Point to
        * @return {Point} This Point object.
        * @public
        **/
        public clamp(min: number, max: number): Point;
        /**
        * Clamps the x value of this Point object to be between the given min and max
        * @method clampX
        * @param min {Number} The minimum value to clamp this Point to
        * @param max {Number} The maximum value to clamp this Point to
        * @return {Point} This Point object.
        * @public
        **/
        public clampX(min: number, max: number): Point;
        /**
        * Clamps the y value of this Point object to be between the given min and max
        * @method clampY
        * @param min {Number} The minimum value to clamp this Point to
        * @param max {Number} The maximum value to clamp this Point to
        * @return {Point} This Point object.
        * @public
        **/
        public clampY(min: number, max: number): Point;
        /**
        * Creates a copy of this Point.
        * @method clone
        * @param [output = Point]{Point} Optional Point object. If given the values will be set into this object, otherwise a brand new Point object will be created and returned.
        * @return {Point} The new Point object.
        * @public
        **/
        public clone(output?: Point): Point;
        /**
        * Copies the point data from the source Point object into this Point object.
        * @method copyFrom
        * @param source {Point} The point to copy from.
        * @return {Point} This Point object. Useful for chaining method calls.
        **/
        public copyFrom(source: Point): Point;
        /**
        * Copies the point data from this Point object to the given target Point object.
        * @method copyTo
        * @param target {Point} target - The point to copy to.
        * @return {Point} The target Point object.
        **/
        public copyTo(target: Point): Point;
        /**
        * Returns the distance from this Point object to the given Point object.
        * @method distanceTo
        * @param target {Point} The destination Point object.
        * @param round {boolean} Round the distance to the nearest integer (default false)
        * @return {Number} The distance between this Point object and the destination Point object.
        * @public
        **/
        /**
        * Get the angle from this Point object to given Point object.
        * @method angleTo
        * @param target {point} destination Point object.
        * @return {Number} angle to point
        * @public
        */
        public angleTo(target: Point): number;
        /**
        * Get the angle from this Point object to given X,Y coordinates.
        * @method angleTo
        * @param x {number} x value.
        * @param y {number} y value.
        * @return {Number} angle to point.
        */
        public angleToXY(x: number, y: number): number;
        public distanceTo(target: Point, round?: boolean): number;
        /**
        * Returns the distance from this Point object to the given Point object.
        * @method distanceToXY
        * @param x {Number} x - The x value.
        * @param y {Number} y - The y value.
        * @param [round = Boolean] {boolean} round - Round the distance to the nearest integer (default false)
        * @return {Number} The distance between this Point object and the x/y values.
        * @public
        **/
        public distanceToXY(x: number, y: number, round?: boolean): number;
        /**
        * Returns the distance between the two Point objects.
        * @method distanceBetween
        * @param pointA {Point} pointA - The first Point object.
        * @param pointB {Point} pointB - The second Point object.
        * @param [round = Boolean] {boolean} round - Round the distance to the nearest integer (default false)
        * @return {Number} The distance between the two Point objects.
        **/
        static distanceBetween(pointA: Point, pointB: Point, round?: boolean): number;
        /**
        * Creates a new point with cartesian coordinates from a pair of polar coordinates
        * @method polar
        * @param length {Number} The length coordinate of the polar pair.
        * @param angle {Number} The angle, in radians, of the polar pair.
        * @return {Point} The new Cartesian Point object.
        **/
        static polar(length: number, angle: number): Point;
        /**
        * Returns true if the distance between this point and a target point is greater than or equal a specified distance.
        * This avoids using a costly square root operation
        * @method distanceCompare
        * @param target {Point} The Point object to use for comparison.
        * @param distance {Number} The distance to use for comparison.
        * @return {boolean} True if distance is >= specified distance.
        * @public
        **/
        public distanceCompare(target: Point, distance: number): boolean;
        /**
        * Determines whether this Point object and the given point object are equal. They are equal if they have the same x and y values.
        * @method equals
        * @param point {Point} The point to compare against.
        * @return {boolean} A value of true if the object is equal to this Point object; false if it is not equal.
        * @public
        **/
        public equals(toCompare: Point): boolean;
        /**
        * Determines a point between two specified points. The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters pt1 and pt2.
        * The closer the value of the parameter f is to 1.0, the closer the interpolated point is to the first point (parameter pt1). The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter pt2).
        * @method interpolate
        * @param pointA{Point} The first Point object.
        * @param pointB {Point} The second Point object.
        * @param f {Number} The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
        * @return {Point} The new interpolated Point object.
        * @public
        **/
        static interpolate(pointA: Point, pointB: Point, f: number): Point;
        /**
        * Offsets the Point object by the specified amount. The value of dx is added to the original value of x to create the new x value.
        * The value of dy is added to the original value of y to create the new y value.
        * @method offset
        * @param dx {Number} The amount by which to offset the horizontal coordinate, x.
        * @param dy {Number} The amount by which to offset the vertical coordinate, y.
        * @return {Point} This Point object. Useful for chaining method calls.
        * @public
        **/
        public offset(dx: number, dy: number): Point;
        /**
        * Sets the x and y values of this Point object to the given coordinates.
        * @method setTo
        * @param x {Number} The horizontal position of this point.
        * @param y {Number} The vertical position of this point.
        * @return {Point} This Point object. Useful for chaining method calls.
        * @public
        **/
        public setTo(x: number, y: number): Point;
        /**
        * Subtracts the coordinates of another point from the coordinates of this point to create a new point.
        * @method subtract
        * @param point {Point} The point to be subtracted.
        * @param output {Point} Optional Point object. If given the values will be set into this object, otherwise a brand new Point object will be created and returned.
        * @return {Point} The new Point object.
        * @public
        **/
        public subtract(point: Point, output?: Point): Point;
        public getCSS(): string;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        * @public
        **/
        public toString(): string;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * An area defined by its position, as indicated by its top-left corner (x,y) and width and height
    *
    * @class Rectangle
    * @namespace Kiwi.Geom
    * @constructor
    * @param [x = 0] {Number} The x coordinate of the top-left corner of the rectangle.
    * @param [y = 0] {Number} The y coordinate of the top-left corner of the rectangle.
    * @param [width = 0] {Number} width The width of the rectangle in pixels.
    * @param [height = 0] {Number} height The height of the rectangle in pixels.
    * @return {Rectangle} This rectangle object
    *
    */
    class Rectangle {
        /**
        * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified width and height parameters. If you call this function without parameters, a rectangle with x, y, width, and height properties set to 0 is created.
        **/
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The x coordinate of the top-left corner of the rectangle
        * @property x
        * @type Number
        * @public
        **/
        public x: number;
        /**
        * The y coordinate of the top-left corner of the rectangle
        * @property y
        * @type Number
        * @public
        **/
        public y: number;
        /**
        * The width of the rectangle in pixels
        * @property width
        * @type Number
        * @public
        **/
        public width: number;
        /**
        * The height of the rectangle in pixels
        * @property height
        * @type Number
        * @public
        **/
        public height: number;
        /**
        * The sum of the y and height properties. Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
        * @property bottom
        * @return {Number}
        * @public
        **/
        public bottom : number;
        /**
        * Returns a Point containing the location of the center of the Rectangle, relative to the top left edge
        * @property center
        * @return {Point}
        * @public
        **/
        public center : Geom.Point;
        /**
        * Returns a Point containing the location of the Rectangle's bottom-right corner, determined by the values of the right and bottom properties.
        * @property bottomRight
        * @return {Point}
        * @public
        */
        public bottomRight : Geom.Point;
        /**
        * The x coordinate of the top-left corner of the rectangle. Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
        * @property left
        * @return {number}
        * @public
        */
        public left : number;
        /**
        * The sum of the x and width properties. Changing the right property of a Rectangle object has no effect on the x, y and height properties. However it does affect the width property.
        * @property right
        * @return {Number}
        * @public
        */
        public right : number;
        /**
        * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
        * @property size
        * @return {Point} The size of the Rectangle object
        * @public
        */
        public size : Geom.Point;
        /**
        * The volume of the Rectangle object in pixels, derived from width * height
        * @property volume
        * @return {Number}
        * @return
        */
        public volume : number;
        /**
        * The perimeter size of the Rectangle object in pixels. This is the sum of all 4 sides.
        * @property perimeter
        * @return {Number}
        * @public
        */
        public perimeter : number;
        /**
        * The y coordinate of the top-left corner of the rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties. However it does affect the height property, whereas changing the y value does not affect the height property.
        * @method top
        * @return {Number}
        * @public
        */
        public top : number;
        /**
        * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
        * @property topLeft
        * @return {Point}
        * @public
        */
        public topLeft : Geom.Point;
        /**
        * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
        * @method clone
        * @param [output = Rectangle] {Rectangle} Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
        * @return {Rectangle}
        * @public
        **/
        public clone(output?: Rectangle): Rectangle;
        /**
        * Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
        * @method contains
        * @param {Number} x The x coordinate of the point to test.
        * @param {Number} y The y coordinate of the point to test.
        * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
        **/
        public contains(x: number, y: number): boolean;
        /**
        * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
        * @method containsPoint
        * @param {Point} point The point object being checked. Can be Kiwi.Geom.Point or any object with .x and .y values.
        * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
        **/
        public containsPoint(point: Geom.Point): boolean;
        /**
        * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object. A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
        * @method containsRect
        * @param rect {Rectangle} The rectangle object being checked.
        * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
        * @public
        **/
        public containsRect(rect: Rectangle): boolean;
        /**
        * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
        * @method copyFrom
        * @param source {Rectangle} The source rectangle object to copy from
        * @return {Rectangle} This rectangle object
        * @public
        **/
        public copyFrom(source: Rectangle): Rectangle;
        /**
        * Copies all the rectangle data from this Rectangle object into the destination Rectangle object.
        * @method copyTo
        * @param target {Rectangle} The destination rectangle object to copy in to
        * @return {Rectangle} The destination rectangle object
        * @public
        **/
        public copyTo(target: Rectangle): Rectangle;
        /**
        * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object. This method compares the x, y, width, and height properties of an object against the same properties of this Rectangle object.
        * @method equals
        * @param  toCompare {Rectangle} toCompare The rectangle to compare to this Rectangle object.
        * @return {boolean} A value of true if the object has exactly the same values for the x, y, width, and height properties as this Rectangle object; otherwise false.
        * @public
        **/
        public equals(toCompare: Rectangle): boolean;
        /**
        * Increases the size of the Rectangle object by the specified amounts, in pixels. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
        * @method inflate
        * @param dx {Number} dx The amount to be added to the left side of this Rectangle.
        * @param dy {Number} dy The amount to be added to the bottom side of this Rectangle.
        * @return {Rectangle} This Rectangle object.
        * @public
        **/
        public inflate(dx: number, dy: number): Rectangle;
        /**
        * Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
        * @method inflatePoint
        * @param point {Point} The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
        * @return {Rectangle} This Rectangle object.
        * @public
        **/
        public inflatePoint(point: Geom.Point): Rectangle;
        /**
        * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
        * @method intersection
        * @param toIntersect {Rectangle} The Rectangle object to compare against to see if it intersects with this Rectangle object.
        * @param output {Rectangle} Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
        * @return {Rectangle} A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
        **/
        public intersection(toIntersect: Rectangle, output?: Rectangle): Rectangle;
        /**
        * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object. This method checks the x, y, width, and height properties of the specified Rectangle object to see if it intersects with this Rectangle object.
        * @method intersects
        * @param toIntersect {Rectangle} The Rectangle object to compare against to see if it intersects with this Rectangle object.
        * @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
        * @public
        **/
        public intersects(toIntersect: Rectangle): boolean;
        /**
        * Checks for overlaps between this Rectangle and the given Rectangle. Returns an object with boolean values for each check.
        * @method overlap
        * @param rect {Rectangle}
        * @return {Object} An object containing the overlapping details between the two Rectangles
        * @todo Move to an IntersectResult? Do not want to be generating all of these values each time this is called
        * @public
        **/
        public overlap(rect: Rectangle): any;
        /**
        * Determines whether or not this Rectangle object is empty.
        * @method isEmpty
        * @return {boolean} A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
        * @public
        **/
        public isEmpty(): boolean;
        /**
        * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
        * @method offset
        * @param dx {Number} Moves the x value of the Rectangle object by this amount.
        * @param dy {Number} Moves the y value of the Rectangle object by this amount.
        * @return {Rectangle} This Rectangle object.
        * @public
        **/
        public offset(dx: number, dy: number): Rectangle;
        /**
        * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
        * @method offsetPoint
        * @param point {Point} A Point object to use to offset this Rectangle object.
        * @return {Rectangle} This Rectangle object.
        **/
        public offsetPoint(point: Geom.Point): Rectangle;
        /**
        * Sets all of the Rectangle object's properties to 0. A Rectangle object is empty if its width or height is less than or equal to 0.
        * @method setEmpty
        * @return {Rectangle} This rectangle object
        **/
        public setEmpty(): Rectangle;
        /**
        * Sets the properties of Rectangle to the specified values.
        * @method setTo
        * @param x {Number} x The x coordinate of the top-left corner of the rectangle.
        * @param y {Number} y The y coordinate of the top-left corner of the rectangle.
        * @param width {Number} width The width of the rectangle in pixels.
        * @param height {Number} height The height of the rectangle in pixels.
        * @return {Rectangle} This rectangle object
        **/
        public setTo(x: number, y: number, width: number, height: number): Rectangle;
        /**
        * Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
        * @method union
        * @param toUnion{Rectangle} toUnion A Rectangle object to add to this Rectangle object.
        * @param [output = Rectangle] {Rectangle} output Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
        * @return {Rectangle} A Rectangle object that is the union of the two rectangles.
        **/
        public union(toUnion: Rectangle, output?: Rectangle): Rectangle;
        /**
        * [DESCRIPTION REQUIRED]
        * @method scale
        * @param x {number}
        * @param y {number}
        * @param translation {Point}
        * @return {Rectangle}
        * @public
        **/
        public scale(x: number, y: number, translation: Geom.Point): Rectangle;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        **/
        public toString(): string;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * Represents position, scale, rotation and rotationPoint of an Entity.
    * - Values can be transformed with a 3x3 affine transformation matrix, which each transform is assigned.
    * - A tranform can be assigned a parent, which may in turn have it's own parent, thereby creating a tranform inheritence heirarchy
    * - A concatenated transformation matrix, representing the combined matrices of the transform and its ancestors.
    *
    * @class Transform
    * @namespace Kiwi.Geom
    * @constructor
    * @param x {Number} x. X position of the transform.
    * @param y {Number} y. Y position of the transform.
    * @param scaleX {Number} scaleX. X scaling of the transform.
    * @param scaleY {Number} scaleY. Y scaling of the transform.
    * @param rotation {Number} rotation. Rotation of the transform in radians.
    * @param rotX {Number} rotX. rotationPoint offset on X axis.
    * @param rotY {Number} rotY. rotationPoint offset on Y axis.
    * @return {Transform} This object.
    *
    */
    class Transform {
        constructor(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, rotPointX?: number, rotPointY?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * X position of the transform
        * @property _x
        * @type Number
        * @private
        **/
        private _x;
        /**
        * Return the X value of the transform.
        * @property x
        * @type Number
        * @return {Number} The X value of the transform.
        */
        public x : number;
        /**
        * Y position of the transform
        * @property _y
        * @type Number
        * @private
        **/
        private _y;
        /**
        * Return the Y value of the transform.
        * @property y
        * @type Number
        * @return {Number} The Y value of the transform.
        * @public
        */
        public y : number;
        /**
        * X scaleof the transform
        * @property _scaleX
        * @type Number
        * @private
        **/
        private _scaleX;
        /**
        * Return the X scale value of the transform.
        * @property scaleX
        * @type Number
        * @return {Number} The X value of the transform.
        * @public
        */
        public scaleX : number;
        /**
        * Y scale of the transform
        * @property _scaleY
        * @type Number
        * @private
        **/
        private _scaleY;
        /**
        * Return the Y scale value of the transform.
        * @property scaleY
        * @type Number
        * @return {Number} The Y value of the transform.
        * @public
        */
        public scaleY : number;
        /**
        * Rotation of the transform in radians.
        * @property _rotation
        * @type Number
        * @private
        **/
        private _rotation;
        /**
        * Return the rotation value of the transform in radians.
        * @property rotation
        * @return {Number} The rotation value of the transform.
        * @public
        */
        public rotation : number;
        /**
        * Rotation offset on X axis.
        * @property _rotPointX
        * @type Number
        * @private
        **/
        private _rotPointX;
        /**
        * Return the Rotation value from the x axis.
        * @property rotPointX
        * @return {Number} The registration value from the x axis.
        * @public
        */
        public rotPointX : number;
        /**
        * Rotation offset on Y axis.
        * @property _rotY
        * @type Number
        * @private
        **/
        private _rotPointY;
        /**
        * Return the rotation value from the y axis.
        * @public rotY
        * @return {Number} The rotation value from the y axis.
        * @public
        */
        public rotPointY : number;
        /**
        * A 3x3 transformation matrix object that can be use this tranform to manipulate points or the context transformation.
        * @property _matrix
        * @type Object
        * @protected
        **/
        private _matrix;
        /**
        * Return the Matrix being used by this Transform
        * @property matrix
        * @return {Matrix} The Matrix being used by this Transform
        */
        public matrix : Geom.Matrix;
        /**
        * The most recently calculated matrix from getConcatenatedMatrix.
        * @property _cachedConcatenatedMatrix
        * @type Kiwi.Geom.Matrix
        * @private
        **/
        private _cachedConcatenatedMatrix;
        /**
        * Return the x of this transform translated to world space.
        * @property worldX
        * @return {Number} x coordinate in world space
        * @public
        */
        public worldX : number;
        /**
        * Return the y of this transform translated to world space.
        * @property worldY
        * @return {Number} y coordinate in world space
        * @public
        */
        public worldY : number;
        /**
        * The parent transform. If set to null there is no parent. Otherwise this is used by getConcatenatedMatrix to offset the current transforms by the another matrix
        * @property _parent
        * @type Kiwi.Geom.Transform
        * @private
        **/
        private _parent;
        /**
        * Return the parent Transform, if any.
        * @property parent
        * @return {Transform} The parent Transform, or null.
        * @public
        */
        public parent : Transform;
        /**
        * Set the X and Y values of the transform.
        * @method setPosition
        * @param x {Number} x.
        * @param y {Number} y.
        * @return {Transform} This object.
        * @public
        */
        public setPosition(x: number, y: number): Transform;
        /**
        * Set the X and Y values of the transform from a point.
        * @method setPositionPoint
        * @param point {Kiwi.Geom.Point} point.
        * @return {Transform} This object.
        * @public
        */
        public setPositionFromPoint(point: Geom.Point): Transform;
        /**
        * Translate the X and Y value of the transform by point components.
        * @method translatePositionFromPoint
        * @param point {Point} point.
        * @return {Transform} This object.
        */
        public translatePositionFromPoint(point: Geom.Point): Transform;
        /**
        * Return a Point representing the X and Y values of the transform. If none is given a new Point objected will be created.
        * @method getPostionPoint
        * @return {Kiwi.Geom.Point} A point representing the X and Y values of the transform.
        * @public
        */
        public getPositionPoint(output?: Geom.Point): Geom.Point;
        /**
        * Set the X and Y scale value of the transform.
        * @method scale
        * @param value {Number}
        * @return {Transform} This object.
        * @public
        */
        public scale : number;
        /**
        * Set the core properties of the transform
        * @method setTransform
        * @param x {Number} x. X position of the transform.
        * @param y {Number} y. Y position of the transform.
        * @param scaleX {Number} scaleX. X scaling of the transform.
        * @param scaleY {Number} scaleY. Y scaling of the transform.
        * @param rotation {Number} rotation. Rotation of the transform in radians.
        * @param rotX{Number} rotX. Rotation offset on X axis.
        * @param rotY{Number} rotY. Rotation offset on Y axis.
        * @return {Transform} This object.
        * @public
        */
        public setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, rotPointX?: number, rotPointY?: number): Transform;
        /**
        * Return the parent matrix of the transform. If there is no parent then null is returned.
        * @method getParentMatrix
        * @return {Matrix} The parent transform matrix.
        * @public
        */
        public getParentMatrix(): Geom.Matrix;
        /**
        * Return the transformation matrix that concatenates this transform with all ancestor transforms.
        * If there is no parent then this will return a matrix the same as this transforms matrix.
        * @method getConcatenatedMatrix
        * @return {Matrix} The concatenated matrix.
        * @public
        */
        public getConcatenatedMatrix(): Geom.Matrix;
        /**
        * Return the x of this transform translated to a camera space
        * @method getCameraX
        * @param camera {Object} the camera
        * @return {Number} x coordinate in the camera space
        
        public getCameraX ( camera:Camera ):number
        {
        var mat = this.getConcatenatedMatrix();
        mat.prependMatrix(camera.transform.getConcatenatedMatrix());
        return mat.tx;
        }
        
        /**
        * Return the y of this transform translated to a camera space
        * @method getCameraY
        * @param camera {Object} the camera
        * @return {Number} y coordinate in the camera space
        
        public getCameraY ( camera:Camera ):number
        {
        var mat = this.getConcatenatedMatrix();
        mat.prependMatrix(camera.transform.getConcatenatedMatrix());
        return mat.ty;
        }
        */
        /**
        * [Requires Description]
        * @method transformPoint
        * @param point {Point} point
        * @return {Point}
        * @public
        **/
        public transformPoint(point: Geom.Point): Geom.Point;
        /**
        * Copy another transforms data to this transform. A clone of the source matrix is created for the matrix property.
        * @method copyFrom
        * @param transform {Transform} transform. The tranform to be copied from.
        * @return {Transform} This object.
        * @public
        */
        public copyFrom(source: Transform): Transform;
        /**
        * Copy this transforms data to the destination Transform. A clone of this transforms matrix is created in the destination Transform Matrix.
        * @method copyTo
        * @param destination {Transform} The tranform to copy to.
        * @return {Transform} This object.
        * @public
        */
        public copyTo(destination: Transform): Transform;
        /**
        * Return a clone of this transform.
        * @method clone
        * @param output {Transform} A Transform to copy the clone in to. If none is given a new Transform object will be made.
        * @return {Transform} A clone of this object.
        * @public
        */
        public clone(output?: Transform): Transform;
        /**
        * Recursively check that a transform does not appear as its own ancestor
        * @method checkAncestor
        * @param transform{Transform} The Transform to check.
        * @return {boolean} Returns true if the given transform is the same as this or an ancestor, otherwise false.
        * @public
        */
        public checkAncestor(transform: Transform): boolean;
        /**
        * Return a string represention of this object.
        * @method toString
        * @return {string} A string represention of this object.
        * @public
        */
        public toString : string;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * A two dimensional vector object for storing and manipulating x and y vector components.
    *
    * @class Vector2
    * @namespace Kiwi.Geom
    * @constructor
    * @param {Number} x The x component of the vector.
    * @param {Number} y The y component of the vector.
    * @return {Vector2}
    */
    class Vector2 {
        constructor(x?: number, y?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The x component of this Vector2.
        * @property x
        * @type Number
        **/
        public x: number;
        /**
        * The y component of this Vector2.
        * @property y
        * @type Number
        **/
        public y: number;
        /**
        * Generate a Vector2 from an angle
        * @method fromAngle
        * @param angle {Number} The angle to generate the Vector2 from.
        * @static
        * @return {Vector2} A new Vector2.
        */
        static fromAngle(angle: number): Vector2;
        /**
        * Generate a random Vector2 within a given radius.
        * @method randomRadius
        * @param radius {Number} The size of the radius to use.
        * @static
        * @return {Vector2} A new Vector2.
        * @public
        */
        static randomRadius(radius: number): Vector2;
        /**
        * Generate a Vector2 from a point.
        * @method fromPoint
        * @param point {Point} point.
        * @static
        * @return {Vector2} A new Vector2.
        * @public
        */
        static fromPoint(point: Geom.Point): Vector2;
        /**
        * Add each component of another Vector2 to this vectors components.
        * @method add
        * @param {Vector2} Vector2 to add.
        * @return {Vector2} A new Vector2 containing the product.
        */
        public add(vector2: Vector2): Vector2;
        /**
        * Add only the x component of another Vector2 to this vector.
        * @method addX
        * @param vector2 {Vector2} Vector2 to add.
        * @return {Vector2} A new Vector2 containing the result.
        * @public
        */
        public addX(vector2: Vector2): Vector2;
        /**
        * Add only the y component of another Vector2 to this vector.
        * @method addY
        * @param vector2 {Vector2} Vector2 to add.
        * @return {Vector2} A new Vector2 containing the result.
        */
        public addY(vector2: Vector2): Vector2;
        /**
        * Subtract each component of another Vector2 from this vectors components.
        * @method subtract
        * @param vector2 {Vector2} Vector2 to subtract.
        * @return {Vector2} A new Vector2 containing the result.
        * @public
        */
        public subtract(vector2: Vector2): Vector2;
        /**
        * Multiply each component of another Vector2 with this vectors components.
        * @method multiply
        * @param vector2 {Vector2} Vector2 to multiply.
        * @return {Vector2} A new Vector2 containing the result.
        * @public
        */
        public multiply(vector2: Vector2): Vector2;
        /**
        * Multiply each component of this vector with a scalar number.
        * @method multiplyScalar
        * @param scalar {Number} Scalar to multiply.
        * @return {Vector2} A new Vector2 containing the result.
        * @public
        */
        public multiplyScalar(scalar: number): Vector2;
        /**
        * Calculate the dot product if a Vector2 with this Vector2.
        * @method dot
        * @param vector2{Vector2} Vector2 to dot with this Vector2.
        * @return {Number} Result of dot product.
        * @public
        */
        public dot(vector2: Vector2): number;
        /**
        * Calculate the square length of this Vector2 (Distance from the origin).
        * @method lenSqr
        * @return {Number} The square length.
        * @public
        */
        public lenSqr(): number;
        /**
        * Calculate the length of this Vector2 (Distance from the origin).
        * @method len
        * @return {Number} The length.
        * @public
        */
        public len(): number;
        /**
        * Calculate a normalised unit Vector2 from this Vector2.
        * @method unit
        * @return {Vector2} a new Unit Length Vector2.
        * @public
        */
        public unit(): Vector2;
        /**
        * Reduce each component of the Vector to the closest lower round value.
        * @method floor
        * @return {Vector2} a rounded down Vector2.
        * @public
        */
        public floor(): Vector2;
        /**
        * Increase each component of the Vector to the closest upper round value.
        * @method ceil
        * @return {Vector2} a rounded up Vector2.
        * @public
        */
        public ceil(): Vector2;
        /**
        * Round each component of the Vector to the closest round value.
        * @method round
        * @return {Vector2} a rounded Vector2.
        * @public
        */
        public round(): Vector2;
        /**
        * Clamp the vector between a maximum and minimum Vector2 range component-wise.
        * @method clamp
        * @param min {Vector2} min. Minimum values for Vector2.
        * @param max {Vector2} max. Maximum values for Vector2.
        * @return {Vector2} a clamped Vector2.
        * @public
        */
        public clamp(min: Vector2, max: Vector2): Vector2;
        /**
        * Calculate a Vector2 perpendicular to this Vector2.
        * @method perp
        * @return {Vector2} the perpendicular Vector2.
        * @public
        */
        public perp(): Vector2;
        /**
        * Calculate a Vector2 opposite to this Vector2.
        * @method neg
        * @return {Vector2} the opposite Vector2.
        * @public
        */
        public neg(): Vector2;
        /**
        * Check if two Vector2s from equal components.
        * @method equal
        * @param vector2 {Vector2} vector2. Vector2 to check against.
        * @return {boolean} returns true if equal.
        * @public
        */
        public equal(vector2: Vector2): boolean;
        /**
        * Get a Point object with the same components as this Vector2.
        * @method point
        * @return {Point} A new Point.
        * @public
        */
        public point(): Geom.Point;
        /**
        * Set both components to zero.
        * @method clear
        * @return {Vector2} This object.
        * @public
        */
        public clear(): Vector2;
        /**
        * Get a clone of this Vector2.
        * @method clone
        * @param vector2 {Vector2} vector2. A vector2 that will be cloned to. Optional.
        * @return {Vector2} Either a new cloned Vector2 or the output vector with cloned components.
        * @public
        */
        public clone(output?: Vector2): Vector2;
        /**
        * Copy components from another Vector2.
        * @method copyFrom
        * @param source {Vector2} A Vector2 to copy from.
        * @return {Vector2} This object.
        * @public
        */
        public copyFrom(source: Vector2): Vector2;
        /**
        * Copy components to another Vector2.
        * @method copyTo
        * @param target {Vector2} A Vector2 to copy to.
        * @return {Vector2} The supplied Vector2.
        * @public
        */
        public copyTo(target: Vector2): Vector2;
        /**
        * Set components on this Vector2.
        * @method setTo
        * @param x {Number} x component to set.
        * @param y {Number} y component to set.
        * @return {Vector2} This object.
        * @public
        */
        public setTo(x: number, y: number): Vector2;
        /**
        * Get a string representation of this object.
        * @method toString
        * @return {string} This object as a string.
        */
        public toString(): string;
    }
}
/**
*
* @module Kiwi
* @submodule HUD
*
*/
declare module Kiwi.HUD {
    /**
    * A HUDDisplay is a container for which you can add/removes widget on, and is more used to manage the widgets that are being displayed on it.
    * A HUDDisplay is created through a games HUDManager and is NOT directly instantiated.
    * Each game can contain multiple HUDDisplay's and each HUDDisplay can contain multiple HUDWidgets.
    *
    * @class HUDDisplay
    * @namespace Kiwi.HUD
    * @constructor
    * @param game {Game} The game that this HUD Display belongs to.
    * @param name {string} The name of this display.
    * @return HUDDisplay
    */
    class HUDDisplay {
        constructor(game: Kiwi.Game, name: string);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The type of device that is being targeted for the game. This is the same as games deviceTargetOption
        * Needed as the type of device will detiremine how the items will be added to game or whether it will even work.
        *
        * @property _device
        * @type number
        * @private
        */
        private _device;
        /**
        * The HUD Manager that this Display belongs to.
        * @property _manager
        * @type HUDManager
        * @private
        */
        private _manager;
        /**
        * Holds the container HTMLDivElement.
        * @property container
        * @type HTMLDivElement
        * @public
        */
        public container: HTMLDivElement;
        /**
        * The name of this HUD Display.
        * @property name
        * @type String
        * @public
        */
        public name: string;
        /**
        * The game that this HUD Display is on.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * Contains all of the widgets that are contained in this HUDDisplay.
        * @property _widgets
        * @type HUDWidget
        * @private
        */
        private _widgets;
        /**
        * Adds a widget to the HUDDisplay. Returns a boolean as an indication of whether or not it was successful.
        *
        * @method addWidget
        * @param widget {HUDWidget}  The widget to be added to the Display
        * @return {Boolean} If it was successful or not.
        * @public
        */
        public addWidget(widget: HUD.HUDWidget): boolean;
        /**
        * Removes a singular widget from the display. Returns a boolean as an indication of if anything happened or not.
        *
        * @method removeWidget
        * @param widget {HUDWidget} The widget to be removed.
        * @return {boolean} If it was successful or not.
        * @public
        */
        public removeWidget(widget: HUD.HUDWidget): boolean;
        /**
        * Removes all of the widgets on this display.
        * @method removeAllWidgets
        * @public
        */
        public removeAllWidgets(): void;
        /**
        * Removes a widget from on the HUDDisplay.
        * @method removeFromContainer
        * @param widget {HUDWidget} The Widget to be removed.
        * @returns {boolean}
        */
        private removeFromContainer(widget);
        /**
        * Update loop
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Shows displays the HUD Display on screen.
        * @method show
        * @public
        */
        public show(): void;
        /**
        * Hides the current HUD Display from the screen.
        * @method hide
        * @public
        */
        public hide(): void;
        /**
        * The class name that the container element that this HUDWidget current has.
        * @property class
        * @type {String}
        * @public
        */
        public class : string;
    }
}
/**
* The HUD (Heads Up Display) is a section that handles the displayment of information that you always want visible to user.
* This section is managed differently to normal GameObjects, where the difference being that HUD items aren't added to a Canvas but are DOM elements instead. Since they DOM elements you can style these elements using a CSS sheet if you wish.
*
* @module Kiwi
* @submodule HUD
* @main HUD
*/
declare module Kiwi.HUD {
    /**
    * This class manages all of the various HUDDisplays that are currently used on this Managers game.
    * Using this class you can create/add and remove HUDDisplays from this game,
    * change the HUDDisplay that is currently being display (also known as the currentHUD) and show/hide the currentHUD.
    * Each HUDManager also has at least one HUDDisplay which is called the 'defaultHUD' you cannot remove,
    * but you can reassign the defaultHUD to be a different HUDDisplay if you want.
    *
    *
    * @class HUDManager
    * @namespace Kiwi.HUD
    * @constructor
    * @param game {Game} game
    * @return {HUDManager}
    */
    class HUDManager {
        constructor(game: Kiwi.Game);
        /**
        * The game that this HUDManager belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * The device that this game is being target at. The same as the deviceTargetOption property on the root Game.
        * This is needed as it detirmines if HUD is supported on the device or not and if so, how it is implemented.
        * @property _device
        * @type number
        * @private
        */
        private _device;
        /**
        * If the HUD is supported on the DEVICE that is being targeted. Gets set during the BOOT sequence.
        * @property _supported
        * @type boolean
        * @private
        */
        private _supported;
        /**
        * Returns the _supported property indicating whether HUD is supported or not.
        * @property supported
        * @type boolean
        * @public
        */
        public supported : boolean;
        /**
        * The HTMLDivElement that is being used as the container for the whole manager.
        * @property _hudContainer
        * @type HTMLDivElement
        * @private
        */
        private _hudContainer;
        /**
        * The DOM is ready, so if the current state is pending we can boot up the HUD now.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Returns the type of object this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * An array containing all of the HUDDisplays that are currently active on this HUDManager.
        * @property _huds
        * @type HUDDisplay[]
        * @private
        */
        private _huds;
        /**
        * The defaultHUD that is being used.
        * The defaultHUD cannot be removed, but can be swapped out for another HUDDisplay.
        * @property _defaultHUD
        * @type HUDDisplay
        * @private
        */
        private _defaultHUD;
        /**
        * The currentHUD that is in use. Can be the same as the defaultHUD.
        * @property _currentHUD
        * @type HUDDisplay
        * @private
        */
        private _currentHUD;
        /**
        * The default HUDDisplay that is to be used.
        * The defaultHUD cannot be removed, and a game (that supports HUDS) will always contain the defaultHUD.
        *
        * @property defaultHUD
        * @type {HUDDisplay}
        * @public
        */
        public defaultHUD : HUD.HUDDisplay;
        /**
        * Changes the currentHUD that is being displayed to one that is passed.
        * @method setHUD
        * @param hud {HUDDisplay} The HUD you want to display.
        * @public
        */
        public setHUD(hud: HUD.HUDDisplay): void;
        /**
        * Shows the currentHUD (if nothing is passed) or shows a HUDDisplay that is passed.
        * @method showHUD
        * @param [hud=currentHUD] {HUDDisplay} The HUDDisplay you want to show. Defaults to the currentHUD if nothing is passed.
        * @public
        */
        public showHUD(hud?: HUD.HUDDisplay): void;
        /**
        * Hides the currentHUD (if nothing is passed) or shows a HUDDisplay that is passed.
        * @method hideHUD
        * @param [hud=currentHUD] {HUDDisplay} The HUDDisplay you want to hude. Defaults to the currentHUD if nothing is passed.
        * @public
        */
        public hideHUD(hud?: HUD.HUDDisplay): void;
        /**
        * Creates a new HUDDisplay on this HUDManager.
        *
        * @method createHUD
        * @param name {string} Name of the new HUDDisplay that is being creates.
        * @param [switchTo=false] {boolean} Switch to the new HUD that was created. DE
        * @return {HUDDisplay} The HUDDisplay that was created.
        * @public
        */
        public createHUD(name: string, switchTo?: boolean): HUD.HUDDisplay;
        /**
        * Removes a HUDDisplay off this manager. Returns a boolean indicating whether or not this method was a success.
        *
        * @method removeHUD
        * @param hud {HUDDisplay} The hud you want to remove.
        * @returns {boolean} If this method succeeded or not.
        * @public
        */
        public removeHUD(hud: HUD.HUDDisplay): boolean;
        /**
        * Adds a HUDDisplays HTMLDivElement to this HUDManagers container element.
        * @method addToContainer
        * @param hud {HUDDisplay} The HUDDisplay that is to be added.
        * @private
        */
        private addToContainer(hud);
        /**
        * Removes the hud that is passed from this HUD Manager. Checks to see if that hud has this container as a parent first.
        * @method removeFromContainer
        * @param hud {HUDDisplay} The hud to be removed
        * @private
        */
        private removeFromContainer(hud);
        /**
        * Game loop
        * @method update
        * @public
        */
        public update(): void;
    }
}
/**
*
* @module Kiwi
* @submodule HUD
*/
declare module Kiwi.HUD {
    /**
    * The HUDWidget is an abstract class containing the fundamental properties and methods that every HUDWidget needs to have.
    * This class is designed to be extended from and thus objects should not directly instantiate it.
    *
    * @class HUDWidget
    * @namespace Kiwi.HUD
    * @constructor
    * @param game {Game}  The game that this HUDWidget belongs to.
    * @param name {string} Name of the type of HUDWidget.
    * @param x {number} The coordinates of this HUDWidget on the x-axis.
    * @param y {number} The coordinates of this HUDWidget on the y-axis.
    * @return {HUDWidget}
    */
    class HUDWidget {
        constructor(game: Kiwi.Game, name: string, x: number, y: number);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The HUDManager that this widget 'belongs' to.
        * This is mainly indented for INTERNAL Kiwi use only and is public so that sub classes can have a reference to it.
        * @property _manager
        * @type HUDManager
        * @protected
        */
        public _manager: HUD.HUDManager;
        /**
        * The type of device that this game is being targeted at. Same as the deviceTargetOption on the game class.
        * Used to detirmine how the HUD is to be managed behind the scenes.
        * This is mainly indented for INTERNAL Kiwi use only and is public so that sub classes can have a reference to it.
        * @property _device
        * @type _device
        * @protected
        */
        public _device: number;
        /**
        * The game that this HUDWidget belongs to.
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;
        /**
        * A quick way to reference the style object that exists on the container element of this widget.
        * @property style
        * @type any
        * @public
        */
        public style : any;
        /**
        * Called when the coordinates of the HUD Widget updates.
        * @property onCoordsUpdate
        * @type Signal
        * @public
        */
        public onCoordsUpdate: Kiwi.Signal;
        /**
        * The x coordinate of the widget
        * @property _x
        * @type number
        * @private
        */
        private _x;
        /**
        * Get the x coordinate of the widget
        * @property x
        * @type number
        * @public
        */
        public x : number;
        /**
        * The y coordinate of the widget
        * @property _y
        * @type number
        * @private
        */
        private _y;
        /**
        * Get the y coordinate of the widget
        * @property y
        * @type number
        * @public
        */
        public y : number;
        /**
        * The list of components that the HUDWidget use's.
        * @property components
        * @type ComponentManager
        * @public
        */
        public components: Kiwi.ComponentManager;
        /**
        * The HTMLDivElement that this widget is using.
        * @property
        * @type HTMLDivElement
        * @public
        */
        public container: HTMLDivElement;
        /**
        * The name of the widget which is used to identify the type of widget.
        * @property
        * @type string
        * @public
        */
        public name: string;
        /**
        * When a template has been set, this property will have a reference to the HTMLElement we can place the HUDWidget information into.
        * Currently doesn't have that great support.
        * @property tempElement
        * @type HTMLElement
        * @public
        */
        public tempElement: HTMLElement;
        /**
        * The parent of the template container. So that when removing a template we can place it in the right spot
        * Currently doesn't have that great support.
        * @property _tempParent
        * @type HTMLElement
        * @private
        */
        private _tempParent;
        /**
        * The container element for the template
        * Currently doesn't have that great support.
        * @property _tempContainer
        * @type HTMLElement
        * @private
        */
        private _tempContainer;
        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        *
        * Can be used by itself but maybe more useful if you customise it to suit your own needs.
        * Currently doesn't have that great support.
        *
        * @method setTemplate
        * @param main {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget.
        * @param [element] {string} element - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        * @public
        */
        public setTemplate(main: string, element?: string, ...paramsArr: any[]): void;
        /**
        * Used to remove any the template HTML from this HUDWidget.
        * Currently doesn't have that great support.
        *
        * @method removeTemplate
        * @public
        */
        public removeTemplate(): void;
        /**
        * The class name/s that the container element that this HUDWidget current has.
        * @property class
        * @type {String}
        * @public
        */
        public class : string;
        /**
        * The game update loop.
        * @method update
        * @public
        */
        public update(): void;
        /**
        *
        * @method destroy
        * @public
        */
        public destroy(): void;
    }
}
/**
* HUD Widgets are objects that are generally placed on to a HUD Display for displaying and managing information that the user would always need to see.
* An example of such information would be: the Health remaining, amount of ammo left, time they have left, e.t.c.
* And each one of those examples would have its own widget.
*
* @module HUD
* @submodule Widget
* @main Widget
*/
declare module Kiwi.HUD.Widget {
    /**
    * A Widget that is used for the displaying of text on the HUD.
    * Foreach TextField you can add some prefix/suffix text, which is more useful on classes extending this one.
    *
    * @class TextField
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this textfield belongs to.
    * @param text {string} The text on this textfield.
    * @param x {number} The x coordinates
    * @param y {number} The y coordinates
    * @return {TextField}
    */
    class TextField extends HUD.HUDWidget {
        constructor(game: Kiwi.Game, text: string, x: number, y: number);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The text current being displayed inside this textfield.
        * @property _text
        * @type string
        * @private
        */
        private _text;
        /**
        * The htmlelement that is being used as the textfield.
        * Initially when created this is the same as the container HTMLDivElement.
        * @property _textField
        * @type HTMLElement
        * @private
        */
        private _textField;
        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        *
        * Currently doesn't have great support.
        *
        * @method setTemplate
        * @param main {string} ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget.
        * @param icon {string} ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        * @public
        */
        public setTemplate(main: string, field?: string): void;
        /**
        * Used to remove any the template HTML from this HUDWidget.
        * Currently doesn't have great support.
        *
        * @method removeTemplate
        * @public
        */
        public removeTemplate(): void;
        /**
        * The text that is currently being displayed inside the textfield.
        * @property text
        * @type string
        * @public
        */
        public text : string;
        /**
        * A string that is to be added in-front of the score. Can contain HTMLElements.
        * @property _prefix
        * @type string
        * @default ''
        * @private
        */
        private _prefix;
        /**
        * A string that is to be added after the score. Can contain HTMLElements.
        * @property _suffix
        * @type string
        * @default ''
        * @private
        */
        private _suffix;
        /**
        * A string that is to be added after the score. Can contain HTMLElements.
        * @property _suffix
        * @type string
        * @default ''
        * @public
        */
        public suffix : string;
        /**
        * A string that is to be added in-front of the score. Can contain HTMLElements.
        * @property _prefix
        * @type string
        * @default ''
        * @public
        */
        public prefix : string;
        /**
        * This method is intended to be overriden by subclasses which functions update the text being displayed.
        * @method _updateText
        * @protected
        */
        public _updateText(): void;
    }
}
/**
* @module HUD
* @submodule Widget
*/
declare module Kiwi.HUD.Widget {
    /**
    * Used for displaying of information in a bar like of format. Example: Amount of health remaining for a character.
    * This class creates a 'innerbar' div inside of its main container which you can apply styles to.
    * You can control the minimum/maximum and current values of the bar through the Counter widget.
    *
    * @class Bar
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this bar belongs to.
    * @param current {number} The current value of the bar.
    * @param max {number} The maximum value that there can be.
    * @param x {number} The coordinates of this widget on the x-axis.
    * @param y {number} The cooridnates of this widget on the y-axis.
    * @param [width=120] {number} The width of the widget. Defaults to 120.
    * @param [height=20] {number} The height of the widget. Defaults to 20.
    * @param [color='#000'] {string} The default color of the inner bar. Defaults to #000 (black).
    * @return {Bar}
    */
    class Bar extends HUD.HUDWidget {
        constructor(game: Kiwi.Game, current: number, max: number, x: number, y: number, width?: number, height?: number, color?: string);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The width of the container
        * @property _width
        * @type number
        * @private
        */
        private _width;
        /**
        * The width of the container
        * @property width
        * @type number
        * @public
        */
        public width : number;
        /**
        * The height of the container
        * @property _height
        * @type number
        * @private
        */
        private _height;
        /**
        * The height of the container
        * @property height
        * @type number
        * @public
        */
        public height : number;
        /**
        * Knows if this bar is ment to be horizontal or veritical
        * @property _horizontal
        * @type boolean
        * @private
        */
        private _horizontal;
        /**
        * The HTMLElement that is currently being used as the 'bar'.
        * @property bar
        * @type HTMLElement
        * @public
        */
        public bar: HTMLElement;
        /**
        * A reference to the HTMLElement that this class always generates.
        * @property _bar
        * @type HTMLElement
        * @private
        */
        private _bar;
        /**
        * The counter component.
        * @property counter
        * @type Counter
        * @public
        */
        public counter: HUD.HUDComponents.Counter;
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property horizontal
        * @type boolean
        * @public
        */
        public horizontal : boolean;
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property verticle
        * @type boolean
        * @public
        */
        public vertical : boolean;
        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        * Currently not supported.
        *
        * @method setTemplate
        * @param main {string} ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget.
        * @param innerbar {string} ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        * @public
        */
        public setTemplate(main: string, innerbar?: string): void;
        /**
        * Used to remove any the template HTML from this HUDWidget.
        * Current not supported.
        *
        * @method removeTemplate
        * @public
        */
        public removeTemplate(): void;
        /**
        * Will be called when the range has been updated and thus you will want to preform the render of the bar here.
        * This should be overriden by subclasses so that you have your own custom bars.
        * @method updateCSS
        * @public
        */
        public updateCSS(): void;
    }
}
/**
*
* @module HUD
* @submodule Widget
*
*/
declare module Kiwi.HUD.Widget {
    /**
    * Used to display a cell from a TextureAtlas in the HUD. This could be used for portraits of the character, e.t.c.
    * You can change the current cell that is being used in the TextureAtlas by modifing the cellIndex property.
    *
    * @class Icon
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this icon belongs to.
    * @param atlas {TextureAtlas} The image that you would like displayed.
    * @param x {number} The coordinate of the icon on the x-axis.
    * @param y {number The coordinate of the icon on the y-axis.
    * @return {Icon}
    */
    class Icon extends HUD.HUDWidget {
        constructor(game: Kiwi.Game, atlas: Kiwi.Textures.TextureAtlas, x: number, y: number);
        /**
        * Holds the texture atlas that is being used
        * @property atlas
        * @type TextureAtlas
        * @public
        */
        public atlas: Kiwi.Textures.TextureAtlas;
        /**
        * The cell inside the texture atlas that this icon is using
        * @property _cellIndex
        * @type number
        * @default 0
        * @private
        */
        private _cellIndex;
        /**
        * Gets the cell index that is being used.
        * @property cellIndex
        * @type number
        * @default 0
        * @public
        */
        public cellIndex : number;
        /**
        * Returns the width of the cell that is being used.
        * @property width
        * @type number
        * @public
        */
        public width : number;
        /**
        * Returns the height of the cell that is being used.
        * @property height
        * @type number
        * @public
        */
        public height : number;
        /**
        * Is a reference to the element that the icon CSS is being applyed to.
        * @property icon
        * @type HTMLElement
        * @public
        */
        public icon: HTMLElement;
        /**
        * Removes the CSS from the Icon.
        * This can happen when setting/removing a template and is public to allow for overriding from subclasses.
        * @method _removeCSS
        * @protected
        */
        public _removeCSS(): void;
        /**
        * Applys the css to the HTMLElement that is to be affected.
        * @method _applyCSS
        * @protected
        */
        public _applyCSS(): void;
        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        * Currently not supported.
        *
        * @method setTemplate
        * @param main {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget.
        * @param icon {string} icon - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        * @public
        */
        public setTemplate(main: string, icon?: string): void;
        /**
        * Used to remove any the template HTML from this HUDWidget.
        *
        * @method removeTemplate
        * @public
        */
        public removeTemplate(): void;
    }
}
/**
*
* @module HUD
* @submodule Widget
*/
declare module Kiwi.HUD.Widget {
    /**
    * The IconBar used to display a series of icons which represent a number of 'something' the user may have.
    * Example: If you had a shooter style game you might want to display the amount of 'ammo' left in the gun using a series of bullet icons. You could then use this IconBar to display that series.
    * The amount is based of a counter components current value, so you can set a maximum and minimum number of images to be displayed.
    *
    * @class IconBar
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this icon bar belongs to.
    * @param atlas {TextureAtlas} The texture atlas that the icons will have.
    * @param current {number} The current amount of icons in the bar.
    * @param max {number} The maximum number of icons.
    * @param x {number} The x coordinates of the first icon.
    * @param y {number} The y coordinates of the last icon.
    * @return {IconBar}
    */
    class IconBar extends HUD.HUDWidget {
        constructor(game: Kiwi.Game, atlas: Kiwi.Textures.TextureAtlas, current: number, max: number, x: number, y: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The amount of spacing you want between each icon in the bar. Defaults to 0.
        * @property iconGap
        * @type number
        * @default 0
        * @public
        */
        public iconGap: number;
        /**
        * The texture atlas that each Icon inside the IconBar will use.
        * @property atlas
        * @type TextureAtlas
        * @public
        */
        public atlas: Kiwi.Textures.TextureAtlas;
        /**
        * The width of a single Icon in the bar. This is based on the width of the first cell in the atlas.
        * @property width
        * @type number
        * @private
        */
        private width;
        /**
        * The height of a single Icon in the bar. This is based on the height of the first cell in the atlas.
        * @property height
        * @type number
        * @private
        */
        private height;
        /**
        * Knowledge of whether the icons should be horizontal or vertical
        * @property _horizontal
        * @type boolean
        * @default true
        * @private
        */
        private _horizontal;
        /**
        * Holds the counter component.
        * @property counter
        * @type Counter
        * @public
        */
        public counter: HUD.HUDComponents.Counter;
        /**
        * An array of all of the icons on the screen.
        * @property icons
        * @type Icon[]
        * @private
        */
        private _icons;
        /**
        * Gets called when the range has updated and then it updates the size of the bar.
        * @method _changeSize
        * @private
        */
        private _amountChanged();
        /**
        * Creates a new Icon and adds it to this IconBar.
        * @method _addIcon
        * @private
        */
        private _addIcon();
        /**
        * Removes a Icon from the container.
        * @method _removeIcon
        * @param icon {Icon} The icon that you want to remove
        * @private
        */
        private _removeIcon(icon);
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property horizontal
        * @type boolean
        * @default true
        * @public
        */
        public horizontal : boolean;
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property vertical
        * @type boolean
        * @default false
        * @public
        */
        public vertical : boolean;
    }
}
/**
* @module HUD
* @submodule Widget
*/
declare module Kiwi.HUD.Widget {
    /**
    * A subclass of textfield that is primarily used to keep track of a score.
    * The score can be accessed via the counter component.
    *
    * @class BasicScore
    * @extends TextField
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this BasicScore belongs to.
    * @param x {number} The cooridnates of the game on the x-axis.
    * @param y {number} The cooridnates of the game on the y-axis.
    * @param [initial=0] {number} The initial score to start off at.
    * @return {BasicScore}
    */
    class BasicScore extends Widget.TextField {
        constructor(game: Kiwi.Game, x: number, y: number, initial?: number);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * Holds a reference to the counter component.
        * @property counter
        * @type Counter
        * @public
        */
        public counter: HUD.HUDComponents.Counter;
        /**
        * Updates the text inside the textfield.
        * @method _updateText
        * @private
        */
        public _updateText(): void;
    }
}
/**
*
* @module HUD
* @submodule Widget
*
*/
declare module Kiwi.HUD.Widget {
    /**
    * A subclass of the TextField that has its own input component so that you can listen for mouse events on this widget.
    *
    * @class Button
    * @extends TextField
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {game} The game that this belongs to.
    * @param text {string} The text that you want to display inside the button.
    * @param x {number} The x-coordnates of this Widget.
    * @param y {number} The y-coordinates of this Widget.
    * @return {Button}
    */
    class Button extends Widget.TextField {
        constructor(game: Kiwi.Game, text: string, x: number, y: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The WidgetInput component that handles the management of events for this button.
        * @property input
        * @type WidgetInput
        * @public
        */
        public input: HUD.HUDComponents.WidgetInput;
    }
}
declare module Kiwi.HUD.Widget {
    /**
    * A subclass of TextField which manages the displaying of a Time/Timer by creating a new clock on the Time Manager.
    * The time is managed by a Time Component which contains a format property that handles how the time should be formatted.
    *
    * @class Time
    * @extends TextField
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this object belongs to.
    * @param format {string} The format that you want the time to be displayed in. Leave it empty to display as normal.
    * @param x {number} The position of this text on the field.
    * @param y {number} The position of this text on the field.
    * @return {TextField}
    */
    class Time extends Widget.TextField {
        constructor(game: Kiwi.Game, format: string, x: number, y: number);
        /**
        * Holds the time component which manages the counting/formating of the time.
        *
        * @property time
        * @type Time
        * @public
        */
        public time: HUD.HUDComponents.Time;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * Pauses the clock where is stands. Calls the pause method on the clock.
        * @method pause
        * @public
        */
        public pause(): void;
        /**
        * Stops the clock and thus the time. Calls the stop method of the clock.
        * @method stop
        * @public
        */
        public stop(): void;
        /**
        * Starts the clock and thus the time.
        * @method start
        * @public
        */
        public start(): void;
        /**
        * Resumes the clock and thus the time.
        * @method resume
        * @public
        */
        public resume(): void;
        /**
        * The update loop.
        * @method update
        * @public
        */
        public update(): void;
    }
}
/**
* @module HUD
* @submodule Widget
*/
declare module Kiwi.HUD.Widget {
    /**
    * A Widget for that is used for the management/displaying of a Menu.
    * This class is primarily used as a manager of MenuItems, so on this class you can create/add MenuItems
    * and styles that you want applyed to all MenuItems.
    *
    * @class Menu
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this Menu belongs to.
    * @param x {number} Its position on the x-axis.
    * @param y {number} Its position on the y -axis.
    * @return {Menu}
    */
    class Menu extends HUD.HUDWidget {
        constructor(game: Kiwi.Game, x: number, y: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * Contains a list of all of the menu items that are currently on this menu.
        * @property _menuItems
        * @type MenuItem[]
        * @private
        */
        private _menuItems;
        /**
        * Sets the style of all of the icons that will be on this menu.
        * @method setStyle
        * @param index {string}
        * @param value {string}
        * @public
        */
        public setIconStyle(index: string, value: string): void;
        /**
        * An array containing all of the styles that are/will be applyed to each MenuIcon.
        * @property _styles
        * @type Array
        * @private
        */
        private _styles;
        /**
        * Returns a list that contains all of the menu items (buttons) that are currently on this menu.
        * Note: The array itself is READ ONLY but you can modify the objects contained inside of it.
        * @property menuItems
        * @type MenuItem[]
        * @public
        */
        public menuItems : Widget.MenuItem[];
        /**
        * Creates a new menu item and add's it to this menu.
        * @method createMenuItem
        * @param text {string} The text that you would like the menu item to have.
        * @param x {number} The x position of the menu item you are wanting to add.
        * @param y {number} The y position of the menu item you are wanting to add.
        * @return {MenuItem} The newly created MenuItem.
        * @public
        */
        public createMenuItem(text: string, x: number, y: number): Widget.MenuItem;
        /**
        * Adds a MenuItem to this menu.
        * @method addMenuItem
        * @param item {MenuItem} The MenuItem that you would like to add to this menu.
        * @return {MenuItem}
        * @public
        */
        public addMenuItem(item: Widget.MenuItem): Widget.MenuItem;
        /**
        * Adds multiple MenuItems to this Menu.
        * @method addMenuItems
        * @param items {MenuItem[]} The array containing all of the menu items you want to add.
        * @public
        */
        public addMenuItems(items: Widget.MenuItem[]): void;
        /**
        * Returns a MenuItem based on its corresponding numeric position that you pass in the array.
        * @method getMenuItem
        * @param val {Number}
        * @return {Kiwi.HUD.Widget.MenuItem}
        * @public
        */
        public getMenuItem(val: number): Widget.MenuItem;
        /**
        * Currently not supported or working.
        * @method setTemplate
        * @param main {string}
        * @param [sub] {string}
        * @public
        */
        public setTemplate(main: string, sub?: string): void;
        /**
        * Currently not working.
        * @method removeTemplate
        * @public
        */
        public removeTemplate(): void;
        /**
        * The update loop.
        * @method update
        * @public
        */
        public update(): void;
    }
}
/**
* @module HUD
* @submodule Widget
*/
declare module Kiwi.HUD.Widget {
    /**
    * A MenuItem extends the Button Widget and is typically contained inside of a Menu Widget.
    * Since a MenuItem extends the Button Widget you can access the Input Component that it has to listen to mouse events.
    *
    * @class MenuItem
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @contructor
    * @param game {Game} The game that this MenuItem belongs to.
    * @param text {string} The text that is to be inside the menuitem.
    * @param x {number} The position of this menu item on the x-axis.
    * @param y {number} The position of this menu item on the y-axis.
    * @return {Button}
    */
    class MenuItem extends Widget.Button {
        constructor(game: Kiwi.Game, text: string, x: number, y: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string;
        /**
        * The Menu that this belongs to.
        * @property menu
        * @type Menu
        * @public
        */
        public menu: Widget.Menu;
    }
}
/**
* HUDComponents are a space where components that are specific to HUDWidgets are kept. This are seperated from the normal Components section as the implementation of these are unique and only make sense when implemented on HUDWidgets, otherwise the concepts behind these are the same as normal Components.
*
* @module HUD
* @submodule HUDComponents
* @main HUDComponents
*/
declare module Kiwi.HUD.HUDComponents {
    /**
    * The Counter component handles a incrementation/decrementation of a singular numeric value.
    * You can also specifiy maximum/minimum values that the numeric value has be within but by default there is no max/min.
    *
    * @class Counter
    * @extends Component
    * @namespace Kiwi.HUD.HUDComponents
    * @constructor
    * @param owner {any} The object that this Component belongs to.
    * @param current {number} The current value.
    * @param [max=null] {number} The maximum value it can be. Default is null which means no maximum.
    * @param [min=null] {number} The minimum value that the current can be. Default is null which means no minium.
    * @return {number}
    */
    class Counter extends Kiwi.Component {
        constructor(owner: any, current: number, max?: number, min?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The current value of the range.
        * @property _current
        * @type number
        * @private
        */
        private _current;
        /**
        * The maximum value that of the range.
        * @property _max
        * @type number
        * @private
        */
        private _max;
        /**
        * The minimum value that of the range.
        * @property _min
        * @type number
        * @default 0
        * @private
        */
        private _min;
        /**
        * A Kiwi.Signal that dispatches an event when a value has changed.
        * @property updated
        * @type Signal
        * @public
        */
        public updated: Kiwi.Signal;
        /**
        * Set allows setting of the maximum value that the range can be in.
        * Get returns the maximum value.
        *
        * @property max
        * @type number
        * @public
        */
        public max : number;
        /**
        * Set allows setting of the minimum value that the range can be in.
        * Get returns the minimum value.
        *
        * @property min
        * @type number
        * @public
        */
        public min : number;
        /**
        * Set allows setting of the current value that the range can be in.
        * The current value will only change if it is within the maximum/minimum values.
        * Get returns the current value.
        *
        * @property current
        * @type number
        * @public
        */
        public current : number;
        /**
        * Decreases the current value by the amount past.
        * If the new amount would be less than the minimun it goes to the min instead.
        *
        * @method decrease
        * @param [val=1] {number} The amount that you want to decrease the current value by. Default is 1.
        * @return {number}
        * @public
        */
        public decrease(val?: number): number;
        /**
        * Increases the current value by the amount past.
        * If the new amount would be greater than the maximum it goes to the max instead.
        *
        * @method increase
        * @param [val=1] {number} The amount that you want to increase the current value by. Default is 1.
        * @return {number}
        * @public
        */
        public increase(val?: number): number;
        /**
        * @method currentPercent
        * @return {number}
        * @public
        */
        public currentPercent(): number;
    }
}
/**
*
* @module HUD
* @submodule HUDComponents
*
*/
declare module Kiwi.HUD.HUDComponents {
    /**
    * The WidgetInput Component handles the input events that you may want to listen to on a widget.
    * This Component is essentually another version of the normal Input Component but instead of for GameObjects this is for HUDWidgets.
    *
    * @class WidgetInput
    * @extends Component
    * @namespace Kiwi.HUD.HUDComponents
    * @constructor
    * @param owner {any} The object that this WidgetInput belongs to.
    * @param container {HTMLElement} The HTMLElement that the events will occur on/to.
    * @return {WidgetInput}
    */
    class WidgetInput extends Kiwi.Component {
        constructor(owner: any, container: HTMLElement);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * A Signal that dispatches events when the user releases the mouse on top of the HTMLElement.
        * @property onUp
        * @type Signal
        * @public
        */
        public onUp: Kiwi.Signal;
        /**
        * A Signal that dispatches events when the user presses the mouse on top of the HTMLElement.
        * @property onDown
        * @type Signal
        * @public
        */
        public onDown: Kiwi.Signal;
        /**
        * A Signal that dispatches events when the user's mouse initially goes over the top of the HTMLElement.
        * @property onOver
        * @type Signal
        * @public
        */
        public onOver: Kiwi.Signal;
        /**
        * A Signal that dispatches events when the user's mouse leaves the HTMLElement.
        * @property onOut
        * @type Signal
        * @public
        */
        public onOut: Kiwi.Signal;
        /**
        * The HTMLElement that the events are going to occur on.
        * @property _container
        * @type HTMLElement
        * @private
        */
        private _container;
        /**
        * Changes the HTMLElement that the events are occuring on to one passed.
        * Removes all of the current events from container before changing.
        * @method setElement
        * @param container {HTMLElement} The new element that the events are going to occur on.
        * @public
        */
        public setElement(container: HTMLElement): void;
        /**
        * Creates new bindings and adds the events to the HTMLElement.
        * @method _addEvents
        * @private
        */
        private _addEvents();
        /**
        * Removes the events off of the current container.
        * @method _removeEvents
        * @private
        */
        private _removeEvents();
        /**
        * An array of objects, that holds the events that are happening and the methods that are bound to the container.
        * @property _binds
        * @type any
        * @private
        */
        private _binds;
        /**
        * If the events are currently actively running or not.
        * @property active
        * @type boolean
        * @private
        */
        private _active;
        /**
        * The method that is called when a mouseup event fires. The onUp Signal is called.
        * @method _up
        * @param evt {MouseEvent}
        * @private
        */
        private _up(evt);
        /**
        * The method that is called when a mousedown event fires. The onDown Signal is called.
        * @method _down
        * @param evt {MouseEvent}
        * @private
        */
        private _down(evt);
        /**
        * The method that is called when a mouseover event fires. The onOver Signal is called.
        * @method _over
        * @param evt {MouseEvent}
        * @private
        */
        private _over(evt);
        /**
        * The method that is called when a mouseout event fires. The onOut Signal is called.
        * @method _out
        * @param evt {MouseEvent}
        * @private
        */
        private _out(evt);
    }
}
/**
*
* @module HUD
* @submodule HUDComponents
*
*/
declare module Kiwi.HUD.HUDComponents {
    /**
    * A Component to manage and display a Time in a particular format.
    * The Time Component creates a new clock on the Time Manager and it use's that clock to keep track of the time.
    * When you create a new Time Component you can specify a format that you want the time to display in, which is a string based on keywords.
    * Current supported keywords for the format are:
    *  's' = 'seconds'
    *  'm' = 'minutes'
    *  'ms' = milliseconds'
    *  'ss' = 'seconds with leading zero'
    *  'mm' = 'minutes with leading zero'
    *
    * @class Time
    * @extends Component
    * @namespace Kiwi.HUD.HUDComponents
    * @constructor
    * @param owner {any} The object that this component belongs to.
    * @param [format=''] {string} The format that the time is to be displayed in. Leave blank for the default time.
    * @return {Counter}
    */
    class Time extends Kiwi.Component {
        constructor(owner: any, format?: string);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The clock that this component creates and uses to manage the current time.
        * @property clock
        * @type Clock
        * @private
        */
        public clock: Kiwi.Time.Clock;
        /**
        * Indicates whether or not the clock is currently running or not, and thus whether or not the time is playing or not.
        * @property isRunning
        * @type boolean
        * @public
        */
        public isRunning : boolean;
        /**
        * Pauses the clock where is stands. Calls the pause method on the clock.
        * @method pause
        * @public
        */
        public pause(): void;
        /**
        * Stops the clock and thus the time. Calls the stop method of the clock.
        * @method stop
        * @public
        */
        public stop(): void;
        /**
        * Starts the clock and thus the time.
        * @method start
        * @public
        */
        public start(): void;
        /**
        * Resumes the clock and thus the time.
        * @method resume
        * @public
        */
        public resume(): void;
        /**
        * The format that they want the time to be displayed.
        * @property _format
        * @type string
        * @private
        */
        private _format;
        /**
        * The format that you want the time to be displayed in.
        * @property format
        * @type string
        * @public
        */
        public format : string;
        /**
        * If the clock should 'count down' instead of up.
        * @property countDown
        * @type boolean
        * @default false
        * @public
        */
        public countDown: boolean;
        /**
        * Used during the formatting stage of displaying the time.
        * @property _displayString
        * @type string
        * @private
        */
        private _displayString;
        /**
        * The current time in seconds.
        * @property _currentTime
        * @type number
        * @private
        */
        private _currentTime;
        /**
        * The current time in seconds. This is READ ONLY.
        * @property currentTime
        * @type number
        * @public
        */
        public currentTime : number;
        /**
        * The last time that the timer update. Used to calculate the time delta.
        * @property _timeBefore
        * @type number
        * @private
        */
        private _timeBefore;
        /**
        * Sets the current time of the timer.
        * @method setTime
        * @param milli {number} The number of milliseconds.
        * @param [sec=0] {number} The number of seconds to add.
        * @param [minutes=0] {number} The number of minutes to add.
        * @public
        */
        public setTime(milli: number, sec?: number, minutes?: number): void;
        /**
        * Increases the current time by the amount passed.
        * @method addTime
        * @param milli {number} The number of milliseconds.
        * @param [sec=0] {number} The number of seconds to add.
        * @param [minutes=0] {number} The number of minutes to add.
        * @public
        */
        public addTime(milli: number, sec?: number, minutes?: number): void;
        /**
        * Decreases the current time by the amount passed.
        * @method removeTime
        * @param milli {number} The number of milliseconds.
        * @param [sec=0] {number} The number of seconds to add.
        * @param [minutes=0] {number} The number of minutes to add.
        * @public
        */
        public removeTime(milli: number, sec?: number, minutes?: number): void;
        /**
        * The speed at which the time will increase/decrease by.
        * Modify this property to make the time count down slower/faster.
        * @property _speed
        * @type number
        * @default 1
        * @private
        */
        public speed: number;
        /**
        * Returns a string with the current time that this component is upto in the format that was passed.
        *
        * @method updateTime
        * @return string
        * @public
        */
        public getTime(): string;
    }
}
/**
* The namespace that holds all of the assets and functionality when dealing with Audio.
*
* @module Kiwi
* @submodule Sound
* @main Sound
*
*/ 
declare module Kiwi.Sound {
    /**
    * Manages the initialisation of assets necessary when dealing with audio in the game, either through Audio Tags or the Web Audio API. Also provides global sound controls that will be applyed to all Audio objects at the same time.
    *
    * @class AudioManager
    * @constructor
    * @namespace Kiwi.Sound
    * @param game {Game} The game that this audio manager belongs to.
    * @return {AudioManager}
    */
    class AudioManager {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this manager belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * The global volume of all of the games audio.
        * @property _volume
        * @type number
        * @default 1
        * @private
        */
        private _volume;
        /**
        * A boolean that controls whether the whole games audio should be muted or not.
        * @property _muted
        * @type boolean
        * @default false
        * @private
        */
        private _muted;
        /**
        * An array containing all of the sounds on the game.
        * @property _sounds
        * @type Audio[]
        * @private
        */
        private _sounds;
        /**
        * The number of channels that are supported.
        * Not in much use at this point in time.
        * @property channels
        * @type number
        * @public
        */
        public channels: number;
        /**
        * If the current game has audio support or not.
        * @property noAudio
        * @type boolean
        * @public
        */
        public noAudio: boolean;
        /**
        * If the game is currently using the Web Audio API for the sound.
        * @property usingWebAudio
        * @type boolean
        * @public
        */
        public usingWebAudio: boolean;
        /**
        * If the game is using audio tags for the sound. This is the fallback if the web audio api is not supported.
        * @property usingAudioTag
        * @type boolean
        * @public
        */
        public usingAudioTag: boolean;
        /**
        * Web Audio API ONLY - The audio context that is used for decoding audio, e.t.c.
        * @property context
        * @type any
        * @public
        */
        public context: any;
        /**
        * Web Audio API ONLY - The master gain node through which all sounds play.
        * @property masterGain
        * @type any
        * @public
        */
        public masterGain: any;
        /**
        * The volume of the audio before it was muted. This is used so that when the audio is unmuted the volume will resume at this point.
        * @property _muteVolume
        * @type number
        * @private
        */
        private _muteVolume;
        /**
        * Indicates if the sounds is currently 'locked' or not.
        * If it is 'locked' then no audio can play until a user touch's the device.
        * @property _locked
        * @type boolean
        * @private
        */
        private _locked;
        private _unlockedSource;
        /**
        * Returns a boolean indicating whether the device has been touched or not. READ ONLY.
        * @property locked
        * @type boolean
        * @public
        */
        public locked : boolean;
        /**
        * The boot method is executed when all of the DOM elements needed for the game are loaded and the game is ready to 'start' up.
        *
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Is executed when a mouse event is fired on the device. This is used to enabled playback of sounds on the current device if they were awaiting for a user event.
        * @method _unlocked
        * @private
        */
        private _unlocked();
        /**
        * Used to mute the audio on the device, or to check to see if the device is muted.
        *
        * @property mute
        * @type boolean
        * @default false
        * @public
        */
        public mute : boolean;
        /**
        * Global setting and getting of the volume. A number between 0 (silence) and 1 (full volume)
        *
        * @property volume
        * @type number
        * @default 1
        * @public
        */
        public volume : number;
        /**
        * Indicates whether or not an Audio Object is registered with this Audio Manager or not. More for Kiwi Internal use only.
        * @method isRegistered
        * @param sound {Audio} The Audio object you are checking for.
        * @return {Boolean} If the piece of audio is registered or not.
        * @public
        */
        public isRegistered(sound: Sound.Audio): boolean;
        /**
        * Registers an Audio Object with this audio manager. Also assign's the audio piece a unique ID to identify it by. Internal Kiwi use only.
        * @method registerSound
        * @param sound {Audio} The audio piece you are wanting to register.
        * @return {Boolean } Indication of if the sound was successfully added or not.
        * @public
        */
        public registerSound(sound: Sound.Audio): boolean;
        /**
        * Used to create a new sound on the audio manager. Returns the newly created sound.
        *
        * @method add
        * @param key {string} The key for the audio file that is to be loaded from the AudioLibrary.
        * @param [volume=1] {number} The volume for the piece of audio.
        * @param [loop=false] {boolean} If the audio should keep repeat when it gets to the end.
        * @return {Audio}
        * @public
        */
        public add(key: string, volume?: number, loop?: boolean): Sound.Audio;
        /**
        * Removes the passed sound from the audio manager. Needs testing.
        *
        * @method remove
        * @param sound {Audio} The audio file that you want to remove.
        * @public
        */
        public remove(sound: Sound.Audio, destroy?: boolean): void;
        /**
        * Plays all of the sounds listed in the audio manager.
        *
        * @method playAll
        * @public
        */
        public playAll(): void;
        /**
        * Stops all of the sounds that are listed in the audio manager from playing.
        *
        * @method playAll
        * @public
        */
        public stopAll(): void;
        /**
        * Pauses all of the sounds listed in the audio manager.
        *
        * @method pauseAll
        * @public
        */
        public pauseAll(): void;
        /**
        * Resumes all of the sounds listed in the audio manager.
        *
        * @method resumeAll
        * @param [destroy=true] {boolean} If the audio objects should be destroyed when they are removed.
        * @public
        */
        public resumeAll(destroy?: boolean): void;
        /**
        * The update loop that is executed every frame.
        * @method update
        * @public
        */
        public update(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Sound
*
*/ 
declare module Kiwi.Sound {
    /**
    * A Object that contains the functionality needed when wanting to play a single sound/sound file on a game.
    *
    * @class Audio
    * @constructor
    * @namespace Kiwi.Sound
    * @param game {Game} The game that this piece of audio belongs to.
    * @param key {string} The key to which which piece of audio should be loaded from the AudioLibrary.
    * @param volume {number} A number between 0 (silence) and 1 (loud).
    * @param loop {boolean} If the audio should loop when it is finished or just stop.
    * @return {Audio} This object
    *
    */
    class Audio {
        constructor(game: Kiwi.Game, key: string, volume: number, loop: boolean);
        /**
        * A unique ID that this audio gets assigned by the audio manager it belongs to when it is created.
        * @property id
        * @type number
        */
        public id: string;
        /**
        * A flag that indicates whether the sound is ready to be played or not. If not then this indicates that we are awaiting a user event.
        * @property _playable
        * @type boolean
        * @private
        */
        private _playable;
        /**
        *
        * @property playable
        * @type boolean
        * @private
        */
        public playable : boolean;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this sound belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * Web Audio API ONLY - A reference to the audio context that the game's audio manager has.
        * @property context
        * @type Any
        * @public
        */
        public context: any;
        /**
        * Web Audio API ONLY - A reference to the master gain node on the audio manager.
        * @property masterGainNode
        * @type Any
        * @public
        */
        public masterGainNode: any;
        /**
        * Web Audio API ONLY - This sounds local gainNode that it uses.
        * @property gainNode
        * @type Any
        * @public
        */
        public gainNode: any;
        /**
        * A boolean indicating whether or not that audio tags are being used to generate sounds.
        * @property _usingAudioTag
        * @type boolean
        * @private
        */
        private _usingAudioTag;
        /**
        * A boolean indicating whether or not the webAuduio api is being used.
        * @property _usingWebAudio
        * @type boolean
        * @private
        */
        private _usingWebAudio;
        /**
        * A private indicator of whether this audio is currently muted or not.
        * @property _muted
        * @type boolean
        * @default false
        * @private
        */
        private _muted;
        /**
        * A number between 0 and 1 representing the current volume of this audio piece.
        * @property _volume
        * @type number
        * @default 1
        * @private
        */
        private _volume;
        /**
        * A boolean indicating whether this piece of audio should loop or not.
        * @property _loop
        * @type boolean
        * @private
        */
        private _loop;
        /**
        * The key that was used to get the audio from the AudioLibrary.
        * @property key
        * @type string
        * @public
        */
        public key: string;
        /**
        * The property containing the file information about the audio.
        * @property _file
        * @type File
        * @private
        */
        private _file;
        /**
        * This is the piece of audio that either method will use to play audio. E.g.
        * In the case of the Web Audio API this is the sound buffer source, in which the audio plays from.
        * In the case of Audio Tags this is the Audio Tag itself.
        * @property _sound
        * @type Any
        * @private
        */
        private _sound;
        /**
        * A boolean that controls/knows if the audio is ready to be played or not.
        * This is just an indicator of if the file has been retrieved successfully from the file store or not.
        * @property ready
        * @type boolean
        * @public
        */
        public ready: boolean;
        /**
        * The total duration of the audio in seconds.
        * @property totalDuration
        * @type number
        * @public
        */
        public totalDuration: number;
        /**
        * The current duration of the section of audio that is being played. In milliseconds.
        * @property duration
        * @type number
        * @public
        */
        public duration: number;
        /**
        * Web Audio API ONLY - The audio buffer that is to be used when playing audio segments.
        * @property _buffer
        * @type any
        * @private
        */
        private _buffer;
        /**
        * Web Audio API ONLY - A boolean to indicate if the audio has been decoded or not yet. If not you will need to run the decode() method.
        * @property _decoded
        * @type boolean
        * @default false
        * @private
        */
        private _decoded;
        /**
        * A private property that holds the volume before the sound was muted. Used so that when unmuted the sound will resume at its old spot.
        * @property _muteVolume
        * @type number
        * @private
        */
        private _muteVolume;
        /**
        * Indicates whether or not the sound is currently playing.
        * @property isPlaying
        * @type boolean
        * @default false
        * @public
        */
        public isPlaying: boolean;
        /**
        * A indicator of if the sound is currently paused.
        * @property paused
        * @type boolean
        * @default false
        * @public
        */
        public paused: boolean;
        /**
        * If the sound needs to be played but is waiting on something.
        * @property _pending
        * @type boolean
        * @private
        */
        private _pending;
        /**
        * When the audio started playing. In milliseconds
        * @property _startTime
        * @type number
        * @private
        */
        private _startTime;
        /**
        * When the audio is playing, this is the current time we are at with it playing. In milliseconds
        * @property _currentTime
        * @type number
        * @private.
        */
        private _currentTime;
        /**
        * The time at which the audio should stop playing. In milliseconds. This is assuming that the audio is not on loop.
        * @property _stopTime
        * @type number
        * @private
        */
        private _stopTime;
        /**
        * An array of all of the markers that are on this piece of audio.
        * @property _markers
        * @type Array
        * @private
        */
        private _markers;
        /**
        * The current marker that is being used.
        * @property _currentMarker
        * @type String
        * @default 'default'
        * @private
        */
        private _currentMarker;
        /**
        * A Kiwi Signal that dispatches a event when the audio starts playing.
        * @property onPlay
        * @type Signal
        * @public
        */
        public onPlay: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio stops playing.
        * @property onStop
        * @type Signal
        * @public
        */
        public onStop: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio gets paused.
        * @property onPause
        * @type Signal
        * @public
        */
        public onPause: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio resumes.
        * @property onResume
        * @type Signal
        * @public
        */
        public onResume: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio finishes and starts again, due to it looping.
        * @property onLoop
        * @type Signal
        * @public
        */
        public onLoop: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio gets muted.
        * @property onMute
        * @type Signal
        * @public
        */
        public onMute: Kiwi.Signal;
        /**
        * Retrieves the audio data from the file store.
        * @method _setAudio
        * @private
        */
        private _setAudio();
        /**
        * Decodes the audio data to make it playable. By default the audio should already have been decoded when it was loaded.
        *
        * @method _decode
        * @private
        */
        private _decode();
        /**
        * Used to control the current volume for this sound.
        *
        * @property volume
        * @type number
        * @public
        */
        public volume : number;
        /**
        * Allows you to mute the sound.
        *
        * @property mute
        * @type boolean
        * @public
        */
        public mute : boolean;
        /**
        * Adds a new marker to the audio which will then allow for that section of audio to be played.
        *
        * @method addMarker
        * @param name {string} The name of the marker that you are adding.
        * @param start {number} The starting point of the audio. In seconds.
        * @param stop {number} The stopping point of the audio. In seconds.
        * @param [loop=false] {boolean} If the marker's pieve of audio should loop or not.
        * @public
        */
        public addMarker(name: string, start: number, stop: number, loop?: boolean): void;
        /**
        * Removes a currently existing marker from this audio.
        *
        * @method removeMarker
        * @param name {String} name of the audio that you want to remove.
        * @public
        */
        public removeMarker(name: string): void;
        /**
        * Plays the current sound/audio from the start.
        *
        * @method play
        * @param [marker] {string} The marker that is to be played. If no marker is specified then it will play the current marker (which would be the whole audio piece if no marker was ever added).
        * @param [forceRestart=false] {boolean} Force the audio to stop and start again. Otherwise if the audio was already playing it would ignore the play.
        * @public
        */
        public play(marker?: string, forceRestart?: boolean): void;
        /**
        * Stop the sound from playing.
        *
        * @method stop
        * @public
        */
        public stop(): void;
        /**
        * Pauses the sound so that you can resume it from at point to paused it at.
        *
        * @method pause
        * @public
        */
        public pause(): void;
        /**
        * Plays the sound from when you paused the sound.
        *
        * @method resume
        * @public
        */
        public resume(): void;
        /**
        * The update loop that gets executed every frame.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * This method handles the destruction of all of the properties when this audio is not longer needed.
        * You call this method when you want this method to be removed on the next garbage collection cycle.
        *
        * @method destroy
        * @public
        */
        public destroy(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Sound
*
*/ 
declare module Kiwi.Sound {
    /**
    * Holds a reference to all of the Audio Files (mp3, ogg, e.t.c) that are accessible on the State that this AudioLibrary is on.
    *
    * @class AudioLibrary
    * @constructor
    * @namespace Kiwi.Sound
    * @param game {Game} The game that this audio library is a member of.
    * @return {AudioLibrary}
    */
    class AudioLibrary {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that the AudioLibrary belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * Contains all of the audio files that are available.
        * @property audio
        * @type Object
        * @public
        */
        public audio: any;
        /**
        * Resets the audio library.
        * @method clear
        * @public
        */
        public clear(): void;
        /**
        * Rebuild the library from a fileStore. Clears the library and repopulates it.
        * @method rebuild
        * @param {Kiwi.Files.FileStore} fileStore
        * @param {Kiwi.State} state
        * @public
        */
        public rebuild(fileStore: Kiwi.Files.FileStore, state: Kiwi.State): void;
        /**
        * Adds a new audio file to the audio library.
        * @method add
        * @param {File} audioFile
        * @public
        */
        public add(audioFile: Kiwi.Files.File): void;
    }
}
/**
*
* @module Kiwi
* @submodule Time
*
*/
declare module Kiwi.Time {
    /**
    * The Clock class offers a way of tracking time within a game. When creating a new Clock you should NOT directly instantiate this class but instead use the addClock method on a ClockManager.
    * - The MasterClock is a property of the Kiwi.Time.Manager class and tracks real world time in milliseconds elapsed since the application started. This happens automatically and there is no need to do anything to set this up.
    * - An instance of a clock is used to track time in arbitrary units (milliseconds by default)
    * - A clock can be started, paused, unpaused and stopped. Once stopped, re-starting the clock again will reset it.
    * - Any number of timers can be attached to a clock. See the Kiwi.Time.Timer class for timer details.
    * - If the clock is paused, any timers attached to the clock will take this into account and not continue to fire events until the clock is unpaused.
    * (Note that this is not the same as pausing timers, which can be done manually and needs to be undone manually.)
    *
    * @class Clock
    * @namespace Kiwi.Time
    * @constructor
    * @param manager {ClockManager} The ClockManager that this clock belongs to. .
    * @param master {MasterClock} The MasterClock that it is getting the time in relation to.
    * @param name {String} The name of the clock.
    * @param [units=1000] {Number} The units that this clock is to operate in.
    * @return {Clock} This Clock object.
    *
    */
    class Clock {
        constructor(manager: Time.ClockManager, master: Time.MasterClock, name: string, units?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * A collection of Timer objects using this clock.
        * @property timers
        * @type Timer[]
        * @private
        */
        private timers;
        /**
        * The time the clock was first started relative to the master clock.
        * @property _timeFirstStarted
        * @type Number
        * @default null
        * @private
        */
        private _timeFirstStarted;
        /**
        * The number of clock units elapsed since the clock was first started.
        * @method elapsedSinceFirstStarted.
        * @return {Number} number of clock units.
        * @public
        */
        public elapsedSinceFirstStarted(): number;
        /**
        * The time the clock was most recently started relative to the master clock.
        * @property _timeLastStarted
        * @type Number
        * @default null
        * @private
        */
        private _timeLastStarted;
        /**
        * Get the most recent time the clock was started relative to the master clock.
        * @method started
        * @return {Number} milliseconds.
        * @public
        */
        public started(): number;
        /**
        * The number of clock units elapsed since the clock was most recently started (not including time spent paused)
        * @method elapsed
        * @return {Number} number of clock units.
        * @public
        */
        public elapsed(): number;
        /**
        * The time the clock was most recently stopped relative to the master clock.
        * @property _timeLastStopped
        * @type Number
        * @default null
        * @private
        */
        private _timeLastStopped;
        /**
        * The number of clock units elapsed since the clock was most recently stopped.
        * @method elapsedSinceLastStopped.
        * @return {Number} number of clock units.
        * @public
        */
        public elapsedSinceLastStopped(): number;
        /**
        * The time the clock was most receently paused relative to the master clock.
        * @property _timeLastPaused
        * @private
        * @type Number
        * @default null
        * @private
        */
        private _timeLastPaused;
        /**
        * The number of clock units elapsed since the clock was most recently paused.
        * @method elapsedSinceLastPaused.
        * @return {Number} number of clock units.
        * @public
        */
        public elapsedSinceLastPaused(): number;
        /**
        * The time the clock was most recently unpaused relative to the master clock.
        * @property _timeLastUnpaused
        * @private
        * @type Number
        * @default null
        * @private
        */
        private _timeLastUnpaused;
        /**
        * The number of clock units elapsed since the clock was most recently unpaused.
        * @method elapsedSinceLastUnpaused.
        * @return {Number} number of clock units.
        * @public
        */
        public elapsedSinceLastUnpaused(): number;
        /**
        * The total number of milliseconds the clock has been paused since it was last started.
        * @property _totalPaused
        * @private
        * @type Number
        * @default 0
        * @private
        */
        private _totalPaused;
        /**
        * Whether the clock is in a running state.
        * @property _isRunning
        * @type boolean
        * @default false
        * @private
        */
        private _isRunning;
        /**
        * Check if the clock is currently running.
        * @method isRunning
        * @return {boolean} true if running.
        * @public
        */
        public isRunning(): boolean;
        /**
        * Whether the clock is in a stopped state.
        * @property _isStopped
        * @type boolean
        * @default true
        * @private
        */
        private _isStopped;
        /**
        * Check if the clock is in the stopped state.
        * @method isStopped
        * @return {boolean} true if stopped.
        * @public
        */
        public isStopped(): boolean;
        /**
        * Whether the clock is in a paused state.
        * @property _isPaused
        * @type boolean
        * @default false
        * @private
        */
        private _isPaused;
        /**
        * Check if the clock is in the paused state.
        * @method isPaused
        * @return {boolean} true if paused.
        * @public
        */
        public isPaused(): boolean;
        /**
        * An internal reference to the state of the elapsed timer
        * @property _elapsedState
        * @type Number
        * @default 0
        * @private
        */
        private _elapsedState;
        /**
        * The time manager that this clock belongs to.
        * @property manager
        * @type ClockManager
        * @public
        */
        public manager: Time.ClockManager;
        /**
        * The master clock.
        * @property master
        * @type MasterClock
        * @public
        */
        public master: Time.MasterClock;
        /**
        * Name of the clock
        * @property name
        * @type string
        * @public
        */
        public name: string;
        /**
        * The number of milliseconds counted as one unit of time by the clock.
        * @property units
        * @type Number
        * @default 0
        * @public
        */
        public units: number;
        /**
        * Add an existing Timer to the Clock.
        * @method addTimer
        * @param timer {Timer} The Timer object instance to be added to ths Clock.
        * @return {Clock} This Clock object.
        * @public
        */
        public addTimer(timer: Time.Timer): Clock;
        /**
        * Creates a new Timer and adds it to this Clock.
        * @method createTimer
        * @param name {string} The name of the Timer (must be unique on this Clock).
        * @param [delay=1] {Number} The number of clock units to wait between firing events (default 1)
        * @param [repeatCount=0] {Number} The number of times to repeat this Timer (default 0)
        * @param [start=true] {Boolean} If the timer should start.
        * @return {Timer} The newly created Timer.
        * @public
        */
        public createTimer(name: string, delay?: number, repeatCount?: number, start?: boolean): Time.Timer;
        /**
        * Remove a Timer from this Clock based on either the Timer object or its name.
        * @method removeTimer
        * @param [timer=null] {Timer} The Timer object you wish to remove. If you wish to delete by Timer Name set this to null.
        * @param [timerName=''] {string} The name of the Timer object to remove.
        * @return {boolean} True if the Timer was successfully removed, false if not.
        * @public
        */
        public removeTimer(timer?: Time.Timer, timerName?: string): boolean;
        /**
        * Check if the Timer already exists on this Clock
        * @method checkExists
        * @param name {string} The name of the Timer.
        * @return {boolean} true if the Timer exists, false if not.
        * @public
        */
        public checkExists(name: string): boolean;
        /**
        * Stop all timers attached to the clock.
        * @method stopAllTimers
        * @return {Clock} This Clock object.
        * @public
        */
        public stopAllTimers(): Clock;
        /**
        * Convert a number to milliseconds based on clock units.
        * @method toMilliseconds.
        * @return {Number} milliseconds.
        * @public
        */
        public convertToMilliseconds(time: number): number;
        /**
        * Updates all Timers linked to this Clock.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Start the clock. This resets the clock and starts it running.
        * @method start
        * @return {Clock} This Clock object.
        * @public
        */
        public start(): Clock;
        /**
        * Pause the clock. The clock can only be paused if it is already running.
        * @method pause
        * @return {Clock} This Clock object.
        * @public
        */
        public pause(): Clock;
        /**
        * Resume the clock. The clock can only be resumed if it is already paused.
        * @method resume
        * @return {Clock} This Clock object.
        * @public
        */
        public resume(): Clock;
        /**
        * Stop the clock. Clock can only be stopped if it is already running or is paused.
        * @method stop
        * @return {Clock} This Clock object.
        * @public
        */
        public stop(): Clock;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        * @public
        */
        public toString(): string;
    }
}
/**
* Contains ways of tracking time within a game or application. Each game will have a ClockManager, MasterClock and a single Clock automatically generated for them upon game creation.
*
* @module Kiwi
* @submodule Time
* @main Time
*/
declare module Kiwi.Time {
    /**
    * Handles the generation and tracking of Clocks and Time related applications for a single game.
    *
    * @class ClockManager
    * @namespace Kiwi.Time
    * @constructor
    * @param {Game} game.
    * @return {ClockManager} This Object.
    *
    */
    class ClockManager {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The game that this belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game;
        /**
        * An array containing all of the clocks that exist on this manager.
        * @property _clocks
        * @type Clock[]
        * @private
        */
        private _clocks;
        /**
        * The MasterClock for this manager.
        * @property master
        * @type MasterClock
        * @private
        */
        private master;
        /**
        * The default Game Clock - you can use this via this.game.time.clock. Uses a 1000 millisecond time unit.
        * @property clock
        * @type Clock
        * @public
        */
        public clock: Time.Clock;
        /**
        * When all of the DOM elements that the game requires have loaded successfully then this object will 'boot'.
        * @method boot
        * @public
        */
        public boot(): void;
        /**
        * Creates a Clock class for keeping time relative to the MasterClock.
        * @method addClock
        * @param name {string} The name of the Clock.
        * @param [units=1000] {Number} The number of milliseconds that make up one unit of time on this clock. Default 1000.
        * @return {Clock} A reference to the newly created Clock object.
        * @public
        */
        public addClock(name: string, units?: number): Time.Clock;
        /**
        * Returns the Clock with the matching name. Throws and error if no Clock with that name exists
        * @method getClock
        * @param name {string} The name of the Clock to be returned.
        * @return {Clock} The clock which matches the name given.
        * @public
        */
        public getClock(name: string): Time.Clock;
        /**
        * Is executed every frame and updates all of the clocks that exist on this manager, times.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Returns the current time. Based on the master clock.
        * @method now
        * @return {Number}
        * @public
        */
        public now(): number;
        /**
        * Returns the delta of the master clock.
        * @method delta
        * @return {Number}
        * @public
        */
        public delta(): number;
    }
}
/**
*
* @module Kiwi
* @submodule Time
*
*/
declare module Kiwi.Time {
    /**
    * The MasterClock tracks time elapsed since the application started.
    * Each ClockManager has only one MasterClock which is automatically generated when the game initially booted.
    * You should not access it directly, use the Clock and Timer classes instead.
    *
    * @class MasterClock
    * @namespace Kiwi.Time
    * @constructor
    * @return {MasterClock} This Object.
    *
    */
    class MasterClock {
        constructor();
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The time when the MasterClock was started.
        * @property _started
        * @type Number
        * @private
        */
        private _started;
        /**
        * The current time. This is updated every frame but AFTER the delta is calculated.
        * @property time
        * @type Number
        * @public
        */
        public time: number;
        /**
        * The current time, this is straight from the Date.now() method and is updated every frame BEFORE the delta.
        * @property now
        * @type Number
        * @public
        */
        public now: number;
        /**
        * The time it takes for the time to update. Using this you can calculate the fps.
        * @property delta
        * @type Number
        * @public
        */
        public delta: number;
        /**
        * The time that has elapsed since the game started. In milliseconds.
        * @method elapsed
        * @return {Number}
        * @public
        */
        public elapsed(): number;
        /**
        * The time that has elapsed since the game started but in seconds.
        * @method totalElapsedSeconds
        * @return {Number}
        * @public
        */
        public totalElapsedSeconds(): number;
        /**
        * The update loop that should be executed every frame. Used to update the time.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Used to calculate the elapsed time from a point that is specified. This is returned in Milliseconds.
        * @method elapsedSince
        * @param since {Number} The point in time in which you would like to see how many milliseconds have passed. In milliseconds.
        * @return {Number}
        * @public
        */
        public elapsedSince(since: number): number;
        /**
        * Used to calculate the elapsed time from a point that is specified BUT this is in seconds.
        * @method elapsedSecondsSince
        * @param since {Number} The point in time in which you would like to see how many seconds have passed. In milliseconds.
        * @return {Number }
        * @public
        */
        public elapsedSecondsSince(since: number): number;
        /**
        * Resets the MasterClocks time.
        * @method reset
        * @public
        */
        public reset(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Time
*
*/ 
declare module Kiwi.Time {
    /**
    * The Timer class hooks into a game Clock and allows you run code at a specified point in game time.
    * Use the start() method to start a timer. Add TimerEvents to set-up code to be run on the timer interval.
    * Timer objects can run once or repeat at specified intervals to execute code on a schedule.
    *
    * @class Timer
    * @namespace Kiwi.Time
    * @constructor
    * @param name {string} The name of the timer.
    * @param clock {Clock} The game clock instance this Timer is based on.
    * @param delay {Number} The number of clock units to wait between firing events.
    * @param [repeatCount=0] {Number} The number of times to repeat the timer before it is expired. If you don't want it to ever expire, set a value of -1.
    * @return {Timer} This object.
    *
    */
    class Timer {
        constructor(name: string, clock: Time.Clock, delay: number, repeatCount?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The number of times the timer has repeated so far.
        * @property _currentCount
        * @type Number
        * @default 0
        * @private
        */
        private _currentCount;
        /**
        * Get the number of times the timer has repeated.
        * @method getCurrentCount
        * @return {Number}
        * @public
        */
        public currentCount(): number;
        /**
        * A collection of the TimerEvents associated with TimerEvent.TIMER_START
        * @property _startEvents
        * @type TimerEvent[]
        * @private
        */
        private _startEvents;
        /**
        * A collection of the TimerEvents associated with TimerEvent.TIMER_COUNT
        * @property _countEvents
        * @private
        * @type TimerEvent[]
        */
        private _countEvents;
        /**
        * A collection of the TimerEvents associated with TimerEvent.TIMER_STOP
        * @property _stopEvents
        * @private
        * @type TimerEvent[]
        */
        private _stopEvents;
        /**
        * The clock which this timer bases its timing on.
        * @property _clock
        * @type Clock
        * @private
        */
        private _clock;
        /**
        * The time the last repeat occurred in clock units.
        * @property _timeLastCount
        * @type Number
        * @private
        */
        private _timeLastCount;
        /**
        * Whether the timer is in a running state.
        * @property _isRunning
        * @type boolean
        * @default false
        * @private
        */
        private _isRunning;
        /**
        * The Timers current state. True if the Timer is running, otherwise false.
        * @method running
        * @return {boolean}
        * @public
        */
        public isRunning(): boolean;
        /**
        * Whether the timer is in a stopped state.
        * @property _isStopped
        * @type boolean
        * @default true
        * @private
        */
        private _isStopped;
        /**
        * Whether the timer is in a stopped state.
        * @method stopped
        * @return {boolean}
        * @public
        */
        public isStopped(): boolean;
        /**
        * Whether the timer is in a paused state.
        * @property _isPaused
        * @type boolean
        * @default false
        * @private
        */
        private _isPaused;
        /**
        * Whether the timer is in a paused state.
        * @method paused
        * @return {boolean}
        * @public
        */
        public isPaused(): boolean;
        /**
        * The name of the timer.
        * @property name
        * @type String
        * @default null
        * @public
        */
        public name: string;
        /**
        * The delay, in game clock units, that the timer will wait before firing the event
        * @property delay
        * @type Number
        * @default 0
        * @public
        */
        public delay: number;
        /**
        * The number of times the timer will repeat before stopping.
        * @property repeatCount
        * @type Number
        * @default 0
        * @public
        */
        public repeatCount: number;
        /**
        * Checks the list of TimerEvents added and processes them based on their type.
        * @method processEvents
        * @param type {Number} The type of events to dispatch
        * @private
        */
        private processEvents(type);
        /**
        * Internal update loop called by the Clock that this Timer belongs to.
        * @method update
        * @public
        */
        public update(): void;
        /**
        * Start the Timer. This will reset the timer and start it. The timer can only be started if it is in a stopped state.
        * @method start
        * @return {Timer} this object.
        * @public
        */
        public start(): Timer;
        /**
        * Stop the Timer. Only possible when the timer is running or paused.
        * @method stop
        * @return {Timer} this object.
        * @public
        */
        public stop(): Timer;
        /**
        * Pause the Timer. Only possible when the timer is running.
        * @method pause
        * @return {Timer} this object.
        * @public
        */
        public pause(): Timer;
        /**
        * Resume the Timer. Only possible if the timer has been paused.
        * @method resume
        * @return {Timer} this object.
        * @public
        */
        public resume(): Timer;
        /**
        * Adds an existing TimerEvent object to this Timer.
        * @method addTimerEvent
        * @param {TimerEvent} A TimerEvent object
        * @return {TimerEvent} The TimerEvent object
        * @public
        */
        public addTimerEvent(event: Time.TimerEvent): Time.TimerEvent;
        /**
        * Creates a new TimerEvent and adds it to this Timer
        * @method createTimerEvent
        * @param type {Number} The type of TimerEvent to create (TIMER_START, TIMER_COUNT or TIMER_STOP).
        * @param callback {Function} The function to call when the TimerEvent fires.
        * @param context {Function} The context in which the given function will run (usually 'this')
        * @return {TimerEvent} The newly created TimerEvent.
        * @public
        */
        public createTimerEvent(type: number, callback: any, context: any): Time.TimerEvent;
        /**
        * Removes a TimerEvent object from this Timer
        * @method removeTimerEvent
        * @param {TimerEvent} The TimerEvent to remove
        * @return {boolean} True if the event was removed, otherwise false.
        * @public
        */
        public removeTimerEvent(event: Time.TimerEvent): boolean;
        /**
        * Removes all TimerEvent objects from this Timer
        * @method clear
        * @param type {Number} The type of TimerEvents to remove. Set to zero to remove them all.
        * @return {boolean} True if the event was removed, otherwise false.
        * @public
        */
        public clear(type?: number): void;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        * @public
        */
        public toString(): string;
    }
}
/**
*
* @module Kiwi
* @submodule Time
*
*/ 
declare module Kiwi.Time {
    /**
    * A TimerEvent hooks into a Timer and is an object that is generated when you are wanting to executed a callback at a specific point in time.
    *
    * @class TimerEvent
    * @namespace Kiwi.Time
    * @constructor
    * @param type {Number} The type of TimerEvent that this is.
    * @param callback {Any} The method that is to be executed when the event occurs.
    * @param context {Any} The context that the callback is to be called in.
    * @return {TimerEvent} This Object.
    */
    class TimerEvent {
        constructor(type: number, callback: any, context: any);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * Name for the event fired when a timer starts.
        * @property TIMER_START
        * @type number
        * @final
        * @static
        * @public
        * @default 1
        */
        static TIMER_START: number;
        /**
        * Name for the event fired when a timer repeats.
        * @property TIMER_COUNT
        * @public
        * @type string
        * @final
        * @static
        * @default 2
        */
        static TIMER_COUNT: number;
        /**
        * Name for the event fired when a timer stops.
        * @property TIMER_STOP
        * @type string
        * @final
        * @static
        * @public
        * @default 3
        */
        static TIMER_STOP: number;
        /**
        * The callback to be called when this TimerEvent triggers
        * @property _callback
        * @type Function
        * @private
        */
        private _callback;
        /**
        * The context in which the callback will be fired
        * @property _callbackContext
        * @type Function
        * @private
        */
        private _callbackContext;
        /**
        * The type of TimerEvent
        * @property type
        * @type Function
        * @public
        */
        public type: number;
        /**
        * Fires the callback associated with this TimerEvent
        * @method run
        * @public
        */
        public run(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Utils
*/
declare module Kiwi.Utils {
    /**
    * Creates and the manages a Canvas DOMElement.
    *
    * @class Canvas
    * @namespace Kiwi.Utils
    * @constructor
    * @param width {Number} The width of the canvas.
    * @param height {Number} The height of the canvas.
    * @param [visible=true] {boolean} If the canvas is visible or not.
    * @param [offScreen=false] {boolean} If the canvas is designed to be offscreen or not.
    * @return {Canvas}
    *
    */
    class Canvas {
        constructor(width: number, height: number, visible?: boolean, offScreen?: boolean);
        /**
        * The width of this canvas.
        * @property _width
        * @type number
        * @private
        */
        private _width;
        /**
        * The width of this canvas.
        * @property width
        * @type number
        * @public
        */
        public width : number;
        /**
        * The height of this canvas.
        * @property _height
        * @type number
        * @private
        */
        private _height;
        /**
        * The height of this canvas.
        * @property height
        * @type number
        * @private
        */
        public height : number;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The canvas DOM element.
        * @property domElement
        * @type HTMLCanvasElement
        * @public
        */
        public domElement: HTMLCanvasElement;
        /**
        * The 2D rendering context that is used to render anything to this canvas.
        * @property _context
        * @type CanvasRenderingContext2D
        * @public
        */
        public context: CanvasRenderingContext2D;
        /**
        * If the canvas element is visible or not.
        * @property _visible
        * @type boolean
        * @private
        */
        private _visible;
        /**
        * If the canvas is offscreen or not.
        * @property _offScreen
        * @type boolean
        * @private
        */
        private _offScreen;
        /**
        * The method to use when clearing the canvas.
        * @property _clearMode
        * @type Number
        * @private
        */
        private _clearMode;
        /**
        * A STATIC property that holds the number associated with no clear mode.
        * @property CLEARMODE_NONE
        * @type Number
        * @static
        * @final
        * @default 0
        * @public
        */
        static CLEARMODE_NONE: number;
        /**
        * A STATIC property that holds the number associated with the clear mode that uses the clearRect method to clear the canvas.
        * @property CLEARMODE_CLEARRECT
        * @type Number
        * @static
        * @final
        * @public
        * @default 1
        */
        static CLEARMODE_CLEARRECT: number;
        /**
        * A STATIC property that holds the number associated with the clear mode that uses a filled rectangle to clear the canvas.
        * @property CLEARMODE_FILLRECT
        * @type Number
        * @static
        * @final
        * @public
        * @default 2
        */
        static CLEARMODE_FILLRECT: number;
        /**
        * A STATIC property that holds the number associated with the clear mode that uses the filled alpha rectangle method.
        * @property CLEARMODE_FILLRECT_ALPHA
        * @type Number
        * @static
        * @final
        * @public
        * @default 3
        */
        static CLEARMODE_FILLRECT_ALPHA: number;
        /**
        * The background color to use clearing the canvas using a filled rectangle approach.
        * @property bgColor
        * @type String
        * @default 'rgb(0,0,0)'
        * @public
        */
        public bgColor: string;
        /**
        * Updates the width/height on the canvas DOM element when either one of its sizes are updated.
        * @method _updatedSize
        * @private
        */
        private _updatedSize();
        /**
        * Used to remove the canvas element completely along with this class. [NEEDS IMPLEMENTATION]
        * @method destroy
        * @public
        */
        public destroy(): void;
        /**
        * If the canvas element is visible or not.
        * @property visible
        * @type boolean
        * @default true
        * @public
        */
        public visible : boolean;
        /**
        * The clearmode the is to be used when clearing the canvas.
        * @property clearMode
        * @type Number
        * @default 1
        * @public
        */
        public clearMode : number;
        /**
        * Clears the canvas using the method specified by the clearMode property.
        * @method clear
        * @public
        */
        public clear(): void;
        /**
        * Returns the canvas current image data as PNG.
        * @method saveAsPNG
        * @return String
        * @public
        */
        public saveAsPNG(): string;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        * @public
        */
        public toString(): string;
    }
}
/**
* Utils is a space that holds a wide varity of useful methods.
*
* @module Kiwi
* @submodule Utils
* @main Utils
*/
declare module Kiwi.Utils {
    /**
    * Methods to assist in working with Structs.
    * A lot of the functions in this class are Copyright 2012 Mauricio Santos and used with permission.
    * His work is licensed under the Apache License, Version 2.0 (the "License")
    *
    * @class Common
    * @namespace Kiwi.Utils
    * @static
    *
    * @author Mauricio Santos
    */
    class Common {
        /**
        * Default function to compare element order.
        * @method defaultCompare
        * @param {Any} a.
        * @param {Any} b.
        * @return {Number}
        * @static
        */
        static defaultCompare(a: any, b: any): number;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * Default function to test equality.
        * @method defaultEquals
        * @param {Any} a
        * @param {Any} b
        * @return {boolean}
        * @static
        * @public
        */
        static defaultEquals(a: any, b: any): boolean;
        /**
        * Default function to convert an object to a string.
        * @method defaultTostring
        * @param item {Any}
        * @return {Any}
        * @static
        * @public
        */
        static defaultTostring(item: any): any;
        /**
        * Checks if the given argument is a function.
        * @method isFunction
        * @param {Any} func.
        * @return {boolean}
        * @static
        * @public
        */
        static isFunction(func: any): boolean;
        /**
        * Checks if the given value is numeric.
        * @method isNumeric
        * @param value {Any}
        * @return {Boolean}
        * @static
        * @public
        */
        static isNumeric(value: any): boolean;
        /**
        * Checks if the given argument is undefined.
        * @method isUndefined
        * @param {Any} obj
        * @return {boolean}
        * @static
        * @public
        */
        static isUndefined(obj: any): boolean;
        /**
        * Checks if the given argument is a string.
        * @method isString
        * @param {Any} obj
        * @return {boolean}
        * @static
        * @public
        */
        static isString(obj: any): boolean;
        /**
        * Reverses a compare function.
        * @method reverseCompareFunction
        * @param {Any} compareFunction
        * @return {Number}
        * @static
        * @public
        */
        static reverseCompareFunction(compareFunction: any): (a: any, b: any) => number;
        /**
        * Returns an equal function given a compare function.
        * @method compareToEquals
        * @param {Any} compareFunction
        * @return {boolean}
        * @static
        * @public
        */
        static compareToEquals(compareFunction: any): (a: any, b: any) => boolean;
        /**
        * Shuffles the contents of an array given into a random order.
        * @method shuffleArray
        * @param array {Any}
        * @return {Any} What you passed but the with the contents in a new order.
        * @static
        * @public
        */
        static shuffleArray(array: any): any;
        /**
        * An array containing all of the base2sizes that are allowed.
        * This is used when creating a new TextureAtlas/or resizing a Image to be rendered in WebGL.
        * @property base2Sizes
        * @type number[]
        * @public
        * @static
        */
        static base2Sizes: number[];
        /**
        * A method that checks to see if an Image or Canvas that is passed has base2 proportions.
        * If it doesn't the image is created on a Canvas and that Canvas is returned.
        * Used mainly when creating TextureAtlases for WebGL.
        * @method convertToBase2
        * @param imageFile {HTMLImageElement/HTMLCanvasElement} The image or canvas element that is to be converted into a base2size.
        * @return {HTMLImageElement/HTMLCanvasElement} The image that was passed (if it was already at base2 dimensions) or a new canvas element if it wasn't.
        * @static
        * @public
        */
        static convertToBase2(image: any): any;
    }
}
/**
*
* @module Kiwi
* @submodule Utils
*/
declare module Kiwi.Utils {
    /**
    * Adds a set of extra Math functions and extends a few commonly used ones.
    * Includes some methods written by Dylan Engelman.
    *
    * @class GameMath
    * @namespace Kiwi.Utils
    * @static
    *
    * @author Richard Davey
    * @author Dylan Engelman
    */
    class GameMath {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * Holds the value for PI. Only up to 15 decimal places.
        * @property PI
        * @type number
        * @default 3.141592653589793
        * @static
        * @final
        * @public
        */
        static PI: number;
        /**
        * Holds the value for PI / 2 OR 90 degrees. Only up to 16 decimal places.
        * @property PI_2
        * @type number
        * @default 1.5707963267948965
        * @static
        * @final
        * @public
        */
        static PI_2: number;
        /**
        * Holds the value for PI / 4 OR 45 degrees. Only up to 16 decimal places.
        * @property PI_4
        * @type number
        * @default 0.7853981633974483
        * @static
        * @final
        * @public
        */
        static PI_4: number;
        /**
        * Holds the value for PI / 8 OR 22.5 degrees. Only up to 17 decimal places
        * @property PI_8
        * @type number
        * @default 0.39269908169872413
        * @static
        * @final
        * @public
        */
        static PI_8: number;
        /**
        * Holds the value for PI / 16 OR 11.25 degrees. Only up to 17 decimal places
        * @property PI_16
        * @type number
        * @default 0.19634954084936206
        * @static
        * @final
        * @public
        */
        static PI_16: number;
        /**
        * Holds the value for 2 * PI OR 180 degrees. Only up to 15 decimal places
        * @property TWO_PI
        * @type number
        * @default 6.283185307179586
        * @static
        * @final
        * @public
        */
        static TWO_PI: number;
        /**
        * Holds the value for 3 * PI_2 OR 270 degrees. Only up to 17 decimal places.
        * @property THREE_PI_2
        * @type number
        * @default 4.7123889803846895
        * @static
        * @final
        * @public
        */
        static THREE_PI_2: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property E
        * @type number
        * @default 2.71828182845905
        * @static
        * @final
        * @public
        */
        static E: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property LN10
        * @type number
        * @default 2.302585092994046
        * @static
        * @final
        * @public
        */
        static LN10: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property LN2
        * @type number
        * @default 0.6931471805599453
        * @static
        * @final
        * @public
        */
        static LN2: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property LOG10E
        * @type number
        * @default 0.4342944819032518
        * @static
        * @final
        * @public
        */
        static LOG10E: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property LOG2E
        * @type number
        * @default 1.442695040888963387
        * @static
        * @final
        * @public
        */
        static LOG2E: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property SQRT1_2
        * @type number
        * @default 0.7071067811865476
        * @static
        * @final
        * @public
        */
        static SQRT1_2: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property SQRT2
        * @type number
        * @default 1.4142135623730951
        * @static
        * @final
        * @public
        */
        static SQRT2: number;
        /**
        * Holds the value for PI / 180 which is used to convert degrees to radians.
        * @property DEG_TO_RAD
        * @type  number
        * @default 0.017453292519943294444444444444444
        * @static
        * @final
        * @public
        */
        static DEG_TO_RAD: number;
        /**
        * Holds the value for 180 / PI which is used to convert radians to degrees.
        * @property RAD_TO_DEG
        * @type number
        * @default 57.295779513082325225835265587527
        * @static
        * @final
        * @public
        */
        static RAD_TO_DEG: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property B_16
        * @type number
        * @default 65536
        * @static
        * @final
        * @public
        */
        static B_16: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property B_31
        * @type number
        * @default 2147483648
        * @static
        * @final
        * @public
        */
        static B_31: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property B_32
        * @type number
        * @default 4294967296
        * @static
        * @final
        * @public
        */
        static B_32: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property B_48
        * @type number
        * @default 281474976710656
        * @static
        * @final
        * @public
        */
        static B_48: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property B_53
        * @type number
        * @default 9007199254740992
        * @static
        * @final
        * @public
        */
        static B_53: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property B_64
        * @type number
        * @default 18446744073709551616
        * @static
        * @final
        * @public
        */
        static B_64: number;
        /**
        * Holds the value for the fraction 1 / 3 as a number.
        * @property ONE_THIRD
        * @type number
        * @default 0.333333333333333333333333333333333
        * @static
        * @final
        * @public
        */
        static ONE_THIRD: number;
        /**
        * Holds the value for the fraction 2 / 3 as a number.
        * @property TWO_THIRDS
        * @type number
        * @default 0.666666666666666666666666666666666
        * @static
        * @final
        * @public
        */
        static TWO_THIRDS: number;
        /**
        * Holds the value for the fraction 1 / 6 as a number
        * @property ONE_SIXTH
        * @type number
        * @default 0.166666666666666666666666666666666
        * @static
        * @final
        * @public
        */
        static ONE_SIXTH: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property COS_PI_3
        * @type number
        * @default 0.86602540378443864676372317075294
        * @static
        * @final
        * @public
        */
        static COS_PI_3: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property SIN_2PI_3
        * @type number
        * @default 0.03654595
        * @static
        * @final
        * @public
        */
        static SIN_2PI_3: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property CIRCLE_ALPHA
        * @type number
        * @default 0.5522847498307933984022516322796
        * @static
        * @final
        * @public
        */
        static CIRCLE_ALPHA: number;
        /**
        * A boolean that is true.
        * @property ON
        * @type boolean
        * @default true
        * @static
        * @final
        * @public
        */
        static ON: boolean;
        /**
        * A boolean that is false.
        * @property OFF
        * @type boolean
        * @default false
        * @static
        * @final
        * @public
        */
        static OFF: boolean;
        /**
        * [DESCRIPTION REQUIRED]
        * @property SHORT_EPSILON
        * @type number
        * @default 0.1
        * @static
        * @final
        * @public
        */
        static SHORT_EPSILON: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property PERC_EPSILON
        * @type number
        * @default 0.001
        * @static
        * @final
        * @public
        */
        static PERC_EPSILON: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property EPSILON
        * @type number
        * @default 0.0001
        * @static
        * @final
        * @public
        */
        static EPSILON: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @property LONG_EPSILON
        * @type number
        * @default 0.00000001
        * @static
        * @final
        * @public
        */
        static LONG_EPSILON: number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method computeMachineEpsilon
        * @return {Number}
        * @static
        * @public
        */
        static computeMachineEpsilon(): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyEqual
        * @param a {number}
        * @param b {number}
        * @param [epsilon=0.0001] {number}
        * @return {boolean}
        * @static
        * @public
        */
        static fuzzyEqual(a: number, b: number, epsilon?: number): boolean;
        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyLessThan
        * @param a {number}
        * @param b {number}
        * @param [epsilon=0.0001] {number}
        * @return {boolean}
        * @static
        * @public
        */
        static fuzzyLessThan(a: number, b: number, epsilon?: number): boolean;
        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyGreaterThan
        * @param a {number}
        * @param b {number}
        * @param [epsilon=0.0001] {number}
        * @return {boolean}
        * @static
        * @public
        */
        static fuzzyGreaterThan(a: number, b: number, epsilon?: number): boolean;
        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyCeil
        * @param val {number}
        * @param [epsilon=0.0001] {number}
        * @return {Number}
        * @static
        * @public
        */
        static fuzzyCeil(val: number, epsilon?: number): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyFloor
        * @param val {number}
        * @param [epsilion=0.0001] {number}
        * @return {Number}
        * @static
        * @public
        */
        static fuzzyFloor(val: number, epsilon?: number): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method average
        * @param [args]* {Any[]}
        * @return {Number}
        * @static
        * @public
        */
        static average(...args: any[]): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method slam
        * @param value {number}
        * @param target {number}
        * @param [epsilon=0.0001] {number}
        * @return {Number}
        * @static
        * @public
        */
        static slam(value: number, target: number, epsilon?: number): number;
        /**
        * Ratio of value to a range.
        * @method percentageMinMax
        * @param val {number}
        * @param max {number}
        * @param [min=0] {number}
        * @return {number}
        * @static
        * @public
        */
        static percentageMinMax(val: number, max: number, min?: number): number;
        /**
        * A value representing the sign of the value.
        * -1 for negative, +1 for positive, 0 if value is 0
        * @method sign
        * @param n {number}
        * @return {number}
        * @static
        * @public
        */
        static sign(n: number): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method truncate
        * @param n {number}
        * @return {number}
        * @static
        * @public
        */
        static truncate(n: number): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method shear
        * @param n {number}
        * @return {number}
        * @static
        * @public
        */
        static shear(n: number): number;
        /**
        * Wrap a value around a range, similar to modulus with a floating minimum
        * @method wrap
        * @param val {number}
        * @param max {number}
        * @param [min=0] {number}
        * @return {number}
        * @static
        * @public
        */
        static wrap(val: number, max: number, min?: number): number;
        /**
        * Arithmetic version of wrap.
        * @method arithWrap
        * @param val {number}
        * @param max {number}
        * @param [min=0] {number}
        * @return {number}
        * @static
        * @public
        */
        static arithWrap(value: number, max: number, min?: number): number;
        /**
        * Force a value within the boundaries of two values
        * If max < min, min is returned.
        * @method clamp
        * @param input {number}
        * @param max {number}
        * @param [min=0] {number}
        * @return {number}
        * @static
        * @public
        */
        static clamp(input: number, max: number, min?: number): number;
        /**
        * Snap a value to nearest grid slice, using rounding.
        * Example if you have an interval gap of 5 and a position of 12... you will snap to 10. Where as 14 will snap to 15
        *
        * @method snapTo
        * @param input {number} The value to snap
        * @param gap {number} The interval gap of the grid
        * @param [start=0] {number} Optional starting offset for gap
        * @return {number}
        * @static
        * @public
        */
        static snapTo(input: number, gap: number, start?: number): number;
        /**
        * Snap a value to nearest grid slice, using floor.
        * Example if you have an interval gap of 5 and a position of 12... you will snap to 10. As will 14 snap to 10... but 16 will snap to 15
        *
        * @method snapToFloor
        * @param input {number} The value to snap
        * @param gap {number} The interval gap of the grid
        * @param [start=0] {number} Optional starting offset for gap
        * @return {number}
        * @static
        * @public
        */
        static snapToFloor(input: number, gap: number, start?: number): number;
        /**
        * Snap a value to nearest grid slice, using ceil.
        * Example if you have an interval gap of 5 and a position of 12... you will snap to 15. As will 14 will snap to 15... but 16 will snap to 20
        *
        * @method snapToCeil
        * @param input {number} The value to snap
        * @param gap {number} The interval gap of the grid
        * @param [start=0] {number} optional starting offset for gap
        * @return {number}
        * @static
        * @public
        */
        static snapToCeil(input: number, gap: number, start?: number): number;
        /**
        * Snaps a value to the nearest value in an array.
        * @method snapToInArray
        * @param input {number}
        * @param arr {number[]}
        * @param [sort=true] {boolean}
        * @return {number}
        * @static
        * @public
        */
        static snapToInArray(input: number, arr: number[], sort?: boolean): number;
        /**
        * Round to some place comparative to a 'base', default is 10 for decimal place.
        * 'place' is represented by the power applied to 'base' to get that place
        *
        * @method roundTo
        * @param value {number} The value to round
        * @param [place=0] {number} The place to round to
        * @param [base=10] {number} The base to round in... default is 10 for decimal
        * @return {number}
        * @static
        * @public
        */
        static roundTo(value: number, place?: number, base?: number): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method floorTo
        * @param value {number}
        * @param [place=0] {number}
        * @param [base=10] {number}
        * @return {number}
        * @static
        * @public
        */
        static floorTo(value: number, place?: number, base?: number): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method ceilTo
        * @param value {number}
        * @param [place=0] {number}
        * @param [base=10] {number}
        * @return {number}
        * @static
        * @public
        */
        static ceilTo(value: number, place?: number, base?: number): number;
        /**
        * A one dimensional linear interpolation of a value.
        * @method interpolateFloat
        * @param a {number}
        * @param b {number}
        * @param weight {number}
        * @return {number}
        * @static
        * @public
        */
        static interpolateFloat(a: number, b: number, weight: number): number;
        /**
        * Convert radians to degrees
        * @method radiansToDegrees
        * @param angle {number}
        * @return {number}
        * @static
        * @public
        */
        static radiansToDegrees(angle: number): number;
        /**
        * Convert degrees to radians
        * @method degreesToRadians
        * @param angle {number}
        * @return {number}
        * @static
        * @public
        */
        static degreesToRadians(angle: number): number;
        /**
        * Find the angle of a segment from (x1, y1) -> (x2, y2 )
        * @method angleBetween
        * @param x1 {number}
        * @param y1 {number}
        * @param x2 {number}
        * @param y2 {number}
        * @return {number}
        * @static
        * @public
        */
        static angleBetween(x1: number, y1: number, x2: number, y2: number): number;
        /**
        * Set an angle with in the bounds of -PI to PI
        * @method normalizeAngle
        * @param angle {number}
        * @param [radians=true] {boolean}
        * @return {number}
        * @static
        * @public
        */
        static normalizeAngle(angle: number, radians?: boolean): number;
        /**
        * Closest angle between two angles from a1 to a2
        * absolute value the return for exact angle.
        * @method nearestAngleBetween
        * @param a1 {number}
        * @param a2 {number}
        * @param [radians=true] {boolean}
        * @return {number}
        * @static
        * @public
        */
        static nearestAngleBetween(a1: number, a2: number, radians?: boolean): number;
        /**
        * Normalizes independent and then sets dep to the nearest value respective to independent.
        * For instance if dep=-170 and ind=170 then 190 will be returned as an alternative to -170
        * @method normalizeAngleToAnother
        * @param dep {number}
        * @param ind {number}
        * @param [radians=true] {boolean}
        * @return {number}
        * @static
        * @public
        */
        static normalizeAngleToAnother(dep: number, ind: number, radians?: boolean): number;
        /**
        * Normalize independent and dependent and then set dependent to an angle relative to 'after/clockwise' independent.
        * For instance dep=-170 and ind=170, then 190 will be reutrned as alternative to -170
        * @method normalizeAngleAfterAnother
        * @param dep {number}
        * @param ind {number}
        * @param [radians=true] {boolean}
        * @return {number}
        * @static
        * @public
        */
        static normalizeAngleAfterAnother(dep: number, ind: number, radians?: boolean): number;
        /**
        * Normalizes indendent and dependent and then sets dependent to an angle relative to 'before/counterclockwise' independent.
        * For instance dep = 190 and ind = 170, then -170 will be returned as an alternative to 190
        * @method normalizeAngleBeforeAnother
        * @param dep {number}
        * @param ind {number}
        * @param [radians=true] {boolean}
        * @return {number}
        * @static
        * @public
        */
        static normalizeAngleBeforeAnother(dep: number, ind: number, radians?: boolean): number;
        /**
        * Interpolate across the shortest arc between two angles.
        * @method interpolateAngles
        * @param a1 {number}
        * @param a2 {number}
        * @param weight {number}
        * @param [radians=true] {boolean}
        * @param [ease=null] {any}
        * @return {number}
        * @static
        * @public
        */
        static interpolateAngles(a1: number, a2: number, weight: number, radians?: boolean, ease?: any): number;
        /**
        * Compute the logarithm of any value of any base.
        * A logarithm is the exponent that some constant (base) would have to be raised to
        * to be equal to value.
        * @method logBaseOf
        * @param value {number}
        * @param base {number}
        * @return {number}
        * @static
        * @public
        */
        static logBaseOf(value: number, base: number): number;
        /**
        * Greatest Common Denominator using Euclid's algorithm.
        * @method GCD
        * @param m {number}
        * @param n {number}
        * @return {number}
        * @static
        * @public
        */
        static GCD(m: number, n: number): number;
        /**
        * Lowest Common Multiple
        * @method LCM
        * @param m {number}
        * @param n {number}
        * @return {number}
        * @static
        * @public
        */
        static LCM(m: number, n: number): number;
        /**
        * Factorial - N! Simple product series. By definition:
        * 0! == 1
        * @method factorial
        * @param value {number}
        * @return {number}
        * @static
        * @public
        */
        static factorial(value: number): number;
        /**
        * Gamma function. Defined: gamma(N) == (N - 1)!
        * @method gammaFunction
        * @param value {number}
        * @return {number}
        * @static
        * @public
        */
        static gammaFunction(value: number): number;
        /**
        * Falling factorial. Defined: (N)! / (N - x)!
        * Written subscript: (N)x OR (base)exp
        * @method fallingFactorial
        * @param base {number}
        * @param exp {number}
        * @return {number}
        * @static
        * @public
        */
        static fallingFactorial(base: number, exp: number): number;
        /**
        * Rising factorial. Defined: (N + x - 1)! / (N - 1)!
        * Written superscript N^(x) OR base^(exp)
        * @method risingFactorial
        * @param base {number}
        * @param exp {number}
        * @return {number}
        * @static
        * @public
        */
        static risingFactorial(base: number, exp: number): number;
        /**
        * Binomial coefficient.
        * @method binCoef
        * @param n {number}
        * @param k {number}
        * @return {number}
        * @static
        * @public
        */
        static binCoef(n: number, k: number): number;
        /**
        * Rising binomial coefficient.
        * As one can notice in the analysis of binCoef(...) that
        * binCoef is the (N)k divided by k!. Similarly rising binCoef
        * is merely N^(k) / k!
        * @method risingBinCoef
        * @param n {number}
        * @param k {number}
        * @return {number}
        * @static
        * @public
        */
        static risingBinCoef(n: number, k: number): number;
        /**
        * Generate a random boolean result based on the chance value.
        * Returns true or false based on the chance value (default 50%). For example if you wanted a player to have a 30% chance
        * of getting a bonus, call chanceRoll(30) - true means the chance passed, false means it failed.
        *
        * @method changeRoll
        * @param [chance=50] {number} The chance of receiving the value. A number between 0 and 100 (effectively 0% to 100%)
        * @return {boolean} true if the roll passed, or false
        * @static
        * @public
        */
        static chanceRoll(chance?: number): boolean;
        /**
        * Adds the given amount to the value, but never lets the value go over the specified maximum.
        *
        * @method maxAdd
        * @param value {number} The value to add the amount to
        * @param amount {number} The amount to add to the value
        * @param max {number} The maximum the value is allowed to be
        * @return {number}
        * @static
        * @public
        */
        static maxAdd(value: number, amount: number, max: number): number;
        /**
        * Subtracts the given amount from the value, but never lets the value go below the specified minimum.
        *
        * @method minSub
        * @param value {number} The base value
        * @param amount {number} The amount to subtract from the base value
        * @param min {number} The minimum the value is allowed to be
        * @return {number}
        * @static
        * @public
        */
        static minSub(value: number, amount: number, min: number): number;
        /**
        * Adds value to amount and ensures that the result always stays between 0 and max, by wrapping the value around.
        * Values must be positive integers, and are passed through Math.abs
        *
        * @method wrapValue
        * @param value {number} The value to add the amount to
        * @param amount {number} The amount to add to the value
        * @param max {number} The maximum the value is allowed to be
        * @return {number} The wrapped value
        * @static
        * @public
        */
        static wrapValue(value: number, amount: number, max: number): number;
        /**
        * Randomly returns either a 1 or -1
        * @method randomSign
        * @return {number} Either 1 or -1.
        * @static
        * @public
        */
        static randomSign(): number;
        /**
        * Returns true if the number given is odd.
        * @method isOff
        * @param n {number} The number to check
        * @return {boolean} True if the given number is odd. False if the given number is even.
        * @static
        * @public
        */
        static isOdd(n: number): boolean;
        /**
        * Returns true if the number given is even.
        * @method isEvent
        * @param n {number} The number to check
        * @return {boolean} True if the given number is even. False if the given number is odd.
        * @static
        * @public
        */
        static isEven(n: number): boolean;
        /**
        * Keeps an angle value between -180 and +180.
        * Should be called whenever the angle is updated on the Sprite to stop it from going insane.
        * @method wrapAngle
        * @param angle {number} The angle value to check
        * @return {number} The new angle value, returns the same as the input angle if it was within bounds
        * @static
        * @public
        */
        static wrapAngle(angle: number): number;
        /**
        * Keeps an angle value between the given min and max values.
        * @method angleLimit
        * @param angle {number} The angle value to check. Must be between -180 and +180
        * @param min {number} The minimum angle that is allowed (must be -180 or greater)
        * @param max {number} The maximum angle that is allowed (must be 180 or less)
        * @return {number} The new angle value, returns the same as the input angle if it was within bounds
        * @static
        * @public
        */
        static angleLimit(angle: number, min: number, max: number): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method linear
        * @param {Any} v
        * @param {Any} k
        * @return {number}
        * @static
        * @public
        */
        static linearInterpolation(v: any, k: any): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method Bezier
        * @param {Any} v
        * @param {Any} k
        * @return {number}
        * @static
        * @public
        */
        static bezierInterpolation(v: any, k: any): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method CatmullRom
        * @param {Any} v
        * @param {Any} k
        * @return {number}
        * @static
        * @public
        */
        static catmullRomInterpolation(v: any, k: any): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method Linear
        * @param {Any} p0
        * @param {Any} p1
        * @param {Any} t
        * @return {number}
        * @static
        * @public
        */
        static linear(p0: any, p1: any, t: any): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method Bernstein
        * @param {Any} n
        * @param {Any} i
        * @return {number}
        * @static
        * @public
        */
        static bernstein(n: any, i: any): number;
        /**
        * [DESCRIPTION REQUIRED]
        * @method CatmullRom
        * @param {Any} p0
        * @param {Any} p1
        * @param {Any} p2
        * @param {Any} p3
        * @param {Any} t
        * @return {number}
        * @static
        * @public
        */
        static catmullRom(p0: any, p1: any, p2: any, p3: any, t: any): any;
        /**
        * [DESCRIPTION REQUIRED]
        * @method difference
        * @param a {number}
        * @param b {number}
        * @return {number}
        * @static
        * @public
        */ 
        static difference(a: number, b: number): number;
    }
}
/**
*
* @module Kiwi
* @submodule Utils
*/
declare module Kiwi.Utils {
    /**
    * Manages the creation of unique internal game IDs.
    * Based on Nonsense by Josh Faul https://github.com/jocafa/Nonsense
    * Random number generator from http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
    *
    * @class RandomDataGenerator
    * @constructor
    * @namespace Kiwi.Utils
    * @param [seeds=[]] {String[]}
    * @return {RandomDataGenerator}
    *
    * @author Josh Faul
    */
    class RandomDataGenerator {
        constructor(seeds?: string[]);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * [DESCRIPTION REQUIRED]
        * @property s0
        * @type Any
        * @private
        */
        private s0;
        /**
        * [DESCRIPTION REQUIRED]
        * @property s1
        * @type Any
        * @private
        */
        private s1;
        /**
        * [DESCRIPTION REQUIRED]
        * @property s2
        * @type Any
        * @private
        */
        private s2;
        /**
        * [DESCRIPTION REQUIRED]
        * @property c
        * @type Number
        * @default 1
        * @private
        */
        private c;
        /**
        * Used to contain various arrays of data that can be used when randomly generating blocks of text.
        * @property _data
        * @type Object
        * @private
        */
        private _data;
        /**
        * [DESCRIPTION REQUIRED]
        * @method uint32
        * @return {Any}
        * @private
        */
        private uint32();
        /**
        * [DESCRIPTION REQUIRED]
        * @method fract32
        * @return {Any}
        * @private
        */
        private fract32();
        /**
        * [DESCRIPTION REQUIRED]
        * @method rnd
        * @return {Any}
        * @private
        */
        private rnd();
        /**
        * [DESCRIPTION REQUIRED]
        * @method hash
        * @param data {Any}
        * @private
        */
        private hash(data);
        /**
        * Reset the seed of the random data generator
        * @method sow
        * @param [seeds=[]] {String[]}
        * @public
        */
        public sow(seeds?: string[]): void;
        /**
        * Returns a random integer between 0 and 2^32
        * @method integer
        * @return {Number}
        * @public
        */
        public integer(): number;
        /**
        * Returns a random real number between 0 and 1
        * @method frac
        * @return {Number}
        * @public
        */
        public frac(): number;
        /**
        * Returns a random real number between 0 and 2^32
        * @method real
        * @return {Number}
        * @public
        */
        public real(): number;
        /**
        * Returns a random integer between min and max
        * @method integerInRange
        * @param min {Number}
        * @param max {Number}
        * @return {Number}
        * @public
        */
        public integerInRange(min: number, max: number): number;
        /**
        * Returns a random real number between min and max
        * @method realInRange
        * @param min {Number}
        * @param max {Number}
        * @return {Number}
        * @public
        */
        public realInRange(min: number, max: number): number;
        /**
        * Returns a random real number between -1 and 1
        * @method normal
        * @return {Number}
        * @public
        */
        public normal(): number;
        /**
        * Returns a valid v4 UUID hex string (from https://gist.github.com/1308368)
        * @method uuid
        * @return {String}
        * @public
        */
        public uuid(): string;
        /**
        * Returns a random member of `array`
        * @method pick
        * @param {Any} array
        * @return {Any}
        * @public
        */
        public pick(array: any): any;
        /**
        * Returns a random member of `array`, favoring the earlier entries
        * @method weightedPick
        * @param {Any} array
        * @return {Any}
        * @public
        */
        public weightedPick(array: any): any;
        /**
        * Returns a random word of lipsum
        * @method word
        * @return {String}
        * @public
        */
        public word(): string;
        /**
        * Returns `n` random words of lipsum, 3 if not specified
        * @method words
        * @param {Number} [quantity=3] Amount of random words to get.
        * @return {String}
        * @public
        */
        public words(quantity?: number): string;
        /**
        * Returns a random lipsum sentence
        * @method sentence
        * @return {String}
        * @public
        */
        public sentence(): String;
        /**
        * Returns `n` random lipsum sentences, 3 if not specified
        * @method sentences
        * @param {Number} [quantity=3] The number of sentences to grab.
        * @return {String}
        * @public
        */
        public sentences(quantity?: number): string;
        /**
        * Returns a random timestamp between min and max, or between the beginning of 2000 and the end of 2020 if min and max aren't specified
        * @method timestamp
        * @param [min=946684800000] {Number} The lowest timestamp.
        * @param [max=1577862000000] {Number} The highest timestamp.
        * @return {Number}
        * @public
        */
        public timestamp(min?: number, max?: number): number;
        /**
        * Returns a random angle between -180 and 180
        * @method angle
        * @return {Number}
        * @public
        */
        public angle(): number;
    }
}
/**
*
* @module Kiwi
* @submodule Utils
*/
declare module Kiwi.Utils {
    /**
    * Abstracts away the use of RAF or setTimeout for the core game update loop. The callback can be re-mapped on the fly.
    *
    * @class RequestAnimationFrame
    * @constructor
    * @namespace Kiwi.Utils
    * @param callback {Any}
    * @return {RequestAnimationFrame} This object.
    *
    */
    class RequestAnimationFrame {
        constructor(callback: any);
        /**
        * The type of obect that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * The callback method that gets executed every time the RAF is executed.
        * @property _callback
        * @type Any
        * @private
        */
        private _callback;
        /**
        * Sets the callback method that is to be executed each time the RAF is.
        * @method setCallback
        * @param {Any} callback
        * @public
        */
        public setCallback(callback: any): void;
        /**
        * If the RAF is not supported, then this is the ID of the timeout that will be set.
        * @property _timeOutID
        * @type Any
        * @private
        */
        private _timeOutID;
        /**
        * A boolean indicating whether or not we are using setTimeout for the RequestAnimationFrame or not.
        * @property _isSetTimeOut
        * @type boolean
        * @default false
        * @private
        */
        private _isSetTimeOut;
        /**
        * Returns a boolean indicating whether or not setTimeout is being used instead of RAF.
        * @method usingSetTimeOut
        * @return {boolean}
        * @public
        */
        public isUsingSetTimeOut(): boolean;
        /**
        * Returns a boolean indicating wheather or not we are using the RAF. If false it means we are using setTimeout for our update loop.
        * @method usingRAF
        * @return {boolean}
        * @public
        */
        public isUsingRAF(): boolean;
        /**
        * The last time at which the RAF was called. This is given a value at the end of the RAF loop.
        * @property lastTime
        * @type Number
        * @public
        */
        public lastTime: number;
        /**
        * A timestamp that has the current time. This is updated each time the RAF loop is executed. Is updated before the last time in the loop.
        * @property currentTime
        * @type Number
        * @public
        */
        public currentTime: number;
        /**
        * A boolean indicating whether or not the RAF is running.
        * @property isRunning
        * @type boolean
        * @default false
        * @public
        */
        public isRunning: boolean;
        /**
        * Starts the RequestAnimationFrame (or setTimeout if RAF not supported).
        * @method start
        * @param [callback] {Any} A callback to be executed everyframe. Overrides the callback set at instantiation if passed.
        * @public
        */
        public start(callback?: any): void;
        /**
        * Stops the RAF from running.
        * @method stop
        * @public
        */
        public stop(): void;
        /**
        * The update loop that the RAF will continuously call.
        * @method RAFUpdate
        * @public
        */
        public RAFUpdate(): void;
        /**
        * The update loop that the setTimeout method will continuously call.
        * @method SetTimeoutUpdate
        * @public
        */
        public SetTimeoutUpdate(): void;
    }
}
/**
* Module - Kiwi (Core)
* The top level namespace in which all core classes and modules are defined.
* @module Kiwi
* @main Kiwi
*/
declare module Kiwi {
    /**
    * The version of Kiwi that is currently being used.
    * @property VERSION
    * @static
    * @type string
    * @default '1.0'
    * @public
    */
    var VERSION: string;
    /**
    * A Static property that contains the number associated with the CANVAS RENDERER.
    * @property RENDERER_CANVAS
    * @static
    * @type number
    * @default 0
    * @public
    */
    var RENDERER_CANVAS: number;
    /**
    * A Static property that contains the number associated with the WEBGL RENDERER.
    * @property RENDERER_WEBGL
    * @static
    * @type number
    * @default 1
    * @public
    */
    var RENDERER_WEBGL: number;
    /**
    * Contains the number associated with the targetting of browsers.
    * @property TARGET_BROWSER
    * @static
    * @type number
    * @default 0
    * @public
    */
    var TARGET_BROWSER: number;
    /**
    * Contains the number associated with the targetting of CocoonJS.
    * @property TARGET_COCOON
    * @static
    * @type number
    * @default 1
    * @public
    */
    var TARGET_COCOON: number;
    /**
    * Contains the number that is used to turn the Debug options on.
    * @property DEBUG_ON
    * @static
    * @type number
    * @default 0
    * @public
    */
    var DEBUG_ON: number;
    /**
    * Contains the number that is used to turn the Debug options off.
    * @property DEBUG_OFF
    * @static
    * @type number
    * @default 1
    * @public
    */
    var DEBUG_OFF: number;
    /**
    * Contains the Device class that is used to detirmine which features are supported by the users browser.
    * @property DEVICE
    * @static
    * @type Device
    * @public
    */
    var DEVICE: System.Device;
    /**
    * Contains a number that is used to identify objects that are a State.
    * @property STATE
    * @static
    * @type number
    * @default 0
    * @public
    */
    var STATE: number;
    /**
    * Contains a number that is used to identify objects that are a Group.
    * @property GROUP
    * @static
    * @type number
    * @default 2
    * @public
    */
    var GROUP: number;
    /**
    * Contains a number that is used to identify objects that are a Entity.
    * @property ENTITY
    * @static
    * @type number
    * @default 3
    * @public
    */
    var ENTITY: number;
    /**
    * Contains a number that is used to identify objects that are a Camera.
    * @property CAMERA
    * @static
    * @type number
    * @default 4
    * @public
    */
    var CAMERA: number;
    /**
    * Contains a number that is used to identify objects that are a HUD Widget.
    * @property HUD_WIDGET
    * @static
    * @type number
    * @default 5
    * @public
    */
    var HUD_WIDGET: number;
    /**
    * Contains a number that is used to identify objects that are a TILE_LAYER.
    * @property TILE_LAYER
    * @static
    * @type number
    * @default 6
    * @public
    */
    var TILE_LAYER: number;
    /**
    * The GameManager is used to maintain mulitple instances of Kiwi games within a single document.
    *
    * @class GameManager
    * @namespace Kiwi
    * @static
    */
    class GameManager {
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string;
        /**
        * A list of all of the games that are currently on this document.
        * @property _games
        * @static
        * @type Game[]
        * @private
        */
        private static _games;
        /**
        * Used to register a new Game with this manager. Returns the new number of games that have been registered.
        * @method register
        * @param game {Game} The game you are wanting to register.
        * @return {Number] The new number of games registered.
        * @public
        */
        static register(game: Kiwi.Game): number;
        /**
        * Returns the total number of game that are currently registered with this GameManager.
        * @method total
        * @return {Number} Total number of registered games.
        * @public
        */
        static total(): number;
    }
    var Plugins: {};
    var extend: Function;
}
