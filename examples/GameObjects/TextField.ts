/// <reference path="../../src/Kiwi.ts" />

class TextField extends Kiwi.State {

    constructor() {
        super('TextField');
    }

    create() {
        this.text = new Kiwi.GameObjects.Textfield('Hello World', 200, 100);
        this.addChild(this.text);
    }

    public text: Kiwi.GameObjects.Textfield;

}