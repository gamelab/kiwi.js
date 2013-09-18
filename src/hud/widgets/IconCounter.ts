/**
* A HUDWidget used for displaying a sigular image multiple times. 
* The amount is based of a range components current value, so you can set a maximum and minimum number of images to be dispalyed.
*  Mainly used for Health Bars, where each 'life' would have its own image.
*
* @module HUD
* @submodule Widget
*/

module Kiwi.HUD.Widget {

    /**
    * @class IconCounter
    * @extends Icon
    * @constructor
    * @param {TextureAtlas} key
    * @param current {number} current
    * @param max {number} max
    * @param x {number} x
    * @param y {number} y
    */
    export class IconCounter extends Kiwi.HUD.Widget.Icon {

        constructor(atlas: Kiwi.Textures.TextureAtlas, current: number, max: number, x: number, y: number) {
            
            super(atlas, x, y);

            this._horizontal = true;
           
            this.range = this.components.add(new Kiwi.HUD.Components.Range(current, max, 0));
            this.range.updated.add(this._changeSize, this);

            this._changeSize();
            this._applyCSS();
        }

        /*
        * Knowledge of whether the icons should be horizontal or vertical
        * @property _horizontal
        * @type boolean
        * @private
        */
        private _horizontal: boolean;

        /*
        * Holds the range component.
        * @property range
        * @type Range
        * @public
        */
        public range: Kiwi.HUD.Components.Range;

        /**
        * @property _repeat
        * @type string
        * @public
        */

        public _repeat: string;

        /**
        * @property repeat
        * @type string
        * @public
        */

        public get repeat():string {
            return this._repeat;
        }

        /*
        * Gets called when the range has updated and then it updates the size of the bar.
        * @method _changeSize
        * @private
        */
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
        
        /*
        * Applys the background image CSS.
        * @method _applyCSS
        * @public
        */
        public _applyCSS() {
            super._applyCSS();
            this.icon.style.backgroundRepeat = this.repeat;
        }
        
        /*
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property horizontal
        * @type boolean
        * @public
        */
        public get horizontal(): boolean {
            return this._horizontal;
        }

        public set horizontal(val: boolean) {
            this._horizontal = val;
            this._changeSize();
        }

        /*
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property vertical
        * @type boolean
        * @public
        */
        public get vertical(): boolean {
            return !this._horizontal;
        }

        public set vertical(val: boolean) {
            this._horizontal = !val;
            this._changeSize();
        }

    }

}