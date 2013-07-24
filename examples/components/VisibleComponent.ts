/// <reference path="../../src/Kiwi.ts" />
    class VisibleComponent extends Kiwi.State {

        constructor() {

            super('VisibleComponent');

        }

        zombie: Kiwi.GameObjects.Sprite;
        zombie2: Kiwi.GameObjects.Sprite;
        zombie3: Kiwi.GameObjects.Sprite;
        timer :number = 0;

        preload() {

            this.addImage('zombie', 'assets/zombie.png');
        }

        create() {

            this.zombie = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 7, 40);
            this.zombie2 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 138, 40);
            this.zombie3 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 269, 40);

            this.zombie2.visible.visible(false);

            this.addChild(this.zombie);
            this.addChild(this.zombie2);
            this.addChild(this.zombie3);

        }

        switchVisible() {
            if (this.zombie3.visible.visible()) {
                this.zombie3.visible.visible(false);
            }
            else {
                this.zombie3.visible.visible(true);
            }
            if (this.zombie2.visible.visible()) {
                this.zombie2.visible.visible(false);
            }
            else {
                this.zombie2.visible.visible(true);
            }
        }

        update() {

            super.update();

            this.timer++;
            if (this.timer > 50) {
                this.switchVisible();
                this.timer = 0;
            }


        }


    }

