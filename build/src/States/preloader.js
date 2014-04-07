/**
* The preload state is used purely to load all files required by the loader.
* 
* E.g. Any loading gifs/background graphics that are displayed to the user 'in-game' while they are waiting for the game to load.
*/


//Create the Preload State
var Preloader = new Kiwi.State('Preloader');


//Load in the Preloading Graphic, if needed
Preloader.preload = function () {

};


/* 
* Once the graphic has been loaded, switch to the Loading State 
* which will handle the Loading of all other in-game assets.
*/
Preloader.create = function () {
    game.states.switchState("LoadingState");

};

