/**
* This script is a demonstration of the touch manager which is only active if the user has a touch enabled device.
**/
var MultiTouch = new Kiwi.State('MultiTouch');

MultiTouch.preload = function () {
    this.addSpriteSheet('characters', 'assets/spritesheets/characters.png', 150, 117);
}

MultiTouch.create = function () {

    if (Kiwi.DEVICE.touch) {

        var text = new Kiwi.GameObjects.Textfield(this, 'Touch the device to create a new Character!', this.game.stage.width / 2, 10, '#000', 12);
        text.textAlign = 'center';
        this.addChild(text);

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
}

//When a user presses a finger down create add a character to the stage and add the pointer to the list.
MultiTouch.spawn = function (x, y, timeDown, timeUp, duration, pointer) {
    this.pointers.push(pointer);
    this.addChild(this.characters[this.pointers.length - 1]);
}

//When a user removes a finger try to remove it.
MultiTouch.remove = function (x, y, timeDown, timeUp, duration, pointer) {
    this.removePointer(pointer);
}

//Removes a pointer from the stage.
MultiTouch.removePointer = function (pointer) {
    for (var i = 0; i < this.pointers.length; i++) {
        if (pointer.id == this.pointers[i].id) {
            this.removeChild(this.characters[i]);
            this.pointers.splice(i, 1);
            return true;
        }
    }
    return false;
}

//Update loop
MultiTouch.update = function () {
    Kiwi.State.prototype.update.call(this);

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
}



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', MultiTouch,  gameOptions);