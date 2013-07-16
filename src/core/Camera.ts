/// <reference path="../Kiwi.ts" />

/*
 *	Kiwi - Core - Camera
 *
 *	@desc		
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

    export class Camera {

        /**
		* 
        * @constructor
        * @param {Kiwi.Game} game 
        * @param {Number} id 
        * @param {String} name
        * @return {Kiwi.Layer}
		**/
        constructor(game: Kiwi.Game, id: number, name: string,x:number,y:number,width:number,height:number) {

            this._game = game;
            this.id = id;
            this.name = name;
            this.components = new Kiwi.ComponentManager(Kiwi.CAMERA, this);
            
            //size could autoresize to fit stage
            this.size = new Kiwi.Components.Size(width, height);
            this.position = new Kiwi.Components.Position(x, y);

            this.components.add(this.size);
            this.components.add(this.position);

            if (Kiwi.DEVICE.canvas) {  
                this._createCompositeCanvas();

            } else {
                klog.warn("Canvas is not supported - no canvas was created on camera " + name);
            }


           

            
            this._game.stage.size.updated.add(this._updatedStageSize, this);

            this.size.updated.add(this._updatedSize,this);

            klog.info('Created Camera ' + this.id);
            
        }

        public objType() {
            return "Camera";
        }

        private _createCompositeCanvas() {
            this._compositeCanvas = <HTMLCanvasElement>document.createElement("canvas");
            this._ctx = this._compositeCanvas.getContext("2d");

            this._compositeCanvas.id = this._game.id + "compositeCanvas";
           // this._compositeCanvas.style.width = "100%";
            //this._compositeCanvas.style.height = "100%";
            this._compositeCanvas.style.position = "absolute";

            this._resizeCompositeCanvas();
          
            this._game.stage.canvasLayers.appendChild(this._compositeCanvas);
            this._compositeCanvasCreated = true;

        }

        private _resizeCompositeCanvas() {
            this._compositeCanvas.width = this.size.width();
            this._compositeCanvas.height = this.size.height();
        }

        private _compositeCanvas: HTMLCanvasElement;
        private _ctx: CanvasRenderingContext2D;

        private _compositeCanvasCreated: bool = false;

        // if true then the camera will be resized to fit the stage when the stage is resized
        public fitToStage:bool = true;

        /** 
	     * The Position component that controls the location of this Game Object within the game world
	     * @property position
	     * @type Kiwi.Components.Position
	     **/
        public position: Kiwi.Components.Position;

        public size: Kiwi.Components.Size;

        /**
		* 
        * @method _updatedStageSize
        * @param {Number} width
        * @param {Number} height
		**/
        private _updatedStageSize(width: number, height: number) {

           
            this.size.setTo(width, height);
            this._resizeCompositeCanvas();

        }

          /**
		* 
        * @method _updatedStageSize
        * @param {Number} width
        * @param {Number} height
		**/
        private _updatedSize(width: number, height: number) {
            this._game.stage.domLayersMask.style.width = width + "px";
            this._game.stage.domLayersMask.style.height = height + "px";
            this._resizeCompositeCanvas();
            for (var i = 0; i < this._game.layers.layers.length; i++) {
                var layer: Kiwi.Layer = this._game.layers.layers[i];
                layer.domContainer.style.width = width + "px";
                layer.domContainer.style.height = height + "px";
               

            }
           
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
        public _game: Kiwi.Game;

        
        /**
        * A unique identifier for this Layer within the game used internally by the framework. See the name property for a friendly version.
        * @property id
        * @type number
    	*/
        public id: number;

        /**
        * A name for this Camera. This is not checked for uniqueness within the Game, but is very useful for debugging.
        * @property name
        * @type string
    	*/
        public name: string;

       
        
        /**
		* Controls whether this Camera is rendered
        * @property _visible
        * @type Boolean
		*/
        private _visible: bool;

        /**
		* Toggles the visible state of this Camera
        * @method visible
        * @param {Boolean} value
        * @return {Boolean}
		**/
        public visible(value: bool = null): bool {

            
            return this._visible;

        }

        /**
		* 
        * @property _dirty
        * @type Boolean
        * @private
		**/
        private _dirty: bool;

        /**
		* A value used by components to control if the camera needs re-rendering
        * @method dirty
        * @param {Boolean} value
        * @return {Boolean}
    	*/
        public dirty(value: bool = null): bool {

            if (value !== null) {
                this._dirty = value;
            }

            return this._dirty;

        }

        public update() {
            
            this.components.update();
            
        }

        public render() {
            //console.log("render cam " + this.name);
            
            if (this._compositeCanvasCreated) {
                //clear this
                this._compositeCanvas.width = this.size.width();
                var layer: Kiwi.Layer;
                for (var i = 0; i < this._game.layers.layers.length; i++) {
                    
                    layer = this._game.layers.layers[i];
                    
                    if (layer.type === Kiwi.TYPE_CANVAS) {
                       
                        this._ctx.drawImage(layer.canvas.domElement, 0, 0, this.size.width(), this.size.height(), 0, 0, this.size.width(), this.size.height());
                        
                    }
                }
                    

            }

            



            //composite each layer canvas onto this one.
        }

    }

}