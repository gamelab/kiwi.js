/**
* 
* @module Kiwi
* 
*/

module Kiwi {

    /**
    * Used to handle the creation and management of Cameras on a Game. Each Game will always have created for it a CameraManager and a default Camera on the manager. More Cameras can always be created by used of the create method of a CameraManager. 
    * 
    * @class CameraManager
    * @namespace Kiwi
    * @constructor
    * @param {Game} game
    * @return {CameraManager} 
    */
    export class CameraManager {
         
        constructor(game: Kiwi.Game) {
             
            this._game = game;
            this._cameras = [];
            this._nextCameraID = 0;

        }

        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        * @public
        */
        public objType():string {
            return "CameraManager";
        }

        /**
		* The game this object belongs to
        * @property _game
        * @type Game
        * @private
    	*/
        private _game: Kiwi.Game;
         
        /**
		* A collection of cameras
        * @property _cameras
        * @type Camara[]
        * @private
    	*/
        private _cameras: Kiwi.Camera[];

        /**
		* The id which will be used when next creating a camera
        * @property _nextCameraID
        * @type Number
        * @private
    	*/
        private _nextCameraID: number;

        /**
		* The default camera that is on this manager.
        * @property defaultCamera
        * @type Camara
        * @public
    	*/
        public defaultCamera: Kiwi.Camera;

        /**
		* Initializes the CameraManager, creates a new camera and assigns it to the defaultCamera
        * @method boot
        * @public
    	*/
        public boot() {

            this.create("defaultCamera", 0, 0, this._game.stage.width, this._game.stage.height);
            this.defaultCamera = this._cameras[0];
        
        }

        /**
        * Creates a new Camera and adds it to the collection of cameras.
        * @param {String} name. The name of the new camera.
        * @param {Number} x. The x position of the new camera.
        * @param {Number} y. The y position of the new camera.
        * @param {Number} width. The width of the new camera.
        * @param {Number} height. The height of the new camera.
        * @return {Camera} The new camera object.
        * @public
        */
        public create(name: string, x: number, y: number, width: number, height: number): Kiwi.Camera {
            
            var newCamera: Kiwi.Camera = new Kiwi.Camera(this._game, this._nextCameraID++,name,x,y,width,height);
            
            //newCamera.parent = state;

            this._cameras.push(newCamera);

            return newCamera;

        }

        /**
		* Removes the given camera, if it is present in the camera managers camera collection.
        * @method remove
        * @param camera {Camera}
        * @return {boolean} True if the camera was removed, false otherwise.
        * @public
    	*/
        public remove(camera: Kiwi.Camera):boolean {
             
            var i = this._cameras.indexOf(camera); //what if it was the default one! :(

            if (i !== -1) {
                //  Send Layer a killed call
                this._cameras.splice(i, 1);
                return true;
            }

            return false;
        }

        /**
		* Calls update on all the cameras.
        * @method update
        * @public
    	*/
        public update() {

            if (this._cameras.length === 0) {
                return false;
            }

            for (var i = 0; i < this._cameras.length; i++) {
                this._cameras[i].update();
            }
        
        }

        /**
		* Calls the render method on all the cameras
        * @method render
        * @public
    	*/
        public render() {

            if (this._cameras.length === 0) {
                return false;
            }


            //render each camera
            for (var i = 0; i < this._cameras.length; i++) {
                //render each layer
                //this._game.layers.render(this._cameras[i]);

                this._cameras[i].render();
            }

        }

        /**
		* Removes all cameras in the camera Manager except the default camera. Does nothing if in multi camera mode.
        * @method removeAll - note should not remove default
        * @public
    	*/
        public removeAll() {
            this._cameras.length = 0; //are you sure.
        }

    }
}
