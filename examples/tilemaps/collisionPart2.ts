/// <reference path="../../src/Kiwi.ts" /> 

class collisionPart2 extends Kiwi.State {

    constructor() {
        super('collision');
    }

    init() {

    }

    public tileMap: Kiwi.GameObjects.TileMap;
    public ship: Kiwi.GameObjects.Sprite;
    public pixel: Kiwi.GameObjects.Pixel;
    public flashing: bool;

    preload() {
        this.addImage('ship', 'assets/sprites/thrust_ship.png', false);
        this.addSpriteSheet('desert', 'assets/tiles/tmw_desert_spacing.png', 33, 33, false);
        this.addJSON('desertTiles', 'assets/tilemaps/desert.json', false);
    }

    create() {
        this.flashing = false;
        this.tileMap = new Kiwi.GameObjects.TileMap();
        this.tileMap.createFromCache('desertTiles', this.cache, 'desert', this.cache, this.game, Kiwi.GameObjects.TileMap.FORMAT_TILED_JSON);

        this.tileMap.setCollisionByIndex(31, Kiwi.Components.ArcadePhysics.ANY, false);
        this.tileMap.setCollisionCallback(this.flash, this);

        this.ship = new Kiwi.GameObjects.Sprite('ship', this.cache, 200, 150);

        this.pixel = new Kiwi.GameObjects.Pixel(0, 0, 0x00ff0000, 1000);
        this.pixel.color.alpha(0);
        
        this.addChild(this.tileMap);
        this.addChild(this.ship);
        this.addChild(this.pixel);

        this.game.input.keyboard.addKey(collisionPart2.UP);
        this.game.input.keyboard.addKey(collisionPart2.DOWN);
        this.game.input.keyboard.addKey(collisionPart2.LEFT);
        this.game.input.keyboard.addKey(collisionPart2.RIGHT);
    }

    flash() {
        if (!this.flashing) {
            this.pixel.color.alpha(1);
            this.flashing = true;
        }
    }

    update() {
        if (this.pixel.color.alpha() > 0) {
            this.pixel.color.alpha( (this.pixel.color.alpha() - 0.05)  );
            if (this.pixel.color.alpha() <= 0.1) {
                this.flashing = false;
                this.pixel.color.alpha(0);
            }
        } 

        var vx = 0;
        var vy = 0;
        if (this.game.input.keyboard.isDown(collisionPart2.LEFT)) {
            vx = -5;
            this.ship.rotation.angle(180);
        } else if (this.game.input.keyboard.isDown(collisionPart2.RIGHT)) {
            vx = 5;
            this.ship.rotation.angle(0);
        }

        if (this.game.input.keyboard.isDown(collisionPart2.UP)) {
            vy = -5;
            this.ship.rotation.angle(-90);
        } else if (this.game.input.keyboard.isDown(collisionPart2.DOWN)) {
            vy = 5;
            this.ship.rotation.angle(90);
        }

        if (this.ship.position.x() > this.game.stage.size.width() - 100 && vx > 0 || this.ship.position.x() < 100 && vx < 0) {
            this.tileMap.currentLayer.position.addTo(-vx);
        } else {
            this.ship.position.addTo(vx);
        }

        if (this.ship.position.y() > this.game.stage.size.height() - 100 && vy > 0 || this.ship.position.y() < 100 && vy < 0) {
            this.tileMap.currentLayer.position.addTo(0, -vy);
        } else {
            this.ship.position.addTo(0, vy);
        }

        if (this.game.input.keyboard.isDown(collisionPart2.LEFT) && this.game.input.keyboard.isDown(collisionPart2.DOWN)) this.ship.rotation.angle(135);
        if (this.game.input.keyboard.isDown(collisionPart2.LEFT) && this.game.input.keyboard.isDown(collisionPart2.UP)) this.ship.rotation.angle(-135);
        if (this.game.input.keyboard.isDown(collisionPart2.RIGHT) && this.game.input.keyboard.isDown(collisionPart2.DOWN)) this.ship.rotation.angle(45);
        if (this.game.input.keyboard.isDown(collisionPart2.RIGHT) && this.game.input.keyboard.isDown(collisionPart2.UP)) this.ship.rotation.angle(-45);

        this.tileMap.collideSingle(this.ship);

        super.update();
    }

    public static UP: number = 87;
    public static LEFT: number = 65;
    public static DOWN: number = 83;
    public static RIGHT: number = 68;
}