/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can create a textfield object in Kiwi. 
* 
* A textfield is a special object where you can render text on the stage. 
**/

class Textarea extends Kiwi.State {

    constructor() {
        super('Textarea');
    }
    
    //where text is to be saved.
    text1: Kiwi.GameObjects.Textfield;
    text2: Kiwi.GameObjects.Textfield;
    text3: Kiwi.GameObjects.Textfield;

    create() {

        /**  
        * Kiwi.GameObjects.Textfield.
        * - Parameter One - State that this gameobject belongs to.  
        * - Parameter Two - Text that you want to render on the age.
        * - Parameter Three - OPTIONAL - X coordinate - Defaults to 0
        * - Parameter FOUR - OPTIONAL - Y coordinate - Defaults to 0
        **/
        this.text1 = new Kiwi.GameObjects.Textfield(this, 'Hello World', 10, 10, '#000');
        this.addChild(this.text1);
        
        this.text2 = new Kiwi.GameObjects.Textfield(this, 'This text is right aligned', this.game.stage.width, 20, 'red', 16);
        this.text2.textAlign = Kiwi.GameObjects.Textfield.TEXTALIGN_RIGHT;
        this.text2.alpha = 0.5;
        this.addChild(this.text2);

        this.text3 = new Kiwi.GameObjects.Textfield(this, 'I am on a angle!', this.game.stage.width / 2, 200, 'green', 32, 'bold', 'serif');
        this.text3.rotation += Math.PI / 5;
        this.text3.textAlign = Kiwi.GameObjects.Textfield.TEXTALIGN_CENTER;
        this.addChild(this.text3);

    }

}