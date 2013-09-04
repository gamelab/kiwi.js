/// <reference path="../../src/Kiwi.ts" />

class test1 extends Kiwi.State {

    constructor() {
        super('Test1');
    }

    init() {

       

    }

    preload() {

        this.addImage('craters', 'assets/textures/craters800.jpg');
        this.addImage('spartan', 'assets/sprites/shinyball.png');
        //this.addSpriteSheet('n1945', 'assets/textureatlas/1945_sprites.png', 32, 32, false, 6, 1, 6, 5, 5, 1, 1);
        //this.addSpriteSheet('explosion', 'assets/explosion1024.png', 64, 64, false, 23, 5, 5, 0, 0);
    }


    //public at: Kiwi.GameObjects.Sprite;
    //public explosion: Kiwi.GameObjects.Sprite;
    public background: Kiwi.GameObjects.StaticImage;
    public spartan: Kiwi.GameObjects.StaticImage;

    create() {

        //this.at = new Kiwi.GameObjects.Sprite(this.textures.n1945, 100, 0);
        //this.at.animation.add("test", [0, 1, 2, 3, 4], .2, true);
        //this.at.animation.play("test");

        this.background = new Kiwi.GameObjects.StaticImage(this,this.textures.craters, 0,0);
        
        this.addChild(this.background);

        this.spartan = new Kiwi.GameObjects.StaticImage(this,this.textures.spartan, 100, 120);
        //this.spartan.transform.regX = 16;
        //this.spartan.transform.regY = 16;
        this.addChild(this.spartan);
        

    }



    update() {
        super.update();
        //this.game.cameras.defaultCamera.transform.x++;
        this.game.cameras.defaultCamera.transform.rotation +=.005;
        this.spartan.transform.rotation += 0.1;
        //this.spartan.transform.scaleX += 0.1;
        //this.spartan.transform.scaleY += 0.1;
        //this.game.cameras.defaultCamera.transform.scaleX -= 0.01;
        //this.game.cameras.defaultCamera.transform.scaleY -= 0.01;
        //this.spartan.transform.rotPointX = 25;
        //this.spartan.transform.rotPointY = 25;

        //this.explosion.transform.x++;
        //this.background.transform.x++;
    }
}


