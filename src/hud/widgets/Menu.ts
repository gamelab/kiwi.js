/// <reference path="../../Kiwi.ts" />

module Kiwi.HUD.Widget {

    export class Menu extends Kiwi.HUD.HUDWidget {

        constructor(game: Kiwi.Game, x: number, y: number) {

            super('menu', x, y);

            this.game = game;
            this._menuItems = [];

        }

        public game: Kiwi.Game;

        private _menuItems: Kiwi.HUD.Widget.MenuItem[];

        public addMenuItem(item: Kiwi.HUD.Widget.MenuItem): Kiwi.HUD.Widget.MenuItem {
            this._menuItems.push(item);
            //this.container.appendChild(item.container);
            item.addedToStage(this.game, this);

            return item;
        }

        //add multiple menu items
        public addMenuItems(items: Kiwi.HUD.Widget.MenuItem[]) {
            for (var i = 0; i < items.length; i++) {
                this.addMenuItem(items[i]);
            }
        }

        //get a menu item - need to test
        public getMenuItem(val: any): Kiwi.HUD.Widget.MenuItem {
            if (typeof val === 'string') {
                var menuItem;
                for (var i = 0; i < this._menuItems.length; i++) {
                    if (this._menuItems[i].name == val) {
                        menuItem = this._menuItems[i];
                    }
                }
                return menuItem;
            } 
            if (typeof val === 'number') {
                return this._menuItems[val];
            }
        }

        //does nothing just yet
        public setTemplate(main:string, sub?:string) {
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

        //again nothing just yet.
        public removeTemplate() {

        }

        public update() {
            for (var i = 0; i < this._menuItems.length; i++) {
                this._menuItems[i].update();
            }
            super.update();
        }

    }

}