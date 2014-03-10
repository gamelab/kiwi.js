
module Kiwi.Filters {

    export class BlurFilter extends Filter {
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any = null) {
            super();
            this.passes.push(shaderManager.requestShader(gl, "BlurShaderX", false));
            this.passes.push(shaderManager.requestShader(gl, "BlurShaderY", false));

            this._blurX = params.blurX || this._blurX;
            this._blurY = params.blurY || this._blurY;
            
        }


        private _blurX: number = 0;
        public get blurX(): number {
            return this._blurX;
        }
        public set blurX(value: number) {
            this._blurX = value;
            this.dirty = true;
        }

        private _blurY: number = 1/256;
        public get blurY(): number {
            return this._blurY;
        }
        public set blurY(value: number) {
            this._blurY = value;
            this.dirty = true;
        }

        public setParams(gl: WebGLRenderingContext) {
            if (this.dirty) {
                this.passes[0].setParam("uBlur", this.blurX);
                this.passes[1].setParam("uBlur", this.blurY);
            }
            this.dirty = false;

        }

    }


}