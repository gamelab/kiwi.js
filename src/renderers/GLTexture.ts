

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
    export class GLTexture {

        constructor(gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas,upload:boolean = false) {
            console.log("creating texture");
            console.log(atlas);

            this.texture = gl.createTexture();
            this._textureAtlas = atlas;
            this.image = atlas.image;
            this._bytes = this.image.width * this.image.height * 4;
            if (upload) this.upload(gl);
    
        }

        private _textureAtlas: Kiwi.Textures.TextureAtlas;

        private _bytes: number;
        public get bytes(): number {
            return this._bytes;
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

        public upload(gl: WebGLRenderingContext):number {
            console.log("uploading texture");
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
            return this._bytes;
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
            
            this.upload(gl);
        }
    }

}
