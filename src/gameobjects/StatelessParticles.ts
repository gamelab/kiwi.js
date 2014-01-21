/**
* 
* @module Kiwi
* @submodule GameObjects 
* 
*/

module Kiwi.GameObjects {

    /**
    * A light weight game object for displaying static images that would have little or no interaction with other GameObjects. An Example of this would be a background image. Note: Since a StaticImage is lightweight it doesn't have any AnimationManager to handle the switching of cells (If you were using a SpriteSheet/TextureAtlas). In order to switch cells you can change the value of the cellIndex property.
    *
    * @class StaticImage
    * @namespace Kiwi.GameObjects
    * @extends Entity
    * @constructor
    * @param state {State} The state that this static image belongs to 
    * @param atlas {TextureAtlas} The texture atlas to use as the image.
    * @param [x=0] {Number} Its coordinates on the x axis
    * @param [y=0] {Number} The coordinates on the y axis
    * @return {StaticImage}
    */
    export class StatelessParticles extends Kiwi.Entity {

        constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0,config:any = null) {

            super(state, x, y);
            if (this.game.renderOption === Kiwi.RENDERER_WEBGL) {
                //Create own renderer
                this.glRenderer = <Kiwi.Renderers.StatelessParticleRenderer>this.game.renderer.requestRendererInstance("StatelessParticleRenderer", { config: config });
            }
            //Texture atlas error check.
            if (typeof atlas == "undefined") {
                console.error('A Texture Atlas was not passed when instantiating a new StatelessParticles.');
                this.willRender = false;
                this.active = false;
                return;
            }

            
            
            //Set coordinates and texture
            this.atlas = atlas;
            this.cellIndex = this.atlas.cellIndex;
            this.width = atlas.cells[0].w;
            this.height = atlas.cells[0].h;
            this.transform.rotPointX = this.width / 2;
            this.transform.rotPointY = this.height / 2;

            this.box = this.components.add(new Kiwi.Components.Box(this, x, y, this.width, this.height));
            
            this.config = config;
            this._generateParticles();

            //this.init();
        }

        public config: any;

        public glRenderer: Kiwi.Renderers.StatelessParticleRenderer;

        
        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string {
            return "StatelessParticles";
        }

        /** 
        * The Bounds component that controls the bounding box around this Game Object
        * @property bounds
        * @type Bounds
        * @public
        */
        public box: Kiwi.Components.Box;

        private _posVel: Array<number>;
        private _startTimeLifeSpan: Array<number>;
        public numParticles: number = 100;
        public gravity: number = 0.1;

        
        private _generateParticles() {

        var cfg = this.config;
      
        var posVelItems: Array<number> = new Array<number>();
        var ageItems: Array<number> = new Array<number>();


        var velShapeGenFunc: any = null; //null = "constant"
        var posShapeGenFunc: any = null;

        switch (cfg.velGenShape) {
            case "Radial": velShapeGenFunc = (cfg.velConstrain) ? Kiwi.Geom.Random.randomPointCirclePerimeter : Kiwi.Geom.Random.randomPointCircle; break;
            case "Rect": velShapeGenFunc = (cfg.velConstrain) ? Kiwi.Geom.Random.randomPointSquarePerimeter : Kiwi.Geom.Random.randomPointSquare; break;

        }

        switch (cfg.posGenShape) {
            case "Radial": posShapeGenFunc = (cfg.posConstrain) ? Kiwi.Geom.Random.randomPointCirclePerimeter : Kiwi.Geom.Random.randomPointCircle; break;
            case "Rect": posShapeGenFunc = (cfg.posConstrain) ? Kiwi.Geom.Random.randomPointSquarePerimeter : Kiwi.Geom.Random.randomPointSquare; break;
        }

        for (var i = 0; i < cfg.numParts; i++) {
            //calculate pos
            var pos = { x: 0, y: 0 };
            var posSeed = { x: 0, y: 0 };
            if (posShapeGenFunc != null) {

                posSeed = posShapeGenFunc();
                if (cfg.posGenShape === "Radial") {
                    pos.x = posSeed.x * cfg.posRadius;
                    pos.y = posSeed.y * cfg.posRadius;

                } else if (cfg.posGenShape === "Rect") {
                    pos.x = posSeed.x * cfg.posWidth / 2;
                    pos.y = posSeed.y * cfg.posHeight / 2;
                }
            }

            pos.x += this.x;
            pos.y += this.y;
            var vel = { x: 0, y: 0 };

            if (cfg.inherit) {
                console.log("inheriting")
                    vel.x = cfg.minVelX + posSeed.x * cfg.maxVelX - cfg.minVelX;
                vel.y = cfg.minVelY + posSeed.y * cfg.maxVelY - cfg.minVelY;
            } else {

                if (velShapeGenFunc === null) {
                    vel.x = cfg.maxVelX;
                    vel.y = cfg.maxVelY;
                } else {
                    vel = velShapeGenFunc();
                    vel.x = cfg.minVelX + vel.x * cfg.maxVelX - cfg.minVelX;
                    vel.y = cfg.minVelY + vel.y * cfg.maxVelY - cfg.minVelY;
                }
            }



            posVelItems.push(pos.x + cfg.offsetX, pos.y + cfg.offsetY, vel.x, vel.y);


            var startTime = cfg.minStartTime + Math.random() * (cfg.maxStartTime - cfg.minStartTime);
            var lifespan = cfg.minLifespan + Math.random() * (cfg.maxLifespan - cfg.minLifespan);

            ageItems.push(startTime, lifespan);

        }


            this.glRenderer.initBatch(posVelItems, ageItems);
        }

        public start() {

        }



        /**
        * Called by the Layer to which this Game Object is attached
        * @method render
        * @param {Camara} camera
        * @public
        */
        public render(camera: Kiwi.Camera) {

            super.render(camera);

            
        }

        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params: any = null) {
            //(<Kiwi.Renderers.StatelessParticleRenderer>this.glRenderer).addToBatch(gl, this, camera);
        }


    }

}