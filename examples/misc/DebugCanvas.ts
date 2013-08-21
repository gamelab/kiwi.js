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


       
        this.addImage('explosion', 'assets/indiana.png',true,124,170);
    }


    public at: Kiwi.GameObjects.Sprite;
    public explosion: Kiwi.GameObjects.Sprite;

    
    create() {

       

        this.explosion = new Kiwi.GameObjects.Sprite(this.textures.explosion, 100, 120);
      

        this.addChild(this.explosion);
       
    }



    update() {
        super.update();
        //this.explosion.transform.rotPointX = 5;
        //this.explosion.transform.rotPointY = 10;

        this.explosion.transform.rotation +=0.01;

        this.game.stage.clearDebugCanvas();
        this.explosion.box.draw(this.ctx);
        //this.ctx.strokeStyle = "green";
        //this.ctx.strokeRect(this.explosion.x, this.explosion.y, this.explosion.width, this.explosion.height);
    }
}


