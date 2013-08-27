/// <reference path="Game.ts" />

/*
 *	Kiwi - Core - Component
 *
 *	@desc		The component base class.
 *
 *	@version	1.0 - 8th March 2013
 *
 *	@author 	Richard Davey
 *	@author		Ross Kettle
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi {

    export class Component {
        
        /** 
        * Constructor
        * @param {string} componentType - The type of this component (i.e. "geom", "css", "effect")
        * @param {string} componentName - The name of this component.
        */
        constructor (name:string) {

            //  Properties

            this.name = name;
            this.active = true;

            //  Signals

            this.onAddedToState = new Kiwi.Signal();
            this.onAddedToGroup = new Kiwi.Signal();
            this.onAddedToEntity = new Kiwi.Signal();
            this.onRemovedFromState = new Kiwi.Signal();
            this.onRemovedFromGroup = new Kiwi.Signal();
            this.onRemovedFromEntity = new Kiwi.Signal();
           
        }

        /**
        * Returns the type of this object
        * @return {String} The type of this object
        */
        public objType():string {
            return "Component";
        }

        //  Subscribe to these signals for update information
        public onAddedToState: Kiwi.Signal;
       
        public onAddedToGroup: Kiwi.Signal;
        public onAddedToEntity: Kiwi.Signal;

        public onRemovedFromState: Kiwi.Signal;
      
        public onRemovedFromGroup: Kiwi.Signal;
        public onRemovedFromEntity: Kiwi.Signal;

        //  Modify the state of this Component, such as adding to a Group, removing from a Layer, etc. Should be used by the internal Kiwi methods only.
        public modify(action:number, parent) {

            if (action === Kiwi.ADDED_TO_GROUP)
            {
                return this._addedToGroup(parent);
            }
           
            else if (action === Kiwi.ADDED_TO_STATE)
            {
                return this._addedToState(parent);
            }
            else if (action === Kiwi.ADDED_TO_ENTITY)
            {
                return this._addedToEntity(parent);
            }
            else if (action === Kiwi.REMOVED_FROM_GROUP)
            {
                return this._removedFromGroup(parent);
            }
           
            else if (action === Kiwi.REMOVED_FROM_STATE)
            {
                return this._removedFromState(parent);
            }
            else if (action === Kiwi.REMOVED_FROM_ENTITY)
            {
                return this._removedFromEntity(parent);
            }

        }

       

        /**
        * The state this Component has been added to, if any.
        * @property state
        * @type State
    	*/
        public state: Kiwi.State = null;

        /**
        * The Group this component has been added to, if any.
        * @property group
        * @type Entity
    	*/
        public group: Kiwi.Group = null;

        /**
        * The Entity this component has been added to, if any.
        * @property entity
        * @type Entity
    	*/
        public entity: Kiwi.Entity = null;

       

        /**
        * Called when this Component is added to a State
        * @method _addedToState
        * @param {Kiwi.State} state
        * @return {Boolean}
        */
        private _addedToState(state: Kiwi.State): bool {

            klog.info('Component added to State');

            this.state = state;

            this.game = this.state.game;

            this.onAddedToState.dispatch(this, this.state);

            return true;

        }

        /**
        * Called when this Component is removed from a State
        * @method _removedFromState
        * @param {Kiwi.State} state
        */
        private _removedFromState(state: Kiwi.State) {

            klog.info('Component removed from State');

            this.state = null;

            this.onAddedToState.dispatch(this, state);

        }

        /**
		* Called when this Componet is added to a Group.
        * @method _addedToGroup
	    * @param {Kiwi.Group} group. The Group this Component is being added to.
		**/
        private _addedToGroup(group: Kiwi.Group) {

            klog.info('Component added to Group');

            this.group = group;

            if (group.game !== null)
            {
                this.game = group.game;
            }

            this.onAddedToGroup.dispatch(this, group);

        }

        /**
		* Called when this Component is removed from a Group.
        * @method _removedFromGroup
	    * @param {Kiwi.Group} The Group this Component has just been removed from.
		**/
        private _removedFromGroup(group: Kiwi.Group) {

            klog.info('Component removed from Group');

            this.group = null;

            this.onRemovedFromGroup.dispatch(this, group);

        }

        /**
        * Called when this Componenet is added to an Entity
        * @method _addedToEntity
        * @param {Kiwi.Entity} entity
        * @return {Boolean}
        */
        private _addedToEntity(entity: Kiwi.Entity): bool {

            klog.info('Component added to Entity');

            this.entity = entity;

            if (this.entity.game !== null)
            {
                this.game = this.entity.game;
            }

            this.onAddedToEntity.dispatch(this, this.entity);

            return true;

        }

        /**
        * Called when this Componenet is removed from an Entity
        * @method _removedFromEntity
        * @param {Kiwi.Entity} entity
        */
        private _removedFromEntity(entity: Kiwi.Entity) {

            klog.info('Component removed from Entity');

            this.entity = null;

            this.onRemovedFromEntity.dispatch(this, entity);

        }
         
        /**
        * The game this Component belongs to
        * @property game
        * @type Game
	    */
        public game: Kiwi.Game = null;

        /**
        * The name of this component.
        * @property componentName
        * @type string
        **/
        public name: string;
         
        /**
		* An active Component is one that has its update method called by its parent.
        * @property active
        * @type Boolean
		**/
        public active: bool = true;

        /**
        * The state of this component. DEPRECATED so we can use signals instead, but left in case is needed elsewhere
        * @property dirty
        * @type boolean
        **/
        public dirty: bool = false;

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
        * Components can preRender, that is render before the parent renders
        * @method render
        */
        public preRender() { }

        /**
        * If the component renders, over-ride this function to provide implementation
        * @method render
        */
        public render() { }

        /**
        * Components can postRender, that is render after the parent has rendered
        * @method render
        */
        public postRender() { }

        /**
        * Destroys this component
        * @method destroy
        */
        public destroy() {

            this.active = false;

            this.entity = null;
            this.game = null;
            this.group = null;
          

            this.name = '';

        }
        
    }

}
