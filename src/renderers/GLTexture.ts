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

        constructor(gl: WebGLRenderingContext, _image?: HTMLImageElement) {
        
            this.texture = gl.createTexture();
            
            this.image = _image;
            this._bytes = _image.width * _image.height * 4;
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
    
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

        /**
        * 
        * @method refresh
        * @param gl {WebGLRenderingContext}
        * @param image {HTMLImageElement}
        * @public
        */
        public refresh(gl: WebGLRenderingContext, _image: HTMLImageElement) {
            this.image = _image;
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }

}
