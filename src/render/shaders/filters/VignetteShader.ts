/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class VignetteShader extends ShaderPair {

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
            uSize: {
                type: "1f",
            },
            uAmount: {
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
            "uniform float uSize;",
            "uniform float uAmount;",
            "varying vec2 vTextureCoord;",
            "void main(void) {",
            "   vec4 color = texture2D(uSampler, vTextureCoord);",
            "   float dist = distance(vTextureCoord, vec2(0.5, 0.5));",
            "   color.rgb *= smoothstep(0.8, uSize * 0.799, dist * (uAmount + uSize));",
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
