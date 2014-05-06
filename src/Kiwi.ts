/// <reference path="core/Game.ts" />
/// <reference path="core/Stage.ts" />
/// <reference path="core/ComponentManager.ts" />
/// <reference path="core/PluginManager.ts" />
/// <reference path="core/CameraManager.ts" />
/// <reference path="core/StateConfig.ts" />
/// <reference path="core/StateManager.ts" />

/// <reference path="core/IChild.ts" />
/// <reference path="core/Entity.ts" />
/// <reference path="core/Component.ts" />
/// <reference path="core/Group.ts" />

/// <reference path="core/State.ts" /> //must be initialised AFTER group - typescript issue #599
/// <reference path="core/Camera.ts" />
/// <reference path="core/Signal.ts" />
/// <reference path="core/SignalBinding.ts" />

/// <reference path="gameobjects/Sprite.ts" />
/// <reference path="gameobjects/StaticImage.ts" />
/// <reference path="gameobjects/Textfield.ts" />
/// <reference path="gameobjects/tilemap/TileType.ts" />
/// <reference path="gameobjects/tilemap/TileMap.ts" />
/// <reference path="gameobjects/tilemap/TileMapLayer.ts" />

/// <reference path="components/AnimationManager.ts" />
/// <reference path="components/Box.ts" />
/// <reference path="components/Input.ts" />
/// <reference path="components/Sound.ts" />
/// <reference path="components/ArcadePhysics.ts" />

/// <reference path="file/Loader.ts" />
/// <reference path="file/DataLibrary.ts" />
/// <reference path="file/File.ts" />
/// <reference path="file/FileStore.ts" />

/// <reference path="system/Bootstrap.ts" />
/// <reference path="system/Browser.ts" />
/// <reference path="system/Device.ts" />

/// <reference path="textures/TextureAtlas.ts" />
/// <reference path="textures/TextureLibrary.ts" />
/// <reference path="textures/SpriteSheet.ts" />
/// <reference path="textures/SingleImage.ts" />



/// <reference path="animations/tweens/easing/Back.ts" />
/// <reference path="animations/tweens/easing/Bounce.ts" />
/// <reference path="animations/tweens/easing/Circular.ts" />
/// <reference path="animations/tweens/easing/Cubic.ts" />
/// <reference path="animations/tweens/easing/Elastic.ts" />
/// <reference path="animations/tweens/easing/Exponential.ts" />
/// <reference path="animations/tweens/easing/Linear.ts" />
/// <reference path="animations/tweens/easing/Quadratic.ts" />
/// <reference path="animations/tweens/easing/Quartic.ts" />
/// <reference path="animations/tweens/easing/Quintic.ts" />
/// <reference path="animations/tweens/easing/Sinusoidal.ts" />
/// <reference path="animations/tweens/TweenManager.ts" />
/// <reference path="animations/tweens/Tween.ts" />

/// <reference path="render/CanvasRenderer.ts" />
/// <reference path="render/GLRenderManager.ts" />
/// <reference path="render/GLShaderManager.ts" />
/// <reference path="render/GLTextureWrapper.ts" />
/// <reference path="render/GLTextureManager.ts" />
/// <reference path="render/GLArrayBuffer.ts" />
/// <reference path="render/GLElementArrayBuffer.ts" />
/// <reference path="render/renderers/Renderer.ts" />
/// <reference path="render/renderers/TextureAtlasRenderer.ts" />
/// <reference path="render/shaders/ShaderPair.ts" />
/// <reference path="render/shaders/TextureAtlasShader.ts" />
/// <reference path="render/shaders/ShaderPair.ts" />

/// <reference path="animations/Animation.ts" />
/// <reference path="animations/Sequence.ts" />

/// <reference path="input/Key.ts" />
/// <reference path="input/Keyboard.ts" />
/// <reference path="input/Keycodes.ts" />
/// <reference path="input/InputManager.ts" />
/// <reference path="input/Mouse.ts" />
/// <reference path="input/Touch.ts" />
/// <reference path="input/Pointer.ts" />
/// <reference path="input/MouseCursor.ts" />
/// <reference path="input/Finger.ts" />

/// <reference path="geom/AABB.ts" />
/// <reference path="geom/Circle.ts" />
/// <reference path="geom/Ray.ts" />
/// <reference path="geom/Intersect.ts" />
/// <reference path="geom/IntersectResult.ts" />
/// <reference path="geom/Line.ts" />
/// <reference path="geom/Matrix.ts" />
/// <reference path="geom/Point.ts" />
/// <reference path="geom/Rectangle.ts" />
/// <reference path="geom/Transform.ts" />
/// <reference path="geom/Vector2.ts" />

/// <reference path="hud/HUDDisplay.ts" />
/// <reference path="hud/HUDManager.ts" />
/// <reference path="hud/HUDWidget.ts" />
/// <reference path="hud/widgets/TextField.ts" />
/// <reference path="hud/widgets/Bar.ts" />
/// <reference path="hud/widgets/Icon.ts" />
/// <reference path="hud/widgets/IconBar.ts" />
/// <reference path="hud/widgets/BasicScore.ts" />
/// <reference path="hud/widgets/Button.ts" />
/// <reference path="hud/widgets/Time.ts" />
/// <reference path="hud/widgets/Menu.ts" />
/// <reference path="hud/widgets/MenuItem.ts" />
/// <reference path="hud/components/Counter.ts" />
/// <reference path="hud/components/WidgetInput.ts" />
/// <reference path="hud/components/Time.ts" />

/// <reference path="sound/AudioManager.ts" />
/// <reference path="sound/Audio.ts" />
/// <reference path="sound/AudioLibrary.ts" />

/// <reference path="time/Clock.ts" />
/// <reference path="time/ClockManager.ts" />
/// <reference path="time/MasterClock.ts" />
/// <reference path="time/Timer.ts" />
/// <reference path="time/TimerEvent.ts" />

/// <reference path="utils/Canvas.ts" />
/// <reference path="utils/Common.ts" />
/// <reference path="utils/GameMath.ts" />
/// <reference path="utils/RandomDataGenerator.ts" />
/// <reference path="utils/RequestAnimationFrame.ts" />
/// <reference path="utils/Version.ts" />
/// <reference path="WebGL.d.ts"/>

/**
* Module - Kiwi (Core)
* The top level namespace in which all core classes and modules are defined.
* @module Kiwi
* @main Kiwi
*/

module Kiwi {

    /**
    * The version of Kiwi that is currently being used.
    * @property VERSION
    * @static
    * @type string
    * @public
    */
    export var VERSION: string = "0.7.0";
    
    //DIFFERENT RENDERER STATIC VARIABLES
    /**
    * A Static property that contains the number associated with the CANVAS RENDERER.
    * @property RENDERER_CANVAS
    * @static
    * @type number
    * @default 0
    * @public
    */
    export var RENDERER_CANVAS: number = 0;
    
    /**
    * A Static property that contains the number associated with the WEBGL RENDERER.
    * @property RENDERER_WEBGL
    * @static 
    * @type number
    * @default 1
    * @public
    */
    export var RENDERER_WEBGL: number = 1;
    
    // DEVICE TARGET STATIC VARIABLES
    /**
    * Contains the number associated with the targetting of browsers. 
    * @property TARGET_BROWSER
    * @static
    * @type number
    * @default 0
    * @public
    */
    export var TARGET_BROWSER: number = 0;
    
    /**
    * Contains the number associated with the targetting of CocoonJS.
    * @property TARGET_COCOON
    * @static
    * @type number
    * @default 1
    * @public
    */
    export var TARGET_COCOON: number = 1;
    
    //DEBUG OPTION STATIC VARIABLES
    /**
    * Contains the number that is used to turn the Debug options on.
    * @property DEBUG_ON
    * @static
    * @type number
    * @default 0
    * @public
    */
    export var DEBUG_ON: number = 0;
    
    /**
    * Contains the number that is used to turn the Debug options off.
    * @property DEBUG_OFF
    * @static
    * @type number
    * @default 1
    * @public
    */
    export var DEBUG_OFF: number = 1;
    
    /**
    * Contains the Device class that is used to determine which features are supported by the users browser.
    * @property DEVICE
    * @static
    * @type Device
    * @public
    */
    export var DEVICE: Kiwi.System.Device = null;
    
    //STATIC PROPERTIES FOR GENERAL OBJECT TYPE DETECTION
    /**
    * Contains a number that is used to identify objects that are a State.
    * @property STATE
    * @static
    * @type number
    * @default 0
    * @public
    */
    export var STATE: number = 0;
 
    /**
    * Contains a number that is used to identify objects that are a Group.
    * @property GROUP
    * @static
    * @type number
    * @default 2
    * @public
    */
    export var GROUP: number = 2;
    
    /**
    * Contains a number that is used to identify objects that are a Entity.
    * @property ENTITY
    * @static
    * @type number
    * @default 3
    * @public
    */
    export var ENTITY: number = 3;
    
    /**
    * Contains a number that is used to identify objects that are a Camera.
    * @property CAMERA
    * @static
    * @type number 
    * @default 4
    * @public
    */
    export var CAMERA: number = 4;

    /**
    * Contains a number that is used to identify objects that are a HUD Widget.
    * @property HUD_WIDGET
    * @static
    * @type number
    * @default 5
    * @public
    */
    export var HUD_WIDGET: number = 5;

    /**
    * Contains a number that is used to identify objects that are a TILE_LAYER.
    * @property TILE_LAYER
    * @static
    * @type number
    * @default 6
    * @public
    */
    export var TILE_LAYER: number = 6;

    
    /**
    * The GameManager is used to maintain mulitple instances of Kiwi games within a single document.
    *  
    * @class GameManager
    * @namespace Kiwi
    * @static
    */
    export class GameManager {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "GameManager";
        }

        /**
        * A list of all of the games that are currently on this document.
        * @property _games
        * @static
        * @type Game[]
        * @private
        */
        private static _games: Kiwi.Game[] = [];

        /**
        * Used to register a new Game with this manager. Returns the new number of games that have been registered.
        * @method register
        * @param game {Game} The game you are wanting to register.
        * @return {Number] The new number of games registered.
        * @public
        */
        public static register(game: Kiwi.Game): number {

            return Kiwi.GameManager._games.push(game);

        }

        /**
        * Returns the total number of game that are currently registered with this GameManager.
        * @method total
        * @return {Number} Total number of registered games.
        * @public
        */
        public static total(): number {
            return Kiwi.GameManager._games.length;
        }

    }

    export var Plugins = {};

    export var extend:Function = function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };
    
}

