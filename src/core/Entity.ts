/// <reference path="Game.ts" />
/// <reference path="State.ts" />


/*
 *	Kiwi - Core - Entity
 *				
 *	@desc		Serves as a container for components and core framework properties.
 *				Each Entity has a unique ID (UID) which is automatically generated upon instantiation.
 *
 *	@version	1.1 - 1st March 2013
 *
 *	@author 	Richard Davey
 *	@author		Ross Kettle
 *
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi {

    export class Entity implements Kiwi.IChild {

        /**
        * 
        * @constructor
        * @param {Boolean} supportsCanvas
        * @param {Boolean} supportsDOM
        * @param {Boolean} supportsWebGL
        * @return {Kiwi.Entity}
        */
        constructor() {

            //  Properties

            this._exists = true;
            this._active = true;
            this._willRender = true;
            this.components = new Kiwi.ComponentManager(Kiwi.ENTITY, this);
            this.transform = new Kiwi.Geom.Transform();

            //  Signals

            this.onAddedToGroup = new Kiwi.Signal();
            this.onAddedToLayer = new Kiwi.Signal();
            this.onAddedToState = new Kiwi.Signal();
            this.onRemovedFromGroup = new Kiwi.Signal();
            this.onRemovedFromLayer = new Kiwi.Signal();
            this.onRemovedFromState = new Kiwi.Signal();

        }

        public transform: Kiwi.Geom.Transform;
        
        public childType():number {
            return Kiwi.ENTITY;
        }

        //  Subscribe to these signals for update information
        public onAddedToGroup: Kiwi.Signal;
        public onAddedToLayer: Kiwi.Signal;
        public onAddedToState: Kiwi.Signal;
        public onRemovedFromGroup: Kiwi.Signal;
        public onRemovedFromLayer: Kiwi.Signal;
        public onRemovedFromState: Kiwi.Signal;

        //  Modify the state of this Entity, such as adding to a Group, removing from a Layer, etc. Should be used by the internal Kiwi methods only.
        public modify(action:number, parent) {

            if (action === Kiwi.ADDED_TO_GROUP)
            {
                return this._addedToGroup(parent);
            }
            else if (action === Kiwi.ADDED_TO_LAYER)
            {
                return this._addedToLayer(parent);
            }
            else if (action === Kiwi.ADDED_TO_STATE)
            {
                return this._addedToState(parent);
            }
            else if (action === Kiwi.REMOVED_FROM_GROUP)
            {
                return this._removedFromGroup(parent);
            }
            else if (action === Kiwi.REMOVED_FROM_LAYER)
            {
                return this._removedFromLayer(parent);
            }
            else if (action === Kiwi.REMOVED_FROM_STATE)
            {
                return this._removedFromState(parent);
            }

        }

        private _alpha: number = 1;

        public set alpha(value: number) {
            if (value <= 0) value = 0;
            if (value > 1) value = 1;
            this._alpha = value;
        }

        public get alpha(): number {
            return this._alpha;
        }


        private _visible: bool = true;

        public set visiblity(value: bool) {
            this._visible = value;
        }

        public get visiblity(): bool {
            return this._visible;
        }

        public width: number = 0;   //if bounds are implemented then getters and setters here would be nice.

        public height: number = 0;  


        public atlas: Atlas;

        /**
        * The Component Manager
        * @property components
        * @type Kiwi.ComponentManager
	    */
        public components: Kiwi.ComponentManager;

        /**
        * The game this Entity belongs to
        * @property game
        * @type Game
	    */
        public game: Kiwi.Game = null;

        /**
        * The state this Entity belongs to (either the current game state or a persistent world state)
        * @property state
        * @type State
    	*/
        public state: Kiwi.State = null;

        /**
        * A unique identifier for this Entity within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type string
    	*/
        public id: string;

        /**
        * A name for this Entity. This is not checked for uniqueness within the Game, but is very useful for debugging
        * @property name
        * @type string
    	*/
        public name: string = '';

        /**
        * The Layer this Entity has been added to.
        * @property layer
        * @type Kiwi.Layer
        **/
        public layer: Kiwi.Layer = null;

        /**
        * The parent Group that this Entity belongs to, if any.
        * @property parent
        * @type Kiwi.Group
        **/
        //public parent: Kiwi.Group = null;

        /**
		* If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property exists 
        * @type Boolean
		**/
        private _exists: bool;

        /**
		* Toggles the exitence of this Entity. An Entity that no longer exists can be garbage collected or re-allocated in a pool
        * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
		**/
        public set exists(value: bool) {
            this._exists = value;
        }

        public get exists():bool {
            return this._exists;
        }

        /**
		* An active Entity is one that has its update method called by its parent.
        * @property _active
        * @type Boolean
		**/
        private _active: bool;

        /**
		* Toggles the active state of this Entity. An Entity that is active has its update method called by its parent.
        * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
		**/
        public set active(value: bool) {
            this._active = value;
        }

        public get active():bool {
            return this._active;
        }

        /**
		* Controls whether render is automatically called by the parent. 
        * @property _willRender
        * @type Boolean
		*/
		private _willRender: bool;

        /**
		* Toggles if this Entity will be rendered by a canvas layer. Use the visibile component for DOM layers.
        * @method willRender
        * @param {Boolean} value
        * @return {Boolean}
		**/
        public set willRender(value: bool) {
            this._willRender = value;
        }

        public get willRender():bool {
            return this._willRender;
        }

        /**
		* If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property exists 
        * @type Boolean
		**/
        private _inputEnabled: bool;

        /**
		* Controls if this Entity is input enabled or not (i.e. responds to touch/mouse events)
        * This method should be over-ridden to handle specific game object implementations.
		**/
        public set inputEnabled(value: bool) {
            this._inputEnabled = value;
        }

        public get inputEnabled():bool {
            return this._inputEnabled;
        }
        
        /**
		* If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property exists 
        * @type Boolean
		**/
        private _clock: Kiwi.Time.Clock = null;

        /**
		* The Clock used to update this all of this Entities components (defaults to the Game MasterClock)
		**/
        public set clock(value: Kiwi.Time.Clock) {
            this._clock = value;
        }

        public get clock(): Kiwi.Time.Clock {
            return this._clock;
        }

        /**
		* A value used by components to control if the Entity needs re-rendering
        * @property dirty
        * @type Boolean
    	*/
        private _dirty: bool;

        public set dirty(value: bool) {
            this._dirty = value;
        }

        public get dirty():bool {
            return this._dirty;
        }

        /**
        * 
        * @property _supportsCanvas
        * @type Boolean
        * @private
        */
        private _supportsCanvas: bool;

        /**
        * 
        * @property _supportsWebGL
        * @type Boolean
        * @private
        */
        private _supportsWebGL: bool;

        /**
        * 
        * @method isGroup
        * @return {Boolean}
        */
        public isGroup(): bool {
            return false;
        }

        /**
        * 
        * @method _addedToLayer
        * @param {Kiwi.Layer} layer
        * @return {Boolean}
        */
        private _addedToLayer(layer: Kiwi.Layer): bool {

            if (this.layer !== null)
            {
                klog.warn('Entity already exists on Layer ' + this.layer.id);

                return false;
            }
            else
            {
               
                    if (layer.game !== null)
                    {
                        this.game = layer.game;

                        if (this._clock === null)
                        {
                            this._clock = this.game.time.clock;
                        }
                    }

               
                    this.onAddedToLayer.dispatch(this, this.layer);

                    return true;
              

            }

        }

        /**
        * 
        * @method _removedFromLayer
        * @param {Kiwi.Layer} layer
        */
        private _removedFromLayer(layer: Kiwi.Layer) {

            this.layer = null;

            this.onRemovedFromLayer.dispatch(this, layer);

        }

        /**
        * 
        * @method _addedToState
        * @param {Kiwi.State} state
        * @return {Boolean}
        */
        private _addedToState(state: Kiwi.State): bool {

            klog.info('Entity added to State');

            this.state = state;

            this.game = this.state.game;

            if (this._clock === null)
            {
                this._clock = this.game.time.clock;
            }

            this.id = this.game.rnd.uuid();

            this.onAddedToState.dispatch(this, this.state);

            return true;

        }

        /**
        * 
        * @method _removedFromState
        * @param {Kiwi.State} state
        */
        private _removedFromState(state: Kiwi.State) {

            klog.info('Entity removed from State');

            this.state = null;

            this.game = null;

            this.onAddedToState.dispatch(this, state);

        }

        /**
		* Called when this Entity is added to a Group.
        * @method _addedToGroup
	    * @param {Kiwi.Group} group. The Group this Entity is being added to.
		**/
        private _addedToGroup(group: Kiwi.Group) {
            /*
            klog.info('Entity added to Group');

            if (this.transform.parent(group.transform) )
            {
                klog.warn('Entity.addedToGroup() called but parent already set d');
                return;
            }
          
            if (this.parent !== null)
            {
                //  Notify the current parent this child has been removed, they can only exist in one Group at once
                this.parent.removeChild(this);
            }
        
            this.parent = group;
            */
            if (group.game !== null)
            {
                this.game = group.game;
            
                if (this._clock === null)
                {
                    this._clock = this.game.time.clock;
                }
            }
            /*
            this.onAddedToGroup.dispatch(this, group);

            //  If the parent group has already been added to a layer then call addedToLayer on the Entity now,
            //  otherwise it happens when the Group is added to a layer
            if (this.parent.layer !== null)
            {
                this._addedToLayer(this.parent.layer);
            }
            */
        }

        /**
		* Called when this Entity is removed from a Group.
        * @method _removedFromGroup
	    * @param {Kiwi.Group} The Group this Entity has just been removed from.
		**/
        private _removedFromGroup(group: Kiwi.Group) {

            klog.info('Entity removed from Group');
            /*
            if (this.parent !== null)
            {
                //  TODO: Notify the current parent this child has been removed?
            }

            this.parent = null;

           
        */
            this.onRemovedFromGroup.dispatch(this, group);

        }

        /**
		* Called when this Entity has swapped to a new position within the Group.
        * @method _changedPosition
	    * @param {Kiwi.Group} The Group in which the change of position took place.
	    * @param {Number} The new position of this Entity in the Group.
		**/
        public _changedPosition(group: Kiwi.Group, index: number) {

            klog.info('Entity changed position within the group');

        }

        /**
        * If this is a DOM based Entity then you can modify CSS styles with this method. Has no effect on canvas based entities.
        * New styles will be applied the next time the Entity.update is called and the queue will be cleared.
        * @method addStyleUpdate
        * @param {String} key - The CSS style to add. If the style key already exists in the update queue it will be overwriten.
        * @param {String} value - The CSS value to be applied to the style.
        
        public addStyleUpdate(key: string, value: string) {

            //  Allows for over-write, so only one style update of the same key will exist
            this._cssStack[key] = value;

        }

        public addStyleTransformUpdate(key: string, value: string) {
            this._cssTransformStack[key] = value;
        }

        public applyTransformStyle() {
            var cssValue: string = "";
            for (var key in this._cssTransformStack) {
                cssValue += this._cssTransformStack[key] + " ";
                //delete this._cssTransformStack[key];
            }
            
            
            this.domElement.element.style.transform = cssValue;
            this.domElement.element.style['-o-transform'] = cssValue;
            this.domElement.element.style['-ms-transform'] = cssValue;
            this.domElement.element.style['-moz-transform'] = cssValue;
            this.domElement.element.style['-webkit-transform'] = cssValue;
         
            
        }*/ //--TO REMOVE

        //  Both of these methods can and often should be over-ridden by classes extending Entity to handle specific implementations

        /**
        * This isn't called until the Entity has been added to a Group or a State
        * @method update
        */
        public update() {
        
        }

        /**
        * This isn't called until the Entity has been added to a layer.
        * This functionality is handled by the sub classes. 
        * @method render
        */
        public render(camera:Kiwi.Camera) {
            
        }

        /**
        * 
        * @method destroy
        */
        public destroy() {

            this._exists = false;
            this._active = false;
            this._willRender = false;

        }

    }

}
