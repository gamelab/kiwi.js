/**
* Module - Kiwi (Core)
* @module Kiwi
* 
*/  

module Kiwi {

    /**
    * 
    * 
    * @class State
    * 
    */ 
    export class State extends Group {

        /**
        *  
        * @constructor
        * @param {String} name
        * @return {State} Kiwi.State
        */
        constructor(name: string) {
            super(null, name);
            
            this.config = new Kiwi.StateConfig(this, name);
            this.components = new Kiwi.ComponentManager(Kiwi.STATE, this);
            this.transform.parent = null;
            this._trackingList = [];
        }

        /*
        * Returns the type of object this state is.
        * @method objType
        * @return String
        */
        public objType() {
            return "State";
        }

        /*
        * Returns the type of child this is. 
        * @method childType
        * @return Number
        */
        public childType() {
            return Kiwi.STATE;
        }

        /**
        * The configuration object for this State
        * @property config
        * @type Kiwi.StateConfig
        **/
        public config: Kiwi.StateConfig;

        /**
        * A reference to the Kiwi.Game that this State belongs to
        * @property game
        * @type Kiwi.Game
        **/
        public game: Kiwi.Game = null;
         
        /*
        * 
        * @property textureLibrary
        * @type Kiwi.Textures.TextureLibrary
        */
        public textureLibrary: Kiwi.Textures.TextureLibrary;
        
        /*
        *
        * @property audioLibrary
        * @type Kiwi.Sound.AudioLibrary
        */
        public audioLibrary: Kiwi.Sound.AudioLibrary;
        
        /*
        *
        * @property dataLibrary
        * @type Kiwi.Files.DataLibrary
        */
        public dataLibrary: Kiwi.Files.DataLibrary;

        /*
        * Holds all of the textures that are avaiable to be accessed once this state has been loaded.
        * @property textures
        */
        public textures;

        /*
        * Holds all of the audio that are avaiable to be accessed once this state has been loaded.
        * @property audio
        */
        public audio;

        /*
        * Holds all of the data that are avaiable to be accessed once this state has been loaded.
        * @property audio
        */
        public data;

        /**
        * The Component Manager
        * @property components
        * @type Kiwi.ComponentManager
	    */
        public components: Kiwi.ComponentManager;

        /**
        * 
        * @method boot
        **/
        public boot() {

            this.textureLibrary = new Kiwi.Textures.TextureLibrary(this.game);
            this.textures = this.textureLibrary.textures;
            this.audioLibrary = new Kiwi.Sound.AudioLibrary(this.game);
            this.audio = this.audioLibrary.audio;
            this.dataLibrary = new Kiwi.Files.DataLibrary(this.game);
            this.data = this.dataLibrary.data;
                
        }
         
        //  Default methods that should be over-ridden

        /**
        * 
        * @method init
        **/
        public init(...paramsArr: any[]) { }

        /**
        * 
        * @method preload
        **/
        public preload() { }

        /**
        * 
        * @method loadProgress
        * @param {Number} percent
        * @param {Number} bytesLoaded
        * @param {Kiwi.Files} file
        **/
        public loadProgress(percent: number, bytesLoaded: number, file: Kiwi.Files.File) { }

        /**
        * 
        * @method loadComplete
        **/
        public loadComplete() { }

        /**
        * 
        * @method update
        **/
        public loadUpdate() {
        
            for (var i = 0; i < this.members.length; i++)
            {
                if (this.members[i].active === true)
                {
                    this.members[i].update();
                }
            }
        
        }

        /** 
        * @method create
        **/
        public create(...paramsArr: any[]) { }

        /**
        * Calls preUpdate on all the components
        * @method preUpdate
        **/
        public preUpdate() {

            this.components.preUpdate();
        
        }

        /**
        * Calls update on all the components, entities and groups added to this State
        * @method update
        **/
        public update() {
            
            this.components.update();
        
            for (var i = 0; i < this.members.length; i++)
            {
                if (this.members[i].active === true)
                {
                    this.members[i].update();
                }
            }
            
        }

        /**
        * Calls postUpdate on all the components
        * @method postUpdate
        **/
        public postUpdate() {

            this.components.postUpdate();
        
        }

        /**
        * Called after all of the layers have rendered themselves, useful for debugging
        * @method postRender
        **/
        public postRender() {}

        /**
        * 
        * @method setType
        * @param {Number} value
        **/
        public setType(value: number) {

            if (this.config.isInitialised === false)
            {
                this.config.type = value;
            }

        }
         
        /**
        * Adds a new image file that is be loaded when the state gets up to the loading all of the assets.
        *
        * @method addImage
        * @param {String} key
        * @param {String} url
        * @param {Boolean} storeAsGlobal 
        * @param {Number} width
        * @param {Number} height
        * @param {Number} offsetX
        * @param {Number} offsetY
        */
        public addImage(key: string, url: string, storeAsGlobal: boolean = true, width?: number, height?: number, offsetX?: number, offsetY?: number) {
            this.game.loader.addImage(key, url, width, height, offsetX, offsetY, storeAsGlobal);
        }
        
        /**
        * Adds a new spritesheet image file that is be loaded when the state gets up to the loading all of the assets.
        *
        * @method addSpriteSheet
        * @param {String} key
        * @param {String} url
        * @param {Number} frameWidth
        * @param {Number} frameHeight
        * @param {Boolean} storeAsGlobal 
        * @param {Number} numCells
        * @param {Number} rows
        * @param {Number} cols
        * @param {Number} sheetOffsetX
        * @param {Number} cellOffsetX
        * @param {Number} cellOffsetY
        */
        public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, storeAsGlobal: boolean = true, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number) {

            this.game.loader.addSpriteSheet(key, url, frameWidth, frameHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY, storeAsGlobal);
            

        }
        
        /*
        * Adds a new texture atlas that is to be loaded when the states gets up to the stage of loading the assets.
        *
        * @method addTextureAtlas
        * @param {String} key
        * @param {String} imageURL
        * @param {String} jsonID
        * @param {String} jsonURL
        * @param {boolean} storeAsGlobal
        */
        public addTextureAtlas(key: string, imageURL: string, jsonID?: string, jsonURL?: string, storeAsGlobal: boolean = true) {
             
            this.game.loader.addTextureAtlas(key, imageURL, jsonID, jsonURL, storeAsGlobal);
           
        }

        /*
        * Adds a json file that is to be loaded when the state gets up to the stage of loading the assets.
        * 
        * @method addJSON
        * @param {string} key
        * @param {string} url
        * @param {bool} storeAsGlobal
        */
        public addJSON(key: string, url: string, storeAsGlobal: boolean = true) {

            this.game.loader.addJSON(key, url, storeAsGlobal);
          
        }
        
        /*
        * Adds a new audio file that is to be loaded when the state gets up to the stage of loading the assets.
        * 
        * @method addAudio
        * @param {string} key
        * @param {string} url
        * @param {boolean} storeAsGlobal
        */
        public addAudio(key: string, url: string, storeAsGlobal: boolean = true) {
             
            this.game.loader.addAudio(key, url, storeAsGlobal);
          
        }

        //garbage collection stuff

        /*
        * Contains a reference to all of the IChilds that have ever been created for this state. 
        * Useful for keeping track of sprites that are not used any more and need to be destroyed.
        * @property trackingList
        * @type Kiwi.IChild[]
        */
        private _trackingList: Kiwi.IChild[];

        /*
        * Adds a new IChild to the tracking list. This is an INTERNAL Kiwi method and DEVS shouldn't really need to worry about it.
        * @method addIChild
        * @param {Kiwi.IChild} child
        */
        public addToTrackingList(child: Kiwi.IChild) {
            //check to see that its not already in the tracking list.
            if (this._trackingList.indexOf(child) !== -1) return;
            //add to the list
            this._trackingList.push(child);
        }

        /*
        * Removes a IChild from the tracking list. This is an INTERNAL Kiwi method and DEVS shouldn't really need to worry about it.
        * @method removeFromTrackingList
        * @param {Kiwi.IChild} child
        */
        public removeFromTrackingList(child:Kiwi.IChild) {
            //check to see that it is in the tracking list.
            var n = this._trackingList.indexOf(child);
            if (n > -1) {
                this._trackingList.splice(n, 1);
            } 
        }

        /*
        * Destroys all of IChilds that are not currently on stage. All IChilds that currently don't have this STATE as an ancestor.
        * Returns the number of IChilds removed.  
        * @method destroyUnused
        * @return {Number}
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
        * Destroys all of the IChild's on the start.
        * @method destroy
        **/
        public destroy(deleteAll: boolean=true) {
            
            //destroy all of the tracking list
            for (var i = 0; i < this._trackingList.length; i++) {
                this._trackingList[i].destroy();
            }
            this._trackingList = [];

            //destroy all of the members
            for (var i = 0; i < this.members.length; i++) {
                this._destroyChildren(this.members[i]);
            }
            
        }

        /*
        * Recursively goes through a child given and runs the destroy method on all that are passed.
        * @method _destroyChildren
        * @param {Kiwi.IChild} child
        */
        private _destroyChildren(child: any) {
            if (child.childType() == Kiwi.GROUP) {
                for (var i = 0; i < child.members.length; i++) {
                    this._destroyChildren(child.members[i]);
                }
            } 
            child.destroy();
        }

    }

}