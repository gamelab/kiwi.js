/// <reference path="../../src/Kiwi.ts" /> 

class movement extends Kiwi.State {

    constructor() {
        super('movement');
    }

    init() {

    }

    public tileMap: Kiwi.GameObjects.TileMap;
    public ship: Kiwi.GameObjects.Sprite;

    preload() {
        this.addImage('ship', 'assets/sprites/thrust_ship.png', false);
        this.addSpriteSheet('desert', 'assets/tiles/tmw_desert_spacing.png', 33, 33, false);
        this.addJSON('desertTiles', 'assets/tilemaps/desert.json', false);
    }

    create() {
        this.tileMap = new Kiwi.GameObjects.TileMap();
        this.tileMap.createFromCache('desertTiles', this.cache, 'desert', this.cache, this.game, Kiwi.GameObjects.TileMap.FORMAT_TILED_JSON);

        this.ship = new Kiwi.GameObjects.Sprite('ship', this.cache, 200, 150);

        this.addChild(this.tileMap);
        this.addChild(this.ship);

        this.game.input.keyboard.addKey(movement.UP);
        this.game.input.keyboard.addKey(movement.DOWN);
        this.game.input.keyboard.addKey(movement.LEFT);
        this.game.input.keyboard.addKey(movement.RIGHT);
    }

    update() {
        var vx = 0;
        var vy = 0;
        if (this.game.input.keyboard.isDown(movement.LEFT)) {
            vx = -5;
            this.ship.rotation.angle(180);
        } else if (this.game.input.keyboard.isDown(movement.RIGHT)) {
            vx = 5;
            this.ship.rotation.angle(0);
        }

        if (this.game.input.keyboard.isDown(movement.UP)) {
            vy = -5;
            this.ship.rotation.angle(-90);
        } else if (this.game.input.keyboard.isDown(movement.DOWN)) {
            vy = 5;
            this.ship.rotation.angle(90);
        }

        if (this.ship.position.x() > this.game.stage.size.width() - 100 && vx > 0 || this.ship.position.x() < 100 && vx < 0) {
            this.tileMap.currentLayer.position.addTo(vx);
        } else {
            this.ship.position.addTo(vx);
        }

        if (this.ship.position.y() > this.game.stage.size.height() - 100 && vy > 0 || this.ship.position.y() < 100 && vy < 0) {
            this.tileMap.currentLayer.position.addTo(0, vy);
        } else {
            this.ship.position.addTo(0, vy);
        }

        if (this.game.input.keyboard.isDown(movement.LEFT) && this.game.input.keyboard.isDown(movement.DOWN)) this.ship.rotation.angle(135);
        if (this.game.input.keyboard.isDown(movement.LEFT) && this.game.input.keyboard.isDown(movement.UP)) this.ship.rotation.angle(-135);
        if (this.game.input.keyboard.isDown(movement.RIGHT) && this.game.input.keyboard.isDown(movement.DOWN)) this.ship.rotation.angle(45);
        if (this.game.input.keyboard.isDown(movement.RIGHT) && this.game.input.keyboard.isDown(movement.UP)) this.ship.rotation.angle(-45);

        super.update();
    }

    public static UP: number = 87;
    public static LEFT: number = 65;
    public static DOWN: number = 83;
    public static RIGHT: number = 68;
}