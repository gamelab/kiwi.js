/**
*
* @module HUD
* @submodule Widget
*
*/

module Kiwi.HUD.Widget {
    
    /**
    * @class Button
    * @extends TextField
    * @constructor
    * @param game {game} The game that this belongs to.
    * @param x {number} The x-coordnates of this Widget.
    * @param y {number} The y-coordinates of this Widget.
    * @return {Button}
    */
    export class Button extends Kiwi.HUD.Widget.TextField {

        constructor(game: Kiwi.Game, x: number, y: number) {

            super(game, 'button', x, y);
            this.input = this.components.add(new Kiwi.HUD.Components.WidgetInput(this, this.container));
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
        public input: Kiwi.HUD.Components.WidgetInput;

    }

}