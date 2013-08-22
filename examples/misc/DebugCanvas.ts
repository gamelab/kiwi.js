/// <reference path="../../src/Kiwi.ts" />

class DebugCanvas extends Kiwi.State {

    constructor() {
        super('DebugCanvas');
    }

    init() {
        //get the debug canvas context
        this.ctx = this.game.stage.dctx;
        this.game.stage.toggleDebugCanvas();
    }

    private ctx: CanvasRenderingContext2D;

    preload() {


       
        this.addImage('explosion', 'assets/slide5.jpg',true,300,120);
    }


    
    public explosion: Kiwi.GameObjects.Sprite;

    
    create() {

       

        this.explosion = new Kiwi.GameObjects.Sprite(this.textures.explosion, 120, 120);
      

        this.addChild(this.explosion);
        this.explosion.box.hitbox = new Kiwi.Geom.Rectangle(20, 20, 40, 40);
    }



    update() {
        super.update();
        this.explosion.transform.rotPointX = 50;
        this.explosion.transform.rotPointY = 70;

        this.explosion.transform.rotation +=0.005;

        this.game.stage.clearDebugCanvas();
        this.explosion.box.draw(this.ctx);
        //this.ctx.strokeStyle = "green";
        //this.ctx.strokeRect(this.explosion.x, this.explosion.y, this.explosion.width, this.explosion.height);
    }
}


