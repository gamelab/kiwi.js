
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
            this._xyuvBuffer = new GLArrayBuffer(gl, 4);
            this._alphaBuffer = new GLArrayBuffer(gl, 1);

            //static
            this._indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems * 6));
            
            //use shaders
            this._texture2DShaderPair = new Texture2DShader();
            this._texture2DShaderPair.init(gl);
            this._texture2DShaderPair.use(gl);
            this._texture2DShaderPair.aXYUV(gl, this._xyuvBuffer);
            this._texture2DShaderPair.aAlpha(gl, this._alphaBuffer);

            //Texture
            gl.activeTexture(gl.TEXTURE0);
            this._texture2DShaderPair.uSampler(gl, 0);
        }


       
        public use(gl: WebGLRenderingContext,params:any) {
            this._xyuvBuffer.clear();
            this._alphaBuffer.clear();
            this._texture2DShaderPair.uMVMatrix(gl, params.mvMatrix);
            this._texture2DShaderPair.uCameraOffset(gl, new Float32Array(params.uCameraOffset));
        
        }

        public draw(gl: WebGLRenderingContext, params: any) {
            this._xyuvBuffer.uploadBuffer(gl, this._xyuvBuffer.items);
            this._alphaBuffer.uploadBuffer(gl, this._alphaBuffer.items);
            this._texture2DShaderPair.draw(gl, params._entityCount * 6);
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
        private _texture2DShaderPair: Texture2DShader;

        /**
       * Storage for the xy (position) and uv(texture) coordinates that are generated each frame
       * @property _xyuvBuffer
       * @type GLArrayBuffer
       * @private
       */
        private _xyuvBuffer: GLArrayBuffer;

        /**
        * Storage for the polygon indices, pre generated to a length based on max items
        * @property _indexBuffer
        * @type GLElementArrayBuffer
        * @private 
        */
        private _indexBuffer: GLElementArrayBuffer;

        /**
        * Storage for alpha values for each vertex on a sprite
        * @property _alphaBuffer
        * @type GLArrayBuffer
        * @private
        */
        private _alphaBuffer: GLArrayBuffer;


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
