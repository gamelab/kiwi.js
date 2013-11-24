/**
* This script is a demonstration of a few more basic HUD Widgets
**/
var AmmoOut = new Kiwi.State('AmmoOut');

AmmoOut.init = function() {
    this.isDown = false;
    this.frameDelay = 10;
    this.currentFrame = 0;
}

AmmoOut.preload = function () {

    this.addSpriteSheet('vc', 'assets/war/characters/vietcong-sheet-ak47.png', 150, 117);
    this.addSpriteSheet('desertBackdrop', 'assets/spritesheets/desert.png', 768, 512);
    this.addImage('bulletHUD', 'assets/static/bullet-rotated.png');
    this.addImage('bullet', 'assets/static/bullet-normal.png');
}

AmmoOut.create = function () {
    this.game.stage.resize(768, 512);

    this.bullets = [];

    var background = new Kiwi.GameObjects.StaticImage(this, this.textures.desertBackdrop, 0, 0);
    background.cellIndex = 1;
    this.addChild(background);

    this.vc = new Kiwi.GameObjects.Sprite(this, this.textures.vc, 100, 300);
    this.addChild(this.vc);

    this.game.input.onDown.add(this.down, this);
    this.game.input.onUp.add(this.up, this);

    if (this.game.deviceTargetOption !== Kiwi.TARGET_BROWSER)
        this.game.input.touch.maximumPointers = 1;

    this.bulletCount = new Kiwi.HUD.Widget.IconBar(this.game, this.textures.bulletHUD, 30, 30, 10, 10);
    this.game.huds.defaultHUD.addWidget(this.bulletCount);

    this.menu = new Kiwi.HUD.Widget.Menu(this.game, 648, 10);
    this.game.huds.defaultHUD.addWidget(this.menu);

    var reload = this.menu.createMenuItem('Reload', 0, 0);
    reload.input.onUp.add(this.reload, this);

    var increase = this.menu.createMenuItem('Increase Capcity', 0, 40);
    increase.input.onUp.add(this.increase, this);

    this.menu.setIconStyle('width', '100px');
    this.menu.setIconStyle('height', '20px');
    this.menu.setIconStyle('padding', '5px 12px');
    this.menu.setIconStyle('backgroundColor', 'rgba(0,0,200,0.25)');
    this.menu.setIconStyle('fontSize', '10px');
    this.menu.setIconStyle('textAlign', 'center');

    var decrease = this.menu.createMenuItem('Decrease Capcity', 0, 80);
    decrease.input.onUp.add(this.decrease, this);

    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Click on the stage to shoot!', 10, this.game.stage.height - 50, '#000', 12);
    this.addChild(text);

}

AmmoOut.decrease = function () {
    this.bulletCount.counter.max -= 10;
}

AmmoOut.increase = function () {
    this.bulletCount.counter.max += 10;
}

AmmoOut.reload = function () {
    console.log('reloading');
    this.bulletCount.counter.current = this.bulletCount.counter.max;
}

AmmoOut.down = function () {
    this.isDown = true;
}

AmmoOut.up = function () {
    this.isDown = false;
}

AmmoOut.update = function () {
    Kiwi.State.prototype.update.call(this);

    if (this.isDown) {
        this.currentFrame++;

        if (this.currentFrame >= this.frameDelay) {
            this.currentFrame = 0;
            this.spawnBullet();
        }
    } else {
        if (this.currentFrame < this.frameDelay)
            this.currentFrame++;
    }

    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].x += 7;
        if (this.bullets[i].x > this.game.stage.width) {
            this.removeChild(this.bullets[i], true);
            this.bullets.splice(i, 1);
            i--;
        }
    }
}

AmmoOut.spawnBullet = function () {
    if (this.bulletCount.counter.current > this.bulletCount.counter.min) {
        this.bulletCount.counter.current--;
        this.bullets.push(new Kiwi.GameObjects.StaticImage(this, this.textures.bullet, this.vc.x + this.vc.width - 20, this.vc.y + this.vc.height / 2 + 10));
        this.addChild(this.bullets[this.bullets.length - 1]);
    }
}



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', AmmoOut,  gameOptions);