WORK IN PROGRESS
================
* Remove this header for release

Kiwi.js 1.1.1
=============

![Splash](http://kiwi-js.s3.amazonaws.com/wounds-with-friends.jpg) 

Kiwi.js is the worlds easiest to use Open Source HTML5 game framework for making both mobile and desktop HTML5 browser games. 

Our focus is blazingly fast WebGL rendering and complimentary tools to make professional quality serious games. We use [CocoonJS](https://www.ludei.com/) for publishing games and App creation. 

Version: 1.1.1 "Shigeru"

- Visit the [Official Website](http://www.kiwijs.org/documentation/getting-started/)
- Follow us on [Twitter](http://www.twitter.com/kiwijsengine)
- Explore Source code for [Kiwi.js examples](http://www.kiwijs.org/examples/)  
- Read our [API Documentation](http://api.kiwijs.org/) 
- Browse our Plugin Repository
- [Contact](http://www.kiwijs.org/help/) us for more information


##Welcome to Kiwi!  


Born out of a desire to democratize HTML5 game development and to make something that we love available to the masses, we bring you Kiwi.js.

We don’t mean to brag (too much), but Kiwi.js is fast. With hardware accelerated WebGL rendering, you can expect your games to be easily deployed across mobile and desktop browsers. But wait, they can also be deployed to mobile devices as native apps, using the [CocoonJS](https://www.ludei.com/) framework.

Our mission is to follow the best open source community practices. We’re backing that up by providing professional support when its needed, so everyone — commercial developers as well as indies — feel the love.

And we do think you’re going to feel the love. What couldn’t you love about a game engine that is named after a fluffy adorable bird *and* one of the world’s greatest game inventors?


##How to Guides

Have you ever been trying to figure out how to do something on a website and the help pages resemble a [Goosebumps](https://en.wikipedia.org/wiki/Goosebumps) choose your own adventure book? So have we, which is why we have spent literally hundreds of hours writing good help documents for Kiwi.js developers.

Our [Official Documentation Codex](http://www.kiwijs.org/documentation/getting-started/) is here if you do get stuck.


## Release Notes for this Version

### v1.1.1

#### Bug Fixes

* Blend modes now work correctly in CocoonJS when `deviceTarget: Kiwi.TARGET_COCOON` is set. Fixing a number of bugs.
* Methods on an number of Geometric Objects (such as the 'angleTo' method on Points) have been fixed.
* Mouse events (down, up, scrollwheel and move) now prevent the default action from being taken. 
* For CocoonJS the default stage colour is now '#000000'. This is because even if your game doesn't fill the entire game, the WebGL renderer will use this colour to fill all parts outside of the screen. 

More details on the problems solved can be found on the [Kiwi.JS repo](https://github.com/gamelab/kiwi.js) under the [1.1.1 milestone](https://github.com/gamelab/kiwi.js/issues?q=milestone%3Av1.1.1+is%3Aclosed)


## Release Notes for Previous Versions

### v1.1.0

#### New Features

* So much good stuff.
* Numerous aliases added to transformable objects. Transform sprites, groups, etc using these handy properties:
  * x, y
  * rotation
  * anchorPointX, anchorPointY (offset the point about which the object rotates and scales)
  * rotPointX, rotPointY (identical to anchorPoint)
  * scale, scaleX, scaleY (scale sets both scaleX and scaleY, but cannot be read back)
  * worldX, worldY (read-only; useful for objects inside groups)
  * `scaleToWidth( value )` or `scaleToHeight( value )` methods set the scale to fit Sprites, StaticImages, TextFields and TileMapLayers into a set width or height.
  * `centerAnchorPoint()` method moves the anchor point to the middle of a Sprite, StaticImage, TextField and TileMapLayers.
  * Because camera transformation is a more advanced topic, these aliases have not been applied to the camera.
* WebGL is now selected as default renderer. Go to full speed without wasting time on configs.
* Rectangle.copyTo method will now return a new Rectangle if called without a parameter.
* Tagging system for game objects (Groups, Sprites, StaticImages, TextFields, and TileMapLayers):
  * `addTag()` and `removeTag()` methods accept any number of Strings as parameters
  * `hasTag()` method checks for tags
  * `Group.getChildrenByTag` method available
* Group member selections enhanced:
  * `getAllChildren()` method available
  * `getChildByName()` and `getChildByID()` have the option to examine sub-groups
* Substantial revision of the WebGL rendering engine to support future features.
  * Game objects can now safely perform canvas texturing operations during `renderGL()`.
  * GLBlendMode object added. Now you can set blend modes in WebGL quickly and safely.
  * Texture management revised to support multi-texture shaders.
  * Runtime GPU memory management uses a new algorithm, although we do need to do more work on this.
  * Vast profusion of new shader options opens up.
* When switching States, all cameras are reset to default.
  * CameraManager now has functions `zeroCamera( camera )` and `zeroAllCameras()`.
* New time-related properties on Kiwi.Game objects for your convenience:
  * `game.frame` tells you how many frames have been rendered since the game launched.
  * `game.idealFrame` tells you how many frames _should_ have rendered since the game launched. Use this to drive smooth cyclic animations.
  * `game.time.rate` tells you how long the last frame took to render, relative to how long it _should_ have taken at the current framerate. For example, this should ideally always be 1.0, but if your 60fps game is running at 30fps, it will be 2.0. Use this to create smooth movement, multiplying distances by game.time.rate.
  * `game.framerate` now cannot be 0.
  * MasterClock drives several of these properties behind the scenes.
* `Stage.color` now accepts RGBA input (as well as RGB values). This allows you to make a transparent game over other page content.

#### Bug fixes

* TileMapLayer objects now render correctly with scaled and rotated cameras. Technically you can also scale and rotate TileMapLayers, but this does not yet update physics, so you should only use it for cosmetic objects.
* Touch input no longer assumes 11 fingers, preventing a bug where touch was always down. Thanks to @ic5y for the catch.
* TextField now aligns text correctly in all situations, including a bug where Group scaling in Canvas mode would incorrectly position text; and updates properly in CocoonJS.
* WebGL now properly clears video memory when swapping states, preventing eventual instability. Garbage collection was optimised during State transitions.
* Fixed bug where some Geom objects accidentally swapped x and y while doing geometry. Note: `Math.atan2` takes arguments in the order `y, x`. Yes, it's silly. Yes, you have to do it.
* MasterClock now reports a correct delta, rather than always returning 0.1ms.
* CocoonJS input now works properly. You are required to have no DOM elements in your HTML body for this to work.
* Touch input now no longer reports two `onUp` events per touch. Issue may still persist on default Android browser.
* Prevent switching a State while another State is loading.
* `Group.getRandom()` now returns proper results. 
* Groups now correctly respect child position when the group has a non-zero anchor point.
* Stage offset is correctly calculated, allowing for correct input positions.
* Numerous small corrections to documentation: API reference is much more accurate.

#### Deprecations and Removals

* Examples have been moved to a new repo, reducing the size of Kiwi.js repo downloads.
* Deprecated `willRender` flag on all objects. It now maps to `visible`, which serves the same purpose.
* Deprecated `dirty` flag on Box and Camera objects. It didn't do anything and at worst was an unnecessary check.
* Deprecated `removeFirstAlive`, `getFirstAlive`, and `getFirstDead` methods on Group objects. They still function, but are of extremely limited use.

### v1.0.1

#### Bug Fixes and Changes 

* Thanks to @zzarcon the Grunt file now has more clarity.
* @tjwudi has pushed up numerious fixes to the Documentation!
* Bug fix where multiple debug canvases could be generated from subsequent 'createDebugCanvas' calls. 
* The debug canvas now responds to the "scaleType" property on the 'Stage'.
* Tilemap layers no longer return error messages about the cellIndex. 
* Groups now use correct rotation point, as does the Camera and the State. 
* Fixed a bug where the HUDIcon would not work with Textures use a Canvas.   
* Canvas renderer now behaves more like the WebGL renderer. 
* Fixed a WebGL bug where alphas between 0 and 1 made the page background color bleed through.
* The WebGL renderer now clears every frame which solves the bug where nothing would appear.
* Textures that are set to 'dirty' are now re-uploaded to video memory. This fixes other bugs, such as the Textfield not working in WebGL.
* Visibility flag now works correctly with groups: no children are rendered.
* Visibility flag now works correctly under WebGL renderer.
* Upgraded Kiwi.js to use Typescript version 1.0.0. 

##Features

####Powerful Rendering
Kiwi uses a custom built WebGL rendering system for targetting modern mobile and desktop browsers as well as mobile apps through [CocoonJS](https://www.ludei.com/).

Not only is Kiwi lightning quick but it is also extendable, meaning that fellow contributors can easily write their own powerful rendering Plugins and Add-ons using WebGL Shaders. For instance our WebGL Particle Plugin creates stunning special FX using this system.

Of course, you can render to canvas too, which means older browsers, and mobile browsers, don't miss out.

####Mobile Publishing
Kiwi.js is closely aligned with Ludei's [CocoonJS](https://www.ludei.com/). You can use Cocoon to wrap up your game and play it on iOS or Android devices.

####State Management
A state management system lets you easily move between and manage game states. Each state has an optional preloader phase, a create phase, an update loop, and a destroy phase. Each of the phases are highly configurable.

####Flexible Asset Loading and Management
It's easy to load in images, sound and data. You can decide when you want it to load (e.g. in a single payload at the beginning, or on a per state basis). When your assets are loaded they're super easy to access from data libraries.

####Gameobjects - Sprites, Images, Textfields 
Gameobjects are objects that get rendered in your game. Whether they're frame-based sprites, webGL particles, static images or textfields, they all can be moved in the game world and placed in the scene graph.

####Entity/Component system
Each gameobject is an "Entity" and can have "components" attached to it. Components are small pieces of code that do something useful. For instance the arcade physics system is implemented as a component. If you want your game object to use physics, simply attach a physics component to it. Some of the standard gameobjects have components such as animation already attached. You can also write your own components.

####Scenegraph (Grouping objects)
The scenegraph represents all of the gameobjects that visible in your gameworld. You can group objects, and place groups within groups. You can animate and move your objects and groups and they'll behave in a consistent manner depending on how they are nested.

####Animation
Sprites have an animation component that enables frame by animation from spritesheets and texture atlases. You can easily define frame sequences and frame lengths, play, pause, loop and reverse animations. There is also a built in tweening system.

####Input (Including Touch)
Kiwi.js supports input for mouse, keyboard and of course touch. Mouse and touch events are easily handled by Kiwi.js pointer objects, so in most cases you don't have to worry about where the input is coming from.

####Camera 
Your game world is viewed through a controllable camera, which you can move and spin.

####Tilemaps
Kiwi.js has support for tilemaps, including multiple tile layers. The Tiled map data format is supported, including isometric tiles. You can programatically generate tile maps, and once a tile map is created you can easily manipulate the data to change the tilemap dynamically.

####Audio
Kiwi.js supports the WebAudio api, and falls back to using `<audio>` tag when it is not available. Audio sprites are also supported, unless of course your device happens to be some weird futuristic ghetto blaster.

####Monitization
As fellow game developers we know what it is like to be hungry, shivering on the corner holding a can of change in one hand and a damp “will code for cash” cardboard sign in the other. 

Because of this, creating an In-App Purchasing Plugin to allow you to monetize your games was a top priority and is available now.

[CocoonJS](https://www.ludei.com/) users can easily sell add a virtual currency to consumable goods via the AppStore


####Plugin System
As part of our dedication to open source principles, the plugin system lets developers extend many aspects of Kiwi.js. The rules around creating them are unobtrusive, making plugins easy to create and attach. Plugins will soon be able to be sold in the upcoming Kiwi.js marketplace.

####Integration with powerful tools
Kiwi.js is part of a larger ecosystem of products which will enable you to create games and game content using specialised tools such as the Gamefroot cloud based game building solution. [Because you can never get enough power](https://www.youtube.com/watch?v=YQwYNca4iog) 



##Getting Started

![Splash](http://kiwi-js.s3.amazonaws.com/html5-conference-game.png)

There are several ways to get started, starting from scratch is the generally accepted way to go about this, but if you want to get up and running even faster, Kiwi.js "Blueprint" games will help get your game building experience off to a flying start.

Choose from any of the following:
- [HTML5 match-three game](http://www.kiwijs.org/documentation/blueprints/html5-match-three-game-blueprint/)
- [HTML5 hidden object](http://www.kiwijs.org/documentation/blueprints/hidden-object-blueprint/)
- [HTML5 dressup game](http://www.kiwijs.org/documentation/blueprints/dress-up-blueprint/)
- [HTML5 breakout game](https://github.com/gamelab/Match-Three-Blueprint)
- [HTML5 roguelike game](http://www.kiwijs.org/?p=4109)
- [HTML5 distance flyer game](http://www.kiwijs.org/documentation/blueprints/distance-flyer-blueprint/)
- HTML5 top-down game (in dev coming soon)
- HTML5 platform game (in dev coming soon)
- HTML5 crossword (in dev coming soon)
- HTML5 tower defense (in dev coming soon)
- HTML5 poker game (in dev coming soon)

There will be an ever increasing library of free and premium blueprints to get you started.

##Starting from scratch

The easiest way to start with a blank game is to take a copy of the `/gameTemplate` folder. This contains a recommnded folder structure and all default files already in place.

You will need to use a web server to open the index file.

A more advanced, but still simple, way to create a blank game is to use the [Kiwi.js Yeoman Generator](https://github.com/gamelab/generator-kiwigame). This will create build files and other goodies for you as well.



###Viewing the examples

We have a throng of examples. So many, in fact, that one kiwi got tired carrying them all. As generous souls, we put them in their own repo. Check out the [examples repo](https://github.com/gamelab/examples) and look in `tutorials/core`.



###What's in this repo?

Note: If you just want to use the framework, the kiwi.js and kiwi.min.js files are located in the `/build` folder, and the docs in the `/docs` folder, and there is a template game in the `/templateGame` folder. You probably don't need to worry about the rest of the repo! 

###Folders

* build - The kiwi.js and kiwi.min.js files  
* src - The kiwi.js framework source code
* docs - API documentation on the Kiwi.JS framework.
* docstyles - Used to store assets for building docs.
* templateGame - An example TemplateGame to help you on your way to developing a Kiwi.JS game.  

###Files

* .gitignore - mask files from git
* bower.json - see below about bower installation
* grunfile.js - used for building the framework
* license.txt - The MIT license 
* package.json - the npm package used for installing dev dependencies
* README.md - this file!
* tslint.json - the tslint configuration file


![Splash](http://html5experts.jp/wp-content/uploads/2013/11/image05.png)

##Getting and building the library

###Bower
If you use the [Bower](http://bower.io/) package manager you can install kiwi.js with
```
bower install kiwijs
```

###Yeoman
If you use the [Yeoman](https://github.com/gamelab/generator-kiwigame) scaffolding system you can install a blank kiwi.js game with

```
yo kiwigame
```

It's best to look at our Yeoman Game Generator repo for full details.


###Using Grunt


This requires installing node.js, and the grunt CLI package. 
There are a few thing you can do with grunt, including linting and compiling the typescript, uglifying the result and compiling the docs.

To build, lint and uglify use the default
```
grunt
```

To do all of the above plus compile the docs
```
grunt full
```

To just build the docs
```
grunt docs
```

The csproj and grunt compilation methods both output a single kiwi.js file in `/build`
Grunt will also create a min.js version and also output a kiwi.d.ts definition file in `/build` as well

###Building Kiwi manually

You don't need to build the library to use it. The repo has prebuilt files in the `/build` folder.

Kiwi.js is currently using Typescript 1.0.0
Either - use Visual Studio/TS extension. There are csproj files for the main project.

##Extending Kiwi.js

You want Plugins? [We got Plugins!](http://www.kiwijs.org/documentation/kiwi-js-plugin-tutorials/).

The concept of Plugins, and how they might apply to game creation, is something we're very interested in. Years of working in the open source space and hacking open source tools has provided us with the qualifications necessary to create a system that works for you.

We built Kiwi.js from the ground up as a plugable system. You can add multiple plugins to your game, or write plugins yourself. Soon, you'll even be able to sell your own plugins in the Kiwi.js marketplace.

Kiwi.js is built in such a way that your plugins can do very simple or very powerful things. For example:


- A utility plugin, such as an inventory for keeping track of items a player has collected.
- A gameobject plugin, that creates programmable tower defense unit.
- A component plugin, such as a specialised physics system that can be applied to any gameobject.
- A rendering plugin, that creates new renderers and WebGL shaders that give your game an entirely different look.
- A service plugin, such as an ad-network or in-app purchasing system.
- Stop your bathtub from automatically draining whenever you try to take a bath.

To learn about building Plugins view the tutorials on [kiwijs.org](http://www.kiwijs.org/documentation/tutorials/what-are-plugins-in-kiwi-js/). You can also get started with Plugins using the Kiwi.js [Yeoman Plugin Generator](https://github.com/gamelab/generator-kiwiplugin). 


##Tools

### Visual Game Maker
Gamefroot is the worlds most powerful and easy to use browser-based game editor.

We've partnered with [Gamefroot](http://gamefroot.com/leveleditor) and we're pleased to let you know that Kiwi.js integration is in development and coming your way soon.

Stay tuned for more updates and more tools!

##Roadmap

Here are some of the features planned for future releases.

- Multiplayer capability (yup, that's right!)
- WebGL lighting
- Productivity tools!
- Advanced physics engine
- Multiple cameras with filters
- A whole new world!

##Contributing

We'd love for you to get involved and help make Kiwi.js the best damn game framework in the world! If you'd like to contribute please get in touch, fork/clone the repo and have a dig around.

- If you find a bug then please report it on GitHub issues
- If you have feature request, or have written a game or demo that shows Kiwi in use then please get in touch. We'd love to hear from you! Please email: dan@gamefroot.com
- If you have a pull request for Kiwi, please only do so against the dev branch and not against the master branch. 
- Before submitting a Pull Request please run your code through JSHint to check for stylistic or formatting errors.

##Bugs?

If you discover a bug and find yourself wanting to jump in and help make the world of HTML5 gaming a better, less buggy, place, please add said bug to our issues tracker with as much information as possible, especially source code demonstrating the issue.

https://github.com/gamelab/kiwi.js/issues/new

##Community

A massive shoutout to our contributors on Github!

- Ross Kettle @rosskettle
- Ben Harding @BenjaminHarding
- Phil Wickliffe @stupidlikeafox
- Zach Frieberg @zacharyf1991
- Locky Reid @lockyreid
- Ido Yehieli @tametick
- Ellison Leão @ellisonleao
- Kevin Johnson @cavemanpi
- Dan Milward @danmilward
- Julien Castelain @julien
- Benjamin D. Richards @BenjaminDRichards
- @ic5y
- Hector Zarco Garcia @zzarcon
- John Wu @tjwudi

*Kiwi.js also uses code from a number of open source projects. Effort has been made to clearly identify authors in the code comments. If you notice and missing or incorrect attribution please let us know.*


##License

* MIT (see `license.txt` for details)
