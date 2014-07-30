
/**
* 
* 
* @module Kiwi
* @submodule Renderers 
* @main Renderers
* @namespace Kiwi.Renderers
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
                // Tell the atlas to prepare its wrappers
                textureLibrary.textures[tex].createGLTextureWrapper( gl, this );
            }
        }

        /**
        * Uploads a single texture to video memory
        * @method uploadTexture
        * @param gl {WebGLRenderingContext}
        * @param textureAtlas {Kiwi.Textures.TextureAtlas}
        * @public
        */
        public uploadTexture(gl: WebGLRenderingContext, textureAtlas: Kiwi.Textures.TextureAtlas) {
            textureAtlas.createGLTextureWrapper( gl, this );
        }

        /**
        * Adds a texture wrapper to the manager. This both adds the wrapper to the manager cache, and attempts to upload the attached texture to video memory.
        * @method registerTextureWrapper
        * @param gl {WebGLRenderingContext}
        * @param glTextureWrapper {GLTextureWrapper}
        * @public
        * @since 1.1.0
        */
        public registerTextureWrapper( gl: WebGLRenderingContext, glTextureWrapper: GLTextureWrapper ) {
            this._addTextureToCache( glTextureWrapper );
            // Only upload it if it fits
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
                // Delete from graphics memory
                this._deleteTexture(gl, i);
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
        * @param [textureUnit=0] {number} Optional parameter for multitexturing. You can have up to 32 textures available to a shader at one time, in the range 0-31. If you don't need multiple textures, this is perfectly safe to ignore.
        * @return boolean
        * @public
        */
        public useTexture(gl:WebGLRenderingContext,glTextureWrapper: GLTextureWrapper, textureUnit: number = 0):boolean {
            textureUnit = Kiwi.Utils.GameMath.clamp( Kiwi.Utils.GameMath.truncate(textureUnit), 31);    // Convert to integer in range 0-31.
            
            if (!glTextureWrapper.created || !glTextureWrapper.uploaded) {
                if(!this._uploadTexture(gl, glTextureWrapper)) {
                    this._freeSpace(gl, glTextureWrapper.numBytes);
                    this._uploadTexture(gl, glTextureWrapper);
                }
                this.numTextureWrites++;
            }
                
            //use texture
            if (glTextureWrapper.created && glTextureWrapper.uploaded) {
                // Determine target texture unit
                // This could be determined as:
                //   var targetTextureUnit = "TEXTURE" + textureUnit;
                //   gl.activeTexture(gl[targetTextureUnit]);
                // But because the Khronos WebGL spec defines 
                // the glenums of TEXTURE0-31 to be consecutive,
                // this should be safe and fast:
                var targetTextureUnit = gl.TEXTURE0 + textureUnit;
                gl.activeTexture(targetTextureUnit);
                // Bind texture to unit
                gl.bindTexture(gl.TEXTURE_2D, glTextureWrapper.texture);

                //gl.uniform2fv(textureSizeUniform, new Float32Array([glTextureWrapper.image.width, glTextureWrapper.image.height]));
                return true;
            }
            
            return false;
        }
        
        /**
        * Attempts to free space in video memory.
        *
        * This removes textures sequentially, starting from the first cached texture. This may remove textures that are in use. These should automatically re-upload into the last position. After a few frames, this will push in-use textures to the safe end of the queue.
        *
        * If there are too many textures in use to fit in memory, they will all be cycled every frame, even if it would be more efficient to swap out one or two very large textures and preserve several smaller ones. This is an issue with this implementation and should be fixed.
        *
        * This behaviour was changed in v1.1.0. Previous versions used a different memory freeing algorithm.
        * @method _freeSpace
        * @param gl {WebGLRenderingContext}
        * @param numBytesToRemove {number}
        * @return boolean
        * @private
        */
        private _freeSpace(gl: WebGLRenderingContext, numBytesToRemove: number): boolean {
            // Sequential remover
            var bytesRemoved = 0;
            for( var i = 0;  i < this._textureWrapperCache.length;  i++ ) {
                // Scrub uploaded textures
                if(this._textureWrapperCache[i].uploaded) {
                    bytesRemoved += this._textureWrapperCache[i].numBytes;
                    this._deleteTexture(gl, i);
                }
                // Break on reaching or exceeding free target
                if( numBytesToRemove <= bytesRemoved )
                    return true;
            }
                        
            return false;
        }

    }

}
