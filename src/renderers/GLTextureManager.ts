/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {

    /**
    *
    * @class GLTexture
    * @constructor
    * @param gl {WebGLRenderingContext}
    * @param [_image] {HTMLImageElement}
    * @return {GLTexture}
    */
    export class GLTextureManager {

        constructor() {
            this._numTexturesUsed = 0;
            this._usedTextureMem = 0;
            this.maxTextureMem = GLTextureManager.DEFAULT_MAX_TEX_MEM_MB * 1024;
            this.textureCache = new Array();
        }

        public static DEFAULT_MAX_TEX_MEM_MB: number = 512; 

        public maxTextureMem: number;
        private _usedTextureMem: number;
        public get usedTextureMem(): number {
            return this._usedTextureMem;
        }

        private _numTexturesUsed: number;
        public get numTexturesUsed(): number {
            return this._numTexturesUsed;
        }
        
        public textureCache: GLTexture[];


        public addTextureToCache(texture: GLTexture) {

        }

        public deleteTextureFromCache(texture: GLTexture) {

        }

        
        public removeTexture() {
            
        }

        public uploadTextureLibrary(gl:WebGLRenderingContext,textureLibrary:Kiwi.Textures.TextureLibrary) {
            console.log("uploadTextureLibrary");
            console.log(textureLibrary.textures);
            for (var tex in textureLibrary.textures) {
                var glTexture = new GLTexture(gl, textureLibrary.textures[tex]);
                this._usedTextureMem += glTexture.upload(gl);
                this._numTexturesUsed++;

                this.textureCache.push(new GLTexture(gl, textureLibrary.textures[tex]));

            }
            console.log(this.textureCache);
        }

        public freeBlock(size: number) {

        }

    }

}
