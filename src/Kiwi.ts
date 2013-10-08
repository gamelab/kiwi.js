
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

/// <reference path="core/Camera.ts" />
/// <reference path="core/CameraManager.ts" />
/// <reference path="core/Component.ts" />
/// <reference path="core/ComponentManager.ts" />
/// <reference path="core/Entity.ts" />
/// <reference path="core/Game.ts" />
/// <reference path="core/Group.ts" />
/// <reference path="core/State.ts" /> //must be initialised AFTER group - typescript issue #599
/// <reference path="core/IChild.ts" />
/// <reference path="core/Signal.ts" />
/// <reference path="core/SignalBinding.ts" />
/// <reference path="core/Stage.ts" />

/// <reference path="components/AnimationManager.ts" />
/// <reference path="components/Box.ts" />
/// <reference path="components/Input.ts" />
/// <reference path="components/Sound.ts" />
/// <reference path="components/ArcadePhysics.ts" />

/// <reference path="file/Loader.ts" />
/// <reference path="file/DataLibrary.ts" />
/// <reference path="file/File.ts" />
/// <reference path="file/FileStore.ts" />
 
/// <reference path="core/StateConfig.ts" />
/// <reference path="core/StateManager.ts" />

/// <reference path="gameobjects/Sprite.ts" />
/// <reference path="gameobjects/StaticImage.ts" />
/// <reference path="gameobjects/Textfield.ts" />
/// <reference path="gameobjects/tilemap/Tile.ts" />
/// <reference path="gameobjects/tilemap/TileType.ts" />
/// <reference path="gameobjects/tilemap/TileMap.ts" />
/// <reference path="gameobjects/tilemap/TileMapLayer.ts" />

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

/// <reference path="plugins/gamefroot/TileMapConverter.ts" />

/// <reference path="renderers/CanvasRenderer.ts" />
/// <reference path="renderers/GLRenderer.ts" />
/// <reference path="renderers/GLShaders.ts" />
/// <reference path="renderers/GLTexture.ts" />
/// <reference path="renderers/GLArrayBuffer.ts" />
/// <reference path="renderers/GLElementArrayBuffer.ts" />
/// <reference path="renderers/WebGL.d.ts"/>

/// <reference path="system/Bootstrap.ts" />
/// <reference path="system/Browser.ts" />
/// <reference path="system/Device.ts" />

/// <reference path="textures/TextureAtlas.ts" />
/// <reference path="textures/TextureLibrary.ts" />
/// <reference path="textures/SpriteSheet.ts" />
/// <reference path="textures/SingleImage.ts" />

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

/**
* Module - Kiwi (Core)
* The top level namespace in which all core classes and modules are defined.
* @module Kiwi
* @main Kiwi
*/

module Kiwi {

    export var VERSION: string = "1.0";
    
    export var RENDERER_CANVAS: number = 0;
    export var RENDERER_WEBGL: number = 1;
    
    export var TARGET_BROWSER: number = 0;
    export var TARGET_COCOON: number = 1;
  

    export var DEBUG_ON: number = 0;
    export var DEBUG_OFF: number = 1;

    export var DEVICE: Kiwi.System.Device = null;

    export var ADDED_TO_STATE:number = 0;
    export var ADDED_TO_LAYER:number = 1;
    export var ADDED_TO_GROUP:number = 2;
    export var ADDED_TO_ENTITY:number = 3;
    export var REMOVED_FROM_STATE:number = 4;
    export var REMOVED_FROM_LAYER:number = 5;
    export var REMOVED_FROM_GROUP:number = 6;
    export var REMOVED_FROM_ENTITY:number = 7;

    export var STATE:number = 0;
    export var LAYER:number = 1;
    export var GROUP:number = 2;
    export var ENTITY: number = 3;
    export var CAMERA: number = 4;
    export var HUD_WIDGET: number = 5;
    export var TILE_LAYER: number = 6;

    
    /**
    * The GameManager maintains a list an array of all instances of Kiwi games within a single document.
    *  
    * @class GameManager
    * 
    */

    export class GameManager {

        public objType() {
            return "GameManager";
        }

        private static _games: Kiwi.Game[] = [];

        public static register(game: Kiwi.Game): number {

            return Kiwi.GameManager._games.push(game);

        }

        public static total(): number {
            return Kiwi.GameManager._games.length;
        }

    }
    
}

