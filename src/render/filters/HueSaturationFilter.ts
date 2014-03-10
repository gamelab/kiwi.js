
module Kiwi.Filters {

    export class HueSaturationFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any) {
            super();
            this.passes.push(shaderManager.requestShader(gl, "HueSaturationShader", false));
            this._hue = params.hue || this._hue;
            this._saturation = params.saturation || this._saturation;
        }

        private _hue: number = .5;
        public get hue(): number {
            return this._hue;
        }
        public set hue(value: number) {
            this._hue = value;
            this.dirty = true;
        }

        private _saturation: number = .5;
        public get saturation(): number {
            return this._saturation;
        }
        public set saturation(value: number) {
            this._saturation = value;
            this.dirty = true;
        }

        public setParams(gl: WebGLRenderingContext) {
            if (this.dirty) {
                this.passes[0].setParam("uHue", this.hue);
                this.passes[0].setParam("uSaturation", this.saturation);
            }
            this.dirty = false;
        }

    }

}

