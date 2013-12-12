/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/
module Kiwi.Renderers {
    
    /**
    *
    * @class GLShaders
    * @constructor
    * @param gl {WebGLRenderingContext}
    * @return {GLShaders}
    */
    export class GLShaders {

        constructor(gl:WebGLRenderingContext) {
            this.vertShader = this.compile(gl, this.texture2DVert.join("\n"), gl.VERTEX_SHADER);
            this.fragShader = this.compile(gl, this.texture2DFrag.join("\n"), gl.FRAGMENT_SHADER);
            this.shaderProgram = this.attach(gl, this.vertShader, this.fragShader);
            this.use(gl, this.shaderProgram);
            this.ready = true;

        }

        /**
        *
        * @property ready
        * @type boolean
        * @public
        */
        public ready: boolean = false;
        
        /**
        *
        * @property vertShader
        * @type WebGLShader
        * @public
        */
        public vertShader: WebGLShader;
        
        /**
        *
        * @property fragShader
        * @type WebGLShader
        * @public
        */
        public fragShader: WebGLShader;
        
        /**
        *
        * @property shaderProgram
        * @type WebGLProgram
        * @public
        */
        public shaderProgram: WebGLProgram;
        
        /**
        *
        * @method attach
        * @param gl {WebGLRenderingContext}
        * @param vertShader {WebGLShader}
        * @param fragShader {WebGLShader}
        * @return {WebGLProgram}
        * @public
        */
        public attach(gl: WebGLRenderingContext, vertShader: WebGLShader, fragShader: WebGLShader): WebGLProgram {
            var shaderProgram: WebGLProgram = gl.createProgram();
            gl.attachShader(shaderProgram, fragShader);
            gl.attachShader(shaderProgram, vertShader);
            gl.linkProgram(shaderProgram);
            return shaderProgram;
        }
        
        /**
        *
        * @method compile
        * @param gl {WebGLRenderingContext}
        * @param src {string}
        * @param shaderType {number}
        * @return {WebGLShader}
        * @public
        */
        public compile(gl: WebGLRenderingContext, src: string, shaderType: number): WebGLShader {
            var shader: WebGLShader = gl.createShader(shaderType);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                return null;
            }
            return shader;
        }

        /**
        *
        * @property texture2DProg
        * @type Object
        * @public
        */
        public texture2DProg:any = {
            vertexXYUVAttribute: null,
            vertexAlphaAttribute: null,
           // vertexColorAttribute: null,
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
            this.texture2DProg.vertexXYUVAttribute = gl.getAttribLocation(shaderProgram, "aXYUV");
            gl.enableVertexAttribArray(this.texture2DProg.vertexXYUVAttribute);
            this.texture2DProg.vertexAlphaAttribute = gl.getAttribLocation(shaderProgram, "aAlpha");
            gl.enableVertexAttribArray(this.texture2DProg.vertexAlphaAttribute);
           
            //uniforms

            this.texture2DProg.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
            this.texture2DProg.resolutionUniform = gl.getUniformLocation(shaderProgram, "uResolution");
            this.texture2DProg.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
            this.texture2DProg.textureSizeUniform = gl.getUniformLocation(shaderProgram, "uTextureSize");
            this.texture2DProg.cameraOffsetUniform = gl.getUniformLocation(shaderProgram, "uCameraOffset");

        }

        /**
        *
        * @property texture2DFrag
        * @type Array
        * @public
        */
        public texture2DFrag: Array<any> = [
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
        public texture2DVert: Array<any> = [
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

    }


}