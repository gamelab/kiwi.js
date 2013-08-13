/// <reference path="../../src/Kiwi.ts" />

class Sprite1 extends Kiwi.State {

    constructor () {
        super('Sprite Test 1');
    }

    init() {

        this.game.stage.size.setTo(800, 600);

    }

    preload() {

        this.addImage('character', 'assets/sprites/planetcute/Character Horn Girl.png', false);
        this.addSpriteSheet('cat', 'assets/sprites/baddie_cat_1.png', 16, 16, false,4,4,1,0,0,0,0);

    }

    public character: Kiwi.GameObjects.Sprite;
    public cat: Kiwi.GameObjects.Sprite;

    public aaa: number = 0;
    public bbb: number = 0;
    create() {
        console.log(this.textures);
        this.character = new Kiwi.GameObjects.Sprite(this.textures.character, 100, 0);
        this.cat = new Kiwi.GameObjects.Sprite(this.textures.cat, 10, 50);
        
        this.addChild(this.character);
        this.addChild(this.cat);

    }

    

    update() {
        super.update();
    
    }
    }


