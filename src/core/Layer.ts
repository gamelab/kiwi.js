/// <reference path="Entity.ts" />
/// <reference path="../dom/Cache.ts" />
/// <reference path="../utils/Canvas.ts" />

/*
 *	Kiwi - Core - Layer
 *
 *	@desc		
 *				
 *	@version    1.0 - 1st March 2013
 *				
 *	@author 	Richard Davey
 *	@author		Ross Kettle
 *				
 *	@url		http://www.kiwijs.org
 *				
*/

module Kiwi {

    export class Layer {

        /**
		* 
        * @constructor
        * @param {Kiwi.Game} game. Game this layer will be attached to
        * @param {Number} id. Unique id of this layer
        * @param {Number} type. The type of Entities that this Layer can render (Kiwi.TYPE_CANVAS, Kiwi.TYPE_DOM or Kiwi.TYPE_WEBGL)
        * @param {String} name. Name of this layer
        * @param {Number} size. Size in pixels of this layer.
        * @return {Kiwi.Layer} The new layer
		**/
        constructor(game: Kiwi.Game, id: number, type: number, name: string, size:number) {
            console.log("create layer");

            this.game = game;
            this.id = id;
            this.type = type;
            this.name = name;
            this.components = new Kiwi.ComponentManager(Kiwi.LAYER, this);

                this.domContainer = <HTMLElement> document.createElement('div');

                this.domContainer.style.position = 'absolute';
                this.domContainer.style.overflow = 'hidden';
                this.domContainer.style.left = '0px';
                this.domContainer.style.top = '0px';
                this.domContainer.style.width = '100%';
                this.domContainer.style.height = '100%';

    

            if (this.type === Kiwi.TYPE_DOM) {

                this.domCache = new Kiwi.DOM.Cache(this, this.game, size);
                this.domContainer.id = 'KiwiDOMLayer' + this.id;
                this.game.stage.domLayers.appendChild(this.domContainer);
            }
            else if (this.type === Kiwi.TYPE_CANVAS)
            {
                this.canvas = new Kiwi.Utils.Canvas(this, this.game.stage.size.width(), this.game.stage.size.height(), true,true);
             //   this.domContainer.className = 'KiwiCanvasWrapper';
                this.canvas.domElement.id = 'KiwiCanvasLayer' + this.id;
                this.canvas.domElement.style.position = 'absolute';
               
                this.canvas.domElement.style.left = '0px';
                this.canvas.domElement.style.top = '0px';
                this.canvas.domElement.style.width = '100%';
                this.canvas.domElement.style.height = '100%';

               // this.domContainer.appendChild(this.canvas.domElement);
                //this.game.stage.canvasLayers.appendChild(this.canvas.domElement);

            }

            this.game.stage.size.updated.add(this._updatedStageSize, this);

            klog.info('Created Layer ' + this.id + ' of type ' + this.type);

        }

        /**
        * Returns the type of this object
        * @return {String} the type of this object.
        */
        public objType():string {
            return "Layer";
        }

        /**
		* 
        * @method _updatedStageSize
        * @param {Number} width
        * @param {Number} height
		**/
        private _updatedStageSize(width: number, height: number) {

            if (this.type === Kiwi.TYPE_CANVAS)
            {
                this.canvas.size.setTo(width, height);
            }

        }

        /**
        * The Component Manager
        * @property components
        * @type Kiwi.ComponentManager
	    */
        public components: Kiwi.ComponentManager;

        /**
        * The game this Layer belongs to
        * @property game
        * @type Game
	    */
        public game: Kiwi.Game;

        /**
        * The State that this Layer belongs to, if any
        * @type Kiwi.State
        **/
        public parent: Kiwi.State;

        /**
        * A unique identifier for this Layer within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type number
    	*/
        public id: number;

        /**
        * A name for this Layer. This is not checked for uniqueness within the Game, but is very useful for debugging.
        * @property name
        * @type string
    	*/
        public name: string;

        /**
        * The type of Entities that this Layer can render (Kiwi.TYPE_CANVAS, Kiwi.TYPE_DOM or Kiwi.TYPE_WEBGL). You cannot mix types on the same Layer.
        * @property type
        * @type number
	    */
        public type: number;

        /**
        * If this is a Kiwi.TYPE_DOM Layer then the dom entities are all added to this dom element, if Kiwi.TYPE_CANVAS the canvas is added within here
        * @property domContainer
        * @type HTMLElement
	    */
        public domContainer: HTMLElement;

        /**
        * If this is a Kiwi.TYPE_DOM Layer then the dom entities are all stored in this cache
        * @property domCache
        * @type Kiwi.DOM.Cache
	    */
        public domCache: Kiwi.DOM.Cache;

        /**
        * If this is a Kiwi.TYPE_CANVAS Layer then this is a reference to the canvas object that belongs to it
        * @property canvas
        * @type Kiwi.Utils.Canvas
	    */
        public canvas: Kiwi.Utils.Canvas;

        /**
        * The render list of this layer. Can contain a mixture of both Kiwi.Entity and Kiwi.Group objects.
        * @property _renderList
        * @type Array
        **/
        private _renderList = [];

        /** 
        * Total number of objects on this Layers render list.
        * @method numChildren
        * @return {Number} Total number of childen this Layer has.
        */
        public numChildren(): number {

            return this._renderList.length;
        }

        /**
		* Controls whether this Layer is rendered (for CANVAS) or visible (for DOM)
        * @property _visible
        * @type Boolean
		*/
        private _visible: bool;

        /**
		* Toggles the visible state of this Layer and all of its children. visible(false) are stopped from rendering.
        * @method visible
        * @param {Boolean} value. The state visible will be set to.
        * @return {Boolean} The current visible state of the layer.
		**/
        public visible(value: bool = null): bool {

            if (value !== null && value !== this._visible)
            {
                this._visible = value;

                if (this.type === Kiwi.TYPE_DOM)
                {
                    if (this._visible === false)
                    {
                        this.domContainer.style.display = 'none';
                    }
                    else
                    {
                        this.domContainer.style.display = 'block';
                    }
                }
                else if (this.type === Kiwi.TYPE_CANVAS)
                {
                    this.canvas.visible(this._visible);
                }
            }

            return this._visible;

        }

        /**
		* A value used by components to control if the Layer needs re-rendering
        * @property _dirty
        * @type Boolean
        * @private
		**/
        private _dirty: bool;

        /**
		* Returns the dirty value of the layer. If a parameter is given, the value is set to this.
        * @method dirty
        * @param {Boolean} value
        * @return {Boolean}
    	*/
        public dirty(value: bool = null): bool {

            if (value !== null)
            {
                this._dirty = value;
            }

            return this._dirty;

        }
        
        /**
		* Adds an entity to this layer. Returns true if succesful, false otherwise.
        * @method add
        * @param {Any} The child to be added.
        * @return {Boolean} true if succesful, false otherwise.
    	*/
        public add(child): bool {

            if (child instanceof Kiwi.Entity)
            {
                if (child.supportsType(this.type) === false)
                {
                    klog.warn('Entity failed to be added to Layer renderList');
                    return false;
                }
                else
                {
                    klog.info('Entity added to Layer renderList');
                }
            }
            else
            {
                klog.info('Group added to Layer renderList');
            }

            this._renderList.push(child);

            if (this.type === Kiwi.TYPE_DOM)
            {
                this.domCache.assignElement(child);
            }

            child.modify(Kiwi.ADDED_TO_LAYER, this);

            return true;

        }

        /**
		* Removes a given child from this layer. Returns true if the child is removed, false otherwise.
        * @method remove
        * @param {Any} The child to be removed
        * @return {Boolean} true if the child is removed, false otherwise.
    	*/
        public remove(child): bool {

            for (var i = 0; i < this._renderList.length; i++)
            {
                if (this._renderList[i].id === child.id)
                {

                    this._renderList.slice(i, 1);
                    /*
                    if (this.type === Kiwi.TYPE_DOM)
                    {
                        console.log('1');
                        child.domElement.unlink();
                    }
                    */
                    child.modify(Kiwi.REMOVED_FROM_LAYER, this);

                    return true;
                }
            }

            return false;

        }

        /**
		* Update all Components that have been added to this Layer
        * @method update
    	*/
        public update() {

            this.components.update();
        
        }

        /**
		* Render all Components, Entities and Groups that have been added to this Layer
        * @method render
    	*/
        public render(camera:Kiwi.Camera) {
            
            if (this.type === Kiwi.TYPE_CANVAS)
            {
                this.canvas.clear();
            }

            this.components.preRender();

            this.components.render();
        
            for (var i = 0; i < this._renderList.length; i++)
            {
                if (this._renderList[i].willRender() === true)
                {
                    this._renderList[i].render(camera);
                }
            }

            this.components.postRender();
        
        }

    }

}