/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can create a textarea game object in Kiwi. 
*  
* 
**/

class Textarea extends Kiwi.State {

    constructor() {
        super('Textarea');
    }

    textarea: Kiwi.GameObjects.Textfield;

    create() {

        /**  
        * Kiwi.GameObjects.StaticImage.
        * - Parameter One - State that this gameobject belongs to.
        * - Parameter Two - Texture that this static image is to have.
        * - Parameter Three - OPTIONAL - X coordinate - Defaults to 0
        * - Parameter FOUR - OPTIONAL - Y coordinate - Defaults to 0
        **/

        this.textarea = new Kiwi.GameObjects.Textfield(this, 'Hello World', 400, 200);


    }

}