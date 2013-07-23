/// <reference path="../../src/Kiwi.ts" />

class CreatingAndMovingCameras extends Kiwi.State {

    constructor() {
        super('CreatingAndMovingCameras');
    }

    init() {

        this.game.stage.size.setTo(5600, 600);
    }

    background: Kiwi.GameObjects.StaticImage;
    camera: Kiwi.Camera;

    preload() {

        this.addImage('background', 'assets/longbackground.png');
    }
    
    create() {

        this.background = new Kiwi.GameObjects.StaticImage('background', this.game.cache, 0, 0);
        this.addChild(this.background);

        //Creating a new Camera
        this.camera = new Kiwi.Camera(this.game, 2, 'newCamera', 0, 0, 600, 600);

        //Replace the current default camera with the new camera
        this.game.cameras.defaultCamera = this.camera;
    }

    update() {

        super.update();

        if (this.camera.position.x() < 5000)
            this.camera.position.x(this.camera.position.x() + 2);
        else
            this.camera.position.x(0);
    }
}
