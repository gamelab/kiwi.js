/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class DotscreenShader extends ShaderPair {

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

            "float pattern() {",
            "   vec2 center = uXYAS.xy;",
            "   float angle = uXYAS.z;",
            "   float scale = uXYAS.q;",
            "   float s = sin(angle), c = cos(angle);",
            "   vec2 tex = vTextureCoord * uResolution - center;",
            "   vec2 point = vec2(c * tex.x - s * tex.y, s * tex.x + c * tex.y) * scale;",
            "   return (sin(point.x) * sin(point.y)) * 4.0;",
            "}",
             "void main() {",
            "    vec4 color = texture2D(uSampler, vTextureCoord);",
            "    float average = (color.r + color.g + color.b) / 3.0;",
            "    gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);",
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
