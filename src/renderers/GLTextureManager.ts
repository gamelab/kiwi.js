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
            this.maxTextureMem = GLTextureManager.DEFAULT_MAX_TEX_MEM_MB * 1024 * 1024;
            this._textureWrapperCache = new Array();
        }

        public static DEFAULT_MAX_TEX_MEM_MB: number = 1024; 

        public maxTextureMem: number;
        private _usedTextureMem: number;
        public get usedTextureMem(): number {
            return this._usedTextureMem;
        }

        private _numTexturesUsed: number;
        public get numTexturesUsed(): number {
            return this._numTexturesUsed;
        }
        
        public numTextureWrites: number = 0;
        
        

        private _textureWrapperCache: GLTextureWrapper[];


        private _addTextureToCache(glTexture: GLTextureWrapper) {
            this._textureWrapperCache.push(glTexture);
         
        }
        
       

                
        private _deleteTexture(gl:WebGLRenderingContext,idx:number) {
            
            this._textureWrapperCache[idx].deleteTexture(gl);
            this._usedTextureMem -= this._textureWrapperCache[idx].numBytes;
            console.log("...removed KB: " + this._textureWrapperCache[idx].numBytes / 1024);
            console.log("...now using KB: " + this._usedTextureMem / 1024);
            this._numTexturesUsed--;
        }

        
        private _uploadTexture(gl, glTextureWrapper: GLTextureWrapper):boolean {
            //only upload it if it fits
            if (glTextureWrapper.numBytes + this._usedTextureMem <= this.maxTextureMem) {
                glTextureWrapper.uploadTexture(gl);
                this._usedTextureMem += glTextureWrapper.numBytes;
                console.log("Total uploaded KB: " + this._usedTextureMem / 1024);
                this._numTexturesUsed++;
                 console.log("Total textures uploaded: " + this._numTexturesUsed);
                
                return true;
            }
            return false;
                
        }

        public uploadTextureLibrary(gl: WebGLRenderingContext, textureLibrary: Kiwi.Textures.TextureLibrary) {
            console.log("Attempting to upload TextureLibrary");
            this._textureWrapperCache = new Array();
            console.log("...recreated wrapper cache");
            
            for (var tex in textureLibrary.textures) {
                //create a glTexture
                var glTextureWrapper = new GLTextureWrapper(gl, textureLibrary.textures[tex]);
                //store a refence to it
                this._addTextureToCache(glTextureWrapper);
                //create reference on atlas to avoid lookups when switching
                textureLibrary.textures[tex].glTextureWrapper = glTextureWrapper;

                //only upload it if it fits
                if (!this._uploadTexture(gl, glTextureWrapper)) {
                    console.log("...skipped uploading texture due to allocated texture memory exceeded");
                }

            }
            console.log("...texture Library uploaded. Using KB: " + this._usedTextureMem / 1024);
            console.log("...using " + this._usedTextureMem / this.maxTextureMem + " of KB " + this.maxTextureMem / 1024);
        }
        
        public clearTextures(gl: WebGLRenderingContext) {
            console.log("Attempting to clear Textures");
            for (var i = 0; i < this._textureWrapperCache.length; i++) {
                //delete it from g mem
                this._textureWrapperCache[i].deleteTexture(gl);
                //kill the reference on the atlas
                this._textureWrapperCache[i].textureAtlas.glTextureWrapper = null;
            }    
            this._textureWrapperCache = new Array();
           
        }

        public useTexture(gl:WebGLRenderingContext,glTextureWrapper: GLTextureWrapper,textureSizeUniform):boolean {
            
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
                gl.uniform2fv(textureSizeUniform, new Float32Array([glTextureWrapper.image.width, glTextureWrapper.image.height]));
                return true;

            }
            
            
            return false;
        }

        //1: Try and find texture that is same size to remove
        //2: Find next smallest to remove
        //3: Sequentially remove until there is room

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
