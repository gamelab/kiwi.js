

module Kiwi {

    // Class
    export class TextureCache {
        

        constructor(game: Kiwi.Game) {
            console.log(game);
            this._game = game;
        
        }

        private _game: Kiwi.Game;

        public textures: Object = {};

        public clear() {

        }

        public add(imageFile:File) {
            switch (imageFile.dataType) {
                case File.SPRITE_SHEET :
                    this.textures[imageFile.cacheID] = this._buildSpriteSheet(imageFile);
                    break;
                case File.IMAGE:
                    this.textures[imageFile.cacheID] = this._buildSpriteSheet(imageFile);
                    break;
                case File.TEXTURE_ATLAS:
                    this.textures[imageFile.cacheID] = this._buildSpriteSheet(imageFile);
                    break;
                default: 
                    klog.error("Image file is of unknown type and was not added to texture cache");
                    break;
            }

        }

        private _buildSpriteSheet(imageFile:File): Kiwi.SpriteSheet {
            imageFile.frameWidth = imageFile.metadata.frameWidth;
            imageFile.frameHeight = imageFile.metadata.frameHeight;
            console.log(this._game);
            imageFile.frames = this._game.anims.getSpriteSheetFrames(imageFile.cacheID, imageFile.cache(), imageFile.frameWidth, imageFile.frameHeight);
            
            var m = imageFile.metadata;
            var spriteSheet: SpriteSheet = new Kiwi.SpriteSheet(imageFile.cacheID,imageFile.data,m.cellWidth,m.cellheight,m.numCells,m.rows,m.cols,m.sheetOffsetX,m.sheetOffsetY,m.cellOffsetX,m.cellOffsetY);
            return spriteSheet;
        }

        private _buildImage(imageFile: File): Kiwi.SingleImage {
            var m = imageFile.metadata;
            return new Kiwi.SingleImage(imageFile.cacheID,imageFile.data,m.width, m.height, m.offsetX, m.offsetY);
        }
    }

}

