/**
*
* @module Kiwi
*
*/
declare module Kiwi {
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
    *   @param [options.debug=Kiwi.DEBUG_ON] {Number} If debugging is enabled or not.
    *   @param [options.bootCallback=null] {Function} A callback to be executed when the game reaches the boot stage.
    *   @param [options.deviceTarget=Kiwi.TARGET_BROWSER] {Number} The type of device Kiwi is being used on.
    *   @param [options.renderer=Kiwi.RENDERER_AUTO] {Number} The renderer Kiwi should use.
    *   @param [options.width=Kiwi.Stage.DEFAULT_WIDTH] {Number} The width of this instance of Kiwi.
    *   @param [options.height=Kiwi.Stage.DEFAULT_HEIGHT] {Number} The height of this instance of Kiwi.
    *   @param [options.scaleType=Kiwi.Stage.SCALE_NONE] {Number} The type of scaling that should be applied to Kiwi.
    *   @param [options.plugins=[]] {Array} A list of the names of plugins that are to be used with this game.
    *   @param [options.log] {Object} Default state of the Log properties
    *       @param [options.log.recording=true] {Boolean} If the logs should be recorded.
    *       @param [options.log.display=true] {Boolean} If the logs should be displayed or not.
    *       @param [options.log.enabled=true] {Boolean} If the Logger is enabled at all.
    *       @param [options.log.maxRecordings=Infinity] {Number} The maximum number of recordings to have at a single time.
    * @return {Kiwi.Game}
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
        renderOption: number;
        /**
        * A callback function that can be passed in as an option in the conifugration object. Invoked after the boot process has completed.
        * @property bootCallbackOption
        * @type Function
        * @private
        */
        bootCallbackOption: Function;
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
        deviceTargetOption: number;
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
        debugOption: number;
        /**
        * Returns true if debug option is set to Kiwi.DEBUG_ON
        * @property debug
        * @type boolean
        * @public
        */
        debug: boolean;
        /**
        * Holds the renderer that is being used. This is determined based on the _renderMode
        * @property renderer
        * @type IRenderManager
        * @public
        */
        renderer: IRenderManager;
        /**
        * Holds the hud manager.
        * @property huds
        * @type HUDManager
        * @public
        */
        huds: Kiwi.HUD.HUDManager;
        /**
        * The type of object that the game is.
        * @method objType
        * @return {String} "Game"
        * @public
        */
        objType(): string;
        /**
        * The object that peforms DOM and device startup operations for browsers (ie not cocoon)
        * @property _startup
        * @type Kiwi.System.Bootstrap
        * @private
        */
        private _startup;
        id: number;
        /**
        * The audio manager that handles all of the audio in game. Inside you can globally mute the audio, create new sounds, e.t.c.
        * @property audio
        * @type Kiwi.Sound.AudioManager
        * @public
        */
        audio: Kiwi.Sound.AudioManager;
        /**
        * The global file store for this game. This handles the storage and access of information loaded, as well as tags that maybe set for them individual files.
        * @property fileStore
        * @type Kiwi.Files.FileStore
        * @public
        */
        fileStore: Kiwi.Files.FileStore;
        /**
        * Handles any user input with the game. These could via the users keyboard, mouse or touch events.
        * @property input
        * @type Kiwi.Input.InputManager
        * @public
        */
        input: Kiwi.Input.InputManager;
        /**
        * Manages the cameras the are on the stage. Single default Camera only in this version.
        * @property cameras
        * @type Kiwi.CameraManager
        * @public
        */
        cameras: Kiwi.CameraManager;
        /**
        * Manages plugins registration and initialisation for the game instance.
        * @property pluginManager
        * @type Kiwi.PluginManager
        * @public
        */
        pluginManager: Kiwi.PluginManager;
        /**
        * Loads files from outside sources and checks to see that they have loaded correctly or not.
        * @property loader
        * @type Kiwi.Files.Loader
        * @public
        */
        loader: Kiwi.Files.Loader;
        /**
        * The Request Animation Frame that is being used for the update and render loops.
        * @property raf
        * @type Kiwi.Utils.RequestAnimationFrame
        * @public
        */
        raf: Kiwi.Utils.RequestAnimationFrame;
        /**
        * The ONLY stage that is being used for this game.
        * @property stage
        * @type Stage
        * @public
        */
        stage: Kiwi.Stage;
        /**
        * Manages all of the states that exist for this game. Via the manager you can create new states, switch states and do various other tasks.
        * @property states
        * @type Kiwi.StateManager
        * @public
        */
        states: Kiwi.StateManager;
        /**
        * Holds a reference to the clocks that are being used and has a MASTER clock that is being used for the game.
        * @property time
        * @type Kiwi.Time.ClockManager
        * @public
        */
        time: Kiwi.Time.ClockManager;
        /**
        * The tween manager holds a reference to all of the tweens that are created and currently being used.
        * @property tweens
        * @type Kiwi.Animations.Tweens.TweenManager
        * @public
        */
        tweens: Kiwi.Animations.Tweens.TweenManager;
        /**
        * A Random Data Generator. This is useful for create unique ids and random information.
        * @property rnd
        * @type Kiwi.Utils.RandomDataGenerato
        * @public
        */
        rnd: Kiwi.Utils.RandomDataGenerator;
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
        * The number of frames since the game was launched.
        * @property _frame
        * @type number
        * @private
        * @since 1.1.0
        */
        private _frame;
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
        frame: number;
        /**
        * The number of ideal frames since the game was launched.
        *
        * Use this to drive cyclic animations. This will be smoother than using the frame parameter. It is derived from the total time elapsed since the game launched.
        * @property idealFrame
        * @type number
        * @public
        * @since 1.1.0
        */
        idealFrame: number;
        /**
        * The current frameRate that the update/render loops are running at. Note that this may not be an  accurate representation.
        * @property frameRate
        * @return string
        * @public
        */
        frameRate: number;
        /**
        * The start method gets executed when the game is ready to be booted, and handles the start-up of the managers.
        * Once the managers have started up the start loop will then begin to create the game loop.
        * @method start
        * @private
        */
        private _start();
        /**
        * The game loop.
        * @method _loop
        * @private
        */
        private _loop();
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
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
    class Stage {
        constructor(game: Kiwi.Game, name: string, width: number, height: number, scaleType: number);
        /**
        * Returns the type of this object.
        * @method objType
        * @return {string} "Stage"
        * @public
        */
        objType(): string;
        /**
        * The default width of the stage.
        * @property DEFAULT_WIDTH
        * @type number
        * @default 800
        * @public
        * @static
        */
        static DEFAULT_WIDTH: number;
        /**
        * The default height of the stage.
        * @property DEFAULT_HEIGHT
        * @type number
        * @default 600
        * @public
        * @static
        */
        static DEFAULT_HEIGHT: number;
        /**
        * The default scaling method used on Kiwi Games.
        * This scaling method will set the containers width/height to static values.
        * @property SCALE_NONE
        * @type number
        * @default 0
        * @public
        * @static
        */
        static SCALE_NONE: number;
        /**
        * Scale Fit will scale the stages width to fit its parents width.
        * The height is then calculated to maintain the aspect ratio of the width/height of the Stage.
        * @property SCALE_FIT
        * @type number
        * @default 1
        * @public
        * @static
        */
        static SCALE_FIT: number;
        /**
        * Stretch will make the stage scale to fit its parents width/height (by using max/min height of 100%).
        * If the parent doesn't have a height set then the height will be the height of the stage.
        * @property SCALE_STRETCH
        * @type number
        * @default 2
        * @public
        * @static
        */
        static SCALE_STRETCH: number;
        /**
        * Private property that holds the scaling method that should be applied to the container element.
        * @property _scaleType
        * @type number
        * @default Kiwi.Stage.SCALE_NONE
        * @private
        */
        private _scaleType;
        /**
        * Holds type of scaling that should be applied the container element.
        * @property scaleType
        * @type number
        * @default Kiwi.Stage.SCALE_NONE
        * @public
        */
        scaleType: number;
        /**
        * The alpha of the stage.
        * @property _alpha
        * @type number
        * @default 1
        * @private
        */
        private _alpha;
        /**
        * Sets the alpha of the container element. 0 = invisible, 1 = fully visible.
        * Note: Because the alpha value is applied to the container, it will not work in CocoonJS.
        *
        * @property alpha
        * @type number
        * @default 1
        * @public
        */
        alpha: number;
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
        x: number;
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
        y: number;
        /**
        * The width of the stage.
        * @property _width
        * @type number
        * @private
        */
        private _width;
        /**
        * The width of the stage. This is READ ONLY. See the "resize" method if you need to modify this value.
        * @property width
        * @type number
        * @public
        * @readonly
        */
        width: number;
        /**
        * The height of the stage
        * @property _height
        * @type number
        * @private
        */
        private _height;
        /**
        * The height of the stage. This is READ ONLY. See the "resize" method if you need to modify this value.
        * @property height
        * @type number
        * @public
        * @readonly
        */
        height: number;
        /**
        * A Signal that dispatches an event when the stage gets resized.
        * @property onResize
        * @type Kiwi.Signal
        * @public
        */
        onResize: Kiwi.Signal;
        /**
        * A Signal which dispatches events when the window is resized.
        * Useful to detect if the screen is now in a "landscape" or "portrait" view on Mobile/Cocoon devices.
        * @property onWindowResize
        * @type Kiwi.Signal
        * @public
        */
        onWindowResize: Kiwi.Signal;
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
        private _scale;
        scale: Kiwi.Geom.Point;
        /**
        * Calculates and returns the amount that the container has been scale by on the X axis.
        * @property scaleX
        * @type Number
        * @default 1
        * @public
        */
        scaleX: number;
        /**
        * Calculates and returns the amount that the container has been scale by on the Y axis.
        * @property scaleY
        * @type Number
        * @default 1
        * @public
        */
        scaleY: number;
        /**
        * A point which determines the offset of this Stage
        * @property offset
        * @type Kiwi.Geom.Point
        * @public
        */
        offset: Kiwi.Geom.Point;
        /**
        * The game this Stage belongs to
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * The title of your stage
        * @property name
        * @type string
        * @public
        */
        name: string;
        /**
        * Whether or not this Stage is DOM ready.
        * @property domReady
        * @type boolean
        * @public
        */
        domReady: boolean;
        /**
        * The background color of the stage.
        *
        * @property _color
        * @type Kiwi.Utils.Color
        * @public
        */
        _color: Kiwi.Utils.Color;
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
        color: any;
        /**
        * Allows the setting of the background color of the stage through component RGB colour values.
        *
        * This property is an Object Literal with "r", "g", "b" colour streams of values between 0 and 255.
        *
        * @property rgbColor
        * @type Object
        * @public
        */
        rgbColor: any;
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
        rgbaColor: any;
        /**
        * Get the normalized background color of the stage.
        * Returns an object with rgba values, each being between 0 and 1.
        * This is READ ONLY.
        * @property normalizedColor
        * @type string
        * @public
        */
        normalizedColor: any;
        /**
        * The webgl rendering context.
        * @property gl
        * @type WebGLRenderingContext
        * @public
        */
        gl: WebGLRenderingContext;
        /**
        * The canvas rendering context.
        * @property ctx
        * @type CanvasRenderingContext2D
        * @public
        */
        ctx: CanvasRenderingContext2D;
        /**
        * The canvas element that is being rendered on.
        * @property canvas
        * @type HTMLCanvasElement
        * @public
        */
        canvas: HTMLCanvasElement;
        /**
        * The debugging canvas.
        * @property debugCanvas
        * @type HTMLCanvasElement
        * @public
        */
        debugCanvas: HTMLCanvasElement;
        /**
        * The debug canvas rendering context.
        * @property dctx
        * @type CanvasRenderingContext2D
        * @public
        */
        dctx: CanvasRenderingContext2D;
        /**
        * The parent div in which the layers and input live
        * @property container
        * @type HTMLDivElement
        * @public
        */
        container: HTMLDivElement;
        /**
        * Stores the renderer created after context detection.
        * @property _renderer
        * @type any
        * @private
        * @since 1.1.0
        */
        private _renderer;
        /**
        * Get the renderer associated with the canvas context. This is either a GLRenderManager or a CanvasRenderer. If the Kiwi.RENDERER_WEBGL renderer was requested but could not be created, it will fall back to CanvasRenderer.
        * This is READ ONLY.
        * @property renderer
        * @type number
        * @public
        * @since 1.1.0
        */
        renderer: any;
        /**
        * Is executed when the DOM has loaded and the game is just starting.
        * This is a internal method used by the core of Kiwi itself.
        * @method boot
        * @param dom {HTMLElement} The
        * @public
        */
        boot(dom: Kiwi.System.Bootstrap): void;
        /**
        * Gets the x/y coordinate offset of any given valid DOM Element from the top/left position of the browser
        * Based on jQuery offset https://github.com/jquery/jquery/blob/master/src/offset.js
        * @method getOffsetPoint
        * @param {Any} element
        * @param {Kiwi.Geom.Point} output
        * @return {Kiwi.Geom.Point}
        * @public
        */
        getOffsetPoint(element: any, output?: Kiwi.Geom.Point): Kiwi.Geom.Point;
        /**
        * Method that is fired when the window is resized.
        * @method _windowResized
        * @param event {UIEvent}
        * @private
        */
        private _windowResized(event);
        /**
        * Method that is fired when the device is reoriented.
        * @method _orientationChanged
        * @param event {UIEvent}
        * @private
        * @since 1.1.1
        */
        private _orientationChanged(event);
        /**
        * Used to calculate the new offset and the scale of the stage currently is at.
        * @method _calculateContainerScale
        * @private
        */
        private _calculateContainerScale();
        /**
        * Handles the creation of the canvas that the game will use and retrieves the context for the renderer.
        *
        * @method _createComponsiteCanvas
        * @private
        */
        private _createCompositeCanvas();
        /**
        * Set the stage width and height for rendering purposes.
        * This will not effect that "scaleType" that it has been set to.
        *
        * @method resize
        * @param width {number} The new Stage width.
        * @param height {number} The new Stage height.
        * @public
        */
        resize(width: number, height: number): void;
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
        setRGBColor(r: number, g: number, b: number): any;
        /**
        * Creates a debug canvas and adds it above the regular game canvas.
        * The debug canvas is not created by default (even with debugging on) and rendering/clearing of the canvas is upto the developer.
        * The context for rendering can be access via the "dctx" property and you can use the "clearDebugCanvas" method to clear the canvas.
        *
        * @method createDebugCanvas
        * @public
        */
        createDebugCanvas(): void;
        /**
        * Clears the debug canvas and fills with either the color passed.
        * If not colour is passed then Red at 20% opacity is used.
        *
        * @method clearDebugCanvas
        * @param [color="rgba(255,0,0,0.2)"] {string} The debug color to rendering on the debug canvas.
        * @public
        */
        clearDebugCanvas(color?: string): void;
        /**
        * Toggles the visibility of the debug canvas.
        * @method toggleDebugCanvas
        * @public
        */
        toggleDebugCanvas(): void;
        /**
        * Handles the scaling/sizing based upon the scaleType property.
        * @method _scaleContainer
        * @private
        */
        private _scaleContainer();
        /**
        * Dispatches callbacks when the page containing this game gains focus.
        *
        * @property onFocus
        * @type Kiwi.Signal
        * @since 1.3.0
        * @public
        */
        onFocus: Kiwi.Signal;
        /**
        * Dispatches callbacks when this page containing this game loses focus.
        *
        * @property onBlur
        * @type Kiwi.Signal
        * @since 1.3.0
        * @public
        */
        onBlur: Kiwi.Signal;
        /**
        * Dispatches callbacks when the visiblity of the page changes.
        *
        * @property onVisibilityChange
        * @type Kiwi.Signal
        * @since 1.3.0
        * @public
        */
        onVisibilityChange: Kiwi.Signal;
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
        visibility: boolean;
        /**
        * Contains string used to access the `hidden` property on the document.
        *
        * @property _visibility
        * @type String
        * @default 'hidden'
        * @since 1.3.0
        * @private
        */
        private _visibility;
        /**
        * Contains the bound version of the `_checkVisibility` method.
        *
        * @property _visibilityChange
        * @type any
        * @since 1.3.0
        * @private
        */
        private _visibilityChange;
        /**
        * Fired when the page visibility changes, or the page focus/blur events fire.
        * In charge of firing the appropriate signals.
        *
        * @method _checkVisibility
        * @param event {Any}
        * @since 1.3.0
        * @private
        */
        private _checkVisibility(event);
        /**
        * Adds the focus, blur, and visibility events to the document.
        *
        * @method _createFocusEvents
        * @since 1.3.0
        * @private
        */
        private _createFocusEvents();
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * The component manager is a class that is used to handle components that
    * are active on a particular object. Any object that has a component
    * manager attached to it can use components. If you want to check to see if
    * a particular component is on an object you can ask the component manager.
    *
    * The component manager is updated once per frame (as part of its owner's
    * update), and updates all active components. This is very useful for
    * creating modular, customised behaviors on entities.
    *
    * @class ComponentManager
    * @namespace Kiwi
    * @constructor
    * @param type {number} - The type of object that this component manager's owner is.
    * @param owner {Object} - The owner of this component manager.
    * @return {ComponentManager}
    *
    */
    class ComponentManager {
        constructor(type: number, owner: any);
        /**
        * Returns the type of this object
        * @method objType
        * @return {string} "ComponentManager"
        * @public
        */
        objType(): string;
        /**
        * The owner of this Component Manager
        * @property _owner
        * @type {object}
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
        * @type Kiwi.Component
        * @private
        */
        _components: any;
        /**
        * Returns true if this contains the component given, false otherwise.
        * @method hasComponent
        * @param value {String} the name of the component
        * @return {boolean} True if this component manager contains the given component, false otherwise.
        * @public
        */
        hasComponent(value: string): boolean;
        /**
        * Returns true if this contains the component given and the component is active, false otherwise.
        * @method hasActiveComponent
        * @param value {String} The name of the component.
        * @return {boolean} true if this manager contains the component and it is active, false otherwise.
        * @public
        */
        hasActiveComponent(value: string): boolean;
        /**
        * Get an existing component that has been added to the layer by its name
        * @method getComponent
        * @param value {String} The component name
        * @return {Kiwi.Component} The component, if found, otherwise null
        * @public
        */
        getComponent(value: string): any;
        /**
        * Adds a Component to the manager.
        * @method add
        * @param component {Kiwi.Component} The component to add
        * @return {Kiwi.Component} The component that was added
        * @public
        */
        add(component: Kiwi.Component): any;
        /**
        * Adds a batch of components to the manager at a single time.
        * @method addBatch
        * @param value* {Kiwi.Component} The component/s that you would like to add.
        * @public
        */
        addBatch(...paramsArr: any[]): void;
        /**
        * Removes a component from the component manager
        * @method removeComponent
        * @param component {Kiwi.Component} The component to be removed.
        * @param [destroy=true] {boolean} If the destroy method is to be called on the component when it is removed.
        * @return {boolean} true if the component was removed successfully
        * @public
        */
        removeComponent(component: Kiwi.Component, destroy?: boolean): boolean;
        /**
        * Removes a component based on its name
        * @method removeComponentByName
        * @param name {String} The name of the component to be removed
        * @param [destroy=true] {boolean} If the destroy method is to be called on the component when it is removed.
        * @return {boolean} true if the component was removed successfully
        * @public
        */
        removeComponentByName(name: string, destroy?: boolean): boolean;
        /**
        * Removes all of the components from the component manager.
        * @method removeAll
        * @param [destroy=true] {boolean} If true will destroy all components
        * @public
        */
        removeAll(destroy?: boolean): void;
        /**
        * Calls preUpdate on all active Components
        * @method preUpdate
        * @public
        */
        preUpdate(): void;
        /**
        * Calls update on all active Components
        * @method update
        * @public
        */
        update(): void;
        /**
        * Calls postUpdate on all active Components
        * @method postUpdate
        * @public
        */
        postUpdate(): void;
        /**
        * Calls preRender on all active Components
        * @method preRender
        * @public
        */
        preRender(): void;
        /**
        * Renders all active Components
        * @method render
        * @public
        */
        render(): void;
        /**
        * Calls postRender on all active Components
        * @method postRender
        * @public
        */
        postRender(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * The plugin manager registers plugins, checks plugin dependencies, and calls designated functions on each registered plugin at boot time, and during the update loop if required.
    * Plugins are registered on the global Kiwi instance. Once a plugin in registered it is allocated a place on the Kiwi.Plugins name space.
    * Eg. FooPlugin will be accessible at Kiwi.Plugins.FooPlugin.
    * When a game instance is created, it can contain a list of required plugins in the configuration object. At this point the plugin manager will validate that the plugins
    * exist, and that dependencies are met (both Kiwi version and versions of other required plugins).
    * If the plugin has a "create" function, the plugin manager instance will call that function as part of the boot process. The create function may do anything, but usually it would create
    * an instance of an object.
    * The plugin manager update function is called every update loop. If an object was created by the "create" function and it has an "update" function, that function will be called in turn.
    * @class PluginManager
    * @namespace Kiwi
    * @constructor
    * @param game {Kiwi.Game} The state that this entity belongs to. Used to generate the Unique ID and for garbage collection.
    * @param plugins {string[]} The entities position on the x axis.
    * @return {Kiwi.PluginManager} This PluginManager.
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
        static availablePlugins: any;
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
        * @type {string} "PluginManager"
        * @public
        */
        objType: string;
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
        * @type Array
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
        validatePlugins(): void;
        /**
        * Returns whether a valid minimum version of a plugin exists.
        * @method validMinimumPluginVersionExists
        * @param name {string} Name of plugin
        * @param version {string} Minimum version
        * @return boolean
        * @public
        */
        validMinimumPluginVersionExists(name: string, version: string): boolean;
        /**
        * Returns true if a plugin identified by the supplied pluginName is registered.
        * @method pluginIsRegistered
        * @param {string} pluginName
        * @public
        */
        pluginIsRegistered(pluginName: string): boolean;
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
        boot(): void;
        /**
        * Calls the update functions on any objects that plugins used by the game instance have designated during creation.
        * @method update
        * @public
        */
        update(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * Used to handle the creation and management of Cameras on a Game. Each Game will always have created for it a CameraManager and a default Camera on the manager.
    * Games currently only usupport the use of a single camera, the default camera. Much of this class has been written with future multiple camera support in mind.
    *
    * @class CameraManager
    * @namespace Kiwi
    * @constructor
    * @param {Kiwi.Game} game
    * @return {Kiwi.CameraManager}
    */
    class CameraManager {
        constructor(game: Kiwi.Game);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "CameraManager"
        * @public
        */
        objType(): string;
        /**
        * The game this object belongs to
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * A collection of cameras
        * @property _cameras
        * @type Array
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
        * @type Kiwi.Camara
        * @public
        */
        defaultCamera: Kiwi.Camera;
        /**
        * Initializes the CameraManager, creates a new camera and assigns it to the defaultCamera
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * Creates a new Camera and adds it to the collection of cameras.
        * @param {String} name. The name of the new camera.
        * @param {Number} x. The x position of the new camera.
        * @param {Number} y. The y position of the new camera.
        * @param {Number} width. The width of the new camera.
        * @param {Number} height. The height of the new camera.
        * @return {Kiwi.Camera} The new camera object.
        * @public
        */
        create(name: string, x: number, y: number, width: number, height: number): Kiwi.Camera;
        /**
        * Removes the given camera, if it is present in the camera managers camera collection.
        * @method remove
        * @param camera {Kiwi.Camera}
        * @return {boolean} True if the camera was removed, false otherwise.
        * @public
        */
        remove(camera: Kiwi.Camera): boolean;
        /**
        * Calls update on all the cameras.
        * @method update
        * @public
        */
        update(): boolean;
        /**
        * Calls the render method on all the cameras
        * @method render
        * @public
        */
        render(): boolean;
        /**
        * Removes all cameras in the camera Manager except the default camera. Does nothing if in multi camera mode.
        * @method removeAll
        * @public
        */
        removeAll(): void;
        /**
        * Returns all cameras to origin. Called when starting a new state.
        * @method zeroAllCameras
        * @public
        * @since 1.1.0
        */
        zeroAllCameras(): void;
        /**
        * Returns camera to origin.
        * @method zeroCamera
        * @param camera {Kiwi.Camera}
        * @public
        * @since 1.1.0
        */
        zeroCamera(camera: Kiwi.Camera): void;
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
    * @param parent {Kiwi.State} The State that this configuration object belongs to.
    * @param name {String} The name of the state which was created.
    * @return {Kiwi.StateConfig}
    *
    */
    class StateConfig {
        constructor(parent: Kiwi.State, name: string);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "StateConfig"
        * @public
        */
        objType(): string;
        /**
        * The state this StateConfig belongs to.
        * @property _state
        * @type Kiwi.State
        * @private
        */
        private _state;
        /**
        * The name of the State, must be unique within your game.
        * @property name
        * @type String
        * @public
        */
        name: string;
        /**
        * Not used. Deprecated as of version 1.3.0
        *
        * @property isPersistent
        * @type Boolean
        * @default false
        * @deprecated
        * @since 1.3.0
        * @public
        */
        isPersistent: boolean;
        /**
        * If this State has been created (the create method has been executed).
        * Essentually has the same meaning as 'isReady'.
        * @property isCreated
        * @type boolean
        * @default false
        * @public
        */
        isCreated: boolean;
        /**
        * If the State has been initialised already (so the Boot and Init methods have been executed already).
        * A State only get Initialised once which is when it switched to for this first time.
        * @property isInitialised
        * @type boolean
        * @default false
        * @public
        */
        isInitialised: boolean;
        /**
        * If the State that this config is on is 'ready' to be used (e.g. all the assets have been loaded and libraries complied)
        * or if it isn't and so it is still at the 'loading' stage.
        * @property isReady
        * @type boolean
        * @default false
        * @public
        */
        isReady: boolean;
        /**
        * If the State that this config is on contains a Preloader Method.
        *
        * Deprecated as of 1.3.0 of Kiwi as it is not currently in use.
        *
        * @property hasPreloader
        * @type boolean
        * @default false
        * @deprecated
        * @since 1.3.0
        * @public
        */
        hasPreloader: boolean;
        /**
        * The number of times the State that this config belongs to has been active/used.
        * @property runCount
        * @type Number
        * @default 0
        * @public
        */
        runCount: number;
        type: number;
        /**
        * Stores any parameters that are to be passed to the init method when the State that this config is on is switched to.
        * @property initParams
        * @type Array
        * @public
        */
        initParams: any;
        /**
        * Stores any parameters that are to be passed to the create method when the State that this config is on is switched to.
        * @property createParams
        * @type Array
        * @public
        */
        createParams: any;
        /**
        * Stores any parameters that are to be passed to the preload method when the State that this config is on is switched to.
        * @property preloadParams
        * @type Array
        * @since 1.3.0
        * @public
        */
        preloadParams: any;
        /**
        * Resets the properties contained on this StateConfig object.
        * This is executed when a State is about to be destroyed as so reset's it to be switched to again.
        * @method reset
        * @public
        */
        reset(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * The State Manager handles the starting, parsing, looping and swapping of game States within a Kiwi Game
    * There is only ever one State Manager per game, but a single Game can contain multiple States.
    *
    * @class StateManager
    * @namespace Kiwi
    * @constructor
    * @param game {Kiwi.Game} The game that this statemanager belongs to.
    * @return {Kiwi.StateMananger}
    *
    */
    class StateManager {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this is.
        * @method objType
        * @return {string} "StateManager"
        * @public
        */
        objType(): string;
        /**
        * The game that this manager belongs to.
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * An array of all of the states that are contained within this manager.
        * @property _states
        * @type Array
        * @private
        */
        private _states;
        /**
        * The current State that the game is at.
        * @property current
        * @type Kiwi.State
        * @default null
        * @public
        */
        current: Kiwi.State;
        /**
        * The name of the new State that is to be switched to.
        * @property _newStateKey
        * @type string
        * @default null
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
        * Checks to see if the State passed is valid or not.
        * @method checkValidState
        * @param state {Kiwi.State}
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
        addState(state: any, switchTo?: boolean): boolean;
        /**
        * Is executed once the DOM has finished loading.
        * This is an INTERNAL Kiwi method.
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * Switches to the name (key) of the state that you pass.
        * Does not work if the state you are switching to is already the current state OR if that state does not exist yet.
        * @method setCurrentState
        * @param key {String}
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
        * @param [preloadParams=null] {Object} Any parameters that you would like to pass to the preload method. Since 1.3.0 of Kiwi.JS
        * @return {boolean} Whether the State is going to be switched to or not.
        * @public
        */
        switchState(key: string, state?: any, initParams?: any, createParams?: any, preloadParams?: any): boolean;
        /**
        * Gets a state by the key that is passed.
        * @method getState
        * @param key {String}
        * @return {Kiwi.State}
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
        * @param percent {Number} The current percentage of files that have been loaded. Ranging from 0 - 1.
        * @param bytesLoaded {Number} The number of bytes that have been loaded so far.
        * @param file {Kiwi.Files.File} The last file that has been loaded.
        * @private
        */
        private onLoadProgress(percent, bytesLoaded, file);
        /**
        * Executed when the preloading has completed. Then executes the loadComplete and create methods of the new State.
        * @method onLoadComplete
        * @private
        */
        private onLoadComplete();
        /**
        * Rebuilds the texture, audio and data libraries that are on the current state. Thus updating what files the user has access to.
        * @method rebuildLibraries
        * @public
        */
        rebuildLibraries(): void;
        /**
        * The update loop that is accessible on the StateManager.
        * @method update
        * @public
        */
        update(): void;
        /**
        * PostRender - Called after all of the rendering has been executed in a frame.
        * @method postRender
        * @public
        */
        postRender(): void;
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
    * As Javascript does not use Interfaces, the IChild does not appear directly in the library. It describes common elements of Kiwi.Group and Kiwi.Entity.
    *
    * @class IChild
    * @namespace Kiwi
    */
    interface IChild {
        /**
        * Renders the entity.
        *
        * @method render
        * @param camera {Kiwi.Camera}
        * @public
        * @deprecated Only Kiwi.Entity and inheritors are rendered.
        */
        render(camera: Kiwi.Camera): any;
        /**
        * Update the entity. Automatically called every frame.
        *
        * @method update
        * @public
        */
        update(): any;
        /**
        * Represents the type of child that this is.
        *
        * @method childType
        * @return number
        * @public
        */
        childType(): number;
        /**
        * Unique identifier instantiated on creation.
        *
        * @property id
        * @type string
        * @public
        */
        id: string;
        /**
        * A name for this object. This is not necessary or necessarily unique, but is handy for identifying objects.
        *
        * @property name
        * @type string
        * @public
        */
        name: string;
        /**
        * The game this object belongs to
        *
        * @property game
        * @type Kiwi.Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * The State that this object belongs to
        *
        * @property state
        * @type Kiwi.State
        * @public
        */
        state: Kiwi.State;
        /**
        * The Component Manager
        *
        * @property components
        * @type Kiwi.ComponentManager
        * @public
        */
        components: Kiwi.ComponentManager;
        /**
        * An indication of whether or not this object is 'dirty' and thus needs to be re-rendered in some manner.
        *
        * @property dirty
        * @type boolean
        * @public
        */
        dirty: boolean;
        /**
        * Toggles the active state. An active object has its update method called by its parent.
        *
        * @property active
        * @type boolean
        * @public
        */
        active: boolean;
        /**
        * Toggles the exitence of this object. An object that no longer exists can be garbage collected or re-allocated in a pool
        * This method should be over-ridden to handle specific canvas/webgl implementations.
        *
        * @property exists
        * @type boolean
        * @public
        */
        exists: boolean;
        /**
        * Controls whether this object's render methods are called by its parent.
        *
        * @property willRender
        * @type boolean
        * @public
        * @deprecated Use visible instead
        */
        willRender: boolean;
        /**
        * Controls whether this object's render methods are called by its parent.
        *
        * @property visible
        * @type boolean
        * @public
        * @since 1.0.1
        */
        visible: boolean;
        /**
        * Sets the parent of this object. It is recommended to update transforms when you set this.
        *
        * @property parent
        * @type Kiwi.Group
        * @public
        */
        parent: Kiwi.Group;
        /**
        * The transform for this object.
        * Transform handles the calculation of coordinates/rotation/scale etc in the game world.
        * @property transform
        * @type Kiwi.Geom.Transform
        * @public
        */
        transform: Kiwi.Geom.Transform;
        /**
        * The X coordinate of this object. This is just aliased to the transform property.
        * @property x
        * @type number
        * @public
        */
        x: number;
        /**
        * The Y coordinate of this object. This is just aliased to the transform property.
        * @property y
        * @type number
        * @public
        */
        y: number;
        /**
        * The X coordinate of this object in world space - that is, after inheriting transforms from parents. This is just aliased to the transform property.
        * @property worldX
        * @type number
        * @public
        * @since 1.1.0
        */
        worldX: number;
        /**
        * The Y coordinate of this object in world space - that is, after inheriting transforms from parents. This is just aliased to the transform property.
        * @property worldY
        * @type number
        * @public
        * @since 1.1.0
        */
        worldY: number;
        /**
        * The rotation of this object. This is just aliased to the transform property.
        * @property rotation
        * @type number
        * @public
        */
        rotation: number;
        /**
        * The Scale X of this object. This is just aliased to the transform property.
        * @property scaleX
        * @type number
        * @public
        */
        scaleX: number;
        /**
        * The Scale Y of this object. This is just aliased to the transform property.
        * @property scaleY
        * @type number
        * @public
        */
        scaleY: number;
        /**
        * The scale of this object. This is just aliased to the transform property.
        * @property scale
        * @type number
        * @public
        * @since 1.1.0
        */
        scale: number;
        /**
        * The rotation offset of this object on the X axis. This is just aliased to the transform property.
        * @property rotPointX
        * @type number
        * @public
        * @since 1.1.0
        */
        rotPointX: number;
        /**
        * The rotation offset of this object on the Y axis. This is just aliased to the transform property.
        * @property rotPointY
        * @type number
        * @public
        * @since 1.1.0
        */
        rotPointY: number;
        /**
        * The anchor point offset of this object on the X axis. This is an alias of the rotPointX property on the transform.
        * @property anchorPointX
        * @type number
        * @public
        * @since 1.1.0
        */
        anchorPointX: number;
        /**
        * The anchor point offset of this object on the Y axis. This is an alias of the rotPointY property on the transform.
        * @property anchorPointY
        * @type number
        * @public
        * @since 1.1.0
        */
        anchorPointY: number;
        /**
        * Call this to clean up the object for deletion and garbage collection.
        * @method destroy
        * @param [immediate=false] {boolean} If the object should be immediately removed or if it should be removed at the end of the next update loop.
        * @public
        */
        destroy(...params: any[]): any;
        /**
        * Adds a new Tag to this IChild. Useful for identifying large amounts of the same type of GameObjects.
        * @method addTag
        * @param tag {string}
        * @since 1.1.0
        * @public
        */
        addTag(...params: any[]): any;
        /**
        * Removes a Tag from this IChild.
        * @method removeTag
        * @param tag {string}
        * @since 1.1.0
        * @public
        */
        removeTag(...params: any[]): any;
        /**
        * Checks to see if this IChild has a Tag based upon a string which you pass.
        * @method hasTag
        * @param tag {string}
        * @since 1.1.0
        * @public
        */
        hasTag(tag: string): boolean;
        /**
        * Describes the type of this object.
        * @method objType
        * @returns string
        * @public
        * @since 1.1.0
        */
        objType(): string;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * An Entity is a base class for game objects to extend from and thus you should never directly instantiate this class.
    * Every entity requires that you pass to it the state to which it belongs, so that when you switch states the appropriate entities can be deleted.
    *
    * @class Entity
    * @namespace Kiwi
    * @constructor
    * @param state {State} The state that this entity belongs to. Used to generate the Unique ID and for garbage collection.
    * @param x {Number} The entities position on the x axis.
    * @param y {Number} The entities position on the y axis.
    * @return {Kiwi.Entity} This entity.
    *
    */
    class Entity implements Kiwi.IChild {
        constructor(state: Kiwi.State, x: number, y: number);
        glRenderer: Kiwi.Renderers.Renderer;
        /**
        * Represents the position, scale, rotation and registration of this Entity.
        * @property transform
        * @type Kiwi.Geom.Transform
        * @public
        */
        transform: Kiwi.Geom.Transform;
        /**
        * The group that this entity belongs to. If added onto the state then this is the state.
        * @property _parent
        * @type Kiwi.Group
        * @private
        */
        private _parent;
        /**
        * The group that this entity belongs to/is a child of once added to one. If added onto the state then this is the state.
        * @property parent
        * @type Group
        * @param val {Kiwi.Group}
        * @public
        */
        parent: Kiwi.Group;
        /**
        * X coordinate of this Entity. This is just aliased to the transform property.
        * @property x
        * @type Number
        * @public
        */
        x: number;
        /**
        * Y coordinate of this Entity. This is just aliased to the transform property.
        * @property y
        * @type Number
        * @public
        */
        y: number;
        /**
        * X coordinate of this Entity in world space; that is, after inheriting parent transforms. This is just aliased to the transform property. Property is READ-ONLY.
        * @property worldX
        * @type number
        * @public
        * @since 1.1.0
        */
        worldX: number;
        /**
        * Y coordinate of this Entity in world space; that is, after inheriting parent transforms. This is just aliased to the transform property. Property is READ-ONLY.
        * @property worldY
        * @type number
        * @public
        * @since 1.1.0
        */
        worldY: number;
        /**
        * Scale X of this Entity. This is just aliased to the transform property.
        * @property scaleX
        * @type Number
        * @public
        */
        scaleX: number;
        /**
        * Scale Y coordinate of this Entity. This is just aliased to the transform property.
        * @property scaleY
        * @type Number
        * @public
        */
        scaleY: number;
        /**
        * Scale both axes of this Entity. This is just aliased to the transform property. This is WRITE-ONLY.
        * @property scale
        * @type number
        * @public
        * @since 1.1.0
        */
        scale: number;
        /**
        * Rotation of this Entity. This is just aliased to the transform property.
        * @property rotation
        * @type Number
        * @public
        */
        rotation: number;
        /**
        * The rotation point on the x-axis. This is just aliased to the rotPointX on the transform object.
        * @property rotPointX
        * @type number
        * @public
        */
        rotPointX: number;
        /**
        * The rotation point on the y-axis. This is just aliased to the rotPointY on the transform object.
        * @property rotPointY
        * @type number
        * @public
        */
        rotPointY: number;
        /**
        * The anchor point on the x-axis. This is just aliased to the rotPointX on the transform object.
        * @property anchorPointX
        * @type number
        * @public
        * @since 1.1.0
        */
        anchorPointX: number;
        /**
        * The anchor point on the y-axis. This is just aliased to the rotPointY on the transform object.
        * @property anchorPointY
        * @type number
        * @public
        * @since 1.1.0
        */
        anchorPointY: number;
        /**
        * Returns the type of child that this is.
        * @type Number
        * @return {Number} returns the type of child that the entity is
        * @public
        */
        childType(): number;
        /**
        * The alpha of this entity.
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
        alpha: number;
        /**
        * A boolean that indicates whether or not this entity is visible or not. Note that is does not get set to false if the alpha is 0.
        * @property _visible
        * @type boolean
        * @default true
        * @private
        */
        private _visible;
        /**
        * Set the visibility of this entity. True or False.
        * @property visible
        * @type boolean
        * @default true
        * @public
        */
        visible: boolean;
        /**
        * The width of the entity in pixels, pre-transform.
        *
        * To obtain the actual width, multiply width by scaleX.
        * @property width
        * @type number
        * @default 0
        * @public
        */
        width: number;
        /**
        * The height of the entity in pixels, pre-transform.
        *
        * To obtain the actual height, multiply height by scaleY.
        * @property height
        * @type number
        * @default 0
        * @public
        */
        height: number;
        /**
        * Scale to desired width, preserving aspect ratio. This function changes the scale, not the width. If the width changes, for example, as part of an animation sequence, the Entity will retain the new scale.
        * @method scaleToWidth
        * @param value {Number} The desired width in pixels.
        * @public
        * @since 1.1.0
        */
        scaleToWidth(value: number): void;
        /**
        * Scale to desired height, preserving aspect ratio. This function changes the scale, not the height. If the height changes, for example, as part of an animation sequence, the Entity will retain the new scale.
        * @method scaleToHeight
        * @param value {Number} The desired height in pixels.
        * @public
        * @since 1.1.0
        */
        scaleToHeight(value: number): void;
        /**
        * Center the anchor point. Moves the anchor point (rotPointX and Y) to precisely halfway along the width and height properties of this Entity.
        * @method centerAnchorPoint
        * @public
        * @since 1.1.0
        */
        centerAnchorPoint(): void;
        /**
        * The texture atlas that is to be used on this entity.
        * @property atlas
        * @type Kiwi.Textures.TextureAtlas
        * @public
        */
        atlas: Kiwi.Textures.TextureAtlas;
        /**
        * Holds the current cell that is being used by the entity.
        * @property _cellIndex
        * @type number
        * @default 0
        * @private
        */
        private _cellIndex;
        /**
        * Used as a reference to a single Cell in the atlas that is to be rendered.
        *
        * E.g. If you had a spritesheet with 3 frames/cells and you wanted the second frame to be displayed you would change this value to 1
        * @property cellIndex
        * @type number
        * @default 0
        * @public
        */
        cellIndex: number;
        /**
        * The Component Manager
        * @property components
        * @type Kiwi.ComponentManager
        * @public
        */
        components: Kiwi.ComponentManager;
        /**
        * The game this Entity belongs to
        * @property game
        * @type Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * The state this Entity belongs to (either the current game state or a persistent world state)
        * @property state
        * @type State
        * @public
        */
        state: Kiwi.State;
        /**
        * A unique identifier for this Entity within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type string
        * @public
        */
        id: string;
        /**
        * A name for this Entity. This is not checked for uniqueness within the Game, but is very useful for debugging
        * @property name
        * @type string
        * @default ''
        * @public
        */
        name: string;
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
        exists: boolean;
        /**
        * Any tags that are on this Entity. This can be used to grab GameObjects or Groups on the whole game which have these particular tags.
        * By default Entitys contain no tags.
        * @property _tags
        * @type Array
        * @since 1.1.0
        * @private
        */
        private _tags;
        /**
        * Adds a new Tag to this Entity. Useful for identifying large amounts of the same type of GameObjects.
        * You can pass multiple strings to add multiple tags.
        * @method addTag
        * @param tag {string} The tag that you would like to add to this Entity.
        * @since 1.1.0
        * @public
        */
        addTag(...args: any[]): void;
        /**
        * Removes a Tag from this Entity.
        * @method removeTag
        * @param tag {string} The tag that you would like to remove from this Entity.
        * @since 1.1.0
        * @public
        */
        removeTag(...args: any[]): void;
        /**
        * Checks to see if this Entity has a Tag based upon a string which you pass.
        * @method hasTag
        * @param tag {string}
        * @since 1.1.0
        * @return {boolean}
        * @public
        */
        hasTag(tag: string): boolean;
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
        active: boolean;
        /**
        * Controls whether render is automatically called by the parent.
        * @property _willRender
        * @type boolean
        * @default true
        * @private
        * @deprecated Use _visible instead
        */
        private _willRender;
        /**
        * Toggles if this Entity will be rendered.
        * @property willRender
        * @type boolean
        * @default true
        * @public
        * @deprecated Use visible instead
        */
        willRender: boolean;
        /**
        * Controls if this Entity is input enabled or not (i.e. responds to touch/mouse events)
        * @property _inputEnabled
        * @type boolean
        * @private
        * @deprecated As of 1.2.3, nothing was found to use this.
        */
        private _inputEnabled;
        /**
        * Controls if this Entity is input enabled or not (i.e. responds to touch/mouse events)
        * This method should be over-ridden to handle specific game object implementations.
        * @property inputEnabled
        * @type boolean
        * @public
        * @deprecated As of 1.2.3, nothing was found to use this.
        */
        inputEnabled: boolean;
        /**
        * The clock that this entity use's for time based calculations. This generated by the state on instatiation.
        * @property _clock
        * @type Kiwi.Clock
        * @private
        */
        private _clock;
        /**
        * The Clock used to update this all of this Entities components (defaults to the Game MasterClock)
        * @property clock
        * @type Kiwi.Time.Clock
        * @public
        */
        clock: Kiwi.Time.Clock;
        /**
        * A value used by components to control if the Entity needs re-rendering
        * @property _dirty
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
        dirty: boolean;
        /**
        * The type of this object.
        * @method objType
        * @return {String} "Entity"
        * @public
        */
        objType(): string;
        /**
        * This isn't called until the Entity has been added to a Group or a State.
        * Note: If added to a Group, who is not 'active' (so the Groups update loop doesn't run) then each member will not execute either.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Renders the entity using the canvas renderer.
        * This isn't called until the Entity has been added to a Group/State which is active.
        * This functionality is handled by the sub classes.
        * @method render
        * @param {Camera} camera
        * @public
        */
        render(camera: Kiwi.Camera): void;
        /**
        * Renders the entity using the canvas renderer.
        * This isn't called until the Entity has been added to a Group/State which is active.
        * This functionality is handled by the sub classes.
        * @method renderGL
        * @param {Kiwi.Camera} camera
        * @param {WebGLRenderingContext} gl
        * @param [params=null] {object} params
        * @public
        */
        renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
        /**
        * Used to completely destroy this entity and of its components.
        * Used for garbage collection and developers can also use it as needed.
        * It is more reliable to use "exists = false", as this will ensure
        * that "destroy" is called at a convenient time.
        * @method destroy
        * @param [immediate=false] {boolean} If the object should be immediately removed or if it should be removed at the end of the next update loop.
        * @public
        */
        destroy(immediate?: boolean): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * The base class that all components extend from. It contains all of the common functionality that is required of every Component.
    * Any object
    *
    * @class Component
    * @namespace Kiwi
    * @constructor
    * @param owner {Object} The object that this component belongs to.
    * @param componentName {String} The name of this component.
    * @return {Kiwi.Component}
    */
    class Component {
        constructor(owner: Kiwi.IChild, name: string);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "Component"
        * @public
        */
        objType(): string;
        /**
        * The object that owns this entity
        * @property owner
        * @type Object
        * @public
        */
        owner: Kiwi.IChild;
        /**
        * The game this Component belongs to
        * @property game
        * @type Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * The name of this component.
        * @property name
        * @type string
        * @public
        */
        name: string;
        /**
        * An active Component is one that has its update method called by its parent.
        * @property active
        * @type boolean
        * @default true
        * @public
        */
        active: boolean;
        /**
        * The state of this component.
        * @property dirty
        * @type boolean
        * @default false
        * @deprecated
        * @public
        */
        dirty: boolean;
        /**
        * Components can preUpdate, that is update before the parent updates. This is to be overriden by subclasses.
        * @method preUpdate
        * @public
        */
        preUpdate(): void;
        /**
        * If the component is being added to a State rather than a Game Object then over-ride its update method to perform required tasks.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Components can postUpdate, that is run an update after the parent has updated. This is to be overriden by subclasses.
        * @method postUpdate
        * @public
        */
        postUpdate(): void;
        /**
        * Destroys this component and all of the properties that exist on it.
        * @method destroy
        * @public
        */
        destroy(): void;
    }
}
/**
*
* @module Kiwi
*
*/
declare module Kiwi {
    /**
    * The group class is central to creating the scene graph that contains all objects in a state. A group can contain entities or other groups, thereby enabling a nested tree scene graph.
    * The members of the Group's coordinates are also in relation to the Group that they were added to. So if you moved an entire Group, each member of that Group would also 'move'.
    *
    * @class Group
    * @namespace Kiwi
    * @constructor
    * @param state {Kiwi.State} The State that this Group is a part of.
    * @param [name=''] {String} The name of this group.
    * @return {Kiwi.Group}
    *
    */
    class Group implements Kiwi.IChild {
        constructor(state: Kiwi.State, name?: string);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "Group"
        * @public
        */
        objType(): string;
        childType(): number;
        /**
        * A name for this Group. This is not checked for uniqueness within the Game, but is very useful for debugging.
        * @property name
        * @type string
        * @default ''
        * @public
        */
        name: string;
        /**
        * The transform object for this group.
        * Transform handles the calculation of coordinates/rotation/scale e.t.c in the Game World.
        * @property transform
        * @type Kiwi.Geom.Transform
        * @public
        */
        transform: Kiwi.Geom.Transform;
        /**
        * The parent group of this group.
        * @property _parent
        * @type Kiwi.Group
        * @private
        */
        private _parent;
        /**
        * Set's the parent of this entity. Note that this also sets the transforms parent of this entity to be the passed groups transform.
        * @property parent
        * @type Kiwi.Group
        * @public
        */
        parent: Kiwi.Group;
        /**
        * The X coordinate of this group. This is just aliased to the transform property.
        * @property x
        * @type Number
        * @public
        */
        x: number;
        /**
        * The Y coordinate of this group. This is just aliased to the transform property.
        * @property y
        * @type Number
        * @public
        */
        y: number;
        /**
        * The X coordinate of this group in world space; that is, after parent transforms. This is just aliased to the transform property. This is READ-ONLY.
        * @property worldX
        * @type number
        * @public
        * @since 1.1.0
        */
        worldX: number;
        /**
        * The Y coordinate of this group in world space; that is, after parent transforms. This is just aliased to the transform property. This is READ-ONLY.
        * @property worldY
        * @type number
        * @public
        * @since 1.1.0
        */
        worldY: number;
        scaleX: number;
        scaleY: number;
        /**
        * The scale of this group. This is just aliased to the transform property. This is WRITE-ONLY.
        * @property scale
        * @type number
        * @public
        * @since 1.1.0
        */
        scale: number;
        rotation: number;
        /**
        * The rotation offset of this group in the X axis. This is just aliased to the transform property.
        * @property rotPointX
        * @type number
        * @public
        * @since 1.1.0
        */
        rotPointX: number;
        /**
        * The rotation offset of this group in the Y axis. This is just aliased to the transform property.
        * @property rotPointY
        * @type number
        * @public
        * @since 1.1.0
        */
        rotPointY: number;
        /**
        * The anchor point offset of this group in the X axis. This is just aliased to the transform property, and is in turn an alias of rotPointX.
        * @property anchorPointX
        * @type number
        * @public
        * @since 1.1.0
        */
        anchorPointX: number;
        /**
        * The anchor point offset of this group in the Y axis. This is just aliased to the transform property, and is in turn an alias of rotPointY.
        * @property anchorPointY
        * @type number
        * @public
        * @since 1.1.0
        */
        anchorPointY: number;
        /**
        * The Component Manager
        * @property components
        * @type Kiwi.ComponentManager
        * @public
        */
        components: Kiwi.ComponentManager;
        /**
        * The game this Group belongs to
        * @property game
        * @type Kiwi.Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * The State that this Group belongs to
        * @property state
        * @type Kiwi.State
        * @public
        **/
        state: Kiwi.State;
        /**
        * A unique identifier for this Group within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type string
        * @public
        */
        id: string;
        /**
        * The collection of children belonging to this group
        * @property members
        * @type Array
        * @public
        */
        members: Kiwi.IChild[];
        /**
        * Returns the total number of children in this Group. Doesn't distinguish between alive and dead children.
        * @method numChildren
        * @return {Number} The number of children in this Group
        * @public
        */
        numChildren(): number;
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
        dirty: boolean;
        /**
        * Checks if the given entity is in this group
        * @method contains
        * @param child {IChild} The IChild that you want to checked.
        * @return {boolean} true if entity exists in group.
        * @public
        */
        contains(child: Kiwi.IChild): boolean;
        /**
        * Checks to see if the given object is contained in this group as a descendant
        * @method containsDescendant
        * @param child {object} The IChild that you want to check.
        * @return {boolean}
        * @public
        */
        containsDescendant(child: Kiwi.IChild): boolean;
        /**
        * Checks to see if one child is an ansector of another child.
        * @method containsAncestor
        * @param descendant {object} The object that you are checking.
        * @param ancestor {Group} The parent (ancestor) that you are checking for.
        * @return {boolean}
        * @public
        */
        containsAncestor(descendant: Kiwi.IChild, ancestor: Kiwi.Group): boolean;
        /**
        * -------------------------
        * Add Children methods
        * -------------------------
        **/
        /**
        * Adds an Entity to this Group. The Entity must not already be in this Group.
        * @method addChild
        * @param child {object} The child to be added.
        * @return {object} The child that was added.
        * @public
        */
        addChild(child: Kiwi.IChild): Kiwi.IChild;
        /**
        * Adds an Entity to this Group in the specific location. The Entity must not already be in this Group and it must be supported by the Group.
        * @method addChildAt
        * @param child {object} The child to be added.
        * @param index {Number} The index the child will be set at.
        * @return {object} The child.
        * @public
        */
        addChildAt(child: Kiwi.IChild, index: number): Kiwi.IChild;
        /**
        * Adds an Entity to this Group before another child.
        * @method addChildBefore
        * @param child {object} The child to be added.
        * @param beforeChild {Entity} The child before which the child will be added.
        * @return {object} The child.
        * @public
        */
        addChildBefore(child: Kiwi.IChild, beforeChild: Kiwi.IChild): Kiwi.IChild;
        /**
        * Adds an Entity to this Group after another child.
        * @method addChildAfter
        * @param child {object} The child to be added.
        * @param beforeChild {object} The child after which the child will be added.
        * @return {object} The child.
        * @public
        */
        addChildAfter(child: Kiwi.IChild, afterChild: Kiwi.IChild): Kiwi.IChild;
        /**
        * --------------------
        * Remove Children Methods
        * --------------------
        **/
        /**
        * Removes an Entity from this Group if it is a child of it.
        * @method removeChild
        * @param child {object} The child to be removed.
        * @param [destroy=false] {boolean} If the entity that gets removed should be destroyed as well.
        * @return {object} The child.
        * @public
        */
        removeChild(child: Kiwi.IChild, destroy?: boolean): Kiwi.IChild;
        /**
        * Removes the Entity from this Group at the given position.
        * @method removeChildAt
        * @param index {Number} The index of the child to be removed.
        * @return {object} The child, or null.
        */
        removeChildAt(index: number): Kiwi.IChild;
        /**
        * Removes all Entities from this Group within the given range.
        * @method removeChildren
        * @param begin {Number} The begining index.
        * @param end {Number} The last index of the range.
        * @param destroy {Number} If the children should be destroyed as well.
        * @return {Number} The number of removed entities.
        * @public
        */
        removeChildren(begin?: number, end?: number, destroy?: boolean): number;
        /**
        * Removes the first Entity from this Group marked as 'alive'
        * @method removeFirstAlive
        * @param [destroy=false] {boolean} If the entity should run the destroy method when it is removed.
        * @return {object} The Entity that was removed from this Group if alive, otherwise null
        * @public
        * @deprecated in v1.1.0
        */
        removeFirstAlive(destroy?: boolean): Kiwi.IChild;
        /**
        * -------------------
        * Get Children Methods
        * -------------------
        **/
        /**
        * Get all children of this Group. By default, this will search the entire sub-graph, including children of children etc.
        * @method getAllChildren
        * @param getGroups {boolean} Optional: Whether to include Groups in the results. When false, will only collect GameObjects.
        * @param destinationArray {Array} Optional: The array in which to store the results.
        * @return {Array}
        * @since 1.1.0
        */
        getAllChildren(getGroups?: boolean, destinationArray?: IChild[]): IChild[];
        /**
        * Get the child at a specific position in this Group by its index.
        * @method getChildAt
        * @param index {Number} The index of the child
        * @return {object} The child, if found or null if not.
        * @public
        */
        getChildAt(index: number): Kiwi.IChild;
        /**
        * Get a child from this Group by its name. By default this will not check sub-groups, but if you supply the correct flag it will check the entire scene graph under this object.
        * @method getChildByName
        * @param name {String} The name of the child.
        * @param recurse {Boolean} Whether to search child groups for the child. Default FALSE.
        * @return {object} The child, if found or null if not.
        * @public
        */
        getChildByName(name: string, recurse?: boolean): Kiwi.IChild;
        /**
        * Get a child from this Group by its UUID. By default this will not check sub-groups, but if you supply the correct flag it will check the entire scene graph under this object.
        * @method getChildByID
        * @param id {String} The ID of the child.
        * @param recurse {Boolean} Whether to search child groups for the child. Default FALSE.
        * @return {object} The child, if found or null if not.
        * @public
        */
        getChildByID(id: string, recurse?: boolean): Kiwi.IChild;
        /**
        * Returns the index position of the Entity or -1 if not found.
        * @method getChildIndex
        * @param child {object} The child.
        * @return {Number} The index of the child or -1 if not found.
        * @public
        */
        getChildIndex(child: Kiwi.IChild): number;
        /**
        * Returns the first Entity from this Group marked as 'alive' or null if no members are alive
        * @method getFirstAlive
        * @return {object}
        * @public
        * @deprecated in v1.1.0
        */
        getFirstAlive(): Kiwi.IChild;
        /**
        * Returns the first member of the Group which is not 'alive', returns null if all members are alive.
        * @method getFirstDead
        * @return {object}
        * @public
        * @deprecated in v1.1.0
        */
        getFirstDead(): Kiwi.IChild;
        /**
        * Returns a member at random from the group.
        * @param {Number}	StartIndex	Optional offset off the front of the array. Default value is 0, or the beginning of the array.
        * @param {Number}	Length		Optional restriction on the number of values you want to randomly select from.
        * @return {object}	A child from the members list.
        * @public
        */
        getRandom(start?: number, length?: number): Kiwi.IChild;
        /**
        * Returns an array of children which contain the tag which is passed.
        * @method getChildrenByTag
        * @param tag {string}
        * @return {Array}
        * @public
        * @since 1.1.0
        */
        getChildrenByTag(tag: string): IChild[];
        /**
        * Returns the first child which contains the tag passed.
        * @method getFirstChildByTag
        * @param tag {String}
        * @return {IChild}
        * @public
        * @since 1.3.0
        */
        getFirstChildByTag(tag: string): IChild;
        /**
        * Returns the last child which contains the tag passed.
        * @method getLastChildByTag
        * @param tag {String}
        * @return {IChild}
        * @public
        * @since 1.3.0
        */
        getLastChildByTag(tag: string): IChild;
        /**
        * --------------------
        * Child Depth Sorting Methods
        * --------------------
        **/
        /**
        * Sets a new position of an existing Entity within the Group.
        * @method setChildIndex
        * @param child {object} The child in this Group to change.
        * @param index {Number} The index for the child to be set at.
        * @return {boolean} true if the Entity was moved to the new position, otherwise false.
        * @public
        */
        setChildIndex(child: Kiwi.IChild, index: number): boolean;
        /**
        * Swaps the position of two existing Entities that are a direct child of this group.
        * @method swapChildren
        * @param child1 {object} The first child in this Group to swap.
        * @param child2 {object} The second child in this Group to swap.
        * @return {boolean} true if the Entities were swapped successfully, otherwise false.
        * @public
        */
        swapChildren(child1: Kiwi.IChild, child2: Kiwi.IChild): boolean;
        /**
        * Swaps the position of two existing Entities within the Group based on their index.
        * @method swapChildrenAt
        * @param index1 {Number} The position of the first Entity in this Group to swap.
        * @param index2 {Number} The position of the second Entity in this Group to swap.
        * @return {boolean} true if the Entities were swapped successfully, otherwise false.
        * @public
        */
        swapChildrenAt(index1: number, index2: number): boolean;
        /**
        * Replaces a child Entity in this Group with a new one.
        * @method replaceChild
        * @param oldChild {object} The Entity in this Group to be removed.
        * @param newChild {object} The new Entity to insert into this Group at the old Entities position.
        * @return {boolean} true if the Entities were replaced successfully, otherwise false.
        * @public
        */
        replaceChild(oldChild: Kiwi.IChild, newChild: Kiwi.IChild): boolean;
        /**
        * Loops through each member in the group and run a method on for each one.
        * @method forEach
        * @param context {any} The context that the callbacks are to have when called.
        * @param callback {any} The callback method to execute on each member.
        * @param [params]* {any} Any extra parameters.
        * @public
        */
        forEach(context: any, callback: any, ...params: any[]): void;
        /**
        * Loop through each member of the groups that is alive.
        * @method forEachAlive
        * @param context {any} The context that the callbacks are to have when called.
        * @param callback {any} The callback method to execute on each member.
        * @param [params]* {any} Any extra parameters.
        * @public
        */
        forEachAlive(context: any, callback: any, ...params: any[]): void;
        /**
        * Sets a property on every member. If componentName is null the property is set on the entity itself, otherwise it is set on the named component. Uses runtime string property lookups. Not optimal for large groups if speed is an issue.
        * @method setAll
        * @param componentName {string} The name of the component to set the property on - set to null to set a property on the entity.
        * @param property {string} The name of the property to set.
        * @param value {any} The value to set the property to.
        * @public
        */
        setAll(componentName: string, property: string, value: any): void;
        /**
        * Calls a function on every member. If componentName is null the function is called on the entity itself, otherwise it is called on the named component. Uses runtime string property lookups. Not optimal for large groups if speed is an issue.
        * @method callAll
        * @param componentName {string} The name of the component to call the function on - set to null to call a function on the entity.
        * @param functionName {string} The name of the function to call.
        * @param args {Array} An array of arguments to pas to the function.
        * @public
        */
        callAll(componentName: string, functionName: string, args?: any[]): void;
        /**
        * The update loop for this group.
        * @method update
        * @public
        */
        update(): void;
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
        exists: boolean;
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
        active: boolean;
        /**
        * The render method that is required by the IChild.
        * This method never gets called as the render is only worried about rendering entities.
        * @method render
        * @param camera {Kiwi.Camera}
        * @public
        * @deprecated
        */
        render(camera: Kiwi.Camera): void;
        /**
        * Returns the number of member which are marked as 'alive'
        * @method countLiving
        * @return {Number}
        * @public
        */
        countLiving(): number;
        /**
        * Returns the number of member which are not marked as 'alive'
        * @method countDead
        * @return {Number}
        * @public
        */
        countDead(): number;
        /**
        * Clear all children from this Group
        * @method clear
        * @public
        */
        clear(): void;
        /**
        * Controls whether render is automatically called by the parent.
        * @property _willRender
        * @type Boolean
        * @private
        * @deprecated Use _visible instead
        */
        private _willRender;
        /**
        * Controls whether render is automatically called by the parent.
        * @property willRender
        * @type boolean
        * @return {boolean}
        * @public
        * @deprecated Use visible instead
        */
        willRender: boolean;
        /**
        * A boolean that indicates whether or not this entity is visible or not. Note that is does not get set to false if the alpha is 0.
        * @property _visible
        * @type boolean
        * @default true
        * @private
        * @since 1.0.1
        */
        private _visible;
        /**
        * Set the visibility of this entity. True or False.
        * @property visible
        * @type boolean
        * @default true
        * @public
        * @since 1.0.1
        */
        visible: boolean;
        /**
        * ---------------
        * Tagging System
        * ---------------
        **/
        /**
        * Any tags that are on this Entity. This can be used to grab GameObjects or Groups on the whole game which have these particular tags.
        * By default Entitys contain no tags.
        * @property _tags
        * @type Array
        * @since 1.1.0
        * @private
        */
        private _tags;
        /**
        * Adds a new Tag to this Entity. Useful for identifying large amounts of the same type of GameObjects.
        * You can pass multiple strings to add multiple tags.
        * @method addTag
        * @param tag {string} The tag that you would like to add to this Entity.
        * @since 1.1.0
        * @public
        */
        addTag(...args: any[]): void;
        /**
        * Removes a Tag from this Entity.
        * @method removeTag
        * @param tag {string} The tag that you would like to remove from this Entity.
        * @since 1.1.0
        * @public
        */
        removeTag(...args: any[]): void;
        /**
        * Checks to see if this Entity has a Tag based upon a string which you pass.
        * @method hasTag
        * @param tag {string}
        * @since 1.1.0
        * @return {boolean}
        * @public
        */
        hasTag(tag: string): boolean;
        /**
        * Removes all children and destroys the Group.
        * @method destroy
        * @param [immediate=false] {boolean} If the object should be immediately removed or if it should be removed at the end of the next update loop.
        * @param [destroyChildren=true] {boolean} If all of the children on the group should also have their destroy methods called.
        * @public
        */
        destroy(immediate?: boolean, destroyChildren?: boolean): void;
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
    * A State in Kiwi.JS is the main class that developers use when wanting to create a Game.
    * States in Kiwi are used keep different sections of a game seperated. So a single game maybe comprised of many different States.
    * Such as one for the menu, in-game, leaderboard, e.t.c.
    * There can only ever be a single State active at a given time.
    *
    * @class State
    * @namespace Kiwi
    * @extends Kiwi.Group
    * @constructor
    * @param name {String} Name of this State. Should be unique to differentiate itself from other States.
    * @return {Kiwi.State}
    */
    class State extends Group {
        constructor(name: string);
        /**
        * Returns the type of object this state is.
        * @method objType
        * @return {String} "State"
        * @public
        */
        objType(): string;
        /**
        * Returns the type of child this is.
        * @method childType
        * @return {Number} Kiwi.GROUP
        * @public
        */
        childType(): number;
        /**
        * The configuration object for this State.
        * @property config
        * @type Kiwi.StateConfig
        * @public
        */
        config: Kiwi.StateConfig;
        /**
        * A reference to the Kiwi.Game that this State belongs to.
        * @property game
        * @type Kiwi.Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * The library that this state use's for the loading of textures.
        * @property textureLibrary
        * @type Kiwi.Textures.TextureLibrary
        * @public
        */
        textureLibrary: Kiwi.Textures.TextureLibrary;
        /**
        * The library that this state use's for the loading of audio.
        * @property audioLibrary
        * @type Kiwi.Sound.AudioLibrary
        * @public
        */
        audioLibrary: Kiwi.Sound.AudioLibrary;
        /**
        * The library that this state use's for the loading of data.
        * @property dataLibrary
        * @type Kiwi.Files.DataLibrary
        * @public
        */
        dataLibrary: Kiwi.Files.DataLibrary;
        /**
        * Holds all of the textures that are avaiable to be accessed once this state has been loaded.
        * E.g. If you loaded a image and named it 'flower', once everything has loaded you can then access the flower image by saying this.textures.flower
        * @property textures
        * @type Object
        * @public
        */
        textures: any;
        /**
        * Holds all of the audio that are avaiable to be accessed once this state has been loaded.
        * E.g. If you loaded a piece of audio and named it 'lazerz', once everything has loaded you can then access the lazers (pew pew) by saying this.audio.lazerz
        * @property audio
        * @type Object
        * @public
        */
        audio: any;
        /**
        * Holds all of the data that are avaiable to be accessed once this state has been loaded.
        * E.g. If you loaded a piece of data and named it 'cookieLocation', once everything has loaded you can then access the cookies by saying this.data.cookieLocation
        * @property data
        * @type Object
        * @public
        */
        data: any;
        /**
        * This method is executed when this State is about to be switched too. This is the first method to be executed, and happens before the Init method.
        * Is called each time a State is switched to.
        * @method boot
        * @public
        */
        boot(): void;
        setType(value: number): void;
        /**
        * Gets executed when the state has been initalised and gets switched to for the first time.
        * This method only ever gets called once and it is before the preload method.
        * Can have parameters passed to it by the previous state that switched to it.
        * @method init
        * @param [values] { Any }
        * @public
        */
        init(...paramsArr: any[]): void;
        /**
        * This method is where you would load of all the assets that are requried for this state or in the entire game.
        *
        * @method preload
        * @public
        */
        preload(): void;
        /**
        * This method is progressively called whilst loading files and is executed each time a file has been loaded.
        * This can be used to create a 'progress' bar during the loading stage of a game.
        * @method loadProgress
        * @param percent {Number} The percent of files that have been loaded so far. This is a number from 0 - 1.
        * @param bytesLoaded {Number} The number of bytes that have been loaded so far.
        * @param file {Kiwi.Files.File} The last file to have been loaded.
        * @public
        */
        loadProgress(percent: number, bytesLoaded: number, file: Kiwi.Files.File): void;
        /**
        * Gets executed when the game is finished loading and it is about to 'create' the state.
        * @method loadComplete
        * @public
        */
        loadComplete(): void;
        /**
        * The game loop that gets executed while the game is loading.
        * @method loadUpdate
        * @public
        */
        loadUpdate(): void;
        /**
        * Is executed once all of the assets have loaded and the game is ready to be 'created'.
        * @method create
        * @param [values]* {Any}
        * @public
        */
        create(...paramsArr: any[]): void;
        /**
        * Is called every frame before the update loop. When overriding make sure you include a super call.
        * @method preUpdate
        * @public
        */
        preUpdate(): void;
        /**
        * The update loop that is executed every frame while the game is 'playing'. When overriding make sure you include a super call too.
        * @method update
        * @public
        */
        update(): void;
        /**
        * The post update loop is executed every frame after the update method.
        * When overriding make sure you include a super call at the end of the method.
        * @method postUpdate
        * @public
        */
        postUpdate(): void;
        /**
        * Called after all of the layers have rendered themselves, useful for debugging.
        * @method postRender
        * @public
        */
        postRender(): void;
        /**
        * Called just before this State is going to be Shut Down and another one is going to be switched too.
        * @method shutDown
        * @public
        */
        shutDown(): void;
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
        addImage(key: string, url: string, storeAsGlobal?: boolean, width?: number, height?: number, offsetX?: number, offsetY?: number): Files.File;
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
        addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, storeAsGlobal?: boolean, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number): Files.TextureFile;
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
        addTextureAtlas(key: string, imageURL: string, jsonID?: string, jsonURL?: string, storeAsGlobal?: boolean): Files.TextureFile;
        /**
        * Adds a json file that is to be loaded when the state gets up to the stage of loading the assets.
        *
        * @method addJSON
        * @param key {string} A key for this json so that you can access it when the loading has finished
        * @param url {string} The location of the JSON file.
        * @param [storeAsGlobal=true] {boolean} If the json should be deleted when switching to another state or if the other states should still be able to access this json.
        * @public
        */
        addJSON(key: string, url: string, storeAsGlobal?: boolean): Files.DataFile;
        /**
        * Adds a new audio file that is to be loaded when the state gets up to the stage of loading the assets.
        *
        * @method addAudio
        * @param key {string} A key for this audio so that you can access it when the loading has finished
        * @param url {string} The location of the audio file. You can pass a array of urls, in which case the first supported filetype will be used.
        * @param [storeAsGlobal=true] {boolean} If the audio should be deleted when switching to another state or if the other states should still be able to access this audio.
        */
        addAudio(key: string, url: any, storeAsGlobal?: boolean): any;
        /**
        * Contains a reference to all of the Objects that have ever been created for this state. Generally Kiwi.Entities or Kiwi.Groups.
        * Useful for keeping track of sprites that are not used any more and need to be destroyed.
        * @property trackingList
        * @type Array
        * @private
        */
        private _trackingList;
        /**
        * Adds a new Objects to the tracking list.
        * This is an INTERNAL Kiwi method and DEVS shouldn't need to worry about it.
        * @method addToTrackingList
        * @param child {Object} The Object which you are adding to the tracking list.
        * @public
        */
        addToTrackingList(child: Kiwi.IChild): void;
        /**
        * Removes a Object from the tracking list. This should only need to happen when a child is being destroyed.
        * This is an INTERNAL Kiwi method and DEVS shouldn't really need to worry about it.
        * @method removeFromTrackingList
        * @param child {Object} The object which is being removed from the tracking list.
        * @public
        */
        removeFromTrackingList(child: Kiwi.IChild): void;
        /**
        * Destroys all of Objects in the tracking list that are not currently on stage.
        * All that currently don't have this STATE as an ancestor.
        * Returns the number of Objects removed.
        * @method destroyUnused
        * @return {Number} The amount of objects removed.
        * @public
        */
        destroyUnused(): number;
        /**
        * Used to mark all Entities that have been created for deletion, regardless of it they are on the stage or not.
        * @method destroy
        * @param [deleteAll=true] If all of the Objects ever created should have the destroy method executed also.
        * @public
        */
        destroy(deleteAll?: boolean): void;
        /**
        * Recursively goes through a child given and runs the destroy method on all that are passed.
        * @method _destroyChildren
        * @param child {Object}
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
    * @param game {Kiwi.Game} The game that this camera belongs to.
    * @param id {Number} A unique ID for this camera
    * @param name {String} The name this camera goes by
    * @param x {Number} The x coordinate of the camera
    * @param y {Number} The y coordinate of the camera
    * @param width {Number} The width of the camera
    * @param height {Number} The cameras height
    * @return {Kiwi.Camera}
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
        width: number;
        /**
        * The height of this camera.
        * @property height
        * @type Number
        * @public
        */
        height: number;
        /**
        * The type of object this is.
        * @method objType
        * @return {String} "Camera"
        * @public
        */
        objType(): string;
        /**
        * If true then the camera will be resized to fit the stage when the stage is resized
        * @property fitToStage
        * @type boolean
        * @default true
        * @public
        */
        fitToStage: boolean;
        /**
        * The Transform controls the location of the camera within the game world. Also controls the cameras scale and rotation.
        * @property transform
        * @type Kiwi.Geom.Transform
        * @public
        */
        transform: Kiwi.Geom.Transform;
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
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * A unique identifier for this Layer within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type number
        * @public
        */
        id: number;
        /**
        * A name for this Camera. This is not checked for uniqueness within the Game, but is very useful for debugging.
        * @property name
        * @type string
        * @public
        */
        name: string;
        /**
        * Controls whether this Camera is rendered
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
        visible: boolean;
        /**
        * A flag that indicates whether this camera needs to be rendered again at the next update loop, or if nothing has changed so it doesn't.
        * @property _dirty
        * @type boolean
        * @private
        * @deprecated As of 1.1.0, no use has been found for this property.
        */
        private _dirty;
        /**
        * A value used by components to control if the camera needs re-rendering.
        * @property dirty
        * @type boolean
        * @public
        * @deprecated As of 1.1.0, no use has been found for this property.
        */
        dirty: boolean;
        /**
        * Convert from screen coordinates to world coordinates.
        * Apply this camera's inverted matrix to an object with x and y
        * properties representing a point and return the transformed point.
        * Useful for calculating coordinates with the mouse.
        * @method transformPoint
        * @param point {Kiwi.Geom.Point}
        * @return {Kiwi.Geom.Point} Transformed clone of the original Point.
        * @public
        */
        transformPoint(point: Kiwi.Geom.Point): Kiwi.Geom.Point;
        /**
        * Convert from world coordinates to screen coordinates.
        * Useful for assessing visibility.
        * Similar to "transformPoint", but in reverse.
        * @method transformPointToScreen
        * @param point {Kiwi.Geom.Point}
        * @return {Kiwi.Geom.Point} Transformed clone of the original Point.
        * @public
        * @since 1.2.0
        */
        transformPointToScreen(point: Kiwi.Geom.Point): Kiwi.Geom.Point;
        /**
        * The update loop that is executed every frame.
        * @method update
        * @public
        */
        update(): void;
        /**
        * The render loop that is executed whilst the game is playing.
        * @method render
        * @public
        */
        render(): void;
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
    * @constructor
    *
    * @author Miller Medeiros, JS Signals
    */
    class Signal {
        /**
        * A list of all of the signal bindings that have been attached.
        * @property _bindings
        * @type Array
        * @private
        */
        private _bindings;
        /**
        *
        * @property _prevParams
        * @type Any
        * @private
        */
        private _prevParams;
        /**
        * Signals Version Number
        * @property VERSION
        * @type String
        * @default '1.0.0'
        * @final
        * @static
        * @public
        */
        static VERSION: string;
        /**
        * If Signal should keep record of previously dispatched parameters.
        * @property memorize
        * @type boolean
        * @default false
        * @public
        */
        memorize: boolean;
        /**
        * If the callbacks should propagate or not.
        * @property _shouldPropagate
        * @type boolean
        * @default true
        * @private
        */
        private _shouldPropagate;
        /**
        * If Signal is active and should broadcast events.
        * Note: Setting this property during a dispatch will only affect the next dispatch,
        * if you want to stop the propagation of a signal use `halt()` instead.
        * @property active
        * @type boolean
        * @default true
        * @public
        */
        active: boolean;
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "Signal"
        * @public
        */
        objType(): string;
        /**
        * Validates a event listener an is used to check to see if it is valid or not.
        * An event listener is not valid if it is not a function.
        * If a event listener is not valid, then a Error is thrown.
        *
        * @method validateListener
        * @param listener {Any} The event listener to be validated.
        * @param fnName {Any} The name of the function.
        * @public
        */
        validateListener(listener: any, fnName: any): void;
        /**
        * Internal Code which handles the registeration of a new callback (known as a "listener").
        * Creates a new SignalBinding for the Signal and then adds the binding to the list by its priority level.
        *
        * @method _registerListener
        * @param listener {Function} The method that is to be dispatched.
        * @param isOnce {boolean} If the method should only be dispatched a single time or not.
        * @param listenerContext {Object} The context that the callback should be executed with when called.
        * @param priority {Number} The priority of this callback when Bindings are dispatched.
        * @return {Kiwi.SignalBinding} The new SignalBinding that was created.
        * @private
        */
        private _registerListener(listener, isOnce, listenerContext, priority);
        /**
        * Handles the process of adding a new SignalBinding to the bindings list by the new Bindings priority.
        *
        * @method _addBinding
        * @param binding {Kiwi.SignalBinding}
        * @private
        */
        private _addBinding(binding);
        /**
        * Returns the index of any Binding which matches the listener and context that is passed.
        * If none match then this method returns -1.
        *
        * @method _indexOfListener
        * @param listener {Function} The method that we are checking to see.
        * @param context {any} The context of the method we are checking.
        * @return {number} The index of listener/context.
        * @private
        */
        private _indexOfListener(listener, context);
        /**
        * Accepts a function and returns a boolean indicating if the function
        * has already been attached to this Signal.
        *
        * @method has
        * @param listener {Function} The method you are checking for.
        * @param [context=null] {Any} The context of the listener.
        * @return {boolean} If this Signal already has the specified listener.
        * @public
        */
        has(listener: any, context?: any): boolean;
        /**
        * Adds a new listener/callback to this Signal.
        * The listener attached will be executed whenever this Signal dispatches an event.
        *
        * @method add
        * @param listener {Function} Signal handler function.
        * @param [listenerContext=null] {Any} Context on which listener will be executed. (object that should represent the `this` variable inside listener function).
        * @param [priority=0] {Number} The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
        * @return {Kiwi.SignalBinding} An Object representing the binding between the Signal and listener.
        * @public
        */
        add(listener: any, listenerContext?: any, priority?: number): SignalBinding;
        /**
        * Add listener to the signal that should be removed after first execution (will be executed only once).
        *
        * @method addOnce
        * @param listener {Function} Signal handler function.
        * @param [listenerContext=null] {Any} Context on which listener will be executed (object that should represent the `this` variable inside listener function).
        * @param [priority=0] {Number} The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
        * @return {Kiwi.SignalBinding} An Object representing the binding between the Signal and listener.
        * @public
        */
        addOnce(listener: any, listenerContext?: any, priority?: number): SignalBinding;
        /**
        * Remove a single listener from the dispatch queue.
        *
        * @method remove
        * @param listener {Function} Handler function that should be removed.
        * @param [context=null] {Any} Execution context (since you can add the same handler multiple times if executing in a different context).
        * @return {Function} Listener handler function.
        * @public
        */
        remove(listener: any, context?: any): any;
        /**
        * Remove all listeners from the Signal.
        * @method removeAll
        * @public
        */
        removeAll(): void;
        /**
        * Returns the number of listeners that have been attached to this Signal.
        *
        * @method getNumListeners
        * @return {number} Number of listeners attached to the Signal.
        * @public
        */
        getNumListeners(): number;
        /**
        * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
        * Note: should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.
        *
        * @method halt
        * @public
        */
        halt(): void;
        /**
        * Resume propagation of the event, resuming the dispatch to next listeners on the queue.
        * Note: should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.
        *
        * @method resume
        * @public
        */
        resume(): void;
        /**
        * Dispatch/Broadcast to all listeners added to this Signal.
        * Parameters passed to this method will also be passed to each handler.
        *
        * @method dispatch
        * @param [params]* {any} Parameters that should be passed to each handler.
        * @public
        */
        dispatch(...paramsArr: any[]): void;
        /**
        * Forget memorized arguments. See the 'memorize' property.
        * @method forget
        * @public
        */
        forget(): void;
        /**
        * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
        * Note: calling any method on the signal instance after calling dispose will throw errors.
        * @method dispose
        * @public
        */
        dispose(): void;
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
    * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
    * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
    *
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
    * @param signal {Kiwi.Signal} Reference to Signal object that listener is currently bound to.
    * @param listener {Function} Handler function bound to the signal.
    * @param isOnce {boolean} If binding should be executed just once.
    * @param [listenerContext] {Object} Context on which listener will be executed (object that should represent the `this` variable inside listener function).
    * @param [priority=0] {Number} The priority level of the event listener. (default = 0).
    * @return {Kiwi.SignalBinding}
    */
    class SignalBinding {
        constructor(signal: Signal, listener: any, isOnce: boolean, listenerContext: any, priority?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "SignalBinding"
        * @public
        */
        objType(): string;
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
        context: any;
        /**
        * Reference to Signal object that listener is currently bound to.
        * @property _signal
        * @type Kiwi.Signal
        * @private
        */
        private _signal;
        /**
        * Listener priority
        * @property priority
        * @type Number
        * @public
        */
        priority: number;
        /**
        * If binding is active and should be executed.
        * @property active
        * @type boolean
        * @default true
        * @public
        */
        active: boolean;
        /**
        * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
        * @property params
        * @type Any
        * @default null
        * @public
        */
        params: any;
        /**
        * Call listener passing arbitrary parameters.
        * If this binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue,
        * this method is used internally for the signal dispatch.
        *
        * @method execute
        * @param [paramsArr]* {Array} Array of parameters that should be passed to the listener
        * @return {*} Value returned by the listener.
        * @public
        */
        execute(paramsArr?: any[]): any;
        /**
        * Detach this binding from the Signal it is attached to.
        * Alias for 'Signal.remove()'
        *
        * @method detach
        * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
        * @public
        */
        detach(): any;
        /**
        * Checks to see if this Binding is still bound to a Signal and contains a listener.
        * @method isBound
        * @return {boolean} `true` if binding is still bound to the signal and have a listener.
        * @public
        */
        isBound(): boolean;
        /**
        * Returns a boolean indicating whether this event will be exectued just once or not.
        * @method isOnce
        * @return {boolean} If SignalBinding will only be executed once.
        * @public
        */
        isOnce(): boolean;
        /**
        * Returns the Handler function bound to the Signal.
        * @method getListener
        * @return {Function} Handler function bound to the signal.
        * @public
        */
        getListener(): any;
        /**
        * Returns the signal which this Binding is currently attached to.
        * @method getSignal
        * @return {Kiwi.Signal} Signal that listener is currently bound to.
        * @public
        */
        getSignal(): Signal;
        /**
        * Delete instance properties
        * @method _destory
        * @public
        */
        _destroy(): void;
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
    * @extends Kiwi.Entity
    * @constructor
    * @param state {Kiwi.State} The state that this sprite belongs to
    * @param atlas {Kiwi.Textures.TextureAtlas} The texture you want to apply to this entity
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
        * @return {string} "Sprite"
        * @public
        */
        objType(): string;
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
        * @type Kiwi.Components.AnimationManager
        * @public
        */
        animation: Kiwi.Components.AnimationManager;
        /**
        * The box component that controls the bounding box around this Game Object
        * @property box
        * @type Kiwi.Components.Box
        * @public
        */
        box: Kiwi.Components.Box;
        /**
        * The Input component controls the user interaction with this Game Object
        * @property input
        * @type Kiwi.Components.Input
        * @public
        */
        input: Kiwi.Components.Input;
        /**
        * Called by parent when its update loop gets executed.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Renders the GameObject using Canvas.
        * @method render
        * @param {Kiwi.Camera} camera
        * @public
        */
        render(camera: Kiwi.Camera): void;
        /**
        * Renders the GameObject using WebGL.
        * @method renderGL
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Camera} camera
        * @param {Object} params
        * @public
        */
        renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
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
    * @extends Kiwi.Entity
    * @constructor
    * @param state {Kiwi.State} The state that this static image belongs to
    * @param atlas {Kiwi.Textures.TextureAtlas} The texture atlas to use as the image.
    * @param [x=0] {Number} Its coordinates on the x axis
    * @param [y=0] {Number} The coordinates on the y axis
    * @return {StaticImage}
    */
    class StaticImage extends Kiwi.Entity {
        constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x?: number, y?: number);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {string} "StaticImage"
        * @public
        */
        objType(): string;
        /**
        * The Bounds component that controls the bounding box around this Game Object
        * @property box
        * @type Kiwi.Components.Box
        * @public
        */
        box: Kiwi.Components.Box;
        /**
        * Called by the Layer to which this Game Object is attached
        * @method render
        * @param {Kiwi.Camara} camera
        * @public
        */
        render(camera: Kiwi.Camera): void;
        /**
        * Renders the GameObject using WebGL.
        * @method renderGL
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Camera} camera
        * @param {Object} params
        * @public
        */
        renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
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
    * TextField is a GameObject that is used when you are wanting to render
    * text onto the current State.
    *
    * TextField has width/height and a hitbox, but because text is difficult
    * to measure, these may not be 100% accurate. It does not have an
    * "Input" component either, although you may choose to add one. Be aware
    * of these limitations.
    *
    * Note that there also exists a "Textfield" object. This is simply a
    * legacy alias of "TextField", which was renamed in v1.2.0 for naming
    * standardization purposes.
    *
    * @class TextField
    * @namespace Kiwi.GameObjects
    * @extends Kiwi.Entity
    * @constructor
    * @param state {Kiwi.State} The state that this TextField belongs to
    * @param text {String} The text that is contained within this textfield.
    * @param [x=0] {Number} The new x coordinate from the Position component
    * @param [y=0] {Number} The new y coordinate from the Position component
    * @param [color="#000000"] {String} The color of the text.
    * @param [size=32] {Number} The size of the text in pixels.
    * @param [weight="normal"] {String} The weight of the text.
    * @param [fontFamily="sans-serif"] {String} The font family that is to be used when rendering.
    * @return {TextField} This Game Object.
    */
    class TextField extends Kiwi.Entity {
        constructor(state: Kiwi.State, text: string, x?: number, y?: number, color?: string, size?: number, weight?: string, fontFamily?: string);
        /**
        * Returns the type of object that this is.
        *
        * Note: This is not camel-cased because of an error in early development.
        * To preserve API compatibility, all 1.x.x releases retail this form.
        * This will be fixed in v2.
        * @method objType
        * @return {string} "Textfield"
        * @public
        */
        objType(): string;
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
        * @default "normal"
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
        * @type Kiwi.Utils.Color
        * @private
        */
        private _fontColor;
        /**
        * The font family that is to be rendered.
        * @property _fontFamily
        * @type string
        * @default "sans-serif"
        * @private
        */
        private _fontFamily;
        /**
        * The alignment of the text. This can either be "left", "right" or "center"
        * @property _textAlign
        * @type string
        * @default "center"
        * @private
        */
        private _textAlign;
        /**
        * The pixel width of the text. Used internally for alignment purposes.
        * @property _alignWidth
        * @type number
        * @default 0
        * @private
        * @since 1.1.0
        */
        private _alignWidth;
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
        text: string;
        /**
        * The color of the font that is contained in this textfield.
        * May be set with a string, or an array of any valid
        * Kiwi.Utils.Color arguments.
        * Returns a hex string prepended with "#".
        * @property color
        * @type string
        * @public
        */
        color: any;
        /**
        * The weight of the font.
        * @property fontWeight
        * @type string
        * @public
        */
        fontWeight: string;
        /**
        * The size on font when being displayed onscreen.
        * @property fontSize
        * @type number
        * @public
        */
        fontSize: number;
        /**
        * The font family that is being used to render the text.
        * @property fontFamily
        * @type string
        * @public
        */
        fontFamily: string;
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
        * Alignment of the text. You can either use the static TEXT_ALIGN constants or pass a string.
        * @property textAlign
        * @type string
        * @public
        */
        textAlign: string;
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
        * @private
        */
        private _tempDirty;
        /**
        * Hitbox component
        * @property box
        * @type Kiwi.Components.Box
        * @public
        * @since 1.2.0
        */
        box: Kiwi.Components.Box;
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
        * @param {Kiwi.Camera}
        * @public
        */
        render(camera: Kiwi.Camera): void;
        /**
        * Renders the GameObject using WebGL.
        * @method renderGL
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Camera} camera
        * @param {Object} params
        * @public
        */
        renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
    }
    var Textfield: typeof TextField;
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
    * @param tilemap {Kiwi.GameObjects.Tilemap.TileMap} The TileMap that this TileType is a part of.
    * @param index {Number} The index of this TileType, which Tiles use when wanting to use this TileType.
    * @param cellIndex {Number} The cell number to use when rendering this Type of Tile.
    * @return {TileType} This TileType
    * @public
    */
    class TileType {
        constructor(tilemap: Kiwi.GameObjects.Tilemap.TileMap, index: number, cellIndex?: number);
        /**
        * The collision information for this type of tile.
        * It's values are the same as the Static properties inside of the ArcadePhysics Component.
        * @property allowCollisions
        * @type number
        * @default NONE
        * @public
        */
        allowCollisions: number;
        /**
        * The properties associated with this type of tile.
        * These are set when loading a JSON file that had properties associated with a TileType.
        * @property properties
        * @type Object
        * @public
        */
        properties: any;
        /**
        * The offset of this tile for rendering purposes.
        * Does not affect regular collision detection.
        *
        * @property offset
        * @type Kiwi.Geom.Point
        * @public
        */
        offset: Kiwi.Geom.Point;
        /**
        * A reference to the tilemap this tile object belongs to.
        * @property tilemap
        * @type Kiwi.GameObjects.Tilemap.TileMap
        * @public
        */
        tilemap: Kiwi.GameObjects.Tilemap.TileMap;
        /**
        * The index of this tile type in the core map data.
        * For example, if your map only has 16 different types of tiles in it, this will be one of those tiles and thus a number between 1 and 16.
        * @property index
        * @type Number
        * @public
        */
        index: number;
        /**
        * A number relating to the cell that should be when rendering a Tile that uses this TileType.
        * A cellIndex of -1 means this type of tile will not be rendered.
        * @property cellIndex
        * @type number
        * @public
        */
        cellIndex: number;
        /**
        * The type of object that it is.
        * @method objType
        * @return {String} "TileType"
        * @public
        */
        objType(): string;
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
    * @param state {Kiwi.State} The state that this Tilemap is on.
    * @param [tileMapDataKey] {String} The Data key for the JSON you would like to use.
    * @param [atlas] {Kiwi.Textures.TextureAtlas} The texture atlas that you would like the tilemap layers to use.
    * @param [startingCell=0] {number} The number for the initial cell that the first TileType should use. See 'createFromFileStore' for more information.
    * @return {TileMap}
    */
    class TileMap {
        constructor(state: Kiwi.State, tileMapData?: any, atlas?: Kiwi.Textures.TextureAtlas, startingCell?: number);
        /**
        * The orientation of the tilemap.
        * Note: This value does not affect the individual layers.
        *
        * @property orientation
        * @type String
        * @public
        */
        orientation: string;
        /**
        * Is an Array containing all of the TileTypes that are available on the TileMap.
        * @property tileTypes
        * @type TileType[]
        * @public
        */
        tileTypes: TileType[];
        /**
        * A list of all of the TileMapLayers that exist on the TileMap.
        * @property layers
        * @type TileMapLayerBase
        * @public
        */
        layers: TileMapLayer[];
        /**
        * The state that this TileMap exists on.
        * @property state
        * @type Kiwi.State
        * @public
        */
        state: Kiwi.State;
        /**
        * The game that this TileMap is a part of.
        * @property game
        * @type Kiwi.Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * The default width of a single tile that a TileMapLayer is told to have upon its creation.
        * @property tileWidth
        * @type Number
        * @default 0
        * @public
        */
        tileWidth: number;
        /**
        * The default height of a single tile that a TileMapLayer is told to have upon its creation.
        * @property tileHeight
        * @type Number
        * @default 0
        * @public
        */
        tileHeight: number;
        /**
        * The default width of all TileMapLayers when they are created.
        * This value is in Tiles.
        * @property width
        * @type Number
        * @default 0
        * @public
        */
        width: number;
        /**
        * The default height of all TileMapLayers when they are created.
        * This value is in Tiles.
        * @property height
        * @type Number
        * @default 0
        * @public
        */
        height: number;
        /**
        * The width of the tilemap in pixels. This value is READ ONLY.
        * @property widthInPixels
        * @type Number
        * @public
        */
        widthInPixels: number;
        /**
        * The height of the tilemap in pixels. This value is READ ONLY.
        * @property heightInPixels
        * @type Number
        * @public
        */
        heightInPixels: number;
        /**
        * Any properties that were found in the JSON during creation.
        * @property properties
        * @type Object
        * @public
        */
        properties: any;
        /**
        * Creates new tilemap layers from a JSON file that you pass (has to be in the Tiled Format).
        * The texture atlas you pass is that one that each TileMapLayer found in the JSON will use, You can change the TextureAtlas afterwards.
        * New TileTypes will automatically be created. The number is based on the Tileset parameter of the JSON.
        * The cell used for new TileTypes will begin at 0 and increment each time a new TileType is created (and a cell exists). Otherwise new TileTypes will start will a cell of -1 (none).
        * @method createFromFileStore
        * @param tileMapData {Any} This can either
        * @param atlas {Kiwi.Textures.TextureAtlas} The texture atlas that you would like the tilemap layers to use.
        * @param [startingCell=0] {number} The number for the initial cell that the first TileType should use. If you pass -1 then no new TileTypes will be created.
        * @public
        */
        createFromFileStore(tileMapData: any, atlas: Kiwi.Textures.TextureAtlas, startingCell?: number): boolean;
        /**
        * Generates new TileTypes based upon the Tileset information that lies inside the Tiled JSON.
        * This is an INTERNAL method, which is used when the createFromFileStore method is executed.
        * @method _generateTypesFromTileset
        * @param tilesetData {Array} The tileset part of the JSON.
        * @param atlas {Kiwi.Textures.TextureAtlas} The Texture atlas which contains the cells that the new TileTypes will use.
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
        setTo(tileWidth: number, tileHeight: number, width: number, height: number): void;
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
        createTileType(cell?: number): TileType;
        /**
        * Creates a new TileType for each cell that you pass.
        * @method createTileTypes
        * @param cells {Number[]} The cells that you want a new TileType created for.
        * @return {TileTypes[]} The TileTypes generated.
        * @public
        */
        createTileTypes(cells: number[]): TileType[];
        /**
        * Used to create a number of TileTypes based starting cell number and how many you want from there.
        * @method createTileTypesByRange
        * @param cellStart {Number} The starting number of the cell.
        * @param range {Number} How many cells (from the starting cell) should be created.
        * @return {TileTypes[]} The TileTypes generated.
        */
        createTileTypesByRange(cellStart: number, range: number): TileType[];
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
        setCell(type: number, cell: number): void;
        /**
        * Changes a range of cellIndexs for Tiles the same range of TileTypes.
        * @method setCellsByRange
        * @param typeStart {number} The starting TileType that is to be modified.
        * @param cellStart {number} The starting cellIndex that the first TileType should have.
        * @param range {number} How many times it should run.
        * @public
        */
        setCellsByRange(typeStart: number, cellStart: number, range: number): void;
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
        * @param atlas {Kiwi.Textures.TextureAtlas} The TextureAtlas that this layer should use.
        * @param data {Number[]} The tile information.
        * @param [w=this.width] {Number} The width of the whole tile map. In Tiles.
        * @param [h=this.height] {Number} The height of the whole tile map. In Tiles.
        * @param [x=0] {Number} The position of the tilemap on the x axis. In pixels.
        * @param [y=0] {Number} The position of the tilemap on the y axis. In pixels.
        * @param [tw=this.tileWidth] {Number} The width of a single tile.
        * @param [th=this.tileHeight] {Number} The height of a single tile.
        * @param [orientation] {String} The orientation of the tilemap. Defaults to the same as this TileMap.
        * @return {TileMapLayer} The TileMapLayer that was created.
        * @public
        */
        createNewLayer(name: string, atlas: Kiwi.Textures.TextureAtlas, data?: number[], w?: number, h?: number, x?: number, y?: number, tw?: number, th?: number, orientation?: string): TileMapLayer;
        /**
        * Eventually will create a new object layer. Currently does nothing.
        * @method createNewObjectLayer
        * @public
        */
        createNewObjectLayer(): void;
        /**
        * Eventually will create a new image layer. Currently does nothing.
        * @method createNewObjectLayer
        * @public
        */
        createNewImageLayer(): void;
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
        getLayerByName(name: string): TileMapLayer;
        /**
        * Returns the layer with the number associated with it in the layers array.
        * @method getLayer
        * @param num {Number} Number of the Layer you would like to get.
        * @return {TileMapLayer}
        * @public
        */
        getLayer(num: number): TileMapLayer;
        /**
        * The type of object that it is.
        * @method objType
        * @return {String} "TileMap"
        * @public
        */
        objType(): string;
    }
    var ISOMETRIC: string;
    var ORTHOGONAL: string;
}
/**
*
* @module GameObjects
* @submodule Tilemap
*
*/
declare module Kiwi.GameObjects.Tilemap {
    /**
    * GameObject containing the core functionality for every type of tilemap layer that can be generated.
    * This class should not be directly used. Classes extending this should be used instead.
    *
    * @class TileMapLayer
    * @extends Kiwi.Entity
    * @namespace Kiwi.GameObjects.Tilemap
    * @since 1.3.0
    * @constructor
    * @param tilemap {Kiwi.GameObjects.Tilemap.TileMap} The TileMap that this layer belongs to.
    * @param name {String} The name of this TileMapLayer.
    * @param atlas {Kiwi.Textures.TextureAtlas} The texture atlas that should be used when rendering this TileMapLayer onscreen.
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
        constructor(tilemap: Kiwi.GameObjects.Tilemap.TileMap, name: string, atlas: Kiwi.Textures.TextureAtlas, data: number[], tw: number, th: number, x?: number, y?: number, w?: number, h?: number);
        /**
        * The physics component contained on the Tilemap. Use for basic collisions between People and Tiles.
        * Note: That tilemap layers a immovable and collisions with tiles are set on the individual TileTypes that are contained on the TileMap.
        * @property physics
        * @type ArcadePhysics
        * @public
        */
        physics: Kiwi.Components.ArcadePhysics;
        /**
        * Returns the type of child that this is.
        * @type Number
        * @return {Number} returns the type of child that the entity is
        * @public
        */
        childType(): number;
        /**
        * The type of object that it is.
        * @method objType
        * @return {String} "TileMapLayer"
        * @public
        */
        objType(): string;
        /**
        * The tilemap that this TileMapLayer is a part of.
        * @property tilemap
        * @type TileMap
        * @public
        */
        tilemap: Kiwi.GameObjects.Tilemap.TileMap;
        /**
        * Properties about that this TileMapLayer has when it was created from a JSON file.
        * @property properties
        * @type Object
        * @public
        */
        properties: any;
        /**
        * The width of this TileMap in tiles.
        * @property width
        * @type Number
        * @public
        */
        width: number;
        /**
        * The height of this TileMap in tiles.
        * @property height
        * @type Number
        * @public
        */
        height: number;
        /**
        * The width of a single tile.
        * @property tileWidth
        * @type Number
        * @public
        */
        tileWidth: number;
        /**
        * The height of a single tile.
        * @property tileHeight
        * @type Number
        * @public
        */
        tileHeight: number;
        /**
        * The texture atlas that should be used when rendering.
        * @property atlas
        * @type Kiwi.Textures.TextureAtlas
        * @public
        */
        atlas: Kiwi.Textures.TextureAtlas;
        /**
        * The width of the layer in pixels. This property is READ ONLY.
        * @property widthInPixels
        * @type number
        * @public
        */
        widthInPixels: number;
        /**
        * The height of the layer in pixels. This property is READ ONLY.
        * @property heightInPixels
        * @type number
        * @public
        */
        heightInPixels: number;
        /**
        * Override function to prevent unwanted inherited behaviour. Do not call.
        * Because TileMapLayer extends Entity, it has a cellIndex parameter.
        * However, it does not use a single atlas index, so this parameter is meaningless. It has deliberately been set to do nothing.
        *
        * @property cellIndex
        * @type number
        * @public
        * @deprecated Not functional on this object.
        * @since 1.1.0
        */
        cellIndex: number;
        /**
        * Scales the tilemap to the value passed.
        * @method scaleToWidth
        * @param value {Number}
        * @public
        */
        scaleToWidth(value: number): void;
        /**
        * Scales the tilemaps to the value passed.
        * @method scaleToHeight
        * @param value {Number}
        * @public
        */
        scaleToHeight(value: number): void;
        /**
        * Centers the anchor point to the middle of the width/height of the tilemap.
        * @method centerAnchorPoint
        * @public
        */
        centerAnchorPoint(): void;
        /**
        * A list containing all the types of tiles found on this TileMapLayer.
        * @property _data
        * @type Array
        * @protected
        */
        protected _data: number[];
        /**
        * READ ONLY: Returns the raw data for this tilemap.
        * @property data
        * @type Array
        * @readOnly
        * @public
        * @since 1.3.0
        */
        data: number[];
        /**
        * READ ONLY: A list containing all of the types of tiles found on this TileMapLayer.
        * Same as the `data` property.
        *
        * @property tileData
        * @type Array
        * @readOnly
        * @public
        */
        tileData: number[];
        /**
        * Returns the total number of tiles. Either for a particular type if passed, otherwise of any type if not passed.
        * @method countTiles
        * @param [type] {Number} The type of tile you want to count.
        * @return {Number} The number of tiles on this layer.
        * @public
        */
        countTiles(type?: number): number;
        /**
        * The orientation of the of tilemap.
        * TileMaps can be either 'orthogonal' (normal) or 'isometric'.
        * @property orientation
        * @type String
        * @public
        */
        orientation: string;
        /**
        *-----------------------
        * Getting Tiles
        *-----------------------
        */
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
        getIndexFromXY(x: number, y: number): number;
        /**
        * Returns the TileType for a tile that is at a particular set of coordinates passed.
        * If no tile is found the null is returned instead.
        * Coordinates passed are in tiles.
        * @method getTileFromXY
        * @param x {Number}
        * @param y {Number}
        * @return {Kiwi.GameObjects.Tilemap.TileType}
        * @public
        */
        getTileFromXY(x: number, y: number): TileType;
        /**
        * Returns the indexes of every tile of a type you pass.
        * @method getIndexsByType
        * @param type {Number}
        * @return {Number[]}
        * @public
        */
        getIndexesByType(type: number): number[];
        /**
        * Returns the TileType of a tile by an index passed.
        * Thanks to @rydairegames
        *
        * @method getTileFromIndex
        * @param index {Number}
        * @return {Kiwi.GameObjects.Tilemap.TileType}
        * @public
        */
        getTileFromIndex(index: number): TileType;
        /**
        * Returns the index of the tile based on the x and y pixel coordinates that are passed.
        * If no tile is a the coordinates given then -1 is returned instead.
        * Coordinates are in pixels not tiles and use the world coordinates of the tilemap.
        *
        * Functionality needs to be added by classes extending this class.
        *
        * @method getIndexFromCoords
        * @param x {Number} The x coordinate of the Tile you would like to retrieve.
        * @param y {Number} The y coordinate of the Tile you would like to retrieve.
        * @return {Number} Either the index of the tile retrieved or -1 if none was found.
        * @public
        */
        getIndexFromCoords(x: number, y: number): number;
        /**
        * Returns the TileType for a tile that is at a particular coordinate passed.
        * If no tile is found then null is returned instead.
        * Coordinates passed are in pixels and use the world coordinates of the tilemap.
        *
        * @method getTileFromCoords
        * @param x {Number}
        * @param y {Number}
        * @return {Kiwi.GameObjects.Tilemap.TileType}
        * @public
        */
        getTileFromCoords(x: number, y: number): TileType;
        /**
        *-----------------------
        * Tiles Manipulation
        *-----------------------
        */
        /**
        * Sets the tile to be used at the coordinates provided.
        * Can be used to override a tile that may already exist at the location.
        * @method setTile
        * @param x {Number} The coordinate of the tile on the x axis.
        * @param y {Number} The coordinate of the tile on the y axis.
        * @param tileType {Number} The type of tile that should be now used.
        * @return {Boolean} If a tile was changed or not.
        * @public
        */
        setTile(x: number, y: number, tileType: number): boolean;
        /**
        * Sets the tile to be used at the index provided.
        * Can be used to override a tile that may already exist at the location.
        * @method setTileByIndex
        * @param index {Number} The index of the tile that you want to change.
        * @param tileType {Number} The new tile type to be used at that position.
        * @public
        */
        setTileByIndex(index: number, tileType: number): void;
        /**
        * Randomizes the types of tiles used in an area of the layer. You can choose which types of tiles to use, and the area.
        * Default tile types used are everyone avaiable.
        * @method randomizeTiles
        * @param [types] {Number[]} A list of TileTypes that can be used. Default is every tiletype on the TileMap.
        * @param [x=0] {Number} The starting tile on the x axis to fill.
        * @param [y=0] {Number} The starting tile on the y axis to fill.
        * @param [width=this.width] {Number} How far across you want to go.
        * @param [height=this.height] {Number} How far down you want to go.
        * @public
        */
        randomizeTiles(types?: number[], x?: number, y?: number, width?: number, height?: number): void;
        /**
        * Makes all of the tiles in the area specified a single type that is passed.
        * @method fill
        * @param type {Number} The type of tile you want to fill in the area with.
        * @param [x=0] {Number} The starting tile on the x axis to fill.
        * @param [y=0] {Number} The starting tile on the y axis to fill.
        * @param [width=this.width] {Number} How far across you want to go.
        * @param [height=this.height] {Number} How far down you want to go.
        * @public
        */
        fill(type: number, x?: number, y?: number, width?: number, height?: number): void;
        /**
        * Replaces all tiles of typeA to typeB in the area specified. If no area is specified then it is on the whole layer.
        * @method replaceTiles
        * @param typeA {Number} The type of tile you want to be replaced.
        * @param typeB {Number} The type of tile you want to be used instead.
        * @param [x=0] {Number} The starting tile on the x axis to fill.
        * @param [y=0] {Number} The starting tile on the y axis to fill.
        * @param [width=this.width] {Number} How far across you want to go.
        * @param [height=this.height] {Number} How far down you want to go.
        * @public
        */
        replaceTiles(typeA: number, typeB: number, x?: number, y?: number, width?: number, height?: number): void;
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
        swapTiles(typeA: number, typeB: number, x?: number, y?: number, width?: number, height?: number): void;
        /**
        *-----------------------
        * Get Tiles By Collision Methods
        *-----------------------
        */
        /**
        * Returns the tiles which overlap with a provided entities hitbox component.
        * Only collidable tiles on ANY side will be returned unless you pass a particular side.
        * Note: Classes extending this class need to
        *
        * @method getOverlappingTiles
        * @param entity {Kiwi.Entity} The entity you would like to check for the overlap.
        * @param [collisionType=ANY] {Number} The particular type of collidable tiles which you would like to check for.
        * @return {Object[]} Returns an Array of Objects containing information about the tiles which were found. Index/X/Y information is contained within each Object.
        * @public
        */
        getOverlappingTiles(entity: Kiwi.Entity, collisionType?: number): any;
        /**
        * Returns the tiles which can collide with other objects (on ANY side unless otherwise specified) within an area provided.
        * By default the area is the whole tilemap.
        *
        * @method getCollidableTiles
        * @param [x=0] {Number} The x coordinate of the first tile to check.
        * @param [y=0] {Number} The y coordinate of the first tile to check.
        * @param [width=widthOfMap] {Number} The width from the x coordinate.
        * @param [height=heightOfmap] {Number} The height from the y coordinate.
        * @param [collisionType=ANY] {Number} The type of collidable tiles that should be return. By default ANY type of collidable tiles will be returned.
        * @return {Object[]} Returns an Array of Objects containing information about the tiles which were found. Index/X/Y information is contained within each Object.
        * @public
        */
        getCollidableTiles(x?: number, y?: number, width?: number, height?: number, collisionType?: number): any;
        /**
        * The update loop that is executed when this TileMapLayer is add to the Stage.
        * @method update
        * @public
        */
        update(): void;
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
        * @protected
        */
        protected _maxX: number;
        /**
        * Used whilst rendering to calculate the number of tiles to be rendered on the Y axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _maxY
        * @type number
        * @protected
        */
        protected _maxY: number;
        /**
        * Used whilst rendering to calculate which is the first tile to be rendered on the X axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _startX
        * @type number
        * @protected
        */
        protected _startX: number;
        /**
        * Used whilst rendering to calculate which is the first tile to be rendered on the Y axis.
        * Is updated each frame, via the _calculateBoundaries method.
        * @property _startY
        * @type number
        * @protected
        */
        protected _startY: number;
        /**
        * Temporary property that holds the tileType of the current tile being rendered.
        * @property _temptype
        * @type TileType
        * @protected
        */
        protected _temptype: TileType;
        /**
        * Corner values used internally.
        * @property corner1
        * @type {Kiwi.Geom.Point}
        * @protected
        * @since 1.1.0
        */
        protected _corner1: Kiwi.Geom.Point;
        /**
        * Corner values used internally.
        * @property corner2
        * @type {Kiwi.Geom.Point}
        * @protected
        * @since 1.1.0
        */
        protected _corner2: Kiwi.Geom.Point;
        /**
        * Corner values used internally.
        * @property corner3
        * @type {Kiwi.Geom.Point}
        * @protected
        * @since 1.1.0
        */
        protected _corner3: Kiwi.Geom.Point;
        /**
        * Corner values used internally.
        * @property corner4
        * @type {Kiwi.Geom.Point}
        * @protected
        * @since 1.1.0
        */
        protected _corner4: Kiwi.Geom.Point;
        /**
        * Used to calculate the position of the tilemap on the stage as well as how many tiles can fit on the screen.
        * All coordinates calculated are stored as temporary properties (maxX/Y, startX/Y).
        *
        * @method _calculateBoundaries
        * @param camera {Camera}
        * @param matrix {Matrix}
        * @protected
        */
        protected _calculateBoundaries(camera: Kiwi.Camera, matrix: Kiwi.Geom.Matrix): void;
        /**
        * The render loop which is used when using the Canvas renderer.
        * @method render
        * @param camera {Camera}
        * @public
        */
        render(camera: Kiwi.Camera): void;
        renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
        /**
        * Deprecated on the TileMapLayer class since it is for 'Isometric' maps only.
        *
        * @method chartToScreen
        * @param chartPt {any} A Object containing x/y properties of the tile.
        * @param [tileW] {Number} The width of the tile
        * @param [tileH] {Number} The height of the tile
        * @return {Object} With x/y properties of the location of the map onscreen.
        * @deprecated
        * @since 1.3.0
        * @public
        */
        chartToScreen(chartPt: any, tileW?: number, tileH?: number): any;
        /**
        * Deprecated on the TileMapLayer class since it is for 'Isometric' maps only.
        *
        * @method screenToChart
        * @param scrPt {any} An object containing x/y coordinates of the point on the screen you want to convert to tile coordinates.
        * @param [tileW] {Number} The width of a single tile.
        * @param [tileH] {Number} The height of a single tile.
        * @return {Object} With x/y properties of the location of tile on the screen.
        * @deprecated
        * @since 1.3.0
        * @public
        */
        screenToChart(scrPt: any, tileW?: number, tileH?: number): any;
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
    * Contains the code for managing and rendering Orthogonal types of TileMaps.
    * This class should not be directly created, but instead should be created via methods on the TileMap class.
    *
    * @class TileMapLayerOrthogonal
    * @extends Kiwi.GameObjects.Tilemap.TileMapLayer
    * @namespace Kiwi.GameObjects.Tilemap
    * @since 1.3.0
    * @constructor
    * @param tilemap {Kiwi.GameObjects.Tilemap.TileMap} The TileMap that this layer belongs to.
    * @param name {String} The name of this TileMapLayer.
    * @param atlas {Kiwi.Textures.TextureAtlas} The texture atlas that should be used when rendering this TileMapLayer onscreen.
    * @param data {Number[]} The information about the tiles.
    * @param tw {Number} The width of a single tile in pixels. Usually the same as the TileMap unless told otherwise.
    * @param th {Number} The height of a single tile in pixels. Usually the same as the TileMap unless told otherwise.
    * @param [x=0] {Number} The x coordinate of the tilemap in pixels.
    * @param [y=0] {Number} The y coordinate of the tilemap in pixels.
    * @param [w=0] {Number} The width of the whole tilemap in tiles. Usually the same as the TileMap unless told otherwise.
    * @param [h=0] {Number} The height of the whole tilemap in tiles. Usually the same as the TileMap unless told otherwise.
    * @return {TileMapLayer}
    */
    class TileMapLayerOrthogonal extends TileMapLayer {
        constructor(tilemap: Kiwi.GameObjects.Tilemap.TileMap, name: string, atlas: Kiwi.Textures.TextureAtlas, data: number[], tw: number, th: number, x?: number, y?: number, w?: number, h?: number);
        /**
        * The type of object that it is.
        * @method objType
        * @return {String} "TileMapLayer"
        * @public
        */
        objType(): string;
        /**
        * The orientation of the of tilemap.
        * TileMaps can be either 'orthogonal' (normal) or 'isometric'.
        * @property orientation
        * @type String
        * @default 'orthogonal'
        * @public
        */
        orientation: string;
        /**
        * Returns the index of the tile based on the x and y pixel coordinates that are passed.
        * If no tile is a the coordinates given then -1 is returned instead.
        * Coordinates are in pixels not tiles and use the world coordinates of the tilemap.
        *
        * @method getIndexFromCoords
        * @param x {Number} The x coordinate of the Tile you would like to retrieve.
        * @param y {Number} The y coordinate of the Tile you would like to retrieve.
        * @return {Number} Either the index of the tile retrieved or -1 if none was found.
        * @public
        */
        getIndexFromCoords(x: number, y: number): number;
        /**
        * Returns the tiles which overlap with a provided entities hitbox component.
        * Only collidable tiles on ANY side will be returned unless you pass a particular side.
        *
        * @method getOverlappingTiles
        * @param entity {Kiwi.Entity} The entity you would like to check for the overlap.
        * @param [collisionType=ANY] {Number} The particular type of collidable tiles which you would like to check for.
        * @return {Object[]} Returns an Array of Objects containing information about the tiles which were found. Index/X/Y information is contained within each Object.
        * @public
        */
        getOverlappingTiles(entity: Kiwi.Entity, collisionType?: number): any;
        /**
        * Used to calculate the position of the tilemap on the stage as well as how many tiles can fit on the screen.
        * All coordinates calculated are stored as temporary properties (maxX/Y, startX/Y).
        *
        * @method _calculateBoundaries
        * @param camera {Camera}
        * @param matrix {Matrix}
        * @protected
        */
        protected _calculateBoundaries(camera: Kiwi.Camera, matrix: Kiwi.Geom.Matrix): void;
        /**
        * The render loop which is used when using the Canvas renderer.
        * @method render
        * @param camera {Camera}
        * @public
        */
        render(camera: Kiwi.Camera): boolean;
        renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
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
    * Contains the code for managing and rendering Isometric types of TileMaps.
    * This class should not be directly created, but instead should be created via methods on the TileMap class.
    *
    *
    * @class TileMapLayerIsometric
    * @extends Kiwi.GameObjects.Tilemap.TileMapLayer
    * @namespace Kiwi.GameObjects.Tilemap
    * @since 1.3.0
    * @constructor
    * @param tilemap {Kiwi.GameObjects.Tilemap.TileMap} The TileMap that this layer belongs to.
    * @param name {String} The name of this TileMapLayer.
    * @param atlas {Kiwi.Textures.TextureAtlas} The texture atlas that should be used when rendering this TileMapLayer onscreen.
    * @param data {Number[]} The information about the tiles.
    * @param tw {Number} The width of a single tile in pixels. Usually the same as the TileMap unless told otherwise.
    * @param th {Number} The height of a single tile in pixels. Usually the same as the TileMap unless told otherwise.
    * @param [x=0] {Number} The x coordinate of the tilemap in pixels.
    * @param [y=0] {Number} The y coordinate of the tilemap in pixels.
    * @param [w=0] {Number} The width of the whole tilemap in tiles. Usually the same as the TileMap unless told otherwise.
    * @param [h=0] {Number} The height of the whole tilemap in tiles. Usually the same as the TileMap unless told otherwise.
    * @return {TileMapLayer}
    */
    class TileMapLayerIsometric extends TileMapLayer {
        constructor(tilemap: Kiwi.GameObjects.Tilemap.TileMap, name: string, atlas: Kiwi.Textures.TextureAtlas, data: number[], tw: number, th: number, x?: number, y?: number, w?: number, h?: number);
        /**
        * The type of object that it is.
        * @method objType
        * @return {String} "TileMapLayer"
        * @public
        */
        objType(): string;
        /**
        * The orientation of the of tilemap.
        * TileMaps can be either 'orthogonal' (normal) or 'isometric'.
        * @property orientation
        * @type String
        * @default 'isometric'
        * @public
        */
        orientation: string;
        /**
        * Returns the index of the tile based on the x and y pixel coordinates that are passed.
        * If no tile is a the coordinates given then -1 is returned instead.
        * Coordinates are in pixels not tiles and use the world coordinates of the tilemap.
        *
        * Functionality needs to be added by classes extending this class.
        *
        * @method getIndexFromCoords
        * @param x {Number} The x coordinate of the Tile you would like to retrieve.
        * @param y {Number} The y coordinate of the Tile you would like to retrieve.
        * @return {Number} Either the index of the tile retrieved or -1 if none was found.
        * @public
        */
        getIndexFromCoords(x: number, y: number): number;
        /**
        * ChartToScreen maps a point in the game tile coordinates into screen pixel
        * coordinates that indicate where the tile should be drawn.
        *
        * @method chartToScreen
        * @param chartPt {any} A Object containing x/y properties of the tile.
        * @param [tileW] {Number} The width of the tile
        * @param [tileH] {Number} The height of the tile
        * @return {Object} With x/y properties of the location of the map onscreen.
        * @public
        */
        chartToScreen(chartPt: any, tileW?: number, tileH?: number): any;
        /**
        * ScreenToChart maps a point in screen coordinates into the game tile chart
        * coordinates for the tile on which the screen point falls on.
        *
        * @method screenToChart
        * @param scrPt {any} An object containing x/y coordinates of the point on the screen you want to convert to tile coordinates.
        * @param [tileW] {Number} The width of a single tile.
        * @param [tileH] {Number} The height of a single tile.
        * @return {Object} With x/y properties of the location of tile on the screen.
        * @public
        */
        screenToChart(scrPt: any, tileW?: number, tileH?: number): any;
        /**
        * The render loop which is used when using the Canvas renderer.
        * @method render
        * @param camera {Camera}
        * @public
        */
        render(camera: Kiwi.Camera): boolean;
        renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params?: any): void;
    }
}
/**
* Component's are a snipnets of code which are designed to provide extra functionality to various objects that contain a ComponentManager. Objects do not have to have Components in order to preform their main function, but are instead provided to make common task's that you may want to do with those Objects a bit easier. For example: Some times you would like to easily listen for when a GameObject has been 'clicked'. So you can attach a 'InputComponent' to a GameObject (Sprites have them by default) which will then do hit-detector code for you. All you have to do is Subscribe to the events on the InputComponent.
*
* @module Kiwi
* @submodule Components
* @main Components
*/
declare module Kiwi.Components {
    /**
    * The AnimationManager is used to handle the creation and use of spritesheet Animations on a GameObject based on the TextureAtlas it has.
    * If the When the AnimationManager is instantiated it will loop through all of the Sequences on the TextureAtlas of the GameObject being used and will create a new Animation for each one.
    * Now when you create a new Animation that animation will automatically be added as a new Sequence to the corresponding Texture.
    * This way you don't need to create new Animations for a each Sprite that use's the same Texture.
    *
    * @class AnimationManager
    * @extends Kiwi.Component
    * @namespace Kiwi.Components
    * @constructor
    * @param entity {Kiwi.Entity} The entity that this animation component belongs to.
    * @param [inheritSequences=true] {Boolean} If a new Animation should be created for each Sequence on the Entities TextureAtlas it is a part of or not.
    * @return {Kiwi.Components.AnimationManager}
    */
    class AnimationManager extends Component {
        constructor(entity: Kiwi.Entity, inheritSequences?: boolean);
        /**
        * Dispatches callbacks each time an animation is told to play through this AnimationManager.
        * Functions dispatched from this signal have ONE Parameter.
        * One - The Animation object of that is now playing.
        * @property onPlay
        * @type Kiwi.Signal
        * @public
        */
        onPlay: Kiwi.Signal;
        /**
        * Dispatches callbacks each time an animation stops.
        * Functions dispatched from this signal have ONE parameter.
        * One - The current animation.
        * @property onStop
        * @type Kiwi.Signal
        * @public
        */
        onStop: Kiwi.Signal;
        /**
        * Dispatches callbacks each time the cell of the Sprite this AnimationManager belongs to updates/changes.
        * Note: This method will be dispatching events EVERY time the cell changes, so this will include when changing/switching animations.
        * @property onUpdate
        * @type Kiwi.Signal
        * @public
        */
        onUpdate: Kiwi.Signal;
        /**
        * Dispatches callbacks each time the current animation is switched NOT when the cells of a animation change.
        * Function's dispatched from this event have TWO parameters,
        * One - Name of the animation switched to.
        * Two - The Animation object that is now the current.
        * @property onChange
        * @type Kiwi.Signal
        * @public
        */
        onChange: Kiwi.Signal;
        /**
        * The entity that this animation belongs to and thus is effecting.
        * @property entity
        * @type Kiwi.Entity
        * @public
        */
        entity: Kiwi.Entity;
        /**
        * The texture atlas that this animation is taking effect on.
        * The value of this should be the same as the Entity.
        * @property _atlas
        * @type Kiwi.Textures.TextureAtlas
        * @private
        */
        private _atlas;
        /**
        * A Object containing all of the animations that are avaiable to be used.
        * @property _animations
        * @type Object
        * @private
        */
        private _animations;
        /**
        * A reference to the animation that is currently being played.
        * @property currentAnimation
        * @type Kiwi.Animations.Animation
        * @public
        */
        currentAnimation: Kiwi.Animations.Animation;
        /**
        * Returns a boolean indicating whether or not the current animation is playing. This is READ ONLY.
        * @property isPlaying
        * @type boolean
        * @public
        */
        isPlaying: boolean;
        /**
        * Returns a string indicating the type of object that this is.
        * @method objType
        * @return {String} "AnimationManager"
        * @public
        */
        objType(): string;
        /**
        * Creates a new Animation (by creating a Sequence) that can then be played on this AnimationManager.
        * If you pass to this the name of a Animation that already exists, then the previous Animation will be overridden by this new one.
        * Note: If the Animation you have overridden was the currentAnimation, then the previous Animation will keep playing until a different Animation is switched to.
        * By default new Animation Sequences are also added to the TextureAtlas, which can then be inherited.
        * Returns the Animation that was created.
        *
        * @method add
        * @param name {string} The name of the animation that is to be created.
        * @param cells {Array} An array of numbers, which are reference to each cell that is to be played in the Animation in order.
        * @param speed {number} The amount of time that each cell in the Animation should stay on screen for. In seconds.
        * @param [loop=false] {boolean} If when the Animation reaches the last frame, it should go back to the start again.
        * @param [play=false] {boolean} If once created the animation should played right away.
        * @param [addToAtlas=true] {boolean} If the new Sequence created should be added to the TextureAtlas or not.
        * @return {Kiwi.Animations.Animation} The Animation that was created.
        * @public
        */
        add(name: string, cells: number[], speed: number, loop?: boolean, play?: boolean, addToAtlas?: boolean): Kiwi.Animations.Animation;
        /**
        * Creates a new Animation based on a Sequence that is passed.
        * If you pass to this the name of a Animation that already exists, then the previous Animation will be overridden by this new one.
        * Note: If the Animation you have overridden was the currentAnimation, then the previous Animation will keep playing until a different Animation is switched to.
        * Returns the Animation that was created.
        *
        * @method createFromSequence
        * @param sequence {Kiwi.Sequence} The sequence that the Animation is based on.
        * @param [play=false] {boolean} If the Animation should played once it has been created
        * @return {Kiwi.Animations.Animation} The Animation that was created.
        * @public
        */
        createFromSequence(sequence: Kiwi.Animations.Sequence, play?: boolean): Kiwi.Animations.Animation;
        /**
        * Plays either the current animation or the name of the animation that you pass.
        *
        * @method play
        * @param [name] {String} The name of the animation that you want to play. If not passed it plays the current animation.
        * @param [resetTime=true] {Boolean} When set to false, this will prevent a new Animation from playing if it is already the currentAnimation that is already playing.
        * @return {Kiwi.Animations.Animation} Returns the current Animation that is now playing.
        * @public
        */
        play(name?: string, resetTime?: boolean): Kiwi.Animations.Animation;
        /**
        * Plays an Animation at a particular frameIndex.
        * Note: The frameIndex is a particular index of a cell in the Sequence of the Animation you would like to play.
        * Example: If you had a Animation with a Sequence [0, 1, 2, 3] and you told it to play at index '2', then the cell that it would be at is '3'.
        *
        * @method playAt
        * @param index {Number} The index of the frame in the Sequence that you would like to play.
        * @param [name] {String} The name of the animation that you want to play. If not passed, it attempts to play it on the current animation.
        * @return {Kiwi.Animations.Animation} Returns the current Animation that is now playing.
        * @public
        */
        playAt(index: number, name?: string): Kiwi.Animations.Animation;
        /**
        * An internal method used to actually play a Animation at a Index.
        *
        * @method _play
        * @param name {string} The name of the animation that is to be switched to.
        * @param [index=null] {number} The index of the frame in the Sequence that is to play. If null, then it restarts the animation at the cell it currently is at.
        * @return {Kiwi.Animations.Animation} Returns the current Animation that is now playing.
        * @private
        */
        private _play(name, index?);
        /**
        * Stops the current animation from playing.
        *
        * @method stop
        * @public
        */
        stop(): void;
        /**
        * Pauses the current animation.
        * @method pause
        * @public
        */
        pause(): void;
        /**
        * Resumes the current animation.
        * The animation should have already been paused.
        *
        * @method resume
        * @public
        */
        resume(): void;
        /**
        * Either switches to a particular animation OR a particular frame in the current animation depending on if you pass the name of an animation that exists on this Manager (as a string) or a number refering to a frame index on the Animation.
        * When you switch to a particular animation then
        * You can also force the animation to play or to stop by passing a boolean in. But if left as null, the state of the Animation will based off what is currently happening.
        * So if the animation is currently 'playing' then once switched to the animation will play. If not currently playing it will switch to and stop.
        * If the previous animation played is non-looping and has reached its final frame, it is no longer considered playing, and as such, switching to another animation will not play unless the argument to the play parameter is true.
        *
        * @method switchTo
        * @param val {string|number}
        * @param [play=null] {boolean} Force the animation to play or stop. If null the animation base's it off what is currently happening.
        * @public
        */
        switchTo(val: any, play?: boolean): void;
        /**
        * Makes the current animation go to the next frame. If the animation is at the end of the sequence it then goes back to the start.
        * @method nextFrame
        * @public
        */
        nextFrame(): void;
        /**
        * Makes the current animation go to the prev frame. If the animation is at the start, the animation will go the end of the sequence.
        * @method prevFrame
        * @public
        */
        prevFrame(): void;
        /**
        * Internal method that sets the current animation to a Animation passed.
        *
        * @method _setCurrentAnimation
        * @param name {string} Name of the Animation that is to be switched to.
        * @param [inheritFromTexture=true] {booelan} If the animation component should look on the texture atlas for a sequence with that name.
        * @private
        */
        private _setCurrentAnimation(name, inheritFromTexture?);
        /**
        * The update loop for this component.
        * Only updates the currentAnimation and only if it is playing.
        *
        * @method update
        * @public
        */
        update(): void;
        /**
        * Gets the cell that the current Animation is current at. This is READ ONLY.
        * @property currentCell
        * @type number
        * @public
        */
        currentCell: number;
        /**
        * Gets the current frame index of the cell in the Sequence that is currently playing. This is READ ONLY.
        * @property frameIndex
        * @type number
        * @public
        */
        frameIndex: number;
        /**
        * Returns the length (Number of cells) of the current Animation that is playing. This is READ ONLY.
        * @property length
        * @type number
        * @public
        */
        length: number;
        /**
        * Returns a Animation that is on this AnimationComponent
        * Does not check to see if that Animation exists or not.
        *
        * @method getAnimation
        * @param name {string} The name of the Animation you would like to get.
        * @return {Kiwi.Animations.Animation} The Animation that is found. Will be 'undefined' if a Animation with that name did not exist.
        * @public
        */
        getAnimation(name: string): Kiwi.Animations.Animation;
        /**
        * An internal method that is used to update the cell index of an entity when an animation says it needs to update.
        * @method updateCellIndex
        * @protected
        */
        updateCellIndex(): void;
        /**
        * Destroys the animation component and runs the destroy method on all of the anims that it has.
        * @method destroy
        * @public
        */
        destroy(): void;
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
    * There are two main different types of bounds (Bounds and Hitbox) with each one having three variants (each one is a rectangle) depending on what you are wanting:
    *
    * RawBounds: The bounding box of the GameObject before rotation/scale.
    *
    * RawHitbox: The hitbox of the GameObject before rotation/scale. This can be modified to be different than the normal bounds but if not specified it will be the same as the raw bounds.
    *
    * Bounds: The bounding box of the GameObject after rotation/scale.
    *
    * Hitbox: The hitbox of the GameObject after rotation/scale. If you modified the raw hitbox then this one will be modified as well, otherwise it will be the same as the normal bounds.
    *
    * WorldBounds: The bounding box of the Entity using its world coordinates and after rotation/scale.
    *
    * WorldHitbox: The hitbox of the Entity using its world coordinates and after rotation/scale.
    *
    * @class Box
    * @extends Kiwi.Component
    * @namespace Kiwi.Components
    * @constructor
    * @param parent {Kiwi.Entity} The entity that this box belongs to.
    * @param [x=0] {Number} Its position on the x axis
    * @param [y=0] {Number} Its position on the y axis
    * @param [width=0] {Number} The width of the box.
    * @param [height=0] {Number} The height of the box.
    * @return {Kiwi.Components.Box}
    */
    class Box extends Component {
        constructor(parent: Entity, x?: number, y?: number, width?: number, height?: number);
        /**
        * The entity that this box belongs to.
        * @property entity
        * @type Kiwi.Entity
        * @public
        */
        entity: Kiwi.Entity;
        /**
        * The type of object that this is.
        * @method objType
        * @return {string} "Box"
        * @public
        */
        objType(): string;
        /**
        * Controls whether the hitbox should update automatically to match the hitbox of the current cell on the entity this Box component is attached to (default behaviour).
        * Or if the hitbox shouldn't auto update. Which will mean it will stay the same as the last value it had.
        * This property is automatically set to 'false' when you override the hitboxes width/height, but you can set this to true afterwards.
        *
        * @property autoUpdate
        * @type boolean
        * @default true
        * @private
        */
        autoUpdate: boolean;
        /**
        * Indicates whether or not this component needs re-rendering/updating or not.
        * @property dirty
        * @type boolean
        * @public
        * @deprecated in version 1.1.0 because the box always needed updating
        */
        dirty: boolean;
        /**
        * Contains offset point for the hitbox
        * @property _hitboxOffset
        * @type Kiwi.Geom.Point
        * @private
        */
        private _hitboxOffset;
        /**
        * Returns the offset value of the hitbox as a point for the X/Y axis for the developer to use.
        * This is without rotation or scaling.
        * This is a READ ONLY property.
        * @property hitboxOffset
        * @type Kiwi.Geom.Point
        * @public
        */
        hitboxOffset: Kiwi.Geom.Point;
        /**
        * Contains the offset rectangle for the raw hitbox.
        * @property _rawHitbox
        * @type Kiwi.Geom.Rectangle
        * @private
        */
        private _rawHitbox;
        /**
        * Returns the raw hitbox rectangle for the developer to use.
        * 'Raw' means where it would be without rotation or scaling.
        * This is READ ONLY.
        * @property rawHitbox
        * @type Kiwi.Geom.Rectangle
        * @public
        */
        rawHitbox: Kiwi.Geom.Rectangle;
        /**
        * The transformed or 'normal' hitbox for the entity. This is its box after rotation/scale.
        * @property _transformedHitbox
        * @type Kiwi.Geom.Rectangle
        * @private
        */
        private _transformedHitbox;
        /**
        * The transformed 'world' hitbox for the entity. This is its box after rotation/scale.
        * @property _worldHitbox
        * @type Kiwi.Geom.Rectangle
        * @private
        */
        private _worldHitbox;
        /**
        * The 'normal' or transformed hitbox for the entity. This is its box after rotation/Kiwi.Geom.Rectangle.
        * @property hitbox
        * @type Kiwi.Geom.Rectangle
        * @public
        */
        hitbox: Kiwi.Geom.Rectangle;
        /**
        * Returns the transformed hitbox for the entity using its 'world' coordinates.
        * This is READ ONLY.
        * @property worldHitbox
        * @type Kiwi.Geom.Rectangle
        * @public
        */
        worldHitbox: Kiwi.Geom.Rectangle;
        /**
        * The 'raw' bounds of entity. This is its bounds before rotation/scale.
        * This for property is only for storage of the values and should be accessed via the getter 'rawBounds' so that it can update.
        *
        * @property _rawBounds
        * @type Kiwi.Geom.Rectangle
        * @private
        */
        private _rawBounds;
        /**
        * Returns the 'raw' bounds for this entity.
        * This is READ ONLY.
        * @property rawBounds
        * @type Kiwi.Geom.Rectangle
        * @public
        */
        rawBounds: Kiwi.Geom.Rectangle;
        /**
        * Contains the 'raw' center point for the bounds.
        * @property Kiwi.Geom.Point
        * @type Kiwi.Geom.Point
        * @private
        */
        private _rawCenter;
        /**
        * Returns the raw center point of the box.
        * This is READ ONLY.
        * @property rawCenter
        * @type Kiwi.Geom.Point
        * @public
        */
        rawCenter: Kiwi.Geom.Point;
        /**
        * Contains the center point after the box has been transformed.
        * @property _transformedCenter
        * @type Kiwi.Geom.Point
        * @private
        */
        private _transformedCenter;
        /**
        * Returns the center point for the box after it has been transformed.
        * World coordinates.
        * This is READ ONLY.
        * @property center
        * @type Kiwi.Geom.Point
        * @public
        */
        center: Kiwi.Geom.Point;
        /**
        * Contains the transformed or 'normal' bounds for this entity.
        * @property _transformedBounds
        * @type Kiwi.Geom.Rectangle
        * @private
        */
        private _transformedBounds;
        /**
        * The 'world' transformed bounds for this entity.
        * @property _worldBounds
        * @type Kiwi.Geom.Rectangle
        * @private
        */
        private _worldBounds;
        /**
        * Returns the 'transformed' or 'normal' bounds for this box.
        * This is READ ONLY.
        * @property bounds
        * @type Kiwi.Geom.Rectangle
        * @public
        */
        bounds: Kiwi.Geom.Rectangle;
        /**
        * Returns the 'transformed' bounds for this entity using the world coodinates.
        * This is READ ONLY.
        * @property worldBounds
        * @type Kiwi.Geom.Rectangle
        * @public
        */
        worldBounds: Kiwi.Geom.Rectangle;
        /**
        * Private internal method only. Used to calculate the transformed bounds after rotation/scale.
        * @method _rotateRect
        * @param rect {Kiwi.Geom.Rectangle}
        * @param [useWorldCoords=false] {Boolean}
        * @return {Kiwi.Geom.Rectangle}
        * @private
        */
        private _rotateRect(rect, useWorldCoords?);
        /**
        * A private method that is used to calculate the transformed hitbox's coordinates after rotation.
        * @method _rotateHitbox
        * @param rect {Kiwi.Geom.Rectangle}
        * @param [useWorldCoords=false] {Boolean}
        * @return {Kiwi.Geom.Rectangle}
        * @private
        */
        private _rotateHitbox(rect, useWorldCoords?);
        /**
        * Draws the various bounds on a context that is passed. Useful for debugging and using in combination with the debug canvas.
        * @method draw
        * @param ctx {CanvasRenderingContext2D} Context of the canvas that this box component is to be rendered on top of.
        * @param [camera] {Kiwi.Camera} A camera that should be taken into account before rendered. This is the default camera by default.
        * @public
        */
        draw(ctx: CanvasRenderingContext2D, camera?: Kiwi.Camera): void;
        /**
        * Method which takes four Points and then converts it into a Rectangle, which represents the area those points covered.
        * The points passed can be maybe in any order, as the are checked for validity first.
        *
        * @method extents
        * @param topLeftPoint {Kiwi.Geom.Point} The top left Point that the Rectangle should have.
        * @param topRightPoint {Kiwi.Geom.Point} The top right Point that the Rectangle should have.
        * @param bottomRightPoint {Kiwi.Geom.Point} The bottom right Point that the Rectangle should have.
        * @param bottomLeftPoint {Kiwi.Geom.Point} The bottom left Point that the Rectangle should have.
        * @return {Kiwi.Geom.Rectangle} The new Rectangle that represents the area the points covered.
        * @return Rectangle
        */
        extents(topLeftPoint: Kiwi.Geom.Point, topRightPoint: Kiwi.Geom.Point, bottomRightPoint: Kiwi.Geom.Point, bottomLeftPoint: Kiwi.Geom.Point): Kiwi.Geom.Rectangle;
        /**
        * Destroys this component and all of the links it may have to other objects.
        * @method destroy
        * @public
        */
        destroy(): void;
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
    * @extends Kiwi.Component
    * @namespace Kiwi.Components
    * @constructor
    * @param owner {Object} The Object that this Component is on. Generally this will be a Entity.
    * @param box {Kiwi.Components.Box} The box which contains the worldHitbox that is to be used for the event firing.
    * @param [enabled=false] {boolean} If this input component should be enabled or not.
    * @return {Kiwi.Components.Input}
    */
    class Input extends Component {
        constructor(owner: Kiwi.IChild, box: Kiwi.Components.Box, enabled?: boolean);
        /**
        * The type of object this input is.
        * @method objType
        * @return {string} "Input"
        * @public
        */
        objType(): string;
        /**
        * The bounding box that is being used for the 'hitarea'.
        * @property _box
        * @type Kiwi.Components.Box
        * @private
        */
        private _box;
        /**
        * Kiwi Signal for firing callbacks when a pointer is active and has entered the entities hitbox.
        * @property _onEntered
        * @type Kiwi.Signal
        * @private
        */
        private _onEntered;
        /**
        * Kiwi Signal for firing callbacks when a pointer is active and has left the entities hit box.
        * @property _onLeft
        * @type Kiwi.Signal
        * @private
        */
        private _onLeft;
        /**
        * Kiwi Signal for firing callbacks when a pointer is active and has pressed down on the entity.
        * @property _onDown
        * @type Kiwi.Signal
        * @private
        */
        private _onDown;
        /**
        * Kiwi Signal for firing callbacks when a pointer just released from either being above the entity or the pointer was initally pressed on it.
        * @property _onUp
        * @type Kiwi.Signal
        * @private
        */
        private _onUp;
        /**
        * Kiwi Signal for firing callbacks a entity starts being dragged.
        * @property _onDragStarted
        * @type Kiwi.Signal
        * @private
        */
        private _onDragStarted;
        /**
        * Kiwi Signal for firing callbacks a entity stops being dragged. Like on release.
        * @property _onDragStopped
        * @type Kiwi.Signal
        * @private
        */
        private _onDragStopped;
        /**
        * A Temporary Point object which is used whilst checking to see if there is any overlap.
        * @property _tempPoint
        * @type Kiwi.Geom.Point
        * @private
        */
        private _tempPoint;
        /**
        * A Temporary Circle object which is used whilst checking to see if there is any overlap.
        * @property _tempCircle
        * @type Kiwi.Geom.Circle
        * @private
        */
        private _tempCircle;
        /**
        * Returns the onEntered Signal, that fires events when a pointer enters the hitbox of a entity.
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onEntered
        * @type Kiwi.Signal
        * @public
        */
        onEntered: Kiwi.Signal;
        /**
        * Returns the onLeft Signal, that fires events when a pointer leaves the hitbox of a entity.
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onLeft
        * @type Kiwi.Signal
        * @public
        */
        onLeft: Kiwi.Signal;
        /**
        * Returns the onDown Signal, that fires events when a pointer is pressed within the bounds of the signal.
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onDown
        * @type Kiwi.Signal
        * @public
        */
        onDown: Kiwi.Signal;
        /**
        * Returns the onUp Signal, that fires events when a pointer is released either within the bounds or was pressed initially within the bounds..
        * Note: Accessing this signal enables the input.
        * This is READ ONLY.
        * @property onUp
        * @type Kiwi.Signal
        * @public
        */
        onUp: Kiwi.Signal;
        /**
        * Returns the onDragStarted Signal.
        * This is READ ONLY.
        * @property onDragStarted
        * @type Kiwi.Signal
        * @public
        */
        onDragStarted: Kiwi.Signal;
        /**
        * Returns the onDragStopped Signal.
        * This is READ ONLY.
        * @property onDragStopped
        * @type Kiwi.Signal
        * @public
        */
        onDragStopped: Kiwi.Signal;
        /**
        * A alias for the on release signal.
        * This is READ ONLY.
        * @property onRelease
        * @type Kiwi.Signal
        * @public
        */
        onRelease: Kiwi.Signal;
        /**
        * A alias for the on press signal.
        * This is READ ONLY.
        * @property onPress
        * @type Kiwi.Signal
        * @public
        */
        onPress: Kiwi.Signal;
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
        enabled: boolean;
        /**
        * If a pointer is current pressing down on the input, this will be a reference to that pointer. Otherwise it will be null.
        * @property _isDown
        * @type Kiwi.Input.Pointer
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
        * @type Kiwi.Input.Pointer
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
        isDown: boolean;
        /**
        * Used to see if no pointer is on this input (so it is up).
        * This is READ ONLY.
        * @property isUp
        * @type boolean
        * @public
        */
        isUp: boolean;
        /**
        * Check to see if any pointer is within the bounds of this input.
        * This is READ ONLY.
        * @property withinBounds
        * @type boolean
        * @public
        */
        withinBounds: boolean;
        /**
        * See if no pointers are within the bounds of this entity.
        * This is READ ONLY.
        * @property outsideBounds
        * @type boolean
        * @public
        */
        outsideBounds: boolean;
        /**
        * A reference to the pointer that is currently 'dragging' this Object.
        * If not dragging then this is null.
        * @property _isDragging
        * @type Kiwi.Input.Pointer
        * @default null
        * @private
        */
        private _isDragging;
        /**
        * The distance between the top left corner of this Objects parent and the coordinates of a Pointer.
        * @property _distance
        * @type Kiwi.Geom.Point
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
        isDragging: boolean;
        /**
        * The drag distance that is used when dragging this object. See _dragDistance for more information.
        * @property dragDistance
        * @type number
        * @public
        */
        dragDistance: number;
        /**
        * Temporary property that gets updated everyframe with the pointer that is currently 'down' on this entity.
        * @property _nowDown
        * @type Kiwi.Input.Pointer
        * @default null
        * @private
        */
        private _nowDown;
        /**
        * Temporary property that gets updated everyframe with the pointer that was just 'released' from being down on this entity
        * @property _nowUp
        * @type Kiwi.Input.Pointer
        * @default null
        * @private
        */
        private _nowUp;
        /**
        * Temporary property of the pointer that is now within the bounds of the entity
        * @property _nowEntered
        * @type Kiwi.Input.Pointer
        * @default null
        * @private
        */
        private _nowEntered;
        /**
        * Temporary property of the pointer that just left the bounds of the entity.
        * @property _nowLeft
        * @type Kiwi.Input.Pointer
        * @default null
        * @private
        */
        private _nowLeft;
        /**
        * Temporary property of the pointer that just started draggging the entity.
        * @property _nowDragging
        * @type Kiwi.Input.Pointer
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
        enableDrag(snapToCenter?: boolean, distance?: number): void;
        /**
        * Disables the dragging of this entity.
        * @method disableDrag
        * @public
        */
        disableDrag(): void;
        /**
        * The update loop for the input.
        * @method update
        * @protected
        */
        update(): void;
        /**
        * The update loop that gets executed when the game is using the touch manager.
        * @method _updateTouch
        * @private
        */
        private _updateTouch();
        /**
        * A private method for checking to see if a touch pointer should activate any events.
        * @method _evaluateTouchPointer
        * @param pointer {Kiwi.Input.Finger} The pointer you are checking against.
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
        * @param pointer {Kiwi.Input.MouseCursor}
        * @private
        */
        private _evaluateMousePointer(pointer);
        /**
        * Destroys the input.
        * @method destory
        * @public
        */
        destroy(): void;
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
    * The Sound Component is a class to assist with the creation and management of multiple pieces of audio that may exist on a single Entity.
    * This class is NOT needed when dealing with audio but is instead can be used to assist in dealing with audio.
    *
    * @class Sound
    * @extends Kiwi.Component
    * @namespace Kiwi.Components
    * @constructor
    * @param parent {Any} Who the owner of the sound component is.
    * @return {Kiwi.Components.Sound}
    */
    class Sound extends Component {
        constructor(parent: any);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String} "Sound"
        * @public
        */
        objType(): string;
        /**
        * Contains a list of all of the Audio objects that are on this component.
        * @private
        * @type Array
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
        * @return {Kiwi.Sound.Audio}
        * @public
        */
        addSound(name: string, key: string, volume?: number, loop?: boolean): Kiwi.Sound.Audio;
        /**
        * Removes the audio sementment with the name you have given.
        *
        * @method removeSound
        * @param name {string} The piece of audio you would like to remove.
        * @public
        */
        removeSound(name: string): void;
        /**
        * Returns the Audio object for the sound that you pass.
        *
        * @method getSound
        * @param name {string} The piece of audio you would like to grab.
        * @return {Kiwi.Sound.Audio}
        * @public
        */
        getSound(name: string): Kiwi.Sound.Audio;
        /**
        * This method is used to check to see if an audio segment with the name that is specified is on this component.
        *
        * @method _validate
        * @param name {string} The name of the audio segment you want to check exists.
        * @return {boolean}
        * @private
        */
        private _validate(name);
        /**
        * Plays the audio that you specify.
        *
        * @method play
        * @param name {string} The name of the audio file you would like to play.
        * @public
        */
        play(name: string): void;
        /**
        * Stops the audio that you specify from playing.
        *
        * @method play
        * @param name {string} Name of the audio file you would like to stop.
        * @public
        */
        stop(name: string): void;
        /**
        * Pauses the audio that you specify.
        *
        * @method play
        * @param name {string} The name of the audio you would like to pause.
        * @public
        */
        pause(name: string): void;
        /**
        * Resumes the audio that you specify. Note: Audio can only resume if it was paused initially.
        *
        * @method play
        * @param name {string} The name of the audio you would like to resume.
        * @public
        */
        resume(name: string): void;
        /**
        * Destroys this AudioComponent and all of the Audio objects it has.
        * @method destroy
        * @public
        */
        destroy(): void;
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
    * @param entity {Kiwi.Entity} The Entity that this ArcadePhysics should be used on.
    * @param box {Kiwi.Components.Box} The box component that holds the hitbox that should be used when resolving and calculating collisions.
    * @return {Kiwi.Components.ArcadePhysics}
    * @extends Kiwi.Component
    *
    * @author Adam 'Atomic' Saltsman, Flixel
    *
    */
    class ArcadePhysics extends Kiwi.Component {
        constructor(entity: Kiwi.Entity, box?: Kiwi.Components.Box);
        /**
        * The transform component of the entity that the ArcadePhysics is a part of.
        * @property transform
        * @type Kiwi.Geom.Transform
        * @public
        */
        transform: Kiwi.Geom.Transform;
        /**
        * The bounding box component that the collisions are going to be based off.
        * You can modify the 'hitbox' of that component to modify the collision area.
        *
        * @property box
        * @type Kiwi.Components.Box
        * @public
        */
        box: Kiwi.Components.Box;
        /**
        * Whether an object will move/alter position after a collision.
        * @property immovable
        * @type boolean
        * @public
        */
        immovable: boolean;
        /**
        * The basic speed of this object.
        * You can modify the values contained inside this Object to change the speed.
        *
        * @property velocity
        * @type Kiwi.Geom.Point
        * @public
        */
        velocity: Kiwi.Geom.Point;
        /**
        * The virtual mass of the object. Default value is 1.
        * Currently only used with <code>elasticity</code> during collision resolution.
        * Change at your own risk; effects seem crazy unpredictable so far!
        * @property mass
        * @type number
        * @public
        */
        mass: number;
        /**
        * The bounciness of this object.  Only affects collisions.  Default value is 0, or "not bouncy at all."
        * @property elasticity
        * @type number
        * @public
        */
        elasticity: number;
        /**
        * How fast the speed of this object is changing.
        * Useful for smooth movement and gravity.
        *
        * @property acceleration
        * @type Kiwi.Geom.Point
        * @public
        */
        acceleration: Kiwi.Geom.Point;
        /**
        * This isn't drag exactly, more like deceleration that is only applied
        * when acceleration is not affecting the sprite.
        * @property drag
        * @type Kiwi.Geom.Point
        * @public
        */
        drag: Kiwi.Geom.Point;
        /**
        * If you are using <code>acceleration</code>, you can use <code>maxVelocity</code> with it
        * to cap the speed automatically (very useful!).
        * @property maxVelocity
        * @type Kiwi.Geom.Point
        * @public
        */
        maxVelocity: Kiwi.Geom.Point;
        /**
        * This is how fast you want this sprite to spin.
        * @property angularVelocity
        * @type number
        * @public
        */
        angularVelocity: number;
        /**
        * How fast the spin speed should change.
        * @property angularAcceleration
        * @type number
        * @public
        */
        angularAcceleration: number;
        /**
        * Like <code>drag</code> but for spinning.
        * @property angularDrag
        * @type number
        * @public
        */
        angularDrag: number;
        /**
        * Use in conjunction with <code>angularAcceleration</code> for fluid spin speed control.
        * @property maxAngular
        * @type number
        * @public
        */
        maxAngular: number;
        /**
        * If the Entity that this component is a part of 'moves' or not, and thus if the physics should update the motion should update each frame.
        * @property moves
        * @type boolean
        * @default true
        * @public
        */
        moves: boolean;
        /**
        * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface contacts.
        * Use bitwise operators to check the values stored here, or use touching(), justStartedTouching(), etc.
        * You can even use them broadly as boolean values if you're feeling saucy!
        * @property touching
        * @type number
        * @public
        */
        touching: number;
        /**
        * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface contacts from the previous game loop step.
        * Use bitwise operators to check the values stored here, or use isTouching().
        * You can even use them broadly as boolean values if you're feeling saucy!
        * @property wasTouching
        * @type number
        * @public
        */
        wasTouching: number;
        /**
        * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating collision directions.
        * Use bitwise operators to check the values stored here.
        * Useful for things like one-way platforms (e.g. allowCollisions = UP)
        * The accessor "solid" just flips this variable between NONE and ANY.
        * @property allowCollisions
        * @type number
        * @public
        */
        allowCollisions: number;
        /**
        * Important variable for collision processing.
        * Tracks the last location of the Entity. This is set during the time this method 'updates'.
        * @property last
        * @type Kiwi.Geom.Point
        * @public
        */
        last: Kiwi.Geom.Point;
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
        * @method isTouching
        * @param value [number] The collision constant of the side you want to check against.
        * @return {boolean} If the Object is currently colliding on that side or not.
        * @public
        */
        isTouching(value: number): boolean;
        /**
        * Whether the object should collide with other objects or not.
        * For more control over what directions the object will collide from, use collision constants (like LEFT, FLOOR, etc)
        * and set the value of allowCollisions directly.
        * @method solid
        * @param [value] {boolean} If left empty, this will then just toggle between ANY and NONE.
        * @return {boolean} If Object is currently solid or not.
        * @public
        */
        solid(value?: boolean): boolean;
        /**
        * Sets up a callback function that will run when this object overlaps with another.
        * When the method is dispatched it will have TWO arguments.
        * One - The parent / entity of this ArcadePhysics.
        * Two - The GameObject that the collision occured with.
        *
        * @method setCallback
        * @param callbackFunction {Function} The method that is to be executed whe a overlap occurs.
        * @param callbackContext {Any} The context that the method is to be called in.
        * @public
        */
        setCallback(callbackFunction: any, callbackContext: any): void;
        /**
        * Returns the parent of this entity. Mainly used for executing callbacks.
        * @property parent
        * @type Kiwi.Entity
        * @public
        */
        parent: Kiwi.Entity;
        /**
        * Sets the parent's rotation to be equal to the trajectory of the
        * velocity of the physics component. Note that rotation 0 corresponds
        * to pointing directly to the right.
        * @method rotateToVelocity
        * @return {number} New rotation value
        * @public
        * @since 1.3.0
        */
        rotateToVelocity(): number;
        /**
        * A static method for seperating two normal GameObjects on both the X and Y Axis's.
        * Both objects need to have both an ArcadePhysics Component and a Box component in order for the separate process to succeed.
        * This method is not recommended to be directly used but instead use a 'collide/overlaps' method instead.
        *
        * @method seperate
        * @static
        * @param object1 {Kiwi.Entity} The first GameObject you would like to seperate.
        * @param object2 {Kiwi.Entity} The second GameObject you would like to seperate from the first.
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
        * @param object1 {Kiwi.Entity} The first GameObject.
        * @param object2 {Kiwi.Entity} The second GameObject.
        * @return {boolean} Whether the objects in fact touched and were separated along the X axis.
        * @static
        * @public
        */
        static separateX(object1: Kiwi.Entity, object2: Kiwi.Entity): boolean;
        /**
        * Separates two GameObject on the y-axis. This method is executed from the 'separate' method.
        * Both objects need to have both an ArcadePhysics Component and a Box component in order for the separate process to succeed.
        * This method is not recommended to be directly used but instead use a 'collide/overlaps' method instead.
        *
        * @method seperateY
        * @param object1 {Kiwi.Entity} The first GameObject.
        * @param object2 {Kiwi.Entity} The second GameObject.
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
        * @param object {Kiwi.Entity} The GameObject you are wanting to separate from a tile.
        * @param layer {Kiwi.GameObjects.Tilemap.TileMapLayer} The TileMapLayer that the tiles belong on.
        * @param tiles {Array}
        * @return {Boolean} If any separation occured.
        * @public
        * @static
        */
        static separateTiles(object: Entity, layer: Kiwi.GameObjects.Tilemap.TileMapLayer, tiles: any): boolean;
        /**
        * Separates a GameObjects from an Array of Tiles on the x-axis.
        * @method separateTilesX
        * @param object {Kiwi.Entity} The GameObject you are wanting to separate from a tile.
        * @param layer {Kiwi.GameObjects.Tilemap.TileMapLayer} The TileMapLayer that the tiles belong on.
        * @param tile {Object} An Object containing the information (x/y/tiletypr) about the tile that is being overlapped.
        * @return {Boolean} If any separation occured.
        * @public
        * @static
        */
        static separateTilesX(object: Entity, layer: Kiwi.GameObjects.Tilemap.TileMapLayer, tile: any): boolean;
        /**
        * Separates a GameObject from a tiles on the y-axis.
        * @method separateTilesY
        * @param object {Kiwi.Entity} The GameObject you are wanting to separate from a tile.
        * @param layer {Kiwi.GameObjects.Tilemap.TileMapLayer} The TileMapLayer that the tiles belong on.
        * @param tiles {Object} An Object representing the Tile which we are checking to see any overlaps occurs.
        * @return {Boolean} If any separation occured.
        * @public
        * @static
        */
        static separateTilesY(object: Entity, layer: any, tile: any): boolean;
        /**
        * A method to check to see if any Tiles with in this parent TileMapLayer overlaps with a GameObject passed.
        * If seperateObjects is true it will seperate the two entities based on their bounding box.
        * ONLY works if the parent of the ArcadePhysics component which is calling this method is a TileMapLayer.
        * Note: The GameObject passed must contain a box component and only if you want to separate the two objects must is ALSO contain an ArcadePhysics component.
        *
        * @method overlapsTiles
        * @param gameObject {Kiwi.Entity} The GameObject you would like to separate with this one.
        * @param [separateObjects=false] {Boolean} If you want the GameObject to be separated from any tile it collides with.
        * @param [collisionType=ANY] {Number} If you want the GameObject to only check for collisions from a particular side of tiles. ANY by default.
        * @return {Boolean} If any gameobject overlapped.
        * @public
        */
        overlapsTiles(gameObject: Entity, separateObjects?: boolean, collisionType?: number): boolean;
        /**
        * A method to check to see if the parent of this physics component overlaps with another Kiwi.Entity.
        * If seperateObjects is true it will seperate the two entities based on their bounding box.
        * Note: The GameObject passed must contain a box component and only if you want to separate the two objects must is ALSO contain an ArcadePhysics component.
        * Also: Not to be used for separation from tiles.
        *
        * @method overlaps
        * @param gameObject {Kiwi.Entity}
        * @param [seperateObjects=false] {boolean}
        * @return {boolean}
        * @public
        */
        overlaps(gameObject: Entity, separateObjects?: boolean): boolean;
        /**
        * A method to check to see if the parent of this physics component overlaps with another individual in a Kiwi Group.
        *
        * @method overlapsGroup
        * @param group {Kiwi.Group}
        * @param [seperateObjects=false] {boolean}
        * @return { boolean } If any object in the group overlapped with the GameObject or not.
        * @public
        */
        overlapsGroup(group: Kiwi.Group, separateObjects?: boolean): boolean;
        /**
        * A method to check to see if the parent of this physics component overlaps with any Entities that are held in an Array which is passed.
        *
        * @method overlapsArray
        * @param array {Array} The array of GameObjects you want to check.
        * @param [separateObjects=false] {boolean} If when the objects collide you want them to seperate outwards.
        * @return {boolean} If any overlapping occured or not.
        * @public
        */
        overlapsArray(array: Array<any>, separateObjects?: boolean): boolean;
        /**
        * Computes the velocity based on the parameters passed.
        * @method computeVelocity
        * @static
        * @param velocity {number} The currently velocity.
        * @param [acceleration=0] {number} The acceleration of the item.
        * @param [drag=0] {number} The amount of drag effecting the item.
        * @param [max=10000] {number} The maximum velocity.
        * @return {Number} The new velocity
        * @public
        */
        static computeVelocity(velocity: number, acceleration?: number, drag?: number, max?: number): number;
        /**
        * Updates the position of this object. Automatically called if the 'moves' parameter is true.
        * This called each frame during the update method.
        *
        * @method updateMotion
        * @private
        */
        updateMotion(): void;
        /**
        * The Update loop of the physics component
        * @method update
        * @public
        */
        update(): void;
        /**
        * Removes all properties that refer to other objects or outside of this class in order to flag this object for garbage collection.
        * @method destroy
        * @public
        */
        destroy(): void;
        /**
        * The type of object that this is.
        * @method objType
        * @return {string} "ArcadePhysics"
        * @public
        */
        objType(): string;
        /**
        * A Static method to check to see if two objects collide or not. Returns a boolean indicating whether they overlaped or not.
        *
        * @method collide
        * @static
        * @public
        * @param gameObject1 {Kiwi.Entity} The first game object.
        * @param gameObject2 {Kiwi.Entity} The second game object.
        * @param [seperate=true] {boolean} If the two gameobjects should seperated when they collide.
        * @return {boolean}
        */
        static collide(gameObject1: Entity, gameObject2: Entity, seperate?: boolean): boolean;
        /**
        * A Static method to check to see if a single entity collides with a group of entities. Returns a boolean indicating whether they overlaped or not.
        *
        * @method collideGroup
        * @static
        * @public
        * @param gameObject {Kiwi.Entity} The entity you would like to check against.
        * @param group {Kiwi.Group} The Kiwi Group that you want to check the entity against.
        * @param [seperate=true] {boolean}
        * @return {boolean}
        * @public
        */
        static collideGroup(gameObject: Entity, group: Kiwi.Group, seperate?: boolean): boolean;
        /**
        * A Static method to check to see if a group of entities overlap with another group of entities. Returns a boolean indicating whether they overlaped or not.
        *
        * @method collideGroupGroup
        * @static
        * @public
        * @param group1 {Kiwi.Group} The first Kiwi Group that you want to check the entity against.
        * @param group2 {Kiwi.Group} The second Kiwi Group that you want to check the entity against.
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
        * @param gameObject1 {Kiwi.Entity} The first game object.
        * @param gameObject2 {Kiwi.Entity} The second gameobject you are testing the first against.
        * @param [separateObjects=true] {boolean}
        * @return {boolean}
        */
        static overlaps(gameObject1: Entity, gameObject2: Entity, separateObjects?: boolean): boolean;
        /**
        * A Static method to that checks to see if a single object overlaps with a group of entities. Returns a boolean indicating whether they did or not.
        *
        * @method overlapsObjectGroup
        * @static
        * @param gameObject {Kiwi.Entity}
        * @param group {Kiwi.Group}
        * @param [seperateObjects=true] {boolean} If they overlap should the seperate or not
        * @return {boolean}
        * @public
        */
        static overlapsObjectGroup(gameObject: Entity, group: Kiwi.Group, separateObjects?: boolean): boolean;
        /**
        * A Static method that checks to see if any objects in one group overlap with objects in another group.
        *
        * @method overlaps
        * @static
        * @param group1 {Kiwi.Group} The first group you would like to check against.
        * @param group2 {Kiwi.Group} The second group you would like to check against.
        * @param [seperate=true] {boolean} If they overlap should the seperate or not
        * @return {boolean}
        * @public
        */
        static overlapsGroupGroup(group1: Kiwi.Group, group2: Kiwi.Group, separateObjects?: boolean): boolean;
        /**
        * A Static method that checks to see if any objects from an Array collide with a Kiwi Group members.
        *
        * @method overlapsArrayGroup
        * @param array {Array} An array you want to check collide.
        * @param group {Kiwi.Group} A group of objects you want to check overlaps.
        * @param [seperateObjects=true] {Boolean} If when a collision is found the objects should seperate out.
        * @return {Boolean}
        * @static
        */
        static overlapsArrayGroup(array: Array<any>, group: Kiwi.Group, separateObjects?: boolean): boolean;
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
    * @param game {Kiwi.Game} The game that this loader belongs to.
    * @return {Kiwi.Files.Loader} This Object
    *
    */
    class Loader {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this is.
        * @method objType
        * @return {String} "Loader"
        * @public
        */
        objType(): string;
        /**
        * The game this loader is attached to.
        * @property game
        * @type Kiwi.Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * A list of files that can be loaded in parallel to one another.
        * This list of files are currently being loaded.
        *
        * @property _loadingParallel
        * @type Array
        * @since 1.2.0
        * @private
        */
        private _loadingParallel;
        /**
        * List of files that cannot load in parallel to one another
        * and so need to wait for previous files to load first.
        * Generally files loaded via XHR.
        *
        * @property _loadingQueue
        * @type Array
        * @since 1.2.0
        * @private
        */
        private _loadingQueue;
        /**
        * List of files that are to be loaded.
        * These files will be placed in the '_loadingQueue' or '_loadingParallel'
        * lists when the queue is told to 'start' loading.
        *
        * @property _loadingList
        * @type Array
        * @since 1.2.0
        * @private
        */
        private _loadingList;
        /**
        * A Signal which dispatches callbacks when all files in the 'loadingList' have been loaded.
        * When adding callbacks make sure to 'remove' them (or to use the 'addOnce' method)
        * otherwise will fire when other sections use the loader.
        *
        * @method onQueueComplete
        * @type Kiwi.Signal
        * @since 1.2.0
        * @public
        */
        onQueueComplete: Kiwi.Signal;
        /**
        * A Signal which dispatches callbacks each time a file in the 'loadingList' have been loaded.
        * Callbacks dispatched are passed the following arguments in order.
        * 1. percent - The percentage of files loaded. A number from 0 - 100
        * 2. bytesLoaded - The number of bytes loaded
        * 3. file - The latest file that was loaded. First call will be null.
        *
        * When adding callbacks make sure to 'remove' them (or to use the 'addOnce' method)
        * otherwise will fire when other sections use the loader.
        *
        * @method onQueueProgress
        * @type Kiwi.Signal
        * @since 1.2.0
        * @public
        */
        onQueueProgress: Kiwi.Signal;
        /**
        * A flag indicating if the files inside the file queue are loading or not.
        *
        * @property _fileQueueLoading
        * @type Boolean
        * @default false
        * @since 1.2.0
        * @private
        */
        private _queueLoading;
        /**
        * READ ONLY: A flag indicating if the files inside the file queue are loading or not.
        *
        * @property fileQueueLoading
        * @type Boolean
        * @default false
        * @readOnly
        * @since 1.2.0
        * @public
        */
        queueLoading: boolean;
        /**
        * When 'calculateBytes' is true the percentLoaded will be the `bytesLoaded / bytesTotal`.
        * Otherwise it is based on the `filesLoaded / numberOfFilesToLoad`.
        *
        * @property percentLoaded
        * @type Number
        * @since 1.2.0
        * @readOnly
        * @public
        */
        percentLoaded: number;
        /**
        * When enabled, files which can be loaded in parallel (those which are loaded via tags)
        * will be loaded at the same time.
        *
        * The default behaviour is to have the files loading in a queued fashion instead of one after another.
        *
        * @property enableParallelLoading
        * @type Boolean
        * @default false
        * @since 1.2.0
        * @public
        */
        enableParallelLoading: boolean;
        /**
        * The boot method is executed when the DOM has successfully loaded and we can now start the game.
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * Starts loading all the files which are in the file queue.
        *
        * To accurately use the bytesLoaded or bytesTotal properties you will need to set the 'calculateBytes' boolean to true.
        * This may increase load times, as each file in the queue will firstly make XHR HEAD requests for information.
        *
        * When 'calculateBytes' is true the percentLoaded will be the `bytesLoaded / bytesTotal`.
        * Otherwise it is based on the `filesLoaded / numberOfFilesToLoad`.
        *
        * @method start
        * @param [calculateBytes] {Boolean} Setter for the 'calculateBytes' property.
        * @since 1.2.0
        * @public
        */
        start(calculateBytes?: boolean): void;
        /**
        * Loops through the file queue and starts the loading process.
        *
        * @method _startLoading
        * @private
        */
        private _startLoading();
        /**
        * Adds a file to the queue of files to be loaded.
        * Files cannot be added whilst the queue is currently loading,
        * the file to add is currently loading, or has been loaded before.
        *
        * @method addFileToQueue
        * @param file {Kiwi.Files.File} The file to add.
        * @return {Boolean} If the file was added to the queue or not.
        * @since 1.2.0
        * @public
        */
        addFileToQueue(file: Kiwi.Files.File): boolean;
        /**
        * Removes a file from the file queue.
        * Files cannot be removed whilst the queue is loading.
        *
        * @method removeFileFromQueue
        * @param file {Kiwi.Files.File} The file to remove.
        * @return {Boolean} If the file was added to the queue or not.
        * @since 1.2.0
        * @public
        */
        removeFileFromQueue(file: Kiwi.Files.File): boolean;
        /**
        * Clears the file queue of all files.
        *
        * @method clearQueue
        * @since 1.2.0
        * @public
        */
        clearQueue(): void;
        /**
        * Starts the process of loading a file outside of the regular queue loading process.
        * Callbacks for load completion need to be added onto the file via 'onComplete' Signal.
        *
        * @method loadFile
        * @public
        */
        loadFile(file: Kiwi.Files.File): void;
        /**
        * Sorts a file and places it into either the 'loadingParallel' or 'loadingQueue'
        * depending on the method of loading it is using.
        *
        * @method _sortFile
        * @param file {Kiwi.Files.File}
        * @since 1.2.0
        * @private
        */
        private _sortFile(file, startLoading?);
        /**
        * The number of files in the file queue that have been updated.
        *
        * @property _completeFiles
        * @type number
        * @default 0
        * @private
        */
        private _completedFiles;
        /**
        * Called each time a file has processed whilst loading, or has just completed loading.
        *
        * Calculates the new number of bytes loaded and
        * the percentage of loading done by looping through all of the files.
        *
        * @method _updateFileListInformation
        * @private
        */
        private _updateFileListInformation();
        /**
        * Executed by files when they have successfully been loaded.
        * This method checks to see if the files are in the file queue, and dispatches the appropriate events.
        *
        * @method _fileQueueUpdate
        * @param file {Kiwi.Files.File} The file which has been recently loaded.
        * @param [forceProgressCheck=false] {Boolean} If the progress of file loading should be checked, regardless of the file being in the queue or not.
        * @since 1.2.0
        * @private
        */
        private _fileQueueUpdate(file, forceProgressCheck?);
        /**
        * Starts the loading process in the loadingQueue.
        * @method _startLoadingQueue
        * @return {Boolean}
        * @private
        * @since 1.2.0
        * @return {boolean} Whether the first file is loading
        */
        private _startLoadingQueue();
        /**
        * Executed when a file in the 'loadingQueue' has been successfully loaded.
        * Removes the file from the loadingQueue and executes the '_startLoadingQueue' to start loading the next file.
        *
        * @method _queueFileComplete
        * @param file {Kiwi.Files.File}
        * @since 1.2.0
        * @private
        */
        private _queueFileComplete(file);
        /**
        * Starts loading a file which can be loaded in parallel.
        * @method _startLoadingParallel
        * @param params file {Kiwi.Files.File}
        * @since 1.2.0
        * @private
        */
        private _startLoadingParallel(file);
        /**
        * Starts loading all files which can be loaded in parallel.
        * @method _startLoadingAllParallel
        * @since 1.2.0
        * @private
        */
        private _startLoadingAllParallel();
        /**
        * Executed when a file in the 'loadingParallel' lsit has been successfully loaded.
        * Removes the file from the list and get the fileQueue to check its progress.
        *
        * @method _parallelFileComplete
        * @param file {Kiwi.Files.File}
        * @since 1.2.0
        * @private
        */
        private _parallelFileComplete(file);
        /**
        * -----------------------------
        * Bytes Loaded Methods
        * -----------------------------
        **/
        /**
        * If the number of bytes for each file should be calculated before the queue starts loading.
        * If true each file in the queue makes a XHR HEAD request first to get the total values.
        *
        * @property _calculateBytes
        * @type Boolean
        * @private
        */
        private _calculateBytes;
        /**
        * Callback for when the total number of bytes of the files in the file list has been calculated.
        *
        * @property onQueueSizeCalculate
        * @type any
        * @private
        */
        private onSizeCallback;
        /**
        * Context that the onSizeCallback should be executed in.
        *
        * @property onSizeContext
        * @type any
        * @private
        */
        private onSizeContext;
        /**
        * The index of the current file in the filelist thats size is being retrieved.
        * @property _currentFileIndex
        * @type number
        * @private
        */
        private _currentFileIndex;
        /**
        * Total file size (in bytes) of all files in the queue to be loaded.
        *
        * @property _bytesTotal
        * @type Number
        * @private
        */
        private _bytesTotal;
        /**
        * READ ONLY: Returns the total number of bytes for the files in the file queue.
        * Only contains a value if you use the 'calculateBytes' and are loading files
        * OR if you use the 'calculateQueuedSize' method.
        *
        * @property bytesTotal
        * @readOnly
        * @default 0
        * @since 1.2.0
        * @type Number
        * @public
        */
        bytesTotal: number;
        /**
        * The number of bytes loaded of files in the file queue.
        *
        * @property _bytesLoaded
        * @type Number
        * @private
        */
        private _bytesLoaded;
        /**
        * READ ONLY: Returns the total number of bytes for the files in the file queue.
        *
        * If you are using this make sure you set the 'calculateBytes' property to true OR execute the 'calculateQueuedSize' method.
        * Otherwise files that are loaded via tags will not be accurate!
        *
        * @property bytesLoaded
        * @readOnly
        * @default 0
        * @since 1.2.0
        * @type Number
        * @public
        */
        bytesLoaded: number;
        /**
        * Loops through the file queue and gets file information (filesize, ETag, filetype) for each.
        *
        * To get accurate information about the bytesLoaded, bytesTotal, and the percentLoaded
        * set the 'calculateBytes' property to true, as the loader will automatically execute this method before hand.
        *
        * Can only be executed when the file queue is not currently loading.
        *
        * @method calculateQueuedSize
        * @param callback {any}
        * @param [context=null] {any}
        * @public
        */
        calculateQueuedSize(callback: any, context?: any): void;
        /**
        * Checks to see if all the file sizes have been retrieved.
        * If so completes the "calculateQueuedSize" call.
        * Otherwise requests the next file's details.
        *
        * @method _calculateNextFileSize
        * @private
        */
        private _calculateNextFileSize();
        /**
        * Executed when by '_calculateNextFileSize' when the files information has been retrieved.
        * Adds its calculated size to the _bytesTotal and executes the 'nextFileSize' method.
        *
        * @method _detailsReceived
        * @private
        */
        private _detailsReceived();
        /**
        * -----------------------------
        * File Addition Methods
        * -----------------------------
        */
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
        * @return {Kiwi.Files.File} The file which was created.
        * @public
        */
        addImage(key: string, url: string, width?: number, height?: number, offsetX?: number, offsetY?: number, storeAsGlobal?: boolean): Kiwi.Files.File;
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
        * @return {Kiwi.Files.File} The file which was created.
        * @public
        */
        addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number, storeAsGlobal?: boolean): TextureFile;
        /**
        * Creates new file's for loading a texture atlas and adds those files to the loading queue.
        * @method addTextureAtlas
        * @param key {String} The key for the image file.
        * @param imageUrl {String} The url of the image to load.
        * @param jsonID {String} A key for the JSON file.
        * @param jsonURL {String} The url of the json file to load.
        * @param [storeAsGlobal=true] {Boolean} If hte files should be stored globally or not.
        * @return {Kiwi.Files.File} The file which was created.
        * @public
        */
        addTextureAtlas(key: string, imageURL: string, jsonID: string, jsonURL: string, storeAsGlobal?: boolean): TextureFile;
        /**
        * Creates a new File to store a audio piece.
        * This method firstly checks to see if the AUDIO file being loaded is supported or not by the browser/device before adding it to the loading queue.
        * You can override this behaviour and tell the audio data to load even if not supported by setting the 'onlyIfSupported' boolean to false.
        * Also you can now pass an array of filepaths, and the first audio filetype that is supported will be loaded.
        *
        * @method addAudio
        * @param key {String} The key for the audio file.
        * @param url {String} The url of the audio to load. You can pass an array of URLs, in which case the first supported audio filetype in the array will be loaded.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @param [onlyIfSupported=true] {Boolean} If the audio file should only be loaded if Kiwi detects that the audio file could be played.
        * @return {Kiwi.Files.File} The file which was created.
        * @public
        */
        addAudio(key: string, url: any, storeAsGlobal?: boolean, onlyIfSupported?: boolean): any;
        /**
        * This method firstly checks to see if the AUDIO file being loaded is supported or not by the browser/device before adding it to the loading queue.
        * Returns a boolean if the audio file was successfully added or not to the file directory.
        * @method _attemptToAddAudio
        * @param params {Object}
        *   @param params.key {String} The key for the audio file.
        *   @param params.url {String} The url of the audio to load.
        *   @param [params.state=true] {Kiwi.State} The state this file should be for.
        *   @param [params.fileStore] {Kiwi.Files.FileStore}
        * @param [onlyIfSupported=true] {Boolean} If the audio file should only be loaded if Kiwi detects that the audio file could be played.
        * @return {Kiwi.Files.File} The file which was created.
        * @private
        */
        private _attemptToAddAudio(params, onlyIfSupported);
        /**
        * Creates a new File to store JSON and adds it to the loading queue.
        * @method addJSON
        * @param key {String} The key for the file.
        * @param url {String} The url to the json file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @return {Kiwi.Files.File} The file which was created.
        * @public
        */
        addJSON(key: string, url: string, storeAsGlobal?: boolean): DataFile;
        /**
        * Creates a new File to store XML and adds it to the loading queue.
        * @method addXML
        * @param key {String} The key for the file.
        * @param url {String} The url to the xml file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @return {Kiwi.Files.File} The file which was created.
        * @public
        */
        addXML(key: string, url: string, storeAsGlobal?: boolean): DataFile;
        /**
        * Creates a new File for a Binary file and adds it to the loading queue.
        * @method addBinaryFile
        * @param key {String} The key for the file.
        * @param url {String} The url to the Binary file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @return {Kiwi.Files.File} The file which was created.
        * @public
        */
        addBinaryFile(key: string, url: string, storeAsGlobal?: boolean): DataFile;
        /**
        * Creates a new File to store a text file and adds it to the loading queue.
        * @method addTextFile
        * @param key {String} The key for the file.
        * @param url {String} The url to the text file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @return {Kiwi.Files.File} The file which was created.
        * @public
        */
        addTextFile(key: string, url: string, storeAsGlobal?: boolean): DataFile;
        /**
        * Flags this loader for garbage collection. Only use this method if you are SURE you will no longer need it.
        * Otherwise it is best to leave it alone.
        *
        * @method destroy
        * @public
        */
        destroy(): void;
        /**
        * -----------------------
        * Deprecated - Functionality exists. Maps to its equalvent
        * -----------------------
        **/
        /**
        * Initialise the properities that are needed on this loader.
        * Recommended you use the 'onQueueProgress' / 'onQueueComplete' signals instead.
        *
        * @method init
        * @param [progress=null] {Any} Progress callback method.
        * @param [complete=null] {Any} Complete callback method.
        * @param [calculateBytes=false] {boolean}
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        init(progress?: any, complete?: any, calculateBytes?: boolean): void;
        /**
        * Loops through all of the files that need to be loaded and start the load event on them.
        * @method startLoad
        * @deprecated Use 'start' instead. Deprecated as of 1.2.0
        * @public
        */
        startLoad(): void;
        /**
        * Returns a percentage of the amount that has been loaded so far.
        * @method getPercentLoaded
        * @return {Number}
        * @deprecated Use 'percentLoaded' instead. Deprecated as of 1.2.0
        * @public
        */
        getPercentLoaded(): number;
        /**
        * Returns a boolean indicating if everything in the loading que has been loaded or not.
        * @method complete
        * @return {boolean}
        * @deprecated Use 'percentLoaded' instead. Deprecated as of 1.2.0
        * @public
        */
        complete(): boolean;
        /**
        * Quick way of getting / setting the private variable 'calculateBytes'
        * To be made into a public variable once removed.
        * @method calculateBytes
        * @param [value] {boolean}
        * @return {boolean}
        * @public
        */
        calculateBytes(value?: boolean): boolean;
        /**
        * Returns the total number of bytes that have been loaded so far from files in the file queue.
        *
        * @method getBytesLoaded
        * @return {Number}
        * @readOnly
        * @deprecated Use 'bytesLoaded' instead. Deprecated as of 1.2.0
        * @public
        */
        getBytesLoaded(): number;
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
    * @param game {Kiwi.Game} The game that this DataLibrary belongs to.
    * @return {Kiwi.Files.DataLibrary}
    *
    */
    class DataLibrary {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "DataLibrary"
        * @public
        */
        objType(): string;
        /**
        * The game that this DataLibrary belongs to.
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * Contains all of the data that this available.
        * @property data
        * @type Object
        * @public
        */
        data: any;
        /**
        * Resets the Data Library and makes it ready for the next state.
        * @method clear
        * @public
        */
        clear(): void;
        /**
        * Adds a new data file to the DataLibrary.
        * @method add
        * @param dataFile {Kiwi.Files.File} The File that is to be added.
        * @public
        */
        add(dataFile: Kiwi.Files.File): void;
        /**
       * Rebuild the library from a fileStore. Clears the library and repopulates it.
       * @method rebuild
       * @param fileStore {Kiwi.Files.FileStore} The fileStore which is being used
       * @param state {Kiwi.State} The State so that we know which DataLibrary to add the files tot.
       * @public
       */
        rebuild(fileStore: Kiwi.Files.FileStore, state: Kiwi.State): void;
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
    * Base class which handles the loading of an external data file an xhr.
    * TextureFile, AudioFile contain fallback loading via tags and all extended Files contain methods for processing the files.
    *
    * Also can contain information about the file (like file size, last modified, e.t.c.)
    * Uses an object literal in its constructor since 1.2 (which is preferred), but also contains previous construction support.
    *
    * @class File
    * @namespace Kiwi.Files
    * @constructor
    * @param game {Kiwi.Game} The game that this file is for
    * @param params {Object} Options for this file.
    *   @param params.key {String} User defined name for this file. This would be how the user would access it in the file store.
    *   @param params.url {String} Location of the file to be loaded.
    *   @param {Object} [params.metadata={}] Any metadata to be associated with the file.
    *   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
    *   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
    *   @param [params.type=UNKNOWN] {Number} The type of file this is.
    *   @param [params.tags] {Array} Any tags to be associated with this file.
    * @return {Kiwi.Files.File}
    *
    */
    class File {
        constructor(game: Kiwi.Game, params: any);
        /**
        * Assigns properties and variables for the constructor as in pre 1.2 Kiwi versions.
        *
        * @method _parseParamsOld
        * @since 1.2.0
        * @param dataType {Number} The type of file that is being loaded. For this you can use the STATIC properties that are located on this class for quick code completion.
        * @param path {String} The location of the file that is to be loaded.
        * @param [name=''] {String} A name for the file. If no name is specified then the files name will be used.
        * @param [saveToFileStore=true] {Boolean} If the file should be saved on the file store or not.
        * @param [storeAsGlobal=true] {Boolean} If this file should be stored as a global file, or if it should be destroyed when this state gets switched out.
        * @private
        */
        private _parseParamsOld(dataType, url, name?, saveToFileStore?, storeAsGlobal?);
        /**
        * Sets properties for this instance based on an object literal passed. Used when the class is being created.
        *
        * @method parseParams
        * @since 1.2.0
        * @param [params] {Object}
        *   @param [params.metadata={}] {Object} Any metadata to be associated with the file.
        *   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
        *   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
        *   @param [params.type=UNKNOWN] {Number} The type of file this is.
        *   @param [params.tags] {Array} Any tags to be associated with this file.
        * @protected
        */
        protected parseParams(params: any): void;
        /**
        * Gets the file details from the URL passed. Name, extension, and path are extracted.
        *
        * @method _assignFileDetails
        * @param url {String}
        * @private
        * @since 1.2.0
        */
        private _assignFileDetails(url);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "File"
        * @public
        */
        objType(): string;
        /**
        * The game that this file belongs to.
        * @property game
        * @type Kiwi.Game
        * @since 1.2.0
        * @public
        */
        game: Kiwi.Game;
        /**
        * ---------------
        * Generic Properties
        * ---------------
        **/
        /**
        * Indicates if this file can be loaded in parallel to other files.
        * This is usually only used files are using the tag loaders and not XHR.
        *
        * @property _loadInParallel
        * @type Boolean
        * @default false
        * @since 1.2.0
        * @private
        */
        protected _loadInParallel: boolean;
        /**
        * READ ONLY: Indicates if this file can be loaded in parallel to other files.
        * This is usually only used files are using the tag loaders and not XHR.
        *
        * @property loadInParallel
        * @type Boolean
        * @default false
        * @readOnly
        * @since 1.2.0
        * @private
        */
        loadInParallel: boolean;
        /**
        * The filestore this file should be added to when it has loaded.
        * This can be replaced with a custom one if wanted.
        *
        * @property fileStore
        * @type Kiwi.Files.FileStore
        * @since 1.2.0
        * @public
        */
        fileStore: Kiwi.Files.FileStore;
        /**
        * If this file is using tag loading instead of the XHR method.
        * Only used by extended classes
        *
        * @property useTagLoader
        * @type Boolean
        * @since 1.2.0
        * @protected
        */
        protected useTagLoader: boolean;
        /**
        * The 'key' is the user defined name and the users way of accessing this file once loaded.
        * @property key
        * @type String
        * @public
        */
        key: string;
        /**
        * A dictionary, stores any information relating to this file.
        * Used when loading images that are to be used as a spritesheet or texture atlas.
        * @property data
        * @type Any
        * @public
        */
        metadata: any;
        /**
        * Holds the type of data that is being loaded.
        * This should be used with the STATIC properties that hold the various datatypes that can be loaded.
        *
        * @property dataType
        * @type String
        * @public
        */
        dataType: number;
        /**
        * ---------------
        * File Information
        * ---------------
        */
        /**
        * The name of the file being loaded.
        *
        * @property name
        * @type String
        * @since 1.2.0
        * @public
        */
        name: string;
        /**
        * The location of where the file is placed without the file itself (So without the files name).
        * Example: If the file you are load is located at 'images/awesomeImage.png' then the filepath will be 'images/'
        *
        * @property path
        * @type String
        * @since 1.2.0
        * @public
        */
        path: string;
        /**
        * The extension of the file that is being loaded.
        * This is based upon what the file path that the developer specifies.
        *
        * @property extension
        * @type String
        * @since 1.2.0
        * @public
        */
        extension: string;
        /**
        * The full filepath including the file itself.
        *
        * @property URL
        * @type String
        * @since 1.2.0
        * @public
        */
        URL: string;
        /**
        * The type of file that is being loaded.
        * Is only ever given a value when used with the XHR method of loading OR if you use 'loadDetails' before hand.
        * The value is based off of the 'Content-Type' of the XHR's response header returns.
        *
        * @property type
        * @type String
        * @public
        */
        type: string;
        /**
        * The size of the file that was/is being loaded.
        * Only has a value when the file was loaded by the XHR method OR you request the file information beforehand using 'loadDetails'.
        *
        * @property size
        * @type Number
        * @default 0
        * @since 1.2.0
        * @public
        */
        size: number;
        /**
        * ---------------
        * Callbacks
        * ---------------
        */
        /**
        * Signal which dispatches events when the file has successfully loaded.
        *
        * @property onComplete
        * @type Kiwi.Signal
        * @since 1.2.0
        * @public
        */
        onComplete: Kiwi.Signal;
        /**
        * Signal which dispatches events when the file is loading.
        * Not guarenteed to dispatch events as it depends on the method of loading being performed
        *
        * @property onProgress
        * @type Kiwi.Signal
        * @since 1.2.0
        * @public
        */
        onProgress: Kiwi.Signal;
        /**
        * ---------------
        * Loading
        * ---------------
        **/
        /**
        * The particular piece of data that the developer wanted loaded. This is in a format that is based upon the datatype passed.
        * @property data
        * @type Any
        * @public
        */
        data: any;
        /**
        * The number of milliseconds that the XHR should wait before timing out.
        * Set this to NULL if you want it to not timeout.
        *
        * @property timeOutDelay
        * @type Number
        * @default 4000
        * @public
        */
        timeOutDelay: number;
        /**
        * The default number of milliseconds that the XHR should wait before timing out.
        * Set this to NULL if you want it to not timeout.
        *
        * @property TIMEOUT_DELAY
        * @type Number
        * @static
        * @since 1.2.0
        * @public
        */
        static TIMEOUT_DELAY: number;
        /**
        * The number of attempts at loading there have currently been at loading the file.
        * This is only used with XHR methods of loading.
        * @property attemptCounter
        * @type Number
        * @protected
        */
        protected attemptCounter: number;
        /**
        * The maximum attempts at loading the file that there is allowed.
        * @property maxLoadAttempts
        * @type Number
        * @default 2
        * @public
        */
        maxLoadAttempts: number;
        /**
        * The default maximum attempts at loading the file that there is allowed.
        * @property MAX_LOAD_ATTEMPTS
        * @type Number
        * @default 2
        * @static
        * @since 1.2.0
        * @public
        */
        static MAX_LOAD_ATTEMPTS: number;
        /**
        * Starts the loading process for this file.
        * Passing parameters to this method has been deprecated and only exists for backwards compatibility.
        *
        * @method load
        * @public
        */
        load(onCompleteCallback?: any, onProgressCallback?: any, customFileStore?: Kiwi.Files.FileStore, maxLoadAttempts?: number, timeout?: number): void;
        /**
        * Increments the counter, and calls the approprate loading method.
        * @method _load
        * @since 1.2.0
        * @protected
        */
        protected _load(): void;
        /**
        * Should be called by the loading method. Dispatches the 'onProgress' callback.
        * @method loadProgress
        * @since 1.2.0
        * @protected
        */
        protected loadProgress(): void;
        /**
        * Called by the loading methods when the file has been loaded and successfully processed.
        * Dispatches the 'onComplete' callback and sets the appropriate properties.
        * @method loadSuccess
        * @since 1.2.0
        * @protected
        */
        protected loadSuccess(): void;
        /**
        * Executed when the loading process fails.
        * This could be for any reason
        *
        * @method loadError
        * @param error {Any} The event / reason for the file to not be loaded.
        * @since 1.2.0
        * @protected
        */
        protected loadError(error: any): void;
        /**
        * ---------------
        * XHR Loading
        * ---------------
        **/
        /**
        * Sets up a XHR loader based on the properties of this file and parameters passed.
        *
        * @method xhrLoader
        * @param [method="GET"] {String} The method this request should be made in.
        * @param [responseType="text"] {String} The type of response we are expecting.
        * @param [timeoutDelay] {Number}
        * @protected
        */
        protected xhrLoader(method?: string, responseType?: string, timeoutDelay?: number): void;
        /**
        * Progress event fired whilst the file is loading via XHR.
        * @method xhrOnProgress
        * @param event {Any}
        * @protected
        */
        protected xhrOnProgress(event: any): void;
        /**
        * Fired when the file has been loaded.
        * Checks that the response contains information before marking it as a success.
        *
        * @method xhrOnLoad
        * @param event {Any}
        * @protected
        */
        protected xhrOnLoad(event: any): void;
        /**
        * Contains the logic for processing the information retrieved via XHR.
        * Assigns the data property.
        * This method is also in charge of calling 'loadSuccess' (or 'loadError') when processing is complete.
        *
        * @method processXhr
        * @param response
        * @protected
        */
        protected processXhr(response: any): void;
        /**
        * The XMLHttpRequest object. This only has a value if the xhr method of load is being used, otherwise this is null.
        * @property _xhr
        * @type XMLHttpRequest
        * @protected
        */
        protected _xhr: XMLHttpRequest;
        /**
        * -----------------
        * Loading Status
        * -----------------
        **/
        /**
        * The time at which the loading started.
        * @property timeStarted
        * @type Number
        * @default 0
        * @public
        */
        timeStarted: number;
        /**
        * The time at which progress in loading the file was last occurred.
        * Only contains a value when using XHR methods of loading.
        * @property lastProgress
        * @type Number
        * @public
        */
        lastProgress: number;
        /**
        * The time at which the load finished.
        * @property timeFinished
        * @type Number
        * @default 0
        * @public
        */
        timeFinished: number;
        /**
        * The duration or how long it took to load the file. In milliseconds.
        * @property duration
        * @type Number
        * @default 0
        * @public
        */
        duration: number;
        /**
        * Is executed when this file starts loading.
        * Gets the time and resets properties used in file loading.
        * @method _start
        * @private
        */
        private _start();
        /**
        * Is executed when this file stops loading.
        * @method _stop
        * @private
        */
        private _stop();
        /**
        * If file loading failed or encountered an error and so was not laoded
        * @property hasError
        * @type boolean
        * @default false
        * @public
        */
        hasError: boolean;
        /**
        * Holds the error (if there was one) when loading the file.
        * @property error
        * @type Any
        * @public
        */
        error: any;
        /**
        * If loading was successful or not.
        * @property success
        * @type boolean
        * @public
        */
        success: boolean;
        /**
        * Indication if the file is currently being loaded or not.
        * @property loading
        * @type boolean
        * @public
        */
        loading: boolean;
        /**
        * Indicates if the file has attempted to load.
        * This is regardless of whether it was a success or not.
        * @property complete
        * @type boolean
        * @default false
        * @public
        */
        complete: boolean;
        /**
        * The amount of percent loaded the file is. This is out of 100.
        * @property percentLoaded
        * @type Number
        * @public
        */
        percentLoaded: number;
        /**
        * The number of bytes that have currently been loaded.
        * Useful when wanting to know exactly how much data has been transferred.
        * Only has a value when using the XHR method of loading.
        *
        * @property bytesLoaded
        * @type Number
        * @default 0
        * @public
        */
        bytesLoaded: number;
        /**
        * The total number of bytes that the file consists off.
        * Only has a value when using the XHR method of loading
        * or you are getting the file details before hand.
        *
        * @property bytesTotal
        * @type Number
        * @default 0
        * @public
        */
        bytesTotal: number;
        /**
        * --------------------
        * XHR Header Information
        * --------------------
        **/
        /**
        * The callback method to be executed when the file details have been retrieved.
        * @property headCompleteCallback
        * @type Any
        * @since 1.2.0
        * @private
        */
        private headCompleteCallback;
        /**
        * The context the 'headCompleteCallback' should be executed in..
        * The callback is the following arguments.
        * 1. If the details were recieved
        *
        * @property headCompleteContext
        * @type Any
        * @since 1.2.0
        * @private
        */
        private headCompleteContext;
        /**
        * An indication of whether this files information has been retrieved or not.
        * @property detailsReceived
        * @type boolean
        * @default false
        * @since 1.2.0
        * @public
        */
        detailsReceived: boolean;
        /**
        * Makes a XHR HEAD request to get information about the file that is going to be downloaded.
        * This is particularly useful when you are wanting to check how large a file is before loading all of the content.
        *
        * @method loadDetails
        * @param [callback] {Any}
        * @param [context] {Any}
        * @return {Boolean} If the request was made
        * @since 1.2.0
        * @public
        */
        loadDetails(callback?: any, context?: any): boolean;
        /**
        * Retrieves the HEAD information from the XHR.
        * This method is used for both 'load' and 'loadDetails' methods.
        *
        * @method _getXhrHeaderInfo
        * @since 1.2.0
        * @private
        */
        private _getXhrHeaderInfo();
        /**
        * Sets up a XMLHttpRequest object and sends a HEAD request.
        * @method xhrHeadRequest
        * @since 1.2.0
        * @private
        */
        private xhrHeadRequest();
        /**
        * Executed when a xhr head request fails
        * @method xhrHeadOnError
        * @param event {Any}
        * @private
        */
        private xhrHeadOnError(event);
        /**
        * Executed when a XHR head request has loaded.
        * Checks that the status of the request is 200 before classifying it as a success.
        * @method xhrHeadOnLoad
        * @param event {Any}
        * @private
        */
        private xhrHeadOnLoad(event);
        /**
        * --------------------
        * MISC
        * --------------------
        **/
        /**
        * The Entity Tag that is assigned to the file. O
        * Only has a value when either using the XHR loader OR when requesting the file details.
        * @property ETag
        * @type String
        * @public
        */
        ETag: string;
        /**
        * The last date/time that this file was last modified.
        * Only has a value when using the XHR method of loading OR when requesting the file details.
        * @property lastModified
        * @type String
        * @default ''
        * @public
        */
        lastModified: string;
        /**
        * --------------------
        * Tagging + State
        * --------------------
        **/
        /**
        * The state that added the entity - or null if it was added as global
        * @property ownerState
        * @type Kiwi.State
        * @public
        */
        ownerState: Kiwi.State;
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
        addTag(tag: string): void;
        /**
        * Removes a tag from this file.
        * @method removeTag
        * @param tag {String} The tag that is to be removed.
        * @public
        */
        removeTag(tag: string): void;
        /**
        * Checks to see if a tag that is passed exists on this file.
        * Returns a boolean that is used as a indication of the results.
        * True means that the tag exists on this file.
        *
        * @method hasTag
        * @param tag {String} The tag you are checking to see exists.
        * @return {Boolean} If the tag does exist on this file or not.
        * @public
        */
        hasTag(tag: string): boolean;
        /**
        * -------------------
        * File Type
        * -------------------
        **/
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
        *
        * @property UNKNOWN
        * @type number
        * @static
        * @final
        * @default 8
        * @public
        */
        static UNKNOWN: number;
        /**
        * An indication of if this file is texture. This is READ ONLY.
        * @property isTexture
        * @type boolean
        * @readOnly
        * @public
        */
        isTexture: boolean;
        /**
        * An indication of if this file is a piece of audio. This is READ ONLY.
        * @property isAudio
        * @type boolean
        * @readOnly
        * @public
        */
        isAudio: boolean;
        /**
        * An indication of if this file is data. This is READ ONLY.
        * @property isData
        * @type boolean
        * @readOnly
        * @public
        */
        isData: boolean;
        /**
        * ------------------
        * Clean Up
        * ------------------
        **/
        /**
        * Destroys all external object references on this object.
        * @method destroy
        * @since 1.2.0
        * @public
        */
        destroy(): void;
        /**
        * ------------------
        * Deprecated
        * ------------------
        **/
        /**
        * The name of the file being loaded.
        * @property fileName
        * @type String
        * @deprecated Use `name`. Deprecated as of 1.2.0
        * @public
        */
        fileName: string;
        /**
        * The location of where the file is placed without the file itself (So without the files name).
        * Example: If the file you are load is located at 'images/awesomeImage.png' then the filepath will be 'images/'
        * @property filePath
        * @type String
        * @deprecated Use `path`. Deprecated as of 1.2.0
        * @public
        */
        filePath: string;
        /**
        * The location of where the file is placed without the file itself (So without the files name).
        * Example: If the file you are load is located at 'images/awesomeImage.png' then the filepath will be 'images/'
        * @property filePath
        * @type String
        * @deprecated Use `extension`. Deprecated as of 1.2.0
        * @public
        */
        fileExtension: string;
        /**
        * The full filepath including the file itself.
        * @property fileURL
        * @type String
        * @deprecated Use `URL`. Deprecated as of 1.2.0
        * @public
        */
        fileURL: string;
        /**
        * The type of file that is being loaded.
        * Is only ever given a value when used with the XHR method of loading OR if you use 'getFileDetails' before hand.
        * The value is based off of the 'Content-Type' of the XHR's response header returns.
        * @property fileType
        * @type String
        * @deprecated Use `type`. Deprecated as of 1.2.0
        * @public
        */
        fileType: string;
        /**
        * The size of the file that was/is being loaded.
        * Only has a value when the file was loaded by the XHR method OR you request the file information before hand using 'getFileDetails'.
        * @property fileSize
        * @type Number
        * @deprecated Use `size`. Deprecated as of 1.2.0
        * @public
        */
        fileSize: number;
        /**
        * A method that is to be executed when this file has finished loading.
        * @property onCompleteCallback
        * @type Any
        * @default null
        * @deprecated Use `onComplete`. Deprecated as of 1.2.0
        * @public
        */
        /**
        * A method that is to be executed while this file is loading.
        * @property onProgressCallback
        * @type Any
        * @default null
        * @deprecated Use `onProgress`. Deprecated as of 1.2.0
        * @public
        */
        /**
        * The status of this file that is being loaded.
        * Only used/has a value when the file was/is being loaded by the XHR method.
        * @property status
        * @type Number
        * @default 0
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        status: number;
        /**
        * The status piece of text that the XHR returns.
        * @property statusText
        * @type String
        * @default ''
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        statusText: string;
        /**
        * The ready state of the XHR loader whilst loading.
        * @property readyState
        * @type Number
        * @default 0
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        readyState: number;
        /**
        * If this file has timeout when it was loading.
        * @property hasTimedOut
        * @type boolean
        * @default false
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        hasTimedOut: boolean;
        /**
        * If the file timed out or not.
        * @property timedOut
        * @type Number
        * @default 0
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        timedOut: number;
        /**
        * The response that is given by the XHR loader when loading is complete.
        * @property buffer
        * @type Any
        * @deprecated Use 'data' instead. Deprecated as of 1.2.0
        * @public
        */
        buffer: any;
        /**
        * Attempts to make the file send a XHR HEAD request to get information about the file that is going to be downloaded.
        * This is particularly useful when you are wanting to check how large a file is before loading all of the content.
        * @method getFileDetails
        * @param [callback=null] {Any} The callback to send this FileInfo object to.
        * @param [maxLoadAttempts=1] {number} The maximum amount of load attempts. Only set this if it is different from the default.
        * @param [timeout=this.timeOutDelay] {number} The timeout delay. By default this is the same as the timeout delay property set on this file.
        * @deprecated Use 'loadDetails' instead. Deprecated as of 1.2.0
        * @private
        */
        getFileDetails(callback?: any, maxLoadAttempts?: number, timeout?: number): void;
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
    * @param game {Kiwi.Game} The game that this FileStore belongs to.
    * @return {Kiwi.Files.FilesStore}
    *
    */
    class FileStore {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "FileStore"
        * @public
        */
        objType(): string;
        /**
        * The game that this FileStore belongs to.
        * @property _game
        * @type Kiwi.Game
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
        boot(): void;
        /**
        * Returns a particular file by the key that you specify.
        * @method getFile
        * @param key {String} The key of the file that you to get.
        * @return {Kiwi.Files.File}
        * @public
        */
        getFile(key: string): Kiwi.Files.File;
        /**
        * Returns an object full of files that have a Tag that is associated with it.
        * @method getFilesByTag
        * @param tag {String}
        * @return {Object} All of the files with that tag.
        * @public
        */
        getFilesByTag(tag: string): Object;
        /**
        * Removes all of the files by a tag that is specified.
        * @method removeFilesByTag
        * @param tag {String}
        * @return {Number} The number of files that were removed.
        * @public
        */
        removeFilesByTag(tag: string): number;
        /**
        * Returns all of the keys for every file that exist on this FileStore as an array.
        * @property keys
        * @type String[]
        * @public
        */
        keys: string[];
        /**
        * Returns the number of files that are on this FileStore.
        * @method size
        * @return {Number}
        * @public
        */
        size(): number;
        /**
        * Adds a File with a key to the FileStore. If the key that you specify already exists then this method will return false otherwise it should return true if it was added.
        * @method addFile
        * @param key {String} A unique key that this file should be accessed by.
        * @param value {Kiwi.Files.File} The file that you would like to save on the FileStore.
        * @return {Boolean} If the file was added or not
        * @public
        */
        addFile(key: string, value: Kiwi.Files.File): boolean;
        /**
        * Checks to see if a key that you pass is already being used for another file. Returns true if that key is already in used, false if it isn't.
        * @method exists
        * @param key {String} The key that you are checking.
        * @return {Boolean}
        * @public
        */
        exists(key: string): boolean;
        /**
        * Removes files on the FileStore that are associated with a particular state.
        * @method removeStateFiles
        * @param state {Kiwi.State}
        * @public
        */
        removeStateFiles(state: Kiwi.State): void;
        /**
        * Removes all the files on the FileStore which are not associate with a particular state.
        * @method removeGlobalFiles
        * @since 1.3.0
        * @public
        */
        removeGlobalFiles(): void;
        /**
        * Removes a file by the key that is passed. Returns a boolean indicating if a file was removed or not.
        * Note: Only returns false if that file did not exist in the first place.
        * @method removeFile
        * @param key {String} The key of the file you want to remove.
        * @return {Boolean}
        * @public
        */
        removeFile(key: string, destroy?: boolean): boolean;
        /**
        * Removes all files on the FileStore.
        * Use this method with caution.
        *
        * @method removeAllFiles
        * @since 1.3.0
        * @public
        */
        removeAllFiles(): void;
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
        isReady: boolean;
        /**
        * The parent div in which the layers and input live
        * @property container
        * @type HTMLDivElement
        * @public
        */
        container: HTMLDivElement;
        /**
        * This div sits on-top of all layers and captures user input
        * @property input
        * @type HTMLDivElement
        * @public
        */
        input: HTMLDivElement;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "Bootstrap"
        * @public
        */
        objType(): string;
        /**
        * Called at the start of the game to check to see if the DOM is ready before we do anything requiring it
        * @method boot
        * @param {String} domParent
        * @param {Any} [callback=null]
        * @param {boolean} [createContainer=true]
        * @public
        */
        boot(domParent: string, callback?: any, createContainer?: boolean): void;
        /**
        * If the DOM is ready it fires our callback, otherwise sets a short timeout to try again
        * @method ready
        * @public
        */
        ready(): void;
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
        * @return {String} "Device"
        * @public
        */
        objType(): string;
        /**
        *
        * @property iOS
        * @type boolean
        * @public
        */
        iOS: boolean;
        /**
        *
        * @property android
        * @type boolean
        * @public
        */
        android: boolean;
        /**
        *
        * @property chromeOS
        * @type boolean
        * @public
        */
        chromeOS: boolean;
        /**
        *
        * @property linux
        * @type boolean
        * @public
        */
        linux: boolean;
        /**
        *
        * @property maxOS
        * @type boolean
        * @public
        */
        macOS: boolean;
        /**
        *
        * @property windows
        * @type boolean
        * @public
        */
        windows: boolean;
        /**
        *
        * @property windowsPhone
        * @type boolean
        * @public
        */
        windowsPhone: boolean;
        /**
        *
        * @property canvas
        * @type boolean
        * @public
        */
        canvas: boolean;
        /**
        *
        * @property file
        * @type boolean
        * @public
        */
        file: boolean;
        /**
        *
        * @property fileSystem
        * @type boolean
        * @public
        */
        fileSystem: boolean;
        /**
        *
        * @property localStorage
        * @type boolean
        * @public
        */
        localStorage: boolean;
        /**
        *
        * @property webGL
        * @type boolean
        * @public
        */
        webGL: boolean;
        /**
        *
        * @property worker
        * @type boolean
        * @public
        */
        worker: boolean;
        /**
        *
        * @property blob
        * @type boolean
        * @public
        */
        blob: boolean;
        /**
        *
        * @property touch
        * @type boolean
        * @public
        */
        touch: boolean;
        /**
        * If the type of touch events are pointers (event msPointers)
        * @property pointerEnabled
        * @type boolean
        * @public
        */
        pointerEnabled: boolean;
        /**
        *
        * @property arora
        * @type boolean
        * @public
        */
        arora: boolean;
        /**
        *
        * @property chrome
        * @type boolean
        * @public
        */
        chrome: boolean;
        /**
        *
        * @property epiphany
        * @type boolean
        * @public
        */
        epiphany: boolean;
        /**
        *
        * @property firefox
        * @type boolean
        * @public
        */
        firefox: boolean;
        /**
        *
        * @property ie
        * @type boolean
        * @public
        */
        ie: boolean;
        /**
        *
        * @property ieVersion
        * @type Number
        * @public
        */
        ieVersion: number;
        /**
        *
        * @property ieMobile
        * @type boolean
        * @public
        */
        ieMobile: boolean;
        /**
        *
        * @property mobileSafari
        * @type boolean
        * @public
        */
        mobileSafari: boolean;
        /**
        *
        * @property midori
        * @type boolean
        * @public
        */
        midori: boolean;
        /**
        *
        * @property opera
        * @type boolean
        * @public
        */
        opera: boolean;
        /**
        *
        * @property safari
        * @type boolean
        * @public
        */
        safari: boolean;
        /**
        *
        * @property webApp
        * @type boolean
        * @public
        */
        webApp: boolean;
        /**
        *
        * @property audioData
        * @type boolean
        * @public
        */
        audioData: boolean;
        /**
        *
        * @property webaudio
        * @type boolean
        * @public
        */
        webaudio: boolean;
        /**
        *
        * @property ogg
        * @type boolean
        * @public
        */
        ogg: boolean;
        /**
        *
        * @property mp3
        * @type boolean
        * @public
        */
        mp3: boolean;
        /**
        *
        * @property wav
        * @type boolean
        * @public
        */
        wav: boolean;
        /**
        *
        * @property m4a
        * @type boolean
        * @public
        */
        m4a: boolean;
        /**
        *
        * @property iPhone
        * @type boolean
        * @public
        */
        iPhone: boolean;
        /**
        *
        * @property iPhone4
        * @type boolean
        * @public
        */
        iPhone4: boolean;
        /**
        *
        * @property iPad
        * @type boolean
        * @public
        */
        iPad: boolean;
        /**
        *
        * @property pixelRatio
        * @type Number
        * @public
        */
        pixelRatio: number;
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
        * @method getAll
        * @return {String}
        * @public
        */
        getAll(): string;
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
    * A TextureAtlas is the base class that is created for each image that is loaded through Kiwi. Each TextureAtlas contains a name (the same as the key that the user chose when loading the image in),the HTMLImageElement that it is for and a number of cells.
    *
    * @class TextureAtlas
    * @namespace Kiwi.Textures
    * @constructor
    * @param name {string} Name of the texture atlas. This is usually defined by the developer when loading the assets.
    * @param type {number} The type of texture atlas that this is. There are currently only three types.
    * @param cells {any} The cells that are within this image..
    * @param image {HTMLImageElement/HTMLCanvasElement} The image that the texture atlas is using.
    * @param [sequences] {Sequence[]} Any sequences of cells for this texture atlas. Used for animation.
    * @return {Kiwi.TextureAtlas}
    *
    */
    class TextureAtlas {
        constructor(name: string, type: number, cells: any, image: any, sequences?: Kiwi.Animations.Sequence[]);
        /**
        * The type of object that this texture atlas is.
        * @method objType
        * @return {string} "TextureAtlas"
        * @public
        */
        objType(): string;
        /**
        * The name of this texture atlas
        * @property name
        * @type string
        * @public
        */
        name: string;
        /**
        * Indicates that the image data has changed, and needs to be reuplaoded to the gpu in webGL mode.
        * @property dirty
        * @type boolean
        * @public
        */
        dirty: boolean;
        /**
        * The image that this texture atlas is holding. Can be an HTMLImageElement or a HTMLCanvasElement
        * @property image
        * @type HTMLImageElement/HTMLCanvasElement
        * @public
        */
        image: any;
        /**
        * The cells for this image.
        * @property cells
        * @type Array
        * @public
        */
        cells: any;
        /**
        * An array of Sequences that are for this texture.
        * @property sequences
        * @type Array
        * @public
        */
        sequences: Kiwi.Animations.Sequence[];
        /**
        * The cell that is to be render at the start.
        * @property cellIndex
        * @type number
        * @default 0
        * @public
        */
        cellIndex: number;
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
        type: number;
        glTextureWrapper: Kiwi.Renderers.GLTextureWrapper;
        /**
        * Creates a GLTextureWrapper to allow the atlas to communicate efficiently with the video card. This is mostly an internal method.
        *
        * If you are extending TextureAtlas to incorporate multiple textures, you will need to override this method.
        * @method createGLTextureWrapper
        * @param gl {WebGLRenderingContext} The rendering context.
        * @param textureManager {Kiwi.Renderers.GLTextureManager} The texture manager.
        * @public
        * @since 1.1.0
        */
        createGLTextureWrapper(gl: WebGLRenderingContext, textureManager: Kiwi.Renderers.GLTextureManager): void;
        /**
        * Sends the texture to the video card.
        * @method enableGL
        * @param gl {WebGLRenderingContext}
        * @param renderer {Renderer}
        * @param textureManager {GLTextureManager}
        * @public
        * @since 1.1.0
        */
        enableGL(gl: WebGLRenderingContext, renderer: Kiwi.Renderers.Renderer, textureManager: Kiwi.Renderers.GLTextureManager): void;
        /**
        * Will reload the texture into video memory for WebGL rendering.
        *
        * @method refreshTextureGL
        * @param glContext {WebGLRenderingContext}
        * @public
        * @since 1.0.1
        */
        refreshTextureGL(glContext: any): void;
        /**
        * Will populate this texture atlas with information based on a JSON file that was passed.
        *
        * @method readJSON
        * @param {any} atlasJSON
        * @public
        */
        readJSON(atlasJSON: any): void;
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
    * @return {Kiwi.TextureLibrary}
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
        objType(): string;
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
        textures: any;
        /**
        * Resets the texture library.
        * @method clear
        * @public
        */
        clear(): void;
        /**
        * Adds a texture atlas to the library.
        * @method add
        * @param atlas {Kiwi.Textures.TextureAtlas}
        * @public
        */
        add(atlas: TextureAtlas): void;
        /**
        * Adds a new image file to the texture library.
        * @method addFromFile
        * @param imageFile {Kiwi.File}
        * @public
        */
        addFromFile(imageFile: Kiwi.Files.File): void;
        /**
        * Used to rebuild a Texture from the FileStore into a base2 size if it doesn't have it already.
        * @method _rebuildImage
        * @param imageFile {Kiwi.File} The image file that is to be rebuilt.
        * @return {Kiwi.File} The new image file.
        * @private
        */
        private _rebuildImage(imageFile);
        /**
        * Used to build a new texture atlas based on the image file provided. Internal use only.
        * @method _buildTextureAtlas
        * @param imageFile {Kiwi.File} The image file that is to be used.
        * @return {Kiwi.Textures.TextureAtlas} The new texture atlas that is created.
        * @private
        */
        private _buildTextureAtlas(imageFile);
        /**
        * Builds a spritesheet atlas from the an image file that is provided.
        * @method _buildSpriteSheet
        * @param imageFile {Kiwi.File} The image file that is to be used.
        * @return {Kiwi.Textures.SpriteSheet} The SpriteSheet that was just created.
        * @private
        */
        private _buildSpriteSheet(imageFile);
        /**
        * Builds a single image atlas from a image file that is provided.
        * @method _buildImage
        * @param imageFile {File} The image file that is to be used.
        * @return {Kiwi.Textures.SingleImage} The SingleImage that was created.
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
        rebuild(fileStore: Kiwi.Files.FileStore, state: Kiwi.State): void;
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
    class SpriteSheet extends TextureAtlas {
        constructor(name: string, texture: any, cellWidth: number, cellHeight: number, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {string} "SpriteSheet"
        * @public
        */
        objType(): string;
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
        rows: number;
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
        cols: number;
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
        generateAtlasCells(): Array<any>;
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
    * @return {Kiwi.SingleImage}
    */
    class SingleImage extends TextureAtlas {
        constructor(name: string, image: any, width?: number, height?: number, offsetX?: number, offsetY?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {string} "SingleImage"
        * @public
        */
        objType(): string;
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
        * The offset for the image on the Y axis.
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
        generateAtlasCells(): Array<any>;
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
        * @return {String} "Back"
        * @public
        */
        objType(): string;
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
        * @return {String} "Bounce"
        * @public
        */
        objType(): string;
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
        * @return {String} "Circular"
        * @public
        */
        objType(): string;
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
        * @return {String} "Cubic"
        * @public
        */
        objType(): string;
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
        * @return {String} "Elastic"
        * @public
        */
        objType(): string;
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
        * @return {String} "Exponential"
        * @public
        */
        objType(): string;
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
        * @return {String} "Linear"
        * @public
        */
        objType(): string;
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
        * @return {String} "Quadratic"
        * @public
        */
        objType(): string;
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
        * @return {String} "Quartic"
        * @public
        */
        objType(): string;
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
        * @return {String} "Quintic"
        * @public
        */
        objType(): string;
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
        * @return {String} "Sinusoidal"
        * @public
        */
        objType(): string;
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
    * @param game {Kiwi.Game} Current game
    * @param [clock] {Kiwi.Time.Clock} Clock to use for tweens.
    *   Defaults to game.time.clock.
    * @return {Kiwi.Animations.TweenManager}
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
        constructor(game: Kiwi.Game, clock?: Kiwi.Time.Clock);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "TweenManager"
        * @public
        */
        objType(): string;
        /**
        * The game that this manager belongs to.
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * An array of all of the tweens on the manager.
        * @property _tweens
        * @type Kiwi.Animations.Tween[]
        * @private
        */
        private _tweens;
        /**
        * Clock used by tweens
        * @property clock
        * @type Kiwi.Time.Clock
        * @public
        * @since 1.2.0
        */
        clock: Kiwi.Time.Clock;
        /**
        * Returns all of tweens that are on the manager.
        * @method getAll
        * @return Kiwi.Animations.Tween[]
        * @public
        */
        getAll(): Tween[];
        /**
        * Removes all of the tweens on the manager.
        * @method removeAll
        * @public
        */
        removeAll(): void;
        /**
        * Creates a new Tween.
        * @method create
        * @param object {Any} The object that this tween is to apply.
        * @return {Kiwi.Animations.Tween} The tween that was created.
        * @public
        */
        create(object: any): Kiwi.Animations.Tween;
        /**
        * Adds a tween to the manager.
        * @method add
        * @param tween {Kiwi.Animations.Tween} The tween that you want to add to the manager.
        * @return {Kiwi.Animations.Tween}
        * @public
        */
        add(tween: Kiwi.Animations.Tween): Kiwi.Animations.Tween;
        /**
        * Removes a tween from this manager.
        * @method remove
        * @param tween {Kiwi.Animations.Tween} The tween that you would like to remove.
        * @return {Kiwi.Animations.Tween} The tween passed in.
        * @public
        */
        remove(tween: Kiwi.Animations.Tween): Tween;
        /**
        * The update loop.
        * @method update
        * @return {boolean} Whether anything was updated
        * @public
        */
        update(): boolean;
        /**
        * Validate clock; if no valid clock is found, set one from game
        * @method validateClock
        * @public
        * @since 1.2.0
        */
        validateClock(): void;
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
    * @param game {Kiwi.Game} The game that this tween is for.
    * @return {Kiwi.Animations.Tween} This tween.
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
        * @return {String} "Tween"
        * @public
        */
        objType(): string;
        /**
        * The game that this tween belongs to.
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * The manager that this tween belongs to.
        * @property _manager
        * @type Kiwi.Animations.Tweens.TweenManager
        * @private
        */
        private _manager;
        /**
        * The manager that this tween belongs to.
        * @property manager
        * @type Kiwi.Animations.Tweens.TweenManager
        * @private
        * @since 1.2.0
        */
        manager: Kiwi.Animations.Tweens.TweenManager;
        /**
        * The object that this tween is affecting.
        * @property _object
        * @type Any
        * @private
        */
        private _object;
        /**
        * The object that this tween is affecting.
        * If you change this, it will continue to tween,
        * but any properties that are not on the new object
        * will be discarded from the tween.
        * @property object
        * @type any
        * @public
        */
        object: any;
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
        isRunning: boolean;
        /**
        * Sets up the various properties that define this tween.
        * The ending position/properties for this tween, how long the tween should go for, easing method to use and if should start right way.
        *
        * @method to
        * @param properties {Object} The ending location of the properties that you want to tween.
        * @param [duration=1000] {Number} The duration of the tween.
        * @param [ease=null] {Any} The easing method to be used. If not specifed then this will default to LINEAR.
        * @param [autoStart=false] {boolean} If the tween should start right away.
        * @return {Kiwi.Animations.Tween}
        * @public
        */
        to(properties: any, duration?: number, ease?: any, autoStart?: boolean): Tween;
        /**
        * Gets the initial values for the properties that it is to animate and starts the tween process.
        * @method start
        * @public
        */
        start(): Tween;
        /**
        * Stops the Tween from running and removes it from the manager.
        * @method stop
        * @public
        */
        stop(): Tween;
        /**
        * Sets the game and the manager of this tween.
        * @method setParent
        * @param {Kiwi.Game} value
        * @public
        */
        setParent(value: Kiwi.Game): void;
        /**
        * Sets the amount of delay that the tween is to have before it starts playing.
        * @method delay
        * @param amount {Number} The amount of time to delay the tween by.
        * @return {Kiwi.Animations.Tween}
        * @public
        */
        delay(amount: number): Tween;
        /**
        * Sets the easing method that is to be used when animating this tween.
        * @method easing
        * @param easing {Function} The easing function to use.
        * @return {Kiwi.Animations.Tween}
        * @public
        */
        easing(easing: any): Tween;
        /**
        * [REQUIRES DESCRIPTION]
        * @method interpolation
        * @param {Any} interpolation
        * @return {Kiwi.Animations.Tween}
        * @public
        */
        interpolation(interpolation: any): Tween;
        /**
        * Adds another tween that should start playing once tween has completed.
        * @method chain
        * @param tween {Kiwi.Animations.Tween}
        * @return {Kiwi.Animations.Tween}
        * @public
        */
        chain(tween: Kiwi.Animations.Tween): Tween;
        /**
        * Adds a function that is to be executed when the tween start playing.
        * @method onStart
        * @param callback {Function} The function that is to be executed on tween start.
        * @param context {any} The context that function is to have when called.
        * @return {Kiwi.Animations.Tween}
        * @public
        */
        onStart(callback: any, context: any): Tween;
        /**
        * Adds a function that is to be executed when this tween updates while it is playing.
        * @method onUpdate
        * @param callback {Function} The method that is to be executed.
        * @param context {Any} The context the method is to have when called.
        * @public
        */
        onUpdate(callback: any, context: any): Tween;
        /**
        * Defines a method that is to be called when this tween is finished.
        * @method onComplete
        * @param callback {Function} The method that is to be executed.
        * @param context {Any} The context the method is to have when called.
        * @public
        */
        onComplete(callback: any, context: any): Tween;
        /**
        * The update loop is executed every frame whilst the tween is running.
        * @method update
        * @param time {Number}
        * @return {boolean} Whether the Tween is still running
        * @public
        */
        update(time: number): boolean;
    }
}
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
    * @constructor
    * @namespace Kiwi.Renderers
    * @param game {Kiwi.Game} The game that this canvas renderer belongs to.
    * @return {Kiwi.Renderes.CanvasRenderer}
    *
    */
    class CanvasRenderer implements IRenderManager {
        constructor(game: Kiwi.Game);
        /**
        * The boot method is executed when all of the DOM elements that are needed to play the game are ready.
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String} "CanvasRenderer"
        * @public
        */
        objType(): string;
        /**
        * The game that this object belongs to.
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * The camera that is currently being used to render upon.
        * @property _currentCamera
        * @type Kiwi.Camera
        * @private
        */
        private _currentCamera;
        /**
        * This method recursively goes through a State's members and runs the render method of each member that is a Entity.
        * If it is a Group then this method recursively goes through that Groups members the process that happened to the State's members happens to the Group's members.
        *
        * @method _recurse
        * @param child {object} The child that is being checked.
        * @private
        */
        _recurse(child: IChild): void;
        requestRendererInstance(rendererID: string, params?: any): Kiwi.Renderers.Renderer;
        requestSharedRenderer(rendererID: string, params?: any): Kiwi.Renderers.Renderer;
        initState(state: Kiwi.State): void;
        endState(state: Kiwi.State): void;
        numDrawCalls: number;
        /**
        * Renders all of the Elements that are on a particular camera.
        * @method render
        * @param camera {Kiwi.Camera}
        * @public
        */
        render(camera: Kiwi.Camera): void;
    }
}
declare var mat2d: any, mat3: any, vec2: any, vec3: any, mat4: any;
/**
* @module Kiwi
* @submodule Renderers
* @main Renderers
* @namespace Kiwi.Renderers
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
    * @param game {Kiwi.Game} The game that this renderer belongs to.
    * @return {Kiwi.Renderers.GLRenderManager}
    */
    class GLRenderManager implements IRenderManager {
        constructor(game: Kiwi.Game);
        /**
        * Initialises all WebGL rendering services
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "GLRenderManager"
        * @public
        */
        objType(): string;
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
        * @type Kiwi.Renderes.GLTextureManager
        * @private
        */
        private _textureManager;
        /**
        * The shader manager object used to allocate GL Shaders.
        * @property _shaderManager
        * @type Kiwi.Renderes.GLShaderManager
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
        * The current blend mode.
        * @property _currentBlendMode
        * @type Kiwi.Renderers.GLBlendMode
        * @private
        * @since 1.1.0
        */
        private _currentBlendMode;
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
        numDrawCalls: number;
        /**
        * Maximum allowable sprites to render per frame
        * Note:Not currently used  - candidate for deletion
        * @property _maxItems
        * @type number
        * @default 1000
        * @private
        */
        private _maxItems;
        /**
        * Camera matrix used on graphics card
        * @property camMatrix
        * @type Float32Array
        * @public
        */
        camMatrix: Float32Array;
        /**
        * The most recently bound texture atlas.
        * @property _currentTextureAtlas
        * @type TextureAtlas
        * @private
        */
        private _currentTextureAtlas;
        /**
        * Adds a texture to the Texture Manager.
        * @method addTexture
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Textures.TextureAtlas} atlas
        * @public
        */
        addTexture(gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas): void;
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
        addSharedRenderer(rendererID: string, params?: any): boolean;
        /**
        * Adds a cloned renderer to the sharedRenderer array. The rendererID is a string that must match a renderer property of the Kiwi.Renderers object. The cloneID is the name for the cloned renderer.
        *
        * If a match is found and an instance does not already exist, then a renderer is instantiated and added to the array.
        *
        * Cloned shared renderers are useful if some items in your scene will use a special shader or blend mode, but others will not. You can subsequently access the clones with a normal requestSharedRenderer() call. You should use this instead of requestRendererInstance() whenever possible, because shared renderers are more efficient than instances.
        *
        * @method addSharedRendererClone
        * @param {String} rendererID
        * @param {String} cloneID
        * @param {Object} params
        * @return {Boolean} success
        * @public
        * @since 1.1.0
        */
        addSharedRendererClone(rendererID: string, cloneID: string, params?: any): boolean;
        /**
        * Requests a shared renderer. A game object that wants to use a shared renderer uses this method to obtain a reference to the shared renderer instance.
        * @method requestSharedRenderer
        * @param {String} rendererID
        * @param {Object} params
        * @return {Kiwi.Renderers.Renderer} A shared renderer or null if none found.
        * @public
        */
        requestSharedRenderer(rendererID: string, params?: any): Kiwi.Renderers.Renderer;
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
        requestRendererInstance(rendererID: string, params?: any): Kiwi.Renderers.Renderer;
        private _init();
        /**
        * Scales the viewport according to a scale mode and space dimensions.
        *
        * This is used internally for compatibility with CocoonJS and should not be called.
        * @method scaleViewport
        * @param gl {WebGLRenderingContext}
        * @param mode {number} The scale mode; should be either Kiwi.Stage.SCALE_FIT, Kiwi.Stage.SCALE_STRETCH, or Kiwi.Stage.SCALE_NONE. Defaults to Kiwi.Stage.SCALE_NONE.
        * @param width {number} Width of the target space.
        * @param height {number} Height of the target space.
        * @public
        * @since 1.1.1
        */
        scaleViewport(gl: WebGLRenderingContext, mode: number, width: number, height: number): void;
        /**
        * Performs initialisation required when switching to a different state. Called when a state has been switched to.
        * The textureManager is told to clear its contents from video memory, then rebuild its cache of textures from the state's texture library.
        * @method initState
        * @public
        */
        initState(state: Kiwi.State): void;
        /**
        * Performs cleanup required before switching to a different state. Called whwn a state is about to be switched from. The textureManager is told to empty its cache.
        * @method endState
        * @param state {Kiwi.State}
        * @public
        */
        endState(state: Kiwi.State): void;
        /**
        * Manages rendering of the scene graph - called once per frame.
        * Sets up per frame gl uniforms such as the view matrix and camera offset.
        * Clears the current renderer ready for a new batch.
        * Initiates recursive render of scene graph starting at the root.
        * @method render
        * @param camera {Camera}
        * @public
        */
        render(camera: Kiwi.Camera): void;
        private _sequence;
        private _batches;
        /**
        * Creates a new render sequence
        * @method collateRenderSequence
        * @public
        */
        collateRenderSequence(): void;
        /**
        * Adds a child to the render sequence (may be a group with children of it's own)
        * @method collateChild
        * @public
        */
        collateChild(child: IChild): void;
        /**
        * Sorts the render sequence into batches. Each batch requires the same renderer/shader/texture combination.
        * @method collateBatches
        * @public
        */
        collateBatches(): void;
        /**
        * Renders all the batches
        * @method renderBatches
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Camera} camera
        * @public
        */
        renderBatches(gl: WebGLRenderingContext, camera: any): void;
        /**
        * Renders a single batch
        * @method renderBatch
        * @param {WebGLRenderingContext} gl
        * @param {Object} batch
        * @param {Kiwi.Camera} camera
        * @public
        */
        renderBatch(gl: any, batch: any, camera: any): void;
        /**
        * Calls the render function on a single entity
        * @method renderEntity
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Entity} entity
        * @param {Kiwi.Camera} camera
        * @public
        * @deprecated Used internally; should not be called from external functions
        */
        renderEntity(gl: WebGLRenderingContext, entity: any, camera: any): void;
        /**
        * Ensures the atlas and renderer needed for a batch is setup
        * @method setupGLState
        * @param {WebGLRenderingContext} gl
        * @public
        * @deprecated Used internally; should not be called from external functions.
        */
        setupGLState(gl: WebGLRenderingContext, entity: any): void;
        /**
        * Switch renderer to the one needed by the entity that needs rendering
        * @method _switchRenderer
        * @param gl {WebGLRenderingContext}
        * @param entity {Kiwi.Entity}
        * @private
        */
        private _switchRenderer(gl, entity);
        /**
        * Switch texture to the one needed by the entity that needs rendering
        * @method _switchTexture
        * @param gl {WebGLRenderingContext}
        * @param entity {Kiwi.Entity}
        * @private
        */
        private _switchTexture(gl, entity);
        /**
        * Switch blend mode to a new set of constants
        * @method _switchBlendMode
        * @param gl {WebGLRenderingContext}
        * @param blendMode {Kiwi.Renderers.GLBlendMode}
        * @private
        * @since 1.1.0
        */
        private _switchBlendMode(gl, blendMode);
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
* @namespace Kiwi.Shaders
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
    * @return {Kiwi.Shaders.ShaderManager}
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
        currentShader: ShaderPair;
        private _currentShader;
        /**
        * Sets up a default shaderPair.
        * @method init
        * @param {WebGLRenderingContext} gl
        * @param {String} defaultShaderID
        * @public
        */
        init(gl: WebGLRenderingContext, defaultShaderID: string): void;
        /**
        * Provides a reference to a ShaderPair. If the requested ShaderPair exists as a property on the _shaderPairs object it will be returned if already loaded,
        * otherwise it will be loaded, then returned.
        *
        * If the request is not on the list, the Kiwi.Shaders object will  be checked for a property name that matches shaderID and a new ShaderPair
        * will be instantiated, loaded, and set for use.

        * @method requestShader
        * @param {WebGLRenderingContext} gl
        * @param {String} shaderID
        * @param {boolean} use
        * @return {Kiwi.Shaders.ShaderPair} a ShaderPair instance - null on fail
        * @public
        */
        requestShader(gl: WebGLRenderingContext, shaderID: string, use?: boolean): ShaderPair;
        /**
        * Tests to see if a ShaderPair property named ShaderID exists on Kiwi.Shaders. Can be used to test for the availability of specific shaders (for fallback)
        * @method shaderExists
        * @param {WebGLRenderingContext} gl
        * @param {String} shaderID
        * @return {Boolean} success
        * @public
        */
        shaderExists(gl: WebGLRenderingContext, shaderID: string): boolean;
        /**
        * Creates a new instance of a ShaderPair and adds a reference to the _shaderPairs object
        * @method _addShader
        * @param {WebGLRenderingContext} gl
        * @param {String} shaderID
        * @return {Kiwi.Shaders.ShaderPair}
        * @private
        */
        private _addShader(gl, shaderID);
        /**
        * Tells a ShaderPair to load (compile and link)
        * @method _loadShader
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Shaders.ShaderPair} shader
        * @private
        */
        private _loadShader(gl, shader);
        /**
        * Changes gl state so that the shaderProgram contined in a ShaderPir is bound for use
        * @method _useShader
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Shaders.ShaderPair} shader
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
* @namespace Kiwi.Renderers
*/
declare module Kiwi.Renderers {
    /**
    * Wraps a webGL texture object
    * @class GLTextureWrapper
    * @constructor
    * @param gl {WebGLRenderingContext}
    * @param atlas {Kiwi.Textures.TextureAtlas} The wrapper will default to wrapping atlas.image.
    * @return {Kiwi.Renderers.GLTextureWrapper}
    */
    class GLTextureWrapper {
        constructor(gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas, upload?: boolean);
        /**
        * The textureAtlas used by the GLTexture
        * @property textureAtlas
        * @type Kiwi.Textures.TextureAtlas
        */
        textureAtlas: Kiwi.Textures.TextureAtlas;
        /**
        * The number of bytes in the texture
        * @property numBytes
        * @type Kiwi.Textures.TextureAtlas
        */
        private _numBytes;
        numBytes: number;
        /**
        * Returns whether the texture has been created
        * @property created
        * @type boolean
        */
        private _created;
        created: boolean;
        /**
        * Returns whether the texture has been uploaded to video memory
        * @property uploaded
        * @type boolean
        */
        private _uploaded;
        uploaded: boolean;
        /**
        *
        * @property texture
        * @type WebGLTexture
        * @public
        */
        texture: WebGLTexture;
        /**
        * The image wrapped by this wrapper.
        * @property _image
        * @type HTMLImageElement
        * @private
        */
        private _image;
        /**
        * The image wrapped by this wrapper.
        * @property image
        * @type HTMLImageElement
        * @public
        */
        image: HTMLImageElement;
        /**
        * Creates a webgl texture object
        * @method createTexture
        * @param gl {WebGLRenderingContext}
        * @public
        */
        createTexture(gl: WebGLRenderingContext): boolean;
        /**
        * Uploads a webgl texture object to video memory
        * @method uploadTexture
        * @param gl {WebGLRenderingContext}
        * @public
        */
        uploadTexture(gl: WebGLRenderingContext): boolean;
        /**
        * Re-uploads a webgl texture object to video memory
        * @method refreshTexture
        * @param gl {WebGLRenderingContext}
        * @public
        */
        refreshTexture(gl: WebGLRenderingContext): void;
        /**
        * Deletes a webgl texture
        * @method deleteTexture
        * @param gl {WebGLRenderingContext}
        * @public
        */
        deleteTexture(gl: WebGLRenderingContext): boolean;
    }
}
/**
*
*
* @module Kiwi
* @submodule Renderers
* @main Renderers
* @namespace Kiwi.Renderers
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
        maxTextureMem: number;
        /**
        * The amount of texture memory currently uplaoded
        * @property usedTextureMem
        * @type number
        * @public
        */
        private _usedTextureMem;
        usedTextureMem: number;
        /**
        * The number of textures currently uplaoded
        * @property usedTextureMem
        * @type number
        * @public
        */
        private _numTexturesUsed;
        numTexturesUsed: number;
        /**
        * The number of textures uploads in the last frame
        * @property numTextureWrites
        * @type number
        * @public
        */
        numTextureWrites: number;
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
        uploadTextureLibrary(gl: WebGLRenderingContext, textureLibrary: Kiwi.Textures.TextureLibrary): void;
        /**
        * Uploads a single texture to video memory
        * @method uploadTexture
        * @param gl {WebGLRenderingContext}
        * @param textureAtlas {Kiwi.Textures.TextureAtlas}
        * @public
        */
        uploadTexture(gl: WebGLRenderingContext, textureAtlas: Kiwi.Textures.TextureAtlas): void;
        /**
        * Adds a texture wrapper to the manager. This both adds the wrapper to the manager cache, and attempts to upload the attached texture to video memory.
        * @method registerTextureWrapper
        * @param gl {WebGLRenderingContext}
        * @param glTextureWrapper {GLTextureWrapper}
        * @public
        * @since 1.1.0
        */
        registerTextureWrapper(gl: WebGLRenderingContext, glTextureWrapper: GLTextureWrapper): void;
        /**
        * Removes all textures from video memory and clears the wrapper cache
        * @method clearTextures
        * @param gl {WebGLRenderingContext}
        * @public
        */
        clearTextures(gl: WebGLRenderingContext): void;
        /**
        * Binds the texture ready for use, uploads it if it isn't already
        * @method useTexture
        * @param gl {WebGLRenderingContext}
        * @param glTextureWrapper {GLTextureWrappery}
        * @param [textureUnit=0] {number} Optional parameter for multitexturing. You can have up to 32 textures available to a shader at one time, in the range 0-31. If you don't need multiple textures, this is perfectly safe to ignore.
        * @return boolean
        * @public
        */
        useTexture(gl: WebGLRenderingContext, glTextureWrapper: GLTextureWrapper, textureUnit?: number): boolean;
        /**
        * Attempts to free space in video memory.
        *
        * This removes textures sequentially, starting from the first cached texture. This may remove textures that are in use. These should automatically re-upload into the last position. After a few frames, this will push in-use textures to the safe end of the queue.
        *
        * If there are too many textures in use to fit in memory, they will all be cycled every frame, even if it would be more efficient to swap out one or two very large textures and preserve several smaller ones. This is an issue with this implementation and should be fixed.
        *
        * This behaviour was changed in v1.1.0. Previous versions used a different memory freeing algorithm.
        * @method _freeSpace
        * @param gl {WebGLRenderingContext}
        * @param numBytesToRemove {number}
        * @return boolean
        * @private
        */
        private _freeSpace(gl, numBytesToRemove);
    }
}
/**
*
* @module Kiwi
* @submodule Renderers
* @namespace Kiwi.Renderers
*/
declare module Kiwi.Renderers {
    /**
    * Encapsulates a WebGL Array Buffer
    * @class GLArrayBuffer
    * @constructor
    * @namespace Kiwi.Renderers
    * @param gl {WebGLRenderingContext}
    * @param [_itemSize] {number}
    * @param [items] {number[]}
    * @param [init=true] {boolean}
    * @return {Kiwi.RenderersGLArrayBuffer}
    */
    class GLArrayBuffer {
        constructor(gl: WebGLRenderingContext, _itemSize?: number, items?: number[], upload?: boolean);
        /**
        * Returns whether the buffer has been created
        * @property created
        * @type boolean
        * @public
        * @readonly
        */
        private _created;
        created: boolean;
        /**
        * Returns whether the buffer has been uploaded to video memory
        * @property created
        * @type boolean
        * @public
        * @readonly
        */
        private _uploaded;
        uploaded: boolean;
        /**
        * The items ito upload to the buffer
        * @property items
        * @type number[]
        * @public
        */
        items: number[];
        /**
        * The WebGL buffer Object
        * @property buffer
        * @type WebGLBuffer
        * @public
        */
        buffer: WebGLBuffer;
        /**
        * The size of each item in the buffer.
        * @property itemSize
        * @type number
        * @public
        */
        itemSize: number;
        /**
        * The number of items in the buffer
        * @property numItems
        * @type number
        * @public
        */
        numItems: number;
        /**
        * Clears the item array.
        * @method clear
        * @public
        */
        clear(): void;
        /**
        * Creates the array buffer.
        * @method createBuffer
        * @param gl {WebGLRenderingContext}
        * @return {WebGLBuffer}
        * @public
        */
        createBuffer(gl: WebGLRenderingContext): boolean;
        /**
        * Uploads the array buffer.
        * @method uploadBuffer
        * @param gl {WebGLRenderingContext}
        * @param items {Array}
        * @return {boolean}
        * @public
        */
        uploadBuffer(gl: WebGLRenderingContext, items: number[]): boolean;
        /**
        * Deletes the array buffer.
        * @method deleteBuffer
        * @param gl {WebGLRenderingContext}
        * @return {boolean}
        * @public
        */
        deleteBuffer(gl: WebGLRenderingContext): boolean;
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
        * @property squareUVs
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
* @namespace Kiwi.Renderers
*
*/
declare module Kiwi.Renderers {
    /**
    * The Blend Mode object for recording and applying GL blend functions on a renderer.
    * @class GLBlendMode
    * @constructor
    * @namespace Kiwi.Renderers
    * @param gl {WebGLRenderingContext}
    * @param params {Object}
    * @return {Kiwi.Renderers.GLBlendMode}
    * @ since 1.1.0
    */
    class GLBlendMode {
        constructor(gl: WebGLRenderingContext, params: any);
        /**
        * Target WebGL rendering context.
        * @property gl
        * @type WebGLRenderingContext
        * @public
        */
        gl: WebGLRenderingContext;
        /**
        * Dirty flag indicates whether this object has been altered and needs to be processed.
        * @property dirty
        * @type boolean
        * @public
        */
        dirty: boolean;
        /**
        * Source RGB factor used in WebGL blendfunc.
        * @property _srcRGB
        * @type number
        * @private
        */
        private _srcRGB;
        /**
        * Destination RGB factor used in WebGL blendfunc.
        * @property _dstRGB
        * @type number
        * @private
        */
        private _dstRGB;
        /**
        * Source alpha factor used in WebGL blendfunc.
        * @property _srcAlpha
        * @type number
        * @private
        */
        private _srcAlpha;
        /**
        * Destination alpha factor used in WebGL blendfunc.
        * @property _dstAlpha
        * @type number
        * @private
        */
        private _dstAlpha;
        /**
        * RGB mode used in WebGL blendfunc.
        * @property _modeRGB
        * @type number
        * @private
        */
        private _modeRGB;
        /**
        * Alpha mode used in WebGL blendfunc.
        * @property _modeAlpha
        * @type number
        * @private
        */
        private _modeAlpha;
        /**
        * Set a blend mode from a param object.
        *
        * This is the main method for configuring blend modes on a renderer. It resolves to a pair of calls to blendEquationSeparate and blendFuncSeparate. The params object should specify compatible terms, namely { srcRGB: a, dstRGB: b, srcAlpha: c, dstAlpha: d, modeRGB: e, modeAlpha: f }. You should set abcdef using either direct calls to a gl context (ie. gl.SRC_ALPHA) or by using predefined strings.
        *
        * The predefined string parameters for blendEquationSeparate are:
        *
        * FUNC_ADD, FUNC_SUBTRACT, and FUNC_REVERSE_SUBTRACT.
        *
        * The predefined string parameters for blendFuncSeparate are:
        *
        * ZERO, ONE, SRC_COLOR, ONE_MINUS_SRC_COLOR, DST_COLOR, ONE_MINUS_DST_COLOR, SRC_ALPHA, ONE_MINUS_SRC_ALPHA, DST_ALPHA, ONE_MINUS_DST_ALPHA, SRC_ALPHA_SATURATE, CONSTANT_COLOR, ONE_MINUS_CONSTANT_COLOR, CONSTANT_ALPHA, and ONE_MINUS_CONSTANT_ALPHA.
        *
        * @method readConfig
        * @param params {Object}
        * @public
        */
        readConfig(params: any): void;
        /**
        * Formats a parameter into a GL context-compatible number. This recognises valid constant names, such as "SRC_ALPHA" or "REVERSE_AND_SUBTRACT", with some tolerance for case. It does not check for valid numeric codes.
        * @method makeConstant
        * @param code {String}
        * @return {number}
        * @private
        */
        private makeConstant(code);
        /**
        * Sets a blend mode by name. Name is case-tolerant.
        *
        * These are shortcuts to setting the blend function parameters manually. A listing of valid modes follows. Each is listed with the parameters modeRGB, modeAlpha, srcRGB, dstRGB, srcAlpha, and dstAlpha, constants used in the gl calls "blendEquationSeparate(modeRGB, modeAlpha)" and "blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha". This is very technical, and will probably only be useful if you are developing your own shaders for Kiwi.js.
        *
        * "NORMAL" or any non-recognised string will draw as normal, blending colour via alpha. FUNC_ADD, FUNC_ADD, SRC_ALPHA, ONE_MINUS_SRC_ALPHA, ONE, ONE.
        *
        * "ADD" or "ADDITIVE" will add pixels to the background, creating a lightening effect. FUNC_ADD, FUNC_ADD, SRC_ALPHA, ONE, ONE, ONE.
        *
        * "SUBTRACT" or "SUBTRACTIVE" will subtract pixels from the background, creating an eerie dark effect. FUNC_REVERSE_SUBTRACT, FUNC_ADD, SRC_ALPHA, ONE, ONE, ONE.
        *
        * "ERASE" or "ERASER" will erase the game canvas itself, allowing the page background to show through. You can later draw over this erased region. FUNC_REVERSE_SUBTRACT, FUNC_REVERSE_SUBTRACT, SRC_ALPHA, ONE_MINUS_SRC_ALPHA, ONE, ONE.
        *
        * "BLACK" or "BLACKEN" will turn all colour black, but preserve alpha. FUNC_ADD, FUNC_ADD, ZERO, ONE_MINUS_SRC_ALPHA, ONE, ONE.
        *
        * Blend modes as seen in Adobe Photoshop are not reliably available via WebGL blend modes. Such blend modes require shaders to create.
        * @method setMode
        * @param mode {String}
        * @public
        */
        setMode(mode: string): void;
        /**
        * Compares against another GLBlendMode
        * @method isIdentical
        * @return {Boolean} Is this GLBlendMode identical to the passed GLBlendMode?
        * @param blendMode {Kiwi.Renderers.GLBlendMode}
        * @public
        */
        isIdentical(blendMode: GLBlendMode): boolean;
        /**
        * Sets the blend mode on the video card
        * @method apply
        * @param gl {WebGLRenderingContext}
        * @public
        */
        apply(gl: WebGLRenderingContext): void;
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
    * Encapsulates a WebGL Element Array Buffer
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
        * An array of indices
        * @property indices
        * @type number[]
        * @public
        */
        indices: number[];
        /**
        * The Element Array Buffer object
        * @property buffer
        * @type WebGLBuffer
        * @public
        */
        buffer: WebGLBuffer;
        /**
        * The size of each buffer item
        * @property itemSize
        * @type number
        * @public
        */
        itemSize: number;
        /**
        * The numbe of items in the buffer
        * @property numItems
        * @type number
        * @public
        */
        numItems: number;
        /**
        * Clears the indices array.
        * @method clear
        * @public
        */
        clear(): void;
        /**
        * Initialises the Element Array Buffer
        * @method init
        * @param gl {WebGLRenderingContext}
        * @return {WebGLBuffer}
        * @public
        */
        init(gl: WebGLRenderingContext): WebGLBuffer;
        /**
        * Refreshes the Element Array Buffer
        * @method refresh
        * @param gl {WebGLRenderingContext}
        * @param indices {number[]}
        * @return {WebGLBuffer}
        * @public
        */
        refresh(gl: WebGLRenderingContext, indices: number[]): WebGLBuffer;
        /**
        * The required indices for a single quad.
        * @property square
        * @static
        * @type number[]
        * @default [0,1,2,0,2,3]
        * @public
        */
        static square: number[];
    }
}
/**
*
* @module Kiwi
* @submodule Renderers
* @namespace Kiwi.Renderers
*/
declare module Kiwi.Renderers {
    class Renderer {
        /**
        * Base class for WebGL Renderers. Not for instantiation.
        * @class Renderer
        * @constructor
        * @namespace Kiwi.Renderers
        * @param gl {WebGLRenderingContext}
        * @param shaderManager {Kiwi.Shaders.ShaderManager}
        * @param [params=null] {object}
        * @return {Kiwi.Renderers.Renderer}
        */
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, isBatchRenderer?: boolean);
        /**
        * Identifier for this renderer
        * @property RENDERER_ID
        * @type String
        * @public
        * @static
        */
        static RENDERER_ID: string;
        /**
        * The camera matrix
        * @property camMatrix
        * @type Float32Array
        * @public
        */
        camMatrix: Float32Array;
        /**
        *
        * @property loaded
        * @type Array
        * @public
        */
        loaded: boolean;
        /**
        * Reference to the shaderManager - used for requesting shaders.
        * @property shaderManager
        * @type Array
        * @public
        */
        shaderManager: Kiwi.Shaders.ShaderManager;
        /**
        * Enables the renderer (for override)
        * @method enable
        * @param gl {WebGLRenderingContext}
        * @param [params=null] {object}
        * @public
        */
        enable(gl: WebGLRenderingContext, params?: any): void;
        /**
        * Enables the renderer (for override)
        * @method disable
        * @param gl {WebGLRenderingContext}
        * @param [params=null] {object}
        * @public
        */
        disable(gl: WebGLRenderingContext): void;
        /**
        * Enables the renderer (for override)
        * @method clear
        * @param gl {WebGLRenderingContext}
        * @param [params=null] {object}
        * @public
        */
        clear(gl: WebGLRenderingContext, params: any): void;
        /**
        * Draw to the draw or frame buffer (for override)
        * @method draw
        * @param gl {WebGLRenderingContext}
        * @public
        */
        draw(gl: WebGLRenderingContext): void;
        /**
        * Updates the stage resolution uniforms (for override)
        * @method updateStageResolution
        * @param gl {WebGLRenderingContext}
        * @param res {Float32Array}
        * @public
        */
        updateStageResolution(gl: WebGLRenderingContext, res: Float32Array): void;
        /**
       * Updates the texture size uniforms (for override)
       * @method updateTextureSize
       * @param gl {WebGLRenderingContext}
       * @param size {Float32Array}
       * @public
       */
        updateTextureSize(gl: WebGLRenderingContext, size: Float32Array): void;
        /**
        * The shader pair used by the renderer
        * @property shaderPair
        * @type {Kiwi.Shaders.ShaderPair}
        * @public
        */
        shaderPair: Kiwi.Shaders.ShaderPair;
        /**
        * This renderer's blend mode data.
        * @property blendMode
        * @type Kiwi.Renderers.GLBlendMode
        * @public
        * @since 1.1.0
        */
        blendMode: Kiwi.Renderers.GLBlendMode;
        /**
        * Returns whether this is a batch renderer.
        * @property isBatchRenderer
        * @type boolean
        * @public
        */
        private _isBatchRenderer;
        isBatchRenderer: boolean;
    }
}
/**
*
* @module Kiwi
* @submodule Renderers
* @namespace Kiwi.Renderers
*/
declare module Kiwi.Renderers {
    class TextureAtlasRenderer extends Renderer {
        /**
        * The Renderer object for rendering Texture Atlases
        * @class TextureAtlasRenderer
        * @constructor
        * @extends Kiwi.Renderers.Renderer
        * @namespace Kiwi.Renderers
        * @param gl {WebGLRenderingContext}
        * @param shaderManager {Kiwi.Shaders.ShaderManager}
        * @param [params=null] {object}
        * @return {Kiwi.Renderers.TextureAtlasRenderer}
        */
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params?: any);
        /**
        * The identifier for this renderer.
        * @property RENDERER_ID
        * @type Array
        * @public
        * @static
        */
        static RENDERER_ID: string;
        /**
        * The shaderPair that this renderer uses.
        * @property shaderPair
        * @type Kiwi.Shaders.TextureAtlasShade
        * @public
        */
        shaderPair: Kiwi.Shaders.TextureAtlasShader;
        /**
        * The reference to the shaderPair.
        * @property _shaderPairName
        * @type String
        * @private
        * @since 1.1.0
        */
        private _shaderPairName;
        /**
        * The maximum number of items that can be rendered by the renderer (not enforced)
        * @property _maxItems
        * @type number
        * @private
        */
        private _maxItems;
        /**
        * The Vertex Buffer
        * @property _vertexBuffer
        * @type Kiwi.Renderers.GLArrayBuffer
        * @private
        */
        private _vertexBuffer;
        /**
        * The Index Buffer
        * @property _indexBuffer
        * @type Kiwi.Renderers.GLElementArrayBuffer
        * @private
        */
        private _indexBuffer;
        /**
        * Enables the renderer ready for drawing
        * @method enable
        * @param gl {WebGLRenderingContext}
        * @param [params=null] {object}
        * @public
        */
        enable(gl: WebGLRenderingContext, params?: any): void;
        /**
        * Disables the renderer
        * @method disable
        * @param gl {WebGLRenderingContext}
        * @public
        */
        disable(gl: WebGLRenderingContext): void;
        /**
        * Clears the vertex buffer.
        * @method clear
        * @param gl {WebGLRenderingContext}
        * @public
        */
        clear(gl: WebGLRenderingContext, params: any): void;
        /**
        * Makes a draw call, this is where things actually get rendered to the draw buffer (or a framebuffer).
        * @method draw
        * @param gl {WebGLRenderingContext}
        * @public
        */
        draw(gl: WebGLRenderingContext): void;
        /**
        * Generates quad indices
        * @method _generateIndices
        * @param numQuads {number}
        * @private
        */
        private _generateIndices(numQuads);
        /**
        * Updates the stage resolution uniforms
        * @method updateStageResolution
        * @param gl {WebGLRenderingContext}
        * @param res {Float32Array}
        * @public
        */
        updateStageResolution(gl: WebGLRenderingContext, res: Float32Array): void;
        /**
        * Updates the texture size uniforms
        * @method updateTextureSize
        * @param gl {WebGLRenderingContext}
        * @param size {Float32Array}
        * @public
        */
        updateTextureSize(gl: WebGLRenderingContext, size: Float32Array): void;
        /**
        * Sets shader pair by name
        * @method setShaderPair
        * @param shaderPair {String}
        * @public
        * @since 1.1.0
        */
        setShaderPair(shaderPair: string): void;
        /**
        * Collates all xy and uv coordinates into a buffer ready for upload to video memory
        * @method addToBatch
        * @param gl {WebGLRenderingContext}
        * @param entity {Kiwi.Entity}
        * @param camera {Camera}
        * @public
        */
        addToBatch(gl: WebGLRenderingContext, entity: Entity, camera: Kiwi.Camera): void;
        /**
        * Adds an array of precalculated xyuv values to the item array
        * @method concatBatch
        * @param vertexItems {array}
        * @public
        */
        concatBatch(vertexItems: Array<number>): void;
    }
}
/**
*
* @module Kiwi
* @submodule Shaders
* @namespace Kiwi.Shaders
*
*/
declare module Kiwi.Shaders {
    /**
    * Base class for shader pairs which encapsulate a GLSL vertex and fragment shader
    * @class ShaderPair
    * @constructor
    * @namespace Kiwi.Shaders
    * @return {Kiwi.Shaders.ShaderPair}
    */
    class ShaderPair {
        constructor();
        /**
        *
        * @property RENDERER_ID
        * @type string
        * @public
        * @static
        */
        static RENDERER_ID: string;
        /**
        * Initialise the shader pair.
        * @method init
        * @param gl {WebGLRenderingCotext}
        * @public
        */
        init(gl: WebGLRenderingContext): void;
        /**
        * Returns whether the shader pair has been loaded and compiled.
        * @property loaded
        * @type boolean
        * @public
        */
        loaded: boolean;
        /**
        * Vertex shader
        * @property vertShader
        * @type WebGLShader
        * @public
        */
        vertShader: WebGLShader;
        /**
        * Fragment shader
        * @property fragShader
        * @type WebGLShader
        * @public
        */
        fragShader: WebGLShader;
        /**
        * The WebGl shader program
        * @property shaderProgram
        * @type WebGLProgram
        * @public
        */
        shaderProgram: WebGLProgram;
        /**
        * Attaches the shaders to the program and links them
        * @method attach
        * @param gl {WebGLRenderingContext}
        * @param vertShader {WebGLShader}
        * @param fragShader {WebGLShader}
        * @return {WebGLProgram}
        * @public
        */
        attach(gl: WebGLRenderingContext, vertShader: WebGLShader, fragShader: WebGLShader): WebGLProgram;
        /**
        * Compiles the shaders
        * @method compile
        * @param gl {WebGLRenderingContext}
        * @param src {string}
        * @param shaderType {number}
        * @return {WebGLShader}
        * @public
        */
        compile(gl: WebGLRenderingContext, src: string, shaderType: number): WebGLShader;
        /**
        * Uniform descriptors
        * @property uniforms
        * @type Array
        * @public
        */
        uniforms: any;
        /**
        * Attribute descriptors
        * @property attributes
        * @type Array
        * @public
        */
        attributes: any;
        /**
        * Shader frag source (for override)
        * @property texture2DFrag
        * @type Array
        * @public
        */
        fragSource: Array<any>;
        /**
        * Shader vert source (for override)
        * @property texture2DVert
        * @type Array
        * @public
        */
        vertSource: Array<any>;
        /**
        * Sets a single uniform value and marks it as dirty.
        * @method setParam
        * @param uniformName {string}
        * @param value {*}
        * @public
        */
        setParam(uniformName: string, value: any): void;
        /**
        * Applies all uniforms to the uploaded program
        * @method applyUniforms
        * @param gl {WebGLRenderingCotext}
        * @public
        */
        applyUniforms(gl: WebGLRenderingContext): void;
        /**
        * Applies a single uniforms to the uploaded program
        * @method applyUniform
        * @param gl {WebGLRenderingCotext}
        * @param name {string}
        * @public
        */
        applyUniform(gl: WebGLRenderingContext, name: string): void;
        /**
        * Initialises all uniforms
        * @method initUniforms
        * @param gl {WebGLRenderingCotext}
        * @public
        */
        initUniforms(gl: WebGLRenderingContext): void;
    }
}
/**
*
* @module Kiwi
* @submodule Shaders
* @namespace Kiwi.Shaders
*/
declare module Kiwi.Shaders {
    /**
    * Shader wrapper for rendering Texture Atlases
    * @class TextureAtlasShader
    * @extends Kiwi.Shaders.ShaderPair
    * @constructor
    * @namespace Kiwi.Shaders
    * @return {Kiwi.Shaders.TextureAtlasShader}
    */
    class TextureAtlasShader extends ShaderPair {
        constructor();
        /**
        * Initialise the shaderPair
        * @method init
        * @param gl {WebGLRenderingCotext}
        * @return {WebGLBuffer}
        * @public
        */
        init(gl: WebGLRenderingContext): void;
        /**
        * Shader attribute references
        * @property attributes
        * @type object
        * @public
        */
        attributes: any;
        /**
        * Shader uniform descriptors
        * @property uniforms
        * @type object
        * @public
        */
        uniforms: any;
        /**
        * The source for the GLSL fragment shader
        * @property fragSource
        * @type Array
        * @public
        */
        fragSource: Array<string>;
        /**
        * The source for the GLSL vertex shader
        * @property vertSource
        * @type Array
        * @public
        */
        vertSource: Array<string>;
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
    * @param sequences {Kiwi.Animations.Sequences} The sequence that this anim will be using to animate.
    * @param clock {Kiwi.Time.Clock} A game clock that this anim will be using to keep record of the time between frames. (Deprecated in v1.2.0, because there is no way to control it.)
    * @param parent {Kiwi.Components.AnimationManager} The animation manager that this animation belongs to.
    * @return {Kiwi.Animations.Animation}
    *
    */
    class Animation {
        constructor(name: string, sequence: Kiwi.Animations.Sequence, clock: Kiwi.Time.Clock, parent: Kiwi.Components.AnimationManager);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "Animation"
        * @public
        */
        objType(): string;
        /**
        * The AnimationManager that this animation is a child of.
        * @property _parent
        * @type Kiwi.Components.AnimationManager
        * @private
        */
        private _parent;
        /**
        * The name of this animation.
        * @property name
        * @type string
        * @public
        */
        name: string;
        /**
        * The sequence on the texture atlas that this animation is based off.
        * @property _sequence
        * @type Kiwi.Animations.Sequence
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
        loop: boolean;
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
        *
        * As of v1.3.0, this property will work properly with floating-point
        * values. They will be rounded down and stored as integers.
        * @property frameIndex
        * @type number
        * @public
        */
        frameIndex: number;
        /**
        * Returns the current cell that the animation is up to. This is READ ONLY.
        * @property currentCell
        * @type number
        * @public
        */
        currentCell: number;
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
        speed: number;
        /**
        * The clock that is to be used to calculate the animations.
        * @property _clock
        * @type Kiwi.Time.Clock
        * @private
        */
        private _clock;
        /**
        * Clock used by this Animation. If it was not set on creation,
        * the Animation will use its parent's entity's clock.
        * @property clock
        * @type Kiwi.Time.Clock
        * @public
        * @since 1.2.0
        */
        clock: Kiwi.Time.Clock;
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
        reverse: boolean;
        /**
        * The time at which the animation should change to the next cell
        * @property _tick
        * @type number
        * @private
        * @deprecated Different private time management systems implemented in v1.2.0
        */
        private _tick;
        /**
        * Whether the animation is currently playing or not.
        * @property _isPlaying
        * @type boolean
        * @default false
        * @private
        */
        private _isPlaying;
        /**
        * Whether the animation is currently playing or not. Read-only.
        * @property isPlaying
        * @type boolean
        * @public
        */
        isPlaying: boolean;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has stopped playing.
        * @property _onStop
        * @type Signal
        * @private
        */
        private _onStop;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has stopped playing.
        * @property onStop
        * @type Signal
        * @public
        */
        onStop: Kiwi.Signal;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has started playing.
        * @property _onPlay
        * @type Kiwi.Signal
        * @private
        */
        private _onPlay;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has started playing.
        * @property onPlay
        * @type Kiwi.Signal
        * @public
        */
        onPlay: Kiwi.Signal;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has updated/changed frameIndexs.
        * @property _onUpdate
        * @type Kiwi.Signal
        * @private
        */
        private _onUpdate;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has updated/changed frameIndexs.
        * @property onUpdate
        * @type Kiwi.Signal
        * @public
        */
        onUpdate: Kiwi.Signal;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has come to the end of the animation and is going to play again.
        * @property _onLoop
        * @type Kiwi.Signal
        * @private
        */
        private _onLoop;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has come to the end of the animation and is going to play again.
        * @property onLoop
        * @type Kiwi.Signal
        * @public
        */
        onLoop: Kiwi.Signal;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has come to
        * the end of the animation but is not going to play again.
        * @property _onComplete
        * @type Kiwi.Signal
        * @private
        * @since 1.2.0
        */
        private _onComplete;
        /**
        * A Kiwi.Signal that dispatches an event when the animation has come to
        * the end of the animation but is not going to play again.
        * @property onComplete
        * @type Kiwi.Signal
        * @public
        * @since 1.2.0
        */
        onComplete: Kiwi.Signal;
        /**
        * Clock time on last frame, used to compute current animation frame.
        * @property _lastFrameElapsed
        * @type number
        * @private
        * @since 1.2.0
        */
        private _lastFrameElapsed;
        /**
        * Start the animation.
        * @method _start
        * @param [index=null] {number} Index of the frame in the sequence that
        *	is to play. If left as null it just starts from where it left off.
        * @private
        */
        private _start(index?);
        /**
        * Plays the animation.
        * @method play
        * @public
        */
        play(): void;
        /**
        * Plays the animation at a particular frame.
        * @method playAt
        * @param index {number} Index of the cell in the sequence that the
        *	animation is to start at.
        * @public
        */
        playAt(index: number): void;
        /**
        * Pauses the current animation.
        * @method pause
        * @public
        */
        pause(): void;
        /**
        * Resumes the current animation after stopping.
        * @method resume
        * @public
        */
        resume(): void;
        /**
        * Stops the current animation from playing.
        * @method stop
        * @public
        */
        stop(): void;
        /**
        * Makes the animation go to the next frame. If the animation is at the end it goes back to the start.
        * @method nextFrame
        * @public
        */
        nextFrame(): void;
        /**
        * Makes the animation go to the previous frame. If the animation is at the first frame it goes to the end.
        * @method prevFrame
        * @public
        */
        prevFrame(): void;
        /**
        * The update loop.
        *
        * @method update
        * @public
        */
        update(): void;
        /**
        * An internal method used to check to see if frame passed is valid or not
        * @method _validateFrame
        * @param frame {Number} The index of the frame that is to be validated.
        * @private
        */
        private _validateFrame(frame);
        /**
        * Returns the number of frames that in the animation. Thus the animations 'length'. Note this is READ ONLY.
        * @property length
        * @type number
        * @public
        */
        length: number;
        /**
        * Destroys the anim and all of the properties that exist on it.
        * @method destroy
        * @public
        */
        destroy(): void;
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
    * @return {Kiwi.Animations.Sequence}
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
        name: string;
        /**
        * The cells that are in this animation.
        * These are a reference to the cells that are contained in a texture atlas that this sequence should be a part of.
        * @property cells
        * @type number[]
        * @public
        */
        cells: number[];
        /**
        * The time an animation should spend on each cell.
        * @property speed
        * @type boolean
        * @public
        */
        speed: number;
        /**
        * If the sequence should play again if it was animating and the animation reaches the last frame.
        * @property loop
        * @type boolean
        * @public
        */
        loop: boolean;
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
    * @param manager {Kiwi.Input.Keyboard} The keyboard manager that this key belongs to.
    * @param keycode {Number} The keycode that this key is.
    * @param [event] {KeyboardEvent} The keyboard event (if there was one) when this was created.
    * @return {Kiwi.Input.Key} This object.
    *
    */
    class Key {
        constructor(manager: Kiwi.Input.Keyboard, keycode: number, event?: KeyboardEvent);
        /**
        * If the default action for this Key should be prevented or not.
        * For example. If your game use's the spacebar you would want its default action (which is to make the website scrolldown) prevented,
        * So you can set this to true.
        * @property preventDefault
        * @type Boolean
        * @default false
        * @public
        */
        preventDefault: boolean;
        /**
        * The game that this key belongs to.
        * @property game
        * @type Kiwi.Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "Key"
        * @public
        */
        objType(): string;
        /**
        * The keyboard manager that this key belongs to.
        * @property _manager
        * @type Kiwi.Input.Keyboard
        * @private
        */
        private _manager;
        /**
        * The keycode that this key is.
        * @property keyCode
        * @type Number
        * @public
        */
        keyCode: number;
        /**
        * Indicated whether or not the key is currently down.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        isDown: boolean;
        /**
        * Indicates whether or not the key is currently up.
        * @property isUp
        * @type boolean
        * @default true
        * @public
        */
        isUp: boolean;
        /**
        * If the alt key was held at the time of the event happening.
        * @property altKey
        * @type boolean
        * @default false
        * @public
        */
        altKey: boolean;
        /**
        * If the ctrl key was held at the time of the event happening.
        * @property ctrlKey
        * @type boolean
        * @default false
        * @public
        */
        ctrlKey: boolean;
        /**
        * If the shift key was held at the time of the event happening.
        * @property shiftKey
        * @type boolean
        * @default false
        * @public
        */
        shiftKey: boolean;
        /**
        * The time that the key was pressed initially.
        * @property timeDown
        * @type Number
        * @default 0
        * @public
        */
        timeDown: number;
        /**
        * The duration (in milliseconds) that the key has been down for.
        * This is property is READ ONLY.
        * @property duration
        * @type Number
        * @default 0
        * @public
        */
        duration: number;
        /**
        * The time at which the key was released.
        * @property timeUp
        * @type Number
        * @default 0
        * @public
        */
        timeUp: number;
        /**
        * If this key is being 'held' down, this property will indicate the amount of times the 'onkeydown' event has fired.
        * This is reset each time the key is pressed.
        * @property repeats
        * @type Number
        * @default 0
        * @public
        */
        repeats: number;
        /**
        * The 'update' method fires when an event occur's. Updates the keys properties
        * @method update
        * @param event {KeyboardEvent}
        * @public
        */
        update(event: KeyboardEvent): void;
        /**
        * Returns a boolean indicating whether or not this key was just pressed.
        * @method justPressed
        * @param [duration] {Number} The duration at which determines if a key was just pressed. Defaults to the managers just pressed rate.
        * @return {boolean}
        * @public
        */
        justPressed(duration?: number): boolean;
        /**
        * Returns a boolean indicating whether or not this key was just released.
        * @method justReleased
        * @param [duration] {Number} The duration at which determines if a key was just released. Defaults to the managers just pressed rate.
        * @return {boolean}
        * @public
        */
        justReleased(duration?: number): boolean;
        /**
        * Resets all of the properties on the Key to their default values.
        * @method reset
        * @public
        */
        reset(): void;
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
    * @param game {Kiwi.Game}
    * @return {Kiwi.Input.Keyboard} This object.
    *
    */
    class Keyboard {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "Keyboard"
        * @public
        */
        objType(): string;
        /**
        * The game that this Keyboard belongs to.
        * @property game
        * @type Kiwi.Game
        * @public
        */
        game: Kiwi.Game;
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
        keys: Key[];
        /**
        * The time in milliseconds which determines if a key was just pressed or not.
        * @property justPressedRate
        * @type Number
        * @default 200
        * @public
        */
        justPressedRate: number;
        /**
        * The time in milliseconds which determines if a key was just released or not.
        * @property justReleasedRate
        * @type Number
        * @default 200
        * @public
        */
        justReleasedRate: number;
        /**
        * Is executed when the DOMElements that are need to get the game going are loaded and thus the game can 'boot'
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * The update loop that is executed every frame.
        * @method update
        * @public
        */
        update(): void;
        /**
        * A Signal that dispatches events when a key is released/is now up.
        * Callbacks fired by this Signal will contain two parameters, the keyCode and key object.
        * 1) KeyCode - The keyCode of the key that was just released.
        * 2) Key - The key object for that keycode.
        * @property onKeyUp
        * @type Kiwi.Signal
        * @public
        */
        onKeyUp: Kiwi.Signal;
        /**
        * A Signal that dispatches events when a key is pressed/is down.
        * This mimics the natural 'keydown' event listener, so it will keep dispatching events if the user holds the key down.
        * Note: This fires after the 'onKeyDownOnce' signal.
        * Callbacks fired by this Signal will contain two parameters, the keyCode and key object.
        * 1) KeyCode - The keyCode of the key that was just released.
        * 2) Key - The key object for that keycode.
        *
        * @property onKeyDown
        * @type Kiwi.Signal
        * @public
        */
        onKeyDown: Kiwi.Signal;
        /**
        * A Signal that dispatches events when a key is pressed/is down initially.
        * This event only fires the first time that the key is pressed, so it won't dispatch events if the user is holding the key down.
        * Note: This fires before the 'onKeyDown' signal;
        * Callbacks fired by this Signal will contain two parameters, the keyCode and key object.
        * 1) KeyCode - The keyCode of the key that was just released.
        * 2) Key - The key object for that keycode.
        *
        * @property onKeyDownOnce
        * @type Kiwi.Signal
        * @public
        */
        onKeyDownOnce: Kiwi.Signal;
        /**
        * Adds the event listeners to the browser to listen for key events.
        * @method start
        * @public
        */
        start(): void;
        /**
        * Removes the event listeners and so effectively 'stops' all keyboard events.
        * @method stop
        * @public
        */
        stop(): void;
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
        * @return {Kiwi.Input.Key}
        * @public
        */
        addKey(keycode: number, preventDefault?: boolean): Key;
        /**
        * Returns a boolean indicating if a key (that you pass via a keycode) was just pressed or not.
        * @method justPressed
        * @param keycode {Number} The keycode of the key that you would like to check against.
        * @param [duration=this.justPressedRate] {Number} The duration at which determines if a key was 'just' pressed or not. If not specified defaults to the justPressedRate
        * @public
        */
        justPressed(keycode: any, duration?: number): boolean;
        /**
        * Returns a boolean indicating if a key (that you pass via a keycode) was just released or not.
        * @method justReleased
        * @param keycode {Number} The keycode of the key that you would like to check against.
        * @param [duration=this.justReleasedRate] {Number} The duration at which determines if a key was 'just' released or not. If not specified defaults to the justReleasedRate
        * @public
        */
        justReleased(keycode: any, duration?: number): boolean;
        /**
        * Returns a boolean indicating whether a key (that you pass via its keycode) is down or not.
        * @method isDown
        * @param keycode {Number} The keycode of the key that you are checking.
        * @return {boolean}
        * @public
        */
        isDown(keycode: number): boolean;
        /**
        * Returns a boolean indicating whether a key (that you pass via its keycode) is up or not.
        * @method isUp
        * @param keycode {Number} The keycode of the key that you are checking.
        * @return {boolean}
        * @public
        */
        isUp(keycode: number): boolean;
        /**
        * Executes the reset method on every Key that currently exists.
        * @method reset
        * @public
        */
        reset(): void;
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
        * @return {string} "Keycodes"
        * @public
        */
        objType(): string;
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
    * Handles the initialization and management of the various ways a user can interact with the device/game,
    * whether this is through a Keyboard and Mouse or by a Touch. Also contains some of the general callbacks that are 'global' between both Desktop and Mobile based devices.
    *
    * @class InputManager
    * @constructor
    * @namespace Kiwi.Input
    * @param game {Kiwi.Game} The game that this object belongs to.
    * @return {Kiwi.Input.InputManager} This object.
    *
    */
    class InputManager {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this is.
        * @method objType
        * @return {String} "InputManager"
        * @public
        */
        objType(): string;
        /**
        * A Signal that dispatches a event when any Pointer is pressed from the game.
        * @property onDown
        * @type Signal
        * @public
        */
        onDown: Kiwi.Signal;
        /**
        * A Signal that dispatches a event when any Pointer is released from the game.
        * @property onUp
        * @type Signal
        * @public
        */
        onUp: Kiwi.Signal;
        /**
        * The game that this manager belongs to.
        * @property game
        * @type Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * A reference to the mouse manager.
        * @property mouse
        * @type Mouse
        * @public
        */
        mouse: Kiwi.Input.Mouse;
        /**
        * The keyboard manager
        * @property keyboard
        * @type Keyboard
        * @public
        */
        keyboard: Kiwi.Input.Keyboard;
        /**
        * The touch manager.
        * @property touch
        * @type Touch
        * @public
        */
        touch: Kiwi.Input.Touch;
        /**
        * An array containing all of the pointers that are active on the stage.
        * @property _pointers
        * @type Array
        * @private
        */
        private _pointers;
        /**
        * Returns all of the pointers that can be used on the Input Manager. This is READ only.
        * @property pointers
        * @type Array
        * @public
        */
        pointers: Kiwi.Input.Pointer[];
        /**
        * This method is executed when the DOM has loaded and the manager is ready to load.
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * A private method that gets dispatched when either the mouse or touch manager dispatches a down event
        * @method _onDownEvent
        * @param x {Number} The x coordinate of the pointer
        * @param y {Number} The y coordinate of the pointer
        * @param timeDown {Number} The time that the pointer has been down for.
        * @param timeUp {Number} The Time that the pointer has been up form
        * @param duration {Number}
        * @param pointer {Kiwi.Input.Pointer} The pointer that was used.
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
        * @param pointer {Kiwi.Input.Pointer} The pointer that was used.
        * @private
        */
        private _onUpEvent(x, y, timeDown, timeUp, duration, pointer);
        onPressed: Kiwi.Signal;
        /**
        * An alias for the onRelease signal that goes straight to the onUp
        * @property onReleased
        * @type Signal
        * @public
        */
        onReleased: Kiwi.Signal;
        /**
        * The update loop that gets executed every frame.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Runs the reset method on the managers.
        * @method reset
        */
        reset(): void;
        /**
        * The position of the last pointer that was/is active on the stage.
        * @property position
        * @type Kiwi.Geom.Point
        * @public
        */
        position: Kiwi.Geom.Point;
        /**
        * If an input (either touch or the mouse cursor) is currently down. Not an accurate representation, should use the individual managers.
        * @property isDown
        * @type boolean
        * @public
        */
        isDown: boolean;
        /**
        * Populated x coordinate based on the most recent click/touch event
        * @property x
        * @type Number
        * @public
        */
        x: number;
        /**
        * Populated y coordinate based on the most recent click/touch event
        * @property y
        * @type Number
        * @public
        */
        y: number;
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
    * @param game {Kiwi.Game} The game that this mouse manager belongs to.
    * @return {Kiwi.Input.Mouse}
    *
    */
    class Mouse {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "Mouse"
        * @public
        */
        objType(): string;
        /**
        * The game that this mouse manager belongs to.
        * @property _game
        * @type Kiwi.Game
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
        onDown: Kiwi.Signal;
        /**
        * A Signal that dispatches events when the mouse is released from being down on the stage.
        * @property onUp
        * @type Kiwi.Signal
        * @public
        */
        onUp: Kiwi.Signal;
        /**
        * A Signal that dispatches events mouse wheel moves.
        * @property onWheel
        * @type Kiwi.Signal
        * @public
        */
        onWheel: Kiwi.Signal;
        /**
        * The MouseCursor that is on the stage. This contains the coordinates and information about the cursor.
        * @property _cursor
        * @type Kiwi.Input.MouseCursor
        * @private
        */
        private _cursor;
        /**
        * Returns the MouseCursor that is being used on the stage. This is READ ONLY.
        * @property cursor
        * @type Kiwi.Input.MouseCursor
        * @private
        */
        cursor: Kiwi.Input.MouseCursor;
        /**
        * This method is executed when the DOM has finished loading and thus the MouseManager can start listening for events.
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * Indicates whether or not the cursor is currently down. This is READ ONLY.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        isDown: boolean;
        /**
        * Indicates whether or not the cursor is currently up. This is READ ONLY.
        * @property isUp
        * @type boolean
        * @default true
        * @public
        */
        isUp: boolean;
        /**
        * Gets the duration in Milliseconds that the mouse cursor has either been up or down for.
        * @property duration
        * @type number
        * @public
        */
        duration: number;
        /**
        * Gets the x coordinate of the mouse cursor.
        * @property x
        * @type number
        * @public
        */
        x: number;
        /**
        * Gets the y coordinate of the mouse cursor.
        * @property y
        * @type number
        * @public
        */
        y: number;
        /**
        * Gets the wheelDeltaX coordinate of the mouse cursors wheel.
        * @property wheelDeltaX
        * @type number
        * @public
        */
        wheelDeltaX: number;
        /**
        * Gets the wheelDeltaY coordinate of the mouse cursors wheel.
        * @property wheelDeltaY
        * @type number
        * @public
        */
        wheelDeltaY: number;
        /**
        * Indicates if the ctrl key is down.
        * @property ctrlKey
        * @type boolean
        * @default false
        * @public
        */
        ctrlKey: boolean;
        /**
        * Indicates if the shift key is down.
        * @property shiftKey
        * @type boolean
        * @default false
        * @public
        */
        shiftKey: boolean;
        /**
        * Indicates if the alt key is down.
        * @property altKey
        * @type boolean
        * @default false
        * @public
        */
        altKey: boolean;
        /**
        * Returns a number indicating the button that was used. This can be used with the STATIC button properties.
        * @property button
        * @type number
        * @public
        */
        button: number;
        /**
        * The update loop for the cursor.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Start the mouse event listeners on the game. Automatically called by the boot.
        * @method start
        * @public
        */
        start(): void;
        /**
        * Stops the mouse event listeners from working. Useful if you no longer want the mouse to 'work'/be listened to.
        * @method stop
        * @public
        */
        stop(): void;
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
        justPressed(duration?: number): boolean;
        /**
        * Returns a boolean indicating if the mouse was 'justReleased' within a certain timeframe. The default timeframe is 200 milliseconds.
        * @method justReleased
        * @param [duration=200] {Number} The timeframe that it could have occured in..
        * @return {boolean}
        * @public
        */
        justReleased(duration?: number): boolean;
        /**
        * Runs the Reset method on the MouseCursor.
        * @method reset
        * @public
        */
        reset(): void;
        /**
        * Dispatches events when the context menu is fired.
        *
        * Functions fired from this Signal will have the a single argument
        * being the event of the 'contextmenu' gives.
        *
        * @property onContext
        * @type Kiwi.Signal
        * @since 1.3.0
        * @public
        */
        onContext: Kiwi.Signal;
        /**
        * Determines whether or not the context menu should appear
        * when the user 'right clicks' on the stage.
        *
        * Only has an effect on games targetting browsers.
        *
        * @property preventContextMenu
        * @type Boolean
        * @default false
        * @since 1.3.0
        * @public
        */
        preventContextMenu: boolean;
        /**
        * Fired when the context menu event is fired.
        * Used to prevent the context menu from appearing when the
        * 'preventContextMenu' property is set to true.
        *
        * This event is currently only used when targetting browsers and will not fire for CocoonJS.
        *
        * @method onContextMenu
        * @param event
        * @since 1.3.0
        * @private
        */
        private onContextMenu(event);
        /**
        * The binding of the 'onMouseDown' method.
        *
        * @property _onMouseDownBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onMouseDownBind;
        /**
        * The binding of the 'onMouseMove' method.
        *
        * @property _onMouseMoveBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onMouseMoveBind;
        /**
        * The binding of the 'onMouseUp' method.
        *
        * @property _onMouseUpBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onMouseUpBind;
        /**
        * The binding of the 'onMouseWheel' method.
        *
        * @property onMouseWheel
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onMouseWheelBind;
        /**
        * The binding of the 'onContextMenu' method.
        *
        * @property _onContextMenuBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onContextMenuBind;
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
        * @return {String} "TouchManager"
        * @public
        */
        objType(): string;
        /**
        * If the touch inputs are enabled on the current device (and so if the events will fire) or not.
        * @property touchEnabled
        * @type boolean
        * @public
        */
        touchEnabled: boolean;
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
        fingers: Kiwi.Input.Finger[];
        /**
        * The first finger that is used for touch events.
        * @property finger1
        * @type Finger
        * @public
        */
        finger1: Kiwi.Input.Finger;
        /**
        * The second finger that is used for touch events.
        * @property finger2
        * @type Finger
        * @public
        */
        finger2: Kiwi.Input.Finger;
        /**
        * The third finger that is used for touch events.
        * @property finger3
        * @type Finger
        * @public
        */
        finger3: Kiwi.Input.Finger;
        /**
        * The fourth finger that is used for touch events.
        * @property finger4
        * @type Finger
        * @public
        */
        finger4: Kiwi.Input.Finger;
        /**
        * Finger number five that is used for touch events.
        * @property finger5
        * @type Finger
        * @public
        */
        finger5: Kiwi.Input.Finger;
        /**
        * Finger number six, that is used for touch events.
        * @property finger6
        * @type Finger
        * @public
        */
        finger6: Kiwi.Input.Finger;
        /**
        * The seventh finger used for touch events.
        * @property finger7
        * @type Finger
        * @public
        */
        finger7: Kiwi.Input.Finger;
        /**
        * Finger number eight
        * @property finger8
        * @type Finger
        * @public
        */
        finger8: Kiwi.Input.Finger;
        /**
        * The ninth finger that is used for touch events.
        * @property finger9
        * @type Finger
        * @public
        */
        finger9: Kiwi.Input.Finger;
        /**
        * The tenth finger that is used for touch events.
        * @property finger10
        * @type Finger
        * @public
        */
        finger10: Kiwi.Input.Finger;
        /**
        * The latest finger that was used for any task.
        * @property latestFinger
        * @type Finger
        * @public
        */
        latestFinger: Kiwi.Input.Finger;
        /**
        * A boolean that will roughly indicate if any finger is currently down.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        isDown: boolean;
        /**
        * If all the fingers are up.
        * @property isUp
        * @type boolean
        * @default true
        * @public
        */
        isUp: boolean;
        /**
        * A Kiwi Signal that dispatches an event when a user presses down on the stage.
        * @property touchDown
        * @type Signal
        * @public
        * @deprecated
        */
        touchDown: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches an event when a user presses down on the stage.
        * @property onDown
        * @type Signal
        * @public
        */
        onDown: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches an event when a user releases a finger off of the stage.
        * @property touchUp
        * @type Signal
        * @public
        * @deprecated
        */
        touchUp: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches an event when a user releases a finger off of the stage.
        * @property onUp
        * @type Signal
        * @public
        */
        onUp: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches an event when a touch event is cancelled for the some reason.
        * @property touchCancel
        * @type Signal
        * @public
        * @deprecated
        */
        touchCancel: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches an event when a touch event is cancelled for the some reason.
        * @property onCancel
        * @type Signal
        * @public
        */
        onCancel: Kiwi.Signal;
        /**
        * An internal Kiwi method that runs when the DOM is loaded and the touch manager can now 'boot' up.
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * Starts up the event listeners that are being used on the touch manager.
        * @method start
        * @public
        */
        start(): void;
        /**
        * Prevent iOS bounce-back (doesn't work?)
        * @method consumeTouchMove
        * @param {Any} event
        * @public
        */
        private consumeTouchMove(event);
        /**
        * Gets the position of the latest finger on the x axis.
        * @property x
        * @type number
        * @public
        */
        x: number;
        /**
        * Gets the position of the latest finger on the y axis.
        * @property y
        * @type number
        * @public
        */
        y: number;
        /**
        * The developer defined maximum number of touch events.
        * By default this is set to 10 but this can be set to be lower.
        * @property _maxPointers
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
        * @property maximumPointers
        * @type number
        * @public
        */
        maximumPointers: number;
        /**
        *-------------------------
        * Generic Methods for Dealing with Pointers
        *-------------------------
        */
        /**
        * This method is in charge of registering a "finger"  (either from a Touch/Pointer start method) and assigning it a Finger,
        * You have to pass this method a id which is used to idenfied when released/cancelled.
        * @method _registerFinger
        * @param event {Any}
        * @param id {Number}
        * @private
        */
        private _registerFinger(event, id);
        /**
        * This method is in charge of deregistering (removing) a "finger" when it has been released,
        * You have to pass this method a id which is used to identfy the finger to deregister.
        * @method _deregisterFinger
        * @param event {Any}
        * @param id {Number}
        * @private
        */
        private _deregisterFinger(event, id);
        /**
        * This method is in charge of cancelling (removing) a "finger".
        * You have to pass this method a id which is used to idenfied the finger that was cancelled.
        * @method _cancelFinger
        * @param event {Any}
        * @param id {Number}
        * @private
        */
        private _cancelFinger(event, id);
        /**
        * This method is in charge of creating and assigning (removing) a "finger" when it has entered the dom element.
        * You have to pass this method a id which is used to idenfied the finger that was cancelled.
        * @method _enterFinger
        * @param event {Any}
        * @param id {Number}
        * @private
        */
        private _enterFinger(event, id);
        /**
        * This method is in charge of removing an assigned "finger" when it has left the DOM Elemetn.
        * You have to pass this method a id which is used to idenfied the finger that left.
        * @method _leaveFinger
        * @param event {Any}
        * @param id {Number}
        * @private
        */
        private _leaveFinger(event, id);
        /**
        * This method is in charge of updating the coordinates of a "finger" when it has moved..
        * You have to pass this method a id which is used to idenfied the finger that moved.
        * @method _moveFinger
        * @param event {Any}
        * @param id {Number}
        * @private
        */
        private _moveFinger(event, id);
        /**
        *-------------------
        * Touch Events
        *-------------------
        **/
        /**
        * This method runs when the a touch start event is fired by the browser and then assigns the event to a pointer that is currently not active.
        * https://developer.mozilla.org/en-US/docs/DOM/TouchList
        * @method onTouchStart
        * @param {Any} event
        * @private
        */
        private onTouchStart(event);
        /**
        * Doesn't appear to be supported by most browsers yet but if it was it would fire events when a touch is canceled.
        * http://www.w3.org/TR/touch-events/#dfn-touchcancel
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
        * https://developer.mozilla.org/en-US/docs/DOM/TouchList
        * @method onTouchEnd
        * @param {Any} event
        * @private
        */
        private onTouchEnd(event);
        /**
        *-------------------
        * Pointer Events
        *-------------------
        **/
        /**
        * Event that is fired when a pointer is initially pressed.
        * @method onPointerStart
        * @param event {PointerEvent}
        * @private
        */
        private onPointerStart(event);
        /**
        * Event that is fired by a pointer event listener upon a pointer canceling for some reason.
        * @method onPointerCancel
        * @param event {PointerEvent}
        * @private
        */
        private onPointerCancel(event);
        /**
        * Event that is fired by a pointer event listener upon a pointer entering the DOM Element the event listener is attached to.
        * @method onPointerEnter
        * @param event {PointerEvent}
        * @private
        */
        private onPointerEnter(event);
        /**
        * Event that is fired by a pointer event listener upon a pointer being leaving the DOM Element the event listener is attached to.
        * @method onPointerLeave
        * @param event {PointerEvent}
        * @private
        */
        private onPointerLeave(event);
        /**
        * Event that is fired by a pointer event listener upon a pointer moving.
        * @method onPointerMove
        * @param event {PointerEvent}
        */
        private onPointerMove(event);
        /**
        * Event that is fired by a pointer event listener upon a pointer being released.
        * @method onPointerEnd
        * @param event {PointerEvent}
        * @private
        */
        private onPointerEnd(event);
        /**
        *-----------------
        * Normal Methods
        *-----------------
        **/
        /**
        * The update loop fro the touch manager.
        * @method update
        * @public
        */
        update(): void;
        /**
        * This method removes all of the event listeners and thus 'stops' the touch manager.
        * @method stop
        * @public
        */
        stop(): void;
        /**
        * Resets all of the fingers/pointers to their default states.
        * @method reset
        * @public
        */
        reset(): void;
        /**
        * The binding of the 'onTouchStart' method.
        *
        * @property _onTouchStartBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onTouchStartBind;
        /**
        * The binding of the 'onTouchMove' method.
        *
        * @property _onTouchMoveBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onTouchMoveBind;
        /**
        * The binding of the 'onTouchEnd' method.
        *
        * @property _onTouchEndBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onTouchEndBind;
        /**
        * The binding of the 'onTouchEnter' method.
        *
        * @property _onTouchEnterBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onTouchEnterBind;
        /**
        * The binding of the 'onTouchLeave' method.
        *
        * @property _onTouchLeaveBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onTouchLeaveBind;
        /**
        * The binding of the 'onTouchCancel' method.
        *
        * @property _onTouchCancelBind
        * @type Function
        * @since 1.3.0
        * @private
        */
        private _onTouchCancelBind;
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
    * @param {Kiwi.Game} game
    * @return {Kiwi.Input.Pointer}
    *
    */
    class Pointer {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this class is.
        * @method objType
        * @return {string} "Pointer"
        * @public
        */
        objType(): string;
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
        game: Kiwi.Game;
        /**
        * The unique identifier for this pointer.
        * @property _id
        * @type number
        * @private
        */
        id: number;
        /**
        * The horizontal coordinate of point relative to the game element
        * @property x
        * @type Number
        * @default -1
        * @public
        */
        x: number;
        /**
        * The vertical coordinate of point relative to the game element
        * @property y
        * @type Number
        * @default -1
        * @public
        */
        y: number;
        /**
        * The horizontal coordinate of point relative to the viewport in pixels, excluding any scroll offset
        * @property clientX
        * @type Number
        * @default -1
        * @public
        */
        clientX: number;
        /**
        * The vertical coordinate of point relative to the viewport in pixels, excluding any scroll offset
        * @property clientY
        * @type Number
        * @default -1
        * @public
        */
        clientY: number;
        /**
        * The horizontal coordinate of point relative to the viewport in pixels, including any scroll offset
        * @property pageX
        * @type Number
        * @default -1
        * @public
        */
        pageX: number;
        /**
        * The vertical coordinate of point relative to the viewport in pixels, including any scroll offset
        * @property pageY
        * @type Number
        * @default -1
        * @public
        */
        pageY: number;
        /**
        * The horizontal coordinate of point relative to the screen in pixels
        * @property screenX
        * @type Number
        * @default -1
        * @public
        */
        screenX: number;
        /**
        * The vertical coordinate of point relative to the screen in pixels
        * @property screenY
        * @type Number
        * @default -1
        * @public
        */
        screenY: number;
        /**
        * The point that this pointer is at. Same coordinates as X/Y properties.
        * @property point
        * @type Kiwi.Geom.Point
        * @public
        */
        point: Kiwi.Geom.Point;
        /**
        * A circle that is representative of the area this point covers.
        * @property circle
        * @type Kiwi.Geom.Circle
        * @public
        */
        circle: Kiwi.Geom.Circle;
        /**
        * Indicates if this pointer is currently down.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        isDown: boolean;
        /**
        * Indicates if this pointer is currently up.
        * @property isUp
        * @default true
        * @type boolean
        * @public
        */
        isUp: boolean;
        /**
        * Indicates if this pointer is currently within the game.
        * @property withinGame
        * @type boolean
        * @default false
        * @public
        */
        withinGame: boolean;
        /**
        * Indicates if this pointer is active. Note a mouse is always 'active' where as a finger is only active when it is down.
        * @property active
        * @type boolean
        * @default false
        * @public
        */
        active: boolean;
        /**
        * Indicates the time that the pointer was pressed initially.
        * @property timeDown
        * @type number
        * @default 0
        * @public
        */
        timeDown: number;
        /**
        * Indicates the time that the pointer was released initially.
        * @property timeUp
        * @type number
        * @default 0
        * @public
        */
        timeUp: number;
        /**
        * The duration that the pointer has been down for in milliseconds.
        * @property duration
        * @type number
        * @default 0
        * @public
        */
        duration: number;
        /**
        * The duration that the pointer has been down for in frames.
        * @property frameDuration
        * @type number
        * @default 0
        * @public
        */
        frameDuration: number;
        /**
        * A time that is used to calculate if someone justPressed the pointer.
        * @property justPressedRate
        * @type number
        * @defeault 200
        * @public
        */
        justPressedRate: number;
        /**
        * A time that is used to calculate if someone justReleased the pointer.
        * @property justReleasedRate
        * @type number
        * @default 200
        * @public
        */
        justReleasedRate: number;
        /**
        * The points inital coordinates when pressed down.
        * @property startPoint
        * @type Kiwi.Geom.Point
        * @public
        */
        startPoint: Kiwi.Geom.Point;
        /**
        * The coordinates where the user released the pointer.
        * @property endPoint
        * @type Kiwi.Geom.Point
        * @public
        */
        endPoint: Kiwi.Geom.Point;
        /**
        * The method that gets executed when the pointer presses/initially goes down on the screen.
        * From the event passed the coordinates are calculated.
        * @method start
        * @param {event} event
        * @public
        */
        start(event: any): void;
        /**
        * The stop method is to be called when the pointer gets released initially.
        * @method stop
        * @param {event} event
        * @public
        */
        stop(event: any): void;
        /**
        * Used to get the cooridnates of a pointer and inputs them to the correct properties.
        * @method move
        * @param {event} event
        * @public
        */
        move(event: any): void;
        /**
        * Indicates if the pointer was just pressed. This is based of the justPressedRate unless otherwise specifieds.
        * @method justPressed
        * @param {Number} duration
        * @return boolean
        * @public
        */
        justPressed(duration?: number): boolean;
        /**
        * Indicates if the pointer was just released. This is based of the justReleasedRate unless otherwise specified.
        * @method justReleased
        * @param {Number} duration
        * @return boolean
        * @public
        */
        justReleased(duration?: number): boolean;
        /**
        * READ ONLY: Indicates if this pointer was pressed on the last frame or not.
        * This is only true on the frame that the point was 'justPressed' and is not a constant like 'isDown'
        *
        * @property pressed
        * @type boolean
        * @readOnly
        * @public
        */
        pressed: boolean;
        /**
        * READ ONLY: Indicates if this pointer was released on the last frame or not.
        * This is only true on the frame that the point was 'justReleased' and is not a constant like 'isUp'
        *
        * @property released
        * @type boolean
        * @readOnly
        * @public
        */
        released: boolean;
        /**
        * Resets the pointer properties to the default ones. Assumes that the pointer is no longer down.
        * @method reset
        * @public
        */
        reset(): void;
        /**
        * The update loop for the pointer. Used only if down to update the duration.
        * @method update
        * @public
        */
        update(): void;
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
    * Holds the information about a Mouse Cursor, such as the position of the
    * cursor, the mouse wheel's delta, the button that was used, e.t.c.
    * Note: A mouse cursor is always active.
    *
    * @class MouseCursor
    * @namespace Kiwi.Input
    * @extends Pointer
    */
    class MouseCursor extends Pointer {
        /**
        * The type of object this class is.
        * @method objType
        * @return {string} "MouseCursor"
        * @public
        */
        objType(): string;
        /**
        * The offset of the mouse wheel on the X axis.
        * @property wheelDeltaX
        * @type number
        * @default 0
        * @public
        */
        wheelDeltaX: number;
        /**
        * The offset of the mouse wheel on the Y axis.
        * @property wheelDeltaY
        * @type number
        * @default 0
        * @public
        */
        wheelDeltaY: number;
        /**
        * If the ctrl key is down.
        * @property ctrlKey
        * @type boolean
        * @public
        */
        ctrlKey: boolean;
        /**
        * If the shift key is down.
        * @property shiftKey
        * @type boolean
        * @public
        */
        shiftKey: boolean;
        /**
        * If the alt key is down.
        * @property altKey
        * @type boolean
        * @public
        */
        altKey: boolean;
        /**
        * The button that got pressed. Eg. If the LEFT mouse button was pressed this number would be 0
        * @property button
        * @type number
        * @public
        */
        button: number;
        /**
        * Indicates if the "preventDefault" method should be executed whenever a 'down' mouse event occurs.
        * @property preventDown
        * @type boolean
        * @public
        */
        preventDown: boolean;
        /**
        * Indicates if the "preventDefault" method should be executed whenever a 'up' mouse event occurs.
        * @property preventUp
        * @type boolean
        * @public
        */
        preventUp: boolean;
        /**
        * Indicates if the "preventDefault" method should be executed whenever a 'wheel' mouse event occurs.
        * @property preventWheel
        * @type boolean
        * @public
        */
        preventWheel: boolean;
        /**
        * Gets executed when the mouse cursor gets initally pressed.
        * @method start
        * @param {event} event
        * @public
        */
        start(event: any): void;
        /**
        * Gets executed when the mouse cursor gets initally released.
        * @method stop
        * @param {event} event
        * @public
        */
        stop(event: any): void;
        /**
        * When the mouse wheel event fires and the mouse's delta changes.
        * @method wheel
        * @param {event} event
        * @public
        */
        wheel(event: any): void;
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
    * Used with the Touch manager class, this object holds information about a
    * single touch point/location (or, you know, a finger). By default a Finger
    * has a diameter of 44 pixels (random average size of a finger) which can
    * be used for collision/overlap detection. That value can be modified.
    * Note: A Finger is only active whilst the user is 'pressing' down on stage.
    *
    * @class Finger
    * @extends Pointer
    * @namespace Kiwi.Input
    * @constructor
    * @param game {Kiwi.Game} The game that this finger belongs to.
    * @return Finger
    */
    class Finger extends Pointer {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this is.
        * @method objType
        * @return {string} "Finger"
        * @public
        */
        objType(): string;
        /**
        * @method start
        * @param {Any} event
        * @public
        */
        start(event: any): void;
        /**
        * @method stop
        * @param event {Any}
        * @public
        */
        stop(event: any): void;
        /**
        * @method leave
        * @param event {Any}
        * @public
        */
        leave(event: any): void;
        /**
        * @method reset
        * @public
        */
        reset(): void;
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
    * @param cx {Number} The centeral position on the x-axis.
    * @param cy {Number} The centeral position on the y-axis.
    * @param width {Number} The width of the box.
    * @param height {Number} The height of the box.
    * @return {Kiwi.Geom.AABB}
    */
    class AABB {
        constructor(cx: number, cy: number, width: number, height: number);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "AABB"
        * @public
        */
        objType(): string;
        /**
        * The centeral location of the box on the x-axis.
        * @property cx
        * @type Number
        * @public
        */
        cx: number;
        /**
        * The centeral location of the box on the y-axis.
        * @property cy
        * @type Number
        * @public
        */
        cy: number;
        /**
        * Half of the width.
        * @property halfWidth
        * @type Number
        * @public
        */
        halfWidth: number;
        /**
        * Half of the height.
        * @property halfHeight
        * @type Number
        * @public
        */
        halfHeight: number;
        /**
        * Returns the full height. This is read only.
        * @property height
        * @type number
        * @readOnly
        * @public
        */
        height: number;
        /**
        * Returns the full width. This is read only.
        * @property width
        * @type number
        * @readOnly
        * @public
        */
        width: number;
        /**
        * Draws the object to a canvas context passed.
        * @method draw
        * @param ctx {CanvasRenderingContext2D} The context you want this drawn to.
        * @return {Kiwi.Geom.AABB}
        * @public
        */
        draw(ctx: CanvasRenderingContext2D): AABB;
        /**
        * Sets the position of the object.
        * @method setPosition
        * @param cx {Number} Its new x-axis location.
        * @param cy {Number} Its new y-axis location.
        * @return {Kiwi.Geom.AABB}
        * @public
        */
        setPosition(cx: number, cy: number): AABB;
        /**
        * Sets the position of the object by a point that you pass.
        *
        * @method setPositionPoint
        * @param pos {Kiwi.Geom.Point}
        * @return {Kiwi.Geom.AABB}
        * @public
        */
        setPositionPoint(pos: Point): AABB;
        /**
        * Returns this object but as a new Rectangle.
        *
        * @method toRect
        * @return {Kiwi.Geom.Rectangle}
        * @public
        */
        toRect(): Rectangle;
        /**
        * Gives the dimension of this AABB from a rectangle's.
        * @method fromRect
        * @param {Kiwi.Geom.Rectangle} rect
        * @return {Kiwi.Geom.AABB}
        * @public
        */
        fromRect(rect: Rectangle): AABB;
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
    * @param [x=0] {Number} The x coordinate of the center of the circle.
    * @param [y=0] {Number} The y coordinate of the center of the circle.
    * @param [diameter=0] {number} The diameter of the circle.
    * @return {Kiwi.Geom.Circle} This circle object
    *
    */
    class Circle {
        constructor(x?: number, y?: number, diameter?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String} "Circle"
        * @public
        */
        objType(): string;
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
        x: number;
        /**
        * The y coordinate of the center of the circle
        * @property y
        * @type Number
        * @default 0
        * @public
        */
        y: number;
        /**
        * The diameter of the circle.
        * The largest distance between any two points on the circle.
        * The same as the radius * 2.
        *
        * @property diameter
        * @type number
        * @public
        */
        diameter: number;
        /**
        * The radius of the circle.
        * The length of a line extending from the center of the circle to any point on the circle itself.
        * The same as half the diameter.
        *
        * @property radius
        * @type number
        * @public
        */
        radius: number;
        /**
        * The circumference of the circle. This is READ ONLY.
        * @property circumference
        * @type number
        * @readOnly
        * @public
        */
        circumference: number;
        /**
        * The sum of the y and radius properties.
        * Changing the bottom property of a Circle object has no effect on the x and y properties,
        * but does change the diameter.
        * @property bottom
        * @type number
        * @public
        */
        bottom: number;
        /**
        * The x coordinate of the leftmost point of the circle.
        * Changing the left property of a Circle object has no effect on the x and y properties.
        * However it does affect the diameter, whereas changing the x value does not affect the diameter property.
        *
        * @property left
        * @type number
        * @public
        */
        left: number;
        /**
        * The x coordinate of the rightmost point of the circle.
        * Changing the right property of a Circle object has no effect on the x and y properties.
        * However it does affect the diameter, whereas changing the x value does not affect the diameter property.
        *
        * @property right
        * @type number
        * @public
        */
        right: number;
        /**
        * The sum of the y minus the radius property.
        * Changing the top property of a Circle object has no effect on the x and y properties,
        * but does change the diameter.
        *
        * @property top
        * @type number
        * @public
        */
        top: number;
        /**
        * Gets the area of this Circle. Note this is READ ONLY.
        * @property area
        * @type number
        * @readOnly
        * @public
        */
        area: number;
        /**
        * Determines whether or not this Circle object is empty.
        * @method isEmpty
        * @return {boolean} A value of true if the Circle objects diameter is less than or equal to 0; otherwise false.
        * @public
        */
        isEmpty: boolean;
        /**
        * Returns a new Circle object with the same values for the x, y, diameter, and radius properties as the original Circle object.
        * @method clone
        * @param [output=Circle] {Kiwi.Geom.Circle} If given the values will be set into the object, otherwise a brand new Circle object will be created and returned.
        * @return {Kiwi.Geom.Circle}
        * @public
        */
        clone(output?: Circle): Circle;
        /**
        * Copies all of circle data from a Circle object passed (the source) into this Circle object.
        * @method copyFrom
        * @param source {Kiwi.Geom.Circle} The source circle object to copy from
        * @return {Kiwi.Geom.Circle} This circle object
        * @public
        */
        copyFrom(source: Circle): Circle;
        /**
        * Copies all of circle data from this Circle object into a passed Circle object (destination).
        * @method copyTo
        * @param circle {Kiwi.Geom.Circle} The destination circle object to copy in to
        * @return {Kiwi.Geom.Circle} The destination circle object
        * @public
        */
        copyTo(target: Circle): Circle;
        /**
        * Returns the distance from the center of this Circle object to the passed object.
        * The passed object can be a Circle, Point, or anything with x/y values.
        *
        * @method distanceTo
        * @param target {Any} The destination Point object.
        * @param [round=false] {boolean} Round the distance to the nearest integer (default false)
        * @return {Number} The distance between this Point object and the destination Point object.
        * @public
        */
        distanceTo(target: any, round?: boolean): number;
        /**
        * Determines whether a Circle passed is equal to this Circle.
        * They are considered 'equal' if both circles have the same values for x, y, and diameter properties.
        *
        * @method equals
        * @param toCompare {Kiwi.Geom.Circle} The circle to compare to this Circle object.
        * @return {boolean} A value of true if the object has exactly the same values for the x, y and diameter properties as this Circle object; otherwise false.
        * @public
        */
        equals(toCompare: Circle): boolean;
        /**
        * Determines whether a Circle passed intersects with this Circle.
        * Returns a boolean indicating if the two circles intersect.
        *
        * @method intersects
        * @param toIntersect {Kiwi.Geom.Circle} The Circle object to compare against to see if it intersects with this Circle object.
        * @return {boolean} A value of true if the specified object intersects with this Circle object; otherwise false.
        * @public
        */
        intersects(toIntersect: Circle): boolean;
        /**
        * Returns a Point object containing the coordinates of a point on the circumference of this Circle based on the given angle.
        *
        * @method circumferencePoint
        * @param angle {Number} The angle in radians (unless asDegrees is true) to return the point from.
        * @param [asDegress=false] {boolean} Is the given angle in radians (false) or degrees (true)?
        * @param [output] {Kiwi.Geom.Point} A Point object to put the result in to. If none specified a new Point object will be created.
        * @return {Kiwi.Geom.Point} The Point object holding the result.
        * @public
        */
        circumferencePoint(angle: number, asDegrees?: boolean, output?: Point): Point;
        /**
        * Adjusts the location of the Circle object, as determined by its center coordinate, by the specified amounts.
        * @method offset
        * @param dx {Number} Moves the x value of the Circle object by this amount.
        * @param dy {Number} Moves the y value of the Circle object by this amount.
        * @return {Kiwi.Geom.Circle} This Circle object.
        * @public
        */
        offset(dx: number, dy: number): Circle;
        /**
        * Adjusts the location of the Circle object using a Point object as a parameter.
        * This method is similar to the 'offset' method, except that it takes a Point object as a parameter.
        *
        * @method offsetPoint
        * @param {Kiwi.Geom.Point} point A Point object to use to offset this Circle object.
        * @return {Kiwi.Geom.Circle} This Circle object.
        * @public
        */
        offsetPoint(point: Point): Circle;
        /**
        * Sets the members of Circle to the specified values.
        *
        * @method setTo
        * @param x {Number} The x coordinate of the center of the circle.
        * @param y {Number} The y coordinate of the center of the circle.
        * @param diameter {Number} The diameter of the circle in pixels.
        * @return {Kiwi.Geom.Circle} This circle object
        * @public
        */
        setTo(x: number, y: number, diameter: number): Circle;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        * @public
        */
        toString(): string;
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
    * @param [x1=0] {Number} Starting location of the ray on the x-axis.
    * @param [y1=0] {Number} Starting location of the ray on the y-axis.
    * @param [x2=0] {Number} End location of the ray on the x-axis. Used to calculate direction so it isn't really the 'end' location.
    * @param [y2=0] {Number} End location of the ray on the y-axis. Used to calculate direction so it isn't really the 'end' location.
    * @return {Kiwi.Geom.Ray} This Object
    *
    */
    class Ray {
        constructor(x1?: number, y1?: number, x2?: number, y2?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String} "Ray"
        * @public
        */
        objType(): string;
        /**
        * The x component of the initial point of the ray
        * @property x1
        * @type Number
        * @default 0
        * @public
        */
        x1: number;
        /**
        * The y component of the initial point of the ray
        * @property y1
        * @type Number
        * @default 0
        * @public
        */
        y1: number;
        /**
        * The x component of the direction point of the ray
        * @property x2
        * @type Number
        * @default 0
        * @public
        */
        x2: number;
        /**
        * The y component of the direction point of the ray
        * @property y2
        * @type Number
        * @default 0
        * @public
        */
        y2: number;
        /**
        * Makes a copy of this Ray either as a new Ray object or,
        * makes a passed Ray a copy of this one.
        *
        * @method clone
        * @param [output] {Kiwi.Geom.Ray}
        * @return {Kiwi.Geom.Ray}
        * @public
        */
        clone(output?: Ray): Ray;
        /**
        * Makes this Ray the same as a passed Ray.
        * @method copyFrom
        * @param source {Kiwi.Geom.Ray}
        * @return {Kiwi.Geom.Ray}
        * @public
        */
        copyFrom(source: Ray): Ray;
        /**
        * Makes a passed Ray the same as this Ray object.
        * @method copyTo
        * @param target {Kiwi.Geom.Ray}
        * @return {Kiwi.Geom.Ray}
        * @public
        */
        copyTo(target: Ray): Ray;
        /**
        * Sets the origin and the direction of this Ray.
        * @method setTo
        * @param [x1=0] {Number}
        * @param [y1=0] {Number}
        * @param [x2=0] {Number}
        * @param [y2=0] {Number}
        * @return {Kiwi.Geom.Ray}
        * @public
        */
        setTo(x1?: number, y1?: number, x2?: number, y2?: number): Ray;
        /**
        * Get the angle of the ray.
        * @property angle
        * @type Number
        * @readOnly
        * @public
        */
        angle: number;
        /**
        * Get the slope of the ray.
        * @property slope
        * @type Number
        * @readOnly
        * @public
        */
        slope: number;
        /**
        *
        * @property yIntercept
        * @type Number
        * @readOnly
        * @public
        */
        yIntercept: number;
        /**
        * Check if the Ray passes through a point.
        * @method isPointOnRay
        * @param x {Number}
        * @param y {Number}
        * @return {boolean}
        * @public
        */
        isPointOnRay(x: number, y: number): boolean;
        /**
        * Get a string representation of the ray.
        * @method toString
        * @return {String}
        * @public
        */
        toString(): string;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * Contains a collection of STATIC methods for determining intersections between geometric objects.
    *
    * May methods contained here store the results of the intersections in a 'IntersectResult' Object,
    * which is either created for you (by the methods which require it) OR you can pass one to use instead.
    *
    * If you are using the Intersect methods a lot, you may want to consider
    * creating a IntersectResult class a reusing it (by passing it to the methods on the Intersect class)
    * instead of having new IntersectResults created.
    *
    * @class Intersect
    * @namespace Kiwi.Geom
    * @static
    */
    class Intersect {
        /**
        * The type of this object.
        * @method objType
        * @return {String} "Intersect"
        * @public
        */
        objType(): string;
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
        */
        static distance(x1: number, y1: number, x2: number, y2: number): number;
        /**
        * Returns the distance squared between two sets of coordinates that you specify.
        *
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
        * ---------------------------------------------------------------------
        * Lines
        * ---------------------------------------------------------------------
        **/
        /**
        * Check to see if any two Lines intersect at any point.
        * Both lines are treated as if they extend infintely through space.
        *
        * @method lineToLine
        * @param line1 {Kiwi.Geom.Line} The first line object to check.
        * @param line2 {Kiwi.Geom.Line} The second line object to check.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional
            IntersectResult object to store the intersection values in. One is
            created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object
            containing the results of this intersection in x/y
        * @public
        * @static
        */
        static lineToLine(line1: Line, line2: Line, output?: IntersectResult): IntersectResult;
        /**
        * Check to see if a Line and a Line Segment intersect at any point.
        * Note: The first line passed is treated as if it extends infinitely
        * though space. The second is treated as if it only exists between
        * its two points.
        *
        * @method lineToLineSegment
        * @param line1 {Kiwi.Geom.Line} The first line to check.
            This is the one that will extend through space infinately.
        * @param seg {Kiwi.Geom.Line} The second line to check.
            This is the one that will only exist between its two coordinates.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional
            IntersectResult object to store the intersection values in. One is
            created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object
            containing the results of this intersection.
        * @public
        * @static
        */
        static lineToLineSegment(line1: Line, seg: Line, output?: IntersectResult): IntersectResult;
        /**
        * Checks to see if a Line that is passed, intersects at any point with a Line that is made by passing a set of coordinates to this method.
        * Note: The first line will extend infinately through space.
        * And the second line will only exist between the two points passed.
        *
        * @method lineToRawSegment
        * @param line {Kiwi.Geom.Line} The line object that extends infinitely through space.
        * @param x1 {number} The x coordinate of the first point in the second line.
        * @param y1 {number} The y coordinate of the first point in the second line.
        * @param x2 {number} The x coordinate of the second point in the second line.
        * @param y2 {number} The y coordinate of the second point in the second line.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @static
        * @public
        */
        static lineToRawSegment(line: Line, x1: number, y1: number, x2: number, y2: number, output?: IntersectResult): IntersectResult;
        /**
        * Checks to see if a Line that is passed intersects with a Line that is made by passing a set of coordinates to this method.
        * Note: The lines will only exist between the two points passed.
        *
        * @method lineSegmentToRawSegment
        * @param line {Kiwi.Geom.Line} The line object that extends infinitely through space.
        * @param x1 {number} The x coordinate of the first point in the second line.
        * @param y1 {number} The y coordinate of the first point in the second line.
        * @param x2 {number} The x coordinate of the second point in the second line.
        * @param y2 {number} The y coordinate of the second point in the second line.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @static
        * @public
        */
        static lineSegmentToRawSegment(line: Line, x1: number, y1: number, x2: number, y2: number, output?: IntersectResult): IntersectResult;
        /**
        * Checks to see if a Line and Ray object intersects at any point.
        * Note: The line in this case extends infinately through space.
        *
        * @method lineToRay
        * @param line1 {Kiwi.Geom.Line} The Line object that extends infinatly through space.
        * @param ray {Kiwi.Geom.Ray} The Ray object that you want to check it against.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
        */
        static lineToRay(line1: Line, ray: Ray, output?: IntersectResult): IntersectResult;
        /**
        * Checks to see if a Line and a Circle intersect at any point.
        * Note: The line passed is assumed to extend infinately through space.
        *
        * @method lineToCircle
        * @param line {Kiwi.Geom.Line} The Line object that you want to check it against.
        * @param circle {Kiwi.Geom.Circle} The Circle object to check.
        * @param [output] {IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static lineToCircle(line: Line, circle: Circle, output?: IntersectResult): IntersectResult;
        /**
        * Check if the Line intersects with each side of a Rectangle.
        * Note: The Line is assumned to extend infinately through space.
        *
        * @method lineToRectangle
        * @param line {Kiwi.Geom.Line} The Line object to check
        * @param rectangle {Kiwi.Geom.Rectangle} The Rectangle object to check
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static lineToRectangle(line: any, rect: Rectangle, output?: IntersectResult): IntersectResult;
        /**
        * ---------------------------------------------------------------------
        * Line Segment
        * ---------------------------------------------------------------------
        **/
        /**
        * Checks to see if two Line Segments intersect at any point in space.
        * Note: Both lines are treated as if they only exist between their two
        * line coordinates.
        *
        * @method lineSegmentToLineSegment
        * @param line1 {Kiwi.Geom.Line} The first line object to check.
        * @param line2 {Kiwi.Geom.Line} The second line object to check.
        * @param [output]{Kiwi.Geom.IntersectResult} An optional
            IntersectResult object to store the intersection values in.
            One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object
            containing the results of this intersection in x/y.
        * @public
        * @static
        */
        static lineSegmentToLineSegment(line1: Line, line2: Line, output?: IntersectResult): IntersectResult;
        /**
        * Check if the Line Segment intersects with the Ray.
        * Note: The Line only exists between its two points.
        *
        * @method lineSegmentToRay
        * @param line1 {Kiwi.Geom.Line} The Line object to check.
        * @param ray {Kiwi.Geom.Line} The Ray object to check.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
        */
        static lineSegmentToRay(line1: Line, ray: Ray, output?: IntersectResult): IntersectResult;
        /**
        * Check if the Line Segment intersects with the Circle.
        * Note the Line only exists between its point points.
        *
        * @method lineSegmentToCircle
        * @param seg {Kiwi.Geom.Line} The Line object to check
        * @param circle {Kiwi.Geom.Circle} The Circle object to check
        * @param [ouput] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
        * @public
        * @static
        */
        static lineSegmentToCircle(seg: Line, circle: Circle, output?: IntersectResult): IntersectResult;
        /**
        * Check if the Line Segment intersects with any side of a Rectangle,
        * or is entirely within the Rectangle.
        * Note: The Line only exists between its two points.
        *
        * @method lineSegmentToRectangle
        * @param seg {Kiwi.Geom.Line} The Line object to check.
        * @param rect {Kiwi.Geom.Rectangle} The Rectangle object to check.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y.
        * @public
        * @static
        */
        static lineSegmentToRectangle(seg: Line, rect: Rectangle, output?: IntersectResult): IntersectResult;
        /**
        * -------------------------------------------------------------------------------------------
        * Ray
        * -------------------------------------------------------------------------------------------
        **/
        /**
        * Check to see if a Ray intersects at any point with a Rectangle.
        *
        * @method rayToRectangle
        * @param ray {Kiwi.Geom.Ray} The Ray object to check.
        * @param rect {Kiwi.Geom.Rectangle} The Rectangle to check.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static rayToRectangle(ray: Ray, rect: Rectangle, output?: IntersectResult): IntersectResult;
        /**
        * Check whether a Ray intersects a Line segment, returns the parametric value where the intersection occurs.
        * Note: The Line only exists between its two points.
        *
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
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection stored in x
        * @public
        */
        static rayToLineSegment(rayx1: any, rayy1: any, rayx2: any, rayy2: any, linex1: any, liney1: any, linex2: any, liney2: any, output?: IntersectResult): IntersectResult;
        /**
        * -------------------------------------------------------------------------------------------
        * Circle
        * -------------------------------------------------------------------------------------------
        **/
        /**
        * Check if the two given Circle objects intersect at any point.
        *
        * @method circleToCircle
        * @param circle1 {Kiwi.Geom.Circle} The first circle object to check.
        * @param circle2 {Kiwi.Geom.Circle} The second circle object to check.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static circleToCircle(circle1: Circle, circle2: Circle, output?: IntersectResult): IntersectResult;
        /**
        * Check if a Circle and a Rectangle intersect with each other at any point.
        *
        * @method circleToRectangle
        * @param circle {Kiwi.Geom.Circle} The circle object to check.
        * @param rect {Kiwi.Geom.Rectangle} The Rectangle object to check.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static circleToRectangle(circle: Circle, rect: Rectangle, output?: IntersectResult): IntersectResult;
        /**
        * Check if the given Point is found within the given Circle.
        *
        * @method circleContainsPoint
        * @param circle {Kiwi.Geom.Circle} The circle object to check
        * @param point {Kiwi.Geom.Point} The point object to check
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
        * @public
        * @static
        */
        static circleContainsPoint(circle: Circle, point: Point, output?: IntersectResult): IntersectResult;
        /**
        * -------------------------------------------------------------------------------------------
        * Rectangles
        * -------------------------------------------------------------------------------------------
        **/
        /**
        * Determines whether the specified point is contained within a given Rectangle object.
        *
        * @method pointToRectangle
        * @param point {Kiwi.Geom.Point} The point object being checked.
        * @param rect {Kiwi.Geom.Rectangle} The rectangle object being checked.
        * @param [output] {Kiwi.Geom.IntersectResult}  An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y/result
        * @public
        * @static
        */
        static pointToRectangle(point: Point, rect: Rectangle, output?: IntersectResult): IntersectResult;
        /**
        * Check whether two axis aligned rectangles intersect. Return the intersecting rectangle dimensions if they do.
        *
        * @method rectangleToRectangle
        * @param rect1 {Kiwi.Geom.Rectangle} The first Rectangle object.
        * @param rect2 {Kiwi.Geom.Rectangle} The second Rectangle object.
        * @param [output] {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in. One is created if none given.
        * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y/width/height
        * @public
        * @static
        */
        static rectangleToRectangle(rect1: Rectangle, rect2: Rectangle, output?: IntersectResult): IntersectResult;
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
    * If you are using the Intersect methods a lot, you may want to consider
    * creating a IntersectResult class a reusing it (by passing it to the methods on the Intersect class)
    * instead of having new IntersectResults created.
    *
    *
    * @class IntersectResult
    * @namespace Kiwi.Geom
    * @constructor
    */
    class IntersectResult {
        /**
        * The type of object this is.
        * @method objType
        * @return {String} "IntersectResult"
        * @public
        */
        objType(): string;
        /**
        * Holds the result of an Intersection between two geometric items.
        * TRUE means an Intersection did occur and FALSE means not.
        * @property result
        * @type boolean
        * @default false
        * @public
        */
        result: boolean;
        /**
        * Holds the x coordinate of the point in which the Intersection occured.
        * Note: This is only set in the case the TWO geometric items are either Lines or Rays (Line like in function)
        * and a Intersection occured.
        * @property x
        * @type Number
        * @public
        */
        x: number;
        /**
        * Holds the y coordinate of the point in which the Intersection occured.
        * Note: This is only set in the case the TWO geometric items are either Lines or Rays (Line like in function)
        * and a Intersection occured.
        * @property y
        * @type Number
        * @public
        */
        y: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property x1
        * @type Number
        * @public
        */
        x1: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property y1
        * @type Number
        * @public
        */
        y1: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property x2
        * @type Number
        * @public
        */
        x2: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property y2
        * @type Number
        * @public
        */
        y2: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property width
        * @type Number
        * @public
        */
        width: number;
        /**
        * [CURRENTLY NOT IN USE]
        * @property height
        * @type Number
        * @public
        */
        height: number;
        /**
        * Sets the coordinates of the points based on the parameters passed.
        * @method setTo
        * @param {Number} x1
        * @param {Number} y1
        * @param {Number} [x2=0]
        * @param {Number} [y2=0]
        * @param {Number} [width=0]
        * @param {Number} [height=0]
        * @public
        */
        setTo(x1: number, y1: number, x2?: number, y2?: number, width?: number, height?: number): void;
    }
}
/**
*
* @module Kiwi
* @submodule Geom
*/
declare module Kiwi.Geom {
    /**
    * A Line object has two meanings depending on the situation you need.
    * Either an infinte line through space (this is the usual meaning of a Line)
    * OR it can be a Line Segment which just exists between the TWO points you specify.
    *
    * @class Line
    * @namespace Kiwi.Geom
    * @constructor
    * @param [x1=0] {Number} Starting location of the line on the x-axis.
    * @param [y1=0] {Number} Starting location of the line on the y-axis.
    * @param [x2=0] {Number} End location of the line on the x-axis.
    * @param [y2=0] {Number} End location of the line on the y-axis.
    * @return {Kiwi.Geom.Line} This Object
    *
    */
    class Line {
        constructor(x1?: number, y1?: number, x2?: number, y2?: number);
        /**
        * Returns the type of this object
        * @method objType
        * @return {string} "Line"
        * @public
        */
        objType(): string;
        /**
        * X position of first point on the line.
        * @property x1
        * @type Number
        * @public
        */
        x1: number;
        /**
        * Y position of first point on the line.
        * @property y1
        * @type Number
        * @public
        */
        y1: number;
        /**
        * X position of second point.
        * @property x2
        * @type Number
        * @public
        */
        x2: number;
        /**
        * Y position of second point.
        * @property y2
        * @type Number
        * @public
        */
        y2: number;
        /**
        * Makes a clone of this Line.
        * The clone can either be a new Line Object,
        * Otherwise you can pass a existing Line Object that you want to be a clone of this one.
        *
        * @method clone
        * @param [output=Line] {Kiwi.Geom.Line}
        * @return {Kiwi.Geom.Line}
        * @public
        */
        clone(output?: Line): Line;
        /**
        * Make this Line a copy of another passed Line.
        * @method copyFrom
        * @param source {Kiwi.Geom.Line} source
        * @return {Kiwi.Geom.Line}
        * @public
        */
        copyFrom(source: Line): Line;
        /**
        * Make another passed Line a copy of this one.
        * @method copyTo
        * @param target {Kiwi.Geom.Line} target
        * @return {Kiwi.Geom.Line}
        * @public
        */
        copyTo(target: Line): Line;
        /**
        * Used to set all components on the line.
        * @method setTo
        * @param [x1=0]{Number} X component of first point.
        * @param [y1=0]{Number} Y component of first point.
        * @param [x2=0]{Number} X component of second point.
        * @param [y2=0]{Number} Y component of second point.
        * @return {Kiwi.Geom.Line}
        * @public
        */
        setTo(x1?: number, y1?: number, x2?: number, y2?: number): Line;
        /**
        * Get the length of the Line as a Line Segment.
        * @property length
        * @type number
        * @readOnly
        * @public
        */
        length: number;
        /**
        * Get the y of a point on the line for a given x.
        * @method getY
        * @param x {Number}
        * @return {Number}
        * @public
        */
        getY(x: number): number;
        /**
        * Get the angle of the line.
        * @property angle
        * @type Number
        * @readOnly
        * @public
        */
        angle: number;
        /**
        * Get the slope of the line (y/x).
        * @property slope
        * @type Number
        * @readOnly
        * @public
        */
        slope: number;
        /**
        * Get the perpendicular slope of the line (x/y).
        * @propery perpSlope
        * @type Number
        * @readOnly
        * @public
        */
        perpSlope: number;
        /**
        * Get the y intercept for the line.
        * @property yIntercept
        * @type Number
        * @readOnly
        * @public
        */
        yIntercept: number;
        /**
        * Check if a point is on the line.
        * @method isPointOnLine
        * @param x {Number}
        * @param y {Number}
        * @return {boolean}
        * @public
        */
        isPointOnLine(x: number, y: number): boolean;
        /**
        * Check if the point is both on the line and within the line segment.
        * @method isPointOnLineSegment
        * @param x {Number}
        * @param y {Number}
        * @return {boolean}
        * @public
        */
        isPointOnLineSegment(x: number, y: number): boolean;
        /**
        * Check to see if this Line object intersects at any point with a passed Line.
        * Note: Both are treated as extending infinately through space.
        * Functions as an alias for the 'Kiwi.Geom.Intersect.lineToLine' method.
        *
        * @method intersectLineLine
        * @param line {Kiwi.Geom.Line} The line you want to check for a Intersection with.
        * @return {Kiwi.Geom.IntersectResult} The Intersect Result containing the collision information.
        * @public
        */
        intersectLineLine(line: any): IntersectResult;
        /**
        * Get a line perpendicular to the line passing through a given point.
        *
        * @method perp
        * @param x {Number}
        * @param y {Number}
        * @param [output] {Kiwi.Geom.Line} The line object that the result should be output to. Creates a new Line if one is not passed.
        * @return {Kiwi.Geom.Line}
        * @public
        */
        perp(x: number, y: number, output?: Line): Line;
        /**
        * Get a string representation of the line.
        * @method toString
        * @return {String}
        * @public
        */
        toString(): string;
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
    * By concatenating an object's transformation matrix with its ancestors matrices, it is possible to determine the absolute position of the object in world space.
    * See http://en.wikipedia.org/wiki/Transformation_matrix#Examples_in_2D_graphics for an in depth discussion of 2d tranformation matrices.
    *
    * @class Matrix
    * @namespace Kiwi.Geom
    * @constructor
    * @param [a=1] {Number}  position 0,0 of the matrix, affects scaling and rotation.
    * @param [b=0] {Number}  position 0,1 of the matrix, affects scaling and rotation.
    * @param [c=0] {Number}  position 1,0 of the matrix, affects scaling and rotation.
    * @param [d=1] {Number}  position 1,1 of the matrix, affects scaling and rotation.
    * @param [tx=0] {Number}  position 2,0 of the matrix, affects translation on x axis.
    * @param [ty=0] {Number}  position 2,1 of the matrix, affects translation on y axis.
    * @return (Object) This object.
    *
    */
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        /**
        * The type of object this is.
        * @method objType
        * @return {String} "Matrix"
        * @public
        */
        objType(): string;
        /**
        * Position 0,0 of the matrix, affects scaling and rotation
        * @property a
        * @type Number
        * @default 1
        * @public
        */
        a: number;
        /**
        * Position 0,1 of the matrix, affects scaling and rotation.
        * @property b
        * @type Number
        * @default 0
        * @public
        */
        b: number;
        /**
        * Position 1,0 of the matrix, affects scaling and rotation.
        * @property c
        * @type Number
        * @default 0
        * @public
        */
        c: number;
        /**
        * Position 1,1 of the matrix, affects scaling and rotation.
        * @property d
        * @type Number
        * @default 1
        * @public
        */
        d: number;
        /**
        * Position 2,0 of the matrix, affects translation on x axis.
        * @property tx
        * @type Number
        * @default 0
        * @public
        */
        tx: number;
        /**
        * Position 2,1 of the matrix, affects translation on y axis.
        * @property ty
        * @type Number
        * @default 0
        * @public
        */
        ty: number;
        /**
        * Set all matrix values
        * @method setTo
        * @param [a=1] {Number} position 0,0 of the matrix, affects scaling and rotation.
        * @param [b=0] {Number} position 0,1 of the matrix, affects scaling and rotation.
        * @param [c=0] {Number} position 1,0 of the matrix, affects scaling and rotation.
        * @param [d=1] {Number} position 1,1 of the matrix, affects scaling and rotation.
        * @param [tx=0] {Number} position 2,0 of the matrix, affects translation on x axis.
        * @param [ty=0] {Number} position 2,1 of the matrix, affects translation on y axis.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        setTo(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
        /**
        * Set matrix values from transform values
        * @method setFromTransform
        * @param tx {Number} Translation on x axis.
        * @param ty {Number} Translation on y axis.
        * @param scaleX {Number} scaleX. Scale on x axis.
        * @param scaleY {Number} scaleY. Scale on y axis.
        * @param rotation {Number} rotation.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        setFromTransform(tx: number, ty: number, scaleX: number, scaleY: number, rotation: number): Matrix;
        /**
        * Set matrix values from transform values, with rotation point data included
        * @method setFromOffsetTransform
        * @param tx {Number} tx. Translation on x axis.
        * @param ty {Number} ty. Translation on y axis.
        * @param scaleX {Number} scaleX. Scale on x axis.
        * @param scaleY {Number} scaleY. Scale on y axis.
        * @param rotation {Number} rotation.
        * @param rotPointX {Number} Rotation point offset on x axis.
        * @param rotPointY {Number} Rotation point offset on y axis.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        * @since 1.0.1
        */
        setFromOffsetTransform(tx: number, ty: number, scaleX: number, scaleY: number, rotation: number, rotPointX: number, rotPointY: number): Matrix;
        /**
        * Prepend values to this matrix, paramters supplied individually.
        * @method prepend
        * @param [a=1]{Number} position 0,0 of the matrix, affects scaling and rotation.
        * @param [b=0]{Number} position 0,1 of the matrix, affects scaling and rotation.
        * @param [c=0]{Number} position 1,0 of the matrix, affects scaling and rotation.
        * @param [d=0]{Number} position 1,1 of the matrix, affects scaling and rotation.
        * @param [tx=0]{Number} position 2,0 of the matrix, affects translation on x axis.
        * @param [ty=0]{Number} position 2,1 of the matrix, affects translation on y axis.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        prepend(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
        /**
        * Prepend a matrix to this matrix.
        * @method prependMatrix
        * @param m {Kiwi.Geom.Matrix} The matrix to prepend.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        prependMatrix(m: Matrix): Matrix;
        /**
        * Append values to this matrix, parameters supplied individually.
        * @method append
        * @param [a=1]{Number} position 0,0 of the matrix, affects scaling and rotation.
        * @param [b=0]{Number} position 0,1 of the matrix, affects scaling and rotation.
        * @param [c=0]{Number} position 1,0 of the matrix, affects scaling and rotation.
        * @param [d=1]{Number} position 1,1 of the matrix, affects scaling and rotation.
        * @param [tx=0]{Number} position 2,0 of the matrix, affects translation on x axis.
        * @param [ty=0]{Number} position 2,1 of the matrix, affects translation on y axis.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        append(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
        /**
        * Append a matrix to this matrix.
        * @method appendMatrix
        * @param m {Kiwi.Geom.Matrix} The matrix to append.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        appendMatrix(m: Matrix): Matrix;
        /**
        * Set the tx and ty elements of the matrix.
        * @method setPosition
        * @param x {Number} Translation on x axis.
        * @param y {Number} Translation on y axis.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        setPosition(x: number, y: number): Matrix;
        /**
        * Set the tx and ty elements of the matrix from an object with x and y properties.
        * @method setPositionPoint
        * @param p {Number} The object from which to copy the x and y properties from.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        setPositionPoint(p: any): Matrix;
        /**
        * Get the x and y position of the matrix as an object with x and y properties
        * @method getPosition
        * @return {Kiwi.Geom.Point} An object constructed from a literal with x and y properties.
        * @public
        */
        getPosition(output?: Kiwi.Geom.Point): Kiwi.Geom.Point;
        /**
        * Set the matrix to the identity matrix - when appending or prepending this matrix to another there will be no change in the resulting matrix
        * @method identity
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        identity(): Matrix;
        /**
        * Rotate the matrix by "radians" degrees
        * @method rotate
        * @param radians {Number} The angle (in radians) to rotate this matrix by.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        rotate(radians: number): Matrix;
        /**
        * Translate the matrix by the amount passed.
        *
        * @method translate
        * @param tx {Number} The amount to translate on the x axis.
        * @param ty {Number} The amount to translate on the y axis.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        translate(tx: number, ty: number): Matrix;
        /**
        * Scales the matrix by the amount passed.
        *
        * @method scale
        * @param scaleX {Number} The amount to scale on the x axis.
        * @param scaleY {Number} The amount to scale on the y axis.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        scale(scaleX: number, scaleY: number): Matrix;
        /**
        * Apply this matrix to a an object with x and y properties representing a point and return the transformed point.
        * @method transformPoint
        * @param pt {Object} The point to be translated.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        transformPoint(pt: any): any;
        /**
        * Invert this matrix so that it represents the opposite of its orginal tranformaation.
        * @method invert
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        invert(): Matrix;
        /**
        * Copy another matrix to this matrix.
        * @method copyFrom
        * @param m {Kiwi.Geom.Matrix} The matrixto be copied from.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        copyFrom(m: Matrix): Matrix;
        /**
        * Copy this matrix to another matrix.
        * @method copyTo
        * @param m {Kiwi.Geom.Matrix} The matrix to copy to.
        * @return {Kiwi.Geom.Matrix} This object.
        * @public
        */
        copyTo(m: Matrix): Matrix;
        /**
        * Clone this matrix and returns a new Matrix object.
        * @method clone
        * @return {Kiwi.Geom.Matrix}
        * @public
        */
        clone(): Matrix;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} A string representation of the instance.
        * @public
        */
        toString: string;
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
    * @param [x=0] {Number} Position of this point on the x-axis.
    * @param [y=0] {Number} Position of this point on the y-axis.
    *
    */
    class Point {
        constructor(x?: number, y?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String} "Point"
        * @public
        */
        objType(): string;
        /**
        * The horizontal position of this point.
        * @property x
        * @type Number
        * @public
        */
        x: number;
        /**
        * The vertical position of this point.
        * @property y
        * @type Number
        * @public
        */
        y: number;
        /**
        * Converts a pair of polar coordinates to a Cartesian point coordinate and sets them on the point instance.
        * @method polar
        * @param length {Number} The length coordinate of the polar pair.
        * @param angle {Number} The angle, in radians, of the polar pair.
        * @return {Kiwi.Geom.Point} The new Cartesian Point object.
        * @public
        */
        polar(distance: number, angle: number): Point;
        /**
        * Adds the coordinates of another point to the coordinates of this point to create a new point.
        * @method add
        * @param toAdd {Kiwi.Geom.Point} The point to be added.
        * @param output {Kiwi.Geom.Point}
        * @return {Kiwi.Geom.Point} The new Point object.
        * @public
        */
        add(toAdd: Point, output?: Point): Point;
        /**
        * Adds the given values to the coordinates of this point and returns it
        * @method addTo
        * @param x {Number} The amount to add to the x value of the point
        * @param y {Number} The amount to add to the x value of the point
        * @return {Kiwi.Geom.Point} This Point object.
        * @public
        */
        addTo(x?: number, y?: number): Point;
        /**
        * Adds the given values to the coordinates of this point and returns it
        * @method subtractFrom
        * @param x {Number} The amount to subtract from the x value of the point
        * @param y {Number} The amount to subtract from the x value of the point
        * @return {Kiwi.Geom.Point} This Point object.
        * @public
        */
        subtractFrom(x?: number, y?: number): Point;
        /**
        * Inverts the x and y values of this point
        * @method invert
        * @return {Kiwi.Geom.Point} This Point object.
        * @public
        */
        invert(): Point;
        /**
        * Clamps this Point object to be between the given min and max.
        * @method clamp
        * @param min {number} The minimum value to clamp this Point to.
        * @param max {number} The maximum value to clamp this Point to.
        * @return {Kiwi.Geom.Point} This Point object.
        * @public
        */
        clamp(min: number, max: number): Point;
        /**
        * Clamps the x value of this Point object to be between the given min and max
        * @method clampX
        * @param min {Number} The minimum value to clamp this Point to
        * @param max {Number} The maximum value to clamp this Point to
        * @return {Kiwi.Geom.Point} This Point object.
        * @public
        */
        clampX(min: number, max: number): Point;
        /**
        * Clamps the y value of this Point object to be between the given min and max
        * @method clampY
        * @param min {Number} The minimum value to clamp this Point to
        * @param max {Number} The maximum value to clamp this Point to
        * @return {Kiwi.Geom.Point} This Point object.
        * @public
        */
        clampY(min: number, max: number): Point;
        /**
        * Creates a copy of this Point.
        * @method clone
        * @param [output] {Kiwi.Geom.Point} Optional Point object. If given the values will be set into this object, otherwise a new Point object will be created.
        * @return {Kiwi.Geom.Point}
        * @public
        */
        clone(output?: Point): Point;
        /**
        * Copies the point data from the source Point object into this Point object.
        * @method copyFrom
        * @param source {Kiwi.Geom.Point} The point to copy from.
        * @return {Kiwi.Geom.Point} This Point object. Useful for chaining method calls.
        * @public
        */
        copyFrom(source: Point): Point;
        /**
        * Copies the point data from this Point object to the given target Point object.
        * @method copyTo
        * @param target {Kiwi.Geom.Point} target - The point to copy to.
        * @return {Kiwi.Geom.Point} The target Point object.
        * @public
        */
        copyTo(target: Point): Point;
        /**
        * Get the angle from this Point object to given Point object.
        * @method angleTo
        * @param target {Kiwi.Geom.Point} destination Point object.
        * @return {Number} angle to point
        * @public
        */
        angleTo(target: Point): number;
        /**
        * Get the angle from this Point object to given X,Y coordinates.
        * @method angleToXY
        * @param x {Number} x value.
        * @param y {Number} y value.
        * @return {Number} angle to point.
        */
        angleToXY(x: number, y: number): number;
        /**
        * Returns the distance from this Point object to the given Point object.
        * @method distanceTo
        * @param target {Kiwi.Geom.Point} The destination Point object.
        * @param round {boolean} Round the distance to the nearest integer (default false)
        * @return {Number} The distance between this Point object and the destination Point object.
        * @public
        */
        distanceTo(target: Point, round?: boolean): number;
        /**
        * Returns the distance from this Point object to the given Point object.
        * @method distanceToXY
        * @param x {Number} The x value.
        * @param y {Number} The y value.
        * @param [round=false] {boolean} Round the distance to the nearest integer (default false)
        * @return {Number} The distance between this Point object and the x/y values.
        * @public
        */
        distanceToXY(x: number, y: number, round?: boolean): number;
        /**
        * Returns the distance between the two Point objects.
        * @method distanceBetween
        * @param pointA {Kiwi.Geom.Point} The first Point object.
        * @param pointB {Kiwi.Geom.Point} The second Point object.
        * @param [round=false] {boolean} Round the distance to the nearest integer (default false)
        * @return {Number} The distance between the two Point objects.
        * @public
        */
        static distanceBetween(pointA: Point, pointB: Point, round?: boolean): number;
        /**
        * Creates a new point with cartesian coordinates from a pair of polar coordinates
        * @method polar
        * @param length {Number} The length coordinate of the polar pair.
        * @param angle {Number} The angle, in radians, of the polar pair.
        * @return {Kiwi.Geom.Point} The new Cartesian Point object.
        * @public
        */
        static polar(length: number, angle: number): Point;
        /**
        * Returns true if the distance between this point and a target point is greater than or equal a specified distance.
        * This avoids using a costly square root operation
        * @method distanceCompare
        * @param target {Kiwi.Geom.Point} The Point object to use for comparison.
        * @param distance {Number} The distance to use for comparison.
        * @return {Boolean} True if distance is >= specified distance.
        * @public
        */
        distanceCompare(target: Point, distance: number): boolean;
        /**
        * Determines whether this Point object and the given point object are equal. They are equal if they have the same x and y values.
        * @method equals
        * @param point {Kiwi.Geom.Point} The point to compare against.
        * @return {boolean} A value of true if the object is equal to this Point object; false if it is not equal.
        * @public
        */
        equals(toCompare: Point): boolean;
        /**
        * Determines a point between two specified points.
        * The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters pt1 and pt2.
        *
        * The closer the value of the parameter f is to 1.0,
        * the closer the interpolated point is to the first point (parameter pt1).
        * The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter pt2).
        *
        * @method interpolate
        * @param pointA{Kiwi.Geom.Point} The first Point object.
        * @param pointB {Kiwi.Geom.Point} The second Point object.
        * @param f {Number} The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
        * @return {Kiwi.Geom.Point} The new interpolated Point object.
        * @public
        */
        static interpolate(pointA: Point, pointB: Point, f: number): Point;
        /**
        * Offsets the Point object by the specified amount. The value of dx is added to the original value of x to create the new x value.
        * The value of dy is added to the original value of y to create the new y value.
        *
        * @method offset
        * @param dx {Number} The amount by which to offset the horizontal coordinate, x.
        * @param dy {Number} The amount by which to offset the vertical coordinate, y.
        * @return {Kiwi.Geom.Point} This Point object. Useful for chaining method calls.
        * @public
        */
        offset(dx: number, dy: number): Point;
        /**
        * Sets the x and y values of this Point object to the given coordinates.
        * @method setTo
        * @param x {Number} The horizontal position of this point.
        * @param y {Number} The vertical position of this point.
        * @return {Kiwi.Geom.Point} This Point object. Useful for chaining method calls.
        * @public
        */
        setTo(x: number, y: number): Point;
        /**
        * Subtracts the coordinates of another point from the coordinates of this point to create a new point.
        * @method subtract
        * @param point {Kiwi.Geom.Point} The point to be subtracted.
        * @param output {Kiwi.Geom.Point} Optional Point object. If given the values will be set into this object, otherwise a brand new Point object will be created and returned.
        * @return {Kiwi.Geom.Point} The new Point object.
        * @public
        */
        subtract(point: Point, output?: Point): Point;
        getCSS(): string;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {String} a string representation of the instance.
        * @public
        */
        toString(): string;
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
    * @param [x=0] {Number} The x coordinate of the top-left corner of the rectangle.
    * @param [y=0] {Number} The y coordinate of the top-left corner of the rectangle.
    * @param [width=0] {Number} width The width of the rectangle in pixels.
    * @param [height=0] {Number} height The height of the rectangle in pixels.
    * @return {Kiwi.Geom.Rectangle} This rectangle object
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
        * @return {String} "Rectangle"
        * @public
        */
        objType(): string;
        /**
        * The x coordinate of the top-left corner of the rectangle
        * @property x
        * @type Number
        * @default 0
        * @public
        */
        x: number;
        /**
        * The y coordinate of the top-left corner of the rectangle
        * @property y
        * @type Number
        * @default 0
        * @public
        */
        y: number;
        /**
        * The width of the rectangle in pixels
        * @property width
        * @type Number
        * @default 0
        * @public
        */
        width: number;
        /**
        * The height of the rectangle in pixels
        * @property height
        * @type Number
        * @default 0
        * @public
        */
        height: number;
        /**
        * The sum of the y and height properties.
        * Changing the bottom property of a Rectangle object has no effect on the x, y and width properties,
        * but does change the height property.
        *
        * @property bottom
        * @type Number
        * @public
        */
        bottom: number;
        /**
        * Returns a Point containing the location of the center of the Rectangle, relative to the top left edge
        * @property center
        * @type Kiwi.Geom.Point
        * @readOnly
        * @public
        */
        center: Point;
        /**
        * Returns a Point containing the location of the Rectangle's bottom-right corner, determined by the values of the right and bottom properties.
        * @property bottomRight
        * @type Kiwi.Geom.Point
        * @public
        */
        bottomRight: Point;
        /**
        * The x coordinate of the top-left corner of the rectangle. Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
        * @property left
        * @type Number
        * @public
        */
        left: number;
        /**
        * The sum of the x and width properties. Changing the right property of a Rectangle object has no effect on the x, y and height properties. However it does affect the width property.
        * @property right
        * @type Number
        * @public
        */
        right: number;
        /**
        * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
        * @property size
        * @type Kiwi.Geom.Point
        * @readOnly
        * @public
        */
        size: Point;
        /**
        * The volume of the Rectangle object in pixels, derived from width * height
        * @property volume
        * @type Number
        * @readOnly
        * @return
        */
        volume: number;
        /**
        * The perimeter size of the Rectangle object in pixels. This is the sum of all 4 sides.
        * @property perimeter
        * @type Number
        * @readOnly
        * @public
        */
        perimeter: number;
        /**
        * The y coordinate of the top-left corner of the rectangle.
        * Changing the top property of a Rectangle object has no effect on the x and width properties.
        * However it does affect the height property, whereas changing the y value does not affect the height property.
        *
        * @method top
        * @return {Number}
        * @public
        */
        top: number;
        /**
        * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
        * @property topLeft
        * @type Kiwi.Geom.Point
        * @public
        */
        topLeft: Point;
        /**
        * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
        * @method clone
        * @param [output] {Kiwi.Geom.Rectangle} Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
        * @return {Kiwi.Geom.Rectangle}
        * @public
        */
        clone(output?: Rectangle): Rectangle;
        /**
        * Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
        * @method contains
        * @param {Number} x The x coordinate of the point to test.
        * @param {Number} y The y coordinate of the point to test.
        * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
        * @public
        */
        contains(x: number, y: number): boolean;
        /**
        * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
        * This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
        *
        * @method containsPoint
        * @param {Kiwi.Geom.Point} point The point object being checked. Can be Kiwi.Geom.Point or any object with .x and .y values.
        * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
        * @public
        */
        containsPoint(point: Point): boolean;
        /**
        * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object.
        * A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
        *
        * @method containsRect
        * @param rect {Kiwi.Geom.Rectangle} The rectangle object being checked.
        * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
        * @public
        */
        containsRect(rect: Rectangle): boolean;
        /**
        * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
        *
        * @method copyFrom
        * @param source {Kiwi.Geom.Rectangle} The source rectangle object to copy from
        * @return {Kiwi.Geom.Rectangle} This rectangle object
        * @public
        */
        copyFrom(source: Rectangle): Rectangle;
        /**
        * Copies all the rectangle data from this Rectangle object into the destination Rectangle object.
        * Creates a new rectangle if one was not passed.
        *
        * @method copyTo
        * @param [target] {Kiwi.Geom.Rectangle} The destination rectangle object to copy in to. Creates a new rectangle if one is not passed.
        * @return {Kiwi.Geom.Rectangle} The destination rectangle object
        * @public
        */
        copyTo(target?: Rectangle): Rectangle;
        /**
        * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object.
        * This method compares the x, y, width, and height properties of an object against the same properties of this Rectangle object.
        *
        * @method equals
        * @param  toCompare {Kiwi.Geom.Rectangle} toCompare The rectangle to compare to this Rectangle object.
        * @return {boolean} A value of true if the object has exactly the same values for the x, y, width, and height properties as this Rectangle object; otherwise false.
        * @public
        */
        equals(toCompare: Rectangle): boolean;
        /**
        * Increases the size of the Rectangle object by the specified amounts, in pixels.
        *
        * The center point of the Rectangle object stays the same,
        * and its size increases to the left and right by the dx value,
        * and to the top and the bottom by the dy value.
        *
        * @method inflate
        * @param dx {Number} dx The amount to be added to the left side of this Rectangle.
        * @param dy {Number} dy The amount to be added to the bottom side of this Rectangle.
        * @return {Kiwi.Geom.Rectangle} This Rectangle object.
        * @public
        */
        inflate(dx: number, dy: number): Rectangle;
        /**
        * Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
        *
        * @method inflatePoint
        * @param point {Kiwi.Geom.Point} The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
        * @return {Kiwi.Geom.Rectangle} This Rectangle object.
        * @public
        */
        inflatePoint(point: Point): Rectangle;
        /**
        * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object,
        * returns the area of intersection as a Rectangle object.
        * If the rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
        *
        * @method intersection
        * @param toIntersect {Kiwi.Geom.Rectangle} The Rectangle object to compare against to see if it intersects with this Rectangle object.
        * @param [output] {Kiwi.Geom.Rectangle} Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
        * @return {Kiwi.Geom.Rectangle} A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
        * @public
        */
        intersection(toIntersect: Rectangle, output?: Rectangle): Rectangle;
        /**
        * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object.
        * This method checks the x, y, width, and height properties of the specified Rectangle object to see if it intersects with this Rectangle object.
        *
        * @method intersects
        * @param toIntersect {Kiwi.Geom.Rectangle} The Rectangle object to compare against to see if it intersects with this Rectangle object.
        * @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
        * @public
        **/
        intersects(toIntersect: Rectangle): boolean;
        /**
        * Checks for overlaps between this Rectangle and the given Rectangle. Returns an object with boolean values for each check.
        *
        * @method overlap
        * @param rect {Kiwi.Geom.Rectangle}
        * @return {Object} An object containing the overlapping details between the two Rectangles
        * @todo Move to an IntersectResult? Do not want to be generating all of these values each time this is called
        * @public
        */
        overlap(rect: Rectangle): any;
        /**
        * Determines whether or not this Rectangle object is empty.
        * @method isEmpty
        * @return {boolean} A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
        * @public
        */
        isEmpty(): boolean;
        /**
        * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
        *
        * @method offset
        * @param dx {Number} Moves the x value of the Rectangle object by this amount.
        * @param dy {Number} Moves the y value of the Rectangle object by this amount.
        * @return {Kiwi.Geom.Rectangle} This Rectangle object.
        * @public
        */
        offset(dx: number, dy: number): Rectangle;
        /**
        * Adjusts the location of the Rectangle object using a Point object as a parameter.
        * This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
        *
        * @method offsetPoint
        * @param point {Kiwi.Geom.Point} A Point object to use to offset this Rectangle object.
        * @return {Kiwi.Geom.Rectangle} This Rectangle object.
        * @public
        */
        offsetPoint(point: Point): Rectangle;
        /**
        * Sets all of the Rectangle object's properties to 0.
        * A Rectangle object is empty if its width or height is less than or equal to 0.
        *
        * @method setEmpty
        * @return {Kiwi.Geom.Rectangle} This rectangle object
        * @public
        */
        setEmpty(): Rectangle;
        /**
        * Sets the properties of Rectangle to the specified values.
        *
        * @method setTo
        * @param x {Number} x The x coordinate of the top-left corner of the rectangle.
        * @param y {Number} y The y coordinate of the top-left corner of the rectangle.
        * @param width {Number} width The width of the rectangle in pixels.
        * @param height {Number} height The height of the rectangle in pixels.
        * @return {Kiwi.Geom.Rectangle} This rectangle object
        * @public
        */
        setTo(x: number, y: number, width: number, height: number): Rectangle;
        /**
        * Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
        *
        * @method union
        * @param toUnion {Kiwi.Geom.Rectangle} toUnion A Rectangle object to add to this Rectangle object.
        * @param [output] {Kiwi.Geom.Rectangle} output Optional Rectangle object. If given the new values will be set into this object, otherwise a new Rectangle object will be created.
        * @return {Kiwi.Geom.Rectangle} A Rectangle object that is the union of the two rectangles.
        * @public
        */
        union(toUnion: Rectangle, output?: Rectangle): Rectangle;
        /**
        * Scales this Rectangle by values passed.
        *
        * @method scale
        * @param x {number}
        * @param y {number}
        * @param translation {Kiwi.Geom.Point}
        * @return {Kiwi.Geom.Rectangle}
        * @public
        */
        scale(x: number, y: number, translation: Kiwi.Geom.Point): Rectangle;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {String} a string representation of the instance.
        */
        toString(): string;
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
    * @param [x=0] {Number} X position of the transform.
    * @param [y=0] {Number} Y position of the transform.
    * @param [scaleX=1] {Number} X scaling of the transform.
    * @param [scaleY=1] {Number} Y scaling of the transform.
    * @param [rotation=0] {Number} Rotation of the transform in radians.
    * @param [rotX=0] {Number} rotationPoint offset on X axis.
    * @param [rotY=0] {Number} rotationPoint offset on Y axis.
    * @return {Transform} This object.
    *
    */
    class Transform {
        constructor(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, rotPointX?: number, rotPointY?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String} "Transform"
        * @public
        */
        objType(): string;
        /**
        * X position of the transform
        * @property _x
        * @type Number
        * @default 0
        * @private
        */
        private _x;
        /**
        * Return the X value of the transform.
        * @property x
        * @type Number
        * @public
        */
        x: number;
        /**
        * Y position of the transform
        * @property _y
        * @type Number
        * @default 0
        * @private
        */
        private _y;
        /**
        * Return the Y value of the transform.
        * @property y
        * @type Number
        * @public
        */
        y: number;
        /**
        * X scaleof the transform
        * @property _scaleX
        * @type Number
        * @default 1
        * @private
        */
        private _scaleX;
        /**
        * Return the X scale value of the transform.
        * @property scaleX
        * @type Number
        * @public
        */
        scaleX: number;
        /**
        * Y scale of the transform
        * @property _scaleY
        * @type Number
        * @default 1
        * @private
        */
        private _scaleY;
        /**
        * Return the Y scale value of the transform.
        * @property scaleY
        * @type Number
        * @public
        */
        scaleY: number;
        /**
        * Rotation of the transform in radians.
        * @property _rotation
        * @type Number
        * @default 0
        * @private
        */
        private _rotation;
        /**
        * Return the rotation value of the transform in radians.
        * @property rotation
        * @type Number
        * @public
        */
        rotation: number;
        /**
        * Rotation offset on X axis.
        * @property _rotPointX
        * @type Number
        * @default 0
        * @private
        */
        private _rotPointX;
        /**
        * Return the rotation offset from the x axis.
        * @property rotPointX
        * @type Number
        * @default 0
        * @public
        */
        rotPointX: number;
        /**
        * Rotation offset on Y axis.
        * @property _rotPointY
        * @type Number
        * @default 0
        * @private
        */
        private _rotPointY;
        /**
        * Return the rotation offset from the y axis.
        * @property rotPointY
        * @type Number
        * @public
        */
        rotPointY: number;
        /**
        * Return the anchor point value from the X axis. (Aliases to rotPointX.)
        * @property anchorPointX
        * @type Number
        * @public
        * @since 1.1.0
        */
        anchorPointX: number;
        /**
        * Return the anchor point value from the Y axis. (Aliases to rotPointY.)
        * @property anchorPointY
        * @type Number
        * @public
        * @since 1.1.0
        */
        anchorPointY: number;
        /**
        * A 3x3 transformation matrix object that can be use this tranform to manipulate points or the context transformation.
        * @property _matrix
        * @type Kiwi.Geom.Matrix
        * @private
        */
        private _matrix;
        /**
        * Return the Matrix being used by this Transform
        * @property matrix
        * @type Kiwi.Geom.Matrix
        * @readOnly
        * @public
        */
        matrix: Matrix;
        /**
        * The most recently calculated matrix from getConcatenatedMatrix.
        * Not used or updated after object creation.
        * Candidate for deprecation.
        * @property _cachedConcatenatedMatrix
        * @type Kiwi.Geom.Matrix
        * @private
        */
        private _cachedConcatenatedMatrix;
        /**
        * Temporary matrix used in concatenation operations
        * @property _concatMatrix
        * @type Kiwi.Geom.Matrix
        * @private
        */
        private _concatMatrix;
        /**
        * Return the x of this transform translated to world space.
        * @property worldX
        * @type Number
        * @readOnly
        * @public
        */
        worldX: number;
        /**
        * Return the y of this transform translated to world space.
        * @property worldY
        * @type Number
        * @readOnly
        * @public
        */
        worldY: number;
        /**
        * The parent transform. If set to null there is no parent. Otherwise this is used by getConcatenatedMatrix to offset the current transforms by the another matrix
        * @property _parent
        * @type Kiwi.Geom.Transform
        * @default null
        * @private
        */
        private _parent;
        /**
        * Return the parent Transform. If the transform does not have a parent this null is returned.
        * @property parent
        * @type Kiwi.Geom.Transform
        * @default null
        * @public
        */
        parent: Transform;
        /**
        * Private copy.
        * Whether the Transform is locked. In locked mode, the Transform
        * will not update its matrix, saving on computation.
        * However, it will still follow its parent.
        * @property _locked
        * @type boolean
        * @default false
        * @private
        * @since 1.2.0
        */
        private _locked;
        /**
        * Whether the Transform is locked. In locked mode, the Transform
        * will not update its matrix, saving on computation.
        * However, it will still follow its parent.
        * When locked is set to true, it will set the matrix according to
        * current transform values.
        * @property locked
        * @type boolean
        * @default false
        * @public
        * @since 1.2.0
        */
        locked: boolean;
        /**
        * Private copy.
        * Whether to ignore its parent when concatenating matrices.
        * If true, it won't compute parent matrices.
        * This can save computation, but prevents it from following
        * its parent's transforms.
        * Use this to save some processor cycles if the transform isn't
        * following a parent and the state does not transform.
        * @property _ignoreParent
        * @type boolean
        * @default false
        * @private
        * @since 1.2.0
        */
        private _ignoreParent;
        /**
        * Whether to ignore its parent when concatenating matrices.
        * If true, it won't compute parent matrices.
        * This can save computation, but prevents it from following
        * its parent's transforms.
        * Use this to save some processor cycles if the transform isn't
        * following a parent and the state does not transform.
        * @property ignoreParent
        * @type boolean
        * @default false
        * @public
        * @since 1.2.0
        */
        ignoreParent: boolean;
        /**
        * Set the X and Y values of the transform.
        * @method setPosition
        * @param x {Number}
        * @param y {Number}
        * @return {Kiwi.Geom.Transform} This object.
        * @public
        */
        setPosition(x: number, y: number): Transform;
        /**
        * Set the X and Y values of the transform from a point.
        * @method setPositionPoint
        * @param point {Kiwi.Geom.Point} point.
        * @return {Kiwi.Geom.Transform} This object.
        * @public
        */
        setPositionFromPoint(point: Point): Transform;
        /**
        * Translate the X and Y value of the transform by point components.
        * @method translatePositionFromPoint
        * @param point {Kiwi.Geom.Point} point.
        * @return {Kiwi.Geom.Transform} This object.
        * @public
        */
        translatePositionFromPoint(point: Point): Transform;
        /**
        * Return a Point representing the X and Y values of the transform.
        * If no point is given a new Point objected will be created.
        *
        * @method getPositionPoint
        * @param [output] {Kiwi.Geom.Point} The Point to output the coordinates into. Creates a new Point if none given.
        * @return {Kiwi.Geom.Point} A point representing the X and Y values of the transform.
        * @public
        */
        getPositionPoint(output?: Point): Point;
        /**
        * Set the X and Y scale value of the transform.
        * This property is set only.
        * In the future this will be looked into and updated as needed.
        *
        * @property scale
        * @type Number
        * @public
        */
        scale: number;
        /**
        * Set the core properties of the transform.
        *
        * @method setTransform
        * @param [x=0] {Number} X position of the transform.
        * @param [y=0] {Number} Y position of the transform.
        * @param [scaleX=1] {Number} X scaling of the transform.
        * @param [scaleY=1] {Number} Y scaling of the transform.
        * @param [rotation=0] {Number} Rotation of the transform in radians.
        * @param [rotX=0] {Number} rotationPoint offset on X axis.
        * @param [rotY=0] {Number} rotationPoint offset on Y axis.
        * @return {Kiwi.Geom.Transform} This object.
        * @public
        */
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, rotPointX?: number, rotPointY?: number): Transform;
        /**
        * Return the parent matrix of the transform.
        * If there is no parent then null is returned.
        * @method getParentMatrix
        * @return {Kiwi.Geom.Matrix} Parent transform matrix
        * @public
        */
        getParentMatrix(): Matrix;
        /**
        * Return the transformation matrix that concatenates this transform
        * with all ancestor transforms. If there is no parent then this will
        * return a matrix the same as this transform's matrix.
        * @method getConcatenatedMatrix
        * @return {Kiwi.Geom.Matrix} The concatenated matrix.
        * @public
        */
        getConcatenatedMatrix(): Matrix;
        /**
        * Apply this matrix to a an object with x and y properties representing a point and return the transformed point.
        * @method transformPoint
        * @param point {Kiwi.Geom.Point}
        * @return {Kiwi.Geom.Point}
        * @public
        */
        transformPoint(point: Point): Point;
        /**
        * Copy another transforms data to this transform. A clone of the source matrix is created for the matrix property.
        * @method copyFrom
        * @param transform {Kiwi.Geom.Transform} transform. The tranform to be copied from.
        * @return {Kiwi.Geom.Transform} This object.
        * @public
        */
        copyFrom(source: Transform): Transform;
        /**
        * Copy this transforms data to the destination Transform.
        * A clone of this transforms matrix is created in the destination Transform Matrix.
        *
        * @method copyTo
        * @param destination {Kiwi.Geom.Transform} The tranform to copy to.
        * @return {Kiwi.Geom.Transform} This object.
        * @public
        */
        copyTo(destination: Transform): Transform;
        /**
        * Return a clone of this transform.
        *
        * @method clone
        * @param [output] {Kiwi.Geom.Transform} A Transform to copy the clone in to. If none is given a new Transform object will be made.
        * @return {Kiwi.Geom.Transform} A clone of this object.
        * @public
        */
        clone(output?: Transform): Transform;
        /**
        * Recursively check that a transform does not appear as its own ancestor
        * @method checkAncestor
        * @param transform {Kiwi.Geom.Transform} The Transform to check.
        * @return {boolean} Returns true if the given transform is the same as this or an ancestor, otherwise false.
        * @public
        */
        checkAncestor(transform: Transform): boolean;
        /**
        * Return a string represention of this object.
        * @method toString
        * @return {String} A string represention of this object.
        * @public
        */
        toString: string;
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
    * @param [x=0] {Number} The x component of the vector.
    * @param [y=0] {Number} The y component of the vector.
    * @return {Kiwi.Geom.Vector2}
    */
    class Vector2 {
        constructor(x?: number, y?: number);
        /**
        * The type of this object.
        * @method objType
        * @return {String} "Vector2"
        * @public
        */
        objType(): string;
        /**
        * The x component of this Vector2.
        * @property x
        * @type Number
        * @public
        */
        x: number;
        /**
        * The y component of this Vector2.
        * @property y
        * @type Number
        * @public
        */
        y: number;
        /**
        * Generate a Vector2 from an angle
        * @method fromAngle
        * @param angle {Number} The angle to generate the Vector2 from.
        * @return {Kiwi.Geom.Vector2} A new Vector2
        * @static
        * @public
        */
        static fromAngle(angle: number): Vector2;
        /**
        * Generate a random Vector2 within a given radius.
        * @method randomRadius
        * @param radius {Number} The size of the radius to use.
        * @return {Kiwi.Geom.Vector2} A new Vector2
        * @static
        * @public
        */
        static randomRadius(radius: number): Vector2;
        /**
        * Generate a Vector2 from a point.
        * @method fromPoint
        * @param point {Kiwi.Geom.Point} point.
        * @return {Kiwi.Geom.Vector2} A new Vector2
        * @static
        * @public
        */
        static fromPoint(point: Point): Vector2;
        /**
        * Add each component of another Vector2 to this vectors components.
        * @method add
        * @param {Kiwi.Geom.Vector2} Vector2 to add
        * @return {Kiwi.Geom.Vector2} A new Vector2 containing the product
        * @public
        */
        add(vector2: Vector2): Vector2;
        /**
        * Add only the x component of another Vector2 to this vector.
        * @method addX
        * @param vector2 {Kiwi.Geom.Vector2} Vector2 to add
        * @return {Kiwi.Geom.Vector2} A new Vector2 containing the result
        * @public
        */
        addX(vector2: Vector2): Vector2;
        /**
        * Add only the y component of another Vector2 to this vector.
        * @method addY
        * @param vector2 {Kiwi.Geom.Vector2} Vector2 to add
        * @return {Kiwi.Geom.Vector2} A new Vector2 containing the result
        * @public
        */
        addY(vector2: Vector2): Vector2;
        /**
        * Subtract each component of another Vector2 from this vectors components.
        * @method subtract
        * @param vector2 {Kiwi.Geom.Vector2} Vector2 to subtract
        * @return {Kiwi.Geom.Vector2} A new Vector2 containing the result
        * @public
        */
        subtract(vector2: Vector2): Vector2;
        /**
        * Multiply each component of another Vector2 with this vectors components.
        * @method multiply
        * @param vector2 {Kiwi.Geom.Vector2} Vector2 to multiply
        * @return {Kiwi.Geom.Vector2} A new Vector2 containing the result
        * @public
        */
        multiply(vector2: Vector2): Vector2;
        /**
        * Multiply each component of this vector with a scalar number.
        * @method multiplyScalar
        * @param scalar {Number} Scalar to multiply
        * @return {Kiwi.Geom.Vector2} A new Vector2 containing the result
        * @public
        */
        multiplyScalar(scalar: number): Vector2;
        /**
        * Calculate the dot product if a Vector2 with this Vector2.
        * @method dot
        * @param vector2 {Kiwi.Geom.Vector2} Vector2 to dot with this Vector2.
        * @return {Number} Result of dot product.
        * @public
        */
        dot(vector2: Vector2): number;
        /**
        * Calculate the square length of this Vector2 (Distance from the origin).
        * @method lenSqr
        * @return {Number} The square length.
        * @public
        */
        lenSqr(): number;
        /**
        * Calculate the length of this Vector2 (Distance from the origin).
        * @method len
        * @return {Number} The length.
        * @public
        */
        len(): number;
        /**
        * Calculate a normalised unit Vector2 from this Vector2.
        * @method unit
        * @return {Kiwi.Geom.Vector2} a new Unit Length Vector2.
        * @public
        */
        unit(): Vector2;
        /**
        * Reduce each component of the Vector to the closest lower round value.
        * @method floor
        * @return {Kiwi.Geom.Vector2} a rounded down Vector2.
        * @public
        */
        floor(): Vector2;
        /**
        * Increase each component of the Vector to the closest upper round value.
        * @method ceil
        * @return {Kiwi.Geom.Vector2} a rounded up Vector2.
        * @public
        */
        ceil(): Vector2;
        /**
        * Round each component of the Vector to the closest round value.
        * @method round
        * @return {Kiwi.Geom.Vector2} a rounded Vector2.
        * @public
        */
        round(): Vector2;
        /**
        * Clamp the vector between a maximum and minimum Vector2 range component-wise.
        * @method clamp
        * @param min {Kiwi.Geom.Vector2} Minimum values for Vector2.
        * @param max {Kiwi.Geom.Vector2} Maximum values for Vector2.
        * @return {Kiwi.Geom.Vector2} a clamped Vector2.
        * @public
        */
        clamp(min: Vector2, max: Vector2): Vector2;
        /**
        * Calculate a Vector2 perpendicular to this Vector2.
        * @method perp
        * @return {Kiwi.Geom.Vector2} the perpendicular Vector2.
        * @public
        */
        perp(): Vector2;
        /**
        * Calculate a Vector2 opposite to this Vector2.
        * @method neg
        * @return {Kiwi.Geom.Vector2} the opposite Vector2.
        * @public
        */
        neg(): Vector2;
        /**
        * Check if two Vector2s from equal components.
        * @method equal
        * @param vector2 {Kiwi.Geom.Vector2} vector2. Vector2 to check against.
        * @return {boolean} returns true if equal.
        * @public
        */
        equal(vector2: Vector2): boolean;
        /**
        * Get a Point object with the same components as this Vector2.
        * @method point
        * @return {Kiwi.Geom.Point} A new Point.
        * @public
        */
        point(): Point;
        /**
        * Set both components to zero.
        * @method clear
        * @return {Kiwi.Geom.Vector2} This object.
        * @public
        */
        clear(): Vector2;
        /**
        * Get a clone of this Vector2.
        * @method clone
        * @param [output] {Kiwi.Geom.Vector2} Optional. A vector2 that will be cloned to. One will be created if none passed.
        * @return {Kiwi.Geom.Vector2} Either a new cloned Vector2 or the output vector with cloned components.
        * @public
        */
        clone(output?: Vector2): Vector2;
        /**
        * Copy components from another Vector2.
        * @method copyFrom
        * @param source {Kiwi.Geom.Vector2} A Vector2 to copy from.
        * @return {Kiwi.Geom.Vector2} This object.
        * @public
        */
        copyFrom(source: Vector2): Vector2;
        /**
        * Copy components to another Vector2.
        * @method copyTo
        * @param target {Kiwi.Geom.Vector2} A Vector2 to copy to.
        * @return {Kiwi.Geom.Vector2} The supplied Vector2.
        * @public
        */
        copyTo(target: Vector2): Vector2;
        /**
        * Set components on this Vector2.
        * @method setTo
        * @param x {Number} x component to set.
        * @param y {Number} y component to set.
        * @return {Kiwi.Geom.Vector2} This object.
        * @public
        */
        setTo(x: number, y: number): Vector2;
        /**
        * Get a string representation of this object.
        * @method toString
        * @return {String} This object as a string.
        */
        toString(): string;
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
    * @param game {Kiwi.Game} The game that this HUD Display belongs to.
    * @param name {string} The name of this display.
    * @return HUDDisplay
    */
    class HUDDisplay {
        constructor(game: Kiwi.Game, name: string);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String} "HUDDisplay"
        * @public
        */
        objType(): string;
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
        * @type Kiwi.HUD.HUDManager
        * @private
        */
        private _manager;
        /**
        * Holds the container HTMLDivElement.
        * @property container
        * @type HTMLDivElement
        * @public
        */
        container: HTMLDivElement;
        /**
        * The name of this HUD Display.
        * @property name
        * @type String
        * @public
        */
        name: string;
        /**
        * The game that this HUD Display is on.
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * Contains a list of the widgets that are contained in this HUDDisplay. Each member is of the type Kiwi.HUD.HUDWidget.
        * @property _widgets
        * @type Array
        * @private
        */
        private _widgets;
        /**
        * Adds a widget to the HUDDisplay. Returns a boolean as an indication of whether or not it was successful.
        *
        * @method addWidget
        * @param widget {Kiwi.HUD.HUDWidget}  The widget to be added to the Display
        * @return {Boolean} If it was successful or not.
        * @public
        */
        addWidget(widget: Kiwi.HUD.HUDWidget): boolean;
        /**
        * Removes a singular widget from the display. Returns a boolean as an indication of if anything happened or not.
        *
        * @method removeWidget
        * @param widget {Kiwi.HUD.HUDWidget} The widget to be removed.
        * @return {boolean} If it was successful or not.
        * @public
        */
        removeWidget(widget: Kiwi.HUD.HUDWidget): boolean;
        /**
        * Removes all of the widgets on this display.
        * @method removeAllWidgets
        * @public
        */
        removeAllWidgets(): void;
        /**
        * Removes a widget from on the HUDDisplay.
        * @method removeFromContainer
        * @param widget {Kiwi.HUD.HUDWidget} The Widget to be removed.
        * @returns {boolean}
        */
        private removeFromContainer(widget);
        /**
        * Update loop.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Shows displays the HUD Display on screen.
        * @method show
        * @public
        */
        show(): void;
        /**
        * Hides the current HUD Display from the screen.
        * @method hide
        * @public
        */
        hide(): void;
        /**
        * The class name that the container element that this HUDWidget current has.
        * @property class
        * @type {String}
        * @public
        */
        class: string;
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
    * @param game {Kiwi.Game} game
    * @return {Kiwi.HUD.HUDManager}
    */
    class HUDManager {
        constructor(game: Kiwi.Game);
        /**
        * The game that this HUDManager belongs to.
        * @property _game
        * @type Kiwi.Game
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
        supported: boolean;
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
        boot(): void;
        /**
        * Returns the type of object this is.
        * @method objType
        * @return {String} "HUDManager"
        * @public
        */
        objType(): string;
        /**
        * An array containing all of the HUDDisplays that are currently active on this HUDManager.
        * @property _huds
        * @type Array
        * @private
        */
        private _huds;
        /**
        * The defaultHUD that is being used.
        * The defaultHUD cannot be removed, but can be swapped out for another HUDDisplay.
        * @property _defaultHUD
        * @type Kiwi.HUD.HUDDisplay
        * @private
        */
        private _defaultHUD;
        /**
        * The currentHUD that is in use. Can be the same as the defaultHUD.
        * @property _currentHUD
        * @type Kiwi.HUD.HUDDisplay
        * @private
        */
        private _currentHUD;
        /**
        * The default HUDDisplay that is to be used.
        * The defaultHUD cannot be removed, and a game (that supports HUDS) will always contain the defaultHUD.
        *
        * @property defaultHUD
        * @type Kiwi.HUD.HUDDisplay
        * @public
        */
        defaultHUD: Kiwi.HUD.HUDDisplay;
        /**
        * Changes the currentHUD that is being displayed to one that is passed.
        * @method setHUD
        * @param hud {Kiwi.HUD.HUDDisplay} The HUD you want to display.
        * @public
        */
        setHUD(hud: Kiwi.HUD.HUDDisplay): void;
        /**
        * Shows the currentHUD (if nothing is passed) or shows a HUDDisplay that is passed.
        * @method showHUD
        * @param [hud=currentHUD] {Kiwi.HUD.HUDDisplay} The HUDDisplay you want to show. Defaults to the currentHUD if nothing is passed.
        * @public
        */
        showHUD(hud?: Kiwi.HUD.HUDDisplay): void;
        /**
        * Hides the currentHUD (if nothing is passed) or shows a HUDDisplay that is passed.
        * @method hideHUD
        * @param [hud=currentHUD] {Kiwi.HUD.HUDDisplay} The HUDDisplay you want to hude. Defaults to the currentHUD if nothing is passed.
        * @public
        */
        hideHUD(hud?: Kiwi.HUD.HUDDisplay): void;
        /**
        * Creates a new HUDDisplay on this HUDManager.
        *
        * @method createHUD
        * @param name {string} Name of the new HUDDisplay that is being creates.
        * @param [switchTo=false] {boolean} Switch to the new HUD that was created. DE
        * @return {Kiwi.HUD.HUDDisplay} The HUDDisplay that was created.
        * @public
        */
        createHUD(name: string, switchTo?: boolean): Kiwi.HUD.HUDDisplay;
        /**
        * Removes a HUDDisplay off this manager. Returns a boolean indicating whether or not this method was a success.
        *
        * @method removeHUD
        * @param hud {Kiwi.HUD.HUDDisplay} The hud you want to remove.
        * @returns {boolean} If this method succeeded or not.
        * @public
        */
        removeHUD(hud: Kiwi.HUD.HUDDisplay): boolean;
        /**
        * Adds a HUDDisplays HTMLDivElement to this HUDManagers container element.
        * @method addToContainer
        * @param hud {Kiwi.HUD.HUDDisplay} The HUDDisplay that is to be added.
        * @private
        */
        private addToContainer(hud);
        /**
        * Removes the hud that is passed from this HUD Manager. Checks to see if that hud has this container as a parent first.
        * @method removeFromContainer
        * @param hud {Kiwi.HUD.HUDDisplay} The hud to be removed
        * @private
        */
        private removeFromContainer(hud);
        /**
        * Game loop
        * @method update
        * @public
        */
        update(): void;
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
    * @param game {Kiwi.Game}  The game that this HUDWidget belongs to.
    * @param name {string} Name of the type of HUDWidget.
    * @param x {number} The coordinates of this HUDWidget on the x-axis.
    * @param y {number} The coordinates of this HUDWidget on the y-axis.
    * @return {Kiwi.HUD.HUDWidget}
    */
    class HUDWidget {
        constructor(game: Kiwi.Game, name: string, x: number, y: number);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String} "HUDWidget"
        * @public
        */
        objType(): string;
        /**
        * The HUDManager that this widget 'belongs' to.
        * This is mainly indented for INTERNAL Kiwi use only and is public so that sub classes can have a reference to it.
        * @property _manager
        * @type Kiwi.HUD.HUDManager
        * @protected
        */
        _manager: Kiwi.HUD.HUDManager;
        /**
        * The type of device that this game is being targeted at. Same as the deviceTargetOption on the game class.
        * Used to detirmine how the HUD is to be managed behind the scenes.
        * This is mainly indented for INTERNAL Kiwi use only and is public so that sub classes can have a reference to it.
        * @property _device
        * @type _device
        * @protected
        */
        _device: number;
        /**
        * The game that this HUDWidget belongs to.
        * @property game
        * @type Kiwi.Game
        * @public
        */
        game: Kiwi.Game;
        /**
        * A quick way to reference the style object that exists on the container element of this widget.
        * @property style
        * @type any
        * @public
        */
        style: any;
        /**
        * Called when the coordinates of the HUD Widget updates.
        * @property onCoordsUpdate
        * @type Kiwi.Signal
        * @public
        */
        onCoordsUpdate: Kiwi.Signal;
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
        x: number;
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
        y: number;
        /**
        * The list of components that the HUDWidget use's.
        * @property components
        * @type Kiwi.ComponentManager
        * @public
        */
        components: Kiwi.ComponentManager;
        /**
        * The HTMLDivElement that this widget is using.
        * @property
        * @type HTMLDivElement
        * @public
        */
        container: HTMLDivElement;
        /**
        * The name of the widget which is used to identify the type of widget.
        * @property
        * @type string
        * @public
        */
        name: string;
        /**
        * When a template has been set, this property will have a reference to the HTMLElement we can place the HUDWidget information into.
        * Currently doesn't have that great support.
        * @property tempElement
        * @type HTMLElement
        * @public
        */
        tempElement: HTMLElement;
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
        setTemplate(main: string, element?: string, ...paramsArr: any[]): void;
        /**
        * Used to remove any the template HTML from this HUDWidget.
        * Currently doesn't have that great support.
        *
        * @method removeTemplate
        * @public
        */
        removeTemplate(): void;
        /**
        * The class name/s that the container element that this HUDWidget current has.
        * @property class
        * @type {String}
        * @public
        */
        class: string;
        /**
        * The game update loop.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Contains the current CSS style that will used for the x position.
        * Should either be `LEFT` or `RIGHT` but these values are not checked upon assignment.
        *
        * @property _horizontalOrigin
        * @type string
        * @default 'left'
        * @since 1.3.0
        * @protected
        */
        protected _horizontalOrigin: string;
        /**
        * Contains the current CSS style that will used for the x position.
        * Should either be `LEFT` or `RIGHT` but these values are not checked upon assignment.
        *
        * @property horizontalOrigin
        * @type string
        * @default 'left'
        * @since 1.3.0
        * @public
        */
        horizontalOrigin: string;
        /**
        * Contains the current CSS style that will used for the y position.
        * Should either be `TOP` or `BOTTOM` but these values are not checked upon assignment.
        *
        * @property _verticalOrigin
        * @type string
        * @default 'top'
        * @since 1.3.0
        * @protected
        */
        protected _verticalOrigin: string;
        /**
        * Contains the current CSS style that will used for the y position.
        * Should either be `TOP` or `BOTTOM` but these values are not checked upon assignment.
        *
        * @property vertical
        * @type string
        * @default 'top'
        * @since 1.3.0
        * @public
        */
        verticalOrigin: string;
        /**
        * Contains the CSS style used to position a HUD element from the top corner.
        *
        * @property TOP
        * @type string
        * @default 'top'
        * @since 1.3.0
        * @static
        * @readOnly
        * @final
        * @public
        */
        static TOP: string;
        /**
        * Contains the CSS style used to position a HUD element from the bottom corner.
        *
        * @property BOTTOM
        * @type string
        * @default 'bottom'
        * @since 1.3.0
        * @static
        * @readOnly
        * @final
        * @public
        */
        static BOTTOM: string;
        /**
        * Contains the CSS style used to position a HUD element from the left corner.
        *
        * @property LEFT
        * @type string
        * @default 'left'
        * @since 1.3.0
        * @static
        * @readOnly
        * @final
        * @public
        */
        static LEFT: string;
        /**
        * Contains the CSS style used to position a HUD element from the right corner.
        *
        * @property RIGHT
        * @type string
        * @default 'right'
        * @since 1.3.0
        * @static
        * @readOnly
        * @final
        * @public
        */
        static RIGHT: string;
        /**
        *
        * @method destroy
        * @public
        */
        destroy(): void;
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
    * @extends Kiwi.HUD.HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Kiwi.Game} The game that this textfield belongs to.
    * @param text {string} The text on this textfield.
    * @param x {number} The x coordinates
    * @param y {number} The y coordinates
    * @return {Kiwi.HUD.Widget.TextField}
    */
    class TextField extends Kiwi.HUD.HUDWidget {
        constructor(game: Kiwi.Game, text: string, x: number, y: number);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String} 'TextFieldWidget'
        * @public
        */
        objType(): string;
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
        setTemplate(main: string, field?: string): void;
        /**
        * Used to remove any the template HTML from this HUDWidget.
        * Currently doesn't have great support.
        *
        * @method removeTemplate
        * @public
        */
        removeTemplate(): void;
        /**
        * The text that is currently being displayed inside the textfield.
        * @property text
        * @type string
        * @public
        */
        text: string;
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
        suffix: string;
        /**
        * A string that is to be added in-front of the score. Can contain HTMLElements.
        * @property _prefix
        * @type string
        * @default ''
        * @public
        */
        prefix: string;
        /**
        * This method is intended to be overriden by subclasses which functions update the text being displayed.
        * @method _updateText
        * @protected
        */
        _updateText(): void;
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
    * @extends Kiwi.HUD.HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Kiwi.Game} The game that this bar belongs to.
    * @param current {Number} The current value of the bar.
    * @param max {Number} The maximum value that there can be.
    * @param x {Number} The coordinates of this widget on the x-axis.
    * @param y {Number} The cooridnates of this widget on the y-axis.
    * @param [width=120] {number} The width of the widget. Defaults to 120.
    * @param [height=20] {number} The height of the widget. Defaults to 20.
    * @param [color='#000'] {string} The default color of the inner bar. Defaults to #000 (black).
    * @return {Kiwi.HUD.Widget.Bar}
    */
    class Bar extends Kiwi.HUD.HUDWidget {
        constructor(game: Kiwi.Game, current: number, max: number, x: number, y: number, width?: number, height?: number, color?: string);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String} "BarWidget"
        * @public
        */
        objType(): string;
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
        width: number;
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
        height: number;
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
        bar: HTMLElement;
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
        * @type Kiwi.HUD.HUDComponents.Counter
        * @public
        */
        counter: Kiwi.HUD.HUDComponents.Counter;
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property horizontal
        * @type boolean
        * @public
        */
        horizontal: boolean;
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property verticle
        * @type boolean
        * @public
        */
        vertical: boolean;
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
        setTemplate(main: string, innerbar?: string): void;
        /**
        * Used to remove any the template HTML from this HUDWidget.
        * Current not supported.
        *
        * @method removeTemplate
        * @public
        */
        removeTemplate(): void;
        /**
        * Will be called when the range has been updated and thus you will want to preform the render of the bar here.
        * This should be overriden by subclasses so that you have your own custom bars.
        * @method updateCSS
        * @public
        */
        updateCSS(): void;
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
    * @extends Kiwi.HUD.HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Kiwi.Game} The game that this icon belongs to.
    * @param atlas {Kiwi.Textures.TextureAtlas} The image that you would like displayed.
    * @param x {Number} The coordinate of the icon on the x-axis.
    * @param y {Number} The coordinate of the icon on the y-axis.
    * @return {Kiwi.HUD.Widget.Icon}
    */
    class Icon extends Kiwi.HUD.HUDWidget {
        constructor(game: Kiwi.Game, atlas: Kiwi.Textures.TextureAtlas, x: number, y: number);
        /**
        * Holds the texture atlas that is being used
        * @property atlas
        * @type Kiwi.Textures.TextureAtlas
        * @public
        */
        atlas: Kiwi.Textures.TextureAtlas;
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
        cellIndex: number;
        /**
        * Returns the width of the cell that is being used.
        * @property width
        * @type number
        * @public
        */
        width: number;
        /**
        * Returns the height of the cell that is being used.
        * @property height
        * @type number
        * @public
        */
        height: number;
        /**
        * Is a reference to the element that the icon CSS is being applyed to.
        * @property icon
        * @type HTMLElement
        * @public
        */
        icon: HTMLElement;
        /**
        * Removes the CSS from the Icon.
        * This can happen when setting/removing a template and is public to allow for overriding from subclasses.
        * @method _removeCSS
        * @protected
        */
        _removeCSS(): void;
        /**
        * Applys the css to the HTMLElement that is to be affected.
        * @method _applyCSS
        * @protected
        */
        _applyCSS(): void;
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
        setTemplate(main: string, icon?: string): void;
        /**
        * Used to remove any the template HTML from this HUDWidget.
        *
        * @method removeTemplate
        * @public
        */
        removeTemplate(): void;
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
    * @extends Kiwi.HUD.HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Kiwi.Game} The game that this icon bar belongs to.
    * @param atlas {Kiwi.Textures.TextureAtlas} The texture atlas that the icons will have.
    * @param current {number} The current amount of icons in the bar.
    * @param max {number} The maximum number of icons.
    * @param x {number} The x coordinates of the first icon.
    * @param y {number} The y coordinates of the last icon.
    * @return {Kiwi.HUD.Widget.IconBar}
    */
    class IconBar extends Kiwi.HUD.HUDWidget {
        constructor(game: Kiwi.Game, atlas: Kiwi.Textures.TextureAtlas, current: number, max: number, x: number, y: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "IconBarWidget"
        * @public
        */
        objType(): string;
        /**
        * The amount of spacing you want between each icon in the bar. Defaults to 0.
        * @property iconGap
        * @type number
        * @default 0
        * @public
        */
        iconGap: number;
        /**
        * The texture atlas that each Icon inside the IconBar will use.
        * @property atlas
        * @type Kiwi.Textures.TextureAtlas
        * @public
        */
        atlas: Kiwi.Textures.TextureAtlas;
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
        * @type Kiwi.HUD.HUDComponents.Counter
        * @public
        */
        counter: Kiwi.HUD.HUDComponents.Counter;
        /**
        * An array of all of the icons on the screen. Each item in the array is of the type Kiwi.HUD.Widget.Icon
        * @property icons
        * @type Array
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
        * @param icon {Kiwi.HUD.Widget.Icon} The icon that you want to remove.
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
        horizontal: boolean;
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property vertical
        * @type boolean
        * @default false
        * @public
        */
        vertical: boolean;
        /**
        * Contains the current CSS style that will used for the x position.
        * Should either be `LEFT` or `RIGHT` but these values are not checked upon assignment.
        *
        * @property horizontalOrigin
        * @type string
        * @default 'left'
        * @since 1.3.0
        * @public
        */
        horizontalOrigin: string;
        /**
        * Contains the current CSS style that will used for the y position.
        * Should either be `TOP` or `BOTTOM` but these values are not checked upon assignment.
        *
        * @property vertical
        * @type string
        * @default 'top'
        * @since 1.3.0
        * @public
        */
        verticalOrigin: string;
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
    * @extends Kiwi.HUD.TextField
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Kiwi.Game} The game that this BasicScore belongs to.
    * @param x {number} The cooridnates of the game on the x-axis.
    * @param y {number} The cooridnates of the game on the y-axis.
    * @param [initial=0] {number} The initial score to start off at.
    * @return {Kiwi.HUD.Widget.BasicScore}
    */
    class BasicScore extends Kiwi.HUD.Widget.TextField {
        constructor(game: Kiwi.Game, x: number, y: number, initial?: number);
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String} "BasicScoreWidget"
        * @public
        */
        objType(): string;
        /**
        * Holds a reference to the counter component.
        * @property counter
        * @type Kiwi.HUD.HUDComponents.Counter
        * @public
        */
        counter: Kiwi.HUD.HUDComponents.Counter;
        /**
        * Updates the text inside the textfield.
        * @method _updateText
        * @private
        */
        _updateText(): void;
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
    * @extends Kiwi.HUD.TextField
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Kiwi.Game} The game that this belongs to.
    * @param text {string} The text that you want to display inside the button.
    * @param x {number} The x-coordnates of this Widget.
    * @param y {number} The y-coordinates of this Widget.
    * @return {Kiwi.HUD.Widget.Button}
    */
    class Button extends Kiwi.HUD.Widget.TextField {
        constructor(game: Kiwi.Game, text: string, x: number, y: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "ButtonWidget"
        * @public
        */
        objType(): string;
        /**
        * The WidgetInput component that handles the management of events for this button.
        * @property input
        * @type Kiwi.HUD.HUDComponents.WidgetInput
        * @public
        */
        input: Kiwi.HUD.HUDComponents.WidgetInput;
    }
}
/**
*
* @module HUD
* @submodule Widget
*/
declare module Kiwi.HUD.Widget {
    /**
    * A subclass of TextField which manages the displaying of a Time/Timer by creating a new clock on the Time Manager.
    * The time is managed by a Time Component which contains a format property that handles how the time should be formatted.
    *
    * @class Time
    * @extends Kiwi.HUD.Widget.TextField
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Kiwi.Game} The game that this object belongs to.
    * @param format {string} The format that you want the time to be displayed in. Leave it empty to display as normal.
    * @param x {number} The position of this text on the field.
    * @param y {number} The position of this text on the field.
    * @return {Kiwi.HUD.Widget.Time}
    */
    class Time extends Kiwi.HUD.Widget.TextField {
        constructor(game: Kiwi.Game, format: string, x: number, y: number);
        /**
        * Holds the time component which manages the counting/formating of the time.
        *
        * @property time
        * @type Kiwi.HUD.HUDComponents.Time
        * @public
        */
        time: Kiwi.HUD.HUDComponents.Time;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} 'TimeWidget'
        * @public
        */
        objType(): string;
        /**
        * Pauses the clock where is stands. Calls the pause method on the clock.
        * @method pause
        * @public
        */
        pause(): void;
        /**
        * Stops the clock and thus the time. Calls the stop method of the clock.
        * @method stop
        * @public
        */
        stop(): void;
        /**
        * Starts the clock and thus the time.
        * @method start
        * @public
        */
        start(): void;
        /**
        * Resumes the clock and thus the time.
        * @method resume
        * @public
        */
        resume(): void;
        /**
        * The update loop.
        * @method update
        * @public
        */
        update(): void;
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
    * @extends Kiwi.HUD.HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Kiwi.Game} The game that this Menu belongs to.
    * @param x {number} Its position on the x-axis.
    * @param y {number} Its position on the y -axis.
    * @return {Kiwi.HUD.Widget.Menu}
    */
    class Menu extends Kiwi.HUD.HUDWidget {
        constructor(game: Kiwi.Game, x: number, y: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {string} "MenuWidget"
        * @public
        */
        objType(): string;
        /**
        * Contains a list of all of the menu items that are currently on this menu. Each item in the list is of the type Kiwi.HUD.Widget.MenuItem.
        * @property _menuItems
        * @type Array.
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
        setIconStyle(index: string, value: string): void;
        /**
        * An array containing all of the styles that are/will be applyed to each MenuIcon.
        * @property _styles
        * @type Array
        * @private
        */
        private _styles;
        /**
        * Returns a list that contains all of the menu items (buttons) that are currently on this menu.
        * Each item in the list is of the type Kiwi.HUD.Widget.MenuItem.
        * Note: The array itself is READ ONLY but you can modify the objects contained inside of it.
        * @property menuItems
        * @type Array
        * @public
        */
        menuItems: Kiwi.HUD.Widget.MenuItem[];
        /**
        * Creates a new menu item and add's it to this menu.
        * @method createMenuItem
        * @param text {string} The text that you would like the menu item to have.
        * @param x {number} The x position of the menu item you are wanting to add.
        * @param y {number} The y position of the menu item you are wanting to add.
        * @return {Kiwi.HUD.Widget.MenuItem} The newly created MenuItem.
        * @public
        */
        createMenuItem(text: string, x: number, y: number): Kiwi.HUD.Widget.MenuItem;
        /**
        * Adds a MenuItem to this menu.
        * @method addMenuItem
        * @param item {Kiwi.HUD.Widget.MenuItem} The MenuItem that you would like to add to this menu.
        * @return {Kiwi.HUD.Widget.MenuItem}
        * @public
        */
        addMenuItem(item: Kiwi.HUD.Widget.MenuItem): Kiwi.HUD.Widget.MenuItem;
        /**
        * Adds multiple MenuItems to this Menu. Each item in the array you would like to add needs to be of the type Kiwi.HUD.Widget.MenuItem.
        * @method addMenuItems
        * @param items {Array} The array containing all of the menu items you want to add.
        * @public
        */
        addMenuItems(items: Kiwi.HUD.Widget.MenuItem[]): void;
        /**
        * Returns a MenuItem based on its corresponding numeric position that you pass in the array.
        * @method getMenuItem
        * @param val {Number}
        * @return {Kiwi.HUD.Widget.MenuItem}
        * @public
        */
        getMenuItem(val: number): Kiwi.HUD.Widget.MenuItem;
        /**
        * Currently not supported or working.
        * @method setTemplate
        * @param main {string}
        * @param [sub] {string}
        * @public
        */
        setTemplate(main: string, sub?: string): void;
        /**
        * Currently not supported or working.
        * @method removeTemplate
        * @public
        */
        removeTemplate(): void;
        /**
        * The update loop.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Contains the current CSS style that will used for the x position.
        * Should either be `LEFT` or `RIGHT` but these values are not checked upon assignment.
        *
        * @property horizontalOrigin
        * @type string
        * @default 'left'
        * @since 1.3.0
        * @public
        */
        horizontalOrigin: string;
        /**
        * Contains the current CSS style that will used for the y position.
        * Should either be `TOP` or `BOTTOM` but these values are not checked upon assignment.
        *
        * @property vertical
        * @type string
        * @default 'top'
        * @since 1.3.0
        * @public
        */
        verticalOrigin: string;
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
    * @extends Kiwi.HUD.Widget.Button
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Kiwi.Game} The game that this MenuItem belongs to.
    * @param text {string} The text that is to be inside the menuitem.
    * @param x {number} The position of this menu item on the x-axis.
    * @param y {number} The position of this menu item on the y-axis.
    * @return {Kiwi.HUD.Widget.MenuItem}
    */
    class MenuItem extends Kiwi.HUD.Widget.Button {
        constructor(game: Kiwi.Game, text: string, x: number, y: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {string} "MenuItem"
        * @public
        */
        objType(): string;
        /**
        * The Menu that this belongs to.
        * @property menu
        * @type Kiwi.HUD.Widget.Menu
        * @public
        */
        menu: Kiwi.HUD.Widget.Menu;
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
    * @extends Kiwi.Component
    * @namespace Kiwi.HUD.HUDComponents
    * @constructor
    * @param owner {any} The object that this Component belongs to.
    * @param current {number} The current value.
    * @param [max=null] {number} The maximum value it can be. Default is null which means no maximum.
    * @param [min=null] {number} The minimum value that the current can be. Default is null which means no minium.
    * @return {Kiwi.HUD.HUDComponents.Counter}
    */
    class Counter extends Kiwi.Component {
        constructor(owner: any, current: number, max?: number, min?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} 'CounterComponent'
        * @public
        */
        objType(): string;
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
        * @type Kiwi.Signal
        * @public
        */
        updated: Kiwi.Signal;
        /**
        * Set allows setting of the maximum value that the range can be in.
        * Get returns the maximum value.
        *
        * @property max
        * @type number
        * @public
        */
        max: number;
        /**
        * Set allows setting of the minimum value that the range can be in.
        * Get returns the minimum value.
        *
        * @property min
        * @type number
        * @public
        */
        min: number;
        /**
        * Set allows setting of the current value that the range can be in.
        * The current value will only change if it is within the maximum/minimum values.
        * Get returns the current value.
        *
        * @property current
        * @type number
        * @public
        */
        current: number;
        /**
        * Decreases the current value by the amount past.
        * If the new amount would be less than the minimun it goes to the min instead.
        *
        * @method decrease
        * @param [val=1] {number} The amount that you want to decrease the current value by. Default is 1.
        * @return {number}
        * @public
        */
        decrease(val?: number): number;
        /**
        * Increases the current value by the amount past.
        * If the new amount would be greater than the maximum it goes to the max instead.
        *
        * @method increase
        * @param [val=1] {number} The amount that you want to increase the current value by. Default is 1.
        * @return {number}
        * @public
        */
        increase(val?: number): number;
        /**
        * @method currentPercent
        * @return {number}
        * @public
        */
        currentPercent(): number;
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
    * @extends Kiwi.Component
    * @namespace Kiwi.HUD.HUDComponents
    * @constructor
    * @param owner {any} The object that this WidgetInput belongs to.
    * @param container {HTMLElement} The HTMLElement that the events will occur on/to.
    * @return {Kiwi.HUD.HUDComponents.WidgetInput}
    */
    class WidgetInput extends Component {
        constructor(owner: any, container: HTMLElement);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} 'WidgetInputComponent'
        * @public
        */
        objType(): string;
        /**
        * A Signal that dispatches events when the user releases the mouse on top of the HTMLElement.
        * @property onUp
        * @type Kiwi.Signal
        * @public
        */
        onUp: Kiwi.Signal;
        /**
        * A Signal that dispatches events when the user presses the mouse on top of the HTMLElement.
        * @property onDown
        * @type Kiwi.Signal
        * @public
        */
        onDown: Kiwi.Signal;
        /**
        * A Signal that dispatches events when the user's mouse initially goes over the top of the HTMLElement.
        * @property onOver
        * @type Kiwi.Signal
        * @public
        */
        onOver: Kiwi.Signal;
        /**
        * A Signal that dispatches events when the user's mouse leaves the HTMLElement.
        * @property onOut
        * @type Kiwi.Signal
        * @public
        */
        onOut: Kiwi.Signal;
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
        setElement(container: HTMLElement): void;
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
    * The Time Component creates a new clock on the Time Manager and it uses that clock to keep track of the time.
    * When you create a new Time Component you can specify a format that you want the time to display in, which is a string based on keywords.
    * Current supported keywords for the format are:
    *  's' = 'seconds'
    *  'm' = 'minutes'
    *  'ms' = milliseconds'
    *  'ss' = 'seconds with leading zero'
    *  'mm' = 'minutes with leading zero'
    *
    * @class Time
    * @extends Kiwi.Component
    * @namespace Kiwi.HUD.HUDComponents
    * @constructor
    * @param owner {any} The object that this component belongs to.
    * @param [format=''] {string} The format that the time is to be displayed in. Leave blank for the default time.
    * @return {Kiwi.HUD.HUDComponents.Counter}
    */
    class Time extends Kiwi.Component {
        constructor(owner: any, format?: string);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} 'TimeComponent'
        * @public
        */
        objType(): string;
        /**
        * The clock that this component creates and uses to manage the current time.
        * @property clock
        * @type Kiwi.Time.Clock
        * @private
        */
        clock: Kiwi.Time.Clock;
        /**
        * Indicates whether or not the clock is currently running or not, and thus whether or not the time is playing or not.
        * @property isRunning
        * @type boolean
        * @public
        */
        isRunning: boolean;
        /**
        * Pauses the clock where is stands. Calls the pause method on the clock.
        * @method pause
        * @public
        */
        pause(): void;
        /**
        * Stops the clock and thus the time. Calls the stop method of the clock.
        * @method stop
        * @public
        */
        stop(): void;
        /**
        * Starts the clock and thus the time.
        * @method start
        * @public
        */
        start(): void;
        /**
        * Resumes the clock and thus the time.
        * @method resume
        * @public
        */
        resume(): void;
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
        format: string;
        /**
        * If the clock should 'count down' instead of up.
        * @property countDown
        * @type boolean
        * @default false
        * @public
        */
        countDown: boolean;
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
        currentTime: number;
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
        setTime(milli: number, sec?: number, minutes?: number): void;
        /**
        * Increases the current time by the amount passed.
        * @method addTime
        * @param milli {number} The number of milliseconds.
        * @param [sec=0] {number} The number of seconds to add.
        * @param [minutes=0] {number} The number of minutes to add.
        * @public
        */
        addTime(milli: number, sec?: number, minutes?: number): void;
        /**
        * Decreases the current time by the amount passed.
        * @method removeTime
        * @param milli {number} The number of milliseconds.
        * @param [sec=0] {number} The number of seconds to add.
        * @param [minutes=0] {number} The number of minutes to add.
        * @public
        */
        removeTime(milli: number, sec?: number, minutes?: number): void;
        /**
        * The speed at which the time will increase/decrease by.
        * Modify this property to make the time count down slower/faster.
        * @property _speed
        * @type number
        * @default 1
        * @private
        */
        speed: number;
        /**
        * Returns a string with the current time that this component is upto in the format that was passed.
        *
        * @method updateTime
        * @return string
        * @public
        */
        getTime(): string;
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
    * Manages the initialisation of assets necessary when dealing with audio in the game, either through Audio Tags or the Web Audio API.
    * Also provides global sound controls that will be applyed to all Audio objects at the same time, within the Game this manager is a part of.
    *
    * @class AudioManager
    * @constructor
    * @namespace Kiwi.Sound
    * @param game {Kiwi.Game} The game that this audio manager belongs to.
    * @return {Kiwi.Sound.AudioManager}
    */
    class AudioManager {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "AudioManager"
        * @public
        */
        objType(): string;
        /**
        * The game that this manager belongs to.
        * @property _game
        * @type Kiwi.Game
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
        * @type Array
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
        channels: number;
        /**
        * If the current game has audio support or not.
        * Useful because audio support is spotty in mobile browsers.
        * @property noAudio
        * @type boolean
        * @public
        */
        noAudio: boolean;
        /**
        * If the game is currently using the Web Audio API for the sound.
        * @property usingWebAudio
        * @type boolean
        * @public
        */
        usingWebAudio: boolean;
        /**
        * If the game is using audio tags for the sound. This is the fallback if the web audio api is not supported.
        * @property usingAudioTag
        * @type boolean
        * @public
        */
        usingAudioTag: boolean;
        /**
        * Web Audio API ONLY - The audio context that is used for decoding audio, e.t.c.
        * @property context
        * @type any
        * @public
        */
        context: any;
        /**
        * Web Audio API ONLY - The master gain node through which all sounds play.
        * @property masterGain
        * @type any
        * @public
        */
        masterGain: any;
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
        /**
        * Sound buffer
        * @property _unlockedSource
        * @type {any}
        * @private
        */
        private _unlockedSource;
        /**
        * Returns a boolean indicating whether the device has been touched or not. READ ONLY.
        * @property locked
        * @type boolean
        * @public
        */
        locked: boolean;
        /**
        * The boot method is executed when all of the DOM elements needed for the game are loaded and the game is ready to 'start' up.
        *
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * Is executed when a mouse event is fired on the device. This is used to enabled playback of sounds on the current device if they were awaiting for a user event.
        * @method _unlocked
        * @private
        */
        private _unlocked();
        /**
        * Used to mute the audio on the device, or to check to see if the device is muted.
        * This will not stop audio from being played, will just mean that the audio is silent.
        *
        * @property mute
        * @type boolean
        * @default false
        * @public
        */
        mute: boolean;
        /**
        * Global setting and getting of the volume.
        * A number between 0 (silence) and 1 (full volume).
        *
        * @property volume
        * @type number
        * @default 1
        * @public
        */
        volume: number;
        /**
        * Indicates whether or not an Audio Object is registered with this Audio Manager or not. For Kiwi Internal use only.
        * @method isRegistered
        * @param sound {Audio} The Audio object you are checking for.
        * @return {Boolean} If the piece of audio is registered or not.
        * @public
        */
        isRegistered(sound: Kiwi.Sound.Audio): boolean;
        /**
        * Registers an Audio Object with this audio manager. Also assign's the audio piece a unique ID to identify it by. Internal Kiwi use only.
        * @method registerSound
        * @param sound {Audio} The audio piece you are wanting to register.
        * @return { Boolean } Indication of if the sound was successfully added or not.
        * @public
        */
        registerSound(sound: Kiwi.Sound.Audio): boolean;
        /**
        * Used to create a new sound on the audio manager. Returns the newly created sound.
        *
        * @method add
        * @param key {string} The key for the audio file that is to be loaded from the AudioLibrary.
        * @param [volume=1] {number} The volume for the piece of audio.
        * @param [loop=false] {boolean} If the audio should keep repeat when it gets to the end.
        * @return {Kiwi.Sound.Audio}
        * @public
        */
        add(key: string, volume?: number, loop?: boolean): Kiwi.Sound.Audio;
        /**
        * Removes the passed sound from the AudioManager.
        * If you remove a Audio Object from the AudioManager, then that Audio Object will not have a update loop.
        *
        * @method remove
        * @param sound {Kiwi.Sound.Audio} The Audio object that you want to remove.
        * @param [destory=true] If the Audio Object should be removed or not.
        * @public
        */
        remove(sound: Kiwi.Sound.Audio, destroy?: boolean): void;
        /**
        * Plays all of the sounds listed in the AudioManager.
        * @method playAll
        * @public
        */
        playAll(): void;
        /**
        * Stops all of the sounds that are listed in the AudioManager from playing.
        * @method stopAll
        * @public
        */
        stopAll(): void;
        /**
        * Pauses all of the sounds listed in the AudioManager.
        * @method pauseAll
        * @public
        */
        pauseAll(): void;
        /**
        * Resumes all of the sounds listed in the AudioManager.
        * @method resumeAll
        * @public
        */
        resumeAll(): void;
        /**
        * The update loop that is executed every frame.
        * @method update
        * @public
        */
        update(): void;
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
    * The Audio Object contains the functionality for playing a singular sound in a Kiwi Game.
    * The Audio can contain Audio Sprites which is a nice way to play audio on mobile devices.
    * Audio Objects do not 'die' when game states are switched or changed.
    *
    * @class Audio
    * @constructor
    * @namespace Kiwi.Sound
    * @param game {Kiwi.Game} The game that this piece of audio belongs to.
    * @param key {string} The key to which which piece of audio should be loaded from the AudioLibrary.
    * @param volume {number} A number between 0 (silence) and 1 (loud).
    * @param loop {boolean} If the audio should loop when it is finished or just stop.
    * @return {Kiwi.Sound.Audio} This object
    *
    */
    class Audio {
        constructor(game: Kiwi.Game, key: string, volume: number, loop: boolean);
        /**
        * A unique ID that this audio gets assigned by the audio manager it belongs to when it is created.
        * @property id
        * @type number
        * @public
        */
        id: string;
        /**
        * A flag that indicates whether the sound is ready to be played or not.
        * If not then this indicates that we are awaiting a user event.
        * @property _playable
        * @type boolean
        * @private
        */
        private _playable;
        /**
        * Returns whether or not the sound is 'playable' or not.
        * The only time the sound would be not 'playable' is on iOS devices when a mouse/touch event has not fired.
        * Devs should treat this property as READ ONLY.
        * @property playable
        * @type boolean
        * @private
        */
        playable: boolean;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "Audio"
        * @public
        */
        objType(): string;
        /**
        * The game that this sound belongs to.
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * Web Audio API ONLY - A reference to the audio context that the game's audio manager has.
        * @property context
        * @type Any
        * @public
        */
        context: any;
        /**
        * Web Audio API ONLY - A reference to the master gain node on the audio manager.
        * @property masterGainNode
        * @type Any
        * @public
        */
        masterGainNode: any;
        /**
        * Web Audio API ONLY - This sounds local gainNode that it uses.
        * @property gainNode
        * @type Any
        * @public
        */
        gainNode: any;
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
        * READ ONLY: Returns a boolean indicating if the current audio marker playing is/will loop.
        * @property loop
        * @readOnly
        * @type Boolean
        * @public
        */
        loop: boolean;
        /**
        * The key that was used to get the audio from the AudioLibrary.
        * @property key
        * @type string
        * @public
        */
        key: string;
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
        ready: boolean;
        /**
        * The total duration of the audio in seconds.
        * @property totalDuration
        * @type number
        * @public
        */
        totalDuration: number;
        /**
        * The current duration of the section of audio that is being played. In milliseconds.
        * @property duration
        * @type number
        * @public
        */
        duration: number;
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
        isPlaying: boolean;
        /**
        * A indicator of if the sound is currently paused.
        * @property paused
        * @type boolean
        * @default false
        * @public
        */
        paused: boolean;
        /**
        * If the sound needs to be played but we are waiting on particular condition.
        * In the case of CocoonJS, we generally are waiting for the audio 'length' property to have a value.
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
        * @private
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
        * @type Kiwi.Signal
        * @public
        */
        onPlay: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio stops playing.
        * @property onStop
        * @type Kiwi.Signal
        * @public
        */
        onStop: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio gets paused.
        * @property onPause
        * @type Kiwi.Signal
        * @public
        */
        onPause: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio resumes.
        * @property onResume
        * @type Kiwi.Signal
        * @public
        */
        onResume: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio finishes and starts again, due to it looping.
        * @property onLoop
        * @type Kiwi.Signal
        * @public
        */
        onLoop: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio gets muted.
        * @property onMute
        * @type Kiwi.Signal
        * @public
        */
        onMute: Kiwi.Signal;
        /**
        * A Kiwi Signal that dispatches a event when the audio completes
        * and does not loop.
        * @property onComplete
        * @type Kiwi.Signal
        * @public
        */
        onComplete: Kiwi.Signal;
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
        * Used to control the current volume for this sound. 0 is silent, 1 is full volume.
        *
        * @property volume
        * @type number
        * @public
        */
        volume: number;
        /**
        * Mutes the sound and makes it 'silent'.
        * This will not stop the sound from playing, or events from being dispatched due when the sound has finished/is looping.
        *
        * @property mute
        * @type boolean
        * @public
        */
        mute: boolean;
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
        addMarker(name: string, start: number, stop: number, loop?: boolean): void;
        /**
        * Removes a currently existing marker from this audio.
        *
        * @method removeMarker
        * @param name {String} name of the audio that you want to remove.
        * @public
        */
        removeMarker(name: string): void;
        /**
        * Plays the current sound/audio from the start.
        *
        * @method play
        * @param [marker] {string} The marker that is to be played. If no marker is specified then it will play the current marker (which would be the whole audio piece if no marker was ever added).
        * @param [forceRestart=false] {boolean} Force the audio to stop and start again. Otherwise if the audio was already playing it would ignore the play.
        * @public
        */
        play(marker?: string, forceRestart?: boolean): void;
        /**
        * Stop the sound from playing.
        * @method stop
        * @public
        */
        stop(): void;
        /**
        * Pauses the sound so that you can resume it from at point to paused it at.
        * @method pause
        * @public
        */
        pause(): void;
        /**
        * Plays the sound from when you paused the sound.
        * @method resume
        * @public
        */
        resume(): void;
        /**
        * The update loop that gets executed every frame.
        * @method update
        * @public
        */
        update(): void;
        /**
        * This method handles the destruction of all of the properties when this audio is not longer needed.
        * You call this method when you want this method to be removed on the next garbage collection cycle.
        *
        * @method destroy
        * @public
        */
        destroy(): void;
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
    * @param game {Kiwi.Game} The game that this audio library is a member of.
    * @return {Kiwi.Sound.AudioLibrary}
    */
    class AudioLibrary {
        constructor(game: Kiwi.Game);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "AudioLibrary"
        * @public
        */
        objType(): string;
        /**
        * The game that the AudioLibrary belongs to.
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * Contains all of the audio files that are available.
        * @property audio
        * @type Object
        * @public
        */
        audio: any;
        /**
        * Resets the audio library.
        * @method clear
        * @public
        */
        clear(): void;
        /**
        * Rebuild the library from a fileStore. Clears the library and repopulates it.
        * @method rebuild
        * @param {Kiwi.Files.FileStore} fileStore
        * @param {Kiwi.State} state
        * @public
        */
        rebuild(fileStore: Kiwi.Files.FileStore, state: Kiwi.State): void;
        /**
        * Adds a new audio file to the audio library.
        * @method add
        * @param {Kiwi.Files.File} audioFile
        * @public
        */
        add(audioFile: Kiwi.Files.File): void;
    }
}
/**
* @module Kiwi
* @submodule Time
*/
declare module Kiwi.Time {
    /**
    * The Clock class offers a way of tracking time within a game.
    * When creating a new Clock you should NOT directly instantiate this class
    * but instead use the addClock method on a ClockManager.
    * - The MasterClock is a property of the Kiwi.Time.Manager class and tracks
    *   real world time in milliseconds elapsed since the application started.
    *   This happens automatically and there is no need to do anything to set
    *   this up.
    * - An instance of a clock is used to track time in arbitrary units
    *   (milliseconds by default)
    * - A clock can be started, paused, unpaused and stopped. Once stopped,
    *   re-starting the clock again will reset it. It can also have its time
    *   scale freely transformed.
    * - Any number of timers can be attached to a clock. See the Kiwi.Time.Timer
    *   class for timer details.
    * - If the clock is paused, any timers attached to the clock will take this
    *   into account and not continue to fire events until the clock is
    *   unpaused. (Note that this is not the same as pausing timers, which can
    *   be done manually and needs to be undone manually.)
    * - Animations and TweenManagers can use any Clock.
    *
    * @class Clock
    * @namespace Kiwi.Time
    * @constructor
    * @param manager {ClockManager} ClockManager that this clock belongs to
    * @param master {Kiwi.Time.MasterClock} MasterClock that this is getting
    *	the time in relation to
    * @param name {String} Name of the clock
    * @param [units=1000] {Number} Units that this clock is to operate in
    *	per second
    * @return {Kiwi.Time.Clock} This Clock object
    */
    class Clock {
        constructor(manager: Kiwi.Time.ClockManager, master: Kiwi.Time.MasterClock, name: string, units?: number);
        /**
        * The type of object that this is
        * @method objType
        * @return {String} "Clock"
        * @public
        */
        objType(): string;
        /**
        * Collection of Timer objects using this clock
        * @property timers
        * @type Timer[]
        * @private
        */
        private timers;
        /**
        * Time the clock was first started relative to the master clock
        * @property _timeFirstStarted
        * @type Number
        * @default null
        * @private
        */
        private _timeFirstStarted;
        /**
        * Number of clock units elapsed since the clock was first started
        * @method elapsedSinceFirstStarted
        * @return {Number} Number of clock units elapsed
        * @public
        */
        elapsedSinceFirstStarted(): number;
        /**
        * Most recent time the clock was started relative to the master clock
        * @property _timeLastStarted
        * @type Number
        * @default null
        * @private
        */
        private _timeLastStarted;
        /**
        * Most recent time the clock was started relative to the master clock
        * @method started
        * @return {Number} Milliseconds
        * @public
        */
        started(): number;
        /**
        * Rate at which time passes on this clock.
        * 1 is normal speed. 1.5 is faster. 0 is no speed. -1 is backwards.
        * This mostly affects timers, animations and tweens.
        * @property timeScale
        * @type number
        * @default 1.0
        * @public
        * @since 1.2.0
        */
        timeScale: number;
        /**
        * Clock units elapsed since the clock was most recently started,
        * not including paused time.
        * @property _elapsed
        * @type number
        * @private
        * @since 1.2.0
        */
        private _elapsed;
        /**
        * Master time on last frame
        * @property _lastMasterElapsed
        * @type number
        * @private
        * @since 1.2.0
        */
        private _lastMasterElapsed;
        /**
        * Master time on current frame
        * @property _currentMasterElapsed
        * @type number
        * @private
        * @since 1.2.0
        */
        private _currentMasterElapsed;
        /**
        * Rate of time passage, as modified by time scale and frame rate.
        * Under ideal conditions this should be 1.
        * If the frame rate drops, this will rise. Multiply transformations
        * by rate to get smooth change over time.
        * @property rate
        * @type number
        * @public
        * @since 1.2.0
        */
        rate: number;
        /**
        * Maximum frame duration. If a frame takes longer than this to render,
        * the clock will only advance this far, in effect slowing down time.
        * If this value is 0 or less, it will not be checked and frames can
        * take any amount of time to render.
        * @property _maxFrameDuration
        * @type number
        * @default -1
        * @private
        */
        private _maxFrameDuration;
        /**
        * Maximum frame duration. If a frame takes longer than this to render,
        * the clock will only advance this far, in effect slowing down time.
        * If this value is 0 or less, it will not be checked and frames can
        * take any amount of time to render.
        * @property maxFrameDuration
        * @type number
        * @default -1
        * @public
        */
        maxFrameDuration: number;
        /**
        * Number of clock units elapsed since the clock was most recently
        * started (not including time spent paused)
        * @method elapsed
        * @return {Number} Number of clock units
        * @public
        */
        elapsed(): number;
        /**
        * Time the clock was most recently stopped relative to the
        * master clock.
        * @property _timeLastStopped
        * @type Number
        * @default null
        * @private
        */
        private _timeLastStopped;
        /**
        * Number of clock units elapsed since the clock was most recently
        * stopped.
        * @method elapsedSinceLastStopped
        * @return {Number} Number of clock units
        * @public
        */
        elapsedSinceLastStopped(): number;
        /**
        * Time the clock was most receently paused relative to the
        * master clock.
        * @property _timeLastPaused
        * @private
        * @type Number
        * @default null
        * @private
        */
        private _timeLastPaused;
        /**
        * Number of clock units elapsed since the clock was most recently paused.
        * @method elapsedSinceLastPaused
        * @return {Number} Number of clock units
        * @public
        */
        elapsedSinceLastPaused(): number;
        /**
        * Time the clock was most recently unpaused relative to the
        * master clock.
        * @property _timeLastUnpaused
        * @private
        * @type Number
        * @default null
        * @private
        */
        private _timeLastUnpaused;
        /**
        * Number of clock units elapsed since the clock was most recently
        * unpaused.
        * @method elapsedSinceLastUnpaused
        * @return {Number} Number of clock units
        * @public
        */
        elapsedSinceLastUnpaused(): number;
        /**
        * Total number of milliseconds the clock has been paused
        * since it was last started
        * @property _totalPaused
        * @private
        * @type Number
        * @default 0
        * @private
        */
        private _totalPaused;
        /**
        * Whether the clock is in a running state
        * @property _isRunning
        * @type boolean
        * @default false
        * @private
        */
        private _isRunning;
        /**
        * Check if the clock is currently running
        * @method isRunning
        * @return {boolean} `true` if running
        * @public
        */
        isRunning(): boolean;
        /**
        * Whether the clock is in a stopped state
        * @property _isStopped
        * @type boolean
        * @default true
        * @private
        */
        private _isStopped;
        /**
        * Check if the clock is in the stopped state
        * @method isStopped
        * @return {boolean} `true` if stopped
        * @public
        */
        isStopped(): boolean;
        /**
        * Whether the clock is in a paused state
        * @property _isPaused
        * @type boolean
        * @default false
        * @private
        */
        private _isPaused;
        /**
        * Check if the clock is in the paused state
        * @method isPaused
        * @return {boolean} `true` if paused
        * @public
        */
        isPaused(): boolean;
        /**
        * Internal reference to the state of the elapsed timer
        * @property _elapsedState
        * @type Number
        * @private
        */
        private _elapsedState;
        /**
        * Time manager that this clock belongs to
        * @property manager
        * @type ClockManager
        * @public
        */
        manager: Kiwi.Time.ClockManager;
        /**
        * Master clock from which time is derived
        * @property master
        * @type Kiwi.Time.MasterClock
        * @public
        */
        master: Kiwi.Time.MasterClock;
        /**
        * The time it takes for the time to update. Using this you can calculate the fps.
        * @property delta
        * @type number
        * @since 1.3.0
        * @readOnly
        * @public
        */
        delta: number;
        /**
        * Name of the clock
        * @property name
        * @type string
        * @public
        */
        name: string;
        /**
        * Number of milliseconds counted as one unit of time by the clock
        * @property units
        * @type Number
        * @default 0
        * @public
        */
        units: number;
        /**
        * Constant indicating that the Clock is running
        * (and has not yet been paused and resumed)
        * @property _RUNNING
        * @static
        * @type number
        * @default 0
        * @private
        */
        private static _RUNNING;
        /**
        * Constant indicating that the Clock is paused
        * @property _PAUSED
        * @static
        * @type number
        * @default 1
        * @private
        */
        private static _PAUSED;
        /**
        * Constant indicating that the Clock is running
        * (and has been paused then resumed)
        * @property _RESUMED
        * @static
        * @type number
        * @default 2
        * @private
        */
        private static _RESUMED;
        /**
        * Constant indicating that the Clock is stopped
        * @property _STOPPED
        * @static
        * @type number
        * @default 3
        * @private
        */
        private static _STOPPED;
        /**
        * Add an existing Timer to the Clock.
        * @method addTimer
        * @param timer {Timer} Timer object instance to be added to this Clock
        * @return {Kiwi.Time.Clock} This Clock object
        * @public
        */
        addTimer(timer: Timer): Clock;
        /**
        * Create a new Timer and add it to this Clock.
        * @method createTimer
        * @param name {string} Name of the Timer (must be unique on this Clock)
        * @param [delay=1] {Number} Number of clock units to wait between
        *	firing events
        * @param [repeatCount=0] {Number} Number of times to repeat the Timer
        *	(default 0)
        * @param [start=true] {Boolean} If the timer should start
        * @return {Kiwi.Time.Timer} The newly created Timer
        * @public
        */
        createTimer(name: string, delay?: number, repeatCount?: number, start?: boolean): Timer;
        /**
        * Remove a Timer from this Clock based on either the Timer object
        * or its name.
        * @method removeTimer
        * @param [timer=null] {Timer} Timer object you wish to remove.
        *	If you wish to delete by Timer Name set this to null.
        * @param [timerName=''] {string} Name of the Timer object to remove
        * @return {boolean} `true` if the Timer was successfully removed
        * @public
        */
        removeTimer(timer?: Timer, timerName?: string): boolean;
        /**
        * Check if the Timer already exists on this Clock.
        * @method checkExists
        * @param name {string} Name of the Timer
        * @return {boolean} `true` if the Timer exists
        * @public
        */
        checkExists(name: string): boolean;
        /**
        * Stop all timers attached to the clock.
        * @method stopAllTimers
        * @return {Clock} This Clock object
        * @public
        */
        stopAllTimers(): Clock;
        /**
        * Convert a number to milliseconds based on clock units.
        * @method toMilliseconds
        * @param time {number} Seconds
        * @return {Number} Milliseconds
        * @public
        */
        convertToMilliseconds(time: number): number;
        /**
        * Update all Timers linked to this Clock.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Start the clock. This resets the clock and starts it running.
        * @method start
        * @return {Clock} This Clock object
        * @public
        */
        start(): Clock;
        /**
        * Pause the clock. This can only be paused if it is already running.
        * @method pause
        * @return {Kiwi.Time.Clock} This Clock object
        * @public
        */
        pause(): Clock;
        /**
        * Resume the clock. This can only be resumed if it is already paused.
        * @method resume
        * @return {Kiwi.Time.Clock} This Clock object
        * @public
        */
        resume(): Clock;
        /**
        * Stop the clock. This can only be stopped if it is already running
        *	or is paused.
        * @method stop
        * @return {Kiwi.Time.Clock} This Clock object
        * @public
        */
        stop(): Clock;
        /**
        * Return a string representation of this object.
        * @method toString
        * @return {string} String representation of the instance
        * @public
        */
        toString(): string;
        /**
        * Set a function to execute after a certain time interval.
        * Emulates `window.setTimeout`, except attached to a `Kiwi.Time.Clock`.
        * This allows you to pause and manipulate time, and the timeout will
        * respect the clock on which it is created.
        *
        * No `clearTimeout` is provided; you should use `Kiwi.Time.Timer`
        * functions to achieve further control.
        *
        * Any parameters after `context` will be passed as parameters to the
        * callback function. Note that you must specify `context` in order for
        * this to work. You may specify `null`, in which case it will default
        * to the global scope `window`.
        *
        * @method setTimeout
        * @param callback {function} Function to execute
        * @param timeout {number} Milliseconds before execution
        * @param [context] {object} Object to be `this` for the callback
        * @return {Kiwi.Time.Timer} Kiwi.Time.Timer object which can be used
        *	to further manipulate the timer
        * @public
        */
        setTimeout(callback: any, timeout: number, context: any, ...args: any[]): Timer;
        /**
        * Set a function to repeatedly execute at fixed time intervals.
        * Emulates `window.setInterval`, except attached to a `Kiwi.Time.Clock`.
        * This allows you to pause and manipulate time, and the timeout will
        * respect the clock on which it is created.
        *
        * No `clearInterval` is provided; you should use `Kiwi.Time.Timer`
        * functions to achieve further control.
        *
        * Any parameters after `context` will be passed as parameters to the
        * callback function. Note that you must specify `context` in order for
        * this to work. You may specify `null`, in which case it will default
        * to the global scope `window`.
        *
        * @method setInterval
        * @param callback {function} Function to execute
        * @param timeout {number} Milliseconds between executions
        * @param [context=window] {object} Object to be `this` for the callback
        * @return {Kiwi.Time.Timer} Kiwi.Time.Timer object
        *   which can be used to further manipulate the timer
        * @public
        */
        setInterval(callback: any, timeout: number, context: any, ...args: any[]): Timer;
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
    * Handles the generation and tracking of `Clock` and time related
    * applications for a single game.
    *
    * An instance of `ClockManager` is automatically created as part of
    * `Kiwi.Game`. This is accessible as the `time` property of any `Game`
    * object. You should not need to create additional `ClockManager` objects.
    *
    * If you do want to create additional `ClockManager` objects, be sure to
    * call `boot()` after creation to set up properties like the master clock.
    * You will also need to update this manager every frame.
    *
    * @class ClockManager
    * @namespace Kiwi.Time
    * @constructor
    * @param {Kiwi.Game} game.
    * @return {Kiwi.Time.ClockManager} This Object.
    *
    */
    class ClockManager {
        constructor(game: Kiwi.Game);
        /**
        * The type of object this is.
        * @method objType
        * @return {String} "ClockManager"
        * @public
        */
        objType(): string;
        /**
        * The game that this belongs to.
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game;
        /**
        * An array containing all of the clocks that exist on this manager.
        * @property _clocks
        * @type Array
        * @private
        */
        private _clocks;
        /**
        * Frame rate factor, derived from master clock
        * @property rate
        * @type Number
        * @public
        * @since 1.1.10
        */
        rate: number;
        /**
        * The MasterClock for this manager.
        * @property master
        * @type Kiwi.Time.MasterClock
        * @private
        */
        private master;
        /**
        * The default Game Clock - you can use this via this.game.time.clock. Uses a 1000 millisecond time unit.
        * @property clock
        * @type Kiwi.Time.Clock
        * @public
        */
        clock: Kiwi.Time.Clock;
        /**
        * When all of the DOM elements that the game requires have loaded successfully then this object will 'boot'.
        * @method boot
        * @public
        */
        boot(): void;
        /**
        * Creates a Clock class for keeping time relative to the MasterClock.
        * @method addClock
        * @param name {string} The name of the Clock.
        * @param [units=1000] {Number} The number of milliseconds that make up one unit of time on this clock. Default 1000.
        * @return {Kiwi.Time.Clock} A reference to the newly created Clock object.
        * @public
        */
        addClock(name: string, units?: number): Clock;
        /**
        * Returns the Clock with the matching name.
        * Throws an error if no Clock with that name exists
        * @method getClock
        * @param name {string} The name of the Clock to be returned.
        * @return {Kiwi.Time.Clock} The clock which matches the name given.
        * @public
        */
        getClock(name: string): Clock;
        /**
        * Is executed every frame and updates all of the clocks that exist on this manager.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Returns the current time. Based on the master clock.
        * @method now
        * @return {Number}
        * @public
        */
        now(): number;
        /**
        * Returns the elapsed time. Based on the master clock.
        * @method elapsed
        * @return {Number}
        * @public
        * @since 1.1.0
        */
        elapsed(): number;
        /**
        * Returns the delta of the master clock.
        * @method delta
        * @return {Number}
        * @public
        */
        delta(): number;
        /**
        * Sets the interval on the master clock.
        * @method setMasterInterval
        * @param interval {Number} The ideal frame interval in milliseconds.
        * @public
        * @since 1.1.0
        */
        setMasterInterval(interval: number): void;
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
    * @return {Kiwi.Time.MasterClock} This Object.
    *
    */
    class MasterClock {
        constructor();
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "MasterClock"
        * @public
        */
        objType(): string;
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
        time: number;
        /**
        * The current time, this is straight from the Date.now() method and is updated every frame BEFORE the delta.
        * @property now
        * @type Number
        * @public
        */
        now: number;
        /**
        * The time it takes for the time to update. Using this you can calculate the fps.
        * @property delta
        * @type Number
        * @public
        */
        delta: number;
        /**
        * The rate at which ideal frames are passing. Multiply per-frame iterations by this factor to create smooth movement. For example, if the ideal fps is 60, but you're only getting 45, rate will equal 1.333.
        * @property rate
        * @type Number
        * @public
        * @since 1.1.0
        */
        rate: number;
        /**
        * The ideal frame delta in milliseconds. This is automatically adjusted when the game sets a new frameRate.
        * @property idealDelta
        * @type Number
        * @public
        * @since 1.1.0
        */
        idealDelta: number;
        /**
        * The time that has elapsed since the game started. In milliseconds.
        * @method elapsed
        * @return {Number}
        * @public
        */
        elapsed(): number;
        /**
        * The time that has elapsed since the game started but in seconds.
        * @method totalElapsedSeconds
        * @return {Number}
        * @public
        */
        totalElapsedSeconds(): number;
        /**
        * The update loop that should be executed every frame. Used to update the time.
        * @method update
        * @public
        */
        update(): void;
        /**
        * Used to calculate the elapsed time from a point that is specified. This is returned in Milliseconds.
        * @method elapsedSince
        * @param since {Number} The point in time in which you would like to see how many milliseconds have passed. In milliseconds.
        * @return {Number}
        * @public
        */
        elapsedSince(since: number): number;
        /**
        * Used to calculate the elapsed time from a point that is specified BUT this is in seconds.
        * @method elapsedSecondsSince
        * @param since {Number} The point in time in which you would like to see how many seconds have passed. In milliseconds.
        * @return {Number }
        * @public
        */
        elapsedSecondsSince(since: number): number;
        /**
        * Resets the MasterClocks time.
        * @method reset
        * @public
        */
        reset(): void;
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
    * @param clock {Kiwi.Time.Clock} The game clock instance this Timer is based on.
    * @param delay {Number} The number of clock units to wait between firing events.
    * @param [repeatCount=0] {Number} The number of times to repeat the timer before it is expired. If you don't want it to ever expire, set a value of -1.
    * @return {Kiwi.Time.Timer} This object.
    *
    */
    class Timer {
        constructor(name: string, clock: Clock, delay: number, repeatCount?: number);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "Timer"
        * @public
        */
        objType(): string;
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
        currentCount(): number;
        /**
        * A collection of the TimerEvents associated with TimerEvent.TIMER_START
        * @property _startEvents
        * @type Array
        * @private
        */
        private _startEvents;
        /**
        * A collection of the TimerEvents associated with TimerEvent.TIMER_COUNT
        * @property _countEvents
        * @private
        * @type Array
        */
        private _countEvents;
        /**
        * A collection of the TimerEvents associated with TimerEvent.TIMER_STOP
        * @property _stopEvents
        * @private
        * @type Array
        */
        private _stopEvents;
        /**
        * The clock which this timer bases its timing on.
        * @property _clock
        * @type Kiwi.Time.Clock
        * @private
        */
        private _clock;
        /**
        * The time the last repeat occurred in clock units.
        * @property _timeLastCount
        * @type Number
        * @private
        * @deprecated Better time handling in 1.2.0 deprecates this data.
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
        isRunning(): boolean;
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
        isStopped(): boolean;
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
        isPaused(): boolean;
        /**
        * The name of the timer.
        * @property name
        * @type String
        * @default null
        * @public
        */
        name: string;
        /**
        * The delay, in game clock units, that the timer will wait before firing the event
        * @property _delay
        * @type Number
        * @default 0.016
        * @private
        */
        private _delay;
        /**
        * The delay, in game clock units, that the timer will wait before firing the event
        *
        * This property must be greater than 0.
        * @property delay
        * @type Number
        * @default 0.016
        * @public
        */
        delay: number;
        /**
        * The number of times the timer will repeat before stopping.
        * @property repeatCount
        * @type Number
        * @default 0
        * @public
        */
        repeatCount: number;
        /**
        * Time elapsed on the current repetition
        * @property _elapsed
        * @type number
        * @private
        * @since 1.2.0
        */
        private _elapsed;
        /**
        * Clock time on last frame, used to calculate frame length and time elapsed
        * @property _lastElapsed
        * @type number
        * @private
        * @since 1.2.0
        */
        private _lastElapsed;
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
        update(): void;
        /**
        * Start the Timer. This will reset the timer and start it. The timer can only be started if it is in a stopped state.
        * @method start
        * @return {Kiwi.Time.Timer} this object.
        * @public
        */
        start(): Timer;
        /**
        * Stop the Timer. Only possible when the timer is running or paused.
        * @method stop
        * @return {Kiwi.Time.Timer} this object.
        * @public
        */
        stop(): Timer;
        /**
        * Pause the Timer. Only possible when the timer is running.
        * @method pause
        * @return {Kiwi.Time.Timer} this object.
        * @public
        */
        pause(): Timer;
        /**
        * Resume the Timer. Only possible if the timer has been paused.
        * @method resume
        * @return {Kiwi.Time.Timer} this object.
        * @public
        */
        resume(): Timer;
        /**
        * Adds an existing TimerEvent object to this Timer.
        * @method addTimerEvent
        * @param {Kiwi.Time.TimerEvent} A TimerEvent object
        * @return {Kiwi.Time.TimerEvent} The TimerEvent object
        * @public
        */
        addTimerEvent(event: TimerEvent): TimerEvent;
        /**
        * Creates a new TimerEvent and adds it to this Timer
        * @method createTimerEvent
        * @param type {Number} The type of TimerEvent to create (TIMER_START, TIMER_COUNT or TIMER_STOP).
        * @param callback {Function} The function to call when the TimerEvent fires.
        * @param context {Function} The context in which the given function will run (usually 'this')
        * @return {Kiwi.Time.TimerEvent} The newly created TimerEvent.
        * @public
        */
        createTimerEvent(type: number, callback: any, context: any): TimerEvent;
        /**
        * Removes a TimerEvent object from this Timer
        * @method removeTimerEvent
        * @param {Kiwi.Time.TimerEvent} The TimerEvent to remove
        * @return {boolean} True if the event was removed, otherwise false.
        * @public
        */
        removeTimerEvent(event: TimerEvent): boolean;
        /**
        * Removes all TimerEvent objects from this Timer
        * @method clear
        * @param type {Number} The type of TimerEvents to remove. Set to zero to remove them all.
        * @return {boolean} True if the event was removed, otherwise false.
        * @public
        */
        clear(type?: number): void;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        * @public
        */
        toString(): string;
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
    * @return {Kiwi.Time.TimerEvent} This Object.
    */
    class TimerEvent {
        constructor(type: number, callback: any, context: any);
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "TimerEvent"
        * @public
        */
        objType(): string;
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
        type: number;
        /**
        * Fires the callback associated with this TimerEvent
        * @method run
        * @public
        */
        run(): void;
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
    * @return {Kiwi.Utils.Canvas}
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
        width: number;
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
        height: number;
        /**
        * The type of object that this is.
        * @method objType
        * @return {String} "Canvas"
        * @public
        */
        objType(): string;
        /**
        * The canvas DOM element.
        * @property domElement
        * @type HTMLCanvasElement
        * @public
        */
        domElement: HTMLCanvasElement;
        /**
        * The 2D rendering context that is used to render anything to this canvas.
        * @property _context
        * @type CanvasRenderingContext2D
        * @public
        */
        context: CanvasRenderingContext2D;
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
        * You may set this with any valid Kiwi.Utils.Color parameter.
        * If you set with multiple parameters, place them inside an array.
        * @property bgColor
        * @type String
        * @default "#000000"
        * @public
        */
        bgColor: any;
        /**
        * Background color object.
        * @property _bgColor
        * @type Kiwi.Utils.Color
        * @private
        * @since 1.2.0
        */
        private _bgColor;
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
        destroy(): void;
        /**
        * If the canvas element is visible or not.
        * @property visible
        * @type boolean
        * @default true
        * @public
        */
        visible: boolean;
        /**
        * The clearmode the is to be used when clearing the canvas.
        * @property clearMode
        * @type Number
        * @default 1
        * @public
        */
        clearMode: number;
        /**
        * Clears the canvas using the method specified by the clearMode property.
        * @method clear
        * @public
        */
        clear(): void;
        /**
        * Returns the canvas current image data as PNG.
        * @method saveAsPNG
        * @return String
        * @public
        */
        saveAsPNG(): string;
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the instance.
        * @public
        */
        toString(): string;
    }
}
/**
* @module Kiwi
* @submodule Utils
* @namespace Kiwi.Utils
*/
declare module Kiwi.Utils {
    /**
    * Utility class used to make color management more transparent.
    * Color objects hold color and alpha values, and can get or set them
    * in a variety of ways.
    *
    * Construct this object in one of the following ways.
    *
    * - Pass 3 or 4 numbers to determine RGB or RGBA. If the numbers are in
    * the range 0-1, they will be parsed as normalized numbers.
    * If they are in the range 1-255, they will be parsed as 8-bit channels.
    *
    * - Pass 3 or 4 numbers followed by the string "hsv" or "hsl"
    * (lowercase) to parse HSV or HSL color space (with optional alpha).
    * HSV and HSL colors may be specified as normalized parameters (0-1),
    * or as an angle (0-360) and two percentages (0-100).
    *
    * - Pass a string containing a hexadecimal color with or without alpha
    * (such as "ff8040ff" or "4080ff"). You may prepend "#" or "0x", but
    * they are not necessary and will be stripped.
    *
    * - Pass a string containing a CSS color function, such as
    * "rgb(255,255,255)", "rgba( 192, 127, 64, 32 )",
    * "hsl(180, 100, 100)", or "hsla(360, 50, 50, 50)".
    *
    * - Pass 1 number to set a grayscale value, or 2 numbers to set grayscale
    * with alpha. These are interpreted as with RGB values.
    *
    * The color object stores its internal values as normalized RGBA channels.
    * This is the most mathematically useful format, and corresponds
    * with the WebGL color paradigm. When you query the color object's values,
    * such as with "r" or "red" properties, it will return normalized values.
    * You can get values in the 0-255 8-bit range by calling the
    * corresponding x255 value. For example, if r = 1, then r255 = 255.
    *
    * We advise that you work with normalized colors wherever possible.
    * While the Color object is smart enough to recognise non-normalized
    * ranges in most cases, it cannot tell the difference between 0.5 on a
    * 0-1 scale, and 0.5 on a 0-255 scale. Try to reduce ambiguity by working
    * in normalized color space.
    *
    * You can get HSV, HSL, and hexadecimal values with the functions
    * "getHsva", "getHsla", and "getHex". By default, these all include an
    * alpha term. You can omit alpha from the getHex result by calling the
    * function with the parameter "false". As getHsva and getHsla return objects
    * rather than strings, you can freely ignore the provided alpha.
    *
    * You can modify a Color object once created using its properties, methods,
    * or the "set" method as you would use the constructor.
    *
    * @class Color
    * @constructor
    * @param [...args] Any number of arguments
    * @since 1.2.0
    */
    class Color {
        constructor(...args: any[]);
        /**
        * Set colors from parameters, as in the class description.
        * If you supply invalid parameters, the color will be unchanged.
        * @method set
        * @param params {object} Composite parameter object
        * @return {Kiwi.Utils.Color} This object with the new color set
        * @public
        */
        set(...params: any[]): Color;
        /**
        * Red channel, stored as a normalized value between 0 and 1.
        * This is most compatible with graphics hardware.
        * @property _r
        * @type number
        * @default 0.5
        * @private
        */
        _r: number;
        /**
        * Green channel, stored as a normalized value between 0 and 1.
        * This is most compatible with graphics hardware.
        * @property _g
        * @type number
        * @default 0.5
        * @private
        */
        _g: number;
        /**
        * Blue channel, stored as a normalized value between 0 and 1.
        * This is most compatible with graphics hardware.
        * @property _b
        * @type number
        * @default 0.5
        * @private
        */
        _b: number;
        /**
        * Alpha channel, stored as a normalized value between 0 and 1.
        * This is most compatible with graphics hardware.
        * @property _a
        * @type number
        * @default 0.5
        * @private
        */
        _a: number;
        /**
        * Red channel, stored as a normalized value between 0 and 1.
        * @property rNorm
        * @type number
        * @public
        */
        rNorm: number;
        /**
        * Green channel, stored as a normalized value between 0 and 1.
        * @property gNorm
        * @type number
        * @public
        */
        gNorm: number;
        /**
        * Blue channel, stored as a normalized value between 0 and 1.
        * @property bNorm
        * @type number
        * @public
        */
        bNorm: number;
        /**
        * Alpha channel, stored as a normalized value between 0 and 1.
        * @property aNorm
        * @type number
        * @public
        */
        aNorm: number;
        /**
        * Red channel.
        * If set to a number in the range 0-1, is interpreted as a
        * normalized color (see rNorm).
        * If set to a number above 1, is interpreted as an 8-bit channel
        * (see r255).
        * If queried, returns a normalized number in the range 0-1.
        * @property r
        * @type number
        * @public
        */
        r: number;
        /**
        * Green channel.
        * If set to a number in the range 0-1, is interpreted as a
        * normalized color (see gNorm).
        * If set to a number above 1, is interpreted as an 8-bit channel
        * (see g255).
        * If queried, returns a normalized number in the range 0-1.
        * @property g
        * @type number
        * @public
        */
        g: number;
        /**
        * Blue channel.
        * If set to a number in the range 0-1, is interpreted as a
        * normalized color (see bNorm).
        * If set to a number above 1, is interpreted as an 8-bit channel
        * (see b255).
        * If queried, returns a normalized number in the range 0-1.
        * @property b
        * @type number
        * @public
        */
        b: number;
        /**
        * Alpha channel.
        * If set to a number in the range 0-1, is interpreted as a
        * normalized color (see aNorm).
        * If set to a number above 1, is interpreted as an 8-bit channel
        * (see a255).
        * If queried, returns a normalized number in the range 0-1.
        * @property a
        * @type number
        * @public
        */
        a: number;
        /**
        * Red channel, specified as an 8-bit channel in the range 0-255.
        * @property r255
        * @type number
        * @public
        */
        r255: number;
        /**
        * Green channel, specified as an 8-bit channel in the range 0-255.
        * @property g255
        * @type number
        * @public
        */
        g255: number;
        /**
        * Blue channel, specified as an 8-bit channel in the range 0-255.
        * @property b255
        * @type number
        * @public
        */
        b255: number;
        /**
        * Alpha channel, specified as an 8-bit channel in the range 0-255.
        * @property a255
        * @type number
        * @public
        */
        a255: number;
        /**
        * Red channel, alias of r
        * @property red
        * @type number
        * @public
        */
        red: number;
        /**
        * Green channel, alias of g
        * @property green
        * @type number
        * @public
        */
        green: number;
        /**
        * Blue channel, alias of b
        * @property blue
        * @type number
        * @public
        */
        blue: number;
        /**
        * Alpha channel, alias of a
        * @property alpha
        * @type number
        * @public
        */
        alpha: number;
        /**
        * Parse colors from strings
        * @method parseString
        * @param color {string} A CSS color specification
        * @return {Kiwi.Utils.Color} This object with the new color set
        * @public
        */
        parseString(color: string): Kiwi.Utils.Color;
        /**
        * Parse hexadecimal colors from strings
        * @method parseHex
        * @param color {string} A hexadecimal color such as "ffffff" (no alpha)
        *	or "ffffffff" (with alpha). Also supports "fff" and "ffff"
        *	with 4-bit channels.
        * @return {Kiwi.Utils.Color} This object with the new color set
        * @public
        */
        parseHex(color: string): Kiwi.Utils.Color;
        /**
        * Returns color as a hexadecimal string
        * @method getHex
        * @param [alpha=true] {boolean} Whether to include the alpha
        * @return {string} A hexadecimal color such as "13579bdf"
        * @public
        */
        getHex(alpha?: boolean): string;
        /**
        * Parses normalized HSV values into the Color.
        * Interprets either normalized values, or H in degrees (0-360)
        * and S and V in % (0-100).
        *
        * Based on algorithms at
        * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
        * @method parseHsv
        * @param h {number} Hue
        * @param s {number} Saturation
        * @param v {number} Value
        * @param a {number} Alpha
        * @return {Kiwi.Utils.Color} This object with the new color set
        * @public
        */
        parseHsv(h: number, s: number, v: number, a?: number): Kiwi.Utils.Color;
        /**
        * Returns HSV value of the Color.
        * Based on algorithms at
        * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
        * @method getHsva
        * @return {object} Object with normalized h, s, v, a properties.
        */
        getHsva(): any;
        /**
        * Parses HSL value onto the Color.
        * Interprets either normalized values, or H in degrees (0-360)
        * and S and L in % (0-100).
        *
        * Based on algorithms at
        * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
        * @method parseHsl
        * @param h {number} Hue
        * @param s {number} Saturation
        * @param l {number} Lightness
        * @param a {number} Alpha
        * @return {Kiwi.Utils.Color} This object with the new color set
        * @public
        */
        parseHsl(h: number, s: number, l: number, a?: number): Kiwi.Utils.Color;
        /**
        * Returns HSL value of the Color.
        * Based on algorithms at
        * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
        * @method getHsla
        * @return {object} Object with normalized h, s, l, a properties.
        * @public
        */
        getHsla(): any;
        /**
        * Method used for computing HSL values.
        * Based on algorithms at
        * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
        * @method _hue2rgb
        * @param p {number}
        * @param q {number}
        * @param t {number}
        * @return number
        * @private
        */
        private _hue2rgb(p, q, t);
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
        * @return {String} "Common"
        * @public
        */
        objType(): string;
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
        * @method defaultToString
        * @param item {Any}
        * @return {Any}
        * @static
        * @public
        */
        static defaultToString(item: any): any;
        /**
        * Returns a boolean indicating whether x is between two parameters passed.
        *
        * @method isBetween
        * @param x {Number} The values to be checked
        * @param min {Number} The minimum value
        * @param max {Number} The maximum value
        * @return {Boolean}
        * @static
        * @public
        */
        static isBetween(x: any, min: any, max: any): boolean;
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
        * Checks if the given argument is a array.
        * @method isArray
        * @param {Any} obj
        * @return {boolean}
        * @static
        * @public
        */
        static isArray(obj: any): boolean;
        /**
        * Checks if the given argument is an object.
        * @method isObject
        * @param {Any} obj
        * @return {boolean}
        * @static
        * @public
        */
        static isObject(obj: any): boolean;
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
        * @return {String} "GameMath"
        * @public
        */
        objType(): string;
        /**
        * Holds the value for PI. Only up to 16 significant figures.
        * @property PI
        * @type number
        * @default 3.141592653589793
        * @static
        * @final
        * @public
        */
        static PI: number;
        /**
        * Holds the value for PI / 2 OR 90 degrees. Only up to 17 significant figures.
        * @property PI_2
        * @type number
        * @default 1.5707963267948965
        * @static
        * @final
        * @public
        */
        static PI_2: number;
        /**
        * Holds the value for PI / 4 OR 45 degrees. Only up to 16 significant figures.
        * @property PI_4
        * @type number
        * @default 0.7853981633974483
        * @static
        * @final
        * @public
        */
        static PI_4: number;
        /**
        * Holds the value for PI / 8 OR 22.5 degrees. Only up to 17 significant figures.
        * @property PI_8
        * @type number
        * @default 0.39269908169872413
        * @static
        * @final
        * @public
        */
        static PI_8: number;
        /**
        * Holds the value for PI / 16 OR 11.25 degrees. Only up to 17 significant figures.
        * @property PI_16
        * @type number
        * @default 0.19634954084936206
        * @static
        * @final
        * @public
        */
        static PI_16: number;
        /**
        * Holds the value for 2 * PI OR 180 degrees. Only up to 15 significant figures.
        * @property TWO_PI
        * @type number
        * @default 6.283185307179586
        * @static
        * @final
        * @public
        */
        static TWO_PI: number;
        /**
        * Holds the value for 3 * PI_2 OR 270 degrees. Only up to 17 significant figures.
        * @property THREE_PI_2
        * @type number
        * @default 4.7123889803846895
        * @static
        * @final
        * @public
        */
        static THREE_PI_2: number;
        /**
        * Holds the value for "e": Euler's number or Napier's constant, to 15 significant figures. This is a mathematically useful number.
        * @property E
        * @type number
        * @default 2.71828182845905
        * @static
        * @final
        * @public
        */
        static E: number;
        /**
        * Holds the value for the natural logarithm of 10: ln(10). Accurate to 16 significant figures.
        * @property LN10
        * @type number
        * @default 2.302585092994046
        * @static
        * @final
        * @public
        */
        static LN10: number;
        /**
        * Holds the value for the natural logarithm of 2: ln(10). Accurate to 16 significant figures.
        * @property LN2
        * @type number
        * @default 0.6931471805599453
        * @static
        * @final
        * @public
        */
        static LN2: number;
        /**
        * Holds the value for the base 10 logarithm of e (Euler's number). Accurate to 16 significant figures.
        * @property LOG10E
        * @type number
        * @default 0.4342944819032518
        * @static
        * @final
        * @public
        */
        static LOG10E: number;
        /**
        * Holds the value for the base 2 logarithm of e (Euler's number). Accurate to 19 significant figures.
        * @property LOG2E
        * @type number
        * @default 1.442695040888963387
        * @static
        * @final
        * @public
        */
        static LOG2E: number;
        /**
        * Holds the value for the square root of 0.5 (1/2). Accurate to 16 significant figures.
        * @property SQRT1_2
        * @type number
        * @default 0.7071067811865476
        * @static
        * @final
        * @public
        */
        static SQRT1_2: number;
        /**
        * Holds the value for the square root of 2. Accurate to 17 significant figures. This is the diagonal distance across a square with side length of 1.
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
        * Holds the value for 2 to the power of 16 (2^16 = 65536). This is the number of values available in 2 bytes.
        * @property B_16
        * @type number
        * @default 65536
        * @static
        * @final
        * @public
        */
        static B_16: number;
        /**
        * Holds the value for 2 to the power of 31 (2^31 = 2147483648). This is the number of values available to 31-bit memory addressing.
        * @property B_31
        * @type number
        * @default 2147483648
        * @static
        * @final
        * @public
        */
        static B_31: number;
        /**
        * Holds the value for 2 to the power of 32 (2^32 = 4294967296). This is the number of values available in 4 bytes, such as certain forms of RGBA colour.
        * @property B_32
        * @type number
        * @default 4294967296
        * @static
        * @final
        * @public
        */
        static B_32: number;
        /**
        * Holds the value for 2 to the power of 48 (2^48 = 281474976710656). 48-bit colour has 16 bits per channel.
        * @property B_48
        * @type number
        * @default 281474976710656
        * @static
        * @final
        * @public
        */
        static B_48: number;
        /**
        * Holds the value for 2 to the power of 53 (2^53 = 9007199254740992). This is the largest accurate double-precision floating point whole number.
        * @property B_53
        * @type number
        * @default 9007199254740992
        * @static
        * @final
        * @public
        */
        static B_53: number;
        /**
        * Holds the value for 2 to the power of 64 (2^64 = 18446744073709551616). This number cannot be accurately represented as a double-precision floating point whole number as it is greater than Kiwi.Utils.GameMath.B_53. It is represented as 18446744073709552000 in memory.
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
        * Holds the value of cos(pi / 3). This is the length of the shortest side of a triangle with angles in degrees 30, 60, and 90.
        * @property COS_PI_3
        * @type number
        * @default 0.86602540378443864676372317075294
        * @static
        * @final
        * @public
        */
        static COS_PI_3: number;
        /**
        * Holds the value of sin(2 * pi / 3). This is the length of the second-shortest side of a triangle with andles in degrees 30, 60, and 90.
        * @property SIN_2PI_3
        * @type number
        * @default 0.03654595
        * @static
        * @final
        * @public
        */
        static SIN_2PI_3: number;
        /**
        * Holds the value for 4 * (Math.sqrt(2) - 1) / 3.0 (approximately 0.5522847).
        *
        * This is useful for making circular arcs with Bezier curves. For an arc segment of 90 degrees (PI / 2 radians) or less, you can construct a nice approximation using CIRCLE_ALPHA. If the magic number k = CIRCLE_ALPHA, construct an arc using the following points: [1,0], [1,k], [k,1], [0,1].
        *
        * For angles that are smaller by scale n, scale k by n, and displace k along tangents of the arc. For more information, see this article by Hans Muller: http://hansmuller-flex.blogspot.com/2011/04/approximating-circular-arc-with-cubic.html
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
        * Maximum relative error for integers.
        * @property SHORT_EPSILON
        * @type number
        * @default 0.1
        * @static
        * @final
        * @public
        */
        static SHORT_EPSILON: number;
        /**
        * Maximum relative error for percentages (where 1% == 0.01).
        * @property PERC_EPSILON
        * @type number
        * @default 0.001
        * @static
        * @final
        * @public
        */
        static PERC_EPSILON: number;
        /**
        * Average relative error for single float values.
        * @property EPSILON
        * @type number
        * @default 0.0001
        * @static
        * @final
        * @public
        */
        static EPSILON: number;
        /**
        * Maximum relative error for 8-digit decimal values.
        * @property LONG_EPSILON
        * @type number
        * @default 0.00000001
        * @static
        * @final
        * @public
        */
        static LONG_EPSILON: number;
        /**
        * Computes the maximum relative error for this machine.
        * @method computeMachineEpsilon
        * @return {Number}
        * @static
        * @public
        */
        static computeMachineEpsilon(): number;
        /**
        * Computes whether two numbers are identical to the limits of the computer's precision, as specified by the epsilon value.
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
        * Computes whether the first parameter is less than the second parameter, to the limits of the computer's precision, as specified by the epsilon value.
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
        * Computes whether the first parameter is greater than the second parameter, to the limits of the computer's precision, as specified by the epsilon value.
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
        * Computes the integer ceiling of the first parameter, minus a rounding margin defined by epsilon.
        * @method fuzzyCeil
        * @param val {number}
        * @param [epsilon=0.0001] {number}
        * @return {Number}
        * @static
        * @public
        */
        static fuzzyCeil(val: number, epsilon?: number): number;
        /**
        * Computes the integer floor of the first parameter, plus a rounding margin defined by epsilon.
        * @method fuzzyFloor
        * @param val {number}
        * @param [epsilion=0.0001] {number}
        * @return {Number}
        * @static
        * @public
        */
        static fuzzyFloor(val: number, epsilon?: number): number;
        /**
        * Computes the mean of any number of parameters. For example, average(1,2,3) returns 2.
        * @method average
        * @param [args]* {Any[]}
        * @return {Number}
        * @static
        * @public
        */
        static average(...args: any[]): number;
        /**
        * Computes whether value and target are sufficiently close as to be within the computer's margin of error, as defined by epsilon. Returns the target if they are sufficiently close; returns the value if they are not.
        *
        * In other words, slam prevents the target from exceeding epsilon.
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
        * Truncates a value by removing all decimal data.
        * @method truncate
        * @param n {number}
        * @return {number}
        * @static
        * @public
        */
        static truncate(n: number): number;
        /**
        * Removes all non-decimal data from the value.
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
        * Round down to some place comparative to a 'base', default is 10 for decimal place.
        * 'place' is represented by the power applied to 'base' to get that place
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
        * Round down to some place comparative to a 'base', default is 10 for decimal place.
        * 'place' is represented by the power applied to 'base' to get that place
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
        * Returns an equivalent angle within the bounds of -PI (inclusive)
        * to PI (exclusive).
        * @method normalizeAngle
        * @param angle {number}
        * @param [radians=true] {boolean}
        * @return {number}
        * @static
        * @public
        */
        static normalizeAngle(angle: number, radians?: boolean): number;
        /**
        * Closest angle between two angles a1 and a2. In other words, the angle
        * you must turn to go from facing a1 to facing a2.
        * This will be a normalized angle between -PI and PI.
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
        * @method isOdd
        * @param n {number} The number to check
        * @return {boolean} True if the given number is odd. False if the given number is even.
        * @static
        * @public
        */
        static isOdd(n: number): boolean;
        /**
        * Returns true if the number given is even.
        * @method isEven
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
        * Interpolates between neighbouring values in an array using linear interpolation only. For example, linearInterpolation( [ 1,5,4 ], 0.5 ) = 5, and linearInterpolation( [ 1, 2 ], 0.3 ) = 1.3.
        * @method linearInterpolation
        * @param v {Array} An array of values through which to interpolate
        * @param k {number} The position to interpolate, in the range 0-1
        * @return {number}
        * @static
        * @public
        */
        static linearInterpolation(v: any, k: any): number;
        /**
        * Interpolates between values in an array using Bezier curves. This treats the values in the array as control points on a spline. Unlike Catmull-Rom splines, the value is not guaranteed to intersect precisely with these points.
        * @method bezierInterpolation
        * @param v {Array} An array of values through which to interpolate
        * @param k {number} The position to interpolate, in the range 0-1
        * @return {number}
        * @static
        * @public
        */
        static bezierInterpolation(v: any, k: any): number;
        /**
        * Interpolates between values in an array using Catmull-Rom splines. This treats the values in the array as control points on a spline. Unlike Bezier curves, the value will intersect with every point in the array.
        * @method catmullRomInterpolation
        * @param v {Array} An array of values through which to interpolate
        * @param k {Number} The position to interpolate, in the range 0-1
        * @return {number}
        * @static
        * @public
        */
        static catmullRomInterpolation(v: any, k: any): number;
        /**
        * Simple linear interpolation, identical to interpolateFloat.
        * @method linear
        * @param {Any} p0
        * @param {Any} p1
        * @param {Any} t
        * @return {number}
        * @static
        * @public
        */
        static linear(p0: any, p1: any, t: any): number;
        /**
        * Bernstein polynomial for constructing Bezier curves. Returns n! / i! / (n-i)!
        * @method bernstein
        * @param {Any} n
        * @param {Any} i
        * @return {number}
        * @static
        * @public
        */
        static bernstein(n: any, i: any): number;
        /**
        * Function used to construct a Catmull-Rom interpolation: see catmullRomInterpolation()
        * @method catmullRom
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
        * Returns the difference between a and b.
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
        * @return {String} "RandomDataGenerator"
        * @public
        */
        objType(): string;
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
        sow(seeds?: string[]): void;
        /**
        * Returns a random integer between 0 and 2^32
        * @method integer
        * @return {Number}
        * @public
        */
        integer(): number;
        /**
        * Returns a random real number between 0 and 1
        * @method frac
        * @return {Number}
        * @public
        */
        frac(): number;
        /**
        * Returns a random real number between 0 and 2^32
        * @method real
        * @return {Number}
        * @public
        */
        real(): number;
        /**
        * Returns a random integer between min and max
        * @method integerInRange
        * @param min {Number}
        * @param max {Number}
        * @return {Number}
        * @public
        */
        integerInRange(min: number, max: number): number;
        /**
        * Returns a random real number between min and max
        * @method realInRange
        * @param min {Number}
        * @param max {Number}
        * @return {Number}
        * @public
        */
        realInRange(min: number, max: number): number;
        /**
        * Returns a random real number between -1 and 1
        * @method normal
        * @return {Number}
        * @public
        */
        normal(): number;
        /**
        * Returns a valid v4 UUID hex string (from https://gist.github.com/1308368)
        * @method uuid
        * @return {String}
        * @public
        */
        uuid(): string;
        /**
        * Returns a random member of `array`
        * @method pick
        * @param {Any} array
        * @return {Any}
        * @public
        */
        pick(array: any): any;
        /**
        * Returns a random member of `array`, favoring the earlier entries
        * @method weightedPick
        * @param {Any} array
        * @return {Any}
        * @public
        */
        weightedPick(array: any): any;
        /**
        * Returns a random word of lipsum
        * @method word
        * @return {String}
        * @public
        */
        word(): string;
        /**
        * Returns `n` random words of lipsum, 3 if not specified
        * @method words
        * @param {Number} [quantity=3] Amount of random words to get.
        * @return {String}
        * @public
        */
        words(quantity?: number): string;
        /**
        * Returns a random lipsum sentence
        * @method sentence
        * @return {String}
        * @public
        */
        sentence(): String;
        /**
        * Returns `n` random lipsum sentences, 3 if not specified
        * @method sentences
        * @param {Number} [quantity=3] The number of sentences to grab.
        * @return {String}
        * @public
        */
        sentences(quantity?: number): string;
        /**
        * Returns a random timestamp between min and max, or between the beginning of 2000 and the end of 2020 if min and max aren't specified
        * @method timestamp
        * @param [min=946684800000] {Number} The lowest timestamp.
        * @param [max=1577862000000] {Number} The highest timestamp.
        * @return {Number}
        * @public
        */
        timestamp(min?: number, max?: number): number;
        /**
        * Returns a random angle between -180 and 180
        * @method angle
        * @return {Number}
        * @public
        */
        angle(): number;
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
        * @return {String} "RequestAnimationFrame"
        * @public
        */
        objType(): string;
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
        setCallback(callback: any): void;
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
        isUsingSetTimeOut(): boolean;
        /**
        * Returns a boolean indicating wheather or not we are using the RAF. If false it means we are using setTimeout for our update loop.
        * @method usingRAF
        * @return {boolean}
        * @public
        */
        isUsingRAF(): boolean;
        /**
        * The last time at which the RAF was called. This is given a value at the end of the RAF loop.
        * @property lastTime
        * @type Number
        * @public
        */
        lastTime: number;
        /**
        * A timestamp that has the current time. This is updated each time the RAF loop is executed. Is updated before the last time in the loop.
        * @property currentTime
        * @type Number
        * @public
        */
        currentTime: number;
        /**
        * A boolean indicating whether or not the RAF is running.
        * @property isRunning
        * @type boolean
        * @default false
        * @public
        */
        isRunning: boolean;
        /**
        * Starts the RequestAnimationFrame (or setTimeout if RAF not supported).
        * @method start
        * @param [callback] {Any} A callback to be executed everyframe. Overrides the callback set at instantiation if passed.
        * @public
        */
        start(callback?: any): void;
        /**
        * Stops the RAF from running.
        * @method stop
        * @public
        */
        stop(): void;
        /**
        * The update loop that the RAF will continuously call.
        * @method RAFUpdate
        * @public
        */
        RAFUpdate(): void;
        /**
        * The update loop that the setTimeout method will continuously call.
        * @method SetTimeoutUpdate
        * @public
        */
        SetTimeoutUpdate(): void;
    }
}
/**
*
* @module Kiwi
* @submodule Utils.
*
*/
declare module Kiwi.Utils {
    /**
    * A utilty class used to add management functionality to common console methods.
    * You can use this class by either creating a new instance, or using the instance at the namespace 'Kiwi.Log'.
    *
    * log/error/warn methods contained on this class function just like their 'console' equivalents except that:
    * - You can assign a tag to message by adding a '#' symbol to the front of a parameter. Example: this.log('Hi', '#welcome');
    * - Messages can have multiple tags. Example: this.log('Hi', '#welcome', '#greeting');
    * - Messages are recorded (by default) and you can then search through any messages saved.
    *
    * You can use the 'show' commands to search through recordings and find specific messages.
    *
    *
    * @class Log
    * @namespace Kiwi.Utils
    * @constructor
    * @param [params] {Object}
    *   @param [options.recording=true] {Boolean} If the logs should be recorded.
    *   @param [options.display=true] {Boolean} If the logs should be displayed or not.
    *   @param [options.enabled=true] {Boolean} If the Logger is enabled at all.
    *   @param [options.maxRecordings=Infinity] {Number} The maximum number of recordings to have at a single time.
    */
    class Log {
        constructor(params?: any);
        /**
        * Sets the log properties based on a object passed.
        * This method is used to set the properties on the Log based on
        * gameoptions passed at game creation.
        *
        * @method setDefaultsFromParams
        * @param [params] {Object}
        *   @param [options.recording=true] {Boolean} If the logs should be recorded.
        *   @param [options.display=true] {Boolean} If the logs should be displayed or not.
        *   @param [options.enabled=true] {Boolean} If the Logger is enabled at all.
        *   @param [options.maxRecordings=Infinity] {Number} The maximum number of recordings to have at a single time.
        * @public
        */
        setDefaultsFromParams(params?: any): void;
        /**
        * If the log, warn, or error messages should function at all.
        * When set to false messages won't display or be recorded.
        *
        * @property enabled
        * @type Boolean
        * @default true
        * @public
        */
        enabled: boolean;
        /**
        * If messages should be recorded or not.
        *
        * @property record
        * @type Boolean
        * @default true
        * @public
        */
        recording: boolean;
        /**
        * If the log, warn, and error methods should display when executed or not.
        * You may want to set this to 'false' when releasing a game.
        *
        * @property display
        * @type Boolean
        * @default true
        * @public
        */
        display: boolean;
        /**
        * A list of tags which any message recorded needs to match in-order to be displayed.
        * This helps when debugging systems with lots of messages, without removing every log.
        *
        * @property tagFilters
        * @type Array
        * @since 1.3.0
        * @public
        */
        tagFilters: string[];
        /**
        * The maximum number of recordings to be kept at once.
        *
        * @property maxRecordings
        * @type Number
        * @default Infinity
        * @public
        */
        maxRecordings: number;
        /**
        * A list containing all messages recorded.
        *
        * @property recordings
        * @type Array
        * @private
        */
        private recordings;
        /**
        * The time (in milliseconds) of the last recording.
        *
        * @property lastMessageTime
        * @type Number
        * @readOnly
        * @public
        */
        lastMessageTime: number;
        /**
        * The number of recordings that have been saved.
        * Same as the recordings length, and won't go above the 'maxRecordings'.
        *
        * @property numRecordings
        * @type Number
        * @readOnly
        * @public
        */
        numRecordings: number;
        /**
        * Saves a message to the 'recordings' array.
        * That message can then be retrieved later using the 'show' methods.
        *
        * @method recordMessage
        * @param message {String}
        * @param [tags=[]] {String}
        * @param [logMethod=console.log] {String}
        * @public
        */
        record(messages: string[], tags?: string[], logMethod?: any): void;
        /**
        * Removes recordings from the list. Goes from the oldest to newest.
        * By not passing any parameters, the entire log will be cleared.
        *
        * @method clearRecordings
        * @param [start=0] {Number}
        * @param [end] {Number}
        * @public
        */
        clearRecordings(start?: number, end?: number): void;
        /**
        * Executes a particular array of messages using a method passed.
        * Takes into account the 'display' property before executing.
        *
        * @method _execute
        * @param method {Any} The method that should be used to log the messages. Generally a console method.
        * @param context {Any} The context that the method should be executed in. Generally set to the console.
        * @param messages {Array}
        * @param [force=false] {Array}
        * @private
        */
        private _execute(method, context, messages, force?);
        /**
        * Accepts an array of strings and returns a new array consisting of all elements considered as a tag.
        *
        * @method getTagsFromArray
        * @param strings {Array}
        * @return {Array} Elements of the array considered as tags
        * @public
        */
        getTagsFromArray(array: string[]): any[];
        /**
        * Returns true if the all of the tags passed also occur in the tag filters.
        * This is used to filter out messages by their tags.
        *
        * @method _filterTags
        * @param tags {Array} A list of tags, which need to occur in the tag filters
        * @param [tagFilters=this.tagFilters] {Array} A list of tags. Tags need to
        * @return {Boolean} Tags match the tag filters, and so if the message would be allowed to execute.
        * @since 1.3.0
        * @private
        */
        private _filterTags(tags, tagFilters?);
        /**
        * Logs a message using the 'console.log' method.
        * Arguments starting with a '#' symbol are given that value as a tag.
        *
        * @method log
        * @param [..args] {Any} The data you would like to log.
        * @public
        */
        log(...args: any[]): void;
        /**
        * Logs a message using the 'console.warn' method.
        * Arguments starting with a '#' symbol are given that value as a tag.
        *
        * @method warn
        * @param [..args] {Any} The data you would like to log.
        * @public
        */
        warn(...args: any[]): void;
        /**
        * Logs a message using the 'console.error' method.
        * Arguments starting with a '#' symbol are given that value as a tag.
        *
        * @method error
        * @param [..args] {Any} The data you would like to log.
        * @public
        */
        error(...args: any[]): void;
        /**
        * Method that displays a particular recording passed.
        *
        * @method _show
        * @param recording {Object}
        * @param tags {Array}
        * @return {Boolean} If the recording was displayed or not.
        * @private
        */
        private _show(recording, tags);
        /**
        * Displays the last recording matching the tags passed.
        * Ignores the tag filters.
        *
        * @method showLast
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        showLast(...args: any[]): void;
        /**
        * Displays all recordings.
        * Ignores the tag filters.
        *
        * @method showAll
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        showAll(...args: any[]): void;
        /**
        * Displays all logs recorded.
        * Ignores the tag filters.
        *
        * @method showLogs
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        showLogs(...args: any[]): void;
        /**
        * Displays all errors recorded.
        * Ignores the tag filters.
        *
        * @method showErrors
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        showErrors(...args: any[]): void;
        /**
        * Displays all warnings recorded.
        * Ignores the tag filters.
        *
        * @method showWarnings
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        showWarnings(...args: any[]): void;
        /**
        * Displays a series of recordings within a time period passed.
        * Time recorded is in milliseconds.
        * Ignores the tag filters.
        *
        * @method showTimePeriod
        * @param [start=0] {Number}
        * @param [end=Infinity] {Number}
        * @param [tags] {Array} An tags that the recordings must have.
        * @public
        */
        showTimePeriod(start?: number, end?: number, tags?: string[]): void;
        /**
        * Adds a tag to the list of tag filters.
        * Any messages that do not have the tags in the tagFilters list will not be displayed.
        *
        * @method addFilter
        * @param [...args] {Any} Tags to add to the filters list.
        * @since 1.3.0
        * @public
        */
        addFilter(...args: any[]): void;
        /**
        * Removes a tag to the list of tag filters.
        * Any messages that do not have the tags in the tagFilters list will not be displayed.
        *
        * @method removeFilter
        * @param [...args] {Any} Tags to be remove from the filters list.
        * @since 1.3.0
        * @public
        */
        removeFilter(...args: any[]): void;
    }
}
/**
*
* @module Kiwi
* @submodule Utils
*/
declare module Kiwi.Utils {
    /**
    * Deals with parsing and comparing semver style version numbers
    * @class Version
    * @constructor
    * @namespace Kiwi.Utils
    */
    class Version {
        /**
        * Parses a string such as "1.2.3" and returns an oject containing numeric properties for majorVersion, minorVersion and patchVersion
        * @method parseVersion
        * @param version {String}
        * @return {Object} Object with properties majorVersion, minorVersion, patchVersion.
        * @public
        * @static
        */
        static parseVersion(version: string): {
            majorVersion: number;
            minorVersion: number;
            patchVersion: number;
        };
        /**
        * Compares two semver version strings such as "0.1.0" and "0.2.1".
        * Returns "greater", "less" or "equal".
        * @method compareVersions
        * @param version1 {String}
        * @param version2 {String}
        * @return {String} "greater", "less" or "equal"
        * @public
        * @static
        */
        static compareVersions(version1: string, version2: string): string;
        /**
        * Compares two semver version strings such as "0.1.0" and "0.2.1". Returns true if version1 is greater than version2.
        * @method greaterOrEqual
        * @param version1 {String}
        * @param version2 {String}
        * @return {boolean}
        * @public
        * @static
        */
        static greaterOrEqual(version1: string, version2: string): boolean;
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
    *
    * @property Log
    * @static
    * @type Kiwi.Utils.Log
    * @public
    */
    var Log: Kiwi.Utils.Log;
    /**
    * The version of Kiwi that is currently being used.
    * @property VERSION
    * @static
    * @type string
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
    * A Static property that contains the number associated with RENDERER AUTODETECTION
    * @property RENDERER_AUTO
    * @static
    * @type number
    * @default 2
    * @public
    * @since 1.1.0
    */
    var RENDERER_AUTO: number;
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
    * Contains the Device class that is used to determine which features are supported by the users browser.
    * @property DEVICE
    * @static
    * @type Device
    * @public
    */
    var DEVICE: Kiwi.System.Device;
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
        * @return {String} "GameManager"
        * @public
        */
        objType(): string;
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
/**
*
* @module Kiwi
* @submodule Files
*
*/
declare module Kiwi.Files {
    /**
    * AudioFile which contains settings, loading, and processing details for Audio files to be used.
    *
    * Uses tag loading for devices not supporting the WebAudioAPI. Otherwise XHR + arraybuffer loading methods are used.
    *
    * @class AudioFile
    * @namespace Kiwi.Files
    * @extends Kiwi.Files.File
    * @since 1.2.0
    * @constructor
    * @param game {Kiwi.Game} The game that this file is for
    * @param params {Object} Options for this file.
    *   @param params.key {String} User defined name for this file. This would be how the user would access it in the file store.
    *   @param params.url {String} Location of the file to be loaded.
    *   @param {Object} [params.metadata={}] Any metadata to be associated with the file.
    *   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
    *   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
    *   @param [params.type=UNKNOWN] {Number} The type of file this is.
    *   @param [params.tags] {Array} Any tags to be associated with this file.
    * @return {Kiwi.Files.AudioFile}
    */
    class AudioFile extends Kiwi.Files.File {
        constructor(game: Kiwi.Game, params?: any);
        /**
        * For tag loading only. The crossOrigin value applied to loaded images. Very often this needs to be set to 'anonymous'
        * @property crossOrigin
        * @type String
        * @default ''
        * @public
        */
        crossOrigin: string;
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "AudioFile"
        * @public
        */
        objType(): string;
        /**
        * Initialises a loading method depending on detected device support.
        * @method _load
        * @protected
        */
        protected _load(): void;
        /**
        * Handles loading audio in via an audio tag.
        * @method tagLoader
        * @public
        */
        tagLoader(): void;
        /**
        * Handles decoding the arraybuffer into audio data.
        * @method processXhr
        * @param response
        * @protected
        */
        protected processXhr(response: any): void;
        /**
        * Attempts to decode the audio data loaded via XHR + arraybuffer.
        *
        * @method _decodeAudio
        * @private
        */
        private _decodeAudio();
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
    * DataFile which contains settings, loading, and processing details for Data files to be used.
    * There is no tag loader support for this method of loading.
    *
    * @class DataFile
    * @namespace Kiwi.Files
    * @extends Kiwi.Files.File
    * @since 1.2.0
    * @constructor
    * @param game {Kiwi.Game} The game that this file is for
    * @param params {Object} Options for this file.
    *   @param params.key {String} User defined name for this file. This would be how the user would access it in the file store.
    *   @param params.url {String} Location of the file to be loaded.
    *   @param {Object} [params.metadata={}] Any metadata to be associated with the file.
    *   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
    *   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
    *   @param [params.type=UNKNOWN] {Number} The type of file this is.
    *   @param [params.tags] {Array} Any tags to be associated with this file.
    *   @param [params.parse] {Boolean} If the response should be parsed after the file is loaded. Only used with JSON and XML types of Data files.
    * @return {Kiwi.Files.DataFile}
    *
    */
    class DataFile extends Kiwi.Files.File {
        constructor(game: Kiwi.Game, params?: {});
        /**
        * Sets properties for this instance based on an object literal passed. Used when the class is being created.
        *
        * @method parseParams
        * @param [params] {Object}
        *   @param [params.metadata={}] {Object} Any metadata to be associated with the file.
        *   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
        *   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
        *   @param [params.type=UNKNOWN] {Number} The type of file this is.
        *   @param [params.tags] {Array} Any tags to be associated with this file.
        *   @param [params.parse] {Boolean} If the response should be parsed after the file is loaded.
        * @protected
        */
        protected parseParams(params: any): void;
        /**
        * If the response should be parsed (using the appropriate method) after loading.
        * Example: If set to the true and the dataType set is json, then the response will be sent through a JSON.parse call.
        *
        * @property parse
        * @type boolean
        * @default false
        * @public
        */
        parse: boolean;
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "DataFile"
        * @public
        */
        objType(): string;
        /**
        * Increments the counter, and calls the approprate loading method.
        * @method _load
        * @protected
        */
        protected _load(): void;
        /**
        * Handles decoding the arraybuffer into audio data.
        * @method processXhr
        * @param response
        * @protected
        */
        protected processXhr(response: any): void;
        /**
        * Attempts to parse a string which is assumed to be XML. Called when 'parse' is set to true.
        * If valid 'loadSuccess' is called, otherwise 'loadError' is executed
        *
        * @method parseXML
        * @param data {String}
        * @private
        */
        private parseXML(data);
        /**
        * Attempts to parse a string which is assumed to be JSON. Called when 'parse' is set to true.
        * If valid 'loadSuccess' is called, otherwise 'loadError' is executed
        *
        * @method processJSON
        * @param data {String}
        * @private
        */
        private processJSON(data);
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
    * TextureFile which contains settings, loading, and processing information for textures/images in Kiwi.
    *
    * Contains two methods of loading. XHR + arraybuffer and also tag loading.
    *
    * @class TextureFile
    * @namespace Kiwi.Files
    * @extends Kiwi.Files.File
    * @since 1.2.0
    * @constructor
    * @param game {Kiwi.Game} The game that this file is for
    * @param params {Object} Options for this file.
    *   @param params.key {String} User defined name for this file. This would be how the user would access it in the file store.
    *   @param params.url {String} Location of the file to be loaded.
    *   @param {Object} [params.metadata={}] Any metadata to be associated with the file.
    *   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
    *   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
    *   @param [params.type=UNKNOWN] {Number} The type of file this is.
    *   @param [params.tags] {Array} Any tags to be associated with this file.
    *   @param [params.xhrLoading=false] {Boolean} If xhr + arraybuffer loading should be used instead of tag loading.
    * @return {Kiwi.Files.TextureFile}
    *
    */
    class TextureFile extends Kiwi.Files.File {
        constructor(game: Kiwi.Game, params?: any);
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "TextureFile"
        * @public
        */
        objType(): string;
        /**
        * For tag loading only. The crossOrigin value applied to loaded images. Very often this needs to be set to 'anonymous'
        * @property crossOrigin
        * @type String
        * @default ''
        * @public
        */
        crossOrigin: string;
        /**
        * Initialises the loading method.
        * Tagloading is the default but also supports XHR + arraybuffer.
        * @method _load
        * @protected
        */
        protected _load(): void;
        /**
        * Contains the functionality for tag loading
        * @method tagLoader
        * @private
        */
        private tagLoader();
        /**
        * Gets the response data (which is an arraybuffer), creates a Blob from it
        * and creates an objectURL from it.
        *
        * @method processXhr
        * @param response {Any} The data stored in the 'xhr.response' tag
        * @protected
        */
        protected processXhr(response: any): void;
        /**
        * Revokes the object url that was added to the window when creating the image.
        * Also tells the File that the loading is now complete.
        *
        * @method revoke
        * @private
        */
        private revoke();
        /**
        * Destroys all external object references on this object.
        * @method destroy
        * @since 1.2.0
        * @public
        */
        destroy(): void;
    }
}
