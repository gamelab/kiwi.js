/// <reference path="../../src/Kiwi.ts" />

/**
* Creating a sprite
**/
class addingSprite extends Kiwi.State {

    constructor() {
        super('addingSprite');

    }

    //Sprite
    public mySprite: Kiwi.GameObjects.Sprite;
    myTween: Kiwi.Tween;
    startingPoint: Kiwi.Geom.Point;
    myTweenManager: Kiwi.Tweens.Manager;

    init() {
        this.game.stage.size.setTo(800, 600);

    }

    preload() {
        ///////////////////////////////////////
        //Adding Image for Sprite to Cache
        this.addImage('mySprite', 'assets/sprite.png');
    }


    create() {
        ///////////////////////////////////////
        //Creating Sprite
        this.mySprite = new Kiwi.GameObjects.Sprite('mySprite', this.game.cache, 50, 50);
        this.startingPoint = new Kiwi.Geom.Point(50, 50);

        ////////////////////////////////////////
        //Adding to Stage
        this.addChild(this.mySprite);

        this.myTween = this.game.tweens.create(this.mySprite.position);

        this.myTween.to({ x: 600 }, 1000, Kiwi.Tweens.Easing.Elastic.In, false);
        
        this.myTween.start();

       

    }

    update() {
        super.update();

    }
}

var game = new Kiwi.Game();

game.states.addState(addingSprite);
game.states.switchState("addingSprite");
