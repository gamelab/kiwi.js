/// <reference path="../Kiwi.ts" />

/*
 *	Kiwi - Core - Group
 *
 *	@desc		A multi-purpose container for any class that extends Kiwi.Entity
 *				
 *	@version    1.0 - 1st March 2013
 *				
 *	@author 	Richard Davey
 *	@author		Ross Kettle
 *				
 *	@url		http://www.kiwijs.org
 *				
*/

module Kiwi {

    export class Group implements Kiwi.IChild {

        /*
        * 
        * @constructor
        * @param {Kiwi.State} state
        * @param {String} name
        * @return {Kiwi.Group}
        */
        constructor(state:Kiwi.State, name: string = '') {

            if (state !== null) {
                this.state = state;
                this.game = this.state.game;
                this.id = this.game.rnd.uuid();
            }

            //  Properties
            this.name = name;
            this.components = new Kiwi.ComponentManager(Kiwi.GROUP, this);

            this._exists = true;
            this._active = true;
            this._willRender = true;

            this.transform = new Kiwi.Geom.Transform();

            this.members = [];

            //  Signals

            this._willRender = true;

        }

        /**
        * Returns the type of this object
        * @return {String} The type of this object
        */
        public objType(): string {
            return 'Group';
        }
        
        /*
        * Represents the type of child that this is. Note: A 'CHILD' is any object that extends from ICHILD.
        * @method childType
        * @return number
        */
        public childType():number {
            return Kiwi.GROUP;
        }

        /*
        * The parent of this group. This is used mainly for internal Kiwi Operations.
        * @property parent
        * @type Kiwi.Group
        */
        public parent: Kiwi.Group = null;

        /**
        * A name for this Group. This is not checked for uniqueness within the Game, but is very useful for debugging
        * @property name
        * @type string
        */
        public name: string = '';

        /*
        * The transform object for this group. 
        * Transform handles the calculation of coordinates/rotation/scale e.t.c in the Game World.
        * @property transform
        * @type Kiwi.Geom.Transform
        */
        public transform: Kiwi.Geom.Transform;
        
        /*
        * Get the X coordinate of this group. This is just aliased to the transform property.
        * @type Number
        */
        public get x(): number {
            return this.transform.x;
        }

        /*
        * Set the X coordinate of this group. This is just aliased to the transform property.
        * @type Number
        */
        public set x(value: number) {
            this.transform.x = value;
        }

        /*
        * Get the Y coordinate of this group. This is just aliased to the transform property.
        * @type Number
        */
        public get y(): number {
            return this.transform.y;
        }

        /*
        * Set the Y coordinate of this group. This is just aliased to the transform property.
        * @type Number
        */
        public set y(value: number) {
            this.transform.y = value;
        }

        /*
        * Get the Scale X of this group. This is just aliased to the transform property.
        * @type Number
        */
        public get scaleX(): number {
            return this.transform.scaleX;
        }

        /*
        * Set the Scale X coordinate of this group. This is just aliased to the transform property.
        * @type Number
        */
        public set scaleX(value: number) {
            this.transform.scaleX = value;
        }

        /*
        * Get the Scale Y coordinate of this group. This is just aliased to the transform property.
        * @type Number
        */
        public get scaleY(): number {
            return this.transform.scaleY;
        }

        /*
        * Set the Scale Y coordinate of this group. This is just aliased to the transform property.
        * @type Number
        */
        public set scaleY(value: number) {
            this.transform.scaleY = value;
        }

        /*
        * Get the rotation of this group. This is just aliased to the transform property.
        * @type Number
        */
        public get rotation(): number {
            return this.transform.rotation;
        }

        /*
        * Get the rotation of this group. This is just aliased to the transform property.
        * @type Number
        */
        public set rotation(value: number) {
            this.transform.rotation = value;
        }
        
        /**
        * The Component Manager
        * @property components
        * @type Kiwi.ComponentManager
	    */
        public components: Kiwi.ComponentManager;

        /**
        * The game this Group belongs to
        * @property game
        * @type Game
	    */
        public game: Kiwi.Game = null;

        /**
        * The State that this Group belongs to
        * @type Kiwi.State
        **/
        public state: Kiwi.State = null;

        /**
        * A unique identifier for this Group within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type string
    	*/
        public id: string;
         
        /**
        * The collection of children belonging to this group
        * @property members
        * @type Kiwi.Entity
        **/
        public members: Kiwi.IChild[];
          
        /** 
        * Returns the total number of children in this Group. Doesn't distinguish between alive and dead children.
        * @method numChildren
        * @return {Number} The number of children in this Group
        */
        public numChildren(): number {
            return this.members.length;
        }

        /*
        * An indication of weither or not this group is 'dirty' and thus needs to be re-rendered or not.
        * @property _dirty
        * @type bool
        */
        private _dirty: bool = true;

        /**
        * Sets all children of the Group to be dirty.
        * @method dirty
        * @param {Boolean} The value to be set on all children
		*/
        public set dirty(value: bool) {

            if (value !== undefined) {
                this._dirty = value;
                for (var i = 0; i < this.members.length; i++)
                {
                    this.members[i].dirty = value;
                }
            }
        }

        /*
        * Returns a boolean indicating if the group is dirty or not.
        * @type bool
        */
        public get dirty():bool {
            return this._dirty;
        }

        /**
        * Checks if the given entity is in this group
        * @method contains
        * @param {Kiwi.Entity} The entity to be checked.
        * @return {bool} true if entity exists in group.
        **/
        public contains(child: Kiwi.IChild): bool {
            return (this.members.indexOf(child) === -1) ? false : true;
        }

        /**
        * Adds an Entity to this Group. The Entity must not already be in this Group.
        * @method addChild
        * @param {Kiwi.Entity} The child to be added.
        * @return {Kiwi.Entity} The child.
        **/
        public addChild(child: Kiwi.IChild): Kiwi.IChild {              //REVISE

            //check to see if the child is already part of a group.

            //if it is remove it.

            //check to see if the descending thingy

            if (child.transform.parent !== this.transform) {
                this.members.push(child);
                child.transform.parent = this.transform;
                //child._addedToGroup(this);
            }

            return child;

        }
         
        /**
        * Adds an Entity to this Group in the specific location. The Entity must not already be in this Group and it must be supported by the Group.
        * @method addChildAt
        * @param {Kiwi.Entity} The child to be added.
        * @param {Number} The index the child will be set at.
        * @return {Kiwi.Entity} The child.
        */
        public addChildAt(child: Kiwi.IChild, index: number): Kiwi.IChild { //MORE CHECKS NEEDED

            if (child.transform.parent !== this.transform) {
                this.members.splice(index, 0, child);
            }

            return child;

        }

        /**
        * Adds an Entity to this Group before another child. The Entity must not already be in this Group and it must be supported by the Group.
        * @method addChildBefore
        * @param {Kiwi.Entity} The child to be added.
        * @param {Kiwi.Entity} The child before which the child will be added.
        * @return {Kiwi.Entity} The child.
        */
        public addChildBefore(child: Kiwi.IChild, beforeChild: Kiwi.IChild): Kiwi.IChild {

            if (child.transform.parent !== this.transform && beforeChild.transform.parent === this.transform) {
                var index: number = this.getChildIndex(beforeChild);

                this.members.splice(index, 0, child);
            }

            return child;

        }

        /**
        * Adds an Entity to this Group after another child. The Entity must not already be in this Group and it must be supported by the Group..
        * @method addChildAfter
        * @param {Kiwi.Entity} The child to be added.
        * @param {Kiwi.Entity} The child after which the child will be added.
        * @return {Kiwi.Entity} The child.
        */
        public addChildAfter(child: Kiwi.IChild, beforeChild: Kiwi.IChild): Kiwi.IChild {
           
            if (child.transform.parent !== this.transform && beforeChild.transform.parent === this.transform) {
                var index: number = this.getChildIndex(beforeChild) + 1;

                this.members.splice(index, 0, child);
            }

            return child;

        }

        /**
        * Get the child at a specific position in this Group by its index.
        * @method getChildAt
        * @param {Number} The index of the child
        * @return {Kiwi.Entity} The child, if found or null if not.
        */
        public getChildAt(index: number): Kiwi.IChild {

            if (this.members[index]) {
                return this.members[index];
            } else {
                return null;
            }

        }

        /**
        * Get a child from this Group by its name.
        * @method getChildByName
        * @param {String} The name of the child
        * @return {Kiwi.Entity} The child, if found or null if not.
        */
        public getChildByName(name: string): Kiwi.IChild {              //make recursive!!

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].name === name) {
                    return this.members[i];
                }
            }

            return null;

        }

        /**
        * Get a child from this Group by its UUID.
        * @method getChildByID
        * @param {String} The ID of the child.
        * @return {Kiwi.Entity} The child, if found or null if not.
        */
        public getChildByID(id: string): Kiwi.IChild {                  //make recursive!!

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].id === id) {
                    return this.members[i];
                }
            }

            return null;

        }

        /**
        * Returns the index position of the Entity or -1 if not found.
        * @method getChildIndex
        * @param {Kiwi.Entity} The child.
        * @return {Number} The index of the child or -1 if not found.
        */
        public getChildIndex(child: Kiwi.IChild): number {              

            return this.members.indexOf(child);

        }

        /**
        * Removes an Entity from this Group if it is a child of it.
        * @method removeChild
        * @param {Kiwi.Entity} The child to be removed.
        * @return {Kiwi.Entity} The child.
        **/
        public removeChild(child: Kiwi.IChild): Kiwi.IChild {

            if (child && child.transform.parent === this.transform) {
                var index: number = this.getChildIndex(child);

                if (index > -1) {
                    this.members.splice(index, 1);
                }

            }

            return child;

        }

        /**
        * Removes the Entity from this Group at the given position.
        * @method removeChildAt
        * @param {Number} The index of the child to be removed.
        * @return {Kiwi.Entity} The child, or null.
        */
        public removeChildAt(index: number): Kiwi.IChild {

            if (this.members[index]) {
                var child: Kiwi.IChild = this.members[index];

                if (child) {
                    this.members.splice(index, 1);

                    //child._removedFromGroup(this); 
                }

                return child;
            } else {
                return null;
            }

        }

        /**
        * Removes all Entities from this Group within the given range.
        * @method removeChildren
        * @param {Number} The begining index.
        * @param {Number} The last index of the range.
        * @return {Number} The number of removed entities.
		*/
        public removeChildren(begin: number = 0, end: number = 0x7fffffff): number {

            end -= begin;
            
            var removed: Kiwi.IChild[] = this.members.splice(begin, end);

            return removed.length;

        }
        
        /**
        * Sets a new position of an existing Entity within the Group
        * @method setChildIndex
        * @param {Kiwi.Entity} The child in this Group to change.
        * @param {Number} The index for the child to be set at.
        * @return {Boolean} true if the Entity was moved to the new position, otherwise false.
        */
        public setChildIndex(child: Kiwi.IChild, index: number): bool {
        
            //  If the Entity isn't in this Group, or is already at that index then bail out
            if (child.transform.parent !== this.transform || this.getChildIndex(child) === index) {
                return false;
            }

            this.removeChild(child);
            this.addChildAt(child, index);

            return true;
        
        }

        /**
        * Swaps the position of two existing Entities within the Group
        * @method swapChildren
        * @param {Kiwi.Entity} The first child in this Group to swap.
        * @param {Kiwi.Entity} The second child in this Group to swap.
        * @return {Boolean} true if the Entities were swapped successfully, otherwise false.
        */
        public swapChildren(child1: Kiwi.IChild, child2: Kiwi.IChild):bool {
        
            //  If either Entity isn't in this Group, or is already at that index then bail out
            if (child1.transform.parent !== this.transform || child2.transform.parent !== this.transform) {
                return false;
            }

            var index1 = this.getChildIndex(child1);
            var index2 = this.getChildIndex(child2);

            if (index1 !== -1 && index2 !== -1 && index1 !== index2) {
                this.members[index1] = child2;
                this.members[index2] = child1;

                return true;
            }

            return false;

        }
         
        /**
        * Swaps the position of two existing Entities within the Group based on their index.
        * @method swapChildrenAt
        * @param {Number} The position of the first Entity in this Group to swap.
        * @param {Number} The position of the second Entity in this Group to swap.
        * @return {Boolean} true if the Entities were swapped successfully, otherwise false.
        */
        public swapChildrenAt(index1: number, index2: number): boolean {
             
            var child1: Kiwi.IChild = this.getChildAt(index1);
            var child2: Kiwi.IChild = this.getChildAt(index2);
            if (child1 != null && child2 != null) {
                //  If either Entity isn't in this Group, or is already at that index then bail out
                if (child1==child2 || child1.transform.parent !== this.transform || child2.transform.parent !== this.transform) {
                    return false;
                }

                if (child1 !== null && child2 !== null) {

                    this.members[index1] = child2;
                    this.members[index2] = child1;
                     
                    return true;
                }
            }

          
            return false;
        
        }

        /**
        * Replaces a child Entity in this Group with a new one.
        * @method replaceChild
        * @param {Kiwi.Entity} The Entity in this Group to be removed.
        * @param {Kiwi.Entity} The new Entity to insert into this Group at the old Entities position.
        * @return {Boolean} true if the Entities were replaced successfully, otherwise false.
        */
        public replaceChild(oldChild: Kiwi.IChild, newChild: Kiwi.IChild): boolean {
            
            //fall through if replacing child with the same child
            if (oldChild === newChild) return false;

            // remove the new child from the group if the group contains it, so it can be reinserted in new position
            if (this.getChildIndex(newChild)) {
                this.removeChild(newChild);
            }

            // get the index of the existing child
            var index: number = this.getChildIndex(oldChild);
            
            if (index > -1) {
                this.removeChildAt(index);
                
                this.addChildAt(newChild, index); 
                newChild.transform.parent = null; 

                return true;

            }

            return false;

        }
        
        /**
        * Loops through each member in the group and run a method on for each one.
        * @method forEach
        * @param {any} context
        * @param {any} callback
		*/
        public forEach(context, callback, ...params: any[]) {

            if (this.members.length > 0)
            {
                this.members.forEach((child) => callback.apply(context, [child].concat(params)));
                //this.members.forEach((child) => this._processForEach(context, child, true, callback, params) );
            }

        }

        /**
        * Loop through each member of the groups that is alive. 
        * @method forEachAlive
        * @param {any} context
        * @param {any} callbacks
		*/
        public forEachAlive(context, callback, ...params: any[]) {

            if (this.members.length > 0) {
                
                this.members.forEach((child) => {
                    if (child.exists) callback.apply(context, [child].concat(params));
                });
                
            }

        }

        /**
        * Sets a property on every member. If componentName is null the property is set on the entity itself, otherwise it is set on the named component. Uses runtime string property lookups. Not optimal for large groups if speed is an issue.
        * @method setAll
        * @param {string} The name of the component to set the property on - set to null to set a property on the entity.
        * @param {string} The name of the property to set.
        * @param {any} The value to set the property to.
	    * @return {Kiwi.Group} this group.
		*/
        public setAll(componentName: string,property: string, value: any) {
            if (componentName === null) {
                for (var i: number = 0; i < this.members.length; i++) {
                    this.members[i][property] = value;
                }
            } else {
                for (var i: number = 0; i < this.members.length; i++) {
                    this.members[i][componentName][property] = value;
                }
            }
        }

        /**
        * Calls a function on every member. If componentName is null the function is called on the entity itself, otherwise it is called on the named component. Uses runtime string property lookups. Not optimal for large groups if speed is an issue.
        * @method callAll
        * @param {string} The name of the component to call the function on - set to null to call a function on the entity.
        * @param {string} The name of the function to call.
        * @param {Array} An array of arguments to pas to the function.
	    * @return {Kiwi.Group} this group.
		*/
        public callAll(componentName: string,functionName: string, args?: any[]) {
            if (componentName === null) {
                for (var i: number = 0; i < this.members.length; i++) {
                    this.members[i][functionName].apply(this.members[i], args);
                }
            } else {
                for (var i: number = 0; i < this.members.length; i++) {
                    this.members[i][componentName][functionName].apply(this.members[i][componentName], args);
                }
            }
        }

        /*
        //  Currently doesn't work!

        private _processForEach(context, child: Kiwi.Entity, testAlive: bool, callback, paramsArr) {

            if (testAlive === true && child.exists() === false)
            {
                return;
            }

            var params = [child];
            params.concat(paramsArr);

            callback.apply(context, params);

        }
        */

        /**
        * The update loop for this group.
        * @method update
		*/
        public update() {

            this.components.update();

            if (this.members.length > 0) {
                this.members.forEach((child) => this.processUpdate(child));
            }

            this.components.postUpdate();

        }

        /**
        * Calls the update method on an alive child
        * @method processUpdate
        * @param {Kiwi.Entity} 
        */
        public processUpdate(child: Kiwi.IChild) {

            if (child.active === true) {
                child.update();
            }

        }

        /**
        * If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
        * @property exists 
        * @type Boolean
        **/
        private _exists: bool;

        /**
        * Toggles the exitence of this Group. An Entity that no longer exists can be garbage collected or re-allocated in a pool
        * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
        **/
        //********TODO  - set children - as below
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
        * @method render
		*/
        public render(camera:Kiwi.Camera) {

            this.components.preRender();

            this.components.render();

            if (this.members.length > 0) {
                this.members.forEach((child) => this.processRender(child,camera));
            }

            this.components.postRender();

        }

        

        /**
        * Calls the render method on all alive children
        * @method processRender
        * @param {Kiwi.Entity} 
        */
        public processRender(child: Kiwi.IChild,camera:Kiwi.Camera) {

            if (child.active === true) {
                child.render(camera);
            }

        }

        /**
        * Removes the first Entity from this Group marked as 'alive'
        * @method removeFirstAlive
        * @return {Kiwi.Entity} The Entity that was removed from this Group if alive, otherwise null
        */
        public removeFirstAlive(): Kiwi.IChild { 

            return this.removeChild(this.getFirstAlive());
        
        }

        /**
        * Returns the first Entity from this Group marked as 'alive' or null if no members are alive
        * @method getFirstAlive
		*/
        public getFirstAlive() { 
        
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === true) {
                    return this.members[i];
                    break;
                }
            }

            return null;
        
        }

        /**
        * Returns the first member of the Group which is not 'alive', returns null if all members are alive.
        * @method getFirstDead
		*/
        public getFirstDead() { 
        
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === false) {
                    return this.members[i];
                    break;
                }
            }

            return null;
        
        }
        
        /**
        * Returns the number of member which are marked as 'alive'
        * @method countLiving
        * @return {Number} 
		*/
        public countLiving():number { 

            var total: number = 0;

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === true) {
                    total++;
                }
            }

            return total;
        
        }

        /**
        * Returns the number of member which are not marked as 'alive'
        * @method countDead
        * @return {Number} 
		*/
        public countDead(): number { 
        
            var total: number = 0;

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === false) {
                    total++;
                }
            }

            return total;
        
        }
        
		/**
		 * Returns a member at random from the group.
		 * 
		 * @param	StartIndex	Optional offset off the front of the array. Default value is 0, or the beginning of the array.
		 * @param	Length		Optional restriction on the number of values you want to randomly select from.
		 * 
		 * @return	A child from the members list.
		 */
        public getRandom(start: number = 0, length: number = 0): Kiwi.IChild { 
        
            if (this.members.length === 0) {
                return null;
            }

            if (length === 0) {
                length = this.members.length;
            }

            if (start < 0 || start > length) {
                start = 0;
            }

            var rnd = start + (Math.random() * (start + length));

            if (rnd > this.members.length) {
                return this.members[this.members.length - 1];

            } else {
                return this.members[rnd];
            }
            
        }

        /**
	    * Clear all children from this Group
        * @method clear
		*/
        public clear() {

            this.members.length = 0;

        }
 
        /**
		* Controls whether render is automatically called by the parent.
        * @property _visible
        * @type Boolean
		*/
		private _willRender: bool;

        /**
        * Toggles the visible state of this Entity. visible(false) are stopped from rendering.
        * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
        * @method visible
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
		* Removes all children and destroys the Group
		**/
        public destroy() {

            this.removeChildren();

            this._exists = false;
            this._active = false
            this._willRender = false;

            this.members.length = 0;

        }

    }

}
