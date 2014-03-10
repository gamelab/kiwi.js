/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class SwirlShader extends ShaderPair {

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
            uXYRA: {
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
            "uniform vec4 uXYRA;",
            "varying vec2 vTextureCoord;",

            "void main(void) {",
                "vec2 coord = vTextureCoord * uResolution;",
                "vec2 center = uXYRA.xy;",
                "float radius = uXYRA.z;",
                "float angle = uXYRA.w;",
                "coord -= center;",
                "float dist = length(coord);",
                "if(dist < radius) {",
                    "float percent = (radius - dist) / radius;",
                    "float theta = percent * percent * angle * 8.0;",
                    "float s = sin(theta);",
                    "float c = cos(theta);",
                    "coord = vec2(dot(coord, vec2(c, -s)), dot(coord, vec2(s, c)));",
                "}",
                "coord += center;",
                "gl_FragColor = vec4(texture2D(uSampler, coord / uResolution).rgb,1.0);",
                
            "}"
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
