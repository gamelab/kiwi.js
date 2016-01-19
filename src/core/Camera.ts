/**
* 
* @module Kiwi
* 
*/

module Kiwi {

	/**
	* A `Camera` is used to render a particular section of the game world
	* on the stage. Each `Camera` has coordinates which are held in the
	* `transform` property, and `width`/`height` properties.
	*
	* Note: This class may be directly instantiated, but if you want
	* your camera registered in a `CameraManager`, you should use
	* `CameraManager.create()` instead.
	*
	* A default camera is created as `game.cameras.defaultCamera`.
	*
	* @class Camera
	* @namespace Kiwi
	* @constructor
	* @param game {Kiwi.Game} Game that this camera belongs to.
	* @param id {number} Unique ID for this camera 
	* @param name {string} Name for this camera
	* @param x {number} Horizontal coordinate of the camera
	* @param y {number} Vertical coordinate of the camera
	* @param width {number} Width of the camera
	* @param height {number} Height of the camera
	* @return {Kiwi.Camera}
	* 
	*/
	export class Camera {

		constructor( game: Kiwi.Game, id: number, name: string, x:number, y:number, width:number, height:number ) {

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
		* Width of this camera
		*
		* @property width
		* @type number
		* @public
		*/
		public width: number;

		/**
		* Height of this camera
		*
		* @property height
		* @type number
		* @public
		*/
		public height: number;

		/**
		* Return the type of object that this is.
		*
		* @method objType
		* @return {string} "Camera"
		* @public
		*/
		public objType() {
			return "Camera";
		}

		/**
		* Whether to resize the camera to fit the stage
		* when the stage is resized.
		*
		* @property fitToStage
		* @type boolean
		* @default true
		* @public
		*/
		public fitToStage: boolean;

		/**
		* Controls location, scale, and rotation of camera
		* within the game world.
		*
		* @property transform
		* @type Kiwi.Geom.Transform
		* @public
		*/
		public transform: Kiwi.Geom.Transform;

		/**
		* Update the width/height of this camera when the stage resizes.
		*
		* @method _updatedStageSize
		* @param width {number} New width of the camera.
		* @param height {number} New height of the camera.
		* @private
		*/
		private _updatedStageSize( width: number, height: number ) {
			if ( this.fitToStage ) {
				this.width = width;
				this.height = height;
			}
		}

		/**
		* Game this camera belongs to
		*
		* @property _game
		* @type Kiwi.Game
		* @private
		*/
		private _game: Kiwi.Game;

		/**
		* A unique identifier for this Layer within the game
		* used internally by the framework.
		* See the name property for a friendly version.
		*
		* @property id
		* @type number
		* @public
		*/
		public id: number;

		/**
		* A name for this Camera. This is not checked for uniqueness
		* within the Game, but is very useful for debugging.
		*
		* @property name
		* @type string
		* @public
		*/
		public name: string;

		/**
		* Controls whether this Camera is rendered
		*
		* @property _visible
		* @type boolean
		* @private
		*/
		private _visible: boolean;

		/**
		* Controls whether this Camera is rendered
		*
		* @property visible
		* @type boolean
		* @public
		*/
		public get visible(): boolean {
			return this._visible;
		}
		public set visible( val: boolean ) {
			this._visible = val;
		}

		/**
		* A flag that indicates whether this camera needs to be rendered again
		* at the next update loop, or if nothing has changed so it doesn't.
		*
		* @property _dirty
		* @type boolean
		* @private
		* @deprecated As of 1.1.0, no use has been found for this property.
		*/
		private _dirty: boolean;

		/**
		* A value used by components
		* to control if the camera needs re-rendering.
		*
		* @property dirty
		* @type boolean
		* @public
		* @deprecated As of 1.1.0, no use has been found for this property.
		*/
		public get dirty(): boolean {
			return this._dirty;
		}
		public set dirty( val: boolean ) {
			this._dirty = val;
		}

		/**
		* Scratch matrix used in geometry calculations
		*
		* @property _scratchMatrix
		* @type Kiwi.Geom.Matrix
		* @private
		* @since 1.3.1
		*/
		private _scratchMatrix: Kiwi.Geom.Matrix;

		/**
		* Convert from screen coordinates to world coordinates.
		* Apply this camera's inverted matrix to an object with x and y
		* properties representing a point and return the transformed point.
		* Useful for calculating coordinates with the mouse.
		*
		* @method transformPoint
		* @param point {Kiwi.Geom.Point} 
		* @return {Kiwi.Geom.Point} Transformed clone of the original Point.
		* @public
		*/
		public transformPoint( point: Kiwi.Geom.Point ): Kiwi.Geom.Point {
			var m,
				np = point.clone();

			this._scratchMatrix.copyFrom(
				this.transform.getConcatenatedMatrix() );

			m = this._scratchMatrix;
			m.append(
				1, 0, 0, 1,
				-this.transform.rotPointX, -this.transform.rotPointY );
			m.invert();

			return m.transformPoint( np );
		}

		/**
		* Convert from world coordinates to screen coordinates.
		* Useful for assessing visibility.
		* Similar to "transformPoint", but in reverse.
		*
		* @method transformPointToScreen
		* @param point {Kiwi.Geom.Point}
		* @return {Kiwi.Geom.Point} Transformed clone of the original Point.
		* @public
		* @since 1.2.0
		*/
		public transformPointToScreen( point: Kiwi.Geom.Point ): Kiwi.Geom.Point {
			var m,
				np = point.clone();

			this._scratchMatrix.copyFrom(
				this.transform.getConcatenatedMatrix() );

			m = this._scratchMatrix;
			m.append(
				1, 0, 0, 1,
				-this.transform.rotPointX, -this.transform.rotPointY );

			return m.transformPoint( np );
		}

		/**
		* The update loop that is executed every frame.
		* @method update
		* @public
		*/
		public update() {

		}

		/**
		* The render loop that is executed whilst the game is playing.
		* @method render
		* @public
		*/
		public render() {

			this._game.renderer.render( this );

		}

	}

}
