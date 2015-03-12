Change Log
=============

### v1.3.0 "Moriarty"

### New Features

* [Window focus/blur](https://github.com/gamelab/kiwi.js/issues/23) events added to the Stage allowing users to easily pause/resume their game. (#23) 
* The Animation Component will now look for sequences on their given texture atlas if one told to play could not be found. (#83)
* `TileMapLayers` have been seperated into Orthogonal and Isometric classes to keep code more maintainable as well as more succinct. (#85)
* Additional file management methods added to the `FileStore` class. (#103) 
* You can now pass parameters to a states `preload` method when switching states. (#104)
* You can now filter out messages to be logged out when using the `Kiwi.Log`. (#151) 
* Much better consistency for passing file types. (#156)
* @rydairegames added a method to get a tile when you know its index. (#160)
* ArcadePhysics now contains a `rotateToVelocity` method. (#179)
* Clocks now contains deltas. (#183)
* You can now assign floating point values when changing an Animations frame. (#186)
* Audio now contains an `onComplete` signal. (#189)
* Context menu events have been added to the Mouse Input Manager. (#191)
* HUDWidgets can have the origin the position is based of changed. (#193)
* New get children by tag methods added to groups. (#195)

### Bug Fixes

* Animation employs more rigorous methods which ensure the frameIndex is correct. (#184) 
* Timer no longer hangs when the interval is set to 0ms. (#187)
* `setInterval` and `setTimeout` now deal with clock units. (#188)
* IconBar positioning fixed. (#192)
* Minor fix with the image loading when using the xhr + arraybuffer methods of loading.  
* ArcadePhysics tile collision boxes made smaller to give better collisions.

### v1.2.3 "Williams"

### Bug Fixes

* `Clock.elapsed()` now resets to 0 after `start()` is called. (#177)
* `Geom.Intersect.lineToLineSegment` and `lineSegmentToLineSegment` now work correctly. (#172)

### Deprecations

* `Entity.inputEnabled` wasn't used by anything, and is now officially deprecated.

More details can be found on the [Kiwi.JS repo](https://github.com/gamelab/kiwi.js) under the [1.2.3 milestone](https://github.com/gamelab/kiwi.js/issues?q=milestone%3Av1.2.3)


### v1.2.2 "Williams"

### Bug Fixes

* `Animation` now correctly plays non-looping animations. (#164)
* `Animation.onPlay`, `.onStop`, `.onupdate`, `.onLoop`, and `.onComplete` now correctly documented in API.
* `Geom.Intersect.circleToRectangle()` and `Geom.Intersect.lineToRawSegment()` now work correctly in all cases. (#163, #166)
* `Geom.Intersect.lineSegmentToRectangle()` is now named correctly in API docs. (#165)
* `Geom.Line.perp()` can now deal with points at (0,0) and other edge cases. (#167)
* Added method `Geom.Intersect.lineSegmentToRawSegment()` to allow `lineSegmentToRectangle()` to function correctly.
* `Animation` now correctly plays 1 frame animations and dispatches signals appropriately. (#174)
* `Utils.GameMath.nearestAngleBetween()` now returns normalized angles so results are truly nearest. (#175)

### v1.2.1 "Williams"

#### Bug Fixes

* `Animation` could, under certain circumstances, freeze for a few seconds before playing. This was due to accidentally starting in 1970 and scrambling to catch up. This is no longer possible. (#150)
* `Clock.rate` will now equal 0 if the clock is paused or stopped. (#152)
* Correct documentation for `TextField` and `Kiwi.HUD.Widget.MenuItem` to show proper constructor information. (#155, #154)
* Non-looping animations now refer to the correct cells when played a second time. (#149)
* `State.create` now fires after file loading is complete. Logs no longer overlap between loading and creating. (#157)
* `MasterClock` now starts today, rather than 1970, avoiding anomalous results on first frame. (#158)

More details can be found on the [Kiwi.JS repo](https://github.com/gamelab/kiwi.js) under the [1.2.1 milestone](https://github.com/gamelab/kiwi.js/issues?q=milestone%3Av1.2.1)

### v1.2.0 "Williams"

#### New Features

* Pro architecture tools out the wazoo
* All `Component` objects on a Group or Entity will automatically update when the State updates. This permits a full Entity Component System. (#122)
* `Clock` greatly improved (#143)
  - Time can run at any rate, in any direction
  - `rate` property available on clocks
  - Animation, Tween, and TweenManager can now use any Clock
* Timer Helpers implemented. You can now call `Clock.setInterval` and `Clock.setTimeout`, rather than mess around with three or more calls to get the same effect. These helpers run on game clocks, and will respect clock manipulation and pausing. (#44)
* `Kiwi.Log` added. This replaces and upgrades `console.log` functionality, with recording, tagging, and selective muting. It's a big step up for debug! (#117)
* `Kiwi.Utils.Color` object can record and output color values in a very wide range of formats, including RGB, RGBA, HSL, HSV, CSS color functions, and normalized or integer values. (#135)
  - TextField, State, and Kiwi.Utils.Canvas now use Color objects.
* File system is more flexible
  - Parallel loading option for lightning-fast downloads
  - Load files with easy-to-use parameters
  - Easily manage state-specific files
* `Transform` optimisations (#141)
  - Improved performance
  - Transform may be set `lock = true` to prevent updates and increase performance
  - Transform may be set `ignoreParents = true` to save performance with objects whose parents don't update
* `Animation` has a `Signal` called `onComplete` which fires after finishing (#143)
* `TextField` now has a hitbox (#137)
* Game `domParent` parameter can now use CSS selectors (#131)
* `Kiwi.Utils.Common.between( x, a, b )` method added. It's much faster to check if something is between two numbers now. (#118)
* `Input.Pointers` now has `pressed` and `released` getters, allowing you to see if a mouse or finger was pressed or released in the last frame only. (#115)
* `Camera.transformPointToScreen` added, allowing you to translate world points to screen coordinates. This is the opposite of `Camera.transformPoint`. (#112)
* You may now reassign `Tween.object`, transferring a Tween from one object to another. (#109)
* `State.loadProgress()` can now estimate bytes loaded (#66)

#### Bug Fixes

* `scaleType: Kiwi.Stage.SCALE_FIT` now scales correctly when browser window is manually resized to be smaller than the canvas. (#147)
* XHR loading works with Nodewebkit where status codes are unavailable (#144)
* `Kiwi.Utils.Common.defaultToString` is now in camelCase (#140)
* `TileMapLayer.getOverlappingTiles` now works correctly with negative coordinates (#139)
* `Kiwi.Time.Clock.removeTimer` works correctly (#138)
* Audio objects now loop correctly after being paused and resumed (#132)
* `PluginManager` now correctly allows requirements that match or exceed requested version number, rather than those that match or precede it. (#130)
* Game prints the correct error message when no stage was specified, or an incorrect stage was specified. (#129)
* Mouse events now include button data. (#126)
* `AnimationManager` now calls `onUpdate` after changing `cellIndex`, ensuring that callbacks have more accurate data regarding cells. (#125)
* `StaticImage.objType()` now reports "StaticImage" instead of "Sprite" (#119)
* Spritesheet texture atlas correctly enumerates number of cells. (#116)
* `Timer` resumes where it left off after being paused (#113)
* File loader now correctly interprets files without extensions in CocoonJS (#106)

#### Deprecations and Removals

* `Textfield` is deprecated in favour of `TextField` alias (#134)
* `Kiwi.Utils.Common.defaultToString` is now in camelCase (#140)

#### Project Architecture

* Switched to Typescript 1.4. Run `npm update` to upgrade your packages.

More details can be found on the [Kiwi.JS repo](https://github.com/gamelab/kiwi.js) under the [1.2.0 milestone](https://github.com/gamelab/kiwi.js/issues?q=milestone%3Av1.2.0)


## Release Notes for Previous Versions

### v1.1.1

#### Bug Fixes

* Blend modes now work correctly in CocoonJS when `deviceTarget: Kiwi.TARGET_COCOON` is set, fixing a number of bugs. This allows CocoonJS deployment to a wider range of devices with more reliable quality.
* Methods on a number of Geometric Objects (such as the `angleTo` method on `Point`) have been fixed.
* Mouse events (down, up, scrollwheel and move) now prevent the default action from escaping to the rest of the page.
* For CocoonJS the default stage colour is now '#000000'. Even if your game doesn't fill the entire screen, the WebGL renderer will use this colour to fill all parts outside of the game area.

More details on the problems solved can be found on the [Kiwi.JS repo](https://github.com/gamelab/kiwi.js) under the [1.1.1 milestone](https://github.com/gamelab/kiwi.js/issues?q=milestone%3Av1.1.1+is%3Aclosed)

### v1.1.0 "Iwutani"

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

