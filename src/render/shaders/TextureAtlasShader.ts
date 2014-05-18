/**
* 
* @module Kiwi
* @submodule Shaders
* @namespace Kiwi.Shaders
*/

module Kiwi.Shaders {

    /**
    * Shader wrapper for rendering Texture Atlases
    * @class TextureAtlasShader
    * @extends Kiwi.Shaders.ShaderPair
    * @constructor
    * @namespace Kiwi.Shaders
    * @return {Kiwi.Shaders.TextureAtlasShader}
    */
    export class TextureAtlasShader extends ShaderPair {

        constructor() {
            super();
        }

        /**
        * Initialise the shaderPair
        * @method init
        * @param gl {WebGLRenderingCotext}
        * @return {WebGLBuffer}
        * @public
        */
        public init(gl: WebGLRenderingContext) {
            super.init(gl);

            this.attributes.aXYUV = gl.getAttribLocation(this.shaderProgram, "aXYUV");
            this.attributes.aAlpha = gl.getAttribLocation(this.shaderProgram, "aAlpha");
            
            this.initUniforms(gl);
        }

        /**
        * Shader attribute references
        * @property attributes
        * @type object
        * @public
        */
        public attributes: any = {
            aXYUV: null,
            aAlpha: null,
        };

        /**
        * Shader uniform descriptors
        * @property uniforms
        * @type object
        * @public
        */
        public uniforms: any = {
            uCamMatrix: {
                type: "mat3",
            },
            uResolution: {
                type: "2fv",
            },
            uTextureSize: {
                type: "2fv",
            },
            uSampler: {
                type: "1i",
            }
        }


        /**
        * The source for the GLSL fragment shader
        * @property fragSource
        * @type Array
        * @public
        */
        public fragSource: Array<string> = [
            "precision mediump float;",
            "varying vec2 vTextureCoord;",
            "varying float vAlpha;",
            "uniform sampler2D uSampler;",
            "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
            "gl_FragColor.a *= vAlpha;",
            "}"
        ];


        /**
        * The source for the GLSL vertex shader
        * @property vertSource
        * @type Array
        * @public
        */
        public vertSource: Array<string> = [
            "attribute vec4 aXYUV;",
            "attribute float aAlpha;",
            "uniform mat3 uCamMatrix;",
            "uniform vec2 uResolution;",
            "uniform vec2 uTextureSize;",
            "varying vec2 vTextureCoord;",
            "varying float vAlpha;",
            "void main(void) {",
            "   vec2 pos = (uCamMatrix * vec3(aXYUV.xy,1)).xy; ",
            "   gl_Position = vec4((pos / uResolution * 2.0 - 1.0) * vec2(1, -1), 0, 1);",
            "   vTextureCoord = aXYUV.zw / uTextureSize;",
            "   vAlpha = aAlpha;",
            "}"
        ];


    }

}
