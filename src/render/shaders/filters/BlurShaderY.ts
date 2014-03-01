/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class BlurShaderY extends ShaderPair {

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
            uBlur: {
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
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'uniform float uBlur;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   vec4 sum = vec4(0.0);',
                
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*uBlur)) * 0.05;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*uBlur)) * 0.09;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*uBlur)) * 0.12;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - uBlur)) * 0.15;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + uBlur)) * 0.15;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*uBlur)) * 0.12;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*uBlur)) * 0.09;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*uBlur)) * 0.05;',

            '   gl_FragColor = sum;',
            '}'
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
