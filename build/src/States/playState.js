/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/

PlayState = new Kiwi.State('PlayState');

PlayState.create = function (params) {	
	// resize the game stage to the correct size (add space for the GUI)
	//game.stage.resize(this.mapSize * this.tileSize + 140, this.mapSize * this.tileSize);

	this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'level0', this.textures.tiles);
	this.addChild(this.tilemap.layers[0]);
	this.addChild(this.tilemap.layers[1]);
	
}

PlayState.update= function () {
	Kiwi.State.prototype.update.call(this);

}