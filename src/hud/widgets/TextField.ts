/*
 *	Kiwi - HUD - Textfield
 *
 *	@desc		Used for the display of simple text.
 *
 *	@version	1.0 - 26th July 2013
 *				
 *  @author     Ross Kettle
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.HUD.Widget {

    // Class
    export class TextField extends Kiwi.HUD.HUDWidget {
        
        /*
        *
        * @constructor
        * @param {string} text
        * @param {number} x
        * @param {number} y
        */
        constructor(text:string,x:number,y:number) {
            super("textField",x,y);
            
            this._text = text;

            this._textField = this.container;
            this._textField.innerText = text;

        }

        /*
        * The text current being displayed
        * @private
        */
        private _text: string;

        /*
        * The htmlelement that is being used as the textfield.
        * @private
        */
        private _textField: HTMLElement;
        
        /*
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        * 
        * @method setTemplate
        * @param {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget. 
        * @param {string} icon - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        */
        public setTemplate(main: string, field?: string) {

            this._textField.innerText = '';
            super.setTemplate(main, field);

            if (this.tempElement !== undefined) {
                this._textField = this.tempElement;
            }
            this._textField.innerText = this._text;

        }

        /*
        * Used to remove any the template HTML from this HUDWidget.
        * 
        * @method removeTemplate
        */
        public removeTemplate() {
            
            super.removeTemplate();

            this._textField = this.container;
            this._textField.innerText = this._text;
        }

        /*
        * Change the text that is currently being displayed.
        * @param {string} val
        * @return {string}
        */
        public text(val?: string):string {
            if (val !== undefined) {
                this._text = val;
                this._textField.innerText = this._text;
            }
            return this._text;
        }

    }

}
