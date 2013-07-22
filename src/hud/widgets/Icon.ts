module Kiwi.HUD {

    export class Icon extends Kiwi.HUD.HUDWidget {

        constructor(cacheID, cache, x, y) {

            super('Icon', x, y);

            if (cache.checkImageCacheID(cacheID, cache) == false)
            {
                console.log('Missing texture', cacheID);
                return;
            }

            this._cache = cache;
            this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, cache));
            this.size = this.components.add(new Kiwi.Components.Size(this.texture.file.data.width, this.texture.file.data.height));

            this.icon = this.container;
            this._applyCSS();
        }

        private _cache: any;

        public texture: Kiwi.Components.Texture;

        public size: Kiwi.Components.Size;

        public icon: HTMLElement;

        private _tempContainer: HTMLElement;

        private _tempParent: HTMLElement;

        public changeIcon(cacheID) {

            if (this._cache.checkImageCacheID(cacheID, this._cache) == false)
            {
                console.log('Missing texture', cacheID);
                return;
            }

            this.components.removeComponent(this.texture, true);
            this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, this._cache));

            this.size.setTo(this.texture.file.data.width, this.texture.file.data.height);
            this._applyCSS();
        }

        private _removeCSS() {
            this.icon.style.width = '';
            this.icon.style.height = '';
            this.icon.style.backgroundImage = '';
            this.icon.style.backgroundRepeat = '';
            this.icon.style.backgroundSize = '';
        }

        private _applyCSS() {
            this.size.setCSS(this.icon);
            this.icon.style.backgroundImage = 'url("' + this.texture.getURL() + '")';
            this.icon.style.backgroundRepeat = 'no-repeat';
            this.icon.style.backgroundSize = '100%';
        }

        public update() {
            super.update();
        }
        
        public setTemplate(main: string, icon: string): boolean {   //optimise a little

            var containerElement: HTMLElement = document.getElementById(main);
            if (containerElement === undefined) {
                console.log('Container element not found');
                return false;
            }

            var fieldElement: HTMLElement = document.getElementById(icon);
            if (fieldElement === undefined || containerElement.contains(fieldElement) === false) {
                console.log('Field element not found inside container');
                return false;
            }

            this._removeCSS();

            this.icon = fieldElement;
            this._tempContainer = containerElement;
            this._tempParent = containerElement.parentElement;
            this._tempParent.removeChild(containerElement);
            this.container.appendChild(containerElement);

            this._applyCSS();

            return true;

        }

        public removeTemplate():boolean {

            if (this.icon === this.container) {
                console.log('No template is currently in affect');
                return false;
            }

            this.container.removeChild(this._tempContainer);
            this._tempParent.appendChild(this._tempContainer);

            this._removeCSS();
            this.icon = this.container;
            this._applyCSS();

            return true;
        }

    }

}