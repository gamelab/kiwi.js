/**
@module Kiwi
@submodule Components
**/

module Kiwi.Components {

	export class Box extends Component {

		/**
		The Box Component is used to handle the various bounds
		of each GameObject.

		All bounds are rectangles.
		There are two main different types of bounds: Bounds and Hitbox.
		Each has three variants:

		* `rawBounds`: Bounding box of the GameObject before rotation/scale.
		* `rawHitbox`: Hitbox of the GameObject before rotation/scale.
		  This can be modified to be different than the normal bounds but if
		  not specified it will be the same as the raw bounds.
		* `bounds`: Bounding box of the GameObject after rotation/scale.
		* `hitbox`: Hitbox of the GameObject after rotation/scale.
		  If you modified the raw hitbox then this one will be modified
		  as well, otherwise it will be the same as the normal bounds.
		* `worldBounds`: Bounding box of the Entity using its world coordinates
		  and after rotation/scale.
		* `worldHitbox`: Hitbox of the Entity using its world coordinates
		  and after rotation/scale.

		NOTE: If you want to alter the hitbox, you must set `hitbox`
		to a new `Geom.Rect` object. This will update internal Box values.

		@class Box
		@extends Kiwi.Component
		@namespace Kiwi.Components
		@constructor
		@param parent {Kiwi.Entity} Entity that this box belongs to
		@param [x=0] {number} Horizontal position
		@param [y=0] {number} Vertical position
		@param [width=0] {number} Width of the box
		@param [height=0] {number} Height of the box
		**/

		constructor(
			parent: Entity,
			x: number = 0,
			y: number = 0,
			width: number = 0,
			height: number = 0 ) {

			super( parent, "Box" );

			this.entity = parent;

			this._rawBounds = new Kiwi.Geom.Rectangle( x, y, width, height );
			this._rawCenter =
				new Kiwi.Geom.Point( x + width / 2, y + height / 2 );
			this._rawHitbox = new Kiwi.Geom.Rectangle();

			this._hitboxOffset = new Kiwi.Geom.Point();

			this.hitbox = new Kiwi.Geom.Rectangle( 0, 0, width, height );
			this.autoUpdate = true;

			this._scratchMatrix = new Kiwi.Geom.Matrix();
		}


		/**
		Entity that this box belongs to

		@property entity
		@type Kiwi.Entity
		@public
		**/
		public entity: Kiwi.Entity;


		/**
		Type of object that this is

		@method objType
		@return {string} "Box"
		@public
		**/
		public objType() {
			return "Box";
		}


		/**
		Whether the hitbox should update automatically to match the hitbox
		of the current cell on the entity this Box component is attached to
		(default behaviour).
		If the hitbox shouldn't auto update, it will keep its last value.

		This property is automatically set to `false` when you override
		the hitbox, but you can set this to true afterwards.

		@property autoUpdate
		@type boolean
		@default true
		@public
		**/
		public autoUpdate: boolean = true;


		/**
		Whether this component needs re-rendering/updating or not

		@property dirty
		@type boolean
		@public
		@deprecated in version 1.1.0 because the box always needed updating
		**/
		public dirty: boolean;


		/**
		Offset point for the hitbox

		@property _hitboxOffset
		@type Kiwi.Geom.Point
		@private
		**/
		private _hitboxOffset: Kiwi.Geom.Point;


		public get hitboxOffset(): Kiwi.Geom.Point {

			/**
			Offset value of the hitbox as a point on the X/Y axis.
			This is without rotation or scaling.
			This is a READ ONLY property.

			@property hitboxOffset
			@type Kiwi.Geom.Point
			@public
			**/

			if (
				this.autoUpdate == true &&
				this.entity.atlas !== null &&
				this.entity.atlas.cells &&
				this.entity.atlas.cells[ 0 ].hitboxes ) {

				this._hitboxOffset.x = this.entity.atlas.cells[
					this.entity.cellIndex ].hitboxes[ 0 ].x || 0;
				this._hitboxOffset.y = this.entity.atlas.cells[
					this.entity.cellIndex ].hitboxes[ 0 ].y || 0;

			}

			return this._hitboxOffset;
		}


		/**
		Offset rectangle for the raw hitbox

		@property _rawHitbox
		@type Kiwi.Geom.Rectangle
		@private
		**/
		private _rawHitbox: Kiwi.Geom.Rectangle;

		public get rawHitbox(): Kiwi.Geom.Rectangle {

			/**
			Raw hitbox rectangle.
			"Raw" means where it would be without rotation or scaling.
			This is READ ONLY.

			@property rawHitbox
			@type Kiwi.Geom.Rectangle
			@public
			**/

			this._rawHitbox.x = this.rawBounds.x + this.hitboxOffset.x;
			this._rawHitbox.y = this.rawBounds.y + this.hitboxOffset.y;

			// If the hitbox has not already been set,
			// then update the width/height based upon
			// the current cell that the entity has.
			if ( this.autoUpdate == true ) {
				var atlas = this.entity.atlas;

				if (
						atlas !== null &&
						atlas.cells &&
						atlas.cells[ 0 ].hitboxes ) {
					this._rawHitbox.width = atlas.cells[ this.entity.cellIndex ].hitboxes[ 0 ].w;
					this._rawHitbox.height = atlas.cells[ this.entity.cellIndex ].hitboxes[ 0 ].h;
				} else {
					this._rawHitbox.width = this.entity.width;
					this._rawHitbox.height = this.entity.height;
				}
			}

			return this._rawHitbox;
		}


		/**
		Transformed or "normal" hitbox for the entity.
		This is its box after rotation/scale.

		@property _transformedHitbox
		@type Kiwi.Geom.Rectangle
		@private
		**/
		private _transformedHitbox: Kiwi.Geom.Rectangle;


		/**
		Transformed "world" hitbox for the entity.
		This is its box after rotation/scale.

		@property _worldHitbox
		@type Kiwi.Geom.Rectangle
		@private
		**/
		private _worldHitbox: Kiwi.Geom.Rectangle;


		/**
		"Normal" or transformed hitbox for the entity.
		This is its box after rotation/Kiwi.Geom.Rectangle.

		You cannot modify this value in place. You must set it to
		a new `Kiwi.Geom.Rectangle` object, which will update
		internal records.

		@property hitbox
		@type Kiwi.Geom.Rectangle
		@public
		**/
		public get hitbox(): Kiwi.Geom.Rectangle {
			this._transformedHitbox =
				this._rotateHitbox( this.rawHitbox.clone() );

			return this._transformedHitbox;
		}
		public set hitbox( value: Kiwi.Geom.Rectangle ) {

			// Use custom hitbox defined by user.
			this._hitboxOffset.x = value.x;
			this._hitboxOffset.y = value.y;

			this._rawHitbox = value;

			this._rawHitbox.x += this._rawBounds.x;
			this._rawHitbox.y += this._rawBounds.y;

			this.autoUpdate = false;
		}


		/**
		Transformed hitbox for the entity
		using its "world" coordinates.

		This is READ ONLY.
		@property worldHitbox
		@type Kiwi.Geom.Rectangle
		@public
		**/
		public get worldHitbox(): Kiwi.Geom.Rectangle {
			this._worldHitbox =
				this._rotateHitbox( this.rawHitbox.clone(), true );

			return this._worldHitbox;
		}


		/**
		"Raw" bounds of entity. These are its bounds before rotation/scale.
		This property is only for storage of the values
		and should be accessed via the getter `rawBounds` so it can update.

		@property _rawBounds
		@type Kiwi.Geom.Rectangle
		@private
		**/
		private _rawBounds: Kiwi.Geom.Rectangle;


		/**
		"Raw" bounds for this entity.
		This is READ ONLY.

		@property rawBounds
		@type Kiwi.Geom.Rectangle
		@public
		**/
		public get rawBounds(): Kiwi.Geom.Rectangle {
			this._rawBounds.x = this.entity.x;
			this._rawBounds.y = this.entity.y;
			this._rawBounds.width = this.entity.width;
			this._rawBounds.height = this.entity.height;

			return this._rawBounds;
		}


		/**
		"Raw" center point for the bounds

		@property Kiwi.Geom.Point
		@type Kiwi.Geom.Point
		@private
		**/
		private _rawCenter: Kiwi.Geom.Point;


		/**
		Raw center point of the box.
		This is READ ONLY.

		@property rawCenter
		@type Kiwi.Geom.Point
		@public
		**/
		public get rawCenter(): Kiwi.Geom.Point {
			this._rawCenter.x = this.rawBounds.x + this.rawBounds.width / 2;
			this._rawCenter.y = this.rawBounds.y + this.rawBounds.height / 2;

			return this._rawCenter;
		}

		/**
		Scratch matrix used in geometry calculations

		@property _scratchMatrix
		@type Kiwi.Geom.Matrix
		@private
		@since 1.3.1
		**/
		private _scratchMatrix: Kiwi.Geom.Matrix;


		/**
		Center point after the box has been transformed

		@property _transformedCenter
		@type Kiwi.Geom.Point
		@private
		**/
		private _transformedCenter: Kiwi.Geom.Point;


		/**
		Center point for the box after it has been transformed.
		World coordinates.
		This is READ ONLY.

		@property center
		@type Kiwi.Geom.Point
		@public
		**/
		public get center(): Kiwi.Geom.Point {
			var m: Kiwi.Geom.Matrix =
					this.entity.transform.getConcatenatedMatrix();

			this._transformedCenter = m.transformPoint(
				new Kiwi.Geom.Point(
					this.entity.width / 2 - this.entity.anchorPointX,
					this.entity.height / 2 - this.entity.anchorPointY ) );

			return this._transformedCenter;
		}


		/**
		Transformed or "normal" bounds for this entity

		@property _transformedBounds
		@type Kiwi.Geom.Rectangle
		@private
		**/
		private _transformedBounds: Kiwi.Geom.Rectangle;


		/**
		"World" transformed bounds for this entity

		@property _worldBounds
		@type Kiwi.Geom.Rectangle
		@private
		**/
		private _worldBounds: Kiwi.Geom.Rectangle;


		/**
		"Transformed" or "normal" bounds for this box.
		This is READ ONLY.

		@property bounds
		@type Kiwi.Geom.Rectangle
		@public
		**/
		public get bounds(): Kiwi.Geom.Rectangle {
			this._transformedBounds =
				this._rotateRect( this.rawBounds.clone() );

			return this._transformedBounds;
		}

		/**
		"Transformed" bounds for this entity using the world coodinates.
		This is READ ONLY.

		@property worldBounds
		@type Kiwi.Geom.Rectangle
		@public
		**/
		public get worldBounds(): Kiwi.Geom.Rectangle {
			this._worldBounds =
				this._rotateRect( this.rawBounds.clone(), true );

			return this._worldBounds;
		}

		private _rotateRect(
			rect: Kiwi.Geom.Rectangle,
			useWorldCoords: boolean = false ): Kiwi.Geom.Rectangle {

			/**
			Calculate the transformed bounds after rotation/scale.

			@method _rotateRect
			@param rect {Kiwi.Geom.Rectangle}
			@param [useWorldCoords=false] {Boolean}
			@return {Kiwi.Geom.Rectangle}
			@private
			**/

			var out: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(),
				t: Kiwi.Geom.Transform = this.entity.transform,
				m: Kiwi.Geom.Matrix = this._scratchMatrix.copyFrom(
					t.getConcatenatedMatrix() );

			// Use world coordinates?
			if ( !useWorldCoords ) {
				m.setTo( m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY );
			}

			out = this.extents(
				m.transformPoint( {
					x: - t.rotPointX,
					y: - t.rotPointY } ),
				m.transformPoint( {
					x: - t.rotPointX + rect.width,
					y: - t.rotPointY } ),
				m.transformPoint( {
					x: - t.rotPointX + rect.width,
					y: - t.rotPointY + rect.height } ),
				m.transformPoint( {
					x: - t.rotPointX,
					y: - t.rotPointY + rect.height } )
				);
			return out;
		}


		private _rotateHitbox(
			rect: Kiwi.Geom.Rectangle,
			useWorldCoords: boolean = false ): Kiwi.Geom.Rectangle {

			/**
			Calculate the transformed hitbox's coordinates after rotation.

			@method _rotateHitbox
			@param rect {Kiwi.Geom.Rectangle}
			@param [useWorldCoords=false] {Boolean}
			@return {Kiwi.Geom.Rectangle}
			@private
			**/

			var out: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle();
			var t: Kiwi.Geom.Transform = this.entity.transform;
			var m: Kiwi.Geom.Matrix = this._scratchMatrix.copyFrom(
				t.getConcatenatedMatrix() );

			// Use world coordinates?
			if ( !useWorldCoords ) {
				m.setTo( m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY );
			}

			out = this.extents(
				m.transformPoint( {
						x: - t.rotPointX + this._hitboxOffset.x,
						y: - t.rotPointY + this._hitboxOffset.y
					} ),
				m.transformPoint( {
						x: - t.rotPointX + rect.width + this._hitboxOffset.x,
						y: - t.rotPointY +  this._hitboxOffset.y
					} ),
				m.transformPoint( {
						x: - t.rotPointX + rect.width + this._hitboxOffset.x,
						y: - t.rotPointY + rect.height + this._hitboxOffset.y
					} ),
				m.transformPoint( {
						x: - t.rotPointX + this._hitboxOffset.x,
						y: - t.rotPointY + rect.height + this._hitboxOffset.y
					} )
				);

			return out;
		}


		public draw(
			ctx: CanvasRenderingContext2D,
			camera: Kiwi.Camera = this.game.cameras.defaultCamera ) {

			/**
			Draw the various bounds on a context that is passed.
			Useful for debugging with the debug canvas.

			@method draw
			@param ctx {CanvasRenderingContext2D} Rendering context
				to draw the box to
			@param [camera] {Kiwi.Camera} Camera to use for drawing.
				This is the default camera by default.
			@public
			**/

			var t: Kiwi.Geom.Transform = this.entity.transform;
			var ct: Kiwi.Geom.Transform = camera.transform;

			// Draw raw bounds and raw center
			ctx.strokeStyle = "red";
			ctx.fillRect(
				this.rawCenter.x + ct.x - 1, this.rawCenter.y + ct.y - 1,
				3, 3 );
			ctx.strokeRect(
				t.x + ct.x + t.rotPointX - 3, t.y + ct.y + t.rotPointY - 3,
				7, 7 );

			// Draw bounds
			ctx.strokeStyle = "blue";
			ctx.strokeRect( this.bounds.x + ct.x, this.bounds.y + ct.y,
				this.bounds.width, this.bounds.height );

			// Draw hitbox
			ctx.strokeStyle = "green";
			ctx.strokeRect( this.hitbox.x + ct.x, this.hitbox.y + ct.y,
				this.hitbox.width, this.hitbox.height );

			// Draw raw hitbox
			ctx.strokeStyle = "white";
			ctx.strokeRect( this.rawHitbox.x + ct.x, this.rawHitbox.y + ct.y,
				this.rawHitbox.width, this.rawHitbox.height );

			// Draw world bounds
			ctx.strokeStyle = "purple";
			ctx.strokeRect( this.worldBounds.x, this.worldBounds.y,
				this.worldBounds.width, this.worldBounds.height );

			// Draw world hitbox
			ctx.strokeStyle = "cyan";
			ctx.strokeRect( this.worldHitbox.x, this.worldHitbox.y,
				this.worldHitbox.width, this.worldHitbox.height );
		}


		public extents(
			topLeftPoint: Kiwi.Geom.Point,
			topRightPoint: Kiwi.Geom.Point,
			bottomRightPoint: Kiwi.Geom.Point,
			bottomLeftPoint: Kiwi.Geom.Point ): Kiwi.Geom.Rectangle {

			/**
			Method which takes four Points and then converts it into
			a Rectangle, which represents the area those points covered.
			The points passed can be in any order,
			as they are checked for validity first.

			@method extents
			@param topLeftPoint {Kiwi.Geom.Point} Rectangle corner
			@param topRightPoint {Kiwi.Geom.Point} Rectangle corner
			@param bottomRightPoint {Kiwi.Geom.Point} Rectangle corner
			@param bottomLeftPoint {Kiwi.Geom.Point} Rectangle corner
			@return {Kiwi.Geom.Rectangle} Rectangle that represents
				the area the points covered.
			@return Rectangle
			**/

			var left: number = Math.min(
					topLeftPoint.x, topRightPoint.x,
					bottomRightPoint.x, bottomLeftPoint.x ),
				right: number = Math.max(
					topLeftPoint.x, topRightPoint.x,
					bottomRightPoint.x, bottomLeftPoint.x ),
				top: number = Math.min(
					topLeftPoint.y, topRightPoint.y,
					bottomRightPoint.y, bottomLeftPoint.y ),
				bottom: number = Math.max(
					topLeftPoint.y, topRightPoint.y,
					bottomRightPoint.y, bottomLeftPoint.y );

			return new Kiwi.Geom.Rectangle(
				left, top, right - left, bottom - top );
		}


		public destroy() {

			/**
			Destroy this component and all of the links it may have
			to other objects.

			@method destroy
			@public
			**/

			super.destroy();
			delete this.entity;
		}
	}
}
