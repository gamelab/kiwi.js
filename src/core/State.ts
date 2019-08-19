/**
@module Kiwi
**/

module Kiwi {

	/**
	A `State` is the main class used to create a game.
	States in Kiwi are used to keep different sections of a game separated.
	A single game may be comprised of many different States,
	such as one for the menu, in-game, leaderboard, etc.
	There can only ever be a single State active at a given time.

	**About the State lifecycle**

	Developers should know how the State works, as most of the game takes place
	inside it. You are expected to alter State behavior to suit your purposes.
	However, you must ensure that you do not break its regular behavior.

	When you switch into a State, it runs a series of methods.
	These prepare the State for operation.
	You can insert custom code into this sequence,
	but be aware that the game is only ready for certain actions
	after certain stages in the switch process. In particular,
	be careful about creating objects before the `create` phase,
	because textures and other assets have not been set yet.
	Objects created before `create` may lose their textures.

	The order is as follows:

	1. `init()` (may receive parameters from prior State)
	2. `preload()` (declare asset loading here)
	3. `loadUpdate()` EXTEND (executes during loading)
	4. `loadProgress()` (runs every time a file is loaded)
	5. `loadComplete()` (runs when loading is complete)
	6. `create()` (all data is available; it is safe to create game objects)

	Once the switch is complete, the State immediately begins to run
	the update loop. This runs as follows:

	1. `preUpdate()` EXTEND (updates state ComponentManager)
	2. `update()` EXTEND (updates all children)
	3. `postUpdate()` EXTEND (updates state ComponentManager)
	4. ...render (not part of State; executed by the main game loop)
	5. `postRender()`

	Finally, when you switch to another State, the State runs the following
	method:

	* `shutdown()`

	You may override any of these methods entirely, with the exception of
	those marked EXTEND. These methods perform some vital function.
	You may modify them via extension, for example:

	```
	myState.update = function() {

		// Extend
		Kiwi.State.prototype.update.call( this );

		// Custom code...
	};
	```

	The most common functions are `preload()`, `create()`, and `update()`.

	@class State
	@namespace Kiwi
	@extends Kiwi.Group
	@constructor
	@param name {string} Name of this State.
		Should be unique to differentiate itself from other States.
	@return {Kiwi.State} 
	**/
	export class State extends Group {

		constructor(name: string) {
			super(null, name);
			
			this.config = new Kiwi.StateConfig(this, name);
			this.components = new Kiwi.ComponentManager(Kiwi.STATE, this);
			this.transform.parent = null;
			this._trackingList = [];
		}

		/**
		Returns the type of object this state is.
		@method objType
		@return {string} "State"
		@public
		**/
		public objType() {
			return "State";
		}

		/**
		Returns the type of child this is. 
		@method childType
		@return {number} Kiwi.GROUP
		@public
		**/
		public childType() {
			return Kiwi.GROUP;
		}

		/**
		The configuration object for this `State`.
		@property config
		@type Kiwi.StateConfig
		@public
		**/
		public config: Kiwi.StateConfig;

		/**
		A reference to the `Kiwi.Game` that this `State` belongs to.
		@property game
		@type Kiwi.Game
		@public
		**/
		public game: Kiwi.Game = null;

		/**
		The library that this state uses for the loading of textures.
		@property textureLibrary
		@type Kiwi.Textures.TextureLibrary
		@public
		**/
		public textureLibrary: Kiwi.Textures.TextureLibrary;

		/**
		The library that this state uses for the loading of audio.
		@property audioLibrary
		@type Kiwi.Sound.AudioLibrary
		@public
		**/
		public audioLibrary: Kiwi.Sound.AudioLibrary;

		/**
		The library that this state uses for the loading of data.
		@property dataLibrary
		@type Kiwi.Files.DataLibrary
		@public
		**/
		public dataLibrary: Kiwi.Files.DataLibrary;

		/**
		Holds all of the textures that are avaiable to be accessed
		once this state has been loaded.
		E.g. If you loaded a image and named it "flower",
		once everything has loaded you can then access the flower image
		via `this.textures.flower`
		@property textures
		@type Object
		@public
		**/
		public textures;

		/**
		Holds all of the audio assets that are avaiable to be accessed
		once this state has been loaded.
		E.g. If you loaded a piece of audio and named it "lazerz",
		once everything has loaded you can then access the lazers (pew pew)
		via `this.audio.lazerz`
		@property audio
		@type Object
		@public
		**/
		public audio;

		/**
		Holds all of the data assets that are avaiable to be accessed
		once this state has been loaded.
		E.g. If you loaded a piece of data and named it "cookieLocation",
		once everything has loaded you can then access the cookies
		via `this.data.cookieLocation`
		@property data
		@type Object
		@public
		**/
		public data;

		/**
		Boot up the state in preparation for switching into it.
		This is the first method to be executed,
		and happens before the `init` method.
		Is called each time a `State` is switched to.
		It should not be necessary to call this method.
		@method boot
		@public
		**/
		public boot() {

			this.textureLibrary = new Kiwi.Textures.TextureLibrary(this.game);
			this.textures = this.textureLibrary.textures;
			this.audioLibrary = new Kiwi.Sound.AudioLibrary(this.game);
			this.audio = this.audioLibrary.audio;
			this.dataLibrary = new Kiwi.Files.DataLibrary(this.game);
			this.data = this.dataLibrary.data;
		}

		/*
		Currently unused.
		**/
		public setType(value: number) {

			if (this.config.isInitialised === false) {
				this.config.type = value;
			}

		}


		/*
		-------------
		Methods that are to be Over-Ridden by Devs.
		-------------
		*/


		/**
		Overrideable method.

		Gets executed when the state has been initalised
		and gets switched to for the first time.
		This method only ever gets called once, before the preload method.
		Can have parameters passed to it by the previous state.

		@method init
		@param [values] {Any}
		@public
		**/
		public init(...paramsArr: any[]) { }

		/**
		Overrideable method.

		This method is where you load of all the assets required
		for this state or in the entire game.

		@method preload
		@public
		**/
		public preload() { }

		/**
		Overrideable method.

		This method is progressively called while loading files,
		and is executed each time a file has been loaded.
		This can be used to create a progress bar
		during the loading stage of a game.

		@method loadProgress
		@param percent {number} The percent of files that have been loaded
			so far. This is a number from 0 to 1.
		@param bytesLoaded {number} Number of bytes loaded so far
		@param file {Kiwi.Files.File} Last file to have been loaded
		@public
		**/
		public loadProgress(percent: number, bytesLoaded: number, file: Kiwi.Files.File) { }

		/**
		Overrideable method.

		Executes when the game finishes loading and is about to `create`
		the state. 

		@method loadComplete
		@public
		**/
		public loadComplete() { }

		/**
		Extendable method. You may write your own, but it must call this
		via `Kiwi.State.prototype.loadUpdate.call( this )`.

		The game loop that gets executed while the game is loading.

		@method loadUpdate
		@public
		**/
		public loadUpdate() {

			for (var i = 0; i < this.members.length; i++) { 
				if (this.members[i].active === true)
				{
					this.members[i].update();
				}
			}
		}

		/** 
		Overrideable method.

		Is executed once all of the assets have loaded
		and the game is ready to be created.

		@method create
		@param [values]* {Any} 
		@public
		**/
		public create(...paramsArr: any[]) { }

		/**
		Extendable method. You may write your own, but it must call this
		via `Kiwi.State.prototype.preUpdate.call( this )`.

		Is called every frame before the update loop.

		@method preUpdate
		@public
		**/
		public preUpdate() {
			this.components.preUpdate();
		}

		/**
		Extendable method. You may write your own, but it must call this
		via `Kiwi.State.prototype.update.call( this )`.

		Executed every frame while the state is current.
		Updates state members and children.

		Generally, this is where the game runs.

		@method update
		@public
		**/
		public update() {

			this.components.update();

			var destroyables = [];

			for (var i = 0; i < this.members.length; i++) {

				//Should the update loop be executed?
				if (this.members[i].active === true) {
					this.members[i].update();
				}

				//Does the child need to be destroyed?
				if (this.members[i].exists === false) {
					destroyables.push( this.members[ i ] );
				}
			}

			// Destroy objects outside the list traversal.
			for ( var i = 0; i < destroyables.length; i++ ) {
				destroyables[ i ].destroy( true );
			}
		}

		/**
		Extendable method. You may write your own, but it must call this
		via `Kiwi.State.prototype.postUpdate.call( this )`.

		The post update loop is executed every frame after the update method.

		@method postUpdate
		@public
		**/
		public postUpdate() {
			this.components.postUpdate();
		}

		/**
		Overrideable method.

		Called after all of the members have rendered themselves.
		Useful for debugging.

		@method postRender
		@public
		**/
		public postRender() { }

		/**
		Overrideable method.

		Called just before this `State` is going to be shut down,
		and the game switches to another `State`.

		@method shutDown
		@public
		**/
		public shutDown() { }


		/*
		-------------
		Loading Methods
		-------------
		*/


		/**
		Add a new image file to be loaded when the state loads assets.

		@method addImage
		@param key {string} Key for this image so that you can access it
			when the loading has finished
		@param url {string} Location of the image
		@param [storeAsGlobal=true] {boolean} Whether the image should be
			retained as a global asset after this state is destroyed,
			or it should also be destroyed
		@param [width] {number} Width of the image. If not passed,
			the width will be automatically calculated.
		@param [height] {number} Height of the image. If not passed,
			the height will be automatically calculated.
		@param [offsetX] {number} Horizontal offset of the image
		@param [offsetY] {number} Vertical offset of the image
		@public
		**/
		public addImage( key: string, url: string, storeAsGlobal: boolean = true, width?: number, height?: number, offsetX?: number, offsetY?: number ) {
			return this.game.loader.addImage(key, url, width, height, offsetX, offsetY, storeAsGlobal);
		}

		/**
		Add a new spritesheet image file to be loaded when the state loads
		assets.

		@method addSpriteSheet
		@param key {string} Key for this image so that you can access it
			when the loading has finished
		@param url {string} Location of the image
		@param frameWidth {number} Width of a single frame in the spritesheet
		@param frameHeight {number} Height of a single frame in the
			spritesheet
		@param [storeAsGlobal=true] {boolean} Whether the image should be
			retained as a global asset after this state is destroyed,
			or it should also be destroyed
		@param [numCells] {number} Number of cells/frames in the spritesheet.
			If not specified, will calculate this based on the
			width/height of the image.
		@param [rows] {number} Number of cells in a row. If not specified,
			will calculate this based of the width/height of the image.
		@param [cols] {number} Number of cells in a column. If not specified,
			will calculate this based of the width/height of the image.
		@param [sheetOffsetX=0] {number} Horizontal offset of the whole
			spritesheet
		@param [sheetOffsetY=0] {number} Vertical offset of the whole
			spritesheet
		@param [cellOffsetX=0] {number} Horizontal spacing between cells
		@param [cellOffsetY=0] {number} Vertical spacing between cells
		@public 
		**/
		public addSpriteSheet( key: string, url: string, frameWidth: number, frameHeight: number, storeAsGlobal: boolean = true, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number ) {

			return this.game.loader.addSpriteSheet( key, url, frameWidth, frameHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY, storeAsGlobal );
		}

		/**
		Add a new texture atlas to be loaded when the state loads assets.

		@method addTextureAtlas
		@param key {string} Key for this image so that you can access it
			when the loading has finished
		@param imageURL {string} Location of the image.
		@param [jsonID] {string} Key for the JSON file,
			so that you can access it outside of the texture atlas
		@param [jsonURL] {string} Location of the JSON file describing the
			atlas
		@param [storeAsGlobal=true] {boolean} Whether the image should be
			retained as a global asset after this state is destroyed,
			or it should also be destroyed
		@public
		**/
		public addTextureAtlas(key: string, imageURL: string, jsonID?: string, jsonURL?: string, storeAsGlobal: boolean = true) {

			return this.game.loader.addTextureAtlas( key, imageURL, jsonID, jsonURL, storeAsGlobal);

		}

		/**
		Add a JSON file to be loaded when the state loads assets.
		
		@method addJSON
		@param key {string} Key for this JSON so that you can access it
			when the loading has finished
		@param url {string} Location of the JSON file
		@param [storeAsGlobal=true] {boolean} Whether the JSON should be
			retained as a global asset after this state is destroyed,
			or it should also be destroyed
		@public
		**/
		public addJSON( key: string, url: string, storeAsGlobal: boolean = true ) {

			return this.game.loader.addJSON( key, url, storeAsGlobal );
		}

		/**
		Add a new audio file to be loaded when the state loads assets.
		
		@method addAudio
		@param key {string} Key for this audio so that you can access it
			when the loading has finished
		@param url {string} Location of the audio file.
			You can pass an array of urls, in which case the first supported
			filetype will be used.
		@param [storeAsGlobal=true] {boolean} Whether the audio should be
			retained as a global asset after this state is destroyed,
			or it should also be destroyed
		**/
		public addAudio(key: string, url: any, storeAsGlobal: boolean = true) {

			return this.game.loader.addAudio(key, url, storeAsGlobal);
		}


		/*
		---------------
		Garbage Collection 
		---------------
		*/


		/**
		Contains a reference to all of the objects that have ever been
		created for this state, generally `Kiwi.Entity` or `Kiwi.Group`.
		Useful for keeping track of sprites that are not used any more
		and need to be destroyed.
		@property _trackingList
		@type Array
		@private
		**/
		private _trackingList: Kiwi.IChild[];

		/**
		Add a new object to the tracking list.
		This is an internal KiwiJS method and game devs
		shouldn't need to worry about it.
		@method addToTrackingList
		@param child {object} Object to add to the tracking list.
		@public
		**/
		public addToTrackingList( child: Kiwi.IChild ) {
			if ( this._trackingList.indexOf( child ) !== -1 ) {
				return;
			}
			this._trackingList.push( child );
		}

		/**
		Remove an object from the tracking list.
		This should only need to happen when a child is destroyed.
		This is an internal Kiwi method and game devs
		shouldn't really need to worry about it.
		@method removeFromTrackingList
		@param child {object} The object which is being removed from the tracking list. 
		@public
		**/
		public removeFromTrackingList(child:Kiwi.IChild) {
			var n = this._trackingList.indexOf( child );
			if (n > -1) {
				this._trackingList.splice( n, 1 );
			} 
		}

		/**
		Destroys all objects in the tracking list that are
		not currently on stage. 
		All that currently don't have this `State` as an ancestor.
		Returns the number of objects removed.
		@method destroyUnused
		@return {number} Amount of objects removed
		@public
		**/
		public destroyUnused():number {

			var d = 0;

			for ( var i = 0; i < this._trackingList.length; i++ ) {
				if ( this.containsAncestor( this._trackingList[ i ], this ) === false ) {
					this._trackingList[ i ].destroy();
					this._trackingList.splice( i, 1 );
					i--;
					d++;
				}
			}

			return d;
		}

		/**
		Used to mark all Entities that have been created for deletion,
		regardless of whether they are on the stage or not.

		@method destroy
		@param [deleteAll=true] If all of the Objects ever created should
			have the destroy method executed also.
		@public
		**/
		public destroy( deleteAll: boolean = true ) {

			if ( deleteAll == true ) {

				// Destroy all entities on the tracking list
				while ( this._trackingList.length > 0 ) {

					// Don't destroy group children,
					// as they're also on the tracking list
					// and we'll get to them soon enough
					this._trackingList[ 0 ].destroy( true , false );
				}
				this._trackingList = [];

				// Destroy all members
				while ( this.members.length > 0 ) {

					// Do destroy group children,
					// as we'll never visit them again
					this.members[ 0 ].destroy( true , true );
				}
				this.members = [];
			}

			// This method can't call super,
			// as `Kiwi.Group.prototype.destroy` will delete
			// permanent properties and prevent the game from
			// successfully switching back to this state.

			// Partial duplicate functionality:
			if ( this.components ) {
				this.components.removeAll();
			}
		}

		/**
		Recursively destroys a child and all its children.

		@method _destroyChildren
		@param child {object}
		@deprecated As of v1.4.1. This is never called.
		@private
		**/
		private _destroyChildren( child: any ) {
			if ( child.childType() == Kiwi.GROUP ) {
				for ( var i = 0; i < child.members.length; i++ ) {
					this._destroyChildren( child.members[ i ] );
				}
			}
			child.destroy( true );
		}

	}

}
