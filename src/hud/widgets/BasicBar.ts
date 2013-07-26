/// <reference path="Bar.ts" />

/*
 *	Kiwi - HUD - BasicBar
 *
 *	@desc		A widget for the display a basic bar. 
 *
 *	@version	1.0 - 26th July 2013
 *				
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.HUD {

    export class BasicBar extends Kiwi.HUD.Bar {

        /**
        * 
        * @constructor
        * @param {number} current
        * @param {number} max
        * @param {number} x
        * @param {number} y
        * @return {Kiwi.HUD.BasicBar} 
        **/
        constructor( current: number, max: number, x: number, y: number) {
            super( current, max, x, y);
            
            this.container.style.width = '100px';
            this.container.style.height = '20px';
        }

        /**
        * This method updates the CSS of the bar and the progress it has.
        * @method updateCSS
        **/
        public updateCSS() {
            if (this.horizontal() === true) {
                this.bar.style.width = String(this.range.currentPercent()) + '%';
                this.bar.style.height = '100%';
            } else {
                this.bar.style.height = String(this.range.currentPercent()) + '%';
                this.bar.style.width = '100%';
            }
        }

    }

}