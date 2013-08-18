/// <reference path="../../src/Kiwi.ts" />

class test1 extends Kiwi.State {

    constructor() {
        super('Test1');
    }

    init() {

       

    }

    preload() {

        this.addImage('craters', 'assets/textures/craters.jpg');
        //this.addSpriteSheet('n1945', 'assets/textureatlas/1945_sprites.png', 32, 32, false, 6, 1, 6, 5, 5, 1, 1);
        //this.addSpriteSheet('explosion', 'assets/explosion1024.png', 64, 64, false, 23, 5, 5, 0, 0);
    }


    //public at: Kiwi.GameObjects.Sprite;
    //public explosion: Kiwi.GameObjects.Sprite;
    public background: Kiwi.GameObjects.Sprite;
    
    create() {

        //this.at = new Kiwi.GameObjects.Sprite(this.textures.n1945, 100, 0);
        //this.at.animation.add("test", [0, 1, 2, 3, 4], .2, true);
        //this.at.animation.play("test");

        this.background = new Kiwi.GameObjects.Sprite(this.textures.craters, 0,0);
        
        this.addChild(this.background);
        

    }



    update() {
        super.update();
        //this.explosion.transform.x++;
        //this.background.transform.x++;
    }
}


