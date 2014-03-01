
module Kiwi.Filters {

    export class BrightnessContrastFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any) {
            super();
            this.passes.push(shaderManager.requestShader(gl, "BrightnessContrastShader", false));
            this._brightness = params.brightness || this._brightness;
            this._contrast = params.contrast || this._contrast;
        }

        private _brightness: number = .5;
        public get brightness(): number {
            return this._brightness;
        }
        public set brightness(value: number) {
            this._brightness = value;
            this.dirty = true;
        }

        private _contrast: number = .5;
        public get contrast(): number {
            return this._contrast;
        }
        public set contrast(value: number) {
            this._contrast = value;
            this.dirty = true;
        }

        public setParams(gl: WebGLRenderingContext) {
            if (this.dirty) {
                this.passes[0].setParam("uBrightness", this.brightness);
                this.passes[0].setParam("uContrast", this.contrast);
            }
            this.dirty = false;
        }

    }

}

