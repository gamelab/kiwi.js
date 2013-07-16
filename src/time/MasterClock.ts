/**
 *  Kiwi - Time - MasterClock
 *
 *  @desc       The masterclock tracks time elapsed since the application started.
 *              You should not access it directly, use the Clock and Timer classes instead.
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Ross Kettle
 *	@author 	Richard Davey
 *  @url        http://www.kiwijs.org
 */

module Kiwi.Time {

    export class MasterClock {

        /**
        *
        * @constructor
        * @return {Kiwi.Time.MasterClock} This Object.
        */
        constructor () {

            this._started = Date.now();
            this.time = this._started;

        }

        public objType() {
            return "MasterClock";
        }

        /**
        *
        * @property _started
        * @type Number
        * @private
        */
        private _started: number;

        /**
        *
        * @property time
        * @type Number
        */
        public time: number = 0;

        /**
        *
        * @property now
        * @type Number
        */
        public now: number = 0;

        /**
        *
        * @property delta
        * @type Number
        */
        public delta: number = 0;

        /**
        *
        * @method elapsed
        * @return {Number}
        */
        public elapsed():number {

            return this.now - this._started;

        }

        /**
        *
        * @method totalElapsedSeconds
        * @return {Number}
        */
        public totalElapsedSeconds(): number {

            return (this.now - this._started) * 0.001;

        }

        /**
        *
        * @method update
        */
        public update() {

            //  Not in < IE8 (fixed via polyfill)
            this.now = Date.now();

            this.delta = this.now - this.time;

    	    this.time = this.now;

            //  Lock the delta at 0.1 minimum to minimise fps tunneling
    	    if (this.delta > 0.1)
    	    {
    	        this.delta = 0.1;
    	    }
            //  Apply time scaling

        }

        /**
        *
        * @method elapsedSince
        * @param {Number} since
        * @return {Number}
        */
        public elapsedSince(since: number): number {

            return this.now - since;

        }

        /**
        *
        * @method elapsedSecondsSince
        * @param {Number} since
        * @return {Number}
        */
        public elapsedSecondsSince(since: number): number {

            return (this.now - since) * 0.001;

        }

        /**
        *
        * @method reset
        */
        public reset() {

            this._started = this.now;

        }

    }

}