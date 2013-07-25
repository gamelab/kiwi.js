/// <reference path="../../src/Kiwi.ts" />

 class Textfield extends Kiwi.State {

    constructor() {
        super('textfield');
    }

    init() {

    }
    
    private textField: Kiwi.GameObjects.Textfield;

    create() {
        this.textField = new Kiwi.GameObjects.Textfield('Hello World', 50, 50);
        this.textField.textAlign('center');
        this.addChild(this.textField);
    }

}