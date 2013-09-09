/**
* Kiwi - Animation - Tweens 
* @module Animation
* @submodule Tweens 
* @main Tweens
*/

module Kiwi.Animation.Tweens {

    /** 
    * Based on tween.js by sole. Converted to TypeScript and integrated into Kiwi.
    * https://github.com/sole/tween.js
    *
    * @class Manager
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
    export class Manager {

        /** 
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Kiwi.Tweens.Manager}
        **/
        constructor(game: Kiwi.Game) {
             
            this._game = game;
            this._tweens = [];

        }

        public objType() {
            return "Manager";
        }

        /** 
        * 
        * @property _game
        * @type Kiwi.Game
        * @private
        **/
        private _game: Kiwi.Game;

        /** 
        * 
        * @property _tweens
        * @type Array
        * @private
        **/
        private _tweens: Kiwi.Animation.Tween[];

        /** 
        * 
        * @method getAll
        **/
        public getAll() {

            return this._tweens;

        }

        /** 
        * 
        * @method removeAll
        **/
        public removeAll() {

            this._tweens.length = 0;

        }

        /** 
        * 
        * @method create
        * @param {Any} object
        * @return {Kiwi.Tween}
        **/
        public create(object): Kiwi.Animation.Tween {

            return new Kiwi.Animation.Tween(object, this._game);

        }

        /** 
        * 
        * @method add
        * @param {Kiwi.Tween} tween
        **/
        public add(tween: Kiwi.Animation.Tween) {

            tween.setParent(this._game);

            this._tweens.push(tween);

            return tween;

        }

        /** 
        * 
        * @method remove
        * @param {Kiwi.Tween} tween
        **/
        public remove(tween: Kiwi.Animation.Tween) {

            var i = this._tweens.indexOf(tween);

            if (i !== -1)
            {
                this._tweens.splice(i, 1);
            }

        }

        /** 
        * 
        * @method update
        **/
        public update() {

            if (this._tweens.length === 0)
            {
                return false;
            }

            //  See if we can merge the length into the while block
            var i = 0;
            var numTweens = this._tweens.length;

            while (i < numTweens)
            {
                if (this._tweens[i].update(this._game.time.now()))
                {
                    i++;
                }
                else
                {
                    this._tweens.splice(i, 1);
                    numTweens--;
                }
            }

            return true;

        }

    }
}
