
module Kiwi.Filters {

    export class VibranceFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params?: any) {
            super();

            this.passes.push(shaderManager.requestShader(gl, "VibranceShader", false));

            if (params) {
                this._level = params.level || this._level;
            }
        }

        private _level: number = 1;
        public get level(): number {
            return this._level;
        }
        public set level(value: number) {
            this._level = value;
            this.dirty = true;
        }

        public setParams(gl: WebGLRenderingContext) {
            if (this.dirty) {
                this.passes[0].setParam("uLevel", this.level);
            }
            this.dirty = false;
        }

    }

}

