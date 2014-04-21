/**
* The GameObject namespace holds classes which are designed to be added to a State (either directly, or as an ancestor of a Group) and are the Objects that are used when wanting to render anything visual onto the current State. Each GameObject is a representation of a particular item in a game and as such has information that corresponds to that item (like where they are in the 'GameWorld', the scale of the GameObject, who their parent is, e.t.c). For Example: If you wanted to have a massive background image then you can use the StaticImage GameObject, as that is a relatively light-weight object). Or if you had Player with an Animation, which user's could interactive with, then you would use a Sprite, which is more robust.
* 
* @module Kiwi
* @submodule GameObjects 
* @main GameObjects
*/ 
module Kiwi.GameObjects {

    /**
    * A Sprite is a general purpose GameObject that contains majority of the functionality that is needed/would be wanted and as such should be used only when you are wanting a GameObject with a lot of interaction. When creating a Sprite you pass to it as TextureAtlas (for the image you want to render), now if that Texture Atlas isn't a SINGLE_IMAGE then the Sprite will have an AnimationManager Component to handle any SpriteSheet animations you need.
    *
    * @class Sprite
    * @namespace Kiwi.GameObjects
    * @extends Entity
    * @constructor
    * @param state {State} The state that this sprite belongs to
    * @param atlas {TextureAtlas} The texture you want to apply to this entity 
    * @param [x=0] {Number} The sprites initial coordinates on the x axis.
    * @param [y=0] {Number} The sprites initial coordinates on the y axis.
    * @param [enableInput=false] {boolean} If the input component should be enabled or not.
    * @return {Sprite}
    */
    export class Sprite extends Kiwi.Entity {
         
        constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0, enableInput: boolean = false) {

            super(state, x, y);

            //Texture atlas error check
            if (typeof atlas == "undefined") {
                console.error('A Texture Atlas was not passed when instantiating a new Sprite.');
                this.willRender = false;
                this.active = false;
                return;
            } 

            if (this.game.renderOption === Kiwi.RENDERER_WEBGL) {
                this.glRenderer = this.game.renderer.requestSharedRenderer("TextureAtlasRenderer");
            }

            this.atlas = atlas;
            this.name = this.atlas.name;
            this.cellIndex = this.atlas.cellIndex;

            //may need to add an optional other cell frame index here
            this.width = atlas.cells[this.cellIndex].w;
            this.height = atlas.cells[this.cellIndex].h;
            this.transform.rotPointX = this.width / 2;
            this.transform.rotPointY = this.height / 2;
                

            //Create the components needed
            this.box = this.components.add(new Kiwi.Components.Box(this, x, y, this.width, this.height));
            this.input = this.components.add(new Kiwi.Components.Input(this, this.box, enableInput));

                
            //Check to see if this sprite could be animated or not
            if (this.atlas.type === Kiwi.Textures.TextureAtlas.SINGLE_IMAGE) {
                this.animation = null;
                this._isAnimated = false;
            } else {
                this.animation = this.components.add(new Kiwi.Components.AnimationManager(this));
                this._isAnimated = true;
            }
            
        }

        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType():string {
            return "Sprite";
        }
        
        /**
        * Indicates whether or not this sprite is animated or not. 
        * This sprite will not be animated if the texture used is a SINGLE_IMAGE.
        * @property _isAnimated
        * @type boolean
        * @private
        */
        private _isAnimated: boolean;

        /** 
	    * The animation component that allows you to create a animation with spritesheets/texture atlas's. 
        * Note: If the atlas that was added is of type Kiwi.Textures.TextureAtlas.SINGLE_IMAGE then no animation component will be created.
	    * @property animation
	    * @type AnimationManager
        * @public
	    */
        public animation: Kiwi.Components.AnimationManager;
        
        /** 
        * The box component that controls the bounding box around this Game Object
        * @property bounds
        * @type Bounds
        * @public
        */
        public box: Kiwi.Components.Box;

        /** 
	    * The Input component controls the user interaction with this Game Object
	    * @property input
	    * @type Input
        * @public
	    */
        public input: Kiwi.Components.Input;
        
        /**
	    * Called by parent when its update loop gets executed.
	    * @method update
        * @public
	    */
        public update() {
            
            super.update();

            if (this._isAnimated) {
                this.animation.update();
                this.width = this.atlas.cells[this.cellIndex].w;
                this.height = this.atlas.cells[this.cellIndex].h;

            }    

            this.input.update();
        }

        /**
	    * Called by the Layer to which this Game Object is attached
	    * @method render
        * @param {Camera} camera
        * @public
	    */
        public render(camera:Kiwi.Camera) {
           
            super.render(camera);
            
            //if it is would even be visible.
            if (this.alpha > 0 && this.visible) {
                
                var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
                ctx.save();

                if (this.alpha > 0 && this.alpha <= 1) {
                    ctx.globalAlpha = this.alpha;
                }

                //get entity/view matrix
                var t: Kiwi.Geom.Transform = this.transform;
                var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
                
                var ct: Kiwi.Geom.Transform = camera.transform;

                //ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);
                ctx.transform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX - ct.rotPointX, m.ty + t.rotPointY - ct.rotPointY);

                             
                var cell = this.atlas.cells[this.cellIndex];
                ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h, -t.rotPointX, -t.rotPointY, cell.w, cell.h);
                ctx.restore();
                    
            }

        
        }

        public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params: any = null) {
            (<Kiwi.Renderers.TextureAtlasRenderer>this.glRenderer).addToBatch(gl, this, camera);
        }

    }

}