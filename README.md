Kiwi.JS 0.7
============

Kiwi.JS is the worlds easiest to use Open Source HTML5 game framework for making both mobile and desktop browser games. Our focus is blazingly fast WebGL and Canvas rendering. Our mission is to foster an open source community and democratize game creation!! 

- [Getting Started Tutorials](http://www.kiwijs.org/documentation/getting-started/)  
- [Code Examples](http://www.kiwijs.org/examples/)  
- [API Documentation](http://api.kiwijs.org/)  
- [Contact](http://www.kiwijs.org/help/)  

Visit our homepage [www.kiwijs.org](http://kiwijs.org) for more information about using Kiwi.JS to build your next game, on our site you'll find plenty of examples and tutorials to get you started.
    
##What's new in Kiwi.JS 0.7?

- This release includes numerous WebGL rewrites, bug fixes and optimisations which greatly improve stability and extensibility.
- Works with Cocoon/WebGL combination - tested on iPad2 and numerous Android devices
- Streamlined sprite rendering shader
- The build now includes gl-matrix.js (minified version) so there is no longer a need to include this manually
- A typescript linter task has been added to the grunt file - thanks ellisonleao

##Welcome to Kiwi.JS!! 

* An open source HTML5 game framework for game creation
* Targeting native mobile apps as well as both desktop and mobile browsers
* WebGL and 2D Canvas rendering
* Support for Cocoon.JS as a native mobile app deployment solution 

##License

* GPLv2

*Supporters of the MIT Licence rejoice! In coming weeks Kiwi.JS 1.0 will be released and available for download, we will make available versions of Kiwi.JS that are licended under the more permissive MIT Licence and the GPLv2 License.*

##Features


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

##Build

Kiwi.js is currently using Typescript 9.0.1
Either - use Visual Studio/TS extension. There are csproj files for both the main project and also the examples.
Or - use the grunt file. This requires installing node.js, and the grunt CLI package. 

The csproj and grunt compilation methods both output a single kiwi.js file in /build
Grunt will also create a min.js version and also output a kiwi.d.ts definition file in /build as well


##Contribute

We'd love you to get involved in making the Kiwi.JS game engine the best damn game framework in the world! If you'd like to contribute please get in touch, fork/clone the repo and have a dig around. Make pull requests on the dev branch.

If you discover a bug or find yourself just wanting to jump on in and help make this blueprint even better please file an issue and get stuck in. We're a friendly bunch and hope people find themselves wanting to get involved. 

https://github.com/gamelab/kiwi.js/issues/new

##Core Contributors

Ross Kettle  
Ben Harding  
Richard Davey  

Kiwi.JS also uses code from a number of open source projects. Effort has been made to clearly identify authors in the code comments. If you notice and missing or incorrect attribution please let us know.    
