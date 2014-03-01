/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class BrightnessContrastShader extends ShaderPair {

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
            uBrightness: {
                type: "1f",
            },
            uContrast: {
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
            "uniform float uBrightness;",
            "uniform float uContrast;",
            "varying vec2 vTextureCoord;",
            "void main(void) {",
            "   vec4 color = texture2D(uSampler, vTextureCoord);",
            "   color.rgb += uBrightness;",
            "   if (uContrast > 0.0) {",
            "       color.rgb = (color.rgb - 0.5) / (1.0 - uContrast) + 0.5;",
            "   } else {",
            "   color.rgb = (color.rgb - 0.5) * (1.0 + uContrast) + 0.5;",
            "   }",
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
