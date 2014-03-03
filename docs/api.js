YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "GLRenderManager",
        "GLShaders",
        "GLTexture",
        "GLTextureManager",
        "IRenderer",
        "Kiwi.Animations.Animation",
        "Kiwi.Animations.Sequence",
        "Kiwi.Animations.Tween",
        "Kiwi.Animations.Tweens.Easing.Back",
        "Kiwi.Animations.Tweens.Easing.Bounce",
        "Kiwi.Animations.Tweens.Easing.Circular",
        "Kiwi.Animations.Tweens.Easing.Cubic",
        "Kiwi.Animations.Tweens.Easing.Elastic",
        "Kiwi.Animations.Tweens.Easing.Exponential",
        "Kiwi.Animations.Tweens.Easing.Linear",
        "Kiwi.Animations.Tweens.Easing.Quadratic",
        "Kiwi.Animations.Tweens.Easing.Quartic",
        "Kiwi.Animations.Tweens.Easing.Quintic",
        "Kiwi.Animations.Tweens.Easing.Sinusoidal",
        "Kiwi.Animations.Tweens.TweenManager",
        "Kiwi.Camera",
        "Kiwi.CameraManager",
        "Kiwi.Component",
        "Kiwi.ComponentManager",
        "Kiwi.Components.AnimationManager",
        "Kiwi.Components.ArcadePhysics",
        "Kiwi.Components.Box",
        "Kiwi.Components.Input",
        "Kiwi.Components.Sound",
        "Kiwi.Entity",
        "Kiwi.Files.DataLibrary",
        "Kiwi.Files.File",
        "Kiwi.Files.FileStore",
        "Kiwi.Files.Loader",
        "Kiwi.Game",
        "Kiwi.GameManager",
        "Kiwi.GameObjects.Sprite",
        "Kiwi.GameObjects.StaticImage",
        "Kiwi.GameObjects.Textfield",
        "Kiwi.GameObjects.Tilemap.TileMap",
        "Kiwi.GameObjects.Tilemap.TileMapLayer",
        "Kiwi.GameObjects.Tilemap.TileType",
        "Kiwi.Geom.AABB",
        "Kiwi.Geom.Circle",
        "Kiwi.Geom.Intersect",
        "Kiwi.Geom.IntersectResult",
        "Kiwi.Geom.Line",
        "Kiwi.Geom.Matrix",
        "Kiwi.Geom.Point",
        "Kiwi.Geom.Ray",
        "Kiwi.Geom.Rectangle",
        "Kiwi.Geom.Transform",
        "Kiwi.Geom.Vector2",
        "Kiwi.Group",
        "Kiwi.HUD.HUDComponents.Counter",
        "Kiwi.HUD.HUDComponents.Time",
        "Kiwi.HUD.HUDComponents.WidgetInput",
        "Kiwi.HUD.HUDDisplay",
        "Kiwi.HUD.HUDManager",
        "Kiwi.HUD.HUDWidget",
        "Kiwi.HUD.Widget.Bar",
        "Kiwi.HUD.Widget.BasicScore",
        "Kiwi.HUD.Widget.Button",
        "Kiwi.HUD.Widget.Icon",
        "Kiwi.HUD.Widget.IconBar",
        "Kiwi.HUD.Widget.Menu",
        "Kiwi.HUD.Widget.MenuItem",
        "Kiwi.HUD.Widget.TextField",
        "Kiwi.HUD.Widget.Time",
        "Kiwi.IChild",
        "Kiwi.Input.Finger",
        "Kiwi.Input.InputManager",
        "Kiwi.Input.Key",
        "Kiwi.Input.Keyboard",
        "Kiwi.Input.Keycodes",
        "Kiwi.Input.Mouse",
        "Kiwi.Input.MouseCursor",
        "Kiwi.Input.Pointer",
        "Kiwi.Input.Touch",
        "Kiwi.PluginManager",
        "Kiwi.Renderers.CanvasRenderer",
        "Kiwi.Renderers.GLArrayBuffer",
        "Kiwi.Renderers.GLElementArrayBuffer",
        "Kiwi.Signal",
        "Kiwi.SignalBinding",
        "Kiwi.Sound.Audio",
        "Kiwi.Sound.AudioLibrary",
        "Kiwi.Sound.AudioManager",
        "Kiwi.Stage",
        "Kiwi.State",
        "Kiwi.StateConfig",
        "Kiwi.StateManager",
        "Kiwi.System.Bootstrap",
        "Kiwi.System.Browser",
        "Kiwi.System.Device",
        "Kiwi.Textures.SingleImage",
        "Kiwi.Textures.SpriteSheet",
        "Kiwi.Textures.TextureAtlas",
        "Kiwi.Textures.TextureLibrary",
        "Kiwi.Time.Clock",
        "Kiwi.Time.ClockManager",
        "Kiwi.Time.MasterClock",
        "Kiwi.Time.Timer",
        "Kiwi.Time.TimerEvent",
        "Kiwi.Utils.Canvas",
        "Kiwi.Utils.Common",
        "Kiwi.Utils.GameMath",
        "Kiwi.Utils.RandomDataGenerator",
        "Kiwi.Utils.RequestAnimationFrame",
        "ShaderManager"
    ],
    "modules": [
        "Animations",
        "Components",
        "Easing",
        "Files",
        "GameObjects",
        "Geom",
        "HUD",
        "HUDComponents",
        "Input",
        "Kiwi",
        "Renderers",
        "Shaders",
        "Sound",
        "System",
        "Textures",
        "Tilemap",
        "Time",
        "Tweens",
        "Utils",
        "Widget"
    ],
    "allModules": [
        {
            "displayName": "Animations",
            "name": "Animations",
            "description": "Is the namespace in which all code that is used to create/provide an animation of various sorts are stored. These could range from animations that change the cell of a SpriteSheet that is displayed every few seconds (Animation/Sequence), to animations that change a numeric value on a object over a period time (Tweens)."
        },
        {
            "displayName": "Components",
            "name": "Components",
            "description": "Component's are a snipnets of code which are designed to provide extra functionality to various objects, such as IChild's/GameObjects/HUDWidgets/e.t.c. The code that components have are not necessarily needed for an object to work, but are instead provided to make common task's that you would do with those objects easier. An Example being that at times you may like to make a GameObject draggable by the user and so you can then add Input Component and execute the enableDrag on that GameObject. That would be task that not every GameObject would need, but only specific ones."
        },
        {
            "displayName": "Easing",
            "name": "Easing",
            "description": "Contains various methods that can be used when you are wanting to ease a Tween."
        },
        {
            "displayName": "Files",
            "name": "Files",
            "description": "Holds a reference to all of the data Files (json, xml, e.t.c) that are accessible on the State that this DataLibrary is on."
        },
        {
            "displayName": "GameObjects",
            "name": "GameObjects",
            "description": "The GameObject namespace holds classes which are designed to be added to a State (either directly, or as an ancestor of a Group) and are the Objects that are used when wanting to render anything visual onto the current State. Each GameObject is a representation of a particular item in a game and as such has information that corresponds to that item (like where they are in the 'GameWorld', the scale of the GameObject, who their parent is, e.t.c). For Example: If you wanted to have a massive background image then you can use the StaticImage GameObject, as that is a relatively light-weight object). Or if you had Player with an Animation, which user's could interactive with, then you would use a Sprite, which is more robust."
        },
        {
            "displayName": "Geom",
            "name": "Geom",
            "description": "Contains common classes whose applications deal with geometry or the collision of geometric shapes."
        },
        {
            "displayName": "HUD",
            "name": "HUD",
            "description": "The HUD (Heads Up Display) is a section that handles the displayment of information that you always want visible to user. \nThis section is managed differently to normal GameObjects, where the difference being that HUD items aren't added to a Canvas but are DOM elements instead. Since they DOM elements you can style these elements using a CSS sheet if you wish."
        },
        {
            "displayName": "HUDComponents",
            "name": "HUDComponents",
            "description": "HUDComponents are a space where components that are specific to HUDWidgets are kept. This are seperated from the normal Components section as the implementation of these are unique and only make sense when implemented on HUDWidgets, otherwise the concepts behind these are the same as normal Components."
        },
        {
            "displayName": "Input",
            "name": "Input",
            "description": "Section that contains the code related to handling user interaction with a game."
        },
        {
            "displayName": "Kiwi",
            "name": "Kiwi",
            "description": "Module - Kiwi (Core)\nThe top level namespace in which all core classes and modules are defined."
        },
        {
            "displayName": "Renderers",
            "name": "Renderers",
            "description": "Contains the classes which are related to the rendering of GameObjects."
        },
        {
            "displayName": "Shaders",
            "name": "Shaders",
            "description": "GLSL ES Shaders are used for WebGL rendering.\nShaderPair objects encapsulate GLSL ES vertex and fragment shader programs. \n  ShaderPairs contain the GLSL code, provide an interface to uniforms and attributes, and have the ability to link and compile the shaders.\nThe ShaderManager keeps track of each ShaderPair, and controls which one is bound for use at any particular time.\n  Only the ShaderManager can create ShaderPairs. When a renderer (see note on renderes below) requests a ShaderPair the ShaderManager will either\n      1) Return a reference to an already instantiated ShaderPair, and set the GL state to use the shader program or\n      2) Return a reference to a new ShaderPair, which will be linked and compiled and bound for use.\n  All ShaderPairs must be housed as properties of the Kiwi.Shaders object. \n\nKiwi.Renderer objects use a ShaderPair to draw.\n  They must request a ShaderPair from the ShaderManager.\n  Many renderers may use the same ShaderPair.\n  Some renderers may at different times use multiple ShaderPairs (only one is possible at any given time)"
        },
        {
            "displayName": "Sound",
            "name": "Sound",
            "description": "The namespace that holds all of the assets and functionality when dealing with Audio."
        },
        {
            "displayName": "System",
            "name": "System",
            "description": "Kiwi - System"
        },
        {
            "displayName": "Textures",
            "name": "Textures",
            "description": "Contains Objects that are used when dealing specifically with Textures/Images. Majority of these classes are for Internal Kiwi use."
        },
        {
            "displayName": "Tilemap",
            "name": "Tilemap",
            "description": "Is GameObject that contains the information held for a single Layer of Tiles, along with methods to handle the rendering of those Tiles. \nA TileMapLayer should not be directly created, but instead should be created through a TileMap object instead."
        },
        {
            "displayName": "Time",
            "name": "Time",
            "description": "Contains ways of tracking time within a game or application. Each game will have a ClockManager, MasterClock and a single Clock automatically generated for them upon game creation."
        },
        {
            "displayName": "Tweens",
            "name": "Tweens",
            "description": "The section of Kiwi which holds the scripts that manage Tween's in Kiwi. The scripts in this section are based on Tween.js by sole and have been converted to TypeScript and integrated into Kiwi. https://github.com/sole/tween.js"
        },
        {
            "displayName": "Utils",
            "name": "Utils",
            "description": "Utils is a space that holds a wide varity of useful methods."
        },
        {
            "displayName": "Widget",
            "name": "Widget",
            "description": "HUD Widgets are objects that are generally placed on to a HUD Display for displaying and managing information that the user would always need to see.\nAn example of such information would be: the Health remaining, amount of ammo left, time they have left, e.t.c.\nAnd each one of those examples would have its own widget."
        }
    ]
} };
});