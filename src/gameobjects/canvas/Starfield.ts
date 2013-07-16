/// <reference path="../../components/Position.ts" />
/// <reference path="../../components/Color.ts" />

/**
 *	Kiwi - GameObjects - Canvas - Starfield
 *				
 *	@desc		
 *
 *	@version	1.0 - 14th March 2013
 *
 *	@author 	Richard Davey
 *
 *	@url		http://www.kiwijs.org
 *
 **/

module Kiwi.GameObjects.Canvas {

    export class Starfield extends Kiwi.Entity {

		/**
		 * Create a new StarField
		 * 
		 * @param	x				X coordinate of the starfield sprite
		 * @param	y				Y coordinate of the starfield sprite
		 * @param	width			The width of the starfield
		 * @param	height			The height of the starfield
		 * @param	quantity		The number of stars in the starfield (default 200)
		 * @param	type			Type of starfield. Either STARFIELD_TYPE_2D (default, stars move horizontally) or STARFIELD_TYPE_3D (stars flow out from the center)
		 * @param	updateInterval	How many ms should pass before the next starfield update (default 20)
		 */
        constructor(x:number, y:number, width:number, height:number, quantity:number= 200, type:number= 1, updateInterval:number= 0) {

            super(true, false, false);

            this.onAddedToLayer.add(this._onAddedToLayer, this);

            this.position = new Kiwi.Components.Position(x, y);
			
			this.starfieldType = type;
			
			this.updateSpeed = updateInterval;
			
			//	Stars come from the middle of the starfield in 3D mode
			this.centerX = width >> 1;
			this.centerY = height >> 1;

			this._width = width;
			this._height = height;
				
			//this.clsColor = backgroundColor;
			
			this.stars = [];
			
			for (var i:number = 0; i < quantity; i++)
			{
			    var star = { x: Math.random() * width, y: Math.random() * height, d: 1, speed: Math.random(), alpha: 0, r: Math.random() * Math.PI * 2 };
				
				if (type == Kiwi.GameObjects.Canvas.Starfield.STARFIELD_TYPE_2D)
				{
					star.speed = 1 + Math.round(Math.random() * 5);
				}
				
				this.stars.push(star);
			}
			
			//	Colours array
			//if (type == STARFIELD_TYPE_2D)
			//{
			//	depthColours = FlxGradient.createGradientArray(1, 5, [0xff585858, 0xffF4F4F4]);
			//}
			//else
			//{
			//	depthColours = FlxGradient.createGradientArray(1, 300, [0xff292929, 0xffffffff]);
			//}

            klog.info('Created Starfield Game Object');

        }

        public objType() {
            return "Starfield";
        }

        /** 
	     * The Position component that controls the location of this Game Object within the game world
	     * @property position
	     * @type Kiwi.Components.Position
	     **/
        public position: Kiwi.Components.Position;

		/**
		 * In a 3D starfield this controls the X coordinate the stars emit from, can be updated in real-time!
         * @property centerX
         * @type Number
		 */
		public centerX:number;
		
        /**
		 * In a 3D starfield this controls the Y coordinate the stars emit from, can be updated in real-time!
		* @property centerY
         * @type Number
		 */
		public centerY:number;
		
        /**
		 * How much to shift on the X axis every update. Negative values move towards the left, positiive to the right. 2D Starfield only. Can also be set via setStarSpeed()
		 * @property starXOffset
         * @type Number
		 */
		public starXOffset:number = -1;
		
        /**
		 * How much to shift on the Y axis every update. Negative values move up, positiive values move down. 2D Starfield only. Can also be set via setStarSpeed()
		 * @property starYOffset
         * @type Number
		 */
		public starYOffset:number = 0;

        /*
        *
        * @property _width
        * @type Number
        * @private
        */
		private _width: number;

        /*
        *
        * @property _height
        * @type Number
        * @private
        */
		private _height: number;
		
        /*
        *
        * @property stars
        * @type Any
        * @private
        */
		private stars;

        /*
        *
        * @property starfieldType
        * @type Number
        * @private
        */
		private starfieldType:number;
		
        /*
        *
        * @property backgroundColor
        * @type Number
        * @private
        */
		private backgroundColor:number = 0xff000000;
		
        /*
        *
        * @property updateSpeed
        * @type Number
        * @private
        */
		private updateSpeed:number;

        /*
        *
        * @property tick
        * @type Number
        * @private
        */
		private tick:number;
		
        /*
        *
        * @property depthColours
        * @type Any
        * @private
        */
		private depthColours;
		
        /*
        *
        * @property STARFIELD_TYPE_2D
        * @type Number
        * @static
        */
		public static STARFIELD_TYPE_2D: number = 1;

        /*
        *
        * @property STARFIELD_TYPE_3D
        * @type Number
        * @static
        */
		public static STARFIELD_TYPE_3D:number = 2;

		/**
		 * Change the background color in the format 0xAARRGGBB of the starfield.<br />
		 * Supports alpha, so if you want a transparent background just pass 0x00 as the color.
		 * 
		 * @param	backgroundColor
		 */
		public setBackgroundColor(backgroundColor:number):void
		{
			//this.clsColor = backgroundColor;
		}

		/**
		 * Change the number of layers (depth) and colors used for each layer of the starfield. Change happens immediately.
		 * 
		 * @param	depth			Number of depths (for a 2D starfield the default is 5)
		 * @param	lowestColor		The color given to the stars furthest away from the camera (i.e. the slowest stars), typically the darker colour
		 * @param	highestColor	The color given to the stars cloest to the camera (i.e. the fastest stars), typically the brighter colour
		 */
		public setStarDepthColors(depth:number, lowestColor:number= 0xff585858, highestColor:number= 0xffF4F4F4):void
		{
			//	Depth is the same, we just need to update the gradient then
			//depthColours = FlxGradient.createGradientArray(1, depth, [lowestColor, highestColor]);
			
			//	Run through the stars array, making sure the depths are all within range
			//for each (var star:Object in stars)
			//{
			//	star.speed = 1 + int(Math.random() * depth);
			//}
		}

		/**
		 * Sets the direction and speed of the 2D starfield (doesn't apply to 3D)<br />
		 * You can combine both X and Y together to make the stars move on a diagnol
		 * 
		 * @param	xShift	How much to shift on the X axis every update. Negative values move towards the left, positiive to the right
		 * @param	yShift	How much to shift on the Y axis every update. Negative values move up, positiive values move down
		 */
		public setStarSpeed(xShift:number, yShift:number):void
		{
			this.starXOffset = xShift;
			this.starYOffset = yShift;
		}
		
		/**
		 * The current update speed
		 * Change the tick interval on which the update runs. By default the starfield updates once every 20ms. Set to zero to disable totally.
		 */
		public speed(value:number = null):number
		{
		    if (value !== null)
		    {
		        this.updateSpeed = value;
		    }

			return this.updateSpeed;
		}

        /**
	     * Called when this Game Object is added to a Layer, usually as a result of an addChild() call or being in a Group that was added.
	     * @method _onAddedToLayer
	     * @param {Kiwi.Layer} layer - The Layer onto which this Game Object was added
	     * @return {Boolean} true if the Game Object was successfully added, otherwise false
	     * @private
	     **/
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('Starfield added to Layer ' + layer.name);

            this.tick = layer.game.time.now();

            return true;

        }

        /**
	     * 
	     * @method _render3DStarfield
	     * @private
	     **/
		private _render3DStarfield()
		{
			for (var i = 0; i < this.stars.length; i++)
			{
				this.stars[i].d *= 1.1;
				this.stars[i].x = this.centerX + ((Math.cos(this.stars[i].r) * this.stars[i].d) * this.stars[i].speed);
				this.stars[i].y = this.centerY + ((Math.sin(this.stars[i].r) * this.stars[i].d) * this.stars[i].speed);
				
				this.stars[i].alpha = this.stars[i].d * 2;
				
				if (this.stars[i].alpha > 255)
				{
					this.stars[i].alpha = 255;
				}
				
                this.layer.canvas.context.fillRect(this.position.x() + this.stars[i].x, this.position.y() + this.stars[i].y, 1, 1);
				
				if (this.stars[i].x < 0 || this.stars[i].x > this._width || this.stars[i].y < 0 || this.stars[i].y > this._height)
				{
					this.stars[i] = { x: 0, y: 0, d: 1, speed: Math.random(), alpha: 0, r: Math.random() * Math.PI * 2 };
				}
			}
		}

        /**
	     * 
	     * @method _render2DStarfield
	     * @private
	     **/
		private _render2DStarfield()
		{
			for (var i = 0; i < this.stars.length; i++)
			{
				this.stars[i].x += (this.starXOffset * this.stars[i].speed);
				this.stars[i].y += (this.starYOffset * this.stars[i].speed);
				
                this.layer.canvas.context.fillRect(this.position.x() + this.stars[i].x, this.position.y() + this.stars[i].y, 1, 1);

				if (this.stars[i].x > this._width)
				{
					this.stars[i].x = 0;
				}
				else if (this.stars[i].x < 0)
				{
					this.stars[i].x = this._width;
				}
				
				if (this.stars[i].y > this._height)
				{
					this.stars[i].y = 0;
				}
				else if (this.stars[i].y < 0)
				{
					this.stars[i].y = this._height;
				}
			}
		}

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
		public render(camera:Kiwi.Camera) {

		    super.render(camera);

            if (this.willRender() === false)
            {
                return;
            }

            this.layer.canvas.context.fillStyle = 'rgb(255,255,255)';

            if (this.layer.game.time.now() > this.tick)
            {
                if (this.starfieldType === Kiwi.GameObjects.Canvas.Starfield.STARFIELD_TYPE_2D)
                {
					this._render2DStarfield();
                }
                else
                {
					this._render3DStarfield();
                }

                if (this.updateSpeed > 0)
                {
                    this.tick = this.layer.game.time.now() + this.updateSpeed;
                }
            }

		}

    }

}
