

module Kiwi {

    // Class
    export class TextureCache {

        /*
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Kiwi.TextureCache}
        */
        constructor(game: Kiwi.Game) {
            
            this._game = game;
            this.textures = {};
        }

        public objType(): string {
            return "TextureCache";
        }

        /*
        * The game that this cache belongs to.
        * @property _game
        * @type Kiwi.Game
        */
        private _game: Kiwi.Game;

        /*
        * Contains all of the textures that are available.
        * @property textures
        */
        public textures;

        /*
        * Resets the texture cache. This method doesn't actually remove them from the cache.
        * @method clear
        */
        public clear() {
            //this.textures = {}; //commented out as it breaks/removes all the textures somehow?
        }

        /*
        * Adds a new image file to the texture cache.
        * @method add
        * @param {Kiwi.File} imageFile
        */
        public add(imageFile: File) {

            imageFile = this._rebuildImage(imageFile);

            switch (imageFile.dataType) {
                case File.SPRITE_SHEET:
                    this.textures[imageFile.cacheID] = this._buildSpriteSheet(imageFile);
                    break;
                case File.IMAGE:
                    this.textures[imageFile.cacheID] = this._buildImage(imageFile);
                    break;
                case File.TEXTURE_ATLAS:
                    this.textures[imageFile.cacheID] = this._buildTextureAtlas(imageFile);
                    break;
                default:
                    klog.error("Image file is of unknown type and was not added to texture cache");
                    break;
            }

        }

        private static VALID_SIZES: number[] = [2, 4, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];

        private _rebuildImage(imageFile:Kiwi.File):Kiwi.File {
            
            var width = imageFile.data.width;
            var height = imageFile.data.height

            if (Kiwi.TextureCache.VALID_SIZES.indexOf(width) == -1) {
                var i = 0;
                while (width > Kiwi.TextureCache.VALID_SIZES[i]) i++;
                width = Kiwi.TextureCache.VALID_SIZES[i];
            }

            if (Kiwi.TextureCache.VALID_SIZES.indexOf(height) == -1) {
                var i = 0;
                while (height > Kiwi.TextureCache.VALID_SIZES[i]) i++;
                height = Kiwi.TextureCache.VALID_SIZES[i];
            }

            if (imageFile.data.width !== width || imageFile.data.height !== height) {
                
                var canvas = <HTMLCanvasElement> document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(imageFile.data, 0, 0);
                
                var image = new Image(width, height);
                image.src = canvas.toDataURL("image/png");

                if (imageFile.dataType === File.SPRITE_SHEET) {
                    //if no rows were passed then calculate them now.
                    if (!imageFile.metadata.rows) 
                        imageFile.metadata.rows = imageFile.data.height / imageFile.metadata.frameHeight; 
                    
                    //if no columns were passed then calculate them again.
                    if (!imageFile.metadata.cols) 
                        imageFile.metadata.cols = imageFile.data.width / imageFile.metadata.frameWidth; 
                    
                }

                imageFile.data = image;
                canvas = null;
                width = null;
                height = null;
            }

            return imageFile;
        }

        /*
        * Used to build a new texture atlas based on the image file provided. Internal use only.
        * @method _buildTextureAtlas
        * @param {Kiwi.File} imageFile
        */
        private _buildTextureAtlas(imageFile: File): Kiwi.Textures.TextureAtlas {
            var atlas: Kiwi.Textures.TextureAtlas = new Kiwi.Textures.TextureAtlas(imageFile.cacheID, Kiwi.Textures.TextureAtlas.TEXTURE_ATLAS, null, imageFile.data);
            var m = imageFile.metadata;
            var json = m.jsonCache.getFile(m.jsonID).data;
            json.trim();
            
            atlas.readJSON(json);

            return atlas;
            
        }
    
        /*
        * Builds a spritesheet atlas from the an image file that is provided.
        * @method _buildSpriteSheet
        * @param {Kiwi.File} imageFile
        */
        private _buildSpriteSheet(imageFile:File): Kiwi.Textures.SpriteSheet {
           
            var m = imageFile.metadata;
            
            //BEWARE THE SWITCH TO CELLWIDTH AND FRAMEWIDTH
            var spriteSheet: Kiwi.Textures.SpriteSheet = new Kiwi.Textures.SpriteSheet(imageFile.cacheID,imageFile.data,m.frameWidth,m.frameHeight,m.numCells,m.rows,m.cols,m.sheetOffsetX,m.sheetOffsetY,m.cellOffsetX,m.cellOffsetY);
            return spriteSheet;
        }
    
        /*
        * Builds a single image atlas from a image file that is provided.
        * @method _buildImage
        * @param {Kiwi.File} imageFile
        */
        private _buildImage(imageFile: File): Kiwi.Textures.SingleImage {
            var m = imageFile.metadata;
            return new Kiwi.Textures.SingleImage(imageFile.cacheID,imageFile.data,m.width, m.height, m.offsetX, m.offsetY);
        }
    }

}

