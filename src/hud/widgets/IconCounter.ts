
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

module Kiwi.HUD {

    export class IconCounter extends Kiwi.HUD.Icon {

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
        constructor(cacheID: string, cache: Kiwi.Cache, current: number, max: number, x: number, y: number) {
            
            super(cacheID, cache, x, y);

            this._horizontal = true;

            this.range = this.components.add(new Kiwi.Components.Range(current, max, 0));
            this.range.updated.add(this._changeSize, this);

            this._changeSize();
           // this._applyCSS();
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
        public range: Kiwi.Components.Range;

        /**
        * Gets called when the range has updated and then it updates the size of the bar.
        * @private
        **/
        private _changeSize() {
            
            if (this._horizontal) {
                this.texture.repeat('repeat-x');
                this.size.setTo(this.texture.file.data.width * this.range.current(), this.texture.file.data.height);
            } else {
                this.texture.repeat('repeat-y');
                this.size.setTo(this.texture.file.data.width, this.texture.file.data.height * this.range.current());
            }

        }
        
        /**
        * Applys the background image CSS.
        * @public
        **/
        /*
        public _applyCSS() {
            super._applyCSS();
            this.icon.style.backgroundRepeat = this.texture.repeat();
            this.icon.style.backgroundSize = this.texture.file.data.width + 'px ' + this.texture.file.data.height + 'px';
        }
        */


        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @param {boolean} val
        * @return {boolean} 
        **/
        public horizontal(val?: boolean): boolean {
            if (val !== undefined) {
                this._horizontal = val;
                this._changeSize();
            }
            return this._horizontal;
        }

        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @param {boolean} val
        * @return {boolean} 
        **/
        public vertical(val?: boolean): boolean {
            if (val !== undefined) {
                this._horizontal = !val;
                this._changeSize();
            }
            return !this._horizontal;
        }

    }

}