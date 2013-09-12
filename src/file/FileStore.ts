/**
* Kiwi - Files
* @module Kiwi
* @submodule Files 
* 
*/

module Kiwi.Files {

    /**
    *
    *
    * @class FileStore
    *
    */
    export class FileStore {

        /**
        * 
        * @constructor
        * @return {Kiwi.FilesStore}
        */
        constructor(game: Kiwi.Game) {
            this._game = game;
            this._files = {};

        }

        public objType() {
            return "FileStore";
        }

        private _game: Kiwi.Game;

        /**
        * 
        * @property _files
        * @private
        */
        private _files;

        /**
        * 
        * @property _size
        * @type Number
        * @private
        */
        private _size:number = 0;

        public boot() {
            
        }

        /** 
        * 
        * @method getFile
        * @param {Sting} key
        * @return {Kiwi.Files} 
        */
        public getFile(key: string): Kiwi.Files.File {

            return this._files[key];

        }

        public getFilesByTag(tag: string): Object {

            var obj = {};
            for (var file in this._files) {
                if (this._files[file].hasTag(tag)) {
                    obj[file] = this._files[file];
                }
            }
            return obj;
        }

        public removeFilesByTag(tag: string) {

            var obj = {};
            for (var file in this._files) {
                if (this._files[file].hasTag(tag)) {
                    this.removeFile(file);
                }
            }
            return obj;
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

            return this._size;

        }



        /**
        * @method add
        * @param {String} key
        * @param {File} value
		*/
        public addFile(key: string, value: Kiwi.Files.File): boolean {

            if (!this._files[key])
            {
                this._files[key] = value;
                this._size++;
                return true;
            }

            return false;

        }

        /**
        * @method exists
        * @param {Sting} key
        * @return boolean
		*/
        public exists(key: string): boolean {

            if (this._files[key])
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        public removeStateFiles(state: Kiwi.State) {
            for (var file in this._files) {
                if (this._files[file].ownerState === state) {
                    this.removeFile(file);
                }
            }
        }

        /**
        * @method remove
        * @param {String} key
		*/
        public removeFile(key: string): boolean {

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