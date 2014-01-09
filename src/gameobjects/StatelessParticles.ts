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

        constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0) {

            super(state, x, y);
            this.requiredRenderers[0] = "StatelessParticleRenderer";
            this.glRenderer = this.game.renderer.getRenderer(this.requiredRenderers[0]);
            
            //Texture atlas error check.
            if (typeof atlas == "undefined") {
                console.error('A Texture Atlas was not passed when instantiating a new Static Image.');
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

        }

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
        public gravity: number = 0.2;

        public init() {
            this._posVel = new Array<number>();
            this._startTimeLifeSpan = new Array<number>();
            for (var i = 0; i < this.numParticles; i++) {
                this._posVel.push(200, 200, Math.random() * 100 - 50, Math.random() * 100 - 50);
                this._startTimeLifeSpan.push(Math.random(), Math.random() * 5);
            }
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
            (<Kiwi.Renderers.StatelessParticleRenderer>this.glRenderer).addToBatch(gl, this, camera);
        }


    }

}