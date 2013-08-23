
/*
 *	Kiwi - HUD - IconCounter
 *
 *	@desc		A HUDWidget used for displaying a sigular image multiple times. 
 *              The amount is based of a range components current value, so you can set a maximum and minimum number of images to be dispalyed.
 *              Mainly used for Health Bars, where each 'life' would have its own image.
 *
 *	@version	1.0 - 26th July 2013
 *				
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.HUD.Widget {

    export class IconCounter extends Kiwi.HUD.Widget.Icon {

        /**
        * 
        * @constructor
        * @param {string} cacheID
        * @param {Kiwi.Cache} cache
        * @param {number} current
        * @param {number} max
        * @param {number} x
        * @param {number} y
        **/
        constructor(atlas: Kiwi.Textures.TextureAtlas, current: number, max: number, x: number, y: number) {
            
            super(atlas, x, y);

            this._horizontal = true;
           
            this.range = this.components.add(new Kiwi.HUD.Components.Range(current, max, 0));
            this.range.updated.add(this._changeSize, this);

            this._changeSize();
            this._applyCSS();
        }

        /**
        * Knowledge of weither the icons should be horizontal or vertical
        * @private
        **/
        private _horizontal: boolean;

        /**
        * Holds the range component.
        * @public
        **/
        public range: Kiwi.HUD.Components.Range;

        public _repeat: string;

        public get repeat():string {
            return this._repeat;
        }

        /**
        * Gets called when the range has updated and then it updates the size of the bar.
        * @private
        **/
        private _changeSize() {
            
            if (this._horizontal) {
                this._repeat = 'repeat-x';
                this.width = this.atlas.cells[this.cellIndex].w * this.range.current;
                this.height = this.atlas.cells[this.cellIndex].h;
            } else {
                this._repeat = 'repeat-y';
                this.width = this.atlas.cells[this.cellIndex].w;
                this.height = this.atlas.cells[this.cellIndex].h * this.range.current;
            }
        
        }
        
        /**
        * Applys the background image CSS.
        * @public
        **/
        public _applyCSS() {
            super._applyCSS();
            this.icon.style.backgroundRepeat = this.repeat;
        }
        
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @param {boolean} val
        * @public
        **/
        public get horizontal(): boolean {
            return this._horizontal;
        }

        public set horizontal(val: boolean) {
            this._horizontal = val;
            this._changeSize();
        }

        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @param {boolean} val
        * @public
        **/
        public get vertical(): boolean {
            return !this._horizontal;
        }

        public set vertical(val: boolean) {
            this._horizontal = !val;
            this._changeSize();
        }

    }

}