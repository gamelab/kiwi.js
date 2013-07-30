/// <reference path="Cache.ts" />
/// <reference path="Entity.ts" />
/// <reference path="StateConfig.ts" />

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
        public cache: Kiwi.Cache;

        /**
        * 
        * @property members
        * @type Array
        **/
        //public members = [];

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

            this.cache.boot();
            //this.cache = this.game.cache;

            klog.info('Current Layer: ' + this.game.layers.currentLayer);

            this.currentLayer = this.game.layers.currentLayer;
        
        }

        /**
        * 
        * @property currentLayer
        * @type Kiwi.Layer
        **/
        public currentLayer: Kiwi.Layer;

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
                if (this.members[i].active() === true)
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
                if (this.members[i].active() === true)
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
        * @method swapLayer
        * @param {Kiwi.Layer} layer
        **/
        public swapLayer(layer: Kiwi.Layer) {

            this.currentLayer = layer;

        }

        /**
        *
        * @method addImage
        * @param {String} cacheID
        * @param {String} url
        * @param {Boolean} globalCache - use the global game cache instead of the local one (which is destroyed when the state ends)
        * @param {Kiwi.FileCache} [cache]
        */
        public addImage(cacheID: string, url: string, globalCache:bool = true) {

            if (globalCache === true)
            {
                this.game.loader.addImage(cacheID, url, this.game.cache.images);
            }
            else
            {
                this.game.loader.addImage(cacheID, url, this.cache.images);
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

        public addSpriteSheet(cacheID: string, url: string, frameWidth: number, frameHeight: number, globalCache: bool = true) {

            if (globalCache === true)
            {
                this.game.loader.addSpriteSheet(cacheID, url, frameWidth, frameHeight, this.game.cache.images);
            }
            else
            {
                this.game.loader.addSpriteSheet(cacheID, url, frameWidth, frameHeight, this.cache.images);
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

            //this.members.push(child);
            var layer = null;
            super.addChild(child);
            if (layer !== null)
            {
                layer.add(child);
            }
            else
            {
                this.currentLayer.add(child);
            }

            return child;
        
        }

        //remove child!---
        public removeChild(child: Kiwi.IChild): Kiwi.IChild {
            

            //  Needs validation
            child.modify(Kiwi.REMOVED_FROM_STATE, this);
            var layer;
            //check that is exists...
            for (var i = 0; i < this.members.length; i++) {

                if (this.members[i].id === child.id) {

                    this.members.slice(i, 1);

                    if (layer !== null) {
                        layer.remove(child);
                    } else {
                        this.currentLayer.remove(child);
                    }
                    //return true;
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