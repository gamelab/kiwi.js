/**
* The section of Kiwi which holds the scripts that manage Tween's in Kiwi. The scripts in this section are based on Tween.js by sole and have been converted to TypeScript and integrated into Kiwi. https://github.com/sole/tween.js
*
* @module Animations
* @submodule Tweens 
* @main Tweens
*/

module Kiwi.Animations.Tweens {

	/** 
	* The TweenManager is automatically created on every game. This class is responsible for the creation and management of tweens for the game.
	*  
	* Based on tween.js by sole. Converted to TypeScript and integrated into Kiwi.
	* https://github.com/sole/tween.js
	*
	* @class TweenManager
	* @namespace Kiwi.Animations.Tweens
	* @constructor
	* @param game {Kiwi.Game} Current game
	* @param [clock] {Kiwi.Time.Clock} Clock to use for tweens.
	*   Defaults to game.time.clock.
	* @return {Kiwi.Animations.TweenManager}
	* 
	* @author     sole / http://soledadpenades.com
	* @author     mrdoob / http://mrdoob.com
	* @author     Robert Eisele / http://www.xarg.org
	* @author     Philippe / http://philippe.elsass.me
	* @author     Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
	* @author     Paul Lewis / http://www.aerotwist.com/
	* @author     lechecacharro
	* @author     Josh Faul / http://jocafa.com/
	* @author     egraether / http://egraether.com/
	* 
	*/
	export class TweenManager {

		constructor( game: Kiwi.Game, clock?: Kiwi.Time.Clock ) {
			 
			this._game = game;
			this._tweens = [];
			this.clock = clock || this._game.time.clock;

		}

		/**
		* The type of object that this is.
		* @method objType
		* @return {String} "TweenManager"
		* @public
		*/
		public objType() {
			return "TweenManager";
		}

		/** 
		* The game that this manager belongs to.
		* @property _game
		* @type Kiwi.Game
		* @private
		*/
		private _game: Kiwi.Game;

		/** 
		* An array of all of the tweens on the manager.
		* @property _tweens
		* @type Kiwi.Animations.Tween[]
		* @private
		*/
		private _tweens: Kiwi.Animations.Tween[];

		/**
		* Clock used by tweens
		* @property clock
		* @type Kiwi.Time.Clock
		* @public
		* @since 1.2.0
		*/
		public clock: Kiwi.Time.Clock;

		/** 
		* Returns all of tweens that are on the manager.
		* @method getAll
		* @return Kiwi.Animations.Tween[]
		* @public
		*/
		public getAll() {

			return this._tweens;

		}

		/** 
		* Removes all of the tweens on the manager.
		* @method removeAll
		* @public
		*/
		public removeAll() {

			this._tweens.length = 0;

		}

		/** 
		* Creates a new Tween. 
		* @method create
		* @param object {Any} The object that this tween is to apply.
		* @return {Kiwi.Animations.Tween} The tween that was created.
		* @public
		*/
		public create(object:any): Kiwi.Animations.Tween {
			var tween = new Kiwi.Animations.Tween(object, this._game);
			this.validateClock();
			tween.manager = this;
			return tween;
		}

		/** 
		* Adds a tween to the manager. 
		* @method add 
		* @param tween {Kiwi.Animations.Tween} The tween that you want to add to the manager.
		* @return {Kiwi.Animations.Tween} 
		* @public
		*/
		public add(tween: Kiwi.Animations.Tween): Kiwi.Animations.Tween {
			tween.setParent(this._game);
			tween.manager = this;
			this.validateClock();
			this._tweens.push(tween);
			return tween;

		}

		/** 
		* Removes a tween from this manager.
		* @method remove
		* @param tween {Kiwi.Animations.Tween} The tween that you would like to remove.
		* @return {Kiwi.Animations.Tween} The tween passed in.
		* @public
		*/
		public remove(tween: Kiwi.Animations.Tween) {

			var i = this._tweens.indexOf(tween);

			if (i !== -1)
			{
				this._tweens.splice(i, 1);
			}

			return tween;
		}

		/** 
		* The update loop.
		* @method update
		* @return {boolean} Whether anything was updated
		* @public
		*/
		public update() {
			var i = 0;

			if ( this._tweens.length === 0 ) {
				return false;
			}

			while ( i < this._tweens.length ) {
				if ( this._tweens[ i ].update( this.clock.elapsed() * 1000 ) ) {
					i++;
				} else {
					this._tweens.splice( i, 1 );
				}
			}

			return true;
		}

		/**
		* Validate clock; if no valid clock is found, set one from game
		* @method validateClock
		* @public
		* @since 1.2.0
		*/
		public validateClock() {
			if ( !this.clock ) {
				this.clock = this._game.time.clock;
				if ( !this.clock ) {
					Kiwi.Log.error( "Tween manager could not find valid clock!" );
				}
			}
		}

	}
}
