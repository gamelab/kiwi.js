/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class ZoomBlurShader extends ShaderPair {

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
            uCenter: {
                type: "2fv",
            },
            uStrength: {
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
            "uniform vec2 uResolution;",
            "uniform vec2 uCenter;",
            "uniform float uStrength;",
            "varying vec2 vTextureCoord;",

            "float random(vec3 scale, float seed) {",
            "    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);",
            "}",
            "void main() {",
            " gl_FragColor = texture2D(uSampler, vTextureCoord);",
            "   vec4 color = vec4(0.0);",
            "   float total = 0.0;",
            "   vec2 toCenter = uCenter - vTextureCoord * uResolution;",
            "   float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);",
            "   for (float t = 0.0; t <= 40.0; t++) {",
            "       float percent = (t + offset) / 40.0;",
            "       float weight = 4.0 * (percent - percent * percent);",
            "       vec4 sample = texture2D(uSampler, vTextureCoord + toCenter * percent * uStrength / uResolution);",
            "       sample.rgb *= sample.a;",
            "       color += sample * weight;",
            "       total += weight;",
            "   }",
            "   gl_FragColor = color / total;",
            "   gl_FragColor.rgb /= gl_FragColor.a + 0.00001;",
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
