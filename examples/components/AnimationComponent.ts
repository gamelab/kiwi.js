/// <reference path="../../src/Kiwi.ts" />

    export class AnimationComponent extends Kiwi.State {

        constructor() {

            super('AnimationComponent');

        }

        zombie: Kiwi.GameObjects.Sprite;
        zombie2: Kiwi.GameObjects.Sprite;

        preload() {

            this.addSpriteSheet('zombiesprite', 'assets/zombiesprite.png', 150, 117);
        }

        create() {

            this.zombie = new Kiwi.GameObjects.Sprite('zombiesprite', this.game.cache, 33, 40);
            this.zombie2 = new Kiwi.GameObjects.Sprite('zombiesprite', this.game.cache, 216, 40);

            this.zombie.animation.add('move', 0.2, [0, 1, 2, 3, 4, 5, 6], Kiwi.Anims.PLAY_LOOP);
            this.zombie2.animation.add('death', 0.2, [11, 12, 13, 14, 15], Kiwi.Anims.PLAY_LOOP);

            this.zombie.animation.play('move');
            this.zombie2.animation.play('death');

            this.addChild(this.zombie);
            this.addChild(this.zombie2);
        }

        update() {

            super.update();

        }


    }

