/// <reference path="../../src/Kiwi.ts" />

export class Menu extends Kiwi.State {

    constructor() {
        super('menu');
    }

    public menuItems: Kiwi.HUD.MenuItem[];
    public menu: Kiwi.HUD.Menu;
    public colors: Array;
    public current: number;
    
    init() {
        this.current = 0;
        this.colors = ['pink', 'green', 'orange', 'yellow', 'blue'];
    }

    create() {
        this.menu = new Kiwi.HUD.Menu(this.game, 0, 10);
        this.menuItems = [];
        this.menuItems.push(new Kiwi.HUD.MenuItem('home', 100, 100, 10, 0));
        this.menuItems.push(new Kiwi.HUD.MenuItem('pause', 100, 100, 10, 150));
        this.menuItems.push(new Kiwi.HUD.MenuItem('back', 100, 100, 10, 300));

        for (var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].container.style.backgroundColor = 'red';
            this.menuItems[i].container.style.color = 'white';
            this.menuItems[i].container.style.textAlign = 'center';
            
            this.menu.addMenuItem(this.menuItems[i]);

            this.menuItems[i].input.inputOnRelease.add(this.change, this);
        }

        this.game.huds.defaultHUD().addWidget(this.menu);
        this.game.stage.container.style.backgroundColor = this.colors[this.current];
    }

    change() {
        
        this.current = this.current + 1;
        //if (this.current >= this.colors.length ) this.current = 0;
        if (this.current >= this.colors.length) this.current = 0;
        this.game.stage.container.style.backgroundColor = this.colors[this.current];

    }

}