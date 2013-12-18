interface IRenderer {
    init(gl: WebGLRenderingContext);
    clear(gl: WebGLRenderingContext, params: any);
    draw(gl: WebGLRenderingContext, params: any)
}


module Kiwi.Renderers {


    export class Renderer implements IRenderer {


        constructor() {

        }

        /**
        * GL-Matrix.js provided 4x4 matrix used for matrix uniform
        * @property mvMatrix
        * @type Float32Array
        * @public
        */
        public mvMatrix: Float32Array;


        /**
        * The stage resolution in pixels
        * @property _stageResolution
        * @type Float32Array
        * @public
        */
        public stageResolution: Float32Array;

        /**
      * Shader pair for standard 2d sprite rendering
      * @property _texture2DShaderPair
      * @type GLShaders
      * @private
      */
        public shaderPair: Texture2DShader;

        public cameraOffset: Float32Array;

        public init(gl: WebGLRenderingContext) {

        }

        public clear(gl: WebGLRenderingContext, params: any) {

        }

        public draw(gl: WebGLRenderingContext, params: any) {

        }

    }

}