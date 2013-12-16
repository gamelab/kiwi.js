    /**
    *
    * @class GLShaders
    * @constructor
    * @param gl {WebGLRenderingContext}
    * @return {GLShaders}
    */

    module Kiwi.Renderers {

    export class Texture2D extends GLShaderPair {

        constructor() {
            super();
            
          
        }

        /**
*
* @property texture2DFrag
* @type Array
* @public
*/
        public fragSource: Array<string> = [
            "precision mediump float;",
            "varying vec2 vTextureCoord;",
            "varying float vAlpha;",
            "uniform sampler2D uSampler;",
            "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
            "gl_FragColor.a *= vAlpha;",
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
            "attribute float aAlpha;",
            "uniform mat4 uMVMatrix;",
            "uniform vec2 uResolution;",
            "uniform vec2 uTextureSize;",
            "uniform vec2 uCameraOffset;",
            "varying vec2 vTextureCoord;",
            "varying float vAlpha;",
            "void main(void) {",
            "vec4 transpos = vec4(aXYUV.xy,0,1); ",
            "transpos =  uMVMatrix * transpos;",

            "transpos =  uMVMatrix * transpos;",
            "vec2 clipSpace = ((transpos.xy / uResolution) * 2.0) - 1.0;",
            "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);",
            "vTextureCoord = aXYUV.zw / uTextureSize;",
            "vAlpha = aAlpha;",
            "}"
        ];

        public descriptor: any = {
            vertexXYUVAttribute: null,
            vertexAlphaAttribute: null,
            mvMatrixUniform: null,
            samplerUniform: null,
            resolutionUniform: null,
            textureSizeUniform: null,
            cameraOffsetUniform: null
        };


        /**
        *
        * @method use
        * @param gl {WebGLRenderingContext}
        * @param shaderProrgram {WebGLProgram}
        * @public
        */
        public use(gl: WebGLRenderingContext, shaderProgram: WebGLProgram) {
            gl.useProgram(this.shaderProgram);
            
            //attributes
            this.descriptor.vertexXYUVAttribute = gl.getAttribLocation(shaderProgram, "aXYUV");
            gl.enableVertexAttribArray(this.descriptor.vertexXYUVAttribute);
            this.descriptor.vertexAlphaAttribute = gl.getAttribLocation(shaderProgram, "aAlpha");
            gl.enableVertexAttribArray(this.descriptor.vertexAlphaAttribute);
            
            //uniforms

            this.descriptor.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
            this.descriptor.resolutionUniform = gl.getUniformLocation(shaderProgram, "uResolution");
            this.descriptor.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
            this.descriptor.textureSizeUniform = gl.getUniformLocation(shaderProgram, "uTextureSize");
            this.descriptor.cameraOffsetUniform = gl.getUniformLocation(shaderProgram, "uCameraOffset");

        }





        }

}

       