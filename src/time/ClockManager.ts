/**
* Contains ways of tracking time within a game or application. Each game will have a ClockManager, MasterClock and a single Clock automatically generated for them upon game creation.
* 
* @module Kiwi
* @submodule Time
* @main Time
*/

module Kiwi.Time {

	/**
	* Handles the generation and tracking of `Clock` and time related
	* applications for a single game.
	*
	* An instance of `ClockManager` is automatically created as part of
	* `Kiwi.Game`. This is accessible as the `time` property of any `Game`
	* object. You should not need to create additional `ClockManager` objects.
	*
	* If you do want to create additional `ClockManager` objects, be sure to
	* call `boot()` after creation to set up properties like the master clock.
	* You will also need to update this manager every frame.
	* 
	* @class ClockManager
	* @namespace Kiwi.Time
	* @constructor
	* @param {Kiwi.Game} game.
	* @return {Kiwi.Time.ClockManager} This Object.
	*
	*/
	export class ClockManager {

		constructor(game: Kiwi.Game) {

			this._game = game;

		}

		/**
		* The type of object this is.
		* @method objType
		* @return {String} "ClockManager"
		* @public
		*/
		public objType() {
			return "ClockManager";
		}

		/**
		* The game that this belongs to.
		* @property _game
		* @type Kiwi.Game
		* @private
		*/
		private _game: Kiwi.Game;

		/**
		* An array containing all of the clocks that exist on this manager.
		* @property _clocks
		* @type Array
		* @private
		*/
		private _clocks: Clock[] = [];

		/**
		* Frame rate factor, derived from master clock
		* @property rate
		* @type Number
		* @public
		* @since 1.1.10
		*/
		public rate: number = 1;

		/**
		* The MasterClock for this manager.
		* @property master
		* @type Kiwi.Time.MasterClock
		* @private
		*/
		private master: Kiwi.Time.MasterClock;

		/**
		* The default Game Clock - you can use this via this.game.time.clock. Uses a 1000 millisecond time unit.
		* @property clock
		* @type Kiwi.Time.Clock
		* @public
		*/
		public clock: Kiwi.Time.Clock;

		/**
		* When all of the DOM elements that the game requires have loaded successfully then this object will 'boot'.
		* @method boot
		* @public
		*/
		public boot() {

			this.master = new Kiwi.Time.MasterClock();

			this.clock = new Clock(this, this.master, 'default', 1000);
			this.clock.start();

		}

		/**
		* Creates a Clock class for keeping time relative to the MasterClock.
		* @method addClock
		* @param name {string} The name of the Clock.
		* @param [units=1000] {Number} The number of milliseconds that make up one unit of time on this clock. Default 1000.
		* @return {Kiwi.Time.Clock} A reference to the newly created Clock object.
		* @public
		*/
		public addClock(name: string, units: number = 1000): Clock {

			this._clocks.push(new Clock(this, this.master, name, units));

			return this._clocks[this._clocks.length - 1];

		}

		/**
		* Returns the Clock with the matching name.
		* Throws an error if no Clock with that name exists
		* @method getClock
		* @param name {string} The name of the Clock to be returned.
		* @return {Kiwi.Time.Clock} The clock which matches the name given.
		* @public
		*/
		public getClock(name: string): Clock {

			for (var i = 0; i < this._clocks.length; i++)
			{
				if (this._clocks[i].name === name)
				{
					return this._clocks[i];
				}
			}

		}

		/**
		* Is executed every frame and updates all of the clocks that exist on this manager.
		* @method update
		* @public
		*/
		public update() {

			this.master.update();
			this.clock.update();

			for (var i = 0; i < this._clocks.length; i++)
			{
				this._clocks[i].update();
			}

			this.rate = this.master.rate;
		}

		/**
		* Returns the current time. Based on the master clock.
		* @method now
		* @return {Number}
		* @public
		*/
		public now(): number {

			return this.master.now;

		}

		/**
		* Returns the elapsed time. Based on the master clock.
		* @method elapsed
		* @return {Number}
		* @public
		* @since 1.1.0
		*/
		public elapsed(): number {
			return this.master.elapsed();
		}

		/**
		* Returns the delta of the master clock.
		* @method delta
		* @return {Number}
		* @public
		*/
		public delta(): number {

			return this.master.delta;

		}

		/**
		* Sets the interval on the master clock.
		* @method setMasterInterval
		* @param interval {Number} The ideal frame interval in milliseconds.
		* @public
		* @since 1.1.0
		*/
		public setMasterInterval(interval:number) {
			this.master.idealDelta = interval;
		}

	}

}
