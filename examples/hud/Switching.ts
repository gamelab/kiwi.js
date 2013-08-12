/// <reference path="../../src/Kiwi.ts" />

class Switching extends Kiwi.State {

    constructor() {
        super('Switching');
    }

    public scoreDefault: Kiwi.HUD.BasicScore;
    public scoreHud: Kiwi.HUD.BasicScore;
    
    public hud: Kiwi.HUD.HUDDisplay;

    private openedChest: Kiwi.GameObjects.Sprite;
    private closedChest: Kiwi.GameObjects.Sprite;

    init() {

        this.hud = this.game.huds.createHUD('secondHUD');

        this.scoreHud = new Kiwi.HUD.BasicScore(80, 20);
        this.scoreDefault = new Kiwi.HUD.BasicScore(20, 20);

        this.scoreHud.container.style.width = '200px';
        this.scoreHud.container.style.height = '40px';
        this.scoreHud.container.style.color = 'green';

        this.scoreDefault.container.style.width = '200px';
        this.scoreDefault.container.style.height = '40px';
        this.scoreDefault.container.style.color = 'red';

        this.game.huds.defaultHUD().addWidget(this.scoreDefault);
        this.hud.addWidget(this.scoreHud);

    }

    preload() {
        this.addImage('closed', 'assets/sprites/planetcute/Chest Closed.png', false);
        this.addImage('opened', 'assets/sprites/planetcute/Chest Open.png', false);
    }

    create() {
        this.openedChest = new Kiwi.GameObjects.Sprite('opened', this.cache, 300, 200);
        this.closedChest = new Kiwi.GameObjects.Sprite('closed', this.cache, 300, 200);

        this.addChild(this.openedChest);
        this.addChild(this.closedChest);

        this.openedChest.visiblity = false;

        this.openedChest.input.inputEntered.add(this.entered, this);
        this.closedChest.input.inputLeft.add(this.left, this);
    }

    entered() {
        this.game.huds.setHUD(this.hud);
        this.closedChest.visiblity = false;
        this.openedChest.visiblity = true;
    }

    left() {
        this.game.huds.setHUD(this.game.huds.defaultHUD());
        this.closedChest.visiblity = true;
        this.openedChest.visiblity = false;
    }

    update() {
        super.update();

        if (this.openedChest.visiblity) {
            this.scoreHud.counter.increment(1);
        } else {
            this.scoreDefault.counter.increment(1);
        }
    }

}