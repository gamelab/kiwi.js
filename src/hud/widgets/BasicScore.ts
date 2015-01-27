/** 
* @module HUD
* @submodule Widget
*/

module Kiwi.HUD.Widget {

	/**
	* A subclass of textfield that is primarily used to keep track of a score.
	* The score can be accessed via the counter component.
	* 
	* @class BasicScore
	* @extends Kiwi.HUD.TextField
	* @namespace Kiwi.HUD.Widget
	* @constructor
	* @param game {Kiwi.Game} The game that this BasicScore belongs to.
	* @param x {number} The cooridnates of the game on the x-axis.
	* @param y {number} The cooridnates of the game on the y-axis.
	* @param [initial=0] {number} The initial score to start off at.
	* @return {Kiwi.HUD.Widget.BasicScore}
	*/
	export class BasicScore extends Kiwi.HUD.Widget.TextField {
	   
		constructor(game: Kiwi.Game, x: number, y: number, initial:number=0) {
			super(game, "basicScore", x, y);
			this.name = 'basicScore';
			this.class = 'kiwi-basicscore-widget kiwi-widget';
			this.counter = this.components.add(new Kiwi.HUD.HUDComponents.Counter(this, initial));
			this.counter.updated.add(this._updateText, this);
			this._updateText();
		}

		/**
		* Returns the type of object that this is.
		* @method objType
		* @return {String} "BasicScoreWidget"
		* @public
		*/
		public objType(): string {
			return 'BasicScoreWidget';
		}

		/**
		* Holds a reference to the counter component.
		* @property counter
		* @type Kiwi.HUD.HUDComponents.Counter
		* @public
		*/
		public counter: Kiwi.HUD.HUDComponents.Counter;
		
		/**
		* Updates the text inside the textfield.
		* @method _updateText
		* @private
		*/
		public _updateText() {
			this.text = String(this.counter.current);
		}

	}

}
