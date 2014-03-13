

module Kiwi.Renderers {


    export class Renderer {


        constructor(gl: WebGLRenderingContext,shaderManager:Kiwi.Shaders.ShaderManager,isBatchRenderer:boolean = false) {
            this.shaderManager = shaderManager;
            this._isBatchRenderer = isBatchRenderer;
            this.loaded = true;
       
        }

        public static RENDERER_ID: string = "Renderer";
        
        
        public camMatrix: Float32Array;


        public loaded: boolean = false;

        public shaderManager: Kiwi.Shaders.ShaderManager;

        /**

        * The stage resolution in pixels
        * @property _stageResolution
        * @type Float32Array
        * @public
        */

        //public init(gl: WebGLRenderingContext, params: any = null) {
        //    this.loaded = true;
        //}

        public enable(gl: WebGLRenderingContext, params: any = null) {
            
        }

        public disable(gl: WebGLRenderingContext) {

        }

        public clear(gl: WebGLRenderingContext, params: any) {
        }
        public draw(gl: WebGLRenderingContext) {
        }

        public updateStageResolution(gl: WebGLRenderingContext, res: Float32Array) {
        }
        public updateTextureSize(gl: WebGLRenderingContext, size: Float32Array) {
        }

        public shaderPair: Kiwi.Shaders.ShaderPair;

        private _isBatchRenderer: boolean = false;
        public get isBatchRenderer(): boolean {
            return this._isBatchRenderer;
        }

    }

}