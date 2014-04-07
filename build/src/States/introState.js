/**
* We have included the IntroState just to detail that if you wanted to have a main-menu then this would be the place to put it.
* 
* Currently we just switch straight to the 'play' state.
* 
*/

var IntroState = new Kiwi.State('IntroState');


IntroState.create = function () {

    //This state is currently skipped, but can be used as a main menu page.
    game.states.switchState("PlayState", PlayState, null, { });

}