/**
* 
* @module Kiwi
* 
*/  

module Kiwi {

    /**
    * A State in Kiwi.JS is the main class that developers use when wanting to create a Game. 
    * States in Kiwi are used keep different sections of a game seperated. So a single game maybe comprised of many different States. 
    * Such as one for the menu, in-game, leaderboard, e.t.c.
    * There can only ever be a single State active at a given time.   
    * 
    * @class State
    * @namespace Kiwi
    * @extends Kiwi.Group
    * @constructor
    * @param name {String} Name of this State. Should be unique to differentiate itself from other States.
    * @return {Kiwi.State} 
    */ 
    export class State extends Group {
         
        constructor(name: string) {
            super(null, name);
            
            this.config = new Kiwi.StateConfig(this, name);
            this.components = new Kiwi.ComponentManager(Kiwi.STATE, this);
            this.transform.parent = null;
            this._trackingList = [];
        }

        /**
        * Returns the type of object this state is.
        * @method objType
        * @return {String} "State"
        * @public
        */
        public objType() {
            return "State";
        }

        /**
        * Returns the type of child this is. 
        * @method childType
        * @return {Number} Kiwi.GROUP
        * @public
        */
        public childType() {
            return Kiwi.GROUP;
        }

        /**
        * The configuration object for this State.
        * @property config
        * @type Kiwi.StateConfig
        * @public
        */
        public config: Kiwi.StateConfig;

        /**
        * A reference to the Kiwi.Game that this State belongs to.
        * @property game
        * @type Kiwi.Game
        * @public
        */
        public game: Kiwi.Game = null;
         
        /**
        * The library that this state use's for the loading of textures.
        * @property textureLibrary
        * @type Kiwi.Textures.TextureLibrary
        * @public
        */
        public textureLibrary: Kiwi.Textures.TextureLibrary;
        
        /**
        * The library that this state use's for the loading of audio.
        * @property audioLibrary
        * @type Kiwi.Sound.AudioLibrary
        * @public
        */
        public audioLibrary: Kiwi.Sound.AudioLibrary;
        
        /**
        * The library that this state use's for the loading of data.
        * @property dataLibrary
        * @type Kiwi.Files.DataLibrary
        * @public
        */
        public dataLibrary: Kiwi.Files.DataLibrary;

        /**
        * Holds all of the textures that are avaiable to be accessed once this state has been loaded.
        * E.g. If you loaded a image and named it 'flower', once everything has loaded you can then access the flower image by saying this.textures.flower
        * @property textures
        * @type Object
        * @public
        */
        public textures;

        /**
        * Holds all of the audio that are avaiable to be accessed once this state has been loaded.
        * E.g. If you loaded a piece of audio and named it 'lazerz', once everything has loaded you can then access the lazers (pew pew) by saying this.audio.lazerz
        * @property audio
        * @type Object
        * @public
        */
        public audio;

        /**
        * Holds all of the data that are avaiable to be accessed once this state has been loaded.
        * E.g. If you loaded a piece of data and named it 'cookieLocation', once everything has loaded you can then access the cookies by saying this.data.cookieLocation
        * @property data
        * @type Object
        * @public
        */
        public data;

        /**
        * This method is executed when this State is about to be switched too. This is the first method to be executed, and happens before the Init method.
        * Is called each time a State is switched to.
        * @method boot
        * @public
        */
        public boot() {

            this.textureLibrary = new Kiwi.Textures.TextureLibrary(this.game);
            this.textures = this.textureLibrary.textures;
            this.audioLibrary = new Kiwi.Sound.AudioLibrary(this.game);
            this.audio = this.audioLibrary.audio;
            this.dataLibrary = new Kiwi.Files.DataLibrary(this.game);
            this.data = this.dataLibrary.data;
                
        }

        /*
        * Currently unused.
        */
        public setType(value: number) {

            if (this.config.isInitialised === false) {
                this.config.type = value;
            }

        }
        
         
        /*
        *--------------
        * Methods that are to be Over-Ridden by Devs.
        *--------------
        */


        /**
        * Gets executed when the state has been initalised and gets switched to for the first time.
        * This method only ever gets called once and it is before the preload method.
        * Can have parameters passed to it by the previous state that switched to it.
        * @method init
        * @param [values] { Any } 
        * @public
        */
        public init(...paramsArr: any[]) { }

        /**
        * This method is where you would load of all the assets that are requried for this state or in the entire game.
        *
        * @method preload
        * @public
        */
        public preload() { }

        /**
        * This method is progressively called whilst loading files and is executed each time a file has been loaded.
        * This can be used to create a 'progress' bar during the loading stage of a game.
        * @method loadProgress
        * @param percent {Number} The percent of files that have been loaded so far. This is a number from 0 - 1.
        * @param bytesLoaded {Number} The number of bytes that have been loaded so far.
        * @param file {Kiwi.Files.File} The last file to have been loaded.
        * @public
        */
        public loadProgress(percent: number, bytesLoaded: number, file: Kiwi.Files.File) { }

        /**
        * Gets executed when the game is finished loading and it is about to 'create' the state. 
        * @method loadComplete
        * @public
        */
        public loadComplete() { }

        /**
        * The game loop that gets executed while the game is loading. 
        * @method loadUpdate
        * @public
        */
        public loadUpdate() {
        
            for (var i = 0; i < this.members.length; i++) { 
                if (this.members[i].active === true)
                {
                    this.members[i].update();
                }
            }
        
        }

        /** 
        * Is executed once all of the assets have loaded and the game is ready to be 'created'.
        * @method create
        * @param [values]* {Any} 
        * @public
        */
        public create(...paramsArr: any[]) { }

        /**
        * Is called every frame before the update loop. When overriding make sure you include a super call.
        * @method preUpdate
        * @public
        */
        public preUpdate() {

            this.components.preUpdate();
        
        }

        /**
        * The update loop that is executed every frame while the game is 'playing'. When overriding make sure you include a super call too.
        * @method update
        * @public
        */
        public update() {
            
            this.components.update();
            
            for (var i = 0; i < this.members.length; i++) {

                //Should the update loop be executed?
                if (this.members[i].active === true) {
                    this.members[i].update();
                
                }
                
                //Does the child need to be destroyed?
                if (this.members[i].exists === false) {
                    this.members[i].destroy( true );
                }
            }
            
        }

        /**
        * The post update loop is executed every frame after the update method. 
        * When overriding make sure you include a super call at the end of the method.
        * @method postUpdate
        * @public
        */
        public postUpdate() {

            this.components.postUpdate();
        
        }

        /**
        * Called after all of the layers have rendered themselves, useful for debugging.
        * @method postRender
        * @public
        */
        public postRender() { }

        /**
        * Called just before this State is going to be Shut Down and another one is going to be switched too. 
        * @method shutDown
        * @public
        */
        public shutDown() { }

         
        /*
        *--------------
        * Loading Methods
        *--------------
        */


        /**
        * Adds a new image file that is be loaded when the state gets up to the loading all of the assets.
        *
        * @method addImage
        * @param key {String} A key for this image so that you can access it when the loading has finished.
        * @param url {String} The location of the image.
        * @param [storeAsGlobal=true] {boolean} If the image should be deleted when switching to another state or if the other states should still be able to access this image.
        * @param [width] {Number} The width of the image. If not passed the width will be automatically calculated.
        * @param [height] {Number} The height of the image. If not passed the height will be automatically calculated.
        * @param [offsetX] {Number} The offset of the image when rendering on the x axis. 
        * @param [offsetY] {Number} The offset of the image when rendering on the y axis.
        * @public
        */
        public addImage(key: string, url: string, storeAsGlobal: boolean = true, width?: number, height?: number, offsetX?: number, offsetY?: number) {
            this.game.loader.addImage(key, url, width, height, offsetX, offsetY, storeAsGlobal);
        }
        
        /**
        * Adds a new spritesheet image file that is be loaded when the state gets up to the loading all of the assets.
        *
        * @method addSpriteSheet
        * @param key {String} A key for this image so that you can access it when the loading has finished.
        * @param url {String} The location of the image.
        * @param frameWidth {Number} The width of a single frame in the spritesheet
        * @param frameHeight {Number} The height of a single frame in the spritesheet
        * @param [storeAsGlobal=true] {boolean} If the image should be deleted when switching to another state or if the other states should still be able to access this image.
        * @param [numCells] {Number} The number of cells/frames that are in the spritesheet. If not specified will calculate this based of the width/height of the image.
        * @param [rows] {Number} The number of cells that are in a row. If not specified will calculate this based of the width/height of the image. 
        * @param [cols] {Number} The number of cells that are in a column. If not specified will calculate this based of the width/height of the image.
        * @param [sheetOffsetX=0] {Number} The offset of the whole spritesheet on the x axis.
        * @param [sheetOffsetY=0] {Number} The offset of the whole spritesheet on the y axis.
        * @param [cellOffsetX=0] {Number} The spacing between cells on the x axis.
        * @param [cellOffsetY=0] {Number} The spacing between cells on the y axis.
        * @public 
        */
        public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, storeAsGlobal: boolean = true, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number) {

            this.game.loader.addSpriteSheet(key, url, frameWidth, frameHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY, storeAsGlobal);
            

        }
        
        /**
        * Adds a new texture atlas that is to be loaded when the states gets up to the stage of loading the assets.
        *
        * @method addTextureAtlas
        * @param key {String} A key for this image so that you can access it when the loading has finished.
        * @param imageURL {String} The location of the image.
        * @param [jsonID] {String} The id for the json file that is to be loaded. So that you can access it outside of the texture atlas.
        * @param [jsonURL] {String} The location of the json file you have loaded.
        * @param [storeAsGlobal=true] {boolean} If the image should be delete when switching to another state or if the other states should still be able to access this image.
        * @public
        */
        public addTextureAtlas(key: string, imageURL: string, jsonID?: string, jsonURL?: string, storeAsGlobal: boolean = true) {
             
            this.game.loader.addTextureAtlas(key, imageURL, jsonID, jsonURL, storeAsGlobal);
           
        }

        /**
        * Adds a json file that is to be loaded when the state gets up to the stage of loading the assets.
        * 
        * @method addJSON
        * @param key {string} A key for this json so that you can access it when the loading has finished
        * @param url {string} The location of the JSON file.
        * @param [storeAsGlobal=true] {boolean} If the json should be deleted when switching to another state or if the other states should still be able to access this json.
        * @public
        */
        public addJSON(key: string, url: string, storeAsGlobal: boolean = true) {

            this.game.loader.addJSON(key, url, storeAsGlobal);
        }
        
        /**
        * Adds a new audio file that is to be loaded when the state gets up to the stage of loading the assets.
        * 
        * @method addAudio
        * @param key {string} A key for this audio so that you can access it when the loading has finished
        * @param url {string} The location of the audio file. You can pass a array of urls, in which case the first supported filetype will be used.
        * @param [storeAsGlobal=true] {boolean} If the audio should be deleted when switching to another state or if the other states should still be able to access this audio.
        */
        public addAudio(key: string, url: any, storeAsGlobal: boolean = true) {
             
            this.game.loader.addAudio(key, url, storeAsGlobal);
          
        }


        /*
        *----------------
        * Garbage Collection 
        *----------------
        */


        /**
        * Contains a reference to all of the Objects that have ever been created for this state. Generally Kiwi.Entities or Kiwi.Groups.
        * Useful for keeping track of sprites that are not used any more and need to be destroyed.
        * @property trackingList
        * @type Array
        * @private
        */
        private _trackingList: Kiwi.IChild[];

        /**
        * Adds a new Objects to the tracking list. 
        * This is an INTERNAL Kiwi method and DEVS shouldn't need to worry about it.
        * @method addToTrackingList
        * @param child {Object} The Object which you are adding to the tracking list.
        * @public
        */
        public addToTrackingList(child: Kiwi.IChild) {
            //check to see that its not already in the tracking list.
            if (this._trackingList.indexOf(child) !== -1) return;
            //add to the list
            this._trackingList.push(child);
        }

        /**
        * Removes a Object from the tracking list. This should only need to happen when a child is being destroyed.
        * This is an INTERNAL Kiwi method and DEVS shouldn't really need to worry about it.
        * @method removeFromTrackingList
        * @param child {Object} The object which is being removed from the tracking list. 
        * @public
        */
        public removeFromTrackingList(child:Kiwi.IChild) {
            //check to see that it is in the tracking list.
            var n = this._trackingList.indexOf(child);
            if (n > -1) {
                this._trackingList.splice(n, 1);
            } 
        }

        /**
        * Destroys all of Objects in the tracking list that are not currently on stage. 
        * All that currently don't have this STATE as an ancestor.
        * Returns the number of Objects removed.  
        * @method destroyUnused
        * @return {Number} The amount of objects removed.
        * @public
        */
        public destroyUnused():number {

            var d = 0; 
            for (var i = 0; i < this._trackingList.length; i++) {
                if (this.containsAncestor(this._trackingList[i], this) === false) {
                    this._trackingList[i].destroy();
                    this._trackingList.splice(i, 1);
                    i--;
                    d++;
                }
            }

            return d;
        }

        /**
        * Used to mark all Entities that have been created for deletion, regardless of it they are on the stage or not.
        * @method destroy
        * @param [deleteAll=true] If all of the Objects ever created should have the destroy method executed also.
        * @public
        */
        public destroy(deleteAll: boolean=true) {
            
            if (deleteAll == true) {

                //destroy all of the tracking list
                for (var i = 0; i < this._trackingList.length; i++) {

                    //If the item is a group then we don't want it to destroy it's children, as this method will do that eventually anyway.
                    this._trackingList[i].destroy( true , false ); 
                }
                this._trackingList = [];
                
                // While it is possible to set a member on another state and push it to this state, thus avoiding the tracking list, that member will be destroyed when this state loads, so we do not need to destroy remaining members - simply clear the list.
                this.members = [];    

            }

        }

        /**
        * Recursively goes through a child given and runs the destroy method on all that are passed.
        * @method _destroyChildren
        * @param child {Object}
        * @private
        */
        private _destroyChildren(child: any) {
            if (child.childType() == Kiwi.GROUP) {
                for (var i = 0; i < child.members.length; i++) {
                    this._destroyChildren(child.members[i]);
                }
            } 
            child.destroy( true );
        }

    }

}