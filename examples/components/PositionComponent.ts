/// <reference path="../../src/Kiwi.ts" />


 class PositionComponent extends Kiwi.State {

        constructor() {

            super('PositionComponent');

        }

        zombie: Kiwi.GameObjects.Sprite;
        zombie2: Kiwi.GameObjects.Sprite;
        zombie3: Kiwi.GameObjects.Sprite;

        preload() {

            this.addImage('zombie', 'assets/zombie.png');
        }

        create() {

            this.zombie = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 7, 40);
            this.zombie2 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 138, 100);
            this.zombie3 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 300, 300);

           // this.zombie2.position.z(50);
          //  this.zombie3.position.z(-50);

         //   this.addChild(this.zombie);
         //   this.addChild(this.zombie2);
         //   this.addChild(this.zombie3);
        }

        update() {

            super.update();

         //   if (this.zombie3.position.x() > 0)
         //       this.zombie3.position.x(this.zombie3.position.x()-1);
         //   else
         //       this.zombie3.position.x(300);

        }


    }

