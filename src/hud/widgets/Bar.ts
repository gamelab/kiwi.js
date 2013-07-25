/// <reference path="..\..\Kiwi.ts" />

module Kiwi.HUD {

    export class Bar extends Kiwi.HUD.HUDWidget {

        constructor(current: number, max:number, x:number,y:number) {
            super("bar", x, y);

            this._horizontal = true;
            this._bar = document.createElement('div');
            this._bar.className = 'innerBar';

            this.range = this.components.add(new Kiwi.Components.Range(current, max, 0));//add updated component to range
            this.range.updated.add(this.updateCSS, this);

            this.bar = this._bar;
            this.container.appendChild(this.bar);

            this._bar.style.height = '100%';
            this._bar.style.width = '100%';
            
            this.updateCSS();
        }

        //knows if the bar is horizontal or not
        private _horizontal: boolean;

        //the currently used bar
        public bar: HTMLElement;

        //the bar made by the manager
        private _bar: HTMLElement;

        public range: Kiwi.Components.Range;

        //sets the bar to vertical
        public horizontal(val?: boolean):boolean {
            if (val !== undefined) {
                this._horizontal = val;
                this.updateCSS();
            }
            return this._horizontal;
        }

        //sets the bar to horizontal
        public vertical(val?: boolean):boolean {
            if (val !== undefined) {
                this._horizontal = !val;
                this.updateCSS();
            }
            return !this._horizontal;
        }


        //sets the template
        public setTemplate(main: string, innerbar?: string) {

            super.setTemplate(main, innerbar);

            if (this.tempElement !== undefined) {
                this.bar = this.tempElement;
            }

        }

        //removes the template
        public removeTemplate() {
            super.removeTemplate();

            this.bar = this._bar;
            this.container.appendChild(this.bar);
            this.updateCSS();
        }

        public updateCSS() {
            //update the CSS
        }

        public update() {
            super.update();
        }

        public render() {

        }

    }


}