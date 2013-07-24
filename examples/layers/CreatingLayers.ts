/// <reference path="../../src/Kiwi.ts" />


class CreatingLayers extends Kiwi.State {

    constructor() {

        super('CreatingLayers');

    }

    bunny: Kiwi.GameObjects.StaticImage;
    rememberme: Kiwi.GameObjects.StaticImage;
    foss: Kiwi.GameObjects.StaticImage;

    layer1: Kiwi.Layer;
    layer2: Kiwi.Layer;
    layer3: Kiwi.Layer;

    preload() {

        this.addImage('bunny', 'assets/bunny.png');
        this.addImage('rememberme', 'assets/remember_me.jpg');
        this.addImage('foss', 'assets/foss3.jpg');

    }

    create() {

        this.bunny = new Kiwi.GameObjects.StaticImage('bunny', this.game.cache, 400, 0);
        this.rememberme = new Kiwi.GameObjects.StaticImage('rememberme', this.game.cache, 0, 0);
        this.foss = new Kiwi.GameObjects.StaticImage('foss', this.game.cache, 100, 100);

        this.layer1 = this.game.layers.createCanvasLayer(this, 'layer1', 600);
        this.layer2 = this.game.layers.createCanvasLayer(this, 'layer2', 600);
        this.layer3 = this.game.layers.createCanvasLayer(this, 'layer3', 600);

        this.addChild(this.bunny, this.layer1);
        this.addChild(this.rememberme, this.layer2);
        this.addChild(this.foss, this.layer3);

    }


    update() {

        super.update();

    }





}

