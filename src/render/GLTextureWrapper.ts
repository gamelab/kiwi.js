

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
            this.textureAtlas = atlas;
            this.image = atlas.image;
            this._numBytes = this.image.width * this.image.height * 4;
            this.createTexture(gl);
            if (upload) this.uploadTexture(gl);
       
        }

     

        public textureAtlas: Kiwi.Textures.TextureAtlas;

        private _numBytes: number;
        public get numBytes(): number {
            return this._numBytes;
        }

        
        private _created: boolean = false;
        public get created(): boolean {
            return this._created;
        }

        private _uploaded: boolean = false;
        public get uploaded(): boolean {
            return this._uploaded;
        }

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

        public createTexture(gl: WebGLRenderingContext): boolean {
            this.texture = gl.createTexture();
            this._created = true;
            return true;
        }

        public uploadTexture(gl: WebGLRenderingContext):boolean {
            var success: boolean = false;
            if (!this.created) {
                this.createTexture(gl);
            }

            if (this.uploaded) {
                console.log("...not uploading:the image is already uploaded"); 
            } else {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.bindTexture(gl.TEXTURE_2D, null);
                //check gl error here
                this._uploaded = true;
                success = true;
            }

            return success;
        }

        public refreshTexture(gl: WebGLRenderingContext) {
            
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        }

        public deleteTexture(gl: WebGLRenderingContext) :boolean{
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.deleteTexture(this.texture);
            this._uploaded = false;
            this._created = false;
            return true;
        }


      
    }

}
