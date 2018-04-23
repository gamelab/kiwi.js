/*
* An IRenderer is an Interface (defined as a class,
* as the documentation does not support Interfaces just yet),
* which outlines the methods/properties that are required any Renderer.
*
*/
interface IRenderManager {
	render( camera: Kiwi.Camera );
	boot();
	initState( state: Kiwi.State );
	endState( state: Kiwi.State );
	numDrawCalls: number;
	requestRendererInstance( rendererID: string,params?: any );
	requestSharedRenderer( rendererID: string, params?: any );
}

/**
* Contains the classes which are related to the rendering of GameObjects.
*
* @module Kiwi
* @submodule Renderers
* @main
*/
module Kiwi.Renderers {

	/**
	* Manager for rendering in Canvas mode.
	*
	* @class CanvasRenderer
	* @constructor
	* @namespace Kiwi.Renderers
	* @param game {Kiwi.Game} The game that this canvas renderer belongs to.
	* @return {Kiwi.Renderers.CanvasRenderer}
	*/
	export class CanvasRenderer implements IRenderManager {

		constructor( game: Kiwi.Game ) {
			this._game = game;
			this._camMatrix = new Kiwi.Geom.Matrix();
		}

		/**
		* Boot method is executed when all of the DOM elements
		* that are needed to play the game are ready
		*
		* @method boot
		* @public
		*/
		public boot() {

		}

		/**
		* Return the type of object that this is.
		*
		* @method objType
		* @return {String} "CanvasRenderer"
		* @public
		*/
		public objType() {
			return "CanvasRenderer";
		}

		/**
		* Game this object belongs to
		*
		* @property _game
		* @type Kiwi.Game
		* @private
		*/
		private _game: Kiwi.Game;

		/**
		* Camera that is currently being used to render upon
		*
		* @property _currentCamera
		* @type Kiwi.Camera
		* @private
		*/
		private _currentCamera: Kiwi.Camera;

		/**
		* Geometry data used in camera projection
		*
		* @property _camMatrix
		* @type Kiwi.Geom.Matrix
		* @private
		* @since 1.4.1
		*/
		private _camMatrix: Kiwi.Geom.Matrix;

		/**
		* Recursively go through a `State`'s members and
		* run the `render` method of each member that is a `Entity`.
		* If it is a `Group`, then this method recursively goes through
		* that `Group`'s members in the same way.
		*
		* @method _recurse
		* @param child {object} Child being checked
		* @private
		*/
		public _recurse( child: IChild ) {
			var i;

			// Do not render non-visible objects or their children
			if ( !child.visible ) return;

			if ( child.childType() === Kiwi.GROUP ) {
				for ( i = 0; i < ( <Kiwi.Group>child ).members.length; i++ ) {
					this._recurse( ( <Kiwi.Group>child ).members[ i ] );
				}
			} else {
				this.numDrawCalls++;
				child.render( this._currentCamera );

			}

		}

		// TODO for gl compatibility - refactor me
		public requestRendererInstance( rendererID: string, params: any = null ): Kiwi.Renderers.Renderer {
			return null;
		}

		public requestSharedRenderer( rendererID: string, params: any = null ): Kiwi.Renderers.Renderer {
			return null;
		}

		public initState( state:Kiwi.State ) {

		}

		public endState( state: Kiwi.State ) {

		}

		public numDrawCalls: number = 0;

		/**
		* Render all of the Elements that are on a particular camera.
		*
		* @method render
		* @param camera {Kiwi.Camera}
		* @public
		*/
		public render( camera: Kiwi.Camera ) {
			var ct:Kiwi.Geom.Transform, i,
				fillCol = this._game.stage.rgbaColor,
				root: IChild[] = this._game.states.current.members;

			// Clear stage
			// If there is an alpha, clear the canvas before fill
			if ( fillCol.a < 255 ) {
				this._game.stage.ctx.clearRect(
					0, 0,
					this._game.stage.canvas.width,
					this._game.stage.canvas.height );
			}
			this._game.stage.ctx.fillStyle =
				"rgba(" + fillCol.r + "," + fillCol.g + "," +
					fillCol.b + "," + fillCol.a / 255 + ")";
			this._game.stage.ctx.fillRect(
				0, 0,
				this._game.stage.canvas.width,
				this._game.stage.canvas.height );

			// Stop drawing if there is nothing to draw
			if ( root.length == 0 ) {
				return;
			}

			this.numDrawCalls = 0;
			this._currentCamera = camera;

			// Apply camera transform
			this._game.stage.ctx.save();
			ct = camera.transform;
			this._camMatrix.setFromOffsetTransform(
				0, 0, ct.scaleX, ct.scaleY, ct.rotation,
				ct.anchorPointX, ct.anchorPointY );
			this._game.stage.ctx.setTransform(
				this._camMatrix.a, this._camMatrix.b,
				this._camMatrix.c, this._camMatrix.d,
				this._camMatrix.tx, this._camMatrix.ty );
			this._game.stage.ctx.transform(
				1, 0, 0, 1, ct.x - ct.anchorPointX, ct.y - ct.anchorPointY );

			// Draw elements
			for ( i = 0; i < root.length; i++ ) {
				this._recurse( root[ i ] );
			}
			this._game.stage.ctx.restore();

		}

	}

}
