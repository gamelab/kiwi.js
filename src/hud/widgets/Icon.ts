/*
 *	Kiwi - HUD - Icon
 *
 *	@desc		A HUDWidget for displaying a image, such as a portrait of you character in the HUD. 
 *
 *	@version	1.0 - 26th July 2013
 *				
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.HUD.Widget {

    export class Icon extends Kiwi.HUD.HUDWidget {

        /**
        * 
        * @constructor
    
    
        * @param {number} x
        * @param {number y
        * @return {Kiwi.HUD.Icon}
        **/
        constructor(atlas: Kiwi.Textures.TextureAtlas, x:number, y:number) {

            super('Icon', x, y);

            this.atlas = atlas;

            this.icon = this.container;
            this._applyCSS();
        }

        /**
        * Holds the texture atlas that is being used
        * @public
        **/
        public atlas: Kiwi.Textures.TextureAtlas;
        
        /*
        * The cell inside the texture atlas that this icon is using
        * @property _cellIndex
        * @type number
        */
        private _cellIndex: number = 0;
        
        /*
        * Gets the cell index that is being used.
        * @type number
        */
        public get cellIndex(): number {
            return this._cellIndex;
        }
        
        /*
        * Sets the cell index that is to be used.
        * @type number
        */
        public set cellIndex(value: number) {
            this._cellIndex = value;
            this.width = this.atlas.cells[this.cellIndex].w;
            this.height = this.atlas.cells[this.cellIndex].h;
            this._applyCSS();
        }

        /*
        * Returns the width of the cell that is being used.
        * @type number
        */
        public get width(): number {
            return this.atlas.cells[this.cellIndex].w;
        }
        
        /*
        * Returns the height of the cell that is being used.
        * @type number
        */
        public get height(): number {
            return this.atlas.cells[this.cellIndex].h;
        }

        /**
        * Is a reference to the element that the icon CSS is being applyed to.
        * @public
        **/
        public icon: HTMLElement;

        /**
        * Removes the CSS from the Icon. 
        * This can happen when setting/removing a template and is public to allow for overriding from subclasses.
        * @public
        **/
        public _removeCSS() {
            this.icon.style.width = '';
            this.icon.style.height = '';
            this.icon.style.backgroundImage = '';
            this.icon.style.backgroundRepeat = '';
            this.icon.style.backgroundSize = '';
        }

        /*
        * Updates/Applys the css that is to be applyed.
        *
        */
        public _applyCSS() {
            this.icon.style.width = this.width + "px";
            this.icon.style.height = this.height + "px";
            this.icon.style.backgroundSize = "100%";
            this.icon.style.backgroundPositionX = -this.atlas.cells[this.cellIndex].x + "px";
            this.icon.style.backgroundPositionY = -this.atlas.cells[this.cellIndex].y + "px";
            this.icon.style.backgroundImage = this.atlas.image.src;
        }

        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        * 
        * @method setTemplate
        * @param {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget. 
        * @param {string} icon - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        **/
        public setTemplate(main: string, icon?: string) {  

            this._removeCSS();

            super.setTemplate(main, icon);
            
            if (this.tempElement !== undefined) {
                this.icon = this.tempElement;
            }

            this._applyCSS();

        }

        /**
        * Used to remove any the template HTML from this HUDWidget.
        * 
        * @method removeTemplate
        **/
        public removeTemplate() {

            super.removeTemplate();

            this._removeCSS();
            this.icon = this.container;
            this._applyCSS();
        }

    }

}