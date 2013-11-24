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

        this.game.stage.resize(800, 250);

        /**  
        * Kiwi.GameObjects.Textfield.
        * - Parameter One - State that this gameobject belongs to.  
        * - Parameter Two - Text that you want to render on the age.
        * - Parameter Three - OPTIONAL - X coordinate - Defaults to 0
        * - Parameter FOUR - OPTIONAL - Y coordinate - Defaults to 0
        **/
        this.text1 = new Kiwi.GameObjects.Textfield(this, 'Hello World', 10, 10, '#000');
        this.addChild(this.text1);
        
        this.text2 = new Kiwi.GameObjects.Textfield(this, 'Loren ipsum dolor set.', this.game.stage.width - 10, 20, 'red', 16);
        this.text2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT;
        this.text2.alpha = 0.5;
        this.addChild(this.text2);

        this.text3 = new Kiwi.GameObjects.Textfield(this, 'Rotation!', 500, 100, 'green', 22, 'bold', 'serif');
        this.text3.rotation += Math.PI / 5;
        this.text3.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
        this.addChild(this.text3);

    }

}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if (typeof gameOptions  == "undefined") var gameOptions  = {};

var game = new Kiwi.Game('game', 'KiwiExample', Textarea, gameOptions );