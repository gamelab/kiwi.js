/// <reference path="Game.ts" />


/**
 *	Kiwi - Core - CameraManager
 *
 *	@desc 		
 *
 *	@version 	1.0 - 11th January 2013
 *
 *	@author 	Ross Kettle
 *
 *	@url 		http://www.kiwijs.org
 */

module Kiwi {

    export class CameraManager {

        /**
		* 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Kiwi.CameraManager}
    	*/
        constructor(game: Kiwi.Game) {

            klog.info('Layer Manager created');

            this._game = game;

            
            this._cameras = [];

            this._nextCameraID = 0;

            


        }

        /**
        * Returns the type of this object
        * @return {String} The type of this object
        */
        public objType():string {
            return "CameraManager";
        }

        /**
		* The game this object belongs to
        * @property _game
        * @type Kiwi.Game
        * @private
    	*/
        private _game: Kiwi.Game;

        
        
        /**
		* A collection of cameras
        * @property _cameras
        * @type Array
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
		* The default camera of this camera manager.
        * @property defaultCamera
        * @type Kiwi.Layer
    	*/
        public defaultCamera: Kiwi.Camera;

        
        

        /**
		* Initializes the CameraManager, creates a new camera and assigns it to the defaultCamera
        * @method boot
        * @param {HTMLDivElement} domCamera
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
        * @return {Kiwi.Camera} The new camera object.
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
        * @param {Kiwi.Camera} camera
        * @return {Boolean} True if the camera was removed, false otherwise.
    	*/
        public remove(camera: Kiwi.Camera):bool {

            klog.info('Remove camera');

            var i = this._cameras.indexOf(camera);

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
    	*/
        public removeAll() {

            this._cameras.length = 0;
            klog.info('TODO removeAll');

        }

    }
}
