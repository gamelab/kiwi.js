

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

        private _buildTextureAtlas(imageFile: File): Kiwi.Textures.TextureAtlas {
            var atlas: Kiwi.Textures.TextureAtlas = new Kiwi.Textures.TextureAtlas(imageFile.cacheID, null, imageFile.data);
            var m = imageFile.metadata;
            var json = m.jsonCache.getFile(m.jsonID).data;
            json.trim();
            
            atlas.readJSON(json);

            return atlas;
            
        }

        private _buildSpriteSheet(imageFile:File): Kiwi.Textures.SpriteSheet {
           
            var m = imageFile.metadata;
            
            //BEWARE THE SWITCH TO CELLWIDTH AND FRAMEWIDTH
            var spriteSheet: Kiwi.Textures.SpriteSheet = new Kiwi.Textures.SpriteSheet(imageFile.cacheID,imageFile.data,m.frameWidth,m.frameHeight,m.numCells,m.rows,m.cols,m.sheetOffsetX,m.sheetOffsetY,m.cellOffsetX,m.cellOffsetY);
            return spriteSheet;
        }

        private _buildImage(imageFile: File): Kiwi.Textures.SingleImage {
            var m = imageFile.metadata;
            return new Kiwi.Textures.SingleImage(imageFile.cacheID,imageFile.data,m.width, m.height, m.offsetX, m.offsetY);
        }
    }

}

