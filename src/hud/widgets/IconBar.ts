/**
*
* @module HUD
* @submodule Widget
*/

module Kiwi.HUD.Widget {

    /**
    * The IconBar used to display a series of icons which represent a number of 'something' the user may have. 
    * Example: If you had a shooter style game you might want to display the amount of 'ammo' left in the gun using a series of bullet icons. You could then use this IconBar to display that series.
    * The amount is based of a counter components current value, so you can set a maximum and minimum number of images to be displayed.
    *
    * @class IconBar
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
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

            this.class = 'kiwi-iconbar-widget kiwi-widget';
            this.atlas = atlas;
            this.width = this.atlas.cells[0].w;
            this.height = this.atlas.cells[0].h;
            this._horizontal = true;
            
            this.counter = this.components.add(new Kiwi.HUD.HUDComponents.Counter(this, current, max, 0));
            this.counter.updated.add(this._amountChanged, this);

            this._icons = [];
            this._amountChanged();
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType():string {
            return 'IconBarWidget';
        }

        /**
        * The amount of spacing you want between each icon in the bar. Defaults to 0.
        * @property iconGap
        * @type number
        * @default 0
        * @public
        */
        public iconGap: number = 0;

        /**
        * The texture atlas that each Icon inside the IconBar will use.
        * @property atlas
        * @type TextureAtlas
        * @public
        */
        public atlas: Kiwi.Textures.TextureAtlas;

        /**
        * The width of a single Icon in the bar. This is based on the width of the first cell in the atlas.
        * @property width
        * @type number
        * @private
        */
        private width: number;

        /**
        * The height of a single Icon in the bar. This is based on the height of the first cell in the atlas.
        * @property height
        * @type number
        * @private
        */
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
        * Holds the counter component.
        * @property counter
        * @type Counter
        * @public
        */
        public counter: Kiwi.HUD.HUDComponents.Counter;

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
            if (this.counter.max !== this._icons.length) {
                if ((this.counter.max) > this._icons.length) {
                    //add more
                    var amount = (this.counter.max) - this._icons.length;
                    for (var i = 0; i < amount; i++) {
                        this._addIcon();
                    }
                } else {
                    //remove some
                    for (var i = this.counter.max; i < this._icons.length; i++) {
                        this._removeIcon(this._icons[i]);
                        this._icons[i].destroy();
                        this._icons.splice(i, 1);
                        i--;
                    }
                }
            }

            //display them all!
            for (var i = 0; i < this._icons.length; i++) {
                if (i > (this.counter.current - 1)) {
                    this._icons[i].style.display = 'none';
                } else {
                    this._icons[i].style.display = 'block';
                }
            }
        }

        /**
        * Creates a new Icon and adds it to this IconBar.
        * @method _addIcon
        * @private
        */
        private _addIcon() {
            if (this.horizontal) {
                var i: Kiwi.HUD.Widget.Icon = new Kiwi.HUD.Widget.Icon(this.game, this.atlas, this.x + ((this.width + this.iconGap) * (this._icons.length - 1)), this.y);
            } else {
                var i: Kiwi.HUD.Widget.Icon = new Kiwi.HUD.Widget.Icon(this.game, this.atlas, this.x, ((this.height + this.iconGap) * (this._icons.length - 1)) + this.y);
            }

            this._icons.push(i);
            if (this._device == Kiwi.TARGET_BROWSER) {
                this.container.appendChild(i.container);
            }
        }

        /**
        * Removes a Icon from the container.
        * @method _removeIcon
        * @param icon {Icon} The icon that you want to remove
        * @private
        */
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