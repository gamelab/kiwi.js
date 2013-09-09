/// <reference path="../core/Game.ts" />
/// <reference path="Clock.ts" />
/// <reference path="Timer.ts" />
/// <reference path="MasterClock.ts" />

/**
 *	Kiwi - Time - Manager
 *
 *	@desc 		A Proxy to the Clock and Time related classes. Access this via Kiwi.Game.Clock.
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 *
 *	@todo       Remove a Clock. Use High Resolution Timer.
 */

module Kiwi.Time {

    export class Manager {

        /**
        * 
        * @constructor
        * @param {Kiwi.Game} game.
        * @return {Kiwi.Time.Manager} This Object.
        */
        constructor(game: Kiwi.Game) {

            this._game = game;

        }

        public objType() {
            return "Manager";
        }

        /**
        * 
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * 
        * @property _clocks
        * @type Array
        * @private
        */
        private _clocks: Clock[] = [];

        /**
        * 
        * @property master
        * @type Kiwi.Time.MasterClock
        */
        private master: Kiwi.Time.MasterClock;

        /**
        * The default Game Clock - you can use this via this.game.time.clock. Uses a 1000 millisecond time unit.
        * @property clock
        * @type Kiwi.Time.Clock
        */
        public clock: Kiwi.Time.Clock;

        /**
        * The DOM is ready, so let's start the clocks running
        * @method boot
        */
        public boot() {

            this.master = new Kiwi.Time.MasterClock();

            this.clock = new Clock(this, this.master, 'default', 1000);
            this.clock.start();

        }

        /**
        * Creates a Kiwi.Time.Clock class for keeping time relative to the MasterClock.
        * @method addClock
        * @param {string} name. The name of the Clock.
        * @param {Number} units. The number of milliseconds that make up one unit of time on this clock. Default 1000.
        * @return {Kiwi.Time.Clock} A reference to the newly created Clock object.
        **/
        public addClock(name: string, units: number = 1000): Clock {

            this._clocks.push(new Clock(this, this.master, name, units));

            return this._clocks[this._clocks.length - 1];

        }

        /**
        * Returns the Clock with the matching name. Throws and error if no Clock with that name exists
        * @method getClock
        * @param {string} name. The name of the Clock to be returned.
        * @return {Kiwi.Time.Clock} The clock which matches the name given.
        **/
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
        * 
        * @method update
        */
        public update() {

            this.master.update();
            this.clock.update();

            for (var i = 0; i < this._clocks.length; i++)
            {
                this._clocks[i].update();
            }

        }

        /**
        * 
        * @method now
        * @return {Number}
        */
        public now(): number {

            return this.master.now;

        }

        /**
        * 
        * @method delta
        * @return {Number}
        */
        public delta(): number {

            return this.master.delta;

        }

    }

}