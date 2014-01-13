

module Kiwi.Shaders {


    export class ShaderManager {

        constructor() {
            
        }
        
        private _shaderPairs: any = {};
        public get currentShader(): ShaderPair {
            return this._currentShader;
        }
        private _currentShader: ShaderPair;

        public init(gl: WebGLRenderingContext, defaultShaderID: string) {
            this._currentShader = this.requestShader(gl, defaultShaderID);
        }

        public requestShader(gl: WebGLRenderingContext,shaderID: string):ShaderPair {

            var shader: ShaderPair;
            //in list already?
            if (shaderID in this._shaderPairs) {
                shader = this._shaderPairs[shaderID];
                if (!shader.loaded) {
                    this._loadShader(gl, shader);
                }
                this._useShader(gl, shader);
                return shader;
            } else {
                //not in list, does it exist?
                if (this.shaderExists) {
                    shader = this.addShader(gl, shaderID);
                    this._loadShader(gl, shader);
                    this._useShader(gl, shader);
                    return shader;
                } else {
                    console.log("Shader " + shaderID + " does not exist");
                }
            }
            //unsuccessful request
            return null;
        }

        public shaderExists(gl: WebGLRenderingContext, shaderID: string):boolean {
            return shaderID in Kiwi.Shaders;
        }

        public addShader(gl: WebGLRenderingContext, shaderID: string):ShaderPair {
            this._shaderPairs[shaderID] = new Kiwi.Shaders[shaderID]();
            return this._shaderPairs[shaderID];
        }

        private _loadShader(gl: WebGLRenderingContext,shader:ShaderPair) {
            shader.init(gl);
        }

        private _useShader(gl: WebGLRenderingContext, shader: ShaderPair) {
            if (shader !== this._currentShader) {
                this._currentShader = shader;
                gl.useProgram(shader.shaderProgram);
            }
        }


    }

}