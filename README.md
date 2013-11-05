Release Notes 0.5.1

Kiwi.js (BETA)
=====

###HTML5 game library written in TypeScript/Javascript
-----------------------------------------------------------------

version 0.5.1

###Release notes for this version

####New Features

* Plugin Infrastructure  
See plugin documentation for details.

* Build Scripts  
Gruntfile now has three options:  
*grunt dev* - compiles typescript and minifies js.  
*grunt docs* - compiles documentation and copies kiwi logo and css over the top of compiled files.  
*grunt full* - does both of the above
	
####Bug Fixes
Audio 
  
* Audio now works in Cocoon (Audio tags only), also works on IPad 2 (Audio Tags) & Ipad 3 (WebAudio) API.
    
* On Ipad2 switching between sounds held in multiple audio tags can cause the removal of some audio from memory.
	
* ArcadePhysics
Fixed code inconsistencies

Build Scripts  
A number of typescript files were updated to allow compilation using the node based Typescript compiler 0.9.0.1.

####Changes to API pre-exisiting API in this release
None - this release contains only bug fixes and new features, games that ran under 0.5.0 should run identically on 0.5.2  
Note: To run the new grunt build script you'll need to update your node packages by doing npm install 	



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