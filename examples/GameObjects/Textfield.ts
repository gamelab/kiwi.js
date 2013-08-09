/// <reference path="../../src/Kiwi.ts" />

 class Textfield extends Kiwi.State {

    constructor() {
        super('textfield');
    }

    init() {

    }
    
    create() {
        
        var text = 'Hello World, this is awesome text that appears. Loren Ipsum dolor set e.t.c. e.t.c.';

        var textField = new Kiwi.GameObjects.Textfield(text, 500, 50);
        textField.fontSize = 18;
        textField.lineHeight = 2;
        textField.textAlign = 'center';
        this.addChild(textField);
        
        var textField = new Kiwi.GameObjects.Textfield(text, 500, 150);
        textField.fontSize = 18;
        textField.lineHeight = 1.2;
        textField.textAlign = 'left';
        this.addChild(textField);

        var textField = new Kiwi.GameObjects.Textfield(text, 500, 250);
        textField.fontSize = 18;
        textField.textAlign = 'right';
        this.addChild(textField);
        
    }

}