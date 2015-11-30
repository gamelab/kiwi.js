# WORK IN PROGRESS - REVISE BEFORE RELEASE

Kiwi.js 1.4.1
=============

![Splash](http://kiwi-js.s3.amazonaws.com/wounds-with-friends.jpg)

Kiwi.js is the world's easiest to use Open Source HTML5 game framework for making both mobile and desktop HTML5 browser games.

Our focus is blazingly fast WebGL rendering and complementary tools to make professional quality serious games. We use [CocoonJS](https://www.ludei.com/) for publishing games and App creation.

Version: 1.4.1 "Cole"

- Visit the [Official Website](http://www.kiwijs.org/documentation/getting-started/)
- Follow us on [Twitter](http://www.twitter.com/kiwijsengine)
- Explore [examples for Kiwi.js](http://examples.kiwijs.org/)
- Read our [API Documentation](http://api.kiwijs.org/)
- Browse our Plugin Repository
- [Contact](http://www.kiwijs.org/help/) us for more information

##Welcome to Kiwi!

Born out of a desire to democratize HTML5 game development and to make something that we love available to the masses, we bring you Kiwi.js.

We don't mean to brag (too much), but Kiwi.js is fast. With hardware accelerated WebGL rendering, you can expect your games to be easily deployed across mobile and desktop browsers. But wait, they can also be deployed to mobile devices as native apps, using the [CocoonJS](https://www.ludei.com/) framework.

Our mission is to follow the best open source community practices. We're backing that up by providing professional support when its needed, so everyone — commercial developers as well as indies — feel the love.

And we do think you're going to feel the love. What couldn't you love about a game engine that is named after a fluffy adorable bird *and* one of the world's greatest game inventors?

##How to Guides

Have you ever been trying to figure out how to do something on a website and the help pages resemble a [Goosebumps](https://en.wikipedia.org/wiki/Goosebumps) choose your own adventure book? So have we, which is why we have spent literally hundreds of hours writing good help documents for Kiwi.js developers.

Our [Official Documentation Codex](http://www.kiwijs.org/documentation/getting-started/) is here if you do get stuck.


## Release Notes for this Version

Number tags refer to [GitHub issues](https://github.com/gamelab/kiwi.js/issues).

### v1.4.1 "Cole"

#### Bug Fixes

More details can be found on the [Kiwi.JS repo](https://github.com/gamelab/kiwi.js) under the [1.4.1 milestone](https://github.com/gamelab/kiwi.js/issues?q=milestone%3Av1.4.1+is%3Aclosed)

## Previous Changes
View the [changelog](https://github.com/gamelab/kiwi.js/blob/master/CHANGELOG.md) for a list of changes from previous versions.

##Features

####Powerful Rendering
Kiwi uses a custom built WebGL rendering system for targeting modern mobile and desktop browsers as well as mobile apps through [CocoonJS](https://www.ludei.com/).

Not only is Kiwi lightning quick but it is also extendible, meaning that fellow contributors can easily write their own powerful rendering Plugins and Add-ons using WebGL Shaders. For instance our WebGL Particle Plugin creates stunning special FX using this system.

Of course, you can render to canvas too, which means older browsers, and mobile browsers, don't miss out.

####Mobile Publishing
Kiwi.js is closely aligned with Ludei's [CocoonJS](https://www.ludei.com/). You can use Cocoon to wrap up your game and play it on iOS or Android devices.

####State Management
A state management system lets you easily move between and manage game states. Each state has an optional preloader phase, a create phase, an update loop, and a destroy phase. Each of the phases are highly configurable.

####Flexible Asset Loading and Management
It's easy to load in images, sound and data. You can decide when you want it to load (e.g. in a single payload at the beginning, or on a per state basis). When your assets are loaded they're super easy to access from data libraries.

####Gameobjects - Sprites, Images, Textfields
Gameobjects are objects that get rendered in your game. Whether they're frame-based sprites, webGL particles, static images or text fields, they all can be moved in the game world and placed in the scene graph.

####Entity/Component system
Each gameobject is an "Entity" and can have "components" attached to it. Components are small pieces of code that do something useful. For instance the arcade physics system is implemented as a component. If you want your game object to use physics, simply attach a physics component to it. Some of the standard gameobjects have components such as animation already attached. You can also write your own components.

####Scene Graph (Grouping objects)
The scene graph represents all of the gameobjects that visible in your gameworld. You can group objects, and place groups within groups. You can animate and move your objects and groups and they'll behave in a consistent manner depending on how they are nested.

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

####Monetization
As fellow game developers we know what it is like to be hungry, shivering on the corner holding a can of change in one hand and a damp "will code for cash" cardboard sign in the other.

Because of this, creating an In-App Purchasing Plugin to allow you to monetize your games was a top priority and is available now.

[CocoonJS](https://www.ludei.com/) users can easily add a virtual currency to consumable goods via the AppStore.

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

There will be an ever increasing library of free and premium blueprints to get you started.

##Starting from scratch

The easiest way to start with a blank game is to take a copy of the `/gameTemplate` folder. This contains a recommended folder structure and all default files already in place.

You will need to use a web server to open the index file. We suggest XAMPP, WAMP or MAMP.

A more advanced, but still simple, way to create a blank game is to use the [Kiwi.js Yeoman Generator](https://github.com/gamelab/generator-kiwigame). This will create build files and other goodies for you as well.

###Viewing the examples

We have a throng of examples. So many, in fact, that one kiwi got tired carrying them all. As generous souls, we put them in their own repo. Check out the [examples repo](https://github.com/gamelab/examples) and look in `tutorials/core`.

Also, don't forget to check out the [examples site](http://examples.kiwijs.org/) where we demo all the library features and the cool plugins available to you.

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
* gruntfile.js - used for building the framework
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

This requires installing node.js, and the grunt CLI package. There are a few thing you can do with grunt, including linting and compiling the typescript, uglifying the result and compiling the docs.

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

###Using Visual Studio

* Requires Microsoft Visual Studio 2013 or later.
* Install the TypeScript plugin.

There are csproj files for the main project.

We advise that you build using Grunt, as this will correctly concatenate certain additional files.

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

- Productivity tools!
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
- Ryan Loader @RaniSputnik
- @rydairegames
- @benliddicott
- Kevin Kirsche
- Andrew Murray @radarhere

*Kiwi.js also uses code from a number of open source projects. Effort has been made to clearly identify authors in the code comments. If you notice and missing or incorrect attribution please let us know.*

##License

* MIT (see `license.txt` for details)
