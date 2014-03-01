/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class HalftoneShader extends ShaderPair {

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
            uResolution: {
                type: "2fv",
            },
            uXYAS: {
                type: "4fv",
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
            "uniform vec2 uResolution;",
            "uniform vec4 uXYAS;",
            "varying vec2 vTextureCoord;",

            "float pattern(float angle) {",
            "   vec2 center = uXYAS.xy;",
            
            "   float scale = uXYAS.q;",
            "   float s = sin(angle), c = cos(angle);",
            "   vec2 tex = vTextureCoord * uResolution - center;",
            "   vec2 point = vec2(c * tex.x - s * tex.y, s * tex.x + c * tex.y) * scale;",
            "   return (sin(point.x) * sin(point.y)) * 4.0;",
            "}",
            "void main() {",
            "   vec4 color = texture2D(uSampler, vTextureCoord);",
            "   float angle = uXYAS.z;",
            "   vec3 cmy = 1.0 - color.rgb;",
            "   float k = min(cmy.x, min(cmy.y, cmy.z));",
            "   cmy = (cmy - k) / (1.0 - k);",
            "   cmy = clamp(cmy * 10.0 - 3.0 + vec3(pattern(angle + 0.26179), pattern(angle + 1.30899), pattern(angle)), 0.0, 1.0);",
            "   k = clamp(k * 10.0 - 5.0 + pattern(angle + 0.78539), 0.0, 1.0);",
            "   gl_FragColor = vec4(1.0 - cmy - k, color.a);",
            "}",


        ];

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
