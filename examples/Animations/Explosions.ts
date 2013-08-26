/// <reference path="../../src/Kiwi.ts" />

class Explosions extends Kiwi.State {

    constructor() {
        super('GLTest1');
    }

    init() {

        

    }

    preload() {


      
        this.addSpriteSheet('explosion', 'assets/explosion1024.png', 64, 64, false, 23, 5, 5, 0, 0);
    }


    public explosions: Kiwi.GameObjects.Sprite[];
    public velsX: number[];
    public velsY: number[];

    public numExplosions: number =200;

    
    create() {
        this.explosions = new Array();
        this.velsX = new Array();
        this.velsY = new Array();

        for (var i = 0; i < this.numExplosions; i++) {
            var explosion: Kiwi.GameObjects.Sprite = new Kiwi.GameObjects.Sprite(this.textures.explosion, 100, 100);
            
            explosion.animation.add("test", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], Math.random()/10, true);
            explosion.animation.play("test");
            //explosion.animation.getAnimation("test").frameIndex = Math.floor(Math.random() * 23);
            explosion.transform.x = Math.floor(Math.random() * 800);
            explosion.transform.y = Math.floor(Math.random() * 600);
            this.velsX.push(Math.floor(Math.random() * 20 - 10));
            this.velsY.push(Math.floor(Math.random() * 20 - 10));

            this.explosions.push(explosion);

            this.addChild(explosion);
        }
    

    }



    update() {
        super.update();
        for (var i = 0; i < this.numExplosions; i++) {
            this.explosions[i].transform.x += this.velsX[i];
            this.explosions[i].transform.y += this.velsY[i];

            if (this.explosions[i].transform.x > 800 || this.explosions[i].transform.x < 0) {
                this.velsX[i] = -this.velsX[i];
            }

            if (this.explosions[i].transform.y > 600 || this.explosions[i].transform.y < 0) {
                this.velsY[i] = -this.velsY[i];
            }
        }
    }
}


