/// <reference path="../../components/Position.ts" />
/// <reference path="../../components/Color.ts" />

/**
 *	Kiwi - GameObjects - Canvas - Grid
 *				
 *	@desc		
 *
 *	@version	1.1 - 1st March 2013
 *
 *	@author 	Richard Davey
 *
 *	@url		http://www.kiwijs.org
 *
 **/

module Kiwi.GameObjects.Canvas {

    export class Grid extends Kiwi.Entity {

		/**
		 * Renders a grid of the given width and height filled with a checkerboard pattern to the given Layer canvas.<br />
		 * Each grid cell is the specified width and height, and alternates between two colors.<br />
		 * If alternate is true each row of the pattern will be offset, for a proper checkerboard style. If false each row will be the same colour, creating a striped-pattern effect.<br />
		 * 
		 * @param	cellWidth		The grid cell width
		 * @param	cellHeight		The grid cell height
		 * @param	width			The width of the FlxSprite. If -1 it will be the size of the game (FlxG.width)
		 * @param	height			The height of the FlxSprite. If -1 it will be the size of the game (FlxG.height)
		 * @param	alternate		Should the pattern alternate on each new row? Default true = checkerboard effect. False = vertical stripes
		 * @param	color1			The first fill colour in 0xAARRGGBB format
		 * @param	color2			The second fill colour in 0xAARRGGBB format
		 */
        constructor(cellWidth:number, cellHeight:number, width:number = -1, height:number = -1, alternate:bool = true, color1:number = 0xffe7e6e6, color2:number = 0xffd9d5d5) {

            super(true, false, false);

            this.position = new Kiwi.Components.Position(0, 0);

            this.color1 = new Kiwi.Components.Color();
            this.color1.setColor(color1);

            this.color2 = new Kiwi.Components.Color();
            this.color2.setColor(color2);

            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;
            this.width = width;
            this.height = height;
            this.alternate = alternate;

            this.onAddedToLayer.add(this._onAddedToLayer, this);

            klog.info('Created Grid Game Object');

        }

        public objType() {
            return "Grid";
        }

        /** 
	     * The Position component that controls the location of this Game Object within the game world
	     * @property position
	     * @type Kiwi.Components.Position
	     **/
        public position: Kiwi.Components.Position;

        /** 
	     * The Color component that controls the color of this pixel
	     * @property color1
	     * @type Kiwi.Components.Color
	     **/
        public color1: Kiwi.Components.Color;

        /** 
	     * 
	     * @property color2
	     * @type Kiwi.Components.Color
	     **/
        public color2: Kiwi.Components.Color;

        /** 
	     * 
	     * @property cellWidth
	     * @type Number
	     **/
        public cellWidth: number;

        /** 
	     * 
	     * @property cellHeight
	     * @type Number
	     **/
        public cellHeight: number;

        /** 
	     * 
	     * @property width
	     * @type Number
	     **/
        public width: number;

        /** 
	     * 
	     * @property height
	     * @type Number
	     **/
        public height: number;

        /** 
	     * 
	     * @property alternate
	     * @type Boolean
	     **/
        public alternate: bool;

        /**
	     * Called when this Game Object is added to a Layer, usually as a result of an addChild() call or being in a Group that was added.
	     * @method _onAddedToLayer
	     * @param {Kiwi.Layer} layer - The Layer onto which this Game Object was added
	     * @return {Boolean} true if the Game Object was successfully added, otherwise false
	     * @private
	     **/
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('Grid added to Layer ' + layer.name);

            if (this.width === -1 || this.height === -1)
            {
                this.width = layer.game.stage.size.width();
                this.height = layer.game.stage.size.height();
            }

            return true;

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

			//	How many cells can we fit into the width/height? (round it UP if not even, then trim back)
			//	If there aren't an even number of cells in a row then we need to swap the lastColor value

            var rowColor = this.color1.cssColorRGBA;
            var lastColor = this.color1.cssColorRGBA;
			
            //  This could be optimised so that it draw a large solid rect then every other cell
			for (var y:number = 0; y <= this.height; y += this.cellHeight)
			{
				if (y > 0 && lastColor == rowColor && this.alternate)
				{
					(lastColor == this.color1.cssColorRGBA) ? lastColor = this.color2.cssColorRGBA : lastColor = this.color1.cssColorRGBA;
				}
				else if (y > 0 && lastColor != rowColor && this.alternate == false)
				{
					(lastColor == this.color2.cssColorRGBA) ? lastColor = this.color1.cssColorRGBA : lastColor = this.color2.cssColorRGBA;
				}
				
				for (var x:number = 0; x <= this.width; x += this.cellWidth)
				{
					if (x == 0)
					{
						rowColor = lastColor;
					}
					
					this.layer.canvas.context.fillStyle = lastColor;
					this.layer.canvas.context.fillRect(this.position.x() + x, this.position.y() + y, this.cellWidth, this.cellHeight);
					
					if (lastColor == this.color1.cssColorRGBA)
					{
						lastColor = this.color2.cssColorRGBA;
					}
					else
					{
						lastColor = this.color1.cssColorRGBA;
					}
				}
			}

        }

    }

}