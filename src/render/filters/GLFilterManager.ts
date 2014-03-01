module Kiwi.Filters {

    export class GLFilterManager {

        constructor( game: Kiwi.Game,shaderManager:Kiwi.Shaders.ShaderManager) {
            this._game = game;
            this.filters = new Array();
            this._filterRenderer = new GLFilterRenderer(game.stage,shaderManager);
            this._shaderManager = shaderManager;
           
        }

        private _filterRenderer:GLFilterRenderer;

        private _shaderManager: Kiwi.Shaders.ShaderManager;
        
        private _game: Kiwi.Game;

        public get enabled(): boolean {
            return this._enabled;
        }

        public set enabled(value:boolean) {
            this._enabled = value;
        }

        private _enabled: boolean = true;

        public get isEmpty(): boolean {
            return (this.filters.length === 0) ? true : false;
        }

        public updateFilterResolution(gl:WebGLRenderingContext, width:number, height,number) {
            this._filterRenderer.updateFramebuffers(gl,width, height);
        }

        private filters: Array<Kiwi.Filters.Filter>;

        public clearFilters() {
            this.filters = new Array();
        }

        public addFilter(filterType: any,params:any = null): Kiwi.Filters.Filter {
            var filter: Kiwi.Filters.Filter = this._createFilter(filterType, params); 
            if (filter !== null) {
                this.filters.push(filter);
                return filter;
            }
            return null;
        }

        public addFilterAt(filterType: any, index: number,params:any = null): Kiwi.Filters.Filter {
            var filter: Kiwi.Filters.Filter = this._createFilter(filterType,params);
            if (filter !== null) {
                this.filters.splice(index,0,filter);
                return filter;
            }
            return null;
        }

        public swapFilters(filter0: Filter, filter1: Filter) {
            if (this.filters.indexOf(filter0) !== -1 && this.filters.indexOf(filter1) !== -1) {
                var tempFilter: Filter = filter0;
                filter0 = filter1;
                filter1 = tempFilter;
            }
        }

        public moveToIndex(filter: Filter, to: number) {
            var from = this.filters.indexOf(filter);
            if (from === -1) return;
            this.filters.splice(to, 0, this.filters.splice(from, 1)[0]);
        }

        public removeFilterAt(index: number) {
            this.filters.splice(index, 1);
        }

        private _createFilter(filterType: any, params: any = null) {
            params = params || {};
            params.resolution = [this._game.stage.width, this._game.stage.height];
           
            if (filterType) {
                return new filterType(this._game.stage.gl,this._shaderManager,params);
            }
            return null;
        }

        public enableFrameBuffers(gl: WebGLRenderingContext) {
            this._filterRenderer.enableFrameBuffers(gl);
        }

        public applyFilters(gl: WebGLRenderingContext) {
      
            this._filterRenderer.applyFilters(gl, this.filters);
            
            
        }

    }

}