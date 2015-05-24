/**
* 
* @module Kiwi
* 
*/

module Kiwi {

	/**
	* The base class that all components extend from. It contains all of the common functionality that is required of every Component.
	* Any object  
	*
	* @class Component
	* @namespace Kiwi
	* @constructor
	* @param owner {Object} The object that this component belongs to. 
	* @param componentName {String} The name of this component.
	* @return {Kiwi.Component}
	*/
	export class Component {

		constructor (owner:Kiwi.IChild, name:string) {

			this.owner = owner; 
			this.game = this.owner.game;
            this.name = name;
               
            if (this.owner.state) {
                this.state = this.owner.state;
            } else if (this.owner.objType() === 'State') {
                this.state = (<Kiwi.State>this.owner);
            }

            this.active = true;

		}

		/**
		* Returns the type of this object
		* @method objType
		* @return {String} "Component"
		* @public
		*/
		public objType():string {
			return "Component";
		}

		/**
		* The object that owns this entity
		* @property owner
		* @type Object
		* @public
		*/
		public owner: Kiwi.IChild;
           
        /**
        * The state which this component's owner belongs to.
        * @property state
        * @type Kiwi.State
        * @since 1.3.1
        * @public
        */
        public state: Kiwi.State;

		/**
		* The game this Component belongs to
		* @property game
		* @type Kiwi.Game
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
		* @deprecated
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
