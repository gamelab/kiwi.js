Release Notes 0.5.2

Kiwi.js (BETA)
=====

###HTML5 game library written in TypeScript/Javascript
-----------------------------------------------------------------

version 0.5.2

###Release notes for this version

####New Features
None
    
####Bug Fixes and minor changes
Audio 
  
  - 'isPlaying' property is now a more accurate representation of if an animation isPlaying.
    - Callbacks are now dispatched after the cell on the Sprite updates instead of before. Because of this the way it was being handled has updated.
    - The current animation no longer 'resets' to the first frame if the 'switchTo' is told the play the current animation.

- Audio
    - Mute/Volume bug fixed. Left over from removal of the DOM system.
    - Stop method reorganised. isPlaying set to false before onStop event dispatched to prevent sound playing issues.
    - Bug with the audio file data not being set in some case's has been fixed. 

- WebGL
    - Stage now resizing correctly

 
- Destroy method by default is executed at the end of the next update loop. Also you can switch the 'exists' property to 'false' to signal that the destroy method should be executed on the next update.
- To make the destroy method immediately execute you can pass a boolean (true) to the destroy method. This is always the last parameter passed.

- The keyboard manager is now always 'active' and used in Kiwi. Previously was only used if the device didn't support touch but this generated some problems with touch devices that have keyboards.

- how-to-setup-tests.txt replaced/updated with a readme.txt in the examples folder.

- Arcade Physics now use's the x/y of a hitbox when seperation objects. Watch out though as it is now the worldX/Y and as such physics for gameobjects within groups could be affected.


####Changes to API pre-exisiting API in this release
- rotPointX/rotPointY now aliased to Entities (will not affect any existing games)
- Animation Manager: Added four new signals. onPlay, onStop, onUpdate, onChange
- new method Kiwi.Stage.resize replaces settable width and height properties due to a WebGL issue. ** NOTE: games that set these properties will need to be updated to use the resize method**

####New Known Issues
When using CocoonJS and WebGL, non power of 2 sized textures lose the alpha channel resulting in a black background. This is a Cocoon issue. Use power of 2 sized textures to avoid this.


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