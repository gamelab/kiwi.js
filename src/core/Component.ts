/**
* 
* @module Kiwi
* 
*/

module Kiwi {

    /**
    * The base class that all components extend from and thus contains all of the common functionality that is required of every Component. 
    *
    * @class Component
    * @namespace Kiwi
    * @constructor
    * @param owner {IChild} The IChild that this component belongs to.
    * @param componentName {String} The name of this component.
    * @return {Component}
    */ 
    export class Component {
         
        constructor (owner:Kiwi.IChild, name:string) {

            this.owner = owner; 
            this.game = this.owner.game;
            this.name = name;
            this.active = true;

        }

        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        * @public
        */
        public objType():string {
            return "Component";
        }
        
        /**
        * The IChild that owns this entity
        * @property owner
        * @type IChild
        * @public
        */
        public owner: Kiwi.IChild;

        /**
        * The game this Component belongs to
        * @property game
        * @type Game
        * @public
	    */
        public game: Kiwi.Game;

        /**
        * The name of this component.
        * @property name
        * @type string
        * @public 
        */
        public name: string;
         
        /**
		* An active Component is one that has its update method called by its parent.
        * @property active
        * @type boolean
        * @default true
		* @public
        */
        public active: boolean = true;

        /**
        * The state of this component. 
        * @property dirty
        * @type boolean
        * @default false
        * @public
        */
        public dirty: boolean = false;

        /**
        * Components can preUpdate, that is update before the parent updates. This is to be overriden by subclasses.
        * @method preUpdate
        * @public
        */
        public preUpdate() { }

        /**
        * If the component is being added to a State rather than a Game Object then over-ride its update method to perform required tasks.
        * @method update
        * @public
        */
        public update() { }

        /**
        * Components can postUpdate, that is run an update after the parent has updated. This is to be overriden by subclasses.
        * @method postUpdate
        * @public
        */
        public postUpdate() { }

        /**
        * Destroys this component and all of the properties that exist on it.
        * @method destroy
        * @public
        */
        public destroy() {

            this.active = false;
            delete this.game;
            delete this.owner;

            this.name = '';

        }
        
    }

}
