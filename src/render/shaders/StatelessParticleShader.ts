/**
*
* @class GLShaders
* @constructor
* @param gl {WebGLRenderingContext}
* @return {GLShaders}
*/

module Kiwi.Shaders {

    export class StatelessParticlesShader extends ShaderPair {

        constructor() {
            super();
        }

        public init(gl: WebGLRenderingContext) {
            super.init(gl);

            //attributes
            this.attributes.aXYVxVy = gl.getAttribLocation(this.shaderProgram, "aXYVxVy");
            this.attributes.aBirthLifespan = gl.getAttribLocation(this.shaderProgram, "aBirthLifespan");

            //uniforms

            this.uniforms.uMVMatrix = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
            this.uniforms.uResolution = gl.getUniformLocation(this.shaderProgram, "uResolution");
            this.uniforms.uSampler = gl.getUniformLocation(this.shaderProgram, "uSampler");
            this.uniforms.uCameraOffset = gl.getUniformLocation(this.shaderProgram, "uCameraOffset");
            this.uniforms.uStartColor = gl.getUniformLocation(this.shaderProgram, "uStartColor");
            this.uniforms.uEndColor = gl.getUniformLocation(this.shaderProgram, "uEndColor");
            this.uniforms.uT = gl.getUniformLocation(this.shaderProgram, "uT");
            this.uniforms.uGravity = gl.getUniformLocation(this.shaderProgram, "uGravity");
            
        }



        public attributes: any = {
            aXYVxVy: null,
            aBirthLifespan: null,

        };

        public uniforms: any = {
            uMVMatrix: null,
            uSampler: null,
            uResolution: null,
            uStartColor: null,
            uEndColor: null,
            uT: null,
            uGravity: null
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
            "uniform vec4 uStartColor;",
            "uniform vec4 uEndColor;",

            "varying float vLerp;",
            "void main(void) {",
            "gl_FragColor = texture2D(uSampler, gl_PointCoord);",
            "gl_FragColor.a *= 1.0 - vLerp;",
            "gl_FragColor.rgb = mix(gl_FragColor.rgb,uEndColor.rgb,vLerp);",
            "}"
        ];


        /**
        *
        * @property texture2DVert
        * @type Array
        * @public
        */
        public vertSource: Array<string> = [
            "attribute vec4 aXYVxVy;",
            "attribute vec2 aBirthLifespan;",
            "uniform mat4 uMVMatrix;",
            "uniform vec2 uResolution;",
            "uniform vec2 uCameraOffset;",
            "uniform float uT;",
            "uniform float uGravity;",

            "varying float vLerp;",

            "varying float vAlpha;",
            "void main(void) {",
            "float birthTime = aBirthLifespan.x;",
            "float lifespan = aBirthLifespan.y;",
            "float deathTime = birthTime+lifespan;",
            "float age = uT - birthTime;",
            "vLerp =  age / lifespan;",
            "gl_PointSize = mix(5.0,20.0,vLerp);",

            "if (uT < birthTime || uT > deathTime) {",
            "gl_Position = vec4(0);",
            "} else {",
            "vec4 transpos = vec4(aXYVxVy.xy,0,1); ",
            "vec4 transpos = vec4(aXYVxVy.xy - uCameraOffset,0,1); ",
            "vec2 pos = ((transpos.xy / uResolution) * 2.0) - 1.0;",
            "vec2 vel = aXYVxVy.zw / uResolution;",

            "pos += age * vel;",
            "pos.y += 0.5 * uGravity * age * age;",
            "gl_Position = vec4(pos * vec2(1, -1), 0, 1);",
            "} ",
            "}"
        ];


    }

}
