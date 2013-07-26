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

module Kiwi.HUD {

    export class Icon extends Kiwi.HUD.HUDWidget {

        /**
        * 
        * @constructor
        * @param {string} cacheID
        * @param {Kiwi.Cache} cache
        * @param {number} x
        * @param {number y
        * @return {Kiwi.HUD.Icon}
        **/
        constructor(cacheID:string, cache:Kiwi.Cache, x:number, y:number) {

            super('Icon', x, y);

            if (cache.checkImageCacheID(cacheID, cache) == false)
            {
                console.log('Missing texture', cacheID);
                return;
            }

            this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, cache));
            this.size = this.components.add(new Kiwi.Components.Size(this.texture.file.data.width, this.texture.file.data.height));
            this.texture.updated.add(this._changeTexture, this);
            this.size.updated.add(this._applyCSS, this);

            this.icon = this.container;
            this._applyCSS();
        }

        /**
        * Holds the texture component
        * @public
        **/
        public texture: Kiwi.Components.Texture;

        /**
        * Holds the size component
        * @public
        **/
        public size: Kiwi.Components.Size;

        /**
        * Is a reference to the element that the icon CSS is being applyed to.
        * @public
        **/
        public icon: HTMLElement;

        /**
        * Callback for when the texture changes
        * @private
        **/
        private _changeTexture(value:string, width:number, height:number) {    
            this.size.setTo(width, height);
        }

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

        /**
        * Apply's the CSS to the current Icon.
        * @public
        **/
        public _applyCSS() {
            this.size.setCSS(this.icon);
            this.icon.style.backgroundImage = 'url("' + this.texture.getURL() + '")';
            this.icon.style.backgroundRepeat = 'no-repeat';
            this.icon.style.backgroundSize = '100%';
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