module Kiwi.Renderers {

    export class GLShaders {

        constructor(gl:WebGLRenderingContext) {
            this.vertShader = this.compile(gl, this.texture2DVert.join("\n"), gl.VERTEX_SHADER);
            this.fragShader = this.compile(gl, this.texture2DFrag.join("\n"), gl.FRAGMENT_SHADER);
            this.shaderProgram = this.attach(gl, this.vertShader, this.fragShader);
            this.use(gl, this.shaderProgram);
            this.ready = true;

        }

        
        public ready: boolean = false;
        public vertShader: WebGLShader;
        public fragShader: WebGLShader;
        public shaderProgram: WebGLProgram;

        public attach(gl: WebGLRenderingContext, vertShader: WebGLShader, fragShader: WebGLShader): WebGLProgram {
            var shaderProgram: WebGLProgram = gl.createProgram();
            gl.attachShader(shaderProgram, fragShader);
            gl.attachShader(shaderProgram, vertShader);
            gl.linkProgram(shaderProgram);
            return shaderProgram;
        }

        public compile(gl: WebGLRenderingContext, src: string, shaderType: number): WebGLShader {
            var shader: WebGLShader = gl.createShader(shaderType);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.log(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }

        public texture2DProg = { vertexPositionAttribute: null, vertexTexCoordAttribute: null, vertexColorAttribute: null, mvMatrixUniform: null, samplerUniform: null, resolutionUniform: null, textureSizeUniform: null };

        public use(gl: WebGLRenderingContext, shaderProgram: WebGLProgram) {
            gl.useProgram(this.shaderProgram);
          
            //attributes
            console.log(shaderProgram);
            this.texture2DProg.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(this.texture2DProg.vertexPositionAttribute);
            this.texture2DProg.vertexTexCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
            gl.enableVertexAttribArray(this.texture2DProg.vertexTexCoordAttribute);
            this.texture2DProg.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
            gl.enableVertexAttribArray(this.texture2DProg.vertexColorAttribute);
           
            //uniforms

            this.texture2DProg.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
            this.texture2DProg.resolutionUniform = gl.getUniformLocation(shaderProgram, "uResolution");
            this.texture2DProg.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
            this.texture2DProg.textureSizeUniform = gl.getUniformLocation(shaderProgram, "uTextureSize");

        }

        public texture2DFrag: Array = [
            "precision mediump float;",
            "varying vec2 vTextureCoord;",
            "varying float vColor;",
            "uniform sampler2D uSampler;",
            "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
            "gl_FragColor = gl_FragColor * vColor;",
            "}"
        ];

        public texture2DVert: Array = [
            "attribute vec2 aVertexPosition;",
            "attribute vec2 aTextureCoord;",
            "attribute float aColor;",
            "uniform mat4 uMVMatrix;",
            "uniform vec2 uResolution;",
            "uniform vec2 uTextureSize;",
            "varying vec2 vTextureCoord;",
            "varying float vColor;",
            "void main(void) {",
            "vec2 zeroToOne = aVertexPosition / uResolution;",
            "vec2 zeroToTwo = zeroToOne * 2.0;",
            "vec2 clipSpace = zeroToTwo - 1.0;",
            "gl_Position = uMVMatrix * vec4(clipSpace * vec2(1, -1), 0, 1);",
            "vTextureCoord = aTextureCoord / uTextureSize;",
            "vColor = aColor;",
            "}"
        ];

    }


}