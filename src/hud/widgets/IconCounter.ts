
module Kiwi.HUD {

    export class IconCounter extends Kiwi.HUD.Icon {

        //to be done.... Do it later...
        constructor(cacheID: string, cache: any, current: number, max: number, x: number, y: number) {
            
            super(cacheID, cache, x, y);

            if (cache.checkImageCacheID(cacheID, cache) == false)
            {
                console.log('Missing texture', cacheID);
                return;
            }

            this._horizontal = true;

            this._current = current;

            this.range = this.components.add(new Kiwi.Components.Range(current, max, 0));
            
            this._applyCSS();
        }

        private _current: number;

        private _horizontal: boolean;

        public range: Kiwi.Components.Range;

        public _applyCSS() {
            if (this._current === undefined)     return;
            

            this.icon.style.backgroundImage = 'url("' + this.texture.getURL() + '")';

            if (this._horizontal) {
                this.icon.style.backgroundRepeat = 'repeat-x';
                this.size.setTo(this.texture.file.data.width * this.range.current(), this.texture.file.data.height);
            } else {
                this.icon.style.backgroundRepeat = 'repeat-y';
                this.size.setTo(this.texture.file.data.width, this.texture.file.data.height * this.range.current());
            }
            this.size.setCSS(this.icon);
            this.icon.style.backgroundSize = this.texture.file.data.width+'px '+this.texture.file.data.height+'px';
            
        }

        //sets the bar to vertical
        public horizontal(val?: boolean): boolean {
            if (val !== undefined) {
                this._horizontal = val;
                this._applyCSS();
            }
            return this._horizontal;
        }

        //sets the bar to horizontal
        public vertical(val?: boolean): boolean {
            if (val !== undefined) {
                this._horizontal = !val;
                this._applyCSS();
            }
            return !this._horizontal;
        }

        public update() {
            if (this._current != this.range.current()) {
                this._applyCSS();
                this._current = this.range.current();
            }
            super.update();
        }


    }

}