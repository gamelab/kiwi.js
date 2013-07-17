/// <reference path="../../src/Kiwi.ts" />

/*
 * In this example we will look at using the state to load images and create staticImage objects
*/

class LoadingImagesStaticImages extends Kiwi.State {

    /*
    *   Use the preload function to load images into the game cache
    */
    preload() {

        //Add images to the state using the addImage function.
        this.addImage('spartan', 'assets/spartan.png');
        this.addImage('indiana', 'assets/indiana.png');

    }

    /**
    *   Create your static images in the create function
    */
    create() {

        //Create new variables for the static images
        var s1 = new Kiwi.GameObjects.StaticImage('spartan', this.game.cache, 50, 100);
        var s2 = new Kiwi.GameObjects.StaticImage('indiana', this.game.cache, 200, 300);

        //The static images need to be added as children of the state before they will be rendered onto the screen
        this.addChild(s1);
        this.addChild(s2);
    
    }

}




