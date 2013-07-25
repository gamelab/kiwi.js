/// <reference path="..\..\Kiwi.ts" />

module Kiwi.HUD {

    export class Bar extends Kiwi.HUD.HUDWidget {
        
        /**
        *
        * @constructor 
        * @param {number} current - The current value.
        * @param {number} max - The maximum value.
        * @param {number} x 
        * @param {number} y
        **/
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
        
        /**
        * Knows if this bar is ment to be horizontal or veritical
        * @private 
        **/
        private _horizontal: boolean;
        
        /**
        * The HTMLElement that is currently being used as the 'bar'.
        * @public
        **/
        public bar: HTMLElement;

        /**
        * A reference to the HTMLElement that this class always generates.
        * @private
        **/
        private _bar: HTMLElement;
        
        /**
        * The range component.
        * @public
        **/
        public range: Kiwi.Components.Range;
        
        /**
        * Used to set the bar to be horizontal or vertical by passing a 
        * @param {boolean} val
        * @public
        **/
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