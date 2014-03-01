/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class SepiaShader extends ShaderPair {

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
            uLevel: {
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
            "varying vec2 vTextureCoord;",
            "uniform float uLevel;",
            "void main(void) {",
            "   vec4 color = texture2D(uSampler, vTextureCoord);",
            "   float r = color.r;",
            "   float g = color.g;",
            "   float b = color.b;",
            "   color.r = min(1.0, (r * (1.0 - (0.607 * uLevel))) + (g * (0.769 * uLevel)) + (b * (0.189 * uLevel)));",
            "   color.g = min(1.0, (r * 0.349 * uLevel) + (g * (1.0 - (0.314 * uLevel))) + (b * 0.168 * uLevel));",
            "   color.b = min(1.0, (r * 0.272 * uLevel) + (g * 0.534 * uLevel) + (b * (1.0 - (0.869 * uLevel))));",
            "   gl_FragColor = color;",
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
