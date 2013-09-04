/// <reference path="../../src/Kiwi.ts" />

class MultiSprite extends Kiwi.State {

    constructor() {
        super('MultiSprite');
    }

    init() {

    }

    preload() {

        this.addImage('character', 'assets/sprites/planetcute/Heart.png', true);
        

    }

    public sprites: Kiwi.GameObjects.Sprite[];
    public vels: number[];
    public numSprites: number = 400;

    
    create() {
        this.sprites = new Array();
        this.vels = new Array();


        for (var i = 0; i < this.numSprites; i++) {
            this.sprites.push(new Kiwi.GameObjects.Sprite(this,this.textures.character, 0, 0));
            this.sprites[i].transform.x = Math.floor(Math.random() * 800);
            this.sprites[i].transform.y = Math.floor(Math.random() * 600);
            this.addChild(this.sprites[i]);
            this.vels.push(Math.ceil(Math.random() * 10));
        }

        
    }

    

    update() {
        super.update();
        for (var i = 0; i < this.numSprites; i++) {
            this.sprites[i].transform.x += this.vels[i];
            this.sprites[i].transform.y += this.vels[i];
            if (this.sprites[i].transform.x < 0 || this.sprites[i].transform.x > 800) this.vels[i] = - this.vels[i];
            if (this.sprites[i].transform.y < 0 || this.sprites[i].transform.y > 600) this.vels[i] = - this.vels[i];
        }
        
    }

}
