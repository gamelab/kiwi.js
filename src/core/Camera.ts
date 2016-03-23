/**
@module Kiwi
**/

module Kiwi {
	export class Camera {

		/**
		A `Camera` is used to render a particular section of the game world
		on the stage. Each `Camera` has coordinates which are held in the
		`transform` property, and `width`/`height` properties.

		Note: This class may be directly instantiated, but if you want
		your camera registered in a `CameraManager`, you should use
		`CameraManager.create()` instead.

		A default camera is created as `game.cameras.defaultCamera`.

		@class Camera
		@namespace Kiwi
		@constructor
		@param game {Kiwi.Game} Game that this camera belongs to
		@param id {number} Unique ID for this camera
		@param name {string} Name for this camera
		@param x {number} Horizontal coordinate of the camera
		@param y {number} Vertical coordinate of the camera
		@param width {number} Width of the camera
		@param height {number} Height of the camera
		@return {Kiwi.Camera}
		**/

		constructor(
			game: Kiwi.Game,
			id: number,
			name: string,
			x:number,
			y:number,
			width:number,
			height:number ) {

			this._game = game;
			this.id = id;
			this.name = name;

			this.width = width;
			this.height = height;
			this.transform = new Kiwi.Geom.Transform( x, y );
			this.transform.rotPointX = x + width / 2;
			this.transform.rotPointY = y + height / 2;

			this._game.stage.onResize.add( this._updatedStageSize, this );

			this._scratchMatrix = new Kiwi.Geom.Matrix();

			this.fitToStage = true;
		}

		/**
		Width of this camera

		@property width
		@type number
		@public
		**/
		public width: number;

		/**
		Height of this camera

		@property height
		@type number
		@public
		**/
		public height: number;

		/**
		Return the type of object that this is.

		@method objType
		@return {string} "Camera"
		@public
		**/
		public objType() {
			return "Camera";
		}

		/**
		Whether to resize the camera to fit the stage
		when the stage is resized.

		@property fitToStage
		@type boolean
		@default true
		@public
		**/
		public fitToStage: boolean;

		/**
		Controls location, scale, and rotation of camera within the game world

		@property transform
		@type Kiwi.Geom.Transform
		@public
		**/
		public transform: Kiwi.Geom.Transform;

		private _updatedStageSize( width: number, height: number ) {

			/**
			Update the width/height of this camera when the stage resizes.

			@method _updatedStageSize
			@param width {number} New width of the camera
			@param height {number} New height of the camera
			@private
			**/

			if ( this.fitToStage ) {
				this.width = width;
				this.height = height;
			}
		}

		/**
		Game this camera belongs to

		@property _game
		@type Kiwi.Game
		@private
		**/
		private _game: Kiwi.Game;

		/**
		Unique identifier for this camera within the game
		used internally by the framework.
		See the `name` property for a friendly version.

		@property id
		@type number
		@public
		**/
		public id: number;

		/**
		A name for this camera. This is not checked for uniqueness
		within the game, but is very useful for debugging.

		@property name
		@type string
		@public
		**/
		public name: string;

		/**
		Controls whether this Camera is rendered

		@property _visible
		@type boolean
		@private
		**/
		private _visible: boolean;

		/**
		Controls whether this Camera is rendered

		@property visible
		@type boolean
		@public
		**/
		public get visible(): boolean {
			return this._visible;
		}
		public set visible( val: boolean ) {
			this._visible = val;
		}

		/**
		A flag that indicates whether this camera needs to be rendered again
		at the next update loop, or if nothing has changed so it doesn't.

		@property _dirty
		@type boolean
		@private
		@deprecated As of 1.1.0, no use has been found for this property.
		**/
		private _dirty: boolean;

		/**
		A value used by components
		to control if the camera needs re-rendering.

		@property dirty
		@type boolean
		@public
		@deprecated As of 1.1.0, no use has been found for this property.
		**/
		public get dirty(): boolean {
			return this._dirty;
		}
		public set dirty( val: boolean ) {
			this._dirty = val;
		}

		/**
		Scratch matrix used in geometry calculations

		@property _scratchMatrix
		@type Kiwi.Geom.Matrix
		@private
		@since 1.3.1
		**/
		private _scratchMatrix: Kiwi.Geom.Matrix;

		private _getCameraTransformMatrix(): Kiwi.Geom.Matrix {

			/**
			Return the camera transformation matrix.

			This is not a standard transform matrix. To make cameras work
			as expected, they must be offset by a specific distance.

			@method _getCameraTransformMatrix
			@return Kiwi.Geom.Matrix
			@private
			@since 1.4.1
			**/

			this._scratchMatrix.setFromTransform(
				this.transform.anchorPointX, this.transform.anchorPointY,
				this.transform.scaleX, this.transform.scaleY,
				this.transform.rotation );
			this._scratchMatrix.append(
				1, 0,
				0, 1,
				this.transform.x - this.transform.anchorPointX,
				this.transform.y - this.transform.anchorPointY );

			return this._scratchMatrix;
		}

		public transformPoint( point: Kiwi.Geom.Point ): Kiwi.Geom.Point {

			/**
			Convert from screen coordinates to world coordinates.

			Invert the camera transformation and apply it to a point.
			Useful for calculating coordinates with the mouse.

			Note that, because cameras do not create a transformation
			in the same way that game objects do,
			this is not just a matrix inversion.

			@method transformPoint
			@param point {Kiwi.Geom.Point}
			@return {Kiwi.Geom.Point} Transformed clone of the original Point
			@public
			**/

			return this._getCameraTransformMatrix().
				invert().
				transformPoint( point.clone() );
		}

		public transformPointToScreen( point: Kiwi.Geom.Point ): Kiwi.Geom.Point {

			/**
			Convert from world coordinates to screen coordinates.
			Useful for assessing visibility.

			Similar to `transformPoint`, but in reverse.

			@method transformPointToScreen
			@param point {Kiwi.Geom.Point}
			@return {Kiwi.Geom.Point} Transformed clone of the original Point.
			@public
			@since 1.2.0
			**/

			return this._getCameraTransformMatrix().
				transformPoint( point.clone() );
		}


		public update() {

			/**
			Update every frame. You may override this method; it is empty.

			@method update
			@public
			**/

		}
		public render() {

			/**
			Render this camera view. Part of the main game loop.

			@method render
			@public
			**/

			this._game.renderer.render( this );

		}

	}

}
