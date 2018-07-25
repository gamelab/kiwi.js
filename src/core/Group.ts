/**
* 
* @module Kiwi
* 
*/

module Kiwi {

	/**
	* The group class is central to creating the scene graph that contains all objects in a state. A group can contain entities or other groups, thereby enabling a nested tree scene graph.
	* The members of the Group's coordinates are also in relation to the Group that they were added to. So if you moved an entire Group, each member of that Group would also 'move'.
	* 
	* @class Group
	* @namespace Kiwi
	* @constructor
	* @param state {Kiwi.State} The State that this Group is a part of.
	* @param [name=''] {String} The name of this group. 
	* @return {Kiwi.Group}
	* 
	*/
	export class Group implements Kiwi.IChild {

		constructor(state: Kiwi.State, name: string = '') {

			//prevents the state going AHHH...since the state extends group.
			if (state !== null) {
				this.state = state;
				this.game = this.state.game;
				this.id = this.game.rnd.uuid();
				this.state.addToTrackingList(this);
			}

			//  Properties
			this.name = name;
			this.components = new Kiwi.ComponentManager(Kiwi.GROUP, this);

			this._exists = true;
			this._active = true;
			this._visible = true;

			this.transform = new Kiwi.Geom.Transform();
			this.members = [];
		}

		/**
		* Returns the type of this object
		* @method objType
		* @return {String} "Group"
		* @public
		*/
		public objType(): string {
			return "Group";
		}

		/*
		* Represents the type of child that this is. 
		* @method childType
		* @return number
		* @public
		*/
		public childType(): number {
			return Kiwi.GROUP;
		}

		/**
		* A name for this Group. This is not checked for uniqueness within the Game, but is very useful for debugging.
		* @property name
		* @type string
		* @default ''
		* @public
		*/
		public name: string = '';

		/**
		* The transform object for this group. 
		* Transform handles the calculation of coordinates/rotation/scale e.t.c in the Game World.
		* @property transform
		* @type Kiwi.Geom.Transform
		* @public
		*/
		public transform: Kiwi.Geom.Transform;

		/**
		* The parent group of this group.
		* @property _parent
		* @type Kiwi.Group
		* @private
		*/
		private _parent: Kiwi.Group = null;

		/**
		* Set's the parent of this entity. Note that this also sets the transforms parent of this entity to be the passed groups transform.
		* @property parent
		* @type Kiwi.Group
		* @public
		*/
		public set parent(val: Kiwi.Group) {
			//check to see if the parent is not an descendor
			//if (this.containsDescendant(val) === false) {
				this.transform.parent = (val !== null) ? val.transform : null;
				this._parent = val;
			//}
		}
		public get parent(): Kiwi.Group {
			return this._parent;
		}

		/**
		* The X coordinate of this group. This is just aliased to the transform property.
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
		* The Y coordinate of this group. This is just aliased to the transform property.
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
		* The X coordinate of this group in world space; that is, after parent transforms. This is just aliased to the transform property. This is READ-ONLY.
		* @property worldX
		* @type number
		* @public
		* @since 1.1.0
		*/
		public get worldX(): number {
			return this.transform.worldX;
		}

		/**
		* The Y coordinate of this group in world space; that is, after parent transforms. This is just aliased to the transform property. This is READ-ONLY.
		* @property worldY
		* @type number
		* @public
		* @since 1.1.0
		*/
		public get worldY(): number {
			return this.transform.worldY;
		}

		/*
		* The Scale X of this group. This is just aliased to the transform property.
		* @property scaleX
		* @type Number
		* @public
		*/
		public get scaleX(): number {
			return this.transform.scaleX;
		}
		public set scaleX(value: number) {
			this.transform.scaleX = value;
		}

		/*
		* The Scale Y coordinate of this group. This is just aliased to the transform property.
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
		* The scale of this group. This is just aliased to the transform property. This is WRITE-ONLY.
		* @property scale
		* @type number
		* @public
		* @since 1.1.0
		*/
		public set scale(value: number) {
			this.transform.scale = value;
		}

		/*
		* The rotation of this group. This is just aliased to the transform property.
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
		* The rotation offset of this group in the X axis. This is just aliased to the transform property.
		* @property rotPointX
		* @type number
		* @public
		* @since 1.1.0
		*/
		public get rotPointX(): number {
			return this.transform.rotPointX;
		}
		public set rotPointX(value: number) {
			this.transform.rotPointX = value;
		}

		/**
		* The rotation offset of this group in the Y axis. This is just aliased to the transform property.
		* @property rotPointY
		* @type number
		* @public
		* @since 1.1.0
		*/
		public get rotPointY(): number {
			return this.transform.rotPointY;
		}
		public set rotPointY(value: number) {
			this.transform.rotPointY = value;
		}

		/**
		* The anchor point offset of this group in the X axis. This is just aliased to the transform property, and is in turn an alias of rotPointX.
		* @property anchorPointX
		* @type number
		* @public
		* @since 1.1.0
		*/
		public get anchorPointX(): number {
			return this.transform.anchorPointX;
		}
		public set anchorPointX(value: number) {
			this.transform.anchorPointX = value;
		}

		/**
		* The anchor point offset of this group in the Y axis. This is just aliased to the transform property, and is in turn an alias of rotPointY.
		* @property anchorPointY
		* @type number
		* @public
		* @since 1.1.0
		*/
		public get anchorPointY(): number {
			return this.transform.anchorPointY;
		}
		public set anchorPointY(value: number) {
			this.transform.anchorPointY = value;
		}

		/**
		* The Component Manager
		* @property components
		* @type Kiwi.ComponentManager
		* @public
		*/
		public components: Kiwi.ComponentManager;

		/**
		* The game this Group belongs to
		* @property game
		* @type Kiwi.Game
		* @public
		*/
		public game: Kiwi.Game = null;

		/**
		* The State that this Group belongs to
		* @property state
		* @type Kiwi.State
		* @public
		**/
		public state: Kiwi.State = null;

		/**
		* A unique identifier for this Group within the game used internally by the framework. See the name property for a friendly version.
		* @property id
		* @type string
		* @public
		*/
		public id: string;
		
		/**
		* The collection of children belonging to this group 
		* @property members
		* @type Array
		* @public
		*/
		public members: Kiwi.IChild[];
		
		/** 
		* Returns the total number of children in this Group. Doesn't distinguish between alive and dead children.
		* @method numChildren
		* @return {Number} The number of children in this Group
		* @public
		*/
		public numChildren(): number {
			return this.members.length;
		}

		/**
		* An indication of whether or not this group is 'dirty' and thus needs to be re-rendered or not.
		* @property _dirty
		* @type boolean
		* @private
		*/
		private _dirty: boolean = true;

		/**
		* Sets all children of the Group to be dirty.
		* @property dirty
		* @type boolean
		* @public
		*/
		public set dirty(value: boolean) {
			if (value !== undefined) {
				this._dirty = value;

				for (var i = 0; i < this.members.length; i++) {
					this.members[i].dirty = value;
				}
			}
		}
		public get dirty(): boolean {
			return this._dirty;
		}

		/**
		* Checks if the given entity is in this group
		* @method contains
		* @param child {IChild} The IChild that you want to checked.
		* @return {boolean} true if entity exists in group.
		* @public
		*/
		public contains(child: Kiwi.IChild): boolean {                                         // MAKE RECURSIVE
			return (this.members.indexOf(child) === -1) ? false : true;
		}

		/**
		* Checks to see if the given object is contained in this group as a descendant
		* @method containsDescendant
		* @param child {object} The IChild that you want to check.
		* @return {boolean}
		* @public
		*/
		public containsDescendant(child: Kiwi.IChild): boolean {
			for (var i = 0; i < this.members.length; i++) {
				var curMember: any = this.members[i];
				if (curMember.id == child.id || curMember.childType() == Kiwi.Group && curMember.containsDesendant(child)) {
					return true;
				}
			}
			return false;
		}

		/**
		* Checks to see if one child is an ansector of another child.
		* @method containsAncestor
		* @param descendant {object} The object that you are checking.
		* @param ancestor {Group} The parent (ancestor) that you are checking for.
		* @return {boolean}
		* @public
		*/ 
		public containsAncestor(descendant: Kiwi.IChild, ancestor:Kiwi.Group): boolean {
			if (descendant.parent === null || descendant.parent === undefined) {
				return false;   
			}
			if (descendant.parent == ancestor) return true; //desendants parent is the same? 
			return descendant.parent.containsAncestor(descendant.parent, ancestor); //keep going up the chain.
		}


		/**
		* -------------------------
		* Add Children methods
		* -------------------------
		**/


		/**
		* Adds an Entity to this Group. The Entity must not already be in this Group.
		* @method addChild
		* @param child {object} The child to be added.
		* @return {object} The child that was added.
		* @public
		*/
		public addChild(child: Kiwi.IChild): Kiwi.IChild {              

			//Implement feature where you can pass as many children to be added. Modify this script to work via the 'arguments' property

			//make sure you aren't adding a state or itself
			if (child.childType() === Kiwi.STATE || child == this) return;

			//make sure it is not itself.
			if (child.parent !== null) 
				child.parent.removeChild(child);
			
			//check to see if the child is already part of a group.
			this.members.push(child);
			child.parent = this;
			
			return child;
		}
		 
		/**
		* Adds an Entity to this Group in the specific location. The Entity must not already be in this Group and it must be supported by the Group.
		* @method addChildAt
		* @param child {object} The child to be added.
		* @param index {Number} The index the child will be set at.
		* @return {object} The child.
		* @public
		*/
		public addChildAt(child: Kiwi.IChild, index: number): Kiwi.IChild {

			if (child.childType() === Kiwi.STATE || child == this) return;

			if (child.parent !== null) child.parent.removeChild(child);

			this.members.splice(index, 0, child);
			child.parent = this;

			return child;
		}

		/**
		* Adds an Entity to this Group before another child. 
		* @method addChildBefore
		* @param child {object} The child to be added.
		* @param beforeChild {Entity} The child before which the child will be added.
		* @return {object} The child.
		* @public
		*/
		public addChildBefore(child: Kiwi.IChild, beforeChild: Kiwi.IChild): Kiwi.IChild {                      

			if (beforeChild.transform.parent === this.transform) {

				if (child.parent !== null) child.parent.removeChild(child);

				var index: number = this.getChildIndex( beforeChild );

				this.members.splice(index, 0, child);
				child.parent = this;
			}

			return child;

		}

		/**
		* Adds an Entity to this Group after another child. 
		* @method addChildAfter
		* @param child {object} The child to be added.
		* @param beforeChild {object} The child after which the child will be added.
		* @return {object} The child.
		* @public
		*/
		public addChildAfter(child: Kiwi.IChild, afterChild: Kiwi.IChild): Kiwi.IChild {
		   
			if (afterChild.transform.parent === this.transform) {

				if (child.parent !== null) child.parent.removeChild(child);

				var index: number = this.getChildIndex(afterChild) + 1;

				this.members.splice(index, 0, child);
				child.parent = this;
			}

			return child;

		}


		/**
		* --------------------
		* Remove Children Methods
		* --------------------
		**/


		/**
		* Removes an Entity from this Group if it is a child of it.
		* @method removeChild
		* @param child {object} The child to be removed.
		* @param [destroy=false] {boolean} If the entity that gets removed should be destroyed as well.
		* @return {object} The child.
		* @public
		*/
		public removeChild(child: Kiwi.IChild, destroy:boolean=false): Kiwi.IChild {   

			if (child.parent === this) {

				var index: number = this.getChildIndex(child);

				if (index > -1) {
					this.members.splice(index, 1);
					child.parent = null;
					
					if (destroy) {
						child.destroy();
					}
				}

			} 

			return child;
		}

		/**
		* Removes the Entity from this Group at the given position.
		* @method removeChildAt
		* @param index {Number} The index of the child to be removed.
		* @return {object} The child, or null.
		*/
		public removeChildAt(index: number): Kiwi.IChild {

			if (this.members[index]) {
				var child: Kiwi.IChild = this.members[index];

				return this.removeChild(child);
			} else {
				return null;
			}

		}

		/**
		* Removes all Entities from this Group within the given range. 
		* @method removeChildren
		* @param begin {Number} The begining index.
		* @param end {Number} The last index of the range.
		* @param destroy {Number} If the children should be destroyed as well.
		* @return {Number} The number of removed entities.
		* @public
		*/
		public removeChildren(begin: number = 0, end: number = 0x7fffffff, destroy:boolean = false): number {

			end -= begin;
			
			var removed: Kiwi.IChild[] = this.members.splice(begin, end);

			for (var i = 0; i < removed.length; i++) {
				removed[i].parent = null;

				if (destroy) {
					removed[i].destroy();
				}
			}

			return removed.length;
		}

		/**
		* Removes the first Entity from this Group marked as 'alive'
		* @method removeFirstAlive
		* @param [destroy=false] {boolean} If the entity should run the destroy method when it is removed.
		* @return {object} The Entity that was removed from this Group if alive, otherwise null
		* @public
		* @deprecated in v1.1.0
		*/
		public removeFirstAlive(destroy: boolean = false): Kiwi.IChild {

			return this.removeChild(this.getFirstAlive(), destroy);

		}


		/**
		* -------------------
		* Get Children Methods
		* -------------------
		**/

		/**
		* Get all children of this Group. By default, this will search the entire sub-graph, including children of children etc.
		* @method getAllChildren
		* @param getGroups {boolean} Optional: Whether to include Groups in the results. When false, will only collect GameObjects.
		* @param destinationArray {Array} Optional: The array in which to store the results.
		* @return {Array}
		* @since 1.1.0
		*/
		public getAllChildren(getGroups: boolean = true, destinationArray: IChild[] = []): IChild[] {
			for( var i = 0;  i < this.members.length;  i++) {
				if(this.members[i].objType() == "Group") {
					if(getGroups) {
						destinationArray.push(this.members[i]);
					}
					(<Kiwi.Group>this.members[i]).getAllChildren(getGroups, destinationArray);
				}
				else {
					destinationArray.push(this.members[i]);
				}
			}
			return destinationArray;
		}


		/**
		* Get the child at a specific position in this Group by its index.
		* @method getChildAt
		* @param index {Number} The index of the child
		* @return {object} The child, if found or null if not.
		* @public
		*/
		public getChildAt(index: number): Kiwi.IChild {

			if (this.members[index]) {
				return this.members[index];
			} else {
				return null;
			}

		}

		/**
		* Get a child from this Group by its name. By default this will not check sub-groups, but if you supply the correct flag it will check the entire scene graph under this object.
		* @method getChildByName
		* @param name {String} The name of the child.
		* @param recurse {Boolean} Whether to search child groups for the child. Default FALSE.
		* @return {object} The child, if found or null if not.
		* @public
		*/
		public getChildByName(name: string, recurse: boolean = false): Kiwi.IChild {
			for (var i = 0; i < this.members.length; i++) {
				if (this.members[i].name === name) {
					return this.members[i];
				}
				else if(this.members[i].objType() == "Group"  &&  recurse) {
					var groupResponse = (<Kiwi.Group>this.members[i]).getChildByName( name, true );
					if(groupResponse !== null) {
						return groupResponse;
					}
				}
			}

			return null;

		}

		/**
		* Get a child from this Group by its UUID. By default this will not check sub-groups, but if you supply the correct flag it will check the entire scene graph under this object.
		* @method getChildByID
		* @param id {String} The ID of the child.
		* @param recurse {Boolean} Whether to search child groups for the child. Default FALSE.
		* @return {object} The child, if found or null if not.
		* @public
		*/
		public getChildByID(id: string, recurse: boolean = false): Kiwi.IChild {
			for (var i = 0; i < this.members.length; i++) {
				if (this.members[i].id === id) {
					return this.members[i];
				}
				else if(this.members[i].objType() == "Group"  &&  recurse) {
					var groupResponse = (<Kiwi.Group>this.members[i]).getChildByID( id, true );
					if(groupResponse !== null) {
						return groupResponse;
					}
				}
			}

			return null;

		}

		/**
		* Returns the index position of the Entity or -1 if not found.
		* @method getChildIndex
		* @param child {object} The child.
		* @return {Number} The index of the child or -1 if not found.
		* @public
		*/
		public getChildIndex(child: Kiwi.IChild): number {

			return this.members.indexOf(child);

		}

		/**
		* Returns the first Entity from this Group marked as 'alive' or null if no members are alive
		* @method getFirstAlive
		* @return {object}
		* @public
		* @deprecated in v1.1.0
		*/
		public getFirstAlive(): Kiwi.IChild {

			for (var i = 0; i < this.members.length; i++) {
				if (this.members[i].exists === true) {
					return this.members[i];
				}
			}

			return null;
		}

		/**
		* Returns the first member of the Group which is not 'alive', returns null if all members are alive.
		* @method getFirstDead
		* @return {object}
		* @public
		* @deprecated in v1.1.0
		*/
		public getFirstDead(): Kiwi.IChild {

			for (var i = 0; i < this.members.length; i++) {
				if (this.members[i].exists === false) {
					return this.members[i];
				}
			}

			return null;

		}

		/**
		* Returns a member at random from the group.
		* @param {Number}	StartIndex	Optional offset off the front of the array. Default value is 0, or the beginning of the array.
		* @param {Number}	Length		Optional restriction on the number of values you want to randomly select from.
		* @return {object}	A child from the members list.
		* @public
		*/
		public getRandom(start: number = 0, length: number = 0): Kiwi.IChild {

			if (this.members.length === 0) {
				return null;
			}
			/*
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
			*/

			// Comply start to viable range
			start = Kiwi.Utils.GameMath.clamp(start, this.members.length - 1);

			// Comply length to fit
			if(length === 0) {
				length = this.members.length;
			}
			if(this.members.length <= start + length) {
				length = this.members.length - start - 1;
			}

			// Create and truncate random index
			var rnd = start + Math.random() * length;
			rnd = Math.floor(rnd);

			// Return
			return this.members[rnd];
		}

		/**
		* Returns an array of children which contain the tag which is passed.
		* @method getChildrenByTag
		* @param tag {string}
		* @return {Array}
		* @public
		* @since 1.1.0
		*/
        public getChildrenByTag(tag: string): IChild[] {

            var children = [];

            for (var i = 0; i < this.members.length; i++) {

                if (this.members[i].hasTag(tag)) {
                    children.push(this.members[i]);
                }

                if (this.members[i].childType() == Kiwi.GROUP) {
                    children = children.concat((<Kiwi.Group>this.members[i]).getChildrenByTag(tag));
                }

            }

            return children;
        }

        /**
        * Returns the first child which contains the tag passed.
        * @method getFirstChildByTag
        * @param tag {String}
        * @return {IChild}
        * @public
        * @since 1.3.0
        */
        public getFirstChildByTag(tag: string): IChild {

            for (var i = 0; i < this.members.length; i++) {

                if ( this.members[i].hasTag(tag) ) {
                    return this.members[i];
                }

                if ( this.members[i].childType() == Kiwi.GROUP ) {
                    var child = ((<Kiwi.Group>this.members[i]).getFirstChildByTag(tag));

                    if (child) {
                        return child;
                    }
                }

            }
            
            return null;   
        }

        /**
        * Returns the last child which contains the tag passed.
        * @method getLastChildByTag
        * @param tag {String}
        * @return {IChild}
        * @public
        * @since 1.3.0
        */
        public getLastChildByTag(tag: string): IChild {

            for (var i = this.members.length - 1; i >= 0; i--) {

                if (this.members[i].hasTag(tag)) {
                    return this.members[i];
                }

                if (this.members[i].childType() == Kiwi.GROUP) {
                    var child = ((<Kiwi.Group>this.members[i]).getLastChildByTag(tag));

                    if (child) {
                        return child;
                    }
                }

            }

            return null;
        }

		/**
		* --------------------
		* Child Depth Sorting Methods
		* --------------------
		**/


		/**
		* Sets a new position of an existing Entity within the Group.
		* @method setChildIndex
		* @param child {object} The child in this Group to change.
		* @param index {Number} The index for the child to be set at.
		* @return {boolean} true if the Entity was moved to the new position, otherwise false.
		* @public
		*/
		public setChildIndex(child: Kiwi.IChild, index: number): boolean {
		
			//  If the Entity isn't in this Group, or is already at that index then bail out
			if (child.parent !== this || this.getChildIndex(child) === index) {
				return false;
			}

			this.removeChild(child);
			this.addChildAt(child, index);

			return true;
		}

		/**
		* Swaps the position of two existing Entities that are a direct child of this group.
		* @method swapChildren
		* @param child1 {object} The first child in this Group to swap.
		* @param child2 {object} The second child in this Group to swap.
		* @return {boolean} true if the Entities were swapped successfully, otherwise false.
		* @public
		*/
		public swapChildren(child1: Kiwi.IChild, child2: Kiwi.IChild):boolean {
		
			//  If either Entity isn't in this Group, or is already at that index then bail out
			if (child1.parent !== this || child2.parent !== this) {
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
		* @param index1 {Number} The position of the first Entity in this Group to swap.
		* @param index2 {Number} The position of the second Entity in this Group to swap.
		* @return {boolean} true if the Entities were swapped successfully, otherwise false.
		* @public
		*/
		public swapChildrenAt(index1: number, index2: number): boolean {
			 
			var child1: Kiwi.IChild = this.getChildAt(index1);
			var child2: Kiwi.IChild = this.getChildAt(index2);

			if (child1 !== null && child2 !== null) {
				//  If either Entity isn't in this Group, or is already at that index then bail out
				if (child1 == child2 || child1.parent !== this || child2.parent !== this) {
					return false;
				}

				this.members[index1] = child2;
				this.members[index2] = child1;

				return true;
			}

			return false;
		}

		/**
		* Replaces a child Entity in this Group with a new one.
		* @method replaceChild
		* @param oldChild {object} The Entity in this Group to be removed.
		* @param newChild {object} The new Entity to insert into this Group at the old Entities position.
		* @return {boolean} true if the Entities were replaced successfully, otherwise false.
		* @public
		*/
		public replaceChild(oldChild: Kiwi.IChild, newChild: Kiwi.IChild): boolean {
			
			//fall through if replacing child with the same child
			if (oldChild === newChild) return false;

			// get the index of the existing child
			var index: number = this.getChildIndex(oldChild);

			if (index > -1) {
				// remove the new child from the group if the group contains it, so it can be reinserted in new position
				if (newChild.parent) {
					newChild.parent.removeChild(newChild);
				}

				this.removeChildAt(index);

				this.addChildAt(newChild, index); 
				newChild.parent = null;

				return true;
			}

			return false;
		}

		/**
		* Loops through each member in the group and run a method on for each one.
		* @method forEach
		* @param context {any} The context that the callbacks are to have when called.
		* @param callback {any} The callback method to execute on each member.
		* @param [params]* {any} Any extra parameters.
		* @public
		*/
		public forEach(context, callback, ...params: any[]) {

			if (this.members.length > 0) {
				this.members.forEach((child) => callback.apply(context, [child].concat(params)));
			}

		}

		/**
		* Loop through each member of the groups that is alive. 
		* @method forEachAlive
		* @param context {any} The context that the callbacks are to have when called.
		* @param callback {any} The callback method to execute on each member.
		* @param [params]* {any} Any extra parameters.
		* @public
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
		* @param componentName {string} The name of the component to set the property on - set to null to set a property on the entity.
		* @param property {string} The name of the property to set.
		* @param value {any} The value to set the property to.
		* @public
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
		* @param componentName {string} The name of the component to call the function on - set to null to call a function on the entity.
		* @param functionName {string} The name of the function to call.
		* @param args {Array} An array of arguments to pas to the function.
		* @public
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

		/**
		* The update loop for this group.
		* @method update
		* @public
		*/
		public update() {

			this.components.preUpdate();

			this.components.update();
			if (this.members.length > 0) {

				for (var i = 0; i < this.members.length; i++) {
					let member = this.members[i];
					if (member.active === true) {
						member.update();
					} 

					if(member.exists === false) {
						member.destroy( true );
					}
				}
				
			}

			this.components.postUpdate();

		}

		/**
		* If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
		* @property exists 
		* @type boolean
		* @private
		*/
		private _exists: boolean;

		/**
		* Toggles the exitence of this Group. An Entity that no longer exists can be garbage collected or re-allocated in a pool
		* This method should be over-ridden to handle specific canvas/webgl implementations.
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
		* @default true
		* @public
		*/
		public set active(value: boolean) {
			this._active = value;
		}

		public get active():boolean {
			return this._active;
		}

		/**
		* The render method that is required by the IChild. 
		* This method never gets called as the render is only worried about rendering entities.
		* @method render
		* @param camera {Kiwi.Camera}
		* @public
		* @deprecated
		*/
		public render(camera:Kiwi.Camera) {

		}

		/**
		* Returns the number of member which are marked as 'alive'
		* @method countLiving
		* @return {Number} 
		* @public
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
		* @public
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
		* Clear all children from this Group
		* @method clear
		* @public
		*/
		public clear() {

			this.members.length = 0;

		}
 
		/**
		* Controls whether render is automatically called by the parent.
		* @property _willRender
		* @type Boolean
		* @private
		* @deprecated Use _visible instead
		*/
		private _willRender: boolean;

		/**
		* Controls whether render is automatically called by the parent.
		* @property willRender
		* @type boolean
		* @return {boolean}
		* @public
		* @deprecated Use visible instead
		*/
		public set willRender(value: boolean) {
			this._willRender = value;
		}
		public get willRender():boolean {
			return this._willRender;
		}

		/**
		* A boolean that indicates whether or not this entity is visible or not. Note that is does not get set to false if the alpha is 0.
		* @property _visible
		* @type boolean
		* @default true
		* @private
		* @since 1.0.1
		*/
		private _visible: boolean;

		/**
		* Set the visibility of this entity. True or False.
		* @property visible
		* @type boolean
		* @default true
		* @public
		* @since 1.0.1
		*/
		public set visible(value: boolean) {
			this._visible = value;
		}
		public get visible(): boolean {
			return this._visible;
		}


		/**
		* ---------------
		* Tagging System
		* ---------------
		**/


		/**
		* Any tags that are on this Entity. This can be used to grab GameObjects or Groups on the whole game which have these particular tags.
		* By default Entitys contain no tags.
		* @property _tags
		* @type Array
		* @since 1.1.0
		* @private
		*/
		private _tags: string[] = [];

		/**
		* Adds a new Tag to this Entity. Useful for identifying large amounts of the same type of GameObjects.
		* You can pass multiple strings to add multiple tags.
		* @method addTag
		* @param tag {string} The tag that you would like to add to this Entity.
		* @since 1.1.0
		* @public
		*/
		public addTag(...args: any[]) {

			//Loop through the arguments
			for (var i = 0; i < args.length; i++) {
				if (this._tags.indexOf(args[i]) == -1) {
					this._tags.push(args[i]);
				}
			}

		}

		/**
		* Removes a Tag from this Entity.
		* @method removeTag
		* @param tag {string} The tag that you would like to remove from this Entity.
		* @since 1.1.0
		* @public
		*/
		public removeTag(...args: any[]) {

			for (var i = 0; i < args.length; i++) {
				var index = this._tags.indexOf(args[i]);
				if (index !== -1) this._tags.splice(index, 1);
			}

		}

		/**
		* Checks to see if this Entity has a Tag based upon a string which you pass.
		* @method hasTag
		* @param tag {string} 
		* @since 1.1.0
		* @return {boolean}
		* @public 
		*/
		public hasTag(tag: string): boolean {

			var len = this._tags.length;
			while (len--) {
				if (this._tags[len] === tag) {
					return true;
				}
			}

			return false;
		}


		/**
		* Removes all children and destroys the Group. 
		* @method destroy
		* @param [immediate=false] {boolean} If the object should be immediately removed or if it should be removed at the end of the next update loop.
		* @param [destroyChildren=true] {boolean} If all of the children on the group should also have their destroy methods called.
		* @public
		*/
		public destroy(immediate:boolean = false, destroyChildren:boolean = true) {
			
			this._exists = false;
			this._active = false
			this._visible = false;

			if (immediate === true) {

				if (this._tempRemoveChildren !== null) destroyChildren = this._tempRemoveChildren;

				if (destroyChildren == true) {

					//Remove all of the children.
					for (var i = 0; i < this.members.length; i++) {
						this.members[i].destroy(true);
					}

				} else {
					this.removeChildren();
				}

				if (this.parent !== null) this.parent.removeChild(this);
				if (this.state) this.state.removeFromTrackingList(this);
				delete this.transform;
				if (this.components) this.components.removeAll();
				delete this.components;
				delete this.game;
				delete this.state;

			} else {
				this._tempRemoveChildren = destroyChildren;
			}

		}

		/**
		* A temporary property that holds a boolean indicating whether or not the group's children should be destroyed or not.
		* @property _destroyRemoveChildren
		* @type boolean
		* @private
		*/
		private _tempRemoveChildren: boolean = null;

	}

}
