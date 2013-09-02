/// <reference path="Entity.ts" />
/// <reference path="StateConfig.ts" />
/// <reference path="Group.ts" />

/**
 *  Kiwi - Core - State
 *
 *  @desc       Game State to extend and over-ride as needed
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *	@author 	Ross Kettle
 *  @url        http://www.kiwijs.org
 */

module Kiwi {

    export class State extends Group {

        /**
        * Create a new Kiwi.State
        * @constructor
        * @param {String} name
        * @return {State} This Object
        */
        constructor(name: string) {
            super(name);
            
            this.config = new Kiwi.StateConfig(this, name);
            this.components = new Kiwi.ComponentManager(Kiwi.STATE, this);
            this.transform.parent = null;
           

        }

        public objType() {
            return "State";
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

      

     
        public textureLibrary: Kiwi.Textures.TextureLibrary;
        public audioLibrary: Kiwi.Sound.AudioLibrary;
        public dataLibrary: Kiwi.Files.DataLibrary;

        /*
        * Holds all of the textures that are avaiable to be accessed once this state has been loaded.
        * @property textures
        */
        public textures;
        public audio;
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
        * 
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
        *
        * @method addImage
        * @param {String} key
        * @param {String} url
        * @param {Boolean} storeAsGlobal 
        */
        public addImage(key: string, url: string, storeAsGlobal: bool = true, width?: number, height?: number, offsetX?: number, offsetY?: number) {
            this.game.loader.addImage(key, url, width, height, offsetX, offsetY, storeAsGlobal);
            

        }

        public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, storeAsGlobal: bool = true, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number) {

            this.game.loader.addSpriteSheet(key, url, frameWidth, frameHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY, storeAsGlobal);
            

        }
        ///****
        public addTextureAtlas(key: string, imageURL: string, jsonID?: string, jsonURL?: string, storeAsGlobal: bool = true) {

            
            this.game.loader.addTextureAtlas(key, imageURL, jsonID, jsonURL, storeAsGlobal);
           
        }

        public addJSON(key: string, url: string, storeAsGlobal: bool = true) {

            
            this.game.loader.addJSON(key, url, storeAsGlobal);
          
        }

        

        public addAudio(key: string, url: string, storeAsGlobal: bool = true) {

            
            this.game.loader.addAudio(key, url, storeAsGlobal);
          
        }

        /**
        * Add a child to this State. Child can be any Game Object that extends Kiwi.Entity or Kiwi.Group
        * @method addChild
        * @param {Any} child
        * @param {Kiwi.Layer} layer
        **/
        public addChild(child: Kiwi.IChild): Kiwi.IChild {
          
            child.modify(Kiwi.ADDED_TO_STATE, this);
            super.removeChild(child);
            //this.members.push(child);
            
            super.addChild(child);
            
            //    this.currentLayer.add(child);
            

            return child;
        
        }

        //remove child!---
        public removeChild(child: Kiwi.IChild): Kiwi.IChild {
            

            //  Needs validation
            child.modify(Kiwi.REMOVED_FROM_STATE, this);
            var layer = null;
            //check that is exists...
            for (var i = 0; i < this.members.length; i++) {

                if (this.members[i].id === child.id) {

                    this.members.splice(i, 1);

                   
                }  
                  
            }
            return child;
           // return false;
        }

        /**
        * 
        * @method destroy
        **/
        public destroy() {

            for (var i = 0; i < this.members.length; i++)
            {
                //this.members[i].destroy();

                //need to remove files here too
            }
        
        }

    }

}