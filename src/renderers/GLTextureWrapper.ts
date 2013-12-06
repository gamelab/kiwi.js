

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
            console.log("Creating texture: " + atlas.name);
           

            
            this.textureAtlas = atlas;
            this.image = atlas.image;
            this._numBytes = this.image.width * this.image.height * 4;
            console.log("...texture requires kb: " + this._numBytes / 1024); 


            this.createTexture(gl);

            if (upload) this.uploadTexture(gl);
           
    
        }

        public textureAtlas: Kiwi.Textures.TextureAtlas;

        private _numBytes: number;
        public get numBytes(): number {
            return this._numBytes;
        }

        public created: boolean = false;
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

        public createTexture(gl: WebGLRenderingContext): boolean {
            this.texture = gl.createTexture();
            console.log("...texture created successfully");
            this.created = true;
            return true;
        }

        public uploadTexture(gl: WebGLRenderingContext):boolean {
            console.log("Attempting to upload texture: " + this.textureAtlas.name);
            var success: boolean = false;
            if (!this.created) {
                this.createTexture(gl);
            }

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

        public deleteTexture(gl: WebGLRenderingContext) :boolean{
            console.log("Attempting to delete texture: " + this.textureAtlas.name);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.deleteTexture(this.texture);
            this.uploaded = false;
            this.created = false;
            console.log("...texture deleted successfully");
            console.log("...freed kb: " + this.numBytes / 1024);
            return true;
        }


      
    }

}
