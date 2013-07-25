/// <reference path="../../src/kiwi.ts" />

class RemoveChild extends Kiwi.State {

    constructor() {
        super('removechild');
    }

    preload() {
        this.addImage('heart', 'assets/sprites/planetcute/Heart.png', false);
        this.addImage('girl', 'assets/sprites/planetcute/Character Pink Girl.png', false);
    }

    public heart: Kiwi.GameObjects.Sprite;
    public person: Kiwi.GameObjects.Sprite;
    public heartVis: boolean;

    create() {

        this.person = new Kiwi.GameObjects.Sprite('girl', this.cache, 300, 100);
        this.heart = new Kiwi.GameObjects.Sprite('heart', this.cache, 100, 100);
        this.heartVis = true;

        this.addChild(this.person);
        this.addChild(this.heart);
        this.person.input.inputOnRelease.add(this.toggleHeart, this);

    }

    toggleHeart() {
        if (!this.heartVis) {
            this.addChild(this.heart);
            this.heartVis = true;
        } else {
            this.removeChild(this.heart);
            this.heartVis = false;
        }
    }

}