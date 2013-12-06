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
            this.textureWrapperCache = new Array();
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

        public textureWrapperCache: GLTextureWrapper[];


        public addTextureToCache(glTexture: GLTextureWrapper) {
            this.textureWrapperCache.push(glTexture);
         
        }


        ///********THIS SHOULD PROBABLY DEALLOCATE IT AS WELL
        public deleteTextureFromCache(glTextureWrapper: GLTextureWrapper) {
            var texId: number = this.textureWrapperCache.indexOf(glTextureWrapper);
            if (texId !== -1) {
                this.textureWrapperCache.slice(texId, 1);
            }
        }

        
        public removeTexture(gl: WebGLRenderingContext,glTextureWrapper:GLTextureWrapper) {
           // glTextureWrapper.deleteTexture(gl);
        }

        public removeTextureAt(gl:WebGLRenderingContext,idx:number) {
            this.textureWrapperCache[idx].deleteTexture(gl);
            console.log(this._usedTextureMem);
            this._usedTextureMem -= this.textureWrapperCache[idx].numBytes;
            console.log("...removed KB: " + this.textureWrapperCache[idx].numBytes / 1024);
            console.log(this._usedTextureMem);
            console.log("...now using KB: " + this._usedTextureMem / 1024);
            this._numTexturesUsed--;
        }

        public uploadTextureLibrary(gl:WebGLRenderingContext,textureLibrary:Kiwi.Textures.TextureLibrary) {
            console.log("Attempting to upload TextureLibrary");
               for (var tex in textureLibrary.textures) {
                    //create a glTexture
                    var glTextureWrapper = new GLTextureWrapper(gl, textureLibrary.textures[tex]);
                    //store a refence to it
                    this.addTextureToCache(glTextureWrapper);
                    //create reference on atlas to avoid lookups when switching
                    textureLibrary.textures[tex].glTextureWrapper = glTextureWrapper;
                
                    //only upload it if it fits
                    if (!this._uploadTexture(gl,glTextureWrapper)) {
                        console.log("...skipped uploading texture due to allocated texture memory exceeded");
                    }

               }
            console.log("...texture Library uploaded. Using KB: " + this._usedTextureMem / 1024);
            console.log("...using " + this._usedTextureMem / this.maxTextureMem + " of KB " + this.maxTextureMem/1024);
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

        public useTexture(gl:WebGLRenderingContext,glTextureWrapper: GLTextureWrapper,textureSizeUniform):boolean {
            
            if (!glTextureWrapper.created || !glTextureWrapper.uploaded) {
                if(!this._uploadTexture(gl, glTextureWrapper)) {
                    this.freeSpace(gl, glTextureWrapper.numBytes);
                    this._uploadTexture(gl, glTextureWrapper);
                }
                this.numTextureWrites++;
            }

                      
            //use texture
            if (glTextureWrapper.created && glTextureWrapper.uploaded) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, glTextureWrapper.texture);
                gl.uniform2fv(textureSizeUniform, new Float32Array([glTextureWrapper.image.width, glTextureWrapper.image.height]));
                return true;

            }
            
            
            return false;
        }

        //1: Try and find texture that is same size to remove
        //2: Find next smallest to remove
        //3: Sequentially remove until there is room

        public freeSpace(gl: WebGLRenderingContext, numBytesToRemove: number): boolean {
           // console.log("Attempting to free texture space");
            var nextSmallest: number = 99999999999;
            var nextSmalletIndex: number = -1; 
            for (var i = 0; i < this.textureWrapperCache.length; i++) {
                var numTextureBytes: number = this.textureWrapperCache[i].numBytes; 
                if (numTextureBytes === numBytesToRemove && this.textureWrapperCache[i].uploaded) {
                  //  console.log("..found one same size");
                    this.removeTextureAt(gl,i);
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
