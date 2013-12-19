Release Notes 0.5.3

Kiwi.js (BETA)
=====

###HTML5 game library written in TypeScript/Javascript
-----------------------------------------------------------------

version 0.5.3

###Release notes for this version

####New Features
None
    
####Bug Fixes and changes

- Audio Bug Fix - Audio Tag's should no longer be 'unmuted' regardless of the Audio Managers muted state upon instantiation.

- Groups Bug Fix - Parents are now set when using 'addChildBefore' and 'addChildAfter' methods. This was producing errors/making the game crash when objects were destroyed. 

- Arcade Physics Update - Seperation code now calculating based off a hitbox.

- Nice Error Messages - Sprite/Static Images now produce 'none' game breaking (and nicer) error messages when a TextureAtlas passes doesn't exist. Previous would 'kill' the game. 

- Creating a game with a State - You can now create a game without passing a state. Previously the game would crash due to the Camera Manager Render method. Where now only executed if there is a current state. 

- Box Component Updates 
     - Now you can now get the hitbox offsets. 
     - There are 'two' new read only rectangles.
          - worldHitbox - a transformed hitbox using 'world' coordinates instead of local ones.
          - worldBounds - a normal hitbox using 'world' coordinates instead of local ones. 
     
- Input/Arcade Physics - Due to the Box Component updates the input/arcade physics have been updated to use world coordinates accordingly.

- API Documentation - namespace attribute added to classes/modules so that yuidocs compilation is now smarter and classes with the same class name but different namespaces don't override one another.

- WebGL
    - WebGL is under intensive development at the moment. A large part of the GL rendering has been refactored. Refactoring is still underway to allow multiple renderer types, using any number of shaders, for custom game objects such tilemaps, particles, bitmap text etc. Currently only Sprites are supported. 
    - Major change to texture management, including dynamic texture memory management (important for mobile and low spec devices)
    - Many optimisations.
    - Many small changes.
    - Many bugfixes.
    - Tested successfully via cocoon on Android devices, Ipad2, Ipad3
    - Commenting is in an inconsistent state due to mid-refactor of some areas.
    



####Changes to API pre-exisiting API in this release
- none




-------------------------------------------------------------------

See [Kiwijs.org](http://kiwijs.org) for more information about using Kiwi.js to build games, including some getting started examples. Note: this release is a beta and is not intended as a preview only and not for building production games at this stage.

[Getting Started Tutorials](http://www.kiwijs.org/documentation/getting-started/)  
[Code Examples](http://www.kiwijs.org/examples/)  
[API Documentation](http://api.kiwijs.org/)  
[Contact](http://www.kiwijs.org/help/)  

###Aim

* An opensource TypeScript/Javascript library for game creation
* Targeting native mobile apps as well as both desktop and mobile browsers
* Future focused
* WebGL and 2D Canvas rendering
* Support for Cocoon.js as a native mobile app deployment solution 

###License

* GPL 2

###Features

These features are either currently supported or very close to being supported. Many more features are in the pipeline.

* State Management
* Extensible game objects (such as sprites)
* Entity/Component system
* 2D Canvas 
* 2D WebGL rendering (experimental)
* Target Cocoon.js (experimental)
* Full nested display list
* HTML5 HUD
* Tween Engine (based on Tween.js)
* Signals
* Spritesheets, Texture Atlases and Tilemaps
* Multitouch support
* Geometry Utilities
* Plugin System
* Arcade Physics
* File Management and loading
* Clocks and Timers

###RoadMap

Within the next few weeks

* API documentation
* Improved build support (grunt)
* Lots of examples
* Many bug fixes and improved robustness

Within the next few months

* Plugins and products
* Much optimisation

###Build

Kiwi.js is currently using Typescript 9.0.1
Either - use Visual Studio/TS extension. There are csproj files for both the main project and also the examples.
Or - use the grunt file. This requires installing node.js, and the grunt CLI package. 

The csproj and grunt compilation methods both output a single kiwi.js file in /build
Grunt will also create a min.js version and also output a kiwi.d.ts definition file in /build as well
Shortly there will be further grunt options for dev builds and for compiling the documentation using YUIDoc


###Contribution

We'd love you to get involved in making the Kiwi.js library. If you'd like to contribute please get in touch, clone the repo and have a dig around. Full contributor guidelines will be here soon along with detailed build instructions.

###Main Contributors

Ben Harding  
Richard Davey  
Ross Kettle  

Kiwi.js also uses code from a number of open source projects. Effort has been made to clearly identify authors in the code comments. If you notice and missing or incorrect attribution please let us know.	