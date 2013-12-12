/**
* @module HUD
* @submodule Widget 
*/

module Kiwi.HUD.Widget {
    
    /**
    * A MenuItem extends the Button Widget and is typically contained inside of a Menu Widget. 
    * Since a MenuItem extends the Button Widget you can access the Input Component that it has to listen to mouse events.
    *
    * @class MenuItem
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @contructor
    * @param game {Game} The game that this MenuItem belongs to.
    * @param text {string} The text that is to be inside the menuitem.
    * @param x {number} The position of this menu item on the x-axis.
    * @param y {number} The position of this menu item on the y-axis.
    * @return {Button}
    */
    export class MenuItem extends Kiwi.HUD.Widget.Button {

        constructor(game:Kiwi.Game, text:string, x: number, y: number) {
            
            super(game, text, x, y);

            this.name = 'menuItem';
            this.class = 'kiwi-menuitem-widget kiwi-widget';

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType():string {
            return 'MenuItem';
        }

        /**
        * The Menu that this belongs to.
        * @property menu
        * @type Menu
        * @public
        */
        public menu: Kiwi.HUD.Widget.Menu;

    }

}