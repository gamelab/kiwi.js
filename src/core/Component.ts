/**
* Module - Kiwi (Core)
* @module Kiwi
* 
*/

module Kiwi {

    /**
    * The component base class.
    *
    * @class Component
    */

    export class Component {
        
        /** 
        * [REQUIRES DESCRIPTION]
        * @constructor
        * @param {string} componentName - The name of this component.
        * @return {Kiwi.Component}
        */
        constructor (owner:IChild, name:string) {

            this.owner = owner; 
            this.game = this.owner.game;
            this.name = name;
            this.active = true;

        }

        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        */
        public objType():string {
            return "Component";
        }
        
        /**
        * The IChild that owns this entity
        * @property owner
        * @type IChild
        */
        public owner: Kiwi.IChild;

        /**
        * The game this Component belongs to
        * @property game
        * @type Game
	    */
        public game: Kiwi.Game;

        /**
        * The name of this component.
        * @property name
        * @type string
        **/
        public name: string;
         
        /**
		* An active Component is one that has its update method called by its parent.
        * @property active
        * @type Boolean
		**/
        public active: boolean = true;

        /**
        * The state of this component. DEPRECATED so we can use signals instead, but left in case is needed elsewhere
        * @property dirty
        * @type boolean
        **/
        public dirty: boolean = false;

        /**
        * Components can preUpdate, that is update before the parent updates
        * @method preUpdate
        */
        public preUpdate() { }

        /**
        * If the component is being added to a State rather than a Game Object then over-ride its update method to perform required tasks.
        * @method update
        */
        public update() { }

        /**
        * Components can postUpdate, that is run an update after the parent has updated
        * @method postUpdate
        */
        public postUpdate() { }

        /**
        * Destroys this component
        * @method destroy
        */
        public destroy() {

            this.active = false;
            delete this.game;
            delete this.owner;

            this.name = '';

        }
        
    }

}
