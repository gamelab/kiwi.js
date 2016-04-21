/**

@module Kiwi

**/

module Kiwi {
	export class Group implements Kiwi.IChild {

		/**
		The group class is central to creating the scene graph
		that contains all objects in a state.
		A group can contain entities or other groups,
		thereby enabling a nested tree scene graph.
		The members of the Group's coordinates are also in relation to
		the Group that they were added to.
		So if you moved an entire Group,
		each member of that Group would also "move".

		@class Group
		@namespace Kiwi
		@constructor
		@param state {Kiwi.State} State that this Group is a part of
		@param [name=""] {string} Name of this group
		**/

		constructor( state: Kiwi.State, name: string = "" ) {

			// Prevents the state going AHHH... since the state extends group
			if ( state !== null ) {
				this.state = state;
				this.game = this.state.game;
				this.id = this.game.rnd.uuid();
				this.state.addToTrackingList( this );
			}

			// Properties
			this.name = name;
			this.components = new Kiwi.ComponentManager( Kiwi.GROUP, this );

			this._exists = true;
			this._active = true;
			this._visible = true;

			this.transform = new Kiwi.Geom.Transform();
			this.members = [];
		}

		public objType(): string {

			/**
			Return the type of this object.

			@method objType
			@return {string} "Group"
			@public
			**/

			return "Group";
		}

		public childType(): number {

			/**
			Return the type of child that this is (`Kiwi.GROUP`).

			@method childType
			@return {number} Kiwi.GROUP
			@public
			**/

			return Kiwi.GROUP;
		}

		/**
		Name for this Group. This is not checked for uniqueness
		within the game, but is very useful for debugging.

		@property name
		@type string
		@default ""
		@public
		**/
		public name: string = "";

		/**
		Transform object for this group.
		Transform handles the calculation of coordinates/rotation/scale etc
		in the game world.

		@property transform
		@type Kiwi.Geom.Transform
		@public
		**/
		public transform: Kiwi.Geom.Transform;

		/**
		Parent group of this group.

		@property _parent
		@type Kiwi.Group
		@private
		**/
		private _parent: Kiwi.Group = null;

		/**
		Sets the parent of this entity.
		Note that this also sets the transforms parent of this entity
		to be the passed groups transform.

		@property parent
		@type Kiwi.Group
		@public
		**/
		public set parent( val: Kiwi.Group ) {

			// Check to see if the parent is not an descendor
			// if ( this.containsDescendant( val ) === false ) {
				this.transform.parent = ( val !== null ) ?
					val.transform :
					null;
				this._parent = val;
			// }
		}
		public get parent(): Kiwi.Group {
			return this._parent;
		}

		/**
		Indicates whether or not this entity is attached to the state.

		NOTE: This was implemented in 1.4.1
		but is not officially supported until 1.5.0.

		@property onState
		@public
		@since 1.4.1
		**/
		public get onState(): boolean {
			if ( this.parent ) {
				if ( this.parent.objType() === "State" ) {
					return true;
				} else {
					return this.parent.onState;
				}
			}
			return false;
		}

		/**
		Horizontal coordinate of this group.
		This is just aliased to the `transform` property.

		@property x
		@type number
		@public
		**/
		public get x(): number {
			return this.transform.x;
		}
		public set x( value: number ) {
			this.transform.x = value;
		}

		/**
		Vertical coordinate of this group.
		This is just aliased to the `transform` property.

		@property y
		@type number
		@public
		**/
		public get y(): number {
			return this.transform.y;
		}
		public set y( value: number ) {
			this.transform.y = value;
		}

		/**
		Horizontal coordinate of this group in world space;
		that is, after parent transforms.
		This is just aliased to the `transform` property.
		This is READ-ONLY.

		@property worldX
		@type number
		@public
		@since 1.1.0
		**/
		public get worldX(): number {
			return this.transform.worldX;
		}

		/**
		Vertical coordinate of this group in world space;
		that is, after parent transforms.
		This is just aliased to the `transform` property.
		This is READ-ONLY.

		@property worldY
		@type number
		@public
		@since 1.1.0
		**/
		public get worldY(): number {
			return this.transform.worldY;
		}

		/*
		Horizontal scale of this group.
		This is just aliased to the `transform` property.

		@property scaleX
		@type number
		@public
		**/
		public get scaleX(): number {
			return this.transform.scaleX;
		}
		public set scaleX( value: number ) {
			this.transform.scaleX = value;
		}

		/*
		Vertical scale of this group.
		This is just aliased to the `transform` property.

		@property scaleY
		@type number
		@public
		**/
		public get scaleY(): number {
			return this.transform.scaleY;
		}
		public set scaleY( value: number ) {
			this.transform.scaleY = value;
		}

		/**
		Scale of this group.
		This is just aliased to the `transform` property.
		This is WRITE-ONLY.

		@property scale
		@type number
		@public
		@since 1.1.0
		**/
		public set scale( value: number ) {
			this.transform.scale = value;
		}

		/*
		Rotation of this group.
		This is just aliased to the `transform` property.

		@property rotation
		@type number
		@public
		**/
		public get rotation(): number {
			return this.transform.rotation;
		}
		public set rotation( value: number ) {
			this.transform.rotation = value;
		}

		/**
		Rotation offset of this group in the X axis.
		This is just aliased to the `transform` property.

		@property rotPointX
		@type number
		@public
		@since 1.1.0
		**/
		public get rotPointX(): number {
			return this.transform.rotPointX;
		}
		public set rotPointX( value: number ) {
			this.transform.rotPointX = value;
		}

		/**
		Rotation offset of this group in the Y axis.
		This is just aliased to the `transform` property.

		@property rotPointY
		@type number
		@public
		@since 1.1.0
		**/
		public get rotPointY(): number {
			return this.transform.rotPointY;
		}
		public set rotPointY( value: number ) {
			this.transform.rotPointY = value;
		}

		/**
		Anchor point offset of this group in the X axis.
		This is just aliased to the `transform` property,
		and is in turn an alias of rotPointX.

		@property anchorPointX
		@type number
		@public
		@since 1.1.0
		**/
		public get anchorPointX(): number {
			return this.transform.anchorPointX;
		}
		public set anchorPointX( value: number ) {
			this.transform.anchorPointX = value;
		}

		/**
		The anchor point offset of this group in the Y axis.
		This is just aliased to the `transform` property,
		and is in turn an alias of rotPointY.

		@property anchorPointY
		@type number
		@public
		@since 1.1.0
		**/
		public get anchorPointY(): number {
			return this.transform.anchorPointY;
		}
		public set anchorPointY( value: number ) {
			this.transform.anchorPointY = value;
		}

		/**
		Component manager; automatically updates every frame

		@property components
		@type Kiwi.ComponentManager
		@public
		**/
		public components: Kiwi.ComponentManager;

		/**
		Game to which this Group belongs

		@property game
		@type Kiwi.Game
		@public
		**/
		public game: Kiwi.Game = null;

		/**
		State to which this Group belongs

		@property state
		@type Kiwi.State
		@public
		**/
		public state: Kiwi.State = null;

		/**
		Unique identifier for this Group within the game,
		used internally by the framework.
		See the `name` property for a friendly version.

		@property id
		@type string
		@public
		**/
		public id: string;

		/**
		Collection of children belonging to this group

		@property members
		@type array
		@public
		**/
		public members: Kiwi.IChild[];

		public numChildren(): number {

			/**
			Return the total number of children in this Group.
			Note that this still counts children with `exists=false`,
			as they are only completely removed at the end of the frame.

			@method numChildren
			@return {number} Number of children in this Group
			@public
			**/

			return this.members.length;
		}

		/**
		Whether this group is "dirty" and thus needs to be re-rendered
		in some way.

		@property _dirty
		@type boolean
		@private
		**/
		private _dirty: boolean = true;

		/**
		Dirtiness of the Group and all its children.
		Setting this will update dirtiness of children immediately.

		@property dirty
		@type boolean
		@public
		**/
		public set dirty( value: boolean ) {
			if ( value !== undefined ) {
				this._dirty = value;

				for ( var i = 0; i < this.members.length; i++ ) {
					this.members[ i ].dirty = value;
				}
			}
		}
		public get dirty(): boolean {
			return this._dirty;
		}

		public contains( child: Kiwi.IChild ): boolean {

			/**
			Check whether the given entity is in this group.

			@method contains
			@param child {IChild} IChild to check
			@return {boolean} Whether entity exists in group
			@public
			**/

			// TODO: MAKE RECURSIVE
			return ( this.members.indexOf( child ) === -1 ) ? false : true;
		}

		public containsDescendant( child: Kiwi.IChild ): boolean {

			/**
			Check whether the given entity is in this group,
			or one of this group's descendants

			@method containsDescendant
			@param child {object} IChild to check
			@return {boolean}
			@public
			**/

			for ( var i = 0; i < this.members.length; i++ ) {
				var curMember: any = this.members[ i ];
				if ( curMember.id === child.id ||
					curMember.childType() === Kiwi.Group &&
					curMember.containsDesendant( child ) ) {

					return true;
				}
			}
			return false;
		}

		public containsAncestor(
			descendant: Kiwi.IChild,
			ancestor: Kiwi.Group ): boolean {

			/**
			Check whether a `Group` is an ancestor of another entity.

			@method containsAncestor
			@param descendant {object} Entity to check
			@param ancestor {Group} Group to check
			@return {boolean}
			@public
			**/

			if (
				descendant.parent === null ||
				descendant.parent === undefined ) {

				return false;
			}
			if ( descendant.parent === ancestor ) {
				return true; //desendants parent is the same?
			}
			return descendant.parent.containsAncestor(
				descendant.parent, ancestor ); //keep going up the chain.
		}


		/*
		-------------------------
		Add Children methods
		-------------------------
		*/


		public addChild( child: Kiwi.IChild ): Kiwi.IChild {

			/**
			Add a child to this `Group`.

			The child may be an `Entity` or `Group`.
			It cannot be a `State`, nor can it be this very `Group`.

			The child will be removed from its current parents, if any.

			@method addChild
			@param child {object} Child to be added
			@return {object} Child that was added
			@public
			**/

			// TODO:
			// Implement feature where you can pass many children to be added.
			// Modify this script to work via the `arguments` property.

			// Make sure you aren't adding a state or itself
			if ( child.childType() === Kiwi.STATE || child === this ) {
				return;
			}

			// Remove prior parentage
			if ( child.parent !== null ) {
				child.parent.removeChild( child );
			}

			// Add child to this group
			this.members.push( child );
			child.parent = this;

			return child;
		}

		public addChildAt( child: Kiwi.IChild, index: number ): Kiwi.IChild {

			/**
			Add a child to this Group, at the specific child index.
			Use this to place a child behind or in front of other objects
			in the scene graph.

			The child may be an `Entity` or `Group`.
			It cannot be a `State`, nor can it be this very `Group`.

			The child will be removed from its current parents, if any.

			@method addChildAt
			@param child {object} Child to be added
			@param index {number} Index at which to insert the child
			@return {object} Child that was added
			@public
			**/

			if ( child.childType() === Kiwi.STATE || child === this ) {
				return;
			}

			if ( child.parent !== null ) {
				child.parent.removeChild( child );
			}

			this.members.splice( index, 0, child );
			child.parent = this;

			return child;
		}

		public addChildBefore(
			child: Kiwi.IChild,
			beforeChild: Kiwi.IChild ): Kiwi.IChild {

			/**
			Add a child to this Group, just behind another child.

			The child may be an `Entity` or `Group`.
			It cannot be a `State`, nor can it be this very `Group`.

			The child will be removed from its current parents, if any.

			@method addChildBefore
			@param child {object} Child to be added
			@param beforeChild {Entity} Child before which to add the child
			@return {object} Child that was added
			@public
			**/

			if ( beforeChild.transform.parent === this.transform ) {

				if ( child.parent !== null ) {
					child.parent.removeChild( child );
				}

				var index: number = this.getChildIndex( beforeChild );

				this.members.splice( index, 0, child );
				child.parent = this;
			}

			return child;

		}

		public addChildAfter(
			child: Kiwi.IChild,
			afterChild: Kiwi.IChild ): Kiwi.IChild {

			/**
			Add an Entity to this Group, just above another child.

			The child may be an `Entity` or `Group`.
			It cannot be a `State`, nor can it be this very `Group`.

			The child will be removed from its current parents, if any.

			@method addChildAfter
			@param child {object} Child to be added
			@param afterChild {object} Child after which to add the child
			@return {object} Child that was added
			@public
			**/

			if ( afterChild.transform.parent === this.transform ) {

				if ( child.parent !== null ) {
					child.parent.removeChild( child );
				}

				var index: number = this.getChildIndex( afterChild ) + 1;

				this.members.splice( index, 0, child );
				child.parent = this;
			}

			return child;

		}


		/*
		--------------------
		Remove Children Methods
		--------------------
		*/


		public removeChild(
			child: Kiwi.IChild,
			destroy: boolean = false ): Kiwi.IChild {

			/**
			Remove a child from this Group.
			The child must be a member of this specific group.

			@method removeChild
			@param child {object} Child to be removed
			@param [destroy=false] {boolean} Whether to destroy the child
			@return {object} Child that was removed
			@public
			**/

			if ( child.parent === this ) {

				var index: number = this.getChildIndex( child );

				if ( index > -1 ) {
					this.members.splice( index, 1 );
					child.parent = null;

					if ( destroy ) {
						child.destroy();
					}
				}

			}

			return child;
		}

		public removeChildAt( index: number ): Kiwi.IChild {

			/**
			Remove a child from this Group at a specific member index.

			@method removeChildAt
			@param index {number} Index of the child to be removed
			@return {object} Child removed, or `null`
			**/

			if ( this.members[ index ] ) {
				var child: Kiwi.IChild = this.members[ index ];

				return this.removeChild( child );
			} else {
				return null;
			}

		}

		public removeChildren(
			begin: number = 0,
			end: number = 0x7fffffff,
			destroy: boolean = false ): number {

			/**
			Remove all children from this Group, within the given range.

			For example, `removeChildren( 3, 5 )` will remove children
			at member indices 3 and 4 (but not 5).

			@method removeChildren
			@param [begin=0] {number} Beginning index
			@param [end=2147483647] {number} Last index of the range
			@param [destroy=false] {number} Whether to destroy children
			@return {number} Number of removed entities
			@public
			**/

			end -= begin;

			var removed: Kiwi.IChild[] = this.members.splice( begin, end );

			for ( var i = 0; i < removed.length; i++ ) {
				removed[ i ].parent = null;

				if ( destroy ) {
					removed[ i ].destroy();
				}
			}

			return removed.length;
		}

		public removeFirstAlive( destroy: boolean = false ): Kiwi.IChild {

			/**
			Remove the first child from this Group marked as `alive`.

			@method removeFirstAlive
			@param [destroy=false] {boolean} Whether to destroy the child
			@return {object} Child removed, or `null`
			@public
			@deprecated in v1.1.0
			**/

			return this.removeChild( this.getFirstAlive(), destroy );

		}


		/*
		-------------------
		Get Children Methods
		-------------------
		*/

		public getAllChildren(
			getGroups: boolean = true,
			destinationArray: IChild[] = [] ): IChild[] {

			/**
			Get all children of this Group.
			By default, this will search the entire sub-graph,
			including children of children etc.

			@method getAllChildren
			@param [getGroups=true] {boolean} Whether to include Groups
				in the results
			@param [destinationArray] {array} Array in which to store
				the results
			@return {array}
			@since 1.1.0
			**/

			for ( var i = 0; i < this.members.length; i++ ) {
				if ( this.members[ i ].objType() === "Group" ) {
					if ( getGroups ) {
						destinationArray.push( this.members[ i ] );
					}
					( <Kiwi.Group>this.members[ i ] ).getAllChildren(
						getGroups, destinationArray );
				} else {
					destinationArray.push( this.members[ i ] );
				}
			}
			return destinationArray;
		}

		public getChildAt( index: number ): Kiwi.IChild {

			/**
			Get the child at a specific position in this Group by its index.

			@method getChildAt
			@param index {number} Index of the child
			@return {object} Child if found, or `null` if not
			@public
			**/

			if ( this.members[ index ] ) {
				return this.members[ index ];
			} else {
				return null;
			}

		}

		public getChildByName(
			name: string,
			recurse: boolean = false ): Kiwi.IChild {

			/**
			Get a child from this Group by its name.
			By default this will not check sub-groups,
			but if you supply the `recurse` flag
			it will check the entire scene graph under this object.

			@method getChildByName
			@param name {string} Name of the child
			@param [recurse=false] {boolean} Whether to search child groups
			@return {object} Child if found, or `null` if not
			@public
			**/

			for ( var i = 0; i < this.members.length; i++ ) {
				if ( this.members[ i ].name === name ) {
					return this.members[ i ];
				} else if (
					this.members[ i ].objType() === "Group" &&
					recurse ) {

					var groupResponse =
						( <Kiwi.Group>this.members[ i ] ).getChildByName(
							name, true );
					if ( groupResponse !== null ) {
						return groupResponse;
					}
				}
			}

			return null;

		}

		public getChildByID(
			id: string,
			recurse: boolean = false ): Kiwi.IChild {

			/**
			Get a child from this Group by its UUID (`child.id`).
			By default this will not check sub-groups,
			but if you supply the `recurse` flag
			it will check the entire scene graph under this object.

			@method getChildByID
			@param id {string} UUID of the child.
			@param [recurse=false] {boolean} Whether to search child groups
			@return {object} Child if found, or `null` if not
			@public
			**/

			for ( var i = 0; i < this.members.length; i++ ) {
				if ( this.members[ i ].id === id ) {
					return this.members[ i ];
				} else if (
					this.members[ i ].objType() === "Group" &&
					recurse ) {

					var groupResponse =
						( <Kiwi.Group>this.members[ i ] ).getChildByID(
							id, true );
					if ( groupResponse !== null ) {
						return groupResponse;
					}
				}
			}

			return null;

		}

		public getChildIndex( child: Kiwi.IChild ): number {

			/**
			Return the index position of the child, or `-1` if not found.

			@method getChildIndex
			@param child {object} Child to find
			@return {number} Index of the child, or `-1` if not found.
			@public
			**/

			return this.members.indexOf( child );

		}

		public getFirstAlive(): Kiwi.IChild {

			/**
			Return the first child from this Group marked as `exists=true`,
			or `null` if no members are alive.

			@method getFirstAlive
			@return {IChild} First living child, or `null`
			@public
			@deprecated in v1.1.0
			**/

			for ( var i = 0; i < this.members.length; i++ ) {
				if ( this.members[ i ].exists === true ) {
					return this.members[ i ];
				}
			}

			return null;
		}

		public getFirstDead(): Kiwi.IChild {

			/**
			Return the first member of the Group marked as `exists=false`.
			Returns `null` if all members are alive.

			@method getFirstDead
			@return {IChild} First dead child, or `null`
			@public
			@deprecated in v1.1.0
			**/

			for ( var i = 0; i < this.members.length; i++ ) {
				if ( this.members[ i ].exists === false ) {
					return this.members[ i ];
				}
			}

			return null;

		}

		public getRandom(
			start: number = 0,
			length: number = 0 ): Kiwi.IChild {

			/**
			Return a member at random from the group.

			@method getRandom
			@param [start=0] {number} Start of sequence to randomly sample
			@param [length=0] {number} Length of sequence to randomly sample.
				If `0`, will sample to the end of the array.
			@return {object} Child selected
			@public
			**/

			if ( this.members.length === 0 ) {
				return null;
			}

			// Comply start to viable range
			start = Kiwi.Utils.GameMath.clamp(
				start, this.members.length - 1 );

			// Comply length to fit
			if ( length === 0 ) {
				length = this.members.length;
			}
			if ( this.members.length <= start + length ) {
				length = this.members.length - start - 1;
			}

			// Create and truncate random index
			var rnd = start + Math.random() * length;
			rnd = Math.floor( rnd );

			// Return
			return this.members[ rnd ];
		}

		public getChildrenByTag( tag: string ): IChild[] {

			/**
			Return an array of children containing a specified tag.

			@method getChildrenByTag
			@param tag {string} Tag to check
			@return {array} List of children with that tag
			@public
			@since 1.1.0
			**/

			var children = [];

			for ( var i = 0; i < this.members.length; i++ ) {

				if ( this.members[ i ].hasTag( tag ) ) {
					children.push( this.members[ i ] );
				}

				if ( this.members[ i ].childType() === Kiwi.GROUP ) {
					children = children.concat(
						( <Kiwi.Group>this.members[ i ] ).getChildrenByTag(
							tag ) );
				}

			}

			return children;
		}

		public getFirstChildByTag( tag: string ): IChild {

			/**
	 		Return the first child containing a specified tag.
	 		This recursively searches within groups.

	 		@method getFirstChildByTag
	 		@param tag {string} Tag to check
	 		@return {IChild} Tagged child, or `null`
	 		@public
	 		@since 1.3.0
			**/

			for ( var i = 0; i < this.members.length; i++ ) {

				if ( this.members[ i ].hasTag( tag ) ) {
					return this.members[ i ];
				}

				if ( this.members[ i ].childType() === Kiwi.GROUP ) {
					var child =
						( ( <Kiwi.Group>this.members[ i ] ).getFirstChildByTag(
							tag ) );

					if ( child ) {
						return child;
					}
				}

			}

			return null;
		}

		public getLastChildByTag( tag: string ): IChild {

			/**
	 		Return the last child containing the specified tag.
	 		This recursively searches within groups.

	 		@method getLastChildByTag
	 		@param tag {string} Tag to check
	 		@return {IChild} Tagged child, or `null`
	 		@public
	 		@since 1.3.0
			**/

			for ( var i = this.members.length - 1; i >= 0; i-- ) {

				if ( this.members[ i ].hasTag( tag ) ) {
					return this.members[ i ];
				}

				if ( this.members[ i ].childType() === Kiwi.GROUP ) {
					var child =
						( ( <Kiwi.Group>this.members[ i ] ).getLastChildByTag(
							tag ) );

					if ( child ) {
						return child;
					}
				}

			}

			return null;
		}


		/*
		--------------------
		Child Depth Sorting Methods
		--------------------
		*/


		public setChildIndex( child: Kiwi.IChild, index: number ): boolean {

			/**
			Move a child to a new depth index within the `Group`.

			This method will fail if the child is not a child of this group,
			or if it is already at the specified index.

			@method setChildIndex
			@param child {object} Child to change
			@param index {number} Index to which to send the child
			@return {boolean} Whether the child was successfully moved
			@public
			**/

			// If the Entity isn't in this Group,
			// or is already at that index, then bail out
			if (
				child.parent !== this ||
				this.getChildIndex( child ) === index ) {

				return false;
			}

			this.removeChild( child );
			this.addChildAt( child, index );

			return true;
		}

		public swapChildren(
			child1: Kiwi.IChild,
			child2: Kiwi.IChild ): boolean {

			/**
			Swap the position of two existing direct children of this `Group`.

			This method will fail if either child is not a child of this group,
			or if they are at the same index (i.e. they are the same object).

			@method swapChildren
			@param child1 {object} First child to swap
			@param child2 {object} Second child to swap
			@return {boolean} Whether the children were successfully swapped
			@public
			**/

			// If either Entity isn't in this Group,
			// or is already at that index, then bail out
			if (
				child1.parent !== this ||
				child2.parent !== this ) {

				return false;
			}

			var index1 = this.getChildIndex( child1 );
			var index2 = this.getChildIndex( child2 );

			if ( index1 !== -1 && index2 !== -1 && index1 !== index2 ) {
				this.members[ index1 ] = child2;
				this.members[ index2 ] = child1;

				return true;
			}

			return false;
		}

		public swapChildrenAt( index1: number, index2: number ): boolean {

			/**
			Swap the position of two existing children of the Group,
			based on their member indices.

			@method swapChildrenAt
			@param index1 {number} Index of the first child to swap
			@param index2 {number} Index of the second child to swap
			@return {boolean} Whether children were swapped successfully
			@public
			**/

			var child1: Kiwi.IChild = this.getChildAt( index1 );
			var child2: Kiwi.IChild = this.getChildAt( index2 );

			if ( child1 !== null && child2 !== null ) {

				// If either Entity isn't in this Group,
				// or is already at that index, then bail out
				if (
					child1 === child2 ||
					child1.parent !== this ||
					child2.parent !== this ) {

					return false;
				}

				this.members[ index1 ] = child2;
				this.members[ index2 ] = child1;

				return true;
			}

			return false;
		}

		public replaceChild(
			oldChild: Kiwi.IChild,
			newChild: Kiwi.IChild ): boolean {

			/**
			Replace a child in this Group with a new one.

			@method replaceChild
			@param oldChild {object} Child in this Group to be removed
			@param newChild {object} Child to insert at old child's position
			@return {boolean} Whether child was replaced successfully
			@public
			**/

			// Fall through if replacing child with the same child
			if ( oldChild === newChild ) {
				return false;
			}

			// Get the index of the existing child
			var index: number = this.getChildIndex( oldChild );

			if ( index > -1 ) {

				// Remove the new child from its current parent
				if ( newChild.parent ) {
					newChild.parent.removeChild( newChild );
				}

				this.removeChildAt( index );

				this.addChildAt( newChild, index );
				newChild.parent = null;

				return true;
			}

			return false;
		}

		public forEach( context, callback, ...params: any[] ) {

			/**
			Loop through each group member and run a method on each one.

			The callback method will receive each child as its first parameter,
			followed by any additional parameters provided to this method.

			@method forEach
			@param context {any} Execution context for callbacks
			@param callback {any} Method to execute on each member
			@param [params]* {any} Any extra parameters
			@public
			**/

			if ( this.members.length > 0 ) {
				this.members.forEach( ( child ) => callback.apply(
					context, [ child ].concat( params ) ) );
			}

		}

		public forEachAlive( context, callback, ...params: any[] ) {

			/**
			Loop through each member of the group that exists.
			This is useful for avoiding just-deleted game objects.

			The callback method will receive each child as its first parameter,
			followed by any additional parameters provided to this method.

			@method forEachAlive
			@param context {any} Execution context for callbacks
			@param callback {any} Method to execute on each member
			@param [params]* {any} Any extra parameters
			@public
			**/

			if ( this.members.length > 0 ) {

				this.members.forEach( ( child ) => {
					if ( child.exists ) {
						callback.apply( context, [ child ].concat( params ) );
					}
				} );

			}

		}

		public setAll( componentName: string, property: string, value: any ) {

			/**
			Set a property on every member. If `componentName` is `null`,
			the property is set on the child itself.
			Otherwise it is set on the named component.

			Uses runtime string property lookups.
			Not optimal for large groups if speed is an issue.

			@method setAll
			@param componentName {string} Name of the component to set
				the property on. Set to `null` to set a property on the child.
			@param property {string} Name of the property to set
			@param value {any} Value to which to set the property
			@public
			**/

			if ( componentName === null ) {
				for ( var i: number = 0; i < this.members.length; i++ ) {
					this.members[ i ][ property ] = value;
				}
			} else {
				for ( var i: number = 0; i < this.members.length; i++ ) {
					this.members[ i ][ componentName ][ property ] = value;
				}
			}
		}

		public callAll(
			componentName: string,
			functionName: string,
			args?: any[] ) {

			/**
			Call a function on every member. If `componentName` is `null`,
			the function is called on the child itself.
			Otherwise it is called on the named component.

			Uses runtime string property lookups.
			Not optimal for large groups if speed is an issue.

			@method callAll
			@param componentName {string} Name of the component to call
				the function on. Set to `null` to call a function on the child.
			@param functionName {string} Name of the function to call
			@param args {array} Array of arguments to pass to the function
			@public
			**/

			if ( componentName === null ) {
				for ( var i: number = 0; i < this.members.length; i++ ) {
					this.members[ i ][ functionName ].apply(
						this.members[ i ], args );
				}
			} else {
				for ( var i: number = 0; i < this.members.length; i++ ) {
					this.members[ i ][ componentName ][ functionName ].apply(
						this.members[ i ][ componentName ], args );
				}
			}
		}

		public update() {

			/**
			Update this group. This is automatically called per frame,
			if the group is `active`.

			This method will first call `preUpdate` on components;
			then `update` on components;
			then `update` on all members, calling `destroy` on those
			with `exists= false`;
			then `postUpdate` on components.

			You may extend this function, although we recommend that you use
			`Component` objects instead.

			@method update
			@public
			**/

			this.components.preUpdate();

			this.components.update();
			if ( this.members.length > 0 ) {

				for ( var i = 0; i < this.members.length; i++ ) {
					if ( this.members[ i ].active === true ) {
						this.members[ i ].update();
					}

					if ( this.members[ i ].exists === false ) {
						this.members[ i ].destroy( true );
					}
				}

			}

			this.components.postUpdate();

		}

		/**
		Whether the `Group` exists. If an `IChild` no longer exists,
		it is cleared for garbage collection or pool re-allocation.

		@property _exists
		@type boolean
		@private
		**/
		private _exists: boolean;

		/**
		Toggles the existence of this `Group`.
		An `IChild` that no longer exists can be garbage collected
		or re-allocated in a pool.

		@property exists
		@type boolean
		@public
		**/
		public set exists( value: boolean ) {
			this._exists = value;
		}

		public get exists(): boolean {
			return this._exists;
		}

		/**
		Whether the `Group` is active. An active IChild will have `update`
		called by its parent.

		@property _active
		@type boolean
		@default true
		@private
		**/
		private _active: boolean;

		/**
		Toggles the active state of this Entity. An Entity that is active has its update method called by its parent.
		This method should be over-ridden to handle specific dom/canvas/webgl implementations.
		@property active
		@type boolean
		@default true
		@public
		**/
		public set active( value: boolean ) {
			this._active = value;
		}
		public get active(): boolean {
			return this._active;
		}

		public render( camera: Kiwi.Camera ) {

			/**
			Render method that is required by the IChild.

			This method never gets called,
			as the renderer is only worried about rendering entities.

			@method render
			@param camera {Kiwi.Camera} Currently rendering camera
			@public
			@deprecated
			**/

		}

		public countLiving(): number {

			/**
			Return the number of members which have `exists=true`.

			@method countLiving
			@return {number} Number of extant members
			@public
			**/

			var total: number = 0;

			for ( var i = 0; i < this.members.length; i++ ) {
				if ( this.members[ i ].exists === true ) {
					total++;
				}
			}

			return total;

		}

		public countDead(): number {

			/**
			Return the number of members which have `exists=false`.

			@method countDead
			@return {number} Number of non-extant members
			@public
			**/

			var total: number = 0;

			for ( var i = 0; i < this.members.length; i++ ) {
				if ( this.members[ i ].exists === false ) {
					total++;
				}
			}

			return total;

		}

		public clear() {

			/**
			Clear all children from this Group.

			@method clear
			@public
			**/

			this.members.length = 0;

		}

		/**
		Controls whether render is automatically called by the parent

		@property _willRender
		@type boolean
		@private
		@deprecated Use _visible instead
		**/
		private _willRender: boolean;

		/**
		Controls whether render is automatically called by the parent

		@property willRender
		@type boolean
		@public
		@deprecated Use visible instead
		**/
		public set willRender( value: boolean ) {
			this._willRender = value;
		}
		public get willRender(): boolean {
			return this._willRender;
		}

		/**
		Whether this is visible or not.
		Note that groups do not have alpha,
		so this is the only way to control visibility.

		@property _visible
		@type boolean
		@default true
		@private
		@since 1.0.1
		**/
		private _visible: boolean;

		/**
		Whether this is visible or not.
		Note that groups do not have alpha,
		so this is the only way to control visibility.

		@property visible
		@type boolean
		@default true
		@public
		@since 1.0.1
		**/
		public set visible( value: boolean ) {
			this._visible = value;
		}
		public get visible(): boolean {
			return this._visible;
		}




		/*
		---------------
		Tagging System
		---------------
		*/


		/**
		Tags that are on this Entity.
		This can be used to grab GameObjects or Groups on the whole game
		which have these particular tags.

		By default there are no tags.

		@property _tags
		@type array
		@default []
		@since 1.1.0
		@private
		**/
		private _tags: string[] = [];

		public addTag( ...args: any[] ) {

			/**
			Add a new tag to this `Group`.
			Useful for distinguishing between the same type of GameObject.

			You can pass multiple strings to add multiple tags.

			@method addTag
			@param tag {string} Tag to add
			@since 1.1.0
			@public
			**/

			// Loop through the arguments
			for ( var i = 0; i < args.length; i++ ) {
				if ( this._tags.indexOf( args[ i ] ) === -1 ) {
					this._tags.push( args[ i ] );
				}
			}

		}

		public removeTag( ...args: any[] ) {

			/**
			Remove a Tag from this `Group`, if it is present.

			@method removeTag
			@param tag {string} Tag to remove
			@since 1.1.0
			@public
			**/

			for ( var i = 0; i < args.length; i++ ) {
				var index = this._tags.indexOf( args[ i ] );
				if ( index !== -1 ) {
					this._tags.splice( index, 1 );
				}
			}

		}

		public hasTag( tag: string ): boolean {

			/**
			Return whether this `Group` has a specified tag.

			@method hasTag
			@param tag {string} Tag to check
			@since 1.1.0
			@return {boolean}
			@public
			**/

			var len = this._tags.length;
			while ( len-- ) {
				if ( this._tags[ len ] === tag ) {
					return true;
				}
			}

			return false;
		}

		public destroy(
			immediate: boolean = false,
			destroyChildren: boolean = true ) {

			/**
			Remove all children and destroy the `Group`.

			@method destroy
			@param [immediate=false] {boolean} Whether the object should be
				immediately removed, or should be removed at
				the end of the next `update` loop.
			@param [destroyChildren=true] {boolean} Whether all of the children
				on the group should also have their `destroy` methods called
			@public
			**/

			if ( !this.onState ) {
				immediate = true;
			}

			this._exists = false;
			this._active = false;
			this._visible = false;

			if ( immediate === true ) {

				if ( this._tempRemoveChildren !== null ) {
					destroyChildren = this._tempRemoveChildren;
				}

				if ( destroyChildren === true ) {

					// Remove all of the children
					for ( var i = 0; i < this.members.length; i++ ) {
						this.members[ i ].destroy( true );
					}

				} else {
					this.removeChildren();
				}

				if ( this.parent !== null ) {
					this.parent.removeChild( this );
				}
				if ( this.state ) {
					this.state.removeFromTrackingList( this );
				}
				if ( this.components ) {
					this.components.removeAll();
				}
				delete this.transform;
				delete this.components;
				delete this.game;
				delete this.state;

			} else {
				this._tempRemoveChildren = destroyChildren;
			}

		}

		/**
		Whether the group's children should be destroyed

		@property _tempRemoveChildren
		@type boolean
		@default null
		@private
		**/
		private _tempRemoveChildren: boolean = null;

	}

}
