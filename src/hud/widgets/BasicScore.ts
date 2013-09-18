/** 
* A HUDWidget that controls and displays a score.
* @module HUD
* @submodule Widget
*/

module Kiwi.HUD.Widget {

    /**
    * @class BasicScore
    * @extends TextField
    * @constructor
    * @param x {number} x
    * @param y {number} y
    */
    
    export class BasicScore extends Kiwi.HUD.Widget.TextField {
       
        /*
        *
        */
        constructor(x: number, y: number) {
            super("basicScore", x, y);
            this.counter = this.components.add(new Kiwi.HUD.Components.Counter(0, 1));
            this.counter.updated.add(this._updateText, this);
        }

        /*
        * Holds the reference to the counter component.
        * @property counter
        * @type Counter
        * @public
        */
        public counter: Kiwi.HUD.Components.Counter;
        
        /*
        * Updates the text when someone modifies the counter.
        * @method _updateText
        * @private
        */
        private _updateText() {
            this.text( String(this.counter.value) );
        }


    }

}
