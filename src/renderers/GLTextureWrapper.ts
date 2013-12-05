

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
    export class GLTextureWrapper {

        constructor(gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas,upload:boolean = false) {
            console.log("creating texture");
           

            this.texture = gl.createTexture();
            this._textureAtlas = atlas;
            this.image = atlas.image;
            this._numBytes = this.image.width * this.image.height * 4;
            if (upload) this.uploadTexture(gl);
    
        }

        private _textureAtlas: Kiwi.Textures.TextureAtlas;

        private _numBytes: number;
        public get numBytes(): number {
            return this._numBytes;
        }

        
        public uploaded: boolean = false;

        /**
        *
        * @property texture
        * @type WebGLTexture
        * @public
        */
        public texture: WebGLTexture;
        
        /**
        *
        * @property image
        * @type HTMLImageElement
        * @public
        */
        public image: HTMLImageElement;

        //force : if true then other textures will be removed until there is room.

        public uploadTexture(gl: WebGLRenderingContext):boolean {
            console.log("Attempting to upload texture");
            var success: boolean = false;
            if (this.uploaded) {
                console.log("...not uploading:the image is already uploaded"); 
            } else {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.bindTexture(gl.TEXTURE_2D, null);
                //check gl error here
                this.uploaded = true;
                success = true;
                console.log("...texture uploaded successfully"); 
            
            }

            return success;
        }

        public deleteTexture(gl: WebGLRenderingContext) {
            console.log("Attempting to deallocateTexture");
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.deleteTexture(this.texture);
            this.uploaded = false;
        }


        /**
        * 
        * @method refresh
        * @param gl {WebGLRenderingContext}
        * @param image {HTMLImageElement}
        * @public
        */
        public refresh(gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas) {

            this.image = atlas.image;
            
            this.uploadTexture(gl);
        }
    }

}
