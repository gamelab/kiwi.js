/// <reference path="Bar.ts" />

module Kiwi.HUD {

    export class IconBar extends Kiwi.HUD.Bar {

        //to be done....
        constructor(cacheID: string, cache: any, current: number, max: number, x: number, y: number) {
            super(current, max, x, y);

            this.container.style.width = '100px';
            this.container.style.height = '20px';
        }

        //custom css for each bar would go here 
        public updateCSS() {
            if (this.horizontal() === true) {
                this.bar.style.width = String(this.range.currentPercent()) + '%';
                this.bar.style.height = '100%';
            } else {
                this.bar.style.height = String(this.range.currentPercent()) + '%';
                this.bar.style.width = '100%';
            }
        }

        public update() {
            super.update();
        }


    }

}