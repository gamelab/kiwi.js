Release Notes 0.7

Kiwi.js
=====

###HTML5 game library written in TypeScript/Javascript
-----------------------------------------------------------------

version 0.7

###Release notes for this version
    
####Bug Fixes and changes
- This release includes numerous WebGL rewrites, bug fixes and optimisations which greatly improve stability and extensibility.
- Works with Cocoon/WebGL combination - tested on Ipad2 and Several Android devices
- Streamlined sprite rendering shader.
- The build now includes gl-matrix.js (minified version) so there is no longer a need to include this manually
- A typescript linter task has been added to the grunt file - thanks ellisonleao

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


* State Management
* Extensible game objects (such as sprites)
* Entity/Component system
* 2D Canvas 
* 2D WebGL rendering
* Target Cocoon.js 
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

###Build

Kiwi.js is currently using Typescript 9.0.1
Either - use Visual Studio/TS extension. There are csproj files for both the main project and also the examples.
Or - use the grunt file. This requires installing node.js, and the grunt CLI package. 

The csproj and grunt compilation methods both output a single kiwi.js file in /build
Grunt will also create a min.js version and also output a kiwi.d.ts definition file in /build as well



###Contribution

We'd love you to get involved in making the Kiwi.js library. If you'd like to contribute please get in touch, fork/clone the repo and have a dig around. Make pull requests on the dev branch.

###Main Contributors

Ben Harding  
Richard Davey  
Ross Kettle  

Kiwi.js also uses code from a number of open source projects. Effort has been made to clearly identify authors in the code comments. If you notice and missing or incorrect attribution please let us know.    