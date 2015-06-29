/**
* Loading State loads in all of the in-game assets.
*
* Because in this blueprint there is only a single "hidden object" section
* we are going to load in all of the assets at this point.
*
* If you have multiple states, I would recommend loading the other graphics
* as they are required by their states.
* Otherwise the loading times may be a bit long and it is not optimal.
*/

/**
* Since we want to use the custom Kiwi.JS loader with the bobbing kiwi/html5
* logo, we need to extend the KiwiLoadingScreen State.
* The KiwiLoadingScreen State is an extension of a normal State,
* with some custom code to handle the loading/bobbing/fading of all the items,
* so if you override a method (e.g. the preload) make sure you call the
* super method.
* 
* The parameters we are passing into this method are as follows:
* 1 - name {string} Name of this state.
* 2 - stateToSwitch {string} Name of the state to switch to AFTER all the
*	assets have loaded. Note: The state you want to switch to should already
*	have been added to the game.
* 3 - dimensions {object} A Object containing the width/height that the game
*	is to be. For example `{width: 1024, height: 768}`
* 4 - subfolder {string} Folder that the loading graphics are located in
*/

var TemplateGame = TemplateGame || {};

TemplateGame.Loading = new KiwiLoadingScreen(
	"Loading", "Intro", "assets/img/loading/" );


TemplateGame.Loading.preload = function () {

	// Make sure to call the super at the top.
	// Otherwise the loading graphics will load last,
	// and that defies the whole point in loading them.
	KiwiLoadingScreen.prototype.preload.call(this);

	/**
	* Replace with your own in-game assets to load.
	**/
	this.addImage( "kiwiName", "assets/img/kiwijs-name.png" );
	this.addSpriteSheet( "icons", "assets/img/kiwijs-icons.png", 100, 90 );
};
