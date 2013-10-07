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
    * @class IconBar
    * @extends HUDWidget
    * @constructor
    * @param game {Game} The game that this icon bar belongs to.
    * @param atlas {TextureAtlas} The texture atlas that the icons will have.
    * @param current {number} The current amount of icons in the bar.
    * @param max {number} The maximum number of icons.
    * @param x {number} The x coordinates of the first icon.
    * @param y {number} The y coordinates of the last icon.
    * @return {IconBar}
    */
    export class IconBar extends Kiwi.HUD.HUDWidget {

        constructor(game:Kiwi.Game, atlas: Kiwi.Textures.TextureAtlas, current: number, max: number, x: number, y: number) {
            
            super(game, 'IconBar', x, y);

            this.atlas = atlas;
            this.width = this.atlas.cells[0].w;
            this.height = this.atlas.cells[0].h;
            this._horizontal = true;
           
            this.range = this.components.add(new Kiwi.HUD.Components.Range(this, current, max, 0));
            this.range.updated.add(this._amountChanged, this);

            this._icons = [];
            this._amountChanged();
        }

        public objType():string {
            return 'IconBarWidget';
        }

        //spacing between each one. Someother stuff...

        public atlas: Kiwi.Textures.TextureAtlas;

        private width: number;

        private height: number;

        /**
        * Knowledge of whether the icons should be horizontal or vertical
        * @property _horizontal
        * @type boolean
        * @default true
        * @private
        */
        private _horizontal: boolean;

        /**
        * Holds the range component.
        * @property range
        * @type Range
        * @public
        */
        public range: Kiwi.HUD.Components.Range;

        /**
        * An array of all of the icons on the screen.
        * @property icons
        * @type Icon[]
        * @private
        */
        private _icons: Kiwi.HUD.Widget.Icon[];

        /**
        * Gets called when the range has updated and then it updates the size of the bar.
        * @method _changeSize
        * @private
        */
        private _amountChanged() {

            //do we need to do something to the icons?!?
            if (this.range.max !== this._icons.length) {
                if ((this.range.max) > this._icons.length) {
                    //add more
                    var amount = (this.range.max) - this._icons.length;
                    for (var i = 0; i < amount; i++) {
                        this._addIcon();
                    }
                } else {
                    //remove some
                    for (var i = this.range.max; i < this._icons.length; i++) {
                        this._removeIcon(this._icons[i]);
                        this._icons[i].destroy();
                        this._icons.splice(i, 1);
                        i--;
                    }
                }
            }

            //display them all!
            for (var i = 0; i < this._icons.length; i++) {
                if (i > this.range.current) {
                    this._icons[i].style.display = 'none';
                } else {
                    this._icons[i].style.display = 'block';
                }
            }
        }

        private _addIcon() {
            if (this.horizontal) {
                var i = new Kiwi.HUD.Widget.Icon(this.game, this.atlas, this.x + (this.width * (this._icons.length - 1)), this.y);
            } else {
                var i = new Kiwi.HUD.Widget.Icon(this.game, this.atlas, this.x, (this.height * (this._icons.length - 1)) + this.y);
            }
            this._icons.push(i);
            if (this._device == Kiwi.TARGET_BROWSER) {
                this.container.appendChild(i.container);
            }
        }

        private _removeIcon(icon:Kiwi.HUD.Widget.Icon) {
            if (this._device == Kiwi.TARGET_BROWSER) {
                this.container.removeChild(icon.container);
            }
        }
        
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property horizontal
        * @type boolean
        * @default true
        * @public
        */
        public get horizontal(): boolean {
            return this._horizontal;
        }

        public set horizontal(val: boolean) {
            this._horizontal = val;
            this._amountChanged();
        }

        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property vertical
        * @type boolean
        * @default false
        * @public
        */
        public get vertical(): boolean {
            return !this._horizontal;
        }
        public set vertical(val: boolean) {
            this._horizontal = !val;
            this._amountChanged();
        }

    }

}