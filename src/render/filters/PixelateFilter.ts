
module Kiwi.Filters {

    export class PixelateFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any) {
            super();
            this.passes.push(shaderManager.requestShader(gl, "PixelateShader", false));
            this._pixelSize = params.pixelSize || this._pixelSize;
            this._resolution = params.resolution;
        }

        private _pixelSize: Array<number> = [10,10];
        public get pixelSize(): Array<number> {
            return this._pixelSize;
        }
        public set pixelSize(value: Array<number>) {
            this._pixelSize = value;
            this.dirty = true;
        }

        private _resolution: Array<number>;
        public get resolution(): Array<number> {
            return this._resolution;
        }
        public set resolution(value: Array<number>) {
            this._resolution = value;
            this.dirty = true;
        }

        public setParams(gl: WebGLRenderingContext) {
            if (this.dirty) {
                this.passes[0].setParam("uPixelSize", new Float32Array(this.pixelSize));
                this.passes[0].setParam("uResolution", new Float32Array(this.resolution));
            }
            this.dirty = false;
        }

    }

}

