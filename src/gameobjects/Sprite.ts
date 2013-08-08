/// <reference path="../core/Game.ts" />
/// <reference path="../core/Entity.ts" />
/// <reference path="../core/State.ts" />
/// <reference path="../components/Animation.ts" />
/// <reference path="../components/Motion.ts" />
/// <reference path="../components/Input.ts" />
/// <reference path="../components/Position.ts" />
/// <reference path="../components/Texture.ts" />
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
        constructor(cacheID: string, cache: Kiwi.Cache, x: number = 0, y: number = 0) {

            super();

            if (cache.checkImageCacheID(cacheID, cache) == false)
            {
                console.log('Missing texture', cacheID);
                return;
            }

            //  Properties

            this.name = cacheID;
            this.alpha = this.components.add(new Kiwi.Components.Alpha(1));
            this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, cache));
            this.size = this.components.add(new Kiwi.Components.Size(this.texture.file.data.width, this.texture.file.data.height));

                       
            this.animation = this.components.add(new Kiwi.Components.Animation(this));
            
            this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, this.size.width(), this.size.height()));
            this.input = this.components.add(new Kiwi.Components.Input(this, this.bounds));
            //FIX/////////////
            //this.motion = this.components.add(new Kiwi.Components.Motion(this.position));
            this.visible = this.components.add(new Kiwi.Components.Visible(true));
            //FIX/////////////
            //this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.position, this.size));

            if (this.texture.file !== null)
            {
                if (this.texture.file.dataType === Kiwi.File.IMAGE)
                {
                    this._isAnimated = false;
                }
                else if (this.texture.file.dataType === Kiwi.File.SPRITE_SHEET || this.texture.file.dataType === Kiwi.File.TEXTURE_ATLAS)
                {
                    this._isAnimated = true;
                    this.size.setTo(this.texture.file.frameWidth, this.texture.file.frameHeight);
                }
            }
            else
            {
                this._isAnimated = false;
            }

            //  Signals

            this.alpha.updated.add(this._updateAlpha, this);
            this.texture.updatedRepeat.add(this._updateRepeat, this);
            this.texture.updated.add(this._updateTexture, this);
            this.texture.position.updated.add(this._updateTexturePosition, this);
            this.size.updated.add(this._updateSize, this);
            //this.input.inputDragStarted.add(this._dragStarted, this);
            this.visible.updated.add(this._updateVisible, this);

            //this.onAddedToLayer.add(this._onAddedToLayer, this);
            this.onAddedToState.add(this._onAddedToState, this);

            this.transform.x = x;
            this.transform.y = y;

            
            this._center = new Kiwi.Geom.Point(x + this.size.width() / 2, y + this.size.height() / 2);

            if (this._isAnimated) {
                this.animation.onUpdate.add(this._updateAnimationTexturePosition, this);
            }

            klog.info('Created Sprite Game Object');

        }

        public objType() {
            return "Sprite";
        }

      

        private _center: Kiwi.Geom.Point;

        public center(): Kiwi.Geom.Point {
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
	     * The Alpha component that controls the opacity of this Game Object
	     * @property alpha
	     * @type Kiwi.Components.Alpha
	     **/
        public alpha: Kiwi.Components.Alpha;

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
        public texture: Kiwi.Components.Texture;

        /** 
	     * 
	     * @property size
	     * @type Kiwi.Componenets.Size
	     **/
        public size: Kiwi.Components.Size;

        /** 
	     * 
	     * @property motion
	     * @type Kiwi.Componenets.Motion
	     **/
        //public motion: Kiwi.Components.Motion;

        /** 
	     * 
	     * @property visible
	     * @type Kiwi.Components.Visible
	     **/
        public visible: Kiwi.Components.Visible;

       
      


    

      

         /** 
	     * 
	     * @method _updateAlpha
         * @param {Number} value
	     **/
        private _updateAlpha(value: number) {

           

        }

         /** 
	     * 
	     * @method _updateVisible
         * @param {Number} value
	     **/
        private _updateVisible(value: bool) {

          

        }

        /** 
	     * 
	     * @method _updateSize
         * @param {Number} width
         * @param {Number} height
	     **/
        private _updateSize(width: number, height: number) {

           

            //this.bounds.setTo(this.position.x(), this.position.y(), width, height);

        }

        /** 
	     * 
	     * @method _updateTexturePosition
         * @param {Number} x
         * @param {Number} y
	     **/
        private _updateTexturePosition(x: number, y: number) {

           

        }

        /**
         *
         * @method _updateAnimationPosition 
         * @param {Number} x
         * @param {Number} y
         **/
        private _updateAnimationTexturePosition(x: number, y: number) {
           
        }

        /** 
	     * 
	     * @method _updateRepeat
         * @param {String} value
	     **/
        private _updateRepeat(value:string) {

          

        }

        /**
        *
        * @method _updateTexture
        * @param {String} value
        * @param {Number} width
        * @param {Number} height
        **/
        private _updateTexture(value: string, width:number, height:number) {
            
            this.size.setTo(width, height);
        }

	  

        private _onAddedToState(state: Kiwi.State): bool {
            
            klog.info('Sprite added to State');

           // this.motion.setClock(this.clock());

            if (this._isAnimated)
            {
                this.animation.clock(this.clock());
            }

            return true;

        }

        /**
	     * Called by the State to which this Game Object is added
	     * @method update
	     **/
        public update() {
            
            super.update();
            
            this.input.update();

            if (this.input.isDragging === true)
            {
                /////////FIX////////////
                //this.position.setTo(this.game.input.position.x - this.input.pointDown.x, this.game.input.position.y - this.input.pointDown.y);
            }

            //this.motion.update();

            if (this._isAnimated)
            {
                this.animation.update();
                this.bounds.setSize(this.animation.currentAnimation.currentFrame.width, this.animation.currentAnimation.currentFrame.height);
                this.size.setTo(this.animation.currentAnimation.currentFrame.width, this.animation.currentAnimation.currentFrame.height);
            }

            
           // this.physics.update();
        }

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera:Kiwi.Camera) {
            /*
            super.render(camera);
            
            if ( this.willRender() === true && this.visible.visible() === true && this.alpha.alpha() > 0)
            //console.log("-0" + this.name + this.willRender());
            //console.log("-0" + this.name + this.visible.visible());
            {
              //  console.log("-1" + this.name);
                if (this.bounds.showDebug === true)
                {
                    this.bounds.drawCanvasDebugOutline(this.layer);
                }

                if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1)
                {
                    this.layer.canvas.context.save();
                    this.alpha.setContext(this.layer.canvas);
                }

                var offsetX: number = camera.position.x();
                var offsetY: number = camera.position.y();
              
                var dx = this.position.x();
                var dy = this.position.y();
                var dw = this.size.width();
                var dh = this.size.height();

                if (this.rotation.angle() !== 0)
                {
                    this.layer.canvas.context.save();
                    
                    this.layer.canvas.context.translate(dx + (dw / 2), dy + (dh / 2));
                    

                    this.layer.canvas.context.rotate(this.rotation.angle() * (Math.PI / 180));
                    this.layer.canvas.context.scale(this.scale.x(), this.scale.y());
                    dx = -(dw / 2);
                    dy = -(dh / 2);
                }   

                

                {
                    //  Animation frame?
                    if (this._isAnimated === true)
                    {
                        //  Draw the current frame
                        //this.animation.currentAnimation.drawFrameToCanvasLayer(this.layer, 1, 0, 0);
                        //this.animation.currentAnimation.renderToCanvas(this.layer, this.position.x(), this.position.y());
                        this.animation.currentAnimation.renderToCanvas(this.layer, dx, dy);
                    }
                    else
                    {
                //        console.log("-2" + this.name);
                        //this.layer.canvas.context.drawImage(this.texture.image, this.position.x(), this.position.y(), this.size.width(), this.size.height());
                        this.layer.canvas.context.drawImage(this.texture.image, dx-offsetX, dy-offsetY, dw, dh);
                    }

                }

                if (this.rotation.angle() !== 0)
                {
                    this.layer.canvas.context.translate(0, 0);
                    this.layer.canvas.context.restore();
              
                }

                

              if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1)
                {
                    this.layer.canvas.context.restore();
                }

            }

    */
        }


    }

}