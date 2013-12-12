/**
*
* @module HUD
* @submodule Widget
*
*/

module Kiwi.HUD.Widget {
    
    /**
    * Used to display a cell from a TextureAtlas in the HUD. This could be used for portraits of the character, e.t.c.
    * You can change the current cell that is being used in the TextureAtlas by modifing the cellIndex property.
    *
    * @class Icon
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this icon belongs to.
    * @param atlas {TextureAtlas} The image that you would like displayed.
    * @param x {number} The coordinate of the icon on the x-axis.
    * @param y {number The coordinate of the icon on the y-axis.
    * @return {Icon}
    */
    export class Icon extends Kiwi.HUD.HUDWidget {

        constructor(game:Kiwi.Game, atlas: Kiwi.Textures.TextureAtlas, x:number, y:number) {

            super(game, 'Icon', x, y);

            this.class = 'kiwi-icon-widget kiwi-widget';
            this.atlas = atlas;
            this.icon = this.container;
            this._applyCSS();
        }

        /**
        * Holds the texture atlas that is being used
        * @property atlas
        * @type TextureAtlas
        * @public
        */
        public atlas: Kiwi.Textures.TextureAtlas;
        
        /**
        * The cell inside the texture atlas that this icon is using
        * @property _cellIndex
        * @type number
        * @default 0
        * @private
        */
        private _cellIndex: number = 0;
        
        /**
        * Gets the cell index that is being used.
        * @property cellIndex
        * @type number
        * @default 0 
        * @public
        */
        public get cellIndex(): number {
            return this._cellIndex;
        }
        public set cellIndex(value: number) {
            this._cellIndex = value;
            this.width = this.atlas.cells[this.cellIndex].w;
            this.height = this.atlas.cells[this.cellIndex].h;
            this._applyCSS();
        }

        /**
        * Returns the width of the cell that is being used.
        * @property width
        * @type number
        * @public
        */
        public get width(): number {
            return this.atlas.cells[this.cellIndex].w;
        }
        
        /**
        * Returns the height of the cell that is being used.
        * @property height
        * @type number
        * @public
        */
        public get height(): number {
            return this.atlas.cells[this.cellIndex].h;
        }

        /**
        * Is a reference to the element that the icon CSS is being applyed to.
        * @property icon
        * @type HTMLElement
        * @public
        */
        public icon: HTMLElement;

        /**
        * Removes the CSS from the Icon.
        * This can happen when setting/removing a template and is public to allow for overriding from subclasses.
        * @method _removeCSS
        * @protected
        */
        public _removeCSS() {
            this.icon.style.width = '';
            this.icon.style.height = '';
            this.icon.style.backgroundImage = '';
            this.icon.style.backgroundRepeat = '';
            this.icon.style.backgroundSize = '';
        }

        /**
        * Applys the css to the HTMLElement that is to be affected. 
        * @method _applyCSS
        * @protected
        */
        public _applyCSS() {
            this.icon.style.width = this.width + "px";
            this.icon.style.height = this.height + "px";
            this.icon.style.backgroundSize = "100%";
            this.icon.style.backgroundPositionX = -this.atlas.cells[this.cellIndex].x + "px";
            this.icon.style.backgroundPositionY = -this.atlas.cells[this.cellIndex].y + "px";
            this.icon.style.backgroundImage = 'url("'+this.atlas.image.src+'")';
        }

        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        * Currently not supported.
        *
        * @method setTemplate
        * @param main {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget. 
        * @param icon {string} icon - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        * @public
        */
        public setTemplate(main: string, icon?: string) {  
            if (this._device == Kiwi.TARGET_BROWSER) {
                this._removeCSS();

                super.setTemplate(main, icon);
                
                if (this.tempElement !== undefined) {
                    this.icon = this.tempElement;
                }

                this._applyCSS();
            }
        }

        /**
        * Used to remove any the template HTML from this HUDWidget.
        * 
        * @method removeTemplate
        * @public
        */
        public removeTemplate() {
            if (this._device == Kiwi.TARGET_BROWSER) {
                super.removeTemplate();

                this._removeCSS();
                this.icon = this.container;
                this._applyCSS();
            }
        }

    }

}