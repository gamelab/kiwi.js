Release Notes 0.6.0

Kiwi.js (BETA)
=====

###HTML5 game library written in TypeScript/Javascript
-----------------------------------------------------------------

version 0.6.0

###Release notes for this version

####New Features and major updates
* Tilemap system has been totally revmped (see below)
* The four core gameobjects (Sprite, staticImage, Tilemap and Textfield) now all render in both 2d canvas and WebGL.
* WebGL rendering system has been greatly expanded, allowing the easy addition custom renderers and shaders when writing plugins.
 Examples are forthcoming.
    
####Bug Fixes
- Fixed bug that would stop Kiwi from working on Safari on the iPad 2. 
- Reimplement Kiwi.DEVICE.touch. Was previously commented out.
- Fixed issue where destroying groups would generate an error when switching states.
- Fixed the 'cocoon.php' Previously was generating a js error and so the settings were not being taken into affect.

####Changes (no impact on pre-existing API)
- Entity now has a rendererGL property and a renderGL method that can be overriden by WebGL compatible gameobjects.
- The list of Base2 sizes are now stored as a Static property on the Kiwi.Utils.Common.
- A method for resizing a Image/Canvas to be Base2 is now on the Kiwi.Utils.Common.
- Textfields now always use the 'optimised' version and the 'unoptimised' version has been removed.
- Pointers (Mouse/Touch Input)
    - Now takes the scale of stage into consideration. Thus making inputs more accurate when smaller/enlarged.
- Stage
    - Now contains a 'scale' property, which keeps track of how much the 'stage' has been scaled down due to CSS. In Cocoon this is always at 1 for now. 
    - The offset of the stage and scale is now re-calculated when the browser is resized. 
- Kiwi.Files Object 
    - File class on Kiwi has be refactored. 
    - The XHR loading method now times-out after 4000 milliseconds, previously was 2000. 
    - You can tell the XHR to not timeout by setting the delay to null.
- Arcade Physics
   - New method 'isTouching' has been added. Used just like the flixel 'touching' equivalent. 
   - Now can affect rotation/angle of attached GameObjects.
   - Can now resolve collisions vs tiles in a TileMapLayer using the 'overlapsTiles' method.
- States
   - Code has been refactored. 
   - Redundant checks and conditions removed.
   - StateConfig now keeps track of how many times a State has been switched to/used. 
   - Now have a 'shutDown' method which developers override. Is called just before a state is destroyed.
   - Nicer messages appear throughout the state process.  
- Example Folder.
   - New examples for ArcadePhysics have been added.
   - A few new examples for Groups have been added.
   - A list of TileMap examples have been implemented. 


####Changes to API pre-exisiting API in this release
- Previous property 'visibility' on Entities has been renamed to visible.
- New Tilemap system has been implemented.
   - You can now use TextureAtlases when creating Tilemaps.
   - JSON format used when creating a Tilemap is the same as Tiled. 
   - See the examples and docs for more documentation. 

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