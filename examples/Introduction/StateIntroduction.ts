/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstrates the basic methods that are on the state that are usefulto Developers.
* The order that these run in is in the order that they are written in. TOP -> BOTTOM.
* NOTE: When creating a state you do not need to create each method (constructor is a exception).
**/

class StateIntroduction extends Kiwi.State {

    constructor() {
        super('StateIntroduction'); //This is the name of this state.
    }

    /**
    * The init method only runs once. And that is when the state is initially constructed. 
    * Therefore it is useful for setting information up that would be static through the states life.
    **/
    init() {
        alert('Initialise this state');
        //In this case we are setting the width/height of the game. 
        this.game.stage.width = 768;
        this.game.stage.height = 512;
    }

    /**
    * The preload method would run after the init, and this is where you say all of the assets that you want to load.
    **/
    preload() { 
        alert('Loading Images');
        this.addImage('background', 'assets/static/saloon-bg.png');
    }

    /**
    * The loadProgress method gets executed while the assets are loading. Using this you could create a 'preloader' with the information provided.
    * This method is for the progress of each file that you want to load.
    **/
    loadProgress(percent: number, bytesLoaded: number) {
        console.log('Percent: ' + percent, 'Bytes: ' + bytesLoaded); 
    }

    /**
    * When the loading is complete, the loadComplete method is next. 
    **/
    loadComplete() {
        alert('Loading Complete');
    } 

    /**
    * This will be where our background image will be saved. So that we can access it later.
    **/
    background: Kiwi.GameObjects.StaticImage;

    /**
    * Once all the loading was successful, the create method is next. (after the loadComplete) Here is where you can set-up the game for this state.
    **/
    create() {
        //now we will create the background and add it to the 'state'.
        this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);
        this.addChild(this.background);
    }

    /**
    * When the create method has run the update loop is the next part in the chain. 
    * This method will keep being called every frame and this is where you can place code that you want to repeat everyframe.
    * Note: That unlike most of the other methods with this one you have to call its super to keep the game going as intended.
    **/
    update() {
        super.update();
        
        //could make background move if wanted...
    }

   


}