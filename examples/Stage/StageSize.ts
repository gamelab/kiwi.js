/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can create sprite game objects in Kiwi. 
* 
* A sprite is a regular/general purpose game object that you would have in Kiwi. With a sprite you can do:
* - Animation using a spritesheet
* - Listen for click/touch events 
* - Scale/Rotate
**/

class StageSize extends Kiwi.State {

    constructor() {
        super('Sprite');
    }
    
    preload() {
        // Load out saloon background and ninja 
        this.addImage('pirate', 'assets/static/pirate.png');
    }
    
    //where the pirate is saved.
    pirate: Kiwi.GameObjects.Sprite;

    create() {

        /**  
        * Kiwi.GameObjects.Sprite.
        * - Parameter One - State that this gameobject belongs to.
        * - Parameter Two - Texture that this static image is to have.
        * - Parameter Three - OPTIONAL - X coordinate - Defaults to 0
        * - Parameter FOUR - OPTIONAL - Y coordinate - Defaults to 0
        * - Parameter FIVE - OPTIONAL - Enable input component - Defaults to false 
        *
        * Note: Don't worry if you have told a sprite that you don't want to use the input. It can always be created later.
        **/

        this.pirate = new Kiwi.GameObjects.Sprite(this, this.textures.pirate, 100, 300);              //create the pirate
        this.addChild(this.pirate);                                                                   //add it to the state                    

    }

}