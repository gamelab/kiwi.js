

/**
*  
* @module Kiwi
* @submodule Renderers
*
* @namespace Kiwi.Renderers
*/

module Kiwi.Renderers {
     
    /**
    * Wraps a webGL texture object
    * @class GLTextureWrapper
    * @constructor
    * @param gl {WebGLRenderingContext}
    * @param atlas {Kiwi.Textures.TextureAtlas} The wrapper will default to wrapping atlas.image.
    * @return {Kiwi.Renderers.GLTextureWrapper}
    */
    export class GLTextureWrapper {

        constructor(gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas,upload:boolean = false) {
            this.textureAtlas = atlas;
            this._image = atlas.image;
            this._numBytes = this._image.width * this._image.height * 4;
            this.createTexture(gl);
            if (upload) this.uploadTexture(gl);
       
        }

        /**
        * The textureAtlas used by the GLTexture
        * @property textureAtlas
        * @type Kiwi.Textures.TextureAtlas
        */

        public textureAtlas: Kiwi.Textures.TextureAtlas;

        /**
        * The number of bytes in the texture
        * @property numBytes
        * @type Kiwi.Textures.TextureAtlas
        */

        private _numBytes: number;
        public get numBytes(): number {
            return this._numBytes;
        }

        /**
        * Returns whether the texture has been created
        * @property created
        * @type boolean
        */
        private _created: boolean = false;
        public get created(): boolean {
            return this._created;
        }
        
        /**
        * Returns whether the texture has been uploaded to video memory
        * @property uploaded
        * @type boolean
        */
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
        * The image wrapped by this wrapper.
        * @property image
        * @type HTMLImageElement
        * @public
        */
        private _image: HTMLImageElement;
        public get image(): HTMLImageElement {
            return( this._image );
        }
        public set image(image: HTMLImageElement) {
            this._image = image;
            this._numBytes = this._image.width * this._image.height * 4;
            this._uploaded = false;
        }

        //force : if true then other textures will be removed until there is room.


        /**
        * Creates a webgl texture object
        * @method createTexture
        * @param gl {WebGLRenderingContext}
        * @public
        */
        public createTexture(gl: WebGLRenderingContext): boolean {
            this.texture = gl.createTexture();
            this._created = true;
            return true;
        }

        
        /**
        * Uploads a webgl texture object to video memory
        * @method uploadTexture
        * @param gl {WebGLRenderingContext}
        * @public
        */
        public uploadTexture(gl: WebGLRenderingContext):boolean {
            var success: boolean = false;
            if (!this.created) {
                this.createTexture(gl);
            }

            if (this.uploaded) {
                Kiwi.Log.log("...not uploading:the image is already uploaded.", '#renderer', '#webgl'); 
            } else {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
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

        /**
        * Re-uploads a webgl texture object to video memory
        * @method refreshTexture
        * @param gl {WebGLRenderingContext}
        * @public
        */
        public refreshTexture(gl: WebGLRenderingContext) {
            this.numBytes = this._image.width * this._image.height * 4;
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
        }

        /**
        * Deletes a webgl texture
        * @method deleteTexture
        * @param gl {WebGLRenderingContext}
        * @public
        */
        public deleteTexture(gl: WebGLRenderingContext) :boolean{
            gl.deleteTexture(this.texture);
            this._uploaded = false;
            this._created = false;
            return true;
        }


      
    }

}
