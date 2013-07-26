/// <reference path="..\..\Kiwi.ts" />

/*
 *	Kiwi - HUD - Bar
 *
 *	@desc		An abstract class that contains all of the fundametals for the control of a bar widget.
 *
 *	@version	1.0 - 26th July 2013
 *				
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

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
        * Used to set the bar to be horizontal or vertical by passing a boolean.
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

        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @param {boolean} val
        * @public
        **/
        public vertical(val?: boolean):boolean {
            if (val !== undefined) {
                this._horizontal = !val;
                this.updateCSS();
            }
            return !this._horizontal;
        }


        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        * 
        * @method setTemplate
        * @param {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget. 
        * @param {string} innerbar - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        **/
        public setTemplate(main: string, innerbar?: string) {

            super.setTemplate(main, innerbar);

            if (this.tempElement !== undefined) {
                this.bar = this.tempElement;
            }

        }

        /**
        * Used to remove any the template HTML from this HUDWidget.
        * 
        * @method removeTemplate
        **/
        public removeTemplate() {
            super.removeTemplate();

            this.bar = this._bar;
            this.container.appendChild(this.bar);
            this.updateCSS();
        }

        /**
        * Will be called when the range has been updated and thus you will want to preform the render of the bar here.
        * This should be overriden by subclasses so that you have your own custom bars. 
        * @public
        **/
        public updateCSS() {
            //update the CSS
        }

    }


}