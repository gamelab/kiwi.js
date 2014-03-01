
module Kiwi.Filters {

    export class VignetteFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any) {
            super();
            this.passes.push(shaderManager.requestShader(gl, "VignetteShader", false));
            
            this._size = params.size || this._size;
            this._amount = params.amount || this._amount;
            
        }

        
        private _size: number = 0.5;
        public get size(): number {
            return this._size;
        }
        public set size(value: number) {
            this._size = value;
            this.dirty = true;
        }

        private _amount: number = 0.5;
        public get amount(): number {
            return this._amount;
        }
        public set amount(value: number) {
            this._amount = value;
            this.dirty = true;
        }

        
        public setParams(gl: WebGLRenderingContext) {
            if (this.dirty) {
                this.passes[0].setParam("uSize",  this.size);
                this.passes[0].setParam("uAmount", this.amount);
            }
            this.dirty = false;
        }

    }

}

