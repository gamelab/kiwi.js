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
    * @param game {Game}
    * @return {TweenManager}
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
         
        constructor(game: Kiwi.Game) {
             
            this._game = game;
            this._tweens = [];

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "TweenManager";
        }

        /** 
        * The game that this manager belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /** 
        * An array of all of the tweens on the manager.
        * @property _tweens
        * @type Tween[]
        * @private
        */
        private _tweens: Kiwi.Animations.Tween[];

        /** 
        * Returns all of tweens that are on the manager.
        * @method getAll
        * @return Tween[]
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
        * @return {Tween} The tween that was created.
        * @public
        */
        public create(object:any): Kiwi.Animations.Tween {

            return new Kiwi.Animations.Tween(object, this._game);

        }

        /** 
        * Adds a tween to the manager. 
        * @method add 
        * @param tween {Tween} The tween that you want to add to the manager.
        * @return {Tween} 
        * @public
        */
        public add(tween: Kiwi.Animations.Tween): Kiwi.Animations.Tween {

            tween.setParent(this._game);

            this._tweens.push(tween);

            return tween;

        }

        /** 
        * Removes a tween from this manager.
        * @method remove
        * @param tween {Tween} The tween that you would like to remove.
        * @return {Tween}
        * @public
        */
        public remove(tween: Kiwi.Animations.Tween) {

            var i = this._tweens.indexOf(tween);

            if (i !== -1)
            {
                this._tweens.splice(i, 1);
            }

        }

        /** 
        * The update loop.
        * @method update
        * @public
        */
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
