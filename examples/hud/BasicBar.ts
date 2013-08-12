/// <reference path="../../src/Kiwi.ts" />

class BasicBar extends Kiwi.State {

    constructor() {
        super('Bar');
    }

    public health: Kiwi.HUD.BasicBar;
    public second: Kiwi.HUD.BasicBar;

    public tree: Kiwi.GameObjects.Sprite;

    init() {

        this.health = new Kiwi.HUD.BasicBar(100,100,10,10);
        this.second = new Kiwi.HUD.BasicBar(0, 200, 10, 50);

        this.health.range.min = 10;

        this.health.container.style.backgroundColor = 'red';
        this.health.bar.style.backgroundColor = 'green';

        this.second.container.style.border = '1px solid black';
        this.second.bar.style.backgroundColor = '#fff';
        this.second.bar.style.borderBottom = '1px solid black';

        this.second.vertical(true);
        this.second.container.style.height = '100px';
        this.second.container.style.width = '20px';

        this.game.huds.defaultHUD().addWidget(this.health);
        this.game.huds.defaultHUD().addWidget(this.second);

    }

    preload() {
        this.addImage('tree', 'assets/sprites/planetcute/Tree Tall.png', false);
    }
    
    create() {
        this.tree = new Kiwi.GameObjects.Sprite('tree', this.cache, 200, 100);

        this.addChild(this.tree);
    }

    update() {
        this.second.range.increase();
        this.health.range.decrease();
    }

}