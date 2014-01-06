    /**
    *
    * @class GLShaders
    * @constructor
    * @param gl {WebGLRenderingContext}
    * @return {GLShaders}
    */

    module Kiwi.Renderers {

    export class Texture2DShader extends ShaderPair {

        constructor() {
            super();
        }

        public init(gl: WebGLRenderingContext) {
            super.init(gl);

            //attributes
            this.attributes.aXYUV = gl.getAttribLocation(this.shaderProgram, "aXYUV");
            //gl.enableVertexAttribArray(this.attributes.aXYUV);
            this.attributes.aAlpha = gl.getAttribLocation(this.shaderProgram, "aAlpha");
            //gl.enableVertexAttribArray(this.attributes.aAlpha);

            //uniforms

            this.uniforms.uMVMatrix = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
            this.uniforms.uResolution = gl.getUniformLocation(this.shaderProgram, "uResolution");
            this.uniforms.uSampler = gl.getUniformLocation(this.shaderProgram, "uSampler");
            this.uniforms.uTextureSize = gl.getUniformLocation(this.shaderProgram, "uTextureSize");
            this.uniforms.uCameraOffset = gl.getUniformLocation(this.shaderProgram, "uCameraOffset");
        }

        public enableAttributes(gl: WebGLRenderingContext) {
            gl.enableVertexAttribArray(this.attributes.aXYUV);
            gl.enableVertexAttribArray(this.attributes.aAlpha);
        }

        public disableAttributes(gl: WebGLRenderingContext) {
            gl.disableVertexAttribArray(this.attributes.aXYUV);
            gl.disableVertexAttribArray(this.attributes.aAlpha);
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
            "vec4 transpos = vec4(aXYUV.xy - uCameraOffset,0,1); ",
            "transpos =  uMVMatrix * transpos;",

            "vec2 clipSpace = ((transpos.xy / uResolution) * 2.0) - 1.0;",
            "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);",
            "vTextureCoord = aXYUV.zw / uTextureSize;",
            "vAlpha = aAlpha;",
            "}"
        ];



        public attributes: any = {
            aXYUV: null,
            aAlpha: null,

        };

        public uniforms: any = {
            uMVMatrix: null,
            uSampler: null,
            uResolution: null,
            uTextureSize: null,
            uCameraOffset: null
        }




        public uMVMatrix(gl: WebGLRenderingContext, uMVMatrixVal: Float32Array) {
            gl.uniformMatrix4fv(this.uniforms.uMVMatrix, false, uMVMatrixVal);
        }

        public uSampler(gl: WebGLRenderingContext, uSamplerVal: number) {
            gl.uniform1i(this.uniforms.samplerUniform, uSamplerVal);
        }

        public uResolution(gl: WebGLRenderingContext, uResolutionVal: Float32Array) {
            gl.uniform2fv(this.uniforms.uResolution, uResolutionVal);
        }

        public uTextureSize(gl: WebGLRenderingContext, uTextureSizeVal: Float32Array) {
            gl.uniform2fv(this.uniforms.uTextureSize, uTextureSizeVal);
        }

        public uCameraOffset(gl: WebGLRenderingContext, uCameraOffsetVal: Float32Array) {
            gl.uniform2fv(this.uniforms.uCameraOffset, uCameraOffsetVal);
        }

        public aXYUV(gl: WebGLRenderingContext, aXYUVVal: GLArrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, aXYUVVal.buffer);
            gl.vertexAttribPointer(this.attributes.aXYUV, aXYUVVal.itemSize, gl.FLOAT, false, 0, 0);
        }

        public aAlpha(gl: WebGLRenderingContext, aAlphaVal: GLArrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, aAlphaVal.buffer);
            gl.vertexAttribPointer(this.attributes.aAlpha, aAlphaVal.itemSize, gl.FLOAT, false, 0, 0);
        }

        public draw(gl: WebGLRenderingContext, numElements: number) {
            gl.drawElements(gl.TRIANGLES, numElements, gl.UNSIGNED_SHORT, 0);
        }



        }

    }
