/// <reference path="FileCache.ts" />

/**
 *  Kiwi - Core - Cache
 *
 *  @desc       A Proxy class for quick access to 3 game/state caches for images, audio and data (json, xml)
 *
 *	@version 	0.2 - 21st October 2012
 *
 *	@author 	Richard Davey
 *
 *  @url        http://www.kiwijs.org
 *
 *  @todo       Add ability to let dev create their own quick reference caches here
 *
 */

module Kiwi.Files {

    export class Cache {

        /*
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Kiwi.Cache}
        */
        constructor (game:Kiwi.Game) {

            this._game = game;

        }

        public objType() {
            return "Cache";
        }

        /** 
        * @property _game
        * @type Kiwi.Game
        * @private
        **/
        private _game: Kiwi.Game;

        /** 
        * @property _caches
        * @type Kiwi.FileCache[]
        * @private
        **/
        private _caches: Kiwi.Files.FileCache[];

        /**
        * @property images
        * @type Kiwi.FileCache
        */
        public images: Kiwi.Files.FileCache = null;

        /**
        * @property audio
        * @type Kiwi.FileCache
        */
        public audio: Kiwi.Files.FileCache = null;

        /**
        * @property data
        * @type Kiwi.FileCache
        */
        public data: Kiwi.Files.FileCache = null;


        /**
        //  The DOM is ready, so lets create our caches
        * @method boot
        */
        public boot() {

            this._caches = [];

            this._caches.push(new Kiwi.Files.FileCache());
            this._caches.push(new Kiwi.Files.FileCache());
            this._caches.push(new Kiwi.Files.FileCache());

            this.images = this._caches[0];
            this.audio = this._caches[1];
            this.data = this._caches[2];

        }

        public checkImageCacheID(cacheID: string, cache: Kiwi.Files.Cache): bool {

            if (cacheID == '' || cache === null || cache.images === null || cache.images.exists(cacheID) === false)
            {
                klog.warn('Texture cannot be extracted from the cache. Invalid cacheID or cache given.', cacheID);
                return false;
            }

            return true;

        }

        public checkDataCacheID(cacheID: string, cache: Kiwi.Files.Cache): bool {

            if (cacheID == '' || cache === null || cache.images === null || cache.data.exists(cacheID) === false) {
                klog.warn('Data cannot be extracted from the cache. Invalid cacheID or cache given.', cacheID);
                return false;
            }

            return true;

        }

    }

}