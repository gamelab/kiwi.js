
module Kiwi.Filters {

    export class ZoomBlurFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params?: any) {
            super();

            this.passes.push(shaderManager.requestShader(gl, "ZoomBlurShader", false));
            this._center = params.center || [params.resolution[0] / 2, params.resolution[1] / 2];
            this._strength = params.strength || this._strength;
            this._resolution = params.resolution;
        }

        private _center: Array<number>;
        public get center(): Array<number> {
            return this._center;
        }
        public set center(value: Array<number>) {
            this._center = value;
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

        private _strength: number = .5;
        public get strength(): number {
            return this._strength;
        }
        public set strength(value: number) {
            this._strength = value;
            this.dirty = true;
        }

        public setParams(gl: WebGLRenderingContext) {
            if (this.dirty) {
                this.passes[0].setParam("uCenter", new Float32Array([this.center[0], this.center[1]]));
                this.passes[0].setParam("uStrength", this.strength);
                this.passes[0].setParam("uResolution", new Float32Array(this.resolution));
            }
            this.dirty = false;
        }

    }

}

