/// <reference path="Component.ts" />

/*
 *	Kiwi - Core - Component Manager
 *
 *	@desc		
 *				
 *	@version    1.0 - 18th March 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *				
*/

module Kiwi {

    export class ComponentManager {

        /**
        *
        * @constructor
        * @param {number} type
        * @param {any} owner
        * @return {Kiwi.ComponentManager} 
        */
        constructor(type: number, owner) {

            this._components = {};

            this._type = type;
            this._owner = owner;

        }

        /**
        * Returns the type of this object
        * @return {string} The type of this object
        */
        public objType():string {
            return "ComponentManager";
        }

        /**
        * The owner of this Component Manager
        * @property _owner
        * @type {any}
        **/
        private _owner: any;

        /**
        * The type of this object
        * @property _type
        * @type number
        **/
        private _type: number;

        /**
        * A list of all components
        * @property _components
        * @type Kiwi.Component {}
        **/
        public _components;

        /**
        * Returns true if this contains the component given, false otherwise.
        * @method hasComponent
        * @param {String} the name of the component
        * @return {Boolean} True if this component manager contains the given component, false otherwise.
        **/
        public hasComponent(value: string): bool {

            if (this._components[value]) {
                return true;
            }

            return false; 
        }

        /**
        * Returns true if this contains the component given and the component is active, false otherwise.
        * @method hasActiveComponent
        * @param {String} The name of the component.
        * @return {Boolean} true if this manager contains the component and it is active, false otherwise.
        **/
        public hasActiveComponent(value: string): bool {

            if (this._components[value] && this._components[value].active === true)
            {
                return true;
            }

            return false;

        }

        /**
        * Get an existing component that has been added to the layer by its name
        * @method getComponent
        * @param {String} name - The component name
        * @return {Kiwi.Component} The component, if found, otherwise null
        **/
        public getComponent(value: string): any {

            if (this._components[value]) {
                return this._components[value];
            }

            return null; 
        }

        /**
        * Adds a Component to the manager.
        * @method addComponent
        * @param {Kiwi.Component} component - The component to add
        * @return {Kiwi.Component} The component that was added
        **/
        public add(component: Kiwi.Component): any {

            this._components[component.name] = component;

            return component; 
        }

        /**
        * Adds a Component to the manager.
        * @method addComponent
        * @param {Kiwi.Component} component - The component to add
        * @return {Kiwi.Component} The component that was added
        **/
        public addBatch(...paramsArr: any[]) {

            for (var i = 0; i < paramsArr.length; i++) {
                this.add(paramsArr[i]);
            }

        }

        /**
        * Removes a component
        * @method removeComponent
        * @param {Kiwi.Component} component - The component to be removed
        * @param {Boolean} destroy - Set to true (default) to call destroy on the component before removing it
        * @return {Boolean} true if the component was removed successfully
        **/
        public removeComponent(component: Kiwi.Component, destroy:bool = true): bool {

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
        * @param {String} name - The name of the component to be removed
        * @param {Boolean} destroy - Set to true (default) to call destroy on the component before removing it
        * @return {Boolean} true if the component was removed successfully
        **/
        public removeComponentByName(name: string, destroy:bool = true): bool {

            if (this._components[name]) {
                if (destroy) {
                    this._components[name].destroy();
                }
                
                delete this._components[name];

                return true; 
            }

            return false; 
        }

        /*
        * Removes all of the components from the component manager. 
        * @method removeAll
        */
        public removeAll() {
            for (var key in this._components) {
                this.removeComponent(this._components[key]);
            }
        }

        /**
		* Calls preUpdate on all active Components
        * @method preUpdate
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
