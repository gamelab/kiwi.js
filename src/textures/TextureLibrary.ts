/**
* Contains Objects that are used when dealing specifically with Textures/Images. Majority of these classes are for Internal Kiwi use.
* 
* @module Kiwi
* @submodule Textures
* @main Textures
* 
*/ 

module Kiwi.Textures {

    /**
    * Holds a reference to all of the image files (jpg, png, e.t.c) that are accessible on the State this TextureLibrary is on. 
    * 
    * @class TextureLibrary
    * @namespace Kiwi.Textures
    * @constructor
    * @param game {Game} The game that this texture library belongs to.
    * @return {TextureLibrary}
    *
    */
    export class TextureLibrary {
         
        constructor(game: Kiwi.Game) {

            this._game = game;
            this.textures = new Object();
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType(): string {
            return "TextureLibrary";
        }

        /**
        * The game that this texture library is on.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * Contains all of the textures that are available.
        * @property textures
        * @public
        */
        public textures;

        /**
        * Resets the texture library.
        * @method clear
        * @public
        */
        public clear() {
            for (var prop in this.textures) {
                delete this.textures[prop];
            }
        }

       

        /**
        * Adds a texture atlas to the library.
        * @method add
        * @param atlas {TextureAtlas}
        * @public
        */
        public add(atlas: TextureAtlas) {
            this.textures[atlas.name] = atlas;

            if (this._game.renderOption === Kiwi.RENDERER_WEBGL) {
                if (Kiwi.Utils.Common.base2Sizes.indexOf(atlas.image.width) == -1 || Kiwi.Utils.Common.base2Sizes.indexOf(atlas.image.height) == -1) {
                    console.log("Kiwi.TextureLibrary: Warning:Image is not of base2 size and may not render correctly.");
                }
                var renderManager = <Kiwi.Renderers.GLRenderManager>this._game.renderer;
                renderManager.addTexture(this._game.stage.gl, atlas);
            }
        }


        /**
        * Adds a new image file to the texture library.
        * @method addFromFile
        * @param imageFile {File}
        * @public
        */
        public addFromFile(imageFile: Kiwi.Files.File) {

            if (this._game.renderOption === Kiwi.RENDERER_WEBGL && this._game.deviceTargetOption != Kiwi.TARGET_COCOON) {
                imageFile = this._rebuildImage(imageFile);
            }

            switch (imageFile.dataType) {
                case Kiwi.Files.File.SPRITE_SHEET:
                    this.textures[imageFile.key] = this._buildSpriteSheet(imageFile);
                    break;
                case Kiwi.Files.File.IMAGE:
                    this.textures[imageFile.key] = this._buildImage(imageFile);
                    break;
                case Kiwi.Files.File.TEXTURE_ATLAS:
                    this.textures[imageFile.key] = this._buildTextureAtlas(imageFile);
                    break;
                default:
                    //Image file is of unknown type and was not added to texture library
                    break;
            }

        }

        /**
        * Used to rebuild a Texture from the FileStore into a base2 size if it doesn't have it already.
        * @method _rebuildImage
        * @param imageFile {File} The image file that is to be rebuilt.
        * @return {File} The new image file.
        * @private
        */
        private _rebuildImage(imageFile: Kiwi.Files.File): Kiwi.Files.File {


            //Check to see if it is base 2
            var newImg = Kiwi.Utils.Common.convertToBase2(imageFile.data);


            //Was it resized? We can check to see if the width/height has changed.
            if (imageFile.data.width !== newImg.width || imageFile.data.height !== newImg.height) {

                if (imageFile.dataType === Kiwi.Files.File.SPRITE_SHEET) {
                    //If no rows were passed then calculate them now.
                    if (!imageFile.metadata.rows)
                        imageFile.metadata.rows = imageFile.data.height / imageFile.metadata.frameHeight;


                    //If no columns were passed then calculate them again.
                    if (!imageFile.metadata.cols)
                        imageFile.metadata.cols = imageFile.data.width / imageFile.metadata.frameWidth;

                } else if (imageFile.dataType === Kiwi.Files.File.IMAGE) {

                    if (!imageFile.metadata.width)
                        imageFile.metadata.width = imageFile.data.width;

                    if (!imageFile.metadata.height)
                        imageFile.metadata.height = imageFile.data.height;

                }

                if (this._game.debug)
                    console.log('Kiwi.TextureLibrary: ' + imageFile.fileName + ' has been rebuilt to be base2.');

                //Assign the new image to the data
                imageFile.data = newImg;
            }

            return imageFile;
        }

        /**
        * Used to build a new texture atlas based on the image file provided. Internal use only.
        * @method _buildTextureAtlas
        * @param imageFile {File} The image file that is to be used.
        * @return {TextureAtlas} The new texture atlas that is created.
        * @private
        */
        private _buildTextureAtlas(imageFile: Kiwi.Files.File): Kiwi.Textures.TextureAtlas {
            var atlas: Kiwi.Textures.TextureAtlas = new Kiwi.Textures.TextureAtlas(imageFile.key, Kiwi.Textures.TextureAtlas.TEXTURE_ATLAS, null, imageFile.data);
            var m = imageFile.metadata;
            
            var json = this._game.fileStore.getFile(m.jsonID).data;
            json.trim();
            
            atlas.readJSON(json);
            
            return atlas;
            
        }
    
        /**
        * Builds a spritesheet atlas from the an image file that is provided.
        * @method _buildSpriteSheet
        * @param imageFile {File} The image file that is to be used.
        * @return {SpriteSheet} The SpriteSheet that was just created.
        * @private
        */
        private _buildSpriteSheet(imageFile:Kiwi.Files.File): Kiwi.Textures.SpriteSheet {
           
            var m = imageFile.metadata;
            
            //BEWARE THE SWITCH TO CELLWIDTH AND FRAMEWIDTH
            var spriteSheet: Kiwi.Textures.SpriteSheet = new Kiwi.Textures.SpriteSheet(imageFile.key,imageFile.data,m.frameWidth,m.frameHeight,m.numCells,m.rows,m.cols,m.sheetOffsetX,m.sheetOffsetY,m.cellOffsetX,m.cellOffsetY);
            return spriteSheet;
        }
    
        /**
        * Builds a single image atlas from a image file that is provided.
        * @method _buildImage
        * @param imageFile {File} The image file that is to be used.
        * @return {SingleImage} The SingleImage that was created.
        * @private
        */
        private _buildImage(imageFile: Kiwi.Files.File): Kiwi.Textures.SingleImage {
            var m = imageFile.metadata;
            return new Kiwi.Textures.SingleImage(imageFile.key,imageFile.data,m.width, m.height, m.offsetX, m.offsetY);
        }

        /**
         * Rebuild the library from a fileStore. Clears the library and repopulates it.
         * @method rebuild
         * @param {Kiwi.Files.FileStore} fileStore
         * @param {Kiwi.State} state
         * @public
         */
        public rebuild(fileStore: Kiwi.Files.FileStore, state: Kiwi.State) {
            this.clear();
            if (this._game.debug) {
                console.log("Kiwi.TextureLibrary: Rebuilding Texture Library");
            }
            
            var fileStoreKeys = fileStore.keys;
            for (var i = 0; i < fileStoreKeys.length; i++) {
                var file: Kiwi.Files.File = this._game.fileStore.getFile(fileStoreKeys[i]);
                if (file.isTexture) {
                    if (this._game.debug) { console.log("  Kiwi.TextureLibrary: Adding Texture: " + file.fileName) };
                    state.textureLibrary.addFromFile(file);
                }
            }

        }
    }

}

