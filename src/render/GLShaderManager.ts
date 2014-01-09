
//load 
//unload
//track
//get current
//set current


module Kiwi.Shaders {


    export class ShaderManager {

        constructor(gl: WebGLRenderingContext,defaultShaderID:string) {
            this._currentShader = this.requestShader(gl, defaultShaderID);
        }

        private _shaderPairs: any = {};
        private _currentShader: ShaderPair;

        public requestShader(gl: WebGLRenderingContext,shaderID: string):ShaderPair {

            var shader: ShaderPair;
            //in list already?
            if (shaderID in this._shaderPairs) {
                shader = this._shaderPairs[shaderID];
                if (!shader.loaded) {
                    this._loadShader(gl, shader);
                }
                this._useShader(gl, shader);
            } else {
                //not in list, does it exist?
                if (this.shaderExists) {
                    shader = this.addShader(gl, shaderID);
                    this._loadShader(gl, shader);
                    this._useShader(gl, shader);
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

        }

        private _useShader(gl: WebGLRenderingContext, shader: ShaderPair) {

        }


    }

}