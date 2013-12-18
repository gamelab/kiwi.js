
/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {


    export class Texture2DRenderer {


        constructor() {

        }

        public init(gl:WebGLRenderingContext) {
            //create buffers
            //dynamic
            this.xyuvBuffer = new GLArrayBuffer(gl, 4);
            this.alphaBuffer = new GLArrayBuffer(gl, 1);

            //static
            this.indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems * 6));
            
            //use shaders
            this.texture2DShaderPair = new Texture2DShader();
            this.texture2DShaderPair.init(gl);
            this.texture2DShaderPair.use(gl);
            this.texture2DShaderPair.aXYUV(gl, this.xyuvBuffer);
            this.texture2DShaderPair.aAlpha(gl, this.alphaBuffer);

            //Texture
            gl.activeTexture(gl.TEXTURE0);
            this.texture2DShaderPair.uSampler(gl, 0);
        }


       
        public clear(gl: WebGLRenderingContext,params:any) {
            this.xyuvBuffer.clear();
            this.alphaBuffer.clear();
            this.texture2DShaderPair.uMVMatrix(gl, params.mvMatrix);
            this.texture2DShaderPair.uCameraOffset(gl, new Float32Array(params.uCameraOffset));
        
        }

        public draw(gl: WebGLRenderingContext, params: any) {
            this.xyuvBuffer.uploadBuffer(gl, this.xyuvBuffer.items);
            this.alphaBuffer.uploadBuffer(gl, this.alphaBuffer.items);
            this.texture2DShaderPair.draw(gl, params.entityCount * 6);
        }

        /**
       * Maximum allowable sprites to render per frame
       * @property _maxItems
       * @type number
       * @default 1000
       * @private
       */
        private _maxItems: number = 2000;

        /**
       * Shader pair for standard 2d sprite rendering
       * @property _texture2DShaderPair
       * @type GLShaders
       * @private
       */
        public texture2DShaderPair: Texture2DShader;

        /**
       * Storage for the xy (position) and uv(texture) coordinates that are generated each frame
       * @property _xyuvBuffer
       * @type GLArrayBuffer
       * @private
       */
        public xyuvBuffer: GLArrayBuffer;

        /**
        * Storage for the polygon indices, pre generated to a length based on max items
        * @property _indexBuffer
        * @type GLElementArrayBuffer
        * @private 
        */
        public indexBuffer: GLElementArrayBuffer;

        /**
        * Storage for alpha values for each vertex on a sprite
        * @property _alphaBuffer
        * @type GLArrayBuffer
        * @private
        */
        public alphaBuffer: GLArrayBuffer;


        /**
      * Create prebaked indices for drawing quads 
      * @method _generateIndices
      * @param numQuads {number}
      * @return number[]
      * @private
      */
        private _generateIndices(numQuads: number): number[] {
            
            var quads: number[] = new Array();
            for (var i = 0; i < numQuads; i++) {
                quads.push(i * 4 + 0, i * 4 + 1, i * 4 + 2, i * 4 + 0, i * 4 + 2, i * 4 + 3);
            }
            return quads;

        }
    }
}
