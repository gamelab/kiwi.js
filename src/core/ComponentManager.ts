/**
* 
* @module Kiwi
* 
*/

module Kiwi {

    /**
    * The component manager is a class that is used to handle a number of components that are active on a particular object.
    * This way if you want to check to see if a particular component is on an object you can ask the component manager, 
    * Or when updating components you can tell the component manager to update and all of the components will update as well.
    *
    * @class ComponentManager
    * @namespace Kiwi
    * @constructor
    * @param type {number} - The type of object that this component manager's owner is.
    * @param owner {IChild} - The owner of this component manager.
    * @return {ComponentManager} 
    * 
    */
    export class ComponentManager {
         
        constructor(type: number, owner:any) {

            this._components = {};

            this._type = type;
            this._owner = owner;

        }

        /**
        * Returns the type of this object
        * @method objType
        * @return {string} The type of this object
        * @public
        */
        public objType():string {
            return "ComponentManager";
        }

        /**
        * The owner of this Component Manager
        * @property _owner
        * @type {any}
        * @private
        */
        private _owner: any;

        /**
        * The type of this object.
        * @property _type
        * @type number
        * @private
        */
        private _type: number;

        /**
        * A list of all components that are currently on the ComponentManager
        * @property _components
        * @type Component 
        * @private
        */
        public _components;

        /**
        * Returns true if this contains the component given, false otherwise.
        * @method hasComponent
        * @param value {String} the name of the component
        * @return {boolean} True if this component manager contains the given component, false otherwise.
        * @public
        */
        public hasComponent(value: string): boolean {

            if (this._components[value]) {
                return true;
            }

            return false; 
        }

        /**
        * Returns true if this contains the component given and the component is active, false otherwise.
        * @method hasActiveComponent
        * @param value {String} The name of the component.
        * @return {boolean} true if this manager contains the component and it is active, false otherwise.
        * @public
        */
        public hasActiveComponent(value: string): boolean {

            if (this._components[value] && this._components[value].active === true)
            {
                return true;
            }

            return false;

        }

        /**
        * Get an existing component that has been added to the layer by its name
        * @method getComponent
        * @param value {String} The component name
        * @return {Component} The component, if found, otherwise null
        * @public
        */
        public getComponent(value: string): any {

            if (this._components[value]) {
                return this._components[value];
            }

            return null; 
        }

        /**
        * Adds a Component to the manager.
        * @method add
        * @param component {Component} The component to add
        * @return {Component} The component that was added
        * @public
        */
        public add(component: Kiwi.Component): any {

            this._components[component.name] = component;

            return component; 
        }

        /** 
        * Adds a batch of components to the manager at a single time. 
        * @method addBatch
        * @param value* {Component} The component/s that you would like to add.
        * @public
        */
        public addBatch(...paramsArr: any[]) {

            for (var i = 0; i < paramsArr.length; i++) {
                this.add(paramsArr[i]);
            }

        }

        /**
        * Removes a component from the component manager
        * @method removeComponent
        * @param component {Component} The component to be removed.
        * @param [destroy=true] {boolean} If the destroy method is to be called on the component when it is removed.
        * @return {boolean} true if the component was removed successfully
        * @public
        */
        public removeComponent(component: Kiwi.Component, destroy: boolean = true): boolean {

            var name = component.name;

            if (this._components[name]) {
                if (destroy) {
                    this._components[name].destroy();
                }
                
                delete this._components[name];

                return true; 
            }

            return false; 
        }

        /**
        * Removes a component based on its name
        * @method removeComponentByName
        * @param name {String} The name of the component to be removed
        * @param [destroy=true] {boolean} If the destroy method is to be called on the component when it is removed.
        * @return {boolean} true if the component was removed successfully
        * @public
        */
        public removeComponentByName(name: string, destroy: boolean = true): boolean {

            if (this._components[name]) {
                if (destroy) {
                    this._components[name].destroy();
                }
                
                delete this._components[name];

                return true; 
            }

            return false; 
        }

        /**
        * Removes all of the components from the component manager. 
        * @method removeAll
        * @param [destroy=true] {boolean} If true will destroy all components
        * @public
        */
        public removeAll(destroy: boolean = true) {
            for (var key in this._components) { 
                this.removeComponent(this._components[key], destroy);
            }
        }

        /**
		* Calls preUpdate on all active Components
        * @method preUpdate
        * @public
    	*/
        public preUpdate() {

            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].preUpdate();
                }
            }
        
        }

        /**
		* Calls update on all active Components
        * @method update
        * @public
    	*/
        public update() {
        
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].update();
                }
            }
        
        }

        /**
		* Calls postUpdate on all active Components
        * @method postUpdate
        * @public
    	*/
        public postUpdate() {
        
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].postUpdate();
                }
            }
        
        }

        /**
		* Calls preRender on all active Components
        * @method preRender
        * @public
    	*/
        public preRender() {
        
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].preRender();
                }
            }
        
        }

        /**
		* Renders all active Components
        * @method render
        * @public
    	*/
        public render() {
        
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].render();
                }
            }
        
        }

        /**
		* Calls postRender on all active Components
        * @method postRender
        * @public
    	*/
        public postRender() {
        
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].postRender();
                }
            }
        
        }
         
    }

}
