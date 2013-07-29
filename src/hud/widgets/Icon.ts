module Kiwi.HUD {

    export class Icon extends Kiwi.HUD.HUDWidget {

        constructor(cacheID, cache, x, y) {

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

        public texture: Kiwi.Components.Texture;

        public size: Kiwi.Components.Size;

        public icon: HTMLElement;

        private _changeTexture(value:string, width:number, height:number) {    
            this.size.setTo(width, height);
        }

        public _removeCSS() {
            this.icon.style.width = '';
            this.icon.style.height = '';
            this.icon.style.backgroundImage = '';
            this.icon.style.backgroundRepeat = '';
            this.icon.style.backgroundSize = '';
        }

        public _applyCSS() {
            this.size.setCSS(this.icon);
            this.icon.style.backgroundImage = 'url("' + this.texture.getURL() + '")';
            this.icon.style.backgroundRepeat = 'no-repeat';
            this.icon.style.backgroundSize = '100%';
        }

        public update() {
            super.update();
        }
        
        public setTemplate(main: string, icon?: string) {  

            this._removeCSS();

            super.setTemplate(main, icon);
            
            if (this.tempElement !== undefined) {
                this.icon = this.tempElement;
            }

            this._applyCSS();

            return true;

        }

        public removeTemplate() {

            super.removeTemplate();

            this._removeCSS();
            this.icon = this.container;
            this._applyCSS();

            return true;
        }

    }

}