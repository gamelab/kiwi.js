/// <reference path="../../src/Kiwi.ts" />

class GLTest1 extends Kiwi.State {

    constructor() {
        super('GLTest1');
    }

    init() {

     

    }

    preload() {

        
        this.addSpriteSheet('n1945', 'assets/textureatlas/1945_sprites.png', 32, 32, false,6 , 1, 6, 5, 5, 1, 1);
        this.addSpriteSheet('explosion', 'assets/explosion1024.png', 64, 64, false, 23, 5, 5, 0, 0);
    }

    
    public at: Kiwi.GameObjects.Sprite;
    public explosion: Kiwi.GameObjects.Sprite;

   
    create() {
        
        this.at = new Kiwi.GameObjects.Sprite(this,this.textures.n1945, 100, 0);
        this.at.animation.add("test", [0, 1, 2, 3, 4], .2,true);
        this.at.animation.play("test");

        this.explosion = new Kiwi.GameObjects.Sprite(this,this.textures.explosion, 100, 100);
        this.explosion.animation.add("test", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22], .02, true);
        this.explosion.animation.play("test");

        this.addChild(this.explosion);
        this.addChild(this.at);
      

    }



    update() {
        super.update();
        this.explosion.transform.x++;
    }
}


