/// <reference path="Textfield.ts" />

/*
 *	Kiwi - HUD - BasicScore
 *
 *	@desc		A HUDWidget that controls and displays a score.
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

    
    export class BasicScore extends Kiwi.HUD.Widget.TextField {
       
        /**
        *
        * @constructor
        * @param {number} x
        * @param {number} y
        **/
        constructor(x: number, y: number) {
            super("basicScore", x, y);
            this.counter = this.components.add(new Kiwi.HUD.Components.Counter(0, 1));
            this.counter.updated.add(this._updateText, this);
        }

        /**
        * Holds the reference to the counter component.
        * @public
        **/
        public counter: Kiwi.HUD.Components.Counter;
        
        /**
        * Updates the text when someone modifies the counter.
        * @private
        **/
        private _updateText() {
            this.text( String(this.counter.value) );
        }


    }

}
