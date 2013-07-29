
module Kiwi.HUD {

    export class IconCounter extends Kiwi.HUD.Icon {

        constructor(cacheID: string, cache: any, current: number, max: number, x: number, y: number) {
            
            super(cacheID, cache, x, y);

            this._horizontal = true;

            this._current = current;

            this.range = this.components.add(new Kiwi.Components.Range(current, max, 0));
            this.range.updated.add(this._changeSize, this);

            this._changeSize();
            this._applyCSS();
        }

        private _current: number;

        private _horizontal: boolean;

        public range: Kiwi.Components.Range;

        public _changeSize() {
            
            if (this._horizontal) {
                this.texture.repeat('repeat-x');
                this.size.setTo(this.texture.file.data.width * this.range.current(), this.texture.file.data.height);
            } else {
                this.texture.repeat('repeat-y');
                this.size.setTo(this.texture.file.data.width, this.texture.file.data.height * this.range.current());
            }

        }

        public _applyCSS() {
            super._applyCSS();
            this.icon.style.backgroundRepeat = this.texture.repeat();
            this.icon.style.backgroundSize = this.texture.file.data.width + 'px ' + this.texture.file.data.height + 'px';
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