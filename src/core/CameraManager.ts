/**
*
* @module Kiwi
*
*/

module Kiwi {

	/**
	* Used to handle the creation and management of Cameras on a `Game`.
	* Each `Game` will create a `CameraManager` and a default `Camera`.
	* Games currently only support the use of a single camera,
	* the default camera `defaultCamera`.
	* Much of this class has been written with future
	* multiple camera support in mind.
	*
	* @class CameraManager
	* @namespace Kiwi
	* @constructor
	* @param game {Kiwi.Game} Current game
	* @return {Kiwi.CameraManager}
	*/
	export class CameraManager {

		constructor( game: Kiwi.Game ) {

			this._game = game;
			this._cameras = [];
			this._nextCameraID = 0;

		}

		/**
		* Return the type of this object.
		*
		* @method objType
		* @return {string} "CameraManager"
		* @public
		*/
		public objType():string {
			return "CameraManager";
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
		* Collection of cameras
		*
		* @property _cameras
		* @type Array
		* @private
		*/
		private _cameras: Kiwi.Camera[];

		/**
		* ID which will be used when next creating a camera
		*
		* @property _nextCameraID
		* @type number
		* @private
		*/
		private _nextCameraID: number;

		/**
		* Default camera on this manager
		*
		* @property defaultCamera
		* @type Kiwi.Camara
		* @public
		*/
		public defaultCamera: Kiwi.Camera;

		/**
		* Initialize the `CameraManager`, creates a new `Camera`,
		* and assigns it to `defaultCamera`.
		*
		* @method boot
		* @public
		*/
		public boot() {
			this.create(
				"defaultCamera",
				0, 0,
				this._game.stage.width, this._game.stage.height );
			this.defaultCamera = this._cameras[ 0 ];
		}

		/**
		* Create a new Camera and add it to the collection of cameras.
		*
		* @method create
		* @param {string} name. The name of the new camera.
		* @param {number} x. The x position of the new camera.
		* @param {number} y. The y position of the new camera.
		* @param {number} width. The width of the new camera.
		* @param {number} height. The height of the new camera.
		* @return {Kiwi.Camera} The new camera object.
		* @public
		*/
		public create( name: string, x: number, y: number, width: number, height: number ): Kiwi.Camera {
			var newCamera: Kiwi.Camera = new Kiwi.Camera(
				this._game, this._nextCameraID++, name, x, y, width, height );

			this._cameras.push( newCamera );

			return newCamera;

		}

		/**
		* Remove the given camera, if it is present in the camera collection.
		*
		* @method remove
		* @param camera {Kiwi.Camera}
		* @return {boolean} True if the camera was removed, false otherwise
		* @public
		*/
		public remove( camera: Kiwi.Camera ):boolean {
			var i = this._cameras.indexOf( camera ); //what if it was the default one! :(

			if ( i !== -1 ) {

				//  Send Layer a killed call
				this._cameras.splice( i, 1 );
				return true;
			}

			return false;
		}

		/**
		* Call update on all the cameras.
		*
		* @method update
		* @public
		*/
		public update() {

			if ( this._cameras.length === 0 ) {
				return false;
			}

			for ( var i = 0; i < this._cameras.length; i++ ) {
				this._cameras[ i ].update();
			}

		}

		/**
		* Call the render method on all the cameras.
		*
		* @method render
		* @public
		*/
		public render() {

			if ( this._cameras.length === 0 ) {
				return false;
			}

			//render each camera
			for ( var i = 0; i < this._cameras.length; i++ ) {
				this._cameras[ i ].render();
			}

		}

		/**
		* Remove all cameras in the camera Manager except the default camera.
		*
		* @method removeAll
		* @public
		*/
		public removeAll() {
			this._cameras = [];
		}

		/**
		* Return all cameras to origin. Called when starting a new state.
		*
		* @method zeroAllCameras
		* @public
		* @since 1.1.0
		*/
		public zeroAllCameras() {
			for( var i = 0;  i < this._cameras.length;  i++ )
			{
				this.zeroCamera( this._cameras[ i ] );
			}
			this.zeroCamera( this.defaultCamera );
		}

		/**
		* Return camera to origin.
		*
		* @method zeroCamera
		* @param camera {Kiwi.Camera}
		* @public
		* @since 1.1.0
		*/
		public zeroCamera( camera:Kiwi.Camera )
		{
			camera.transform.x = 0;
			camera.transform.y = 0;
			camera.transform.rotation = 0;
			camera.transform.scaleX = 1;
			camera.transform.scaleY = 1;
			camera.transform.rotPointX = camera.width / 2;
			camera.transform.rotPointY = camera.height / 2;
		}

	}
}
