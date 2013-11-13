var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MouseManager = (function (_super) {
    __extends(MouseManager, _super);
    function MouseManager() {
        _super.call(this, 'MouseManager');
    }
    MouseManager.prototype.preload = function () {
        this.addImage('rocket', 'assets/static/bullet-rocket.png');
    };

    MouseManager.prototype.create = function () {
        this.rocket = new Kiwi.GameObjects.Sprite(this, this.textures.rocket, 400, 200);
        this.addChild(this.rocket);

        this.rocket.rotation -= Math.PI / 2;

        this.game.input.mouse.onWheel.add(this.move, this);
    };

    MouseManager.prototype.move = function (deltaX, deltaY) {
        this.rocket.y -= deltaY / 4;
    };
    return MouseManager;
})(Kiwi.State);

if (typeof gameOptions == "undefined")
    var gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', MouseManager, gameOptions);
