/**
*
* @module HUD
* @submodule Widget
*
*/

module Kiwi.HUD.Widget {
    
    /**
    * A subclass of the TextField that has its own input component so that you can listen for mouse events on this widget.
    *
    * @class Button
    * @extends TextField
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {game} The game that this belongs to.
    * @param text {string} The text that you want to display inside the button.
    * @param x {number} The x-coordnates of this Widget.
    * @param y {number} The y-coordinates of this Widget.
    * @return {Button}
    */
    export class Button extends Kiwi.HUD.Widget.TextField {

        constructor(game: Kiwi.Game, text:string, x: number, y: number) {

            super(game, text, x, y);

            this.name = 'button';
            this.class = 'kiwi-button-widget kiwi-widget';
            
            this.input = this.components.add(new Kiwi.HUD.HUDComponents.WidgetInput(this, this.container));
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return 'ButtonWidget';
        }
        
        /**
        * The WidgetInput component that handles the management of events for this button.
        * @property input
        * @type WidgetInput
        * @public
        */
        public input: Kiwi.HUD.HUDComponents.WidgetInput;

    }

}