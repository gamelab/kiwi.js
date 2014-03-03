Release Notes 0.6.1

Kiwi.js (BETA)
=====

###HTML5 game library written in TypeScript/Javascript
-----------------------------------------------------------------

version 0.6.1

###Release notes for this version


    
####Bug Fixes and changes
- Audio that cannot be decoded/isn't supported by the browser are no longer loaded by default. Done so that games no longer crash when an audio piece could not load.  
- TextField GameObject no longer generates a image of the text when rendering.
- Keys
	- Duration property has been implemented. Returns the number of milliseconds a key has been held down for. 
	- Repeat property has been implemented. Contains the number of times the 'onkeydown' event has fired for that Key. Is reset with each subsequent release/press.
	- JustReleased/JustPressed methods have been implemented. 
	- New property 'preventDefault' added. This boolean tells the key whether to 'prevent' any default functionality for that key or not when it is pressed/released. 
- Keyboard
	- A new signal named 'onKeyDownOnce' has been added. This signal only dispatches a single event with each key-press, which is the first time a key has been pressed but not any subsequent events if the key is held.
	- JustPressed/JustReleased methods have been implemented.
	- New parameter (preventDefault) added to 'addKey' method. See the new property 'preventDefault' for more information. 


###Known Issues
The WebGL/Cocoon combination is not currently stable and some visual errors may occur. This is due to internal coocoon issues and we're working with Ludei to improve stability.

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