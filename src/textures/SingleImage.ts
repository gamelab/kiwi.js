/**
* 
* @module Kiwi
* @submodule Textures
* 
*/ 

module Kiwi.Textures  {

    /**
    * A special type of TextureAtlas that is used when the user has loaded a single image. This type of TextureAtlas contains only one cell which is generally the whole width/height of the image and starts at the coordinates 0/0. A SingleImage has a space to store sequences but this will not be used.
    * 
    * @class SingleImage
    * @extends TextureAtlas
    * @namespace Kiwi.Textures
    * @constructor
    * @param name {string} The name of the single image
    * @param image {HTMLImageElement/HTMLCanvasElement} the image that is being used.
    * @param [width] {number} the width of the image
    * @param [height] {number} the height of the image
    * @param [offsetX] {number} the offset of the image on the x axis. Useful if the image has a border that you don't want to show.
    * @param [offsetY] {number} the offset of the image of the y axis. Useful if the image has a border that you don't want to show.
    * @return {SingleImage}
    */
    export class SingleImage extends TextureAtlas {
         
        constructor(name: string, image, width?: number, height?: number, offsetX?: number, offsetY?: number) {
            this.width = width || image.width;
            this.height = height || image.height;
            this.offsetX = offsetX || 0;
            this.offsetY = offsetY || 0;

            super(name, Kiwi.Textures.TextureAtlas.SINGLE_IMAGE, this.generateAtlasCells(), image);
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return string
        * @public
        */
        public objType(): string {
            return "SingleImage";
        }

        /**
        * The width of the image.
        * @property width
        * @type number
        * @private
        */
        private width: number;

        /**
        * The height of the image.
        * @property height
        * @type number
        * @private
        */
        private height: number;
        
        /**
        * The offset for the image on the X axis.
        * @property offsetX
        * @type number
        * @private
        */
        private offsetX: number;
        
        /**
        * The offset for the image o nthe Y axis.
        * @property offsetY
        * @type number
        * @private
        */
        private offsetY: number;

        /**
        * This method generates the single image cell based off the information that was passed during instantion.
        * @method generateAtlasCells
        * @returns{ Array }
        * @public
        */
        public generateAtlasCells(): Array<any> {
            return [{ x: this.offsetX, y: this.offsetY, w: this.width, h: this.height, hitboxes: [{ x: 0, y: 0, w: this.width, h: this.height }] }];
        }

    }

}

