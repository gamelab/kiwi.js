/**
* @module HUD
* @submodule Widget
*/

module Kiwi.HUD.Widget {
    
    /**
    * A Widget for that is used for the management/displaying of a Menu. 
    * This class is primarily used as a manager of MenuItems, so on this class you can create/add MenuItems
    * and styles that you want applyed to all MenuItems. 
    * 
    * @class Menu
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this Menu belongs to.
    * @param x {number} Its position on the x-axis.
    * @param y {number} Its position on the y -axis.
    * @return {Menu}
    */
    export class Menu extends Kiwi.HUD.HUDWidget {
        
        constructor(game: Kiwi.Game, x: number, y: number) {
            super(game, 'menu', x, y);

            this._menuItems = [];
            this._styles = [];
            this.class = 'kiwi-menu-widget kiwi-widget';
        }
        
        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType():string {
            return 'MenuWidget';
        }
        
        /**
        * Contains a list of all of the menu items that are currently on this menu.
        * @property _menuItems
        * @type MenuItem[]
        * @private
        */
        private _menuItems: Kiwi.HUD.Widget.MenuItem[];

        /**
        * Sets the style of all of the icons that will be on this menu.
        * @method setStyle
        * @param index {string}
        * @param value {string}
        * @public
        */
        public setIconStyle(index: string, value: string) {
            this._styles.push(({ 'index': index, 'value': value }));

            for (var i = 0; i < this._menuItems.length; i++) {
                this._menuItems[i].style[index] = value;
            }
        }

        /**
        * An array containing all of the styles that are/will be applyed to each MenuIcon.
        * @property _styles
        * @type Array
        * @private
        */
        private _styles: any[];

        /**
        * Returns a list that contains all of the menu items (buttons) that are currently on this menu.
        * Note: The array itself is READ ONLY but you can modify the objects contained inside of it.
        * @property menuItems
        * @type MenuItem[]
        * @public
        */
        public get menuItems(): Kiwi.HUD.Widget.MenuItem[] {
            return this._menuItems;
        }
        
        /**
        * Creates a new menu item and add's it to this menu.
        * @method createMenuItem
        * @param text {string} The text that you would like the menu item to have.
        * @param x {number} The x position of the menu item you are wanting to add.
        * @param y {number} The y position of the menu item you are wanting to add.
        * @return {MenuItem} The newly created MenuItem.
        * @public
        */
        public createMenuItem(text:string,x:number,y:number): Kiwi.HUD.Widget.MenuItem {
            return this.addMenuItem(new Kiwi.HUD.Widget.MenuItem(this.game, text, x, y));
        }

        /**
        * Adds a MenuItem to this menu.
        * @method addMenuItem
        * @param item {MenuItem} The MenuItem that you would like to add to this menu.
        * @return {MenuItem}
        * @public 
        */
        public addMenuItem(item: Kiwi.HUD.Widget.MenuItem): Kiwi.HUD.Widget.MenuItem {
            this._menuItems.push(item);
            item.menu = this;

            for (var i = 0; i < this._styles.length; i++) {
                item.style[this._styles[i].index] = this._styles[i].value;
            }

            if (this._device == Kiwi.TARGET_BROWSER) {
                this.container.appendChild(item.container);
            }

            return item;
        }

        /**
        * Adds multiple MenuItems to this Menu.
        * @method addMenuItems
        * @param items {MenuItem[]} The array containing all of the menu items you want to add.
        * @public 
        */
        public addMenuItems(items: Kiwi.HUD.Widget.MenuItem[]) {
            for (var i = 0; i < items.length; i++) {
                this.addMenuItem(items[i]);
            }
        }

        /**
        * Returns a MenuItem based on its corresponding numeric position that you pass in the array. 
        * @method getMenuItem
        * @param val {Number} 
        * @return {Kiwi.HUD.Widget.MenuItem}
        * @public
        */
        public getMenuItem(val: number):Kiwi.HUD.Widget.MenuItem {
            return this._menuItems[val];
        }

        /**
        * Currently not supported or working.
        * @method setTemplate 
        * @param main {string}
        * @param [sub] {string}
        * @public
        */
        public setTemplate(main: string, sub?: string) {
            if (false) {
                var mainElement = document.getElementById(main)
                if (mainElement === undefined) {
                    return;
                }

                var subElements = mainElement.getElementsByTagName(sub);
                if (subElements === undefined) {
                    return;
                }

                super.setTemplate(main);
                //do something with each item
            }
        }

        /**
        * Currently not working.
        * @method removeTemplate
        * @public 
        */
        public removeTemplate() {

        }
        
        /**
        * The update loop.
        * @method update
        * @public 
        */
        public update() {
            for (var i = 0; i < this._menuItems.length; i++) {
                this._menuItems[i].update();
            }
            super.update();
        }

    }

}