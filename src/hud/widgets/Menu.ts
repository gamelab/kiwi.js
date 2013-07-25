/// <reference path="../../Kiwi.ts" />

module Kiwi.HUD {

    export class Menu extends Kiwi.HUD.HUDWidget {

        constructor(game: Kiwi.Game, x: number, y: number) {

            super('menu', x, y);

            this.game = game;
            this._menuItems = [];

        }

        public game: Kiwi.Game;

        private _menuItems: Kiwi.HUD.MenuItem[];

        public addMenuItem(item: Kiwi.HUD.MenuItem):Kiwi.HUD.MenuItem {
            this._menuItems.push(item);
            this.container.appendChild(item.container);
            item.addedToStage(this.game, this);

            return item;
        }

        //add multiple menu items
        public addMenuItems(items: Kiwi.HUD.MenuItem[]) {
            for (var i = 0; i < items.length; i++) {
                this.addMenuItem(items[i]);
            }
        }

        //get a menu item - need to test
        public getMenuItem(val: any): Kiwi.HUD.MenuItem {
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
                console.log('Failed find container');
                return;
            }

            var subElements = mainElement.getElementsByTagName(sub);
            if (subElements === undefined) {
                console.log('No menu items found');
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