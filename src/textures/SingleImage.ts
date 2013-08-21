/// <reference path="TextureAtlas.ts" />

module Kiwi.Textures  {


    export class SingleImage extends TextureAtlas {

        /*
        *
        * @constructor
        * @param {string} name
        * @param {HTMLImageElement} image
        * @param {number} width
        * @param {number} height
        * @param {number} offsetX
        * @param {number} offsetY
        * @return {Kiwi.Textures.SingleImage}
        */
        constructor(name: string, image: HTMLImageElement, width?: number, height?: number, offsetX?: number, offsetY?: number) {
            this.width = width || image.width;
            this.height = height || image.height;
            this.offsetX = offsetX || 0;
            this.offsetY = offsetY || 0;

            super(name, Kiwi.Textures.TextureAtlas.SINGLE_IMAGE, this.generateAtlasCells(), image);
        }

        public objType(): string {
            return "SingleImage";
        }

        /*
        * The width of the image.
        * @property width
        * @type number
        */
        private width: number;

        /*
        * The height of the image.
        * @property height
        * @type number
        */
        private height: number;
        
        /*
        * The offset for the image on the X axis.
        * @property offsetX
        * @type number
        */
        private offsetX: number;
        
        /*
        * The offset for the image o nthe Y axis.
        * @property offsetY
        * @type number
        */
        private offsetY: number;

        /*
        * This method generates the single image atlas.
        * @method generateAtlasCells
        * @returns{ Array }
        */
        public generateAtlasCells(): Array {
            return [{ x: this.offsetX, y: this.offsetY, w: this.width, h: this.height, hitboxes: [{ x: 0, y: 0, w: this.width, h: this.height }] }];
        }

    }

}

