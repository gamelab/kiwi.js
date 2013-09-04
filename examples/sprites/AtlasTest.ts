/// <reference path="../../src/Kiwi.ts" />

class AtlasTest extends Kiwi.State {

    constructor() {
        super('AtlasTest');
    }

    init() {

    }

    public testAtlas: Kiwi.GameObjects.Sprite;

    preload() {
        this.addTextureAtlas('n45image', 'assets/textureatlas/1945_sprites.png', 'n45atlas', 'assets/textureatlas/atlas.json')

    }




    create() {
        console.log(this.textures);
        this.testAtlas = new Kiwi.GameObjects.Sprite(this,this.textures.n45image, 100, 100);
        this.addChild(this.testAtlas);
    }



    update() {
        super.update();
        this.testAtlas.atlas.cellIndex++;
        if (this.testAtlas.atlas.cellIndex > 7) this.testAtlas.atlas.cellIndex = 0;

    }
}



