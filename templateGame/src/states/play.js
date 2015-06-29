var TemplateGame = TemplateGame || {};

TemplateGame.Play = new Kiwi.State( "Play" );

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
*/


/**
* This create method is executed when a Kiwi state has finished loading
* any resources that were required to load.
*/
TemplateGame.Play.create = function () {

	Kiwi.State.prototype.create.call( this );

	/*
	* Replace with your own game creation code here...
	*/
	this.name = new Kiwi.GameObjects.StaticImage(
		this, this.textures.kiwiName, 10, 10) ;

	this.heart = new Kiwi.GameObjects.Sprite(
		this, this.textures.icons, 10, 10 );
	this.heart.cellIndex = 8;
	this.heart.y = this.game.stage.height - this.heart.height - 10;


	this.shield = new Kiwi.GameObjects.Sprite(
		this, this.textures.icons, 200, 200 );
	this.shield.cellIndex = 9;
	this.shield.y = this.game.stage.height * 0.5 - this.shield.height * 0.5;
	this.shield.x = this.game.stage.width * 0.5 - this.shield.width * 0.5;


	this.crown = new Kiwi.GameObjects.Sprite(
		this, this.textures.icons, 10, 10 );
	this.crown.cellIndex = 10;
	this.crown.x = this.game.stage.width - this.crown.width - 10;
	this.crown.y = this.game.stage.height - this.crown.height - 10;


	this.bomb = new Kiwi.GameObjects.Sprite(
		this, this.textures.icons, 0, 10 );
	this.bomb.x = this.game.stage.width - this.bomb.width  -10;


	// Add the GameObjects to the stage
	this.addChild( this.heart );
	this.addChild( this.crown );
	this.addChild( this.shield );
	this.addChild( this.bomb );
	this.addChild( this.name );
};


TemplateGame.Play.update = function() {

	Kiwi.State.prototype.update.call( this );

	this.shield.rotation += this.game.time.clock.rate * 0.01;
};
