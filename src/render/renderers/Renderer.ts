

module Kiwi.Renderers {


    export class Renderer {


        constructor() {
        
        }

        public static RENDERER_ID: string = "Renderer";
        
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
        public textureSize: Float32Array;


        

        public cameraOffset: Float32Array;


        public init(gl: WebGLRenderingContext, params: any) {
        }

        public clear(gl: WebGLRenderingContext, params: any) {
        }
        public draw(gl: WebGLRenderingContext, params: any) {
        }

        public updateStageResolution(gl: WebGLRenderingContext, res: Float32Array) {
        }
        public updateTextureSize(gl: WebGLRenderingContext, size: Float32Array) {
        }

    }

}