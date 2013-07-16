/// <reference path="../core/Game.ts" />
/// <reference path="formats/SpriteSheet.ts" />
/// <reference path="Animation.ts" />
/// <reference path="FrameData.ts" />

/**
 *	Kiwi - Animations - Manager
 *
 *	@desc 		
 *
 *	@version 	1.0 - 22nd March 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 *
 *	@todo       
 */

module Kiwi.Anims {

    export var PLAY_ONCE: number = 0;
    export var PLAY_LOOP: number = 1;
    export var PLAY_BOUNCE: number = 2;

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

        private _data;

        private _spriteSheet: Kiwi.Anims.Formats.SpriteSheet;

        /**
        * The DOM is ready
        * @method boot
        */
        public boot() {

            klog.info('Animations booted');

            this._data = {};

            this._spriteSheet = new Kiwi.Anims.Formats.SpriteSheet();

        }

        /**
        * Create an animation from a standard sprite sheet where every frame of the animation is the same width and height.
        * @method createFromSpriteSheet
        * @param {string} name - A friendly name you will use in your code to refer to this animation (i.e. "jump", "shoot")
        * @return {Kiwi.Anims.Animation} A Kiwi Animation object used for passing to a sprite for playback.
        */
        public getSpriteSheetFrames(cacheID: string, cache: Kiwi.FileCache, frameWidth: number, frameHeight: number): FrameData {

            return this._spriteSheet.getFrameData(cacheID, cache, frameWidth, frameHeight);

        }

        public removeSpriteSheet(name: string): bool {

            if (this._data[name])
            {
                delete this._data[name];
                return true;
            }

            return false;

        }

        //  Texture Packer
        public prepareTextureAtlas() { }

        //  Spline, Spriter
        public prepareBoneData() { }

    }

}