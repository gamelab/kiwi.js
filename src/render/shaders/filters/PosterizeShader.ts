/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class PosterizeShader extends ShaderPair {

        constructor() {
            super();
        }

        public init(gl: WebGLRenderingContext) {
            super.init(gl);

            //attributes
            this.attributes.aXYUV = gl.getAttribLocation(this.shaderProgram, "aXYUV");

            //uniforms

            this.initUniforms(gl);
        }

        public attributes: any = {
            aXYUV: null,

        };

        public uniforms: any = {
            uSampler: {
                type: "1i",
            },
            uGamma: {
                type: "1f",
            },
            uNumColors: {
                type: "1f",
            }
        }


        /**
        *
        * @property texture2DFrag
        * @type Array
        * @public
        */
        public fragSource: Array<string> = [

            "precision mediump float;",
            "uniform sampler2D uSampler;",
            "uniform float uGamma;",
            "uniform float uNumColors;",

            "varying vec2 vTextureCoord;",
            "uniform float uLevel;",
            "void main(void) {",
                "vec3 col = texture2D(uSampler, vTextureCoord).rgb;",
                "col = pow(col, vec3(uGamma, uGamma, uGamma));",
                "col = col * uNumColors;",
                "col = floor(col);",
                "col = col / uNumColors;",
                "col = pow(col, vec3(1.0 / uGamma));",
                "gl_FragColor = vec4(col, 1.0);",
            "}"];

        /**
        *
        * @property texture2DVert
        * @type Array
        * @public
        */
        public vertSource: Array<string> = [
            "attribute vec4 aXYUV;",
            "varying vec2 vTextureCoord;",
            "void main(void) {",
            "gl_Position = vec4(aXYUV.xy,0,1);",
            "vTextureCoord = aXYUV.zw;",
            "}"
        ];


    }

}
