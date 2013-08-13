

module Kiwi {

    // Class
    export class TextureCache {
        

        constructor(game: Kiwi.Game) {
     
            this._game = game;
            this.textures = {};
        }

        private _game: Kiwi.Game;

        public textures;

        public clear() {

        }

        public add(imageFile:File) {
            switch (imageFile.dataType) {
                case File.SPRITE_SHEET :
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

        private _buildTextureAtlas(imageFile: File): Kiwi.Atlas {
            var atlas: Atlas = new Kiwi.Atlas(imageFile.cacheID, null, imageFile.data);
            var m = imageFile.metadata;
            var json = m.jsonCache.getFile(m.jsonID).data;
            json.trim();
            console.log(json);
           

            atlas.readJSON(json);

            return atlas;
            
        }

        private _buildSpriteSheet(imageFile:File): Kiwi.SpriteSheet {
            // temp for old spritesheets
            imageFile.frameWidth = imageFile.metadata.frameWidth;
            imageFile.frameHeight = imageFile.metadata.frameHeight;
            imageFile.frames = this._game.anims.getSpriteSheetFrames(imageFile.cacheID, imageFile.cache(), imageFile.frameWidth, imageFile.frameHeight);
            
            var m = imageFile.metadata;
            
            //BEWARE THE SWITCH TO CELLWIDTH AND FRAMEWIDTH
            var spriteSheet: SpriteSheet = new Kiwi.SpriteSheet(imageFile.cacheID,imageFile.data,m.frameWidth,m.frameHeight,m.numCells,m.rows,m.cols,m.sheetOffsetX,m.sheetOffsetY,m.cellOffsetX,m.cellOffsetY);
            return spriteSheet;
        }

        private _buildImage(imageFile: File): Kiwi.SingleImage {
            var m = imageFile.metadata;
            return new Kiwi.SingleImage(imageFile.cacheID,imageFile.data,m.width, m.height, m.offsetX, m.offsetY);
        }
    }

}

