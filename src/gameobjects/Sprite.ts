/// <reference path="../core/Game.ts" />
/// <reference path="../core/Entity.ts" />
/// <reference path="../core/State.ts" />
/// <reference path="../components/Animation.ts" />

/// <reference path="../components/Input.ts" />
/// <reference path="../components/Position.ts" />

/// <reference path="../components/Visible.ts" />

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
        * @param {String} cacheID
        * @param {Kiwi.Cache} cache
        * @param {Number} x
        * @param {Number} y
        * @return {StaticImage}
        */
        constructor(atlas:Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0) {

            super();


            //  Properties

            this.name = atlas.name;
            this.atlas = atlas;
            this.cellIndex = this.atlas.cellIndex;

            //this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, cache));

            //may need to add an optional other cell frame index here
            this.width = atlas.cells[0].w;
            this.height = atlas.cells[0].h;
            

            //this.animation = this.components.add(new Kiwi.Components.Animation(this));
            
            this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, this.width, this.height));
            this.input = this.components.add(new Kiwi.Components.Input(this, this.bounds));
            
            this.animation = this.components.add(new Kiwi.Components.Animation(this));
            //FIX/////////////
            //this.motion = this.components.add(new Kiwi.Components.Motion(this.position));
            
            //FIX/////////////
            //this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.position, this.size));

            /*
            if (this.texture.file !== null)
            {
                if (this.texture.file.dataType === Kiwi.File.IMAGE)
                {
                    this._isAnimated = false;
                }
                else if (this.texture.file.dataType === Kiwi.File.SPRITE_SHEET || this.texture.file.dataType === Kiwi.File.TEXTURE_ATLAS)
                {
                    this._isAnimated = true;
                    this.width = this.texture.file.frameWidth;
                    this.height = this.texture.file.frameHeight;
                }
            } else {
                this._isAnimated = false;
            }
            */


            //  Signals

            //this.texture.updated.add(this._updateTexture, this);
            //this.texture.updatedRepeat.add(this._updateRepeat, this);
            //this.texture.position.updated.add(this._updateTexturePosition, this);
            //this.input.inputDragStarted.add(this._dragStarted, this);

            //this.onAddedToLayer.add(this._onAddedToLayer, this);
            this.onAddedToState.add(this._onAddedToState, this);

            this.transform.x = x;
            this.transform.y = y;

            this._center = new Kiwi.Geom.Point(x + this.width / 2, y + this.height / 2);

            klog.info('Created Sprite Game Object');

        }

        public objType() {
            return "Sprite";
        }

        private _center: Kiwi.Geom.Point;

        public get center(): Kiwi.Geom.Point {
            this._center.setTo(this.transform.x + this.width / 2, this.transform.y + this.height / 2);
            return this._center;
        }

        private _isAnimated: bool;

        //private _dragStarted(entity, x, y, snapToCenter) {

        //    //  Should snap from the offset point, but for now will use the sprite size
        //    if (snapToCenter === true)
        //    {
        //        this.position.setTo(this.game.input.position.x - this.size.halfWidth, this.game.input.position.y - this.size.halfHeight);
        //    }

        //}

        /**
         * The Physics component that used for basic collision detection with other entities.
         * @property physics
         * @type Kiwi.Components.ArcadePhysics
         **/
        public physics: Kiwi.Components.ArcadePhysics;

        /** 
	     * 
	     * @property animation
	     * @type Kiwi.Components.Animation
	     **/
        public animation: Kiwi.Components.Animation;

       
        /** 
	     * The Boounds component that controls the bounding box around this Game Object
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

        /** 
	     * 
	     * @property texture
	     * @type Kiwi.Components.Texture
	     **/
        //public texture: Kiwi.Components.Texture;

        /** 
         * 
         * @property motion
         * @type Kiwi.Componenets.Motion
         **/
        //public motion: Kiwi.Components.Motion;
        
        
        private _onAddedToState(state: Kiwi.State): bool {
            
            klog.info('Sprite added to State');

           // this.motion.setClock(this.clock());

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

            //update the center?

            if (this.input.isDragging === true)
            {
                /////////FIX////////////
                //this.position.setTo(this.game.input.position.x - this.input.pointDown.x, this.game.input.position.y - this.input.pointDown.y);
            }

            //this.motion.update();

            this.animation.update();
            
            if (this._isAnimated)
            {
                /*this.bounds.setSize(this.animation.currentAnimation.currentFrame.width, this.animation.currentAnimation.currentFrame.height);*/
                this.width = this.atlas.cells[this.atlas.cellIndex].w;
                this.height = this.atlas.cells[this.atlas.cellIndex].h;
            
            }

        }

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera:Kiwi.Camera) {
           
            super.render(camera);
            
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