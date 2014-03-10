/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class GrayScaleShader extends ShaderPair {

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
            "gl_FragColor = texture2D(uSampler, vTextureCoord);",
            "gl_FragColor.rgb =  vec3( mix( vec3( dot( gl_FragColor.rgb, vec3( 0.2125, 0.7154, 0.0721 ) ) ),gl_FragColor.rgb, uLevel ));",
            "}" ];

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
