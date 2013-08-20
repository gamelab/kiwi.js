
/*
 *	Kiwi - Core - Entity
 *				
 *	@desc		Serves as a container for components and core framework properties.
 *				Each Entity has a unique ID (UID) which is automatically generated upon instantiation.
 *
 *	@version	1.1 - 1st March 2013 / Version way higher since then.
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

        /*
        * Represents the position, scale, rotation and registration of this Entity.
        * @property transform
        * @type Kiwi.Geom.Transform
        */
        public transform: Kiwi.Geom.Transform;

        /*
        * Get the X coordinate of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public get x(): number {
            return this.transform.x;
        }
        
        /*
        * Set the X coordinate of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public set x(value: number) {
            this.transform.x = value;
        }
        
        /*
        * Get the Y coordinate of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public get y(): number {
            return this.transform.y;
        }
        
        /*
        * Set the Y coordinate of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public set y(value: number) {
            this.transform.y = value;
        }
        
        /*
        * Get the Scale X of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public get scaleX():number {
            return this.transform.scaleX;
        }
        
        /*
        * Set the Scale X coordinate of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public set scaleX(value:number) {
            this.transform.scaleX = value;
        }

        /*
        * Get the Scale Y coordinate of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public get scaleY(): number {
            return this.transform.scaleY;
        }
        
        /*
        * Set the Scale Y coordinate of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public set scaleY(value: number) {
            this.transform.scaleY = value;
        }
        
        /*
        * Get the rotation of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public get rotation(): number {
            return this.transform.rotation;
        }
        
        /*
        * Get the rotation of this Entity. This is just aliased to the transform property.
        * @type Number
        */
        public set rotation(value: number) {
            this.transform.rotation = value;
        }
        
        /*
        * Returns the type of child that this is. 
        * @type Number
        */
        public childType():number {
            return Kiwi.ENTITY;
        }

        /*
        * A signal that will dispatch an event when this entity has been added to a group.
        * @property onAddedToGroup
        * @type Kiwi.Signal
        */
        public onAddedToGroup: Kiwi.Signal;
        
        /*
        * A signal that will dispatch an event when this entity has been added to a layer.
        * @property onAddedToLayer
        * @type Kiwi.Signal
        */
        public onAddedToLayer: Kiwi.Signal;
        
        /*
        * A signal that will dispatch an event when this entity has been added to a state.
        * @property onAddedToState
        * @type Kiwi.Signal
        */
        public onAddedToState: Kiwi.Signal;

        /*
        * A signal that will dispatch an event when this entity has been removed from a group.
        * @property onRemovedFromGroup
        * @type Kiwi.Signal
        */
        public onRemovedFromGroup: Kiwi.Signal;
        
        /*
        * A signal that will dispatch an event when this entity has been removed from a layer.
        * @property onRemovedFromLayer
        * @type Kiwi.Signal
        */
        public onRemovedFromLayer: Kiwi.Signal;
        
        /*
        * A signal that will dispatch an event when this entity has been removed from a state.
        * @property onRemovedFromState
        * @type Kiwi.Signal
        */
        public onRemovedFromState: Kiwi.Signal;

        /*
        * Modify the state of this Entity, such as adding to a Group, removing from a Layer, etc. Should be used by the internal Kiwi methods only.
        *
        * @method modify
        * @param {Number} action
        * @param {Any} parent
        */
        public modify(action:number, parent) {

            if (action === Kiwi.ADDED_TO_GROUP)
            {
                return this._addedToGroup(parent);
            }
            else if (action === Kiwi.ADDED_TO_STATE)
            {
                return this._addedToState(parent);
            }
            else if (action === Kiwi.REMOVED_FROM_GROUP)
            {
                return this._removedFromGroup(parent);
            }
            else if (action === Kiwi.REMOVED_FROM_STATE)
            {
                return this._removedFromState(parent);
            }

        }

        /*
        * The actual alpha of this entity.
        * @property _alpha
        * @type Number
        */
        private _alpha: number = 1;

        /*
        * Set the alpha of this entity. A number between 0 (invisible) and 1 (completely visible).
        * @type Number
        */
        public set alpha(value: number) {
            if (value <= 0) value = 0;
            if (value > 1) value = 1;
            this._alpha = value;
        }
        
        /*
        * Get the alpha of this entity. A number between 0 (invisible) and 1 (completely visible).
        * @type Number
        */
        public get alpha(): number {
            return this._alpha;
        }

        /*
        * A boolean that indicates weither or not this entity is visible or not. Note that is does not get set to false if the alpha is 0.
        * @property _visible
        * @type bool
        */
        private _visible: bool = true;
        
        /*
        * Set the visiblity of this entity. True or False.
        * @type bool
        */
        public set visiblity(value: bool) {
            this._visible = value;
        }
        
        /*
        * Get the visiblity of this entity. Note that is does not get set to false if the alpha is 0.
        * @type bool
        */
        public get visiblity(): bool {
            return this._visible;
        }
        
        /*
        * The width of the entity in pixels.
        * @property width
        * @type number
        */
        public width: number = 0;   //if bounds are implemented then getters and setters here would be nice.
        
        /*
        * The height of the entity in pixels.
        * @property height
        * @type number
        */
        public height: number = 0;  
        
        /*
        * The texture atlas that is to be used on this entity.
        * @property atlas
        * @type Kiwi.Textures.TextureAtlas
        */
        public atlas: Kiwi.Textures.TextureAtlas;
        
        /*
        * Used as a reference to a single Cell in the atlas that is to be rendered. 
        * E.g. If you had a spritesheet with 3 frames/cells and you wanted the second frame to be displayed you would change this value to 1
        * @property
        * @type
        */
        public cellIndex: number = 0; //perhaps check to see that the cell index exists before allowing it to be set

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
		* If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property exists 
        * @type Boolean
		**/
        private _exists: bool;

        /**
		* Toggles the existence of this Entity. An Entity that no longer exists can be garbage collected or re-allocated in a pool
        * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
		**/
        public set exists(value: bool) {
            this._exists = value;
        }
        
        /**
		* Toggles the existence of this Entity. An Entity that no longer exists can be garbage collected or re-allocated in a pool
        * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
		**/
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

        /**
		* An active Entity is one that has its update method called by its parent.
        * @property _active
        * @type Boolean
		**/
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

        /**
		* Controls whether render is automatically called by the parent. 
        * @property _willRender
        * @type Boolean
		*/
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
        
        /**
		* Controls if this Entity is input enabled or not (i.e. responds to touch/mouse events)
        * This method should be over-ridden to handle specific game object implementations.
		**/
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
    
        /**
		* If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property exists 
        * @type Boolean
		**/
        public get clock(): Kiwi.Time.Clock {
            return this._clock;
        }

        /**
		* A value used by components to control if the Entity needs re-rendering
        * @property dirty
        * @type Boolean
    	*/
        private _dirty: bool;
        
        /**
		* A value used by components to control if the Entity needs re-rendering
        * @property dirty
        * @type Boolean
    	*/
        public set dirty(value: bool) {
            this._dirty = value;
        }
    
        /**
		* A value used by components to control if the Entity needs re-rendering
        * @property dirty
        * @type Boolean
    	*/
        public get dirty():bool {
            return this._dirty;
        }

      

        /**
        * Executes when the entity gets added to a state. 
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
        * Is executed when the entity gets removed from a state.
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
            
            klog.info('Entity added to Group');
            /*
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
