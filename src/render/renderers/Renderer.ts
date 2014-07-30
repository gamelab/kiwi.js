
/**
*  
* @module Kiwi
* @submodule Renderers
* @namespace Kiwi.Renderers
*/

module Kiwi.Renderers {


    export class Renderer {

       /**
        * Base class for WebGL Renderers. Not for instantiation.
        * @class Renderer
        * @constructor
        * @namespace Kiwi.Renderers
        * @param gl {WebGLRenderingContext} 
          * @param shaderManager {Kiwi.Shaders.ShaderManager}
        * @param [params=null] {object}
        * @return {Kiwi.Renderers.Renderer}
        */
        constructor(gl: WebGLRenderingContext,shaderManager:Kiwi.Shaders.ShaderManager,isBatchRenderer:boolean = false) {
            this.shaderManager = shaderManager;
            this._isBatchRenderer = isBatchRenderer;
            this.loaded = true;
            this.blendMode = new Kiwi.Renderers.GLBlendMode(gl, {mode:"NORMAL"} );
        }

        /**
        * Identifier for this renderer
        * @property RENDERER_ID
        * @type String
        * @public
        * @static
        */
        public static RENDERER_ID: string = "Renderer";
        
        /**
        * The camera matrix
        * @property camMatrix
        * @type Float32Array
        * @public
        */
        public camMatrix: Float32Array;

        /**
        *
        * @property loaded
        * @type Array
        * @public
        */
        public loaded: boolean = false;

        /**
        * Reference to the shaderManager - used for requesting shaders.
        * @property shaderManager
        * @type Array
        * @public
        */
        public shaderManager: Kiwi.Shaders.ShaderManager;

        /**
        * Enables the renderer (for override)
        * @method enable
        * @param gl {WebGLRenderingContext}
        * @param [params=null] {object}
        * @public
        */
        public enable(gl: WebGLRenderingContext, params: any = null) {
            
        }

        /**
        * Enables the renderer (for override)
        * @method disable
        * @param gl {WebGLRenderingContext}
        * @param [params=null] {object}
        * @public
        */
        public disable(gl: WebGLRenderingContext) {

        }

        /**
        * Enables the renderer (for override)
        * @method clear
        * @param gl {WebGLRenderingContext}
        * @param [params=null] {object}
        * @public
        */
        public clear(gl: WebGLRenderingContext, params: any) {
        }

        /**
        * Draw to the draw or frame buffer (for override)
        * @method draw
        * @param gl {WebGLRenderingContext}
        * @public
        */
        public draw(gl: WebGLRenderingContext) {
        }

        /**
        * Updates the stage resolution uniforms (for override)
        * @method updateStageResolution
        * @param gl {WebGLRenderingContext}
        * @param res {Float32Array}
        * @public
        */
        public updateStageResolution(gl: WebGLRenderingContext, res: Float32Array) {
        }

         /**
        * Updates the texture size uniforms (for override)
        * @method updateTextureSize
        * @param gl {WebGLRenderingContext}
        * @param size {Float32Array}
        * @public
        */
        public updateTextureSize(gl: WebGLRenderingContext, size: Float32Array) {
        }


        /**
        * The shader pair used by the renderer
        * @property shaderPair
        * @type {Kiwi.Shaders.ShaderPair}
        * @public
        */
        public shaderPair: Kiwi.Shaders.ShaderPair;


        /**
        * This renderer's blend mode data.
        * @property blendMode
        * @type Kiwi.Renderers.GLBlendMode
        * @public
        * @since 1.1.0
        */
        public blendMode: Kiwi.Renderers.GLBlendMode;


        /**
        * Returns whether this is a batch renderer.
        * @property isBatchRenderer
        * @type boolean
        * @public
        */
        private _isBatchRenderer: boolean = false;
        public get isBatchRenderer(): boolean {
            return this._isBatchRenderer;
        }

    }

}