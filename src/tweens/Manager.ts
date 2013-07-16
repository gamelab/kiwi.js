/// <reference path="../core/Game.ts" />
/// <reference path="../Kiwi.ts" />

/**
 *	Kiwi - Tween - Manager
 *
 *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js) converted to TypeScript and integrated into Kiwi
 *
 *	@version 	1.0 - 11th January 2013
 *
 *	@author 	Richard Davey, TypeScript conversion and Kiwi/signals integration
 *  @author     sole / http://soledadpenades.com
 *  @author     mrdoob / http://mrdoob.com
 *  @author     Robert Eisele / http://www.xarg.org
 *  @author     Philippe / http://philippe.elsass.me
 *  @author     Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
 *  @author     Paul Lewis / http://www.aerotwist.com/
 *  @author     lechecacharro
 *  @author     Josh Faul / http://jocafa.com/
 *  @author     egraether / http://egraether.com/
 *
 *	@url 		http://www.kiwijs.org
 *
 *	@todo       1) Hook tweens to a given game clock (so they can run at different update speeds and pause)
 *              2) Allow for tweening direct numeric values, not just object properties
 *              3) YoYo support
 *              4) Delta time support
 */

module Kiwi.Tweens {

    export class Manager {

        /** 
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Kiwi.Tweens.Manager}
        **/
        constructor(game: Kiwi.Game) {

            klog.info('Tween Manager created');
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
        private _tweens: Kiwi.Tween[];

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
        public create(object): Kiwi.Tween {

            return new Kiwi.Tween(object, this._game);

        }

        /** 
        * 
        * @method add
        * @param {Kiwi.Tween} tween
        **/
        public add(tween: Kiwi.Tween) {

            tween.setParent(this._game);

            this._tweens.push(tween);

            return tween;

        }

        /** 
        * 
        * @method remove
        * @param {Kiwi.Tween} tween
        **/
        public remove(tween: Kiwi.Tween) {

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
