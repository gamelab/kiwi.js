/**
* 
* @module Kiwi
* 
*/

module Kiwi {
    
    /**
    * A IChild is an Interface (defined as a class as the documentation does not support Interfaces just yet),
    * which outlines the methods/properties that objects which are intended to be added as a child of a Stage or Group must have in order to work.
    * As Javascript does not use Interfaces, the IChild does not appear directly in the library. It describes common elements of Kiwi.Group and Kiwi.Entity.
    * 
    * @class IChild
    * @namespace Kiwi
    */
    export interface IChild {

        /**
        * Renders the entity.
        * 
        * @method render
        * @param camera {Kiwi.Camera}
        * @public
        * @deprecated Only Kiwi.Entity and inheritors are rendered.
        */
        render(camera: Kiwi.Camera);

        /**
        * Update the entity. Automatically called every frame.
        *
        * @method update
        * @public
        */
        update();

        /**
        * Represents the type of child that this is.
        * 
        * @method childType
        * @return number
        * @public
        */
        childType(): number;

        /**
        * Unique identifier instantiated on creation.
        * 
        * @property id
        * @type string
        * @public
        */
        id: string;

        /**
        * A name for this object. This is not necessary or necessarily unique, but is handy for identifying objects.
        *
        * @property name
        * @type string
        * @public
        */
        name: string;

        /**
        * The game this object belongs to
        *
        * @property game
        * @type Kiwi.Game
        * @public
        */
        game: Kiwi.Game;

        /**
        * The State that this object belongs to
        *
        * @property state
        * @type Kiwi.State
        * @public
        */
        state: Kiwi.State;

        /**
        * The Component Manager
        *
        * @property components
        * @type Kiwi.ComponentManager
        * @public
        */
        components: Kiwi.ComponentManager;

        /**
        * An indication of whether or not this object is 'dirty' and thus needs to be re-rendered in some manner.
        *
        * @property dirty
        * @type boolean
        * @public
        */
        dirty: boolean;

        /**
        * Toggles the active state. An active object has its update method called by its parent.
        *
        * @property active
        * @type boolean
        * @public
        */
        active: boolean;

        /**
        * Toggles the exitence of this object. An object that no longer exists can be garbage collected or re-allocated in a pool
        * This method should be over-ridden to handle specific canvas/webgl implementations.
        *
        * @property exists
        * @type boolean
        * @public
        */
        exists: boolean;

        /**
        * Controls whether this object's render methods are called by its parent.
        *
        * @property willRender
        * @type boolean
        * @public
        * @deprecated Use visible instead
        */
        willRender: boolean;

        /**
        * Controls whether this object's render methods are called by its parent.
        *
        * @property visible
        * @type boolean
        * @public
        * @since 1.0.1
        */
        visible: boolean;

        /**
        * Sets the parent of this object. It is recommended to update transforms when you set this.
        *
        * @property parent
        * @type Kiwi.Group
        * @public
        */
        parent: Kiwi.Group;

        /**
        * The transform for this object. 
        * Transform handles the calculation of coordinates/rotation/scale etc in the game world.
        * @property transform
        * @type Kiwi.Geom.Transform
        * @public
        */
        transform: Kiwi.Geom.Transform;

        /**
        * The X coordinate of this object. This is just aliased to the transform property.
        * @property x
        * @type number
        * @public
        */
        x: number;

        /**
        * The Y coordinate of this object. This is just aliased to the transform property.
        * @property y
        * @type number
        * @public
        */
        y: number;

        /**
        * The X coordinate of this object in world space - that is, after inheriting transforms from parents. This is just aliased to the transform property.
        * @property worldX
        * @type number
        * @public
        * @since 1.1.0
        */
        worldX: number;

        /**
        * The Y coordinate of this object in world space - that is, after inheriting transforms from parents. This is just aliased to the transform property.
        * @property worldY
        * @type number
        * @public
        * @since 1.1.0
        */
        worldY: number;

        /**
        * The rotation of this object. This is just aliased to the transform property.
        * @property rotation
        * @type number
        * @public
        */
        rotation: number;

        /**
        * The Scale X of this object. This is just aliased to the transform property.
        * @property scaleX
        * @type number
        * @public
        */
        scaleX: number;

        /**
        * The Scale Y of this object. This is just aliased to the transform property.
        * @property scaleY
        * @type number
        * @public
        */
        scaleY: number;

        /**
        * The scale of this object. This is just aliased to the transform property.
        * @property scale
        * @type number
        * @public
        * @since 1.1.0
        */
        scale: number;

        /**
        * The rotation offset of this object on the X axis. This is just aliased to the transform property.
        * @property rotPointX
        * @type number
        * @public
        * @since 1.1.0
        */
        rotPointX: number;

        /**
        * The rotation offset of this object on the Y axis. This is just aliased to the transform property.
        * @property rotPointY
        * @type number
        * @public
        * @since 1.1.0
        */
        rotPointY: number;

        /**
        * The anchor point offset of this object on the X axis. This is an alias of the rotPointX property on the transform.
        * @property anchorPointX
        * @type number
        * @public
        * @since 1.1.0
        */
        anchorPointX: number;

        /**
        * The anchor point offset of this object on the Y axis. This is an alias of the rotPointY property on the transform.
        * @property anchorPointY
        * @type number
        * @public
        * @since 1.1.0
        */
        anchorPointY: number;

        /**
        * Call this to clean up the object for deletion and garbage collection.
        * @method destroy
        * @param [immediate=false] {boolean} If the object should be immediately removed or if it should be removed at the end of the next update loop.
        * @public
        */
        destroy(...params: any[]);

        /**
        * Adds a new Tag to this IChild. Useful for identifying large amounts of the same type of GameObjects.
        * @method addTag
        * @param tag {string}
        * @since 1.1.0
        * @public
        */
        addTag(...params: any[]);
        
        /**
        * Removes a Tag from this IChild.
        * @method removeTag
        * @param tag {string}
        * @since 1.1.0
        * @public
        */
        removeTag(...params: any[]);
        
        /**
        * Checks to see if this IChild has a Tag based upon a string which you pass.
        * @method hasTag
        * @param tag {string}
        * @since 1.1.0
        * @public
        */
        hasTag(tag: string): boolean;

    }

}