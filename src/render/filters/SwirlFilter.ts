
module Kiwi.Filters {

    export class SwirlFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any) {
            super();
            this.passes.push(shaderManager.requestShader(gl, "SwirlShader", false));
            this._center = params.center || [params.resolution[0] / 2, params.resolution[1] /2];
            this._radius = params.radius || this._radius;
            this._angle = params.angle || this._angle;
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

        private _radius: number = 200;
        public get radius(): number {
            return this._radius;
        }
        public set radius(value: number) {
            this._radius = value;
            this.dirty = true;
        }

        private _angle: number = 0.8;
        public get angle(): number {
            return this._angle;
        }
        public set angle(value: number) {
            this._angle = value;
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
                this.passes[0].setParam("uXYRA", new Float32Array([this.center[0],this.center[1],this.radius,this.angle]));
                this.passes[0].setParam("uResolution", new Float32Array(this.resolution));
                
            }
            this.dirty = false;
        }

    }

}

