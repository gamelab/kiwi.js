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
            
            klog.debug('----------- State created: ' + name + ' -----------');
            
            this.config = new Kiwi.StateConfig(this, name);
            this.cache = new Kiwi.Cache(this.game);
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

        /**
        * 
        * @property cache
        * @type Kiwi.Cache
        **/
        //RENAME TO FILECACHE
        public cache: Kiwi.Cache;

        /**
        * 
        * @property cache
        * @type Kiwi.Cache
        **/
        public textureCache: Kiwi.TextureCache;

        /*
        * Holds all of the textures that are avaiable to be accessed once this state has been loaded.
        * @property textures
        */
        public textures;

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

            klog.info('State booted: ', this.config.name);
            this.textureCache = new Kiwi.TextureCache(this.game);
            this.textures = this.textureCache.textures;
            this.cache.boot();
            //this.cache = this.game.cache;

            
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
        * @param {Kiwi.File} file
        **/
        public loadProgress(percent: number, bytesLoaded: number, file: Kiwi.File) { }

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
            else
            {
                klog.warn('State default type can only be changed in init()');
            }

        }

       

        /**
        *
        * @method addImage
        * @param {String} cacheID
        * @param {String} url
        * @param {Boolean} globalCache - use the global game cache instead of the local one (which is destroyed when the state ends)
        * @param {Kiwi.FileCache} [cache]
        */
        public addImage(cacheID: string, url: string, globalCache: bool = true, width?: number, height?: number, offsetX?: number, offsetY?: number) {
            
            if (globalCache === true)
            {
                this.game.loader.addImage(cacheID, url, this.game.cache.images,width,height,offsetX,offsetY);
            }
            else
            {
                this.game.loader.addImage(cacheID, url, this.cache.images, width, height, offsetX, offsetY);
            }

        }

        public addSpriteSheet(cacheID: string, url: string, frameWidth: number, frameHeight: number, globalCache: bool = true, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number) {

            if (globalCache === true)
            {
                this.game.loader.addSpriteSheet(cacheID, url, frameWidth, frameHeight, this.game.cache.images, numCells,rows,cols,sheetOffsetX, sheetOffsetY,cellOffsetX,cellOffsetY);
            }
            else
            {
                this.game.loader.addSpriteSheet(cacheID, url, frameWidth, frameHeight, this.cache.images, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY);
            }

        }
        ///****
        public addTextureAtlas(imageID: string, imageURL: string, jsonID?:string,jsonURL?:string, globalCache: bool = true) {

            if (globalCache === true)
            {
                this.game.loader.addTextureAtlas(this.game.cache,imageID,imageURL,jsonID,jsonURL);
            }
            else
            {
                this.game.loader.addTextureAtlas(this.cache, imageID,imageURL, jsonID, jsonURL);
            }

        }

        public addJSON(cacheID: string, url: string, globalCache: bool = true) {

            if (globalCache === true) {
                this.game.loader.addJSON(cacheID, url, this.game.cache.data);
            }
            else {
                this.game.loader.addJSON(cacheID, url, this.cache.data);
            }

        }

        

        public addAudio(cacheID: string, url: string, globalCache: bool = true) {

            if (globalCache === true)
            {
                this.game.loader.addAudio(cacheID, url, this.game.cache.audio);
            }
            else
            {
                this.game.loader.addAudio(cacheID, url, this.cache.audio);
            }

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
            }
        
        }

    }

}