var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExtendSprite = (function (_super) {
    __extends(ExtendSprite, _super);
    function ExtendSprite() {
        _super.call(this, 'Sprite');
    }
    ExtendSprite.prototype.preload = function () {
        this.addImage('pirate', 'assets/static/pirate.png');
    };

    ExtendSprite.prototype.create = function () {
        this.pirate = new Pirate(this, this.textures.pirate, 100, 300);
        this.addChild(this.pirate);
    };
    return ExtendSprite;
})(Kiwi.State);

var Pirate = (function (_super) {
    __extends(Pirate, _super);
    function Pirate(state, atlas, x, y, enableInput) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof enableInput === "undefined") { enableInput = false; }
        _super.call(this, state, atlas, x, y, enableInput);
    }
    return Pirate;
})(Kiwi.GameObjects.Sprite);

if (typeof gameOptions == "undefined")
    var gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', ExtendSprite, gameOptions);
