
module Kiwi.Filters {

    export class InkFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any) {
            super();
            this.passes.push(shaderManager.requestShader(gl, "InkShader", false));
            this._center = params.center || [params.resolution[0] / 2, params.resolution[1] / 2];
            this._angle = params.angle || this._angle;
            this._scale = params.scale || this._scale;
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

        private _angle: number = 0;
        public get angle(): number {
            return this._angle;
        }
        public set angle(value: number) {
            this._angle = value;
            this.dirty = true;
        }

        private _scale: number = 0.98;
        public get scale(): number {
            return this._scale;
        }
        public set scale(value: number) {
            this._scale = value;
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
                this.passes[0].setParam("uXYAS", new Float32Array([this.center[0], this.center[1], this.angle, this.scale]));
                this.passes[0].setParam("uResolution", new Float32Array(this.resolution));
            }
            this.dirty = false;
        }

    }

}

