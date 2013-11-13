var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../src/Kiwi.ts" />
/**
* This script is a demonstration of the touch manager which is only active if the user has a touch enabled device.
**/
var TouchManager = (function (_super) {
    __extends(TouchManager, _super);
    function TouchManager() {
        _super.call(this, 'TouchManager');
    }
    TouchManager.prototype.preload = function () {
        this.addSpriteSheet('characters', 'assets/spritesheets/characters.png', 150, 117);
    };

    TouchManager.prototype.create = function () {
        if (Kiwi.DEVICE.touch) {
            /**
            * Add the callbacks to the touch manager.
            **/
            this.game.input.touch.touchDown.add(this.spawn, this);
            this.game.input.touch.touchUp.add(this.remove, this);

            //create a new character for each finger.
            this.characters = [];
            this.pointers = [];
            for (var i = 0; i < this.game.input.touch.fingers.length; i++) {
                var c = new Kiwi.GameObjects.Sprite(this, this.textures.characters);
                this.characters.push(c);
                c.cellIndex = i;
            }
        } else {
            var text = new Kiwi.GameObjects.Textfield(this, 'In order to view this example you need to be on a touch enabled device :(', this.game.stage.width / 2, this.game.stage.height / 3, '#000', 16);
            text.textAlign = 'center';
            this.addChild(text);
        }
    };

    //when a user presses a finger down create add a character to the stage and add the pointer to the list.
    TouchManager.prototype.spawn = function (x, y, timeDown, timeUp, duration, pointer) {
        this.pointers.push(pointer);
        this.addChild(this.characters[this.pointers.length - 1]);
    };

    //when a user removes a finger try to remove it.
    TouchManager.prototype.remove = function (x, y, timeDown, timeUp, duration, pointer) {
        this.removePointer(pointer);
    };

    //removes a pointer from the stage.
    TouchManager.prototype.removePointer = function (pointer) {
        for (var i = 0; i < this.pointers.length; i++) {
            if (pointer.id == this.pointers[i].id) {
                this.removeChild(this.characters[i]);
                this.pointers.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    //update loop
    TouchManager.prototype.update = function () {
        _super.prototype.update.call(this);

        if (Kiwi.DEVICE.touch) {
            for (var i = 0; i < this.pointers.length; i++) {
                if (this.pointers[i].active) {
                    this.characters[i].x = this.pointers[i].x - 75;
                    this.characters[i].y = this.pointers[i].y - 50;
                } else {
                    if (this.removePointer(this.pointers[i])) {
                        i--;
                    }
                }
            }
        }
    };
    return TouchManager;
})(Kiwi.State);
