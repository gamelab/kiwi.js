/// <reference path="../core/Game.ts" />
/// <reference path="../core/Entity.ts" />
/// <reference path="../core/State.ts" />
/// <reference path="../components/Animation.ts" />
/// <reference path="../components/Input.ts" />

/*
 *	Kiwi - GameObjects - Sprite
 *				
 *	@desc		A Sprite is fully interactive and either static or animated.
 *
 *	@version	1.0 - 15th March 2013
 *
 *	@author 	Richard Davey
 *
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.GameObjects {

    export class Sprite extends Kiwi.Entity {

        /**
        * 
        * @constructor
        * @param {Kiwi.Textures.TextureAtlas} atlas - The texture you want to apply to this entity 
        * @param {Number} x 
        * @param {Number} y
        * @return {Sprite}
        */
        constructor(atlas:Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0) {

            super();

            // Set the coordinates
            this.transform.x = x;
            this.transform.y = y;

            // Set the texture
            this.name = atlas.name;
            this.atlas = atlas;
            this.cellIndex = this.atlas.cellIndex;

            //may need to add an optional other cell frame index here
            this.width = atlas.cells[0].w;
            this.height = atlas.cells[0].h;
            
            //Create the components needed
            this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, this.width, this.height));
            this.input = this.components.add(new Kiwi.Components.Input(this, this.bounds));
            
            //Check to see if this sprite could be animated or not
            if (this.atlas.type === Kiwi.Textures.TextureAtlas.SINGLE_IMAGE) {
                this.animation = null;
                this._isAnimated = false;
            } else {
                this.animation = this.components.add(new Kiwi.Components.Animation(this));
                this._isAnimated = true;
            }

            //  Signals
            //this.input.inputDragStarted.add(this._dragStarted, this);
            //this.onAddedToLayer.add(this._onAddedToLayer, this);
            this.onAddedToState.add(this._onAddedToState, this);

            klog.info('Created Sprite Game Object');
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

        /* To be updated.
        private _dragStarted(entity, x, y, snapToCenter) {
            //  Should snap from the offset point, but for now will use the sprite size
            if (snapToCenter === true)
            {
                this.position.setTo(this.game.input.position.x - this.size.halfWidth, this.game.input.position.y - this.size.halfHeight);
            }
        }
        */

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
        public bounds: Kiwi.Components.Bounds;

        /** 
	     * The Input component controls the user interaction with this Game Object
	     * @property input
	     * @type Kiwi.Components.Input
	     **/
        public input: Kiwi.Components.Input;
        
        /*
        * Executed when this sprite gets added to a state.
        * @method _onAddedToState
        * @param {Kiwi.State}
        * @return {bool}
        */
        private _onAddedToState(state: Kiwi.State): bool {
            
            klog.info('Sprite added to State');

            if(this._isAnimated) 
            this.animation.clock = this.clock;

            return true;

        }

        /**
	     * Called by the State to which this Game Object is added
	     * @method update
	     **/
        public update() {
            
            super.update();
            this.input.update();

            if (this.input.isDragging === true) {
                this.transform.setPosition(this.game.input.x() - this.input.pointDown.x, this.game.input.y() - this.input.pointDown.y);
            }

            if (this._isAnimated) {
                this.animation.update();
                this.width = this.atlas.cells[this.atlas.cellIndex].w;
                this.height = this.atlas.cells[this.atlas.cellIndex].h;
                this.bounds.setSize(this.atlas.cells[this.atlas.cellIndex].w, this.atlas.cells[this.atlas.cellIndex].h);
            }    
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

                var m: Kiwi.Geom.Matrix = this.transform.getConcatenatedMatrix();
                ctx.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);

                if (this.alpha > 0 && this.alpha <= 1) {
                    ctx.globalAlpha = this.alpha;
                }

                var cell = this.atlas.cells[this.cellIndex];
                ctx.drawImage(this.atlas.image,cell.x, cell.y, cell.w, cell.h,0,0,cell.w,cell.h);
                
                ctx.restore();
            }

    
        }


    }

}