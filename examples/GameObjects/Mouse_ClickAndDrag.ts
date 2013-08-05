/// <reference path="../../src/Kiwi.ts" />

class Mouse_ClickAndDrag extends Kiwi.State {

    constructor() {
        super('mouse_click-and-drag');
    }

    preload() {
        this.addImage('shiny', 'assets/shinyball.png', false);
    }

    public shinys: Kiwi.GameObjects.Sprite[];

    create() {

        this.shinys = [];

        for (var i = 0; i < 5; i++) {
            var shiny = new Kiwi.GameObjects.Sprite('shiny', this.cache, Math.random() * this.game.stage.size.width(), Math.random() * this.game.stage.size.height());
            shiny.input.enableDrag();

            this.addChild(shiny);
            this.shinys.push(shiny); 
        }

    }

}