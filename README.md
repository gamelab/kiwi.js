Kiwi.JS 1.0.0
============

![Splash](docstyles/splash.png)

Kiwi.JS is the worlds easiest to use Open Source HTML5 game framework for making both mobile and desktop browser games. Our focus is blazingly fast WebGL and Canvas rendering. Our mission is to foster an open source community and democratize game creation!! 

- [Getting Started Tutorials](http://www.kiwijs.org/documentation/getting-started/)  
- [Code Examples](http://www.kiwijs.org/examples/)  
- [API Documentation](http://api.kiwijs.org/)  
- [Contact](http://www.kiwijs.org/help/)  

Visit our homepage [www.kiwijs.org](http://kiwijs.org) for more information about using Kiwi.JS to build your next game, on our site you'll find plenty of examples and tutorials to get you started.
    
##Release - Version 1.0.0

- This is the first major version of Kiwi.js.

##Welcome to Kiwi.JS!! 

Kiwi.js is the core opensource HTML5 game framework that is at the center of a game creation ecosystem.

The Kiwi framework features the support for regular canvas rendering, but also blazing fast hardware accelerated WebGL rendering.

As you'd expect your games can be deployed to desktop or mobile browsers, however they can also be deployed to mobile devices as native apps, using the Cocoon.js framework.

This means you can use Javascript to write native mobile games that take advantage of hardware accelerated WebGL.

Kiwi.js is highly extendable and flexible

##Features

###Powerful Rendering
Kiwi.js uses a built in WebGL rendering system for targetting desktop browsers and mobile apps(through Cocoon.js). The system is pluggable and extendable, meaning contributors can write there own powerful rendering extensions using WebGL Shaders. For instance the WebGL Particle plugin creates stunning special FX using this systme.

Of course, you can render to canvas too, which means older browsers, and mobile browsers, don't miss out.

###Cocoon.js - Publish to Mobile
Kiwi.js is closely aligned with Ludei's Cocoon.js system. You can use cocoon to wrap up your game and play it on iOS or Android devices.

###State Management
A state management system lets you easily move between and manage game states. Each state has an optional preloader phase, a create phase, an update loop, and a destroy phaase. Each of the phases are highly configurable.

###Flexible Asset Loading and Management
It's easy to load in images, sound and data. You can decide when you want it to load (eg in a single payload at the beginning, or on a per state basis). When your assets are loaded they're super easy to access from data libraries.

###Gameobjects - Sprites, Images, Textfields 
Gameobjects are objects that get rendered in your game. Whether they're frame-based sprites, webGL particles, static images or textfields, they all can be moved in the game world and placed in the scene graph.

###Entity/Component system
Each gameobject is an "Entity" and can have "components" which attached to it. Components are small pieces of code that do something useful. For instance the arcade physics system is implmented as a component. If you want your game object to use physics, simply attach a physics component to it. Some of the standard gameobjects have components such as physics already attached. You can also write your own components.

###Scenegraph (Grouping objects)
The scenegraph represents all of the gameobjects that visible in your gameworld. You can group objects, and place groups within groups. You ca animate and move your objects and groups and they'll behave in a consistent manner depending on how they are nested.

###Animation
Sprites have an animation component that enables frame by animation from spritesheets and texture atlases. You can easily define frame sequences and frame lengths, play, pause, loop and reverse animations. 
There is also a built in tweening system.

###Input (Including Touch)
Kiwi.js supports input for mouse, keyboard and of course touch. Mouse and touch events are easily handled by Kiwi.js pointer objects, so in most cases you don't have to worry about where the input is coming from.

###Camera 
Your game world is viewed through a controllable camera, which you can move and spin.

###Tilemaps
Kiwi.js has support for tilemaps, including multiple tile layers. The Tiled map data format is supported, including isometric tiles. You can programatically generate tile maps, and once a tile map is created you can easily manipulate the data to change the tilemap dynamically.

###Audio
Kiwi.js supports the WebAudio api, and falls back to using <audio> tage when it is not available. Audio sprites are also supported.

###Plugin System
The plugin system lets developers extend many aspects of Kiwi.js. The rules around creating them are unobtrusive, making them easy to both create and attach. Plugins can also be sold in the Kiwi.js marketplace.

###Integration with powerful tools
Kiwi.js is part of a larger ecosystem of products which will enable you to create games and game content using specialised tools such as the Gamefroot cloud based game making system.






##Lots of ways to get started

There are several ways to get started with a blank game template (see below), but if you want to get up and running even faster, Kiwi.js is building a library of "blueprint" games that will get your game building experience off to a flying start.

Blueprints are well on the way for genres such as
- platformer
- match-three
- top-down
- breakout,
- crossword
- distance flyer
- dressup
- endless runner
- hidden object
- tower defence
- poker

There will be an ever increasing library of free and premium blueprints to get you started.

###Lots of ways to extend

Kiwi.js is built from the ground up as a plugable system. You can add multiple plugins to your game, or write plugins yourself. You'll even be able to sell your own plugins in the Kiwi.js marketplace.

Kiwi.js is built in such a way that your plugins can do very simple or very powerful things. For example

- A utility plugin, such as an inventory for keeping track of items a player has collected.
- A gameobject plugin, that creates programmable tower defence unit.
- A component plugin, such as a specialised physics system that can be applied to any gameobject.
- A rendering plugin, that creates new renderers and WebGL shaders that give your game an entirely different look.
- A service plugin, such as an ad-network or in-app purchasing system.

To learn about building plugins view the tutorials on [kiwijs.org](http://www.kiwijs.org/documentation/tutorials/what-are-plugins-in-kiwi-js/)

You can also get started with plugins using the Kiwi.js plugin [Yeoman Generator](https://github.com/gamelab/generator-kiwiplugin). 

<p align="center">
  <img src="docstyles/rocket.png"/>
</p>

##Creating a blank game

The easiest way to start with a blank game is to take a copy of the `/gameTemplate` folder. This contains a recommnded folder structure and all default files already in place.

You will need to use a web server to open the index file.

A more advanced, but still simple, way to create a blank game is to use the [Kiwi.js Yeoman Generator](https://github.com/gamelab/generator-kiwigame). This will create build files and other goodies for you as well.

##Viewing the examples
The `/examples` folder contains a number of basic examples for you to try and to view the source code. In the next minor version of Kiwi.js these will be moved to a separate repo.

You will need to use a php web server to open the index file in the examples folder. This is a temporary arrangement, and when the examples are moved this will no longer be the case.


##What's in this repo?

Note: If you just want to use the framework, the kiwi.js and kiwi.min.js files are located in the `/build` folder, and the docs in the `/docs` folder, and there is a template game in the `/templateGame` folder. You probably don't need to worry about the rest of the repo! 

### Folders.

* build - The kiwi.js and kiwi.min.js files  
* src - The kiwi.js framework source code
* docs - API documentation on the Kiwi.JS framework.
* docstyles - Used to store assets for building docs.
* examples - These examples are soon to moved to a new repo and updated (See more info below)
* templateGame - An example TemplateGame to help you on your way to developing a Kiwi.JS game.  

### Files

* .gitignore - mask files from git
* bower.json - see below about bower installation
* grunfile.js - used for building the framework
* license.txt - The MIT license 
* package.json - the npm package used for installing dev dependencies
* README.md - this file!
* tslint.json - the tslint configuration file

##Bower
If you use the [Bower](http://bower.io/) package manager you can install kiwi.js with
```
bower install kiwijs
```

##Yeoman
If you use the [Yeoman](https://github.com/gamelab/generator-kiwigame) scaffolding system you can install a blank kiwi.js game with

```
yo kiwijs
```

It's best to look at our Yeoman Game Generator repo for full details.

##Building the library

You don't need to build the library to use it. The repo has prebuilt files in the `/build` folder. If you want to make changes to the library though, you'll need to keep reading.

Kiwi.js is currently using Typescript 0.9.5
Either - use Visual Studio/TS extension. There are csproj files for both the main project and also the examples.

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


##Contribute

We'd love you to get involved in making the Kiwi.JS game engine the best damn game framework in the world! If you'd like to contribute please get in touch, fork/clone the repo and have a dig around. Make pull requests on the dev branch.

If you discover a bug or find yourself just wanting to jump on in and help make this blueprint even better please file an issue and get stuck in. We're a friendly bunch and hope people find themselves wanting to get involved. 

https://github.com/gamelab/kiwi.js/issues/new

##Core Contributors

Ross Kettle  
Ben Harding  
Richard Davey  

Kiwi.JS also uses code from a number of open source projects. Effort has been made to clearly identify authors in the code comments. If you notice and missing or incorrect attribution please let us know.    


##License

* MIT
