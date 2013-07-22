/// <reference path="..\..\Kiwi.ts" />

module Kiwi.HUD {

    export class Bar extends Kiwi.HUD.HUDWidget {

        constructor(current: number, max:number, x:number,y:number) {
            super("bar", x, y);

            this._horizontal = true;
            this._min = 0;
            this._current = current;
            this._max = max;
            
            this._bar = document.createElement('div');
            this._bar.className = 'innerBar';

            this.bar = this._bar;
            this.container.appendChild(this.bar);

            this._bar.style.height = '100%';
            this._bar.style.width = '100%';
            
            this.updateCSS();
        }

        private _horizontal: boolean;

        private _min: number;   //perhaps add these to a component?

        private _max: number;

        private _current: number;
        
        public bar: HTMLElement;

        private _bar: HTMLElement;

        private _tempContainer: HTMLElement;

        private _tempParent: HTMLElement;

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

        //maximum value
        public max(val?:number) {
            if (val !== undefined) {
                this._max = val;
                this.updateCSS();
            }
            return this._max;
        }

        //minimum value
        public min(val?: number) {
            if (val !== undefined) {
                this._min = val;
                this.updateCSS();
            }
            return this._min;
        }

        //current value
        public current(val?: number) {
            if (val !== undefined) {
                if (this._current > this._max) {
                    this._current = this._max;
                } else if (this._current < this._min) {
                    this._current = this._min;
                } else {
                    this._current = val;
                }
                this.updateCSS();
            }
            return this._current;
        }

        //decrease the value
        public decrease(val: number=1) {
            if (this._current > this._min) {
                if (this._current - val < this._min) {
                    this._current = this._min;
                } else {
                    this._current -= val;
                }
                this.updateCSS();
            }
        }

        //increase the value
        public increase(val: number= 1) {
            if (this._current < this._max) {
                if (this._current + val > this._max) {
                    this._current = this._max;
                } else {
                    this._current += val;
                }
                this.updateCSS();
            }
        }

        //gets the current value as a percentage of the maximum vlae
        public currentPercent():number {
            return ((this.current() - this.min()) / (this.max() - this.min())) * 100;
        }

        //sets the template
        public setTemplate(main: string, innerbar: string):boolean {

            var containerElement: HTMLElement = document.getElementById(main);
            if (containerElement === undefined) {
                console.log('Container element not found');
                return false;
            }

            var fieldElement: HTMLElement = document.getElementById(innerbar);
            if (fieldElement === undefined || containerElement.contains(fieldElement) === false) {
                console.log('Field element not found inside container');
                return false;
            }

            this.container.removeChild(this.bar);
            this.bar = fieldElement;

            this._tempContainer = containerElement;
            this._tempParent = containerElement.parentElement;
            this._tempParent.removeChild(containerElement);
            this.container.appendChild(containerElement);
            this.updateCSS();

            return true;
        }

        //removes the template
        public removeTemplate() {

            if (this.bar === this._bar) {
                console.log('No template is currently in affect');
                return false
            }

            this.container.removeChild(this._tempContainer);
            this._tempParent.appendChild(this._tempContainer);

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