/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class PixelateShader extends ShaderPair {

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
            uPixelSize: {
                type: "2fv",
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
            "uniform vec2 uPixelSize;",
            "varying vec2 vTextureCoord;",
            
            "void main(void) {",
                "float dx = uPixelSize.x *(1.0 / uResolution.x);",
                "float dy = uPixelSize.y *(1.0 / uResolution.y);",
                "vec2 coord = vec2(dx * floor(vTextureCoord.x / dx), dy * floor(vTextureCoord.y / dy));",
                "vec3 col = texture2D(uSampler, coord).rgb;",
                "gl_FragColor = vec4(col, 1.0);",
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
