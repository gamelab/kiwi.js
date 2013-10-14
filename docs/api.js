YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "AABB",
        "Animation",
        "AnimationManager",
        "ArcadePhysics",
        "Audio",
        "AudioLibrary",
        "AudioManager",
        "Back",
        "Bar",
        "BasicScore",
        "Bootstrap",
        "Bounce",
        "Box",
        "Browser",
        "Button",
        "Camera",
        "CameraManager",
        "Canvas",
        "CanvasRenderer",
        "Circle",
        "Circular",
        "Clock",
        "ClockManager",
        "Common",
        "Component",
        "ComponentManager",
        "Counter",
        "Cubic",
        "DataLibrary",
        "Device",
        "Elastic",
        "Entity",
        "Exponential",
        "File",
        "FileStore",
        "Finger",
        "GLArrayBuffer",
        "GLElementArrayBuffer",
        "GLRenderer",
        "GLShaders",
        "GLTexture",
        "Game",
        "GameManager",
        "GameMath",
        "Group",
        "HUDDisplay",
        "HUDManager",
        "HUDWidget",
        "IChild",
        "IRenderer",
        "Icon",
        "IconBar",
        "Input",
        "InputManager",
        "Intersect",
        "IntersectResult",
        "Key",
        "Keyboard",
        "Keycodes",
        "Line",
        "Linear",
        "Loader",
        "MasterClock",
        "Matrix",
        "Menu",
        "MenuItem",
        "Mouse",
        "MouseCursor",
        "Point",
        "Pointer",
        "Quadratic",
        "Quartic",
        "Quintic",
        "RandomDataGenerator",
        "Ray",
        "Rectangle",
        "RequestAnimationFrame",
        "Sequence",
        "Signal",
        "SignalBinding",
        "SingleImage",
        "Sinusoidal",
        "Sound",
        "Sprite",
        "SpriteSheet",
        "Stage",
        "State",
        "StateConfig",
        "StateManager",
        "StaticImage",
        "TextField",
        "Textfield",
        "TextureAtlas",
        "TextureLibrary",
        "Tile",
        "TileMap",
        "TileMapLayer",
        "TileType",
        "Time",
        "Timer",
        "TimerEvent",
        "Touch",
        "Transform",
        "Tween",
        "TweenManager",
        "Vector2",
        "WidgetInput"
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
            "description": "An area of the GameObjects section which deals specifically with the use of TileMap or items related with TileMaps."
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