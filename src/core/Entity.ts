/**
* 
* @module Kiwi
* 
*/

module Kiwi {

    /**
    * An Entity serves as a container for game objects to extend from and thus you should never directly instantiate this class.
    * Each Entity has a unique ID (UID) which is automatically generated upon instantiation.
    * Every entity requires that you pass to it the state that it belongs too, that way when you switch states the appropriate entitys can be deleted.
    * 
    * @class Entity
    * @namespace Kiwi
    * @constructor
    * @param state {State} The state that this entity belongs to. Used to generate the Unique ID and for garbage collection.
    * @param x {Number} The entities position on the x axis.
    * @param y {Number} The entities position on the y axis.
    * @return {Entity} This entity.
    *
    */
    export class Entity implements Kiwi.IChild {
         
        constructor(state: Kiwi.State, x:number, y: number) {
            
            //  Properties
            this.state = state;
            this.game = state.game;
            this.id = this.game.rnd.uuid();
            this.state.addToTrackingList(this);
            this._clock = this.game.time.clock;
             
            this._exists = true;
            this._active = true;
            this._willRender = true;
            this.components = new Kiwi.ComponentManager(Kiwi.ENTITY, this); 
            this.transform = new Kiwi.Geom.Transform();
            this.transform.x = x;
            this.transform.y = y; 

            
        }

        public glRenderer: Kiwi.Renderers.Renderer;


        /**
        * Represents the position, scale, rotation and registration of this Entity.
        * @property transform
        * @type Transform
        * @public
        */
        public transform: Kiwi.Geom.Transform;

        /**
        * The group that this entity belongs to. If added onto the state then this is the state.
        * @property _parent
        * @type Group
        * @private
        */
        private _parent: Kiwi.Group = null;

        /**
        * The group that this entity belongs to/is a child of once added to one. If added onto the state then this is the state.
        * @property parent
        * @type Group
        * @param val {Group}
        * @public
        */
        public set parent(val: Kiwi.Group) {
            this.transform.parent = (val !== null) ? val.transform : null ;
            this._parent = val;
        }
        public get parent(): Kiwi.Group {
            return this._parent;
        }

        /**
        * X coordinate of this Entity. This is just aliased to the transform property.
        * @property x
        * @type Number
        * @public
        */
        public get x(): number {
            return this.transform.x;
        }
        public set x(value: number) {
            this.transform.x = value;
        }
        
        /**
        * Y coordinate of this Entity. This is just aliased to the transform property.
        * @property y
        * @type Number
        * @public
        */
        public get y(): number {
            return this.transform.y;
        }
        
        public set y(value: number) {
            this.transform.y = value;
        }
        
        /**
        * Scale X of this Entity. This is just aliased to the transform property.
        * @property scaleX
        * @type Number
        * @public
        */
        public get scaleX():number {
            return this.transform.scaleX;
        }
        public set scaleX(value:number) {
            this.transform.scaleX = value;
        }

        /**
        * Scale Y coordinate of this Entity. This is just aliased to the transform property.
        * @property scaleY
        * @type Number
        * @public
        */
        public get scaleY(): number {
            return this.transform.scaleY;
        }
        
        public set scaleY(value: number) {
            this.transform.scaleY = value;
        }
        
        /**
        * Rotation of this Entity. This is just aliased to the transform property.
        * @property rotation
        * @type Number
        * @public
        */
        public get rotation(): number {
            return this.transform.rotation;
        }
        public set rotation(value: number) {
            this.transform.rotation = value;
        }
        
        /**
        * The rotation point on the x-axis. This is just aliased to the rotPointX on the transform object.
        * @property rotPointX
        * @type number
        * @public
        */
        public get rotPointX(): number {
            return this.transform.rotPointX;
        }
        public set rotPointX(value: number) {
            this.transform.rotPointX = value;
        }
        
        /**
        * The rotation point on the y-axis. This is just aliased to the rotPointY on the transform object.
        * @property rotPointY
        * @type number
        * @public
        */
        public get rotPointY(): number {
            return this.transform.rotPointY;
        }
        public set rotPointY(value: number) {
            this.transform.rotPointY = value;
        }

        /**
        * Returns the type of child that this is. 
        * @type Number
        * @return {Number} returns the type of child that the entity is
        * @public
        */
        public childType():number {
            return Kiwi.ENTITY;
        }

        /**
        * The actual alpha of this entity.
        * @property _alpha
        * @type Number
        * @private
        */
        private _alpha: number = 1;

        /**
        * Alpha of this entity. A number between 0 (invisible) and 1 (completely visible).
        * @property alpha
        * @type Number
        * @public
        */
        public set alpha(value: number) {
            if (value <= 0) value = 0;
            if (value > 1) value = 1;
            this._alpha = value;
        }
        
        public get alpha(): number {
            return this._alpha;
        }

        /**
        * A boolean that indicates whether or not this entity is visible or not. Note that is does not get set to false if the alpha is 0.
        * @property _visible
        * @type boolean
        * @default true
        * @private
        */
        private _visible: boolean = true;
        
        /**
        * Set the visiblity of this entity. True or False.
        * @property visibility
        * @type boolean
        * @default true
        * @public
        */
        public set visible(value: boolean) {
            this._visible = value;
        }
        public get visible(): boolean {
            return this._visible;
        }
        
        /**
        * The width of the entity in pixels.
        * @property width
        * @type number
        * @default 0 
        * @public
        */
        public width: number = 0;   //If bounds are implemented then getters and setters here would be nice.
        
        /**
        * The height of the entity in pixels.
        * @property height
        * @type number
        * @default 0
        * @public
        */
        public height: number = 0;  
        
        /**
        * The texture atlas that is to be used on this entity.
        * @property atlas
        * @type TextureAtlas
        * @public
        */
        public atlas: Kiwi.Textures.TextureAtlas = null;
        
        /**
        * Holds the current cell that is being used by the entity.
        * @property _cellIndex
        * @type number
        * @default 0
        * @private
        */
        private _cellIndex: number = 0; 
        
        /**
        * Used as a reference to a single Cell in the atlas that is to be rendered. 
        * E.g. If you had a spritesheet with 3 frames/cells and you wanted the second frame to be displayed you would change this value to 1
        * @property cellIndex
        * @type number
        * @default 0
        * @public
        */
        public get cellIndex():number {
            return this._cellIndex;
        }

        public set cellIndex(val: number) {
            //If the entity has a texture atlas
            if (this.atlas !== null) {
                var cell = this.atlas.cells[val];

                if (cell !== undefined) {
                    //Update the width/height of the GameObject to be the same as the width/height
                    this._cellIndex = val;
                    this.width = cell.w;
                    this.height = cell.h;

                } else {

                    if (this.game.debug) console.error('Could not the set the cellIndex of a Entity, to cell that does not exist on its TextureAtlas.');

                }
            }
        }

        /**
        * The Component Manager
        * @property components
        * @type ComponentManager
        * @public
	    */
        public components: Kiwi.ComponentManager;

        /**
        * The game this Entity belongs to
        * @property game
        * @type Game
        * @public
	    */
        public game: Kiwi.Game;

        /**
        * The state this Entity belongs to (either the current game state or a persistent world state)
        * @property state
        * @type State
        * @public
    	*/
        public state: Kiwi.State;

        /**
        * A unique identifier for this Entity within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type string
        * @public
    	*/
        public id: string;

        /**
        * A name for this Entity. This is not checked for uniqueness within the Game, but is very useful for debugging
        * @property name
        * @type string
        * @default ''
        * @public
    	*/
        public name: string = '';

        /**
		* If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property _exists 
        * @type boolean
        * @private
		*/
        private _exists: boolean;

        /**
		* Toggles the existence of this Entity. An Entity that no longer exists can be garbage collected or re-allocated in a pool.
        * @property exists
        * @type boolean
        * @public
		*/
        public set exists(value: boolean) {
            this._exists = value;
        }
        public get exists():boolean {
            return this._exists;
        }

        /**
		* An active Entity is one that has its update method called by its parent. 
        * @property _active
        * @type boolean
        * @default true
        * @private
		*/
        private _active: boolean;

        /**
		* Toggles the active state of this Entity. An Entity that is active has its update method called by its parent.
        * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
        * @property active
        * @type boolean
        * @public
		*/
        public set active(value: boolean) {
            this._active = value;
        }
        public get active():boolean {
            return this._active;
        }

        /**
		* Controls whether render is automatically called by the parent. 
        * @property _willRender
        * @type boolean
        * @default true
        * @private
		*/
		private _willRender: boolean;

        /**
		* Toggles if this Entity will be rendered by a canvas layer. Use the visibile component for DOM layers.
        * @property willRender
        * @type boolean
        * @default true
        * @public
		*/
        public set willRender(value: boolean) {
            this._willRender = value;
        }
        public get willRender():boolean {
            return this._willRender;
        }

        /**
		* If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property exists 
        * @type boolean
        * @private
		*/
        private _inputEnabled: boolean;

        /**
		* Controls if this Entity is input enabled or not (i.e. responds to touch/mouse events)
        * This method should be over-ridden to handle specific game object implementations.
        * @property inputEnabled
        * @type boolean
        * @public
		*/
        public set inputEnabled(value: boolean) {
            this._inputEnabled = value;
        }
        public get inputEnabled():boolean {
            return this._inputEnabled;
        }
        
        /**
		* The clock that this entity use's for time based calculations. This generated by the state on instatiation.
        * @property _clock
        * @type Clock
        * @private
		*/
        private _clock: Kiwi.Time.Clock = null;

        /**
		* The Clock used to update this all of this Entities components (defaults to the Game MasterClock)
        * @property clock 
        * @type Clock
        * @public
		*/
        public set clock(value: Kiwi.Time.Clock) {
            this._clock = value;
        }
        public get clock(): Kiwi.Time.Clock {
            return this._clock;
        }

        /**
		* A value used by components to control if the Entity needs re-rendering
        * @property dirty
        * @type boolean
        * @private
    	*/
        private _dirty: boolean;
        
        /**
		* A value used by components to control if the Entity needs re-rendering
        * @property dirty
        * @type boolean
        * @public
    	*/
        public set dirty(value: boolean) {
            this._dirty = value;
        }
        public get dirty():boolean {
            return this._dirty;
        }

        //  Both of these methods can and often should be over-ridden by classes extending Entity to handle specific implementations

        /**
        * The type of this object.
        * @method objType
        * @return {String} The type of the object
        * @public
        */
        public objType() {
            return "Entity";
        }

        /**
        * This isn't called until the Entity has been added to a Group or a State.
        * Note: If added to a Group, who is not 'active' (so the Groups update loop doesn't run) then each member will not execute either.
        * @method update
        * @public
        */
        public update() {
            
        }

        /**
        * This isn't called until the Entity has been added to a Group/State which is active.
        * This functionality is handled by the sub classes. 
        * @method render
        * @param {Camera} camera
        * @public
        */
        public render(camera:Kiwi.Camera) {
        
        }

        /**
        * 
        * 
        * 
        */
        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params: any = null) {
        
        }

        /**
        * Used to completely destroy this entity and of its components. Used for garbage collection and developers can also use it as needed.
        * @method destroy
        * @param [immediate=false] {boolean} If the object should be immediately removed or if it should be removed at the end of the next update loop.
        * @public
        */
        public destroy(immediate: boolean = false) {
            
            this._exists = false;
            this._active = false;
            this._willRender = false;

            if (immediate === true) {
                
                if (this.parent !== null && typeof this.parent !== "undefined") this.parent.removeChild(this);
                if (this.state) this.state.removeFromTrackingList(this);
                delete this._parent;
                delete this.transform;
                delete this._clock;
                delete this.state;
                delete this.game;
                delete this.atlas;

                if (this.components) this.components.removeAll(true);
                delete this.components;

            }
        }

    }

}
