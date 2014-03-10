/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class HueSaturationShader extends ShaderPair {

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
            uHue: {
                type: "1f",
            },
            uSaturation: {
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
            "uniform float uHue;",
            "uniform float uSaturation;",
            "varying vec2 vTextureCoord;",
            "void main(void) {",
            "   vec4 color = texture2D(uSampler, vTextureCoord);",
            "   float angle = uHue * 3.14159265;",
            "   float s = sin(angle), c = cos(angle);",
            "   vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;",
            "   float len = length(color.rgb);",
            "   color.rgb = vec3(dot(color.rgb, weights.xyz),dot(color.rgb, weights.zxy),dot(color.rgb, weights.yzx));",
            "   float average = (color.r + color.g + color.b) / 3.0;",
            "   if (uSaturation > 0.0) {",
            "      color.rgb += (average - color.rgb) * (1.0 - 1.0 / (1.001 - uSaturation));",
            "   } else {",
            "      color.rgb += (average - color.rgb) * (-uSaturation);",
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
