
module Kiwi.Filters {

    export class PosterizeFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params?: any) {
            super();

            this.passes.push(shaderManager.requestShader(gl, "PosterizeShader", false));

            if (params) {
                this._gamma = params.gamma || this._gamma;
                this._numColors = params.numColors || this._numColors;
            }
        }

        private _gamma: number = .6;
        public get gamma(): number {
            return this._gamma;
        }
        public set gamma(value: number) {
            this._gamma = value;
            this.dirty = true;
        }

        private _numColors: number = 8;
        public get numColors(): number {
            return this._numColors;
        }
        public set numColors(value: number) {
            this._numColors = value;
            this.dirty = true;
        }

        public setParams(gl: WebGLRenderingContext) {
            if (this.dirty) {
                this.passes[0].setParam("uGamma", this.gamma);
                this.passes[0].setParam("uNumColors", this.numColors);
            }
            this.dirty = false;
        }

    }

}

