/**
* The Loading State is going to be used to load in all of the in-game assets that we need in game.
*/

/**
* Since we want to use the custom Kiwi.JS loader with the bobing kiwi/html5 logo and everything. We need to extend the KiwiLoadingScreen State.  
* The KiwiLoadingScreen State is an extentsion of a normal State but it has some custom code to handle the loading/bobbing/fading of all the items, so if you override a method (like the preload) for example just make sure you call the super method.
* 
* The parameters we are passing into this method are as ordered.
* 1 - name {String} Name of this state.
* 2 - stateToSwitch {String} Name of the state to switch to AFTER all the assets have loaded. Note: The state you want to switch to should already have been added to the game.
* 3 - dimensions {Object} A Object containing the width/height that the game is to be. For example {width: 1024, height: 768}
* 4 - subfolder {String} The folder that the loading graphics are located at. 
*/

var noSplash = true;

var LoadingState;
if(noSplash) {
	LoadingState = new Kiwi.State('LoadingState');
} else {
	LoadingState = new KiwiLoadingScreen('LoadingState', 'IntroState', {width: 780, height: 640}, 'assets/img/loading/');
}

/**
* This preload method is responsible for preloading all your in game assets.
* @method preload
* @private
*/
LoadingState.preload = function () {
	KiwiLoadingScreen.prototype.preload.call(this);
	this.addJSON('level0', 'assets/level0.json');
	this.addSpriteSheet('tiles', 'assets/img/tiles.png', 64, 64);
	this.addSpriteSheet('chars', 'assets/img/chars.png', 32, 32);

}

if(noSplash) {
	LoadingState.create = function () {
		game.states.switchState("PlayState", PlayState, null, { });
	}
}