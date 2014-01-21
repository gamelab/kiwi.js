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

            //standard uniforms

            this.uniforms.uMVMatrix = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
            this.uniforms.uResolution = gl.getUniformLocation(this.shaderProgram, "uResolution");
            this.uniforms.uSampler = gl.getUniformLocation(this.shaderProgram, "uSampler");
            this.uniforms.uCameraOffset = gl.getUniformLocation(this.shaderProgram, "uCameraOffset");

            //particle uniforms
          
            this.uniforms.uT = gl.getUniformLocation(this.shaderProgram, "uT");
            this.uniforms.uGravity = gl.getUniformLocation(this.shaderProgram, "uGravity");
            this.uniforms.uPointSizeRange = gl.getUniformLocation(this.shaderProgram, "uPointSizeRange");
            this.uniforms.uAttackColor = gl.getUniformLocation(this.shaderProgram, "uAttackColor");
            this.uniforms.uDecayColor = gl.getUniformLocation(this.shaderProgram, "uDecayColor");
            this.uniforms.uSustainColor = gl.getUniformLocation(this.shaderProgram, "uSustainColor");
            this.uniforms.uReleaseColor = gl.getUniformLocation(this.shaderProgram, "uReleaseColor");
            this.uniforms.uADSRKeyframes = gl.getUniformLocation(this.shaderProgram, "uADSRKeyframes");
            this.uniforms.uAlpha = gl.getUniformLocation(this.shaderProgram, "uAlpha");
            this.uniforms.uLoop = gl.getUniformLocation(this.shaderProgram, "uLoop");


        }



        public attributes: any = {
            aXYVxVy: null,
            aBirthLifespan: null,

        };

        public uniforms: any = {
            uMVMatrix: null,
            uSampler: null,
            uResolution: null,
            uT: null,
            uGravity: null,
            uPointSizeRange: null,
            uAttackColor: null,
            uDecayColor: null,
            uSustainColor: null,
            uReleaseColor: null,
            uADSRKeyFrames: null,
            uAlpha: null,
            uLoop: null
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
            "varying vec4 vCol1;",
            "varying vec4 vCol2;",
            "varying float vColLerp;",
            "varying float vLerp;",
            "varying float vAlpha;",
            "void main(void) {",
            "vec4 sampleCol = texture2D(uSampler, gl_PointCoord);",

            "gl_FragColor = mix(vCol1 * sampleCol ,vCol2 * sampleCol   ,vColLerp);",
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
            "precision mediump float;",
            "attribute vec4 aXYVxVy;",
            "attribute vec2 aBirthLifespan;",

            "uniform mat4 uMVMatrix;",
            "uniform vec2 uResolution;",
            "uniform vec2 uCameraOffset;",

            "uniform float uT;",
            "uniform float uGravity;",

            "uniform vec2 uPointSizeRange;",
            "uniform vec4 uAttackColor;",
            "uniform vec4 uDecayColor;",
            "uniform vec4 uSustainColor;",
            "uniform vec4 uReleaseColor;",
            "uniform vec3 uADSRKeyframes;",
            "uniform float uAlpha;",
            "uniform bool uLoop;",

            "varying float vAlpha;",
            "varying float vLerp;",
            "varying vec4 vCol1;",
            "varying vec4 vCol2;",
            "varying float vColLerp;",


            "void main(void) {",
            "float birthTime = aBirthLifespan.x;",
            "float lifespan = aBirthLifespan.y;",
            "float deathTime = birthTime+lifespan;",
            "float age = uT - birthTime;",
            "age = mod(uT-birthTime,lifespan);",

            "vLerp =  age / lifespan;",
            "vLerp = pow(vLerp,1.0);",
            "gl_PointSize = mix(uPointSizeRange.x,uPointSizeRange.y,vLerp);",


            "if (uT < birthTime || (uT >= deathTime && !uLoop )) {",
            "gl_Position = vec4(0);",
            "} else {",
            "vec4 transpos = vec4(aXYVxVy.xy - uCameraOffset,0,1); ",
            "transpos =  uMVMatrix * transpos;",
            "vec2 pos = ((transpos.xy / uResolution) * 2.0) - 1.0;",
            "vec2 vel = aXYVxVy.zw / uResolution;",

            "pos += age * vel;",
            "pos.y += 0.5 * uGravity * age * age;",
            "gl_Position = vec4(pos * vec2(1, -1), 0, 1);",
            "float colLerp = 1.0;",
            "if (vLerp <= uADSRKeyframes.x) {",
            "vCol1 = vec4(1.0,1.0,1.0,1.0);",
            "vCol2 = uAttackColor;",
            "vColLerp = vLerp / uADSRKeyframes.x; ",
            "} else if (vLerp > uADSRKeyframes.x && vLerp <= uADSRKeyframes.y) {",
            "vCol1 = uAttackColor;",
            "vCol2 = uDecayColor;",
            "vColLerp = (vLerp - uADSRKeyframes.x) / (uADSRKeyframes.y - uADSRKeyframes.x); ",
            "} else if (vLerp > uADSRKeyframes.y && vLerp <= uADSRKeyframes.z) {",
            "vCol1 = uDecayColor;",
            "vCol2 = uSustainColor;",
            "vColLerp = (vLerp - uADSRKeyframes.y) / (uADSRKeyframes.z - uADSRKeyframes.y); ",
            "} else {",
            "vCol1 = uSustainColor;",
            "vCol2 = uReleaseColor;",
            "vColLerp = (vLerp - uADSRKeyframes.z) / (1.0 - uADSRKeyframes.z); ",
            "}",
            "vAlpha = uAlpha;",

            "} ",


            "}"
        ];


    }

}
