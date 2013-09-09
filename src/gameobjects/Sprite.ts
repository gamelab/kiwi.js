/// <reference path="../core/Game.ts" />
/// <reference path="../core/Entity.ts" />
/// <reference path="../core/State.ts" />
/// <reference path="../components/Animation.ts" />
/// <reference path="../components/Input.ts" />



module Kiwi.GameObjects {

    export class Sprite extends Kiwi.Entity {

        /**
        * 
        * @constructor
        * @param {Kiwi.State} state - The state that this sprite belongs to
        * @param {Kiwi.Textures.TextureAtlas} atlas - The texture you want to apply to this entity 
        * @param {Number} x 
        * @param {Number} y
        * @return {Sprite}
        */
        constructor(state: Kiwi.State, atlas:Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0, enableInput: bool = false) {

            super(state, x, y);

            // Set the texture
            this.name = atlas.name;
            this.atlas = atlas;
            this.cellIndex = this.atlas.cellIndex;

            //may need to add an optional other cell frame index here
            this.width = atlas.cells[0].w;
            this.height = atlas.cells[0].h;
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
                this.animation = this.components.add(new Kiwi.Components.Animation(this));
                this._isAnimated = true;
            }

        }

        /*
        * Returns the type of object that this is.
        * @method objType
        * @return {string}
        */
        public objType():string {
            return "Sprite";
        }
        
        /*
        * Indicates weither or not this sprite is animated or not. 
        * @property _isAnimated
        * @type bool
        */
        private _isAnimated: bool;

        /** 
	     * The animation component that allows you to create a animation with spritesheets/texture atlas's. 
         * Note: If the atlas that was added is of type Kiwi.Textures.TextureAtlas.SINGLE_IMAGE then no animation component will be created.
	     * @property animation
	     * @type Kiwi.Components.Animation
	     **/
        public animation: Kiwi.Components.Animation;
        
        /** 
         * The Bounds component that controls the bounding box around this Game Object
         * @property bounds
         * @type Kiwi.Components.Bounds
         **/
        public box: Kiwi.Components.Box;

        /** 
	     * The Input component controls the user interaction with this Game Object
	     * @property input
	     * @type Kiwi.Components.Input
	     **/
        public input: Kiwi.Components.Input;
        
        /**
	     * Called by the State to which this Game Object is added
	     * @method update
	     **/
        public update() {
            
            super.update();

            if (this._isAnimated) {
                this.animation.update();
                this.width = this.atlas.cells[this.cellIndex].w;
                this.height = this.atlas.cells[this.cellIndex].h;

                this.box.rawHitbox.width = this.width;
                this.box.rawHitbox.height = this.height;
            }    

            this.input.update();
        }

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera:Kiwi.Camera) {
           
            super.render(camera);
            
            //if it is would even be visible.
            if (this.alpha > 0 && this.visiblity) {
                
                var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
                ctx.save();

                if (this.alpha > 0 && this.alpha <= 1) {
                    ctx.globalAlpha = this.alpha;
                }

                //get entity/view matrix
                var t: Kiwi.Geom.Transform = this.transform;
                var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
               
                ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);

                //ctx.fillStyle = "green";
                //ctx.fillRect(-2, -2, 5, 5);
                
                var cell = this.atlas.cells[this.cellIndex];
                ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h, -t.rotPointX, -t.rotPointY, cell.w, cell.h);
                ctx.restore();
                
            }

    
        }


    }

}