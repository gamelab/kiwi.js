/**
*  
* @module Kiwi
* @submodule Shaders
* @namespace Kiwi.Shaders
* 
*/

module Kiwi.Shaders {

    /**
    * Base class for shader pairs which encapsulate a GLSL vertex and fragment shader
    * @class ShaderPair
    * @constructor
    * @namespace Kiwi.Shaders
    * @return {Kiwi.Shaders.ShaderPair}
    */
    export class ShaderPair {

        constructor() {
          
        }

        /**
        *
        * @property RENDERER_ID
        * @type string
        * @public
        * @static
        */
        public static RENDERER_ID: string = "ShaderPair";

        /**
        * Initialise the shader pair.
        * @method init
        * @param gl {WebGLRenderingCotext}
        * @public
        */
        public init(gl: WebGLRenderingContext) {
         
            this.vertShader = this.compile(gl, this.vertSource.join("\n"), gl.VERTEX_SHADER);
            this.fragShader = this.compile(gl, this.fragSource.join("\n"), gl.FRAGMENT_SHADER);
            this.shaderProgram = this.attach(gl, this.vertShader, this.fragShader);
            this.loaded = true;
        }

        /**
        * Returns whether the shader pair has been loaded and compiled.
        * @property loaded
        * @type boolean
        * @public
        */
        public loaded: boolean = false;

        /**
        * Vertex shader
        * @property vertShader
        * @type WebGLShader
        * @public
        */
        public vertShader: WebGLShader;

        /**
        * Fragment shader 
        * @property fragShader
        * @type WebGLShader
        * @public
        */
        public fragShader: WebGLShader;

        /**
        * The WebGl shader program
        * @property shaderProgram
        * @type WebGLProgram
        * @public
        */
        public shaderProgram: WebGLProgram;

        /**
        * Attaches the shaders to the program and links them
        * @method attach
        * @param gl {WebGLRenderingContext}
        * @param vertShader {WebGLShader}
        * @param fragShader {WebGLShader}
        * @return {WebGLProgram}
        * @public
        */
        public attach(gl: WebGLRenderingContext, vertShader: WebGLShader, fragShader: WebGLShader): WebGLProgram {
            var shaderProgram: WebGLProgram = gl.createProgram();
            gl.attachShader(shaderProgram, fragShader);
            gl.attachShader(shaderProgram, vertShader);
            gl.linkProgram(shaderProgram);
            return shaderProgram;
        }

        /**
        * Compiles the shaders
        * @method compile
        * @param gl {WebGLRenderingContext}
        * @param src {string}
        * @param shaderType {number}
        * @return {WebGLShader}
        * @public
        */
        public compile(gl: WebGLRenderingContext, src: string, shaderType: number): WebGLShader {
            var shader: WebGLShader = gl.createShader(shaderType);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                return null;
            }
            return shader;
        }

        /**
        * Uniform descriptors
        * @property uniforms
        * @type Array
        * @public
        */
        public uniforms: any;

        /**
        * Attribute descriptors
        * @property attributes
        * @type Array
        * @public
        */
        public attributes: any;


        /**
        * Shader frag source (for override)
        * @property texture2DFrag
        * @type Array
        * @public
        */
        public fragSource: Array<any>;

        /**
        * Shader vert source (for override)
        * @property texture2DVert
        * @type Array
        * @public
        */
        public vertSource: Array<any>;

        /**
        * Sets a single uniform value and marks it as dirty.
        * @method setParam
        * @param uniformName {string}
        * @param value {*}
        * @public
        */
        public setParam(uniformName: string, value: any) {
            this.uniforms[uniformName].value = value;
            this.uniforms[uniformName].dirty = true;
        }

        /**
        * Applies all uniforms to the uploaded program
        * @method applyUniforms
        * @param gl {WebGLRenderingCotext}
        * @public
        */
        public applyUniforms(gl: WebGLRenderingContext) {
            for (var u in this.uniforms) {
                this.applyUniform(gl, u);
            }
        }

         /**
        * Applies a single uniforms to the uploaded program
        * @method applyUniform
        * @param gl {WebGLRenderingCotext}
        * @param name {string}
        * @public
        */
        public applyUniform(gl: WebGLRenderingContext, name: string) {
            var u = this.uniforms[name]
            if (this.uniforms[name].dirty) {
                gl["uniform" + u.type](u.location, u.value);
                this.uniforms[name].dirty = false;
            }
        }

        /**
        * Initialises all uniforms
        * @method initUniforms
        * @param gl {WebGLRenderingCotext}
        * @public
        */
        public initUniforms(gl: WebGLRenderingContext) {
            for (var uniformName in this.uniforms) {
                var uniform = this.uniforms[uniformName];
                uniform.location = gl.getUniformLocation(this.shaderProgram, uniformName);
                uniform.dirty = true;
                uniform.value = null;

            }
        }

    }


}