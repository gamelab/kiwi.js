


module Kiwi.Textures  {


    export class SingleImage extends TextureAtlas {

        constructor(name: string, image: HTMLImageElement, width?: number, height?: number, offsetX?: number, offsetY?: number) {
            console.log("creating single image " + name);
            console.log(image);

            this.width = width || image.width;
            this.height = height || image.height;
            this.offsetX = offsetX || 0;
            this.offsetY = offsetY || 0;

            super(name, this.generateAtlasCells(), image);
        }

        private width: number;
        private height: number;
        
    
        private offsetX: number;
        private offsetY: number;


        public generateAtlasCells(): Array {
            // cell generation goes here


            return [{ x: this.offsetX, y:this.offsetY, w:this.width,h:this.height }];
        }

    }

}

