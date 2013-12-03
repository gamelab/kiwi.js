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

        constructor(gl: WebGLRenderingContext) {
            this._numTexturesUsed = 0;
            this.maxTextureMem = GLTextureManager.DEFAULT_MAX_TEX_MEM_MB * 1024;

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
        

        public addTexture(texture: GLTexture) {

        }

        public deleteTexture(texture: GLTexture) {

        }

    }

}
