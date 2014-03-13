
/**
* 
* 
* @module Kiwi
* @submodule Renderers 
* @main Renderers
*/ 

module Kiwi.Renderers {

     /**
    * Manages GL Texture objects, including creation, uploading, destruction and memory management
    * @class GLTextureManager
    * @constructor
    * @return {GLTextureManager}
    */
    export class GLTextureManager {

        constructor() {
            this._numTexturesUsed = 0;
            this._usedTextureMem = 0;
            this.maxTextureMem = GLTextureManager.DEFAULT_MAX_TEX_MEM_MB * 1024 * 1024;
            this._textureWrapperCache = new Array();
        }

        /**
        * The default maximum amount of texture memory to use before swapping textures
        * @property DEFAULT_MAX_TEX_MEM_MB
        * @type number
        * @public
        * @static
        */
        public static DEFAULT_MAX_TEX_MEM_MB: number = 1024; 

        /**
        * The maximum amount of texture memory to use before swapping textures, initialised from DEFAULT_MAX_TEX_MEM_MB
        * @property maxTextureMem
        * @type number
        * @public
        */
        public maxTextureMem: number;
     
        /**
        * The amount of texture memory currently uplaoded
        * @property usedTextureMem
        * @type number
        * @public
        */
        private _usedTextureMem: number;
        public get usedTextureMem(): number {
            return this._usedTextureMem;
        }

        /**
        * The number of textures currently uplaoded
        * @property usedTextureMem
        * @type number
        * @public
        */
        private _numTexturesUsed: number;
        public get numTexturesUsed(): number {
            return this._numTexturesUsed;
        }
        
        /**
        * The number of textures uploads in the last frame
        * @property numTextureWrites
        * @type number
        * @public
        */
        public numTextureWrites: number = 0;
        
        
        /**
        * An array of references to all texture wrappers
        * @property _textureWrapperCache
        * @type GLTextureWrapper[]
        * @private
        */
        private _textureWrapperCache: GLTextureWrapper[];

        /**
        * Adds a texture wrapper to the cache
        * @method _addTextureToCache
        * @param glTexture {GLTextureWrapper}
        * @private
        */
        private _addTextureToCache(glTexture: GLTextureWrapper) {
            this._textureWrapperCache.push(glTexture);
        }
        
        /**
        * Deletes a texture from memory and removes the wrapper from the cache
        * @method _deleteTexture
        * @param gl {WebGLRenderingContext}
        * @param idx {number}
        * @private
        */
        private _deleteTexture(gl:WebGLRenderingContext,idx:number) {
            
            this._textureWrapperCache[idx].deleteTexture(gl);
            this._usedTextureMem -= this._textureWrapperCache[idx].numBytes;
            this._numTexturesUsed--;
        }

        /**
        * Uploads a texture to video memory 
        * @method _uploadTexture
        * @param gl {WebGLRenderingContext}
        * @param glTextureWrapper {GLTextureWrapper}
        * @return boolean
        * @private
        */
        private _uploadTexture(gl: WebGLRenderingContext, glTextureWrapper: GLTextureWrapper):boolean {
            //only upload it if it fits
            if (glTextureWrapper.numBytes + this._usedTextureMem <= this.maxTextureMem) {
                glTextureWrapper.uploadTexture(gl);
                this._usedTextureMem += glTextureWrapper.numBytes;
                this._numTexturesUsed++;
                
                return true;
            }
            return false;
                
        }

        /**
        * Uploads a texture library to video memory 
        * @method uploadTextureLibrary
        * @param gl {WebGLRenderingContext}
        * @param textureLibrary {Kiwi.Textures.TextureLibrary}
        * @public
        */
        public uploadTextureLibrary(gl: WebGLRenderingContext, textureLibrary: Kiwi.Textures.TextureLibrary) {
            this._textureWrapperCache = new Array();
            for (var tex in textureLibrary.textures) {
                this.uploadTexture(gl, textureLibrary.textures[tex]);

            }
        }


        public uploadTexture(gl: WebGLRenderingContext, textureAtlas: Kiwi.Textures.TextureAtlas) {
            //create a glTexture
            var glTextureWrapper = new GLTextureWrapper(gl, textureAtlas );
            //store a refence to it
            this._addTextureToCache(glTextureWrapper);
            //create reference on atlas to avoid lookups when switching
            textureAtlas.glTextureWrapper = glTextureWrapper;

            //only upload it if it fits
            if (!this._uploadTexture(gl, glTextureWrapper)) {
                console.log("...skipped uploading texture due to allocated texture memory exceeded");
            }
        }

        /**
        * Removes all textures from video memory and clears the wrapper cache
        * @method clearTextures
        * @param gl {WebGLRenderingContext}
        * @public
        */
        public clearTextures(gl: WebGLRenderingContext) {
            for (var i = 0; i < this._textureWrapperCache.length; i++) {
                //delete it from g mem
                this._textureWrapperCache[i].deleteTexture(gl);
                //kill the reference on the atlas
                this._textureWrapperCache[i].textureAtlas.glTextureWrapper = null;
            }    
            this._textureWrapperCache = new Array();
           
        }


        /**
        * Binds the texture ready for use, uploads it if it isn't already
        * @method useTexture
        * @param gl {WebGLRenderingContext}
        * @param glTextureWrapper {GLTextureWrappery}
        * @param textureSizeUniform {number}
        * @return boolean
        * @public
        */
        public useTexture(gl:WebGLRenderingContext,glTextureWrapper: GLTextureWrapper):boolean {
            
            if (!glTextureWrapper.created || !glTextureWrapper.uploaded) {
                if(!this._uploadTexture(gl, glTextureWrapper)) {
                    this._freeSpace(gl, glTextureWrapper.numBytes);
                    this._uploadTexture(gl, glTextureWrapper);
                }
                this.numTextureWrites++;
            }
                
            //use texture
            if (glTextureWrapper.created && glTextureWrapper.uploaded) {
                
                gl.bindTexture(gl.TEXTURE_2D, glTextureWrapper.texture);
                //gl.uniform2fv(textureSizeUniform, new Float32Array([glTextureWrapper.image.width, glTextureWrapper.image.height]));
                return true;

            }
            
            return false;
        }
        
        /**
        * Attemps to free space for to uplaod a texture.
        * 1: Try and find texture that is same size to remove
        * 2: Find next smallest to remove (not yet implemented)
        * 3: Sequentially remove until there is room (not yet implemented)
        * @method _freeSpace
        * @param gl {WebGLRenderingContext}
        * @param numBytesToRemove {number}
        * @return boolean
        * @public
        */
       

        private _freeSpace(gl: WebGLRenderingContext, numBytesToRemove: number): boolean {
           // console.log("Attempting to free texture space");
            var nextSmallest: number = 99999999999;
            var nextSmalletIndex: number = -1; 
            for (var i = 0; i < this._textureWrapperCache.length; i++) {
                var numTextureBytes: number = this._textureWrapperCache[i].numBytes; 
                if (numTextureBytes === numBytesToRemove && this._textureWrapperCache[i].uploaded) {
                  //  console.log("..found one same size");
                    this._deleteTexture(gl,i);
                    return true;
                } else if (numTextureBytes > numBytesToRemove && numTextureBytes < nextSmallest ) {
                    nextSmallest = numTextureBytes;
                    nextSmalletIndex = i;
                }
            }
            /*
            //have we found a larger one to remove
            if (nextSmalletIndex !== -1) {
                this.removeTextureAt(gl,nextSmalletIndex);
                return true;
            } else {
                //remove sequentially till there is enough space - is not optimal for space
                var numBytesRemoved: number = 0;
                var i = 0;

                do {
                    this.removeTextureAt(gl,i);
                    numBytesRemoved += this.textureWrapperCache[i].numBytes;
                    i++
                } while (numBytesRemoved < numBytesToRemove); 
                return true;
                

            }
            */
                        
            return true;
        }

    }

}
