/// <reference path="../../src/Kiwi.ts" />

class GLTest1 extends Kiwi.State {

    constructor() {
        super('GLTest1');
    }

    init() {

        this.game.stage.size.setTo(800, 600);

    }

    preload() {

        this.addImage('n1945', 'assets/textureatlas/1945_sprites.png', false);
        //this.addSpriteSheet('cat', 'assets/sprites/baddie_cat_1.png', 16, 16, false, 4, 4, 1, 0, 0, 0, 0);

    }

   
    public at: Kiwi.GameObjects.Sprite;

   
    create() {
        
        this.at = new Kiwi.GameObjects.Sprite(this.textures.n1945, 100, 0);
      
        this.addChild(this.at);
      

    }



    update() {
        super.update();

    }
}


