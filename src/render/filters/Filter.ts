module Kiwi.Filters {

    export class Filter {

        constructor() {
            this.passes = new Array();
         }

        public enabled: boolean = true;

        public name: string = "Filter";

        public dirty: boolean = true;

        public passes: Array<Kiwi.Shaders.ShaderPair>;

        public setParams(gl: WebGLRenderingContext) {

        }

        public setProperty(prop: string, value: any, index?: number) {
            if (index) {
                this[prop][index] = value;
            } else {
                this[prop] = value;
            }
            this.dirty = true;
        }
    }

}