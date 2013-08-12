/// <reference path="File.ts" />

/**
 *  Kiwi - Core - FileCache
 *
 *  @desc       A cache used for storage of externally loaded resources held in Kiwi.File objects
 *
 *	@version 	1.0 - 4th March 2013
 *
 *	@author 	Richard Davey
 *
 *  @url        http://www.kiwijs.org
 *
 */

module Kiwi {

    export class FileCache {

        /**
        * 
        * @constructor
        * @return {Kiwi.FileCache}
        */
        constructor () {

            this._files = {};

        }

        public objType() {
            return "FileCache";
        }

        /**
        * 
        * @property _files
        * @private
        */
        private _files;

        /**
        * 
        * @property _cacheSize
        * @type Number
        * @private
        */
        private _cacheSize:number = 0;

        /** 
        * 
        * @method getFile
        * @param {Sting} key
        * @return {Kiwi.File} 
        */
        public getFile(key: string): Kiwi.File {

            return this._files[key];

        }

        public get keys(): string[]{
            var keys: string[] = new Array();
            for (var key in this._files) {
                keys.push(key);
            }

            return keys;
        }

        /** 
        * Gets 
        * @method size
        * @return {Number} 
        */
        public size(): number {

            return this._cacheSize;

        }



        /**
        * @method add
        * @param {String} key
        * @param {File} value
		*/
        public addFile(key: string, value: Kiwi.File):bool {

            if (!this._files[key])
            {
                this._files[key] = value;
                this._cacheSize++;
                return true;
            }

            return false;

        }

        /**
        * @method exists
        * @param {Sting} key
        * @return Boolean
		*/
        public exists(key: string): bool {

            if (this._files[key])
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
        * @method remove
        * @param {String} key
		*/
        public removeFile(key: string): bool {

            if (this._files[key])
            {
                this._files[key] = null;
                delete this._files[key];
                return true;
            }

            return false;

        }

    }

}