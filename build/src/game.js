//Initialise the Kiwi Game. 
var game = new Kiwi.Game('content', 'isometric', null, { renderer: Kiwi.RENDERER_CANVAS });


//Add all the States we are going to use.
game.states.addState(Preloader);
game.states.addState(LoadingState);
game.states.addState(IntroState);
game.states.addState(PlayState);


//Switch to/use the Preloader state. 
game.states.switchState("Preloader");