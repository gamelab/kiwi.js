/// <reference path="../../src/Kiwi.ts" />

class Sprite1 extends Kiwi.State {

    constructor () {
        super('Sprite Test 1');
    }

    init() {

        this.game.stage.size.setTo(800, 600);

    }

    preload() {

        this.addImage('character', 'assets/sprites/planetcute/Character Horn Girl.png',false);

    }

    public character: Kiwi.GameObjects.Sprite;
   

    create() {

        this.character = new Kiwi.GameObjects.Sprite('character', this.cache, 100, 0);
        
        
      
        this.addChild(this.character);
        
        this.character.position.setTo(20, 200);
        
    }

   

    update() {
        super.update();
    }

}
